# PROTOTYPE - NOT FOR PRODUCTION
# Question: Can any real OpenStreetMap neighborhood become a playable Holdout map with zero hand-editing?
# Date: 2026-11-19
#
# pytest suite for osm_to_level.py. Run from this folder:  python3 -m pytest -q test_osm_to_level.py
# Synthetic fixtures are placed at an arbitrary rural spot (40.0 N, -100.0 W); no real address data is used.

import json
import math
import os
import sys
import urllib.error
from xml.sax.saxutils import quoteattr

import pytest

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import osm_to_level as otl  # noqa: E402

DATA_OSM = os.path.join(HERE, "data", "tinley-park-60477.osm")
DATA_NAME = "Tinley Park, IL (60477)"
DATA_ORIGIN = "41.586328,-87.770554"   # map center (not any specific building)
SYN_ORIGIN = (40.0, -100.0)


# ----------------------------------------------------------------------------- helpers

def vincenty(lat1, lon1, lat2, lon2):
    """WGS84 inverse geodesic distance (Vincenty 1975), independent reference for the projection."""
    a, f = 6378137.0, 1 / 298.257223563
    b = (1 - f) * a
    L = math.radians(lon2 - lon1)
    U1 = math.atan((1 - f) * math.tan(math.radians(lat1)))
    U2 = math.atan((1 - f) * math.tan(math.radians(lat2)))
    sinU1, cosU1, sinU2, cosU2 = math.sin(U1), math.cos(U1), math.sin(U2), math.cos(U2)
    lam = L
    for _ in range(200):
        sinLam, cosLam = math.sin(lam), math.cos(lam)
        sinSigma = math.hypot(cosU2 * sinLam, cosU1 * sinU2 - sinU1 * cosU2 * cosLam)
        if sinSigma == 0:
            return 0.0
        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLam
        sigma = math.atan2(sinSigma, cosSigma)
        sinAlpha = cosU1 * cosU2 * sinLam / sinSigma
        cos2Alpha = 1 - sinAlpha ** 2
        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cos2Alpha if cos2Alpha else 0.0
        C = f / 16 * cos2Alpha * (4 + f * (4 - 3 * cos2Alpha))
        lam_prev = lam
        lam = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM ** 2)))
        if abs(lam - lam_prev) < 1e-13:
            break
    u2 = cos2Alpha * (a * a - b * b) / (b * b)
    A = 1 + u2 / 16384 * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)))
    B = u2 / 1024 * (256 + u2 * (-128 + u2 * (74 - 47 * u2)))
    dSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM ** 2)
                                                  - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma ** 2) * (-3 + 4 * cos2SigmaM ** 2)))
    return b * A * (sigma - dSigma)


def ll(x, y, origin=SYN_ORIGIN):
    mx, my = otl.m_per_deg(origin[0])
    return origin[0] + y / my, origin[1] + x / mx


def make_osm(path, ways, bounds_m=(-100, -100, 100, 100), relations=()):
    """ways: [(way_id, [(x, y), ...], {tags})] in local meters around SYN_ORIGIN; closed rings repeat point 0."""
    lat0, lon0 = ll(bounds_m[0], bounds_m[1])
    lat1, lon1 = ll(bounds_m[2], bounds_m[3])
    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<osm version="0.6" generator="test">',
             f' <bounds minlat="{lat0:.9f}" minlon="{lon0:.9f}" maxlat="{lat1:.9f}" maxlon="{lon1:.9f}"/>']
    way_lines, nid = [], 1
    for wid, pts, tags in ways:
        closed = len(pts) > 2 and tuple(pts[0]) == tuple(pts[-1])
        refs = []
        for i, p in enumerate(pts):
            if closed and i == len(pts) - 1:
                refs.append(refs[0])
                continue
            lat, lon = ll(*p)
            lines.append(f' <node id="{nid}" lat="{lat:.9f}" lon="{lon:.9f}"/>')
            refs.append(nid)
            nid += 1
        way_lines.append(f' <way id="{wid}">' + "".join(f'<nd ref="{r}"/>' for r in refs)
                         + "".join(f"<tag k={quoteattr(k)} v={quoteattr(v)}/>" for k, v in tags.items()) + "</way>")
    lines += way_lines + list(relations) + ["</osm>"]
    with open(path, "w") as f:
        f.write("\n".join(lines))
    return path


def basic_ways():
    return [
        (1, [(10, 10), (10, 20), (20, 20), (20, 10), (10, 10)], {"building": "house"}),                 # clockwise
        (2, [(-40, -40), (-30, -40), (-30, -30), (-40, -30), (-40, -40)], {"building": "yes"}),
        (3, [(90, 0), (130, 0), (130, 10), (90, 10), (90, 0)], {"building": "yes"}),                  # centroid outside
        (4, [(80, -50), (105, -50), (105, -40), (80, -40), (80, -50)], {"building": "garage"}),       # centroid inside
        (10, [(-150, 0), (150, 0)], {"highway": "residential", "name": "Test Road"}),
        (11, [(0, 0), (0, -60)], {"highway": "footway"}),
        (20, [(50, 50), (150, 50), (150, 150), (50, 150), (50, 50)], {"leisure": "park"}),             # partly outside
        (21, [(-90, 60), (-60, 60), (-60, 90), (-90, 90), (-90, 60)], {"natural": "water"}),
        (22, [(-120, -80), (120, -80)], {"waterway": "stream"}),
    ]


def read_obj_objects(path):
    V, objs, cur = [], {}, None
    for line in open(path):
        if line.startswith("v "):
            V.append(tuple(float(t) for t in line.split()[1:]))
        elif line.startswith("o "):
            cur = line.split()[1]
            objs[cur] = []
        elif line.startswith("f "):
            objs[cur].append([int(t) for t in line.split()[1:]])
    return V, objs


def closed_and_outward(V, faces):
    """Every directed edge used once and its reverse once (2-manifold, consistent winding), positive volume."""
    from collections import Counter
    key = lambda i: tuple(round(c, 3) for c in V[i - 1])  # noqa: E731
    E = Counter()
    for f in faces:
        for a, b in zip(f, f[1:] + f[:1]):
            E[(key(a), key(b))] += 1
    manifold = all(c == 1 and E.get((b, a), 0) == 1 for (a, b), c in E.items())
    vol = 0.0
    for f in faces:
        p0 = V[f[0] - 1]
        for i in range(1, len(f) - 1):
            p1, p2 = V[f[i] - 1], V[f[i + 1] - 1]
            vol += (p0[0] * (p1[1] * p2[2] - p1[2] * p2[1]) - p0[1] * (p1[0] * p2[2] - p1[2] * p2[0])
                    + p0[2] * (p1[0] * p2[1] - p1[1] * p2[0])) / 6
    return manifold, vol


# ----------------------------------------------------------------------------- projection

def test_vincenty_reference_is_sane():
    # one degree of longitude on the WGS84 equator = a * pi / 180
    assert vincenty(0, 0, 0, 1) == pytest.approx(6378137.0 * math.pi / 180, abs=0.01)


@pytest.mark.parametrize("dlat,dlon", [(0.0054, 0.0), (0.0, 0.0072), (0.0054, 0.0072), (-0.0054, -0.0072), (0.009, -0.011)])
def test_projection_distance_matches_geodesic(dlat, dlon):
    lat0, lon0 = 41.586328, -87.770554
    x, y = otl.project(lat0 + dlat, lon0 + dlon, lat0, lon0)
    true = vincenty(lat0, lon0, lat0 + dlat, lon0 + dlon)
    assert math.hypot(x, y) == pytest.approx(true, abs=0.25)  # <= 0.25 m over up to ~1.3 km (< 0.02 %)


def test_projection_axes_and_origin():
    lat0, lon0 = SYN_ORIGIN
    assert otl.project(lat0, lon0, lat0, lon0) == (0.0, 0.0)
    x, y = otl.project(lat0 + 0.001, lon0, lat0, lon0)
    assert x == 0 and y > 0                    # north is +y
    x, y = otl.project(lat0, lon0 + 0.001, lat0, lon0)
    assert x > 0 and y == 0                    # east is +x


# ----------------------------------------------------------------------------- winding / triangulation

def test_polygon_area_sign():
    ccw = [(0, 0), (10, 0), (10, 10), (0, 10)]
    assert otl.polygon_area(ccw) == pytest.approx(100)
    assert otl.polygon_area(ccw[::-1]) == pytest.approx(-100)


def test_buildings_stored_counter_clockwise(tmp_path):
    p = make_osm(tmp_path / "w.osm", basic_ways())
    level, _ = otl.convert(str(p), SYN_ORIGIN, "t")
    b1 = next(b for b in level["buildings"] if b["id"] == 1)
    assert otl.polygon_area(b1["footprint"]) > 0          # input was clockwise
    assert b1["area_m2"] == pytest.approx(100, abs=0.2)
    for b in level["buildings"]:
        assert otl.polygon_area(b["footprint"]) > 0
    for g in level["ground"]:
        if "polygon" in g:
            assert otl.polygon_area(g["polygon"]) > 0


def test_triangulate_concave_l_shape_covers_area():
    L = [(0, 0), (10, 0), (10, 4), (4, 4), (4, 10), (0, 10)]
    tris = otl.triangulate(L)
    assert len(tris) == 4
    total = sum(abs(otl.polygon_area([L[a], L[b], L[c]])) for a, b, c in tris)
    assert total == pytest.approx(otl.polygon_area(L))
    assert all(otl.polygon_area([L[a], L[b], L[c]]) > 0 for a, b, c in tris)


# ----------------------------------------------------------------------------- clipping

RECT = (0.0, 0.0, 10.0, 10.0)


def test_line_crossing_box_is_clipped_to_edges():
    assert otl.clip_polyline([(-10, 5), (20, 5)], RECT) == [[(0.0, 5.0), (10.0, 5.0)]]
    assert otl.clip_polyline([(-5, -5), (15, 15)], RECT) == [[(0.0, 0.0), (10.0, 10.0)]]


def test_line_leaving_and_reentering_gives_two_parts():
    parts = otl.clip_polyline([(2, 2), (15, 2), (15, 8), (2, 8)], RECT)
    assert parts == [[(2.0, 2.0), (10.0, 2.0)], [(10.0, 8.0), (2.0, 8.0)]]


def test_line_fully_outside_or_inside():
    assert otl.clip_polyline([(-5, -5), (-1, 20)], RECT) == []
    assert otl.clip_polyline([(1, 1), (2, 3), (4, 4)], RECT) == [[(1.0, 1.0), (2.0, 3.0), (4.0, 4.0)]]


def test_polygon_partly_outside_is_clipped():
    sq = [(-5, 0), (5, 0), (5, 10), (-5, 10)]
    out = otl.clip_polygon(sq, RECT)
    assert otl.polygon_area(out) == pytest.approx(50)
    assert all(otl.point_in_rect(p, RECT, 1e-9) for p in out)
    concave = [(-5, -5), (8, -5), (8, 3), (3, 3), (3, 15), (-5, 15)]   # L-shape poking out of two sides
    out = otl.clip_polygon(concave, RECT)
    assert otl.polygon_area(out) == pytest.approx(8 * 3 + 3 * 7)
    assert otl.clip_polygon([(20, 20), (30, 20), (30, 30)], RECT) == []


def test_convert_clips_to_bbox(tmp_path):
    p = make_osm(tmp_path / "c.osm", basic_ways())
    level, _ = otl.convert(str(p), SYN_ORIGIN, "t")
    (x0, y0), (x1, y1) = level["bounds"]["min"], level["bounds"]["max"]
    assert (x0, y0, x1, y1) == pytest.approx((-100, -100, 100, 100), abs=0.02)
    ids = {b["id"] for b in level["buildings"]}
    assert ids == {1, 2, 4}                                    # 3 dropped: centroid outside
    assert level["stats"]["buildings_outside_bbox"] == 1
    road = next(r for r in level["roads"] if r["id"] == 10)
    assert road["points"][0] == pytest.approx([-100, 0], abs=0.02)
    assert road["points"][-1] == pytest.approx([100, 0], abs=0.02)
    park = next(g for g in level["ground"] if g["id"] == 20)
    assert park["area_m2"] == pytest.approx(2500, abs=2)
    stream = next(g for g in level["ground"] if g["id"] == 22)
    assert stream["line"][0][0] == pytest.approx(-100, abs=0.02)


def test_explicit_bbox_overrides_file_bounds(tmp_path):
    p = make_osm(tmp_path / "b.osm", basic_ways())
    lat0, lon0 = ll(-50, -50)
    lat1, lon1 = ll(50, 50)
    level, _ = otl.convert(str(p), SYN_ORIGIN, "t", bbox=(lon0, lat0, lon1, lat1))
    (x0, y0), (x1, y1) = level["bounds"]["min"], level["bounds"]["max"]
    assert (x0, y0, x1, y1) == pytest.approx((-50, -50, 50, 50), abs=0.02)
    assert {b["id"] for b in level["buildings"]} == {1, 2}


# ----------------------------------------------------------------------------- height / roof inference

def test_height_precedence():
    assert otl.infer_height({"building": "house", "height": "12", "building:levels": "2"}, 200) == (12.0, "osm:height")
    assert otl.infer_height({"building": "house", "building:levels": "2"}, 200) == (7.5, "osm:levels")
    h, src = otl.infer_height({"building": "house"}, 200)
    assert src.startswith("inferred") and h == 7.5


def test_height_parsing_and_fallbacks():
    assert otl.infer_height({"height": "12 m"}, 50)[0] == pytest.approx(12)
    assert otl.infer_height({"height": "40 ft"}, 50)[0] == pytest.approx(12.192)
    assert otl.infer_height({"height": "tall", "building:levels": "3"}, 50) == (10.5, "osm:levels")
    assert otl.infer_height({"building:levels": "2;3"}, 50)[1].startswith("inferred")
    assert otl.infer_height({"building": "garage"}, 30) == (3.5, "inferred:type")
    assert otl.infer_height({"building": "house"}, 100) == (5.5, "inferred:type+area")
    assert otl.infer_height({"building": "yes"}, 500) == (9.0, "inferred:area")


def test_roof_hint():
    assert otl.infer_roof({"building": "house"}, 150) == ("gable", "inferred:type")
    assert otl.infer_roof({"building": "yes"}, 150) == ("gable", "inferred:area")
    assert otl.infer_roof({"building": "yes"}, 900) == ("flat", "inferred:area")
    assert otl.infer_roof({"building": "house", "roof:shape": "flat"}, 150) == ("flat", "osm:roof:shape")
    assert otl.infer_roof({"building": "retail", "roof:shape": "hipped"}, 900) == ("gable", "osm:roof:shape")


def test_height_source_recorded_and_inferred_pct(tmp_path):
    ways = basic_ways()
    ways[0] = (1, ways[0][1], {"building": "house", "height": "9"})
    level, _ = otl.convert(str(make_osm(tmp_path / "h.osm", ways)), SYN_ORIGIN, "t")
    srcs = {b["id"]: b["height_source"] for b in level["buildings"]}
    assert srcs[1] == "osm:height"
    assert level["stats"]["heights_inferred_pct"] == pytest.approx(100 * 2 / 3, abs=0.1)


# ----------------------------------------------------------------------------- OBJ export

def test_obj_gable_house_is_closed_and_has_ridge(tmp_path):
    ways = [(5, [(0, 0), (16, 0), (16, 10), (0, 10), (0, 0)], {"building": "house"}),
            (6, [(30, 0), (40, 0), (40, 4), (34, 4), (34, 10), (30, 10), (30, 0)], {"building": "house"}),  # L: flat
            (10, [(-90, -20), (90, -20)], {"highway": "residential"})]
    level, _ = otl.convert(str(make_osm(tmp_path / "g.osm", ways)), SYN_ORIGIN, "t")
    otl.nav_analysis(level)
    obj, mtl = tmp_path / "g.obj", tmp_path / "g.mtl"
    stats = otl.write_obj(level, str(obj), str(mtl), up="z")
    assert stats["gable_meshes"] == 1
    V, objs = read_obj_objects(obj)
    house = next(b for b in level["buildings"] if b["id"] == 5)
    zs = {round(V[i - 1][2], 2) for f in objs["bld_5"] for i in f}
    assert house["height_m"] in zs                                       # ridge
    assert round(house["height_m"] - house["roof_height_m"], 2) in zs    # eaves
    for name in ("bld_5", "bld_6"):
        manifold, vol = closed_and_outward(V, objs[name])
        assert manifold and vol > 0
    assert "newmtl bld_wall" in mtl.read_text()


# ----------------------------------------------------------------------------- privacy

SENTINEL_HN = "HN-31337"
SENTINEL_STREET = "Sentinel Privet Lane"
SENTINEL_PLACE = "PLACE-TEXT-SENTINEL 99 Example Street"


def _private_ways():
    ways = basic_ways()
    ways[0] = (1, ways[0][1], {"building": "house", "addr:housenumber": SENTINEL_HN, "addr:street": SENTINEL_STREET,
                               "addr:postcode": "00000"})
    return ways


def _assert_clean(paths, extra=()):
    for p in paths:
        text = open(p, "rb").read().decode("utf-8", "replace")
        assert "addr:" not in text, p
        for s in (SENTINEL_HN, SENTINEL_STREET, SENTINEL_PLACE) + tuple(extra):
            assert s not in text, (p, s)


def test_no_addr_data_in_outputs(tmp_path, capsys):
    osm = make_osm(tmp_path / "p.osm", _private_ways())
    out = tmp_path / "out" / "level.json"
    otl.main([str(osm), "--name", "Privacy Test", "--origin", "40.0,-100.0", "--out", str(out)])
    level = json.loads(out.read_text())
    assert all(b["address"] is None for b in level["buildings"])
    _assert_clean([out, out.parent / "metrics.json", out.parent / "level.obj"])
    cap = capsys.readouterr()
    assert SENTINEL_HN not in cap.out + cap.err and SENTINEL_STREET not in cap.out + cap.err


def _fake_http(tmp_path, place_rank=20, osm_status=200):
    poly = [list(reversed(ll(x, y))) for x, y in ((-60, -60), (60, -60), (60, 60), (-60, 60), (-60, -60))]
    nominatim = [{"place_rank": place_rank, "osm_type": "relation", "category": "landuse", "type": "residential",
                  "addresstype": "neighbourhood" if place_rank < 30 else "house",
                  "display_name": SENTINEL_PLACE, "lat": "40.0", "lon": "-100.0",
                  "boundingbox": ["39.99", "40.01", "-100.01", "-99.99"],
                  "geojson": {"type": "Polygon", "coordinates": [poly]}}]
    osm_bytes = open(make_osm(tmp_path / "src.osm", _private_ways(), bounds_m=(-170, -170, 170, 170)), "rb").read()
    calls = []

    def fake(url, timeout=120):
        calls.append(url)
        if "nominatim" in url:
            return json.dumps(nominatim).encode()
        if "/api/0.6/map" in url:
            if osm_status != 200:
                raise urllib.error.HTTPError(url, osm_status, "Bad Request", {}, _Body(
                    b"You requested too many nodes (limit is 50000). Either request a smaller area, or use planet.osm"))
            return osm_bytes
        raise AssertionError("unexpected URL")
    return fake, calls


class _Body:
    def __init__(self, data):
        self.data = data

    def read(self, *a):
        return self.data

    def close(self):
        pass


def test_fetch_mode_never_stores_place_text(tmp_path, monkeypatch, capsys):
    fake, calls = _fake_http(tmp_path)
    monkeypatch.setattr(otl, "http_get", fake)
    monkeypatch.setattr(otl.time, "sleep", lambda s: None)
    out = tmp_path / "fetched" / "level.json"
    m = otl.main(["--place", SENTINEL_PLACE, "--name", "Fetched Area", "--margin-m", "100", "--out", str(out)])
    assert len(calls) == 2 and "nominatim" in calls[0]
    cache = out.parent / "fetched-area.osm"
    assert cache.exists()
    files = [out, out.parent / "metrics.json", out.parent / "level.obj", cache]
    _assert_clean(files)
    cap = capsys.readouterr()
    assert SENTINEL_PLACE not in cap.out + cap.err
    level = json.loads(out.read_text())
    assert level["name"] == "Fetched Area" and level["source"]["mode"] == "fetch"
    # bbox = matched polygon (+-60 m) + 100 m margin on each side
    (x0, y0), (x1, y1) = level["bounds"]["min"], level["bounds"]["max"]
    assert x1 - x0 == pytest.approx(320, abs=1) and y1 - y0 == pytest.approx(320, abs=1)
    assert m["counts"]["buildings"] >= 2


def test_fetch_refuses_single_address_match(tmp_path, monkeypatch):
    fake, calls = _fake_http(tmp_path, place_rank=30)
    monkeypatch.setattr(otl, "http_get", fake)
    monkeypatch.setattr(otl.time, "sleep", lambda s: None)
    with pytest.raises(SystemExit) as e:
        otl.main(["--place", SENTINEL_PLACE, "--name", "x", "--out", str(tmp_path / "x" / "level.json")])
    assert "single address" in str(e.value) and SENTINEL_PLACE not in str(e.value)
    assert not any("/api/0.6/map" in c for c in calls)
    assert not (tmp_path / "x" / "level.json").exists()


def test_fetch_refuses_oversize_bbox():
    with pytest.raises(SystemExit) as e:
        otl.check_bbox_size((-88.5, 41.0, -87.5, 41.5))     # 0.5 deg^2
    assert "0.25" in str(e.value)
    assert otl.check_bbox_size((-100.01, 39.99, -99.99, 40.01)) < 0.25


def test_fetch_reports_node_limit(tmp_path, monkeypatch):
    fake, _ = _fake_http(tmp_path, osm_status=400)
    monkeypatch.setattr(otl, "http_get", fake)
    monkeypatch.setattr(otl.time, "sleep", lambda s: None)
    with pytest.raises(SystemExit) as e:
        otl.main(["--place", SENTINEL_PLACE, "--name", "x", "--out", str(tmp_path / "y" / "level.json")])
    assert "50,000" in str(e.value) and SENTINEL_PLACE not in str(e.value)


# ----------------------------------------------------------------------------- end to end on the cached extract

@pytest.fixture(scope="module")
def e2e(tmp_path_factory):
    out = tmp_path_factory.mktemp("e2e") / "level.json"
    metrics = otl.main([DATA_OSM, "--name", DATA_NAME, "--origin", DATA_ORIGIN, "--out", str(out)])
    return out, json.loads(out.read_text()), metrics


def test_e2e_schema_is_backward_compatible(e2e):
    _, level, _ = e2e
    assert level["schema"] == "holdout.level/0.2"
    for k in ("name", "attribution", "units", "bounds", "buildings", "roads", "ground", "stats"):
        assert k in level
    b = level["buildings"][0]
    for k, t in (("id", int), ("kind", str), ("footprint", list), ("area_m2", float), ("height_m", float),
                 ("height_source", str)):
        assert isinstance(b[k], t), k
    assert b["address"] is None and b["roof"] in ("gable", "flat")
    r = level["roads"][0]
    for k, t in (("id", int), ("kind", str), ("width_m", (int, float)), ("points", list)):
        assert isinstance(r[k], t), k
    assert all(("polygon" in g) != ("line" in g) for g in level["ground"])
    for k in ("height_sources", "skipped_open_buildings", "skipped_missing_nodes", "buildings", "roads", "ground"):
        assert k in level["stats"]


def test_e2e_clipped_to_file_bounds(e2e):
    _, level, _ = e2e
    (x0, y0), (x1, y1) = level["bounds"]["min"], level["bounds"]["max"]
    assert x1 - x0 == pytest.approx(1202, abs=5) and y1 - y0 == pytest.approx(1197, abs=5)
    rect = (x0, y0, x1, y1)
    assert all(otl.point_in_rect(b["centroid"], rect) for b in level["buildings"])
    assert all(otl.point_in_rect(p, rect, 0.02) for r in level["roads"] for p in r["points"])
    assert all(otl.point_in_rect(p, rect, 0.02) for g in level["ground"] for p in g.get("polygon", g.get("line")))
    assert level["stats"]["buildings"] == 745 and level["stats"]["buildings_outside_bbox"] == 11
    assert level["stats"]["heights_inferred_pct"] == 100.0
    assert {"167th Street"} <= {r["name"] for r in level["roads"]}


def test_e2e_outputs_and_metrics(e2e):
    out, level, metrics = e2e
    d = out.parent
    assert (d / "preview.png").read_bytes()[:8] == b"\x89PNG\r\n\x1a\n"
    V, objs = read_obj_objects(d / "level.obj")
    blds = [n for n in objs if n.startswith("bld_")]
    assert len(blds) == len(level["buildings"])
    assert {f"bld_{b['id']}" for b in level["buildings"]} == set(blds)
    bad = [n for n in blds if not (lambda mv: mv[0] and mv[1] > 0)(closed_and_outward(V, objs[n]))]
    assert bad == []
    assert "mtllib level.mtl" in (d / "level.obj").read_text()[:2000]
    m = json.loads((d / "metrics.json").read_text())
    for k in ("counts", "area_ha", "building_density_per_ha", "heights", "nav", "timing_s", "files", "warnings"):
        assert k in m
    assert m == json.loads(json.dumps(metrics))
    assert m["nav"]["components"] >= 1
    assert 0 <= m["nav"]["buildings_within_reach_pct"] <= 100
    assert all(r["component"] >= 0 for r in level["roads"])


def test_e2e_no_private_data(e2e):
    out, level, _ = e2e
    for p in (out, out.parent / "metrics.json", out.parent / "level.obj"):
        assert "addr:" not in p.read_text()
    assert all(b["address"] is None for b in level["buildings"])
