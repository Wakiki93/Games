# PROTOTYPE - NOT FOR PRODUCTION
# Question: Can any real OpenStreetMap neighborhood become a playable Holdout map with zero hand-editing?
# Date: 2026-11-19
#
# Converts an OSM XML extract (from https://api.openstreetmap.org/api/0.6/map?bbox=...)
# into level.json: buildings (footprint polygons + inferred heights/roofs), roads (polylines + widths),
# and ground areas (parks, woods, water, streams, rail) in local meters around a chosen origin,
# clipped to the play bbox. Also writes an Unreal blockout (level.obj/.mtl), a top-down preview.png
# and metrics.json (counts, height inference, navigation sanity, timing, warnings).
#
# Coordinates: x = meters east of origin, y = meters north of origin, z = up.
# Unreal import: UE is left-handed, Z-up, centimeters -> X = x*100, Y = -y*100, Z = z*100 (see README).
#
# PRIVACY: the repo is public. Never store addr:* tags, house numbers, or the --place text.
# The origin must be a neighborhood centroid, never a specific home.
#
# Data (c) OpenStreetMap contributors, ODbL 1.0. https://www.openstreetmap.org/copyright
#
# Usage (offline): python3 osm_to_level.py data/lancaster-highlands.osm --name "Lancaster Highlands, Tinley Park IL" \
#                      --origin 41.5849928,-87.7719624 --out data/level.json
# Usage (fetch):   python3 osm_to_level.py --place "<neighborhood, city>" --name "<display name>" --out data/level.json

import argparse
import json
import math
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import deque
from functools import lru_cache

SCHEMA = "holdout.level/0.2"
METRICS_SCHEMA = "holdout.metrics/0.1"
USER_AGENT = "HoldoutMapPipeline/0.1 (game prototype)"
NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
OSM_API_MAP_URL = "https://api.openstreetmap.org/api/0.6/map"
OSM_API_MAX_DEG2 = 0.25      # /api/0.6/map area limit
OSM_API_MAX_NODES = 50_000   # /api/0.6/map node limit (enforced server-side, HTTP 400)
ATTRIBUTION = "Map data (c) OpenStreetMap contributors, ODbL 1.0 - https://www.openstreetmap.org/copyright"
ATTRIBUTION_SHORT = "© OpenStreetMap contributors (ODbL)"
HERE = os.path.dirname(os.path.abspath(__file__))

ROAD_WIDTH_M = {
    "motorway": 14, "trunk": 13, "primary": 12, "secondary": 11, "tertiary": 10,
    "residential": 8, "unclassified": 7, "service": 5, "living_street": 6,
    "footway": 2, "path": 1.5, "cycleway": 2.5, "pedestrian": 4, "steps": 2, "track": 3,
}
# draw order / z offset: bigger roads on top
ROAD_RANK = {"path": 0, "footway": 1, "steps": 1, "cycleway": 2, "track": 2, "pedestrian": 3, "service": 4,
             "living_street": 5, "unclassified": 5, "residential": 6, "tertiary": 7, "secondary": 8,
             "primary": 9, "trunk": 10, "motorway": 11}
MAJOR_ROADS = {"motorway", "trunk", "primary", "secondary", "tertiary"}
FOOT_ROADS = {"footway", "path", "cycleway", "pedestrian", "steps", "track"}

GROUND_KINDS = {
    ("leisure", "park"): "park", ("leisure", "garden"): "park", ("landuse", "grass"): "grass",
    ("landuse", "meadow"): "grass", ("natural", "wood"): "wood", ("natural", "scrub"): "scrub",
    ("natural", "water"): "water", ("landuse", "forest"): "wood", ("leisure", "pitch"): "grass",
    ("amenity", "parking"): "parking",
}
STREAM_TYPES = ("stream", "river", "ditch", "canal")
LINE_WIDTH_M = {"stream": 3, "rail": 3.5}

PITCHED_KINDS = {"house", "detached", "semidetached_house", "residential", "bungalow", "terrace", "cabin",
                 "farm", "garage", "garages", "shed", "carport", "hut"}
GABLE_RECT_MIN = 0.85     # footprint area / oriented-bbox area needed for a gable mesh in the OBJ
ROOF_PITCH_DEG = 30.0

NAV_MERGE_M = 0.5         # graph nodes closer than this are the same junction
NAV_REACH_M = 40.0        # building centroid must be within this of a walkable road
NAV_SNAP_HINT_M = 5.0     # dangling road ends this close to another component = likely missing junction
NAV_CELL_M = 1.0          # free-space raster resolution

_last_nominatim_call = [0.0]


# ----------------------------------------------------------------------------- projection

@lru_cache(maxsize=64)
def m_per_deg(lat0):
    """WGS84 meters per degree of (lon, lat) at latitude lat0 (series expansion, mm-accurate)."""
    p = math.radians(lat0)
    my = 111132.92 - 559.82 * math.cos(2 * p) + 1.175 * math.cos(4 * p) - 0.0023 * math.cos(6 * p)
    mx = 111412.84 * math.cos(p) - 93.5 * math.cos(3 * p) + 0.118 * math.cos(5 * p)
    return mx, my


def project(lat, lon, lat0, lon0):
    """Local equirectangular projection with WGS84 scale at the origin: cm-accurate over a few km."""
    mx, my = m_per_deg(lat0)
    return round((lon - lon0) * mx, 2), round((lat - lat0) * my, 2)


# ----------------------------------------------------------------------------- 2D geometry

def polygon_area(pts):
    """Signed shoelace area: > 0 for counter-clockwise rings (x east, y north)."""
    a = 0.0
    for (x1, y1), (x2, y2) in zip(pts, pts[1:] + pts[:1]):
        a += x1 * y2 - x2 * y1
    return a / 2.0


def polygon_centroid(pts):
    a = cx = cy = 0.0
    for (x1, y1), (x2, y2) in zip(pts, pts[1:] + pts[:1]):
        c = x1 * y2 - x2 * y1
        a += c
        cx += (x1 + x2) * c
        cy += (y1 + y2) * c
    if abs(a) < 1e-9:
        return sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts)
    return cx / (3 * a), cy / (3 * a)


def dedupe(pts, eps=1e-3, closed=True):
    out = []
    for p in pts:
        if not out or abs(p[0] - out[-1][0]) > eps or abs(p[1] - out[-1][1]) > eps:
            out.append(p)
    if closed and len(out) > 1 and abs(out[0][0] - out[-1][0]) <= eps and abs(out[0][1] - out[-1][1]) <= eps:
        out.pop()
    return out


def point_in_rect(p, rect, eps=0.0):
    xmin, ymin, xmax, ymax = rect
    return xmin - eps <= p[0] <= xmax + eps and ymin - eps <= p[1] <= ymax + eps


def clip_segment(p, q, rect):
    """Liang-Barsky: parametric range (t0, t1) of segment p->q inside rect, or None."""
    xmin, ymin, xmax, ymax = rect
    dx, dy = q[0] - p[0], q[1] - p[1]
    t0, t1 = 0.0, 1.0
    for pk, qk in ((-dx, p[0] - xmin), (dx, xmax - p[0]), (-dy, p[1] - ymin), (dy, ymax - p[1])):
        if pk == 0:
            if qk < 0:
                return None
        else:
            t = qk / pk
            if pk < 0:
                if t > t1:
                    return None
                t0 = max(t0, t)
            else:
                if t < t0:
                    return None
                t1 = min(t1, t)
    return t0, t1


def clip_polyline(pts, rect, min_len=0.05):
    """Clip a polyline to rect; returns a list of parts (a line can leave and re-enter)."""
    parts, cur = [], None
    for p, q in zip(pts, pts[1:]):
        r = clip_segment(p, q, rect)
        if r is None:
            cur = None
            continue
        t0, t1 = r
        a = (p[0] + (q[0] - p[0]) * t0, p[1] + (q[1] - p[1]) * t0)
        b = (p[0] + (q[0] - p[0]) * t1, p[1] + (q[1] - p[1]) * t1)
        if cur is not None and t0 == 0.0:
            cur.append(b)
        else:
            cur = [a, b]
            parts.append(cur)
        if t1 < 1.0:
            cur = None
    out = []
    for part in parts:
        part = dedupe([(round(x, 2), round(y, 2)) for x, y in part], closed=False)
        if len(part) >= 2 and polyline_length(part) >= min_len:
            out.append(part)
    return out


def clip_halfplane(pts, a, b, c):
    """Sutherland-Hodgman step: keep the part of polygon pts where a*x + b*y + c >= 0."""
    out = []
    n = len(pts)
    for i in range(n):
        P, Q = pts[i - 1], pts[i]
        fp = a * P[0] + b * P[1] + c
        fq = a * Q[0] + b * Q[1] + c
        if fq >= 0:
            if fp < 0:
                t = fp / (fp - fq)
                out.append((P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t))
            out.append(Q)
        elif fp >= 0:
            t = fp / (fp - fq)
            out.append((P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t))
    return out


def clip_polygon(pts, rect, min_area=0.5):
    """Sutherland-Hodgman against an axis-aligned rect. Returns [] if (almost) nothing is left."""
    xmin, ymin, xmax, ymax = rect
    out = list(pts)
    for a, b, c in ((1, 0, -xmin), (-1, 0, xmax), (0, 1, -ymin), (0, -1, ymax)):
        if not out:
            break
        out = clip_halfplane(out, a, b, c)
    out = dedupe([(round(x, 2), round(y, 2)) for x, y in out])
    if len(out) < 3 or abs(polygon_area(out)) < min_area:
        return []
    return out


def polyline_length(pts):
    return sum(math.hypot(q[0] - p[0], q[1] - p[1]) for p, q in zip(pts, pts[1:]))


def convex_hull(pts):
    pts = sorted(set((float(x), float(y)) for x, y in pts))
    if len(pts) <= 2:
        return pts

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    lower, upper = [], []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]


def min_area_rect(pts):
    """Oriented bounding box (rotating calipers over hull edges). angle_deg = long axis, CCW from east."""
    hull = convex_hull(pts)
    best = None
    for i in range(len(hull)):
        (x1, y1), (x2, y2) = hull[i], hull[(i + 1) % len(hull)]
        ang = math.atan2(y2 - y1, x2 - x1)
        c, s = math.cos(ang), math.sin(ang)
        us = [x * c + y * s for x, y in hull]
        vs = [-x * s + y * c for x, y in hull]
        area = (max(us) - min(us)) * (max(vs) - min(vs))
        if best is None or area < best[0]:
            best = (area, ang, min(us), max(us), min(vs), max(vs))
    _, ang, u0, u1, v0, v1 = best
    c, s = math.cos(ang), math.sin(ang)
    uc, vc = (u0 + u1) / 2, (v0 + v1) / 2
    cx, cy = uc * c - vc * s, uc * s + vc * c
    lu, lv = u1 - u0, v1 - v0
    if lv > lu:  # make "length" the long side
        lu, lv, ang = lv, lu, ang + math.pi / 2
    ang_deg = math.degrees(ang) % 180.0
    return {"cx": round(cx, 2), "cy": round(cy, 2), "length": round(lu, 2), "width": round(lv, 2),
            "angle_deg": round(ang_deg, 2)}


def _cross3(a, b, c):
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])


def triangulate(poly):
    """Ear clipping for a simple CCW polygon. Returns index triples into poly."""
    n = len(poly)
    if n < 3:
        return []
    if polygon_area(poly) < 0:
        return [(n - 1 - a, n - 1 - b, n - 1 - c) for a, b, c in triangulate(poly[::-1])]
    idx = list(range(n))
    tris = []
    eps = 1e-9

    def inside(p, a, b, c):
        return _cross3(a, b, p) >= -eps and _cross3(b, c, p) >= -eps and _cross3(c, a, p) >= -eps

    guard = 0
    while len(idx) > 3 and guard < 10 * n * n:
        guard += 1
        m = len(idx)
        ear = None
        collinear = None
        for k in range(m):
            ia, ib, ic = idx[k - 1], idx[k], idx[(k + 1) % m]
            a, b, c = poly[ia], poly[ib], poly[ic]
            cr = _cross3(a, b, c)
            if abs(cr) <= 1e-9:
                if collinear is None:
                    collinear = k
                continue
            if cr < 0:
                continue  # reflex
            ok = True
            for j in idx:
                if j in (ia, ib, ic):
                    continue
                p = poly[j]
                if p == a or p == b or p == c:
                    continue
                if inside(p, a, b, c):
                    ok = False
                    break
            if ok:
                ear = k
                break
        if ear is not None:
            tris.append((idx[ear - 1], idx[ear], idx[(ear + 1) % m]))
            del idx[ear]
        elif collinear is not None:
            del idx[collinear]  # degenerate vertex: drop it, no triangle
        else:  # not simple (self-touching) - fan the rest so we still emit something
            for k in range(1, len(idx) - 1):
                tris.append((idx[0], idx[k], idx[k + 1]))
            return tris
    if len(idx) == 3 and abs(_cross3(poly[idx[0]], poly[idx[1]], poly[idx[2]])) > 1e-9:
        tris.append(tuple(idx))
    return tris


def ribbon(pts, width, max_miter=2.0):
    """Left/right offset lines of a polyline (mitered joins, miter length clamped)."""
    pts = dedupe(pts, closed=False)
    hw = width / 2.0
    n = len(pts)
    left, right = [], []
    if n < 2:
        return left, right

    def unit(dx, dy):
        L = math.hypot(dx, dy) or 1.0
        return dx / L, dy / L

    for i in range(n):
        if i == 0:
            d = unit(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1])
            nx, ny, scale = -d[1], d[0], hw
        elif i == n - 1:
            d = unit(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
            nx, ny, scale = -d[1], d[0], hw
        else:
            d1 = unit(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
            d2 = unit(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1])
            sx, sy = -d1[1] - d2[1], d1[0] + d2[0]
            L = math.hypot(sx, sy)
            if L < 1e-6:  # 180-degree turn
                nx, ny, scale = -d1[1], d1[0], hw
            else:
                nx, ny = sx / L, sy / L
                cos_half = nx * -d1[1] + ny * d1[0]
                scale = hw / max(cos_half, 1.0 / max_miter)
        x, y = pts[i]
        left.append((x + nx * scale, y + ny * scale))
        right.append((x - nx * scale, y - ny * scale))
    return left, right


def ribbon_quads(pts, width):
    left, right = ribbon(pts, width)
    return [[right[i], right[i + 1], left[i + 1], left[i]] for i in range(len(left) - 1)]


# ----------------------------------------------------------------------------- inference

_NUM_RE = re.compile(r"^\s*([0-9]+(?:\.[0-9]+)?)\s*(m|ft|')?\s*$")


def parse_length_m(text):
    m = _NUM_RE.match(text.replace(",", "."))
    if not m:
        raise ValueError(text)
    v = float(m.group(1))
    return v * 0.3048 if m.group(2) in ("ft", "'") else v


def infer_height(tags, area_m2):
    """OSM height/levels when present; otherwise inferred from type and footprint size.
    Precedence: height > building:levels > inferred."""
    if "height" in tags:
        try:
            return parse_length_m(tags["height"]), "osm:height"
        except ValueError:
            pass
    if "building:levels" in tags:
        try:
            return float(tags["building:levels"]) * 3.0 + 1.5, "osm:levels"
        except ValueError:
            pass
    kind = tags.get("building", "yes")
    if kind in ("garage", "garages", "shed", "carport"):
        return 3.5, "inferred:type"
    if kind in ("house", "detached", "semidetached_house", "residential"):
        return 7.5 if area_m2 > 120 else 5.5, "inferred:type+area"
    # untyped "yes": guess from footprint size
    if area_m2 < 40:
        return 3.0, "inferred:area"
    if area_m2 < 300:
        return 6.5, "inferred:area"
    return 9.0, "inferred:area"


def infer_roof(tags, area_m2):
    """Roof hint: 'gable' (any pitched roof) or 'flat'. roof:shape wins; houses gable; large untyped flat."""
    shape = tags.get("roof:shape")
    if shape:
        return ("flat" if shape == "flat" else "gable"), "osm:roof:shape"
    kind = tags.get("building", "yes")
    if kind in PITCHED_KINDS:
        return "gable", "inferred:type"
    if kind == "yes":
        return ("gable" if area_m2 < 300 else "flat"), "inferred:area"
    return "flat", "inferred:type"


def roof_rise(roof, height_m, width_m):
    if roof != "gable":
        return 0.0
    rise = 0.5 * width_m * math.tan(math.radians(ROOF_PITCH_DEG))
    return round(max(0.8, min(rise, 0.45 * height_m)), 2)


# ----------------------------------------------------------------------------- conversion

def read_bounds(root):
    b = root.find("bounds")
    if b is None:
        return None
    return (float(b.get("minlon")), float(b.get("minlat")), float(b.get("maxlon")), float(b.get("maxlat")))


def convert(osm_path, origin=None, name="", bbox=None):
    """bbox = (minlon, minlat, maxlon, maxlat); default = the file's <bounds>. origin = (lat, lon);
    default = bbox center. Returns (level dict, info dict for warnings/metrics)."""
    root = ET.parse(osm_path).getroot()
    file_bbox = read_bounds(root)
    if bbox is None:
        bbox = file_bbox
    if bbox is None:
        raise SystemExit("no --bbox given and the .osm file has no <bounds> element")
    minlon, minlat, maxlon, maxlat = bbox
    if not (minlon < maxlon and minlat < maxlat):
        raise SystemExit("bbox must be minlon,minlat,maxlon,maxlat with min < max")
    if origin is None:
        origin = ((minlat + maxlat) / 2, (minlon + maxlon) / 2)
    lat0, lon0 = origin
    x0, y0 = project(minlat, minlon, lat0, lon0)
    x1, y1 = project(maxlat, maxlon, lat0, lon0)
    rect = (x0, y0, x1, y1)

    nodes = {n.get("id"): (float(n.get("lat")), float(n.get("lon"))) for n in root.findall("node")}
    ways = {}
    for w in root.findall("way"):
        ways[w.get("id")] = ({t.get("k"): t.get("v") for t in w.findall("tag")}, [nd.get("ref") for nd in w.findall("nd")])

    buildings, roads, ground = [], [], []
    stats = {"height_sources": {}, "skipped_open_buildings": 0, "skipped_missing_nodes": 0,
             "buildings_outside_bbox": 0, "skipped_degenerate_buildings": 0, "road_ways_outside_bbox": 0,
             "road_ways_split": 0, "ground_outside_bbox": 0}
    info = {"untyped_buildings": 0, "barrier_ways": 0, "tree_nodes": 0, "mp_inner_ignored": 0,
            "mp_missing_members": 0, "roof_sources": {}}
    info["tree_nodes"] = sum(1 for n in root.findall("node") for t in n.findall("tag")
                             if t.get("k") == "natural" and t.get("v") in ("tree", "tree_row"))

    def ring_pts(refs):
        return [project(*nodes[r], lat0, lon0) for r in refs]

    def add_ground_polygon(wid, kind, pts, rel_id=None):
        poly = clip_polygon(pts, rect)
        if not poly:
            stats["ground_outside_bbox"] += 1
            return
        if polygon_area(poly) < 0:
            poly.reverse()
        item = {"id": wid, "kind": kind, "polygon": [list(p) for p in poly], "area_m2": round(polygon_area(poly), 1)}
        if rel_id is not None:
            item["relation"] = rel_id
        ground.append(item)

    ground_way_ids = set()
    for wid, (tags, refs) in ways.items():
        if any(r not in nodes for r in refs):
            stats["skipped_missing_nodes"] += 1
            continue
        if "barrier" in tags:
            info["barrier_ways"] += 1
        pts = ring_pts(refs)

        if "building" in tags:
            if len(pts) < 4 or pts[0] != pts[-1]:
                stats["skipped_open_buildings"] += 1
                continue
            ring = dedupe(pts[:-1])
            if len(ring) < 3:
                stats["skipped_degenerate_buildings"] += 1
                continue
            area = polygon_area(ring)
            if area < 0:  # store counter-clockwise
                ring.reverse()
                area = -area
            if area < 1.0:
                stats["skipped_degenerate_buildings"] += 1
                continue
            cx, cy = polygon_centroid(ring)
            if not point_in_rect((cx, cy), rect):
                stats["buildings_outside_bbox"] += 1
                continue
            obb = min_area_rect(ring)
            rectangularity = area / max(obb["length"] * obb["width"], 1e-6)
            h, src = infer_height(tags, area)
            roof, roof_src = infer_roof(tags, area)
            stats["height_sources"][src] = stats["height_sources"].get(src, 0) + 1
            info["roof_sources"][roof_src] = info["roof_sources"].get(roof_src, 0) + 1
            if tags.get("building") == "yes":
                info["untyped_buildings"] += 1
            buildings.append({
                "id": int(wid),
                "kind": tags.get("building"),
                "footprint": [list(p) for p in ring],
                "area_m2": round(area, 1),
                "height_m": h,
                "height_source": src,
                "address": None,  # deliberately not copied: the repo is public
                "centroid": [round(cx, 2), round(cy, 2)],
                "roof": roof,
                "roof_source": roof_src,
                "roof_height_m": roof_rise(roof, h, obb["width"]),
                "obb": obb,
                "rectangularity": round(min(rectangularity, 1.0), 3),
            })
        elif "highway" in tags and tags["highway"] in ROAD_WIDTH_M:
            parts = clip_polyline(pts, rect)
            if not parts:
                stats["road_ways_outside_bbox"] += 1
                continue
            if len(parts) > 1:
                stats["road_ways_split"] += 1
            for i, part in enumerate(parts):
                roads.append({
                    "id": int(wid),
                    "part": i,
                    "kind": tags["highway"],
                    "name": tags.get("name"),
                    "width_m": ROAD_WIDTH_M[tags["highway"]],
                    "points": [list(p) for p in part],
                    "length_m": round(polyline_length(part), 1),
                })
        else:
            for (k, v), kind in GROUND_KINDS.items():
                if tags.get(k) == v and len(pts) >= 4 and pts[0] == pts[-1]:
                    ground_way_ids.add(wid)
                    add_ground_polygon(int(wid), kind, dedupe(pts[:-1]))
                    break
            else:
                line_kind = None
                if tags.get("waterway") in STREAM_TYPES:
                    line_kind = "stream"
                elif tags.get("railway") == "rail":
                    line_kind = "rail"
                if line_kind:
                    parts = clip_polyline(pts, rect)
                    if not parts:
                        stats["ground_outside_bbox"] += 1
                    for i, part in enumerate(parts):
                        ground.append({"id": int(wid), "part": i, "kind": line_kind, "line": [list(p) for p in part],
                                       "width_m": LINE_WIDTH_M[line_kind]})

    # multipolygon relations: closed outer member ways only (inner rings ignored -> warning)
    for rel in root.findall("relation"):
        tags = {t.get("k"): t.get("v") for t in rel.findall("tag")}
        if tags.get("type") != "multipolygon":
            continue
        kind = next((kd for (k, v), kd in GROUND_KINDS.items() if tags.get(k) == v), None)
        if kind is None:
            continue
        for m in rel.findall("member"):
            if m.get("type") != "way":
                continue
            if m.get("role") == "inner":
                info["mp_inner_ignored"] += 1
                continue
            ref = m.get("ref")
            if ref not in ways or any(r not in nodes for r in ways[ref][1]):
                info["mp_missing_members"] += 1
                continue
            if ref in ground_way_ids:
                continue
            refs = ways[ref][1]
            if len(refs) >= 4 and refs[0] == refs[-1]:
                add_ground_polygon(int(ref), kind, dedupe(ring_pts(refs)[:-1]), rel_id=int(rel.get("id")))
            else:
                info["mp_missing_members"] += 1  # open outer chains are not stitched in this prototype

    n_b = len(buildings)
    inferred = sum(v for k, v in stats["height_sources"].items() if k.startswith("inferred"))
    roofs = {"gable": sum(1 for b in buildings if b["roof"] == "gable"),
             "flat": sum(1 for b in buildings if b["roof"] == "flat")}
    roofs["gable_mesh"] = sum(1 for b in buildings if b["roof"] == "gable" and b["rectangularity"] >= GABLE_RECT_MIN)
    stats.update({
        "buildings": n_b, "roads": len(roads), "ground": len(ground),
        "road_ways": len({r["id"] for r in roads}),
        "heights_inferred_pct": round(100.0 * inferred / n_b, 1) if n_b else 0.0,
        "roofs": roofs,
    })
    level = {
        "schema": SCHEMA,
        "name": name,
        "attribution": ATTRIBUTION,
        "units": "meters; x=east, y=north, z=up; origin is the neighborhood centroid",
        "bounds": {"min": [x0, y0], "max": [x1, y1]},
        "geo": {
            "origin_lat": round(lat0, 7), "origin_lon": round(lon0, 7),
            "bbox_lonlat": [round(v, 7) for v in bbox],
            "projection": "local equirectangular, WGS84 meters/degree at origin latitude",
        },
        "buildings": buildings,
        "roads": roads,
        "ground": ground,
        "stats": stats,
    }
    return level, info


# ----------------------------------------------------------------------------- navigation sanity

def _seg_dist(P, A, B):
    """Distance from each point in P (k,2) to each segment A->B (m,2). Returns (k, m)."""
    import numpy as np
    AB = B - A
    L2 = (AB ** 2).sum(1)
    L2[L2 == 0] = 1e-12
    AP = P[:, None, :] - A[None, :, :]
    t = np.clip((AP * AB[None]).sum(2) / L2[None], 0.0, 1.0)
    D = AP - t[..., None] * AB[None]
    return np.sqrt((D ** 2).sum(2))


def nav_analysis(level, merge_m=NAV_MERGE_M, reach_m=NAV_REACH_M, cell_m=NAV_CELL_M):
    """Street graph (roads + footways, nodes merged within merge_m) + building reach + free-space raster.
    Annotates each road with its component rank (0 = largest). Returns (summary, extras-for-preview)."""
    import numpy as np
    from matplotlib.path import Path

    roads = level["roads"]
    (xmin, ymin), (xmax, ymax) = level["bounds"]["min"], level["bounds"]["max"]

    # --- graph with grid-hashed node merging
    grid, node_xy, parent = {}, [], []

    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[rb] = ra

    def node_for(p):
        gx, gy = int(math.floor(p[0] / merge_m)), int(math.floor(p[1] / merge_m))
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for nid in grid.get((gx + dx, gy + dy), ()):
                    q = node_xy[nid]
                    if math.hypot(q[0] - p[0], q[1] - p[1]) <= merge_m:
                        return nid
        nid = len(node_xy)
        node_xy.append(tuple(p))
        parent.append(nid)
        grid.setdefault((gx, gy), []).append(nid)
        return nid

    edges = set()
    seg_a, seg_b, seg_road = [], [], []
    road_nodes = []
    for ri, r in enumerate(roads):
        ids = [node_for(p) for p in r["points"]]
        road_nodes.append(ids)
        for a, b in zip(ids, ids[1:]):
            if a != b:
                edges.add((min(a, b), max(a, b)))
                union(a, b)
        for p, q in zip(r["points"], r["points"][1:]):
            seg_a.append(p)
            seg_b.append(q)
            seg_road.append(ri)

    comp_len = {}
    for ri, r in enumerate(roads):
        root = find(road_nodes[ri][0])
        comp_len[root] = comp_len.get(root, 0.0) + r["length_m"]
    ranked = sorted(comp_len, key=lambda k: -comp_len[k])
    rank = {root: i for i, root in enumerate(ranked)}
    for ri, r in enumerate(roads):
        r["component"] = rank[find(road_nodes[ri][0])]
    total_len = sum(comp_len.values()) or 1.0

    # dangling ends (degree 1) that are not on the play-area border, and near misses to other components
    degree = {}
    for a, b in edges:
        degree[a] = degree.get(a, 0) + 1
        degree[b] = degree.get(b, 0) + 1
    A = np.array(seg_a, float) if seg_a else np.zeros((0, 2))
    B = np.array(seg_b, float) if seg_b else np.zeros((0, 2))
    seg_comp = np.array([roads[i]["component"] for i in seg_road], int) if seg_road else np.zeros(0, int)
    dangles = [n for n, d in degree.items()
               if d == 1 and min(node_xy[n][0] - xmin, xmax - node_xy[n][0], node_xy[n][1] - ymin, ymax - node_xy[n][1]) > 1.0]
    near_miss = 0
    snap_parent = list(range(len(ranked)))

    def sfind(i):
        while snap_parent[i] != i:
            i = snap_parent[i]
        return i

    if dangles and len(A):
        D = _seg_dist(np.array([node_xy[n] for n in dangles]), A, B)
        for k, n in enumerate(dangles):
            c = rank[find(n)]
            d = np.where(seg_comp != c, D[k], np.inf)
            j = int(np.argmin(d))
            if d[j] <= NAV_SNAP_HINT_M:
                near_miss += 1
                ra, rb = sfind(c), sfind(int(seg_comp[j]))
                if ra != rb:
                    snap_parent[rb] = ra
    comps_if_snapped = len({sfind(i) for i in range(len(ranked))})

    # --- building centroids within reach of a walkable road
    bld = level["buildings"]
    far_ids = []
    within_any = within_main = 0
    if bld and len(A):
        C = np.array([b["centroid"] for b in bld], float)
        D = _seg_dist(C, A, B)
        dmin = D.min(1)
        dmain = np.where(seg_comp[None, :] == 0, D, np.inf).min(1)
        within_any = int((dmin <= reach_m).sum())
        within_main = int((dmain <= reach_m).sum())
        far_ids = [bld[i]["id"] for i in np.nonzero(dmin > reach_m)[0]]
        max_dist = float(dmin.max())
    else:
        max_dist = None

    # --- free-space raster: buildings + water + streams block, roads re-open (bridges/culverts)
    nx, ny = int(math.ceil((xmax - xmin) / cell_m)), int(math.ceil((ymax - ymin) / cell_m))
    blocked = np.zeros((ny, nx), bool)

    def cell_window(bx0, by0, bx1, by1):
        i0, i1 = max(0, int((bx0 - xmin) / cell_m)), min(nx, int(math.ceil((bx1 - xmin) / cell_m)) + 1)
        j0, j1 = max(0, int((by0 - ymin) / cell_m)), min(ny, int(math.ceil((by1 - ymin) / cell_m)) + 1)
        return i0, i1, j0, j1

    def fill_polygon(mask, poly, value):
        xs, ys = [p[0] for p in poly], [p[1] for p in poly]
        i0, i1, j0, j1 = cell_window(min(xs), min(ys), max(xs), max(ys))
        if i0 >= i1 or j0 >= j1:
            return
        gx, gy = np.meshgrid(xmin + (np.arange(i0, i1) + 0.5) * cell_m, ymin + (np.arange(j0, j1) + 0.5) * cell_m)
        inside = Path(poly).contains_points(np.c_[gx.ravel(), gy.ravel()]).reshape(gx.shape)
        mask[j0:j1, i0:i1][inside] = value

    def fill_buffer(mask, pts, hw, value):
        for p, q in zip(pts, pts[1:]):
            i0, i1, j0, j1 = cell_window(min(p[0], q[0]) - hw, min(p[1], q[1]) - hw, max(p[0], q[0]) + hw, max(p[1], q[1]) + hw)
            if i0 >= i1 or j0 >= j1:
                continue
            gx, gy = np.meshgrid(xmin + (np.arange(i0, i1) + 0.5) * cell_m, ymin + (np.arange(j0, j1) + 0.5) * cell_m)
            d = _seg_dist(np.c_[gx.ravel(), gy.ravel()], np.array([p], float), np.array([q], float))[:, 0]
            sel = (d <= hw).reshape(gx.shape)
            mask[j0:j1, i0:i1][sel] = value

    for b in bld:
        fill_polygon(blocked, b["footprint"], True)
    for g in level["ground"]:
        if g["kind"] == "water" and "polygon" in g:
            fill_polygon(blocked, g["polygon"], True)
        elif g["kind"] == "stream" and "line" in g:
            fill_buffer(blocked, g["line"], g["width_m"] / 2.0, True)
    seed = np.zeros_like(blocked)
    for r in roads:
        fill_buffer(blocked, r["points"], r["width_m"] / 2.0, False)
        if r["component"] == 0:
            fill_buffer(seed, r["points"], r["width_m"] / 2.0, True)

    N = nx * ny
    state = bytearray((~blocked).astype(np.uint8).ravel().tobytes())  # 0 blocked, 1 free, 2 reached
    dq = deque(int(i) for i in np.flatnonzero(seed.ravel() & ~blocked.ravel()))
    for i in dq:
        state[i] = 2

    def flood(dq, mark):
        count = 0
        while dq:
            i = dq.popleft()
            count += 1
            x = i % nx
            if x > 0 and state[i - 1] == 1:
                state[i - 1] = mark
                dq.append(i - 1)
            if x < nx - 1 and state[i + 1] == 1:
                state[i + 1] = mark
                dq.append(i + 1)
            if i >= nx and state[i - nx] == 1:
                state[i - nx] = mark
                dq.append(i - nx)
            if i + nx < N and state[i + nx] == 1:
                state[i + nx] = mark
                dq.append(i + nx)
        return count

    reached = flood(dq, 2)
    free = int((~blocked).sum())
    pockets = big_pockets = 0
    pocket_area = 0
    for i in np.flatnonzero(np.frombuffer(bytes(state), np.uint8) == 1):
        if state[i] != 1:
            continue
        state[i] = 3
        size = flood(deque([int(i)]), 3)
        pockets += 1
        pocket_area += size
        if size * cell_m * cell_m >= 25:
            big_pockets += 1
    st = np.frombuffer(bytes(state), np.uint8).reshape(ny, nx)

    summary = {
        "graph_nodes": len(node_xy),
        "graph_edges": len(edges),
        "components": len(ranked),
        "largest_component_length_pct": round(100.0 * comp_len[ranked[0]] / total_len, 1) if ranked else 0.0,
        "walkable_length_m": round(total_len, 1),
        "component_lengths_m": [round(comp_len[r], 1) for r in ranked[:10]],
        "dangling_ends_interior": len(dangles),
        "near_miss_dangles": near_miss,
        "components_if_snapped_5m": comps_if_snapped,
        "buildings_within_reach_pct": round(100.0 * within_any / len(bld), 1) if bld else 0.0,
        "buildings_within_reach_of_main_pct": round(100.0 * within_main / len(bld), 1) if bld else 0.0,
        "max_building_to_road_m": round(max_dist, 1) if max_dist is not None else None,
        "buildings_beyond_reach": len(far_ids),
        "reach_m": reach_m,
        "merge_m": merge_m,
        "free_space_cell_m": cell_m,
        "free_space_m2": round(free * cell_m * cell_m),
        "free_space_reachable_pct": round(100.0 * reached / free, 2) if free else 0.0,
        "unreachable_pockets": pockets,
        "unreachable_pockets_ge_25m2": big_pockets,
        "unreachable_m2": round(pocket_area * cell_m * cell_m),
    }
    extras = {"far_building_ids": set(far_ids), "unreachable_mask": st == 3}
    return summary, extras


# ----------------------------------------------------------------------------- Unreal blockout (OBJ)

MATERIALS = {
    "ground": (0.55, 0.60, 0.45), "bld_wall": (0.86, 0.83, 0.78), "bld_roof_gable": (0.48, 0.30, 0.24),
    "bld_roof_flat": (0.52, 0.52, 0.54), "road_major": (0.22, 0.22, 0.24), "road_residential": (0.30, 0.30, 0.32),
    "road_service": (0.40, 0.40, 0.42), "road_foot": (0.76, 0.72, 0.64), "gnd_park": (0.45, 0.66, 0.34),
    "gnd_grass": (0.50, 0.70, 0.38), "gnd_wood": (0.20, 0.42, 0.20), "gnd_scrub": (0.52, 0.56, 0.30),
    "gnd_water": (0.25, 0.45, 0.75), "gnd_parking": (0.50, 0.50, 0.50), "gnd_stream": (0.30, 0.52, 0.82),
    "gnd_rail": (0.42, 0.34, 0.28), "marker": (1.0, 0.1, 0.1),
}


def road_material(kind):
    if kind in MAJOR_ROADS:
        return "road_major"
    if kind in FOOT_ROADS:
        return "road_foot"
    if kind in ("service",):
        return "road_service"
    return "road_residential"


class ObjWriter:
    def __init__(self, up="y"):
        self.up = up
        self.lines = []
        self.nv = 0

    def v(self, x, y, z):
        if self.up == "y":  # right-handed Y-up (OBJ/Blender default): X=east, Y=up, Z=south
            X, Y, Z = x, z, -y
        else:               # right-handed Z-up: X=east, Y=north, Z=up
            X, Y, Z = x, y, z
        self.lines.append(f"v {X:.3f} {Y:.3f} {Z:.3f}")
        self.nv += 1
        return self.nv

    def obj(self, name, mtl):
        self.lines.append(f"o {name}")
        self.lines.append("s off")
        self.lines.append(f"usemtl {mtl}")

    def mtl(self, m):
        self.lines.append(f"usemtl {m}")

    def f(self, idx):
        self.lines.append("f " + " ".join(str(i) for i in idx))

    def flat_poly(self, poly, z):
        """Horizontal polygon facing up."""
        poly = dedupe([tuple(p) for p in poly])
        if len(poly) < 3:
            return
        if polygon_area(poly) < 0:
            poly = poly[::-1]
        ids = [self.v(x, y, z) for x, y in poly]
        for a, b, c in triangulate(poly):
            self.f((ids[a], ids[b], ids[c]))


def building_mesh(w, b):
    """Closed prism; gable roof (ridge along the oriented-bbox long axis) when hinted and near-rectangular."""
    ring = [tuple(p) for p in b["footprint"]]
    h = float(b["height_m"])
    rise = float(b.get("roof_height_m", 0.0))
    gable = b.get("roof") == "gable" and b.get("rectangularity", 0) >= GABLE_RECT_MIN and rise > 0
    obb = b.get("obb")
    if gable and obb:
        a = math.radians(obb["angle_deg"])
        nx_, ny_ = -math.sin(a), math.cos(a)            # normal to the ridge
        cx, cy = obb["cx"], obb["cy"]
        hw = max(obb["width"] / 2.0, 1e-3)
        eave = h - rise

        def dist(p):
            return (p[0] - cx) * nx_ + (p[1] - cy) * ny_

        def ztop(p):
            return eave + rise * (1.0 - min(abs(dist(p)) / hw, 1.0))

        full = []  # insert ridge-crossing vertices into the ring so walls get a peak
        for i in range(len(ring)):
            p, q = ring[i], ring[(i + 1) % len(ring)]
            full.append(p)
            dp, dq = dist(p), dist(q)
            if dp * dq < 0:
                t = dp / (dp - dq)
                full.append((p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t))
        ring = dedupe(full)
    else:
        def ztop(p):
            return h
    bot = [w.v(p[0], p[1], 0.0) for p in ring]
    top = [w.v(p[0], p[1], ztop(p)) for p in ring]
    n = len(ring)
    w.mtl("bld_wall")
    for i in range(n):
        j = (i + 1) % n
        w.f((bot[i], bot[j], top[j], top[i]))
    for a_, b_, c_ in triangulate(ring):  # bottom cap (closed mesh for later fracturing)
        w.f((bot[c_], bot[b_], bot[a_]))
    if gable and obb:
        w.mtl("bld_roof_gable")
        lookup = {(round(p[0], 3), round(p[1], 3)): top[i] for i, p in enumerate(ring)}
        c0 = -(nx_ * cx + ny_ * cy)
        for sa, sb, sc in ((nx_, ny_, c0), (-nx_, -ny_, -c0)):
            half = dedupe(clip_halfplane(ring, sa, sb, sc))
            if len(half) < 3:
                continue
            ids = []
            for p in half:
                key = (round(p[0], 3), round(p[1], 3))
                if key not in lookup:
                    lookup[key] = w.v(p[0], p[1], ztop(p))
                ids.append(lookup[key])
            for a_, b_, c_ in triangulate(half):
                w.f((ids[a_], ids[b_], ids[c_]))
    else:
        w.mtl("bld_roof_flat")
        for a_, b_, c_ in triangulate(ring):
            w.f((top[a_], top[b_], top[c_]))
    return gable


def write_obj(level, obj_path, mtl_path, up="y"):
    w = ObjWriter(up)
    (xmin, ymin), (xmax, ymax) = level["bounds"]["min"], level["bounds"]["max"]
    w.lines += ["# PROTOTYPE - NOT FOR PRODUCTION",
                "# Question: Can any real OpenStreetMap neighborhood become a playable Holdout map with zero hand-editing?",
                "# Date: 2026-11-19",
                f"# Holdout blockout: {level['name']}",
                f"# {ATTRIBUTION}",
                "# Units: meters. " + ("Axes: right-handed Y-up (X=east, Y=up, Z=south)." if up == "y"
                                       else "Axes: right-handed Z-up (X=east, Y=north, Z=up)."),
                "# Unreal: X_ue = x*100, Y_ue = -y*100, Z_ue = z*100 (see README).",
                f"mtllib {os.path.basename(mtl_path)}"]
    w.obj("ground_plane", "ground")
    w.flat_poly([(xmin, ymin), (xmax, ymin), (xmax, ymax), (xmin, ymax)], 0.0)
    for g in level["ground"]:
        name = f"gnd_{g['kind']}_{g['id']}" + (f"_p{g['part']}" if g.get("part") else "")
        if "polygon" in g:
            w.obj(name, f"gnd_{g['kind']}")
            w.flat_poly(g["polygon"], 0.02)
        elif "line" in g:
            w.obj(name, f"gnd_{g['kind']}")
            for quad in ribbon_quads(g["line"], g["width_m"]):
                w.f([w.v(x, y, 0.03) for x, y in quad])
    for r in level["roads"]:
        w.obj(f"road_{r['id']}" + (f"_p{r['part']}" if r.get("part") else ""), road_material(r["kind"]))
        z = 0.05 + 0.005 * ROAD_RANK.get(r["kind"], 5)
        for quad in ribbon_quads(r["points"], r["width_m"]):
            w.f([w.v(x, y, z) for x, y in quad])
    gable_meshes = 0
    for b in level["buildings"]:
        w.obj(f"bld_{b['id']}", "bld_wall")
        gable_meshes += building_mesh(w, b)
    # orientation check: red pillar on the north edge (UE: should sit at negative Y)
    w.obj("marker_north", "marker")
    my = ymax - 3.0
    pillar = {"footprint": [[-1, my - 1], [1, my - 1], [1, my + 1], [-1, my + 1]], "height_m": 25.0, "roof": "flat"}
    building_mesh(w, pillar)
    with open(obj_path, "w") as f:
        f.write("\n".join(w.lines) + "\n")
    with open(mtl_path, "w") as f:
        f.write("# PROTOTYPE - NOT FOR PRODUCTION\n# Holdout blockout materials (flat colors)\n")
        for name, (r_, g_, b_) in MATERIALS.items():
            f.write(f"newmtl {name}\nKd {r_:.3f} {g_:.3f} {b_:.3f}\nKa 0 0 0\nKs 0 0 0\nd 1\nillum 1\n\n")
    return {"objects": sum(1 for line in w.lines if line.startswith("o ")), "vertices": w.nv,
            "faces": sum(1 for line in w.lines if line.startswith("f ")), "gable_meshes": gable_meshes}


# ----------------------------------------------------------------------------- preview

PREVIEW_COLORS = {
    "surface": "#fcfcfb", "ground": "#eceee4", "park": "#cfe3b4", "grass": "#d6e8bf", "wood": "#a3c98f",
    "scrub": "#cdd8a2", "water": "#9cc3e6", "parking": "#d9d7d2", "stream": "#5b97d1", "rail": "#7a6a5a",
    "road_major": "#4a4a4f", "road_residential": "#727278", "road_service": "#94949a", "road_foot": "#b39f80",
    "flag": "#e34948", "ink": "#2b2b29", "ink_muted": "#6b6b66",
}


def render_preview(level, png_path, extras=None):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib.collections import PolyCollection
    from matplotlib.colors import LinearSegmentedColormap, Normalize
    from matplotlib.patches import Patch, Rectangle
    import numpy as np

    extras = extras or {}
    C = PREVIEW_COLORS
    (xmin, ymin), (xmax, ymax) = level["bounds"]["min"], level["bounds"]["max"]
    W, H = xmax - xmin, ymax - ymin
    fig_w = 9.0
    fig_h = fig_w * H / W * 0.86 + 1.2
    fig = plt.figure(figsize=(fig_w, fig_h), dpi=150, facecolor=C["surface"])
    ax = fig.add_axes([0.03, 0.05, 0.78, 0.89])
    ax.set_facecolor(C["ground"])
    ax.set_xlim(xmin, xmax)
    ax.set_ylim(ymin, ymax)
    ax.set_aspect("equal")
    ax.set_xticks([])
    ax.set_yticks([])
    for s in ax.spines.values():
        s.set_color(C["ink_muted"])
        s.set_linewidth(0.6)

    polys = [g for g in level["ground"] if "polygon" in g]
    if polys:
        ax.add_collection(PolyCollection([g["polygon"] for g in polys], facecolors=[C.get(g["kind"], "#dddddd") for g in polys],
                                         edgecolors="none", zorder=1))
    lines = [g for g in level["ground"] if "line" in g]
    for g in lines:
        quads = ribbon_quads(g["line"], g["width_m"])
        if quads:
            ax.add_collection(PolyCollection(quads, facecolors=C.get(g["kind"], "#888888"), edgecolors="none",
                                             zorder=2 if g["kind"] == "stream" else 3))
    um = extras.get("unreachable_mask")
    if um is not None and um.any():
        rgba = np.zeros(um.shape + (4,))
        rgba[um] = (0.89, 0.29, 0.28, 0.8)
        ax.imshow(rgba, extent=(xmin, xmax, ymin, ymax), origin="lower", interpolation="nearest", zorder=4)
    for r in sorted(level["roads"], key=lambda r: ROAD_RANK.get(r["kind"], 5)):
        quads = ribbon_quads(r["points"], r["width_m"])
        if quads:
            ax.add_collection(PolyCollection(quads, facecolors=C[road_material(r["kind"])], edgecolors=C[road_material(r["kind"])],
                                             linewidths=0.15, zorder=5 + ROAD_RANK.get(r["kind"], 5) * 0.01))
    bld = level["buildings"]
    hs = [b["height_m"] for b in bld]
    cmap = LinearSegmentedColormap.from_list("height", ["#f8d3bf", "#eb6834", "#7a2a0c"])  # one hue, light->dark
    norm = Normalize(vmin=0, vmax=max(hs + [10.0]))
    far = extras.get("far_building_ids", set())
    if bld:
        ax.add_collection(PolyCollection(
            [b["footprint"] for b in bld], facecolors=[cmap(norm(h)) for h in hs],
            edgecolors=[C["flag"] if b["id"] in far else "#5a2a14" for b in bld],
            linewidths=[1.2 if b["id"] in far else 0.25 for b in bld], zorder=7))

    # scale bar (bottom-left) and north arrow (top-right), in data units
    bar = 100.0 if W < 1500 else 250.0
    bx, by = xmin + 0.05 * W, ymin + 0.04 * H
    ax.add_patch(Rectangle((bx - 8, by - 10), bar + 16, 34, facecolor=C["surface"], alpha=0.85, edgecolor="none", zorder=9))
    ax.add_patch(Rectangle((bx, by), bar / 2, 5, facecolor=C["ink"], edgecolor=C["ink"], linewidth=0.6, zorder=10))
    ax.add_patch(Rectangle((bx + bar / 2, by), bar / 2, 5, facecolor=C["surface"], edgecolor=C["ink"], linewidth=0.6, zorder=10))
    ax.text(bx + bar / 2, by + 9, f"{bar:.0f} m", ha="center", va="bottom", fontsize=8, color=C["ink"], zorder=10)
    nx_, ny_ = xmax - 0.07 * W, ymax - 0.10 * H
    ax.annotate("", xy=(nx_, ny_ + 0.06 * H), xytext=(nx_, ny_), zorder=10,
                arrowprops=dict(arrowstyle="-|>", color=C["ink"], lw=1.6, mutation_scale=16))
    ax.text(nx_, ny_ + 0.065 * H, "N", ha="center", va="bottom", fontsize=11, fontweight="bold", color=C["ink"], zorder=10)
    ax.text(xmax - 0.01 * W, ymin + 0.01 * H, ATTRIBUTION_SHORT, ha="right", va="bottom", fontsize=7.5, color=C["ink"],
            zorder=10, bbox=dict(facecolor=C["surface"], alpha=0.85, edgecolor="none", pad=2))

    st = level["stats"]
    nav = level.get("nav", {})
    fig.text(0.03, 0.975, level["name"], fontsize=13, fontweight="bold", color=C["ink"], va="top")
    fig.text(0.03, 0.952, f"{W:.0f} m x {H:.0f} m  |  {st['buildings']} buildings  |  {len({r['id'] for r in level['roads']})} roads"
             f"  |  heights inferred {st['heights_inferred_pct']:.0f}%"
             + (f"  |  nav components {nav.get('components')}" if nav else ""),
             fontsize=8.5, color=C["ink_muted"], va="top")

    # legend + colorbar in the right gutter
    handles = [Patch(facecolor=C[k], label=lbl) for k, lbl in (
        ("road_major", "major road"), ("road_residential", "residential"), ("road_service", "service"),
        ("road_foot", "footway / path"), ("park", "park"), ("grass", "grass"), ("wood", "wood"),
        ("scrub", "scrub"), ("water", "water / stream"), ("rail", "rail"))]
    handles.append(Patch(facecolor="white", edgecolor=C["flag"], linewidth=1.2, label=f"> {NAV_REACH_M:.0f} m from road"))
    handles.append(Patch(facecolor=C["flag"], label="unreachable open ground"))
    fig.legend(handles=handles, loc="upper left", bbox_to_anchor=(0.815, 0.94), fontsize=7.5, frameon=False,
               labelcolor=C["ink"])
    cax = fig.add_axes([0.83, 0.08, 0.025, 0.30])
    sm = plt.cm.ScalarMappable(norm=norm, cmap=cmap)
    cb = fig.colorbar(sm, cax=cax)
    cb.set_label("building height (m)", fontsize=8, color=C["ink"])
    cb.ax.tick_params(labelsize=7, colors=C["ink_muted"])
    cb.outline.set_visible(False)
    fig.savefig(png_path, facecolor=C["surface"])
    plt.close(fig)


# ----------------------------------------------------------------------------- fetch mode

def http_get(url, timeout=120):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def _ring_centroid_lonlat(rings):
    a = cx = cy = 0.0
    for ring in rings:
        for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]):
            c = x1 * y2 - x2 * y1
            a += c
            cx += (x1 + x2) * c
            cy += (y1 + y2) * c
    if abs(a) < 1e-15:
        return None
    return cy / (3 * a), cx / (3 * a)  # (lat, lon)


def geocode(place):
    """Nominatim lookup. Returns bbox of the matched area's polygon and its centroid. Never logs `place`."""
    wait = 1.0 - (time.time() - _last_nominatim_call[0])
    if wait > 0:
        time.sleep(wait)  # Nominatim usage policy: max 1 request/second
    q = urllib.parse.urlencode({"q": place, "format": "jsonv2", "limit": 1, "polygon_geojson": 1})
    try:
        data = json.loads(http_get(f"{NOMINATIM_URL}?{q}", timeout=60))
    finally:
        _last_nominatim_call[0] = time.time()
    if not data:
        raise SystemExit("geocoding found no match for the --place text (text not echoed, for privacy)")
    hit = data[0]
    if int(hit.get("place_rank", 0)) >= 30 or hit.get("addresstype") in ("house", "building") \
            or hit.get("category") == "building":
        raise SystemExit("refusing: --place matched a single address/building. A bbox around one house would "
                         "single out a home; use a neighborhood, subdivision or park name instead.")
    geom = hit.get("geojson") or {}
    rings = []
    if geom.get("type") == "Polygon":
        rings = [geom["coordinates"][0]]
    elif geom.get("type") == "MultiPolygon":
        rings = [poly[0] for poly in geom["coordinates"]]
    coords = [pt for ring in rings for pt in ring]
    if coords:
        lons, lats = [c[0] for c in coords], [c[1] for c in coords]
        bbox = (min(lons), min(lats), max(lons), max(lats))
        centroid = _ring_centroid_lonlat([[tuple(p) for p in r] for r in rings])
    else:
        s, n, w, e = (float(v) for v in hit["boundingbox"])
        bbox = (w, s, e, n)
        centroid = None
    if centroid is None:
        centroid = ((bbox[1] + bbox[3]) / 2, (bbox[0] + bbox[2]) / 2)
    return {"bbox": bbox, "centroid": centroid, "osm_type": hit.get("osm_type"),
            "category": hit.get("category"), "type": hit.get("type"), "place_rank": hit.get("place_rank")}


def expand_bbox(bbox, margin_m):
    minlon, minlat, maxlon, maxlat = bbox
    mx, my = m_per_deg((minlat + maxlat) / 2)
    dlon, dlat = margin_m / mx, margin_m / my
    return (minlon - dlon, minlat - dlat, maxlon + dlon, maxlat + dlat)


def check_bbox_size(bbox):
    minlon, minlat, maxlon, maxlat = bbox
    deg2 = (maxlon - minlon) * (maxlat - minlat)
    if deg2 > OSM_API_MAX_DEG2:
        raise SystemExit(f"refusing: bbox is {deg2:.3f} deg^2, over the OSM API /map limit of {OSM_API_MAX_DEG2} deg^2 "
                         f"(and {OSM_API_MAX_NODES:,} nodes). Pick a smaller place or use a Geofabrik extract + --bbox.")
    return deg2


def strip_private_tags(root):
    """Remove addr:* tags (house numbers, street addresses) before anything touches disk."""
    removed = 0
    for el in list(root):
        for t in list(el.findall("tag")):
            if t.get("k", "").startswith("addr:"):
                el.remove(t)
                removed += 1
    return removed


def fetch_osm(bbox, cache_path):
    url = f"{OSM_API_MAP_URL}?bbox={bbox[0]:.7f},{bbox[1]:.7f},{bbox[2]:.7f},{bbox[3]:.7f}"
    try:
        data = http_get(url, timeout=300)
    except urllib.error.HTTPError as e:
        body = e.read()[:300].decode("utf-8", "replace").strip()
        if e.code == 400:
            raise SystemExit(f"refusing: the OSM API rejected the bbox (HTTP 400: {body}). /map is limited to "
                             f"{OSM_API_MAX_DEG2} deg^2 and {OSM_API_MAX_NODES:,} nodes; pick a smaller area.")
        if e.code == 509:
            raise SystemExit("OSM API bandwidth limit hit (HTTP 509); wait and retry later")
        raise
    root = ET.fromstring(data)
    removed = strip_private_tags(root)
    os.makedirs(os.path.dirname(os.path.abspath(cache_path)), exist_ok=True)
    ET.ElementTree(root).write(cache_path, encoding="UTF-8", xml_declaration=True)
    return {"bytes": len(data), "addr_tags_stripped": removed,
            "nodes": len(root.findall("node")), "ways": len(root.findall("way"))}


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-") or "fetched"


# ----------------------------------------------------------------------------- metrics + main

def build_warnings(level, info, nav, obj_stats):
    st = level["stats"]
    warns = []
    if st["buildings"] and st["heights_inferred_pct"] >= 50:
        warns.append(f"{st['heights_inferred_pct']:.0f}% of building heights are inferred (no height / building:levels "
                     "tags): verticality is a guess")
    if st["buildings"] and info["untyped_buildings"]:
        warns.append(f"{info['untyped_buildings']} buildings are untyped (building=yes): height/roof from footprint size only")
    if nav and nav["components"] > 1:
        warns.append(f"street graph has {nav['components']} components; largest holds {nav['largest_component_length_pct']}% "
                     f"of walkable length ({nav['components_if_snapped_5m']} if dangling ends within "
                     f"{NAV_SNAP_HINT_M:.0f} m were snapped)")
    if nav and nav["buildings_beyond_reach"]:
        warns.append(f"{nav['buildings_beyond_reach']} buildings have their centroid > {NAV_REACH_M:.0f} m from any walkable road")
    if nav and nav["unreachable_pockets_ge_25m2"]:
        warns.append(f"{nav['unreachable_pockets_ge_25m2']} enclosed open-ground pockets >= 25 m^2 are unreachable "
                     f"({nav['unreachable_m2']} m^2 total)")
    if info["barrier_ways"] == 0:
        warns.append("no barrier=* ways (fences, hedges, walls): yards are open, so free-space connectivity is trivially high")
    if info["tree_nodes"] == 0:
        warns.append("no natural=tree nodes: no cover/props from OSM")
    warns.append("no terrain elevation: ground is a flat plane at z=0")
    if info["mp_inner_ignored"]:
        warns.append(f"{info['mp_inner_ignored']} multipolygon inner rings ignored (holes filled)")
    if info["mp_missing_members"]:
        warns.append(f"{info['mp_missing_members']} multipolygon outer members missing from the extract or not closed")
    if obj_stats and st["roofs"]["gable"]:
        flat_fallback = st["roofs"]["gable"] - obj_stats["gable_meshes"]
        if flat_fallback:
            warns.append(f"{flat_fallback} of {st['roofs']['gable']} gable-hinted footprints are not near-rectangles "
                         f"(< {GABLE_RECT_MIN}) and got flat roofs in the OBJ")
    return warns


def fmt_bytes(n):
    return f"{n / 1024:.0f} KB" if n < 1024 * 1024 else f"{n / 1024 / 1024:.1f} MB"


def print_summary(m):
    c, n, t = m["counts"], m["nav"], m["timing_s"]
    print(f"== Holdout map pipeline: {m['name']} ==")
    print(f"play area     {m['extent_m'][0]:.0f} m x {m['extent_m'][1]:.0f} m  ({m['area_ha']:.1f} ha)")
    print(f"buildings     {c['buildings']} kept, {c['buildings_outside_bbox']} dropped (centroid outside bbox); "
          f"{m['building_density_per_ha']:.2f}/ha; coverage {m['building_coverage_pct']:.1f}%")
    print(f"heights       {m['heights']['inferred_pct']:.1f}% inferred  {m['heights']['sources']}")
    print(f"roofs         {m['roofs']}")
    print(f"roads         {c['road_ways']} ways -> {c['road_parts']} clipped parts ({c['road_ways_split']} split), "
          f"{n['walkable_length_m'] / 1000:.2f} km walkable")
    print(f"ground        {c['ground']} items {m['ground_area_m2']}")
    print(f"nav graph     {n['components']} components (largest {n['largest_component_length_pct']}% of length); "
          f"{n['near_miss_dangles']} dangling ends < {NAV_SNAP_HINT_M:.0f} m from another component -> "
          f"{n['components_if_snapped_5m']} if snapped")
    print(f"reachability  {n['buildings_within_reach_pct']}% of building centroids within {n['reach_m']:.0f} m of a walkable road "
          f"({n['buildings_within_reach_of_main_pct']}% via the main component); max {n['max_building_to_road_m']} m")
    print(f"free space    {n['free_space_reachable_pct']}% of open ground reachable from the main street network "
          f"({n['free_space_cell_m']:.0f} m raster); {n['unreachable_pockets']} unreachable pockets")
    print("timing        " + ", ".join(f"{k} {v:.2f} s" for k, v in t.items()))
    print("files         " + ", ".join(f"{k} {fmt_bytes(v)}" for k, v in m["files"].items()))
    if m["warnings"]:
        print("warnings:")
        for w in m["warnings"]:
            print(f"  - {w}")


def run(args):
    t_start = time.perf_counter()
    out = os.path.abspath(args.out)
    out_dir = os.path.dirname(out)
    os.makedirs(out_dir, exist_ok=True)
    origin = tuple(float(v) for v in args.origin.split(",")) if args.origin else None
    bbox = tuple(float(v) for v in args.bbox.split(",")) if args.bbox else None
    if bbox is not None and len(bbox) != 4:
        raise SystemExit("--bbox must be minlon,minlat,maxlon,maxlat")
    source = {}
    timing = {}

    if args.place:
        t = time.perf_counter()
        print("geocoding --place via Nominatim (text is not logged or stored)")
        hit = geocode(args.place)
        bbox = expand_bbox(hit["bbox"], args.margin_m)
        deg2 = check_bbox_size(bbox)
        if origin is None:
            origin = hit["centroid"]
        osm_path = args.osm_cache or os.path.join(out_dir, slugify(args.name) + ".osm")
        print(f"matched a {hit['category']}/{hit['type']} area; bbox {deg2:.5f} deg^2 incl. {args.margin_m:.0f} m margin; "
              "downloading /api/0.6/map")
        fetched = fetch_osm(bbox, osm_path)
        print(f"downloaded {fmt_bytes(fetched['bytes'])}: {fetched['nodes']} nodes, {fetched['ways']} ways; "
              f"stripped {fetched['addr_tags_stripped']} addr:* tags -> {os.path.basename(osm_path)}")
        source = {"mode": "fetch", "file": os.path.basename(osm_path), "margin_m": args.margin_m,
                  "matched": f"{hit['category']}/{hit['type']}"}
        timing["fetch"] = time.perf_counter() - t
    else:
        if not args.osm:
            raise SystemExit("give an .osm file path or --place")
        osm_path = args.osm
        source = {"mode": "file", "file": os.path.basename(osm_path)}

    t = time.perf_counter()
    level, info = convert(osm_path, origin, args.name, bbox)
    level["source"] = source
    timing["convert"] = time.perf_counter() - t

    t = time.perf_counter()
    nav, extras = nav_analysis(level)
    level["nav"] = nav
    timing["nav"] = time.perf_counter() - t

    files = {}
    with open(out, "w") as f:
        json.dump(level, f, separators=(",", ":"))
    files[os.path.basename(out)] = os.path.getsize(out)

    obj_stats = None
    if not args.no_obj:
        t = time.perf_counter()
        obj_path = os.path.join(out_dir, os.path.splitext(os.path.basename(out))[0] + ".obj")
        mtl_path = os.path.splitext(obj_path)[0] + ".mtl"
        obj_stats = write_obj(level, obj_path, mtl_path, up=args.obj_up)
        timing["obj"] = time.perf_counter() - t
        files[os.path.basename(obj_path)] = os.path.getsize(obj_path)
        files[os.path.basename(mtl_path)] = os.path.getsize(mtl_path)
    if not args.no_preview:
        t = time.perf_counter()
        png = os.path.join(out_dir, "preview.png")
        render_preview(level, png, extras)
        timing["preview"] = time.perf_counter() - t
        files["preview.png"] = os.path.getsize(png)
    timing["total"] = time.perf_counter() - t_start

    st = level["stats"]
    (xmin, ymin), (xmax, ymax) = level["bounds"]["min"], level["bounds"]["max"]
    area_m2 = (xmax - xmin) * (ymax - ymin)
    ground_area = {}
    for g in level["ground"]:
        if "area_m2" in g:
            ground_area[g["kind"]] = round(ground_area.get(g["kind"], 0) + g["area_m2"])
    metrics = {
        "schema": METRICS_SCHEMA,
        "name": level["name"],
        "source": source,
        "bbox_lonlat": level["geo"]["bbox_lonlat"],
        "extent_m": [round(xmax - xmin, 1), round(ymax - ymin, 1)],
        "area_m2": round(area_m2),
        "area_ha": round(area_m2 / 10_000, 2),
        "counts": {
            "buildings": st["buildings"], "buildings_outside_bbox": st["buildings_outside_bbox"],
            "buildings_untyped": info["untyped_buildings"],
            "road_ways": st["road_ways"], "road_parts": st["roads"], "road_ways_split": st["road_ways_split"],
            "road_ways_outside_bbox": st["road_ways_outside_bbox"],
            "ground": st["ground"], "ground_outside_bbox": st["ground_outside_bbox"],
            "barrier_ways": info["barrier_ways"], "tree_nodes": info["tree_nodes"],
        },
        "building_density_per_ha": round(st["buildings"] / (area_m2 / 10_000), 2) if area_m2 else 0.0,
        "building_coverage_pct": round(100.0 * sum(b["area_m2"] for b in level["buildings"]) / area_m2, 2) if area_m2 else 0.0,
        "heights": {"inferred_pct": st["heights_inferred_pct"], "sources": st["height_sources"]},
        "roofs": {**st["roofs"], "sources": info["roof_sources"],
                  **({"gable_meshes_in_obj": obj_stats["gable_meshes"]} if obj_stats else {})},
        "ground_area_m2": ground_area,
        "nav": nav,
        "obj": obj_stats,
        "timing_s": {k: round(v, 3) for k, v in timing.items()},
        "files": files,
        "warnings": build_warnings(level, info, nav, obj_stats),
    }
    mpath = os.path.join(out_dir, "metrics.json")
    with open(mpath, "w") as f:
        json.dump(metrics, f, indent=1)
    files["metrics.json"] = os.path.getsize(mpath)
    print_summary(metrics)
    return metrics


def main(argv=None):
    ap = argparse.ArgumentParser(description="OSM neighborhood -> Holdout level.json + Unreal blockout (PROTOTYPE)")
    ap.add_argument("osm", nargs="?", help="offline mode: path to an OSM XML extract")
    ap.add_argument("--place", help="fetch mode: geocode this text via Nominatim (never stored or logged)")
    ap.add_argument("--margin-m", type=float, default=100.0, help="fetch mode: margin around the matched area (m)")
    ap.add_argument("--osm-cache", help="fetch mode: where to save the downloaded .osm (default: <out dir>/<name slug>.osm)")
    ap.add_argument("--bbox", help="play area minlon,minlat,maxlon,maxlat (default: the .osm <bounds>)")
    ap.add_argument("--origin", help="lat,lon of the map origin (neighborhood centroid, never a home; default: bbox center)")
    ap.add_argument("--name", required=True, help="display name stored in level.json")
    ap.add_argument("--out", default=os.path.join(HERE, "data", "level.json"))
    ap.add_argument("--obj-up", choices=("y", "z"), default="y", help="OBJ up axis (default y = OBJ/Blender convention)")
    ap.add_argument("--no-obj", action="store_true")
    ap.add_argument("--no-preview", action="store_true")
    a = ap.parse_args(argv)
    if a.osm and a.place:
        ap.error("give either an .osm path or --place, not both")
    return run(a)


if __name__ == "__main__":
    main()
