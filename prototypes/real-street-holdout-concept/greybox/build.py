# PROTOTYPE - NOT FOR PRODUCTION
# Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
# Date: 2026-11-19
"""Regenerate greybox/index.html from src/ + ../pipeline/data/level.json + inlined three.js.

Usage:  python3 build.py [path/to/level.json]

Only these level fields are read: name, attribution, bounds, buildings[].{kind, footprint, area_m2,
height_m}, roads[].{kind, name, width_m, points}, ground[].{kind, polygon | line + width_m}.
Everything else (ids, geo origin, addresses, metadata) is dropped, so it never reaches index.html.
"""
import json
import math
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
LEVEL_PATH = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else HERE.parent / 'pipeline' / 'data' / 'level.json'
THREE_PATH = HERE / '.build' / 'node_modules' / 'three' / 'build' / 'three.module.min.js'
SRC = HERE / 'src'
OUT = HERE / 'index.html'

CLIP = 600.0                 # never keep geometry beyond +-600 m of the map centre
MAJOR = {'motorway', 'trunk', 'primary', 'secondary', 'tertiary'}
LANDMARK_KINDS = {'park', 'wood', 'grass', 'school', 'cemetery', 'pitch', 'recreation_ground', 'playground'}
SECTOR_RADIUS = 25.0
SECTOR_MIN_SPACING = 200.0
CORRIDOR_MIN_FROM_SPAWN = 250.0   # corridor sectors stay well away from the spawn point
MAX_SECTORS = 7


def r1(v):
    return round(v, 1)


def poly_area(p):
    return sum(p[i][0] * p[(i + 1) % len(p)][1] - p[(i + 1) % len(p)][0] * p[i][1] for i in range(len(p))) / 2.0


def centroid(p):
    a = poly_area(p)
    if abs(a) < 1e-6:
        return sum(q[0] for q in p) / len(p), sum(q[1] for q in p) / len(p)
    cx = cy = 0.0
    for i in range(len(p)):
        x0, y0 = p[i]
        x1, y1 = p[(i + 1) % len(p)]
        f = x0 * y1 - x1 * y0
        cx += (x0 + x1) * f
        cy += (y0 + y1) * f
    return cx / (6 * a), cy / (6 * a)


def pip(p, x, y):
    c = False
    j = len(p) - 1
    for i in range(len(p)):
        xi, yi = p[i]
        xj, yj = p[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            c = not c
        j = i
    return c


def seg_dist(px, py, a, b):
    dx, dy = b[0] - a[0], b[1] - a[1]
    l2 = dx * dx + dy * dy
    t = 0.0 if l2 == 0 else max(0.0, min(1.0, ((px - a[0]) * dx + (py - a[1]) * dy) / l2))
    return math.hypot(px - a[0] - t * dx, py - a[1] - t * dy)


def clip_polyline(pts, box):
    """Liang-Barsky per segment; returns list of polylines inside box."""
    x0, x1, y0, y1 = box
    out, cur = [], []
    for i in range(len(pts) - 1):
        (ax, ay), (bx, by) = pts[i], pts[i + 1]
        dx, dy = bx - ax, by - ay
        t0, t1, ok = 0.0, 1.0, True
        for p, q in ((-dx, ax - x0), (dx, x1 - ax), (-dy, ay - y0), (dy, y1 - ay)):
            if p == 0:
                if q < 0:
                    ok = False
                    break
            else:
                t = q / p
                if p < 0:
                    t0 = max(t0, t)
                else:
                    t1 = min(t1, t)
        if not ok or t0 > t1:
            if len(cur) > 1:
                out.append(cur)
            cur = []
            continue
        s = [ax + t0 * dx, ay + t0 * dy]
        e = [ax + t1 * dx, ay + t1 * dy]
        if cur and abs(cur[-1][0] - s[0]) < 1e-6 and abs(cur[-1][1] - s[1]) < 1e-6:
            cur.append(e)
        else:
            if len(cur) > 1:
                out.append(cur)
            cur = [s, e]
        if t1 < 1.0:
            out.append(cur)
            cur = []
    if len(cur) > 1:
        out.append(cur)
    return [[[r1(x), r1(y)] for x, y in pl] for pl in out]


def clip_polygon(pts, box):
    """Sutherland-Hodgman against an axis-aligned box."""
    x0, x1, y0, y1 = box
    def clip(poly, inside, inter):
        res = []
        for i in range(len(poly)):
            cur, prev = poly[i], poly[i - 1]
            if inside(cur):
                if not inside(prev):
                    res.append(inter(prev, cur))
                res.append(cur)
            elif inside(prev):
                res.append(inter(prev, cur))
        return res
    def ix(xc):
        return lambda a, b: [xc, a[1] + (b[1] - a[1]) * (xc - a[0]) / (b[0] - a[0])]
    def iy(yc):
        return lambda a, b: [a[0] + (b[0] - a[0]) * (yc - a[1]) / (b[1] - a[1]), yc]
    p = [list(q) for q in pts]
    for inside, inter in ((lambda q: q[0] >= x0, ix(x0)), (lambda q: q[0] <= x1, ix(x1)),
                          (lambda q: q[1] >= y0, iy(y0)), (lambda q: q[1] <= y1, iy(y1))):
        if not p:
            break
        p = clip(p, inside, inter)
    return [[r1(x), r1(y)] for x, y in p]


def seg_inter(a, b, c, d):
    (x1, y1), (x2, y2), (x3, y3), (x4, y4) = a, b, c, d
    den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if abs(den) < 1e-9:
        return None
    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
    u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den
    if -0.01 <= t <= 1.01 and -0.01 <= u <= 1.01:
        return (x1 + t * (x2 - x1), y1 + t * (y2 - y1))
    return None


def nearest_street(x, y, roads):
    best, bn = 1e18, None
    for r in roads:
        if not r.get('name'):
            continue
        p = r['points']
        for i in range(len(p) - 1):
            d = seg_dist(x, y, p[i], p[i + 1])
            if d < best:
                best, bn = d, r['name']
    return bn


def pick_sectors(buildings, roads, ground):
    """Capture sectors at public places only: large park/wood/grass polygons and major-road corridor
    junctions. Centres are never taken from a building."""
    cands = []
    bcent = [(b['_c'], b['footprint']) for b in buildings]

    def free_point(x, y):
        return not any(abs(c[0] - x) < 40 and abs(c[1] - y) < 40 and pip(fp, x, y) for c, fp in bcent)

    for g in ground:
        if g['kind'] not in LANDMARK_KINDS or 'polygon' not in g:
            continue
        poly = g['polygon']
        a = abs(poly_area(poly))
        if a < 5000:
            continue
        xs, ys = [q[0] for q in poly], [q[1] for q in poly]
        best = None
        y = min(ys)
        while y <= max(ys):
            x = min(xs)
            while x <= max(xs):
                if pip(poly, x, y) and free_point(x, y):
                    # prefer the edge of the open space that faces buildings (cover to fight over)
                    near = sum(1 for c, _ in bcent if 18 < math.hypot(c[0] - x, c[1] - y) < 50)
                    edge = min(seg_dist(x, y, poly[i], poly[(i + 1) % len(poly)]) for i in range(len(poly)))
                    score = near * 10 - abs(edge - 12) * 0.5
                    if best is None or score > best[0]:
                        best = (score, x, y)
                x += 6
            y += 6
        if best is None:
            continue
        kind = g['kind']
        label = {'park': 'Park', 'wood': 'Woods', 'grass': 'Green', 'school': 'School grounds',
                 'cemetery': 'Cemetery', 'pitch': 'Sports field'}.get(kind, 'Open space')
        street = nearest_street(best[1], best[2], roads)
        name = f'{label} off {street}' if street else label
        cands.append({'name': name, 'kind': kind, 'x': r1(best[1]), 'y': r1(best[2]),
                      'score': -math.hypot(best[1], best[2])})   # nearer open spaces first

    majors = [r for r in roads if r['kind'] in MAJOR and r.get('name')]
    seen = set()
    for m in majors:
        for r in roads:
            if r is m or not r.get('name') or r['name'] == m['name'] or r['kind'] in ('footway', 'cycleway', 'service'):
                continue
            key = (m['name'], r['name'])
            if key in seen:
                continue
            for i in range(len(m['points']) - 1):
                hit = None
                for j in range(len(r['points']) - 1):
                    hit = seg_inter(m['points'][i], m['points'][i + 1], r['points'][j], r['points'][j + 1])
                    if hit:
                        break
                if hit:
                    seen.add(key)
                    if math.hypot(*hit) >= CORRIDOR_MIN_FROM_SPAWN and free_point(*hit):
                        cands.append({'name': f"{m['name']} & {r['name']}", 'kind': 'corridor',
                                      'x': r1(hit[0]), 'y': r1(hit[1]), 'score': -math.hypot(*hit)})
                    break

    cands.sort(key=lambda c: -c['score'])
    chosen = []

    def spaced(c):
        return all(math.hypot(c['x'] - o['x'], c['y'] - o['y']) >= SECTOR_MIN_SPACING for o in chosen)
    # open spaces first (up to MAX-2), then corridor junctions fill the rest
    for c in [c for c in cands if c['kind'] != 'corridor']:
        if len(chosen) < MAX_SECTORS - 2 and spaced(c):
            chosen.append(c)
    for c in [c for c in cands if c['kind'] == 'corridor']:
        if len(chosen) < MAX_SECTORS and spaced(c):
            chosen.append(c)
    return [{'name': c['name'], 'kind': c['kind'], 'x': c['x'], 'y': c['y'], 'r': SECTOR_RADIUS} for c in chosen]


def process_level(level):
    schema = str(level.get('schema', ''))
    if not schema.startswith('holdout.level/'):
        print('WARNING: unexpected schema', schema)
    bmin, bmax = level['bounds']['min'], level['bounds']['max']
    box = (max(bmin[0], -CLIP), min(bmax[0], CLIP), max(bmin[1], -CLIP), min(bmax[1], CLIP))

    buildings = []
    for b in level['buildings']:
        fp = [[float(q[0]), float(q[1])] for q in b['footprint']]
        if len(fp) > 2 and fp[0] == fp[-1]:
            fp.pop()
        if len(fp) < 3:
            continue
        if poly_area(fp) < 0:
            fp.reverse()          # guarantee CCW
        cx, cy = centroid(fp)
        if not (box[0] <= cx <= box[1] and box[2] <= cy <= box[3]):
            continue
        area = float(b.get('area_m2') or abs(poly_area(fp)))
        buildings.append({'kind': str(b.get('kind') or 'yes'),
                          'footprint': [[round(x, 2), round(y, 2)] for x, y in fp],
                          'area_m2': round(area, 1),
                          'height_m': round(float(b.get('height_m') or 6.0), 1),
                          '_c': (cx, cy)})

    roads = []
    for r in level['roads']:
        for pl in clip_polyline(r['points'], box):
            if len(pl) >= 2:
                roads.append({'kind': r.get('kind', 'residential'), 'name': r.get('name'),
                              'width_m': float(r.get('width_m') or 6), 'points': pl})

    ground = []
    for g in level['ground']:
        if 'polygon' in g and g['polygon']:
            poly = clip_polygon(g['polygon'], box)
            if len(poly) >= 3 and abs(poly_area(poly)) > 4:
                ground.append({'kind': g['kind'], 'polygon': poly})
        elif 'line' in g and g['line']:
            for pl in clip_polyline(g['line'], box):
                ground.append({'kind': g['kind'], 'line': pl, 'width_m': float(g.get('width_m') or 3)})

    sectors = pick_sectors(buildings, roads, ground)
    for b in buildings:
        del b['_c']
    return {
        'name': level.get('name', 'Unknown map'),
        'attribution': level.get('attribution', 'Map data (c) OpenStreetMap contributors, ODbL 1.0'),
        'play': {'minX': r1(box[0]), 'maxX': r1(box[1]), 'minY': r1(box[2]), 'maxY': r1(box[3])},
        'buildings': buildings, 'roads': roads, 'ground': ground, 'sectors': sectors,
    }


def bundle_three():
    code = THREE_PATH.read_text(encoding='utf-8')
    m = re.search(r'export\s*\{([^}]*)\}\s*;?\s*$', code)
    if not m:
        sys.exit('could not find the export block in three.module.min.js')
    pairs = []
    for part in m.group(1).split(','):
        part = part.strip()
        if not part:
            continue
        if ' as ' in part:
            local, exported = [s.strip() for s in part.split(' as ')]
        else:
            local = exported = part
        pairs.append(f'{exported}:{local}')
    body = code[:m.start()] + 'return{' + ','.join(pairs) + '};'
    body = body.replace('</script', '<\\/script')
    return 'var THREE=(function(){"use strict";' + body + '\n})();'


def main():
    level = json.loads(LEVEL_PATH.read_text(encoding='utf-8'))
    lv = process_level(level)
    shell = (SRC / 'shell.html').read_text(encoding='utf-8')
    js_files = sorted(p for p in SRC.glob('*.js'))
    game = '\n'.join(p.read_text(encoding='utf-8') for p in js_files)
    game = '(function(){\n"use strict";\n' + game + '\n})();'
    level_js = 'var LEVEL=' + json.dumps(lv, separators=(',', ':')) + ';'
    for name, txt in (('game', game), ('level', level_js)):
        if '</script' in txt.lower():
            sys.exit(f'{name} contains a closing script tag')
    html = shell.replace('/*@@THREE@@*/', bundle_three()).replace('/*@@LEVEL@@*/', level_js).replace('/*@@GAME@@*/', game)
    OUT.write_text(html, encoding='utf-8')
    print(f"map: {lv['name']}  buildings {len(lv['buildings'])}  roads {len(lv['roads'])}  ground {len(lv['ground'])}")
    print('sectors:', ', '.join(f"{s['name']} ({s['kind']})" for s in lv['sectors']))
    print(f'wrote {OUT.name}: {OUT.stat().st_size / 1024:.0f} KB')


if __name__ == '__main__':
    main()
