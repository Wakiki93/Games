# Game Concept: Holdout

*Created: 2026-11-19*
*Revised: 2026-11-19 (revision 3.0: re-cut for a solo developer, U12; U11–U15 recorded; Q2, Q11, Q18 and Q22 closed; the contradictions found by the last check fixed)*
*Status: Draft (Under Review). **No director gate and no review has run on revision 3.0.** The four gate verdicts on file were given on earlier revisions (2, 2.1 and 2.2), which planned for a team of five; the gates are being re-run on this revision. No creative-director concept approval exists yet. Waiting on the user: the proposed cuts P1–P4 (MVP Definition, "Solo plan at a glance") and Q6, Q9, Q16, Q17, Q19, Q21 and Q23*

> **Creative Director Review (CD-PILLARS)**: CONCERNS, no blocking items (round 1, on revision 2; its only run). A review of an earlier revision; re-run pending on 3.0
> **Art Director Review (AD-CONCEPT-VISUAL)**: STRONG, no blocking items (round 2, on revision 2.1). A review of an earlier revision; re-run pending on 3.0
> **Technical Director Review (TD-FEASIBILITY)**: CONCERNS, no blocking items (round 1, on revision 2; its only run). Given for a team of five, and HIGH RISK for one or two people; re-run pending on 3.0's solo plan
> **Producer Review (PR-SCOPE)**: OPTIMISTIC, 3 blocking items (round 3, on revision 2.2). All three concern the team-of-five plan that revision 3.0 removes; re-run pending on 3.0's solo plan
>
> **How this document was made.** Revision 1 came from `/brainstorm` run non-interactively; the user supplied the
> concept. Revisions 2 to 2.5 (all 2026-11-19) carried in the user's directions U1–U10, four agent-run director gates,
> a first `/design-review` and two adversarial checks. User decisions are authoritative. Every call the facilitator
> made in the user's place is an A-row in the Assumptions and Decisions Log and can be overruled.
>
> **Revision 3.0** re-cuts the plan for one person working with AI tools (U12). Outcome milestones replace the staffed
> calendar, and the first milestone is the smallest build that can show the core loop is fun in Unreal Engine 5.8 on a
> controller (MVP Definition, "Solo plan at a glance"). The design of each system is unchanged unless a line says
> otherwise; what changes is when each part is built. The revision also records U11–U15, removes the team,
> outsourcing and funding assumptions, moves the fallbacks that would weaken a user direction into a list of proposed
> cuts for the user to approve, and fixes the contradictions the last check found: the light revive kit's heal, the
> ping and order inputs, self-revive, session length, the first Push, the slice bounds, spawn shares, bullet
> velocities, enterable houses and the gate status.

---

## Elevator Pitch

**10-second version (leads):** *"Round-based co-op zombie survival for a four-role squad, holding the real streets of
a real town, where you choose which walls come down."*

> **Holdout is a first-person, four-player co-op zombie shooter set in real neighborhoods built from map data. Your
> squad of four roles, each carrying what the others need, holds and takes real streets, parks and blocks against
> escalating rounds, with grounded ballistics, melee you master, and walls you choose to reinforce or blow open,
> because every hole you make is also a way in.**

---

## Core Identity

| Aspect | Detail |
| ---- | ---- |
| **Genre** | First-person squad shooter / co-op horde survival: round-based waves plus capture-and-hold sectors. Sub-genres: role-based squad play, first-person melee action, tactical destruction |
| **Platform** | PC (Windows) on Steam. **Controller-only for players** (U11): an Xbox-layout gamepad, playtested on an Xbox Elite Series 2; keyboard and mouse is a developer fallback, never tuned, advertised or tested as a way to play. Aim assist, stick deadzones, a response curve and stick-tuned recoil, ballistics and parry windows are core systems from M1 (system 11), and every menu works with a gamepad alone |
| **Target Audience** | Mid-core to hardcore co-op FPS players aged 18–35 who play with a regular group of 2–4 friends and like grounded, team-dependent gunplay (see Target Player Profile) |
| **Player Count** | 1–4 online co-op (U5). Designed for 4; 2–3 players are supported by the squad-gap kit, which works with duplicate roles (A24, A53). Staged by the solo plan (U12): M1 is a single-player test build, online co-op arrives at M2 (two players, then four), and solo becomes a supported mode at M5. No PvP. Deliberately **not** a large-headcount game |
| **Session Length** | A match runs 30–90 min. The first evac window is at round 10 (about 25–35 min: the Core Loop round table's ~25 min of waves plus round 0, intermissions and Push captures; A51). Typical match: 45–75 min |
| **Monetization** | Premium (assumed USD 19.99–24.99). Possible cosmetic-only DLC after launch; never paid power (A10) |
| **Estimated Scope** | One developer with AI tools, close to zero cash, hours per week unknown (U12). Planned by outcome milestones, not a calendar: roughly 66–116 full-time-equivalent weeks to an Early Access candidate on one slice of the first map (M1–M5), re-estimated after M1. The full map and everything beyond the candidate come later, one addition at a time (MVP Definition, "Solo plan at a glance") |
| **Comparable Titles** | The large-scale squad shooter series named first in Inspiration and References (roles, gadgets, squad play, ballistics and sector feel); *Call of Duty* Zombies mode (round structure); *Killing Floor 2* (wave co-op with spending between waves); *Warhammer: Vermintide 2* (first-person melee and guns against hordes). Destruction references: *Rainbow Six Siege*, *The Finals* |

---

## Core Fantasy

**You and three friends are a four-soldier squad holding a frontline through a real town** (its real streets, its
real parks, the creek where the creek actually runs) against a horde that grows every round. One of you keeps
everyone standing, one keeps the guns fed, one decides which walls stand and which come down, and one sees the horde
coming before it arrives. You hold the line with a rifle you built up attachment by attachment, whose bullets drop
and take time to land, and with a blade you have learned to parry with. You take the next park, the next
intersection, the next block, and you reshape the suburb wall by wall to survive one more round, until the streets
on the map are a ruin of your own making.

Why choose this over other horde shooters? Four things:

1. **Recognition.** The map is real and the streets carry their real names. For some players it will be a place they
   know; for everyone it is unmistakably a real place, not a designed one.
2. **Authorship of the arena.** By round 15 the map is the squad's own creation: every breach, barricade, collapse
   and captured sector is a decision they made, and they live with it.
3. **Weight in both hands.** Gunplay is grounded (projectile bullets, heavy recoil, attachments with real
   trade-offs) and melee is deep. A perfect parry is as satisfying as a 300 m hit with the right hold-over.
4. **A squad that needs each other.** Revives and heals, ammo, repairs and early warning live in different players'
   kits. The squad survives by handing things to each other.

---

## Unique Hook

> **"Like round-based zombie survival, AND ALSO you hold the real streets of a real town, where every wall can come
> down, for you or for them."**

- **Explainable in one sentence:** yes, see above. The four roles are deliberately left out of the hook: they are a
  quality bar (Pillar 4), not a differentiator, so the hook carries only the two things that are new.
- **Novel:** we know of no shipped round-based horde game that combines real-world map data, capture-and-hold sectors
  of that real place, and destruction that persists for the whole match and that both the players and the horde use.
  *This is unverified. Confirm it with competitive research before any marketing claim (Open Question Q7).*
- **Connected to the core fantasy:** real places give recognition; sectors at real landmarks give the squad a
  frontline to hold; two-edged destruction gives authorship.
- **Affects gameplay, not just looks:** destruction changes routes, chokepoints, sightlines and cover. Real geography
  sets where the sectors are, which sightlines are long enough for ballistics to matter, and how the horde arrives.

Two things are **not** the hook, because other games already do them well: skilled melee, and squad-shooter feel
(roles, gadgets, ballistics). Both are quality bars (Pillars 3 and 4), not differentiators.

---

## Player Experience Analysis (MDA Framework)

### Target Aesthetics (What the player FEELS)

| Aesthetic | Priority | How We Deliver It |
| ---- | ---- | ---- |
| **Challenge** (obstacle course, mastery) | 1 | Escalating rounds with no ceiling; a frontline that can be pushed back; parry timing; leading and holding over at range; recoil control; a salvage economy where every purchase has an opportunity cost; high-round records |
| **Fellowship** (social connection) | 2 | Four roles that depend on each other: revives, resupply, repairs, spotting, squad spawns, shared salvage, callouts. One player cannot hold every door or carry every kit |
| **Sensation** (sensory pleasure) | 3 | Heavy weapon audio (report, crack, tail off house fronts); weighty recoil; dust, smoke and debris; walls splintering and collapsing; realistic light failing as the rounds climb; melee hit-stop |
| **Fantasy** (make-believe, role-playing) | 4 | A squad holding a frontline through a real town: real street names, real parks, the last-stand siege fantasy, a role identity per player |
| **Discovery** (exploration, secrets) | 5 | Learning a real neighborhood's geometry and sightlines; finding caches in garages and sector armories; finding out what destruction and gadgets can do together |
| **Expression** (self-expression, creativity) | 6 | Role choice; weapon and attachment builds along handling / stability / velocity trade-offs; the squad's fortify, breach and push "plan" for each map; cosmetics |
| **Narrative** (drama, story arc) | 7 | Emergent stories only ("we lost the fields, retook them at round 12 and called evac with one revive left"). No authored campaign |
| **Submission** (relaxation, comfort zone) | N/A | Not a goal. Rounds 1–3 give a gentle warm-up, but the game is about rising pressure |

### Key Dynamics (Emergent player behaviors)

- **Squads form a "frontline plan" for each map:** which sector to push next, where the Sapper reinforces, where the
  Spotter's sensor covers the approach, where the Quartermaster drops the crate, and when to dig in instead.
- **Hand-offs become rhythm.** "Crate's down at the garage." "Reviving, cover me." "Detonator, 200 m, on 167th."
  Roles call for each other without being told to.
- **Spawning in is a call.** Dead players choose whom to redeploy on. A squadmate holding a doorway is a way back
  into the fight (the spawn lands close behind them and carries its own risk), so nobody has to stay out of the fight
  to be a spawn point (A39). The M2 co-op playtest watches for squads parking an "anchor" anyway.
- **Salvage arguments become strategy.** "Reinforce the back door or buy the rifle?" and "Push the fields or dig in?"
  are team conversations every intermission.
- **Deliberate demolition with consequences.** The Sapper blows a garage wall for a shortcut to the creek, and five
  rounds later the squad regrets the new horde route.
- **Range decides the tool.** Rifles and hold-over on the long axes (167th Street, the fields); melee at the doorway,
  in the hallway and in the woods to save ammo and earn more salvage; melee again when a Grabber pins a teammate.
- **The frontline breathes.** Sectors are taken, lost and retaken, and on counter-push rounds the horde picks a held
  sector and comes for it, so the shape of the map the squad holds changes across a match.
- **Yards are routes.** Squads learn which fences they can vault and which they must mantle, slide into cover behind
  a wreck, and drop prone on the fields for a long shot; a Runner vaulting the same fence is the reason to watch it.
- **Players go looking for "their" kind of place.** They share screenshots of a real town they recognise, which
  doubles as a marketing loop.
- **The arena degrades.** Late rounds are fought in a ruin the squad made, so no two matches end on the same map.

### Core Mechanics (Systems we build)

1. **Rounds plus sectors:** a round-based escalating horde (active cap plus spawn queue, spawning from map edges and
   horde-held sectors) pushing against a frontline of capture-and-hold sectors at real landmarks.
2. **Roles, gadgets and squad play:** four roles with signature gadgets; revive and heal, squad spawn, ping and spot,
   squad orders, and resupply, on a health model that recovers only partly without a hand-off.
3. **Grounded first-person combat:** projectile ballistics with drop and travel time, weighty recoil and attachment
   trade-offs, plus directional melee with block, parry, shove and stamina, and committed movement through a suburb
   of fences, hedges, windows and rubble (sprint, crouch, prone, vault, mantle, slide; system 11), all on a gamepad.
4. **The salvage economy:** earned by fighting, squad actions and holding sectors; spent on firepower, fortification,
   demolition and gear.
5. **Panelized, server-authoritative destruction and fortification:** synced to every client and usable by players
   and horde alike.
6. **A pipeline from OpenStreetMap to a playable level:** real footprints and streets, inferred heights, rule-based
   cover, and an automatically proposed gameplay layer (sectors, ingress, caches, landing zones) that a designer
   polishes.

---

## Player Motivation Profile

### Primary Psychological Needs Served

| Need | How This Game Satisfies It | Strength |
| ---- | ---- | ---- |
| **Autonomy** (freedom, meaningful choice) | Role choice; push or dig in; where to hold; what to buy; which walls to reinforce or destroy; how to build a weapon along its trade-offs. The map itself responds to the squad's choices | Core |
| **Competence** (mastery, skill growth) | Leading moving targets and holding over for drop; recoil control; parry windows; stamina; using a role's gadgets at the right moment; reading horde routes; beating your best round on a map | Core |
| **Relatedness** (connection, belonging) | Strong interdependence between roles: each role makes revives, ammo, repairs or spotting fast, cheap or remote for the others, and every fallback is meaningfully worse (no role is strictly required; Pillar 4). Plus squad spawns, shared salvage, and attachment to a real place | Core |

### Player Type Appeal (Bartle Taxonomy)

- [x] **Socializers** (primary). How: four roles built around hand-offs, pinging, squad spawning, sharing salvage, and friends recognising real places.
- [x] **Achievers** (primary). How: high-round records per map and party size, role and weapon mastery challenges, horizontal unlocks, evac victories.
- [x] **Explorers** (secondary). How: learning how destruction and gadgets interact, learning real neighborhoods and their sightlines, discovering new cities.
- [x] **Killers/Competitors** (tertiary). How: leaderboards only. There is no PvP (anti-pillar).

**Quantic Foundry fit.** Primary: **Action** (Destruction, Excitement) and **Social** (Community). Secondary:
**Mastery** (Challenge, Strategy) and **Achievement** (Completion). Tertiary: **Creativity** (Design: fortification
layouts, frontline plans). Low: **Immersion** (Story, Fantasy role-play), although role identity lifts it a little.

**Who it is not for:** PvP-first players; players who want large player counts and vehicle combat; strict mil-sim
players (Holdout is grounded, not a simulator); solo story seekers; freeform base-builders; cozy/relaxation players;
players who want a persistent open-world survival sim.

### Flow State Design

- **Onboarding curve:**
  - Round 0 (the onboarding, built at M5) happens in the home sector. Its supply point teaches resupply, a damaged
    window teaches fortifying (the Sapper does it faster), a scripted telegraphed lunge teaches parry, a downed
    training dummy teaches revive, a yard fence teaches vault and mantle, and a prompt teaches the ping.
  - Rounds 1–3 use only Shamblers.
  - The first 10 minutes introduce, in order: shoot and melee → parry → resupply → fortify → revive → ping → buy a
    gun. The first **Push** (capture an adjacent sector) opens at round 3; rounds 1 and 2 have no vote (system 1).
    The Sapper's breach charge comes into play around round 5.
  - An optional firing range doubles as the lobby, with targets at 25, 100, 200 and 300 m so players see bullet drop
    and travel time, and can test parry timing and gadgets while waiting.
- **Difficulty scaling:**
  - Zombie count and health rise each round.
  - New zombie types arrive at fixed rounds (see The Horde).
  - Every sector the squad takes lengthens the frontline it has to hold.
  - Escalation is also environmental: damage accumulates and the light fails.
  - Waves scale with party size; the squad-gap kit keeps 2–3 player squads whole.
  - There is a lobby difficulty choice (three levels). There is no hidden rubber-banding.
- **Feedback clarity:**
  - Hit markers that arrive when the bullet does (travel time is visible), melee hit-stop, and a distinct flash and
    sound on parry.
  - Sector status and capture progress on the HUD and the tactical map.
  - Squad markers, pings and spotted-zombie markers.
  - Salvage pop-ups for kills and for squad actions (revive, resupply, repair, spot assist).
  - Wall panels show readable damage stages (cracks → hole → gone).
  - A round counter and a count of zombies remaining.
  - The post-match summary shows the round reached against your best, the frontline over time, and how salvage split
    between firepower, fortification and demolition.
- **Recovery from failure:**
  - A wounded player recovers to half health on their own after a few seconds out of damage; the Corpsman, the light
    revive kit or a held sector's supply point restores the rest (system 3).
  - A downed player can be revived by anyone (slowly) or by the Corpsman (fast).
  - A dead player redeploys on a squadmate or a held sector after a short timer.
  - A full wipe returns the squad to the lobby in under 30 seconds with a one-click restart on the same map.
  - Failure teaches: a post-match "breach map" shows where the horde got in and which sector fell first.

---

## Core Loop

**Phase 3 calls (logged as A1, extended by U1 and U4):**
- *Primary feel of the core action:* **desperate, skilful and grounded.** Heavy, readable, punishing when you are
  sloppy; guns and bodies have weight.
- *Most important design variable:* **world reactivity.** How much the arena changes because of the players and the
  horde, now including which sectors each side holds.

### Moment-to-Moment (30 seconds)

Aim, lead and fire, holding over for drop on the long axes and fighting the recoil; or swing, parry and shove at the
doorway. Reload and switch between gun and melee. Throw down a resupply crate, revive or patch up a teammate,
reinforce a cracking wall, ping a Runner. Vault the fence, slide behind the wreck, shift between cover and the door
you hold. The loop is satisfying on its own for four reasons:

- **Weighty feedback:** recoil with mass, crack-and-thump audio, a hit marker that lands when the bullet does,
  hit-stop, dismemberment, a parry stagger.
- **Two scarce resources pulling against each other:** ammo and stamina. Melee costs stamina but saves ammo and pays
  more salvage; ammo comes from the Quartermaster's crate or a held sector's supply point (both with limited stock),
  never from dead zombies. Health is the third: it recovers on its own only to half, so the rest comes from the
  Corpsman or a supply point (system 3).
- **Hand-offs:** at any moment someone needs something another role carries.
- **The world reacts:** the wall you defend visibly breaks down, which keeps urgency up without a timer.

### Short-Term (5–15 minutes)

A **round** (1–6 minutes, longer in later rounds) followed by an **intermission** (20 s base; a ready-up vote skips
it; 45 s before evac rounds). In each intermission the squad:

1. spends salvage on firepower, fortification, demolition or gear;
2. resupplies and repositions;
3. chooses the round's **objective**, from the intermission before round 3 (rounds 1 and 2 hold the home sector with
   no vote): **Push** (attack an adjacent sector; the wave arrives while the squad captures it) or **Dig In** (hold
   the current line for a longer intermission and a bigger no-loss bonus). Before a counter-push round only Dig In is
   offered (system 1).

The "one more round" pull comes from:
- the round counter;
- the next zombie type arriving;
- the next sector, and the evac window at round 10 (which needs a held landing-zone sector);
- the plan that is almost complete ("one more reinforced wall and the fields hold").

| Round | Approx. length | Notes |
| ---- | ---- | ---- |
| 1 | ~1 min | Shamblers only; home sector; tutorial pacing |
| 3 | ~2 min | The first round the squad can Push into an adjacent sector (the vote opens in the intermission before it) |
| 10 | ~3–4 min | Runners and Breachers in the mix; first evac window (needs a held landing-zone sector) |
| 20 | ~5–6 min | Full roster and a boss; much of the suburb is damaged; the frontline has moved several times |

*These are starting targets. The round-system GDD owns the formulas.*

### Session-Level (30–90 minutes)

A match is 10–30+ rounds on one real neighborhood. The squad starts holding one **home sector** and fights outward
through sectors at real landmarks, losing and retaking ground as the horde pushes. **Evac windows** at rounds 10, 20
and 30 give natural stopping points: the squad can vote to call evac, defend a landing zone in a held open-space
sector (a park or the school fields) for about 2 minutes, and extract for a victory and a meta-reward bonus. Or it can
keep going for a higher record. A match ends at evac success, a full wipe, or the loss of the last held sector,
followed by a summary and unlocks.

Reasons to come back:
- beat the squad's record;
- try a different frontline plan or a different role;
- play another city;
- use what was just unlocked.

### Long-Term Progression

Within a match, progression is the core of the game: salvage, weapons, attachments, upgrade tiers, gear, how much
of the map the squad holds, and what it has fortified or destroyed. All of it resets every match.

Between matches, the meta layer is **light and horizontal** (A9):
- account XP unlocks more weapons, attachments and melee weapons into the match pools;
- role mastery challenges unlock **gadget variants** that are sidegrades, never upgrades (for example, a sensor
  with a wider radius and a shorter life);
- a choice of starting sidearm;
- cosmetics;
- weapon mastery challenges;
- leaderboards for each map and party size;
- a growing collection of real neighborhoods from different cities.

Nothing in the meta layer adds permanent power: round 1 never gets easier. The meta layer is Later work (after the
Early Access candidate), and so is **"Your Street"**, a possible player-facing map generator for any location (A6, Q8).

### Retention Hooks

- **Curiosity:** the next sector, the next zombie type, the boss at round 20, the next city, and later "Your Street".
- **Investment:** unlocks that widen your options, role and weapon mastery cosmetics, records for each map.
- **Social:** a regular friend group that has settled into its roles; "you have to see what we did to 167th Street";
  shared screenshots of real places.
- **Mastery:** ballistics and recoil control, parry timing, role play, plans for each map, high-round leaderboards for
  each party size.

---

## Signature Systems (concept level)

These are concept-level decisions. Each system gets its own GDD through `/map-systems` and `/design-system`. Numbers
here are **starting tuning values** that the GDDs own and will change. **When each part is built** is set by the solo
plan (MVP Definition): a tag such as M1 or M4 names the milestone a part first appears in, and **Later** means after
the Early Access candidate (M5), added one at a time and only once the loop is fun.

### 1. Round anatomy, sectors and fail state

| Phase | What happens |
| ---- | ---- |
| **Intermission** | 20 s base (45 s before evac rounds; +15 s on Dig In). Players spend salvage, fortify or breach, resupply and reposition, and vote Push or Dig In. The vote opens in the intermission before round 3: rounds 1 and 2 hold the home sector with no vote and no Dig In bonus. A ready-up vote skips the intermission |
| **Wave** | The round's total zombie count grows with the round number and party size. The **active cap** is 24 through M5 (48 is a Later target, with a cheap **far-zombie tier** for long-range targets; system 9). The rest wait in a spawn queue. Zombies enter from the map edges and from horde-held sectors next to the frontline, at real ingress points (street ends, yards, the creek, the trail, building openings, breaches) and at **spawn closets** placed per sector (map edges, breached sealed-house pockets, woods, creek banks). A spawn is never **within a player's line of sight inside 80 m** (starting value; magnified optics and the Spotter's sensor do not extend it). **Spawn shares (A62).** On every round that is not a counter-push round the director picks a **pressure sector**: the weakest-defended held frontline sector (fewest squad members within 30 m of its capture zone, then fewest reinforced or boarded panels facing it; never the home sector while another sector is held). At least a third of the round's spawns come through ingress next to it. It is not announced; pings and the Spotter's sensor reveal it. On a Push round a further third enters next to the sector being attacked. A counter-push round is never a Push round (below), so the shares never overlap: **Dig In**, a third at the pressure sector; **Push**, a third at the pressure sector and a third at the Push target; **counter-push**, half at its target. The rest of each round's spawns spread over the other open ingress. With M1's two sectors the pressure sector is simply the other sector when it is held; the full selection arrives with the third sector (M4) |
| **Round end** | Ends when the last zombie of the wave dies. Bonus salvage if nobody went down (doubled on Dig In); income for every held sector |
| **Counter-push rounds (5/15/25; M4)** | The horde has the initiative and pushes the frontline back (A54). **There is no Push on a counter-push round:** the intermission before it offers only Dig In, and the squad picks which held sector to dig in on. At the round start the spawn director names one held frontline sector as its target (never the home sector while another sector is held) and the HUD announces it. At least half of the round's spawns enter through ingress next to that sector, all of the round's Breachers go there, and no pressure sector is picked. If the squad loses it, the line moves back. The extra Breacher pack, warning audio and presentation come Later |
| **Evac rounds (10/20/30; round 10 at M5, the others Later)** | The squad votes to call evac. Then it defends a landing zone in a held open-space sector for about 2 min. Success counts as a victory |

**Sectors (U6).** A map is divided into **sectors at real landmarks** (parks, school grounds, intersections, a trail
head and residential blocks) joined by the other residential blocks between them. Each sector has a **capture zone**
about 20–30 m across. The first map proposes **two intersection sectors and two block sectors** next to its park,
field, school and cemetery sectors (system 6.1, A54); Q17 lets the user change the number of block sectors. The
slice starts with two sectors at M1 and holds an intersection, a block, a park and open grounds by M5.

| Sector state | Rule (starting values) |
| ---- | ---- |
| **Horde-held** | Spawns zombies when it borders the frontline. All sectors except the home sector start horde-held |
| **Capturing** | Squad members inside, no zombies inside. Capture time `t = T_base / (1 + 0.5 × (n − 1))`, with `T_base` = 30 s and `n` = squad members in the zone: 30 s alone, 20 s for two, 15 s for three, 12 s for four |
| **Contested** | Squad members and zombies both inside: progress pauses |
| **Held** | Gives a **redeploy point**, a **supply point** (an ammo and health refill from a limited stock that restocks each round; starting value: one full refill per squad member per round, ammo and health together), a sector **armory and workbench**, salvage income each round (starting value 100), and a landing zone if the sector has open ground |
| **Held, infiltrated** | 1–2 zombies inside and no squad member inside (below the Overrun threshold). The sector stays Held, keeps every function and does not drain; the HUD flags it, and a redeploy there is placed like a squad spawn on a pressed squadmate (A39). A single straggler never costs a sector; the round GDD tunes the threshold (A51) |
| **Overrun** | Zombies inside (3 or more) with no squad member inside for 10 s: progress drains over 20 s. At zero the sector is lost; its redeploy point, supply point and income go dark and it becomes horde ingress |

**The frontline.** The line between held and horde-held sectors is the frontline. Taking a sector removes a horde
spawn point but adds frontline to hold with the same four people, so territory is two-edged (Pillar 1).

**Fail state.** The match is lost when **every player is downed or dead at the same moment** (a wipe) or when **the
last held sector is overrun**.

| Situation | Rule |
| ---- | ---- |
| **Downed** | At 0 health (system 3). The player can crawl and use a sidearm. 30 s bleed-out; each zombie hit on a downed player removes 5 s of it. After 5 s downed, the player may give up (hold a button) to start the redeploy timer. See Squad play for revives |
| **Dead** | The player redeploys on a squadmate or a held sector after a timer (see Squad play). They keep their weapons and attachments, lose 10% of their salvage, and their gadget charges reset to base (A25) |
| **Playing alone** | In M1's single-player test build a death ends the run. In the solo mode (M5) a death is a wipe unless the player holds the solo kit's self-revive charge, which exists only in solo play (A24) |

Alternatives considered:
- *A fixed final round with a scripted ending:* rejected. It caps the challenge and the leaderboards.
- *Endless with no evac:* rejected. Sessions get no natural stopping point, so a two-hour run ends in exhaustion.
- *Zones opened with salvage (revision 1's model):* replaced. The user asked for capture-and-hold objectives (U6), and
  capturing through play turns territory into a fight instead of a purchase.
- *A fixed attack-defend sequence of sectors:* kept as the **fallback** if free sector choice spreads four players too
  thin in playtests (see Scope Tiers).
- *All sectors neutral at the start:* rejected. Horde-held sectors give every Push a reason and give the horde
  somewhere to come from.

Evac plus sectors gives a natural stopping point, an open ceiling, and a reason to push.

### 2. Roles and gadgets

Every player picks a **role** at deploy (U2). Roles are defined by **signature gadgets** (and, Later, one passive).
Roles arrive at M4, after the loop is proven alone (M1), online (M2) and polished (M3). **Weapons are open to every
role** (A23): any role can buy any gun or melee weapon. Holdout's role names are its own (A22); the archetypes behind
them are generic military roles.

| Role | Archetype | Signature gadgets (**first gadgets, M4,** in bold; the others Later) | Passive (Later) | What the squad lacks without it |
| ---- | ---- | ---- | ---- | ---- |
| **Corpsman** | Medic | **Revive kit** (the user's "med/revive kit"; A61): revives a downed squadmate in about 1.5 s to full health, and **heals** a standing squadmate to full in about 1 s from a heal pool of 300 health a round (refilled at the round start and by the resupply crate). It never heals its own carrier: the Corpsman's own health comes from another Corpsman or a supply point. *Dressing pack* (Later): a thrown heal of 50 health, 3 charges | Can drag a downed squadmate to cover | Revives take 4 s and return the player at half health; wounds above half health heal only at a held sector's supply point |
| **Quartermaster** | Resupply | **Resupply crate:** a deployable that refills magazines and gadget charges for squadmates nearby; limited stock that restocks between rounds. *Bandolier* (Later): thrown, refills one player | Carries more reserve ammo | Ammo only at held-sector supply points |
| **Sapper** | Engineer / demolition | **Reinforce tool:** repairs and reinforces panels at double speed and half salvage cost. **Breach charge:** a placed explosive that breaches a panel or door and damages the panels around it, the squad's own reinforcements included (2 charges; refilled by the crate; extra charges cost salvage). *Collapse charge* (Later) | Heavy melee does more structural damage | Slow, full-price fortifying; breaching only with heavy melee |
| **Spotter** | Recon | **Sensor:** a deployable that auto-spots zombies within about 30 m for the squad and flags special types; lasts one round. *Survey glass* (Later): a long-range ping that marks a target and shows which ingress the next spawns will use | Less sway with magnified optics; hold breath | No early warning; specials arrive unspotted |

The Sapper carries both edges of Pillar 1: the tool that makes a wall stronger and the charge that removes it.

**The Spotter at M4.** The first Spotter has only the ~30 m sensor, so M4 tests its close-range early warning
(specials flagged before they reach the door), **not** the fantasy of seeing the horde coming from far off. That
fantasy rests on the passive and the survey glass, both Later, and is first tested there (A51).

**Gadget names are Holdout's own** (A58). The first gadgets carry the user's own generic words (revive kit, resupply
crate, reinforce tool, breach charge, sensor); the second gadgets (dressing pack, bandolier, survey glass) and the
collapse charge are named for Holdout and checked on R12's IP checklist with the role and zombie names.

**Squad composition.** Duplicates are allowed (A35); the gadgets, not a lock, push squads toward a spread of
roles. A player can change role when they redeploy or at a held sector's supply point during an intermission.

**Fewer than four players (U2, A24, A53).** Two rules keep a small squad whole:
1. **Universal fallbacks.** Anyone can revive (slowly), everyone recovers to half health on their own, held sectors'
   supply points refill ammo and health from their limited stock, anyone can board and repair (full price, normal
   speed), and everyone can ping. No role is ever strictly required, and every
   fallback stays meaningfully worse than the role's hand-off (Pillar 4's test).
2. **The squad-gap kit compensates for missing people, not for role choices.** A squad of *n* players receives
   **4 − *n* gap gadgets**. Each is the light version of an **unpicked** role's first gadget (a role is unpicked
   when no squad member has chosen it), carried in a second gadget slot. A player carries at most one. This rule holds
   whether or not roles are duplicated (A35):

| Squad size | Gap gadgets | Rule |
| ---- | ---- | ---- |
| 4 | 0 | No gap kit, whatever the roles. A squad of four that doubles up a role leaves the unpicked roles to the universal fallbacks: that is its choice and its cost (A35, Pillar 4) |
| 3 | 1 | With one role unpicked, one player carries its light gadget. With two unpicked (one role doubled), the squad picks one of them in the lobby; the other is left to the fallbacks |
| 2 | 2 | Each player carries one light gadget. With three roles unpicked (both players chose the same role), the squad picks two of them in the lobby |
| 1 (solo mode, M5) | — | The solo kit: one role, plus a self-revive charge (one per 5 rounds; it exists only in solo play), a light resupply crate and a light reinforce tool |

*Who carries, and defaults.* The squad chooses in the lobby. If it does not, the default picks unpicked roles in the
order revive kit, resupply crate, reinforce tool, sensor (the order in which the universal fallback is weakest), and
gives the first gap gadget to a player whose role is doubled, then to the lowest squad slot. A role change at a
redeploy or a supply point recomputes the gap kit at the next intermission.

*Light values (starting; each sits between the universal fallback and the role's full gadget, which is Pillar 4's
test, and a light gadget never does anything the full gadget cannot):*

| Hand-off | Universal fallback | Light gadget (gap kit) | Full gadget (the role) |
| ---- | ---- | ---- | ---- |
| Revive | Hold 4 s; back at 50% health | Light revive kit: 2.5 s; back at 75% health; 3 charges a round | Revive kit: about 1.5 s; full health |
| Heal (A61) | Recovery to 50 health only; full health at a held sector's supply point, which spends that player's one refill for the round | Light revive kit: heals a standing squadmate, never its own carrier, to 75 health in 1.5 s, from the same 3 charges a round | Revive kit: heals a standing squadmate, never its own carrier, to full in about 1 s, from a 300-health pool a round |
| Resupply | Held-sector supply points only | Light resupply crate: half the stock; refills magazines only, not gadget charges | Resupply crate: full stock; magazines and gadget charges |
| Repair and reinforce | Full price, normal speed | Light reinforce tool: 1.5× speed, 75% of the price | Reinforce tool: 2× speed, half price |
| Early warning | Ping only | Light sensor: about 20 m radius, half a round | Sensor: about 30 m radius, one round |

**Which gadget a gap carries.** A missing role's light gadget is its first gadget: the revive kit, the resupply
crate, the **reinforce tool** or the sensor. The Sapper's breach charge is never part of the squad-gap kit or the
solo kit; heavy melee stays everyone's way to breach (A51).

Alternatives considered:
- *AI squadmates to fill empty slots:* rejected. AI teammates cost more than the horde AI, and they turn Pillar 4's
  hand-offs between people into hand-offs to a bot.
- *Classless gadget picks:* rejected. The user asked for roles (U2), and roles give identity and readable callouts.
- *Five roles with a separate assault role:* rejected. With four players, a fifth role guarantees a gap in every
  squad; its frontline job is folded into the Sapper.
- *Role-locked weapon families:* rejected (A23). It would split the weapon content four ways and make melee and gun
  builds depend on role.

### 3. Squad play: health, revive and heal, squad spawn, ping and spot, orders, resupply

**Health, damage and recovery (health, damage and recovery from M1; heals arrive with the roles at M4; A61).** Starting values; the squad-play GDD owns them.

| Rule | Starting value | Why |
| ---- | ---- | ---- |
| **Health** | 100 for every role. No armour layer through M5 (armour is gear, Later) | One number every role shares keeps the hand-offs readable |
| **Damage taken** | Shambler hit 20; Runner hit 12; Breacher hit 40; a fall over 3 m costs 15 per metre beyond 3 m, and one over 6 m downs the player (system 11). A blocked hit costs stamina, not health; a parried attack costs nothing (system 8). Later types are set in the horde GDD (Grabber pin about 8 a second; Detonator blast up to 60). Difficulty scales damage taken; party size scales zombie count and health, not damage | Five Shambler hits down a player: a doorway fight is survivable but never free, and the parry is worth learning |
| **Recovery** | After 6 s without taking damage, health regenerates at 5 a second, but only up to the **recovery ceiling of 50**. A player above 50 does not regenerate | Grounded and forgiving at once: nobody bleeds out of a match from chip damage, but the top half of the health bar is a hand-off (Pillar 4) |
| **Heal** | Above the ceiling, health comes only from the Corpsman's revive kit (to full in about 1 s, 300-health pool a round), a light revive kit (to 75 in 1.5 s, from its 3 charges; neither kit heals its own carrier) or a held sector's **supply point** (to full; it spends that player's one refill of the round, ammo and health together) | The med half of the user's "med/revive kit" (U2); the supply point is the slow, costly fallback |
| **Downed** | At 0 health (system 1's fail-state table): crawl, sidearm, 30 s bleed-out shortened 5 s per zombie hit; give-up after 5 s | Revives stay urgent, and zombies punish a squad that ignores a downed player |

The **HUD** shows the recovery ceiling as a notch on the player's own health bar, and a squadmate below 50 health
gets the low-health flag (art bible 7.2), so "needs a heal" is a callout like "needs ammo".

| Action | Rule (starting values) | Who does it best |
| ---- | ---- | ---- |
| **Revive** | Anyone: hold interact 4 s, returns the player at 50% health. Corpsman with the revive kit: about 1.5 s, full health. Interrupted if the reviver is hit or grabbed | Corpsman |
| **Heal** | Corpsman: hold interact on a standing squadmate, about 1 s to full, from the revive kit's pool. Gap carrier: the light revive kit on a squadmate, 1.5 s to 75 health. Anyone: recovery to 50 health, or a supply point's refill. Interrupted like a revive | Corpsman |
| **Squad spawn** | A dead player redeploys on any living, not-downed squadmate after 10 s. If that squadmate is **pressed** (a zombie within about 8 m, or damage taken in the last 3 s), the server places the player at the nearest safe, navigable point up to about 25 m behind them, waiting up to 5 s more for one; if none appears, the player redeploys at the nearest held sector instead. Arriving near the fight is the spawn's risk; pressure delays and offsets the spawn but never blocks it (A39) | Any living squadmate |
| **Sector spawn** | Redeploy at a held sector's rally point after 15 s + 1 s per round (capped at 30 s) | Held sectors |
| **Ping** (M2) | One contextual gamepad button (U11), **tapped**: on a zombie it marks it for the squad (5 s; specials 8 s); on the ground it marks a position; on a cache, crate, supply point or workbench it marks the item. It works at any range in line of sight up to 400 m, so a ping through the magnified optic is the first long-range spot. **Holding** the same button opens the ping wheel of callouts ("need ammo", "need a heal", "need revive", "reinforcing here", "breaching here"; Later). Holding it has no other meaning: squad orders have their own input (below) | Everyone |
| **Spot** | The Spotter's sensor auto-spots in its radius; the survey glass (Later) marks at long range. Kills of spotted or pinged zombies pay the spotter an assist | Spotter |
| **Squad orders** (M4; A63) | There is no squad-leader rank: in a squad of friends anyone can give an order. The intermission vote sets the round's **order**: Push (the target sector) or Dig In (the held sector the squad names; by default the sector the vote was cast from). In a round, a player proposes a new order with the **order input** (starting choice: D-pad up while looking at a sector's marker or with the sector selected on the tactical map; never the ping button), and it takes effect when a second living squad member confirms it with the same input (at once in a squad of two, or solo). The order shows on the compass and the sector board. Kills and squad actions inside the ordered sector (its capture zone plus about 30 m) pay **25% more salvage**, and capturing an ordered Push sector pays 50% more | Everyone |
| **Resupply** | The Quartermaster's crate refills magazines and gadget charges (the Corpsman's heal pool included); held-sector supply points refill ammo and health (one refill per squad member per round, from their stock). Zombies never drop ammo | Quartermaster |

**Squad actions pay.** Revives, heals, resupplies, repairs and reinforcements, and assists on spotted targets all
earn salvage, capped per round to stop farming. Support play is rewarded as much as kills.

Alternatives considered:
- *Respawn only at the next round start (revision 1, A21):* superseded by A25. With sectors and a frontline, a player
  sitting out a six-minute round is dead time; squad spawn keeps them in the fight.
- *Squad spawn only on an unpressed squadmate (revision 2):* revised by A39 after CD-PILLARS round 1. Blocking the spawn
  while a squadmate is pressed rewarded one player for staying out of the fight; now pressure only delays and offsets
  the spawn.
- *Ammo drops from zombies:* rejected. It would make the Quartermaster and melee's ammo-free role irrelevant.
- *Spotting by looking at a zombie and pressing a key, with no gadget:* kept as the universal ping; the sensor adds the
  automatic, area version that makes the Spotter a role.
- *Full regeneration with no heal (A61):* rejected. It would leave the Corpsman with nothing to hand off between
  downs. *No regeneration at all:* rejected. Chip damage would grind squads down without a Corpsman, against the
  squad-gap promise to 2–3 player squads. The ceiling at half splits the difference.
- *A squad-leader rank with exclusive orders (A63):* rejected. In a four-friend co-op squad a fixed leader adds
  hierarchy without adding a hand-off; anyone can propose an order and a second player confirms it.

### 4. Salvage economy (between-round and in-round)

There is **one currency, Salvage.** Each player has their own wallet, plus a **give** action so a teammate can
transfer salvage (Pillar 4).

**Earned** from hits, kills, headshots and long-range kills; from squad actions (revive, resupply, repair and
reinforce, spot assists); from capturing sectors; and as income for each held sector at round end. Melee kills pay a
bonus (Pillar 3). Repairs and squad actions are capped per round to stop farming. Rounds with no downs pay a bonus.

| Sink | Where | Starting value | Its two edges |
| ---- | ---- | ---- | ---- |
| Weapons and ammo | **Sector armories** at held sectors; **garage caches** (tools and melee weapons) across the map; on maps with shops, caches at real shop and amenity **types** (A37) | 500–1,500 | Armories reward holding ground; garage caches pull players off the line |
| Attachments | **Workbench** at held sectors: buy for the weapon you are holding | 250–750 | Every attachment is a trade-off, not a straight upgrade |
| Weapon upgrade tiers I–III (Later) | Workbench | 2,000–5,000 | Keeps a favourite gun viable against growing zombie health; very expensive |
| Fortify / repair | Any opening or wall panel (Sapper: half price, double speed) | 100–250 per panel | Blocks entry and fire, but costs firepower salvage; the horde then targets the next-weakest point |
| Extra breach charges | Sapper only | 300 each | Opens a route or sightline, but also opens a horde route |
| Collapse charge (Later) | Sapper only, placed on load-bearing panels | 1,000 | Chokes a street and crushes zombies, but loses cover, the upper floor and that building's caches |
| Gear (Later) | Sector armory | 250–1,000 | Armour and a stamina tonic. **No self-revive is sold in a squad of two or more:** the self-revive charge exists only in solo play, inside the solo kit (system 2; Pillar 4) |
| Supply-drop flare (Later) | Anywhere outdoors | 950 | A random weapon plus a random attachment, dropped somewhere in a held or contested sector. Someone has to go and get it |

Capturing a sector is **not** a salvage purchase: it is earned through the objective (U6).

Alternatives considered:
- *Two currencies (points plus building materials):* richer, but doubles the UI and the balance surface. Deferred
  until the single currency has been playtested (Q5).
- *A shared team wallet:* strong for Pillar 4, but removes personal agency and invites griefing. Rejected in favour
  of individual wallets plus give.
- *A trader menu between waves:* rejected. In-world armories at held sectors make territory matter and make movement a
  risk.
- *Buying zones with salvage (revision 1):* replaced by capture-and-hold (see system 1).

### 5. Two-edged destruction (synced)

**Model.** Every building is assembled from **panels**: wall, door, window, garage-door and floor segments roughly
2–3 m wide and one storey tall. **Two exceptions** (sensitive sites; art bible AB-14; Pillar 1's logged exception,
A57): places of worship are sealed, indestructible shells that take cosmetic chips only, and cemetery headstones are
indestructible. The first map is suburban single-family **wood-frame** houses with garages, so the
default kit is siding over studs and drywall; brick veneer and masonry appear where the building type calls for them.
Each panel has a small set of authored states:

| State | Gameplay meaning |
| ---- | ---- |
| Intact | Blocks movement and sight; counts as cover. Later, with penetration, stops bullets according to its material class (see system 7) |
| Damaged | Still blocks, but visibly cracked or splintered. One more hit away from breached; can be repaired |
| Breached | A hole. Passable for zombies and players, and opens a sightline. Can be fortified (boarded) but not fully repaired |
| Destroyed (not in M1, which stops at Breached) | Gone. Cannot be repaired |
| *Reinforced* (a flag) | More panel health; resists normal zombies; stops all bullets, the squad's included; Breachers target it |

A garage door is the largest and weakest panel on most houses: the obvious way in, for both sides.

**Who breaks things:**
- *Players:* the Sapper's breach and collapse charges, explosives, and anyone's heavy melee (sledgehammers, axes) on
  weak panels and doors.
- *The horde:* every zombie tears down fortifications at openings. Breachers attack walls and open new ingress.
  Detonators blow out panels.

**Structure rule (Later).** The rule is simple and readable, not physics. When enough load-bearing panels in one storey
segment are destroyed, that segment **collapses into a pre-authored rubble state**. The rubble blocks or creates
paths, crushes anything under it, and may form a ramp that Crawlers use.

| Action | Edge for you | Edge against you |
| ---- | ---- | ---- |
| Reinforce a wall, door or window | Blocks entry and fire; buys time | Costs salvage that could have been firepower; blocks your own shots; the horde shifts to the next weak point |
| Breach a wall | Shortcut, sightline, escape route | A new horde route; less cover |
| Collapse a storey or facade | Chokes a street; crushes a crowd | Loses the vantage point, the upper floor and that building's caches; rubble ramps may let Crawlers in |
| Take a sector | A redeploy point, supply, income, a landing zone | More frontline to hold with the same four people |

**Persistence.** Damage lasts the whole match. Players can repair damaged panels, but destroyed panels stay
destroyed. The neighborhood visibly falls apart as the rounds climb, so the environment escalates alongside the
horde.

**What "every client sees the same result" means (A4):**
- **Authoritative and identical on every client:** the server owns panel states, rubble states and the navigation
  changes that follow from them. Every client gets the same holes, the same rubble collision, the same routes and the
  same cover.
- **Cosmetic and local:** flying debris, dust and smoke are simulated on each client and may differ slightly between
  clients. They never affect gameplay.
- **Representation (for the destruction ADR):** about 22,000 panels cannot be individual actors or individually
  replicated components. Panels are instanced meshes with per-instance state; each building has **one replicated
  state owner** (a bitfield with delta serialization). When a building's World Partition cell streams in on a client,
  the client applies the owner's current state before the building is shown.
- **Bandwidth:** at about 2–3 bits per panel, a 100-panel building's full state is about 40 bytes. Changes travel as
  small delta events. A player who joins late or reconnects gets the full snapshot. *Estimate for the first map:*
  745 buildings at roughly 30 panels each is about 22,000 panels, or about 8 KB at 3 bits per panel. Reinforce
  flags, fortification boards, deployables and rubble states add to that, so the snapshot is budgeted at 2–3 times
  the panel figure (**about 16–24 KB**). To be confirmed at M2, on the slice's far smaller panel set.

Alternatives considered:
- *Replicating full Chaos physics:* rejected. Too costly in bandwidth and server CPU, not deterministic across
  clients, and unreadable in a fight.
- *Voxel destruction:* rejected. It conflicts with the real-architecture look and multiplies scope.
- *Panelized walls on fewer buildings:* this is **how the slice is built through M5** (U12, A57). Synced wall panels
  exist on the enterable houses from M1 and on the buildings that face a capture zone by M5; every other house in the
  slice is a sealed shell whose doors, windows and garage doors become breachable by M5. U9's synced building
  destruction is there from the first milestone. Wall panels on every building belong to the full map (Later);
  keeping the reduced set for good is proposed cut P1 and needs the user's approval (MVP Definition).
- *Doors, windows and barricades only (the genre's classic boards):* the floor below that, proposed cut P4, used only
  if the user approves it, because it would drop U9's wall destruction.

### 6. Real-world maps (OpenStreetMap)

**Pipeline.** Runs at editor time, data-driven and deterministic:
1. Take an OSM extract of a bounding box. The first map's extract came from the OpenStreetMap main API
   (`/api/0.6/map`, limited to 0.25 square degrees and 50,000 nodes per request); the Overpass API was unreachable
   from the build environment.
2. Import and clean it.
3. Generate buildings, streets, ground cover and backdrop through PCG and a C++ tool, plus rule-based set dressing
   for cover the data does not contain (fences, hedges, yard trees, parked-car wrecks).
4. The gameplay-layer generator proposes sectors (from parks, pitches, school grounds, cemeteries, trail heads,
   major intersections and candidate residential blocks), ingress points, **spawn closets** per sector, cache sites,
   spawn points and evac landing zones.
5. A designer polishes the gameplay layer only.
6. Bake into a World Partition level. *Today only steps 1–3 exist, as a standalone prototype that writes a blockout
   mesh outside the engine (system 6.1); the first UE 5.8 bake, of M1's slice, is M1 work. Through M5 the slice's
   gameplay layer is hand-placed (step 5 without step 4); the gameplay-layer generator is Later work, needed only for
   the full map or a second city (A51).*

| OSM data | Used for | Fallback when missing or poor |
| ---- | ---- | ---- |
| Building footprints | Building shells (panelized) | Required. Footprints that are broken or overlapping are repaired or dropped |
| `height`, `building:levels` | Storey count (storey **height** always comes from the kit: 2.75 m floor to floor plus a 0.3–0.6 m foundation reveal; art bible 6.3, AB-13, A59) | `building:levels` when present; else `height` ÷ 2.75 m, rounded; else type plus footprint area (house 1–2 storeys, apartments 3–4, garage 1); a designer may override storey count on sector buildings (footprints never move). *The prototype pipeline still uses 3.2 m per level and must switch to the kit height before its output feeds kit fitting* |
| `building` type | Style kit, interior templates | Untyped (`building=yes`) buildings take a type from footprint size |
| `roof:shape` | Roof form | Gabled or flat by type and footprint shape; hip and compound roofs are a pipeline to-do |
| Roads and footways (`highway`, width, lanes) | Street layout, pavements, wreck placement, sector capture zones at major intersections | Default widths for each road class |
| Land use / leisure (park, pitch, wood, grass, cemetery) and waterways | Open spaces, sectors, evac landing-zone candidates, close-quarters woods | Generator flags maps with no landing zone |
| `shop` / `amenity` **type** (never brand names) | Where each kind of cache goes; sensitive-site detection | Sector armories plus garage caches (A37) |
| Barriers, walls, fences, trees | Cover lines and traversal: every generated fence or hedge falls in a vault or mantle class (system 11), with nav links for the horde | Generated by rule (they are not footprints or streets, so Pillar 2 allows it) |
| Elevation (not from OSM) | Flat through M5. Later: open elevation data, licence checked | Flat |

**Map scale and building classes (U8, A30).** The whole ~1.2 km × 1.2 km box is the map the game is designed for.
The milestones build a growing slice of it (system 6.1); ground outside the current slice is backdrop until its turn.
Fights concentrate at the frontline, so at any moment the action lives in one to three sectors. Most houses are not
enterable, which keeps interiors affordable:

| Class | Where | What it is |
| ---- | ---- | ---- |
| Enterable | Houses chosen in the engine by gameplay criteria (system 6.1's safeguards): 2–3 at M1 and 6–8 by M5, all hand-fitted; **20–30** on the full map (Later). Only near-rectangular footprints qualify, by rule, until an interior generator is proven | Panelized; ground floor plus selected upper floors, basements excluded, with interiors built from suburban room templates |
| Sealed | Every other building inside the slice | Not enterable. Its doors, windows and garage doors (by M5; its walls too on the full map, Later) can be breached into a shallow interior pocket; **once breached, the pocket becomes a horde spawn closet and ingress** (Pillar 1). Garages open into a garage-only interior |
| Backdrop | Outside the slice | Not interactive; low detail, to the horizon |

**Curation (Pillar 2).** We curate by **choosing the site and the boundary**, by placing the sectors at real
landmarks, and by tuning the gameplay layer. We never move real footprints or streets. Site-selection criteria:
- 4–8 public landmarks (parks, fields, grounds, major intersections) that can carry sectors;
- at least one long-sightline axis where ballistics matter, and close-quarters ground where melee matters;
- a defensible anchor building;
- at least one landing-zone open space;
- the OSM data scores well for completeness, or its gaps have a fallback.

#### 6.1 First map: Tinley Park, IL (60477)

**The first map is a ~1.2 km × 1.2 km area of suburban Tinley Park, Illinois (USA)** (U8). The user confirmed its
box and its name from the rendered preview on 2026-11-19 (U15). The map is named **"Tinley Park, IL (60477)"**
everywhere (U10). 167th Street, a secondary road, crosses it east–west about two-thirds of the way north and is its
spine.

**Labels.** OSM's subdivision names (named `landuse=residential` areas) are never used: not for the map, a sector, a
slice or any player-facing text. The wooded park in the south has an OSM name that repeats one of them, so its sector
is labelled **"Creek Woods"**, after Tinley Creek. This is the **one logged exception** to Pillar 2's real park names
(A55; Q21 asks the user whether to keep it). Every other public park keeps its real name (Lewis Park).

**The box is the map.** Two landmarks cross its edge: Lewis Park (W), about half inside, and the Tinley Creek Green
trail (E), mostly beyond it. Sectors use only the ground inside the box. The site is a hard test for the pipeline: no
height tags, no shop types for caches, no fences or trees, and a flat ground plane.

Measured from the extract (`prototypes/real-street-holdout-concept/pipeline/data/tinley-park-60477.osm`) and the
prototype pipeline's report (`.../data/metrics.json`), 2026-11-19:

| Fact | Value | Design consequence |
| ---- | ---- | ---- |
| Extent | 1,201.6 m × 1,197.3 m (143.9 ha) | The whole extract is the map; sectors keep the fight local |
| Buildings | 756 in the extract (745 inside the map box): 325 `house`, 409 untyped `building=yes`, 20 `garage`, 2 `apartments` | The suburban wood-frame house kit carries the map; untyped footprints are typed by size |
| Height tags | **None.** 0 buildings have `height` or `building:levels`; 100% of heights are inferred (type plus footprint area) | Verticality is a guess. Acceptable for one- and two-storey houses; storey overrides allowed on sector buildings |
| Roofs | 693 footprints hint gabled, 52 flat; 169 of the gabled ones are not near-rectangles and currently fall back to flat | The pipeline needs hip and compound roofs before the realism art pass |
| Streets | 163 road ways: 167th Street (secondary), dense named residential streets (for example Arcadia Drive, Beverly Avenue, Gaynelle Road, Honey Lane, Kimberly Drive, Laura Lane, Ridgeland Avenue, 166th Street), footways, and the Tinley Creek Green paved trail | 167th Street is the long-sightline spine; residential streets are the lanes between sectors |
| Street graph | 6 components; the largest holds 95.8% of 26.7 km of walkable length; 36 buildings are more than 40 m from any road | Horde routing works; back-lot buildings need yard paths by rule |
| Cover data | No `barrier` ways (fences, hedges, walls) and no tree nodes | Yards are open in the data; fences, hedges and yard trees are set-dressed by rule |
| Ground | Woods about 19.9 ha, parks about 7.6 ha, grass about 6.9 ha, water about 0.9 ha; Tinley Creek runs through the south | Woods and creek give a close-quarters, melee-heavy sector; parks and fields give landing zones |
| Shops / amenities | No `shop` tags. Amenities: 3 places of worship and 1 school (tagged as a kindergarten); a cemetery | The cache-by-shop-type rule does not apply; sector armories and garage caches do (A37). Sensitive sites follow the safeguards below |
| Pipeline run | About 1.6 s of stage time with zero hand-editing (convert 0.08 s, navigation check about 0.9 s, blockout mesh 0.06 s, preview about 0.57 s), in a standalone prototype outside the engine. Source: the committed `metrics.json` (1.625 s), re-measured 2026-11-19 over three offline runs on the same extract (1.61–1.67 s; about 1.8–1.9 s wall clock with interpreter start-up). An earlier 2.45 s figure is superseded | The geometry stage of the "draft map in hours" KPI holds for this extract. The engine stage (PCG, World Partition bake, navmesh, HLOD), interiors and the gameplay layer are unproven (R3) |

**Proposed sectors** (the level GDD confirms placement; compass directions are relative to the map). Sectors are
named by public landmarks and streets, and the tag shows when each joins the slice.

| Sector (in-game label) | OSM source | Character | Role in the match |
| ---- | ---- | ---- | ---- |
| **167th Street** *(intersection; M1)* | The secondary road crossing the map east–west | A long straight axis, verges, junctions, house fronts, wrecks | The **home sector** (A44). Its capture zone is on the public carriageway, at the staggered junction where Anne Marie Avenue and Patricia Avenue meet 167th Street. The frontline spine: long sightlines from round 1 and doorway fights in the houses along it |
| **School Grounds** *(M1)* | Kimberley Heights School grounds (N–NE, north of 167th Street) | An anchor building plus fields | M1's objective sector: open ground for ballistics, a short push north of home, and a landing zone. Rendered as a generic school under a generic label; the building is a sealed shell (A29, Q16) |
| **Andres Avenue** *(block; M4)* | The residential block bounded by Anne Marie Avenue, Brittney Lane, Helen Sandidge Court and Andres Avenue, south of 167th Street | Houses with attached garages and back-yard fences | The first block sector (A54): a stepping stone about 200–250 m south of home on the way to Creek Woods, fought through yards, fences and garages; labelled by a bounding street (Q17) |
| **Creek Woods** *(park; M5)* | Lancaster Woods Park (its OSM name) along Tinley Creek (S) | Woods, creek banks, short sightlines | Close quarters where melee earns its place; creek crossings are chokepoints. Labelled after the creek, the one exception to real park names (A55, Q21) |
| **Ridgeland Crossing** *(intersection; Later)* | Where Ridgeland Avenue crosses 167th Street (W) | A four-way crossing on the spine | The second intersection sector (A54): it holds the west end of the 167th Street axis between home and Lewis Park Fields |
| **Patricia Avenue** *(block; Later)* | The residential block bounded by Patricia Avenue, 166th Street, Fulton Terrace and Kimberly Drive, north of 167th Street | Houses and yards | The second block sector (A54), east of the School Grounds |
| **Lewis Park Fields** *(Later)* | Lewis Park and its sports fields (W) | Open fields, street-band sightlines, little cover | Landing zone; open ground for the Spotter and for ballistics (the long band itself runs along 167th Street). It uses the half of the park that lies inside the box |
| **Cemetery** *(Later)* | Zion Lutheran Cemetery (E, just south of 167th Street) | Open ground and low cover | An exposed crossing; never a landing zone; sensitivity rules apply |
| **Creek Trail** *(Later)* | The Tinley Creek Green paved trail (E edge, along 167th Street) | A paved trail corridor, mostly beyond the box | A horde flank lane into the east of the map; the level GDD decides whether the stretch inside the box can carry a capture zone |
| *Other residential blocks* | The residential streets north and south of 167th Street | Houses with garages, yards, driveways | Connective: the ground between sectors where the horde pushes and the squad fortifies |

*Sector count.* These are nine candidates (two intersections, two blocks, a park, fields, the school grounds, the
cemetery and the trail). The full map keeps six to eight of them (the netcode table budgets for eight); the level GDD
decides which when the full map is built.

**The slice grows with the milestones** (U12; MVP Definition). Its bounds are given only by landmarks and by distance
from the box's west edge. Measured in the extract from that edge, the School Grounds span about 625–720 m, the home
junction about 755–795 m, the Andres Avenue block about 770–925 m and the woods about 335–675 m.

| Slice | East–west, from the box's west edge | North–south | Sectors |
| ---- | ---- | ---- | ---- |
| **M1 to M3** | About 600–950 m (350 m wide) | From the house row south of 167th Street to just north of the School Grounds | 167th Street (home) and the School Grounds |
| **M4** | The same 600–950 m, which holds the whole Andres Avenue block | Extended south to the far side of the block | Adds the Andres Avenue block |
| **M5** | Widened west to about 335 m (335–950 m, about 615 m wide) | Extended south to just beyond Creek Woods (about 1 km in all) | Adds Creek Woods |
| **Later** | The whole box | The whole box | Six to eight of the nine candidates |

Ground inside the box but outside the current slice is backdrop until its milestone. About 350 m of 167th Street lies
inside the M1 slice, so shots along it reach about 175 m in each direction from home; the 300 m shot is practised on
the firing range until the slice widens.

**Why home is on 167th Street (A44).** A design choice: the street is the frontline spine, and from it the School
Grounds are a short push north over open ground (about 150 m), while the block and the woods lie south through yards
and close quarters (about 200–250 m and about 400 m). Ballistics and melee are therefore both in reach from round 1,
and the slice holds every kind of sector U6 names (an intersection, a block and a park, plus open grounds) by M5.

**"Play your own street" (A6).** Through M5 the game is one slice of this one map. The pipeline stays generic on
purpose (any OSM neighborhood in, a draft level out), but a second city is Later work, and the pipeline must be proven
on one before any further map is promised. A player-facing generator is a possible far-future feature (Q8).

**Real-place safeguards (A29, revising A8).**
- **Shown:** the map's town name ("Tinley Park, IL (60477)"), OSM street names (on street signs and the tactical map),
  and the names of public parks, the creek and the trail as sector labels. This is what makes Pillar 2 pay off. One
  logged exception: a park whose OSM name repeats a subdivision's name takes a creek or woods label (A55).
  Text on the tactical map is limited to street names and sector labels: OSM place, subdivision and institution names
  are never drawn.
- **Never shown:** house numbers, addresses, anything about residents, brand names, or municipal insignia. No real
  people are depicted, and the horde is anonymous: no zombie is presented as a resident of the real town (art bible
  5.4). **No UI text names an individual building**, not even by its street ("house on ..."): prompts, pings and
  callouts name the object's kind (house, garage, door, window), and the compass strip gives the street of the
  player's own position.
- **Repository (U13; the repository is public).** The user decided on 2026-11-19 that the repository stays public,
  its git history is left as it is, the first map's data files stay tracked, and pushing continues. **Going forward,
  nothing new may single out a location:** no street address, no house number, no coordinates in any design document,
  no reference to an individual building, and no statement tying any person to the area.
- **Enterable houses are chosen in the engine by gameplay criteria** (a near-rectangular footprint, a workable
  interior fit, cover and sightline value, spacing along the push lanes). Public documents give only their count and
  type, never which houses they are.
- **Prototypes** follow the same rules and the IP rules (R12) in anything new they add. The existing prototypes under
  `prototypes/real-street-holdout-concept/` are throwaways: the greybox's sector layout, labels and markers are not
  authoritative, and this document is the design of record.
- **Houses are realistic but generic.** Facades come from modular kits chosen by building type and footprint. No scan,
  photograph or street-level imagery of the real homes is used (marketplace photogrammetry of generic surfaces and
  props is fine), and no house is a replica of a real house.
- **Sensitive sites** (schools, cemeteries, places of worship, hospitals, memorials, government buildings) are rendered
  as generic structures under generic labels ("School Grounds", "Cemetery"). Places of worship are sealed, never
  sectors, and indestructible beyond cosmetic chips. No zombie ever emerges from a grave; headstones are generic,
  nameless and indestructible (art bible 6.7, AB-14; Pillar 1's logged exception, A57). There are no child zombies.

**Licensing.**
- OSM data is © OpenStreetMap contributors under the ODbL. Attribution plus a licence link appear on map select, on
  loading screens and in the credits.
- **One question needs an answer before any public build (M5):** does the processed OSM data shipped in game files
  count as a *Derivative Database* (share-alike obligations) or only as a *Produced Work*? Keep extracts and
  processing scripts documented either way. The same question covers using a real town's name and street names in a
  commercial game (Q3). There is no budget for counsel (U12): the developer reads the ODbL and the OSM Foundation's
  attribution guidelines and records the conclusion, and a paid opinion is a cash decision for the user.

### 7. Guns, attachments and ballistics

- **Weapon classes:** pistol, SMG, shotgun, assault rifle, DMR and LMG, plus launchers, in the full design. M1 builds
  the assault rifle only; the pistol follows at M2 and the shotgun and DMR by M5; the SMG, the LMG and launchers are
  Later. Open to every role (A23).
- **Projectile ballistics (U4, A27, A56).** Every bullet is a simulated projectile with a muzzle velocity, gravity
  drop, **drag** and travel time, at every range and in every fallback (Pillar 3). Wind and spin drift never
  (anti-pillar: not a mil-sim).
  - **Velocities are real-world, and are not scaled** (U4): about 360 m/s for pistols, 400 m/s for SMGs, 880–920 m/s
    for assault rifles and LMGs, 850 m/s for DMRs, and about 400 m/s for buckshot. If playtests on sticks find drop
    unreadable inside about 400 m, aim assist, optics and target speeds are tuned first. Scaling velocities below
    real values is never a tuning call: it is proposed cut P3 and needs the user's approval (MVP Definition; Q13).
  - **Drag from M1:** quadratic drag with one coefficient `k` per round class, `dv/dt = −k·|v|·v`, so speed falls
    with distance as `v(x) = v₀·e^(−k·x)`. Starting value for rifle rounds: `k` = 0.0004 per metre, which costs
    about 11% of the speed by 300 m. Client and server step it at the same fixed rate, so the server's re-simulation
    of a hit claim (netcode table) stays exact.

  Without drag, time of flight is `t = d / v₀` and drop is `h = ½ g t²` (g = 9.81 m/s²). For an 880 m/s rifle round
  that is 0.11 s and 0.06 m of drop at 100 m, and 0.34 s and 0.57 m at 300 m. With drag (`k` = 0.0004, by numerical
  integration at a 0.1 ms step) it is 0.12 s and 0.07 m at 100 m, and 0.36 s and 0.62 m at 300 m.

  A Runner moving at about 6 m/s at 300 m moves about 2–3 m during the bullet's flight, so leading is a real skill.

  **Range bands on the first map:** yards, hallways and the woods at 2–30 m (drop is irrelevant and melee competes);
  residential streets at 30–150 m; 167th Street, the fields and the cemetery at 150–400 m (drop and lead
  matter, and the DMR earns its place: any role can carry it (A23), and the Spotter's passive steadies it).
  Detonators and Howlers are the targets that most reward killing at range. On the full map, long-band targets come
  from the far-zombie tier (system 9; Later), so they do not eat the active cap. These three bands are also what
  "combat range" means everywhere else in this document (Visual Identity Anchor, Pillar 3).
- **Weighty recoil.** Each shot kicks the weapon (a learnable vertical pattern plus a bounded random horizontal
  component), then the weapon recovers. First-shot and sustained recoil differ; visible weapon motion sells mass, but
  the control law stays learnable. Aiming down sights adds sway; crouching steadies it, and prone steadies it most
  (system 11). Mounting a weapon on a windowsill or fence comes Later. **Recoil is tuned for a
  gamepad (U11):** at the default response curve, a player can hold a sustained vertical pattern with the right stick
  alone. Aim assist never removes recoil (system 11). Starting values, which the gunplay GDD owns and M1's feel
  work tunes:

  | Class (assault rifle at M1, pistol at M2, the others by M5) | First shot (vertical) | Sustained (vertical, per shot) | Horizontal (bounded random) | Recovery |
  | ---- | ---- | ---- | ---- | ---- |
  | Pistol (semi-auto) | 1.2° | 1.0° | ±0.3° | Full within 0.25 s |
  | Shotgun (pump) | 3.0° | — | ±0.5° | Full within 0.5 s |
  | Assault rifle (full auto, about 700 rounds a minute) | 0.6° | 0.35° rising to 0.45° over the first 6 shots, then steady | ±0.15° | 6° per second, starting 0.1 s after the last shot |
  | DMR (semi-auto) | 1.5° | 1.5° | ±0.25° | Full within 0.35 s |

  Multipliers: aiming down sights ×0.7, crouched ×0.85, prone ×0.7 (they stack). Attachments move these along the
  stability axis.
- **Attachments are trade-offs** along six axes: **handling** (aim-down-sights time, swap and sprint-to-fire speed),
  **stability** (recoil, sway), **velocity** (muzzle velocity, therefore drop and travel time), **sighting**
  (magnification and reticle, traded against field of view), **capacity**, and **signature** (muzzle flash and, in
  the full design, Later, **noise draw**: gunfire pulls queued zombies toward the shooter's side). Every attachment
  moves at least two axes in opposite directions. **The first nine** (A66) are the three optics, three muzzles and
  three barrels in bold. M1 builds four of them (the reflex sight, the magnified optic, the compensator and the long
  barrel) and the other five arrive by M5. Starting values are multipliers on the weapon's base, which the gunplay
  GDD owns:

  | Attachment (slot) | Gains | Costs | Starting values |
  | ---- | ---- | ---- | ---- |
  | Iron sights (optic slot empty) | — | — | The baseline: fastest aim-down-sights, most of the view blocked by the sight |
  | **Reflex sight** (optic; 1×, non-magnified) | Sighting: a projected dot with a clear view around it; the full field of view kept | Handling | ADS time +5% against iron sights |
  | **Prism sight** (optic; 2×) | Sighting: 2× with an etched reticle | Handling, sway; a narrower field of view | ADS time +12%; sway +10% |
  | **Magnified optic** (optic; 4×) | Sighting: 4× | Handling (slower aim-down-sights, more sway at the same stability); a narrow field of view | ADS time +25%; sway +25%. Not on the pistol or shotgun |
  | **Long barrel** (barrel) | Velocity | Handling | Muzzle velocity +6%; ADS time +8%; sprint-to-fire +10% |
  | **Heavy barrel** (barrel) | Stability | Handling | Sustained vertical recoil ×0.9; ADS time +10%; swap time +10% |
  | **Short barrel** (barrel) | Handling | Velocity, stability | ADS time −10%; sprint-to-fire −10%; muzzle velocity −8%; sustained recoil ×1.1 |
  | **Suppressor** (muzzle) | Signature (no flash; noise draw Later) | Velocity, handling | Muzzle velocity −3%; ADS time +5% |
  | **Compensator** (muzzle) | Vertical stability | Signature; horizontal stability | Vertical recoil ×0.85; horizontal ×1.1; flash larger |
  | **Muzzle brake** (muzzle) | Horizontal stability and first shot | Signature (the largest flash and blast) | Horizontal recoil ×0.8; first shot ×0.9 |
  | Extended magazine (Later) | Capacity | Handling (reload, ADS) | — |
  | Grip (Later) | Stability on one axis | Handling | — |
  | Stock (Later) | Stability (sway) | Handling (ADS) | — |
- **Attachment slots:** optic, muzzle, barrel, magazine, underbarrel/grip, stock: six in the full design. Through M5
  there are three (**optic, muzzle, barrel**), chosen because together they cover handling, stability, velocity and
  sighting.
- **Fixed zero (A66).** Every sight is zeroed at a fixed distance: **100 m** for the assault rifle and DMR
  (every optic) and **25 m** for the pistol and shotgun. With the 100 m zero and drag, an 880 m/s rifle round lands
  about 0.07 m low at 200 m, 0.28 m low at 300 m and 0.66 m low at 400 m (sight height 7 cm), so the hold-over at 300 m
  is about a head's height and at 400 m about a torso. The firing range's 100, 200 and 300 m targets teach it.
  Adjustable zeroing (100 / 200 / 300 m) comes Later.
- **Penetration (Later).** Bullets meet panels by material class: *soft* (drywall, wood siding, interior
  doors, fences) lets rifle rounds through at reduced damage; *medium* (brick veneer, vehicles) stops pistol and SMG
  rounds and slows rifle rounds; *hard* (reinforced panels, masonry, concrete) stops everything. In a wood-frame suburb
  this makes cover and concealment different things, which is the grounded feel the user asked for.
- **Acquisition:** per match. Sector armories sell fixed weapons, workbenches sell chosen attachments, garage caches
  hold tools and melee weapons, and supply drops supply the randomness. Meta unlocks widen the pools but never add
  power.

Alternatives considered:
- *Hitscan with damage falloff (the genre default):* rejected. It fails U4.
- *Hitscan inside about 50 m as a fallback:* rejected (A56). It would cut the projectile feel exactly where most
  fights happen. If hit validation misses its budget at M2, the server relaxes its check on close-range hit claims
  instead, and projectiles stay everywhere (Scope Tiers).
- *No drag:* rejected (A56). Drag costs nothing at a fixed step and makes long shots behave as players expect.
- *A global velocity scale chosen by a prototype:* removed in revision 3.0. It softened "realistic" (U4) without the
  user's say; scaling is now proposed cut P3.
- *Full external ballistics (wind, spin drift, per-cartridge drag tables):* rejected. Grounded, not mil-sim
  (anti-pillar); drag stays a single coefficient per round class.
- *Random loot rarity tiers for weapons and attachments:* rejected because players could not plan around it.
  Randomness lives only in supply drops.

### 8. Melee

- **Moves:**
  - Directional light and heavy swings (horizontal left/right, overhead) and a thrust. On the gamepad (U11),
    direction comes from the right stick's motion at the moment of the swing or from a held modifier; M1's feel
    work decides which (Q10). M1 has light and heavy swings on one heavy weapon; the full directional set and the
    other weapon families arrive by M5.
  - **Block** drains stamina on each hit.
  - **Parry** is a timed block against telegraphed attacks. It staggers the zombie, opens a crit or execution
    window, and refunds stamina.
  - **Shove** gives crowd control and breaks grabs.
  - Stamina is shared with sprint and slide (system 11).
  - Parry windows are tuned for a gamepad (U11).
- **Weapon families:**

  | Family | Role |
  | ---- | ---- |
  | Blunt | Stagger; breaks armour |
  | Blade | Cleave; dismember |
  | Heavy | Wide sweeps and **structural damage**: can breach weak panels and doors, which links melee to destruction |

- **Where melee lives in a ballistics game (Pillar 3).** Ballistics own range; melee owns the doorway. Suburban houses
  are doorways, hallways and garages, and Creek Woods is all close quarters, so close quarters are unavoidable. Bullets
  cost ammo that only the Quartermaster or a held sector's limited stock can replace; melee costs stamina and pays
  bonus salvage. Grabbers
  and Plated zombies create moments where melee is the right answer, and heavy melee lets any role breach without the
  Sapper.
- **Economy link:** melee kills pay bonus salvage, which makes melee the ammo-free engine of the economy.
- **Simplified for PvE (A12).** Compared with PvP-grade first-person melee, Holdout has no feints, no morphs and no
  riposte chains against players. Zombies wind up their attacks clearly.
- **Networking:**
  - Swings and hits are predicted on the client and validated by the server with a tolerance; this is acceptable in
    co-op PvE.
  - Parry is judged on the defending player's client, within that same server tolerance.

Alternatives considered:
- *A single melee button (the genre default):* rejected. It fails Pillar 3.
- *Full PvP-grade melee depth:* rejected. PvE does not need it, and it doubles the animation and netcode scope.
- *Dropping deep melee now that gunplay is grounded:* rejected. The user kept melee with swing, block, parry and
  stamina (U9).

### 9. The horde

| Type (working name) | Arrives from | Role | Link to destruction and the frontline |
| ---- | ---- | ---- | ---- |
| Shambler | Round 1 | Baseline mass | Tears down fortifications at openings; fills capture zones to contest them |
| Runner | ~Round 4 | Fast, fragile; punishes poor positioning | Uses breaches first; the reason to lead targets at range |
| Breacher | ~Round 8 | Heavy; attacks walls and reinforced panels | Opens new ingress; leads counter-pushes |
| Detonator | ~Round 12 | Explodes on death or contact | Blows out panels; can trigger collapses; best killed at range |
| Grabber | ~Round 14 | Pins a player until a teammate shoves or kills it | Pillar 4 moment; interrupts revives |
| Plated | ~Round 16 | Armoured front; needs a flank, a heavy overhead, or a parry | Pillar 3 moment |
| Crawler | ~Round 18 | Low profile | Climbs rubble ramps and squeezes through breaches |
| Howler | ~Round 22 | Calls zombies from the queue; buffs nearby zombies | Pressure on the plan; a priority long-range target for the Spotter |
| Wrecker (boss) | Rounds 20 / 30 | A siege unit | Brings down a whole facade; can overrun a sector on its own |

*All names are working names and will be checked against existing franchises.* M1 builds the first three types; the
Detonator joins by M5 and the rest are Later. No zombie is a child, and none emerges from a grave (A29).

**Tech direction** (revised after TD-FEASIBILITY round 1, 2026-11-19; A42):
- **Through M5:** actor-based zombies, StateTree behaviour, lightweight custom movement, and the active cap. Full
  zombies exist only near the frontline; distant horde-held sectors hold queued zombies, not simulated ones.
- **Far-zombie tier (Later, with the full map's 300–400 m axes):** inside the same actor model, zombies on the open
  axes beyond about 150 m from every player use path-following without the full movement component, replicate
  position at 2–5 Hz with no animation state, and count as a fraction of a full zombie against the active cap
  (starting value: one quarter). Each client plays **one looping signature gait cycle per type** locally (never
  replicated), so the long-band gait reads (the Detonator's rocking walk, the Howler's stop-and-call) survive the
  tier. They are promoted to full zombies when they come within about 150 m. Through M5 the slice's longest shot is
  about 175 m and full actors cover it.
- **Later:** evaluate Mass for queued and distant horde representation. MassGameplay and MassCrowd are
  Experimental in UE 5.8.

### 10. Co-op structure

- Listen server through Steam, from M2 (A11). M1 is single-player on the same server-authoritative code (MVP
  Definition). A dedicated server is optional later.
- Four players maximum (U5). Friendly fire is off, for bullets and for the Sapper's charges' damage to players
  (A20). The charges still damage structure, the squad's own fortifications included (Pillar 1).
- **Server code is headless-capable from day one**, so a dedicated server is a build target, not a rewrite (A42).
- Squad play as in system 3; the salvage **give** action.
- **Party-size scaling:** each wave's size and zombie health scale with player count; the squad-gap kit covers
  missing roles (A24).
- **Solo mode (A16; M5):** a lower active cap and the solo kit, whose self-revive charge exists only in solo play.
  M1's single-player build is a test build, not this mode.
- **Host leaving:** through M5, the match ends if the host leaves. **Later:** the host checkpoints the compact
  authoritative match state (round, sectors, panel bits, economy, squad loadouts) to every client at each
  intermission, and the squad can **resume from the last intermission** with a new host. Full host migration stays
  out of scope (A42).

### 11. Movement, locomotion and controller input

Movement is half of the squad-shooter feel the user asked for (U1): committed, heavy and readable, and built for a
suburb whose yards are cut up by rule-generated fences and hedges, whose windows get breached, and whose streets fill
with rubble and wrecks (A52). Each move names its milestone: M1 keeps to walk, sprint, crouch, jump and vault; prone,
mantle and slide arrive at M2, built as predicted moves in the engine's Character Movement Component. Starting
values; the movement GDD owns them and M1's feel work tunes them.

| Move | Rule (starting values) | Why |
| ---- | ---- | ---- |
| **Walk** (M1) | About 4.5 m/s; about 2.5 m/s while aiming down sights | The baseline pace through the slice |
| **Sprint** (M1) | About 6.5 m/s; drains the stamina melee uses (system 8); sprint-to-fire time is a handling stat (system 7) | Sprinting into a doorway fight spends the stamina the parry needs |
| **Crouch** (M1) | About 2.5 m/s; recoil ×0.85; drops the profile below fences and windowsills | Cover in yards and at windows |
| **Prone and crawl** (M2) | About 1 m/s; recoil ×0.7 and the least sway. Going prone takes about 0.6 s and getting up about 0.8 s. The crawl uses the same locomotion set as the downed state (system 1), which is why prone arrives with it at M2 | The long band: 167th Street, the fields, the cemetery. Slow to leave, so it is a commitment against a horde |
| **Vault** (M1) | Contextual, on the jump button at speed, over an obstacle 0.5–1.1 m tall and under about 0.6 m deep: hedges, low fences, the sill of a breached window, low rubble, a car's hood. About 0.5 s, weapon lowered, momentum kept | The suburb's fences and hedges are everywhere (system 6), so without vaulting a yard is a maze |
| **Mantle** (M2) | Over or onto an obstacle 1.1–2.0 m tall: privacy fences, walls, rubble ledges. About 1.0–1.2 s, weapon holstered. No roofs: house roofs are not playable space | Committing to a mantle under pressure is a risk the player chooses |
| **Slide** (M2) | From a sprint, on the crouch button: about 0.6 s and 3–4 m, ending crouched; costs stamina; cannot fire for the first 0.3 s | A fast drop into cover behind a wreck or a low wall |
| **Jump** (M1) | Low (about 0.45 m of clearance); firing in the air is inaccurate | Grounded, not acrobatic |
| **Falls** (M1) | A fall over 3 m costs health; one over 6 m downs the player | Rubble ramps and upper floors have a cost |
| **Contextual peek** (Later) | Aiming down sights at a cover edge (a wall corner, a door frame) shifts the view and weapon out by about 0.3 m. There is no lean button: a gamepad has no spare input for one | Corner fights in hallways and garages |

**The horde crosses the same terrain.** Fences and hedges carry nav links for zombies. Every type climbs over with one
shared climb clip per skeleton (Runners vault faster), and the Crawler squeezes under. Later, Breachers knock fence
sections flat, a one-way state on the destruction channel. A fence therefore slows the horde but never shelters the
squad for good (Pillar 1).

**Controller input (U11).** The game is played with a controller and never with a keyboard; keyboard and mouse is a
developer fallback, never advertised or tuned. The input layer is a core system from M1, built on Enhanced Input and
Common UI:
- **Aim assist** is slowdown near a target plus limited rotation that follows the target's *current* position. It
  never leads a target and never compensates for drop, so leading and holding over remain the player's skill (U4,
  Pillar 3). It is slowdown only beyond 150 m (the long band), and it never steers melee direction or parry timing.
  Its strength is a player option.
  **Weight test (an M1 criterion, run on the firing range; A66):** at the default strength, (a) a 10-round
  assault-rifle burst fired at a target 30 m away with no stick input climbs the same with assist on and off
  (vertical pattern within 10%), because
  assist never counters recoil; (b) at 300 m a tester who holds the reticle on a moving Runner's centre, without lead
  or hold-over, misses at least 9 shots in 10; (c) beyond 150 m the view never rotates on its own. If any part fails,
  assist is weakened, never the recoil or the ballistics.
- **Stick deadzones, a response curve and adjustable sensitivity** (look, aiming down sights and each optic
  magnification) are options from M1. Prompts use Xbox-layout labels, and every menu works with a gamepad alone.
- **Recoil, ballistics, zombie speeds and parry windows are tuned for sticks** (systems 7, 8 and 9). That tuning
  never takes muzzle velocities below real values without the user's approval (system 7).
- **Tap** the ping button to ping; **hold** it for the ping wheel (Later). Squad orders use their own input (system
  3), so no input has two meanings.

Alternatives considered:
- *No vault or mantle, with the horde and the squad routed around fences:* rejected. Rule-generated fences would turn
  every yard into a maze, and committed traversal is part of the reference feel (U1).
- *A lean button:* rejected for a controller-only game. The contextual peek gives the corner fight without one.
- *No prone:* rejected (A52). Prone is the long band's steadiest position, and its crawl already exists for the
  downed state.

---

## Game Pillars

*Revision 2 pillars (A36), sharpened in revision 2.1 after CD-PILLARS round 1 (`creative-director`, 2026-11-19,
CONCERNS; A40). They replace the revision-1 set, whose approval was a self-review.*

### Pillar 1: Every Wall Cuts Both Ways
Anything players can break, build, reinforce or take changes the fight for both sides. Every opening is also a way
in, every fortification is salvage not spent on firepower, every sector taken is more line to hold, and no position
stays safe forever.

*Design test*: When debating a destruction, fortification or territory option that helps only the players (a wall the
horde never attacks, a breach that opens a sightline but no route, a sector that gives income but never needs
defending), we add the counter-edge or we cut it.

*Counter-edges added and exceptions logged (A40):* a breached sealed house is not a dead-end pocket; once open it
becomes a horde spawn closet and ingress (system 6). The Sapper's charges damage the panels around them, the squad's
own reinforcements included. **Accepted exception:** friendly fire stays off for player health (A20, accessibility),
so a charge's counter-edge is structural (the route it opens and the fortifications it damages), never squad damage.
**Accepted exception (A57):** places of worship and cemetery headstones cannot be destroyed (sensitivity, R5, A29,
art bible AB-14). They help neither side alone: they block the squad's routes and sightlines as much as the horde's,
places of worship are never sectors, and the cemetery is never a landing zone.

### Pillar 2: You Know This Place
Maps are real places whose street grid, building footprints and public landmarks stay true and keep their real
street and park names, so players recognise real geography and plan around it. Recognition rests on the street
grid, the street names and the parks, plus the regional style of the houses; individual buildings are generic and
never replicas of real ones, and sensitive sites carry generic labels (A29). We curate by choosing the site and
boundary, placing sectors at real landmarks, and adding the gameplay layer, never by moving buildings or streets.
*One logged label exception (A55):* a park whose OSM name repeats a subdivision's name takes a creek or woods label
(U10); on the first map that is Creek Woods. The user can lift it (Q21).

*Design test*: When a map plays badly, we change the playable boundary, the sector placement, the ingress points and
the caches, or we pick a different site, before we ever move a real footprint or street.

### Pillar 3: Weight at Every Range
Every weapon has mass. Bullets fly, drop and take time to land, recoil fights the shooter, and the blade or hammer
swung at the doorway lands with the same weight. Guns own the long axes; melee owns the doorway; neither is the
desperate option.

*Design test*: When debating between convenience and weight (hitscan or projectile, snappy or heavy recoil), we choose
weight unless it makes the horde unreadable in any range band (system 7). When a gun, attachment or upgrade would
make melee strictly worse in every situation, it gets a cost (ammo, noise, handling, reload exposure) or it does not
ship.

*When the two halves conflict, ballistic weight wins* (A40). The user's direction is gun-first (U1, U4). Melee parity
is pursued through situations (doorways, Grabbers, Plated, heavy-melee breaching) and the economy (no ammo drops,
limited crate and supply-point stock, the melee salvage bonus), never by making guns less grounded. If melee misses
its playtest signal even after that tuning, this pillar's melee claim narrows to "melee owns the doorway". The melee
mechanics themselves (swing, block, parry, shove and stamina; U9) are never cut by this clause.
**No exception for the ballistics fallback** (A56): if hit validation misses its budget at M2, the fallback relaxes
the server's check on close-range hit claims and keeps projectiles, drop and travel time at every range (Scope
Tiers), so this pillar's test holds.

### Pillar 4: Four Roles, One Line
The squad is four roles holding one frontline, and each role carries what the others need: revives and heals, ammo,
repairs and early warning. Survival runs through hand-offs. Smaller squads share the missing kit; solo is supported as a
scaled mode but never drives the design. The first milestone is played alone only because one developer can test it
alone (U12): it proves the round loop, and this pillar is first tested at M2 and M4.

*Design test*: When debating a feature that makes one player self-sufficient against one that creates a callout or a
hand-off, we pick the hand-off. **Every fallback stays meaningfully worse than the hand-off it replaces** (slower,
costlier or riskier by a margin a playtester notices): the universal slow actions, the squad-gap kit's light gadgets
(system 2's light values), and a squad of duplicates that leaves a role empty (A35; a full squad of four gets no gap
kit, A53) all obey this.

### How the pillars pull against each other

| Tension | How we resolve it |
| ---- | ---- |
| P1 (no position is safe) vs P4 (fortifying and holding sectors is team labour players want to protect) | Fortification is strong but erodes, and every sector taken stretches the line. Breachers, Detonators and counter-pushes exist so a perfect fortress never stays perfect |
| P2 (real geography) vs balance and fairness | Site selection, sector placement and the gameplay layer are the balancing tools; geometry is not |
| **P3 inside itself: grounded ballistics vs first-person melee** | **Range decides.** Ballistics matter on the long axes (167th Street, the fields, the cemetery) and are irrelevant at 2 m, where melee is faster, free of ammo and pays more salvage. Houses, garages and the woods guarantee close quarters every round. Ammo is finite (no drops; the crate's and the supply points' stock is limited), so melee stays the economy's engine, and the Grabber, the Plated and heavy-melee breaching keep it necessary. If the halves still conflict, ballistic weight wins (Pillar 3) |
| P3 (melee parity) vs the gun and attachment power fantasy | Every attachment is a trade-off along handling, stability and velocity; guns cost ammo, and Later they also make noise |
| **P4 (role interdependence) vs squad-shooter class play with fewer than four players** | Roles make things fast, cheap, mobile or remote; they never make them possible, and every fallback stays meaningfully worse than the hand-off (Pillar 4's test). Universal fallbacks plus the squad-gap kit keep 2–3 player squads whole, and solo has its own kit and tuning, never the reference case |
| P2 (a real ~1.2 km map) vs P4 (only four people) | Sectors concentrate the fight at the frontline; squad spawn and sector spawn cut travel; most houses are sealed |
| Grounded realism (Visual Identity Anchor) vs readability | Readability wins in the close and street bands (2–150 m, system 7): shape language, silhouettes and rim light beat atmosphere, reached by grounded means first. The one non-physical aid is the art bible's bounded **horde readability light** (art bible 2.5, AB-07; A59): horde characters only, off before round 10, faded out by 150 m, never the brightest thing in view. At night the long band is deliberately harder and is carried by motivated light, flares and the Spotter's marks |

### Anti-Pillars (What This Game Is NOT)

- **NOT a PvP shooter.** No PvP modes. Every netcode and balance decision serves co-op PvE, which lets us trust the
  client for melee, parry and projectile hit claims within a tolerance (Pillar 3) and budget the network for the
  horde and destruction.
- **NOT a large-scale combined-arms shooter.** Four players, no large headcounts and no vehicles (U14: offered to the
  user and not selected). We take the squad-shooter feel, not its scale.
- **NOT a mil-sim.** Grounded, not simulated: no wind or spin drift, no medical simulation, no one-life rules. Weight
  serves fun and readability (Pillar 3).
- **NOT a freeform building game.** Fortification reinforces real structures from a short menu; players never place
  arbitrary walls. Freeform building would override real geography (Pillar 2) and explode the scope.
- **NOT an open-world or persistent survival sim.** No hunger or thirst, no searching every drawer, no base that
  carries over between matches. Matches are bounded, and the round loop is the game.
- **NOT a structural physics sandbox.** Destruction is designed, panelized and readable, not physically accurate.
  That keeps it network-synced and makes Pillar 1's consequences readable.
- **NOT a digital twin.** The layout, the street names and the public landmarks are real; the look is realistic; the
  houses are generic. No house numbers, addresses, residents, brands or replicas of real homes (A29). This keeps
  Pillar 2 legally and ethically viable.
- **NOT a vertical meta grind or pay-to-win.** No permanent stat upgrades and no paid power, because round 1 must
  stay a real fight and every player must start equal (Pillars 3 and 4).
- **NOT a story campaign.** Story is emergent, plus environmental context. Authored narrative would compete with the
  round loop for scope.

---

## Visual Identity Anchor

**Direction: "Ground Truth"** (from the user's direction U7; A34 records how it absorbs "Survey Grade"; A41 and A45
record the fixes from AD-CONCEPT-VISUAL rounds 1 and 2)

**Visual rule:** ***"It is the real street on its worst night."*** Grounded realism: the real suburb looks real
(physically based materials, Lumen global illumination, Nanite geometry, realistic light, dust, smoke and heavy weapon
audio), then the horde and the squad's own war slowly take it apart.

**Season: late autumn** (art bible 2.1, AB-05; recorded here by A67): dry, after leaf fall and before the first
snow, with low November light, bare parkway trees, evergreen foundation shrubs and dormant olive-and-tan lawns. It is
the most ordinary-looking version of the real place, it gives an early, fast dusk for the failing light, and bare
canopies open the long sightlines. It is a facilitator call the user can overrule; weather stays out of scope.

**What "the real suburb looking real" means here (U7 against A29; Q23).** The street grid, the footprints, the street
and park names and the regional style of the houses are real; each house is a realistic kit house, never a replica of
the real one at that spot. The facilitator chose this for privacy and legal reasons (A29); the user has not been
asked, so Q23 asks.

**"Combat range" means System 7's three bands:** close (2–30 m: yards, hallways, the woods), street (30–150 m:
residential streets) and long (150–400 m: 167th Street, the fields, the cemetery). Every readability test below is
run per band.

**Supporting principles:**

1. **Honest materials, honest damage.** Every surface is a real suburban material: vinyl or wood siding, asphalt
   shingles, brick veneer, drywall, concrete driveways, dormant lawn. Damage exposes what is really inside (studs,
   insulation, drywall dust, splintered sheathing), never a generic crumble.
   *Design test:* if a damage state shows something the real wall could not contain, rebuild the damage state.
2. **A real kind of house, never a real house.** Recognition (Pillar 2) comes from the street grid, the names and the
   parks, and from the regional and period style of the houses: the local mix of ranch, split-level and two-storey
   homes, brick fronts with sided flanks, attached garages, hip and gable roofs, trees along the street. The style is
   researched from generic public sources about when and how the area was built, never from any specific home (A29).
   *Variation rule:* neighbouring houses never match on all four of kit, cladding colour, roof form and garage side;
   they differ in at least two. *Gate for the realism art pass:* no single-family house renders with a flat roof
   (today 169 gabled footprints fall back to flat; system 6.1), so hip and compound roofs come first.
   *Design test:* if a street reads as copy-pasted at 30 m, or any house reads as a replica of a real one, change the
   kit mix.
3. **Weight you can see.** Dust, smoke, debris, muzzle blast and bounce light sell the mass of weapons and
   destruction, but readability wins in the close and street bands: zombies keep their silhouette and rim light.
   *Design test:* if an atmospheric effect hides a zombie in the close or street band for more than about a second
   without a gameplay cause (a thrown smoke, a collapse), thin it or shorten it.
4. **The light fails as the rounds climb.** Kept from revision 1 (originally "Sodium Hour"), stretched in revision
   2.1 (A41). Round 1 is late afternoon; the light turns golden around round 5; **dusk falls at the first evac window
   (round 10)**; full night arrives around **rounds 15–20**. From then on every light is motivated: moonlight as the
   key light, the suburb's surviving streetlights until they are destroyed, fires from collapses, Detonator blasts and
   burning wrecks, the squad's work lights at held sectors, flares (including supply-drop flares), and muzzle flash.
   Streetlights die as infrastructure breaks; the squad's own lights mark the sectors it holds. **Houses are dark**:
   the power is failing, so porch and window lights are off from round 1 and can never be mistaken for squad light
   (A45).
   *Minimum readability at night, per band:* close: always readable (weapon lights, work lights, muzzle flash);
   street: readable under any surviving streetlight, fire or work light, and a zombie's silhouette never goes fully
   black against the sky; long: readable only where a motivated source lights the axis or the Spotter has marked the
   target, so night makes long range deliberately harder and gives flares and the Spotter a job.
   *Design test:* if a lighting choice makes zombies unreadable in the close or street band, readability (rim
   light, silhouette) wins over mood.
   *Feasibility:* many motivated, shadow-casting lights is a MegaLights case on a listen-server host that also
   simulates. The art bible (`design/art/art-bible.md`, 8.8) defines the non-ray-traced Medium tier as the baseline
   every scene must pass and caps shadow-casting lights per sector view (6 at Medium, 3 at Low); the minimum GPU is due
   before M3's realism pass (R10).
   *Readability aid:* where grounded fixes cannot meet the night minimums, the art bible allows one bounded,
   non-physical aid, the horde readability light (art bible 2.5; tension table above).

**Shape language.** It governs what the game adds to the real suburb; the real suburb keeps its own shapes.

| Rule | What it means | Test |
| ---- | ---- | ---- |
| **The horde reads by silhouette and gait in its band** | Every type is hunched, off-balance or broken in line, never upright like the squad. Long band: the Detonator's swollen, front-heavy torso and slow rocking gait; the Howler's tall, arms-raised, head-back posture and the way it stops to call. Street band: the Runner's low forward lean; the Breacher's oversized shoulders and plodding gait. Close band: the Grabber's long reaching arms; the Plated's flat, slab-like improvised front. The Shambler is the baseline lurch the others are read against | Each type is named from its silhouette (and, in the long band, its gait) alone at the far edge of its band, **under the lighting of the round it first appears in**, against principle 4's night minimums for that band. **Viewing conditions (art bible AB-08, A59):** close band unaided; street band unaided and through a 1–2× optic; long band through the magnified optic, because an unaided figure at 300–400 m is only about 4–6 px tall at 1080p. Shambler, Runner and Breacher are tested in daylight to dusk; the Detonator, Grabber, Plated and Crawler between dusk and night; the Howler at night, lit only by a motivated source or a Spotter mark |
| **Roles read by kit, at 30–80 m** | Squadmates are upright and carry their role on back and hips: Corpsman, a bulky medical pack and leg pouches; Quartermaster, a crate frame with ammo cans; Sapper, a long-handled tool and a charge bag; Spotter, a sensor mast and a scope case. The art bible (3.3) sizes each primitive to survive about 22 px at 80 m and keeps it through prone, slide, vault and mantle. The HUD uses Holdout's own role icons, never the reference series' class icons (U1) | A playtester names each squadmate's role from silhouette at 80 m, unaided, with the HUD off |
| **Plumb is real; askew is ours** | Real construction is plumb and level. Everything the fight adds or breaks (boards, Sapper bracing, breaches, rubble, deployables) is off-axis, angled and improvised. Who owns a structure is not shown by its angle: the meaning layer's yellow infrastructure marker shows what the squad owns | A player can tell what the fight has touched (by either side) from the untouched real house in a still frame |
| **Every panel state changes the outline** | Intact: a clean, continuous edge. Damaged: a bowed or cracked edge with trim missing. Breached: a jagged hole with light through it. Destroyed: gone, with stud stumps. Reinforced (flag): diagonal bracing and plates that cross the panel's outline | "Which wall is weakest" reads on vinyl siding at 30 m at dusk without relying on surface texture |

**The map shows through, on the map only.** Kept from "Survey Grade": the tactical map, sector board and HUD use a
cartographic language (footprint outlines, sector linework, OSM-style street hierarchy with real street names). This
is Holdout's own UI identity; no UI look is borrowed from any reference game. The world itself is not stylised.

**Color philosophy.** There are two layers, and the meaning colours apply to only one of them.

- **The world layer** is the real suburb: natural, physically based materials under real light, with no stylised
  global grade. Mood comes from time of day, smoke and dust. Dormant olive-and-tan lawns, green street-name signs,
  yellow centre lines and school-zone signs, red brick and stop signs all keep their real colours: **meaning colours
  are never enforced on world surfaces.**
- **The meaning layer** is what the game adds: UI, markers and pings, and the lights, emissives and VFX the game
  places. The meaning colours are reserved here only:

| Color (meaning layer only) | Meaning | Non-hue cue (always present) |
| ---- | ---- | ---- |
| Saturated red | **Danger**: breach warnings, explosives, structural failure, a downed squadmate | Pulse plus a hazard-stripe outline |
| Clean cyan | Squadmates, squad pings and UI | Chevron marker; Holdout's role icons |
| Sickly green-grey | The horde: horde-held sectors on the map, spotted-zombie markers | **Survey tick**: a notched, hatched triangle drawn from the tactical map's cartographic language (never a diamond, A45); hatched fill on the map |
| Road-marking yellow | Player infrastructure: supply points, armories, workbenches, deployed gadgets, fortifications you own | Square marker; solid outline |
| Sodium amber (about 2,000 K) | Light the squad places: work lights at held sectors, flares | **Steady** (never flickers), mounted on a visible mast or housing, throwing a defined cone; optionally the near-monochrome low-pressure-sodium look that drains colour from what it lights. The HUD repeats it with the held-sector icon |

- **Precedence when meanings overlap:** danger > squad > horde > infrastructure. A marker's **shape** says who owns
  it and its **colour** shows the highest meaning: a spotted Detonator is a horde survey tick in danger red; a downed
  squadmate is a squad chevron in danger red, pulsing.
- **The world's own lights are not ours (rendering rules, A45).** The suburb's streetlights render cool white (about
  4,000 K) whatever the real fixtures are; this is a rendering rule, not a claim about the real place. Houses are dark
  (principle 4). Fire from collapses, Detonator blasts and burning wrecks is also warm (about 1,800–2,200 K), so hue
  alone cannot mark squad light: fire **flickers, runs red-orange and always comes with smoke**, and muzzle flash is a
  brief burst. The squad's light is the only warm light that is steady, mounted and coned.
- **Colour-blind safety:** red against green-grey and cyan against green-grey are common confusion pairs, so no
  meaning relies on hue alone (see the non-hue cues above). Road-marking yellow and sodium amber sit side by side in
  the HUD (infrastructure markers next to the held-sector icon) and merge for protanopes and deuteranopes, so the art
  bible separates them **by value** as well as by shape. The art bible checks every marker with colour-blind
  simulation.
- Weather (rain, fog, wet surfaces) is not part of the anchor and is in no milestone (Scope Risks).

**Directions considered and not chosen:**
- **"Survey Grade"** (revision 1's anchor; rule: *the map shows through*): a stylised massing-model world. Superseded
  by U7 because simplified massing fights realism, and its "damage is the only diagonal" and "organic means enemy"
  principles cannot survive real gabled roofs, woods and lawns. Kept: the cartographic map and HUD, and the failing
  light.
- **"Last Broadcast"** (rule: *it happened here, on camera*): grounded, near-photoreal. Its grounded look is now
  adopted in spirit; its emergency-broadcast UI is not. Revision 1 rejected it for cost, uncanny repetition of
  procedural buildings, and digital-twin pressure. Those are now risks with mitigations (R10, R5), not vetoes, because
  realism is the user's decision.
- **"Sodium Hour"** (rule: *light is territory*): its lighting rule survives as principle 4 ("The light fails as the
  rounds climb").

---

## Inspiration and References

*These games are named for comparison only. Holdout copies no names, characters, art, maps, branding, class or mode
names, UI or look from any of them. It uses generic genre conventions (round structure, buying weapons in the world,
generic military role archetypes) and does **not** reproduce any game's signature branded mechanics (specific perk
vending machines, a mystery box, and so on).*

| Reference | What We Take From It | What We Do Differently | Why It Matters |
| ---- | ---- | ---- | ---- |
| ***Battlefield*** **series** (mechanics and feel reference only, U1) | The feel of its squad play: four role archetypes with signature gadgets (revive and heal, resupply, repair, demolition, spotting); squad revive, spawning on squadmates, spotting, squad orders and resupply; projectile ballistics with drop and travel time; heavy recoil; attachments with trade-offs; committed movement (sprint, crouch, prone, vault, mantle, slide); capture-and-hold sectors with a moving frontline; heavy weapon audio, dust, smoke and destruction | Four-player co-op PvE against a horde instead of large-scale PvP; our own role names (Corpsman, Quartermaster, Sapper, Spotter), gadget names (A58) and role icons (art bible 7.4); orders without a squad-leader rank (A63); controller-only (U11); no vehicles (U14); real OSM suburbs; deep melee; rounds and evac. No names, characters, art, maps, branding, class names, mode names or UI look are taken | Validates the squad / role / ballistics loop as a long-lived, much-loved feel |
| *Call of Duty* Zombies mode | Round-based escalation; points for hits and kills; buying weapons in the world | Real maps, capture-and-hold sectors, two-edged destruction, deep melee, roles, evac windows | Proves round-based co-op survival sustains long sessions and a devoted audience |
| *Killing Floor 2* | Wave co-op with a spending intermission; perk-based roles; gory feedback | Armories at held sectors instead of a trader; fortification and demolition sinks; gadgets instead of stat perks | Validates a between-wave economy as the strategic layer |
| *Warhammer: Vermintide 2* | First-person melee and guns against hordes in four-player co-op; push and stamina; crowd feel | Parry-centric directional melee; grounded ballistics; a frontline on one map rather than mission traversal | Proves first-person melee against hordes is satisfying and sells |
| *Chivalry 2* | Directional swings, parry timing, stamina in first person | PvE simplification: no feints or morphs; zombies telegraph | Best reference for directional melee feel |
| *Rainbow Six Siege* | Destruction as a two-edged tactical layer: reinforce versus breach, soft walls | Horde versus players; damage persists and accumulates over rounds | Validates "every wall cuts both ways" as deep and readable |
| *The Finals* | Server-driven destruction that every client sees | Panelized and persistent; PvE; tuned for budgets an indie can afford | Proves networked destruction is a marketable headline feature |
| *Deep Rock Galactic* | Four-player co-op interdependence between roles; synced destructible terrain; horde waves; an indie success | Urban real-world maps; round-based holdout with sectors | Validates indie co-op horde games with roles and environmental destruction |
| *Microsoft Flight Simulator* (2020) | Buildings generated from OSM-style data at world scale; the "find my house" pull | Ground-level, playable, destructible, with a gameplay layer | Validates the recognition hook and shows the quality ceiling of auto-generated buildings |
| *7 Days to Die* | Horde nights against fortifications | No freeform building (anti-pillar); bounded matches | A counter-reference: what we deliberately avoid |

**Non-game inspirations:**
- Siege films (*Assault on Precinct 13*, *Night of the Living Dead*): the last stand in an ordinary building.
- *28 Days Later*: familiar, emptied streets.
- Photography of storm-damaged wood-frame houses: how real suburban houses actually break.
- Combat documentary footage: dust, smoke, the crack of rounds passing and the thump that follows.
- Survey cartography and OSM rendering styles, for the tactical map.
- The pacing and sound of emergency broadcasts and civil-defence sirens: **audio and round pacing only**. No
  broadcast-style UI; the HUD stays cartographic (Visual Identity Anchor).

---

## Target Player Profile

| Attribute | Detail |
| ---- | ---- |
| **Age range** | 18–35 (core). An M / PEGI 18 rating is assumed for gore (Q6) |
| **Gaming experience** | Mid-core to hardcore; comfortable with FPS controls and with team roles |
| **Time availability** | 1–2 hour evening sessions with a friend group on weeknights; longer high-round attempts on weekends |
| **Platform preference** | PC on Steam, played with a gamepad (U11); voice chat on Discord |
| **Current games they play** | Large-scale squad shooters (the series named in Inspiration and References), *Call of Duty* Zombies, *Killing Floor 2/3*, *Vermintide 2* / *Darktide*, *Deep Rock Galactic*, *Back 4 Blood*, *The Finals* |
| **What they're looking for** | Squad-shooter feel (roles, gadgets, weighty guns) in a co-op horde game, with depth in both guns and melee, an arena that changes because of what the squad did, and a real place to hold. Plus the novelty of "that's a real town" |
| **What would turn them away** | Floaty or hitscan-feeling guns; shallow melee; roles that make a group of friends feel forced into a composition; empty oversized maps; bad netcode (rubber-banding, missed parries, rejected hits); grind for power or pay-to-win; repetitive procedural-looking houses; too little content for the price; dead lobbies for players without a full group |

---

## Technical Considerations

| Consideration | Assessment |
| ---- | ---- |
| **Recommended Engine** | **Unreal Engine 5.8, C++ and Blueprint.** This is the user's choice (U9) and is recorded as given. `/setup-engine` configures it against the pinned reference in `docs/engine-reference/unreal/`. Systems in scope: GAS, replication (Iris is production-ready in 5.8 per the release notes; the plugin still carries a Beta flag; Network Prediction gained optional Iris support), Chaos Destruction (Geometry Collection plugin is **Beta** in 5.8), Enhanced Input and Common UI (unified in 5.8; `modules/input.md`), World Partition, PCG (production-ready since 5.7), Geometry Scripting. Rendering: Lumen (default global illumination), Nanite (virtualized geometry), MegaLights (production-ready in 5.8; needs hardware or software ray tracing support), Lumen Lite (Beta; a medium-quality GI setting), Substrate materials (on by default since 5.7). Mass and StateTree are candidates for the horde (MassGameplay and MassCrowd are **Experimental** in 5.8). Sources: `docs/engine-reference/unreal/modules/rendering.md` and `modules/networking.md` |
| **Key Technical Challenges** | 1) Synced, persistent destruction plus navigation updates on a listen-server host, now across a ~1.2 km map. 2) Horde count against replication and server CPU. 3) **Projectile ballistics**: hit validation with travel time on a listen server, and the feel of drop and recoil. 4) Feel and netcode of first-person melee and parry. 5) **Squad systems**: revive, squad spawn safety, gadget replication, sector objective state, late join. 6) Quality of the OSM-to-level pipeline, including interiors OSM does not describe, inferred heights and rule-based cover. 7) **Grounded-realism rendering** (Lumen, Nanite, MegaLights, dust and smoke) on a host that also simulates AI, destruction and projectiles. 8) World Partition streaming and navmesh over 1.44 km², where the listen-server host must keep collision, navmesh and panel state loaded for the union of all four players' locations and every active zombie while it also renders. 9) **Controller aim with projectiles** (U11): aim assist that helps a stick track a target without leading it or compensating for drop. 10) **Predicted traversal** (vault, mantle, slide, prone) in networked character movement, with horde nav links over generated fences |
| **Art Style** | 3D grounded realism ("Ground Truth") |
| **Art Pipeline Complexity** | **High** (custom 3D, raised by U7), and the part of the game one developer can shortcut least. **There is no art team and no outsourcing (U12):** the slice is built from marketplace kits, photogrammetry-library surfaces and props (generic, never scans of the real homes), Epic's sample animation, sound libraries and the developer's own modular pieces, and the content list is sized to that. The Early Access candidate needs a modular suburban house kit with variation, interior room templates, damage states per panel and material, lawns, hedges, yard trees and woods foliage, four zombie types, four guns with their attachments, two melee weapons, five gadgets, and first-person animation sets for all of them (MVP Definition) |
| **Audio Needs** | **Adaptive and heavy.** Music that tracks round intensity. Positional horde audio is critical to gameplay (where they come from). Heavy weapon audio: distance-dependent report and tail, slap-back off house fronts, the crack of rounds passing close. Layered destruction audio. Through M5 it comes from sound libraries, mixed by the developer; a bespoke pass is Later |
| **Networking** | **Client-server.** A listen server (player-hosted through Steam) from M2; M1 runs the same server-authoritative code single-player; dedicated servers optional later. The server owns rounds, sectors, the economy, panel states, revives, spawns and the AI; the client predicts movement, its own projectiles, melee and gadget throws. Details below |
| **Content Volume** | **Early Access candidate (M5):** one slice of one map (four sectors, 6–8 enterable houses), 4 roles with 5 gadgets, 4 zombie types, 4 guns, 9 attachments in 3 slots, 2 melee weapons. **Long-term goals, each added only after the last is fun (Later):** the full first map, 9 gadgets and role passives, ~10 zombie types including bosses, ~14 guns, ~40 attachments, ~8 melee weapons, further cities. Replay comes from rounds, sectors, roles and builds; a typical match is 45–75 min |
| **Procedural Systems** | The editor-time OSM pipeline (buildings, streets, ground cover, backdrop); rule-based cover set dressing (fences, hedges, yard trees, wrecks); generating interiors from room templates; auto-proposing the gameplay layer (sectors, ingress, caches, landing zones); random supply drops. Much later, possibly the same pipeline exposed to players ("Your Street") |

**Netcode** (concept-level; each becomes an ADR; M1 builds each path single-player and M2 proves it online):

| System | Authority | What replicates | Budget (estimate, to be confirmed at M2) |
| ---- | ---- | ---- | ---- |
| **Projectile ballistics** | The shooter's client simulates its own projectiles (fixed-step, gravity and drag) for instant tracers and impacts, and sends a **fire event** at trigger time and a **hit claim** on impact. The server re-simulates the claimed trajectory, checks the target against a history of zombie positions whose **rewind window is sized per client** from measured ping plus interpolation delay (capped at about 400–500 ms), checks rate of fire and ammo, then applies damage. Panel hits become panel-state deltas on the destruction channel. **Stale panel state:** if a panel was breached or reinforced while the bullet was in flight, the server judges the claim against its own panel state at the impact time, and the client receives a correction (the impact moves) | Fire events (weapon, time, origin, direction, seed) to relevant clients, unreliable; other clients draw cosmetic projectiles and never decide hits. Hit claims to the server, reliable | About 20 bytes per fire event; under 2 KB/s per client with four players on full auto |
| **Health, downed, revive and heal** | Server (damage, recovery, heal pools) | Health, downed state, bleed-out timer, revive and heal progress (the bars are predicted on the reviver's client), the Corpsman's heal pool, the squad order | Negligible |
| **Squad spawn and sector spawn** | Server checks eligibility (alive, not downed) at request time; if the squadmate is pressed it searches for a navigable safe point up to about 25 m behind them for up to 5 s, then falls back to a held sector (A39) | Spawn request and result; redeploy timers | Negligible |
| **Gadgets** | Server spawns deployables; the thrower's client predicts the throw arc | Deployable actors (owner, charges, health); charge counters on players | Small: at most about 8 deployables per squad |
| **Ping and spot** | Server validates line of sight cheaply and owns marker lifetimes; the sensor's spotted set is computed on the server at about 4 Hz | Marker list to the squad, bounded (at most 16 spotted zombies) | Tiny |
| **Sector objectives** | Server state machine per sector | Owner, state, capture progress, squad and horde counts: about 3 bytes per sector, sent on change and at about 4 Hz while contested | Under 30 bytes for 6–8 sectors |
| **Late join / reconnect** | Server | Snapshot of sectors, squad state and panel states (with reinforce flags, boards, deployables and rubble) | About 16–24 KB for the first map (estimate in system 5) |
| **Total, all channels** | — | Movement, zombies (full and far tier), fire events, destruction deltas, sectors, markers | Starting budgets for M2 to confirm or revise: **under 48 KB/s down per client**, and **host upstream under 150 KB/s** (about 1.2 Mbit/s) for three remote clients |

**Not sourceable yet.** How Nanite handles animated foliage (wind) in 5.8 is NOT SOURCEABLE: the "Nanite Limitations"
in `docs/engine-reference/unreal/modules/rendering.md` (no world position offset) were written against 5.7. The art
bible does not depend on it: its baseline for Creek Woods (an M5 sector) is non-Nanite instanced foliage with
wind, and moves to Nanite only if a 5.8 test verifies wind (art bible 8.7, T3). No engine-level lag compensation
for projectiles is documented in `docs/engine-reference/unreal/`; the validation scheme above is our own and needs an
ADR.

---

## Risks and Open Questions

### Top risk register

| # | Risk | Likelihood / Impact | Mitigation | Proof point |
| ---- | ---- | ---- | ---- | ---- |
| R1 | **Netcode cost of replicated destruction.** Panel states, navigation updates and late-join snapshots; about 22,000 panels if the whole map is ever panelized | Medium / High | Replicate gameplay state, not physics; one replicated state owner per building from M1 (system 5); debris is cosmetic and local; nav links and modifiers switch per panel instead of rebuilding the navmesh; through M5 wall panels exist only on the buildings that carry the fight, so the tested set is a few hundred panels | M2: 4 clients, 100+ panel changes in a round, under 10 KB/s per client for destruction traffic, no desync after a reconnect, and a path update after a breach in under 200 ms with no navmesh tile rebuild |
| R2 | **Horde count vs replication and server CPU, on a listen-server host that also renders** | High / High | Active cap of 24 plus a queue; lightweight movement; Iris prioritisation and relevancy; animation budgeting; headless-capable server code; the far-zombie tier and Mass only Later | M2: 24 active zombies plus 4 players at 60 fps on the developer's machine as host, with total bandwidth inside the netcode table's budgets. M3: the same in the art-passed slice at night with smoke |
| R3 | **OSM data quality and licensing** | High / Medium | First map measured: 0% height tags, no fences or trees, no shop types, flat. Fallbacks: height by type and area, rule-based cover, sector armories, polygon repair, a completeness score for each site; ODbL attribution; the Derivative Database question answered before any public build (Q3). The pipeline result (about 1.6 s of stage time; system 6.1) is a standalone prototype writing a blockout mesh, not a UE 5.8 bake | The first map's geometry converts with zero hand edits in about 1.6 s (committed `metrics.json`, re-measured 2026-11-19); **the first UE 5.8 bake, of M1's slice** (collision, navmesh, the hand-placed gameplay layer), is M1 work; the licence answer before M5 |
| R4 | **First-person melee feel** (parry over latency, readable telegraphs, animation volume) | Medium / High | PvE simplification; parry judged client-side within a server tolerance; telegraph-first zombie animation; melee is felt first in M1's feel room, on marketplace and Epic sample animation, before any other system is built; one melee weapon until it is fun | M1: testers rate melee as viable as the gun (M1's proof). M2: hits and parries hold at 200 ms |
| R5 | **Real-place sensitivity.** Violence and destruction in a recognisable real town, shown by name, with a school and a cemetery among the sectors. There is precedent: a 2006 console shooter drew a formal complaint from a cathedral it depicted | Medium / Medium | The A29 safeguards: generic houses, no addresses or house numbers, generic labels and rendering for sensitive sites, no zombies from graves, no child zombies, no municipal insignia; nothing new in the repository singles out a location (U13; system 6.1). The School Grounds sector (OSM tags the school as a kindergarten) is the most sensitive element of a US-set shooter: it never appears in marketing, and Q16 decides whether it stays a sector at all | Q16 answered before M1's slice is baked; a written real-place policy before any public build (M5) |
| R6 | **Market saturation of zombie co-op** | High / Medium | Show the hook in 10 seconds of trailer: a real town's street sign, a squad taking a park, a house front coming down. Public matchmaking and solo for players without a group (M5) | Wishlist and playtest-signup response to the first trailer, cut from the M3 slice |
| R7 | **Solo scope (U12).** Five hard systems, one person, close to zero cash, unknown hours a week. The usual failure is not a late date but a project that never reaches a fun build | High / High | Outcome milestones with a proof each; M1 is the smallest build that tests the loop; nothing is added until the milestone before it is fun; engine systems instead of custom ones (GAS, Enhanced Input, Common UI, built-in replication, StateTree, PCG); marketplace and sample content instead of bespoke; a cut order per milestone; permanent cuts go to the user (P1–P4) | M1 reached inside its effort range, or the ranges and the plan are revised before M2 starts |
| R8 | **Projectile ballistics over the network.** Rejected hits feel like lag; validating travel-time shots against moving zombies on a listen server costs CPU | Medium / High | Client-simulated projectiles with server validation against a per-client rewind window (ping plus interpolation delay, capped at about 400–500 ms; A28); a stale-panel rule (netcode table); PvE tolerance; the fire-event and hit-claim path exists from M1, with validation as a pass-through; fallback: relaxed validation of close-range claims, with projectiles kept everywhere (A56) | M2: 95% or more of client hit claims accepted at 100 ms simulated latency and 90% or more at 200 ms; fire-event traffic under 2 KB/s per client |
| R9 | **One person cannot test four-player co-op alone**, and AI tools cannot play the game | High / Medium | Single-player first (M1); a two-client Play-In-Editor run with network emulation every week from M1's first week; two players before four at M2; playtest evenings with three other people are part of M2's and M4's proof, planned ahead; an automated bot session for desync checks before M5 | M2's and M4's playtest sessions happen with real people |
| R10 | **Grounded-realism cost and performance.** Realistic houses repeated along a street can look uncanny; Lumen, Nanite and many motivated night lights (MegaLights needs ray-tracing support) run on a host that also simulates; one person assembles the kit | High / High | The realism pass covers two sectors first (M3), from marketplace kits, photogrammetry-library surfaces and the developer's own modular pieces, with the neighbour variation rule (Visual Identity Anchor, principle 2); hip and compound roofs before the pass; scalability tiers including Lumen Lite (Beta); a non-ray-traced lighting path, a cap on shadow-casting lights per sector, and a minimum GPU set before the pass | M3: the two-sector slice art-passed from late afternoon to night, at 60 fps on the developer's machine as host, passing the art bible's Medium-tier tests |
| R11 | **Map scale vs four players.** The full 1.2 km map can feel empty, with dead time spent travelling | Medium / Medium | The slice grows one sector at a time and only while each size plays well; the frontline concentrates the fight; squad spawn and sector spawn; sectors 150–400 m apart; the linear sector-chain fallback | M4 and M5 telemetry: under 15% of match time spent travelling out of combat. The full map is built only if the M5 slice passes (see proposed cut P2) |
| R12 | **Proximity to the squad-shooter reference.** "Feels like X" must never become "copies X" | Low / High | Own role and gadget names, no mode names, no UI look or HUD layout, no branding; reference named only in Inspiration and References and in decision U1; an IP checklist before any public material that covers **names** (roles, gadgets, zombie types, sectors and modes; A58) and **HUD layout and iconography** (role icons, ping and spot markers: Holdout's survey tick, never a diamond, A45; the Quartermaster's icon is a frame pack, not cartridges, art bible 7.4). Anything new added to a public prototype follows the checklist too; the existing greybox is a throwaway and not authoritative (system 6.1) | IP checklist passed before the first trailer and before any new public playable build |

### Design Risks
- Fortification could become a dominant "turtle" strategy that breaks Pillar 1. Mitigation: Breachers, Detonators and
  counter-pushes erode it, the cost of reinforcing scales up, evac needs a landing-zone sector, and supply drops pull
  players into the open.
- Capture-and-hold could spread four players too thin, so the game turns into running between sectors. Mitigation:
  the spawn director focuses pressure; Dig In is always available; the linear sector-chain fallback.
- One role could become mandatory ("no Corpsman, no run"). Mitigation: universal fallbacks; roles make things faster,
  not possible; playtest the win rate of squads missing each role. The heal (A61) raises the stake for the Corpsman,
  so recovery to 50 health and the supply point's full refill keep a squad without one alive, and the ceiling (50)
  and heal pool (300) are the first knobs if playtests show either "no Corpsman, no run" or "the Corpsman has nothing
  to do between downs".
- Squad orders could be ignored, or turn into a chore. Mitigation: they cost nothing to follow, pay a salvage bonus,
  default to the intermission vote, and need a second player to change mid-round (A63); the M4 playtest logs how
  often squads fight inside the ordered sector.
- Endless escalation may still produce sessions that run too long. Mitigation: evac windows give the squad a choice
  about when to stop.
- Real geography may produce dull layouts (wide suburbs, long empty arterials). Mitigation: site-selection criteria,
  sector placement and boundary choice (Pillar 2's design test).
- Melee may be ignored once guns are upgraded and the Quartermaster keeps everyone fed (Pillar 3 failure). Mitigation:
  finite crate stock, no ammo drops, the melee salvage bonus, Grabber and Plated moments, heavy melee as a destruction
  tool, close quarters by geography.
- Ballistics realism could hurt readability or fun against fast zombies. Mitigation: drop only matters beyond about
  150 m, and aim assist, optics and target speeds are tuned first; scaling velocities needs the user's approval (P3).
- Solo play may feel hollow because the game is built around hand-offs (Pillar 4). Mitigation: the solo kit and solo
  tuning (M5), plus public matchmaking for quick play. M1's single-player build tests the round loop, not the squad.
- Squads may still park one player out of the fight as a safe spawn point, which pulls against Pillar 4's hand-offs.
  Mitigation: A39 (pressure delays and offsets the spawn, never blocks it); the M2 playtest watches for it.
- Sectors narrowed from the user's wording (CD-PILLARS round 1): U6 says sectors are real intersections, blocks and
  parks. Mitigation: the first map proposes two intersection and two block sectors, and the slice holds an
  intersection, a block, a park and open grounds by M5 (6.1, A54); Q17 lets the user change the block count.
- The horde might only ever push the line through Overrun, which would make the frontline the squad's alone
  (U6 asks for a frontline the horde pushes against). Mitigation: counter-push rounds target a held sector (system 1,
  A54), and every other round has a pressure sector that takes at least a third of the spawns (A62). M4's proof
  measures it: half of sessions lose a sector, and the horde reaches a held capture zone in most rounds.
- Vault, mantle and slide could let the squad outrun or out-climb the horde and trivialise yards. Mitigation: the
  horde crosses the same fences through nav links (system 11); mantles are slow and holster the weapon; slides cost
  stamina that melee needs.
- Controller-only aim (U11) could make 300 m projectile shots feel unfair on a stick. Mitigation: aim assist that
  slows and follows but never leads or compensates for drop; recoil tuned for sticks; M1 measures gun feel and drop
  compensation on a gamepad.
- The night curve could still hide too much at long range (AD-CONCEPT-VISUAL round 1). Mitigation: the curve is
  stretched (night arrives around rounds 15–20) with motivated light sources and per-band readability minimums
  (Visual Identity Anchor, principle 4). M1 has a greybox time-of-day curve and blockout proportions for its three
  zombie types, so the per-band silhouette test first runs in greybox; the 80 m role test runs on blockout role-kit
  packs at M4 (A45).
- Squad light could be mistaken for fire at night, which would erase the anchor's signature image (warm, steady pools
  of light at held sectors in a cool, failing suburb). Mitigation: squad light is steady, mounted and coned; fire
  flickers, runs red-orange and comes with smoke; houses are dark (A45). The art bible verifies it at night.
- An OSM subdivision name could reach player-facing text through OSM labels (U10). Mitigation: no map name, sector
  label or slice name uses one; the wooded park is labelled "Creek Woods" (the one logged exception to real park
  names, A55, Q21); the tactical map draws only street names and sector labels, and the pipeline's label filters
  (A29) never promote a subdivision, place or institution name to a label.

### Technical Risks
- R1, R2 and R8 above. All are budget problems on a **listen-server host**, which must also render (R10) and keep
  collision, navmesh and panel state loaded for the union of all four players' locations. Server code stays
  headless-capable from day one so a dedicated server remains a build target, not a rewrite.
- **Navigation after destruction.** Rebuilding the navmesh at runtime is expensive. Pre-baked nav links and modifiers
  per panel are the plan, placed **only for enterable buildings and the outer ring of sealed-house pockets**. M2 pass
  criterion: a path update after a breach in under 200 ms with no navmesh tile rebuild. Through M5 the slice is small
  enough to stay loaded on the host; streaming navmesh tiles through World Partition across 1.44 km² is a full-map
  problem (Later), and so are rubble ramps for Crawlers, which need authored nav per rubble state.
- **Spawning out of sight** on open fields and 167th Street, with magnified optics and a sensor. Mitigation:
  hand-placed spawn closets per sector and the "not within line of sight inside 80 m" rule (system 1).
- **Long-range targets vs the active cap.** A Shambler crossing 300 m of open ground takes minutes; full actors out
  there would starve the doorway fight. Mitigation: the far-zombie tier (system 9), built Later with the full map's
  long axes; through M5 the slice's longest shot is about 175 m and full actors cover it.
- **Chaos Destruction is Beta in 5.8.** Use Geometry Collections only for cosmetic fracture and debris; keep
  gameplay state in our own panel system so a change in Chaos cannot break gameplay.
- **The project configuration disagrees with this document.** `.claude/docs/technical-preferences.md` still lists
  "Chaos Destruction (Geometry Collections) for buildings" and a target of "up to ~100 active zombies". This document
  governs (Chaos is cosmetic only, system 5; the active cap is 24 through M5 and 48 as a Later target, A13). The technical
  director reconciles the file with `/settings` before any budget review or architecture work (art bible AB-19).
- **Mass is Experimental in 5.8**, and 5.8 reworked it. Do not build the horde on it.
- **Interiors.** OSM has no interior data, so generated interiors (suburban room templates) are a large hidden scope
  item. Fitting templates into real, irregular footprints is a hard procedural problem (169 of 693 gabled footprints
  on the first map are not near-rectangles). Mitigation: enterable houses are restricted to near-rectangular
  footprints by rule; the 2–3 of M1 and the 6–8 of M5 are hand-fitted, and no interior generator is built before the
  full map (A30).
- **Night lighting.** Night by rounds 15–20 with streetlights, squad work lights, fires and muzzle flash is a
  many-shadowed-lights case. MegaLights needs ray-tracing support per the pinned reference, and Lumen Lite is Beta, so
  the minimum spec is undecided. Mitigation: a non-ray-traced lighting path in the art bible, a cap on shadow-casting
  lights per sector, and the minimum GPU set before the realism art pass (R10).
- **Memory and streaming.** Hundreds of procedural houses, each with damage-state meshes and realistic materials.
  Shared modular kits, instancing and Nanite are required.
- **Nanite foliage** for Creek Woods (an M5 sector) is NOT SOURCEABLE in the pinned reference yet (see Technical
  Considerations).
- **Late join, reconnect and host migration.** Late join is feasible thanks to compact state. Through M5 a host
  quitting ends a 45–75 minute match, a retention risk. Mitigation, Later: the intermission checkpoint and "resume
  from last intermission" with a new host (system 10). Full host migration stays out of scope.
- **UE 5.8 is newer than the model's training data.** Verify every engine API against
  `docs/engine-reference/unreal/` (TD-ENGINE-RISK at architecture).

### Market Risks
- R6 above. Competitors include free and well-funded options: annual zombie modes, *Killing Floor 3*, *Back 4 Blood*,
  *World War Z*, *Darktide*, and many indie survival games.
- Leaning on a AAA squad shooter's feel invites comparison with its production values. Lead marketing with the hook
  (a real town, two-edged walls), not the feel.
- Four-player co-op purchases depend on friend groups, which caps the number of solo buyers. Public matchmaking and
  a solid solo mode partly offset this.
- R5 above. Controversy over real places could cut either way.

### Scope Risks
- **One person, five hard systems** (U12): destruction netcode, horde AI, first-person melee, gunplay with ballistics
  and attachments, and the OSM pipeline, with the squad layer on top. No calendar is promised. The plan is a sequence
  of outcome milestones with effort ranges in full-time-equivalent weeks, and calendar time depends on hours per week,
  which are unknown (MVP Definition).
- **What one person cannot build, and what the plan does instead:** replicated physics destruction (never; panel
  states, system 5); four roles with nine gadgets (five gadgets at M4, the rest Later); a dozen guns (one at M1, four
  by M5); several maps (one slice of one map through M5); bespoke launch-grade audio and animation (marketplace,
  sound-library and Epic sample content, retargeted and mixed by the developer).
- **Animation volume** is the content cost that scales worst: first-person sets per weapon and gadget, melee sets,
  revive, and zombie locomotion, telegraphs and hit reactions. Mitigation: each weapon or gadget added must reuse an
  existing first-person set or bring a marketplace one, and the zombie types share one skeleton.
- **Playtesting needs people.** One person can test M1 alone; M2 and M4 need three other players for whole evenings.
  A milestone's proof is never met by the developer's own play alone (R9).
- **AI tools change the cost of code more than the cost of content.** They help with C++, tooling, tests, data and
  documents. They do not replace playtesting, in-editor art, lighting, animation and feel work, or checking UE 5.8
  APIs against the pinned reference (MVP Definition).
- **Controller-only on PC** (U11) narrows the PC shooter audience that expects mouse aim. The store page says so
  plainly; gun feel is measured on a gamepad from M1.
- **The realism pass is the likeliest work to stall, and it cannot be skipped:** a greybox suburb fails U7, so no
  greybox build ships. The bar that is never cut is one art-passed slice of the first map (M3, extended at M5).
- **Cash.** The plan assumes close to zero: free and low-cost marketplace assets and sound libraries, and Steam's app
  fee before M5. Anything else that costs money (a legal opinion on Q3, paid playtests, a bespoke audio pass) is a
  question for the user, never an assumption.
- Weather (rain, fog, wet surfaces) is in no milestone. Vehicles are out of scope (U14).
- Q6 (gore and rating) is an open user decision that changes the dismemberment work.

### Open Questions

| # | Question | How we answer it |
| ---- | ---- | ---- |
| Q1 | ~~Which real place is the first map?~~ **RESOLVED 2026-11-19 by the user (U8, U15): "Tinley Park, IL (60477)".** The box and the name are confirmed. OSM completeness is scored (system 6.1: footprints good, heights absent, no cover or shop data) and sensitive sites are handled by A29 | Closed. The level GDD confirms sector placement inside the box |
| Q2 | ~~What are the actual team size, budget and runway?~~ **CLOSED 2026-11-19 by the user (U12): "Just me, with AI tools."** | Closed. The plan is re-cut for one person (MVP Definition); the gates re-run on it |
| Q3 | ODbL: does shipping processed OSM data create a Derivative Database with share-alike duties? What exact attribution does a game need? Any issue with using a real town's name and its street names commercially? (Could not be re-verified online in revision 1.) | The developer reads the ODbL and the OSM Foundation's attribution guidelines and records the conclusion **before any public build (M5)**; a paid legal opinion is a cash decision for the user |
| Q4 | Is an active-zombie cap of 24 enough to feel like a "horde"? | M1 for feel, M2 for the budget |
| Q5 | One currency or two (salvage plus materials)? | Playtest the single currency through M4; revisit before M5 |
| Q6 | Gore level and target age rating (M / PEGI 18 assumed) | User decision; it affects dismemberment scope |
| Q7 | Is the hook really novel? (No web research was possible in revision 1.) | Competitive research (`/competitive-brief` or manual) before marketing copy |
| Q8 | "Your Street": ever? Is runtime generation (shipping the pipeline in the game) worth the cost? | Not before the full first map exists; then decided with the sensitive-site policy |
| Q9 | Early Access or a straight 1.0 launch? | The solo plan aims at an Early Access candidate (M5); the user decides at M3, with wishlist data |
| Q10 | How is melee direction chosen on the gamepad (U11): the right stick's motion at the moment of the swing, or a held modifier? | M1 A/B test |
| Q11 | ~~Vehicles?~~ **CLOSED 2026-11-19 (U14):** offered to the user as an option and not selected. Out of scope | Closed |
| Q12 | Is a ~1.2 km map right for four players, or should the playable area stay smaller? | M4 and M5 telemetry on travel time (R11); see proposed cut P2 |
| Q13 | Muzzle velocities are real-world (U4, A56). If playtests on sticks find drop unreadable inside about 400 m even after aim assist, optics and target speeds are tuned, should velocities be scaled down? | **User decision** (proposed cut P3), never a tuning call. Until then velocities stay real |
| Q14 | Role limits: are duplicates fine (A35), or should a squad be capped at two of a role? (The squad-gap kit does not depend on the answer, A53.) | M4 playtests |
| Q15 | Penetration through wood-frame walls: does "cover from sight but not from fire" read clearly against a horde? | Later, when penetration is built |
| Q16 | In-game labels for the school and the cemetery: generic (A29) or their real names? Should the school stay a sector at all (R5)? | User confirms or overrules A29 **before M1's slice is baked**, because the School Grounds is M1's objective sector. If the school does not stay a sector, it is sealed and generic, and M1's objective becomes a block sector from system 6.1's list (the Andres Avenue block lies inside the same east–west bounds) |
| Q17 | U6 names intersections, blocks and parks as sectors. The first map proposes two block sectors (A54): Andres Avenue (M4) and Patricia Avenue (full map). Keep two, use none, or add more? | User decision **before M4**; then the level GDD places them |
| Q18 | ~~Where should the home sector and the slice lie?~~ **CLOSED 2026-11-19:** the user confirmed the map's box and name (U15), and the slice is now set by milestone (U12; system 6.1) | Closed. Sector placement inside the slice is level design, done in the engine |
| Q19 | The night curve was carried over by the facilitator (A15, A34) and stretched in A41 (dusk at round 10, night around rounds 15–20). Keep it, stretch it further, or make it a cycle with dawn toward each evac window? | User decision before M3; the art bible then sets the light plan |
| Q20 | ~~Do you authorise the fallbacks in advance?~~ **MOVED 2026-11-19** to "Proposed cuts needing the user's approval" (MVP Definition). The ballistics fallback keeps U4 and stays a facilitator call (A56). The two destruction reductions, which touch U9, are proposed cuts P1 and P4 | User decision on P1 and P4, before M2's verdict if possible |
| Q21 | The wooded park's OSM name repeats an OSM subdivision name. Should its sector label be the park's real name (Pillar 2, A29) or "Creek Woods" (A55)? | User decision **before M5**, when Creek Woods joins the slice. Until then it is "Creek Woods" |
| Q22 | ~~Controller-only, or keyboard and mouse as well?~~ **CLOSED 2026-11-19 by the user (U11):** controller-only, confirmed twice. Keyboard and mouse is a developer fallback, never advertised or tuned | Closed |
| Q23 | U7 asks for "the real suburb looking real". A29 (the facilitator's call) renders every house as a realistic kit house chosen by footprint and regional style, never a replica, and uses no imagery of the real homes. Is that the user's meaning, or should likeness go further (for example more kit variety tuned to the area's house types from public, generic sources)? Copying specific private homes stays out | User decision **before M3's realism pass**; then the art bible's style research brief follows it |

### Assumptions and Decisions Log

#### User decisions (2026-11-19, authoritative)

*Given directly by the user on 2026-11-19. They override every facilitator assumption they touch.*

| ID | Decision (user's direction) | What it changed in this document |
| ---- | ---- | ---- |
| U1 | **Feel like Battlefield in its mechanics** (the user's words). Mechanics and feel only: no names, characters, art, maps, branding, class names or UI look copied. Player-facing text never names the reference; this document names it only in Inspiration and References and in this decision record | Pitch, fantasy, MDA, loops, Pillars 3 and 4, Inspiration and References, risk R12 |
| U2 | **Role-based soldiers, about four roles, each with signature gadgets** (for example a med/revive kit, an ammo/resupply crate, a repair/reinforce tool, a breach charge or C4, a sensor/spotting device). Must work for 4-player co-op and for fewer players | System 2 (roles and gadgets, squad-gap kit; the revive kit both revives and heals, A61), system 3 (health and recovery), A22–A24, A35, A53, A58 |
| U3 | **Squad play:** revive downed teammates, spawn on squadmates, ping and spot enemies and points of interest, resupply ammo | System 3, A25, A61, A63 |
| U4 | **Realistic ballistics:** projectile bullets with drop and travel time, weighty recoil, attachments with real trade-offs (handling, stability, velocity) | System 7, Pillar 3, A27, A28, A56, R8; velocities stay real unless the user approves P3 |
| U5 | **Player count: 4-player online co-op** (kept; not a large-scale headcount) | Core Identity, anti-pillars, system 10; arrives at M2 (U12) |
| U6 | **Match structure: round-based waves plus objectives:** capture-and-hold sectors of the real neighborhood, a frontline the horde pushes against; sectors are real intersections, blocks and parks | System 1, Core Loop, A26, A54 |
| U7 | **Visual tone: grounded realism** (realistic lighting, dust, smoke, heavy weapon audio; the real suburb looking real; UE 5.8 Lumen and Nanite). Reconcile with the existing anchor | Visual Identity Anchor ("Ground Truth"), A34, R10 |
| U8 | **First map: "Tinley Park, IL (60477)"**, a ~1.2 km × 1.2 km area of suburban Tinley Park, Illinois, spanning both sides of 167th Street. The map is named after neither OSM subdivision (the user corrected an earlier draft that used a subdivision name). Data from the OpenStreetMap main API; ODbL attribution required | System 6.1, Q1 resolved, A30; box and name confirmed (U15) |
| U9 | **Everything from the original concept stays:** guns with attachments; melee with swing, block, parry and stamina; building destruction synced online; zombie hordes in escalating rounds; maps from real-world OSM data; UE 5.8; PC on Steam | Systems 5, 7, 8, 9; Technical Considerations; the fallbacks (A56, A57) and proposed cuts P1 and P4 |
| U10 | **The map is named "Tinley Park, IL (60477)" everywhere**, confirmed by the user (U15) | System 6.1 (no map name, sector label or slice name uses an OSM subdivision name; A55), Q21 |
| U11 | **Controller-only** (confirmed twice by the user on 2026-11-19): the game is played with a controller and never with a keyboard; playtests use an Xbox Elite Series 2. Gamepad is the primary and only supported player input; keyboard and mouse is a developer fallback, never advertised or tuned. Aim assist, stick deadzones, a response curve and adjustable sensitivity are core systems; recoil, ballistics, enemy speeds and parry windows are tuned for sticks; every menu works with a gamepad alone; prompts use Xbox-layout labels. Closes Q22 | Core Identity, Target Player Profile, systems 3, 7, 8 and 11, Q10, M1's contents and proof |
| U12 | **Solo developer** (the user's answer on 2026-11-19 to the producer's gating question Q2: "Just me, with AI tools"). No funded team and no outsourcing budget; close to zero cash beyond free or low-cost marketplace assets; an unknown number of hours per week. The user chose the re-cut: one map, one polished core loop first, features added only after it is fun; most of the big-team plan is cut or deferred. Closes Q2 | MVP Definition ("Solo plan at a glance"), Scope Tiers, Core Identity, R7, R9, Scope Risks, Next Steps; supersedes A14, A31, A32, A43 and A46–A49 |
| U13 | **Repository** (2026-11-19): the repository stays public, its git history is left as it is, the first map's data files stay tracked, and pushing continues. Going forward nothing new may single out a location | System 6.1 (real-place safeguards), R5, R12; supersedes the repository actions of A50, A60 and A65 |
| U14 | **Vehicles are out of scope** (2026-11-19: offered to the user as an option and not selected). Closes Q11 | Anti-pillars, Inspiration and References, A33 |
| U15 | **Map box confirmed** (2026-11-19): the user confirmed the first map's box and name from the rendered preview | System 6.1, Q1, Q18; supersedes A64 |

#### Facilitator assumptions

*Calls the facilitator made in place of the user. Each row can be overruled. "Impact if overruled" names what would
change. Status: **Active**, **Revised** (still in force, changed since), or **Superseded** (no longer in force). Rows
that the solo re-cut and the repository decision made false are collapsed into A14 and A50. "Staged by U12" means the
design stands and the solo plan decides when it is built.*

| ID | Decision | Alternatives considered | Why | Impact if overruled | Status |
| ---- | ---- | ---- | ---- | ---- | ---- |
| A1 | Core feel is "desperate but skilful"; the key variable is world reactivity | Power fantasy; tactical-slow | Fits escalation and two-edged destruction | Tone and pacing of the combat GDDs | Active; extended to "desperate, skilful and grounded" by U1 and U4 |
| A2 | Matches are endless and round-based, with **evac windows at rounds 10/20/30**; a wipe ends the match | Fixed final round; pure endless | A natural stopping point plus an open ceiling | Session-length targets, the round GDD | Active; evac now needs a held landing-zone sector, and losing the last sector also ends the match (A26) |
| A3 | One currency, **Salvage**: individual wallets plus a give action | Two currencies; shared wallet; trader menu | Simple to learn; keeps every choice an opportunity cost; supports Pillar 4 | Economy GDD, UI | Revised: no zone purchases; earned also from squad actions and held sectors (A26, A37) |
| A4 | **Panelized destruction.** "Same result for every client" means identical gameplay state (holes, rubble, routes, cover). Debris is cosmetic and may differ | Replicated physics debris; voxels; doors and windows only | The only route an indie budget can afford to synced destruction | If identical debris is required: R1 becomes HIGH RISK; re-run TD-FEASIBILITY | Active |
| A5 | Both players **and** the horde destroy (Breacher, Detonator, Wrecker) | Players only | This is what makes Pillar 1 two-edged | Horde roster, AI scope | Active |
| A6 | Curated real maps from an editor-time pipeline that is generic for any neighborhood; a player-facing **"Your Street"** only long after launch, if ever | Runtime generator at launch | Scope, quality and real-place safety | Not plannable for one person before the full first map exists (Q8) | Active; staged by U12 (one slice of one map through M5) |
| A7 | Bounded holdout zone (300–500 m, 3–6 zones); the rest of the city is backdrop | Whole neighborhood playable | Horde pacing and performance | Level and world GDDs | **Superseded** by U6, U8 and A30 |
| A8 | Strip names, brands and house numbers; generic facades; sensitive-site policy | Photoreal digital twin | Legal and ethical exposure | Art direction, pipeline filters | **Revised** by A29 (street and park names now shown) |
| A9 | The match is the core progression; meta is **horizontal only** (unlocks widen pools, cosmetics, mastery) | Roguelite permanent upgrades | Round 1 stays a real fight; no power gap between friends | Retention design, economy | Active; role mastery unlocks sidegrade gadget variants |
| A10 | **Premium**, about USD 19.99–24.99; post-launch cosmetics only | F2P; battle pass | Fits the audience and the anti-pillar; no live-service burden | Business model, meta design | Active |
| A11 | **Listen server via Steam**; dedicated optional later; no host migration | Dedicated servers from day one | Cost; PvE is not sensitive to host advantage | Server-infrastructure budget | Active; from M2 (U12) |
| A12 | Melee is simplified for PvE: no feints, morphs or riposte chains; parry judged client-side within a server tolerance | PvP-grade melee | Scope; co-op PvE has a low cheating incentive | Melee GDD, netcode ADR | Active |
| A13 | Active-zombie cap of **24, with 48 as a later target**, plus a spawn queue | 100+ simultaneous zombies | Replication and CPU budget; the genre convention works | Horde feel (Q4) | Active; 24 through M5, 48 Later |
| A14 | ~~Team of 5 with outsourced character art, animation and audio~~ | — | — | — | **Superseded by U12** (solo developer). Removed with it: A31, A32, A43 and A46–A49 (the staffed calendars and tier dates, the funding and outsourcing placeholders, the contracted placeholder audio and animation block, and the small-team re-cut) |
| A15 | Visual Identity Anchor is **"Survey Grade"**, with the lighting rule from "Sodium Hour" | Sodium Hour; Last Broadcast | Made procedural real architecture look intentional | The `/art-bible` starting point | **Superseded** by U7 and A34 (its night curve survives, stretched by A41; Q19) |
| A16 | Solo is supported as a scaled mode | Co-op only | Wider audience; covers players without a group | Balance tuning | Active; the solo mode and its kit at M5 (A24); M1's single-player build is a test build |
| A17 | Pillars revised after the CD-PILLARS self-review | Keep the draft pillars | Gate feedback | Pillar wording | **Superseded** by A36 |
| A18 | All five PR-SCOPE self-review adjustments applied | Keep the original MVP | Scope realism | MVP contents | **Superseded** (revision 1's scope; the plan is now U12's) |
| A19 | Weapons are sold at caches placed by real shop **types**; the only randomness is supply drops | Random loot rarity | Map knowledge matters (Pillar 2) | Weapon-acquisition GDD | **Revised** by A37 |
| A20 | Friendly fire off by default | On | Co-op accessibility; fewer grief vectors | A hardcore option later | Active; covers bullets and the Sapper's charges |
| A21 | Dead players return next round with a sidearm and keep their salvage | Permadeath for the match | Keeps friends in the session (Pillar 4) | Fail-state tuning | **Superseded** by A25 |
| A22 | (2026-11-19) Four roles with Holdout's own names: **Corpsman** (revive kit, dressing pack), **Quartermaster** (resupply crate, bandolier), **Sapper** (reinforce tool, breach charge, collapse charge), **Spotter** (sensor, survey glass) | Five roles with a separate assault role; the reference's class names; classless gadget picks | Four roles for four players; every U2 gadget has a home; the Sapper embodies Pillar 1 | Role GDD, gadget content, animation list | Active; gadget names revised by A58 |
| A23 | (2026-11-19) Weapons are open to every role; roles are defined by gadgets and (Later) one passive | Role-locked weapon families | Keeps weapon content unsplit and melee independent of role | Weapon and role GDDs | Active |
| A24 | (2026-11-19) Fewer than four players: universal slow fallbacks plus the **squad-gap kit** (unfilled roles' gadgets in light versions); solo kit with the solo mode; **no AI squadmates** | AI bots; free role switching at any time | Satisfies U2's "fewer players" without AI-teammate scope; keeps hand-offs human | Party-size scaling, AI scope | Active |
| A25 | (2026-11-19) Death → redeploy on a squadmate (10 s) or a held sector (15–30 s); keep weapons and attachments; lose 10% of salvage; wipe = everyone downed or dead at once | Return at next round start (A21); permadeath | U3 asks for squad spawn; avoids dead time in long rounds | Fail-state and round GDDs | Active; the squad-spawn eligibility rule is revised by A39 |
| A26 | (2026-11-19) Sector model: 6 sectors on the first map at real landmarks plus connective blocks; the squad starts holding one home sector, the rest start horde-held; each intermission chooses Push or Dig In; evac needs a held landing-zone sector; losing the last sector ends the match | Zones bought with salvage; a fixed attack-defend sequence; all sectors neutral at the start | Turns U6 into a loop with choices and a moving frontline | Round, objective and level GDDs | Active, **count revised**: the first map proposes nine candidate sectors and the level GDD keeps six to eight (system 6.1); the slice grows from two sectors at M1 to four at M5 (U12). Home sector set by A38 and A44; sector proposal and counter-push targeting by A54 (Q17); pressure sector by A62 |
| A27 | (2026-11-19) Ballistics: projectiles with gravity drop and travel time; no wind; penetration by material class and weapon mounting Later | Hitscan with falloff; full external ballistics | Meets U4 while staying grounded rather than mil-sim | Gunplay GDD, netcode ADR | Active; **revised** by A56 (drag from the first build; real-world velocities) and A52 (prone) |
| A28 | (2026-11-19) Projectile netcode: shooter-client simulation, server-validated hit claims against a zombie position history, cosmetic fire events for other clients; hybrid hitscan inside ~50 m as the fallback | Server-simulated replicated projectile actors; full client trust | Responsive in co-op PvE at a bandwidth an indie can afford | ADR; R8 | **Revised** (TD-FEASIBILITY round 1): the fixed ~250 ms window becomes a per-client window (ping plus interpolation delay, capped at about 400–500 ms), tested at 150–200 ms; stale-panel rule added (A42). **Revised** by A56: the hitscan fallback is replaced by relaxed close-range validation with projectiles kept everywhere |
| A29 | (2026-11-19) Real names: show the town name, OSM street names and public park, creek and trail names; never house numbers, addresses, residents, brands or municipal insignia; houses realistic but generic; sensitive sites generic with generic labels; no zombies from graves; no child zombies | Strip all names (A8); show every name including institutions | Resolves "You Know This Place" against "names stripped": recognition comes from streets and parks, never from homes or institutions | Pipeline label filters, art direction, R5, Q16 | Active; one label exception logged by A55 (a park named after a subdivision takes a creek or woods label; Q21); tactical-map text limited to street names and sector labels |
| A30 | (2026-11-19) The whole ~1.2 km box is the map the game is designed for; the fight concentrates at the frontline; most buildings are sealed with breachable shells; fences, hedges and yard trees set-dressed by rule | Cut a 300–500 m holdout zone (A7); make every house enterable | Honours U8's area at an affordable interior cost | Level GDD, art volume, R11 | **Revised**: 20–30 enterable buildings on the full map, near-rectangular footprints only; 2–3 at M1 and 6–8 by M5, chosen in the engine by gameplay criteria (U12, U13) |
| A33 | (2026-11-19) No vehicles | Vehicles as part of the squad-shooter feel | Not in the user's direction; very large scope | — | **Confirmed by the user** (U14): out of scope |
| A34 | (2026-11-19) Visual Identity Anchor **"Ground Truth"** (from U7): keeps Survey Grade's cartographic map and HUD and the failing-light rule; drops the simplified massing look and the "grid, broken" and "organic means enemy" principles | Keep Survey Grade with realistic lighting only | Those principles fight realism; the kept parts support it | The `/art-bible` starting point | Active; extended by A41 (shape language, colour layers) |
| A35 | (2026-11-19) Duplicate roles allowed | A cap of two per role; one of each role | Friends should not be locked out of a role; playtests decide | Role GDD (Q14) | Active; the squad-gap kit now counts missing people, not unpicked roles, so duplicates are well defined (A53) |
| A36 | (2026-11-19) Pillars revised for revision 2: P1 extended to territory; P3 becomes **Weight at Every Range** (ballistics and melee); P4 becomes **Four Roles, One Line** | Keep "Steel Answers What Lead Can't" and "Four Hands on the Door" | The old P3 and P4 did not cover ballistics or roles | Pillar wording; CD-PILLARS re-run | Active |
| A37 | (2026-11-19) Caches: sector armories and workbenches at held sectors, garage caches across the map; real shop-type caches remain the rule on maps that have shops | Generic caches placed anywhere by rule | The first extract has no shop tags; armories make territory matter | Economy and level GDDs | Active |
| A38 | (2026-11-19) **Home sector: 167th Street.** The wooded park's sector is labelled **"Creek Woods"** (after Tinley Creek) | Keep the woods as home under a new label; make the School Grounds home (rejected: the most sensitive site, R5) | A home on the 167th Street spine tests ballistics and melee from round 1; no label repeats an OSM subdivision name | Level GDD, onboarding (round 0 on the street, not in the woods) | **Revised** by A44 (where on the street the capture zone sits) and by U12 (the slice) |
| A39 | (2026-11-19, CD-PILLARS round 1) **Squad spawn:** a pressed squadmate delays and offsets the spawn (up to ~25 m behind them, up to 5 s more, then a held sector) instead of blocking it | Keep "not pressed" as a hard condition; spawn only at sectors | The hard condition rewarded one player for staying out of the fight, against Pillar 4 and the squad-spawn feel of U3 | Squad-play GDD, spawn ADR | Active; the M2 playtest watches for "anchor" parking |
| A40 | (2026-11-19, CD-PILLARS round 1) **Pillar clarifications:** P1 adds counter-edges (breached sealed pockets become spawn closets; charges damage the squad's own fortifications) and logs friendly fire off as an accepted exception; P2 states that recognition rests on grid, names, parks and regional style; P3 states that ballistic weight wins when its halves conflict and logs the hitscan fallback as a pre-authorised exception; P4 requires every fallback to stay meaningfully worse than the hand-off. Supply points get a per-round stock so ammo stays finite | Leave the pillars as written; split P3 into two pillars | Each change closes a gap the creative director found without changing a user direction | Pillar wording; economy, squad-play and destruction GDDs | Active |
| A41 | (2026-11-19, AD-CONCEPT-VISUAL round 1) **Visual anchor fixes:** shape language (horde by silhouette and gait per band; roles by kit; plumb versus askew; panel states change outlines); meaning colours only in the UI, marker and added-light layer, with a precedence order and a non-hue cue for each; the suburb's streetlights cool white so amber always means the squad; the night curve stretched (dusk at round 10, night around rounds 15–20) with motivated sources and per-band readability; regional house style and a neighbour variation rule; "weather" dropped | Keep the night-by-round-10 curve; enforce meaning colours on world surfaces | The anchor lacked shape language, and its colours clashed with what a real suburb already looks like | The `/art-bible` starting point (Q19) | Active; refined by A45 ("amber always means the squad" replaced by a non-hue cue; the spot marker is no longer a diamond) |
| A42 | (2026-11-19, TD-FEASIBILITY round 1) **Technical mitigations:** a far-zombie tier; spawn closets and the 80 m line-of-sight rule; a per-client rewind window and a stale-panel rule; panels as instanced meshes with one state owner per building and a 16–24 KB snapshot budget; nav links only for enterable buildings and the outer pocket ring; headless-capable server code; the intermission checkpoint and resume; total bandwidth budgets; extended proof points | Wait for Mass for distant zombies; full host migration | Each closes a feasibility gap the technical director found at low cost | Netcode and destruction ADRs, horde GDD, R1, R2, R8 | Active; staged by U12 (the far tier and the checkpoint are Later; the proof points move to M2) |
| A44 | (2026-11-19) **Home sector on the 167th Street spine**, with its capture zone on the public carriageway at the staggered junction with Anne Marie Avenue and Patricia Avenue; the School Grounds a short push north, the Andres Avenue block and Creek Woods to the south | The Ridgeland Avenue crossing as home; Beverly Avenue | Design terms only: 167th Street is the frontline spine, and from this junction open ground and close quarters are each one push away, so ballistics and melee are tested from round 1 | Level GDD, onboarding, M1's slice bake | Active; the slice built at each milestone is set by U12 (system 6.1), and the box is confirmed (U15) |
| A45 | (2026-11-19, AD-CONCEPT-VISUAL round 2) **Visual anchor refinements:** squad light carries a non-hue cue (steady, mounted, coned; optionally low-pressure-sodium monochrome); fire flickers red-orange with smoke; houses are dark; the 4,000 K streetlights are a rendering rule; the spotted-zombie marker is a cartographic **survey tick**, never a diamond, and HUD iconography joins R12's IP checklist; far-tier zombies play one looping signature gait per type locally; each type's silhouette test runs under the light of the round it first appears in; the "plumb vs askew" test separates touched from untouched, with ownership shown by the infrastructure marker; yellow and amber separated by value; the "Sodium Hour" cross-reference fixed (principle 4); emergency broadcasts kept as audio and pacing only; a greybox time-of-day curve, blockout role kits and blockout zombie proportions added to the early builds | Leave these to the art bible | Each is cheap now and protects the anchor's signature image or keeps clear of the reference's best-known HUD cue | The `/art-bible` starting point, horde GDD, HUD spec | Active; staged by U12 (the time-of-day curve and zombie proportions at M1, the role kits at M4) |
| A50 | ~~Repository-hygiene actions~~ | — | — | — | **Superseded by U13 and U15**, together with A60, A64 and the repository actions of A65: the repository stays as it is, the box is confirmed, and nothing new may single out a location (system 6.1) |
| A51 | (2026-11-19, `/design-review` recommendations) **Clarifications:** a held sector with 1–2 zombies and no squad member stays Held ("infiltrated"); the squad-gap and solo kits carry the Sapper's reinforce tool, never the breach charge; the first Spotter build tests close-range early warning, not its long-range fantasy; the first evac window is about 25–35 min; the long band is 150–400 m everywhere; the slice's gameplay layer is hand-placed | Leave each to its system GDD | Each closes an ambiguity the review found, at no scope cost | Systems 1, 2, 6, 7; Core Identity; Q16 | Active |
| A52 | (2026-11-19; adversarial check of U1) **Movement and locomotion** (system 11): walk, sprint, crouch, prone and crawl (sharing the downed state's crawl), jump, vault (0.5–1.1 m), mantle (1.1–2.0 m) and slide, with predicted network movement; falls cost health; contextual peek (no lean button) and weapon mounting Later. The horde crosses fences through nav links with one shared climb clip per skeleton | No traversal at all; a lean button | Movement is half of the reference feel the user asked for (U1), and the rule-generated fences and hedges make yards a maze without vaulting | Movement GDD, horde nav links, the art bible's role-primitive rules | Active; staged by U12 (walk, sprint, crouch, jump and vault at M1; prone, mantle and slide at M2) |
| A53 | (2026-11-19, revision 2.4) **The squad-gap kit counts missing people, not unpicked roles:** 4 − *n* light gadgets for a squad of *n*, each from an unpicked role; a full squad of four with duplicates gets none; lobby choice with a stated default order and carrier; light values set between the universal fallback and the full gadget | One gap gadget per unpicked role (a doubled-up squad of four would gain kit by doubling up); a role cap | The old table assumed one role per player and was undefined with duplicates (A35); counting people keeps the hand-off incentive (Pillar 4) | Role GDD, squad-play GDD, balance | Active |
| A54 | (2026-11-19; adversarial check of U6) **Sector proposal and counter-push:** two intersection sectors (167th Street as home; Ridgeland Crossing on the full map) and two block sectors (Andres Avenue south of 167th Street; Patricia Avenue north of it, on the full map), so the slice holds an intersection, a block, a park and open grounds by M5. Counter-push target selection and wave routing arrive with the third sector (M4); the Breacher pack and presentation come Later | Leave block sectors to Q17 with none proposed | U6 names intersections, blocks and parks, and asks for a frontline the horde pushes against; the block splits the 400 m south push into two steps; counter-push targeting is spawn-director logic with no new content | Level GDD, round GDD, Q16, Q17 | Active (Q17); staged by U12. Revision 3.0: a counter-push round is never a Push round (system 1) |
| A55 | (2026-11-19) **Park-label exception:** a park whose OSM name repeats a subdivision's name takes a creek or woods label; on the first map, Lancaster Woods Park is "Creek Woods". Logged as the one exception to Pillar 2's and A29's real park names; Lewis Park keeps its name; the tactical map draws only street names and sector labels | Show the park's real name; strip every park name | No label repeats an OSM subdivision name (U10); the rule keeps every other park name real | System 6.1, Pillar 2, A29, the art bible's tactical map (7.8) | Active until the user answers Q21 |
| A56 | (2026-11-19; adversarial check of U4) **Ballistics decisions:** real-world muzzle velocities; quadratic drag from the first build (one coefficient per round class); starting recoil values per class, tuned for sticks; a sixth attachment axis, **sighting**; if hit validation misses its budget, the fallback is relaxed validation of hit claims inside about 50 m, with projectiles kept everywhere, so Pillar 3 has no ballistics exception | Leave velocities, drag and the fallback open; keep hitscan inside 50 m; a global velocity factor chosen by a prototype | Each open item softened "realistic" (U4); the hitscan fallback would have removed the projectile feel where most fights happen | System 7, Pillar 3, R8, Q13, the netcode ADR | Active. **Revised in 3.0:** scaling velocities below real values is no longer a tuning option; it is proposed cut P3 and needs the user's approval |
| A57 | (2026-11-19; adversarial check of U9 and the art bible) **Destruction scope and sensitive-site exception:** synced, panelized walls on the buildings that carry the fight (enterable buildings and buildings facing a capture zone), with breachable doors, windows and garage doors elsewhere; the doors-and-windows floor needs the user's approval. Places of worship (cosmetic chips only) and headstones are indestructible, as the art bible's AB-14 requires, logged as Pillar 1's accepted exception | Doors and windows only as the first fallback; panelize sensitive sites like any building | A doors-and-windows fallback dropped U9's building destruction outright; the art bible's sensitive-site rule contradicted system 5 with no logged exception | System 5, Pillar 1, Scope Tiers, the destruction ADR | Active. Under U12 the reduced set is how the slice is built through M5; keeping it for good is proposed cut P1, and the floor is P4 |
| A58 | (2026-11-19, revision 2.4; IP check) **Gadget names:** the second gadgets become the **dressing pack** (Corpsman), the **bandolier** (Quartermaster) and the **survey glass** (Spotter); the first crate takes the user's own wording, **resupply crate**; R12's IP checklist covers role, gadget, zombie, sector and mode names as well as HUD iconography | Keep the old names (generic nouns) | The old second-gadget names mirrored loadout item names in the reference series, which U1 rules out | System 2, R12, the art bible (3.5, 5.2), the asset list | Active |
| A59 | (2026-11-19, revision 2.4) **Art-bible re-sync:** the kit's 2.75 m storey height replaces 3.2 m per level in system 6 (AB-13); the silhouette tests' viewing conditions follow AB-08 (long band through the magnified optic); the bounded horde readability light (AB-07) is acknowledged as the one non-physical readability aid; the art bible's Nanite-independent foliage baseline and lighting tiers are cited; Next Steps records the art bible as drafted | Leave the concept on revision 2.2's wording | The art bible was written on revision 2.2 and recorded these as open items for the concept owner | System 6, the Visual Identity Anchor, the milestone proofs, Next Steps | Active |
| A61 | (2026-11-19, revision 2.5; adversarial check of U2 and U3) **Health, damage and recovery, and the Corpsman's heal:** 100 health for every role; starting zombie and fall damage; recovery after 6 s without damage at 5 a second up to a ceiling of 50; heals above the ceiling only from the revive kit (to full in about 1 s, 300-health pool a round, refilled by the crate, never on its own carrier), the light revive kit (to 75, from its 3 charges, never on its own carrier either) or a held sector's supply point (one refill a round, ammo and health together); downed players lose 5 s of bleed-out per hit and may give up after 5 s | Full regeneration with no heal; no regeneration; heal only from the dressing pack | U2's "med/revive kit" had no med half at MVP and the damage economy was undefined, so the Corpsman's only hand-off was the revive; the ceiling keeps the hand-off without grinding 2–3 player squads down | Squad-play GDD, role GDD, horde GDD (damage values), HUD, balance | Active; staged by U12 (health and recovery at M1, heals at M4) |
| A62 | (2026-11-19, revision 2.5; adversarial check of U6) **Pressure sector every round:** outside the counter-push rounds the director sends at least a third of the round's spawns at the weakest-defended held frontline sector (unannounced; never home while another sector is held), plus a third at the Push target on a Push round | Rely on Overrun and counter-push rounds alone | U6 asks for a frontline the horde pushes against; without this the horde pushed only on rounds 5, 15 and 25 | Round GDD, spawn director | Active; its two-sector form at M1, full selection at M4 |
| A63 | (2026-11-19; adversarial check of U1 and U3) **Squad orders without a squad leader:** the intermission vote sets the round's order (Push target or Dig In sector); in a round, an order changes when one player proposes it with the order input and a second confirms it; kills and squad actions in the ordered sector pay 25% more salvage, and capturing an ordered Push sector 50% more | A squad-leader rank with exclusive orders; no orders at all | The reference feel includes orders that steer a squad; in a four-friend co-op squad a fixed leader adds hierarchy without a hand-off | Squad-play GDD, HUD (compass and sector board), economy | Active; arrives at M4. **Revised in 3.0:** orders have their own input, and holding the ping only ever opens the ping wheel |
| A65 | (2026-11-19) **Level origin and prototype rules:** engine-side level work takes its origin from the home sector's capture zone; anything new added to a prototype labels sectors as system 6.1 does, names no individual building in its UI and follows R12's IP checklist | Exempt throwaway prototypes | One origin at the place every match starts is simpler for tools and playtests; public prototypes are public material | System 6.1, R12 | Active; its repository actions are superseded by U13. The existing prototypes are throwaways and not authoritative |
| A66 | (2026-11-19; adversarial check of U4) **The first nine attachments and a fixed zero:** three optics (a 1× reflex sight, a 2× prism, a 4× magnified optic), three muzzles (suppressor, compensator, muzzle brake) and three barrels (long, heavy, short), each with starting multipliers; every sight zeroed at 100 m (rifle and DMR) or 25 m (pistol and shotgun), with adjustable zeroing Later; an aim-assist weight test as an M1 criterion | Leave the list to the gunplay GDD; adjustable zeroing from the start | "About 9 attachments" had no non-magnified optic and no stated zero for hold-over; a controller-only game must show that assist does not remove the weight U4 asks for | System 7, system 11, M1's contents and proof | Active; staged by U12 (four of the nine at M1, the rest by M5) |
| A67 | (2026-11-19) **Consistency fixes:** the late-autumn season (art bible AB-05) recorded in the Visual Identity Anchor and lawns described as dormant; the systems list gains health and damage, squad orders, and meta progression and persistence; the configuration mismatch on Chaos and the horde count is logged for `/settings` | Leave the stale wording | Each contradicted another part of this document or the art bible | Visual Identity Anchor, Next Steps, Technical Risks | Active; under U12, systems are mapped and designed per milestone (Next Steps) |

---

## MVP Definition

### Solo plan at a glance

One developer with AI tools (U12). **Effort** is a rough range in weeks of full-time-equivalent (FTE) work for one
person. **Calendar time depends on hours per week, which are unknown:** at 20 hours a week every range doubles. Each
milestone must pass its proof before the next one starts.

| Milestone | Goal | Contains | Effort (FTE weeks) | Proof that it is done and fun |
| ---- | ---- | ---- | ---- | ---- |
| **M1 Core Loop Proof** | The round loop is fun alone, on a controller, in UE 5.8 | Single-player greybox. A two-sector slice of the first map (167th Street home, School Grounds objective); rounds with Push or Dig In; one assault rifle with real ballistics and four attachments; one heavy melee weapon with block and parry; Shambler, Runner, Breacher; wall, door and window panels with boards on 2–3 enterable houses; salvage; the gamepad aim layer and menus | 16–26 | The developer and 5 outside testers reach round 8, ask for another run, and can name a wall decision that backfired |
| **M2 Co-op Proof** | The same loop holds online: two players, then four (U5) | Steam listen server; replicated movement, bullets, melee, horde, panels and sectors; downed, revive, squad spawn, ping; a pistol sidearm; prone, mantle, slide | 10–18 | Five four-player sessions with no desync; 95% of hit claims accepted at 100 ms; the testers want to play again |
| **M3 Polished Loop** | That slice looks, sounds and feels like the real street (U7) | Realism pass on the two-sector slice from late afternoon to night; weapon and horde audio; first-person and zombie animation; hit, parry and damage feedback | 12–22 | 70% of testers rate gun feel and movement 4 of 5 or better; 60 fps while hosting four players |
| **M4 Squad** | Four roles change how a squad plays (U2, U3) | Four roles with their first gadgets (five in all), heals, resupply, the squad-gap kit, squad orders; the Andres Avenue block; counter-push rounds and the full pressure-sector rule | 12–20 | Three squad actions per player per round; squads of two and three reach round 8; the line moves both ways |
| **M5 Early Access candidate** | A stranger can buy it and have a good evening | Creek Woods; evac at round 10; shotgun and DMR; the other five attachments; a fourth zombie type; solo mode; matchmaking, onboarding, options, store page, release hardening | 16–30 | Ten sessions by strangers with no blocking bug; the M1–M4 proofs hold on the release build |
| **Total to M5** | | | **66–116** | Re-estimated after M1 from its actual effort |

**Deferred until the core loop is fun** (all still goals; each waits for the milestone before it to pass): online
co-op (M2); the grounded-realism look and sound (M3); roles, gadgets and squad orders (M4); the block and park
sectors, evac and solo mode (M4–M5). **Later**, after the Early Access candidate and one at a time: the full ~1.2 km
map with wall destruction on every building; second gadgets and role passives; collapse charges; penetration; more
guns, attachments, melee weapons and zombie types; the far-zombie tier; host resume; meta progression; a second city.

**Proposed cuts needing the user's approval** (permanent cuts of things the user asked for; none is applied, and
each stays a goal until the user says otherwise):

| # | Proposed cut | Reason | Saves |
| ---- | ---- | ---- | ---- |
| P1 | Synced wall destruction stays, for good, on enterable houses and buildings facing a capture zone; every other house keeps breachable doors, windows and garage doors (U9) | About 22,000 wall panels are more than one person can author, test and keep in sync | Most of the full map's destruction work (roughly 10–16 FTE weeks) and the largest netcode risk (R1) |
| P2 | The playable area stays the M5 slice, under half of the box; the rest of the box is backdrop for good (U8) | The full map roughly triples the bake, interior, art and test load | The largest block of Later work (roughly 40–70 FTE weeks) |
| P3 | Scale bullet velocities below real values (U4) | Only if drop proves unreadable on sticks after aim assist, optics and target speeds are tuned | No effort; it trades realism for readability |
| P4 | Destruction floor: doors, windows, garage doors and boards only, no wall panels (U9) | Only if replicated wall panels miss M2's budget even on the reduced set | Roughly 6–10 FTE weeks and risk R1 |

### How to read the plan

**Core hypothesis (unchanged):** *"A four-player squad of distinct roles, holding and taking sectors of a real suburb,
finds the fight → resupply and revive → spend → fortify-or-breach → push-or-dig-in round loop compelling for 45+
minutes; the grounded gun feel and the melee both earn their place; and destruction and sector decisions matter:
squads change their plan because of what they broke or took."* One person cannot test that sentence in one build, so
the milestones test it a clause at a time: M1 the round loop, the gun, the melee and the wall decisions, alone; M2
the same loop with a squad online; M3 whether it survives the grounded-realism bar; M4 the roles; M5 whether strangers
get it without help. **M1 is the MVP** in this template's sense. Where an older document (the art bible) says "MVP",
read it by content against the table above.

**Effort and calendar.** 66–116 FTE weeks is about 1.3–2.2 years of full-time work: roughly 2.5–4.5 years at 20
hours a week, and 5–9 years at 10. No date is promised. The ranges are rough, and a first solo project tends to land
at the top of its range, so M1 is also the calibration: its actual effort divided by its estimate is the multiplier
applied to M2–M5 before M2 starts. **Cash** is assumed close to zero: free and low-cost marketplace assets and sound
libraries, plus Steam's one-off app fee before M5. Anything else that costs money is a question for the user.

**What one person cannot build.** Replicated physics destruction: never (panel states instead; system 5). Four roles
with nine gadgets, a dozen guns, ten zombie types, several maps, and bespoke launch-grade audio and animation: none is
first-milestone work, and most is not Early Access work either. The plan's answer is five gadgets at M4, four guns
and four zombie types by M5, one slice of one map, and marketplace, sound-library and Epic sample content that the
developer retargets and mixes.

### M1: Core Loop Proof

The smallest build that can show the loop is fun in Unreal Engine 5.8 on a controller. Single-player, greybox.

1. **The slice.** The two-sector slice of Tinley Park, IL (60477) (system 6.1): the pipeline's blockout shells baked
   into a UE 5.8 level with collision and a navmesh; 2–3 hand-fitted enterable houses, chosen in the engine by
   gameplay criteria; a hand-placed gameplay layer (two capture zones, ingress points, spawn closets, a supply point
   and a workbench); rule-generated low fences and hedges at vault height; a greybox time-of-day curve from late
   afternoon to dusk; ODbL attribution on the title screen. A flat **firing range** with targets at 25, 100, 200 and
   300 m doubles as the feel room.
2. **Rounds and one sector objective.** Escalating waves with an active cap of up to 24 and a queue; intermissions;
   Push or Dig In from round 3; the School Grounds as the one sector to capture, hold and lose; both fail states
   (the player's death, in this single-player build, and the loss of the last held sector).
3. **One gun.** An assault rifle firing projectiles at real muzzle velocity with gravity, drag and travel time, and
   weighty recoil tuned for sticks; four attachments in three slots (reflex sight, 4× magnified optic, compensator,
   long barrel); a fixed 100 m zero.
4. **One melee weapon.** A heavy tool with light and heavy swings, block, parry and shove, on stamina shared with
   sprint. It breaches weak panels, so melee and destruction meet from the start.
5. **Three zombie types.** Shambler, Runner and Breacher on StateTree, at blockout proportions and gaits.
6. **The simplest destruction that still cuts both ways.** Wall, door, window and garage-door panels on the enterable
   houses, with three states (intact, damaged, breached); boards and reinforcement bought with salvage; zombies tear
   boards down and Breachers open walls; the player's heavy melee opens them too; nav links switch per panel. No
   collapse, no rubble, no physics, and no destroyed state yet.
7. **Salvage.** Earned from hits, kills (melee pays more) and holding the objective; spent at the supply point (ammo
   and health), at the workbench (attachments) and on boards and reinforcement.
8. **Health.** 100, recovery to the ceiling of 50, a full refill at a supply point (system 3).
9. **Movement and controller input.** Walk, sprint, crouch, jump and vault; gamepad mappings in Enhanced Input; aim
   assist that passes system 11's weight test; deadzone, response-curve and sensitivity options; Xbox-layout prompts;
   every menu usable with a gamepad alone.
10. **A minimal HUD.** Round, salvage, sector state and capture progress, health with its ceiling notch, ammo, panel
    damage states, hit and parry feedback.

**Build order inside M1.** (a) The feel room: the rifle and the melee weapon against Shamblers on the firing range,
on a gamepad. Nothing else is built until both feel right. (b) Rounds, the spawn director and salvage on a flat test
street. (c) Panels, boards and Breachers on one test house. (d) The slice bake and the sector objective. (e) Playtest
and fix.

**M1 proof** (all on a gamepad; evidence retained in `production/qa/evidence/`):
- At least 5 outside testers play 3 runs each. The median run reaches round 8 or later, and at least 4 of the 5 ask
  for one more run. The developer still wants to play it too.
- Every tester boards, reinforces or breaches without being told to, and can describe one such decision that
  backfired (Pillar 1).
- At least 4 of 5 rate gun feel 4 of 5 or better for "weighty and grounded", and at least half describe compensating
  for drop or travel time on the range's 200 and 300 m targets without being told.
- The aim-assist weight test (system 11) passes at the default strength.
- In at least 70% of runs the player captures the School Grounds by round 8, and in at least half loses a sector at
  least once.
- *Signal, not a gate:* melee kills are 25% or more of kills in rounds 1–10. A miss triggers melee tuning (Pillar 3
  says which half yields).
- A two-client Play-In-Editor session (listen server plus one client) plays a full round with no gameplay error. It
  need not feel good yet; it shows M2 is replication work, not a rewrite.

**If M1 runs past its range, cut in this order:** the Runner; the magnified optic and the long barrel; the
time-of-day curve; the slice bake (fall back to the flat test street with one house and one capture zone). Never cut
from M1: the gamepad layer, projectile ballistics, parry, and panels that both sides break.

### Co-op staging (U5)

**Why M1 is single-player.** One person can play it every day without scheduling anyone, feel work iterates several
times faster without a second client, and the loop has to be worth replicating before replication is paid for.
**Why co-op is M2 and no later.** Four-player online co-op is the user's direction and the game's real hypothesis,
and every system added before replication makes it dearer. So co-op comes straight after the loop is proven and
before any content grows: two players first, because one friend or a second machine is enough to test with, then four.

**Built co-op-ready from day one**, so that M2 is not a rewrite:
- Rounds, sectors, the spawn director and the economy live in server-owned game mode and game state classes; each
  player's salvage and loadout live in player state. Nothing gameplay-relevant lives in the HUD or in code that
  assumes one local player.
- Health, stamina, melee, parry and (later) gadgets are Gameplay Ability System attributes, effects and abilities,
  which replicate and predict by design.
- All movement goes through the engine's Character Movement Component; vault, and later prone, mantle and slide, are
  built as its predicted custom moves, never as scripted teleports.
- Each building has one replicated state owner holding its panel bits (system 5). Panels change only on the server
  path, and clients draw from the replicated state, even with one player.
- Shooting already has the two-step shape of the netcode table: the shooter simulates the projectile and submits a
  hit claim; the server side validates it. In M1 the validation is a pass-through with the final signature.
- Zombies run on server-side AI with replicated movement; everything cosmetic is local.
- Tuning values live in data assets, not in code or Blueprint defaults.
- **A two-client Play-In-Editor run with network emulation every week, from the first week.** Logic that only works
  on the host shows up the week it is written.

### Engine features that carry the load

Verify every API against `docs/engine-reference/unreal/` before use: UE 5.8 is newer than the AI tools' training.

| Need | Use | Instead of building |
| ---- | ---- | ---- |
| Health, stamina, costs, cooldowns, parry windows, gadget charges | Gameplay Ability System | A custom stat and ability system and its netcode |
| Gamepad mapping, deadzones, response curve, sensitivity | Enhanced Input (mapping contexts and modifiers) | A custom input layer |
| Menus, focus, button prompts on a gamepad | Common UI, unified with Enhanced Input in 5.8 (`modules/input.md`, `modules/ui.md`) | Hand-rolled focus and glyph handling |
| Movement and its prediction | Character Movement Component | A custom movement component |
| Co-op | Built-in replication (Iris is production-ready in 5.8; `modules/networking.md`), a listen server, Steam sessions | A custom transport or dedicated servers |
| Horde behaviour and routes | StateTree, navmesh, nav links | Mass (Experimental in 5.8) or custom AI |
| Fences, hedges, yard dressing | PCG (production-ready since 5.7) over the pipeline's data | Hand placement |
| Lighting and geometry | Lumen and Nanite with the built-in scalability tiers | Baked lighting, hand-made LODs |
| Art, audio, animation | Free and low-cost marketplace kits, photogrammetry-library surfaces and props (generic, never the real homes), Epic's sample animation, sound libraries | Bespoke content |

### Where AI tools help, and where they do not

- **They help with:** C++ gameplay and replication plumbing, ability and attribute sets, data assets and tables, the
  OSM pipeline and editor tools, unit tests for formulas (ballistics, capture time, the economy), reviewing code for
  logic that only runs on the host, design documents and ADRs, and placeholder icons and textures.
- **They do not replace:** playtesting (the fun verdict needs hands on a controller, and from M2 other people);
  in-editor work (level building, lighting, materials, animation retargeting and blending, UI layout, mixing); feel
  tuning of recoil, aim assist and parry windows, which is done by playing; profiling on real hardware; or checking
  UE 5.8 APIs, which postdate the tools' training. A story that changes something a player can see is still run
  and observed before it closes.
- **They do not make art cheap.** A house kit that passes the realism bar, and animation that sells weight, are
  assembled from bought and sample content by hand. That is why the realism pass (M3) covers two sectors, not a map.

### M2 to M5

**M2 Co-op Proof.** Two players first, then four. *Contains:* a Steam listen server with invites; replication of
everything M1 built; server validation of hit claims with the per-client rewind window; downed and bleed-out, the
universal revive, squad spawn and sector spawn, the contextual ping, the salvage give action; a pistol as the downed
player's sidearm; party-size scaling; reconnect; prone, mantle and slide. *Proof:* five complete four-player sessions
on home connections with no destruction or sector desync; 95% of hit claims accepted at 100 ms of simulated latency
and 90% at 200 ms; destruction traffic under 10 KB/s per client; 24 active zombies at 60 fps on the developer's
machine as host; at least 6 of 8 testers want to play again; no squad parks a player as a spawn point in more than a
quarter of sessions (A39). *First cuts:* late join (reconnect only), then slide. Four players are never cut (U5).

**M3 Polished Loop.** The "one polished core loop" the user asked for, on the two-sector slice only. *Contains:* a
modular wood-frame house kit assembled from marketplace pieces and the developer's own, with the neighbour variation
rule and hip and gable roofs; Lumen and Nanite with the art bible's Medium tier as the baseline; the failing-light
curve through to night; damage states that show real construction; weapon audio (report, tail, crack) and positional
horde audio from sound libraries; first-person and zombie animation from marketplace and Epic sample sets,
retargeted; hit, parry and panel feedback; Holdout's own HUD in place of the blockout one. *Proof:* of 10 testers, at
least 7 rate gun feel 4 of 5 or better for "weighty and grounded" and movement 4 of 5 or better for "weighty and
committed", and no tester is stopped by a fence, hedge or windowsill they expected to cross; each zombie type is named
from silhouette at the far edge of its band in 80% of trials (art bible AB-08); 60 fps at the Medium tier while
hosting four players at night with smoke; a 30-second capture that shows the hook. *First cuts:* night (stop at
dusk), then interior dressing.

**M4 Squad.** *Contains:* Corpsman (revive kit with its heal), Quartermaster (resupply crate), Sapper (reinforce
tool, breach charge) and Spotter (sensor), each with a blockout kit pack that reads at 80 m; the squad-gap kit for
two and three players; role change at redeploy; squad orders on their own input; the Andres Avenue block as the third
sector; counter-push rounds and the full pressure-sector rule. The Corpsman and the Sapper are built and playtested
first, then the other two. *Proof:* squad actions average 3 or more per player per round in rounds 5–10, with heals
at least a fifth of the Corpsman's; squads of two and three with the gap kit reach a median of round 8; in at least
70% of sessions the squad captures a sector by round 8, and in at least half it loses one; zombies reach a held
capture zone in at least 60% of rounds 5–10; under 15% of match time is spent travelling (R11); with the HUD off,
testers name each squadmate's role from silhouette at 80 m. *First cuts:* the gap kit for three players (two only),
then the orders' salvage bonus. All four roles stay.

**M5 Early Access candidate.** *Contains:* Creek Woods, the park U6 names, with the slice widened and art-passed to
match; evac at round 10; the shotgun and the DMR and the remaining five attachments; a blunt melee weapon and the
directional swing set; the Detonator; the solo mode and its kit; public matchmaking; round 0 onboarding; audio,
video and basic accessibility options beside the gamepad options M1 built; the store page, with a plain
controller-only notice; crash reporting; an automated bot session that checks for desync; the licence answer (Q3) and
a written real-place policy (R5). *Proof:* ten sessions by people the developer does not know, with no blocking bug;
a new player reaches round 5 with no outside help; every earlier proof re-measured on the release build; 60 fps at
the Medium tier on the minimum GPU set at M3. *First cuts, in order:* Creek Woods moves to the first update (the
store page then says the park is coming); the DMR; public matchmaking (invites only).

**Not before Early Access (Later, in no promised order).** The rest of the first map and its other sectors (Lewis
Park Fields, the Cemetery, Ridgeland Crossing, the Patricia Avenue block, the Creek Trail); wall panels on every
building; role passives; second gadgets (dressing pack, bandolier, survey glass); collapse charges and rubble;
throwables; the ping wheel; penetration; the magazine, grip and stock slots; weapon mounting; the contextual peek;
adjustable zeroing; gear, upgrade tiers and supply drops; zombie types beyond four, and bosses; evac at rounds 20 and
30; the far-zombie tier; host resume; the gameplay-layer generator and a second city; "Your Street"; dedicated
servers; meta progression, leaderboards, cosmetics and noise draw; localisation; a bespoke audio and music pass.
**Out of scope by the user's decision:** vehicles (U14). **In no milestone:** weather.

### Scope Tiers (if time or energy shrinks)

*There is no budget to shrink (U12); what shrinks is time. The milestones are the tiers. Work can stop after any of
them with a real answer in hand, but only M5 ships: a greybox suburb fails U7.*

| If work stops after | What exists | What it is worth |
| ---- | ---- | ---- |
| M1 | A single-player greybox loop on a two-sector slice | The cheapest honest verdict on the loop: continue, change it, or stop |
| M2 | The same loop, online for four | Evenings with friends, and evidence that the netcode budgets hold |
| M3 | Two sectors at the grounded-realism bar | A trailer, a store page and wishlists (Q9). Not a product: it has no roles |
| M4 | Three sectors and four roles | Closed playtests with other squads |
| M5 | The Early Access candidate | It ships |
| Later | The candidate plus whichever additions are finished | Each addition ships as an update |

**Never cut, at any milestone:** controller-only input (U11); projectile ballistics at real velocities (U4; only the
user can approve P3); melee with block, parry and stamina (U9); synced destruction that both sides use (U9; only the
user can approve P1 or P4); the real map and its street names (U8); four-player co-op from M2 (U5); four roles from
M4 (U2); and one art-passed slice before anything ships (U7).

**Defined fallbacks for the riskiest systems** (each decided at the milestone named, from its measurements):
- **Destruction (M2):** if replicated panels miss their budget, first reduce what replicates (fewer panels per house,
  coarser navigation updates). The floor below that is proposed cut P4 and needs the user's approval.
- **Ballistics (M2):** if the server's re-simulation of hit claims misses its CPU or latency budget, the server
  stops re-simulating claims inside about 50 m and accepts them after a plausibility check instead (a fire event on
  record, rate of fire and ammo, the target within a tolerance of its rewound position, and line of sight). Beyond
  50 m, full validation stays. **Projectiles, drag, drop and travel time are unchanged at every range**, so U4 and
  Pillar 3's design test hold; only the anti-cheat check is looser at close range, which co-op PvE accepts
  (anti-pillar: not a PvP shooter). A facilitator call (A56) that the user can overrule.
- **Horde on the host (M2):** if 24 active zombies and four players miss 60 fps on the developer's machine as host,
  lower the active cap (to no fewer than 16) and lengthen the queue. The player count does not change.
- **Realism (M3):** if two sectors cannot reach the bar inside the range, narrow the pass to the home sector's street
  rather than lower the bar.
- **Sectors (M4 playtests):** if free sector choice spreads four players too thin, sectors become a **linear chain**
  (take them in a fixed order, hold the last two). The frontline survives.

---

## Director Gate Reviews

**Every entry below is a review of an earlier revision** (2, 2.1 or 2.2; all agent-run on 2026-11-19), and those
revisions planned for a team of five with outsourcing. **The four gates are being re-run on this revision (3.0).**
Until they report, no verdict covers the solo plan, the milestone staging or the fixes in the revision note.

| Gate | Verdict on the earlier revision | Text reviewed | Blocking items then | Earlier rounds |
| ---- | ---- | ---- | ---- | ---- |
| CD-PILLARS | CONCERNS | Revision 2 (round 1) | None | None; its only run |
| AD-CONCEPT-VISUAL | **STRONG** | Revision 2.1 (round 2) | None | Round 1: CONCERNS (2 blocking) |
| TD-FEASIBILITY | CONCERNS (for a team of five) | Revision 2 (round 1) | None; HIGH RISK if the team is one or two people | None; its only run |
| PR-SCOPE | OPTIMISTIC | Revision 2.2 (round 3) | 3: team size (Q2); MVP audio and animation unscheduled; First Map Complete under-scheduled | Round 1: OPTIMISTIC (6 blocking); round 2: OPTIMISTIC (4 blocking) |

**`/design-review`** (first run, 2026-11-19, on the text before revision 2.3; not a director gate): NEEDS REVISION, 5 blocking items,
applied in revision 2.3. It ran without specialist agents, so a full run is still due. Log:
`design/gdd/reviews/game-concept-review-log.md`.

Each entry keeps the reviewer's verdict and the concerns that still apply to this revision. Concerns already applied
are in the log rows cited; concerns about the team-of-five schedule left with that plan (U12); and the reviewers'
points about repository data and the map's box were settled by the user (U13, U15).

### CD-PILLARS (`creative-director`, round 1 on revision 2, an earlier revision): CONCERNS
*Verdict then:* no blocking items. The four pillars are falsifiable, each has a usable design test, and the tension
table is honest. Pillars 3 and 4 needed sharpening and Pillar 1 had two unlogged exceptions; all applied (A39, A40,
A54, A55, A57).
*Still to judge on 3.0:* whether Pillar 4 survives a first milestone played alone and roles that arrive at M4;
that Pillars 3 and 4 do not differentiate, so the hook rests on Pillars 1 and 2 and its novelty is unverified (Q7);
the school and the block sectors (Q16, Q17) and the park label (Q21).

### AD-CONCEPT-VISUAL (`art-director`, round 2 on revision 2.1, an earlier revision): STRONG
*Verdict then:* "Ground Truth" is clearly the dominant direction and carries U7 faithfully; it borrows no reference
UI look or name. Both round-1 blocking items (no shape language; colour meanings not limited to a layer) were fixed
(A41), and its art-bible notes were applied (A45).
*Still to judge on 3.0:* whether one person can reach the realism bar from marketplace and sample content, on two
sectors first (M3, R10); the art bible's re-sync with the milestones and its HUD layout.

### TD-FEASIBILITY (`technical-director`, round 1 on revision 2, an earlier revision): CONCERNS (conditional)
*Verdict then:* no single risk invalidates the concept. Panel-state destruction, a capped horde, client-simulated
projectiles with server validation and compact sector state are sound, and the UE 5.8 status claims match the pinned
engine reference. **The verdict held only for a team of five with two network-capable engineers, and was HIGH RISK
for one or two people.** Its mitigations were applied (A28, A30, A42).
*Still to judge on 3.0:* the solo plan itself; whether M1's co-op-ready rules are enough to keep M2 from being a
rewrite; M2's budgets on one developer's machine as host (R1, R2, R8); generated interiors and night lighting (R10);
the configuration mismatch on Chaos and the horde count (Technical Risks).

### PR-SCOPE (`producer`, round 3 on revision 2.2, an earlier revision): OPTIMISTIC (3 blocking)
*Verdict then:* revision 2.2 carried U1–U9 into its MVP, but three items blocked REALISTIC, and the plan was
**UNREALISTIC for a solo developer.** The first blocking item, team size (Q2), is now answered by the user (U12). The
other two (unscheduled MVP audio and animation; an under-scheduled First Map Complete tier) concerned a calendar that
revision 3.0 removes.
*Still to judge on 3.0:* the milestone plan and its effort ranges; whether M1 is small enough; whether the proofs can
be gathered by one person; the proposed cuts P1–P4; Q6 (gore and rating).

*Revision 1:* the four entries written for revision 1 were self-reviews by the facilitating agent, not director runs,
and carry no verdict.

---

## Next Steps

**Recommended path: build M1.** The core loop is unproven, and one person cannot run a documentation phase beside a
build phase, so the next real step is the first playable (MVP Definition). Each document is written just before the
work it governs, and only as deep as that milestone needs.

1. **Director gates: being re-run on revision 3.0.** The verdicts on file are for earlier revisions: CD-PILLARS and
   TD-FEASIBILITY ran once, on revision 2; AD-CONCEPT-VISUAL ran twice, last on revision 2.1; PR-SCOPE ran three
   times, last on revision 2.2 (Director Gate Reviews). After them, `/design-review design/gdd/game-concept.md` at
   full; its first run predates revision 2.3 and had no specialist agents.
2. **User decisions.** Before M1's slice is baked: Q16 (the school as a sector). Whenever convenient: the proposed
   cuts P1–P4, Q6 (rating), Q19 (night curve) and the facilitator assumptions still marked Active. Before M3: Q23
   (house likeness). At M3: Q9 (Early Access). Before M4: Q17 (block sectors). Before M5: Q21 (the park label).
3. `/map-systems` for the systems M1 touches, then `/design-system` for each, kept short: rounds and sectors (two
   sectors), gunplay and ballistics, melee, horde AI (three types), destruction (panels and boards), economy, health
   and recovery, player movement, controller input and aim assist, the OSM pipeline's engine bake, and the HUD. The
   systems of later milestones (co-op and session, roles and gadgets, squad play and orders, audio, onboarding, meta
   progression) are indexed now and designed when their milestone starts.
4. `/create-architecture`, then one `/architecture-decision` for each choice that makes M1 co-op-ready: the
   destruction state model, the projectile fire-and-claim path, and server-owned round and sector state. Replication
   with Iris and the horde's representation get their ADRs at M2.
5. **Build M1** in its build order (feel room first), with a two-client Play-In-Editor run every week and
   `/test-setup` for the formula tests. Record the hours spent.
6. `/playtest-report` against M1's proof. Then decide: continue, change the loop, or stop. Re-estimate M2–M5 from
   M1's actual effort before starting M2.
7. The art bible (`design/art/art-bible.md`, drafted on revision 2.2; AD-ART-BIBLE: CONCERNS) needs a re-sync with
   revision 3.0: the milestone names, and its own open item on the HUD layout (its section 7.2 against 9.1). It is
   not needed for M1's greybox and is due before M3.
8. The existing prototypes (`prototypes/real-street-holdout-concept/`: the map pipeline and the browser greybox)
   are throwaways with no `REPORT.md` verdict. M1 replaces them as the proof; the pipeline's output feeds M1's bake.

- [x] Run the director gates and the first `/design-review` on revisions 2 to 2.2 and apply them (revisions 2.1 to 2.3)
- [x] Apply two adversarial checks against the user's directions, the art bible, privacy, IP and consistency (revisions 2.4 and 2.5)
- [x] Re-cut for a solo developer and record U11–U15 (revision 3.0)
- [ ] Re-run the four director gates on revision 3.0 (in progress), then `/design-review` at full; get concept approval from the creative-director
- [ ] User answers Q16 before M1's slice is baked, and approves or rejects the proposed cuts P1–P4
- [ ] User answers Q6, Q19 and Q23 (before M3), Q9 (at M3), Q17 (before M4) and Q21 (before M5); the developer answers Q3 before M5
- [ ] Reconcile `.claude/docs/technical-preferences.md` with this document (Chaos cosmetic only; 24 active zombies) via `/settings` (art bible AB-19)
- [ ] Re-sync the art bible with revision 3.0 (milestone names; its HUD layout item)
- [x] Fill in the CLAUDE.md technology stack from the engine choice (`/setup-engine`; completed elsewhere)
- [x] Pillars: they live in this document (Game Pillars), which the Concept → Systems Design gate accepts; a separate `design/gdd/game-pillars.md` is optional and not planned
- [ ] Map and design the M1 systems (`/map-systems`, `/design-system`), and write the three co-op-readiness ADRs
- [ ] **Build M1, the Core Loop Proof**, and validate it with a playtest (`/playtest-report`) against M1's proof
- [ ] Re-estimate M2–M5 from M1's actual effort; plan M2 (`/sprint-plan new`)
