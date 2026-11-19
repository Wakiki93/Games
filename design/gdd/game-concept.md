# Game Concept: Holdout

*Created: 2026-11-19*
*Status: Draft (Under Review). The user still has to confirm the assumptions in the Assumptions and Decisions Log*

> **Creative Director Review (CD-PILLARS)**: REVISED 2026-11-19. First pass returned CONCERNS (3 items); the pillars were revised and the re-check returned APPROVE
> **Art Director Review (AD-CONCEPT-VISUAL)**: STRONG 2026-11-19. "Survey Grade" chosen as the Visual Identity Anchor (assumption A15)
> **Technical Director Review (TD-FEASIBILITY)**: CONCERNS (accepted) 2026-11-19. Viable only with the mitigations in Technical Risks
> **Producer Review (PR-SCOPE)**: OPTIMISTIC 2026-11-19. All five adjustments were applied (see Director Gate Reviews)
>
> **How this draft was made.** `/brainstorm` ran non-interactively. Settings: `workflow: full`, `review_mode: full`,
> `automation: guided`, `docs.density: thorough`. The user supplied the concept and it is authoritative. For that reason
> Phase 1 (creative discovery) and Phase 2 (three alternative concepts) did not run. The facilitator made every
> design call the skill would normally ask the user about, and logged each one under **Assumptions and Decisions Log**
> so the user can overrule it. **No director agent ran any of the four gates.** Subagent spawning was not available
> in this session, so the facilitating agent checked the concept against each gate's definition file itself. Treat
> the verdicts as self-reviews, and re-run them with the director agents (see Next Steps).

---

## Elevator Pitch

> **Holdout is a first-person, four-player co-op zombie survival game played on real neighborhoods built from
> map data. You survive escalating rounds with guns you customise and melee you master. Between rounds you
> decide which walls to reinforce and which to blow open, because every hole you make is also a way in.**

**10-second version:** *"Round-based co-op zombie survival in a real neighborhood, where you choose which walls come
down."*

---

## Core Identity

| Aspect | Detail |
| ---- | ---- |
| **Genre** | First-person shooter / co-op horde survival (round-based holdout). Sub-genres: first-person melee action, tactical destruction |
| **Platform** | PC (Windows) on Steam. Mouse and keyboard first. Controller support after the MVP |
| **Target Audience** | Mid-core to hardcore co-op FPS players aged 18–35 who play with a regular group of 2–4 friends (see Target Player Profile) |
| **Player Count** | 1–4 online co-op. Designed for 2–4; solo is supported as a scaled mode. No PvP |
| **Session Length** | A match runs 30–90 min. The first evac window is at round 10 (about 35–45 min). Typical match: 45–75 min |
| **Monetization** | Premium (assumed USD 19.99–24.99). Possible cosmetic-only DLC after launch; never paid power (A10) |
| **Estimated Scope** | Large (30–36 months, team of 5, an assumption; see A14 and Scope Tiers) |
| **Comparable Titles** | *Call of Duty* Zombies mode (round structure); *Killing Floor 2* (wave co-op with spending between waves); *Warhammer: Vermintide 2* (first-person melee and guns against hordes). Destruction references: *Rainbow Six Siege*, *The Finals* |

---

## Core Fantasy

**You and three friends make a last stand in a place you actually know** (the corner shop, the bus stop, the block
you walk every day) against a horde that grows every round. You are defender and demolisher at once. You hold the
line with a rifle you built up attachment by attachment and a blade you have learned to parry with. You reshape the
neighborhood itself, wall by wall, to survive one more round, until the streets you recognise are a ruin of your own
making.

Why choose this over other horde shooters? Three things:

1. **Recognition.** The map is real. "That's my street" is an emotional hook no hand-made map can offer.
2. **Authorship of the arena.** By round 15 the map is the team's own creation: every breach, barricade and
   collapse is a decision they made, and they live with it.
3. **Skill in both hands.** Gunplay and melee are both deep. A perfect parry is as satisfying as a headshot.

---

## Unique Hook

> **"Like round-based zombie survival, AND ALSO the map is a real neighborhood, and every wall can come down, for
> you or for them."**

- **Explainable in one sentence:** yes, see above.
- **Novel:** we know of no shipped round-based horde game that combines real-world map data with destruction
  that persists for the whole match and that both the players and the horde use. *This is unverified. Confirm it with
  competitive research before any marketing claim (Open Question Q7).*
- **Connected to the core fantasy:** real places give recognition; two-edged destruction gives authorship.
- **Affects gameplay, not just looks:** destruction changes routes, chokepoints, sightlines and cover. Real
  geography sets where the team can hold and how the horde arrives.

Skilled melee is **not** the hook. Other games already do it well, so for us it is a quality bar (Pillar 3).

---

## Player Experience Analysis (MDA Framework)

### Target Aesthetics (What the player FEELS)

| Aesthetic | Priority | How We Deliver It |
| ---- | ---- | ---- |
| **Challenge** (obstacle course, mastery) | 1 | Escalating rounds with no ceiling; parry timing; aim; a salvage economy where every purchase has an opportunity cost; high-round records |
| **Fellowship** (social connection) | 2 | Four-player division of labour: covering, fortifying, reviving, sharing salvage, callouts. One player cannot hold every door |
| **Sensation** (sensory pleasure) | 3 | Weighty gun feel; melee hit-stop and dismemberment; walls cracking, breaching and collapsing; positional horde audio |
| **Fantasy** (make-believe, role-playing) | 4 | "Defend your own neighborhood": real streets, recognisable landmarks, the last-stand siege fantasy |
| **Discovery** (exploration, secrets) | 5 | Learning a real neighborhood's geometry; finding caches placed by real shop types; finding out what destruction can do |
| **Expression** (self-expression, creativity) | 6 | Weapon and attachment builds; the team's fortify/breach "plan" for each map; cosmetics |
| **Narrative** (drama, story arc) | 7 | Emergent stories only ("we collapsed the bakery to block the street and lost our rooftop"). No authored campaign |
| **Submission** (relaxation, comfort zone) | N/A | Not a goal. Rounds 1–3 give a gentle warm-up, but the game is about rising pressure |

### Key Dynamics (Emergent player behaviors)

- **Teams form a "holdout plan" for each neighborhood:** which building to anchor in, which walls to reinforce, which
  to breach for an escape route, and when to open the next zone.
- **Salvage arguments become strategy.** "Fortify the back door or buy the rifle?" is a team conversation every
  intermission.
- **Deliberate demolition with consequences.** Players collapse a facade to choke a street, and five rounds later
  regret losing that rooftop.
- **Fluid weapon switching.** Melee in early rounds to save ammo and earn more salvage; guns for mass threats; melee
  again when a Grabber pins a teammate.
- **Roles emerge without classes.** A "door keeper" repairs and parries at the breach, an "overwatch" holds a
  rooftop with an optic, a "runner" fetches supply drops and kites.
- **Players go looking for "their" place.** They share screenshots of a neighborhood they recognise, which doubles
  as a marketing loop.
- **The arena degrades.** Late rounds are fought in a ruin the team made, so no two matches end on the same map.

### Core Mechanics (Systems we build)

1. **A round-based escalating horde:** an active-zombie cap with a spawn queue, spawning from real ingress points
   (street ends, alleys, openings, breaches).
2. **The salvage economy:** earned by fighting, repairing and reviving; spent on firepower, fortification,
   demolition and territory.
3. **Panelized, server-authoritative destruction and fortification:** synced to every client and usable by players
   and horde alike.
4. **First-person combat:** gunplay with modular attachments, plus directional melee with block, parry, shove and
   stamina.
5. **A pipeline from OpenStreetMap to a playable level:** real footprints, heights and streets, plus an automatically
   proposed gameplay layer that a designer polishes.

---

## Player Motivation Profile

### Primary Psychological Needs Served

| Need | How This Game Satisfies It | Strength |
| ---- | ---- | ---- |
| **Autonomy** (freedom, meaningful choice) | Where to hold, what to buy, which walls to reinforce or destroy, which zone to open, and how to build a weapon. The map itself responds to the team's choices | Core |
| **Competence** (mastery, skill growth) | Parry windows, aim, stamina management, reading horde routes, planning salvage, beating your best round on a map | Core |
| **Relatedness** (connection, belonging) | Interdependence (revives, callouts, sharing salvage, splitting the defence) plus attachment to place ("our street") | Core |

### Player Type Appeal (Bartle Taxonomy)

- [x] **Achievers** (primary). How: high-round records per map and party size, weapon mastery challenges, horizontal unlocks, evac victories.
- [x] **Socializers** (primary). How: four-player co-op built around hand-offs, pinging, sharing salvage, and friends recognising each other's neighborhoods.
- [x] **Explorers** (secondary). How: learning how destruction works, learning real neighborhoods, finding caches placed by real shop types, discovering new cities.
- [x] **Killers/Competitors** (tertiary). How: leaderboards only. There is no PvP (anti-pillar).

**Quantic Foundry fit.** Primary: **Action** (Destruction, Excitement) and **Social** (Community). Secondary:
**Mastery** (Challenge, Strategy) and **Achievement** (Completion). Tertiary: **Creativity** (Design: fortification
layouts). Low: **Immersion** (Story, Fantasy role-play).

**Who it is not for:** PvP-first players; solo story seekers; freeform base-builders; cozy/relaxation players;
players who want a persistent open-world survival sim.

### Flow State Design

- **Onboarding curve:**
  - Round 0 happens inside the spawn building. A cache next to spawn teaches buying, a damaged window teaches
    fortifying, and a scripted telegraphed lunge teaches parry.
  - Rounds 1–3 use only Shamblers.
  - The first 10 minutes introduce, in order: shoot and melee → parry → fortify → buy a gun → open a zone. The first
    breach charge appears around round 5.
  - An optional firing range doubles as the lobby, so players can test weapons and parry timing while waiting.
- **Difficulty scaling:**
  - Zombie count and health rise each round.
  - New zombie types arrive at fixed rounds (see The Horde).
  - Escalation is also environmental: damage accumulates and the light fails.
  - Waves scale with party size.
  - There is a lobby difficulty choice (three levels). There is no hidden rubber-banding.
- **Feedback clarity:**
  - Hit markers, melee hit-stop, and a distinct flash and sound on parry.
  - Salvage pop-ups.
  - Wall panels show readable damage stages (cracks → hole → gone).
  - A round counter and a count of zombies remaining.
  - The post-match summary shows the round reached against your best, plus how salvage split between firepower,
    fortification and demolition.
- **Recovery from failure:**
  - A downed player can be revived.
  - A dead player returns at the start of the next round.
  - A full wipe returns the team to the lobby in under 30 seconds with a one-click restart on the same map.
  - Failure teaches: a post-match "breach map" shows where the horde got in.

---

## Core Loop

**Phase 3 calls (logged as A1):**
- *Primary feel of the core action:* **desperate but skilful.** Heavy, readable, punishing when you are sloppy.
- *Most important design variable:* **world reactivity.** How much the arena changes because of the players and the
  horde.

### Moment-to-Moment (30 seconds)

Aim and fire, or swing, parry and shove. Reload and switch between gun and melee. Shift between cover and the door
you hold. Patch a window or reinforce a cracking wall mid-fight. Revive a teammate. The loop is satisfying on its
own for three reasons:

- **Weighty feedback:** recoil, hit-stop, dismemberment, a parry stagger.
- **Two scarce resources pulling against each other:** ammo and stamina. Melee costs stamina but saves ammo and pays
  more salvage.
- **The world reacts:** the wall you defend visibly breaks down, which keeps urgency up without a timer.

### Short-Term (5–15 minutes)

A **round** (1–6 minutes, longer in later rounds) followed by an **intermission** (20 s base; a ready-up vote skips
it; 45 s before evac rounds). In each intermission the team spends salvage on firepower, fortification, demolition or
territory, then repositions. The "one more round" pull comes from:

- the round counter;
- the next zombie type arriving;
- the evac window at round 10;
- the plan that is almost complete ("one more reinforced wall and the bakery holds").

| Round | Approx. length | Notes |
| ---- | ---- | ---- |
| 1 | ~1 min | Shamblers only; tutorial pacing |
| 10 | ~3–4 min | Runners and Breachers in the mix; first evac window |
| 20 | ~5–6 min | Full roster; much of the neighborhood is damaged |

*These are starting targets. The round-system GDD owns the formulas.*

### Session-Level (30–120 minutes)

A match is 10–30+ rounds on one real neighborhood. Zones open in stages along real streets. **Evac windows** at
rounds 10, 20 and 30 give natural stopping points. The team can vote to call evac, defend a landing zone (a real
park, square or car park) for about 2 minutes, and extract for a victory and a meta-reward bonus. Or they can keep
going for a higher record. A match ends at evac success or a full wipe, followed by a summary and unlocks.

Reasons to come back:
- beat the team's record;
- try a different holdout plan;
- play another city;
- use what was just unlocked.

### Long-Term Progression

Within a match, progression is the core of the game: salvage, weapons, attachments, upgrade tiers, gear, and how
much of the map the team has fortified or destroyed. All of it resets every match.

Between matches, the meta layer is **light and horizontal** (A9):
- account XP unlocks more weapons, attachments and melee weapons into the match pools;
- a choice of starting sidearm;
- cosmetics;
- weapon mastery challenges;
- leaderboards for each map and party size;
- a growing collection of real neighborhoods from different cities.

Nothing in the meta layer adds permanent power: round 1 never gets easier. After 1.0 comes **"Your Street"**, a
player-facing map generator for any location (Full Vision, A6).

### Retention Hooks

- **Curiosity:** the next zone, the next zombie type, the boss at round 20, the next city, and later "Your Street".
- **Investment:** unlocks that widen your options, mastery cosmetics, records for each map.
- **Social:** a regular friend group; "you have to see what we did to the high street"; shared screenshots of real
  places.
- **Mastery:** parry timing, plans for each map, high-round leaderboards for each party size.

---

## Signature Systems (concept level)

These are concept-level decisions. Each system gets its own GDD through `/map-systems` and `/design-system`. Numbers
here are **starting tuning values** that the GDDs own and will change.

### 1. Round anatomy and fail state

| Phase | What happens |
| ---- | ---- |
| **Intermission** | 20 s base (45 s before evac rounds). Players spend salvage, fortify or breach, and reposition. A ready-up vote skips it |
| **Wave** | The round's total zombie count grows with the round number and party size. The **active cap** is 24 at MVP (target 48). The rest wait in a spawn queue. Zombies enter at real ingress points (street ends, alleys, building openings, breaches), never in a player's line of sight. The spawn director favours ingress near the weakest defences |
| **Round end** | Ends when the last zombie dies. Bonus salvage if nobody went down |
| **Evac rounds (10/20/30)** | The team votes to call evac. Then they defend a landing zone in a real open space for about 2 min. Success counts as a victory |

**Fail state:** the match ends when every player is downed or dead at once (a wipe).

| Situation | Rule |
| ---- | ---- |
| **Downed** | The player can crawl and use a sidearm. 30 s bleed-out. A teammate revives by holding interact for 4 s |
| **Dead** | The player spectates, then returns at the next round start with a sidearm. They keep their salvage but lose their weapons and gear |
| **Self-revive** | A purchasable gear item |

Alternatives considered:
- *A fixed final round with a scripted ending:* rejected. It caps the challenge and the leaderboards.
- *Endless with no evac:* rejected. Sessions get no natural stopping point, so a two-hour run ends in exhaustion.

Evac gives both: a natural stopping point and an open ceiling.

### 2. Salvage economy (between-round and in-round)

There is **one currency, Salvage.** Each player has their own wallet, plus a **give** action so a teammate can
transfer salvage (Pillar 4).

**Earned** from hits, kills, headshots and revives. Melee kills pay a bonus (Pillar 3). Repairs also pay, capped per
round to stop farming. Rounds with no downs pay a bonus.

| Sink | Where | Starting value | Its two edges |
| ---- | ---- | ---- | ---- |
| Weapons and ammo | **Caches** at real shop and amenity types (hardware store → tools and melee; sports shop → bats; police or security site → firearms) | 500–1,500 | Fixed locations reward map knowledge, but pull players away from the anchor building |
| Attachments | **Workbench** stations: buy for the weapon you are holding | 250–750 | Every attachment is a trade-off, not a straight upgrade |
| Weapon upgrade tiers I–III | Workbench | 2,000–5,000 | Keeps a favourite gun viable against growing zombie health; very expensive |
| Fortify / repair | Any opening or wall panel | 100–250 per panel | Blocks entry and bullets, but costs firepower salvage; the horde then targets the next-weakest point |
| Breach charge | Carried item | 300 | Opens a route or sightline, but also opens a horde route |
| Collapse charge | Carried item, placed on load-bearing panels | 1,000 | Chokes a street and crushes zombies, but loses cover, the rooftop, and that building's caches |
| Open a zone | Rubble or barricade at a real street junction | 750–1,500 | More room, caches and landing zones, but more ingress points to cover |
| Gear | Pharmacy / clinic caches | 250–1,000 | Armour, medkit, stamina tonic, self-revive |
| Supply-drop flare | Anywhere outdoors | 950 | A random weapon plus a random attachment, dropped somewhere in the open zone. Someone has to go and get it |

Alternatives considered:
- *Two currencies (points plus building materials):* richer, but doubles the UI and the balance surface. Deferred
  until after the MVP (Q5).
- *A shared team wallet:* strong for Pillar 4, but removes personal agency and invites griefing. Rejected in favour
  of individual wallets plus give.
- *A trader menu between waves:* rejected. In-world caches at real places serve Pillar 2 and make movement a risk.

### 3. Two-edged destruction (synced)

**Model.** Every playable building is assembled from **panels**: wall, door, window and floor segments roughly
2–3 m wide and one storey tall. Each panel has a small set of authored states:

| State | Gameplay meaning |
| ---- | ---- |
| Intact | Blocks movement and bullets; counts as cover |
| Damaged | Still blocks, but visibly cracked. One more hit away from breached; can be repaired |
| Breached | A hole. Passable for zombies and players, and opens a sightline. Can be fortified (boarded) but not fully repaired |
| Destroyed | Gone. Cannot be repaired |
| *Reinforced* (a flag) | More panel health; resists normal zombies; Breachers target it |

**Who breaks things:**
- *Players:* breach and collapse charges, explosives, and heavy melee (sledgehammers, axes) on weak panels and doors.
- *The horde:* every zombie tears down fortifications at openings. Breachers attack walls and open new ingress.
  Detonators blow out panels.

**Structure rule.** The rule is simple and readable, not physics. When enough load-bearing panels in one storey
segment are destroyed, that segment **collapses into a pre-authored rubble state**. The rubble blocks or creates
paths, crushes anything under it, and may form a ramp that Crawlers use.

| Action | Edge for you | Edge against you |
| ---- | ---- | ---- |
| Reinforce a wall, door or window | Blocks entry and fire; buys time | Costs salvage that could have been firepower; the horde shifts to the next weak point |
| Breach a wall | Shortcut, sightline, escape route | A new horde route; less cover |
| Collapse a storey or facade | Chokes a street; crushes a crowd | Loses the vantage point, the rooftop and that building's caches; rubble ramps may let Crawlers in |
| Open a zone | Space, caches, landing-zone access | More ingress to cover |

**Persistence.** Damage lasts the whole match. Players can repair damaged panels, but destroyed panels stay
destroyed. The neighborhood visibly falls apart as the rounds climb, so the environment escalates alongside the
horde.

**What "every client sees the same result" means (A4):**
- **Authoritative and identical on every client:** the server owns panel states, rubble states and the navigation
  changes that follow from them. Every client gets the same holes, the same rubble collision, the same routes and the
  same cover.
- **Cosmetic and local:** flying debris and dust are simulated on each client and may differ slightly between
  clients. They never affect gameplay.
- **Bandwidth:** at about 2–3 bits per panel, a 100-panel building's full state is about 40 bytes. Changes travel as
  small delta events. A player who joins late or reconnects gets the full snapshot.

Alternatives considered:
- *Replicating full Chaos physics:* rejected. Too costly in bandwidth and server CPU, not deterministic across
  clients, and unreadable in a fight.
- *Voxel destruction:* rejected. It conflicts with the real-architecture look and multiplies scope.
- *Doors, windows and barricades only (the genre's classic boards):* kept as the **fallback** if the destruction spike
  fails its budget (see Scope Tiers).

### 4. Real-world maps (OpenStreetMap)

**Pipeline.** Runs at editor time, data-driven and deterministic:
1. Take an OSM extract of a bounding box.
2. Import and clean it.
3. Generate buildings, streets and backdrop through PCG and a C++ tool.
4. The gameplay-layer generator proposes ingress points, cache sites, zone gates, spawn points and evac landing
   zones.
5. A designer polishes the gameplay layer only.
6. Bake into a World Partition level.

| OSM data | Used for | Fallback when missing or poor |
| ---- | ---- | ---- |
| Building footprints | Building shells (panelized) | Required. Footprints that are broken or overlapping are repaired or dropped |
| `height`, `building:levels` | Storey count and height | levels × 3.2 m, then a default for the building type (house 2, apartments 4, retail 1–2) |
| `building` type | Style kit, interior templates | Generic mixed-use kit |
| `roof:shape` | Roof form | Flat or gabled by building type |
| Roads and footways (`highway`, width, lanes) | Street layout, pavements, wreck placement | Default widths for each road class |
| Land use / leisure (park, parking, square) | Open spaces, evac landing-zone candidates | Generator flags maps with no landing zone |
| `shop` / `amenity` **type** (never names) | Where each kind of cache goes | Generic caches placed by rule |
| Barriers, walls, fences | Cover lines, zone edges | None |
| Elevation (not from OSM) | MVP is flat. Later: open elevation data, licence checked | Flat |

**Playable zone.** A bounded **holdout zone** about 300–500 m across. It splits into 3–6 openable zones along real
streets. The surrounding city is generated to the horizon as low-detail backdrop from the same data, so the skyline
is real.

**Building classes:**

| Class | Where | What it is |
| ---- | ---- | ---- |
| Playable | Inside the zone | Panelized; enterable ground floor plus selected upper floors and roofs, with interiors built from room templates |
| Sealed | Inside the zone | Shuttered and not enterable. Exterior panels can still be breached into a shallow interior pocket |
| Backdrop | Outside the zone | Not interactive; low detail |

**Curation (Pillar 2).** We curate by **choosing the site and the boundary**, and by tuning the gameplay layer. We
never move real footprints or streets. Site-selection criteria:
- the area is compact;
- building types are mixed;
- there is a defensible anchor building;
- there is a landing-zone open space;
- the OSM data scores well for completeness.

**"Play your own street" (A6).**
- *At launch:* curated maps from several real cities.
- *Internal KPI:* the pipeline is generic enough to turn any OSM neighborhood into a playable draft map in hours.
  The Vertical Slice must prove this with a second map from a different city.
- *After 1.0 (Full Vision):* the player-facing generator.

**Real-place safeguards (A8):**
- Strip all names, brands and house numbers. Facades are generic, stylised and not identifiable.
- Sites such as schools, places of worship, hospitals, memorials and government buildings are either kept outside the
  playable zone or rendered as generic structures.
- No real people are depicted.

**Licensing.**
- OSM data is © OpenStreetMap contributors under the ODbL. Attribution plus a licence link appear on map select, on
  loading screens and in the credits.
- **Legal review is required** on one question: does the processed OSM data shipped in game files count as a
  *Derivative Database* (share-alike obligations) or only as a *Produced Work*? Keep extracts and processing scripts
  documented either way.
- These details could not be re-verified online during this run (Q3).

### 5. Guns and attachments

- **Weapon classes:** pistol, SMG, shotgun, assault rifle, DMR, LMG, plus launchers in the full tier.
- **Attachment slots:** optic, muzzle, barrel, magazine, underbarrel/grip, stock. That is six at full vision; the MVP
  has three (optic, muzzle, magazine).
- **Attachments are trade-offs** (Pillar 3 test):
  - Extended magazines slow reload and aim-down-sights.
  - Heavy barrels add range but slow handling.
  - A suppressor reduces muzzle flash and, in the full tier, **noise draw** (gunfire pulls queued zombies toward the
    shooter's side), at the cost of effective range.
- **Acquisition:** per match. Caches sell fixed weapons, workbenches sell chosen attachments, and supply drops
  supply the randomness. Meta unlocks widen the pools but never add power.

Alternative considered: *random loot rarity tiers for weapons and attachments.* Rejected because players could not
plan around it. Randomness lives only in supply drops.

### 6. Melee

- **Moves:**
  - Directional light and heavy swings (horizontal left/right, overhead) and a thrust. Direction comes from mouse
    motion or a modifier; the GDD decides which.
  - **Block** drains stamina on each hit.
  - **Parry** is a timed block against telegraphed attacks. It staggers the zombie, opens a crit or execution
    window, and refunds stamina.
  - **Shove** gives crowd control and breaks grabs.
  - Stamina is shared with sprint.
- **Weapon families:**

  | Family | Role |
  | ---- | ---- |
  | Blunt | Stagger; breaks armour |
  | Blade | Cleave; dismember |
  | Heavy | Wide sweeps and **structural damage**: can breach weak panels and doors, which links melee to destruction |

- **Economy link:** melee kills pay bonus salvage, which makes melee the ammo-free engine of the economy.
- **Simplified for PvE (A12).** Compared with PvP-grade first-person melee, Holdout has no feints, no morphs and no
  riposte chains against players. Zombies wind up their attacks clearly. Certain types (Grabber, Plated) create
  moments where melee is the right answer.
- **Networking:**
  - Swings and hits are predicted on the client and validated by the server with a tolerance; this is acceptable in
    co-op PvE.
  - Parry is judged on the defending player's client, within that same server tolerance.

Alternatives considered:
- *A single melee button (the genre default):* rejected. It fails Pillar 3.
- *Full PvP-grade melee depth:* rejected. PvE does not need it, and it doubles the animation and netcode scope.

### 7. The horde

| Type (working name) | Arrives from | Role | Link to destruction |
| ---- | ---- | ---- | ---- |
| Shambler | Round 1 | Baseline mass | Tears down fortifications at openings |
| Runner | ~Round 4 | Fast, fragile; punishes poor positioning | Uses breaches first |
| Breacher | ~Round 8 | Heavy; attacks walls and reinforced panels | Opens new ingress |
| Detonator | ~Round 12 | Explodes on death or contact | Blows out panels; can trigger collapses |
| Grabber | ~Round 14 | Pins a player until a teammate shoves or kills it | Pillar 4 moment |
| Plated | ~Round 16 | Armoured front; needs a flank, a heavy overhead, or a parry | Pillar 3 moment |
| Crawler | ~Round 18 | Low profile | Climbs rubble ramps and squeezes through breaches |
| Howler | ~Round 22 | Calls zombies from the queue; buffs nearby zombies | Pressure on the plan |
| Wrecker (boss) | Rounds 20 / 30 | A siege unit | Brings down a whole facade |

*All names are working names and will be checked against existing franchises.* The MVP ships the first three types.

**Tech direction** (TD gate):
- **MVP:** actor-based zombies, StateTree behaviour, lightweight custom movement, and the active cap.
- **After the MVP:** evaluate Mass for queued and distant horde representation. MassGameplay and MassCrowd are
  Experimental in UE 5.8.

### 8. Co-op structure

- Listen server through Steam at MVP (A11). A dedicated server is optional later.
- Friendly fire is off (A20).
- Pings and callouts; the salvage **give** action.
- **Party-size scaling:** each wave's size and zombie health scale with player count.
- **Solo (A16):** a lower active cap and a cheaper self-revive.
- **Host leaving:** at MVP, the match ends if the host leaves. There is no host migration; this is listed as a risk.

---

## Game Pillars

*Revised after the CD-PILLARS self-review (see Director Gate Reviews). The pillars below are the locked set.*

### Pillar 1: Every Wall Cuts Both Ways
Anything players can break, build or reinforce changes the fight for both sides. Every opening is also a way in,
every fortification is salvage not spent on firepower, and no position stays safe forever.

*Design test*: When debating a destruction or fortification option that helps only the players (a wall the horde
never attacks, or a breach that opens a sightline but no route), we add the counter-edge or we cut it.

### Pillar 2: You Know This Place
Maps are real neighborhoods whose street grid and building footprints stay true, so players can recognise real
geography and plan around it. We curate by choosing the site and boundary and by adding the gameplay layer, never by
moving buildings or streets.

*Design test*: When a map plays badly, we change the playable boundary, the zone gates, the ingress points and the
caches, or we pick a different site, before we ever move a real footprint or street.

### Pillar 3: Steel Answers What Lead Can't
Melee is a full partner to guns. It is the ammo-free engine of the salvage economy, the crowd-control tool, and a
way to break weak walls. Every round has moments where a blade or hammer is the right answer, not the desperate one.

*Design test*: When a gun, attachment or upgrade would make melee strictly worse in every situation, it gets a cost
(ammo, noise, reload exposure) or it does not ship.

### Pillar 4: Four Hands on the Door
The game is designed for 2–4 players dividing the labour of covering, fortifying, reviving and pooling salvage. One
player cannot hold every door. Solo is supported as a scaled mode but never drives the design.

*Design test*: When debating a feature that makes one player self-sufficient against one that creates a callout or a
hand-off, we pick the hand-off.

### How the pillars pull against each other

| Tension | How we resolve it |
| ---- | ---- |
| P1 (no position is safe) vs P4 (fortifying is team labour players want to protect) | Fortification is strong but erodes. Breachers and Detonators exist so a perfect fortress never stays perfect |
| P2 (real geography) vs balance and fairness | Site selection and the gameplay layer are the balancing tools; geometry is not |
| P3 (melee parity) vs the gun and attachment power fantasy | Every attachment is a trade-off; guns cost ammo, and in the full tier they make noise |
| P4 (designed for teams) vs solo players | Solo is a scaled mode with its own tuning, and never the reference case |

### Anti-Pillars (What This Game Is NOT)

- **NOT a PvP shooter.** No PvP modes. Every netcode and balance decision serves co-op PvE, which lets us trust the
  client for melee and parry (Pillar 3) and budget the network for the horde and destruction.
- **NOT a freeform building game.** Fortification reinforces real structures from a short menu; players never place
  arbitrary walls. Freeform building would override real geography (Pillar 2) and explode the scope.
- **NOT an open-world or persistent survival sim.** No hunger or thirst, no searching every drawer, no base that
  carries over between matches. Matches are bounded, and the round loop is the game.
- **NOT a structural physics sandbox.** Destruction is designed, panelized and readable, not physically accurate.
  That keeps it network-synced and makes Pillar 1's consequences readable.
- **NOT a digital twin.** Layout is real; facades are generic and stylised. No real names, brands, house numbers or
  people. This keeps Pillar 2 legally and ethically viable.
- **NOT a vertical meta grind or pay-to-win.** No permanent stat upgrades and no paid power, because round 1 must
  stay a real fight and every player must start equal (Pillars 3 and 4).
- **NOT a story campaign.** Story is emergent, plus environmental context. Authored narrative would compete with the
  round loop for scope.

---

## Visual Identity Anchor

**Direction: "Survey Grade"** (chosen from the AD-CONCEPT-VISUAL directions; assumption A15)

**Visual rule:** ***"The map shows through."*** The world reads like a surveyor's massing model come to life. Real
footprints and heights are rendered honestly and slightly simplified. Building facades are procedural, with a clean
modular rhythm. A cartographic layer (footprint outlines, zone linework, OSM-style street hierarchy) runs through the
HUD and the tactical map. Simplified geometry looks intentional, not cheap, and that is what makes a procedural
pipeline from real data shippable.

**Supporting principles:**

1. **The grid, broken.** Real architecture is rectilinear and clean, and damage is the only diagonal. Fracture lines,
   collapse and rubble break the grid, so damage reads instantly at any distance.
   *Design test:* if a building asset adds diagonal or organic detail at full health, simplify it. The diagonals
   belong to the damage states.
2. **Organic means enemy.** Zombies are the only irregular, organic silhouettes in the frame.
   *Design test:* if an environmental prop competes with a zombie silhouette at 30 m (hanging cloth, sagging shapes,
   foliage clumps at chest height), cut it or straighten it.
3. **The light fails as the rounds climb.** This principle is borrowed from the "Sodium Hour" direction. Round 1 is
   late afternoon, dusk falls around round 5, and it is night by round 10. Streetlights die as infrastructure breaks,
   and the team's own lights mark the territory they hold.
   *Design test:* if a lighting choice makes zombies unreadable at combat range, readability (rim light,
   silhouette) wins over mood.

**Color philosophy:**

| Color | Meaning |
| ---- | ---- |
| Desaturated real materials (concrete, asphalt, brick) | The neutral base |
| Road-marking yellow | Player infrastructure: caches, workbenches, fortifications you own |
| Clean cyan | Teammates and UI |
| Sodium amber | Light, and the territory the team holds |
| Saturated red | **Danger only**: blood, fire, breach warnings, structural failure |
| Sickly green-grey | Belongs to the horde; never used for anything on the player's side |

**Directions considered and not chosen:**
- **"Sodium Hour"** (rule: *light is territory*): night siege, failing sodium lights, warm-versus-cold palette.
  Strong on mood and on Pillar 4. But darkness hides the real architecture that Pillar 2 depends on, and it is heavy
  on dynamic lighting. Its lighting rule survives as principle 3.
- **"Last Broadcast"** (rule: *it happened here, on camera*): grounded, near-photoreal, overcast documentary look
  with an emergency-broadcast UI. Rejected for three reasons:
  - Photorealism multiplies the cost of procedural buildings and makes their repetition uncanny.
  - It pushes toward a digital twin.
  - It sits closest to the look of existing zombie shooters.

---

## Inspiration and References

*These games are named for comparison only. Holdout copies no names, characters, art, levels, UI or look from any of
them. It uses generic genre conventions (round structure, buying weapons in the world) and does **not** reproduce
any game's signature branded mechanics (specific perk vending machines, a mystery box, and so on).*

| Reference | What We Take From It | What We Do Differently | Why It Matters |
| ---- | ---- | ---- | ---- |
| *Call of Duty* Zombies mode | Round-based escalation; points for hits and kills; buying weapons in the world; opening areas | Real maps, two-edged destruction, deep melee, evac windows | Proves round-based co-op survival sustains long sessions and a devoted audience |
| *Killing Floor 2* | Wave co-op with a spending intermission; class-free teamwork; gory feedback | Caches in the world at real shop types instead of a trader menu; fortification and demolition sinks | Validates a between-wave economy as the strategic layer |
| *Warhammer: Vermintide 2* | First-person melee and guns against hordes in four-player co-op; push and stamina; crowd feel | Parry-centric directional melee; a holdout in one location rather than mission traversal | Proves first-person melee against hordes is satisfying and sells |
| *Chivalry 2* | Directional swings, parry timing, stamina in first person | PvE simplification: no feints or morphs; zombies telegraph | Best reference for directional melee feel |
| *Rainbow Six Siege* | Destruction as a two-edged tactical layer: reinforce versus breach, soft walls | Horde versus players; damage persists and accumulates over rounds | Validates "every wall cuts both ways" as deep and readable |
| *The Finals* | Server-driven destruction that every client sees | Panelized and persistent; PvE; tuned for budgets an indie can afford | Proves networked destruction is a marketable headline feature |
| *Deep Rock Galactic* | Four-player co-op interdependence; synced destructible terrain; horde waves; an indie success | Urban real-world maps; round-based holdout | Validates indie co-op horde games with environmental destruction |
| *Microsoft Flight Simulator* (2020) | Buildings generated from OSM-style data at world scale; the "find my house" pull | Ground-level, playable, destructible, with a gameplay layer | Validates the recognition hook and shows the quality ceiling of auto-generated buildings |
| *7 Days to Die* | Horde nights against fortifications | No freeform building (anti-pillar); bounded matches | A counter-reference: what we deliberately avoid |

**Non-game inspirations:**
- Siege films (*Assault on Precinct 13*, *Night of the Living Dead*): the last stand in an ordinary building.
- *28 Days Later*: familiar, emptied city streets.
- Architectural massing models and survey cartography (Ordnance Survey and OSM rendering styles).
- The rhythm of emergency broadcasts and civil-defence signage.
- Urban-exploration photography of half-demolished buildings.

---

## Target Player Profile

| Attribute | Detail |
| ---- | ---- |
| **Age range** | 18–35 (core). An M / PEGI 18 rating is assumed for gore (Q6) |
| **Gaming experience** | Mid-core to hardcore; comfortable with FPS controls |
| **Time availability** | 1–2 hour evening sessions with a friend group on weeknights; longer high-round attempts on weekends |
| **Platform preference** | PC on Steam, mouse and keyboard; voice chat on Discord |
| **Current games they play** | *Call of Duty* Zombies, *Killing Floor 2/3*, *Vermintide 2* / *Darktide*, *Deep Rock Galactic*, *Back 4 Blood*, *The Finals* |
| **What they're looking for** | A co-op horde game with depth in both guns and melee, an arena that changes because of what the team did, and a fresh map every time. Plus the novelty of "that's my city" |
| **What would turn them away** | Shallow melee; bad netcode (rubber-banding, missed parries); grind for power or pay-to-win; repetitive procedural-looking maps; too little content for the price; dead lobbies for players without a full group |

---

## Technical Considerations

| Consideration | Assessment |
| ---- | ---- |
| **Recommended Engine** | **Unreal Engine 5.8, C++ and Blueprint.** This is the user's choice and is recorded as given. `/setup-engine` configures it against the pinned reference in `docs/engine-reference/unreal/`. Systems in scope: GAS, replication (Iris is production-ready in 5.8 per the release notes; the plugin still carries a Beta flag), Chaos Destruction (Geometry Collection plugin is **Beta** in 5.8), Enhanced Input, World Partition, PCG (production-ready since 5.7), Geometry Scripting. Mass and StateTree are candidates for the horde (MassGameplay and MassCrowd are **Experimental** in 5.8) |
| **Key Technical Challenges** | 1) Synced, persistent destruction plus navigation updates on a listen-server host. 2) Horde count against replication and server CPU. 3) Feel and netcode of first-person melee and parry. 4) Quality of the OSM-to-level pipeline, including interiors OSM does not describe. 5) Memory and streaming for many unique procedural buildings |
| **Art Style** | 3D, stylised-real ("Survey Grade") |
| **Art Pipeline Complexity** | **High** (custom 3D): modular building kits in several regional styles, interior room templates, damage states for each panel type, ~10 zombie types, weapons, attachments, melee weapons, first-person arm animation sets, zombie reaction animations. Outsourcing is assumed for character art, animation and audio (A14) |
| **Audio Needs** | **Adaptive.** Music that tracks round intensity. Positional horde audio is critical to gameplay (where they come from). Layered destruction audio |
| **Networking** | **Client-server.** A listen server (player-hosted through Steam) at MVP; dedicated servers optional later. The server owns rounds, the economy, panel states and the AI; the client predicts movement, shooting and melee |
| **Content Volume** | 1.0 targets: 5–6 real neighborhoods from different cities, ~10 zombie types including bosses, ~14 guns, ~40 attachments, ~8 melee weapons. Replay comes from rounds, routes and builds; a typical match is 45–75 min |
| **Procedural Systems** | The editor-time OSM pipeline (buildings, streets, backdrop); generating interiors from room templates; auto-proposing the gameplay layer (ingress, caches, zones, landing zones); random supply drops. After 1.0, possibly the same pipeline exposed to players ("Your Street") |

---

## Risks and Open Questions

### Top risk register

| # | Risk | Likelihood / Impact | Mitigation | Proof point |
| ---- | ---- | ---- | ---- | ---- |
| R1 | **Netcode cost of replicated destruction.** Panel states, rubble, navigation updates, late-join snapshots | Medium / High | Replicate gameplay state, not physics; debris is cosmetic and local; nav links and modifiers switch per panel instead of rebuilding the navmesh; budget CPU on the listen-server host | Spike in MVP month 2–3: 4 clients, 100+ panel changes in a round, under 10 KB/s per client for destruction traffic, no desync after a reconnect |
| R2 | **Horde count vs replication and server CPU** | High / High | Active cap (24 MVP, 48 target) plus a queue; lightweight movement; Iris prioritisation and relevancy; animation budgeting; Mass evaluated only after the MVP | Same spike: 24 active zombies plus 4 players at 60 fps on a mid-range host |
| R3 | **OSM data quality and licensing** | High / Medium | Height fallbacks, polygon repair, a completeness score for each site, site curation; ODbL attribution; legal review of whether we ship a Derivative Database | MVP map generated from raw data with no hand-moved geometry; legal opinion before Alpha |
| R4 | **First-person melee feel** (parry over latency, readable telegraphs, animation volume) | Medium / High | PvE simplification; parry judged client-side within a server tolerance; telegraph-first zombie animation; early feel prototype | Feel prototype in MVP month 1–2: playtesters rate melee as viable as guns (see MVP success criteria) |
| R5 | **Real-place sensitivity.** Depicting violence and destruction in recognisable real places, including sensitive sites. There is precedent: a 2006 console shooter drew a formal complaint from a cathedral it depicted | Medium / Medium | Strip names and brands, use generic facades, a sensitive-site policy, curated launch sites; a stricter policy before any "Your Street" release | Policy written before the Vertical Slice |
| R6 | **Market saturation of zombie co-op** | High / Medium | Show the hook in 10 seconds of trailer: a real street, a facade coming down. Local-press angle ("Holdout in [city]"); public matchmaking and solo for players without a group | Wishlist and playtest-signup tests on the Vertical Slice trailer |
| R7 | **Scope: five hard systems for a small team** | High / High | Producer adjustments applied (see Scope Tiers); front-load the risky systems; fallbacks defined | MVP lands in about 4 months |

### Design Risks
- Fortification could become a dominant "turtle" strategy that breaks Pillar 1. Mitigation: Breachers and Detonators
  erode it, the cost of reinforcing scales up, and supply drops pull players into the open.
- Endless escalation may still produce sessions that run too long. Mitigation: evac windows give the team a choice
  about when to stop.
- Real geography may produce dull layouts (wide suburbs, eight-lane roads). Mitigation: site-selection criteria and
  boundary choice (Pillar 2's design test).
- Melee may be ignored once guns are upgraded (Pillar 3 failure). Mitigation: the melee salvage bonus, Grabber and
  Plated moments, heavy melee as a destruction tool.
- Solo play may feel hollow because it is built around hand-offs (Pillar 4). Mitigation: solo tuning, plus public
  matchmaking for quick play.

### Technical Risks
- R1 and R2 above. Both are budget problems on a **listen-server host**, which must also render.
- **Navigation after destruction.** Rebuilding the navmesh at runtime is expensive. Pre-baked nav links and modifiers
  for each panel are the plan, and they must be generated automatically by the OSM pipeline.
- **Chaos Destruction is Beta in 5.8.** Use Geometry Collections only for cosmetic fracture and debris; keep
  gameplay state in our own panel system so a change in Chaos cannot break gameplay.
- **Mass is Experimental in 5.8**, and 5.8 reworked it. Do not build the MVP horde on it.
- **Interiors.** OSM has no interior data, so generated interiors (room templates) are a large hidden scope item.
- **Memory and streaming.** Many unique procedural buildings, each with damage-state meshes. Shared modular kits and
  instancing are required.
- **Late join, reconnect and host migration.** Late join is feasible thanks to compact state. Host migration is out
  of scope, so a host quitting ends the match.
- **UE 5.8 is newer than the model's training data.** Verify every engine API against
  `docs/engine-reference/unreal/` (TD-ENGINE-RISK at architecture).

### Market Risks
- R6 above. Competitors include free and well-funded options: annual zombie modes, *Killing Floor 3*, *Back 4 Blood*,
  *World War Z*, *Darktide*, and many indie survival games.
- Four-player co-op purchases depend on friend groups, which caps the number of solo buyers. Public matchmaking and
  a solid solo mode partly offset this.
- R5 above. Controversy over real places could cut either way.

### Scope Risks
- Five systems each hard enough to be a team's main focus: destruction netcode, horde AI, first-person melee,
  gunplay with attachments, and the OSM pipeline.
- Animation volume: first-person arms for each weapon, melee sets, zombie hit reactions and dismemberment.
- Each map needs interiors, a gameplay-layer polish pass, and QA across combinations of destruction states.
- QA of networked destruction: the state space is combinatorial, so automated soak tests are needed.

### Open Questions

| # | Question | How we answer it |
| ---- | ---- | ---- |
| Q1 | **Which real place is the first map?** (The user will name it.) The concept works for any neighborhood that meets the site-selection criteria | The user names it. Then score its OSM completeness and check it against the sensitive-site policy before the MVP map pass |
| Q2 | What are the actual team size, budget and timeline? Is the developer solo? | User input. Then re-run PR-SCOPE |
| Q3 | ODbL: does shipping processed OSM data create a Derivative Database with share-alike duties? What exact attribution does a game need? (Could not be re-verified online this run.) | Legal review plus the OSMF attribution guidelines, before Alpha |
| Q4 | Is the active-zombie cap of 24 → 48 enough to feel like a "horde"? | Feel prototype and netcode spike |
| Q5 | One currency or two (salvage plus materials)? | Playtest the single currency at MVP; revisit at the Vertical Slice |
| Q6 | Gore level and target age rating (M / PEGI 18 assumed) | User decision; it affects dismemberment scope |
| Q7 | Is the hook really novel? (No web research was possible this run.) | Competitive research (`/competitive-brief` or manual) before marketing copy |
| Q8 | "Your Street": post-1.0 feature, or never? Is runtime generation (shipping the pipeline in the game) worth the cost? | Decide at Alpha, using the pipeline-genericity KPI and the sensitive-site policy |
| Q9 | Early Access or a straight 1.0 launch? | Producer decision at the Vertical Slice, using wishlist data |
| Q10 | How is melee direction chosen: mouse-motion direction or a modifier key? | Feel prototype A/B test |

### Assumptions and Decisions Log

*These are calls the facilitator made in place of the user, who could not be asked during this run. Each row can be
overruled. "Impact if overruled" names what would change.*

| ID | Decision | Alternatives considered | Why | Impact if overruled |
| ---- | ---- | ---- | ---- | ---- |
| A1 | Core feel is "desperate but skilful"; the key variable is world reactivity | Power fantasy; tactical-slow | Fits escalation and two-edged destruction | Tone and pacing of the combat GDDs |
| A2 | Matches are endless and round-based, with **evac windows at rounds 10/20/30**; a wipe ends the match | Fixed final round; pure endless | A natural stopping point plus an open ceiling | Session-length targets, the round GDD |
| A3 | One currency, **Salvage**: individual wallets plus a give action; spent on firepower, fortify, demolish, zones and gear | Two currencies; shared wallet; trader menu | Simple to learn; keeps every choice an opportunity cost; supports Pillar 4 | Economy GDD, UI |
| A4 | **Panelized destruction.** "Same result for every client" means identical gameplay state (holes, rubble, routes, cover). Debris is cosmetic and may differ | Replicated physics debris; voxels; doors and windows only | The only route an indie budget can afford to synced destruction | If identical debris is required: R1 becomes HIGH RISK; re-run TD-FEASIBILITY |
| A5 | Both players **and** the horde destroy (Breacher, Detonator, Wrecker) | Players only | This is what makes Pillar 1 two-edged | Horde roster, AI scope |
| A6 | Curated real maps at launch, from an editor-time pipeline that is generic for any neighborhood; **player-facing "Your Street" after 1.0** | Runtime generator at 1.0 | Scope, quality and real-place safety | If "Your Street" is wanted at 1.0, roughly +6–9 months; re-run PR-SCOPE |
| A7 | Bounded holdout zone (300–500 m, 3–6 zones); the rest of the city is backdrop | Whole neighborhood playable | Horde pacing and performance | Level and world GDDs |
| A8 | Strip names, brands and house numbers; generic facades; sensitive-site policy | Photoreal digital twin | Legal and ethical exposure | Art direction, pipeline filters |
| A9 | The match is the core progression; meta is **horizontal only** (unlocks widen pools, cosmetics, mastery) | Roguelite permanent upgrades | Round 1 stays a real fight; no power gap between friends | Retention design, economy |
| A10 | **Premium**, about USD 19.99–24.99; post-launch cosmetics only | F2P; battle pass | Fits the audience and the anti-pillar; no live-service burden | Business model, meta design |
| A11 | **Listen server via Steam** at MVP; dedicated optional later; no host migration | Dedicated servers from day one | Cost; PvE is not sensitive to host advantage | Server-infrastructure budget |
| A12 | Melee is simplified for PvE: no feints, morphs or riposte chains; parry judged client-side within a server tolerance | PvP-grade melee | Scope; co-op PvE has a low cheating incentive | Melee GDD, netcode ADR |
| A13 | Active-zombie cap of **24 at MVP, 48 target**, plus a spawn queue | 100+ simultaneous zombies | Replication and CPU budget; the genre convention works | Horde feel (Q4) |
| A14 | **Team of 5** (2 gameplay/network engineers, 1 tools/tech engineer, 1 designer-producer, 1 environment/tech artist), with character art, animation and audio outsourced. **30–36 months to 1.0** | Solo developer | "Indie commercial, full studio pipeline" | If solo, Full Vision is not realistic: plan to launch the Vertical Slice tier in Early Access (about 24 months) and re-run PR-SCOPE |
| A15 | Visual Identity Anchor is **"Survey Grade"**, with the lighting rule from "Sodium Hour" | Sodium Hour; Last Broadcast | Makes procedural real architecture look intentional; serves Pillar 2 | The `/art-bible` starting point |
| A16 | Solo is supported as a scaled mode | Co-op only | Wider audience; covers players without a group | Balance tuning |
| A17 | Pillars revised after the CD-PILLARS concerns (P2 reframed for players, P3 tied to the economy and destruction, P4 states its solo stance) | Keep the draft pillars | Gate feedback | Pillar wording |
| A18 | All five PR-SCOPE adjustments applied (see the gate reviews) | Keep the original MVP | Scope realism | MVP contents |
| A19 | Weapons are sold at caches placed by real shop **types**; the only randomness is supply drops | Random loot rarity | Map knowledge matters (Pillar 2) | Weapon-acquisition GDD |
| A20 | Friendly fire off by default | On | Co-op accessibility; fewer grief vectors | A hardcore option later |
| A21 | Dead players return next round with a sidearm and keep their salvage | Permadeath for the match | Keeps friends in the session (Pillar 4) | Fail-state tuning |

---

## MVP Definition

**Core hypothesis:** *"A team of four holding a real neighborhood finds the fight → spend → fortify-or-breach round
loop compelling for 45+ minutes, and the destruction decisions matter: teams change their plan because of what they
broke."*

**Required for MVP** (adjusted by PR-SCOPE):
1. **A round system** with escalating waves, an active cap of 24 plus a queue, intermissions, revive/down/death, and
   the wipe fail state.
2. **The Salvage economy**: caches (weapons and ammo), a workbench (attachments), buying fortify, repair and breach,
   opening zones.
3. **Gunplay:** 3 guns (pistol, SMG or rifle, shotgun) with **3 attachment slots** (optic, muzzle, magazine) and
   about 9 attachments.
4. **Melee:** 2 weapons (one blunt, one heavy that can breach), directional light/heavy swings, block, parry, shove,
   shared stamina.
5. **Panelized destruction and fortification**: server-authoritative and synced to 4 clients, with navigation
   updates, cosmetic local debris, and a late-join snapshot.
6. **3 zombie types:** Shambler, Runner, Breacher.
7. **One real neighborhood** from the first-pass OSM pipeline (footprints, heights or levels, roads, shop types), with
   about 6 enterable buildings and 2–3 zones. Greybox art; ODbL attribution in the game.
8. **4-player online co-op** over a Steam listen server, with a lobby and invites.
9. **A minimal HUD and feedback layer**: round counter, salvage, panel damage states, parry and hit feedback.

**MVP success criteria (playtest):**
- Median session reaches round 10 or later.
- At least 70% of testers want "one more match".
- Every team makes 5 or more deliberate fortify or breach decisions per match and can describe one that backfired.
- Melee kills are 25% or more of kills in rounds 1–10.
- No destruction desync across 10 four-player sessions.

**Explicitly NOT in MVP** (deferred):
- Meta progression and unlocks
- Evac rounds (the MVP ends on a wipe)
- Gear, upgrade tiers, supply drops, collapse charges
- Zombie types beyond 3; bosses
- A second neighborhood; the pipeline-genericity proof (moved to the Vertical Slice)
- "Your Street"
- Dedicated servers
- Art and audio passes (greybox and placeholder)
- Controller support, localisation, accessibility options beyond the basics
- Leaderboards, cosmetics, noise draw

### Scope Tiers (if budget/time shrinks)

*All timelines assume a team of 5 (A14) and count cumulative months from the start of production.*

| Tier | Content | Features | Timeline |
| ---- | ---- | ---- | ---- |
| **MVP** | 1 real neighborhood, about 6 buildings, 2–3 zones, greybox | The 9 items above. Built as **two prototypes first**: a local feel prototype (melee and guns against zombies, months 1–2) and a netcode/destruction spike (months 2–3), integrated in month 4 | ~4 months |
| **Vertical Slice** | 1 polished map plus 1 **second map from a different city**, auto-generated (the pipeline-genericity proof); Survey Grade art pass on map 1 | Evac at round 10; 5 zombie types; 6 attachment slots; gear; supply drops; a stub of meta progression; full HUD; solo scaling | ~month 10–12 |
| **Alpha** | 3–4 maps (placeholder art on some) | Everything in rough form: 8 zombie types plus boss, about 10 guns, 6 melee weapons, 25–30 attachments, upgrade tiers, collapse charges, horizontal meta, Steam leaderboards, public matchmaking | ~month 20 |
| **Early Access** *(optional commercial cut, added by PR-SCOPE)* | 3 polished maps | Alpha features, stabilised | ~month 22–24 |
| **Full Vision (1.0)** | 5–6 launch maps from different cities | Full roster (~10 types, 2 bosses), ~14 guns, ~40 attachments, ~8 melee weapons, noise draw, accessibility, localisation, controller support | ~month 30–36 |
| **After 1.0** | More cities | "Your Street" player map generator (Q8); dedicated servers if needed | — |

**Most likely cut point under time pressure:** Alpha content. Maps drop from 4 to 3 and zombie types from 8 to 6,
which is a graceful fallback.

**Defined fallback for the riskiest system:** if the netcode/destruction spike misses its budget at month 3, the
game drops to **doors, windows and barricades, plus scripted set-piece collapses**. Pillar 1 is weakened but
survives, and the game still ships. Decide by the end of month 3, not later.

---

## Director Gate Reviews

*The facilitating agent ran these inline against each gate's definition file, because subagent spawning was not
available in this session. They are self-reviews. Re-run them with the director agents before the Concept → Systems
Design gate.*

### CD-PILLARS: CONCERNS → REVISED → APPROVE
The draft had four pillars: "Every Wall Cuts Both Ways", "Real Ground", "Steel Answers What Lead Can't", "Four Hands
on the Door". Pillars 1 and 4 were already falsifiable and in healthy tension with each other. **Concerns raised:**
1. **"Real Ground" was absolute and production-facing.** "Never rearrange geography" with no curation clause would
   either get violated quietly or ship bad maps. It also described a technique, not a player experience.
   → Reframed as **"You Know This Place"** (recognition is the player value), with an explicit curation clause and a
   design test about site and boundary.
2. **Pillar 3 does not differentiate on its own,** because other horde games own melee and guns.
   → Tied to Holdout's unique systems: melee as the ammo-free engine of the economy and as a tool for breaking walls.
3. **Pillar 4 had no stance on solo play**, yet solo is supported.
   → Added "Solo is supported as a scaled mode but never drives the design."

The CD also suggested adding "no position stays safe forever" to Pillar 1, to guard against turtling. Applied.
**Re-check: APPROVE.** Each pillar now has a falsifiable test; they pull against each other (see the tension table);
P1 and P2 differentiate Holdout from its closest comparables.

### AD-CONCEPT-VISUAL: STRONG ("Survey Grade")
The review proposed three directions: Survey Grade, Sodium Hour, Last Broadcast. **Survey Grade** is dominant because
it serves the differentiating pillar (Pillar 2) directly and makes the procedural architecture pipeline look
intentional. That makes it the cheapest route to a coherent look for an indie team. Sodium Hour's lighting rule is
kept as a supporting principle for escalation. Last Broadcast is rejected on cost and differentiation.

### TD-FEASIBILITY: CONCERNS (accepted)
- **No HIGH RISK blocker, as long as A4 and A13 hold.** Gameplay-state destruction (not physics) and a capped active
  horde keep the concept inside an indie budget.
- **What would make it HIGH RISK:** a requirement for identical physics debris on every client, or 100+ active
  replicated zombies at MVP.
- **Engine-specific risks:**
  - The Chaos Geometry Collection plugin is Beta in 5.8: use it for cosmetics only.
  - MassGameplay and MassCrowd are Experimental and were reworked in 5.8: no MVP dependency on them.
  - Iris is production-ready per the 5.8 release notes, although the plugin is still flagged Beta: adopting it is
    an ADR decision.
  - PCG has been production-ready since 5.7: a good fit for the OSM pipeline.
- **Commonly underestimated:**
  - navigation updates after destruction;
  - generated interiors (OSM has no interior data);
  - the listen-server host doing AI, physics and rendering at once;
  - animation volume for first-person melee and zombie reactions;
  - QA across combinations of destruction states.
- **Mitigation:** two spikes before the Vertical Slice. Both are already in the MVP plan.

### PR-SCOPE: OPTIMISTIC (adjustments applied)
The first-draft MVP was optimistic for 5 people in 4 months. It included 2 neighborhoods, 6 attachment slots,
collapse charges, and "Your Street" at 1.0. **Adjustments, all applied (A18):**
1. The MVP became two prototypes plus an integration month.
2. The second neighborhood and the pipeline-genericity proof moved to the Vertical Slice.
3. Attachments were cut to 3 slots and about 9 items, and collapse charges were deferred.
4. "Your Street" moved to after 1.0.
5. An explicit **Early Access** tier was added as a graceful commercial cut, along with a **month-3 destruction
   fallback trigger**.

**Residual concerns:**
- These estimates assume UE networking experience on the team.
- The team size itself is an assumption (Q2).
- If the developer is solo, the verdict becomes UNREALISTIC for Full Vision (see A14).

---

## Next Steps

**Recommended path: prototype-first.** The core mechanics (synced destruction under a horde, first-person parry over
the network) are unproven.

1. `/setup-engine`: configure Unreal Engine 5.8 and its version-aware reference docs. *(Another session is already
   doing this.)*
2. **Re-run the four concept gates with the real director agents.** Run `creative-director` (CD-PILLARS) and
   `art-director` (AD-CONCEPT-VISUAL); also `technical-director` and `producer` for the optional TD-FEASIBILITY and
   PR-SCOPE. The verdicts above are self-reviews.
3. User confirms or overrules the **Assumptions and Decisions Log** and names the first real place (Q1). Also
   answers Q2 (team, timeline) and Q6 (rating).
4. `/prototype first-person melee and gunplay against a capped horde`: the local feel prototype (PROCEED / PIVOT /
   KILL).
5. `/prototype --spike replicated panel destruction plus 24-zombie horde on a listen server`: the netcode budget
   spike (R1, R2).
6. If both PROCEED: `/art-bible`, seeded with the Survey Grade anchor. It is required before the Technical Setup gate
   at `full`.
7. `/design-review design/gdd/game-concept.md`: check the concept is complete.
8. `/map-systems`: systems index and dependencies. Expected systems: rounds, economy, destruction, OSM pipeline,
   gunplay, attachments, melee, horde AI, co-op/session, HUD.
9. `/design-system` for each system from step 8, then `/create-architecture` → `/architecture-decision` (one ADR per
   decision: replication with Iris, destruction state model, horde representation, OSM pipeline) →
   `/architecture-review`.
10. `/vertical-slice` before committing to sprints, then `/gate-check` before Production.

- [ ] Get concept approval from creative-director (re-run CD-PILLARS with the real agent)
- [ ] Fill in the CLAUDE.md technology stack from the engine choice (`/setup-engine`; in progress elsewhere)
- [ ] Create the game pillars document (`/design-review` to validate)
- [ ] **Prototype the core idea**: the feel prototype and the netcode/destruction spike (above)
- [ ] If the prototypes PROCEED: break the concept into systems (`/map-systems`)
- [ ] Design each system (`/design-system [system-name]`), feeding prototype learnings into Tuning Knobs and Formulas
- [ ] Build the vertical slice in Pre-Production (`/vertical-slice`), including the second-city pipeline proof
- [ ] Validate the core loop with a playtest (`/playtest-report`) against the MVP success criteria
- [ ] Plan the first milestone (`/sprint-plan new`)
