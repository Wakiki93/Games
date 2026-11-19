<!-- PROTOTYPE - NOT FOR PRODUCTION
     Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
     Date: 2026-11-19 -->
# Holdout: real-street greybox (browser concept prototype)

**Status: in-progress** (built 2026-11-19; no human playtest yet)

This is a throwaway, single-player browser greybox. It tests the **concept**, not the feel. The final game is
a 4-player online co-op shooter in Unreal Engine 5.8.

## Hypothesis

> If players defend a real neighborhood they recognize, where every building is cover that can be destroyed
> (by the horde or by the players), they will make tactical choices about which structures to protect or
> sacrifice. We will know this is true if, in a 10-minute session, the player deliberately changes position or
> tactic at least twice because a building was destroyed, and recognizes real places unprompted.

What to watch in a session:
- The **REPOSITIONS AFTER DESTRUCTION** counter in the F3 panel. It must reach 2 or more in about 10 minutes.
- Whether the player names real places (streets, the creek woods, the cemetery, the school grounds, 167th Street)
  **without being asked**. The observer writes this down; the game does not measure it.

## How to play

Double-click `index.html`. It is self-contained and works from `file://` with no network and no server. Click to
start, which captures the mouse. Esc pauses.

| Key | Action |
| ---- | ---- |
| WASD / Shift | Move / sprint (sprint uses stamina) |
| Mouse, LMB, RMB | Look, fire, aim down sights (optics zoom) |
| R | Reload |
| 1 / 2 / mouse wheel | Rifle / bat (melee weapon slot) |
| V | Melee swing (costs stamina; arc hit with knockback) |
| C (hold), or RMB with the bat | Block. Each hit taken drains stamina. Pressing block **within 200 ms before a hit lands** is a **parry**: the zombie is staggered, the parry costs no stamina and refunds 15, and you get a crit window |
| G | **Sapper breach charge**. You start with 2; extras cost 300. It sticks to walls, damages zombies **and buildings**, and leaves rubble that opens sightlines and horde routes |
| F (hold 1 s) | **Sapper Reinforce tool** (the class gadget; the brief's "Engineer repair tool"). Reinforces the building you are looking at (+60% HP, shown in road-marking yellow), or repairs it if it is already reinforced. Costs Salvage. Works during rounds and intermissions |
| Q | Ping/spot the zombie or building under the crosshair (world marker) |
| B | Buy screen (only between rounds); Enter = ready up |
| M / F3 | Minimap on/off / debug and instrumentation panel |
| L | Free-look: look with plain mouse movement when the page cannot capture the mouse |
| Arrow keys | Turn and look up/down (useful in free-look when the cursor reaches the window edge) |

### The loop

Names follow `design/gdd/game-concept.md`.

1. **Round**. Shamblers come first; Runners join from round 2 and Breachers from round 3. The active cap is
   24 (solo starts lower), and the rest wait in a queue. Zombies spawn 60–120 m from you, out of line of sight,
   preferring real street cells (ingress points).
2. **Objective sector**. Each round, one real public place is the objective; its capture zone is 50 m across
   (25 m radius), and the **Objective sectors** section explains how they are chosen. The states follow the
   concept doc:
   - **HORDE-HELD**: the starting state.
   - **CAPTURING**: you are inside and no zombies are; capture takes 20 s.
   - **CONTESTED**: zombies are inside too; progress pauses.
   - **HELD**: you own the sector. It gives a **supply point** (one ammo refill per round) and a hold bonus that
     grows at 8 Salvage/s. At round end it pays 100 income plus the bonus.
   - **OVERRUN**: 3 or more zombies are inside and you have been away for 10 s. Progress drains over 20 s. At
     zero the sector is **lost**: no income, the hold bonus is forfeited, and you lose 200 Salvage.

   About half the horde, and the first Breacher of each round, head for the sector.
3. **Destruction cuts both ways**. Every building has HP that scales with its footprint. **Breachers** besiege the
   cover around their objective (they prefer reinforced buildings) and smash through anything in their path.
   **Your breach charges** also wreck buildings. A destroyed building shakes, sinks and throws dust, then becomes a
   low rubble slab. Rubble blocks neither movement nor sight, opens new routes (the flow field is rebuilt), and slows
   anyone crossing it to 60% speed. Destroyed buildings stay destroyed; only standing buildings can be reinforced
   or repaired.
4. **Intermission** (20 s; ready-up skips it). Spend **Salvage** on attachments, breach charges, ammo, or a patch-up
   of nearby walls. The next objective is shown, so you can reposition.
5. **Fail state**: health reaches 0 → an "OVERRUN" summary (rounds survived, kills, buildings lost, repositions after
   destruction, sector stats). It has Restart and **Download session log (JSON)**.

**Rifle: projectile ballistics.** Bullets are simulated with a muzzle velocity of 700 m/s (scaled for readable
drop, as the concept allows), gravity drop and travel time; visible streaks show their flight. Recoil is a weighty
vertical kick that recovers on its own, and spread grows as you keep firing. Damage falls off with range. The MVP
attachment slots match the concept doc (optic, muzzle, barrel), and every attachment is a trade-off:

| Slot | Attachment | Gain | Cost |
| ---- | ---- | ---- | ---- |
| Optic | Red-dot sight (350) | 1.45x zoom, tighter ADS | slightly slower ADS |
| Optic | 3x scope (650) | 3x zoom, very tight ADS | slow ADS, field of view, worse hip-fire |
| Muzzle | Compensator (450) | -45% vertical recoil | more side kick, bigger flash |
| Muzzle | Suppressor (500) | no flash, -20% recoil | velocity 595 m/s (more drop and lead), handling, earlier falloff |
| Barrel | Long barrel (400) | 820 m/s, -15% recoil | handling (slower ADS and reload) |
| Barrel | Short barrel (300) | ADS 30% faster, faster reload | 600 m/s, +20% recoil |

**Salvage income**:
- hit +10, kill +60, headshot kill +100;
- **melee kill +130** (the melee bonus from the concept);
- Breacher kill +300;
- round clear +50 × round;
- held-sector income (100) plus the hold bonus.

## Instrumentation

The F3 panel shows:
- fps
- round, phase and time in round
- zombies alive and queued
- kills
- buildings intact, destroyed (horde vs player) and reinforced
- player position in meters (x east, y north, from the map center)
- nearest street name
- health and stamina
- **repositions after destruction**
- sector state and **sector held time**
- **pings used**
- flow-field rebuild timings
- melee, block and parry counts
- draw calls

**Repositions after destruction** counts these: a building within 30 m of the player is destroyed, and within 20 s
the player moves more than 25 m from where they stood when it fell. One move counts once, even if several
collapses triggered it. The rule is silent (no on-screen hint), so it does not prompt the behavior. Every event
(collapse, reinforce, purchase, sector capture or loss, ping, reposition, death) goes into the session log,
which you can download from the summary screen.

**Autotest:** open `index.html?autotest=1` (optional `&speed=5&rounds=5`). A scripted bot needs no pointer
lock. It:
- melees and parries in round 1;
- buys attachments and charges;
- uses the Reinforce tool;
- demolishes a building with a breach charge;
- captures sectors;
- pings;
- repositions after nearby collapses;
- surrenders in round 5 to reach the fail state.

It writes `window.__holdoutTest` and logs `HOLDOUT_TEST_RESULT {...}` to the console. The result includes rounds
reached, kills, buildings destroyed, flow-field rebuild ms (per job, and per collapse in ms and frames), CPU ms
per step, fps, melee/parry counts, sector held time, pings used, repositions after destruction, and any errors.

`node verify.js` runs it headless in Playwright. It answers the bot's screenshot handshake, saves `screens/*.png`,
asserts there are no console errors, and saves a 1280×720 normal-mode start screen. **Headless fps uses software
GL and is not a performance measurement.** For performance, read the `cpu` block, or open the page on real
hardware and press F3.

## Rebuild / swap the map

**Mouse capture fallback.** Some embedded viewers refuse or ignore mouse capture (pointer lock). If the first
capture request fails, or two in a row fail later, the game switches to free-look by itself and says so on screen;
`L` toggles it by hand. Checked headlessly with capture refused, silently ignored and allowed.

**Hosted variant.** `python3 build.py --hosted OUT.html` also writes a page fragment (no doctype/html/head/body)
for viewers that wrap the page themselves. It is the same game with the session-log download button hidden,
because such viewers block page-started downloads. The fragment is a build output and is not committed.

```
cd greybox/.build && npm install          # three@0.170.0 (pinned in .build/package.json; .build/ is git-ignored)
cd .. && python3 build.py                 # or: python3 build.py path/to/other/level.json
node verify.js                            # optional headless check
```

`build.py` does the following:
- Inlines three.js. It wraps `three.module.min.js` in a function, so it needs no import map, blob, or network.
- Concatenates `src/*.js` into `src/shell.html`.
- Inlines a clipped copy of the level, which it processes like this:
  - Clips to the level's own bounds, capped at ±600 m.
  - Drops buildings whose centroid is outside that area.
  - Clips roads and ground polygons.
  - Picks the objective sectors.
  - Keeps only `name`, `attribution`, `bounds`, the `buildings[].{kind, footprint, area_m2, height_m}`, `roads[]`,
    and `ground[]` fields. Ids, geo origin, addresses and all other metadata never reach `index.html`.

### Objective sectors

Generic rules that work for any map:
- Park, wood, grass, schoolyard, cemetery and sports polygons of at least 5,000 m², with the center inside the
  open space, on the edge that faces buildings. These are the cover to fight over.
- "Corridor" junctions where a secondary or larger road meets a named street, at least 250 m from the spawn.

Centers are never taken from a building. Labels follow the safeguards in concept doc §6.1:
- Sensitive sites get generic labels: "School Grounds", "Cemetery".
- Woods next to a stream are "Creek Woods".
- Other spaces are labelled by kind plus nearest street.
- No subdivision names are used.

One per-map hint, taken from the concept doc, puts the **"167th Street"** home-corridor sector at the Ridgeland
Avenue crossing. On the current data the build picks seven sectors:
- Creek Woods
- Cemetery
- Park off Scott Court
- School Grounds
- Park off Willow Lane Drive
- 167th Street
- 167th Street & Patricia Avenue

## Assumptions made

- Matched to the concept doc (it exists, and was revised during this build):
  - **Salvage** (one currency), **Round**, **Wave** and **Intermission** (20 s, ready-up).
  - **Shambler/Runner/Breacher**, active cap 24, parry refunds stamina, melee kills pay a bonus.
  - Trade-off attachments in the MVP slots (optic, muzzle, barrel).
  - Sector states and the overrun rule; held-sector income and supply point.
  - Ping durations: 5 s, or 8 s for Breachers.
  - The **Sapper** kit: Reinforce tool and 2 breach charges, extras 300.
  - Fortify costs 100–250, and destroyed buildings cannot be repaired.
  - "Survey Grade" color meanings: yellow = fortification you own, red = danger and structural failure, cyan = UI,
    green-grey = horde. The light fails as the rounds climb.
- **Compressed for a 10-minute test:**
  - Runners arrive in round 2 (the concept says ~4) and Breachers in round 3 (the concept says ~8).
  - Sector capture takes 20 s; the concept's solo value is 30 s.
  - There is one objective sector per round, not the concept's multi-sector frontline.
  - Destruction is **whole-building HP**, not the concept's panels.
- **Buy screen between rounds.** The brief asked for one. The concept rejects trader menus in favour of in-world
  caches and workbenches, so this is a stand-in.
- **Breach charges are thrown with G** and stick to walls. The brief asked for grenades; the concept describes a
  *placed* charge.
- **Extended magazine dropped.** It was an example in the brief, but the concept moves it to the Vertical Slice and
  uses a barrel slot instead.
- Health regenerates after 4.5 s without damage. The concept does not say.
- A zombie that is stuck, or more than 170 m away, re-enters from a hidden spawn. The last 3 zombies of a round
  sprint at you.
- Lewis Park is half outside the current extract, so its fields are not a sector. The "Park off Willow Lane Drive"
  is the open space at the west edge.

## Out of scope for this greybox (need multiple players or the real engine)

- Roles/classes: the Sapper's Reinforce tool and breach charge are the one role kit included. Corpsman,
  Quartermaster, Spotter (sensor) and role selection are out of scope.
- Revive and the downed state, squad spawn and sector spawn, redeploy, salvage give.
- Co-op, netcode, synced destruction, counter-push and evac rounds, the far-zombie tier.
- Panelized destruction, interiors and rooftops.
- Sector armories, workbenches and garage caches.
- Directional or heavy melee swings, and shove.

## Known limits

- **Single-player, browser.** Input latency, hit registration and animation are placeholders, so **gun and melee
  FEEL is NOT being tested here**. That is the Unreal feel prototype's job.
- Headless autotest fps (~10) comes from software GL. The merged building mesh is about 740 footprints, roughly
  37k triangles and about 50 draw calls, so a mid laptop should be GPU-light. Confirm with F3 on real hardware.
- Each flow-field job is a Dijkstra pass over a 2 m grid of about 360k cells, taking about 5–35 ms. Jobs are
  time-sliced at 4 ms per frame, so a collapse re-routes the horde after a few frames instead of hitching. The
  2 m grid can close side yards narrower than about 2 m.
- Breachers steer straight at their siege target and smash whatever blocks them. This is deliberately crude.
- Rubble is a flat slab with debris boxes and does not block anything; the concept allows rubble that blocks
  paths.

## Files

- `index.html`: the built, self-contained prototype (regenerated by `build.py`).
- `build.py`: the build (level clipping, sector picking, inlining).
- `verify.js`: the headless Playwright check.
- `src/`: `shell.html` (UI and CSS) plus the JS modules:

  | Module | Contents |
  | ---- | ---- |
  | `00_config` | tuning values |
  | `10_world` | renderer, map, merged buildings, spatial queries, street names, sectors |
  | `20_nav` | grid, sliced flow fields, spawns |
  | `30_fx` | effects |
  | `40_game` | Salvage, destruction, reposition metric, sectors, rounds |
  | `50_zombies` | the horde |
  | `60_player` | player, ballistics, melee, gadgets, viewmodel |
  | `70_ui` | HUD and screens |
  | `80_bot` | autotest bot |
  | `90_main` | main loop |

- `screens/`: verification screenshots.

## Findings

None yet. Fill this in after human playtests.
