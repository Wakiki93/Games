# Art Bible: Holdout

> **Status**: Draft (revised after the agent-run AD-ART-BIBLE gate)
> **Owned By**: art-director
> **Last Updated**: 2026-11-19
> **Art Director Sign-Off (AD-ART-BIBLE)**: **CONCERNS (agent-run, `art-director`, 2026-11-19)**. No REJECT-level
> inconsistency. Both blocking items are applied in this revision: danger red for specials (4.3 and 7.2) and the role
> primitives' size and deploy rules (3.2, 3.3, 3.5, 5.2, 5.3, 5.6). Two of the eleven concerns are also fixed here (the
> on-screen size table, and the wording slips). The other nine are open and tracked in Appendix B. The art director
> confirms the two blocking fixes, or the gate is re-run, to reach APPROVE before asset production begins (Appendix
> C.1). The earlier self-check is kept as history in Appendix C.2

`/art-bible` writes these nine sections in this order and replaces each
section's placeholder line as that section is approved. A section still
holding its placeholder is incomplete; a later run fills only those.

> **How this document was made.** `/art-bible` ran non-interactively inside a workflow on 2026-11-19 (resolved
> settings: `workflow: full` → all nine sections; `docs.density: thorough`; `review_mode: full`;
> `automation: guided`). The user could not be reached, so every question the skill would have asked was answered by
> the facilitator with the option that best fits the game concept and the user's directions, and each answer is
> logged in **Appendix A** (AB-01 onward). Every row there can be overruled. The user's own directions are
> authoritative and were not diluted; they were restated for this run as D1–D9 (D1 feel, D2 roles and gadgets, D3
> squad play, D4 ballistics, D5 four-player co-op, D6 waves plus capture-and-hold sectors, D7 grounded realism, D8 the
> first map, D9 everything from the original concept) and match U1–U10 in `design/gdd/game-concept.md`.
>
> **Deviation from the skill, stated plainly.** The skill requires every section to be drafted by a spawned specialist
> (`art-director`; `ux-designer` for Section 7; `technical-artist` for Section 8). This run had no agent-spawning tool,
> so the facilitator drafted each section by applying those agents' briefs and remits, surfaced the disagreements a
> specialist pair would have raised (Sections 7 and 8), and ran the **AD-ART-BIBLE** gate as a **self-check** against
> `.claude/docs/director-gates/ad-art-bible.md` (Appendix C.2). The gate was then run by the `art-director` agent on
> 2026-11-19. Its verdict, and the changes made in response, are in the revision note below and in Appendix C.1.
>
> **Revision 2026-11-19 (response to the agent-run AD-ART-BIBLE gate).** (1) **Danger red for specials removed.** A
> spotted special keeps the green-grey survey tick, with an optional type glyph inside. Only the Detonator, and the
> Breacher or Wrecker while attacking a panel, take danger red. The rule is stated once in 4.3, and 7.2 points to it
> (AB-24). (2) **Role primitives resized to survive the 80 m role test.** 3.2 adds a minimum on-screen size: 2 px at
> 80 m, which is 17 cm of real width. 3.3 rebuilds the Corpsman pack (wider sideways), the Sapper diagonal (tool head
> and a thick rigid scabbard) and the Spotter spike (a sensor head with mass). 3.3, 3.5 and 5.2 add two rules: deploying
> or drawing a gadget never removes the back primitive, and a squad-gap or solo light gadget has a compact hip-carried
> form that never makes another role's primitive. 5.3 and 5.6 follow (AB-25). (3) **The 3.2 size table is corrected**
> to the exact projection, about 10% smaller, and the role-test figure is now about 22 px (AB-26). (4) **Wording
> slips fixed:** the Plated carries its slab (5.4), and the evac landing zone is lit by overhead flares and ringed by
> work lights (2.3). (5) The gate's other concerns are logged as open items in Appendix B.
>
> **Sources.** The Visual Identity Anchor ("Ground Truth"), pillars, signature systems, risks and decisions in
> `design/gdd/game-concept.md` (revision 2.2; read, not edited); the AD-CONCEPT-VISUAL round-2 notes addressed to this
> document; `.claude/docs/technical-preferences.md` (performance budgets; `project.yaml` has no `performance` block);
> the pinned engine reference in `docs/engine-reference/unreal/`; and aggregate building statistics from the first
> map's local pipeline output (counts and size distributions only; nothing narrower).
>
> **Privacy (the repository is public).** This document names the first test map, "Tinley Park, IL (60477)", and real
> street and park names from OpenStreetMap, as the concept allows. It contains no address, house number or coordinate
> of any building, and it describes the area only as the first test map.

## 1. Visual Identity Statement

**Direction: "Ground Truth"**, built directly from the concept's Visual Identity Anchor (AB-03). The user's direction
for grounded realism (D7 in this run, U7 in the concept) governs every section of this document.

### 1.1 The one-line rule

> ***"It is the real street on its worst night."***

Start from what a real late-autumn street in a Chicago south suburb actually looks like (its street grid, its street
names, its materials, its low November light) and change only what the match changes: the light failing as the
rounds climb, the damage the squad and the horde do, and the light, marks and fortifications the squad adds. Almost
every visual question in Holdout can be settled by asking *"what would this real street look like tonight, after this
round?"* That answer wins, with one exception, written into Principle 3: a threat or a squadmate in the close or
street band must always read.

"Worst night" carries two ideas at once. It is the **escalation**: round 1 is an ordinary late afternoon, and by round
20 the same street is dark, smoking and broken, with the squad's own lights as the last warm pools in it (Section 2
holds the light plan). And it is **restraint**: this is a real place having a terrible night, not a fantasy world, so
nothing glows, nothing is graded into a colour scheme, and nothing is stranger than a real night with no power.

**Range bands.** "Close", "street" and "long" always mean the concept's three bands (system 7): **close** 2–30 m
(yards, hallways, garages, the woods), **street** 30–150 m (residential streets), **long** 150–400 m (167th Street,
the fields, the cemetery). Every readability rule in this document is stated per band.

### 1.2 Supporting principles

Each principle serves a pillar and comes with a design test that settles an ambiguous call.

**Principle 1. A real kind of place, never a real home.** *(Pillar 2: You Know This Place)*

Recognition comes from what is truly real and public: the street grid, the real street names, the parks, the creek,
and the regional and period style of the houses (ranches, raised ranches, split-levels and two-storey homes; brick
fronts with sided flanks; attached front-facing garages; hip and gable roofs; parkway trees). Every surface is a real
suburban material (vinyl and aluminium siding, brick veneer, asphalt shingles, concrete driveways, dormant lawn), lit
by real light. No house is ever a replica of a real one: houses come from modular kits chosen by footprint, the style
is researched from generic public sources about the region and period, and no house number, address, brand, municipal
insignia or real person ever appears.

*Design test:* when a surface, house, prop or detail is ambiguous, choose the version that is **typical of the region
and the period, physically plausible and generic**. If a street reads as copy-pasted at 30 m, change the kit mix
(neighbouring houses differ in at least two of: kit, cladding colour, roof form, garage side). If anything reads as
one specific real home, or carries a number, brand, logo or insignia, remove it.

**Principle 2. Damage tells the truth, and the outline tells it first.** *(Pillar 1: Every Wall Cuts Both Ways)*

Real construction is plumb and level; everything the fight adds or breaks is off-axis, angled and improvised
("plumb is real; askew is ours"). Every panel state (intact, damaged, breached, destroyed, and the reinforced flag)
changes the panel's **outline**, not just its texture, so the weakest wall reads at 30 m at dusk. Damage exposes only
what a real wood-frame wall contains (siding or brick, sheathing, house wrap, studs, insulation, drywall, the odd wire
or pipe stub), never a generic crumble, rebar or stone. The order damage happens in follows how real houses fail:
trim, siding and shingles first, then glass, then garage doors, then wall sections.

*Design test:* when a damage, fortification or rubble state is ambiguous, choose the version whose **silhouette** tells
the state from 30 m in the round's light with the texture switched off, and whose interior shows **only** what that
real wall type could contain. If a still frame does not let a player tell what the fight has touched from the
untouched real house, push the touched version further off-axis.

**Principle 3. Weight you can see; the threat always reads.** *(Pillar 3: Weight at Every Range, and Pillar 4: Four
Roles, One Line)*

Dust, smoke, debris, muzzle blast and bounce light sell the mass of the weapons and the destruction. But in the close
and street bands, readability beats atmosphere: zombies keep their silhouette, gait and rim, and squadmates keep their
role silhouette (kit on back and hips) at 30–80 m. Readability is reached by **grounded means first**: motivated light,
value contrast between figure and ground, silhouette, gait and animation. A non-physical aid (the horde readability
light, Section 2.5) is allowed only as a bounded last resort with stated caps.

*Design test:* when atmosphere and readability conflict, choose readability in the close and street bands. If an
effect hides a zombie in those bands for more than about one second without a gameplay cause (a thrown smoke, a
collapse), thin it or shorten it. If a figure fails its silhouette test, fix the light, the value contrast or the
silhouette before reaching for the readability light. In the long band at night, readability deliberately yields
to mood except under motivated light or a Spotter mark (this keeps night hard at range and gives the Spotter and
flares a job).

### 1.3 Precedence when principles collide

1. **Readability** of threats and squadmates in the close and street bands (Principle 3).
2. **Truth** of place, material and damage (Principles 1 and 2).
3. **Mood**: light, atmosphere, time of day.

Readability wins the decision, but it never wins it with ungrounded means while a grounded fix is available. Mood is
last in precedence only; it is still what the player remembers, so it is designed as carefully as the rest.

### 1.4 Where the anchor's rules live in this document

The concept's anchor had four supporting principles plus shape and colour rules. The skill's format asks for two or
three principles, so the four were consolidated without dropping any rule (AB-03):

| Anchor rule (game-concept.md) | Where it lives now |
| ---- | ---- |
| Principle 1 "Honest materials, honest damage" | Materials: Principle 1. Damage: Principle 2. Detail: Section 6.4 (what is inside each wall) |
| Principle 2 "A real kind of house, never a real house" (and the variation rule, and the no-flat-roof gate) | Principle 1; Section 6.1–6.3; the roof gate in Section 8.6 |
| Principle 3 "Weight you can see" | Principle 3; Sections 2.6 and 8.9 (dust and smoke limits) |
| Principle 4 "The light fails as the rounds climb" (night curve, motivated light, dark houses, per-band night minimums, feasibility) | The one-line rule's "worst night"; Section 2.2–2.5 (light plan); Section 4.4 (light vocabulary); Section 8.8 (lighting tiers and caps) |
| Shape language (horde by silhouette and gait; roles by kit; plumb vs askew; panel outlines) | Section 3 (in full), Section 5 |
| Colour philosophy (two layers; meaning colours; precedence; light rules; colour-blind safety) | Section 4 (in full, with measured colour-blind results) |
| "The map shows through, on the map only" | Section 7 |

### 1.5 Style explorations considered

| Direction | What it would look like | Verdict |
| ---- | ---- | ---- |
| **Ground Truth** (chosen) | Physically based, ungraded realism; time of day, smoke and dust carry the mood; meaning colours only in the UI and in lights the game places | Chosen: it is the user's direction (D7) and the concept's approved anchor (AD-CONCEPT-VISUAL: STRONG) |
| "Ground Truth, graded" | The same world under a cinematic global grade (teal and orange, or bleach bypass) | Rejected: a global grade is a stylised colour layer on world surfaces, which the anchor forbids; teal collides with squad cyan and orange with the squad's amber light; it would also flatten the time-of-day arc that carries the mood |
| "Documentary" | A news-camera or helmet-camera look: heavy grain, chromatic aberration, lens dirt, handheld shake | Rejected as a default: it adds noise exactly where projectile ballistics need a clean read at range, and the concept already rejected the broadcast idea for the UI. A subtle, optional grain survives (Section 8.8) |
| "Survey Grade" (revision 1's anchor) | A stylised massing-model world | Superseded in the concept (A34); only its cartographic map and HUD language survive, in Section 7 |

## 2. Mood & Atmosphere

### 2.1 Setting and season

**Late autumn, dry, after leaf fall and before the first snow** (AB-05). Think of a clear week in early to mid
November in the Chicago south suburbs:

- **Low sun.** At this latitude in November the sun stays low all day and sets early in the west-south-west, so every
  daylight round has long raking shadows that pull the texture out of siding and brick and stretch figures across
  lawns. Dusk arrives fast, which suits a light that fails round by round.
- **Bare canopy, green understory.** Parkway and yard trees are leafless or nearly so (maple, oak, honey locust,
  linden; regional ash losses leave stumps and young replacement trees, to be confirmed by the style research brief).
  Evergreen foundation shrubs (yew, arborvitae, juniper) stay dark green. In Creek Woods the canopy is bare but the
  understory of buckthorn and bush honeysuckle, typical of the region's woods, keeps its leaves late, so the woods stay
  close-quarters while the long axes open up.
- **Ground.** Lawns are dormant: a tired olive green with tan patches. Leaf litter gathers against curbs, fences and
  foundations; paper yard-waste bags stand at the curb. Asphalt and concrete are **dry**.
- **What is not here.** No rain, wet surfaces, fog banks or snow. Weather is in no scope tier (concept, Scope Risks),
  and dry late autumn gives the cleanest light for ballistics at range.

Why this season: it is the most ordinary-looking version of the real place (Principle 1), it makes the failing light
dramatic without inventing anything (early, fast dusk), bare canopies open the long sightlines that Pillar 3's
ballistics need on 167th Street and the fields, and a bare canopy lowers the Creek Woods foliage risk (Section 8.7).
Alternatives considered: early autumn colour (beautiful, but saturated orange and red foliage competes with danger red
and the squad's amber everywhere); high summer (dense canopy closes sightlines and maximises foliage cost); winter with
snow (snow is a weather and ground-state system with its own scope, and white ground changes every value test).

### 2.2 The light plan: the light fails as the rounds climb

The time of day is driven by the round number, not by a clock. The curve is the concept's stretched curve (A41):
round 1 late afternoon, golden from about round 5, **dusk at the first evac window (round 10)**, full night around
rounds 15–20. **Houses are dark from round 1** (the power is failing), so no porch or window light can ever be mistaken
for squad light. The curve is still a facilitator call awaiting the user (concept Q19); if the user chooses a cycle
with dawn toward each evac window, a dawn state mirroring dusk is added to this table and nothing else changes.

| Rounds | Time of day | Key light | Sky and fill | Contrast | Exposure (starting EV100 range; tuned in the MVP greybox curve) | What switches on | What carries the mood |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1–4 | Late afternoon | Sun about 15° falling to 10°, from the south-west; about 4,800 → 4,300 K | Clear pale-blue sky; cool open-shade fill (8,000–10,000 K look) | Medium-high; shadows stay open | 11–13, narrow clamp; no adaptation pumping | Nothing. Streetlights off; houses dark | Long raking shadows across dormant lawns; leaves skittering; dark windows in daylight (the one wrong note) |
| 5–9 | Golden | Sun about 8° falling to 1°, from the west-south-west; about 3,800 → 3,000 K | Horizon warming, zenith cooling; shadow sides of houses turn blue | High warm/cool split | 9–11; shadow sides may sit under-exposed | Nothing yet | Backlit dust and smoke hanging down 167th Street; warm fronts, blue shadows |
| 10–14 | Dusk (sunset to the end of civil twilight) | No direct sun. A bright band of sky low in the west-south-west | Overhead deepening blue; horizon gradient from pale amber to blue | Low on the ground; high where figures stand against the sky | 5–8; slow adaptation (3 s or more) | **Streetlights switch on at round 10** (photocells; cool white, Section 4.4). The squad's work lights become the dominant warm pools | Silhouettes against the bright western sky; the first steady amber pools at held sectors |
| 15–19 | Night | Moon high in the east to south-east, rendered cool and desaturated, low intensity | Deep blue-black sky; **city skyglow low on the north-east horizon** (neutral grey, faintly warm), the dependable silhouette backdrop | High: pools of light in darkness | 0–3 (game-compressed; real moonlight is darker); unlit ground stays dark, never pure black | Fires from collapses, Detonator blasts and burning wrecks; flares | Islands: amber squad pools, cool streetlight pools, flickering red-orange fire with smoke |
| 20 and later | Deep night | Moon lower in the west (or as rounds 15–19 if Q19 keeps a fixed moon) | Skyglow remains | Highest | Same clamp as rounds 15–19 | **Streetlights die progressively** as infrastructure fails (by round and by destruction) | The suburb goes dark except where the squad holds: the frontline can be read as a line of light |

**Map-relative light direction on the first map.** 167th Street runs east–west across the middle of the map. In the
golden and dusk rounds, a squad looking **west** along 167th Street faces the low sun or the bright dusk band, so
zombies on that axis are backlit silhouettes with rim; looking **east** they are front-lit and flatter. North–south
residential streets get side light. This is a gift for the long band (the silhouette tests in Section 3 run on the
west-facing axis first) and a known hazard (glare from the low sun is real; Section 2.6 caps it). At night the
north-east skyglow gives a lighter sky behind anything on a ridge of rubble, a roofline or the open fields.

### 2.3 Mood targets by game state

Each state's targets are written for a lighting artist and a VFX artist to work from. "Carrier" is the one visual
element that must carry the state if everything else is cut.

| State | Emotional target | Lighting character | Atmosphere (3–5 words) | Energy | Carrier |
| ---- | ---- | ---- | ---- | ---- | ---- |
| **Front end** (main menu, lobby) | Unease inside the ordinary: "the street before" | An intact, empty residential street at late afternoon (sun higher than round 1, about 20°); every house dark in daylight | Still, ordinary, empty, crisp, wrong | Contemplative | One wrong note in an ordinary scene: dark windows in daylight, an untended leaf pile blowing across a driveway, a car door left open |
| **Role select** | Readiness, belonging to a squad | The four squadmates in an open two-car garage lit by the squad's steady amber work light on a mast; grey daylight outside | Prepared, warm, cramped, purposeful | Measured | The amber work light: the game's first lesson that steady, mounted, coned amber light means the squad |
| **Map select and loading** | Recognition: "that is a real place" | The dark cartographic sheet (Section 7): real street names drawing in over building footprints | Quiet, exact, documentary | Contemplative | Real street names and parks resolving on the map; the ODbL attribution sits on this screen |
| **Deploy and round 0** (first intermission at the home sector) | Control, just barely: the squad sets up | Round 1 light; long views down 167th Street | Open, bright, exposed, purposeful | Measured | The squad raising the first work-light mast and dropping the first crate at the home crossing |
| **Intermission** (every later round) | A held breath; decisions | The current round's light with no muzzle flash; smoke and dust from the last wave drifting | Settling, smoky, ticking, quiet | Measured, tightening as the timer runs | **Settling motion**: dust falling and smoke drifting downwind, where combat dust rises and bursts |
| **Wave, holding a sector** (Dig In) | Pressure on the line | Muzzle blast bouncing off house fronts; work-light cones full of dust | Loud, dusty, close, heavy, chaotic | Frenetic in bursts | Muzzle-blast bounce light on siding and the dust torn from boards at the openings the horde is attacking |
| **Wave, pushing** (capturing a sector) | Going forward into the unknown | From the squad's amber ground into an unlit, horde-held sector; weapon lights and flares lead | Exposed, forward, cold, uncertain | Driving | **Light as territory**: the moment the new work light goes up as the capture completes |
| **Counter-push, overrun, sector lost** | Losing ground | The held sector's amber pool failing: a work-light mast knocked down, its cone gone; breaches opening around it | Collapsing, smothered, frantic, cold | Frenetic | A squad work light going out. Lights out means the sector is lost |
| **Downed** (player's view) | Desperate, still in the fight | The world from the ground; desaturation of 40% at most, a vignette, no blur in the central 60% of the screen | Low, muffled, narrowed, urgent | Frantic but focused | Squadmates' cyan chevrons and the Corpsman's approach are what stands out: help is the brightest thing in view |
| **Dead and redeploy** | Detached overview, eager to return | The tactical map (dark chart) with the frontline drawn | Quiet, exact, impatient | Measured | The frontline on the map and the squadmate chosen to spawn on |
| **Evac** (landing-zone defence, rounds 10, 20, 30) | Hope with a deadline | Dusk at round 10, night at rounds 20 and 30; the landing zone lit by the squad's overhead flares and ringed by its work lights (flares are never on the ground, AB-11); rotor wash | Wind-blasted, loud, bright, hopeful, frantic | Peak frenetic | Rotor wash tearing dust and leaves off the field, inside a ring of amber |
| **Victory** (evac succeeds) | Relief and authorship: "we made this ruin" | A rising aerial pull-back over the real street grid at dusk or night: breaches, collapses, smoke, and the held sectors' amber lights still burning | Relieved, vast, quiet, earned | Contemplative | The street grid seen from above, scarred by the squad's own decisions |
| **Defeat** (wipe or last sector lost) | Finality: "it is theirs now" | A hold on the last held sector as its work light goes out and horde silhouettes cross it, then the tactical map turning horde-grey sector by sector | Quiet, cold, final, dark | Still | The last amber pool going out |
| **Match summary** | Reflection and pride | Dark chart: the match drawn as a map of what the squad held, broke and built | Exact, calm, retrospective | Contemplative | The map of the squad's own changes |

**How the states stay distinct.** Each state differs from its neighbours in at least two of: light (temperature or
contrast), motion of the atmosphere (dust rising and bursting in combat, settling in intermission), camera (low in
downed, overhead in death and victory) and HUD density (Section 7). The front end and the deploy are the only states
with an undamaged street, so the player's first and last images of the place are "before" and "after".

### 2.4 Night readability, per band

These are the concept's night minimums, made specific enough to light against:

| Band | Rule | How it is lit |
| ---- | ---- | ---- |
| Close (2–30 m) | Always readable | Every squadmate carries a weapon light (cool white, about 6,000 K, coned); work lights at held sectors; muzzle flash; a zombie inside 30 m never renders as a fully black shape |
| Street (30–150 m) | Readable under any surviving streetlight, fire or work light; a zombie's silhouette never goes fully black against the sky | While streetlights survive, no stretch of street where the squad must fight is far from a light; once they die, work lights, flares and fires carry it. Skyglow and moonlight keep the sky lighter than the ground |
| Long (150–400 m) | Readable **only** where a motivated source lights the axis or the Spotter has marked the target | Deliberately hard at night. Flares, burning wrecks and surviving streetlights on 167th Street create readable stretches; Spotter marks (Section 7) do the rest |

**Measured test** (run on tone-mapped greyscale captures of the final frame): the figure's torso against its immediate
background has a luminance contrast of at least **3:1 in the close band** and at least **1.5:1 at the far edge of the
street band**, under the light of the round the type first appears in. Starting values; the MVP's greybox time-of-day
curve calibrates them.

### 2.5 The horde readability light (a bounded cheat)

When a grounded fix (moving a motivated light, adjusting the value of a zombie's wardrobe, the skyglow) cannot meet
the night minimums, a non-physical aid is allowed, with all of these limits (AB-07):

- It lights **horde characters only** (its own lighting channel), is shadowless, and is placed relative to the viewer
  so that it draws a thin rim on the side of the zombie away from the camera. It never lights the world, the squad or
  the first-person view, so it can never be seen as a light source.
- It is **off in rounds 1–9** and ramps in from round 10.
- It works only in the close and street bands and fades out between 120 and 150 m, so the long band stays hard.
- **Cap:** the rim may make a silhouette visible; it may never make a zombie the brightest thing in view. Its
  contribution is clamped below the luminance of the brightest motivated-lit surface in the same frame.
- An accessibility option, **Night visibility assist**, raises the cap by up to two times (Section 7.6).

### 2.6 Atmosphere: dust, smoke, haze, glare and wind

| Element | Look | Behaviour | Readability limit |
| ---- | ---- | ---- | ---- |
| **Destruction dust** | Drywall gypsum (off-white grey), mortar and brick dust (buff), wood dust (pale tan), by the panel's material | Bursts out of the break, rises, then settles within 4–8 s, drifting downwind on a light westerly breeze | In the close and street bands, a burst may hide a zombie for about 1 s at most unless the break itself is the gameplay cause |
| **Smoke from fires** | Dark grey-brown columns, leaning downwind; embers at night | Persists while the fire burns; rises above roof height before it spreads | Columns rise; they do not pool at head height on the street |
| **Smoke from charges and Detonators** | White-grey burst plus dust | Dissipates in 3–6 s | Same 1 s limit as dust |
| **Thrown smoke** (Vertical Slice) | Grey-white, dense | The only smoke that may blind on purpose: it has a gameplay cause | No limit while active; it fades within its designed duration |
| **Haze** | Dry late-autumn haze; aerial perspective that greys and lightens distance | Constant per round band; denser at dusk | In daylight, a long-band target at 400 m keeps at least half its unhazed contrast |
| **Light cones at night** | Low-density volumetric scattering makes work-light, streetlight and weapon-light cones visible | The visible cone is part of the squad light's non-hue cue (Section 4.4); a cheap mesh cone stands in where volumetric fog is off (Section 8.8) | Cones never wash a zombie out: scattering density is capped near ground level |
| **Low-sun glare** | Real glare looking west in the golden and dusk rounds | Bloom and veiling glare are kept modest | Glare may lower contrast but never erase a silhouette in the street band |
| **Wind** | Light breeze; leaves skittering on asphalt; bare branches swaying slightly | Constant gentle; no gusts | Never strong enough to drift dust across a doorway for more than a moment |

**Not in this game's atmosphere:** rain, wet surfaces, fog banks, snow, lightning, coloured fog, god rays aimed at the
camera for effect, and any "spooky" green or purple tint. The horror comes from a real street failing, not from
weather or a supernatural grade.

## 3. Shape Language

### 3.1 The governing idea

**The real suburb keeps its own shapes; this section governs only what the game adds.** Houses, streets, trees and
parks look the way they really look. The shapes Holdout authors are the squad, the horde, the damage, the
fortifications, the deployables, the weapons and the UI, and each follows one rule: it must read at the size the
player will actually see it (Principle 3), and it must tell "touched by the fight" apart from "real and untouched"
(Principle 2).

### 3.2 How big things really are on screen

"Readable at thumbnail size" is measured, not guessed. At 1920 × 1080 with a 90° horizontal field of view (about
58.7° vertical), the projection puts **960 ÷ d pixels on each metre** at distance d near the centre of the screen: 32
px per metre at 30 m, **12 px per metre at 80 m**, 6.4 at 150 m. A standing 1.8 m figure is therefore this tall on
screen (a hunched 1.5 m zombie is about 17% shorter). A 4× optic multiplies every figure by four. *(Corrected
2026-11-19 after the agent-run gate: the first table was about 10% too large; AB-26.)*

| Distance | Band edge | Height on screen, unaided | Through a 4× optic |
| ---- | ---- | ---- | ---- |
| 30 m | Close / street | about 58 px | about 230 px |
| 80 m | The role test (concept) | about 22 px | about 86 px |
| 150 m | Street / long | about 11.5 px | about 46 px |
| 300 m | Long | about 5.8 px | about 23 px |
| 400 m | Long, far edge | about 4.3 px | about 17 px |

Consequences for every silhouette rule below:
- A **role** must read from about 22 px of height: the distinguishing shape has to be big (a third of the torso's
  width, or a clear spike or diagonal), never a pouch or a patch.
- **Minimum on-screen size at the role test.** Every part of a role primitive that carries the read must be at least
  **2 px across at 80 m at 1080p**, which is **at least 17 cm of real width**. Aim for **20 cm or more**, because TSR
  rebuilds the image from a lower internal resolution in the Medium tier (Section 8.10; the screen percentage is an
  open item in Appendix B). Thinner parts come out under half a pixel at 80 m. A 3 cm mast, a tool handle or a strap is
  lost under TSR at every LOD. Such parts may add close-range detail but never carry a role's read. The minimum is
  measured in the **front and back views**: in each, at least one part of the primitive that no other role has must
  meet it. In a **side view**, the primitive must still push the outline out by at least 2 px, above the shoulder line
  or behind the back. Section 3.3 gives each role's measurements.
- A **street-band zombie type** at 150 m is about 10 px tall unaided (hunched), too small for anything but posture and
  gait. The type's posture must change its bounding shape (low and long, wide and top-heavy), and its gait must differ
  in rhythm.
- A **long-band** type at 300–400 m is about 3.5–6 px tall unaided; it reads by **gait and posture through an optic**.
  The silhouette tests therefore run in the long band through the MVP's magnified optic, and unaided in the close band
  (AB-08 clarifies the concept's test this way).

### 3.3 Character silhouettes

**The squad is vertical; the horde is broken.** Squadmates stand plumb: a straight spine, a smooth round helmet dome
(no zombie has one), a plate carrier that squares the torso, and a weapon at low ready that adds a forward horizontal
line. Zombies are never upright like the squad: every type is hunched, leaning, off-balance or broken in line, with
bare heads, hair or hoods.

**Each role owns one primitive shape**, carried on the back and hips (the concept's kits, given a primitive each so
they cannot be confused at about 22 px). Every measurement below meets the minimum in Section 3.2: at least 2 px, or
17 cm, at 80 m, carried by mass and never by a thin part. Reference widths for a squadmate in kit: about 50 cm
across the shoulder line, about 38 cm across the hips.

| Role | Primitive | The kit that makes it | What must survive at 80 m (about 22 px; 12 px per metre) | Secondary cue |
| ---- | ---- | ---- | ---- | ---- |
| **Corpsman** | **Hump**: a wide, rounded pack low on the back with a rounded side bag on each hip, plus bulky thigh pouches, so the lower silhouette widens into a pear from every side | Rounded medical pack with two side bags on the belt and a drag strap across the shoulders; leg pouches | **Front and back:** the pack and side bags reach at least 17 cm past the hips on each side (about 72 cm across, at least 2 px beyond the hips each side), wider than the shoulder line. **Side:** the pack stands at least 20 cm proud of the carrier | The kneeling-revive pose; the revive kit in hand |
| **Quartermaster** | **Block**: a tall rectangular crate frame on the back, rising above the shoulders | Frame pack loaded with ammo cans; the frame's rigid rails and top bar draw the rectangle whether it is loaded or empty; squared shoulder line | A rectangle at least 35 cm wide standing at least 20 cm above the shoulder line (about 4 × 2.4 px), the same loaded or empty | The two-handed carry of the crate before deploying it |
| **Sapper** | **Diagonal**: the reinforce tool in a **rigid, padded scabbard** slung across the back at 35–45°. The scabbard's flared mouth and the tool's head break above one shoulder, and its foot shows past the opposite hip. A heavy charge bag rides on one hip | The reinforce tool (at least 1 m long, head at least 20 cm across) in a scabbard at least 17 cm wide; the breach-charge bag | A band at least 17 cm wide crossing the torso outline, showing past the opposite hip and breaking the shoulder line by at least 20 cm. The scabbard alone, not the tool, makes the break, so it survives with the tool drawn. A charge bag standing at least 17 cm off one hip, so the outline is asymmetric from the front and back | The only role with an asymmetric silhouette |
| **Spotter** | **Spike**: a collapsible sensor mast rising from the back and carrying a **sensor head with real mass**, plus a long scope case | Sensor mast with its head; scope case; the lightest kit | The tallest squad silhouette: a sensor head at least 20 cm across in every view (a squat drum or box; 2.4 px), with its top at least 40 cm above the helmet. The mast below it may fall under a pixel at 80 m and is never relied on | A slimmer torso with less kit |

Rules that protect these primitives:
- **Never hidden.** A cosmetic never hides the primitive (cosmetics after launch may change colours, patterns and
  small items, never the primitive's outline).
- **Never below the minimum.** Every LOD keeps the primitive at no less than its 80 m minimum (Section 5.6).
- **Deploying or drawing a gadget never removes the back primitive.** The Quartermaster's crate frame stays on the
  back, with its outline, when the crate is set down. The Spotter's back mast stays when the sensor tripod is placed,
  because the tripod is a separate device (Section 3.5). The Sapper's rigid scabbard keeps the diagonal when the
  reinforce tool is drawn. The Corpsman's pack and side bags stay when the revive kit is in hand.
- **A light gadget never makes another role's primitive.** A squad-gap or solo light gadget, including the solo kit's
  light reinforce tool, has a compact, hip-carried form (Section 5.2). It is never slung on the back, never rises
  above the shoulder line and never widens the lower outline, so the silhouette still names the role the player chose.
- **The gadget in the hand repeats the primitive.** A role's own full gadget in the hand repeats that role's
  primitive (Section 3.5).

**Each horde type owns a posture and a gait** (the concept's shape language, with the band and light each must be read
in):

| Type | Posture and silhouette | Gait | Read in band | First light it appears in |
| ---- | ---- | ---- | ---- | ---- |
| **Shambler** | The baseline: forward tilt of about 15°, one shoulder dropped, arms loose | Uneven lurch, a dragging step | All | Late afternoon (round 1) |
| **Runner** | Low forward lean of 30–40°, arms back, head forward | Fast, long, flat stride | Street | Late afternoon (about round 4) |
| **Breacher** | Oversized shoulders and arms: a broad, top-heavy wedge, wider than tall | Slow, heavy, plodding | Street and close | Golden (about round 8) |
| **Detonator** | Swollen, front-heavy torso (a pear inverted on top), small head | Slow side-to-side rocking | Long | Dusk (about round 12) |
| **Grabber** | Arms too long, carried reaching forward; the silhouette extends ahead of the body | Purposeful stalk, arms leading | Close | Dusk (about round 14) |
| **Plated** | A flat, slab-like improvised front: a sheet of debris (plywood, a section of fence or siding) fused to and carried by its front, giving a flat vertical plane | Rigid, square-on advance | Close | Night (about round 16) |
| **Crawler** | Low and long: horizontal, under 0.8 m tall | Fast scuttle on all fours; climbs rubble | Close | Night (about round 18) |
| **Howler** | Tall, arms raised, head thrown back | Walks, then **stops and calls** (a distinctive pause) | Long | Deep night (about round 22) |
| **Wrecker** (boss) | Massive and asymmetric, two to three times a person's mass | Slow, ground-shaking | All | Night (rounds 20 and 30) |

A type passes its test when playtesters name it from silhouette (and in the long band, gait) alone at the far edge of
its band, under the light of the round it first appears in, with the HUD off, in at least 80% of trials (concept MVP
criterion). Far-tier zombies (beyond about 150 m) keep one locally played looping gait cycle per type, so the gait
reads survive the far tier (concept system 9).

### 3.4 Environment geometry

**The real suburb** is rectilinear and low: one- and two-storey horizontal masses under pitched roofs (gable triangles,
hip trapezoids, compound forms on split-levels), a steady rhythm of driveways, garage doors and parkway trees, and a
flat Midwestern horizon. Its verticals are trees, utility poles, streetlights and the occasional larger building (the
school, a place of worship, the two apartment buildings). Everything real is **plumb and level**.

**The fight** is off-axis. Everything the squad or the horde adds or breaks is angled, jagged or improvised: boards
nailed across openings at differing angles (never all parallel, always overhanging the opening's edges), the
Sapper's diagonal bracing, holes with torn edges, sagging headers, rubble wedges and ramps, wrecks slewed across
lanes, deployables set down at an angle to the street grid. Ownership is not shown by angle (both sides make the
same kind of mess); the squad's infrastructure carries its yellow marker in the UI layer (Section 4).

**Panel states change the outline** (the concept's rule, expanded for modellers):

| State | Outline | Detail that supports it (never instead of it) |
| ---- | ---- | ---- |
| Intact | Clean, continuous edges; straight trim and siding courses; corner boards plumb | Real weathering only |
| Damaged | A bowed or cracked edge; trim missing; siding courses sprung so the horizontal lines break; a dark gap opening at a seam; glass cracked | Splinters, exposed house wrap, chipped brick |
| Breached | A jagged, passable hole with light (or darkness) through it, with broken studs bent outward as vertical bars at its edges | Insulation, torn drywall, dust on the ground below |
| Destroyed | Gone: stud stumps at the floor plate, a sagging header, a low rubble pile at the base | Rubble shows real pieces (a window frame, a strip of siding, shingles) |
| Reinforced (flag) | Diagonal braces and plates that **cross the panel's outline** and extend past its edges | Fixings, scuffs; the squad's yellow marker in the UI |
| Boarded (a fortified opening) | Two to four boards across the opening at differing angles, overhanging its edges | Nail heads, splits; boards that thin out as the horde tears them |

"Which wall is weakest" must read on vinyl siding at 30 m at dusk without relying on surface texture (concept test).

### 3.5 Weapons, melee weapons and gadgets

- **Guns** are grounded, generic designs built on real operating principles, with no manufacturer marks, real model
  names or trade dress (AB-09). Each class has a first-person silhouette no other class shares: pistol (short block),
  shotgun (long tube with a pump), assault rifle (curved magazine and rail), DMR (long barrel with the magnified
  optic's hump).
- **Attachments change the silhouette** in first and third person: a long or heavy barrel extends the line, a
  suppressor adds a fat tube, a brake adds a ported block, a magnified optic adds a hump. The trade-off an attachment
  carries (Pillar 3) should be visible before it is read: heavier-looking means slower handling.
- **Melee weapons** read by head mass: blunt (a thick head on a short handle), heavy (a long handle and a large head,
  sledge or axe, the one that breaches), blade (a long thin edge). They are tools and implements a suburb would have.
- **Gadgets repeat their role's primitive**: the Corpsman's revive kit is soft and rounded; the Quartermaster's ammo
  crate is a squared box with handles; the Sapper's reinforce tool is a long handle (at least 1 m) with a head, and
  the breach charge is a flat rectangular plate with a strap; the Spotter's sensor is a tripod with its own short mast
  (a spike), a separate device from the mast on the Spotter's back. **Deploying or drawing a gadget leaves the back
  primitive in place** (Section 3.3): the crate comes off the frame and the frame stays; the tripod is placed and the
  back mast stays; the tool is drawn and the scabbard keeps the diagonal.
- **Light gadgets are compact and hip-carried.** The squad-gap kit's light gadgets and the solo kit's light items
  (the light reinforce tool and the ammo pouch) never repeat another role's primitive. They fit the hip envelope in
  Section 5.2: nothing on the back, nothing above the shoulder line, nothing longer than 50 cm, and nothing standing
  more than 8 cm off the body, which is under 1 px at 80 m.

### 3.6 UI shape grammar

The UI does **not** echo the world's realism; it echoes the **map** (the cartographic language kept from "Survey
Grade"). Its shapes are drawn, not modelled: thin linework, ticks, hatching and outlines, with square corners and
map-sheet corner ticks. There are no pill-shaped buttons, bevels, gloss, glows or military stencils, and nothing
borrowed from any reference game's HUD.

| Shape | Meaning | Notes |
| ---- | ---- | ---- |
| **Chevron** | Squadmate, squad ping | Points up; carries the role icon above it |
| **Survey tick**: a notched, hatched triangle | Horde (spotted zombie, horde-held sector) | Never a diamond (AB-10; concept A45) |
| **Square** with a solid outline | Player infrastructure (supply point, armory, workbench, deployed gadget, fortification you own) | |
| **Hazard-stripe outline**, pulsing | Danger (breach warning, explosive, structural failure, a downed squadmate) | Applied around whichever shape it modifies |
| **Mast-and-cone glyph** | A held sector (the squad's light) | The HUD twin of the work light |
| **Hatched band** | The frontline on the tactical map | Hatching leans toward the horde side |
| **Footprint outline** | Buildings on the map | The real OSM footprints |

Line weights scale with the HUD scale option; at 1080p and 100% the base stroke is 2 px and no meaningful line is
thinner than 1.5 px.

### 3.7 Hero shapes and supporting shapes

What draws the eye is decided by value contrast and edge sharpness, in four tiers:

| Tier | What | Rule |
| ---- | ---- | ---- |
| 1. Hero | Threats in the close and street bands (zombie silhouettes); squad light pools and squad markers; openings (breaches with light through) | Highest local contrast in the frame |
| 2. Play space | Cover lines, sector anchor buildings, fortifications, interactables (crates, armories, workbenches) | Clear edges, medium-high contrast |
| 3. Supporting | Facades, lawns, trees, fences, street furniture | Textured, medium contrast; no high-contrast pattern at head height along likely approach lanes |
| 4. Background | Backdrop beyond the map, the horizon, the sky | Low contrast, softened by haze |

No tier-3 or tier-4 element may out-contrast a tier-1 element behind which it sits. High-frequency patterns at 1–2 m
height along approach lanes (chain-link fence moiré, picket rhythms, bare-branch filigree against a bright sky) are
thinned, rotated or moved by set dressing where they sit behind a lane the horde uses.

## 4. Color System

### 4.1 Two layers, and the meaning colours live in only one

- **The world layer** is the real suburb: physically based materials under real light, with **no stylised global
  grade**. Mood comes from the time of day, smoke and dust. Green lawns and street-name signs, yellow centre lines
  and school-zone signs, red brick and stop signs keep their real colours. **Meaning colours are never enforced on
  world surfaces.**
- **The meaning layer** is what the game adds: UI, markers and pings, and the lights, emissives and VFX the game
  places for the squad and the horde. The five meaning colours are reserved for this layer.

The skill asks for a primary palette of 5–7 colours. Holdout has two small palettes, one per layer: seven **world
reference swatches** that describe the real place (they guide material calibration; they are not paint), and five
**meaning colours** that are exact (they are UI values).

### 4.2 World palette (reference swatches, not paint)

The world's colour comes from scanned and calibrated PBR materials (Section 6.5). These swatches are what the
late-autumn suburb averages out to in neutral daylight, so a material that drifts far from them gets checked.

| Swatch | Approx. sRGB | What it is in this world | What it tells the player |
| ---- | ---- | ---- | ---- |
| **Dormant lawn** | `#6F7449`, tan patches `#9A8C62` | Front and back yards, parks, fields, the cemetery | Open ground: exposed, no cover, long sightlines |
| **Street asphalt** | `#545659` | 167th Street, residential streets, driveways' ends | The lanes: where the horde comes from and the long band runs |
| **Driveway concrete** | `#A8A59D` | Driveways, sidewalks, stoops, foundations | The ground between house and street; the paths to doors and garages |
| **Brick veneer** | red-brown `#84473A`, buff `#B09372` | Front faces of many houses; the school; chimneys | Harder material: from the Vertical Slice, brick stops pistol and SMG rounds (medium penetration class) |
| **Vinyl siding** | almond `#D6D0BF`, grey `#B4B8B2`, sage `#98A08F`, white `#E6E4DC` | Flanks and fronts of most houses; garage walls | Soft material: concealment, not cover (soft penetration class, Vertical Slice) |
| **Asphalt shingles** | charcoal `#47484A`, weathered brown `#64574A` | Roofs | The skyline; roof form is what makes each house read at distance |
| **Bare bark and leaf litter** | bark `#5A534A`, litter `#7E5232` | Parkway and yard trees, Creek Woods, leaves along curbs and fences | Season and age; the woods' close quarters |

The siding and brick swatches carry a real, learnable meaning without any meaning colour: the colour of a wall tells
the player what it is made of, and (from the Vertical Slice) what it will stop. That is Principle 1 doing gameplay
work.

### 4.3 Meaning palette (exact UI values)

| Colour | Value | L* | Meaning | Why this colour means it here | Non-hue cue (always present) |
| ---- | ---- | ---- | ---- | ---- | ---- |
| **Danger red** | `#FF4F5E` | 60 | Breach warnings, explosives, structural failure, a downed squadmate (and only the horde types named in the rule below) | Red already means stop and danger in the real world (stop signs, alarms), and it is the colour of injury | A **hazard-stripe outline** plus a **pulse** (at most 1.5 Hz) |
| **Squad cyan** | `#3CCFE6` | 77 | Squadmates, squad pings, squad UI | Nothing natural in a late-autumn suburb at night is cyan, so it cannot be mistaken for the world | The **chevron**, with Holdout's role icons |
| **Horde green-grey** | `#A3AC86` | 69 | The horde: horde-held sectors on the map, spotted-zombie markers | A drained, sickly tone: the colour of the dead and of the dormant ground they cross | The **survey tick** (a notched, hatched triangle, never a diamond); hatched fill on the map |
| **Road-marking yellow** | `#F7D24A` | 85 | Player infrastructure: supply points, armories, workbenches, deployed gadgets, fortifications you own | The colour of things built and maintained for use, like road markings | The **square** with a solid outline |
| **Sodium amber** | `#B8661C` (HUD); about 2,000 K (light) | 52 | Light the squad places (work lights at held sectors, flares) and held sectors in the HUD | The colour of a sodium work light someone deliberately put up | **Steady** (never flickers), **mounted** on a visible mast or housing, throwing a **defined cone**; in the HUD, the mast-and-cone glyph |

**Why these exact values.** The concept's colour rules were checked by simulation (Section 4.7). A "saturated red" at
the usual value and an amber at the usual value merge for deuteranopes (ΔE76 about 7). The danger red is therefore
lighter and slightly pinker, and the amber darker, which keeps every pair apart and keeps road-marking yellow and
sodium amber at least 32 L* apart in every simulation (the concept asked for them to be separated by value as well as
by shape).

**Precedence when meanings overlap: danger > squad > horde > infrastructure.** A marker's **shape** says who owns it
and its **colour** shows the highest meaning: a spotted Detonator is a horde survey tick in danger red; a downed
squadmate is a squad chevron in danger red, pulsing; a Sapper's armed charge is an infrastructure square in danger red.

**Which horde markers take danger red (the single statement of this rule; Section 7.2 points here).** Being a special
does **not** make a zombie a danger. A spotted zombie's survey tick stays **horde green-grey for every type, specials
included**. A special may add a small **type glyph** inside its tick, drawn in the same green-grey, so its type is told
by shape (the HUD specification draws the glyphs). Only a type that threatens an **explosion** or a **structure** is
recoloured to danger red, and it then carries danger's hazard stripe and pulse like any other danger marker:

| Type | Marker |
| ---- | ---- |
| **Detonator** (explosive) | Danger red for the marker's whole lifetime |
| **Breacher**, **Wrecker** | Danger red **only while attacking a panel** (Section 3.4); back to green-grey when the attack stops |
| Every other type (Shambler, Runner, Grabber, Plated, Crawler, Howler; the Breacher and Wrecker when not attacking a panel) | Horde green-grey survey tick, with the optional type glyph |

This keeps danger red the top-priority channel. A late round's HUD is mostly green-grey ticks, and the few pulsing red
ones are the zombies about to blow up or break in. They compete only with what danger already means: breach warnings,
structural failure and a downed squadmate (AB-24).

### 4.4 The light vocabulary

Light is where the two layers meet, so every light source has a fixed colour, behaviour and form:

| Source | Colour | Behaviour | Form | Layer |
| ---- | ---- | ---- | ---- | ---- |
| Sun, sky | Per the light plan (Section 2.2) | Falls with the rounds | Directional | World |
| Moon | Rendered cool and desaturated | Steady | Directional; key light at night | World |
| City skyglow | Neutral grey, faintly warm, low on the north-east horizon | Steady | Sky only; lights nothing | World |
| **Streetlights** | **Cool white, about 4,000 K** (a rendering rule, whatever the real fixtures are) | Steady; on at round 10; die progressively from round 20 | On poles, a pool below each | World |
| Houses, porches, windows | **Dark, always** | — | — | World |
| Traffic signals on 167th Street | **Dark** (the power is failing; never flashing red, which would read as danger) | — | — | World |
| **Fire** (collapses, Detonator blasts, burning wrecks) | Red-orange, about 1,800–2,200 K | **Flickers**, always **with smoke** | On the ground, irregular | World (caused by the fight) |
| Muzzle flash, explosions | White-yellow burst | One to a few frames | Lights the surroundings briefly | Meaning-neutral VFX |
| **Squad work lights** | **Sodium amber, about 2,000 K**; optionally the low-pressure-sodium look that drains colour from what it lights | **Steady** | **Mounted** on a visible mast or housing, throwing a **defined cone** | Meaning (squad) |
| **Flares** (illumination and supply-drop flares) | Sodium amber | **Steady**, descending slowly under a parachute | **Overhead**: the only squad light not mounted, and never on the ground (AB-11) | Meaning (squad) |
| Supply-drop marker | Road-marking yellow smoke at the drop point | Rises steadily | Plus the square marker in the UI | Meaning (infrastructure) |
| Weapon lights | Cool white, about 6,000 K | Steady, moving with the squadmate | Coned | Squad tool |
| Gadget indicator emissives | Breach charge arming LED in danger red (blink at most 2 Hz); Spotter sensor status LED in squad cyan | Small (under 2 cm); never a light source | On the device | Meaning |
| Horde readability light | Not visible as a light | Bounded (Section 2.5) | Lights horde characters only | Readability aid |

The squad's light is the **only warm light that is steady, mounted and coned** (or steady and overhead, for flares).
Fire flickers, runs red-orange, sits on the ground and always comes with smoke. Streetlights are cool. Houses are dark.
That makes the squad's light readable without relying on hue, which is the concept's non-hue cue for amber.

**World objects that would mimic a meaning colour are kept out:** no steady amber world light; no cyan emissive
anywhere in the world; no active emergency-vehicle light bars; no hazard-yellow or safety-orange high-visibility
clothing on zombies (Section 5.4); no school buses. Real painted colours (yellow centre lines, a yellow school-zone
sign) stay, because they are surfaces, not lights or markers.

### 4.5 Per-area colour temperature rules

| Area (first map) | Day | Night | Rule |
| ---- | ---- | ---- | ---- |
| **167th Street** corridor (home sector) | Open and sky-dominated; broad neutral-grey asphalt; the warmest light in golden rounds comes straight down the axis from the west | Cool streetlight pools spaced along the axis until they die; warm squad pools at the home crossing | The long axis keeps the most even light so the long band is fair in daylight; at night only motivated stretches are readable |
| **Residential blocks** | Warmer mid-values (brick, beige siding, leaf litter); cool in house shadows | The darkest ground between streetlights; warm only where the squad holds | No light source exists here that the squad did not bring, except streetlights and fires |
| **Creek Woods** | Cool, low-value browns and the late green of the understory; dim even by day under the canopy edge | The darkest area of the map: no streetlights; weapon lights and work lights only | The close-quarters sector stays close-quarters at every hour; never add ambient fill to make it easier |
| **School Grounds** | Pale dormant field; a generic pale-brick, single-storey institutional building | Unlit (field and building lights off) | Generic and quiet; no set-piece fires placed here (sensitivity, Section 6.7) |
| **Cemetery** | Open lawn, grey granite headstones, mature trees | Unlit, cold | No special lighting, no fire set pieces, no gore decals (Section 6.7) |
| **Lewis Park Fields** | Pale dormant grass; chain-link backstops | Unlit (field lights off) | The long-band showcase: keep the ground value even so silhouettes read |
| **Creek Trail** | A pale paved ribbon between tree lines | Dim | A flank lane: it reads as a pale line at night only under moonlight or flares |

**Warm means held.** At night the squad's held sectors are warm, steady islands and everything else is cool or dark,
so the frontline reads as a boundary between warm and cool. Fires in horde ground are the one exception, and they are
told apart by flicker, smoke and their red-orange hue.

### 4.6 UI palette and where it diverges

The UI is cooler, darker and more neutral than the world, and meaning colours appear in it only on glyphs, outlines
and thin accent bars, never as text colour or large fills.

| Role | Value | Notes |
| ---- | ---- | ---- |
| HUD text, primary | `#F2F0EA` (L* 95) | 15.7:1 against the HUD plate |
| HUD text, secondary | `#B9BEC2` (L* 77) | 9.5:1 against the HUD plate |
| HUD plate | `#14181B` at 60–75% opacity | Behind text wherever text sits over the world |
| Tactical map background ("dark chart") | `#161B1F` | The map is a dark chart, not light paper (AB-12): one meaning palette works on both HUD and map, and it suits night play |
| Map footprints | Line `#5E676F`, fill `#20262B` | Real OSM building outlines |
| Map streets | 167th Street `#D5D9DC` (widest); residential `#9DA4AA`; footways and the trail dashed `#6F777E` | Real street names in HUD text colours |
| Map water | `#2B3F4C` | Dark blue-grey, far from squad cyan (ΔE76 above 50 in every simulation) |
| Map land cover (woods, parks, grass) | **Neutral grey textures only** (stipple for woods, light tint for parks) | **No green on the map**, so land cover can never be confused with horde green-grey |

All five meaning colours keep at least 4:1 contrast against the HUD plate and the dark chart (non-text graphics need
3:1). Text is never set in a meaning colour; an alert is HUD-white text on a plate outlined in the meaning colour.

### 4.7 Colour-blind safety

Colour is never the only carrier: every meaning has its shape (Section 4.3), danger also pulses, and the squad's light
also has its behaviour and form. The palette was checked by simulating protanopia, deuteranopia and tritanopia (Machado
2009 model, full severity) and measuring each pair's separation (ΔE76 in CIELAB) and value gap (ΔL*). The table shows
each pair's worst case across the three simulations:

| Pair | Smallest ΔE76 (simulation) | Smallest ΔL* (simulation) | Backup that carries it |
| ---- | ---- | ---- | ---- |
| Danger / squad | 44.7 (protan) | 9.7 (deutan) | Hazard stripe and pulse vs chevron |
| Danger / horde | **18.9** (protan) | **4.1** (deutan) | Hazard stripe and pulse vs survey tick; precedence rule (danger recolours the horde shape) |
| Danger / infrastructure | 37.3 (deutan) | 22.0 (deutan) | Hazard stripe and pulse vs square |
| Danger / amber | **18.9** (deutan) | **3.4** (protan) | Pulse vs steady; hazard stripe vs mast-and-cone glyph |
| Squad / horde | 39.2 (protan) | 5.6 (deutan) | Chevron vs survey tick |
| Squad / infrastructure | 68.9 (tritan) | 2.3 (protan) | Chevron vs square |
| Squad / amber | 75.6 (protan) | 20.1 (deutan) | Chevron vs mast-and-cone glyph |
| Horde / infrastructure | 28.8 (tritan) | 14.1 (protan) | Survey tick vs square |
| Horde / amber | 37.4 (protan) | 14.5 (deutan) | Survey tick vs mast-and-cone glyph |
| Infrastructure / amber | 35.4 (deutan) | **32.2** (tritan) | Separated by value in every simulation, as the concept required; square vs mast-and-cone glyph |

The two weakest pairs (danger against horde, and danger against amber) are exactly the pairs where danger's pulse and
hazard stripe are always present, so no meaning depends on their hue.

**Rules for the options menu (Section 7.6):** no full-screen colour-blind filter (it would distort the world layer,
which must stay real); instead an option to thicken marker outlines and add a dark keyline, and an option to remap any
meaning colour to an alternative from a pre-validated set. Every HUD and map screenshot in review is run through the
three simulations, and a marker fails if its meaning cannot be told from shape alone in greyscale.

## 5. Character Design Direction

### 5.1 The squad: visual archetype

**A four-soldier response squad in grounded, contemporary infantry kit, generic and fictional.** The look is
believable modern soldiering (helmet, eye protection, plate carrier, combat shirt under a soft-shell jacket for the
late-autumn cold, gloves, boots), but it identifies no real country, service, unit or agency (AB-09):

- **No real insignia**: no national flags, service or unit patches, rank insignia, agency marks or name tapes of real
  organisations. Holdout's own squad emblem is drawn in the cartographic UI language (Section 7.4).
- **No trademarked camouflage patterns.** Several well-known commercial patterns are registered trademarks. The squad
  wears **solid colours** (field grey-green shirts and jackets, coyote-tan carriers and pouches, dark grey helmets),
  or Holdout's own pattern if one is ever designed.
- **No branded gear**: no visible maker's logos on helmets, optics, packs or boots.
- **Two body frames** (male and female) for every role; every kit fits both.
- **Generic faces**, built from licensed sources (a commercial scan library with model releases, or MetaHuman under
  its licence; verify the terms at acquisition). No real person's likeness. Helmets and eye protection cover much of
  the face, which keeps head count and quality bar affordable.

The squad's palette is muted and military, which separates it from the horde's civilian wardrobe. Role is shown by
**shape, not colour** (all four share one palette), so the role test works in greyscale and for colour-blind players.

### 5.2 Role kits

| Role | Primitive (Section 3.3) | Kit pieces on the body | Gadgets (MVP in bold) | First-person identity |
| ---- | ---- | ---- | ---- | ---- |
| **Corpsman** | Hump | Rounded medical pack low on the back with a rounded side bag on each hip (about 72 cm across in all, Section 3.3); drag strap across the shoulders; bulky thigh pouches; tourniquet on the sleeve | **Revive kit**; med pouch (VS) | Tourniquet and trauma-shears pocket on the sleeve; the revive kit's soft rounded pouch in the gadget hand |
| **Quartermaster** | Block | Tall frame pack loaded with ammo cans, its rigid rails and top bar keeping the block when the crate is off; squared shoulder line; extra magazine pouches | **Ammo crate**; ammo pouch (VS) | Leather work gloves; a magazine-heavy chest rig seen when looking down; the crate's squared box carried two-handed |
| **Sapper** | Diagonal | Long-handled reinforce tool in a rigid, padded scabbard (at least 17 cm wide) slung across the back, which keeps the diagonal when the tool is drawn; heavy charge bag on one hip; knee pads | **Reinforce tool**, **breach charge**; collapse charge (Alpha) | Heavy work gloves with knuckle protection; the long tool's head in view when braced; the flat charge plate with its strap |
| **Spotter** | Spike | Collapsible sensor mast rising from the back, topped by a sensor head at least 20 cm across; it stays on the back when the sensor tripod is placed; long scope case; light kit | **Sensor**; spotting scope (VS) | Thin shooting gloves; a wrist display that shows the sensor's status in squad cyan (a small emissive, Section 4.4) |

**Squad-gap kit (2–3 player squads) and solo kit (Vertical Slice).** A player carrying another role's light gadget
(concept system 2), or the solo kit's extra items, does **not** gain that role's back primitive. Every light gadget
has a **compact, hip-carried form** inside one envelope. It is never on the back and never above the shoulder line. It
is no longer than 50 cm, and a long item hangs vertically. It stands no more than 8 cm off the body, which is under 1
px at 80 m, so it never widens the lower outline the way the Corpsman's bags do. The silhouette therefore still says
which role the player chose, and the role test stays honest. Starting forms:

| Light item | Compact form | Never |
| ---- | ---- | ---- |
| Light revive kit | A flat pouch on the thigh | A back pack or side bags (the Corpsman's hump) |
| Light ammo crate | A flat ammo box (no deeper than 8 cm) clipped to the thigh, set down to resupply | A frame or anything above the shoulders (the block) |
| Light reinforce tool (squad-gap kit and solo kit) | A short one-handed bar under 50 cm, carried vertically in a hip loop | Anything at least 1 m long, slung diagonally or on the back (reserved for the Sapper's full tool, Section 3.3) |
| Light breach charge (if the gap kit carries one; concept review open) | A small plate in a flat thigh pouch | A charge bag on the hip (the Sapper's asymmetry) |
| Light sensor | A palm-sized puck in a hip pouch, placed on the ground with no mast above 40 cm | Any mast on the back (the spike) |
| Solo kit's ammo pouch and self-revive charge | Pouches on the belt | Anything outside the envelope |

### 5.3 First-person: the most-seen character

In a first-person game the hands, sleeves, weapons and gadgets are the character the player actually sees. They are
the highest-detail characters in the game (Section 8.5):

- **Weight is the brief** (Pillar 3): recoil kicks and recovers visibly; reloads are deliberate and physical; heavy
  melee wind-ups carry the weapon's mass; deploying a gadget has heft (setting the crate down, planting the sensor
  tripod).
- **Role identity in first person** comes from the sleeve, the gloves and the gadget (table above), so a player who
  never looks at a mirror still feels which role they are.
- **Weapon realism, generic design** (Section 3.5): attachments are physically present and visibly change the weapon.

### 5.4 The horde

**Who they were.** Ordinary adult residents of a generic suburb, turned recently (days, not months): mottled
grey-olive skin, livor, wounds, dirt, and torn late-autumn civilian clothes. They are **never** children (absolute
rule from the concept), never real people, and never depicted emerging from graves.

**Wardrobe** (modular, late autumn, civilian): hoodies, puffer vests, flannel shirts, work jackets, sweaters, jeans,
sweatpants, office trousers, a bathrobe or pyjamas (it happened at night), generic work coveralls. Rules:

- **No text, logos or brands** on any garment; no sports-team apparel; no political or religious symbols.
- **No real-world uniforms or insignia**: no police, fire, military, postal, school-staff or other agency uniforms.
- **No helmets or hard hats** on any zombie: the round helmet dome is the squad's cue (Section 5.7).
- **No meaning colours in bulk**: no saturated cyan, no safety yellow or safety orange, no large areas of saturated
  red. Garments sit in muted mid and dark values, with some light pieces (a white T-shirt, a pale grey hoodie) so the
  crowd has figure-ground variety against both dark and light backgrounds.

**Skin and eyes.** Desaturated grey-olive with mottling; a slightly higher, moist sheen than living skin, which is a
grounded way to pick up rim light at dusk and night. Eyes are clouded and **never glow**: zombies carry no emissives at
all, so at night they read by silhouette, never by points of light.

**Variation.** Three body frames (slight, average, heavy), at least 12 heads, 10 tops and 8 bottoms at the First Map
Complete tier, plus damage masks and per-instance colour variation inside the wardrobe palette. No two identical
combinations within any visible group of six.

**Special types** push the same human anatomy under impossible stress, not into fantasy: no tentacles, glowing
growths or mutations from a creature catalogue. The Breacher's shoulders have outgrown its shirt; the Detonator is
gas-swollen, its skin taut and discoloured, and its tell is a visible swelling pulse and a hiss before it bursts (not
a glow); the Grabber's arms are stretched 15–20% beyond human proportion and carried reaching; the Plated carries a slab
of debris fused to its front; the Crawler's legs or spine are broken; the Howler is tall and thin with a distended
throat; the Wrecker is massive and asymmetric. All names are working names (concept system 9).

### 5.5 Expression and pose

| Who | Style | Specifics |
| ---- | ---- | ---- |
| Squad | Grounded and controlled; motion capture as the base | Idle weight shifts; deliberate reloads; pointing when pinging (third person); the kneel for a revive; a heavy drag (Corpsman passive, VS); faces neutral and focused; no emotes at MVP |
| Horde | **Telegraph first**: broken and off-balance, with attack wind-ups exaggerated in amplitude and timing beyond realism so they read and can be parried | Wind-ups lift the arms above the head line or twist the torso so the attack is visible in silhouette; hit reactions are heavy and directional; a parried attack produces a large, clear stagger; the exact timings belong to the melee GDD |

Exaggeration is allowed **only** in timing and amplitude of horde attacks and reactions (readability, Principle 3).
Everything else moves as real bodies move.

### 5.6 How much detail survives at game distance (LOD philosophy)

| Distance | Representation | Must survive | May go |
| ---- | ---- | ---- | ---- |
| Under 15 m | LOD0 | Everything | Nothing |
| 15–40 m | LOD1 | Silhouette, primitives, wardrobe colour blocks, wound decals | Cloth simulation, small straps and pouches |
| 40–80 m | LOD2 | Role primitive at no less than its 80 m minimum (Section 3.2) and helmet dome; zombie posture, limb proportions, the Plated slab, the Detonator's swelling | Face detail, wound detail, secondary kit |
| 80–150 m | LOD3 | The same as LOD2, at lower density | Fingers, small kit |
| Beyond about 150 m | Far tier: the lowest LOD with one locally played signature gait cycle per type | Bounding shape and gait rhythm | Everything else |

The rule: **LODs remove detail inside the silhouette, never from it.** A Spotter whose sensor head disappears or
shrinks below 17 cm at LOD2 fails the role test; that LOD is rejected. Thin parts that never carried the read (the
Spotter's mast, the Sapper's strap) may thin out or go. Characters do not use Nanite (Section 8.5).

### 5.7 Telling squad, horde and world apart at a glance

There are **no civilians and no friendly NPCs**: anything human-shaped is either a squadmate or the horde. The
distinction is built in layers, so it survives darkness, smoke and colour-blindness:

1. **Posture**: squadmates are upright and plumb; zombies are never upright like the squad.
2. **Head**: a smooth helmet dome means squad; zombies never wear helmets or hard hats.
3. **Kit**: the squad's role primitive on back and hips; zombies carry nothing.
4. **Light**: at night every squadmate carries a coned white weapon light; zombies carry no light and no emissive.
5. **UI**: a cyan chevron with the role icon over each squadmate (Section 7).

### 5.8 Gore

The concept assumes an M / PEGI 18 rating (open question Q6). The art supports two gore tiers as a player option:
**full** (dismemberment for the blade family, wound decals, blood pools) and **reduced** (no dismemberment, darker,
less saturated blood, fewer and shorter-lived decals). Blood is a realistic dark, desaturated red, clearly distinct
from the UI's lighter danger red. Gore decals are **suppressed on sensitive sites** (the School Grounds, the Cemetery,
places of worship; Section 6.7) and capped and faded elsewhere (Section 8.9). The full gore budget depends on Q6.

## 6. Environment Design Language

### 6.1 Architectural style and its tie to the place

The first test map is a stretch of the Chicago south suburbs: subdivisions of single-family houses on a mix of
curving and grid streets, cut east–west by 167th Street (a secondary road with corner houses that turn their sides to
it), with one school, three places of worship, a cemetery, parks with sports fields, woods along Tinley Creek and a
paved regional trail. The culture the architecture expresses is the commuter suburb: practical, unpretentious family
homes of brick and siding, the attached garage at the front, the lawn, the parkway tree. That ordinariness is the
point. The worst night lands because the place is so recognisably normal.

The style is **researched from generic public sources** about how and when the area was built: typology references
for Chicago-area suburban housing of the post-war decades through the 1970s and 1980s (to be confirmed in a style
research brief before the realism pass). It is **never** researched from street-level imagery or photographs of
specific homes, and nobody photographs houses in the map area for reference (Principle 1; concept A29).

### 6.2 House typology and kit families

The extract has 756 buildings (745 inside the map box) with **no height or level tags**, so storeys are inferred.
Aggregate footprint statistics from the local pipeline output guide kit sizes: houses have a median footprint of
about 160 m² (10th to 90th percentile about 110–250 m²) and a median oriented footprint of about 16 m × 10 m; the
20 tagged garages are about 58 m² (a two-car detached garage); untyped buildings range from small sheds and garages
(about 55 m² at the 10th percentile) to house-sized footprints.

| Kit family | Storeys | What it looks like | Roof | Cladding | Garage | Starting selection rule (the pipeline decides; designers may override storeys on sector buildings) |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| **Ranch** | 1 | Long and low, long side to the street | Hip or gable | Brick front with sided flanks, or all brick | Attached, one end, front-facing | Near-rectangular, about 110–220 m², aspect ratio 1.4 or more |
| **Raised ranch / bi-level** | 1.5–2 | Split entry; the lower level half below grade | Gable | Brick lower level, siding above | Attached or tucked under | Near-rectangular, about 100–170 m², aspect under 1.4 |
| **Split-level** | Tri-level | A two-storey wing beside a one-storey wing | Compound | Mixed | Under the upper wing | L-shaped or stepped footprints (rectangularity under 0.85) |
| **Two-storey** | 2 | A compact box; front door centred | Gable or hip | Brick ground floor at the front, siding above and on the flanks | Attached two-car | Near-rectangular, about 90–150 m², close to square |
| **Detached garage** | 1 | A simple gabled box with an overhead door | Gable | Siding | — | Tagged garages; untyped 40–80 m² behind a house |
| **Shed** | 1 | Small outbuilding | Gable or lean-to | Siding or painted wood | — | Under about 25 m² |
| **Apartment building** | 3 | A plain block | Low hip or flat | Brick | Surface parking | The two tagged apartment buildings |
| **Civic, generic** | 1–2 | The school: a generic single-storey institutional brick building; places of worship: generic sealed masses | Flat (school); pitched (worship) | Brick | — | By OSM amenity type; rendered generically (Section 6.7) |

### 6.3 Fitting kits to real footprints, and the variation rule

**Footprints and streets never move** (Pillar 2). Kits fit the real footprint, not the other way round:

- **Grid and modules.** A 1.22 m (4 ft) base grid; standard wall panels 2.44 m (8 ft) wide (the concept's 2–3 m
  panels); filler panels 0.6–1.8 m wide absorb each wall run's remainder at corners or between openings, never
  splitting a window or door.
- **Heights.** 2.75 m floor to floor (8 ft ceilings plus the floor structure), a foundation reveal of 0.3–0.6 m, roof
  pitches of 4:12 to 6:12, eaves 0.3–0.45 m. The pipeline's storey inference should use these kit heights rather than
  the OSM convention of 3.2 m per level (a note for the pipeline, AB-13).
- **Openings.** Entry doors 0.91 × 2.03 m; double-hung windows about 0.9 × 1.4 m with sills at 0.9 m; picture windows
  1.8–2.4 m wide; sliding patio doors 1.8 × 2.03 m at the back; garage doors 2.74 × 2.13 m (single) and 4.88 × 2.13 m
  (double). Gameplay metrics (breach passability, the player capsule) are owned by the level GDD; the kit respects
  them.
- **Facade logic.** The front faces the nearest named street; the garage sits on the street side at one end; the
  entry door is near the centre or beside the garage; the back has a patio slider; side walls are mostly blank with
  one or two windows (which makes them the natural breach walls).
- **Variation rule** (the concept's, extended): neighbouring houses differ in at least two of kit, cladding colour,
  roof form and garage side; and no fully identical house (kit, cladding, colour, roof and garage side) appears within
  150 m (the street band) on the same street. Choices are seeded deterministically from the building's OSM way ID, so
  every client and every rebuild produce the same street.
- **Roof gate.** No single-family house renders with a flat roof. Hip and compound roofs must exist in the pipeline
  before the realism art pass (today 169 gable-hinted footprints that are not near-rectangles fall back to flat).

### 6.4 What is inside each wall (honest damage)

Damage exposes only what the real wall contains, in the order real houses fail. Storm-damage surveys of wood-frame
houses show the sequence: trim, gutters, siding and shingles go first, then glass, then garage doors, then roof deck
and wall sections, then whole walls. Damage states and horde damage visuals follow that order.

| Wall type | Layers, outside to inside | Damaged shows | Breached and destroyed show | Dust |
| ---- | ---- | ---- | ---- | ---- |
| **Siding wall** (vinyl or aluminium) | Siding → plain house wrap (unbranded) → OSB or plywood sheathing → 2×4 studs at about 40 cm centres → fibreglass batt insulation → vapour barrier → 12.5 mm drywall | Siding courses sprung and cracked; trim off; wrap exposed | Splintered sheathing; snapped studs bent outward; insulation tufts; drywall broken to the paper | Off-white gypsum, pale wood |
| **Brick-veneer wall** | Brick → air gap with metal ties → sheathing → studs → insulation → drywall | Chipped and cracked brick; mortar loss | Bricks gone in stepped courses; the stud wall visible through the hole | Buff mortar and brick |
| **Garage door** | Steel sectional panels on rollers and track | Dents and buckled panels | A panel torn out; the door collapsed inward or outward | Little; a metal clatter |
| **Interior partition** | Drywall → studs → drywall, with electrical boxes and wire stubs | Holes in the board | Studs and wire exposed | Off-white gypsum |
| **Windows and doors** | Vinyl double-hung frames, glass, screens; steel or wood entry doors; hollow-core interior doors | Cracked glass; a sagging screen | Glass gone, frame broken; door off its hinges | Glass glitter |
| **Upper floor** | Carpet or vinyl → OSB subfloor → joists | — | Joists and subfloor edges | Pale wood |
| **Roof** | Shingles → felt underlayment (unbranded) → OSB deck → trusses or rafters | Missing shingles | Exposed deck and trusses (collapse states only) | Grit |
| **Masonry** (school, apartments) | Brick → concrete block | Chips | Broken block (hard class) | Grey concrete |

**Never:** pink insulation (a registered trademark colour for insulation; use cream, pale yellow or grey), branded
house wrap or underlayment print, rebar or stone rubble in a wood-frame house, generic "concrete chunk" debris, or a
collapse that is only smoke.

**Fortifications are lumber-yard real and askew:** boards are 2×6 lumber and OSB sheets with visible nails or screws;
the Sapper's bracing is steel strap plates plus 2×4 diagonal braces; deployables are set down off the street grid.

### 6.5 Texture philosophy: calibrated PBR, sourced from photogrammetry

**Physically based materials, sourced from photogrammetry libraries and calibrated to real albedo**, on UE 5.8's
Substrate materials (on by default since 5.7). Why this, and not painted or stylised:

- It is the user's direction (grounded realism, D7) and the only route to "the real suburb looking real" under Lumen.
- A small team cannot paint a realistic suburb by hand; a scan library supplies believable bark, asphalt, concrete,
  brick, soil and leaf litter, and the team spends its effort on the kit, the damage and the light.
- Calibrated materials respond correctly as the light changes across the rounds; painted lighting or stylised values
  would break the failing-light arc.

**How the surfaces are built:**
- **Tiling materials and trim sheets** for the house kit (siding, brick, trim, shingles), so hundreds of houses share
  a few textures; per-instance parameters vary cladding colour within the world swatches (Section 4.2).
- **Layered weathering** by mask: north-facing siding carries green-grey algae streaks; south faces are faded; gutter
  streaks run below eaves; a 30 cm splash zone of grime sits at the base of walls; downspout straps rust.
- **Ground blending** (roads into driveways into lawns, leaf litter drifts) by virtual texturing or decals; the
  method is the technical artist's call (Section 8.4).
- **Decals** for grime, leaf drifts, tyre marks, scorch and blood, within the caps of Section 8.9.
- **Albedo ranges**: non-metals between about sRGB 40 and 240; no lighting or ambient occlusion baked into albedo;
  roughness reflects dry late autumn (no wet looks). Validated in engine with the base-colour buffer view.
- **Sealed houses' windows** use an interior-mapping material (a parallax room behind the glass, curtains and blinds
  varied, rooms **dark**): it costs no geometry and keeps every house dark.

### 6.6 Prop density by area type

| Area type | Density | What drives it | Typical props | Cover role | Not here |
| ---- | ---- | ---- | ---- | ---- | ---- |
| **167th Street corridor** | Sparse to medium | The long band needs open sightlines | Wrecks slewed across lanes, utility poles and overhead lines, streetlights, dark traffic signals, real street-name signs | Wrecks and pole bases are the main cover | Anything that closes the axis, except rubble and wrecks the gameplay layer places |
| **Residential streets** | Medium | A cover chance every 30–50 m along horde lanes | Cars in driveways and at curbs (generic), trash and recycling carts (unbranded), paper leaf bags, mailboxes (no numbers), basketball hoops, hydrants, storm drains, parkway trees and stumps | Cars, carts and trees break lanes | Text, numbers, brands |
| **Front yards** | Sparse | Real front yards are open | Foundation shrubs, one tree, a dark lamp post, leaf piles, a rake | Low | Fences in front yards (rare in the region) |
| **Back yards** | Medium | Rule-generated fences make the yards a maze | Chain-link and wood privacy fences, decks and patios, grills, air-conditioning condensers, sheds | Fences for concealment; condensers and decks for low cover | Child-specific play equipment (AB-14) |
| **Garages** (enterable) | Dense | Garage caches live here | Shelves, workbench, hand tools, bins, a lawnmower, sometimes a car | Close-quarters cover | Branded tools and products |
| **Interiors** (enterable) | Medium-dense | Rooms as cover; doorways as melee ground | Generic furniture; picture frames with landscapes, never people | Furniture | Photographs of people, children's rooms, readable text (AB-14) |
| **Creek Woods** | Dense, natural | Close quarters at every hour | Understory, deadfall logs, creek banks, the creek, footbridges where OSM has them | Logs, banks, trunks | Lights, campsites, props suggesting residents |
| **Fields and parks** | Sparse | Landing zones and the long band | Backstops, benches, bleachers, bins, faded field markings | Little | Playground equipment (AB-14) |
| **Cemetery** | Sparse, ordered | An exposed crossing | Rows of low generic headstones, mature trees, perimeter fence | Low headstones | Names, symbols, open graves (Section 6.7) |
| **School Grounds** | Sparse | A generic institution | The generic building, a parking lot with a few cars, the field | The building and cars | Signage, names, mascots, buses, child-specific props (Section 6.7) |
| **Held sectors** (added by the squad) | Medium | The squad's infrastructure | Work-light masts, the ammo crate, the sector armory (a stack of hard cases and a rack), the workbench (a sawhorse table with tools), boards and bracing | The squad's own fortifications | Anything clean and perfectly aligned: everything here is askew |

### 6.7 Sensitive sites

The concept's safeguards (A29) as render rules:

| Site | Rendering | Rules |
| ---- | ---- | ---- |
| **School Grounds** (labelled generically) | A generic single-storey institutional brick building, a field, a parking lot | No name, signage, mascot or school colours; no school buses; no child-specific props; gore decals suppressed; no set-piece fires; never shown in marketing (concept R5); whether it stays a sector is open (Q16) |
| **Cemetery** (labelled generically) | Open lawn, rows of low grey headstones, mature trees, a perimeter fence | Headstones are **nameless, generic and indestructible**, and take no decals (no scorch, blood or bullet marks); no open graves; no zombie ever emerges from a grave; never a landing zone |
| **Places of worship** (three; never sectors) | Generic sealed masses with pitched roofs | **No religious iconography**; sealed and **not destructible** beyond cosmetic chips (AB-14); no gore decals; no set-piece fires |
| **Parks with playgrounds** | Open lawn and benches where OSM marks a playground | **Playground equipment omitted** (AB-14) |

### 6.8 Environmental storytelling

**The story the world tells without text: "the evening it happened, a few days ago".**

- **Ordinary life, interrupted.** Cars in driveways with a door left open; a garage door half-raised; trash and
  recycling carts at the curb for collection day; paper leaf bags and a rake on the lawn; a suitcase dropped beside a
  car; carved pumpkins going soft on a stoop (early November, said without a word).
- **The power failed.** Dark houses and dark traffic signals in daylight; streetlights still on their photocells until
  they too die.
- **An evacuation, not a massacre.** No civilian bodies are set-dressed anywhere (concept R5). The only dead are the
  horde the squad kills.
- **The squad's war is the main story.** What the squad breaks, braces and lights accumulates and persists: held
  sectors gather boards, bracing, empty ammo cans and spent brass; lost sectors show the squad's infrastructure torn
  down and the work light on its side. By round 20 the map should be a readable record of the match (the concept's
  "authorship of the arena").
- **No text storytelling.** No notes, graffiti, spray-painted messages, invented signs, readable screens or papers.
  The only text in the world is real street-name signs (real OSM names on generic green blades with white legend, in
  the same open highway-style typeface as the UI, Section 7.3, and never with a municipal logo), stop signs, and
  nothing else. No house numbers on houses or mailboxes.

## 7. UI/HUD Visual Direction

### 7.1 Philosophy: diegetic first, then a thin layer drawn like a map

Information reaches the player in this order of preference:

1. **In the world** (diegetic): the weapon's own reticle, a magazine check, the kit on a squadmate's back, a work
   light at a held sector, a wall's outline as it fails, the sound of a breath or a dry click.
2. **On the world** (spatial markers): chevrons, survey ticks and squares in the meaning colours, placed where the
   thing is.
3. **On the screen** (a minimal screen-space HUD): only what cannot be shown in or on the world, much of it contextual
   (it appears when it changes or matters, then fades).

The screen-space layer is drawn in **Holdout's own cartographic language** (the concept's "the map shows through, on
the map only"): thin linework, ticks, hatching, real street names. The world itself is never stylised. No HUD look is
borrowed from any reference game; Holdout's role icons and its survey tick replace the reference series' class icons
and spotting marker (concept U1, R12).

### 7.2 HUD elements

The visual language is set here; the layout and behaviour are specified in `design/ux/hud.md` by `/ux-design`.

| Element | Visibility | Position (starting) | Form |
| ---- | ---- | ---- | ---- |
| Crosshair | Hip fire only; hidden when aiming (the optic's reticle is diegetic) | Centre | A small dot with spread ticks; can be hidden in options |
| Stamina | Contextual: only below full or while blocking | Thin arc around the crosshair | Arc in HUD white; breath audio does the rest |
| Ammo | Contextual: on reload, when low (25% or less), at a crate or supply point; fades after 3 s | Bottom right | Magazine and reserve numerals in tabular figures; a held reload key performs a diegetic magazine check |
| Gadget charges | Contextual: on change and while the gadget is equipped | Beside ammo | The gadget glyph with charge ticks |
| Own health | Contextual: while below full | Bottom left | A thin bar, plus a damage edge vignette (capped opacity) and directional damage arcs toward the source |
| Salvage | Contextual: on change, at an armory or workbench, and during intermissions | Above ammo | Numerals with the salvage glyph |
| Squad list | Persistent, compact | Left edge | Four rows: role icon, name, state (alive, downed with bleed-out ring, dead with redeploy timer); a small low-health flag |
| Squad markers | Persistent; fade with distance; outlined when occluded | Over each squadmate | Cyan chevron with role icon and name |
| Pings and spotted zombies | For their lifetime (pings 5 s, specials 8 s) | In the world | Squad cyan chevron (position), survey tick (zombie: horde green-grey for every type, specials included, with an optional type glyph inside; danger red only for the types and moments listed in Section 4.3), square (items); hollow when occluded |
| Compass strip | Persistent | Top centre | A cartographic bearing strip with markers, plus **the real name of the street the player is on** (Pillar 2 in one line of text) |
| Sector board | Persistent | Under the compass | A chip per sector with its generic label: held (amber mast-and-cone glyph), horde-held (green-grey survey tick, hatched), capturing (progress ring), contested (both glyphs, ring paused), overrun (danger hazard stripe) |
| Round and phase | Persistent, small; the intermission timer is large while it runs | Top right | Round number; intermission countdown; Push or Dig In vote state |
| Squad events | Contextual, at most three lines, fading | Top right, under the round | Squad actions only ("revived", "resupplied", "reinforced"), which rewards Pillar 4. No kill feed |
| Interaction prompts | Contextual | Below the crosshair | Key glyph, verb and cost ("Reinforce · 150"); revive and capture progress as a thin bar |
| Hit confirmation | On **impact**, not on firing (projectiles take time to land) | Around the crosshair | Four short ticks; a kill adds a brief inward motion; a headshot is marked by sound. **No damage numbers** |
| Parry feedback | On a parry | Diegetic first | Sparks, the zombie's large stagger and the sound; at most a 120 ms crosshair pulse |
| Panel states | Diegetic (outlines, Section 3.4) | In the world | While a Sapper holds the reinforce tool, an overlay outlines nearby panels: squad-owned reinforced (yellow), about to fail (danger red) |
| Downed | While downed | Centre | Bleed-out ring; the nearest squadmate's distance and approach; the world view desaturated 40% at most, no blur in the central 60% |
| Tactical map | Hold to open | Full screen | The dark chart (Section 7.8) |
| Subtitles | For every voice callout | Bottom centre | HUD white on a plate |

**No persistent minimap at MVP** (AB-15): the compass strip, world markers and the hold-to-open tactical map carry
orientation. Playtests decide whether a corner minimap returns as an option.

### 7.3 Typography

**Personality:** the road sign and the survey map. American highway lettering is the most familiar public typography
of a US suburb, and it ties the HUD to the real street signs in the world.

- **Primary typeface: Overpass** (an open-source family inspired by the US highway alphabet; licensed under the SIL
  Open Font Licence and LGPL). **Numerals: Overpass Mono** (tabular). The same typeface sets the in-world street-name
  signs. *Fallback:* IBM Plex Sans Condensed and Plex Mono (SIL OFL). Verify both licences and the glyph coverage
  needed for the later cities' street names before shipping (AB-16).
- **Case:** sentence case everywhere, except short labels of 12 characters or fewer (sector chips, the compass
  letters), which may be capitals with 5% extra tracking.

| Level | Size at 1080p, HUD scale 100% | Weight | Used for |
| ---- | ---- | ---- | ---- |
| Display | 40 px | Bold | Round banner, intermission countdown, evac call |
| Primary | 24 px | Semibold | Prompts, sector labels, the street-name readout |
| Secondary | 20 px | Regular | Squad names, salvage, ammo reserve, subtitles (default) |
| Tertiary | 18 px | Regular | Map labels for residential streets, legends |
| Legal | 16 px | Regular | ODbL attribution and licence line |

**Minimum readable size:** 18 px at 1080p for any gameplay information; 16 px only for legal text, which must still
be legible. Sizes scale with the HUD scale option (80–150%) and with a separate text-size option. Text sits on the HUD
plate wherever it overlaps the world.

### 7.4 Iconography

**Flat, outlined, cartographic.** Glyphs are single-colour linework (2 px stroke at 1080p and 100%) on a 24 px grid
(32 px for role icons), coloured by meaning, with no gradients, bevels, glows or photographic rendering.

| Icon | Holdout's design | Never |
| ---- | ---- | ---- |
| Corpsman | A pulse trace (a heartbeat line) inside a circle | A red cross, red crescent or red crystal on any background: these are protected emblems under the Geneva Conventions, and the Red Cross movement asks games not to use them (AB-17) |
| Quartermaster | Three cartridges side by side | The reference series' class icon |
| Sapper | A brace: a diagonal across a square frame (it echoes the reinforced panel) | The reference series' class icon |
| Spotter | A mast with two arcs (the sensor) | An eye, or the reference series' class icon |
| Spotted zombie | The survey tick | A diamond (concept A45) |
| Infrastructure | A square holding a small glyph: a rack (armory), a vice (workbench), an ammo can (supply point), a crate | |
| Held sector | The mast-and-cone glyph | |
| Weapons and attachments | Side-profile line drawings of Holdout's generic designs | Real product silhouettes or logos |
| Squad emblem | A survey benchmark disc (a circle with a level bar), Holdout's own | Real military or agency insignia |

Every icon is part of the IP checklist before public material (concept R12).

### 7.5 UI animation

**Mechanical and functional, like a plotter drawing a map.** Lines draw on in 100–150 ms; elements fade in 150–250 ms;
nothing bounces, overshoots or springs. Markers appear by drawing their outline. Danger pulses at 1.5 Hz at most, and
nothing on screen flashes faster than 3 Hz. Opening the tactical map draws the streets in, real names last. Menus cut
or cross-fade in 200 ms; no swooping parallax.

### 7.6 Accessibility options with a visual side

HUD scale (80–150%) and a separate text size; marker outline thickness and a dark keyline; per-meaning colour remap
from a pre-validated set (Section 4.7); **Night visibility assist** (raises the horde readability light's cap by up
to two times, Section 2.5); **Reduce flashes** (lower muzzle-flash and explosion bloom and flare intensity); camera
shake 0–100%; head bob off; field of view and aim field of view sliders; motion blur off; film grain off; damage
vignette opacity; subtitle size and plate opacity; crosshair style and visibility; reduced gore (Section 5.8). By
default no full-field flash exceeds three per second (muzzle flash, explosions and flares included). The full list
belongs to `design/accessibility-requirements.md`.

### 7.7 Art direction versus readability: conflicts and decisions

A specialist pair (`art-director` and `ux-designer`) would have argued these out; the user could not be asked, so
each is decided with both positions recorded (AB-15). Every decision can be overruled.

| # | Conflict | Art direction's position | UX position | Decision |
| ---- | ---- | ---- | ---- | ---- |
| 1 | Ammo | No counter: magazine checks and the sound of a near-empty weapon | Finite ammo with no drops and a limited supply stock means players must plan resupply and call for the Quartermaster | **Contextual numerals** (on reload, when low, at supply) plus the diegetic magazine check |
| 2 | Stamina | Breath audio and weapon sway only | Block and parry spend stamina; failing a block without warning feels unfair | **Contextual thin arc** at the crosshair, plus breath audio |
| 3 | Health | Edge vignette only | Revive and Corpsman priorities need a clear state | **Own health: contextual bar plus vignette. Squadmates: downed and low-health flags only** |
| 4 | Minimap | None: the world and the compass | A corner minimap reduces disorientation on a 1.2 km map | **None at MVP**; the compass strip shows the real street name; playtests decide on an optional minimap |
| 5 | Hit confirmation | Sound and impact effects only | With travel time, players need to know a shot landed | **Ticks on impact, no damage numbers** |
| 6 | Downed view | Heavy desaturation and blur | The downed player still crawls and shoots and must see threats | **40% desaturation at most; no blur in the central 60%** |
| 7 | Night | Dark nights that make the light plan matter | Threats must stay visible | The concept's per-band minimums (Section 2.4), the bounded readability light (Section 2.5) and **Night visibility assist** as an option |
| 8 | Spotted markers through walls | Markers only in line of sight | Spotting is a squad hand-off and must survive cover | **Visible through walls for their lifetime, drawn hollow when occluded** |
| 9 | Crosshair | No hip-fire crosshair | New players and controller users need a reference | **Small dot with spread ticks**, hideable |

### 7.8 The tactical map, the front end and attribution

- **Tactical map (the hero UI):** a dark chart of the real OSM data: building footprints, streets with their real
  names in a hierarchy (167th Street widest), water, neutral grey land cover, the sectors with their generic labels,
  the frontline as a hatched band, squad chevrons, pings, infrastructure squares and spotted ticks. **It shows the
  squad's changes:** breached and destroyed walls appear as gaps and broken outlines in the footprints, so the map
  becomes a record of the match.
- **Front end:** the main menu sits over the live "street before" scene (Section 2.3); role select is the open garage
  under the squad's work light; the end-of-match summary is the map of what the squad held, broke and built.
- **Map select and loading:** the map is named **"Tinley Park, IL (60477)"** (never after a subdivision); its
  cartographic sheet draws in; no promotional imagery of real houses is used.
- **ODbL attribution** ("© OpenStreetMap contributors", with a link to the licence) appears on map select, on loading
  screens, in a corner of the tactical map and in the credits, at the legal size or larger.

## 8. Asset Standards

### 8.1 Constraints these standards are built on

| Constraint | Value | Source |
| ---- | ---- | ---- |
| Engine | Unreal Engine 5.8 (pinned; latest hotfix 5.8.4), C++ and Blueprint | `project.yaml`, `technical-preferences.md` |
| Rendering | Lumen and Nanite (deferred); Substrate materials (on by default since 5.7); MegaLights production-ready in 5.8 (needs hardware or software ray-tracing support); Lumen Lite is Beta | `docs/engine-reference/unreal/modules/rendering.md` |
| Platform | PC (Windows) on Steam; mouse and keyboard first | Concept, `technical-preferences.md` |
| Performance target | **60 fps at 1080p on a mid-range GPU (RTX 3060 class)**, 4 players; 16.6 ms frame budget | `technical-preferences.md` (`project.yaml` has no `performance` block) |
| The hard case | A **listen-server host** renders while it also simulates the horde, destruction, projectiles and World Partition streaming for all four players | Concept (system 10, R2, R10) |
| Not yet configured | Draw-call budget, memory ceiling, minimum GPU | `technical-preferences.md`; concept R10 |
| Horde count | **24 active zombies at MVP, 48 target, plus the far tier** (concept system 9). `technical-preferences.md` says "up to ~100 active zombies"; the budgets here use the concept's numbers and the mismatch is flagged (AB-19) | Concept, `technical-preferences.md` |

Every budget in this section is a **starting value** for the technical director's netcode and rendering spike (MVP
months 1–3, including the Lumen/Nanite stress scene on the host). The spike confirms or revises them; this section is
then updated, not argued around.

### 8.2 File formats

| Asset type | Authoring source | Into the engine | In the engine |
| ---- | ---- | ---- | ---- |
| Static meshes (kit, props, rubble) | Any DCC; Blender is the default (no licence cost for a small team or outsourcers) | FBX (glTF allowed for static meshes) | Static Mesh, Nanite enabled where Section 8.5 allows |
| Skeletal meshes and animation | Any DCC | FBX | Skeletal Mesh, Animation Sequence, Montage |
| Textures, colour | 8-bit PNG or TIFF, sRGB | Same | Base colour BC7 (sRGB) |
| Textures, data | 16-bit PNG or TIFF (normals, heights) | Same | Normal BC5; packed occlusion-roughness-metallic BC7 (linear); single masks BC4 |
| HDR (sky, IES) | EXR; IES profiles | Same | HDR texture; IES light profile |
| UI glyphs | SVG | PNG exported at 2× the 100% HUD size | UI texture group, uncompressed, no mips |
| Fonts | OTF or TTF (licensed under SIL OFL) | Same | Font asset |
| Sourced library assets (Fab and Megascans) | As delivered | Imported, then renamed and re-pointed to Holdout's master materials | Standard |

Exchange settings: 1 unit = 1 cm, Z up, X forward for characters and weapons, real-world scale only, triangulated on
export, smoothing groups or hard edges exported, no embedded media, one asset per file for kit modules.

### 8.3 Naming convention

Epic-style prefixes (consistent with `technical-preferences.md`), then **`Prefix_Family_Descriptor_Variant_State`** in
PascalCase parts separated by underscores.

| Prefix | Asset | Example |
| ---- | ---- | ---- |
| `SM_` | Static mesh | `SM_KitSiding_Wall244_A_Breached` |
| `SK_` / `SKEL_` / `PHYS_` | Skeletal mesh / skeleton / physics asset | `SK_Zombie_Body_Average` |
| `T_` | Texture (suffix `_BC`, `_N`, `_ORM`, `_M`, `_E`, `_H`) | `T_KitSiding_Vinyl_N` |
| `M_` / `MI_` / `MF_` / `MPC_` | Material / instance / function / parameter collection | `MI_KitSiding_Vinyl_Almond` |
| `AS_` / `AM_` / `BS_` / `ABP_` | Animation sequence / montage / blend space / animation Blueprint | `AM_Zombie_Shambler_AttackOverhead` |
| `GC_` | Geometry Collection (cosmetic fracture only) | `GC_Panel_Brick_Wall244` |
| `NS_` / `NE_` | Niagara system / emitter | `NS_Dust_Gypsum_Burst` |
| `DA_` / `DT_` | Data asset / data table | `DA_KitFamily_Ranch` |
| `PCG_` | PCG graph | `PCG_YardDressing_Back` |
| `BP_` / `WBP_` | Blueprint / widget Blueprint | `WBP_HUD_SectorBoard` |
| `L_` | Level | `L_TinleyPark60477` |

**Panel states** are always one of `Intact`, `Damaged`, `Breached`, `Destroyed`; **reinforced** is a flag shown by
separate overlay meshes (`SM_KitBrace_…`). **Folders:** `Content/Holdout/` then `Characters/Squad`, `Characters/Horde`,
`Weapons`, `Gadgets`, `Environment/HouseKit`, `Environment/Props`, `Environment/Foliage`, `Environment/Ground`,
`Environment/Civic`, `VFX`, `UI`, `Materials/Masters`, `Lighting`, `Maps/TinleyPark60477`; sourced assets live under
`Content/Holdout/Sourced/<Library>/` until standardised.

### 8.4 Scale, pivots, texel density and texture tiers

- **Pivots:** kit panels at the bottom outer corner, on the 1.22 m grid (Section 6.3); props at the base centre;
  characters at the feet; weapons and gadgets at their rig socket.
- **Texel density:** 512 px per metre for environment tiling and trim sheets; 1,024 px per metre for close
  interactables (doors, crates, the workbench, garage-cache shelves); first-person weapons and arms get their own
  texture sets (tier table).
- **Ground blending** (roads, driveways, lawn edges, leaf drifts) uses runtime virtual texturing or decals, the
  technical artist's choice. Runtime virtual texturing is a long-standing engine feature that the pinned reference
  does not cover; verify it on 5.8 before committing to it.

| Tier | Max size | For |
| ---- | ---- | ---- |
| Hero | 4K | First-person weapons and arms; squad body and kit sets; the hero trims (siding, brick) |
| High | 2K | Zombie body and wardrobe sets; props in play spaces; scan-library surfaces (default); foliage atlases |
| Medium | 1K | Small props; decals; distant kit variants |
| Low | 512 | Backdrop props beyond the map; far-only assets |
| UI | Vector source | Icons exported at 2× their 100% HUD size (typically 48–64 px at 1×) |

### 8.5 Geometry budgets, material slots and LODs

| Category | Nanite | Triangles (LOD0 or source) | Material slots (max) | LODs | Notes |
| ---- | ---- | ---- | ---- | ---- | ---- |
| House-kit panel, intact | Yes | 5,000 | 3 (exterior, interior, shared wall internals) | Nanite | Instanced per state under one state owner per building (concept system 5) |
| House-kit panel, damaged or breached | Yes | 15,000 | 3 | Nanite | Built from the shared internals kit (Section 8.6) |
| Generated roof | Yes | By the generator; trim-sheet UVs | 2 | Nanite | Hip, gable and compound required (the roof gate) |
| Rubble state (per collapsed segment) | Yes | 50,000 | 3 | Nanite | Gameplay state, authored and replicated |
| Static props | Yes (opaque) | 1,000–20,000 | 2 | Nanite | Masked or translucent props are not Nanite |
| Vehicle wrecks | Yes | 60,000 | 3 | Nanite | Generic designs, no badges or trade dress |
| Gadgets and deployables | Yes when static | 15,000 | 2 | Nanite or 3 LODs | |
| Squad character (third person) | No | 60,000 (body and kit) | 4 (body, uniform, kit, head) | 4: 60k / 30k / 12k / 5k | The role primitive survives every LOD (Section 5.6) |
| Zombie, common | No | 30,000 (body and wardrobe merged) | 3 (skin, wardrobe, gore) | 4 plus far tier: 30k / 15k / 7k / 3k / 1.5k | Wardrobe pieces merged into one mesh at spawn to save draw calls |
| Zombie, special | No | 40,000 | 3 | As above | |
| Wrecker (boss) | No | 80,000 | 4 | 4 | |
| First-person arms | No | 30,000 | 2 | 1 | Per role sleeve and glove variants |
| First-person weapon | No | 60,000 (attachments up to 10,000 each) | 3 | 1 | |
| Third-person weapon | No | 10,000 | 2 | 3 | |
| Cosmetic fracture (Geometry Collection) | No | Up to 200 pieces per panel | 2 | — | Local only, never gameplay (Chaos Destruction is Beta in 5.8) |

**Characters, translucent surfaces and animated foliage are not Nanite** in this plan; the pinned reference lists no
skeletal or world-position-offset support for Nanite (written against 5.7, so verify on 5.8 before relying on either
way). **Draw calls:** Nanite keeps static opaque draw calls low, so the budget is spent by skeletal meshes,
translucency and decals; a starting value of 2,500 non-Nanite draw calls on the host in a busy sector view goes to the
spike to confirm.

**Collision:** kit panels use simple box collision per state; breached and destroyed states carry collision shaped to
the passable hole; complex-as-simple is never used for gameplay; tree trunks use capsules; leaves and grass have none.

**World Partition HLOD and destruction (flagged for the destruction ADR, AB-18).** HLODs are built offline from the
intact city. A building that has been damaged must never be shown as an intact HLOD in any player's view, which in the
long band means up to 400 m away. Options for the technical director: keep destructible buildings at full
representation within the long band of any player; exclude changed buildings from the HLOD swap; or give each
building a low-detail proxy that carries its state.

### 8.6 The OSM-driven house-kit generator: art standards

The generator turns real footprints into realistic, generic, destructible houses (concept system 6). Art owns the
kit and the rules; tools own the code.

1. **Repair and type** the footprint (house, garage, untyped by area).
2. **Infer storeys** with the kit's heights (Section 6.3).
3. **Choose the kit family** (Section 6.2).
4. **Facade grammar:** front to the nearest named street, garage side, openings by rule.
5. **Fit panels** on the 1.22 m grid with fillers.
6. **Generate the roof** (hip, gable, compound). **Gate:** no single-family house with a flat roof.
7. **Assign cladding and colour** by the variation rule, seeded by the OSM way ID.
8. **Dress the yard by rule:** the driveway from the garage to the street, foundation shrubs, a parkway tree or
   stump, fences between back yards, an air-conditioning condenser, leaf bags.
9. **Write per-panel destruction data:** material class, load-bearing flag, nav-link sockets (enterable buildings
   and the outer ring of sealed-house pockets only).
10. **Bake** into World Partition.

**Kit authoring rules:** every module has all four states with matching edges so neighbours still join; corner,
filler and opening modules exist for every family; exterior and interior faces are both modelled; one shared
**wall-internals kit** (studs, sheathing edges, insulation, drywall edges, wire stubs) supplies the inside of every
breach, modelled once and reused everywhere. **Automated checks** in the pipeline report: flat roofs on houses (must
be zero), variation-rule violations, identical houses within 150 m on a street, overlapping modules, off-grid panels.
**Determinism:** the same extract always produces the same street, on every client. **Repository hygiene:** generated
level geometry and raw extracts are regenerated locally and are not committed (concept system 6.1).

### 8.7 Foliage and Creek Woods

The late-autumn setting (Section 2.1) is also a budget decision: bare canopies remove most leaf cards. The risk is
wind: how Nanite handles animated foliage (world position offset) in 5.8 is **not sourceable** in the pinned reference
(concept, Technical Considerations).

- **Baseline (works either way):** trunks and major branches as static meshes (Nanite allowed, no wind on trunks);
  fine branches, understory and shrubs as non-Nanite instanced foliage with world-position-offset wind, LODs and
  impostors beyond about 150 m.
- **If the 5.8 spike verifies Nanite foliage with wind**, the fine branches and understory move to Nanite. Nothing
  else in this bible changes.
- **Species at First Map Complete** (about 15): parkway trees (maple, honey locust, linden, young replacement trees,
  stumps), yard trees (oak, spruce), foundation shrubs (yew, arborvitae, juniper), privet hedges, woods (oak, hickory,
  cottonwood along the creek), understory (buckthorn, bush honeysuckle), creek edges (dormant reeds and cattails).
  Lawns are a material with sparse tufts at edges; leaf litter is decals plus scattered meshes.

### 8.8 Lighting standards and tiers

Lights use physical units (lux for directional lights, candela or lumens for local lights) and colour temperature.
Streetlights use generic IES profiles. Every night light follows the vocabulary in Section 4.4.

| Tier | Global illumination | Local shadow-casting lights | Notes |
| ---- | ---- | ---- | ---- |
| **High / Epic** (recommended GPU and above) | Lumen | MegaLights on: all motivated night lights may cast shadows within the measured budget | The ideal look |
| **Medium** (the baseline every scene must pass) | Lumen without hardware ray tracing | **At most 6 per sector view**: 2–3 squad work lights, the 2 nearest streetlights, 1 fire; all others shadowless; fires and muzzle flash always shadowless | **The concept's non-ray-traced path** (no hardware ray tracing required); Virtual Shadow Maps for sun and moon |
| **Low** (minimum spec) | Lumen at its lowest scalability, or Lumen Lite (Beta; verify before relying on it) | At most 3 per sector view | Volumetric fog off; the squad light's cone is drawn with a cheap mesh cone so its non-hue cue survives |

**Per-source standards:** a work light is one shadowed spot light, an emissive housing on a visible mast and a cone
(volumetric or mesh); a streetlight is one spot light (shadowed only among the nearest two), an emissive head and a
pool; a fire is one shadowless flickering point light with particles and smoke; a flare is one moving point light,
shadowed only within the cap.

**Exposure and post:** a physical camera with clamped exposure ranges per round band (Section 2.2); the engine's
default filmic tone mapping; **no creative grade** beyond per-band white balance and a mild contrast curve; moderate
bloom; lens flares and chromatic aberration off; a subtle vignette; film grain optional and off by default; motion
blur low by default with an off option; TSR for anti-aliasing and upscaling.

### 8.9 VFX standards (Niagara)

| Effect | Standard |
| ---- | ---- |
| Destruction dust | One burst per panel state change, coloured by material (Section 2.6); settles within 4–8 s; may hide a zombie in the close or street band for about 1 s at most |
| Smoke | Lit translucent sprites with depth fade; fire smoke rises above roof height; heterogeneous volumes only for hero set-piece collapses at High and above, if the spike leaves room |
| Muzzle flash | Per weapon class, with a reduced suppressor variant; its light lasts one to two frames |
| Impacts | Per material class: drywall puff, siding crack, brick chips, wood splinters, glass, flesh |
| Cosmetic debris | Local only; a cap of about 1,500 live pieces per client; pieces settle and are removed within 10 s, while the authored rubble states carry the lasting ruin |
| Decals | About 200 dynamic decals per sector; blood and scorch fade after about 120 s; none on sensitive sites (Section 6.7) |
| Horde bodies | Up to about 24 persist per client and fade after 60–90 s; never on sensitive sites |
| Spent brass | Physical in first person; a capped, persistent scatter at held sectors (storytelling, Section 6.8) |
| Flashes | No full-field flash more than three times per second; the Reduce flashes option lowers them further |

### 8.10 Frame and memory budgets (starting values for the spike)

**GPU frame on the listen-server host, 1080p, Medium tier, RTX 3060 class, a busy night sector with smoke:**

| Pass | Budget (ms) |
| ---- | ---- |
| Lumen global illumination and reflections | 4.0 |
| Base pass and Nanite raster | 2.5 |
| Shadows (Virtual Shadow Maps and capped local shadows) | 2.0 |
| Local lighting | 1.0 |
| Translucency, VFX and decals | 1.5 |
| Skeletal characters (4 squad, 24–48 zombies, far tier) | 1.5 |
| Post-processing and TSR | 1.5 |
| Volumetric fog and light cones | 0.5 |
| UI | 0.3 |
| Headroom | 1.8 |
| **Total** | **16.6** |

**Video memory (texture streaming pool, starting values):** about 3,000 MB at High (12 GB cards), about 2,000 MB at
Medium (8 GB cards), about 1,200 MB at Low (6 GB cards); the Nanite streaming pool starts at the engine default and is
tuned in the spike.

**Minimum GPU:** not set. The concept requires it before the realism art pass (R10). A candidate for the technical
director to test is a 6 GB card of the RTX 2060 class at 1080p Low with TSR; nothing in this bible depends on that
choice except the Low tier's caps.

### 8.11 Sourcing and licences

- **Fab** (which now distributes the Megascans library) is the default source for scanned surfaces, plants and
  generic debris. Licence terms differ by asset and have changed over time: **verify each asset's licence at
  acquisition** and record it.
- A **licence ledger**, kept by the producer, records every sourced asset: name, source, licence, date, link and
  modifications.
- **Allowed:** scans of materials (brick, siding, asphalt, concrete, bark, soil, leaves) and of generic objects.
  **Never:** scans or photographs of real homes or identifiable buildings (anywhere, and above all in the map area),
  vehicles with trade dress, branded products, or real people without model releases. Logos and text are stripped
  from anything sourced.
- **Faces:** a licensed scan library with model releases, or MetaHuman under its licence. **Fonts:** SIL OFL (Section
  7.3). **Map data:** OpenStreetMap under the ODbL, attributed (Section 7.8).

### 8.12 Production plan for a small team

The concept assumes one in-house environment/tech artist, with character art, animation and part of the environment
kit outsourced (A14, A43). The plan front-loads reuse:

| Asset group | MVP (greybox) | Vertical Slice A (one residential block and the 167th Street corridor, at dusk) | First Map Complete (the whole first map) | Owner |
| ---- | ---- | ---- | ---- | ---- |
| House-kit meshes (all states) | About 40, one cladding family | About 150: siding and brick families, openings | About 250: all families, fillers, corners, civic | In-house; part outsourced |
| Roof generator | Gable and flat | Hip, gable, compound (roof gate passed) | All | Tools, with art |
| Materials | 5 greybox masters | About 8 masters, 60 instances | About 10 masters, 150 instances | In-house |
| Props | About 20 blockouts | About 80 | About 160 | In-house and sourced |
| Foliage species | 3 blockouts | 8 | About 15 | Sourced and adapted |
| Vehicle wrecks | 2 blockouts | 4 bodies, 2 damage states each | 6 bodies, 2 damage states each | Outsourced |
| Squad | Blockout role-kit packs on a mannequin | One body frame final, 4 kits | 2 frames, 4 kits, heads | Outsourced |
| Horde | Blockout proportions and gaits for 3 types | Shambler, Runner, Breacher final; about 20 wardrobe pieces | 5 types; about 30 wardrobe pieces | Outsourced |
| Weapons and melee | 4 guns and 9 attachments blocked out; 2 melee | 4 guns final in first person | 6 guns, about 15 attachments, 3 melee | Outsourced |
| Gadgets | 5 blockouts | 5 final | About 8 (second gadgets) | Outsourced |
| VFX | Greybox dust and muzzle flash | Dust, smoke, fire and impacts per material | Complete, tuned for the night curve | In-house |
| UI | Minimal HUD glyphs (concept: month 9) | Full HUD visual pass | Complete, including the tactical map | In-house, with outsourcing |

**Reuse multipliers:** the shared wall-internals kit for every breach; trim sheets shared across kit families; one
master material per surface family; wardrobe pieces shared by every zombie type; the generator dressing yards so no
yard is placed by hand. **Outsourcing briefs** come from `/asset-spec`, built on this bible; an outsourced asset is
accepted when it passes the tests in Sections 3–5 and the standards here.

### 8.13 Art preference versus technical limit: recorded trade-offs

The skill requires each disagreement between the art director's ideal and the technical artist's constraint to go
to the user. The user could not be reached, so each was decided with both positions recorded (AB-20).

| # | Topic | Ideal (art) | Constrained (technical) | Trade-off | Decision |
| ---- | ---- | ---- | ---- | ---- | ---- |
| T1 | Night shadows | Every motivated night light casts shadows (MegaLights) | No hardware ray tracing on the baseline; at most 6 shadowed local lights per sector view | Fewer shadows at Medium and Low; the squad's lights keep theirs first | **Both, tiered:** the constrained standard is the baseline every scene must pass; the ideal is the High tier |
| T2 | House textures | 4K on every kit texture | 2K default; memory pool limits | Slightly softer close-ups on rare surfaces | **2K default; 4K only for the hero trims** (siding, brick) and first-person assets; exceptions by review |
| T3 | Creek Woods foliage | Dense, wind-animated Nanite foliage | Nanite foliage with wind is not sourceable for 5.8 | Understory on classic LODs and impostors | **The baseline path in Section 8.7**, upgraded only if the spike verifies Nanite wind |
| T4 | Debris persistence | Every piece of debris stays, so the street fills with ruin | Cosmetic debris is local and capped | Loose debris disappears | **Authored rubble states carry the lasting ruin**; cosmetic debris settles and is removed within 10 s |
| T5 | Smoke | Volumetric smoke everywhere | Translucency and overdraw cost on the host | Smoke is sprite-based | **Sprites by default; volumes only for hero collapses at High** |
| T6 | Glass | Translucent glass with real interiors behind | Translucency cost on 745 buildings | Sealed houses show a parallax room | **Interior mapping for sealed houses; real glass only on enterable buildings** |
| T7 | Distant ruin | The whole map shows its damage at every distance | HLODs are built from the intact city | Possibly more geometry kept loaded | **Rule fixed here (never an intact HLOD for a changed building); method left to the destruction ADR** (AB-18) |

## 9. Reference Direction

Five references, each pointing in a different direction: motion and weight, damage anatomy, the mood of an intact
suburb at dusk, silhouette readability at dusk, and the UI language. They are named for internal direction only.
This is the only section of this document that names the squad-shooter series behind the user's feel direction (D1;
concept U1); player-facing text never names it.

### 9.1 The core references

| # | Reference | Take exactly this | Avoid, so it never reads as a copy |
| ---- | ---- | ---- | ---- |
| 1 | ***Battlefield*** **series** (feel reference for mechanics, per the user's direction) | **How environmental VFX sell weapon mass**: dust and debris bursts sized to whatever caused them; muzzle blast that kicks up ground dust and briefly lights nearby surfaces; a building section coming down and its dust hanging in the air afterwards; distant gunfire and explosions that read at range. These feed Sections 2.6, 8.9 and Principle 3 | Its HUD layout, spotting marker, class icons and UI colours; its maps, names, characters, branding and class names; military-operator glamour; vehicle combat and large-scale battle framing; any entry's colour grade. Holdout's UI is cartographic (Section 7) and its world is ungraded (Section 4) |
| 2 | **Storm-damage survey photography of wood-frame houses** (public damage surveys; the damage indicators of the Enhanced Fujita scale for one- and two-family homes) | **The anatomy and order of real failure**: trim, gutters, siding and shingles first, then glass, then garage doors, then roof deck and wall sections; what a broken stud wall, torn sheathing and exposed insulation actually look like. This feeds Principle 2 and Section 6.4 | Using any photograph as a texture or as a model of a specific house; anything showing an address, a house number or people; the tornado-specific look of debris thrown far across a neighbourhood (Holdout's damage is panelized and local) |
| 3 | **Gregory Crewdson's suburban twilight photography** | **Dusk in an ordinary American suburb**: cool ambient twilight against small warm practical sources, and the stillness of a normal street with one thing wrong. This feeds the front end's "street before" scene and the dusk rounds (Section 2.3) | His lit house windows (Holdout's houses are dark); staged, surreal tableaux and figures; his cinematic colour grade; fog and rain effects |
| 4 | **Roger Deakins's dusk silhouettes in *Sicario* (2015)** | **Figures reading as clean silhouettes against a bright band of dusk sky while the ground falls into darkness**: the round-10 state and the west-facing view down 167th Street (Sections 2.2 and 3.3) | Night-vision and thermal looks (Holdout never renders green or thermal views); military-operator glamour; the film's desert palette |
| 5 | **US topographic map symbology and OpenStreetMap's standard map rendering** | **The UI's drawing language**: road line hierarchy, building footprint outlines, hatching and stipple for land cover, labels set along streets, survey symbols (benchmarks, triangulation marks) as the origin of the survey tick and the squad emblem (Sections 3.6 and 7.4) | Copying either style's colour scheme, map collar or typography wholesale; green land cover (reserved against horde green-grey); a light paper look (Holdout's map is a dark chart) |

**Why these five are additive.** Reference 1 governs motion and mass; 2 governs what breaks and how; 3 governs the
mood of the intact place; 4 governs how a figure reads when light fails; 5 governs the UI. No two point the same way.

### 9.2 Secondary references (one specific lesson each)

- ***Rainbow Six Siege***: how a hole in a soft wall reads as both a sightline and a route (Pillar 1's two edges).
  Take the readability of breach outlines; avoid its operator look and UI.
- ***Warhammer: Vermintide 2***: how first-person horde attacks telegraph and stagger at melee range (Section 5.5).
  Take the readability of wind-ups; avoid its fantasy art direction entirely.
- ***Microsoft Flight Simulator* (2020)**, as a warning: OSM-generated suburbs look uncanny when kits repeat and roofs
  are wrong. It is the reason for the variation rule and the roof gate (Sections 6.3 and 8.6).
- **Combat documentary footage** (concept): the dust, the smoke and the crack of rounds passing, for VFX timing.
- ***28 Days Later*** (concept): familiar streets emptied. Take the emptiness of an ordinary place; avoid its digital
  video texture.

### 9.3 Deliberately not references

- "Post-apocalyptic" overgrowth, rust and decay: this is days after, not years after.
- Stylised horror tints (green, purple, desaturated teal) and supernatural glows on zombies.
- Military-simulation HUDs, broadcast-style UI and helmet-camera overlays.
- Freeform building looks from survival-crafting games (an anti-pillar in the concept).

---

## Appendix A: Authoring decision log

Every question the skill would have put to the user, answered by the facilitator in this non-interactive run.
"Overrule" means the user can change it; the impact column names what would change.

| ID | Decision point | Options | Chosen | Why | Impact if overruled |
| ---- | ---- | ---- | ---- | ---- | ---- |
| AB-01 | Scope (Phase 1) | Full bible; sections 1–4; Section 8 only; resume | **Full bible (all 9)** | `workflow: full` requires all nine | None at this tier |
| AB-02 | References (Phase 1, free text) | The user's own titles | **No new titles this run**; the concept's Inspiration and References plus D7 were curated into Section 9 | The user could not be asked; the concept already lists references | Section 9 is revised around the user's titles |
| AB-03 | Section 1 starting point | Build from the anchor; revise it; start fresh | **Build directly from "Ground Truth"**; four principles consolidated into three to fit the skill's format, with nothing dropped (Section 1.4) | The anchor is the user's direction (U7) and was rated STRONG by AD-CONCEPT-VISUAL | Section 1 rewritten; later sections re-checked |
| AB-04 | Approval of each section | Lock in and write; revise; own direction | **[A] Lock in and write**, for each section in order, one at a time | Each section was checked against the concept, D1–D9 and the privacy rule before it was written | Any section can be reopened by a later `/art-bible` run |
| AB-05 | Season and setting | Late autumn (dry, leaf-off); early autumn colour; summer; winter with snow | **Late autumn, dry, leaf-off, before snow** | Ordinary and real; early, fast dusk; open long sightlines; lower foliage risk; no weather system | Sections 2, 4.2, 6 and 8.7 change |
| AB-06 | Night curve (concept Q19) | Keep A41; stretch further; a cycle with dawn | **Keep A41** (dusk at round 10, night around 15–20) | It is the concept's current text; Q19 is the user's | A dawn state is added to Section 2.2 |
| AB-07 | Horde readability aid | None; bounded rim light; always-on rim | **Bounded rim light** (horde only, off before round 10, close and street bands only, capped) | Readability wins in those bands, but realism governs | Remove it, and rely on motivated light alone (tests harder to pass) |
| AB-08 | How the silhouette tests are run | Unaided everywhere; through optics at range | **Close band unaided; street band unaided and with a 1–2× optic; long band through the MVP magnified optic** | On-screen sizes (Section 3.2) make unaided long-band tests impossible | The concept's MVP criterion wording would need the same clarification (the concept was not edited) |
| AB-09 | Real-world IP on characters and weapons | Real-looking branded gear; generic | **Generic**: no real insignia, trademarked camouflage, brands or real gun models | Legal safety and the concept's "no brands" rule | Licensing work and legal review |
| AB-10 | Spotted-zombie marker | Diamond; survey tick | **Survey tick** | Concept A45 and R12 | — |
| AB-11 | Flares and supply-drop marker | Red hand flares; amber ground flares; amber overhead flares | **Steady amber flares overhead; yellow smoke marks a supply drop** | Red collides with danger; ground flares flicker like fire; overhead and steady keeps the non-hue cue | Section 4.4 re-cut |
| AB-12 | Tactical map style | Light paper; dark chart | **Dark chart, with neutral grey land cover** | One meaning palette for HUD and map; suits night; no green to confuse with the horde | Section 4.6 palette re-cut |
| AB-13 | Kit storey height | OSM convention 3.2 m; US framing 2.75 m | **2.75 m** | Real suburban houses; the kit must look right | Houses read too tall |
| AB-14 | Sensitive-content curation | Render everything as real; curate | **Curate**: no playground equipment; places of worship sealed, not destructible, no iconography; no children's rooms, child-specific props or photographs of people; no civilian bodies; nameless, indestructible, decal-free headstones; no gore on sensitive sites | Concept R5 and A29; curation is set dressing, not moving footprints, so Pillar 2 allows it | Sections 6.6–6.7 relaxed; legal and PR review needed |
| AB-15 | HUD conflicts (Section 7.7) | Art position; UX position; hybrid | **The hybrids recorded in Section 7.7**; no minimap at MVP | Diegetic-leaning but fair for a finite-ammo, parry-based game | The HUD spec changes |
| AB-16 | Typeface | Overpass; IBM Plex; a commercial face | **Overpass and Overpass Mono**, Plex as the fallback | Highway-sign heritage ties the HUD to the street signs; open licence | Section 7.3 |
| AB-17 | Corpsman icon | A cross; a pulse trace; a stretcher | **Pulse trace** | Protected emblems must not be used | — |
| AB-18 | HLOD versus destruction | Leave it to chance; fix the rule | **Rule fixed here; method left to the destruction ADR** | A damaged building shown intact at range breaks Pillar 1 and the long band | The ADR must still choose a method |
| AB-19 | Horde count for budgets | `technical-preferences.md` (~100); concept (24, 48 target, far tier) | **Concept's numbers** | The concept is the newer, gate-reviewed source | Character budgets in 8.5 and 8.10 shrink |
| AB-20 | Art versus technical trade-offs (Section 8.13) | Ideal; constrained; both | **As recorded in 8.13** (mostly "both, tiered" or "constrained default with exceptions") | Keeps the ideal visible without making it the baseline | Section 8 budgets change |
| AB-21 | Exact meaning-colour values | The concept's descriptions at usual values; retuned values | **Retuned**: lighter, slightly pink danger red; darker amber | Simulation showed red and amber merging for deuteranopes | Section 4.3 and 4.7 |
| AB-22 | AD-ART-BIBLE gate | Agent-run; self-check | **Self-check** (Appendix C.2). *Superseded 2026-11-19:* the gate was run by the `art-director` agent (CONCERNS; Appendix C.1) | No agent-spawning tool in the first run | — |
| AB-23 | Next step (Phase 6) | `/map-systems`; `/create-architecture`; stop | **`/map-systems` (recommended)** | No systems index exists yet; the engine is configured | — |
| AB-24 | Spotted specials' marker colour (gate blocking item 1) | Danger red for every special; green-grey for every special; green-grey with danger red only for explosive or structure-threatening types | **Green-grey survey tick for every type, with an optional type glyph inside. Danger red only for the Detonator, and for the Breacher or Wrecker while attacking a panel** (stated once in 4.3; 7.2 points to it) | Red on every special diluted the top-priority channel and, with danger's pulse and stripe, filled late-round HUDs with pulsing red that competed with downed squadmates and breach warnings | 4.3 and 7.2 change; the 4.7 checks are unaffected |
| AB-25 | Role primitive sizes and gadget carry (gate blocking item 2) | Keep thin masts, handles and a shallow hump; set a minimum on-screen size and rebuild the primitives | **Minimum 2 px (17 cm) at 80 m, target 20 cm or more** (3.2). Corpsman pack widened sideways to about 72 cm. Sapper diagonal carried by a rigid scabbard at least 17 cm wide and the tool head. Spotter mast topped by a sensor head at least 20 cm across. **Deploying or drawing a gadget never removes the back primitive. Light gadgets are compact and hip-carried** (3.3, 3.5, 5.2) | At 12 px per metre at 80 m, a 3 cm part is about 0.4 px and vanishes under TSR, and a 7 cm hump is under 1 px from the front; the old primitives failed the bible's own size rule and the concept's MVP role test | Kit proportions in 3.3 and 5.2 change; the role test would need another distinguishing method |
| AB-26 | On-screen size table (gate concern) | Keep the first table; correct it to the exact projection | **Corrected**: 960 ÷ d px per metre; a 1.8 m figure is about 58 / 22 / 11.5 / 5.8 / 4.3 px at 30 / 80 / 150 / 300 / 400 m (230 / 86 / 46 / 23 / 17 through a 4× optic); the role-test figure is about 22 px | The first table was about 10% too large, and the section calls itself "measured, not guessed" | — |

## Appendix B: Open items and hand-offs

| Item | Owner | Needed before |
| ---- | ---- | ---- |
| Q19 night curve; Q6 gore and rating; Q16 the School Grounds as a sector | User | The realism art pass (Q6 also sets the gore budget) |
| Confirm or revise every budget in 8.5 and 8.10 in the rendering and netcode spike, including the Lumen/Nanite stress scene on the host | Technical director, technical artist | End of MVP month 3 |
| Minimum GPU and the Low tier's caps (concept R10). The anchor assigns the minimum GPU to this bible before the realism pass (gate concern) | Technical director, with the art director | **Vertical Slice A at the latest** |
| **Gate concern:** state the internal resolution (TSR screen percentage) for the Medium tier in 8.10; 4.0 ms of software Lumen on an RTX 3060-class card is plausible only when TSR upscales from below 1080p. The 3.2 primitive minimum's 20 cm target assumes it | Technical director, technical artist | End of the MVP spike |
| **Gate concern:** CPU cost on the listen-server host is not budgeted in 8.10 (animation for 24–48 zombies, Niagara, decals). It is handed to the TD spike explicitly | Technical director (spike) | End of MVP month 3 |
| **Gate concern:** first-person silhouette and form guidance for the rest of the shippable tier. That means SMG, LMG and launcher classes (3.5 covers only pistol, shotgun, assault rifle and DMR), the magazine, grip and stock attachments, and the second gadgets (med pouch, ammo pouch, spotting scope). First Map Complete needs 6 guns and about 15 attachments across six slots | Art director (next `/art-bible` revision) | `/asset-spec` briefs for weapons and gadgets |
| **Gate concern:** name the 5 zombie types that ship at First Map Complete (3.3, 5.4 and 8.5 specify all 9; 8.12 says 5). This scopes outsourcing and decides which night and long-band silhouette tests must pass at ship | Art director, with the horde GDD owner | Horde outsourcing beyond Vertical Slice A |
| **Gate concern:** texel density for surfaces players fight against. 512 px per metre is about half of native for a wall 1 m from the camera (about 960 px per metre at 1080p and 90°). Use 1,024 px per metre, or require detail normals and detail tiling, on interior partitions, the shared wall-internals kit, breach edges, garage interiors, and boards and bracing (8.4) | Technical artist | Vertical Slice A kit work |
| **Gate concern:** world-space marker contrast. 4.6's 4:1 guarantee holds only against the HUD plate and the dark chart. Markers drawn in the world can fall below 3:1 over white siding, concrete or the bright dusk sky (road-marking yellow and squad cyan). Make the dark keyline the default for world-space markers, and keep "thicken outlines" as the option (4.6, 4.7, 7.6) | `/ux-design` (HUD specification), with the art director | MVP HUD block |
| **Gate concern:** kit-family tie-break in 6.2. Raised ranch and two-storey both match a near-square footprint of about 120 m². Specify the tie-break, for example a choice weighted by target mix ratios and seeded by the OSM way ID, so the regional mix is controlled and deterministic | Technical artist, with tools | Kit selection in the generator for Vertical Slice A |
| **Gate concern:** naming rules still missing for outsourcers (8.3): how source and DCC files are named before import, and whether size tiers appear in names or only in texture groups | Technical artist | Outsourcing starts |
| **Gate privacy note (outside this file):** reword the "Location check" paragraph in `design/gdd/game-concept.md` Section 6.1 as a neutral boundary note. The raw `.osm` extract with every building footprint is still tracked under `prototypes/real-street-holdout-concept/pipeline/data/` (a gap the concept already logs) | Concept owner; producer | The next public push |
| Nanite foliage with wind on 5.8; runtime virtual texturing on 5.8; Lumen Lite status | Technical artist, `unreal-specialist` | Creek Woods' art pass |
| HLOD versus destruction method (AB-18) | Technical director (destruction ADR) | The first full-map bake |
| Reconcile the horde count in `technical-preferences.md` with the concept (AB-19) | Technical director (`/settings`) | Any budget review |
| Typeface licences and glyph coverage (AB-16) | Producer | Any public build |
| Style research brief on the region's house typology, from generic public sources only (6.1). **Gate concern:** it does not exist yet, and the house kit, the largest outsourced environment item, cannot be fully briefed without it | Environment/tech artist | Vertical Slice A kit work |
| Silhouette test wording in the concept's MVP criteria (AB-08) | Concept owner | MVP playtests |
| HUD specification (`design/ux/hud.md`) and accessibility requirements | `/ux-design` | MVP HUD block |
| Per-asset specifications and outsourcing briefs | `/asset-spec` | Outsourcing starts |
| Licence ledger for sourced assets | Producer | The first sourced asset |
| ~~Re-run AD-ART-BIBLE with the `art-director` agent~~ Done 2026-11-19 (CONCERNS; Appendix C.1). Still open: the art director confirms the two blocking fixes (AB-24, AB-25), or the gate is re-run, for APPROVE | Art director | Asset production |

## Appendix C: AD-ART-BIBLE sign-off

### C.1 Agent verdict (2026-11-19)

**Verdict: CONCERNS (agent-run, `art-director`, 2026-11-19).** The gate found the bible complete and faithful to the
"Ground Truth" anchor in `design/gdd/game-concept.md`, and consistent with D1–D9. That covers grounded realism with no
stylised grade, the measured meaning palette (its L* and contrast values were checked), Holdout's own role names and
cartographic UI, sensitive-site curation, the "Tinley Park, IL (60477)" naming and the privacy rule. It also absorbs
every AD-CONCEPT-VISUAL round-2 note. Nothing rose to REJECT. Two items blocked APPROVE; both are applied in this
revision.

| # | Blocking item (gate) | Resolution in this revision |
| ---- | ---- | ---- |
| B1 | 7.2's "danger red for specials" contradicted danger's definition in 4.3. Red on every special diluted the top-priority channel, and with danger's pulse and stripe it filled late-round HUDs with pulsing red ticks | **Applied (AB-24).** 4.3 now holds the single rule: green-grey survey tick for every type, optional type glyph; danger red only for the Detonator, and for the Breacher or Wrecker while attacking a panel. 7.2 points to it; the 4.3 Meaning column notes it |
| B2 | Three role primitives in 3.3 and 5.2 failed 3.2's own size rule at the 80 m role test. The Spotter's mast and the Sapper's handle were about 0.4 px; the Corpsman's hump was under 1 px and invisible from the front. There was no rule for deployed gadgets or light gadgets | **Applied (AB-25).** 3.2 adds the minimum (2 px, 17 cm; target 20 cm or more). 3.3 rebuilds the three primitives: the Corpsman pack about 72 cm across, the Sapper's rigid scabbard and tool head, and the Spotter's sensor head. It adds the rules "deploying or drawing a gadget never removes the back primitive" and "light gadgets are compact and hip-carried". 3.5, 5.2 (with a table of light-gadget forms, the solo kit's light reinforce tool included), 5.3 and 5.6 follow |

| # | Concern (gate) | Status |
| ---- | ---- | ---- |
| 1 | 3.2's size table was about 10% too large | **Fixed** (AB-26); the role-test figure is now about 22 px |
| 2 | No form guidance for the rest of the shippable tier: SMG, LMG, launchers, the magazine, grip and stock attachments, and the second gadgets | Open (Appendix B) |
| 3 | The 5 zombie types that ship at First Map Complete are not named | Open (Appendix B) |
| 4 | Texel density is low for fought-against surfaces (8.4) | Open (Appendix B) |
| 5 | World-space markers lack a default keyline (4.6) | Open (Appendix B) |
| 6 | 8.10 states no internal resolution; host CPU is unbudgeted; the minimum GPU is unset | Open (Appendix B; the minimum GPU is due by Vertical Slice A at the latest) |
| 7 | The kit-family rules in 6.2 overlap and have no tie-break | Open (Appendix B) |
| 8 | The regional style research brief does not exist yet | Open (Appendix B) |
| 9 | Wording slips: the Plated "drags" its slab (5.4); the evac is "ringed by flares" (2.3); the "no contradictions" claim | **Fixed**: 5.4 and 2.3 are corrected; the C.2 row below is annotated; the header now carries the agent verdict |
| 10 | Naming rules for source and DCC files and for size tiers (8.3) | Open (Appendix B) |
| 11 | Privacy: this bible is clean (no address, house number, coordinates or subdivision name; the map is named only "Tinley Park, IL (60477)"). The concept's 6.1 "Location check" wording and the tracked raw extract are outside this file | Open, outside this file (Appendix B) |

**Next:** the art director confirms B1 and B2, or the gate is re-run, to reach APPROVE before asset production. The
open concerns have owners and deadlines in Appendix B; the gate classed them as clarification work, not blockers to
APPROVE.

### C.2 Earlier self-check (history; superseded by C.1)

**This was a self-check, not an agent verdict.** The `art-director` agent could not be spawned in the first run, so
the facilitator answered the gate's questions (`.claude/docs/director-gates/ad-art-bible.md`) against this document,
the pillars and core fantasy, the platform and performance constraints, and the Visual Identity Anchor.

| Gate question | Self-check answer |
| ---- | ---- |
| Does the colour system match the mood targets? | Yes. The world layer is ungraded and carries mood through the light plan; the meaning layer is limited to UI and placed lights; the light vocabulary (4.4) makes "warm, steady, mounted, coned" mean the squad, which is the core of the night states in Section 2.3 |
| Does the shape language follow from the visual identity statement? | Yes. "Plumb is real; askew is ours" and outline-first panel states come from Principle 2; role primitives and horde postures from Principle 3, sized by measured on-screen heights (3.2). *The agent gate found three primitives too thin for 3.2's own rule; resized in this revision (C.1, B2)* |
| Are the asset standards achievable within the platform constraints? | **Not yet shown.** The budgets are reasoned starting values; the minimum GPU is unset; Nanite foliage with wind and runtime virtual texturing are unverified on 5.8; the HLOD-versus-destruction method is open; `technical-preferences.md` disagrees with the concept on the horde count |
| Does the character direction give artists enough without over-specifying? | Yes. Primitives, wardrobe rules, LOD rules and IP limits are fixed; the designs themselves are left to artists and `/asset-spec` |
| Are there contradictions between sections? | None found after two fixes made while writing: flares now obey the squad light's non-hue cue (AB-11), and the danger red and amber were retuned after simulation showed them merging for deuteranopes (AB-21). *Wrong, per the 2026-11-19 agent gate:* 7.2 contradicted 4.3 on danger red for specials, and 5.4 and 2.3 had wording slips. All are fixed (C.1) |
| Could an outsourcing team produce assets from this document alone? | For kit, props, characters and VFX, mostly yes, with `/asset-spec` briefs. The regional style research brief (6.1) is still to be written, and Q6 limits the gore brief |

**Self-check verdict (superseded by C.1): CONCERNS.** Sections needing clarification: **8** (budgets unconfirmed until
the spike; minimum GPU; foliage and virtual-texturing verification; HLOD versus destruction; horde-count mismatch),
**6** (the style research brief), **2** (Q19), **5** (Q6), **7** (typeface licences; the HUD specification belongs to
`/ux-design`). No fundamental inconsistency was found, so nothing here would be a REJECT. The gate was re-run with the
`art-director` agent on 2026-11-19 (C.1).
