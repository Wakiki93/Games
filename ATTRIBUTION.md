# Attribution

Where every skill in this pack came from, and what changed. License text is in `LICENSES/`, required notices in `NOTICE`.

| Source | License | Commit |
|---|---|---|
| [awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) | Apache-2.0 | 19d93f9 (2026-10-28) |
| [Claude Code Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) by Donchitos | MIT | 05ad7c8 (2026-10-19, release 1.2.0) |

## Merged skills (material from both)

| Skill | From A | From B | How |
|---|---|---|---|
| `prototype` | `prototype-fast` | `prototype` | B's phased workflow kept; A's body is `references/quick-mode.md`, used when there is no studio project. A's keep or kill signals added to the debrief. |
| `perf-profile` | `performance-optimization` | `perf-profile` | B's profiling workflow kept; A's body is `references/fix-playbook.md`, plus A's `profiling-and-budgets.md`. |

## New skills (built from Claude Code Game Studios agents, MIT)

| Skill | Source agent |
|---|---|
| `game-accessibility` | `accessibility-specialist` |
| `godot-gdextension` | `godot-gdextension-specialist` |
| `netcode-fundamentals` | `network-programmer` |
| `unity-addressables` | `unity-addressables-specialist` |
| `unity-dots-ecs` | `unity-dots-specialist` |
| `unity-shaders-vfx` | `unity-shader-specialist` |
| `unity-ui` | `unity-ui-specialist` |
| `unreal-gas` | `ue-gas-specialist` |
| `unreal-replication` | `ue-replication-specialist` |
| `unreal-umg` | `ue-umg-specialist` |

## Files from awesome-gamedev-agent-skills changed in this pack

Each carries a "Modified in the merged pack" note at the end. Changes are reference renames (for the two merged skills and the router), plus the studio pipeline section in `create-game-assets`, and the rewritten router.

- `.claude/skills/camera-systems/SKILL.md`
- `.claude/skills/camera-systems/references/follow-and-framing.md`
- `.claude/skills/create-game-assets/SKILL.md`
- `.claude/skills/game-feel/references/feedback-recipes.md`
- `.claude/skills/ebitengine-game/SKILL.md`
- `.claude/skills/ebitengine-game/references/rendering.md`
- `.claude/skills/fps-shooter/SKILL.md`
- `.claude/skills/platformer/SKILL.md`
- `.claude/skills/visual-novel/SKILL.md`
- `.claude/skills/godot-3d-essentials/SKILL.md`
- `.claude/skills/godot-export/SKILL.md`
- `.claude/skills/pixijs-rendering/SKILL.md`
- `.claude/skills/game-jam/SKILL.md`
- `.claude/skills/itch-publish/SKILL.md`
- `.claude/skills/steam-publish/SKILL.md`
- `.claude/skills/gamedev-router/SKILL.md`
- `.claude/skills/gamedev-router/agents/openai.yaml`
- `.claude/skills/gamedev-router/references/routing-table.md`

## Studio skills that gained a craft skills section

These Claude Code Game Studios skills got a short "Craft skills (merged pack)" section pointing at the engine skills. Nothing else in them changed, apart from `asset-spec` (prompt block format aligned with `create-game-assets`) and `asset-audit` (script paths).

`architecture-decision`, `asset-audit`, `asset-spec`, `balance-check`, `brainstorm`, `code-review`, `create-architecture`, `day-one-patch`, `design-system`, `dev-story`, `hotfix`, `launch-checklist`, `localize`, `map-systems`, `perf-profile`, `prototype`, `release-checklist`, `security-audit`, `setup-engine`, `team-audio`, `team-combat`, `team-level`, `team-live-ops`, `team-narrative`, `team-polish`, `team-qa`, `team-release`, `team-ui`, `test-helpers`, `test-setup`, `ux-design`, `ux-review`, `vertical-slice`

Agent model pins were changed on 2026-11-15: the 3 directors from `opus` to `fable` and 16 builder agents from `sonnet` to `opus`, with `.claude/docs/model-tiers.md`, the matching studio tests and three docs updated to match.

40 studio agents in `.claude/agents/` also gained a "Craft skills to read (merged pack)" section.

## Every skill

| Skill | Layer | Origin | License |
|---|---|---|---|
| `adopt` | studio | B | MIT |
| `ai-behavior-trees-utility-ai` | craft | A | Apache-2.0 |
| `architecture-decision` | studio | B | MIT |
| `architecture-review` | studio | B | MIT |
| `art-bible` | studio | B | MIT |
| `asset-audit` | studio | B | MIT |
| `asset-spec` | studio | B | MIT |
| `audio-design` | craft | A | Apache-2.0 |
| `balance-check` | studio | B | MIT |
| `bevy-ecs` | craft | A | Apache-2.0 |
| `brainstorm` | studio | B | MIT |
| `bug-report` | studio | B | MIT |
| `bug-triage` | studio | B | MIT |
| `camera-systems` | craft | A | Apache-2.0 |
| `card-game` | craft | A | Apache-2.0 |
| `changelog` | studio | B | MIT |
| `code-review` | studio | B | MIT |
| `consistency-check` | studio | B | MIT |
| `content-audit` | studio | B | MIT |
| `create-architecture` | studio | B | MIT |
| `create-control-manifest` | studio | B | MIT |
| `create-epics` | studio | B | MIT |
| `create-game-assets` | craft | A | Apache-2.0 |
| `create-stories` | studio | B | MIT |
| `day-one-patch` | studio | B | MIT |
| `defold-core` | craft | A | Apache-2.0 |
| `design-review` | studio | B | MIT |
| `design-system` | studio | B | MIT |
| `dev-story` | studio | B | MIT |
| `dialogue-systems` | craft | A | Apache-2.0 |
| `ebitengine-game` | craft | A | Apache-2.0 |
| `estimate` | studio | B | MIT |
| `fps-shooter` | craft | A | Apache-2.0 |
| `game-accessibility` | craft | new | MIT |
| `game-ai` | craft | A | Apache-2.0 |
| `game-feel` | craft | A | Apache-2.0 |
| `game-jam` | craft | A | Apache-2.0 |
| `game-ui-ux` | craft | A | Apache-2.0 |
| `gamedev-router` | craft | A (renamed router) | Apache-2.0 |
| `gate-check` | studio | B | MIT |
| `godot-2d-movement` | craft | A | Apache-2.0 |
| `godot-3d-essentials` | craft | A | Apache-2.0 |
| `godot-animation` | craft | A | Apache-2.0 |
| `godot-audio` | craft | A | Apache-2.0 |
| `godot-csharp` | craft | A | Apache-2.0 |
| `godot-export` | craft | A | Apache-2.0 |
| `godot-gdextension` | craft | new | MIT |
| `godot-gdscript` | craft | A | Apache-2.0 |
| `godot-gdscript-headless-testing` | craft | A | Apache-2.0 |
| `godot-multiplayer` | craft | A | Apache-2.0 |
| `godot-nodes-scenes` | craft | A | Apache-2.0 |
| `godot-physics` | craft | A | Apache-2.0 |
| `godot-resources` | craft | A | Apache-2.0 |
| `godot-shaders` | craft | A | Apache-2.0 |
| `godot-signals-groups` | craft | A | Apache-2.0 |
| `godot-tilemap` | craft | A | Apache-2.0 |
| `godot-ui-control` | craft | A | Apache-2.0 |
| `help` | studio | B | MIT |
| `hotfix` | studio | B | MIT |
| `input-systems` | craft | A | Apache-2.0 |
| `itch-publish` | craft | A | Apache-2.0 |
| `launch-checklist` | studio | B | MIT |
| `level-design` | craft | A | Apache-2.0 |
| `localize` | studio | B | MIT |
| `love2d-core` | craft | A | Apache-2.0 |
| `map-systems` | studio | B | MIT |
| `milestone-review` | studio | B | MIT |
| `netcode-fundamentals` | craft | new | MIT |
| `onboard` | studio | B | MIT |
| `patch-notes` | studio | B | MIT |
| `perf-profile` | studio | A+B | Apache-2.0 and MIT (per file) |
| `phaser-arcade-physics` | craft | A | Apache-2.0 |
| `phaser-core` | craft | A | Apache-2.0 |
| `physics-tuning` | craft | A | Apache-2.0 |
| `pixijs-rendering` | craft | A | Apache-2.0 |
| `platformer` | craft | A | Apache-2.0 |
| `playtest-report` | studio | B | MIT |
| `procedural-gen` | craft | A | Apache-2.0 |
| `project-stage-detect` | studio | B | MIT |
| `propagate-design-change` | studio | B | MIT |
| `prototype` | studio | A+B | Apache-2.0 and MIT (per file) |
| `puzzle` | craft | A | Apache-2.0 |
| `pygame-core` | craft | A | Apache-2.0 |
| `qa-plan` | studio | B | MIT |
| `quick-design` | studio | B | MIT |
| `regression-suite` | studio | B | MIT |
| `release-checklist` | studio | B | MIT |
| `retrospective` | studio | B | MIT |
| `reverse-document` | studio | B | MIT |
| `review-all-gdds` | studio | B | MIT |
| `roblox-characters` | craft | A | Apache-2.0 |
| `roblox-datastores` | craft | A | Apache-2.0 |
| `roblox-luau` | craft | A | Apache-2.0 |
| `roblox-networking` | craft | A | Apache-2.0 |
| `roblox-physics` | craft | A | Apache-2.0 |
| `roblox-simulator-economy` | craft | A | Apache-2.0 |
| `roblox-studio-workflow` | craft | A | Apache-2.0 |
| `roblox-ui` | craft | A | Apache-2.0 |
| `roguelike` | craft | A | Apache-2.0 |
| `rpg` | craft | A | Apache-2.0 |
| `save-systems` | craft | A | Apache-2.0 |
| `scope-check` | studio | B | MIT |
| `security-audit` | studio | B | MIT |
| `settings` | studio | B | MIT |
| `setup-engine` | studio | B | MIT |
| `shader-programming` | craft | A | Apache-2.0 |
| `skill-improve` | studio | B | MIT |
| `skill-test` | studio | B | MIT |
| `smoke-check` | studio | B | MIT |
| `soak-test` | studio | B | MIT |
| `sprint-plan` | studio | B | MIT |
| `sprint-status` | studio | B | MIT |
| `start` | studio | B | MIT |
| `steam-publish` | craft | A | Apache-2.0 |
| `story-done` | studio | B | MIT |
| `story-readiness` | studio | B | MIT |
| `survival-crafting` | craft | A | Apache-2.0 |
| `team-audio` | studio | B | MIT |
| `team-combat` | studio | B | MIT |
| `team-level` | studio | B | MIT |
| `team-live-ops` | studio | B | MIT |
| `team-narrative` | studio | B | MIT |
| `team-polish` | studio | B | MIT |
| `team-qa` | studio | B | MIT |
| `team-release` | studio | B | MIT |
| `team-ui` | studio | B | MIT |
| `tech-debt` | studio | B | MIT |
| `test-evidence-review` | studio | B | MIT |
| `test-flakiness` | studio | B | MIT |
| `test-helpers` | studio | B | MIT |
| `test-setup` | studio | B | MIT |
| `threejs-gltf-loading` | craft | A | Apache-2.0 |
| `threejs-materials-lighting` | craft | A | Apache-2.0 |
| `threejs-scene-setup` | craft | A | Apache-2.0 |
| `tower-defense` | craft | A | Apache-2.0 |
| `unity-addressables` | craft | new | MIT |
| `unity-animation` | craft | A | Apache-2.0 |
| `unity-build-pipeline` | craft | A | Apache-2.0 |
| `unity-csharp-scripting` | craft | A | Apache-2.0 |
| `unity-dots-ecs` | craft | new | MIT |
| `unity-input-system` | craft | A | Apache-2.0 |
| `unity-navmesh` | craft | A | Apache-2.0 |
| `unity-physics` | craft | A | Apache-2.0 |
| `unity-scriptableobjects` | craft | A | Apache-2.0 |
| `unity-shaders-vfx` | craft | new | MIT |
| `unity-tilemap-2d` | craft | A | Apache-2.0 |
| `unity-ui` | craft | new | MIT |
| `unreal-behavior-trees` | craft | A | Apache-2.0 |
| `unreal-blueprints` | craft | A | Apache-2.0 |
| `unreal-cpp-gameplay` | craft | A | Apache-2.0 |
| `unreal-enhanced-input` | craft | A | Apache-2.0 |
| `unreal-gas` | craft | new | MIT |
| `unreal-niagara` | craft | A | Apache-2.0 |
| `unreal-packaging` | craft | A | Apache-2.0 |
| `unreal-replication` | craft | new | MIT |
| `unreal-umg` | craft | new | MIT |
| `ux-design` | studio | B | MIT |
| `ux-review` | studio | B | MIT |
| `vertical-slice` | studio | B | MIT |
| `visual-novel` | craft | A | Apache-2.0 |
