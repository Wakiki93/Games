# Real-street Holdout: map pipeline

> **PROTOTYPE - NOT FOR PRODUCTION**
> Question: Can any real OpenStreetMap neighborhood become a playable Holdout map with zero hand-editing?
> Date: 2026-11-19

**Status: in-progress.** This folder is the technical half of the concept. The browser greybox in
`../greybox/` reads `data/level.json` and tests the gameplay half.

## Hypothesis (technical half)

**Any OSM neighborhood can become a playable map with zero hand-editing.** In practice, the pipeline
should take a place name or an `.osm` extract and, in seconds, produce:

- clipped, metric geometry for the play area (about 1 km²);
- a height and a roof for every building, even when OSM has no height tags;
- a street graph where zombies and players can path everywhere without manual fixes;
- an Unreal blockout with one closed mesh per building.

`metrics.json` measures each of these on every run.

## How to run

Requirements: Python 3.10+, `numpy`, `matplotlib`, `pytest` (`pip install numpy matplotlib pytest`).

```bash
cd prototypes/real-street-holdout-concept/pipeline

# Offline: regenerate every output from the cached extract (the primary dataset).
python3 osm_to_level.py data/tinley-park-60477.osm --name "Tinley Park, IL (60477)" \
    --origin 41.586328,-87.770554 --out data/level.json

# Optional: a smaller play area inside the extract (minlon,minlat,maxlon,maxlat).
# Without --bbox, the play area is the file's <bounds> element.
# Use the --bbox=... form, because the values start with a minus sign.
python3 osm_to_level.py data/tinley-park-60477.osm --name "..." --origin 41.586328,-87.770554 \
    --bbox=<minlon>,<minlat>,<maxlon>,<maxlat> --out /tmp/small/level.json

# Fetch: geocode a neighborhood or park via Nominatim and download /api/0.6/map
# (the matched area's polygon bbox plus --margin-m on each side, 100 m by default).
python3 osm_to_level.py --place "<neighborhood, city>" --name "<display name>" --out data/level.json

# Tests (30, about 3 s)
python3 -m pytest -q test_osm_to_level.py
```

The defaults are good for normal use. These flags are for special cases:

| Flag | Effect |
|---|---|
| `--osm-cache PATH` | Where fetch mode saves the downloaded `.osm` (default `<out dir>/<name slug>.osm`) |
| `--obj-up y\|z` | Up axis of the OBJ (default `y`) |
| `--no-obj` | Skip the OBJ export |
| `--no-preview` | Skip the preview image |

### Fetch-mode guard rails

- Requests send `User-Agent: HoldoutMapPipeline/0.1 (game prototype)`. The script makes at most one Nominatim request per second.
- It refuses a bbox over the API's 0.25 deg² limit before downloading. If the API rejects a request with HTTP 400 because it exceeds 50,000 nodes, the script reports that limit.
- It refuses a geocode hit that is a single address or building (`place_rank >= 30`), because a margin around one house would single out that house.
- It never writes the `--place` text to disk, `level.json`, `metrics.json` or the log. Only the resulting bbox and the user-supplied `--name` are kept.
- It strips `addr:*` tags from the downloaded XML **before** saving the cache file.

## Outputs (`data/`)

| File | What it is |
|---|---|
| `tinley-park-60477.osm` | Cached OSM extract (input), bbox lon -87.77776..-87.76335, lat 41.58094..41.59172 |
| `level.json` | Level data, schema `holdout.level/0.2` (see below). The greybox reads this file. |
| `level.obj` + `level.mtl` | Unreal blockout: ground plane, ground areas, road ribbons, one closed prism per building (gable or flat roof) |
| `preview.png` | Top-down render showing buildings shaded by height, roads at true width, ground kinds, scale bar, north arrow and OSM attribution. Buildings more than 40 m from a road are outlined red. |
| `metrics.json` | Counts, area, building density, % of heights inferred, navigation report, timing, file sizes, warnings |

## `level.json` schema (`holdout.level/0.2`)

Units are meters: x = east, y = north, z = up. The origin is the map center (`--origin`), never a specific building.

Version 0.2 is a superset of 0.1. Every 0.1 field keeps its name and type, and fields marked *(0.2)* are new.

- `schema`, `name`, `attribution`, `units`
- `bounds` `{min:[x,y], max:[x,y]}` is the **clipped play area**: the bbox rectangle in local meters.
- *(0.2)* `geo` `{origin_lat, origin_lon, bbox_lonlat:[minlon,minlat,maxlon,maxlat], projection}`
- *(0.2)* `source` `{mode: "file"|"fetch", file, margin_m?, matched?}`
- `buildings[]`
  - 0.1 fields: `id` (OSM way id), `kind` (OSM `building=` value), `footprint` (CCW ring, not closed), `area_m2`, `height_m` (total height to the ridge, OSM convention), `height_source`, and `address` (always `null`).
  - `height_source` is one of `osm:height`, `osm:levels`, `inferred:type`, `inferred:type+area` or `inferred:area`. Precedence is height > building:levels > inferred.
  - *(0.2)* `centroid`, `roof` (`"gable"|"flat"`), `roof_source`, `roof_height_m` (0 for flat roofs), `obb` `{cx,cy,length,width,angle_deg}` (minimum-area oriented box; the long axis is the ridge) and `rectangularity` (footprint area / obb area).
  - Buildings whose centroid lies outside the bbox are dropped. A kept building's footprint may extend up to a few meters past `bounds`.
- `roads[]`
  - 0.1 fields: `id`, `kind` (OSM `highway=`), `name`, `width_m`, `points` (polyline clipped to the bbox).
  - *(0.2)* `part`: a way that leaves and re-enters the bbox becomes several entries with the **same `id`** and different `part` values.
  - *(0.2)* `length_m`, and `component` (nav-graph component rank, where 0 is the main street network).
- `ground[]`
  - Each item has `id` and `kind`, plus either `polygon` (CCW, clipped) or `line` + `width_m` (clipped).
  - Polygon kinds: `park`, `grass`, `wood`, `scrub`, `water`, `parking`, and *(0.2)* `cemetery` and `schoolyard`.
  - Line kinds: `stream` and *(0.2)* `rail`.
  - *(0.2)* Optional fields: `area_m2`, `part`, `name` (a public feature name such as a park or creek), and `relation` (when the item came from a multipolygon).
- `stats`: the 0.1 keys, plus clipping counters, `heights_inferred_pct` and `roofs`.
- *(0.2)* `nav`: the navigation report (same as `metrics.json` → `nav`).

## Unreal import (blockout)

`level.obj` is in **meters** and uses the OBJ/Blender convention, **right-handed Y-up**: X = east, Y = up, Z = south.
`--obj-up z` writes right-handed Z-up instead (X = east, Y = north, Z = up).

Unreal is **left-handed, Z-up, centimeters**. The mapping from level coordinates is:

```
X_ue = x * 100        (east)
Y_ue = -y * 100       (north is -Y in UE)
Z_ue = z * 100        (up)
```

In terms of the default Y-up OBJ, that is `X_ue = 100·X_obj, Y_ue = 100·Z_obj, Z_ue = 100·Y_obj`: a Y↔Z swap, which
is also the right-handed to left-handed flip. UE's OBJ/FBX importers convert Y-up files to Z-up, so import with a
**uniform scale of 100**.

**This hasn't been checked in the UE 5.8 editor yet.** After importing, confirm the result with the red
25 m pillar `marker_north`: it sits on the north edge, so it must land at **negative UE Y**. If it doesn't, rotate
the import.

Object names:

| Object | Name |
|---|---|
| Ground plane | `ground_plane` |
| Ground areas | `gnd_<kind>_<id>` |
| Roads | `road_<id>[_p<part>]`, 5-11 cm above the ground; bigger roads sit higher to avoid z-fighting |
| Buildings | `bld_<osm id>` |

Each building is a closed, 2-manifold, outward-wound prism (bottom cap included). Gable roofs are generated only
when `rectangularity >= 0.85`; all other buildings get a flat top at `height_m`. Because every building is a
separate closed mesh, each can later become a Geometry Collection (Fracture mode).

## Findings so far (2026-11-19, `tinley-park-60477.osm`)

The area is a suburban neighborhood in Tinley Park, IL, on both sides of 167th Street: Kimberly Heights to
the north and Lancaster Highlands to the south.

**Notable real features:**

- 167th Street, a secondary road crossing east-west
- Oak Forest Avenue and the Metra rail line (southeast)
- Tinley Creek and the Tinley Creek Green Paved Trail
- Lancaster Woods Park, Lewis Park and Vogt Woods Park
- Kimberley Heights School grounds
- Zion Lutheran Cemetery

**Conversion**

- **Play area:** 1202 m × 1197 m (143.9 ha), clipped to the file's bounds.
  - Before clipping, `/map` ways sprawled the geometry to about 2.4 km.
- **Speed:** the whole run takes **1.6 s** (convert 0.08 s, nav 0.89 s, OBJ 0.06 s, preview 0.57 s).
  - Output sizes: `level.json` 345 KB, `level.obj` 687 KB, `preview.png` 573 KB.
- **Buildings:** 745 kept and 11 dropped (centroid outside the bbox).
  - Density is 5.2 buildings/ha and footprint coverage is 9.4%.
  - Types: 325 `house`, **398 untyped `yes`**, 20 `garage`, 2 `apartments`.
- **Heights: 100% inferred.**
  - None of the buildings carry a `height` or `building:levels` tag.
  - The heuristic yields only 6 distinct heights (6.5 m ×342, 7.5 m ×280, 9.0 m ×52, 5.5 m ×45, 3.5 m ×20, 3.0 m ×6), so the skyline is uniform.
- **Roofs:** 693 gable hints and 52 flat.
  - 524 buildings got a real gable mesh.
  - 169 gable-hinted footprints are L-shapes or other non-rectangles (rectangularity < 0.85) and fall back to a flat top. For reference, the median rectangularity is 0.998 and the 25th percentile is 0.844.
- **Roads:** 163 ways become 164 clipped parts (1 way leaves and re-enters the bbox).
  - That is 26.7 km of walkable network, including sidewalks.
- **Ground:**
  - Polygons: wood 19.9 ha, park 7.6 ha, grass 6.9 ha, cemetery 2.5 ha, school grounds 1.5 ha, water 0.9 ha.
  - Lines: Tinley Creek and the rail line.
- **OBJ:** 942 objects, 14,604 vertices and 13,523 faces.
  - All 745 building meshes are closed with outward winding. A test checks this.

**Navigation sanity.** The street graph merges nodes within 0.5 m. It has 914 nodes and 997 edges.

- **Components:** 6.
  - The main component holds **95.8%** of the walkable length.
  - **All 5 minor components touch the bbox edge**: Oak Forest Avenue (736 m), the Tinley Creek trail (160 m), Skyline Drive (150 m), Parkside Drive (45 m) and a 19 m service road. They join the network outside the play area, so they are clipping artifacts.
  - **0** dangling road ends inside the play area lie within 5 m of another component, so there are no OSM junction errors to fix.
  - In-game, these minor roads are dead ends at the map wall, and players can still cross the lawns to reach them.
- **Building reach:** **95.2%** of building centroids are within 40 m of a walkable road (93.2% via the main component).
  - The 36 buildings further out are mostly 45-100 m² untyped outbuildings and garages in back yards (29 `yes`, 6 `garage`, 1 `house`).
  - The furthest is 67.6 m from a road.
- **Free space:** **100%** of the 129 ha of open ground is reachable from the main street network on a 1 m raster, with 0 enclosed pockets.
  - This only happens because the extract has **0 `barrier=*` ways and 0 trees**: every yard is open.
  - Real suburbs are fenced, so the walkable area of an OSM-only map is far more open than the real place.

**Fetch-mode smoke test.** Run on a public Manhattan park, Washington Square Park, with a 100 m margin.

- The area came out 526 m × 479 m: 7,456 nodes, fetched in 2.3 s.
- 1,800 `addr:*` tags were stripped before caching.
- **99.1% of building heights came from OSM tags** (0.9% inferred), against 0% from tags in Tinley Park. Missing heights are a problem of US-suburb data coverage, not of the pipeline.
- With dense courtyards, the free-space check behaves differently: 94.7% of open ground is reachable, with 178 enclosed pockets.

**Verdict so far: yes for geometry, no for character.** Geometry, clipping, the street graph and the UE
blockout all work on two very different areas with no hand edits. A suburban OSM map, though, is a flat, open
field of near-identical boxes.

The missing pieces are verticality, fences, trees and terrain. They should come from procedural dressing rules,
such as a fence per parcel edge, trees per yard and height variation, rather than from hand editing. Those rules
are the next thing to prototype.

## Known gaps

- **Heights are all inferred in US suburbs.**
  - Type and area heuristics give a plausible but monotonous skyline.
  - No building has storeys, so there are no second floors to defend.
  - Untyped `building=yes` (53%) is guessed purely from footprint size.
- **No trees, fences, hedges or terrain elevation in OSM here.**
  - The ground is a flat plane at z = 0.
  - Yards are open, so the free-space connectivity check is trivially 100%.
  - Cover and chokepoints must be generated.
- **Gable roofs only on near-rectangles.** 24% of gable-hinted footprints (169 of 693, mostly L-shapes) get flat tops in the OBJ.
- **Clipping at the play-area edge cuts the street graph.** The game needs a boundary treatment, such as blocking volumes or "road continues" props.
- **Partial multipolygon support.**
  - Only closed outer ways are used. Inner rings (holes) are ignored: 3 here.
  - Open outer chains are not stitched together.
  - `leisure=nature_reserve` and `landuse=residential` are not rendered.
- **Simplified roads.** Widths come from the road class. Lanes, sidewalks-as-tags, bridges and `layer` are ignored.
  - Road ribbons overlap at junctions, and there are no intersection meshes.
- **Unverified UE import.** The UE axis conversion is documented but hasn't been checked in the UE 5.8 editor (see the marker check above).
- **ODbL attribution must ship in the game credits.**
  - The credits need: "Map data © OpenStreetMap contributors, ODbL 1.0".
  - Derived databases (`level.json`) fall under ODbL share-alike if distributed.

## Privacy

The repository is public. Code, tests and outputs must never contain:

- a street address or house number;
- the `--place` text;
- coordinates of any specific building used as a reference point.

`addr:*` tags are never copied, and fetch mode strips them from the cache. Tests enforce this with sentinel values,
including fetch mode with a mocked network.

The only reference coordinates stored are the map center (`--origin`) and the bbox.
