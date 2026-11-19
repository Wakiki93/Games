# Art Bible: Holdout

> **Status**: Draft (revised for the user's decisions U11–U15; AD-ART-BIBLE is being re-run on this revision)
> **Owned By**: art-director
> **Last Updated**: 2026-11-19
> **Art Director Sign-Off (AD-ART-BIBLE)**: **Re-run in progress on this revision; no verdict yet.** The last
> verdict was **CONCERNS (agent-run, `art-director`, 2026-11-19)**, on the previous revision, with no REJECT-level
> inconsistency. Both blocking fixes it asked for stay applied and unchanged, and the re-run is what confirms them:
> danger red for specials (4.3 and 7.2) and the role primitives' size and deploy rules (3.2, 3.3, 3.5, 5.2, 5.3, 5.6).
> Of its eleven concerns, three are fixed (the on-screen size table, the wording slips and, in this revision, the
> default keyline on world-space markers), the privacy concern is closed by the user's decisions U13 and U15, and
> seven stay open in Appendix B. Nothing here claims APPROVE: asset production waits for the re-run's verdict
> (Appendix C.3). The earlier verdict and the first self-check are kept as history in Appendix C.1 and C.2

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
> first map, D9 everything from the original concept) and match U1–U10 in `design/gdd/game-concept.md`. The user has
> since decided U11–U15 directly (controller-only input, a solo developer, the repository, vehicles and the first
> map's box). They are the user's own decisions, not facilitator answers, and this document follows them from the
> revision note of 2026-11-19 below (they are listed at the top of Appendix A).
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
> **Re-sync 2026-11-19 (concept revision 2.4).** This bible was written on concept revision 2.2. Revision 2.4
> (concept A52–A60) took up this bible's open items for the concept owner and changed things this bible depends on;
> they are carried in here (AB-27): the concept now uses the kit's 2.75 m storey (AB-13) and AB-08's viewing conditions
> for the silhouette tests, and logs AB-14's indestructible sensitive sites as an exception to its Pillar 1; sector
> labels are real names with generic labels only for sensitive sites, and the wooded park's creek label is a logged
> exception (7.2, 7.8); the second gadgets are renamed the dressing pack, the bandolier and the survey glass, and the
> MVP crate is the resupply crate (3.5, 5.2); the gap kit never carries the breach charge (5.2); movement (sprint,
> crouch, prone, vault, mantle, slide) is in the MVP, and the role primitives must survive it (3.3, 5.3); generated
> fences stay inside vault and mantle heights (6.6, 8.6); and the game is controller-only, so prompts use Xbox-layout
> button glyphs (7.2, 8.1). Nothing in the visual direction changed. The AD-ART-BIBLE verdict below predates the
> re-sync.
>
> **Re-sync 2026-11-19 (concept revision 2.5).** A second adversarial check of the concept and this bible against the
> user's directions, privacy, IP and consistency (concept A61–A67; AB-28 to AB-30 here). Carried in: the Corpsman's
> revive kit also heals, so the HUD shows a recovery-ceiling notch and a low-health flag (5.2, 7.2); squad orders
> show on the compass and sector board (7.2); the MVP optics include a reflex sight and a 2× prism (3.5); no UI text
> names an individual building (7.2). Fixed here: 167th Street sits about two-thirds of the way north, not across the
> middle (2.2); the horde is anonymous and never presented as the town's residents (5.4); the Quartermaster's icon no
> longer uses cartridges (7.4); `/map-systems` may run in parallel with the concept's prototypes (AB-23). The visual
> direction is unchanged.
>
> **Revision 2026-11-19 (user decisions U11–U15; the HUD re-arranged; the gate re-run).** The user decided five
> things directly, and they are authoritative here. **U11:** the game is controller-only (confirmed twice; playtests
> use an Xbox Elite Series 2; this closes concept Q22). **U12:** the project is one developer with AI tools, with no
> team, no outsourcing and close to no cash, re-cut by the user as one map and one polished core loop first, with
> features added only after it is fun. **U13:** the repository stays public, with its history and the first map's
> data files as they are. **U14:** vehicles are out of scope (this closes Q11). **U15:** the first map's box and name
> are confirmed. What changed in this document:
> (1) **The HUD has its own arrangement** (7.2, AB-31): a clear field and four margin blocks, which are the sector
> ladder, the squad block, the title block (a bearing dial, the street line, the round) and the kit block. It replaces
> the top-centre compass strip and sector board, the left-edge squad list and the top-right round readout, which sat
> too close to the layout Section 9.1 says to avoid. Where the older notes above say "compass" or "sector board",
> read "bearing dial" and "sector ladder".
> (2) **Every UI rule is controller-first** (7.9, AB-32): type, lines and glyphs sized for a television seen from
> 3 m, plates and keylines for contrast, Holdout-drawn Xbox-layout prompt glyphs with outline rules for triggers and
> sticks, focus navigation with no cursor and no hover-only state, a ping wheel and a gadget cross.
> (3) **One marker shape table** (3.6, AB-33): the objective marker is a ring, and no rule or example uses a rotated
> square.
> (4) **The production plan is for one person** (8.12, AB-34): what is bought or downloaded, what is procedural,
> what is hand-made, and a strict, small first-milestone list. Outsourcing and multi-artist assumptions are deleted.
> No permanent cut to anything the user asked for is made or proposed.
> (5) **A privacy and IP pass over the whole file** (AB-35, AB-36): the repository action items are replaced by the
> user's decision U13, and the squad-shooter series is no longer named in this file.
> (6) The two blocking fixes from the last gate are untouched, and AD-ART-BIBLE is being re-run on this revision
> (Appendix C.3). The visual direction ("Ground Truth") is unchanged.
>
> **Sources.** The Visual Identity Anchor ("Ground Truth"), pillars, signature systems, risks and decisions in
> `design/gdd/game-concept.md` (written on revision 2.2, read and not edited; re-synced to revisions 2.4 and 2.5 above); the
> AD-CONCEPT-VISUAL round-2 notes addressed to this document; `.claude/docs/technical-preferences.md` (performance
> budgets; `project.yaml` has no `performance` block); the pinned engine reference in `docs/engine-reference/unreal/`;
> and aggregate building statistics from the first map's local pipeline output (counts and size distributions only;
> nothing narrower).
>
> **Privacy (the repository is public; the user's decisions U13 and U15).** The repository stays public, its history
> is left as it is, the first map's data files stay tracked and pushing continues (U13). The first map's box and name
> are confirmed (U15), so no check of the map is needed and none is described here. Going forward, nothing in this
> document singles out a location. It names the first test map, "Tinley Park, IL (60477)", and street, park, creek
> and trail names from OpenStreetMap, and nothing narrower. It contains no address, no house number and no
> coordinates of any kind, and it describes the area only as the first test map. Every house is a generic kit fitted
> to a footprint and no real house is replicated; houses that can be entered are chosen by gameplay criteria in the
> engine and are referred to here only generically, never by street or position (6.6).

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

**Map-relative light direction on the first map.** 167th Street runs east–west about two-thirds of the way north
across the map (concept 6.1; the map box is confirmed, U15). In the
golden and dusk rounds, a squad looking **west** along 167th Street faces the low sun or the bright dusk band, so
zombies on that axis are backlit silhouettes with rim; looking **east** they are front-lit and flatter. North–south
residential streets get side light. This is a gift for the long band (the silhouette tests in Section 3 run on the
west-facing axis first) and a known hazard (glare from the low sun is real; Section 2.6 caps it). At night the
north-east skyglow gives a lighter sky behind anything on a ridge of rubble, a roofline or the open fields.

### 2.3 Mood targets by game state

Each state's targets are written so that the lighting and the effects can be built from them directly. "Carrier" is
the one visual element that must carry the state if everything else is cut. Under the solo plan (8.12) the first
milestone builds only the states its core loop shows; the front-end scenes and the end states come later.

| State | Emotional target | Lighting character | Atmosphere (3–5 words) | Energy | Carrier |
| ---- | ---- | ---- | ---- | ---- | ---- |
| **Front end** (main menu, lobby) | Unease inside the ordinary: "the street before" | An intact, empty residential street at late afternoon (sun higher than round 1, about 20°); every house dark in daylight | Still, ordinary, empty, crisp, wrong | Contemplative | One wrong note in an ordinary scene: dark windows in daylight, an untended leaf pile blowing across a driveway, a car door left open |
| **Role select** | Readiness, belonging to a squad | The four squadmates in an open two-car garage lit by the squad's steady amber work light on a mast; grey daylight outside | Prepared, warm, cramped, purposeful | Measured | The amber work light: the game's first lesson that steady, mounted, coned amber light means the squad |
| **Map select and loading** | Recognition: "that is a real place" | The dark cartographic sheet (Section 7): real street names drawing in over building footprints | Quiet, exact, documentary | Contemplative | Real street names and parks resolving on the map; the ODbL attribution sits on this screen |
| **Deploy and round 0** (first intermission at the home sector) | Control, just barely: the squad sets up | Round 1 light; long views down 167th Street | Open, bright, exposed, purposeful | Measured | The squad raising the first work-light mast and dropping the first crate in the home sector |
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
the night minimums, a non-physical aid is allowed, with all of these limits (AB-07; the concept records it as the one
non-physical readability aid in its pillar tension table, A59):

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
  (AB-08; the concept's shape-language test and MVP criterion adopted this wording in revision 2.4).

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
- **Movement never hides the primitive** (concept system 11). Prone, crawl, slide, vault and mantle keep the back
  primitive in place: prone from behind and from the side, the hump, block, diagonal and spike still break the
  outline by at least 2 px at 80 m. Animation never tucks a primitive behind the body to clear an obstacle; the
  obstacle classes (6.6) are sized so it never has to.

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
criterion), under AB-08's viewing conditions: close band unaided; street band unaided and through a 1–2× optic; long
band through the magnified optic. Far-tier zombies (beyond about 150 m) keep one locally played looping gait cycle
per type, so the gait reads survive the far tier (concept system 9).

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

**Panel states change the outline** (the concept's rule, expanded for modelling):

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
- **Attachments change the silhouette** in first and third person: a long or heavy barrel extends the line (the
  heavy one thicker), a short barrel cuts it, a suppressor adds a fat tube, a compensator a slotted cap and a brake a
  ported block, a reflex sight a small open window, a 2× prism a short squared box, and the 4× magnified optic a long
  hump (the MVP's nine; concept A66). The trade-off an attachment
  carries (Pillar 3) should be visible before it is read: heavier-looking means slower handling.
- **Melee weapons** read by head mass: blunt (a thick head on a short handle), heavy (a long handle and a large head,
  sledge or axe, the one that breaches), blade (a long thin edge). They are tools and implements a suburb would have.
- **Gadgets repeat their role's primitive**: the Corpsman's revive kit is soft and rounded; the Quartermaster's
  resupply crate is a squared box with handles; the Sapper's reinforce tool is a long handle (at least 1 m) with a
  head, and the breach charge is a flat rectangular plate with a strap; the Spotter's sensor is a tripod with its own
  short mast (a spike), a separate device from the mast on the Spotter's back. **Deploying or drawing a gadget leaves
  the back primitive in place** (Section 3.3): the crate comes off the frame and the frame stays; the tripod is placed and the
  back mast stays; the tool is drawn and the scabbard keeps the diagonal.
- **Light gadgets are compact and hip-carried.** The squad-gap kit's light gadgets and the solo kit's light items
  (the light reinforce tool and the bandolier) never repeat another role's primitive. They fit the hip envelope in
  Section 5.2: nothing on the back, nothing above the shoulder line, nothing longer than 50 cm, and nothing standing
  more than 8 cm off the body, which is under 1 px at 80 m.

### 3.6 UI shape grammar

The UI does **not** echo the world's realism; it echoes the **map** (the cartographic language kept from "Survey
Grade"). Its shapes are drawn, not modelled: thin linework, ticks, hatching and outlines, with square corners and
map-sheet corner ticks. There are no pill-shaped buttons, bevels, gloss, glows or military stencils, and nothing
borrowed from any reference game's HUD.

**The marker shape table.** This is the single statement of what each shape means (AB-33). Sections 4.3, 7.2, 7.4
and 7.8 use these shapes and point here; if another section ever disagrees with this table, this table wins. A
marker's **shape** says what kind of thing it is, and its **colour** shows the highest meaning that applies to it
(Section 4.3).

| Shape | Drawn as | Means | Colour (Section 4.3) | Used for | Never |
| ---- | ---- | ---- | ---- | ---- | ---- |
| **Chevron, apex up** | An open two-stroke chevron | A squadmate | Squad cyan | Over each squadmate, with the role icon above it; squadmates on the tactical map | Filled solid; pointing down |
| **Chevron, apex down** | The same chevron inverted, its apex resting on the pinged point | A squad ping on a place | Squad cyan | Position pings, for their lifetime | Carrying a role icon |
| **Survey tick** | An upright triangle outline (apex up) with a notch cut in its base and hatching inside | The horde | Horde green-grey; danger red only for the types and moments listed in 4.3 | Spotted zombies, with an optional type glyph inside; horde-held sectors on the sector ladder and the map | A rotated square (AB-10; concept A45); a solid triangle; an apex-down triangle over a head |
| **Square** | An upright square with a solid outline: edges horizontal and vertical | Player infrastructure and items | Road-marking yellow | Supply points, armories, workbenches, deployed gadgets, fortifications you own; item pings | Rotated 45° |
| **Ring** | A thin closed circle, hollow, with the sector's state glyph inside it and the sector label beside or under it | **An objective**: a place to take or hold | The colour of the sector's state: sodium amber when held, horde green-grey when horde-held, danger red with the hazard stripe when overrun | A sector's capture point in the world, on the sector ladder and on the map; the evac landing zone | A letter or a number inside it (sectors carry their names); a flag; a rotated square |
| **Double ring** | The ring with a second ring outside it | The **ordered** objective (the squad order) | The outer ring is squad cyan; the inner ring keeps its state colour | The ordered sector in the world, on the ladder, on the map and on the bearing dial | |
| **Arc** | An open arc that fills or drains; never a closed circle | A quantity or a timer that belongs to the thing it wraps | The colour of the thing it wraps | Stamina (round the crosshair); capture progress (thickening the ring's own stroke clockwise); bleed-out (round a downed squadmate's role icon); hold, revive and heal progress (round a button glyph) | Standing alone as a marker |
| **Hazard-stripe outline**, pulsing | A striped outline added round another shape; it pulses at 1.5 Hz at most | Danger | Danger red | Breach warnings, explosives, structural failure, a downed squadmate, an overrun sector, and the horde types listed in 4.3 | Drawn with no shape inside it |
| **Mast-and-cone glyph** | A mast with a light cone | A held sector (the squad's light) | Sodium amber | Inside the ring of a held sector: the HUD twin of the work light | |
| **Hatched band** | A band of hatching that leans toward the horde side | The frontline | Set by the HUD specification | The tactical map only | |
| **Footprint outline** | The real OSM building outline | A building | The map footprint line (Section 4.6) | The tactical map only | A label on an individual building |

**No rotated squares.** Checked for this revision: no rule and no example in this document uses a square rotated 45°
(a diamond) for a marker, an icon, a sector state or a button prompt. The word appears only in "never" entries and
in the log of the rejected option (AB-10). The objective marker is the ring, and sectors are never lettered or
numbered.

Line weights are set for a screen seen from 3 m (Section 7.9): at 1080p and HUD scale 100% the base stroke is 3 px
and no meaningful line is thinner than 2 px. Every mark in a meaning colour that is drawn over the world or on a
translucent plate carries a 2 px dark keyline by default (Section 4.6). Line weights scale with the HUD scale option.

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

**Shapes.** The non-hue cues in this table are shapes from the single marker shape table in Section 3.6. That table
also defines two shapes that carry no colour of their own: the **ring** (an objective, which takes the colour of its
sector's state) and the **arc** (a quantity, which takes the colour of the thing it wraps). The palette stays at
five colours.

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
| **167th Street** corridor (home sector) | Open and sky-dominated; broad neutral-grey asphalt; the warmest light in golden rounds comes straight down the axis from the west | Cool streetlight pools spaced along the axis until they die; warm squad pools in the home sector | The long axis keeps the most even light so the long band is fair in daylight; at night only motivated stretches are readable |
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
| HUD text, secondary | `#B9BEC2` (L* 77) | 9.5:1 against the HUD plate. Used on opaque surfaces only (the tactical map, menus); text over the world is always primary |
| HUD plate | `#14181B` at **90% opacity** by default (player option, 80–100%) | Behind text and glyph rows wherever they sit over the world. Raised from 60–75% for a screen seen from 3 m (see the contrast rules below) |
| Tactical map background ("dark chart") | `#161B1F` | The map is a dark chart, not light paper (AB-12): one meaning palette works on both HUD and map, and it suits night play |
| Map footprints | Line `#5E676F`, fill `#20262B` | Real OSM building outlines |
| Map streets | 167th Street `#D5D9DC` (widest); residential `#9DA4AA`; footways and the trail dashed `#6F777E` | Real street names in HUD text colours |
| Map water | `#2B3F4C` | Dark blue-grey, far from squad cyan (ΔE76 above 50 in every simulation) |
| Map land cover (woods, parks, grass) | **Neutral grey textures only** (stipple for woods, light tint for parks) | **No green on the map**, so land cover can never be confused with horde green-grey |

All five meaning colours keep at least 4:1 contrast against the HUD plate and the dark chart (non-text graphics need
3:1). Text is never set in a meaning colour; an alert is HUD-white text on a plate outlined in the meaning colour.

**Contrast over the world, for a screen seen from 3 m (Section 7.9; AB-32).** A translucent plate takes on the
brightness of whatever is behind it, so the figures above hold only on an opaque plate. The worst case is a
display-white dusk sky or sunlit white siding behind the plate. Computed in linear light, primary text on a 90% plate
keeps about 5.8:1 over display white and about 6.8:1 over white siding. On the earlier 60–75% plate it fell to
between 2.0:1 and 3.0:1 over display white. Three rules follow:

- **Text over the world is always primary HUD white on a plate at 90% opacity or more.** Secondary grey would fall to
  about 3.6:1 there, so it is kept to opaque surfaces.
- **Every mark in a meaning colour that is drawn over the world or on a translucent plate carries a 2 px dark
  keyline** in the plate colour, by default. Against its keyline every meaning colour keeps at least 4.2:1 (sodium
  amber is the lowest). Without one, squad cyan and road-marking yellow fall under 2:1 over white siding. The keyline
  used to be a player option; making it the default answers the gate's concern about world-space markers (Appendix
  C.1, concern 5).
- **These are computed figures.** The engine's own UI blending decides the real ones, so each is measured again on
  captures of the worst-case scenes (a west-facing dusk sky, sunlit white siding) before the HUD is called done
  (Appendix B).

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
which must stay real); instead the dark keyline that every marker carries by default (Section 4.6), an option to
thicken marker outlines, and an option to remap any meaning colour to an alternative from a pre-validated set. Every
HUD and map screenshot in review is run through the three simulations, and a marker fails if its meaning cannot be
told from shape alone in greyscale.

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
- **Body frames, staged.** One body frame at the first milestone (Section 8.12). The second frame, so that every
  role has a male and a female frame, is deferred, not dropped: every kit is built to fit both.
- **Generic faces**, built from licensed sources (a commercial scan library with model releases, or MetaHuman under
  its licence; verify the terms at acquisition). No real person's likeness. Helmets and eye protection cover much of
  the face, so the first milestone needs no bespoke heads at all.

The squad's palette is muted and military, which separates it from the horde's civilian wardrobe. Role is shown by
**shape, not colour** (all four share one palette), so the role test works in greyscale and for colour-blind players.

### 5.2 Role kits

| Role | Primitive (Section 3.3) | Kit pieces on the body | Gadgets (MVP in bold) | First-person identity |
| ---- | ---- | ---- | ---- | ---- |
| **Corpsman** | Hump | Rounded medical pack low on the back with a rounded side bag on each hip (about 72 cm across in all, Section 3.3); drag strap across the shoulders; bulky thigh pouches; tourniquet on the sleeve | **Revive kit** (revives and heals; concept A61); dressing pack (VS) | Tourniquet and trauma-shears pocket on the sleeve; the revive kit's soft rounded pouch in the gadget hand |
| **Quartermaster** | Block | Tall frame pack loaded with ammo cans, its rigid rails and top bar keeping the block when the crate is off; squared shoulder line; extra magazine pouches | **Resupply crate**; bandolier (VS) | Leather work gloves; a magazine-heavy chest rig seen when looking down; the crate's squared box carried two-handed |
| **Sapper** | Diagonal | Long-handled reinforce tool in a rigid, padded scabbard (at least 17 cm wide) slung across the back, which keeps the diagonal when the tool is drawn; heavy charge bag on one hip; knee pads | **Reinforce tool**, **breach charge**; collapse charge (Alpha) | Heavy work gloves with knuckle protection; the long tool's head in view when braced; the flat charge plate with its strap |
| **Spotter** | Spike | Collapsible sensor mast rising from the back, topped by a sensor head at least 20 cm across; it stays on the back when the sensor tripod is placed; long scope case; light kit | **Sensor**; survey glass (VS) | Thin shooting gloves; a wrist display that shows the sensor's status in squad cyan (a small emissive, Section 4.4) |

**Squad-gap kit (2–3 player squads) and solo kit (Vertical Slice).** A player carrying another role's light gadget
(concept system 2), or the solo kit's extra items, does **not** gain that role's back primitive. Every light gadget
has a **compact, hip-carried form** inside one envelope. It is never on the back and never above the shoulder line. It
is no longer than 50 cm, and a long item hangs vertically. It stands no more than 8 cm off the body, which is under 1
px at 80 m, so it never widens the lower outline the way the Corpsman's bags do. The silhouette therefore still says
which role the player chose, and the role test stays honest. Starting forms:

| Light item | Compact form | Never |
| ---- | ---- | ---- |
| Light revive kit | A flat pouch on the thigh | A back pack or side bags (the Corpsman's hump) |
| Light resupply crate | A flat ammo box (no deeper than 8 cm) clipped to the thigh, set down to resupply | A frame or anything above the shoulders (the block) |
| Light reinforce tool (squad-gap kit and solo kit) | A short one-handed bar under 50 cm, carried vertically in a hip loop | Anything at least 1 m long, slung diagonally or on the back (reserved for the Sapper's full tool, Section 3.3) |
| Light sensor | A palm-sized puck in a hip pouch, placed on the ground with no mast above 40 cm | Any mast on the back (the spike) |
| Solo kit's bandolier and self-revive charge | Pouches on the belt | Anything outside the envelope |

The gap and solo kits never carry the breach charge (concept A51), so no light form exists for it.

### 5.3 First-person: the most-seen character

In a first-person game the hands, sleeves, weapons and gadgets are the character the player actually sees. They are
the highest-detail characters in the game (Section 8.5):

- **Weight is the brief** (Pillar 3): recoil kicks and recovers visibly; reloads are deliberate and physical; heavy
  melee wind-ups carry the weapon's mass; deploying a gadget has heft (setting the crate down, planting the sensor
  tripod).
- **Role identity in first person** comes from the sleeve, the gloves and the gadget (table above), so a player who
  never looks at a mirror still feels which role they are.
- **Movement has weight too** (concept system 11): a vault shows the free hand planting on the obstacle; a mantle
  holsters the weapon and shows both hands; a slide drops the camera without rolling it; landing from a fall dips the
  view. Camera motion obeys the camera-shake and head-bob options (7.6), and none of it rolls the horizon more than a
  few degrees.
- **Weapon realism, generic design** (Section 3.5): attachments are physically present and visibly change the weapon.

### 5.4 The horde

**Who they were.** Anonymous adults in ordinary civilian clothes, turned recently (days, not months): mottled
grey-olive skin, livor, wounds, dirt, and torn late-autumn clothes. They are **never presented as the residents of the
real town** (AB-30): the map was evacuated (6.8), the horde came in from elsewhere, and nothing on a zombie (clothing,
props, a pose at a particular house) ties it to the place or to any household. They are **never** children (absolute
rule from the concept), never real people, and never depicted emerging from graves.

**Wardrobe** (modular, late autumn, civilian, dressed for outdoors; no nightwear): hoodies, puffer
vests, flannel shirts, work jackets, sweaters, jeans, sweatpants, office trousers, generic work coveralls. Rules:

- **No text, logos or brands** on any garment; no sports-team apparel; no political or religious symbols.
- **No real-world uniforms or insignia**: no police, fire, military, postal, school-staff or other agency uniforms.
- **No helmets or hard hats** on any zombie: the round helmet dome is the squad's cue (Section 5.7).
- **No meaning colours in bulk**: no saturated cyan, no safety yellow or safety orange, no large areas of saturated
  red. Garments sit in muted mid and dark values, with some light pieces (a white T-shirt, a pale grey hoodie) so the
  crowd has figure-ground variety against both dark and light backgrounds.

**Skin and eyes.** Desaturated grey-olive with mottling; a slightly higher, moist sheen than living skin, which is a
grounded way to pick up rim light at dusk and night. Eyes are clouded and **never glow**: zombies carry no emissives at
all, so at night they read by silhouette, never by points of light.

**Variation, staged (Section 8.12).** The first milestone has one body frame with at least 4 heads, 4 tops and 3
bottoms from sourced packs (48 combinations before colour), plus damage masks and per-instance colour variation
inside the wardrobe palette. The later target for the whole first map is three body frames (slight, average, heavy)
with at least 12 heads, 10 tops and 8 bottoms. At every stage: no two identical combinations within any visible
group of six.

**Special types** push the same human anatomy under impossible stress, not into fantasy: no tentacles, glowing
growths or mutations from a creature catalogue. The Breacher's shoulders have outgrown its shirt; the Detonator is
gas-swollen, its skin taut and discoloured, and its tell is a visible swelling pulse and a hiss before it bursts (not
a glow); the Grabber's arms are stretched 15–20% beyond human proportion and carried reaching; the Plated carries a slab
of debris fused to its front; the Crawler's legs or spine are broken; the Howler is tall and thin with a distended
throat; the Wrecker is massive and asymmetric. All names are working names (concept system 9).

### 5.5 Expression and pose

| Who | Style | Specifics |
| ---- | ---- | ---- |
| Squad | Grounded and controlled; library motion capture as the base (sourced clips, Section 8.12) | Idle weight shifts; deliberate reloads; pointing when pinging (third person); the kneel for a revive; a heavy drag (Corpsman passive, VS); faces neutral and focused; no emotes at MVP |
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
specific homes, and no photograph of any real house, in the map area or anywhere else, is taken or used as reference
for a kit (Principle 1; concept A29). Houses are generic kits; no real house is replicated.

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
  pitches of 4:12 to 6:12, eaves 0.3–0.45 m. The concept adopted these kit heights for storey inference in revision
  2.4 (system 6, AB-13). The prototype pipeline still uses 3.2 m per level and must switch before its output feeds
  kit fitting (Appendix B).
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
- One developer cannot paint a realistic suburb by hand (U12). Scan libraries supply believable bark, asphalt,
  concrete, brick, soil and leaf litter, so the hand-made effort goes into the kit, the damage and the light (Section
  8.12).
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
| **Back yards** | Medium | Rule-generated fences cut up the yards; every fence is crossable | Chain-link fences (1.0–1.2 m) and wood privacy fences (1.8 m), hedges (0.6–1.5 m), decks and patios, grills, air-conditioning condensers, sheds. Heights stay inside the concept's traversal classes: vault 0.5–1.1 m, mantle 1.1–2.0 m (system 11) | Fences for concealment; condensers and decks for low cover | Child-specific play equipment (AB-14); any fence or wall over 2.0 m |
| **Garages** (enterable) | Dense | Garage caches live here | Shelves, workbench, hand tools, bins, a lawnmower, sometimes a car | Close-quarters cover | Branded tools and products |
| **Interiors** (enterable) | Medium-dense | Rooms as cover; doorways as melee ground | Generic furniture; picture frames with landscapes, never people | Furniture | Photographs of people, children's rooms, readable text (AB-14) |
| **Creek Woods** | Dense, natural | Close quarters at every hour | Understory, deadfall logs, creek banks, the creek, footbridges where OSM has them | Logs, banks, trunks | Lights, campsites, props suggesting residents |
| **Fields and parks** | Sparse | Landing zones and the long band | Backstops, benches, bleachers, bins, faded field markings | Little | Playground equipment (AB-14) |
| **Cemetery** | Sparse, ordered | An exposed crossing | Rows of low generic headstones, mature trees, perimeter fence | Low headstones | Names, symbols, open graves (Section 6.7) |
| **School Grounds** | Sparse | A generic institution | The generic building, a parking lot with a few cars, the field | The building and cars | Signage, names, mascots, buses, child-specific props (Section 6.7) |
| **Held sectors** (added by the squad) | Medium | The squad's infrastructure | Work-light masts, the resupply crate, the sector armory (a stack of hard cases and a rack), the workbench (a sawhorse table with tools), boards and bracing | The squad's own fortifications | Anything clean and perfectly aligned: everything here is askew |

**Which houses can be entered.** Enterable houses and garages are chosen by gameplay criteria applied in the engine
(the level GDD owns the criteria). This document, and every public document, screenshot caption and asset name,
refers to them only generically ("an enterable house", "a garage cache"), never by street, block or position. Every
house, enterable or sealed, is a generic kit fitted to a footprint. None is a replica of the real house at that spot
(Principle 1).

**Cars are props.** Parked cars and wrecks are static cover and set dressing. No vehicle can be driven or ridden:
vehicles are out of scope by the user's decision (U14, which closes concept Q11).

### 6.7 Sensitive sites

The concept's safeguards (A29) as render rules. This table adds rendering rules only. Which places are sectors is set
by the concept's system 6.1 alone; this document adds no sector and says nothing about places that are not on that
list.

| Site | Rendering | Rules |
| ---- | ---- | ---- |
| **School Grounds** (labelled generically) | A generic single-storey institutional brick building, a field, a parking lot | No name, signage, mascot or school colours; no school buses; no child-specific props; gore decals suppressed; no set-piece fires; never shown in marketing (concept R5); whether it stays a sector is open (Q16) |
| **Cemetery** (labelled generically) | Open lawn, rows of low grey headstones, mature trees, a perimeter fence | Headstones are **nameless, generic and indestructible** (logged in the concept as an accepted exception to Pillar 1, A57), and take no decals (no scorch, blood or bullet marks); no open graves; no zombie ever emerges from a grave; never a landing zone |
| **Places of worship** (three) | Generic sealed masses with pitched roofs | **No religious iconography**; sealed and **not destructible** beyond cosmetic chips (AB-14; the concept's system 5 and Pillar 1 log this exception, A57); no gore decals; no set-piece fires |
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
   (it appears when it changes or matters, then fades). It sits in the margin of the screen, never in the middle
   (Section 7.2).

The screen-space layer is drawn in **Holdout's own cartographic language** (the concept's "the map shows through, on
the map only"): thin linework, ticks, hatching, real street names. The world itself is never stylised. No HUD look
and no HUD layout is borrowed from any reference game; Holdout's role icons, its survey tick, its objective ring and
its own arrangement replace the reference series' class icons, spotting marker, objective markers and layout
(concept U1, R12).

**Controller-only (U11).** The game is played with a gamepad on a screen seen from about 3 m. Every rule in this
section is written for that: there is no cursor and no hover, text and linework are sized for the distance, and
prompts are Holdout-drawn Xbox-layout glyphs. Section 7.9 holds the rules.

### 7.2 HUD elements and arrangement

The visual language **and the arrangement** are set here (AB-31). `design/ux/hud.md`, written by `/ux-design`,
specifies behaviour and may tune the sizes below. It does not move a block to another corner or add a persistent
element to the field.

**The idea: the field and the margin.** A map sheet has a field, which is the map itself, and a margin, which holds
the title block, the legend and the bearings. Holdout's screen is laid out the same way. The **field** is the world,
and it stays clear. Everything persistent sits in the **margin**, as four small blocks pinned to the corners of a
safe frame. Each block answers one question and is closed by map-sheet corner ticks (Section 3.6). This is Section
7.1's cartographic layer applied to layout, and it is Holdout's own.

**Frame and field** (at 1920 × 1080 and HUD scale 100%; everything scales with the resolution and the HUD scale
option):

- **Safe frame:** the screen inset by 5% on every side (96 px left and right, 54 px top and bottom), because the game
  is played on televisions (Section 7.9). A screen-margin option moves it between 0% and 10%. No HUD element crosses
  it.
- **The field:** the central 60% of the width and 60% of the height (1152 × 648 px). Only the crosshair cluster,
  contextual prompts, world-space markers, the ping wheel while it is held and, briefly, a banner appear in it.
- **The sky band:** the top 20% of the height, between 25% and 75% of the width (480 to 1440 px), holds no
  persistent element. It is where figures are read against the sky from round 10 on (Section 2.2), and a bright sky is
  the worst background for thin linework. Only a transient event tag may touch its edge, for a few seconds; banners
  sit just under it.

```text
+--------------------------------------------------------------------------------------------------+
| safe frame: the screen inset by 5%                                                               |
|                                                                                                  |
|  SECTOR LADDER                                                         SQUAD BLOCK               |
|  north at the top             . . . . . . . . . . . . . .            you  [health bar]  (icon)   |
|  (o) sector name              .  sky band: nothing      .                   squadmate   (icon)   |
|  (o)                          .  persistent here        .                   squadmate   (icon)   |
|  (o) sector name              . . . . . . . . . . . . . .       [event tag] squadmate   (icon)   |
|  (o)                                                                                             |
|  (o)              +----------------------------------------------------------+                   |
|                   |  THE FIELD: the central 60% x 60%                        |                   |
|                   |                                                          |                   |
|                   |                      crosshair cluster                   |                   |
|                   |                      (A) prompt                          |                   |
|                   |                                                          |                   |
|                   +----------------------------------------------------------+                   |
|                                                                                                  |
|  TITLE BLOCK                                                                  KIT BLOCK          |
|  ( dial )  167th Street                 subtitles                               salvage          |
|  ( 268  )  Round 12, wave               (two lines at most)                gadget cross          |
|                                                                                 24 / 96          |
+--------------------------------------------------------------------------------------------------+
```

**The four margin blocks.**

| Block | Corner of the safe frame | The question it answers | Contents | Size at 1080p, HUD scale 100% |
| ---- | ---- | ---- | ---- | ---- |
| **Sector ladder** | Top left | What do we hold? | One row per sector, **ordered north to south as the sectors lie on the map** (ties run west to east), so the ladder is a one-line map: higher on the ladder is further north. Each row is the sector's **ring** with its state glyph (Section 3.6), then the sector label | Rows 52 px high; rings 40 px; at most 380 px wide with labels showing |
| **Squad block** | Top right | Who is with me, and how are we? | Four rows, right-aligned, with the role icons at the outer edge. **The player's own row is first** and carries the health bar; the three squadmates follow | Rows 52 px high; role icons 48 px; at most 380 px wide |
| **Title block** | Bottom left | Where am I, and when? | The **bearing dial**; to its right the **street line**, and under that the round and phase | Dial 120 px across; at most 480 px wide and 120 px high (160 px during an intermission) |
| **Kit block** | Bottom right | What am I carrying? | From the bottom up: ammo, the **gadget cross**, salvage | At most 380 px wide and 200 px high |

**Elements.** Shapes are those of the marker shape table (Section 3.6); text sizes are those of Section 7.3.

| Element | Visibility | Position | Form |
| ---- | ---- | ---- | ---- |
| Crosshair | Hip fire only; hidden when aiming (the optic's reticle is diegetic) | Centre of the field | A small dot with spread ticks; can be hidden in options |
| Stamina | Contextual: only below full or while blocking | Round the crosshair | A thin arc in HUD white; breath audio does the rest |
| Hit confirmation | On **impact**, not on firing (projectiles take time to land) | Round the crosshair | Four short ticks; a kill adds a brief inward motion; a headshot is marked by sound. **No damage numbers** |
| Parry feedback | On a parry | Diegetic first | Sparks, the zombie's large stagger and the sound; at most a 120 ms crosshair pulse |
| Interaction prompts | Contextual | In the field, centred, about 130 px below the crosshair | A Holdout-drawn Xbox-layout button glyph (Section 7.9), then the verb and cost ("Reinforce · 150") in Primary text on a plate. A hold, a revive, a heal and a capture show an arc filling round the glyph. A prompt or ping names an object by its kind ("door", "garage", "window"), **never an individual building**, not even by its street (concept 6.1) |
| Downed | While downed | Centre of the field | A bleed-out arc; the nearest squadmate's distance and approach; the world view desaturated 40% at most, no blur in the central 60% |
| Sector ladder | The column of rings is persistent. Labels show on the row of the sector the player is in, on the ordered sector's row and on any row whose state is changing; on every row during an intermission and for 4 s after any sector changes state. An option keeps every label on | Top-left block | Each row shows its sector's state: **held** (amber ring with the mast-and-cone glyph inside), **horde-held** (green-grey ring with the survey tick inside, hatched), **capturing** (the ring's stroke thickens clockwise as an arc in the capturer's colour), **contested** (both glyphs inside, the arc paused), **overrun** (danger hazard stripe, pulsing). The **ordered** sector's row has the double ring (concept A63). The row of the sector the player is in has a short solid bar at its outer edge. Labels are the concept's sector labels (6.1: real street, park, creek and trail names, for example "167th Street" or "Lewis Park Fields"; generic labels only for sensitive sites; the wooded park's creek label is the logged exception), written out in full in Secondary text, never abbreviated. **Sectors are never lettered or numbered** |
| Squad block | Persistent, compact | Top-right block | Four rows: role icon, name, state (alive; downed, with a bleed-out arc round the role icon in danger red; dead, with a redeploy timer); a small low-health flag below the recovery ceiling ("needs a heal") |
| Own health | The row is persistent; the bar is contextual and shows while health is below full | The first row of the squad block | A thin bar with a notch at the **recovery ceiling** (50; health above it comes only from a heal, concept system 3). In the field, a damage edge vignette (capped opacity) and directional damage arcs toward the source do the urgent work |
| Squad events | Contextual: at most three at once, each fading after 4 s | Beside the row of the squadmate who acted, on the inner side of the squad block | A short tag drawn on next to the row. Squad actions only ("revived", "resupplied", "reinforced"), which rewards Pillar 4. It is not a feed, and there is **no kill feed** |
| Bearing dial | Persistent | Title block | A ring 120 px across, drawn **heading-up**: the top of the dial is where the player is facing. On its rim: a labelled north mark that travels round as the player turns; the ordered sector's double ring at its bearing (concept A63); squad pings as cyan ticks; downed squadmates as danger ticks. In its centre: the cardinal letters over the three-digit heading, in tabular figures. Nothing else is drawn inside it. It shows bearings, never positions, distances or zombies, so it is not a minimap and not a radar |
| Street line | Persistent | Title block, to the right of the dial | **The real name of the street the player is on**, in Primary text (Pillar 2 in one line of text). A name too long for the block steps down to Secondary text; it is never cut short. The HUD specification decides what the line shows away from a street; it never names a building |
| Round and phase | Persistent, small; the intermission countdown is large while it runs | Title block, under the street line | Round number and phase. In an intermission: the countdown in Display text, and the Push or Dig In vote as a two-way directional choice (Section 7.9) |
| Ammo | Contextual: on reload, when low (25% or less), at a crate or supply point; fades after 3 s | Kit block, bottom line | Magazine and reserve numerals in tabular figures; a held reload button performs a diegetic magazine check |
| Gadget cross | Contextual: on change, while a gadget is equipped, and while the player is choosing | Kit block, above the ammo | Up to four gadget glyphs on a small upright cross, one per direction, each with its charge ticks; the equipped gadget is inverted (Section 7.9) |
| Salvage | Contextual: on change, at an armory or workbench, and during intermissions | Kit block, top line | Numerals with the salvage glyph |
| Squad markers | Persistent; fade with distance; outlined when occluded | In the world, over each squadmate | Cyan chevron, apex up, with the role icon and name |
| Pings and spotted zombies | For their lifetime (pings 5 s, specials 8 s) | In the world | Cyan chevron, apex down (a place); survey tick (a zombie: horde green-grey for every type, specials included, with an optional type glyph inside; danger red only for the types and moments listed in Section 4.3); square (an item); each drawn hollow when occluded |
| Objective marker | While a sector is ordered or being captured, and for the evac landing zone | In the world, over the capture point | **The ring**, with the sector's state glyph inside and its label under it; the double ring for the ordered sector; capture progress as the arc |
| Ping wheel (Vertical Slice) | While the ping button is held (concept system 11); a tap sends a contextual ping with no wheel | Centred on the crosshair | A thin ring about 360 px across with glyphs on it, chosen by pointing a stick (Section 7.9) |
| Panel states | Diegetic (outlines, Section 3.4) | In the world | While a Sapper holds the reinforce tool, an overlay outlines nearby panels: squad-owned reinforced (yellow), about to fail (danger red) |
| Banners | Transient: a round starting, the evac call, a sector won or lost; 2.5 s at most | One line centred at about 24% of the screen's height: just under the sky band, at the top edge of the field | Display text on a plate, drawn on and wiped off (Section 7.5). The information then stays in the title block or the ladder |
| Tactical map | Hold to open | Full screen | The dark chart (Section 7.8) |
| Subtitles | For every voice callout | Bottom centre, between the title block and the kit block; at most 760 px wide and two lines | HUD white on a plate, in Primary text by default |

**Why this arrangement.**

- **It follows the game's own content.** Holdout's sectors have real names, and a name needs a line of its own. A
  vertical ladder can spell "Lewis Park Fields" in full, in text large enough to read from 3 m, where a row of small
  markers could only abbreviate it. Ordering the ladder north to south turns it into a strip of the map.
- **It suits a stick.** A heading-up dial shows all 360° at once, so a player who turns with a stick sees what is
  behind before committing to the turn. The heading numerals keep spoken bearings possible, and the street line gives
  the callout this game is built for ("Runners on 167th").
- **It keeps the sky.** The top centre is where silhouettes are read at dusk and at night.
- **One glance, one question.** From 3 m a 55-inch screen spans about 23°, so a corner is a short glance away, and
  each corner holds one subject. The player's own health sits with the squad's, because in this game health is a
  squad matter (the Corpsman's heal, the "needs a heal" flag).
- **It is not a borrowed layout** (Section 9.1). There is no row of objective icons across the top centre, no
  lettered objective, no bearing tape, no squad list stacked on a corner minimap, no health readout paired with the
  ammo, and no kill feed.

**No persistent minimap at MVP** (AB-15): the bearing dial, the street line, world markers and the hold-to-open
tactical map carry orientation. Playtests decide whether a minimap returns as an option; if it does, it goes in the
margin under the same rules, and its place is decided then. The browser greybox prototype draws one for debugging;
that is a listed prototype divergence, not a precedent (concept Next Steps).

### 7.3 Typography

**Personality:** the road sign and the survey map. American highway lettering is the most familiar public typography
of a US suburb, and it ties the HUD to the real street signs in the world.

- **Primary typeface: Overpass** (an open-source family inspired by the US highway alphabet; licensed under the SIL
  Open Font Licence and LGPL). **Numerals: Overpass Mono** (tabular). The same typeface sets the in-world street-name
  signs. *Fallback:* IBM Plex Sans Condensed and Plex Mono (SIL OFL). Verify both licences and the glyph coverage
  needed for the later cities' street names before shipping (AB-16).
- **Case:** sentence case everywhere, except short labels of 12 characters or fewer (the dial's cardinal letters,
  button labels such as "LB"), which may be capitals with 5% extra tracking. Sector labels are written the way the
  street or park is written, never in capitals.

**Sized for 3 m (U11).** The design condition is a 55-inch 16:9 television seen from 3 m (Section 7.9). There, one
pixel of a 1080p image is about 0.73 arcminutes, so a desk-distance scale (18–24 px, the first draft of this table)
is too small: type has to be roughly twice the size it would be on a monitor at arm's length to look the same.

| Level | Size at 1080p, HUD scale 100% | Angle at 3 m on a 55-inch screen | Weight | Used for |
| ---- | ---- | ---- | ---- | ---- |
| Display | 64 px | about 47 arcmin | Bold | Banners, the intermission countdown, the evac call |
| Primary | 36 px | about 26 arcmin | Semibold | Prompts, the street line, the magazine count, subtitles (default), menu items |
| Secondary | 30 px | about 22 arcmin | Regular; Semibold for sector labels | Sector labels, squad names, salvage, the ammo reserve, the heading, event tags, menu detail text |
| Tertiary | 26 px | about 19 arcmin | Regular | Tactical-map labels for residential streets, legends, the menu legend line |
| Legal | 22 px | about 16 arcmin | Regular | ODbL attribution and licence line |

**Minimum readable size:** 26 px at 1080p for any gameplay information; 22 px only for legal text, which must still
be legible from 3 m. Anything a player reads as a sentence under time pressure (prompts, subtitles) is Primary or
larger: vision-science reviews of print size put fluent reading at an x-height of about 0.2° (12 arcminutes) and
above, and Primary is the first level expected to reach it on this typeface (to be confirmed by measuring the font
file's x-height; Appendix B). Subtitles at Primary run to about 38 characters a line. Sizes scale with the HUD scale
option (80–150%, set by a size check at first launch, Section 7.9) and with a separate text-size option. Text over the
world always sits on the HUD plate and is always primary HUD white (Section 4.6).

### 7.4 Iconography

**Flat, outlined, cartographic.** Glyphs are single-colour linework (3 px stroke at 1080p and HUD scale 100%) on a
40 px grid (48 px for role icons and for button prompts in the field), sized for a screen seen from 3 m (Section
7.9) and coloured by meaning, with no gradients, bevels, glows or photographic rendering. Marker shapes are defined
once, in Section 3.6.

| Icon | Holdout's design | Never |
| ---- | ---- | ---- |
| Corpsman | A pulse trace (a heartbeat line) inside a circle | A red cross, red crescent or red crystal on any background: these are protected emblems under the Geneva Conventions, and the Red Cross movement asks games not to use them (AB-17) |
| Quartermaster | A frame pack: an upright rectangle with a top bar and two straps, the role's block primitive (AB-29) | Cartridges, bullets, magazines or ammo belts (common for the reference series' support role), or the reference series' class icon |
| Sapper | A brace: a diagonal across a square frame (it echoes the reinforced panel) | The reference series' class icon |
| Spotter | A mast with two arcs (the sensor) | An eye, or the reference series' class icon |
| Spotted zombie | The survey tick (Section 3.6) | A rotated square, that is a diamond (concept A45) |
| Infrastructure | An upright square holding a small glyph: a rack (armory), a vice (workbench), an ammo can (supply point), a crate | A square rotated 45° |
| Objective | The ring, with the sector's state glyph inside it (Section 3.6) | A letter, a number, a flag or a rotated square |
| Held sector | The mast-and-cone glyph, inside the sector's ring | |
| Button prompts | Holdout-drawn Xbox-layout shapes and letters (Section 7.9) | A platform logo, any platform holder's own glyph art, colour-coded face buttons, a keyboard key or a mouse |
| Weapons and attachments | Side-profile line drawings of Holdout's generic designs | Real product silhouettes or logos |
| Squad emblem | A survey benchmark disc (a circle with a level bar), Holdout's own | Real military or agency insignia |

Every icon is part of the IP checklist before public material (concept R12).

### 7.5 UI animation

**Mechanical and functional, like a plotter drawing a map.** Lines draw on in 100–150 ms; elements fade in 150–250 ms;
nothing bounces, overshoots or springs. Markers appear by drawing their outline. Danger pulses at 1.5 Hz at most, and
nothing on screen flashes faster than 3 Hz. Opening the tactical map draws the streets in, real names last. Menus cut
or cross-fade in 200 ms; no swooping parallax.

### 7.6 Accessibility options with a visual side

HUD scale (80–150%), set by a size check at first launch (Section 7.9), and a separate text size; screen margin
(0–10%); marker outline thickness (the dark keyline is on by default, Section 4.6); plate opacity (80–100%);
per-meaning colour remap from a pre-validated set (Section 4.7); always-on sector names (Section 7.2); **Night
visibility assist** (raises the horde readability light's cap by up to two times, Section 2.5); **Reduce flashes**
(lower muzzle-flash and explosion bloom and flare intensity); camera shake 0–100%; head bob off; field of view and
aim field of view sliders; motion blur off; film grain off; damage vignette opacity; subtitle size and plate opacity;
crosshair style and visibility; reduced gore (Section 5.8). By default no full-field flash exceeds three per second
(muzzle flash, explosions and flares included).

**Controller options with a visual side** (the settings themselves belong to the input GDD; concept system 11 makes
them core systems from the MVP). Look sensitivity, aiming sensitivity and the sensitivity for each optic
magnification are sliders with numerals. The stick deadzones and the response curve are each shown as a live line
drawing in the UI's own linework (the stick's position inside its deadzone ring; the curve as a small graph with the
current input marked on it), so they can be set by eye from the couch. Aim-assist strength is a stepped setting.
Every hold prompt can be switched between hold and press, and every held state between hold and toggle. Every option
on every screen is reached and changed with a gamepad alone; none needs a keyboard or a pointer.

The full list belongs to `design/accessibility-requirements.md`.

### 7.7 Art direction versus readability: conflicts and decisions

A specialist pair (`art-director` and `ux-designer`) would have argued these out; the user could not be asked, so
each is decided with both positions recorded (AB-15; rows 10–12 are AB-31 and AB-32, decided inside the user's
controller-only decision U11). Every decision can be overruled, except U11 itself.

| # | Conflict | Art direction's position | UX position | Decision |
| ---- | ---- | ---- | ---- | ---- |
| 1 | Ammo | No counter: magazine checks and the sound of a near-empty weapon | Finite ammo with no drops and a limited supply stock means players must plan resupply and call for the Quartermaster | **Contextual numerals** (on reload, when low, at supply) plus the diegetic magazine check |
| 2 | Stamina | Breath audio and weapon sway only | Block and parry spend stamina; failing a block without warning feels unfair | **Contextual thin arc** at the crosshair, plus breath audio |
| 3 | Health | Edge vignette only | Revive and Corpsman priorities need a clear state | **Own health: contextual bar plus vignette. Squadmates: downed and low-health flags only** |
| 4 | Minimap | None: the world and a bearing | A corner minimap reduces disorientation on a 1.2 km map | **None at MVP**; the title block's street line shows the real street name and the bearing dial shows bearings; playtests decide on an optional minimap |
| 5 | Hit confirmation | Sound and impact effects only | With travel time, players need to know a shot landed | **Ticks on impact, no damage numbers** |
| 6 | Downed view | Heavy desaturation and blur | The downed player still crawls and shoots and must see threats | **40% desaturation at most; no blur in the central 60%** |
| 7 | Night | Dark nights that make the light plan matter | Threats must stay visible | The concept's per-band minimums (Section 2.4), the bounded readability light (Section 2.5) and **Night visibility assist** as an option |
| 8 | Spotted markers through walls | Markers only in line of sight | Spotting is a squad hand-off and must survive cover | **Visible through walls for their lifetime, drawn hollow when occluded** |
| 9 | Crosshair | No hip-fire crosshair | New players need a reference, and every player aims with a stick (concept U11) | **Small dot with spread ticks**, hideable |
| 10 | Text and line size | Fine, small linework: the HUD as a quiet drawing | The game is played with a controller from about 3 m (U11), and desk-sized type cannot be read from there | **The 3 m scale** (Sections 7.3 and 7.9): 26 px minimum text and a 3 px base stroke; a size check at first launch; HUD scale down to 80% for anyone sitting close |
| 11 | Plates | Light, translucent plates, so the world shows through | Text on a 60–75% plate drops to between 2:1 and 3:1 over a bright sky | **90% plates and a default dark keyline** (Section 4.6); plate opacity stays a player option |
| 12 | Where the HUD sits | Almost nothing on screen | Sector state, squad state, bearings and the round have to be readable at a glance | **The field and the margin** (Section 7.2): four corner blocks, a clear field and an empty sky band |

### 7.8 The tactical map, the front end and attribution

- **Tactical map (the hero UI):** a dark chart of the real OSM data: building footprints, streets with their real
  names in a hierarchy (167th Street widest), water, neutral grey land cover, the sectors as rings with their sector
  labels (as on the sector ladder, 7.2), the frontline as a hatched band, squad chevrons, pings, infrastructure
  squares and spotted ticks (the shapes of Section 3.6). **It shows the
  squad's changes:** breached and destroyed walls appear as gaps and broken outlines in the footprints, so the map
  becomes a record of the match. **Text rule:** the only words drawn on the chart are street names and sector labels.
  OSM place, subdivision (named residential land use) and institution names are never drawn, so no subdivision name
  reaches the screen through the map data (concept 6.1, U10).
- **The map with a controller (Section 7.9):** the map has no cursor. A fixed reticle sits at its centre and the
  chart moves under it: a stick pans, the zoom steps between three fixed scales, and a directional press snaps the
  reticle to the next sector ring or squadmate. Whatever is under the reticle has the focus, and its name and the
  actions available on it show in the legend line. The redeploy screen uses the same snapping to choose the squadmate
  to spawn on.
- **Front end:** the main menu sits over the live "street before" scene (Section 2.3); role select is the open garage
  under the squad's work light; the end-of-match summary is the map of what the squad held, broke and built. At the
  first milestone the front end is the dark chart alone, with no 3D scene (Section 8.12). Every front-end screen
  follows the focus rules of Section 7.9.
- **Map select and loading:** the map is named **"Tinley Park, IL (60477)"** (never after a subdivision); its
  cartographic sheet draws in; no promotional imagery of real houses is used.
- **ODbL attribution** ("© OpenStreetMap contributors", with a link to the licence) appears on map select, on loading
  screens, in a corner of the tactical map and in the credits, at the legal size or larger.

### 7.9 Controller-only rules (U11)

**The user's decision.** Holdout is played with a gamepad and never with a keyboard (U11, confirmed twice by the user
on 2026-11-19; playtests use an Xbox Elite Series 2; this closes concept Q22). A gamepad is the primary and only
supported player input. Keyboard and mouse is a developer fallback: it is never advertised, never tuned and never
shown in the UI. These rules bind every screen: the HUD, the tactical map, the front end, the armory and workbench,
and the options. Where an older rule in this document assumed a pointer, this section replaces it.

**1. The design condition: a 55-inch 16:9 television seen from 3 m**, at 1080p or above. From there the screen spans
about 23°, and one 1080p pixel is about 0.73 arcminutes. That is finer than normal eyesight resolves (about one
arcminute), so nothing meaningful may be one pixel wide. What follows, at 1080p and HUD scale 100%:

| Thing | Rule | Stated in |
| ---- | ---- | ---- |
| Text | 26 px minimum for gameplay information; 36 px for anything read as a sentence; 22 px for legal text | Section 7.3 |
| Lines | 3 px base stroke; nothing meaningful thinner than 2 px | Section 3.6 |
| Glyphs | A 40 px grid; 48 px for role icons and for button prompts in the field | Section 7.4 |
| World-space markers | Never drawn smaller than 32 px, however far away the thing is: they fade with distance, they do not shrink | Here; it applies to every world-space marker in Section 7.2 |
| Contrast | Text over the world is primary white on a plate at 90% or more (about 5.8:1 in the worst case). Marks in a meaning colour carry a 2 px dark keyline by default | Section 4.6 |
| Safe frame | 5% inset, adjustable from 0% to 10% | Section 7.2 |
| Size check | At first launch, one screen shows a sample line and asks the player to step the HUD scale left and right until it reads comfortably from where they sit. A smaller television or a longer room goes up to 150%; a player sitting close goes down to 80% | Section 7.6 |

**2. Button prompts: shapes and letters, drawn by Holdout.** Prompts use **Xbox-layout labels** (U11). They are
drawn as generic shapes and letters in the game's own linework and belong to the glyph set of Section 7.4: a 3 px
HUD-white outline on a dark plate, the letter in the UI typeface, one colour.

| Control | Glyph | Rule |
| ---- | ---- | ---- |
| Face buttons | A circle holding the letter A, B, X or Y | One circle, one letter. Never colour-coded: colour belongs to the meaning palette (Section 4.3) |
| Bumpers | A wide, low bar with a slightly arched top, holding LB or RB | Always wider than it is tall |
| **Triggers** | A tall tab with one curved edge, holding LT or RT | Always **taller than it is wide**, so a trigger and a bumper differ by outline before the letters are read. A hold is an arc filling round the tab. No action needs a partial pull, so no prompt shows one |
| **Sticks** | A small circle (the cap) inside a ring (the gate), holding L or R | **Moving a stick and pressing it never share a glyph.** *Move:* a direction tick outside the ring on the side to push, or a full outer arc when any direction will do. *Press:* the cap filled solid with a short tick under it, and no direction tick |
| D-pad | An upright plus | The direction in use is filled; all four are outlined when any of them will do |
| Menu and View | A square-cornered tag holding the word "Menu" or "View" | Words, not pictograms |
| A hold, and two controls together | The verb says "Hold", and an arc fills round the glyph while the control is held. Two glyphs joined by a plus sign at most | No double-taps and no three-control chords |

**Never in a prompt:** a platform's logo or its logo button; any platform holder's own glyph artwork, or shapes
traced from it; another controller layout's symbols; a photograph or a 3D render of a controller; a keyboard key or a
mouse; a back paddle. Back paddles are remaps that the player sets in the controller's own software, so the game
never prompts for one and every action is reachable without them.

**3. Focus navigation.** Every screen that is not the game view is used by moving a focus with the D-pad or the left
stick.

- **No cursor.** There is no pointer and no stick-driven virtual cursor on any screen, the tactical map included
  (Section 7.8).
- **Always exactly one focus.** One element is focused from a screen's first frame. Focus is never lost: if the
  focused element goes away, focus moves to its nearest neighbour. Returning to a screen restores the last focus.
- **Focus is a shape, not a hue.** The focused element **inverts** (a HUD-white plate with dark text and glyph) and
  gains map-sheet corner ticks outside its outline, drawn on in 100–150 ms. It must be the most obvious thing on the
  screen from 3 m. *Selected but not focused:* a solid bar on the element's leading edge. *Disabled:* a hatched plate
  and thinner linework; it can still take the focus, so the detail panel can say why it is unavailable.
- **No hover-only states.** Nothing is revealed, previewed or triggered by resting on an element, and there are no
  pointer tooltips. The description, cost and comparison for the focused element show in a fixed detail panel on the
  same screen.
- **Built on rows and columns.** Menus are lists and grids whose elements line up, so a directional press lands where
  the eye expects. There is no drag-and-drop (an attachment is fitted by choosing the slot, then the part), no scroll
  bar to grab (a list scrolls to keep the focus in view), no double-click, and no control that only a pointer could
  reach. Rows are at least 64 px high.
- **Sliders and values** step left and right on the focused row, speed up when held, and always show their number.
- **The legend line.** Every screen ends with one line at the bottom of the safe frame that lists each control that
  does something on that screen: the glyph, then the verb. Confirm and back are the same two controls on every
  screen, and back never needs the focus to be moved first.
- **Text entry.** No screen needs a physical keyboard. Where characters have to be entered (a lobby code), the screen
  offers a gamepad character picker or the platform's own on-screen keyboard.

**4. Choosing among things: a wheel or a cross, never a list.** In the game view, a choice among gadgets or among
ping types is made by direction.

- **The ping wheel** (Vertical Slice; concept system 11: a tap pings, a hold opens the wheel). A thin ring about
  360 px across, centred on the crosshair, divided by tick marks into **four to eight** equal segments, with one
  48 px glyph on the ring per segment. Pointing a stick highlights a segment, which inverts. The highlighted
  choice's name shows in Primary text under the centre. Releasing the button sends it; letting the stick return to
  the centre and releasing cancels. The world stays visible and the match does not pause.
- **The gadget cross.** Each gadget a player carries owns one direction of an upright cross (up to four), shown in
  the kit block with its charge ticks; the equipped gadget is inverted. The input GDD decides which control drives
  the cross and may also give a gadget a button of its own. The HUD draws the cross either way.
- **Two-way choices** (the Push or Dig In vote) are a left-or-right choice, shown with its two direction glyphs.
- **Never:** a numbered bar, a list walked item by item, or a wheel aimed with a pointer. A choice with more than
  eight options is split into two steps.
- Wheels and crosses are Holdout linework: a ring with tick marks, an upright cross of slots. They use no
  wedge-shaped text boxes round a centre, and no layout or wording from any reference game's request menu.

**5. Aiming with sticks.** Aim assist (concept system 11) has no visual of its own: no bracket, no snapping reticle
and no highlighted target. The crosshair, the hit ticks and the diegetic optic are the whole aiming display.

## 8. Asset Standards

### 8.1 Constraints these standards are built on

| Constraint | Value | Source |
| ---- | ---- | ---- |
| Engine | Unreal Engine 5.8 (pinned; latest hotfix 5.8.4), C++ and Blueprint | `project.yaml`, `technical-preferences.md` |
| Rendering | Lumen and Nanite (deferred); Substrate materials (on by default since 5.7); MegaLights production-ready in 5.8 (needs hardware or software ray-tracing support); Lumen Lite is Beta | `docs/engine-reference/unreal/modules/rendering.md` |
| Platform | PC (Windows) on Steam; **controller-only for players** (an Xbox-layout gamepad); keyboard and mouse is a developer fallback, never advertised or tuned; the UI is designed for a television seen from 3 m (Section 7.9) | The user's decision U11 (confirmed twice, 2026-11-19), `technical-preferences.md`, `project.yaml` |
| Team and money | **One developer with AI tools.** No team, no outsourcing, close to zero cash beyond free or low-cost marketplace assets, and an unknown number of hours a week (Section 8.12) | The user's decision U12 (2026-11-19) |
| Performance target | **60 fps at 1080p on a mid-range GPU (RTX 3060 class)**, 4 players; 16.6 ms frame budget | `technical-preferences.md` (`project.yaml` has no `performance` block) |
| The hard case | A **listen-server host** renders while it also simulates the horde, destruction, projectiles and World Partition streaming for all four players | Concept (system 10, R2, R10) |
| Not yet configured | Draw-call budget, memory ceiling, minimum GPU | `technical-preferences.md`; concept R10 |
| Horde count | **24 active zombies at MVP, 48 target, plus the far tier** (concept system 9). `technical-preferences.md` says "up to ~100 active zombies"; the budgets here use the concept's numbers and the mismatch is flagged (AB-19) | Concept, `technical-preferences.md` |

Every budget in this section is a **starting value** for the technical director's netcode and rendering spike (which
includes the Lumen/Nanite stress scene on the host). The spike confirms or revises them; this section is then
updated, not argued around. The hours available each week are unknown (U12), so this document orders work by
milestone and gives no calendar dates.

### 8.2 File formats

| Asset type | Authoring source | Into the engine | In the engine |
| ---- | ---- | ---- | ---- |
| Static meshes (kit, props, rubble) | Any DCC; Blender is the default (no licence cost) | FBX (glTF allowed for static meshes) | Static Mesh, Nanite enabled where Section 8.5 allows |
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
| `BP_` / `WBP_` | Blueprint / widget Blueprint | `WBP_HUD_SectorLadder` |
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
| UI | Vector source | Glyphs exported at 2× their 100% HUD size: 80 px for a 40 px glyph, 96 px for a 48 px role icon or button prompt (Sections 7.4 and 7.9) |

### 8.5 Geometry budgets, material slots and LODs

| Category | Nanite | Triangles (LOD0 or source) | Material slots (max) | LODs | Notes |
| ---- | ---- | ---- | ---- | ---- | ---- |
| House-kit panel, intact | Yes | 5,000 | 3 (exterior, interior, shared wall internals) | Nanite | Instanced per state under one state owner per building (concept system 5) |
| House-kit panel, damaged or breached | Yes | 15,000 | 3 | Nanite | Built from the shared internals kit (Section 8.6) |
| Generated roof | Yes | By the generator; trim-sheet UVs | 2 | Nanite | Hip, gable and compound required (the roof gate) |
| Rubble state (per collapsed segment) | Yes | 50,000 | 3 | Nanite | Gameplay state, authored and replicated |
| Static props | Yes (opaque) | 1,000–20,000 | 2 | Nanite | Masked or translucent props are not Nanite |
| Parked cars and wrecks | Yes | 60,000 | 3 | Nanite | Generic designs, no badges or trade dress. Static props only: nothing can be driven (U14) |
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
   stump, fences between back yards (heights inside the vault and mantle classes, 6.6), an air-conditioning
   condenser, leaf bags.
9. **Write per-panel destruction data:** material class, load-bearing flag, nav-link sockets (enterable buildings
   and the outer ring of sealed-house pockets only), plus a traversal link on every generated fence and hedge (vault
   or mantle for players, climb for the horde; concept system 11).
10. **Bake** into World Partition.

**Kit authoring rules:** every module has all four states with matching edges so neighbours still join; corner,
filler and opening modules exist for every family; exterior and interior faces are both modelled; one shared
**wall-internals kit** (studs, sheathing edges, insulation, drywall edges, wire stubs) supplies the inside of every
breach, modelled once and reused everywhere. **Automated checks** in the pipeline report: flat roofs on houses (must
be zero), variation-rule violations, identical houses within 150 m on a street, overlapping modules, off-grid panels.
**Determinism:** the same extract always produces the same street, on every client. **Repository (the user's decision
U13):** the repository stays public and the first map's data files stay tracked as they are. Nothing new that singles
out a location is added: no address, no house number, no coordinates, and no document that lists which houses can be
entered (Section 6.6).

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

- **Sources, cheapest first (U12).** Public-domain (CC0) libraries such as Poly Haven and ambientCG for surfaces,
  skies and some models. Epic's free sample content for Unreal projects. **Fab** (which now distributes the Megascans
  library) for scanned surfaces, plants, generic debris and low-cost kits. Free animation libraries for body motion.
  Prices and licence terms differ by asset and have changed over time: **check the price and verify each asset's
  licence at acquisition**, including whether it may be used in a shipped game, and record it. Nothing is bought
  that a free source covers.
- A **licence ledger**, kept by the developer (the `producer` agent maintains the file), records every sourced or
  generated asset: name, source, licence, date, link, cost and modifications.
- **Allowed:** scans of materials (brick, siding, asphalt, concrete, bark, soil, leaves) and of generic objects.
  **Never:** scans or photographs of real homes or identifiable buildings (anywhere, and above all in the map area),
  vehicles with trade dress, branded products, or real people without model releases. Logos and text are stripped
  from anything sourced.
- **AI-generated art.** AI tools may draft concept sheets and the generation prompts that `/asset-spec` writes, and
  may generate textures, decals and supporting props (tiers 3 and 4 in Section 3.7). The rules: a prompt never
  contains a real address, a photograph of a real house or a real person, a brand, or the name or imagery of any
  reference game. The output passes the same tests as any other asset (no text, logos, likenesses or insignia;
  Sections 3–5). Nothing that carries Holdout's identity (the marker and prompt glyphs, the role primitives, the
  house-kit modules) ships as raw generator output: it is redrawn or rebuilt to this bible's grids and sizes. Every
  generated asset that ships is recorded in the ledger, because the store's content survey asks developers to
  disclose AI-generated content (verify the current requirement at submission).
- **Faces:** a licensed scan library with model releases, or MetaHuman under its licence. **Fonts:** SIL OFL (Section
  7.3). **Map data:** OpenStreetMap under the ODbL, attributed (Section 7.8).

### 8.12 Production plan for one developer (U12)

**The user's decision.** Holdout is made by **one developer with AI tools** (U12, 2026-11-19). There is no funded
team and no outsourcing budget; cash is close to zero beyond free or low-cost marketplace assets; the number of hours
a week is unknown. The user chose the re-cut: one map, one polished core loop first, and features added only after it
is fun. Most of the earlier big-team plan is therefore deferred, and its outsourcing and multi-artist assumptions are
deleted from this document. Because the hours are unknown, this section gives an order of work and ceilings, never
dates.

**Every feature the user asked for stays a goal of the game** (U1–U11). This plan stages them. It drops none.

**Four rules, in this order.**

1. **Buy or download before making.** If a free or low-cost library has it and it passes this bible's tests, use it.
2. **Generate before placing.** Anything that repeats across 745 buildings is made by rule from the map data and is
   never placed by hand.
3. **Hand-make only what carries Holdout's identity**, or what cannot be had any other way: the house-kit modules,
   the honest inside of a wall, the role primitives, the squad's own infrastructure and the whole glyph set.
4. **Nothing is made ahead of the core loop.** An asset that the current milestone's loop does not show is not made
   yet, however cheap it looks.

**The source of each asset group.**

| Group | Bought or downloaded (free or low-cost; Section 8.11) | Procedural (by rule, with no hand placement) | Hand-made by the developer |
| ---- | ---- | ---- | ---- |
| **Surfaces** | Photogrammetry and scan libraries: brick, asphalt, concrete, shingles, bark, soil, leaf litter, sheathing, drywall | Weathering by mask; cladding colour per instance inside the world swatches (Section 4.2); ground blending | One siding-and-trim profile sheet, if no library has a clean, unbranded one |
| **Houses** | Nothing whole. Generic, logo-free parts from a marketplace kit (a door, a window frame, a garage door) may be used inside a module | **The house itself:** walls fitted to the footprint on the 1.22 m grid, storeys, the facade grammar, the roof, cladding and colour by the variation rule, and the yard (Section 8.6). **Damage states** are cut from each intact module by rule, using a few break-edge profiles and the shared wall-internals kit | The modules of one kit family, the break-edge profiles, the wall-internals kit, boards and braces. No real house is modelled, measured or photographed (Principle 1) |
| **Streets and ground** | Library surfaces | Roads, curbs, sidewalks, driveways and lawns, all from the map data | Nothing |
| **Props** | Marketplace and free packs: street furniture, yard and garage props, generic cars (static, U14) | Placement by rule (PCG) | Only the squad's own infrastructure: the work-light mast, the resupply crate, the armory stack, the workbench. Street-name signs are one blade mesh with the name set from the map data |
| **Foliage** | Library trees and shrubs, bare where the season needs it, the nearest match to the species in Section 8.7 | Scatter by rule; Creek Woods by PCG | Nothing |
| **Squad** | One generic soldier body with first-person arms, stripped of any insignia or brand (Section 5.1); library motion capture | The role is told by swapping the kit on one body | **The four role primitives** (Section 3.3) and the compact light-gadget forms (Section 5.2), sized to the 80 m minimums |
| **Horde** | Marketplace civilian and zombie bodies and wardrobe that pass Section 5.4; library animation, retargeted | Variety from modular wardrobe, colour variation and damage masks; special types as proportion changes on the shared skeleton where Section 5.4 allows it | The attack wind-ups: library clips re-timed and pushed in amplitude until they telegraph (Section 5.5) |
| **Weapons and melee** | A generic, unbranded firearms pack with attachments, and ordinary tools (Section 3.5); every mark and model name removed | Nothing | The changes that give each class its own outline and each attachment its visible change (Section 3.5) |
| **VFX** | Niagara packs and engine sample effects | Driven by material class (Section 8.9) | Tuning to the limits in Sections 2.6 and 8.9 |
| **UI** | The typefaces (SIL OFL) | The tactical map, the sector ladder and the street line, all drawn from the map data | **The whole glyph set:** the markers (Section 3.6), the role icons (Section 7.4), the button prompts (Section 7.9), the bearing dial |
| **Light and sky** | Nothing | The engine's sky and the round-driven curve (Section 2.2) | Three light rigs: streetlight, work light, weapon light (Section 8.8) |

**What the AI tools do.** They write and maintain the generator, the PCG graphs, the material graphs and the UI
widgets. They draft concept sheets and the per-asset briefs and generation prompts that `/asset-spec` produces. They
may generate textures, decals and supporting props under the rules in Section 8.11. They do not decide what is
accepted: an asset is done when it passes the tests in Sections 3–5 and the standards in this section, whoever or
whatever made it.

**The first milestone's asset list (strict).** The first milestone is the user's "one polished core loop" on the
first map. The concept's re-cut says which features are in it; this list is the **ceiling** on the art made for it.
If the concept's milestone needs less, less is made. If it needs something that is not on this list, the list is
changed first, in this document, before the asset is started.

| Group | In the first milestone, at most | How it is made | Waits until the core loop is fun |
| ---- | ---- | ---- | ---- |
| House kit | **One kit family** (the ranch: one storey) in **one wall type** (siding). At most 10 hand-made intact modules: plain wall, window, picture window, entry door, patio door, garage door, stretchable filler, corner, foundation strip, eave and trim. All four panel states for each, cut by rule. Every footprint on the map gets a house from this one family, so the variation rule (Section 6.3) is met on cladding colour, roof form and garage side | Hand-made modules; states and fitting generated | The other families (raised ranch, split-level, two-storey); the brick-veneer wall type and its damage set; garage and shed kits beyond a plain box; apartment and civic kits (plain sealed blocks until then) |
| Wall internals and fortification | One shared wall-internals kit (about 10 pieces); about 6 break-edge profiles; boards in two sizes and one brace set | Hand-made once and reused in every breach | Internals for wall types other than siding |
| Roofs | Gable and hip, generated, including a hip roof over a footprint that is not a rectangle, so that the roof gate (Section 8.6) holds: no flat roof on a house | Procedural | Compound roofs that mix gables |
| Interiors | Bare partitions and at most 10 generic furniture props, in the houses the engine makes enterable (Section 6.6) | Sourced props, placed by rule | Dressed rooms |
| Materials | At most 6 master materials and about 20 instances | Library surfaces on Holdout's masters | The rest of the range in Section 8.5 |
| Props | At most 20 unique meshes, of which at most 4 are hand-made (the work-light mast, the resupply crate, boards, the street-sign blade) | Sourced; placed by rule | The full prop list in Section 6.6; the armory stack and the workbench, unless the milestone's loop uses them |
| Cars | At most 2 generic bodies, static | Sourced | Damage variants and more bodies. Never drivable (U14) |
| Foliage | At most 4 kinds: one bare street tree, one evergreen shrub, one hedge, one understory bush | Sourced; scattered by rule | The 15 species in Section 8.7 |
| Squad | One body frame in one uniform; helmet and eye protection, so no bespoke heads; one set of first-person arms with a glove material per role; the role primitive for each role the milestone includes (at most 4) | Sourced body; hand-made primitives | The second body frame; heads and faces; per-role sleeve meshes |
| Horde | One skeleton and one body frame; at most 3 types (Shambler, Runner, Breacher); at least 4 heads, 4 tops and 3 bottoms; a hand-tuned wind-up for every attack the loop uses | Sourced bodies, wardrobe and clips; types as proportion changes | The other six types and the boss; more frames and wardrobe (Section 5.4) |
| Weapons and melee | At most 2 guns finished in first person, 3 attachments and 1 melee weapon. Anything else the milestone needs stays a blockout | Sourced and adapted | Every further gun, attachment and melee weapon, added one at a time |
| Gadgets | One per role the milestone includes, as clean, simple meshes that repeat the role's primitive (Section 3.5) | Hand-made | The second gadgets; the collapse charge |
| VFX | At most 10 Niagara systems: a muzzle flash per gun; impacts for siding, wood, ground and flesh; one destruction dust burst tinted by material; blood and scorch decals | Sourced and tuned | Fire and smoke columns; material-specific sets; cosmetic fracture; volumetric smoke |
| UI | The marker shapes of Section 3.6; 4 role icons; at most 15 button-prompt glyphs (Section 7.9); at most 12 other glyphs; the four HUD blocks (Section 7.2); the tactical map; one menu template (list, detail panel, legend line) | Glyphs hand-drawn; the map and the ladder generated | The ping wheel (Vertical Slice); the attachment screens at the workbench; the match-summary map |
| Light | The curve from late afternoon to dusk, finished (rounds 1–14). The night bands run on the same curve, unpolished | Procedural sky; three light rigs | Night polish: tuning the readability light, streetlights dying, fires |
| Front end | The dark chart as the background of every menu | Generated | The "street before" scene, the garage role select, and the aerial victory and defeat scenes (Section 2.3) |

**After the first milestone.** Work is added one item at a time, in the order the concept's re-cut sets, and only
once the core loop is fun. The longer-term targets elsewhere in this bible (nine horde types, four kit families, 15
foliage species, two body frames, the night states) remain the direction. They are not commitments to a date.

**Rule-cut damage states are unproven.** Cutting the damaged, breached and destroyed states from an intact module by
rule is what makes one person's house kit possible, and it has not been tried yet. It is the first thing the kit
work proves, on one module, against the 30 m outline test of Section 3.4. The fallback is to hand-model the three
damage states for the plain wall and the window module only, and to let the other modules reuse them (Appendix B).

**Reuse multipliers:** the shared wall-internals kit for every breach; trim sheets shared across kit families; one
master material per surface family; wardrobe pieces shared by every zombie type; one skeleton for the whole horde;
the generator dressing yards, so no yard is placed by hand.

**Deleted from the plan (U12):** outsourcing and outsourcing briefs; a separate in-house environment artist;
acceptance reviews of outside work; calendar months. `/asset-spec` still writes a brief for each asset, now for the
developer and the AI tools.

**Proposed cuts needing the user's approval: none.** This plan defers; it makes no permanent cut to anything the
user asked for (U1–U11), and it does not count a deferral as a cut. If a later milestone shows that a feature the
user asked for cannot be built by one person in any form, it is listed here first, with the reason and what cutting
it would save, and it waits for the user's answer.

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
The squad-shooter series behind the user's feel direction (D1; concept U1) is **not named in this document**: its
name appears only in the concept's Inspiration and References and in the concept's decision log (AB-36). Here it is
"the reference series", and player-facing text never names it.

### 9.1 The core references

| # | Reference | Take exactly this | Avoid, so it never reads as a copy |
| ---- | ---- | ---- | ---- |
| 1 | **The reference series**, named in the concept's Inspiration and References (a feel reference for mechanics only, per the user's direction U1) | **How environmental VFX sell weapon mass**: dust and debris bursts sized to whatever caused them; muzzle blast that kicks up ground dust and briefly lights nearby surfaces; a building section coming down and its dust hanging in the air afterwards; distant gunfire and explosions that read at range. These feed Sections 2.6, 8.9 and Principle 3 | Its names, role and class names, mode names and map names; its HUD layout and its signature HUD shapes (spotting marker, class icons, objective markers, request menu); its UI colours, characters and branding; military-operator glamour; vehicle combat (vehicles are out of scope, U14) and large-scale battle framing; any entry's colour grade. Holdout's UI is cartographic, with its own arrangement and its own shapes (Sections 3.6, 7.2 and 7.9), and its world is ungraded (Section 4) |
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

**The user's own decisions (2026-11-19).** These were stated by the user directly. They are not facilitator answers,
and no later run of the skill may weaken or reverse them. U1–U10 are recorded in the concept's Assumptions and
Decisions Log and stand as written there.

| ID | The user's decision | Where this document applies it |
| ---- | ---- | ---- |
| U11 | **Controller-only.** A gamepad is the primary and only supported player input; keyboard and mouse is a developer fallback, never advertised or tuned. Confirmed twice; playtests use an Xbox Elite Series 2. Aim assist, stick deadzones, the response curve and sensitivity are core systems; every menu works with a gamepad alone; prompts use Xbox-layout labels. Closes concept Q22 | Sections 7.1, 7.2, 7.3, 7.6, 7.8, 7.9 and 8.1; 3.6 and 4.6 for size and contrast |
| U12 | **A solo developer with AI tools.** No funded team, no outsourcing budget, close to zero cash beyond free or low-cost marketplace assets, hours per week unknown. One map and one polished core loop first; features added only after it is fun | Sections 8.1, 8.11 and 8.12; 5.1, 5.4, 6.5 and 2.3; the owners in Appendix B |
| U13 | **The repository** stays public, its git history is left as it is, the first map's data files stay tracked, and pushing continues. Going forward, nothing new may single out a location | The privacy note at the top; Section 8.6; Appendix B; Appendix C.1, concern 11 |
| U14 | **Vehicles are out of scope** (offered to the user as an option and not selected). Closes concept Q11 | Sections 6.6, 8.5, 8.12 and 9.1 |
| U15 | **The first map's box and name are confirmed.** No further check of the map is needed, and none is described in any document | The privacy note at the top; Section 2.2 |

**Facilitator decisions.** Every question the skill would have put to the user, answered by the facilitator in a
non-interactive run. "Overrule" means the user can change it; the impact column names what would change.

| ID | Decision point | Options | Chosen | Why | Impact if overruled |
| ---- | ---- | ---- | ---- | ---- | ---- |
| AB-01 | Scope (Phase 1) | Full bible; sections 1–4; Section 8 only; resume | **Full bible (all 9)** | `workflow: full` requires all nine | None at this tier |
| AB-02 | References (Phase 1, free text) | The user's own titles | **No new titles this run**; the concept's Inspiration and References plus D7 were curated into Section 9 | The user could not be asked; the concept already lists references | Section 9 is revised around the user's titles |
| AB-03 | Section 1 starting point | Build from the anchor; revise it; start fresh | **Build directly from "Ground Truth"**; four principles consolidated into three to fit the skill's format, with nothing dropped (Section 1.4) | The anchor is the user's direction (U7) and was rated STRONG by AD-CONCEPT-VISUAL | Section 1 rewritten; later sections re-checked |
| AB-04 | Approval of each section | Lock in and write; revise; own direction | **[A] Lock in and write**, for each section in order, one at a time | Each section was checked against the concept, D1–D9 and the privacy rule before it was written | Any section can be reopened by a later `/art-bible` run |
| AB-05 | Season and setting | Late autumn (dry, leaf-off); early autumn colour; summer; winter with snow | **Late autumn, dry, leaf-off, before snow** | Ordinary and real; early, fast dusk; open long sightlines; lower foliage risk; no weather system | Sections 2, 4.2, 6 and 8.7 change |
| AB-06 | Night curve (concept Q19) | Keep A41; stretch further; a cycle with dawn | **Keep A41** (dusk at round 10, night around 15–20) | It is the concept's current text; Q19 is the user's | A dawn state is added to Section 2.2 |
| AB-07 | Horde readability aid | None; bounded rim light; always-on rim | **Bounded rim light** (horde only, off before round 10, close and street bands only, capped) | Readability wins in those bands, but realism governs | Remove it, and rely on motivated light alone (tests harder to pass) |
| AB-08 | How the silhouette tests are run | Unaided everywhere; through optics at range | **Close band unaided; street band unaided and with a 1–2× optic; long band through the MVP magnified optic** | On-screen sizes (Section 3.2) make unaided long-band tests impossible | The concept's shape-language test and MVP criterion adopted this wording in revision 2.4 (A59) |
| AB-09 | Real-world IP on characters and weapons | Real-looking branded gear; generic | **Generic**: no real insignia, trademarked camouflage, brands or real gun models | Legal safety and the concept's "no brands" rule | Licensing work and legal review |
| AB-10 | Spotted-zombie marker | Diamond; survey tick | **Survey tick** | Concept A45 and R12 | — |
| AB-11 | Flares and supply-drop marker | Red hand flares; amber ground flares; amber overhead flares | **Steady amber flares overhead; yellow smoke marks a supply drop** | Red collides with danger; ground flares flicker like fire; overhead and steady keeps the non-hue cue | Section 4.4 re-cut |
| AB-12 | Tactical map style | Light paper; dark chart | **Dark chart, with neutral grey land cover** | One meaning palette for HUD and map; suits night; no green to confuse with the horde | Section 4.6 palette re-cut |
| AB-13 | Kit storey height | OSM convention 3.2 m; US framing 2.75 m | **2.75 m** | Real suburban houses; the kit must look right | Houses read too tall. Adopted by the concept's system 6 in revision 2.4; the prototype pipeline still uses 3.2 m (Appendix B) |
| AB-14 | Sensitive-content curation | Render everything as real; curate | **Curate**: no playground equipment; places of worship sealed, not destructible, no iconography; no children's rooms, child-specific props or photographs of people; no civilian bodies; nameless, indestructible, decal-free headstones; no gore on sensitive sites | Concept R5 and A29; curation is set dressing, not moving footprints, so Pillar 2 allows it. The concept logs the indestructible sites as Pillar 1's accepted exception (A57) | Sections 6.6–6.7 relaxed; legal and PR review needed |
| AB-15 | HUD conflicts (Section 7.7) | Art position; UX position; hybrid | **The hybrids recorded in Section 7.7**; no minimap at MVP | Diegetic-leaning but fair for a finite-ammo, parry-based game | The HUD spec changes |
| AB-16 | Typeface | Overpass; IBM Plex; a commercial face | **Overpass and Overpass Mono**, Plex as the fallback | Highway-sign heritage ties the HUD to the street signs; open licence | Section 7.3 |
| AB-17 | Corpsman icon | A cross; a pulse trace; a stretcher | **Pulse trace** | Protected emblems must not be used | — |
| AB-18 | HLOD versus destruction | Leave it to chance; fix the rule | **Rule fixed here; method left to the destruction ADR** | A damaged building shown intact at range breaks Pillar 1 and the long band | The ADR must still choose a method |
| AB-19 | Horde count for budgets | `technical-preferences.md` (~100); concept (24, 48 target, far tier) | **Concept's numbers** | The concept is the newer, gate-reviewed source | Character budgets in 8.5 and 8.10 shrink |
| AB-20 | Art versus technical trade-offs (Section 8.13) | Ideal; constrained; both | **As recorded in 8.13** (mostly "both, tiered" or "constrained default with exceptions") | Keeps the ideal visible without making it the baseline | Section 8 budgets change |
| AB-21 | Exact meaning-colour values | The concept's descriptions at usual values; retuned values | **Retuned**: lighter, slightly pink danger red; darker amber | Simulation showed red and amber merging for deuteranopes | Section 4.3 and 4.7 |
| AB-22 | AD-ART-BIBLE gate | Agent-run; self-check | **Self-check** (Appendix C.2). *Superseded 2026-11-19:* the gate was run by the `art-director` agent (CONCERNS; Appendix C.1). *It is being re-run on the U11–U15 revision (Appendix C.3)* | No agent-spawning tool in the first run | — |
| AB-23 | Next step (Phase 6) | `/map-systems`; `/create-architecture`; stop | **`/map-systems` (recommended)**, run in parallel with the concept's feel prototype and netcode spike; GDDs of the systems those prototypes test stay provisional until a PROCEED verdict (concept Next Steps, A67) | No systems index exists yet; the engine is configured. The concept's path is prototype-first, but mapping the systems does not depend on the prototypes' verdicts | — |
| AB-24 | Spotted specials' marker colour (gate blocking item 1) | Danger red for every special; green-grey for every special; green-grey with danger red only for explosive or structure-threatening types | **Green-grey survey tick for every type, with an optional type glyph inside. Danger red only for the Detonator, and for the Breacher or Wrecker while attacking a panel** (stated once in 4.3; 7.2 points to it) | Red on every special diluted the top-priority channel and, with danger's pulse and stripe, filled late-round HUDs with pulsing red that competed with downed squadmates and breach warnings | 4.3 and 7.2 change; the 4.7 checks are unaffected |
| AB-25 | Role primitive sizes and gadget carry (gate blocking item 2) | Keep thin masts, handles and a shallow hump; set a minimum on-screen size and rebuild the primitives | **Minimum 2 px (17 cm) at 80 m, target 20 cm or more** (3.2). Corpsman pack widened sideways to about 72 cm. Sapper diagonal carried by a rigid scabbard at least 17 cm wide and the tool head. Spotter mast topped by a sensor head at least 20 cm across. **Deploying or drawing a gadget never removes the back primitive. Light gadgets are compact and hip-carried** (3.3, 3.5, 5.2) | At 12 px per metre at 80 m, a 3 cm part is about 0.4 px and vanishes under TSR, and a 7 cm hump is under 1 px from the front; the old primitives failed the bible's own size rule and the concept's MVP role test | Kit proportions in 3.3 and 5.2 change; the role test would need another distinguishing method |
| AB-26 | On-screen size table (gate concern) | Keep the first table; correct it to the exact projection | **Corrected**: 960 ÷ d px per metre; a 1.8 m figure is about 58 / 22 / 11.5 / 5.8 / 4.3 px at 30 / 80 / 150 / 300 / 400 m (230 / 86 / 46 / 23 / 17 through a 4× optic); the role-test figure is about 22 px | The first table was about 10% too large, and the section calls itself "measured, not guessed" | — |
| AB-27 | Re-sync with concept revision 2.4 (concept A52–A60, U11) | Leave the bible on revision 2.2; re-sync | **Re-sync** without changing the visual direction: real-name sector labels with generic labels only for sensitive sites and one creek-label exception (7.2, 7.8, plus a tactical-map text rule); gadget renames (3.5, 5.2); the light breach-charge form removed (5.2); movement keeps the role primitives (3.3, 5.3); fences inside vault and mantle heights (6.6, 8.6); Xbox-layout button glyphs and a controller-only platform row (7.2, 7.7, 8.1; the glyph rules are now in 7.9, AB-32) | The concept changed things this bible depends on, and it took up the bible's open items for the concept owner (AB-08, AB-13, AB-14) | The listed sections revert to their revision 2.2 wording |
| AB-28 | Re-sync with concept revision 2.5 (concept A61–A67) | Leave the bible on revision 2.4; re-sync | **Re-sync** without changing the visual direction: the recovery-ceiling notch and the "needs a heal" flag (7.2); the revive kit's heal (5.2); squad orders on the compass and sector board (7.2; now the bearing dial and the sector ladder, AB-31); the MVP's nine attachments as silhouettes (3.5); no UI text names an individual building (7.2); the minimap in the browser greybox logged as a prototype divergence (7.2); 167th Street's measured position (2.2); `/map-systems` in parallel with the prototypes (AB-23) | The concept added health, orders and attachments this bible draws, and the check found the 2.2 wording and AB-23 out of step with the concept | The listed sections revert |
| AB-29 | Quartermaster role icon (IP check) | Three cartridges; a crate; a frame pack | **A frame pack** (the role's block primitive) | Ammunition glyphs are a common class-icon motif for the reference series' support role, and the check could not verify the similarity online; the frame pack repeats Holdout's own primitive, and the plain crate is already the infrastructure glyph | 7.4 changes; the IP checklist (concept R12) re-checks it either way |
| AB-30 | Who the horde were | Residents of the suburb; anonymous adults from elsewhere | **Anonymous adults, never presented as the real town's residents**; no nightwear in the wardrobe | The map is a real, named town and the concept's rule is "never shown: anything about residents"; "it happened at night" with pyjamas also sat against 6.8's evacuation story | 5.4 changes |
| AB-31 | HUD arrangement. Section 9.1 says to avoid the reference series' HUD layout, yet 7.2 placed a compass strip at the top centre with sector chips under it, a squad list on the left edge and the round at the top right | Keep it; move single elements; a new arrangement built from the map identity | **The field and the margin** (7.2): a clear field, an empty sky band and four corner blocks. Sector ladder at the top left (north to south, full names, rings). Squad block at the top right (the player's own health in its first row; events as tags beside rows). Title block at the bottom left (a heading-up bearing dial, the street line, the round and phase). Kit block at the bottom right (ammo, gadget cross, salvage) | It is built from Holdout's own map language; real sector names need a line each; a heading-up dial suits a stick; none of the four placements in question survives; the information is the same as before | 7.2, 7.3, 7.7, 7.8 and `design/ux/hud.md` change. Any replacement still keeps the top centre empty and the sectors unlettered |
| AB-32 | How the UI meets controller-only play (U11 is the user's decision; these are the facilitator's choices inside it) | A desk-sized UI with a scale option; a UI designed for the couch from the start | **A 3 m design condition** (a 55-inch television): 26 px minimum text, 36 px for sentences, 3 px strokes, 40 px and 48 px glyphs, a 5% safe frame, 90% plates, the dark keyline on by default, a size check at first launch. **Prompt glyphs** drawn by Holdout as shapes and letters, with outline rules for triggers and sticks. **Focus navigation:** no cursor, no hover-only state, inversion plus corner ticks. **A ping wheel and a gadget cross.** Aim assist has no visual | The game is played from a couch with a gamepad; computed contrast on the old 60–75% plate fell to between 2:1 and 3:1 over a bright sky; a platform holder's glyph art is not Holdout's to use | The sizes are starting values to be measured (Appendix B). The rules themselves follow from U11 and stay |
| AB-33 | Marker shapes | Leave them spread over 3.6, 4.3, 7.2 and 7.4; one table | **One table, in 3.6:** chevron up (a squadmate), chevron down (a ping on a place), survey tick drawn apex up (the horde), upright square (infrastructure and items), **ring (an objective)**, double ring (the ordered objective), arc (a quantity), hazard stripe (danger), mast-and-cone (a held sector). No rotated square anywhere; sectors never lettered or numbered | The objective had no stated shape, "ring" named both the capture progress and the bleed-out timer, and the survey tick's orientation was unstated | 3.6 and the sections that point to it change |
| AB-34 | The production plan under U12 | Keep the outsourced plan; a plan for one person | **A plan for one person** (8.12): buy or download first, generate next, hand-make only what carries the identity; a strict first-milestone ceiling (one kit family in one wall type, three horde types, two guns, the glyph set); everything else deferred. **No permanent cut is made or proposed** | It is the user's decision and the user's re-cut. The list is a ceiling, written while the concept was being re-cut | 8.12's list is re-synced to the concept's milestone (Appendix B) |
| AB-35 | Repository and location items in this file | (Not a facilitator choice: the user's decisions U13 and U15, applied) | Every repository action item is removed from Appendix B and C.1 and replaced by U13, and 8.6 now says the first map's data files stay tracked. 2.2 states the map box as confirmed. 2.3 and 4.5 speak of the home sector. 6.7 sets render rules only and leaves the list of sectors to the concept's system 6.1. 6.6 states that enterable houses are chosen in the engine and named only generically | The user decided; and nothing in a public document may single out a location | — |
| AB-36 | Naming the reference series in this file | Name it in Section 9; point to the concept | **Not named here.** Section 9 calls it "the reference series" and points to the concept's Inspiration and References, which, with the concept's decision log, is the only place it is named | The project's IP rule limits the name to those two places | Section 9 names it again |

## Appendix B: Open items and hand-offs

Owners are the studio's agent roles. Under U12 the one person behind all of them is the developer, so an owner
names the agent the developer works the item with. No row has a calendar date: the hours available are unknown.

| Item | Owner | Needed before |
| ---- | ---- | ---- |
| ~~Controller input (concept Q22); vehicles (concept Q11); the repository question; the first map's box~~ **Closed by the user's decisions U11, U14, U13 and U15** (2026-11-19; listed at the top of Appendix A) | — | — |
| Q19 night curve; Q6 gore and rating; Q16 the School Grounds as a sector | User | The realism art pass (Q6 also sets the gore budget) |
| **Re-sync with the concept's U12 re-cut.** The first-milestone list in 8.12 is an art ceiling written while the concept was being re-cut. Match its milestone name and contents to the concept's, and re-check the tier names this bible still uses (MVP, Vertical Slice, First Map Complete, Alpha) | Art director, with the producer | The first asset on the first-milestone list |
| **Outside this file:** the concept still says "compass" and "sector board" (its Visual Identity Anchor and A63). Read them as the bearing dial and the sector ladder (AB-31) until the concept is re-synced | Concept owner | The concept's next revision |
| **Prove rule-cut damage states** on one module against the 30 m outline test (3.4, 8.12). Fallback: hand-model the three damage states for the plain wall and the window module only | Technical artist | Any second kit module is made |
| **Measure the couch-distance figures** (AB-32): the typeface's x-height against the 3 m scale (7.3); the worst-case contrast of plates and keylines on engine captures of a west-facing dusk sky and sunlit white siding (4.6); the 32 px marker minimum in play (7.9) | `/ux-design`, with the art director | MVP HUD block |
| Confirm or revise every budget in 8.5 and 8.10 in the rendering and netcode spike, including the Lumen/Nanite stress scene on the host | Technical director, technical artist | The end of the spike |
| Minimum GPU and the Low tier's caps (concept R10). The anchor assigns the minimum GPU to this bible before the realism pass (gate concern) | Technical director, with the art director | **Vertical Slice A at the latest** |
| **Gate concern:** state the internal resolution (TSR screen percentage) for the Medium tier in 8.10; 4.0 ms of software Lumen on an RTX 3060-class card is plausible only when TSR upscales from below 1080p. The 3.2 primitive minimum's 20 cm target assumes it | Technical director, technical artist | The end of the spike |
| **Gate concern:** CPU cost on the listen-server host is not budgeted in 8.10 (animation for 24–48 zombies, Niagara, decals). It is handed to the TD spike explicitly | Technical director (spike) | The end of the spike |
| **Gate concern, deferred with the weapons it covers (8.12):** first-person silhouette and form guidance for the weapons beyond the first milestone's. That means SMG, LMG and launcher classes (3.5 covers only pistol, shotgun, assault rifle and DMR), the magazine, grip and stock attachments, and the second gadgets (dressing pack, bandolier, survey glass; renamed in concept A58). The first milestone's two guns, three attachments and one melee weapon are covered by 3.5 | Art director (a later `/art-bible` revision) | Any weapon or gadget beyond the first milestone's list is made |
| **Gate concern, re-scoped by U12:** the first milestone's three types are named (Shambler, Runner, Breacher; 8.12). Still to name: which further types the whole first map ships with (3.3, 5.4 and 8.5 specify all 9). That decides which night and long-band silhouette tests must pass | Art director, with the horde GDD owner | Any type beyond the first three is made |
| **Gate concern:** texel density for surfaces players fight against. 512 px per metre is about half of native for a wall 1 m from the camera (about 960 px per metre at 1080p and 90°). Use 1,024 px per metre, or require detail normals and detail tiling, on interior partitions, the shared wall-internals kit, breach edges, garage interiors, and boards and bracing (8.4) | Technical artist | The first milestone's kit modules are textured |
| ~~**Gate concern:** world-space marker contrast~~ **Applied in the U11–U15 revision** (4.6, 7.9; AB-32): the dark keyline is now the default for every mark in a meaning colour drawn over the world, and "thicken outlines" stays the option. Measuring it on captures is the row above | `/ux-design` (HUD specification), with the art director | — |
| **Gate concern:** kit-family tie-break in 6.2. Raised ranch and two-storey both match a near-square footprint of about 120 m². Specify the tie-break, for example a choice weighted by target mix ratios and seeded by the OSM way ID, so the regional mix is controlled and deterministic. The first milestone has one kit family (8.12), so nothing ties yet | Technical artist, with tools | The second kit family is added |
| **Gate concern:** naming rules still missing (8.3): how source and DCC files are named before import, and whether size tiers appear in names or only in texture groups. With one developer the reason changes but the need stays: sourced, generated and hand-made files must trace back to the licence ledger | Technical artist | The first sourced asset is imported |
| ~~**Gate privacy note (outside this file):** the tracked first-map data and the repository's history~~ **Closed by the user's decision U13 (2026-11-19):** the repository stays public, its git history is left as it is, the first map's data files stay tracked, and pushing continues. No other repository action remains anywhere in this document. Going forward, nothing new may single out a location (the privacy note at the top). The first map's box and name are confirmed (U15) | — | — |
| **Prototype art and UI rules (outside this file; concept A65):** the browser greybox draws a marker as a rotated square (a diamond, which AB-10 and 3.6 rule out); a spotted zombie must use the survey tick in horde green-grey (4.3) and an objective the ring (3.6). Its README pairs the reference series' class name with a gadget and must say "Sapper reinforce tool". It names buildings by street in prompts and pings (7.2 rules that out), and it labels two parks after nearby streets instead of their OSM names (7.2, 7.8). Its HUD layout is its own and is not a precedent for 7.2. The prototype is being revised in parallel, so check each point against its current state | Prototype owner, with the art director | The prototype's next revision (pushing is not held, U13) |
| Nanite foliage with wind on 5.8; runtime virtual texturing on 5.8; Lumen Lite status | Technical artist, `unreal-specialist` | Creek Woods' art pass |
| HLOD versus destruction method (AB-18) | Technical director (destruction ADR) | The first full-map bake |
| Reconcile the horde count in `technical-preferences.md` with the concept (AB-19) | Technical director (`/settings`) | Any budget review |
| Typeface licences and glyph coverage (AB-16) | Producer | Any public build |
| Style research brief on the region's house typology, from generic public sources only (6.1). **Gate concern:** it does not exist yet, and the house kit, the largest hand-made item in the plan (8.12), cannot be built to the regional style without it | Art director, with the technical artist | The first milestone's kit modules are modelled |
| ~~Silhouette test wording in the concept's MVP criteria (AB-08)~~ Done in concept revision 2.4 (A59) | Concept owner | — |
| The prototype pipeline (`prototypes/real-street-holdout-concept/pipeline/osm_to_level.py`) still infers 3.2 m per level; switch it to the kit's 2.75 m storey plus foundation reveal (AB-13, concept system 6) | Tools/tech engineer | Before pipeline output feeds kit fitting (the MVP engine bake) |
| Fence and hedge heights in the yard generator inside the vault and mantle classes, with a traversal link on each (6.6, 8.6; concept system 11) | Technical artist, with tools | The MVP engine bake |
| HUD specification (`design/ux/hud.md`) and accessibility requirements, built on the arrangement in 7.2 and the controller rules in 7.9 | `/ux-design` | MVP HUD block |
| Per-asset specifications, with sourcing notes and generation prompts (8.11, 8.12) | `/asset-spec` | The first asset on the first-milestone list |
| Licence ledger for sourced and generated assets (8.11) | Producer | The first sourced asset |
| ~~Re-run AD-ART-BIBLE with the `art-director` agent~~ Done 2026-11-19 (CONCERNS; Appendix C.1). **The gate is being re-run on the U11–U15 revision** (Appendix C.3). It confirms the two blocking fixes (AB-24, AB-25), which are unchanged, and reviews the HUD arrangement, the controller rules and the plan for one developer | Art director | Asset production |

## Appendix C: AD-ART-BIBLE sign-off

### C.1 Agent verdict (2026-11-19, on the previous revision)

*This verdict predates the U11–U15 revision. The gate is being re-run on that revision (C.3); until it returns, this
is the last recorded verdict.*

**Verdict: CONCERNS (agent-run, `art-director`, 2026-11-19).** The gate found the bible complete and faithful to the
"Ground Truth" anchor in `design/gdd/game-concept.md`, and consistent with D1–D9. That covers grounded realism with no
stylised grade, the measured meaning palette (its L* and contrast values were checked), Holdout's own role names and
cartographic UI, sensitive-site curation, the "Tinley Park, IL (60477)" naming and the privacy rule. It also absorbs
every AD-CONCEPT-VISUAL round-2 note. Nothing rose to REJECT. Two items blocked APPROVE. Both were applied in the
revision that answered the gate, and both are left in place, unchanged, in the U11–U15 revision. They wait for the
re-run to confirm them.

| # | Blocking item (gate) | Resolution (applied in the answering revision; unchanged since) |
| ---- | ---- | ---- |
| B1 | 7.2's "danger red for specials" contradicted danger's definition in 4.3. Red on every special diluted the top-priority channel, and with danger's pulse and stripe it filled late-round HUDs with pulsing red ticks | **Applied (AB-24).** 4.3 now holds the single rule: green-grey survey tick for every type, optional type glyph; danger red only for the Detonator, and for the Breacher or Wrecker while attacking a panel. 7.2 points to it; the 4.3 Meaning column notes it |
| B2 | Three role primitives in 3.3 and 5.2 failed 3.2's own size rule at the 80 m role test. The Spotter's mast and the Sapper's handle were about 0.4 px; the Corpsman's hump was under 1 px and invisible from the front. There was no rule for deployed gadgets or light gadgets | **Applied (AB-25).** 3.2 adds the minimum (2 px, 17 cm; target 20 cm or more). 3.3 rebuilds the three primitives: the Corpsman pack about 72 cm across, the Sapper's rigid scabbard and tool head, and the Spotter's sensor head. It adds the rules "deploying or drawing a gadget never removes the back primitive" and "light gadgets are compact and hip-carried". 3.5, 5.2 (with a table of light-gadget forms, the solo kit's light reinforce tool included), 5.3 and 5.6 follow |

| # | Concern (gate) | Status |
| ---- | ---- | ---- |
| 1 | 3.2's size table was about 10% too large | **Fixed** (AB-26); the role-test figure is now about 22 px |
| 2 | No form guidance for the rest of the shippable tier: SMG, LMG, launchers, the magazine, grip and stock attachments, and the second gadgets | Open, and deferred with those weapons under U12 (Appendix B) |
| 3 | The 5 zombie types that ship at First Map Complete are not named | Open, re-scoped by U12: the first milestone's three types are named in 8.12; the full first map's set is not (Appendix B) |
| 4 | Texel density is low for fought-against surfaces (8.4) | Open (Appendix B) |
| 5 | World-space markers lack a default keyline (4.6) | **Applied in the U11–U15 revision** (4.6, 7.9; AB-32): the dark keyline is the default. Measuring it on captures stays open (Appendix B) |
| 6 | 8.10 states no internal resolution; host CPU is unbudgeted; the minimum GPU is unset | Open (Appendix B; the minimum GPU is due by Vertical Slice A at the latest) |
| 7 | The kit-family rules in 6.2 overlap and have no tie-break | Open; not needed until a second kit family is added (Appendix B) |
| 8 | The regional style research brief does not exist yet | Open (Appendix B) |
| 9 | Wording slips: the Plated "drags" its slab (5.4); the evac is "ringed by flares" (2.3); the "no contradictions" claim | **Fixed**: 5.4 and 2.3 are corrected; the C.2 row below is annotated; the header now carries the agent verdict |
| 10 | Naming rules for source and DCC files and for size tiers (8.3) | Open (Appendix B) |
| 11 | Privacy: this bible is clean (no address, house number, coordinates or subdivision name; the map is named only "Tinley Park, IL (60477)"). The gate also noted two things outside this file: wording in the concept, and the first map's tracked data | **Closed.** The concept's wording was fixed (concept A50). The tracked data is settled by the user's decision U13: the repository stays public, with its history and the first map's data files as they are. The first map's box and name are confirmed (U15) |

**Next:** the gate is being re-run on the U11–U15 revision (C.3). The open concerns have owners in Appendix B; the
gate classed them as clarification work, not blockers to APPROVE.

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
| Could an outsourcing team produce assets from this document alone? | For kit, props, characters and VFX, mostly yes, with `/asset-spec` briefs. The regional style research brief (6.1) is still to be written, and Q6 limits the gore brief. *This is the gate's standard question. There is no outsourcing under U12; read it as whether one developer with AI tools could produce assets from this document alone (8.12)* |

**Self-check verdict (superseded by C.1): CONCERNS.** Sections needing clarification: **8** (budgets unconfirmed until
the spike; minimum GPU; foliage and virtual-texturing verification; HLOD versus destruction; horde-count mismatch),
**6** (the style research brief), **2** (Q19), **5** (Q6), **7** (typeface licences; the HUD specification belongs to
`/ux-design`). No fundamental inconsistency was found, so nothing here would be a REJECT. The gate was re-run with the
`art-director` agent on 2026-11-19 (C.1).

### C.3 Re-run on the U11–U15 revision (2026-11-19): in progress

**Status: AD-ART-BIBLE is being re-run on this revision. Verdict: pending.** This section is filled in when the gate
returns. Until then the last recorded verdict is C.1's CONCERNS, and nothing in this document claims APPROVE.

**What the re-run confirms (unchanged since C.1).**

| # | Blocking fix | Where it stands |
| ---- | ---- | ---- |
| B1 | Danger red only for the Detonator, and for the Breacher or Wrecker while attacking a panel; every other spotted zombie keeps the green-grey survey tick (AB-24) | In place and unchanged: 4.3 holds the single rule and 7.2 points to it. The new marker shape table (3.6) repeats nothing of it; it points to 4.3 |
| B2 | Role primitives sized to the 80 m role test; deploying or drawing a gadget never removes the back primitive; light gadgets are compact and hip-carried (AB-25) | In place and unchanged: 3.2, 3.3, 3.5, 5.2, 5.3 and 5.6 were not edited in this revision |

**What is new for the gate to review.**

| # | Change | Sections | Log |
| ---- | ---- | ---- | ---- |
| N1 | The HUD's own arrangement: the field and the margin, with four corner blocks, replacing an arrangement that sat too close to the layout 9.1 says to avoid | 7.2, 7.7, 7.8 | AB-31 |
| N2 | Controller-only rules: the 3 m design condition, type and line sizes, plates and keylines, prompt glyph art, focus navigation, the ping wheel and the gadget cross | 3.6, 4.6, 7.3, 7.4, 7.6, 7.9, 8.1, 8.4 | AB-32 |
| N3 | One marker shape table; the objective marker is a ring; no rotated square anywhere | 3.6, 4.3, 7.2, 7.4 | AB-33 |
| N4 | The production plan for one developer, with a strict first-milestone ceiling and no permanent cut | 8.11, 8.12, 5.1, 5.4 | AB-34 |
| N5 | The privacy and IP pass: U13 and U15 recorded; the reference series no longer named in this file | The header, 2.2, 6.6, 6.7, 8.6, 9, Appendix B | AB-35, AB-36 |

**Known limits of this revision, for the gate.** The couch-distance sizes and contrast figures are computed, not yet
measured in the engine (Appendix B). The first-milestone list was written while the concept was being re-cut and
needs a re-sync with it (Appendix B). Rule-cut damage states are unproven (8.12).
