# Game Concept: Holdout

*Created: 2026-11-19*
*Revised: 2026-11-19 (revision 2: new user direction, logged as U1–U9. Revision 2.1: director gates round 1 applied, plus the user's location correction U10. Revision 2.2: director gates round 2 applied, plus the user's restated location correction)*
*Status: Draft (Under Review). Round 2 of the real director gates ran on revision 2.1 and revision 2.2 applies it. No gate has a blocking item left that the text can fix: PR-SCOPE's last blocking item is Q2 (team size, budget, runway), which only the user can answer. The user still has to confirm the facilitator assumptions in the Assumptions and Decisions Log (especially A44 via Q18) and answer Q2 and Q20*

> **Creative Director Review (CD-PILLARS)**: CONCERNS (round 2, `creative-director` agent, 2026-11-19). No blocking items. Its round-2 concerns repeat round 1 and were already addressed in revision 2.1; the location and "Lancaster" items are answered in revision 2.2 (U10 restated, A44). See Director Gate Reviews
> **Art Director Review (AD-CONCEPT-VISUAL)**: STRONG (round 2, `art-director` agent, 2026-11-19). No blocking items; its art-bible notes are applied in revision 2.2 (A45)
> **Technical Director Review (TD-FEASIBILITY)**: CONCERNS (round 2, `technical-director` agent, 2026-11-19). No blocking items. Valid only for the assumed team of 5 (A14, Q2); HIGH RISK if the team is one or two people
> **Producer Review (PR-SCOPE)**: OPTIMISTIC (round 2, `producer` agent, 2026-11-19). Three of its four blocking items are fixed in revision 2.2 (A46: a complete MVP build plan of about 14–15 months, a shippable fallback tier, the first map's full art and audio pass placed in a tier); the fourth is Q2. A re-check is pending. UNREALISTIC if the developer is solo
>
> **How this document was made.** Revision 1 came from `/brainstorm` run non-interactively (settings: `workflow: full`,
> `review_mode: full`, `automation: guided`, `docs.density: thorough`). The user supplied the concept, so Phase 1
> (creative discovery) and Phase 2 (three alternative concepts) did not run, and the facilitator logged every call it
> made for the user as A1–A21. **No director agent ran any gate on revision 1**; its four verdicts were self-reviews.
>
> **Revision 2** integrates direction the user gave directly (U1–U9 in the log): the mechanics and feel of a large-scale
> squad shooter (named only in Inspiration and References and in decision U1), four roles with signature gadgets, squad
> play (revive, squad spawn, ping, resupply), realistic projectile ballistics, four-player co-op, waves **plus**
> capture-and-hold sectors, grounded-realism visuals, and the first map, **Tinley Park, IL (60477)**. User decisions
> are authoritative. Calls the facilitator had to make to fit them together are logged as A22–A37 and can be overruled.
>
> **Revision 2.1** applies round 1 of the real director gates (agent-run, 2026-11-19; see Director Gate Reviews) and the
> user's location correction (U10: the area is not "Lancaster"; the extract was checked against it). The facilitator
> calls made to apply them are logged as A38–A43 and can be overruled.
>
> **Revision 2.2** applies round 2 of the real director gates (agent-run, 2026-11-19) and the user's restated location
> correction (U10: the intended area is at 167th Street in the middle of the map, not "Lancaster"; the location was
> checked again, locally against the extract). The facilitator calls made to apply them are logged as A44–A46 and can
> be overruled.

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
| **Platform** | PC (Windows) on Steam. Mouse and keyboard first. Controller support after the MVP |
| **Target Audience** | Mid-core to hardcore co-op FPS players aged 18–35 who play with a regular group of 2–4 friends and like grounded, team-dependent gunplay (see Target Player Profile) |
| **Player Count** | 1–4 online co-op. Designed for 4; 2–3 players are supported by the squad-gap kit (A24); solo is a scaled mode from the Vertical Slice. No PvP. Deliberately **not** a large-headcount game (U5) |
| **Session Length** | A match runs 30–90 min. The first evac window is at round 10 (about 35–45 min). Typical match: 45–75 min |
| **Monetization** | Premium (assumed USD 19.99–24.99). Possible cosmetic-only DLC after launch; never paid power (A10) |
| **Estimated Scope** | Large (about 44–48 months, team of 5 plus outsourcing; an assumption, **provisional until Q2** is answered; see A14, A46 and Scope Tiers) |
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
4. **A squad that needs each other.** Revives, ammo, repairs and early warning live in different players' kits. The
   squad survives by handing things to each other.

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
  to be a spawn point (A39). The MVP playtest watches for squads parking an "anchor" anyway.
- **Salvage arguments become strategy.** "Reinforce the back door or buy the rifle?" and "Push the fields or dig in?"
  are team conversations every intermission.
- **Deliberate demolition with consequences.** The Sapper blows a garage wall for a shortcut to the creek, and five
  rounds later the squad regrets the new horde route.
- **Range decides the tool.** Rifles and hold-over on the long axes (167th Street, the fields); melee at the doorway,
  in the hallway and in the woods to save ammo and earn more salvage; melee again when a Grabber pins a teammate.
- **The frontline breathes.** Sectors are taken, lost and retaken, so the shape of the map the squad holds changes
  across a match.
- **Players go looking for "their" kind of place.** They share screenshots of a real town they recognise, which
  doubles as a marketing loop.
- **The arena degrades.** Late rounds are fought in a ruin the squad made, so no two matches end on the same map.

### Core Mechanics (Systems we build)

1. **Rounds plus sectors:** a round-based escalating horde (active cap plus spawn queue, spawning from map edges and
   horde-held sectors) pushing against a frontline of capture-and-hold sectors at real landmarks.
2. **Roles, gadgets and squad play:** four roles with signature gadgets; revive, squad spawn, ping and spot, and
   resupply.
3. **Grounded first-person combat:** projectile ballistics with drop and travel time, weighty recoil and attachment
   trade-offs, plus directional melee with block, parry, shove and stamina.
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
  - Round 0 happens in the home sector. Its supply point teaches resupply, a damaged window teaches fortifying (the
    Sapper does it faster), a scripted telegraphed lunge teaches parry, a downed training dummy teaches revive, and a
    prompt teaches the ping.
  - Rounds 1–3 use only Shamblers.
  - The first 10 minutes introduce, in order: shoot and melee → parry → resupply → fortify → revive → ping → buy a
    gun. The first **Push** (capture an adjacent sector) is offered around round 3–4; the Sapper's breach charge comes
    into play around round 5.
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
doorway. Reload and switch between gun and melee. Throw down an ammo crate, revive a teammate, reinforce a cracking
wall, ping a Runner. Shift between cover and the door you hold. The loop is satisfying on its own for four reasons:

- **Weighty feedback:** recoil with mass, crack-and-thump audio, a hit marker that lands when the bullet does,
  hit-stop, dismemberment, a parry stagger.
- **Two scarce resources pulling against each other:** ammo and stamina. Melee costs stamina but saves ammo and pays
  more salvage; ammo comes from the Quartermaster's crate or a held sector's supply point (both with limited stock),
  never from dead zombies.
- **Hand-offs:** at any moment someone needs something another role carries.
- **The world reacts:** the wall you defend visibly breaks down, which keeps urgency up without a timer.

### Short-Term (5–15 minutes)

A **round** (1–6 minutes, longer in later rounds) followed by an **intermission** (20 s base; a ready-up vote skips
it; 45 s before evac rounds). In each intermission the squad:

1. spends salvage on firepower, fortification, demolition or gear;
2. resupplies and repositions;
3. chooses the round's **objective**: **Push** (attack an adjacent sector; the wave arrives while the squad captures
   it) or **Dig In** (hold the current line for a longer intermission and a bigger no-loss bonus).

The "one more round" pull comes from:
- the round counter;
- the next zombie type arriving;
- the next sector, and the evac window at round 10 (which needs a held landing-zone sector);
- the plan that is almost complete ("one more reinforced wall and the fields hold").

| Round | Approx. length | Notes |
| ---- | ---- | ---- |
| 1 | ~1 min | Shamblers only; home sector; tutorial pacing |
| 3–4 | ~2 min | First Push offered into an adjacent sector |
| 10 | ~3–4 min | Runners and Breachers in the mix; first evac window (needs a held landing-zone sector) |
| 20 | ~5–6 min | Full roster and a boss; much of the suburb is damaged; the frontline has moved several times |

*These are starting targets. The round-system GDD owns the formulas.*

### Session-Level (30–120 minutes)

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

Nothing in the meta layer adds permanent power: round 1 never gets easier. After 1.0 comes **"Your Street"**, a
player-facing map generator for any location (Full Vision, A6).

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
here are **starting tuning values** that the GDDs own and will change.

### 1. Round anatomy, sectors and fail state

| Phase | What happens |
| ---- | ---- |
| **Intermission** | 20 s base (45 s before evac rounds; +15 s on Dig In). Players spend salvage, fortify or breach, resupply and reposition, and vote Push or Dig In. A ready-up vote skips it |
| **Wave** | The round's total zombie count grows with the round number and party size. The **active cap** is 24 at MVP (target 48); a cheap **far-zombie tier** (system 9) puts long-range targets on the open axes at a fraction of the cap's cost. The rest wait in a spawn queue. Zombies enter from the map edges and from horde-held sectors next to the frontline, at real ingress points (street ends, yards, the creek, the trail, building openings, breaches) and at **spawn closets** the gameplay-layer generator defines per sector (map edges, breached sealed-house pockets, woods, creek banks). A spawn is never **within a player's line of sight inside 80 m** (starting value; magnified optics and the Spotter's sensor do not extend it). The spawn director favours the frontline sector with the weakest defence and, on a Push round, the sector being attacked |
| **Round end** | Ends when the last zombie of the wave dies. Bonus salvage if nobody went down (doubled on Dig In); income for every held sector |
| **Counter-push rounds (5/15/25, Vertical Slice)** | The horde announces one held sector as its target and hits it with extra pressure and a Breacher pack |
| **Evac rounds (10/20/30)** | The squad votes to call evac. Then it defends a landing zone in a held open-space sector for about 2 min. Success counts as a victory |

**Sectors (U6).** A map is divided into **sectors at real landmarks** (parks, school grounds, intersections, a trail
head, and residential blocks that have a defensible anchor house) joined by the other residential blocks between them.
Each sector has a **capture zone** about 20–30 m across. How many blocks become sectors on the first map is Q17.

| Sector state | Rule (starting values) |
| ---- | ---- |
| **Horde-held** | Spawns zombies when it borders the frontline. All sectors except the home sector start horde-held |
| **Capturing** | Squad members inside, no zombies inside. Capture time `t = T_base / (1 + 0.5 × (n − 1))`, with `T_base` = 30 s and `n` = squad members in the zone: 30 s alone, 20 s for two, 15 s for three, 12 s for four |
| **Contested** | Squad members and zombies both inside: progress pauses |
| **Held** | Gives a **redeploy point**, a **supply point** (ammo refill from a limited stock that restocks each round; starting value: one full refill per squad member per round), a sector **armory and workbench**, salvage income each round (starting value 100), and a landing zone if the sector has open ground |
| **Overrun** | Zombies inside (3 or more) with no squad member inside for 10 s: progress drains over 20 s. At zero the sector is lost; its redeploy point, supply point and income go dark and it becomes horde ingress |

**The frontline.** The line between held and horde-held sectors is the frontline. Taking a sector removes a horde
spawn point but adds frontline to hold with the same four people, so territory is two-edged (Pillar 1).

**Fail state.** The match is lost when **every player is downed or dead at the same moment** (a wipe) or when **the
last held sector is overrun**.

| Situation | Rule |
| ---- | ---- |
| **Downed** | The player can crawl and use a sidearm. 30 s bleed-out. See Squad play for revives |
| **Dead** | The player redeploys on a squadmate or a held sector after a timer (see Squad play). They keep their weapons and attachments, lose 10% of their salvage, and their gadget charges reset to base (A25) |
| **Solo (Vertical Slice)** | A death is a wipe unless the player holds a self-revive charge from the solo kit (A24) |

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

Every player picks a **role** at deploy (U2). Roles are defined by **signature gadgets** (and, from the Vertical
Slice, one passive). **Weapons are open to every role** (A23): any role can buy any gun or melee weapon. Holdout's
role names are its own (A22); the archetypes behind them are generic military roles.

| Role | Archetype | Signature gadgets (**MVP** in bold) | Passive (Vertical Slice) | What the squad lacks without it |
| ---- | ---- | ---- | ---- | ---- |
| **Corpsman** | Medic | **Revive kit:** revives a downed squadmate in about 1.5 s to full health. *Med pouch* (VS): a thrown heal with a few charges | Can drag a downed squadmate to cover | Revives take 4 s and return the player at half health |
| **Quartermaster** | Resupply | **Ammo crate:** a deployable that refills magazines and gadget charges for squadmates nearby; limited stock that restocks between rounds. *Ammo pouch* (VS): thrown, refills one player | Carries more reserve ammo | Ammo only at held-sector supply points |
| **Sapper** | Engineer / demolition | **Reinforce tool:** repairs and reinforces panels at double speed and half salvage cost. **Breach charge:** a placed explosive that breaches a panel or door and damages the panels around it, the squad's own reinforcements included (2 charges; refilled by the crate; extra charges cost salvage). *Collapse charge* (Alpha) | Heavy melee does more structural damage | Slow, full-price fortifying; breaching only with heavy melee |
| **Spotter** | Recon | **Sensor:** a deployable that auto-spots zombies within about 30 m for the squad and flags special types; lasts one round. *Spotting scope* (VS): a long-range ping that marks a target and shows which ingress the next spawns will use | Less sway with magnified optics; hold breath | No early warning; specials arrive unspotted |

The Sapper carries both edges of Pillar 1: the tool that makes a wall stronger and the charge that removes it.

**Squad composition.** Duplicates are allowed at MVP (A35); the gadgets, not a lock, push squads toward a spread of
roles. A player can change role when they redeploy or at a held sector's supply point during an intermission.

**Fewer than four players (U2, A24).** Two rules keep a small squad whole:
1. **Universal fallbacks.** Anyone can revive (slowly), anyone can board and repair (full price, normal speed), held
   sectors refill ammo from their limited stock, and everyone can ping. No role is ever strictly required, and every
   fallback stays meaningfully worse than the role's hand-off (Pillar 4's test).
2. **The squad-gap kit.** Signature gadgets of roles nobody picked are shared out as a second gadget slot, in a light
   version (fewer charges, slower):

| Squad size | Rule |
| ---- | ---- |
| 4 | One role each; no gap kit |
| 3 | One player also carries the missing role's MVP gadget (light), chosen in the lobby |
| 2 | Each player carries one missing role's MVP gadget (light) |
| 1 (solo, Vertical Slice) | The solo kit: one role, plus a self-revive charge (one per 5 rounds), an ammo pouch and a light reinforce tool |

Alternatives considered:
- *AI squadmates to fill empty slots:* rejected. AI teammates cost more than the horde AI, and they turn Pillar 4's
  hand-offs between people into hand-offs to a bot.
- *Classless gadget picks:* rejected. The user asked for roles (U2), and roles give identity and readable callouts.
- *Five roles with a separate assault role:* rejected. With four players, a fifth role guarantees a gap in every
  squad; its frontline job is folded into the Sapper.
- *Role-locked weapon families:* rejected (A23). It would split the weapon content four ways and make melee and gun
  builds depend on role.

### 3. Squad play: revive, squad spawn, ping and spot, resupply

| Action | Rule (starting values) | Who does it best |
| ---- | ---- | ---- |
| **Revive** | Anyone: hold interact 4 s, returns the player at 50% health. Corpsman with the revive kit: about 1.5 s, full health. Interrupted if the reviver is hit or grabbed | Corpsman |
| **Squad spawn** | A dead player redeploys on any living, not-downed squadmate after 10 s. If that squadmate is **pressed** (a zombie within about 8 m, or damage taken in the last 3 s), the server places the player at the nearest safe, navigable point up to about 25 m behind them, waiting up to 5 s more for one; if none appears, the player redeploys at the nearest held sector instead. Arriving near the fight is the spawn's risk; pressure delays and offsets the spawn but never blocks it (A39) | Any living squadmate |
| **Sector spawn** | Redeploy at a held sector's rally point after 15 s + 1 s per round (capped at 30 s) | Held sectors |
| **Ping** | One contextual key: on a zombie it marks it for the squad (5 s; specials 8 s); on the ground it marks a position; on a cache, crate, supply point or workbench it marks the item; on a sector it suggests a Push. A ping wheel with callouts ("need ammo", "need revive", "reinforcing here", "breaching here") arrives at the Vertical Slice | Everyone |
| **Spot** | The Spotter's sensor auto-spots in its radius; the spotting scope (VS) marks at long range | Spotter |
| **Resupply** | The Quartermaster's crate refills magazines and gadget charges; held-sector supply points refill ammo only, from their per-round stock. Zombies never drop ammo | Quartermaster |

**Squad actions pay.** Revives, resupplies, repairs and reinforcements, and assists on spotted targets all earn
salvage, capped per round to stop farming. Support play is rewarded as much as kills.

Alternatives considered:
- *Respawn only at the next round start (revision 1, A21):* superseded by A25. With sectors and a frontline, a player
  sitting out a six-minute round is dead time; squad spawn keeps them in the fight.
- *Squad spawn only on an unpressed squadmate (revision 2):* revised by A39 after CD-PILLARS round 1. Blocking the spawn
  while a squadmate is pressed rewarded one player for staying out of the fight; now pressure only delays and offsets
  the spawn.
- *Ammo drops from zombies:* rejected. It would make the Quartermaster and melee's ammo-free role irrelevant.
- *Spotting by looking at a zombie and pressing a key, with no gadget:* kept as the universal ping; the sensor adds the
  automatic, area version that makes the Spotter a role.

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
| Weapon upgrade tiers I–III | Workbench | 2,000–5,000 | Keeps a favourite gun viable against growing zombie health; very expensive |
| Fortify / repair | Any opening or wall panel (Sapper: half price, double speed) | 100–250 per panel | Blocks entry and fire, but costs firepower salvage; the horde then targets the next-weakest point |
| Extra breach charges | Sapper only | 300 each | Opens a route or sightline, but also opens a horde route |
| Collapse charge (Alpha) | Sapper only, placed on load-bearing panels | 1,000 | Chokes a street and crushes zombies, but loses cover, the upper floor and that building's caches |
| Gear | Sector armory | 250–1,000 | Armour, stamina tonic, self-revive |
| Supply-drop flare | Anywhere outdoors | 950 | A random weapon plus a random attachment, dropped somewhere in a held or contested sector. Someone has to go and get it |

Capturing a sector is **not** a salvage purchase: it is earned through the objective (U6).

Alternatives considered:
- *Two currencies (points plus building materials):* richer, but doubles the UI and the balance surface. Deferred
  until after the MVP (Q5).
- *A shared team wallet:* strong for Pillar 4, but removes personal agency and invites griefing. Rejected in favour
  of individual wallets plus give.
- *A trader menu between waves:* rejected. In-world armories at held sectors make territory matter and make movement a
  risk.
- *Buying zones with salvage (revision 1):* replaced by capture-and-hold (see system 1).

### 5. Two-edged destruction (synced)

**Model.** Every building is assembled from **panels**: wall, door, window, garage-door and floor segments roughly
2–3 m wide and one storey tall. The first map is suburban single-family **wood-frame** houses with garages, so the
default kit is siding over studs and drywall; brick veneer and masonry appear where the building type calls for them.
Each panel has a small set of authored states:

| State | Gameplay meaning |
| ---- | ---- |
| Intact | Blocks movement and sight; counts as cover. From the Vertical Slice, stops bullets according to its material class (see system 7) |
| Damaged | Still blocks, but visibly cracked or splintered. One more hit away from breached; can be repaired |
| Breached | A hole. Passable for zombies and players, and opens a sightline. Can be fortified (boarded) but not fully repaired |
| Destroyed | Gone. Cannot be repaired |
| *Reinforced* (a flag) | More panel health; resists normal zombies; stops all bullets, the squad's included; Breachers target it |

A garage door is the largest and weakest panel on most houses: the obvious way in, for both sides.

**Who breaks things:**
- *Players:* the Sapper's breach and collapse charges, explosives, and anyone's heavy melee (sledgehammers, axes) on
  weak panels and doors.
- *The horde:* every zombie tears down fortifications at openings. Breachers attack walls and open new ingress.
  Detonators blow out panels.

**Structure rule.** The rule is simple and readable, not physics. When enough load-bearing panels in one storey
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
  the panel figure (**about 16–24 KB**). To be confirmed by the netcode spike.

Alternatives considered:
- *Replicating full Chaos physics:* rejected. Too costly in bandwidth and server CPU, not deterministic across
  clients, and unreadable in a fight.
- *Voxel destruction:* rejected. It conflicts with the real-architecture look and multiplies scope.
- *Doors, windows and barricades only (the genre's classic boards):* kept as the **fallback** if the destruction spike
  fails its budget (see Scope Tiers).

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
   mesh outside the engine (system 6.1); the first UE 5.8 bake of the MVP slice is a named MVP block (months 1–3).*

| OSM data | Used for | Fallback when missing or poor |
| ---- | ---- | ---- |
| Building footprints | Building shells (panelized) | Required. Footprints that are broken or overlapping are repaired or dropped |
| `height`, `building:levels` | Storey count and height | levels × 3.2 m, then type plus footprint area (house 1–2 storeys, apartments 3–4, garage 1); a designer may override storey count on sector buildings (footprints never move) |
| `building` type | Style kit, interior templates | Untyped (`building=yes`) buildings take a type from footprint size |
| `roof:shape` | Roof form | Gabled or flat by type and footprint shape; hip and compound roofs are a pipeline to-do |
| Roads and footways (`highway`, width, lanes) | Street layout, pavements, wreck placement, sector capture zones at major intersections | Default widths for each road class |
| Land use / leisure (park, pitch, wood, grass, cemetery) and waterways | Open spaces, sectors, evac landing-zone candidates, close-quarters woods | Generator flags maps with no landing zone |
| `shop` / `amenity` **type** (never brand names) | Where each kind of cache goes; sensitive-site detection | Sector armories plus garage caches (A37) |
| Barriers, walls, fences, trees | Cover lines | Generated by rule (they are not footprints or streets, so Pillar 2 allows it) |
| Elevation (not from OSM) | MVP is flat. Later: open elevation data, licence checked | Flat |

**Map scale and building classes (U8, A30).** The whole ~1.2 km × 1.2 km extract is the map. Fights concentrate at
the frontline, so at any moment the action lives in one to three sectors. Most houses are not enterable, which keeps
interiors affordable:

| Class | Where | What it is |
| ---- | ---- | ---- |
| Enterable | Sector anchors and selected houses (target **20–30 per map**; MVP 6–8, hand-fitted). Only near-rectangular footprints qualify, by rule, until the interior generator is proven on the second city (A43) | Panelized; ground floor plus selected upper floors, basements excluded at MVP, with interiors built from suburban room templates |
| Sealed | Every other building in the extract | Not enterable. Exterior panels can still be breached into a shallow interior pocket; **once breached, the pocket becomes a horde spawn closet and ingress** (Pillar 1). Garages open into a garage-only interior |
| Backdrop | Outside the extract | Not interactive; low detail, to the horizon |

**Curation (Pillar 2).** We curate by **choosing the site and the boundary**, by placing the sectors at real
landmarks, and by tuning the gameplay layer. We never move real footprints or streets. Site-selection criteria:
- 4–8 public landmarks (parks, fields, grounds, major intersections) that can carry sectors;
- at least one long-sightline axis where ballistics matter, and close-quarters ground where melee matters;
- a defensible anchor building;
- at least one landing-zone open space;
- the OSM data scores well for completeness, or its gaps have a fallback.

#### 6.1 First map: Tinley Park, IL (60477)

**The first test map is a ~1.2 km × 1.2 km area of suburban Tinley Park, Illinois (USA)** (U8). 167th Street, a
secondary road, crosses it east–west about two-thirds of the way north. OpenStreetMap divides the area into named
subdivisions (Kimberly Heights north of 167th Street; south of it, several whose names begin with "Lancaster") and
names the wooded park in the south after one of them. These are OSM's labels, not the map's identity: **no map name,
sector label, slice name or player-facing text uses any subdivision's name or the word "Lancaster"** (U8, U10). The
map is "Tinley Park, IL (60477)" everywhere, and its focus is the 167th Street corridor across the middle of the box.
It is a hard test for the pipeline: no height tags, no shop types for caches, no fences or trees, and a flat ground
plane.

**Location check (revised 2026-11-19, after the user restated U10).** The user asked again for the geolocation to be
checked and repeated that the area is not "Lancaster". The check was done **locally against the committed extract**;
no address or place was sent to any outside service. Result: the area the user named is inside the box, at 167th
Street, with about 400 m or more of margin on every side. The box is right, the name is right, and the home sector
and the MVP slice now sit on that middle stretch of 167th Street (A44). Two landmarks cross the box edge: **Lewis
Park** (W), about half outside, and the **Tinley Creek Green trail** (E), mostly outside. *Action before the level
GDD locks the full map:* re-extract with the box widened west (and east if Creek Trail stays a sector), with its
edges snapped to a coarse grid so the boundary follows landmarks and round numbers, then re-measure the table below.
The MVP slice (below) depends on neither edge landmark.

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
| Pipeline run | 2.45 s end to end (convert, navigation check, blockout mesh, preview) with zero hand-editing, in a standalone prototype outside the engine | The geometry stage of the "draft map in hours" KPI holds for this extract. The engine stage (PCG, World Partition bake, navmesh, HLOD), interiors and the gameplay layer are unproven (R3) |

**Proposed sectors** (the level GDD confirms placement; compass directions are relative to the map):

| Sector (in-game label) | OSM source | Character | Role in the match |
| ---- | ---- | ---- | ---- |
| **167th Street** | The secondary road crossing the map east–west | A long straight axis, verges, intersections, corner houses, wrecks | Default **home sector** (A38, A44): capture zone and enterable anchor houses where **Anne Marie Avenue (from the south) and Patricia Avenue (from the north) meet 167th Street**, a staggered crossing in the middle of the map. The frontline spine: long sightlines from round 1 and doorway fights in the corner houses |
| **Creek Woods** | The wooded park along Tinley Creek (S) | Woods, creek banks, short sightlines | Close quarters where melee earns its place; creek crossings are chokepoints. Labelled after the creek; the park's OSM name is not used (U10) |
| **School Grounds** | Kimberley Heights School grounds (N) | An anchor building plus fields | Defensible anchor and landing zone; open ground for ballistics; rendered as a generic school under a generic label (A29) |
| **Lewis Park Fields** | Lewis Park and its sports fields (W) | Open fields, long sightlines, little cover | Landing zone; a showcase for the Spotter and for ballistics. About half the park is outside the current box, so it waits for the re-extraction |
| **Cemetery** | Zion Lutheran Cemetery (E, just south of 167th Street, next to the MVP slice's east edge) | Open ground and low cover | An exposed crossing; never a landing zone; sensitivity rules apply |
| **Creek Trail** | The Tinley Creek Green paved trail (E edge, along 167th Street) | A paved trail corridor, mostly outside the current box | A horde flank lane into the east of the map; stays a sector only if the box is widened east |
| *Residential blocks* | The residential streets north and south of 167th Street | Houses with garages, yards, driveways | Mostly connective: the ground between sectors where the horde pushes and the squad fortifies. **Block sectors are allowed** (U6): the level GDD may promote a block with a defensible anchor house to a sector, labelled by its bounding streets (Q17) |

The MVP builds only the **middle slice** of this map: about 600 m wide and 950 m long, running north–south from Creek
Woods across 167th Street to the School Grounds, with the 167th Street home sector between them (A38; see MVP
Definition). Pushing north tests open ground and ballistics; pushing south tests close quarters and melee.

**"Play your own street" (A6).**
- *At launch:* curated maps from several real cities.
- *Internal KPI:* the pipeline is generic enough to turn any OSM neighborhood into a playable draft map in hours.
  The Vertical Slice must prove this with a second map from a different city.
- *After 1.0 (Full Vision):* the player-facing generator.

**Real-place safeguards (A29, revising A8).**
- **Shown:** the map's town name ("Tinley Park, IL (60477)"), OSM street names (on street signs and the tactical map),
  and the names of public parks, the creek and the trail as sector labels. This is what makes Pillar 2 pay off.
- **Never shown:** house numbers, addresses, anything about residents, brand names, or municipal insignia. No real
  people are depicted.
- **Repository hygiene:** the repository keeps only each map's boundary box and its centre (the pipeline's origin);
  nothing narrower (no point of interest, no house-level reference, no coordinates of any building) is ever committed.
- **Houses are realistic but generic.** Facades come from modular kits chosen by building type and footprint. No
  photogrammetry or street-level imagery of real homes is used; no house is a replica of a real house.
- **Sensitive sites** (schools, cemeteries, places of worship, hospitals, memorials, government buildings) are rendered
  as generic structures under generic labels ("School Grounds", "Cemetery"). Places of worship are sealed and are
  never sectors. No zombie ever emerges from a grave; headstones are generic and nameless. There are no child zombies.

**Licensing.**
- OSM data is © OpenStreetMap contributors under the ODbL. Attribution plus a licence link appear on map select, on
  loading screens and in the credits.
- **Legal review is required** on one question: does the processed OSM data shipped in game files count as a
  *Derivative Database* (share-alike obligations) or only as a *Produced Work*? Keep extracts and processing scripts
  documented either way. The same review covers using a real town's name in a commercial game (Q3). It is scheduled
  **before the Vertical Slice**, because the town and street names are player-facing (A29, A43).
- These details could not be re-verified online during revision 1 (Q3).

### 7. Guns, attachments and ballistics

- **Weapon classes:** pistol, SMG, shotgun, assault rifle, DMR, LMG, plus launchers in the full tier. Open to every
  role (A23).
- **Projectile ballistics (U4, A27).** Every bullet is a simulated projectile with a muzzle velocity, gravity drop and
  travel time. No drag or wind at MVP; drag may be added by the gunplay GDD, wind never (anti-pillar: not a mil-sim).
  Muzzle velocities may be scaled below real-world values so drop is readable inside about 400 m; the feel prototype
  decides (Q13).

  Time of flight `t = d / v₀`; drop `h = ½ g t²` (g = 9.81 m/s², no drag):

  | Muzzle velocity `v₀` | At 100 m | At 300 m |
  | ---- | ---- | ---- |
  | 600 m/s (scaled) | t = 0.17 s, drop 0.14 m | t = 0.50 s, drop 1.23 m |
  | 880 m/s (rifle, close to real) | t = 0.11 s, drop 0.06 m | t = 0.34 s, drop 0.57 m |

  A Runner moving at about 6 m/s at 300 m moves about 2–3 m during the bullet's flight, so leading is a real skill.

  **Range bands on the first map:** yards, hallways and the woods at 2–30 m (drop is irrelevant and melee competes);
  residential streets at 30–150 m; 167th Street, the fields and the cemetery out to 400 m and beyond (drop and lead
  matter, and the Spotter's DMR earns its place). Detonators and Howlers are the targets that most reward killing at
  range. Long-band targets come from the far-zombie tier (system 9), so they do not eat the active cap. These three
  bands are also what "combat range" means everywhere else in this document (Visual Identity Anchor, Pillar 3).
- **Weighty recoil.** Each shot kicks the weapon (a learnable vertical pattern plus a bounded random horizontal
  component), then the weapon recovers. First-shot and sustained recoil differ; visible weapon motion sells mass, but
  the control law stays learnable. Aiming down sights adds sway; crouching steadies it. Prone and mounting a weapon on
  a windowsill or fence arrive at the Vertical Slice.
- **Attachments are trade-offs** along five axes: **handling** (aim-down-sights time, swap and sprint-to-fire speed),
  **stability** (recoil, sway), **velocity** (muzzle velocity, therefore drop and travel time), **capacity**, and
  **signature** (muzzle flash and, in the full tier, **noise draw**: gunfire pulls queued zombies toward the shooter's
  side). Every attachment moves at least two axes in opposite directions:

  | Attachment | Gains | Costs |
  | ---- | ---- | ---- |
  | Long / heavy barrel | Velocity, stability | Handling |
  | Short barrel | Handling | Velocity, stability |
  | Suppressor | Signature (flash; noise in the full tier) | Velocity, handling |
  | Muzzle brake / compensator | Vertical stability | Signature (more flash and noise) |
  | Magnified optic | Precision at range | Handling, field of view |
  | Extended magazine (VS) | Capacity | Handling (reload, ADS) |
  | Grip (VS) | Stability on one axis | Handling |
  | Stock (VS) | Stability (sway) | Handling (ADS) |
- **Attachment slots:** optic, muzzle, barrel, magazine, underbarrel/grip, stock: six at full vision. The MVP has
  three (**optic, muzzle, barrel**), chosen because together they cover handling, stability and velocity.
- **Penetration (Vertical Slice).** Bullets meet panels by material class: *soft* (drywall, wood siding, interior
  doors, fences) lets rifle rounds through at reduced damage; *medium* (brick veneer, vehicles) stops pistol and SMG
  rounds and slows rifle rounds; *hard* (reinforced panels, masonry, concrete) stops everything. In a wood-frame suburb
  this makes cover and concealment different things, which is the grounded feel the user asked for.
- **Acquisition:** per match. Sector armories sell fixed weapons, workbenches sell chosen attachments, garage caches
  hold tools and melee weapons, and supply drops supply the randomness. Meta unlocks widen the pools but never add
  power.

Alternatives considered:
- *Hitscan with damage falloff (the genre default):* rejected. It fails U4.
- *Full external ballistics (drag, wind, spin drift):* rejected. Grounded, not mil-sim (anti-pillar); drag stays a
  possible GDD tuning tool.
- *Random loot rarity tiers for weapons and attachments:* rejected because players could not plan around it.
  Randomness lives only in supply drops.

### 8. Melee

- **Moves:**
  - Directional light and heavy swings (horizontal left/right, overhead) and a thrust. Direction comes from mouse
    motion or a modifier; the GDD decides which (Q10).
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

*All names are working names and will be checked against existing franchises.* The MVP ships the first three types.
No zombie is a child, and none emerges from a grave (A29).

**Tech direction** (revised after TD-FEASIBILITY round 1, 2026-11-19; A42):
- **MVP:** actor-based zombies, StateTree behaviour, lightweight custom movement, and the active cap. Full zombies
  exist only near the frontline; distant horde-held sectors hold queued zombies, not simulated ones.
- **Far-zombie tier (MVP):** inside the same actor model, zombies on the open axes beyond about 150 m from every
  player use path-following without the full movement component, replicate at 2–5 Hz, play minimal animation, and
  count as a fraction of a full zombie against the active cap (starting value: one quarter). They are promoted to
  full zombies when they come within about 150 m. This is what gives Pillar 3's long band its targets; the netcode
  spike includes a 300 m engagement test.
- **After the MVP:** evaluate Mass for queued and distant horde representation. MassGameplay and MassCrowd are
  Experimental in UE 5.8.

### 10. Co-op structure

- Listen server through Steam at MVP (A11). A dedicated server is optional later.
- Four players maximum (U5). Friendly fire is off, for bullets and for the Sapper's charges' damage to players
  (A20). The charges still damage structure, the squad's own fortifications included (Pillar 1).
- **Server code is headless-capable from day one**, so a dedicated server is a build target, not a rewrite (A42).
- Squad play as in system 3; the salvage **give** action.
- **Party-size scaling:** each wave's size and zombie health scale with player count; the squad-gap kit covers
  missing roles (A24).
- **Solo (A16, Vertical Slice):** a lower active cap, the solo kit, and a cheaper self-revive.
- **Host leaving:** at MVP, the match ends if the host leaves. **Vertical Slice A (decision date):** the host
  checkpoints the compact authoritative match state (round, sectors, panel bits, economy, squad loadouts) to every
  client at each intermission, and the squad can **resume from the last intermission** with a new host. Full host
  migration stays out of scope (A42).

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

### Pillar 2: You Know This Place
Maps are real places whose street grid, building footprints and public landmarks stay true and keep their real
street and park names, so players recognise real geography and plan around it. Recognition rests on the street
grid, the street names and the parks, plus the regional style of the houses; individual buildings are generic and
never replicas of real ones, and sensitive sites carry generic labels (A29). We curate by choosing the site and
boundary, placing sectors at real landmarks, and adding the gameplay layer, never by moving buildings or streets.

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
its MVP signal even after that tuning, this pillar's melee claim narrows to "melee owns the doorway".
**Pre-authorised exception:** if the month-3 spike fails, the ballistics fallback (hitscan inside about 50 m; Scope
Tiers) breaks this pillar's test at close range. Drop and travel time survive beyond it, where they matter.

### Pillar 4: Four Roles, One Line
The squad is four roles holding one frontline, and each role carries what the others need: revives, ammo, repairs
and early warning. Survival runs through hand-offs. Smaller squads share the missing kit; solo is supported as a
scaled mode but never drives the design.

*Design test*: When debating a feature that makes one player self-sufficient against one that creates a callout or a
hand-off, we pick the hand-off. **Every fallback stays meaningfully worse than the hand-off it replaces** (slower,
costlier or riskier by a margin a playtester notices): the universal slow actions, the squad-gap kit's light gadgets,
and a squad of duplicates that leaves a role empty (A35) all obey this.

### How the pillars pull against each other

| Tension | How we resolve it |
| ---- | ---- |
| P1 (no position is safe) vs P4 (fortifying and holding sectors is team labour players want to protect) | Fortification is strong but erodes, and every sector taken stretches the line. Breachers, Detonators and counter-pushes exist so a perfect fortress never stays perfect |
| P2 (real geography) vs balance and fairness | Site selection, sector placement and the gameplay layer are the balancing tools; geometry is not |
| **P3 inside itself: grounded ballistics vs first-person melee** | **Range decides.** Ballistics matter on the long axes (167th Street, the fields, the cemetery) and are irrelevant at 2 m, where melee is faster, free of ammo and pays more salvage. Houses, garages and the woods guarantee close quarters every round. Ammo is finite (no drops; the crate's and the supply points' stock is limited), so melee stays the economy's engine, and the Grabber, the Plated and heavy-melee breaching keep it necessary. If the halves still conflict, ballistic weight wins (Pillar 3) |
| P3 (melee parity) vs the gun and attachment power fantasy | Every attachment is a trade-off along handling, stability and velocity; guns cost ammo, and in the full tier they make noise |
| **P4 (role interdependence) vs squad-shooter class play with fewer than four players** | Roles make things fast, cheap, mobile or remote; they never make them possible, and every fallback stays meaningfully worse than the hand-off (Pillar 4's test). Universal fallbacks plus the squad-gap kit keep 2–3 player squads whole, and solo has its own kit and tuning, never the reference case |
| P2 (a real ~1.2 km map) vs P4 (only four people) | Sectors concentrate the fight at the frontline; squad spawn and sector spawn cut travel; most houses are sealed |
| Grounded realism (Visual Identity Anchor) vs readability | Readability wins in the close and street bands (2–150 m, system 7): shape language, silhouettes and rim light beat atmosphere. At night the long band is deliberately harder and is carried by motivated light, flares and the Spotter's marks |

### Anti-Pillars (What This Game Is NOT)

- **NOT a PvP shooter.** No PvP modes. Every netcode and balance decision serves co-op PvE, which lets us trust the
  client for melee, parry and projectile hit claims within a tolerance (Pillar 3) and budget the network for the
  horde and destruction.
- **NOT a large-scale combined-arms shooter.** Four players, no large headcounts, and no vehicle combat at 1.0 (A33;
  Q11 asks the user). We take the squad-shooter feel, not its scale.
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

**Direction: "Ground Truth"** (from the user's direction U7; A34 records how it absorbs "Survey Grade"; A41 records
the fixes from AD-CONCEPT-VISUAL round 1)

**Visual rule:** ***"It is the real street on its worst night."*** Grounded realism: the real suburb looks real
(physically based materials, Lumen global illumination, Nanite geometry, realistic light, dust, smoke and heavy weapon
audio), then the horde and the squad's own war slowly take it apart.

**"Combat range" means System 7's three bands:** close (2–30 m: yards, hallways, the woods), street (30–150 m:
residential streets) and long (150–400 m: 167th Street, the fields, the cemetery). Every readability test below is
run per band.

**Supporting principles:**

1. **Honest materials, honest damage.** Every surface is a real suburban material: vinyl or wood siding, asphalt
   shingles, brick veneer, drywall, concrete driveways, lawn. Damage exposes what is really inside (studs,
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
   Streetlights die as infrastructure breaks; the squad's own lights mark the sectors it holds.
   *Minimum readability at night, per band:* close: always readable (weapon lights, work lights, muzzle flash);
   street: readable under any surviving streetlight, fire or work light, and a zombie's silhouette never goes fully
   black against the sky; long: readable only where a motivated source lights the axis or the Spotter has marked the
   target, so night makes long range deliberately harder and gives flares and the Spotter a job.
   *Design test:* if a lighting choice makes zombies unreadable in the close or street band, readability (rim
   light, silhouette) wins over mood.
   *Feasibility:* many motivated, shadow-casting lights is a MegaLights case on a listen-server host that also
   simulates. The art bible defines a non-ray-traced lighting path, caps shadow-casting lights per sector, and sets the
   minimum GPU before the realism art pass (R10).

**Shape language.** It governs what the game adds to the real suburb; the real suburb keeps its own shapes.

| Rule | What it means | Test |
| ---- | ---- | ---- |
| **The horde reads by silhouette and gait in its band** | Every type is hunched, off-balance or broken in line, never upright like the squad. Long band: the Detonator's swollen, front-heavy torso and slow rocking gait; the Howler's tall, arms-raised, head-back posture and the way it stops to call. Street band: the Runner's low forward lean; the Breacher's oversized shoulders and plodding gait. Close band: the Grabber's long reaching arms; the Plated's flat, slab-like improvised front. The Shambler is the baseline lurch the others are read against | Each type is named from its silhouette alone at the far edge of its band, at dusk |
| **Roles read by kit, at 30–80 m** | Squadmates are upright and carry their role on back and hips: Corpsman, a bulky medical pack and leg pouches; Quartermaster, a crate frame with ammo cans; Sapper, a long-handled tool and a charge bag; Spotter, a sensor mast and a scope case. The HUD uses Holdout's own role icons, never the reference series' class icons (U1) | A playtester names each squadmate's role from silhouette at 80 m with the HUD off |
| **Plumb is real; askew is ours** | Real construction is plumb and level. Everything the fight adds or breaks (boards, Sapper bracing, breaches, rubble, deployables) is off-axis, angled and improvised | A player can tell player-made work from the real house in a still frame |
| **Every panel state changes the outline** | Intact: a clean, continuous edge. Damaged: a bowed or cracked edge with trim missing. Breached: a jagged hole with light through it. Destroyed: gone, with stud stumps. Reinforced (flag): diagonal bracing and plates that cross the panel's outline | "Which wall is weakest" reads on vinyl siding at 30 m at dusk without relying on surface texture |

**The map shows through, on the map only.** Kept from "Survey Grade": the tactical map, sector board and HUD use a
cartographic language (footprint outlines, sector linework, OSM-style street hierarchy with real street names). This
is Holdout's own UI identity; no UI look is borrowed from any reference game. The world itself is not stylised.

**Color philosophy.** There are two layers, and the meaning colours apply to only one of them.

- **The world layer** is the real suburb: natural, physically based materials under real light, with no stylised
  global grade. Mood comes from time of day, smoke and dust. Green lawns and street-name signs, yellow centre lines
  and school-zone signs, red brick and stop signs all keep their real colours: **meaning colours are never enforced
  on world surfaces.**
- **The meaning layer** is what the game adds: UI, markers and pings, and the lights, emissives and VFX the game
  places. The meaning colours are reserved here only:

| Color (meaning layer only) | Meaning | Non-hue cue (always present) |
| ---- | ---- | ---- |
| Saturated red | **Danger**: breach warnings, explosives, structural failure, a downed squadmate | Pulse plus a hazard-stripe outline |
| Clean cyan | Squadmates, squad pings and UI | Chevron marker; Holdout's role icons |
| Sickly green-grey | The horde: horde-held sectors on the map, spotted-zombie markers | Diamond marker; hatched fill on the map |
| Road-marking yellow | Player infrastructure: supply points, armories, workbenches, deployed gadgets, fortifications you own | Square marker; solid outline |
| Sodium amber (about 2,000 K) | Light the squad places: work lights at held sectors, flares | A placed light source; the HUD repeats it with the held-sector icon |

- **Precedence when meanings overlap:** danger > squad > horde > infrastructure. A marker's **shape** says who owns
  it and its **colour** shows the highest meaning: a spotted Detonator is a horde diamond in danger red; a downed
  squadmate is a squad chevron in danger red, pulsing.
- **The world's own lights are not ours.** The suburb's streetlights are cool white (about 4,000 K, LED), so warm
  sodium amber always means a light the squad placed.
- **Colour-blind safety:** red against green-grey and cyan against green-grey are common confusion pairs, so no
  meaning relies on hue alone (see the non-hue cues above). The art bible checks every marker with colour-blind
  simulation.
- Weather (rain, fog, wet surfaces) is not part of the anchor and is in no scope tier (Scope Risks).

**Directions considered and not chosen:**
- **"Survey Grade"** (revision 1's anchor; rule: *the map shows through*): a stylised massing-model world. Superseded
  by U7 because simplified massing fights realism, and its "damage is the only diagonal" and "organic means enemy"
  principles cannot survive real gabled roofs, woods and lawns. Kept: the cartographic map and HUD, and the failing
  light.
- **"Last Broadcast"** (rule: *it happened here, on camera*): grounded, near-photoreal. Its grounded look is now
  adopted in spirit; its emergency-broadcast UI is not. Revision 1 rejected it for cost, uncanny repetition of
  procedural buildings, and digital-twin pressure. Those are now risks with mitigations (R10, R5), not vetoes, because
  realism is the user's decision.
- **"Sodium Hour"** (rule: *light is territory*): its lighting rule survives as principle 3.

---

## Inspiration and References

*These games are named for comparison only. Holdout copies no names, characters, art, maps, branding, class or mode
names, UI or look from any of them. It uses generic genre conventions (round structure, buying weapons in the world,
generic military role archetypes) and does **not** reproduce any game's signature branded mechanics (specific perk
vending machines, a mystery box, and so on).*

| Reference | What We Take From It | What We Do Differently | Why It Matters |
| ---- | ---- | ---- | ---- |
| ***Battlefield*** **series** (mechanics and feel reference only, U1) | The feel of its squad play: four role archetypes with signature gadgets (revive, resupply, repair, demolition, spotting); squad revive, spawning on squadmates, spotting and resupply; projectile ballistics with drop and travel time; heavy recoil; attachments with trade-offs; capture-and-hold sectors with a moving frontline; heavy weapon audio, dust, smoke and destruction | Four-player co-op PvE against a horde instead of large-scale PvP; our own role names (Corpsman, Quartermaster, Sapper, Spotter); no vehicles at 1.0; real OSM suburbs; deep melee; rounds and evac. No names, characters, art, maps, branding, class names, mode names or UI look are taken | Validates the squad / role / ballistics loop as a long-lived, much-loved feel |
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
- The rhythm of emergency broadcasts and civil-defence signage.

---

## Target Player Profile

| Attribute | Detail |
| ---- | ---- |
| **Age range** | 18–35 (core). An M / PEGI 18 rating is assumed for gore (Q6) |
| **Gaming experience** | Mid-core to hardcore; comfortable with FPS controls and with team roles |
| **Time availability** | 1–2 hour evening sessions with a friend group on weeknights; longer high-round attempts on weekends |
| **Platform preference** | PC on Steam, mouse and keyboard; voice chat on Discord |
| **Current games they play** | Large-scale squad shooters (the series named in Inspiration and References), *Call of Duty* Zombies, *Killing Floor 2/3*, *Vermintide 2* / *Darktide*, *Deep Rock Galactic*, *Back 4 Blood*, *The Finals* |
| **What they're looking for** | Squad-shooter feel (roles, gadgets, weighty guns) in a co-op horde game, with depth in both guns and melee, an arena that changes because of what the squad did, and a real place to hold. Plus the novelty of "that's a real town" |
| **What would turn them away** | Floaty or hitscan-feeling guns; shallow melee; roles that make a group of friends feel forced into a composition; empty oversized maps; bad netcode (rubber-banding, missed parries, rejected hits); grind for power or pay-to-win; repetitive procedural-looking houses; too little content for the price; dead lobbies for players without a full group |

---

## Technical Considerations

| Consideration | Assessment |
| ---- | ---- |
| **Recommended Engine** | **Unreal Engine 5.8, C++ and Blueprint.** This is the user's choice (U9) and is recorded as given. `/setup-engine` configures it against the pinned reference in `docs/engine-reference/unreal/`. Systems in scope: GAS, replication (Iris is production-ready in 5.8 per the release notes; the plugin still carries a Beta flag; Network Prediction gained optional Iris support), Chaos Destruction (Geometry Collection plugin is **Beta** in 5.8), Enhanced Input, World Partition, PCG (production-ready since 5.7), Geometry Scripting. Rendering: Lumen (default global illumination), Nanite (virtualized geometry), MegaLights (production-ready in 5.8; needs hardware or software ray tracing support), Lumen Lite (Beta; a medium-quality GI setting), Substrate materials (on by default since 5.7). Mass and StateTree are candidates for the horde (MassGameplay and MassCrowd are **Experimental** in 5.8). Sources: `docs/engine-reference/unreal/modules/rendering.md` and `modules/networking.md` |
| **Key Technical Challenges** | 1) Synced, persistent destruction plus navigation updates on a listen-server host, now across a ~1.2 km map. 2) Horde count against replication and server CPU. 3) **Projectile ballistics**: hit validation with travel time on a listen server, and the feel of drop and recoil. 4) Feel and netcode of first-person melee and parry. 5) **Squad systems**: revive, squad spawn safety, gadget replication, sector objective state, late join. 6) Quality of the OSM-to-level pipeline, including interiors OSM does not describe, inferred heights and rule-based cover. 7) **Grounded-realism rendering** (Lumen, Nanite, MegaLights, dust and smoke) on a host that also simulates AI, destruction and projectiles. 8) World Partition streaming and navmesh over 1.44 km², where the listen-server host must keep collision, navmesh and panel state loaded for the union of all four players' locations and every active zombie while it also renders |
| **Art Style** | 3D grounded realism ("Ground Truth") |
| **Art Pipeline Complexity** | **High** (custom 3D, raised by U7): realistic modular suburban house kits (siding, shingles, brick veneer, garage doors, porches) with variation, interior room templates, damage states for each panel and material showing real construction, woods, lawns, hedges and yard trees, ~10 zombie types, weapons, attachments, melee weapons, gadgets, first-person arm animation sets for weapons, melee and gadgets, zombie reaction animations. Outsourcing is assumed for character art, animation, audio and part of the environment kit art (A14, A43) |
| **Audio Needs** | **Adaptive and heavy.** Music that tracks round intensity. Positional horde audio is critical to gameplay (where they come from). Heavy weapon audio: distance-dependent report and tail, slap-back off house fronts, the crack of rounds passing close. Layered destruction audio |
| **Networking** | **Client-server.** A listen server (player-hosted through Steam) at MVP; dedicated servers optional later. The server owns rounds, sectors, the economy, panel states, revives, spawns and the AI; the client predicts movement, its own projectiles, melee and gadget throws. Details below |
| **Content Volume** | 1.0 targets: **3 real neighborhoods** from different cities at about 1.2 km × 1.2 km each, with 20–30 enterable buildings each, and a fourth city as the first post-launch map (A32 revised by A43), 4 roles with ~10 gadgets, ~10 zombie types including bosses, ~14 guns, ~40 attachments, ~8 melee weapons. Replay comes from rounds, sectors, roles and builds; a typical match is 45–75 min |
| **Procedural Systems** | The editor-time OSM pipeline (buildings, streets, ground cover, backdrop); rule-based cover set dressing (fences, hedges, yard trees, wrecks); generating interiors from room templates; auto-proposing the gameplay layer (sectors, ingress, caches, landing zones); random supply drops. After 1.0, possibly the same pipeline exposed to players ("Your Street") |

**Netcode for the systems revision 2 adds** (concept-level; each becomes an ADR):

| System | Authority | What replicates | Budget (estimate, to be confirmed by spikes) |
| ---- | ---- | ---- | ---- |
| **Projectile ballistics** | The shooter's client simulates its own projectiles (fixed-step, gravity) for instant tracers and impacts, and sends a **fire event** at trigger time and a **hit claim** on impact. The server re-simulates the claimed trajectory, checks the target against a history of zombie positions whose **rewind window is sized per client** from measured ping plus interpolation delay (capped at about 400–500 ms), checks rate of fire and ammo, then applies damage. Panel hits become panel-state deltas on the destruction channel. **Stale panel state:** if a panel was breached or reinforced while the bullet was in flight, the server judges the claim against its own panel state at the impact time, and the client receives a correction (the impact moves) | Fire events (weapon, time, origin, direction, seed) to relevant clients, unreliable; other clients draw cosmetic projectiles and never decide hits. Hit claims to the server, reliable | About 20 bytes per fire event; under 2 KB/s per client with four players on full auto |
| **Downed and revive** | Server | Downed state, bleed-out timer, revive progress (the bar is predicted on the reviver's client) | Negligible |
| **Squad spawn and sector spawn** | Server checks eligibility (alive, not downed) at request time; if the squadmate is pressed it searches for a navigable safe point up to about 25 m behind them for up to 5 s, then falls back to a held sector (A39) | Spawn request and result; redeploy timers | Negligible |
| **Gadgets** | Server spawns deployables; the thrower's client predicts the throw arc | Deployable actors (owner, charges, health); charge counters on players | Small: at most about 8 deployables per squad |
| **Ping and spot** | Server validates line of sight cheaply and owns marker lifetimes; the sensor's spotted set is computed on the server at about 4 Hz | Marker list to the squad, bounded (at most 16 spotted zombies) | Tiny |
| **Sector objectives** | Server state machine per sector | Owner, state, capture progress, squad and horde counts: about 3 bytes per sector, sent on change and at about 4 Hz while contested | Under 30 bytes for 6–8 sectors |
| **Late join / reconnect** | Server | Snapshot of sectors, squad state and panel states (with reinforce flags, boards, deployables and rubble) | About 16–24 KB for the first map (estimate in system 5) |
| **Total, all channels** | — | Movement, zombies (full and far tier), fire events, destruction deltas, sectors, markers | Starting budgets for the spike to confirm or revise: **under 48 KB/s down per client**, and **host upstream under 150 KB/s** (about 1.2 Mbit/s) for three remote clients |

**Not sourceable yet.** How Nanite handles animated foliage (wind) in 5.8 is NOT SOURCEABLE: the "Nanite Limitations"
in `docs/engine-reference/unreal/modules/rendering.md` (no world position offset) were written against 5.7. Verify
before the art bible commits Creek Woods (an MVP push sector) to Nanite foliage. No engine-level lag compensation for projectiles is
documented in `docs/engine-reference/unreal/`; the validation scheme above is our own and needs an ADR.

---

## Risks and Open Questions

### Top risk register

| # | Risk | Likelihood / Impact | Mitigation | Proof point |
| ---- | ---- | ---- | ---- | ---- |
| R1 | **Netcode cost of replicated destruction.** Panel states, rubble, navigation updates, late-join snapshots, now across ~22,000 panels on a 1.2 km map | Medium / High | Replicate gameplay state, not physics; panels as instanced meshes with one replicated state owner per building (system 5); debris is cosmetic and local; nav links and modifiers switch per panel instead of rebuilding the navmesh, generated only for enterable buildings and the outer ring of sealed-house pockets; most houses sealed; budget CPU on the listen-server host | Spike in MVP months 2–3: 4 clients, 100+ panel changes in a round, under 10 KB/s per client for destruction traffic, no desync after a reconnect, and a path update after a breach in under 200 ms with no full navmesh tile rebuild |
| R2 | **Horde count vs replication and server CPU, on a listen-server host that also renders and streams** | High / High | Active cap (24 MVP, 48 target) plus a queue; full zombies only near the frontline plus the far-zombie tier (system 9); lightweight movement; Iris prioritisation and relevancy; animation budgeting; headless-capable server code; Mass evaluated only after the MVP | Same spike: 24 active zombies plus 4 players at 60 fps on a mid-range host, with **48 as a stretch case**; a **300 m engagement test** against far-tier zombies; **four players in four different sectors** (World Partition streaming on the host); a representative **Lumen/Nanite stress scene** (one art-dense block at night with smoke) on the host; total bandwidth within the netcode table's budgets |
| R3 | **OSM data quality and licensing** | High / Medium | First map measured: 0% height tags, no fences or trees, no shop types, flat. Fallbacks: height by type and area, rule-based cover, sector armories, polygon repair, a completeness score for each site; ODbL attribution; legal review of whether we ship a Derivative Database. The 2.45 s pipeline result is a standalone prototype writing a blockout mesh, not a UE 5.8 bake | The first map's geometry converts with zero hand edits in about 2.5 s; **the first UE 5.8 bake of the MVP slice** (World Partition, navmesh, HLOD) is an MVP block due by month 3; legal opinion **before the Vertical Slice** |
| R4 | **First-person melee feel** (parry over latency, readable telegraphs, animation volume) | Medium / High | PvE simplification; parry judged client-side within a server tolerance; telegraph-first zombie animation; early feel prototype | Feel prototype in MVP months 1–2: playtesters rate melee as viable as guns (see MVP success criteria) |
| R5 | **Real-place sensitivity.** Violence and destruction in a recognisable real town, now shown by name, with a school and a cemetery as sectors. There is precedent: a 2006 console shooter drew a formal complaint from a cathedral it depicted | Medium / Medium | The A29 safeguards: generic houses, no addresses or house numbers, generic labels and rendering for sensitive sites, no zombies from graves, no child zombies, no municipal insignia; repository hygiene (boundary and centre only); a stricter policy before any "Your Street" release. The School Grounds sector (OSM tags the school as a kindergarten) is the most sensitive element of a US-set shooter: it never appears in marketing, and the policy decides whether it stays a sector at all (Q16) | Policy written before the Vertical Slice; reviewed against the first map's sectors |
| R6 | **Market saturation of zombie co-op** | High / Medium | Show the hook in 10 seconds of trailer: a real town's street sign, a squad taking a park, a house front coming down. Local-press angle; public matchmaking and solo for players without a group | Wishlist and playtest-signup tests on the Vertical Slice trailer |
| R7 | **Scope: five hard systems for a small team; every timeline rests on an unconfirmed team of 5 (Q2)** | High / High | Front-load the risky systems; fallbacks defined; the MVP plan has named blocks, owners, staged verdicts, a playtest-and-fix block, a 20% buffer and a stated cut list (A43). If the team is one or two people: TD-FEASIBILITY becomes HIGH RISK and PR-SCOPE UNREALISTIC, and the plan re-cuts to Vertical Slice A as an Early Access product | Q2 answered before the prototypes start; MVP lands in about 10–11 months |
| R8 | **Projectile ballistics over the network.** Rejected hits feel like lag; validating travel-time shots against moving zombies on a listen server costs CPU | Medium / High | Client-simulated projectiles with server validation against a per-client rewind window (ping plus interpolation delay, capped at about 400–500 ms; A28); a stale-panel rule (netcode table); PvE tolerance; hybrid fallback (hitscan inside about 50 m) | Netcode spike: 95% or more of client hit claims accepted at 100 ms simulated latency and 90% or more at 200 ms; fire-event traffic under 2 KB/s per client |
| R9 | **Scope added by revision 2**: four roles, gadgets, squad spawn, ping, resupply, ballistics, sectors, realism | High / High | Minimal gadget versions at MVP; sectors reuse the spawn director; passives, second gadgets, penetration and throwables move to the Vertical Slice; the timeline grows honestly (A43) | MVP in about 10–11 months with all four roles playable |
| R10 | **Grounded-realism cost and performance.** Realistic houses repeat across 745 buildings and can look uncanny; Lumen, Nanite and many motivated night lights (MegaLights needs ray-tracing support) run on a host that also simulates | High / Medium | Modular kits with regional-style variation and the neighbour variation rule (Visual Identity Anchor, principle 2); hip and compound roofs before the art pass; scalability tiers including Lumen Lite (Beta); a non-ray-traced lighting path, a cap on shadow-casting lights per sector, and a minimum GPU set before the realism art pass; host budgets set in the spike. The realism pass starts where the risk is: **one residential block and the 167th Street corridor, at dusk** | Vertical Slice A: that block and the 167th Street corridor art-passed, at dusk, at 60 fps on the target mid-range host (GPU target set by `/setup-engine`) |
| R11 | **Map scale vs four players.** A 1.2 km map can feel empty, with dead time spent travelling | Medium / Medium | The frontline concentrates the fight; squad spawn and sector spawn; sectors 150–400 m apart; the linear sector-chain fallback | MVP telemetry: under 15% of match time spent travelling out of combat |
| R12 | **Proximity to the squad-shooter reference.** "Feels like X" must never become "copies X" | Low / High | Own role names, no mode names, no UI look, no branding; reference named only in Inspiration and References; an IP checklist before any public material | IP checklist passed before the first trailer |

### Design Risks
- Fortification could become a dominant "turtle" strategy that breaks Pillar 1. Mitigation: Breachers, Detonators and
  counter-pushes erode it, the cost of reinforcing scales up, evac needs a landing-zone sector, and supply drops pull
  players into the open.
- Capture-and-hold could spread four players too thin, so the game turns into running between sectors. Mitigation:
  the spawn director focuses pressure; Dig In is always available; the linear sector-chain fallback.
- One role could become mandatory ("no Corpsman, no run"). Mitigation: universal fallbacks; roles make things faster,
  not possible; playtest the win rate of squads missing each role.
- Endless escalation may still produce sessions that run too long. Mitigation: evac windows give the squad a choice
  about when to stop.
- Real geography may produce dull layouts (wide suburbs, long empty arterials). Mitigation: site-selection criteria,
  sector placement and boundary choice (Pillar 2's design test).
- Melee may be ignored once guns are upgraded and the Quartermaster keeps everyone fed (Pillar 3 failure). Mitigation:
  finite crate stock, no ammo drops, the melee salvage bonus, Grabber and Plated moments, heavy melee as a destruction
  tool, close quarters by geography.
- Ballistics realism could hurt readability or fun against fast zombies. Mitigation: scaled velocities if needed
  (Q13); drop only matters beyond about 150 m.
- Solo play may feel hollow because it is built around hand-offs (Pillar 4). Mitigation: the solo kit and solo
  tuning, plus public matchmaking for quick play.
- Squads may still park one player out of the fight as a safe spawn point, which pulls against Pillar 4's hand-offs.
  Mitigation: A39 (pressure delays and offsets the spawn, never blocks it); the MVP playtest watches for it.
- Sectors narrowed from the user's wording (CD-PILLARS round 1): U6 says sectors are real intersections, blocks and
  parks, but revision 2 made all blocks connective. Mitigation: block sectors are now allowed (system 1, 6.1); how
  many the first map gets is Q17 for the user.
- The night curve could still hide too much at long range (AD-CONCEPT-VISUAL round 1). Mitigation: the curve is
  stretched (night arrives around rounds 15–20) with motivated light sources and per-band readability minimums
  (Visual Identity Anchor, principle 4); the MVP is greybox and checks readability per band in playtests.

### Technical Risks
- R1, R2 and R8 above. All are budget problems on a **listen-server host**, which must also render (R10) and keep
  collision, navmesh and panel state loaded for the union of all four players' locations. Server code stays
  headless-capable from day one so a dedicated server remains a build target, not a rewrite.
- **Navigation after destruction, at map scale.** Rebuilding the navmesh at runtime is expensive. Pre-baked nav links
  and modifiers per panel are the plan, generated by the OSM pipeline **only for enterable buildings and the outer
  ring of sealed-house pockets** (22,000 panels would otherwise be a large, unbudgeted data set), with navmesh tiles
  streamed through World Partition across 1.44 km². Spike pass criterion: a path update after a breach in under
  200 ms with no full tile rebuild. Rubble ramps for Crawlers need authored nav per rubble state and are deferred until
  the basic breach path is proven.
- **Spawning out of sight** on open fields, the cemetery and 167th Street, with four players, magnified optics and a
  sensor. Mitigation: per-sector spawn closets from the gameplay-layer generator and the "not within line of sight
  inside 80 m" rule (system 1).
- **Long-range targets vs the active cap.** A Shambler crossing 300 m of open ground takes minutes; full actors out
  there would starve the doorway fight. Mitigation: the far-zombie tier at MVP (system 9), tested at 300 m in the spike.
- **Chaos Destruction is Beta in 5.8.** Use Geometry Collections only for cosmetic fracture and debris; keep
  gameplay state in our own panel system so a change in Chaos cannot break gameplay.
- **Mass is Experimental in 5.8**, and 5.8 reworked it. Do not build the MVP horde on it.
- **Interiors.** OSM has no interior data, so generated interiors (suburban room templates) are a large hidden scope
  item. Fitting templates into real, irregular footprints is a hard procedural problem (169 of 693 gabled footprints
  on the first map are not near-rectangles). Mitigation: enterable houses are restricted to near-rectangular
  footprints by rule, and the target is 20–30 per map until the generator is proven on the second city (A30, A43);
  the MVP's 6–8 are hand-fitted.
- **Night lighting.** Night by rounds 15–20 with streetlights, squad work lights, fires and muzzle flash is a
  many-shadowed-lights case. MegaLights needs ray-tracing support per the pinned reference, and Lumen Lite is Beta, so
  the minimum spec is undecided. Mitigation: a non-ray-traced lighting path in the art bible, a cap on shadow-casting
  lights per sector, and the minimum GPU set before the realism art pass (R10).
- **Memory and streaming.** Hundreds of procedural houses, each with damage-state meshes and realistic materials.
  Shared modular kits, instancing and Nanite are required.
- **Nanite foliage** for Creek Woods (an MVP push sector) is NOT SOURCEABLE in the pinned reference yet (see Technical
  Considerations).
- **Late join, reconnect and host migration.** Late join is feasible thanks to compact state. At MVP a host quitting
  ends a 45–75 minute match, a retention risk. Mitigation with a decision date: Vertical Slice A adds the intermission
  checkpoint and "resume from last intermission" with a new host (system 10). Full host migration stays out of scope.
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
- Five systems each hard enough to be a team's main focus (destruction netcode, horde AI, first-person melee,
  gunplay with ballistics and attachments, the OSM pipeline), plus the squad layer (roles, gadgets, squad spawn,
  sectors) on top.
- Animation volume: first-person arms for each weapon and gadget, melee sets, revive and drag animations, zombie hit
  reactions and dismemberment. The MVP alone needs first-person sets for 4 guns, 2 melee weapons, 5 gadgets and
  revive, plus 3 zombie types with telegraphed attacks. **Greybox placeholder animation is acceptable at MVP**;
  outsourcing lead time (briefing, contracting, review rounds) starts in MVP month 1 so final sets land for the
  Vertical Slice.
- Each ~1.2 km map needs interiors for its enterable buildings, a gameplay-layer polish pass, a realism art pass, and
  QA across combinations of destruction and sector states.
- QA of networked destruction and sectors: the state space is combinatorial, so automated soak tests are needed.
- **The realism art pass is the likeliest real cut under pressure, and it is not graceful**: a greybox suburb fails
  U7. Minimum bar that cannot be cut: **one fully art-passed map** (the first map) at the grounded-realism bar.
- Weather (rain, fog, wet surfaces) is in no tier. Adding it is a producer decision with its own cost.
- Q11 (vehicles) and Q6 (gore and rating) are open user decisions with large scope effects; a yes on vehicles
  invalidates the current PR-SCOPE verdict and needs a re-run.

### Open Questions

| # | Question | How we answer it |
| ---- | ---- | ---- |
| Q1 | ~~Which real place is the first map?~~ **RESOLVED 2026-11-19 by the user (U8): "Tinley Park, IL (60477)".** OSM completeness is scored (system 6.1: footprints good, heights absent, no cover or shop data) and sensitive sites are handled by A29. The location was checked against the user's correction (U10): the box covers the intended area | Remaining: re-extract with the box widened west (Lewis Park) and snapped to a coarse grid, then the level GDD confirms sector placement and the MVP slice (A38) |
| Q2 | **(Gating.)** What are the actual team size, budget and runway? Is the developer solo? Every timeline in Scope Tiers, the TD-FEASIBILITY verdict and the PR-SCOPE verdict depend on it | User input, **before the prototypes start**. Then PR-SCOPE and TD-FEASIBILITY re-check against it. Placeholder until then: A14 and the funding placeholder in Scope Tiers |
| Q3 | ODbL: does shipping processed OSM data create a Derivative Database with share-alike duties? What exact attribution does a game need? Any issue with using a real town's name and its street names commercially? (Could not be re-verified online in revision 1.) | Legal review plus the OSMF attribution guidelines, **before the Vertical Slice** (moved from Alpha because the names are player-facing) |
| Q4 | Is the active-zombie cap of 24 → 48 enough to feel like a "horde" on a 1.2 km map? | Feel prototype and netcode spike; the far-zombie tier keeps long-range targets from eating the cap |
| Q5 | One currency or two (salvage plus materials)? | Playtest the single currency at MVP; revisit at the Vertical Slice |
| Q6 | Gore level and target age rating (M / PEGI 18 assumed) | User decision; it affects dismemberment scope |
| Q7 | Is the hook really novel? (No web research was possible in revision 1.) | Competitive research (`/competitive-brief` or manual) before marketing copy |
| Q8 | "Your Street": post-1.0 feature, or never? Is runtime generation (shipping the pipeline in the game) worth the cost? | Decide at Alpha, using the pipeline-genericity KPI and the sensitive-site policy |
| Q9 | Early Access or a straight 1.0 launch? | Producer decision at the Vertical Slice, using wishlist data |
| Q10 | How is melee direction chosen: mouse-motion direction or a modifier key? | Feel prototype A/B test |
| Q11 | Vehicles: the squad-shooter reference has them, the user's direction did not mention them, and A33 excludes them at 1.0. Does the user want any? | User decision; if yes, re-run PR-SCOPE (large scope) |
| Q12 | Is a ~1.2 km map right for four players, or should the playable area shrink? | MVP telemetry on travel time (R11) |
| Q13 | Real-world muzzle velocities, or scaled so drop reads inside about 400 m? | Feel prototype A/B test |
| Q14 | Role limits: are duplicates fine (A35), or should a squad be capped at two of a role? | MVP playtests |
| Q15 | Penetration through wood-frame walls: does "cover from sight but not from fire" read clearly against a horde? | Vertical Slice spike |
| Q16 | In-game labels for the school and the cemetery: generic (A29) or their real names? Should the school stay a sector at all (R5)? | User confirms or overrules A29 |
| Q17 | U6 names intersections, blocks and parks as sectors. Revision 2.1 allows block sectors but proposes none yet. How many residential-block sectors should the first map have (none, one on each side of 167th Street, or more)? | User decision, then the level GDD places them |
| Q18 | Is A38 the right reading of U10: home sector on 167th Street at the Ridgeland Avenue crossing, the wooded park labelled "Creek Woods", and the MVP built on the middle slice? | User confirms or overrules A38 before the level GDD |
| Q19 | The night curve was carried over by the facilitator (A15, A34) and stretched in A41 (dusk at round 10, night around rounds 15–20). Keep it, stretch it further, or make it a cycle with dawn toward each evac window? | User decision; the art bible then sets the light plan |

### Assumptions and Decisions Log

#### User decisions (2026-11-19, authoritative)

*Given directly by the user on 2026-11-19. They override every facilitator assumption they touch.*

| ID | Decision (user's direction) | What it changed in this document |
| ---- | ---- | ---- |
| U1 | **Feel like Battlefield in its mechanics** (the user's words). Mechanics and feel only: no names, characters, art, maps, branding, class names or UI look copied. Player-facing text never names the reference; this document names it only in Inspiration and References and in this decision record | Pitch, fantasy, MDA, loops, Pillars 3 and 4, Inspiration and References, risk R12 |
| U2 | **Role-based soldiers, about four roles, each with signature gadgets** (revive kit, resupply crate, repair/reinforce tool, breach charge, sensor). Must work for 4-player co-op and for fewer players | System 2 (roles and gadgets, squad-gap kit), A22–A24, A35 |
| U3 | **Squad play:** revive downed teammates, spawn on squadmates, ping and spot enemies and points of interest, resupply ammo | System 3, A25 |
| U4 | **Realistic ballistics:** projectile bullets with drop and travel time, weighty recoil, attachments with real trade-offs (handling, stability, velocity) | System 7, Pillar 3, A27, A28, R8 |
| U5 | **Player count: 4-player online co-op** (kept; not a large-scale headcount) | Core Identity, anti-pillars, system 10 |
| U6 | **Match structure: round-based waves plus objectives:** capture-and-hold sectors of the real neighborhood, a frontline the horde pushes against; sectors are real intersections, blocks and parks | System 1, Core Loop, A26 |
| U7 | **Visual tone: grounded realism** (realistic lighting, dust, smoke, heavy weapon audio; the real suburb looking real; UE 5.8 Lumen and Nanite). Reconcile with the existing anchor | Visual Identity Anchor ("Ground Truth"), A34, R10 |
| U8 | **First map: "Tinley Park, IL (60477)"**, a ~1.2 km × 1.2 km area of suburban Tinley Park, Illinois, spanning both sides of 167th Street. The map is named after neither OSM subdivision (the user corrected an earlier draft that used a subdivision name). Data from the OpenStreetMap main API; ODbL attribution required | System 6.1, Q1 resolved, A30 |
| U9 | **Everything from the original concept stays:** guns with attachments; melee with swing, block, parry and stamina; building destruction synced online; zombie hordes in escalating rounds; maps from real-world OSM data; UE 5.8; PC on Steam | Systems 5, 7, 8, 9; Technical Considerations |
| U10 | **The area is not "Lancaster"** (the user's correction, 2026-11-19). The user asked for the map's location to be checked against the area they specified and said that area is not "Lancaster". Checked against the extract the same day: the box covers the intended area with margin on every side | System 6.1 (location check; the word "Lancaster" removed from every label; the home sector moved to 167th Street; the wooded park labelled "Creek Woods"), MVP item 9 (the middle slice), A38, Q18 |

#### Facilitator assumptions

*Calls the facilitator made in place of the user. Each row can be overruled. "Impact if overruled" names what would
change. Status: **Active**, **Revised** (still in force, changed in revision 2), or **Superseded** (no longer in
force).*

| ID | Decision | Alternatives considered | Why | Impact if overruled | Status |
| ---- | ---- | ---- | ---- | ---- | ---- |
| A1 | Core feel is "desperate but skilful"; the key variable is world reactivity | Power fantasy; tactical-slow | Fits escalation and two-edged destruction | Tone and pacing of the combat GDDs | Active; extended to "desperate, skilful and grounded" by U1 and U4 |
| A2 | Matches are endless and round-based, with **evac windows at rounds 10/20/30**; a wipe ends the match | Fixed final round; pure endless | A natural stopping point plus an open ceiling | Session-length targets, the round GDD | Active; evac now needs a held landing-zone sector, and losing the last sector also ends the match (A26) |
| A3 | One currency, **Salvage**: individual wallets plus a give action | Two currencies; shared wallet; trader menu | Simple to learn; keeps every choice an opportunity cost; supports Pillar 4 | Economy GDD, UI | Revised: no zone purchases; earned also from squad actions and held sectors (A26, A37) |
| A4 | **Panelized destruction.** "Same result for every client" means identical gameplay state (holes, rubble, routes, cover). Debris is cosmetic and may differ | Replicated physics debris; voxels; doors and windows only | The only route an indie budget can afford to synced destruction | If identical debris is required: R1 becomes HIGH RISK; re-run TD-FEASIBILITY | Active |
| A5 | Both players **and** the horde destroy (Breacher, Detonator, Wrecker) | Players only | This is what makes Pillar 1 two-edged | Horde roster, AI scope | Active |
| A6 | Curated real maps at launch, from an editor-time pipeline that is generic for any neighborhood; **player-facing "Your Street" after 1.0** | Runtime generator at 1.0 | Scope, quality and real-place safety | If "Your Street" is wanted at 1.0, roughly +6–9 months; re-run PR-SCOPE | Active |
| A7 | Bounded holdout zone (300–500 m, 3–6 zones); the rest of the city is backdrop | Whole neighborhood playable | Horde pacing and performance | Level and world GDDs | **Superseded** by U6, U8 and A30 |
| A8 | Strip names, brands and house numbers; generic facades; sensitive-site policy | Photoreal digital twin | Legal and ethical exposure | Art direction, pipeline filters | **Revised** by A29 (street and park names now shown) |
| A9 | The match is the core progression; meta is **horizontal only** (unlocks widen pools, cosmetics, mastery) | Roguelite permanent upgrades | Round 1 stays a real fight; no power gap between friends | Retention design, economy | Active; role mastery unlocks sidegrade gadget variants |
| A10 | **Premium**, about USD 19.99–24.99; post-launch cosmetics only | F2P; battle pass | Fits the audience and the anti-pillar; no live-service burden | Business model, meta design | Active |
| A11 | **Listen server via Steam** at MVP; dedicated optional later; no host migration | Dedicated servers from day one | Cost; PvE is not sensitive to host advantage | Server-infrastructure budget | Active |
| A12 | Melee is simplified for PvE: no feints, morphs or riposte chains; parry judged client-side within a server tolerance | PvP-grade melee | Scope; co-op PvE has a low cheating incentive | Melee GDD, netcode ADR | Active |
| A13 | Active-zombie cap of **24 at MVP, 48 target**, plus a spawn queue | 100+ simultaneous zombies | Replication and CPU budget; the genre convention works | Horde feel (Q4) | Active |
| A14 | **Team of 5** (2 gameplay/network engineers, 1 tools/tech engineer, 1 designer-producer, 1 environment/tech artist), with character art, animation and audio outsourced | Solo developer | "Indie commercial, full studio pipeline" | If solo, Full Vision is not realistic: plan to launch the Vertical Slice tier in Early Access and re-run PR-SCOPE | Revised: team assumption unchanged and **still unconfirmed (Q2, gating)**; outsourcing now also covers part of the environment kit art; timeline about 40–44 months with a funding placeholder (A43). If the team is one or two people, TD-FEASIBILITY becomes HIGH RISK and PR-SCOPE UNREALISTIC: re-cut to Vertical Slice A as an Early Access product |
| A15 | Visual Identity Anchor is **"Survey Grade"**, with the lighting rule from "Sodium Hour" | Sodium Hour; Last Broadcast | Made procedural real architecture look intentional | The `/art-bible` starting point | **Superseded** by U7 and A34 (its night curve survives, stretched by A41; Q19) |
| A16 | Solo is supported as a scaled mode | Co-op only | Wider audience; covers players without a group | Balance tuning | Active; solo kit at the Vertical Slice (A24) |
| A17 | Pillars revised after the CD-PILLARS self-review | Keep the draft pillars | Gate feedback | Pillar wording | **Superseded** by A36 |
| A18 | All five PR-SCOPE self-review adjustments applied | Keep the original MVP | Scope realism | MVP contents | **Superseded** in part by A31 (the MVP and tiers are re-cut; the deferrals of "Your Street" and the second map still hold) |
| A19 | Weapons are sold at caches placed by real shop **types**; the only randomness is supply drops | Random loot rarity | Map knowledge matters (Pillar 2) | Weapon-acquisition GDD | **Revised** by A37 |
| A20 | Friendly fire off by default | On | Co-op accessibility; fewer grief vectors | A hardcore option later | Active; covers bullets and the Sapper's charges |
| A21 | Dead players return next round with a sidearm and keep their salvage | Permadeath for the match | Keeps friends in the session (Pillar 4) | Fail-state tuning | **Superseded** by A25 |
| A22 | (2026-11-19) Four roles with Holdout's own names: **Corpsman** (revive kit, med pouch), **Quartermaster** (ammo crate, ammo pouch), **Sapper** (reinforce tool, breach charge, collapse charge), **Spotter** (sensor, spotting scope) | Five roles with a separate assault role; the reference's class names; classless gadget picks | Four roles for four players; every U2 gadget has a home; the Sapper embodies Pillar 1 | Role GDD, gadget content, animation list | Active |
| A23 | (2026-11-19) Weapons are open to every role; roles are defined by gadgets and (from the Vertical Slice) one passive | Role-locked weapon families | Keeps weapon content unsplit and melee independent of role | Weapon and role GDDs | Active |
| A24 | (2026-11-19) Fewer than four players: universal slow fallbacks plus the **squad-gap kit** (unfilled roles' gadgets in light versions); solo kit at the Vertical Slice; **no AI squadmates** | AI bots; free role switching at any time | Satisfies U2's "fewer players" without AI-teammate scope; keeps hand-offs human | Party-size scaling, AI scope | Active |
| A25 | (2026-11-19) Death → redeploy on a squadmate (10 s) or a held sector (15–30 s); keep weapons and attachments; lose 10% of salvage; wipe = everyone downed or dead at once | Return at next round start (A21); permadeath | U3 asks for squad spawn; avoids dead time in long rounds | Fail-state and round GDDs | Active; the squad-spawn eligibility rule is revised by A39 |
| A26 | (2026-11-19) Sector model: 6 sectors on the first map at real landmarks plus connective blocks; the squad starts holding one home sector, the rest start horde-held; each intermission chooses Push or Dig In; evac needs a held landing-zone sector; losing the last sector ends the match | Zones bought with salvage; a fixed attack-defend sequence; all sectors neutral at the start | Turns U6 into a loop with choices and a moving frontline | Round, objective and level GDDs | Active; home sector set by A38; block sectors now allowed (Q17) |
| A27 | (2026-11-19) Ballistics: projectiles with gravity drop and travel time; no drag or wind at MVP; velocities may be scaled (Q13); penetration by material class, prone and mounting at the Vertical Slice | Hitscan with falloff; full external ballistics | Meets U4 while staying grounded rather than mil-sim | Gunplay GDD, netcode ADR | Active |
| A28 | (2026-11-19) Projectile netcode: shooter-client simulation, server-validated hit claims against a zombie position history, cosmetic fire events for other clients; hybrid hitscan inside ~50 m as the fallback | Server-simulated replicated projectile actors; full client trust | Responsive in co-op PvE at a bandwidth an indie can afford | ADR; R8 | **Revised** (TD-FEASIBILITY round 1): the fixed ~250 ms window becomes a per-client window (ping plus interpolation delay, capped at about 400–500 ms), tested at 150–200 ms; stale-panel rule added (A42) |
| A29 | (2026-11-19) Real names: show the town name, OSM street names and public park, creek and trail names; never house numbers, addresses, residents, brands or municipal insignia; houses realistic but generic; sensitive sites generic with generic labels; no zombies from graves; no child zombies | Strip all names (A8); show every name including institutions | Resolves "You Know This Place" against "names stripped": recognition comes from streets and parks, never from homes or institutions | Pipeline label filters, art direction, R5, Q16 | Active |
| A30 | (2026-11-19) The whole ~1.2 km extract is the map; the fight concentrates at the frontline; 40–60 enterable buildings per map (MVP 6–8), the rest sealed with breachable shells; fences, hedges and yard trees set-dressed by rule | Cut a 300–500 m holdout zone (A7); make every house enterable | Honours U8's area at an affordable interior cost | Level GDD, art volume, R11 | **Revised** by A43: **20–30** enterable buildings per map, near-rectangular footprints only, until the interior generator is proven on the second city |
| A31 | (2026-11-19) MVP re-scoped to ~6 months: keeps four roles with five gadgets, squad play, projectile ballistics and sectors on a three-sector slice; moves passives, second gadgets, throwables, penetration, the other three attachment slots (magazine, underbarrel/grip, stock), solo, evac and the full map to later tiers | Keep the 4-month MVP and defer roles or ballistics | Roles, squad play and ballistics are the new hypothesis, so they cannot be deferred; honest timeline instead | MVP contents, R7, R9 | **Superseded** in part: the deferrals still hold; the ~6-month length is replaced by A43 (about 10–11 months) and the slice by A38 |
| A32 | (2026-11-19) Full Vision 36–42 months with a team of 5; **4 launch maps** (was 5–6) at ~1.2 km² each | Keep 5–6 maps and accept 45+ months | Each map is about four to ten times the previous playable area and art-passed for realism | Content volume; re-run PR-SCOPE | **Revised** by A43: **3 launch maps** plus a fourth after launch; about 40–44 months |
| A33 | (2026-11-19) No vehicles at 1.0 | Vehicles as part of the squad-shooter feel | Not in the user's direction; very large scope | If wanted: large scope, re-run PR-SCOPE (Q11) | Active |
| A34 | (2026-11-19) Visual Identity Anchor **"Ground Truth"** (from U7): keeps Survey Grade's cartographic map and HUD and the failing-light rule; drops the simplified massing look and the "grid, broken" and "organic means enemy" principles | Keep Survey Grade with realistic lighting only | Those principles fight realism; the kept parts support it | The `/art-bible` starting point | Active; extended by A41 (shape language, colour layers) |
| A35 | (2026-11-19) Duplicate roles allowed at MVP | A cap of two per role; one of each role | Friends should not be locked out of a role; playtests decide | Role GDD (Q14) | Active |
| A36 | (2026-11-19) Pillars revised for revision 2: P1 extended to territory; P3 becomes **Weight at Every Range** (ballistics and melee); P4 becomes **Four Roles, One Line** | Keep "Steel Answers What Lead Can't" and "Four Hands on the Door" | The old P3 and P4 did not cover ballistics or roles | Pillar wording; CD-PILLARS re-run | Active |
| A37 | (2026-11-19) Caches: sector armories and workbenches at held sectors, garage caches across the map; real shop-type caches remain the rule on maps that have shops | Generic caches placed anywhere by rule | The first extract has no shop tags; armories make territory matter | Economy and level GDDs | Active |
| A38 | (2026-11-19, from U10) **Home sector: 167th Street**, capture zone and enterable anchor houses at the Ridgeland Avenue crossing. The wooded park's sector is labelled **"Creek Woods"** (after Tinley Creek). The **MVP slice is the middle slice**, about 600 m wide, from Creek Woods north across 167th Street to the School Grounds. Lewis Park Fields is the first add-back after the re-extraction | Keep the woods as home under a new label; make the School Grounds home (rejected: the most sensitive site, R5); keep the south-west slice | U10 says the area is not "Lancaster", so neither the label nor the first playable should centre on the park that carries that name; a home on the spine tests both range bands from round 1; the slice no longer depends on Lewis Park, half of which is outside the box | Level GDD, onboarding (round 0 at a crossing, not in the woods), MVP item 9 (Q18) | Active |
| A39 | (2026-11-19, CD-PILLARS round 1) **Squad spawn:** a pressed squadmate delays and offsets the spawn (up to ~25 m behind them, up to 5 s more, then a held sector) instead of blocking it | Keep "not pressed" as a hard condition; spawn only at sectors | The hard condition rewarded one player for staying out of the fight, against Pillar 4 and the squad-spawn feel of U3 | Squad-play GDD, spawn ADR | Active; the MVP playtest watches for "anchor" parking |
| A40 | (2026-11-19, CD-PILLARS round 1) **Pillar clarifications:** P1 adds counter-edges (breached sealed pockets become spawn closets; charges damage the squad's own fortifications) and logs friendly fire off as an accepted exception; P2 states that recognition rests on grid, names, parks and regional style; P3 states that ballistic weight wins when its halves conflict and logs the hitscan fallback as a pre-authorised exception; P4 requires every fallback to stay meaningfully worse than the hand-off. Supply points get a per-round stock so ammo stays finite | Leave the pillars as written; split P3 into two pillars | Each change closes a gap the creative director found without changing a user direction | Pillar wording; economy, squad-play and destruction GDDs | Active |
| A41 | (2026-11-19, AD-CONCEPT-VISUAL round 1) **Visual anchor fixes:** shape language (horde by silhouette and gait per band; roles by kit; plumb versus askew; panel states change outlines); meaning colours only in the UI, marker and added-light layer, with a precedence order and a non-hue cue for each; the suburb's streetlights cool white so amber always means the squad; the night curve stretched (dusk at round 10, night around rounds 15–20) with motivated sources and per-band readability; regional house style and a neighbour variation rule; "weather" dropped | Keep the night-by-round-10 curve; enforce meaning colours on world surfaces | The anchor lacked shape language, and its colours clashed with what a real suburb already looks like | The `/art-bible` starting point (Q19) | Active |
| A42 | (2026-11-19, TD-FEASIBILITY round 1) **Technical mitigations:** a far-zombie tier at MVP; spawn closets and the 80 m line-of-sight rule; a per-client rewind window and a stale-panel rule; panels as instanced meshes with one state owner per building and a 16–24 KB snapshot budget; nav links only for enterable buildings and the outer pocket ring; headless-capable server code; the intermission checkpoint and resume at Vertical Slice A; total bandwidth budgets; extended spike criteria | Wait for Mass for distant zombies; full host migration | Each closes a feasibility gap the technical director found at low cost | Netcode and destruction ADRs, horde GDD, R1, R2, R8 | Active |
| A43 | (2026-11-19, PR-SCOPE round 1) **Scope re-cut:** MVP about 10–11 months with named blocks, owners, staged verdicts, a playtest-and-fix block, a 20% buffer and a stated cut list; the Vertical Slice split into A (full first map) and B (second city); 1.0 with **3 launch maps** at 20–30 enterable buildings each and part of the environment kit art outsourced; about 40–44 months; legal review before the Vertical Slice; a funding placeholder; every timeline provisional until Q2 | Keep the 6-month MVP with a cut list only; add a second in-house environment artist and keep 4 maps | Makes every required MVP item scheduled and every tier sized against the assumed team, while keeping all user directions | Scope Tiers, MVP, Core Identity, Content Volume, R7, R9 | Active; re-check by PR-SCOPE pending |

---

## MVP Definition

**Core hypothesis:** *"A four-player squad of distinct roles, holding and taking sectors of a real suburb, finds the
fight → resupply and revive → spend → fortify-or-breach → push-or-dig-in round loop compelling for 45+ minutes; the
grounded gun feel and the melee both earn their place; and destruction and sector decisions matter: squads change
their plan because of what they broke or took."*

**Required for MVP** (re-scoped for revision 2, A31; scheduled in revision 2.1, A43):
1. **A round system with sectors:** escalating waves, an active cap of 24 plus a queue, intermissions with Push or Dig
   In, three sectors with capture, contest, hold and overrun, sector spawn and supply points, and both fail states
   (wipe, last sector lost).
2. **Four roles and five gadgets:** Corpsman (revive kit), Quartermaster (ammo crate), Sapper (reinforce tool, breach
   charge), Spotter (sensor), plus the squad-gap kit for 2–3 player squads.
3. **Squad play:** downed and bleed-out; universal slow revive and the Corpsman's fast revive; squad spawn and sector
   spawn with redeploy timers; a basic contextual ping; resupply from the crate and from held sectors.
4. **The Salvage economy:** a sector armory (weapons and ammo), a workbench (attachments), fortify and repair, breach
   charge refills, garage caches, squad-action and sector income.
5. **Gunplay with ballistics:** 4 guns (pistol, shotgun, assault rifle, DMR) with projectile drop, travel time and
   weighty recoil; **3 attachment slots** (optic, muzzle, barrel) and about 9 attachments.
6. **Melee:** 2 weapons (one blunt, one heavy that can breach), directional light and heavy swings, block, parry,
   shove, shared stamina.
7. **Panelized destruction and fortification**: server-authoritative and synced to 4 clients, with navigation
   updates, cosmetic local debris, and a late-join snapshot.
8. **3 zombie types:** Shambler, Runner, Breacher.
9. **The middle slice of Tinley Park, IL (60477)** (A38), about 600 m × 950 m, running north–south from Creek Woods
   across 167th Street to the School Grounds, baked into a UE 5.8 World Partition level from the first-pass OSM pipeline:
   three sectors (**167th Street as home**, capture zone at the Ridgeland Avenue crossing; **Creek Woods**; **School
   Grounds**), 6–8 hand-fitted enterable houses, the rest sealed with breachable shells, per-panel nav links,
   rule-generated fences and hedges. Greybox art; ODbL attribution in the game. The level GDD may adjust the slice
   (Q18).
10. **4-player online co-op** over a Steam listen server, with a lobby and invites.
11. **A minimal HUD and feedback layer**: round counter, salvage, sector status and capture progress, squad markers
    and pings, panel damage states, parry and hit feedback.

**MVP success criteria (playtest):**
- Median session reaches round 10 or later.
- At least 70% of testers want "one more match".
- Every squad makes 5 or more deliberate fortify or breach decisions per match and can describe one that backfired.
- In at least 70% of sessions the squad captures a sector by round 8, and in at least 50% it loses a sector at least
  once (the frontline moves both ways).
- Squad actions (revive, resupply, repair or reinforce, spot assist) average 3 or more per player per round in
  rounds 5–10.
- *Signal, not a gate:* melee kills are 25% or more of kills in rounds 1–10. A miss triggers melee tuning (Pillar 3
  says which half yields); it does not fail the MVP.
- At least 70% of testers rate gun feel 4 or more out of 5 for "weighty and grounded", and at least half describe
  compensating for drop or travel time without being told.
- Two- and three-player squads with the squad-gap kit reach a median of round 8.
- No destruction or sector-state desync across 10 four-player sessions; 95% or more of client hit claims accepted at
  100 ms latency and 90% or more at 200 ms.
- Under 15% of match time is spent travelling out of combat (R11), and no squad parks a player out of the fight as a
  spawn point in more than a quarter of sessions (A39).

**Build plan** (A43; team of 5 as assumed in A14; **provisional until Q2**). Each block has one owner so parallel blocks
do not block each other, and each stage ends in its own verdict:

| Block | Months | Owner (support) | Verdict and pass criteria |
| ---- | ---- | ---- | ---- |
| Feel prototype: ballistics, recoil and melee against zombies, plus two roles' gadgets (local) | 1–2 | Gameplay engineer 1 (designer-producer) | End of month 2: PROCEED / PIVOT / KILL on feel (R4) |
| Engine map bake: the MVP slice in UE 5.8 (World Partition, navmesh, HLOD, rule-based fences and hedges) | 1–3 | Tools/tech engineer (environment/tech artist) | End of month 3: the slice loads, streams and navigates in engine (R3) |
| Netcode spike: destruction, projectile fire events and hit claims, 24 zombies (48 stretch), far tier, four players in four sectors, Lumen/Nanite stress scene | 2–3 | Gameplay engineer 2, network (tools/tech engineer) | End of month 3: destruction and ballistics fallback decisions (R1, R2, R8) |
| Squad and sector layer: roles and gadgets, downed and revive, squad and sector spawn, ping, sectors | 4–5 | Both gameplay engineers | End of month 5: sector-loop playtest; linear-chain fallback decision |
| Economy (armory, workbench, caches, income), minimal HUD | 4–6 | Designer-producer (gameplay engineer 1) | Economy and HUD playable in the sector loop |
| Enterable interiors (6–8, hand-fitted from room templates) and per-panel nav links | 3–6 | Environment/tech artist and tools/tech engineer | Interiors breachable and navigable |
| Steam lobby and invites; late-join snapshot | 6 | Gameplay engineer 2 | Four players join, leave and rejoin a match |
| Integration of all 11 items | 7–8 | All | Complete four-player sessions with all 11 items |
| Playtest and fix (at least 6 weeks) | 8–9 | All | The MVP success criteria above are measured |
| Buffer (20%) | ~1–2 | — | Absorbs slips; not pre-allocated |
| **Total** | **~10–11** (9 scheduled plus the buffer) | | |

Greybox placeholder animation is acceptable throughout the MVP; outsourced animation starts its briefing in month 1.

**If the date must come in to about 7 months, cut in this order** (every user direction survives): (1) the late-join
snapshot moves to Vertical Slice A (reconnect only); (2) the home sector plus one sector (Creek Woods) instead of two,
with the School Grounds as the first add-back; (3) 2–3 enterable houses instead of 6–8; (4) the squad-gap kit only
for the 2-player case; (5) Breacher as the only zombie type beyond the Shambler until integration is stable. All four
roles, all five gadgets, projectile ballistics, melee, synced destruction and sectors stay.

**Explicitly NOT in MVP** (deferred):
- Meta progression and unlocks
- Evac rounds (the MVP ends on a wipe or the loss of the last sector); counter-push rounds
- The full six-sector map, including Lewis Park Fields, the Cemetery and the Creek Trail (Vertical Slice A, after the
  re-extraction); a second neighborhood and the pipeline-genericity proof (Vertical Slice B)
- The intermission checkpoint and resume with a new host (Vertical Slice A)
- Role passives; second gadgets (med pouch, ammo pouch, spotting scope); collapse charges
- Throwables (frag, smoke); the ping wheel
- Penetration by material class; magazine, underbarrel and stock slots; prone and weapon mounting; optic zeroing
- Solo mode and the solo kit
- Gear, upgrade tiers, supply drops
- Zombie types beyond 3; bosses
- Vehicles (A33; not planned for 1.0)
- "Your Street"; dedicated servers
- The realism art pass and the audio pass (greybox and placeholder)
- Controller support, localisation, accessibility options beyond the basics
- Leaderboards, cosmetics, noise draw

### Scope Tiers (if budget/time shrinks)

*All timelines assume a team of 5 plus outsourcing (A14) and count cumulative months from the start of production.
**They are provisional until Q2 (team size, budget, runway) is answered.** They were re-sized after PR-SCOPE round 1
(A43): the MVP now schedules every required item, and the Vertical Slice is split in two.*

*Funding placeholder (an order-of-magnitude assumption for Q2, not a quote):* about 44 months × 5 people ≈ 220
person-months. At an assumed USD 7,000–10,000 per fully loaded person-month that is roughly **USD 1.5–2.2 million**,
plus roughly **USD 0.3–0.6 million** of outsourcing (character art, animation, audio, part of the environment kit art).
The funding horizon must cover at least the MVP plus Vertical Slice A (about 16 months) before production starts.

| Tier | Content | Features | Timeline |
| ---- | ---- | ---- | ---- |
| **MVP** | The middle slice of Tinley Park, IL (60477): 3 sectors (167th Street home, Creek Woods, School Grounds), 6–8 enterable houses, greybox | The 11 items above, built to the build plan above (staged verdicts at months 2, 3 and 5; integration; playtest and fix; 20% buffer) | ~10–11 months |
| **Vertical Slice A** | The full Tinley Park map after the re-extraction (all sectors), greybox except the realism art pass on **one residential block and the 167th Street corridor, at dusk** | Evac at round 10; counter-push rounds; role passives; penetration; the intermission checkpoint and resume with a new host; the late-join snapshot if the MVP cut it | ~month 16–17 |
| **Vertical Slice B** | A **second map from a different city**, auto-generated (the pipeline-genericity proof) | 5 zombie types; second gadgets; throwables; ping wheel; the other 3 attachment slots; prone and mounting; gear; supply drops; a stub of meta progression; full HUD; the solo kit | ~month 21–22 |
| **Alpha** | 3 maps (placeholder art on some) | Everything in rough form: 8 zombie types plus boss, about 10 guns, 6 melee weapons, 25–30 attachments, upgrade tiers, collapse charges, horizontal meta with role mastery, Steam leaderboards, public matchmaking | ~month 30 |
| **Early Access** *(optional commercial cut)* | 2–3 polished maps | Alpha features, stabilised | ~month 33–35 |
| **Full Vision (1.0)** | **3 launch maps** from different cities, 20–30 enterable buildings each (A43) | Full roster (~10 types, 2 bosses), ~14 guns, ~40 attachments, ~8 melee weapons, ~10 gadgets, noise draw, optic zeroing, accessibility, localisation, controller support | ~month 40–44 |
| **After 1.0** | A fourth city first, then more | "Your Street" player map generator (Q8); dedicated servers if needed; vehicles only if Q11 says yes | — |

**The real fallback if money or people run short:** Vertical Slice A, polished, as an Early Access product with one
fully art-passed map. MVP and Vertical Slice B are internal milestones; "each tier ships if work stops there" holds
from Vertical Slice A onward.

**Most likely cut point under time pressure:** Alpha content. Maps drop from 3 to 2, zombie types from 8 to 6, and
second gadgets ship for two roles instead of four. All four roles and their MVP gadgets stay: they are the hypothesis.
**Minimum realism bar that is never cut:** one fully art-passed map at the grounded-realism bar (U7); a greybox suburb
never ships.

**Defined fallbacks for the riskiest systems** (decide by the dates given, not later):
- **Destruction (month 3):** if the netcode/destruction spike misses its budget, the game drops to **doors, windows
  and barricades, plus scripted set-piece collapses**. Pillar 1 is weakened but survives, and the game still ships.
- **Ballistics (month 3):** if projectile hit validation misses its budget, use **hitscan inside about 50 m and
  projectiles beyond it**. Drop and travel time survive where they matter. This is a pre-authorised exception to
  Pillar 3's design test.
- **Sectors (month 5 playtests):** if free sector choice spreads four players too thin, sectors become a **linear
  chain** (take them in a fixed order, hold the last two). The frontline survives.

---

## Director Gate Reviews

**Round 1 on revision 2: agent-run, 2026-11-19.** Each gate was run by its director agent (`creative-director`,
`art-director`, `technical-director`, `producer`) against revision 2. The verdicts below are theirs; the "changed in
revision 2.1" lists are the facilitator's response (A38–A43). Items that need the user are in Open Questions
(Q2, Q16–Q19); items not fixed in the text are in the risk register. **Next gate step:** re-check AD-CONCEPT-VISUAL
and PR-SCOPE against revision 2.1, because both had blocking items.

### CD-PILLARS (round 1, `creative-director`, 2026-11-19): CONCERNS
*Verdict:* no blocking items. The four pillars are falsifiable, each has a usable design test, and the tension table is
honest; the user directions in remit are carried, the reference series is named only in Inspiration and References
and U1, and the privacy rule holds. Pillars 3 and 4 needed sharpening, Pillar 1 had two unlogged exceptions, and the
home sector and MVP slice leaned on a "Lancaster" label after the user said the area is not "Lancaster". The reviewer
did not verify the extract's location.

*Changed in revision 2.1:*
- **"Lancaster" emphasis and location:** U10 logged; the extract checked against the user's correction (system 6.1);
  the word removed from every label; home moved to 167th Street at the Ridgeland Avenue crossing; the woods relabelled
  "Creek Woods"; the MVP built on the middle slice (A38; confirmation asked in Q18).
- **Pillar 4:** every fallback must stay meaningfully worse than the hand-off (this settles duplicates and the
  squad-gap kit); "hard interdependence" reworded to match "no role is ever strictly required".
- **Pillar 3:** ballistic weight wins when the halves conflict; supply points get a per-round stock so ammo stays
  scarce; the hitscan fallback is logged as a pre-authorised exception; the melee-share criterion is a signal.
- **Pillar 1:** breached sealed-house pockets become spawn closets; charges damage the squad's own fortifications;
  friendly fire off is logged as an accepted exception.
- **Pillar 2:** states that recognition rests on the street grid, names, parks and regional house style, not on
  recognisable buildings.
- **Hook:** the 10-second version leads the pitch; the hook keeps only the two differentiators.
- **D6 / U6 narrowing:** block sectors allowed; Q17 asks the user how many.
- **Squad-spawn "anchor":** pressure delays and offsets the spawn instead of blocking it (A39); playtest watch item.
- **Privacy side-note on the extract's box:** re-extraction with a grid-snapped box before the level GDD, and a
  repository-hygiene rule (system 6.1).

### AD-CONCEPT-VISUAL (round 1, `art-director`, 2026-11-19): CONCERNS (2 blocking)
*Verdict:* "Ground Truth" is the right and clearly leading direction: it carries U7, keeps only what supports realism,
copies no reference UI look, and its rule is specific and testable. Not STRONG yet because (1) the anchor had no shape
language and (2) its colour philosophy assigned meanings to colours a real suburb already uses, without limiting them
to a layer. Biggest non-blocking risk: the night curve put most of each match in darkness.

*Changed in revision 2.1 (A41):*
- **Blocking 1, shape language:** four rules with tests (horde silhouettes and gaits per range band; roles read by
  kit at 30–80 m with Holdout's own icons; plumb is real, askew is ours; every panel state changes the outline).
- **Blocking 2, colour:** meaning colours apply only to the UI, marker and added-light layer, never to world
  surfaces; a precedence order (danger > squad > horde > infrastructure; shape shows owner, colour shows meaning); the
  suburb's streetlights are cool white so amber always means the squad; a non-hue cue for every meaning.
- **Night curve:** stretched (dusk at round 10, night around rounds 15–20) with listed motivated light sources and
  per-band readability minimums; MegaLights feasibility moved into R10 and Technical Risks; Q19 asks the user.
- "Combat range" defined as System 7's three bands; recognition from regional house style with a neighbour variation
  rule; no flat-roofed houses before the art pass; R10's first art-pass target named (one residential block and the
  167th Street corridor, at dusk); "weather" removed and logged in Scope Risks.
- *Status:* both blocking items fixed in the text; re-check pending.

### TD-FEASIBILITY (round 1, `technical-director`, 2026-11-19): CONCERNS (conditional)
*Verdict:* no single risk invalidates the concept; the panel-state destruction, capped horde, client-simulated
projectiles with server validation, compact sector state and dated fallbacks are sound, and the UE 5.8 status claims
match the pinned reference. Main gaps: 300 m ballistics against a 24-zombie frontline-only horde; the untested load on
a listen-server host across a streamed 1.44 km² map with realism rendering; spike criteria that missed the 48 cap,
higher latency and spread-out players. **The verdict holds only for the assumed team of 5; it becomes HIGH RISK if
the team is one or two people (Q2).** The reviewer checked the extract and confirmed it covers the area the user
specified; Lewis Park sits half outside the box.

*Changed in revision 2.1 (A42, A43):* a far-zombie tier at MVP with a 300 m spike test; spawn closets and an "out of
sight inside 80 m" rule; spike criteria extended (48 stretch, four players in four sectors, Lumen/Nanite stress scene
on the host, total and host-upstream bandwidth budgets, 200 ms latency); a per-client rewind window and a stale-panel
rule; panel representation and a 2–3× snapshot budget; nav links scoped to enterable buildings and the outer pocket
ring with a 200 ms path-update criterion; headless-capable server code; intermission checkpoint and resume at
Vertical Slice A; enterable houses limited to near-rectangular footprints and 20–30 per map; a non-ray-traced
lighting path and minimum GPU before the art pass; re-extraction before the level GDD, and Lewis Park out of the MVP
slice; the first UE bake as an MVP block; A31's attachment-slot wording fixed. *Not fixable in the text:* Q2.

### PR-SCOPE (round 1, `producer`, 2026-11-19): OPTIMISTIC (6 blocking)
*Verdict:* tiers ordered sensibly, fallbacks dated, user directions carried, but the timeline was optimistic: the
6-month MVP left the economy, the in-engine slice with interiors, the lobby, the HUD, the late-join snapshot and all
playtesting unscheduled; one month of integration was not credible; the Vertical Slice was overloaded; the 36–42
month Full Vision did not fit one in-house environment artist across four maps; and everything rests on an
unconfirmed team with no budget figure. **UNREALISTIC if the developer is solo.**

*Changed in revision 2.1 (A43):*
- **Blocking 1–3:** the MVP is about 10–11 months with a build plan of named blocks, single owners, staged verdicts
  (months 2, 3, 5), an integration block, a playtest-and-fix block of at least 6 weeks and a 20% buffer, plus a stated
  cut list if the date must come in to about 7 months.
- **Blocking 4:** the Vertical Slice is split into A (full first map, evac, penetration, passives, host resume) and B
  (second city and the rest).
- **Blocking 5:** 1.0 is 3 launch maps (a fourth after launch) with 20–30 enterable buildings each and part of the
  environment kit art outsourced; about 40–44 months.
- **Blocking 6:** every timeline is marked provisional until Q2, which is now the gating question to answer before the
  prototypes start; a funding placeholder is stated in Scope Tiers.
- *Concerns:* the real fallback (Vertical Slice A in Early Access) and the realism bar that is never cut are named;
  the legal review moves before the Vertical Slice; placeholder animation is accepted at MVP and outsourcing starts
  in month 1; the melee criterion is a signal; host resume has a decision date; Q6 and Q11 are flagged as scope risks.
- *Status:* re-check pending; the verdict still depends on Q2.

### History: superseded self-reviews of revision 1

*These four entries were written for revision 1 by the facilitating agent itself, because subagent spawning was not
available in that session. They were NOT run by director agents, reviewed a concept that no longer exists (before
U1–U9), and carry no verdict for this revision.*

#### CD-PILLARS (superseded self-review of revision 1): CONCERNS → REVISED → APPROVE
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

The self-review also suggested adding "no position stays safe forever" to Pillar 1, to guard against turtling.
Applied. Its re-check returned APPROVE. *Revision 2 replaced Pillars 3 and 4 (A36).*

#### AD-CONCEPT-VISUAL (superseded self-review of revision 1): STRONG ("Survey Grade")
The self-review proposed three directions: Survey Grade, Sodium Hour, Last Broadcast, and judged Survey Grade
dominant because it served Pillar 2 and made the procedural architecture pipeline look intentional. *Revision 2
replaced the anchor with "Ground Truth" on the user's direction (U7, A34).*

#### TD-FEASIBILITY (superseded self-review of revision 1): CONCERNS (accepted)
- **No HIGH RISK blocker, as long as A4 and A13 hold.** Gameplay-state destruction (not physics) and a capped active
  horde keep the concept inside an indie budget.
- **What would make it HIGH RISK:** a requirement for identical physics debris on every client, or 100+ active
  replicated zombies at MVP.
- **Engine-specific risks:** the Chaos Geometry Collection plugin is Beta in 5.8 (cosmetics only); MassGameplay and
  MassCrowd are Experimental and were reworked in 5.8 (no MVP dependency); Iris is production-ready per the 5.8
  release notes although the plugin is flagged Beta (an ADR decision); PCG has been production-ready since 5.7.
- **Commonly underestimated:** navigation updates after destruction; generated interiors; the listen-server host
  doing AI, physics and rendering at once; animation volume; QA across combinations of destruction states.
- *Not assessed in revision 1, because they did not exist yet:* projectile ballistics replication, squad spawn,
  gadgets, sector objectives, grounded-realism rendering, and a 1.2 km map.

#### PR-SCOPE (superseded self-review of revision 1): OPTIMISTIC (adjustments applied)
The self-review judged the first-draft MVP optimistic for 5 people in 4 months and applied five adjustments (two
prototypes plus integration; second map to the Vertical Slice; 3 attachment slots; "Your Street" after 1.0; an Early
Access tier and a month-3 destruction fallback). Residual concerns: UE networking experience assumed; team size
assumed (Q2); UNREALISTIC for Full Vision if the developer is solo (A14). *Revision 2 re-cut the MVP and tiers
(A31, A32); round 1 of the real PR-SCOPE assessed that scope (above).*

---

## Next Steps

**Recommended path: prototype-first.** The core mechanics (synced destruction under a horde, projectile ballistics
and first-person parry over the network, a four-role squad holding sectors) are unproven.

1. `/setup-engine`: configure Unreal Engine 5.8 and its version-aware reference docs. *(Completed in another
   session.)*
2. **Director gates.** Round 1 ran on revision 2 (2026-11-19) and revision 2.1 applies it (Director Gate Reviews).
   Re-check **AD-CONCEPT-VISUAL** (`art-director`) and **PR-SCOPE** (`producer`) against revision 2.1, because both
   had blocking items; CD-PILLARS and TD-FEASIBILITY may re-check the changed pillars and mitigations.
3. **Before the prototypes start:** the user answers **Q2** (team, budget, runway; gating), confirms or overrules the
   facilitator assumptions (A22–A43, especially A38's reading of U10 via Q18), and answers Q6 (rating), Q11
   (vehicles), Q16 (sensitive sites), Q17 (block sectors) and Q19 (night curve).
4. `/prototype first-person ballistics, recoil and melee against a capped horde`: the local feel prototype, including
   two roles' gadgets (PROCEED / PIVOT / KILL).
5. `/prototype --spike replicated panel destruction, projectile fire events and hit claims, and a 24-zombie horde on a
   listen server`: the netcode budget spike (R1, R2, R8), including the 48-zombie stretch case, the far tier at 300 m,
   four players in four sectors, a Lumen/Nanite stress scene on the host, and 200 ms latency.
   In parallel: the first UE 5.8 bake of the MVP slice; before the level GDD, re-extract the first map with the box
   widened west and snapped to a coarse grid, then re-measure the system 6.1 facts.
6. If both PROCEED: `/art-bible`, seeded with the "Ground Truth" anchor. It is required before the Technical Setup
   gate at `full`.
7. `/design-review design/gdd/game-concept.md`: check the concept is complete.
8. `/map-systems`: systems index and dependencies. Expected systems: rounds and sectors, roles and gadgets, squad
   play, economy, destruction, OSM pipeline, gunplay and ballistics, attachments, melee, horde AI, co-op/session, HUD.
9. `/design-system` for each system from step 8, then `/create-architecture` → `/architecture-decision` (one ADR per
   decision: replication with Iris, destruction state model, projectile hit validation, squad spawn and sector state,
   horde representation, OSM pipeline) → `/architecture-review`.
10. `/vertical-slice` before committing to sprints, then `/gate-check` before Production.

- [x] Run the real director gates on revision 2 (round 1, 2026-11-19: CD CONCERNS, AD CONCERNS, TD CONCERNS, PR OPTIMISTIC) and apply them (revision 2.1)
- [ ] Re-check AD-CONCEPT-VISUAL and PR-SCOPE on revision 2.1; get concept approval from creative-director
- [ ] User answers Q2 (gating) and confirms A38 (Q18)
- [x] Fill in the CLAUDE.md technology stack from the engine choice (`/setup-engine`; completed elsewhere)
- [ ] Create the game pillars document (`/design-review` to validate)
- [ ] **Prototype the core idea**: the feel prototype and the netcode spike (above)
- [ ] If the prototypes PROCEED: break the concept into systems (`/map-systems`)
- [ ] Design each system (`/design-system [system-name]`), feeding prototype learnings into Tuning Knobs and Formulas
- [ ] Build the vertical slice in Pre-Production (`/vertical-slice`), including the full first map and the second-city pipeline proof
- [ ] Validate the core loop with a playtest (`/playtest-report`) against the MVP success criteria
- [ ] Plan the first milestone (`/sprint-plan new`)
