# PROTOTYPE - NOT FOR PRODUCTION
# Question: Can any real OpenStreetMap neighborhood become a playable Holdout map with zero hand-editing?
# Date: 2026-11-19
#
# Converts an OSM XML extract (from https://api.openstreetmap.org/api/0.6/map?bbox=...)
# into level.json: buildings (footprint polygons + inferred heights), roads (polylines + widths),
# and ground areas (parks, woods, water) in local meters around a chosen origin.
#
# Coordinates: x = meters east of origin, y = meters north of origin, z = up.
# Unreal import (later): UE is left-handed, Z-up, centimeters -> X = x*100, Y = -y*100, Z = z*100.
#
# Data (c) OpenStreetMap contributors, ODbL 1.0. https://www.openstreetmap.org/copyright
#
# Usage: python3 osm_to_level.py data/lancaster-highlands.osm --name "Lancaster Highlands, Tinley Park IL" \
#            --origin 41.5849928,-87.7719624 --out data/level.json

import argparse
import json
import math
import xml.etree.ElementTree as ET

ROAD_WIDTH_M = {
    "motorway": 14, "trunk": 13, "primary": 12, "secondary": 11, "tertiary": 10,
    "residential": 8, "unclassified": 7, "service": 5, "living_street": 6,
    "footway": 2, "path": 1.5, "cycleway": 2.5, "pedestrian": 4, "steps": 2, "track": 3,
}

GROUND_KINDS = {
    ("leisure", "park"): "park", ("leisure", "garden"): "park", ("landuse", "grass"): "grass",
    ("landuse", "meadow"): "grass", ("natural", "wood"): "wood", ("natural", "scrub"): "scrub",
    ("natural", "water"): "water", ("landuse", "forest"): "wood", ("leisure", "pitch"): "grass",
    ("amenity", "parking"): "parking",
}

M_PER_DEG_LAT = 111_320.0


def project(lat, lon, lat0, lon0):
    """Equirectangular projection: accurate to well under 1 m over a few km."""
    x = (lon - lon0) * M_PER_DEG_LAT * math.cos(math.radians(lat0))
    y = (lat - lat0) * M_PER_DEG_LAT
    return round(x, 2), round(y, 2)


def polygon_area(pts):
    a = 0.0
    for (x1, y1), (x2, y2) in zip(pts, pts[1:] + pts[:1]):
        a += x1 * y2 - x2 * y1
    return a / 2.0


def infer_height(tags, area_m2):
    """OSM height/levels when present; otherwise inferred from type and footprint size."""
    if "height" in tags:
        try:
            return float(tags["height"].split()[0]), "osm:height"
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


def convert(osm_path, origin, name):
    root = ET.parse(osm_path).getroot()
    lat0, lon0 = origin
    nodes = {n.get("id"): (float(n.get("lat")), float(n.get("lon"))) for n in root.findall("node")}

    buildings, roads, ground = [], [], []
    stats = {"height_sources": {}, "skipped_open_buildings": 0, "skipped_missing_nodes": 0}

    for w in root.findall("way"):
        tags = {t.get("k"): t.get("v") for t in w.findall("tag")}
        refs = [nd.get("ref") for nd in w.findall("nd")]
        if any(r not in nodes for r in refs):
            stats["skipped_missing_nodes"] += 1
            continue
        pts = [project(*nodes[r], lat0, lon0) for r in refs]

        if "building" in tags:
            if len(pts) < 4 or pts[0] != pts[-1]:
                stats["skipped_open_buildings"] += 1
                continue
            ring = pts[:-1]
            area = polygon_area(ring)
            if area < 0:  # store counter-clockwise
                ring.reverse()
                area = -area
            h, src = infer_height(tags, area)
            stats["height_sources"][src] = stats["height_sources"].get(src, 0) + 1
            buildings.append({
                "id": int(w.get("id")),
                "kind": tags.get("building"),
                "footprint": [list(p) for p in ring],
                "area_m2": round(area, 1),
                "height_m": h,
                "height_source": src,
                "address": None,  # deliberately not copied: the repo is public
            })
        elif "highway" in tags and tags["highway"] in ROAD_WIDTH_M:
            roads.append({
                "id": int(w.get("id")),
                "kind": tags["highway"],
                "name": tags.get("name"),
                "width_m": ROAD_WIDTH_M[tags["highway"]],
                "points": [list(p) for p in pts],
            })
        else:
            for (k, v), kind in GROUND_KINDS.items():
                if tags.get(k) == v and len(pts) >= 4 and pts[0] == pts[-1]:
                    ground.append({"id": int(w.get("id")), "kind": kind, "polygon": [list(p) for p in pts[:-1]]})
                    break
            else:
                if tags.get("waterway") in ("stream", "river", "ditch", "canal"):
                    ground.append({"id": int(w.get("id")), "kind": "stream", "line": [list(p) for p in pts], "width_m": 3})

    xs = [p[0] for b in buildings for p in b["footprint"]] + [p[0] for r in roads for p in r["points"]]
    ys = [p[1] for b in buildings for p in b["footprint"]] + [p[1] for r in roads for p in r["points"]]
    return {
        "schema": "holdout.level/0.1",
        "name": name,
        "attribution": "Map data (c) OpenStreetMap contributors, ODbL 1.0 - https://www.openstreetmap.org/copyright",
        "units": "meters; x=east, y=north, z=up; origin is the neighborhood centroid",
        "bounds": {"min": [min(xs), min(ys)], "max": [max(xs), max(ys)]},
        "buildings": buildings,
        "roads": roads,
        "ground": ground,
        "stats": {**stats, "buildings": len(buildings), "roads": len(roads), "ground": len(ground)},
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("osm")
    ap.add_argument("--origin", required=True, help="lat,lon of the map origin (use the neighborhood centroid, never a home)")
    ap.add_argument("--name", required=True)
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    lat0, lon0 = (float(v) for v in a.origin.split(","))
    level = convert(a.osm, (lat0, lon0), a.name)
    with open(a.out, "w") as f:
        json.dump(level, f, separators=(",", ":"))
    print(json.dumps(level["stats"], indent=1))
    print("bounds", level["bounds"])


if __name__ == "__main__":
    main()
