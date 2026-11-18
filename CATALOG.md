# Skill catalog

160 skills in one pack. **Craft** skills say how to build something in an engine; **studio** skills run the project the way a team would. Every skill lives flat in `.claude/skills/<name>/` because Claude Code only finds skills one folder deep; the grouping below is the map.

Origin key: **A** awesome-gamedev-agent-skills (Apache-2.0), **B** Claude Code Game Studios (MIT), **A+B** merged from both, **new** built here from a B specialist agent.

## Craft skills by engine

### Router (1)

| Skill | Origin | What it does |
|---|---|---|
| `gamedev-router` | A | Routes any game-development request to the right skill(s) in this merged pack. |

### Godot (17)

| Skill | Origin | What it does |
|---|---|---|
| `godot-2d-movement` | A | Implement 2D kinematic character movement in Godot 4.7 with CharacterBody2D and move_and_slide(): platformer run/jump with gravity, top-down 8-direction motion,… |
| `godot-3d-essentials` | A | Set up a Godot 4.7 3D scene: Node3D transforms, Camera3D, lighting (DirectionalLight3D/OmniLight3D), WorldEnvironment for sky/ambient/tonemap/post, MeshInstance… |
| `godot-animation` | A | Animate in Godot 4.7 three ways: AnimationPlayer for keyframed clips (incl. |
| `godot-audio` | A | Play and mix audio in Godot 4.7: AudioStreamPlayer (2D/3D variants), audio buses with volume/mute and effects, music vs SFX routing, db/linear volume, and preci… |
| `godot-csharp` | A | Use C#/.NET in Godot 4.7: partial classes extending nodes, the PascalCase lifecycle (_Ready/_Process/_PhysicsProcess), [Export] fields, [Signal] delegates as C#… |
| `godot-export` | A | Export and build a Godot 4.7 project for distribution: install export templates, define export presets (Windows/macOS/Linux/Web/Android), run headless command-l… |
| `godot-gdextension` | new | Extend Godot 4.7 with native code through GDExtension using godot-cpp (C++) or godot-rust: when native code is worth it, the boundary pattern, project setup, cl… |
| `godot-gdscript` | A | Write idiomatic GDScript for Godot 4.7: static typing, the node lifecycle (_ready/_process/_physics_process), @export/@onready/@tool annotations, signals, and a… |
| `godot-gdscript-headless-testing` | A | Run GDScript test suites from the command line with `godot --headless`, using a SceneTree/MainLoop runner script that exits non-zero on failure so CI can gate m… |
| `godot-multiplayer` | A | Build networked games with Godot 4.7 high-level multiplayer: set up an ENetMultiplayerPeer server/client, define RPCs with the @rpc annotation (call via rpc()/r… |
| `godot-nodes-scenes` | A | Structure a Godot 4.7 project with the scene tree and node composition: build reusable scenes, instance PackedScenes at runtime, navigate the tree safely, and r… |
| `godot-physics` | A | Use Godot 4.7 physics bodies and detection in 2D and 3D: RigidBody, StaticBody, Area, and CharacterBody; collision layers vs masks; contact/overlap signals; and… |
| `godot-resources` | A | Design data-driven Godot 4.7 games with custom Resource classes: define typed data with class_name + @export, save/load .tres/.res files, instance and duplicate… |
| `godot-shaders` | A | Write Godot 4.7 shaders in the Godot Shading Language: canvas_item shaders for 2D and spatial shaders for 3D, with vertex/fragment functions, uniforms (source_c… |
| `godot-signals-groups` | A | Build event-driven, decoupled Godot 4.7 gameplay with signals and node groups: declare and emit custom signals, connect with Callables (incl. |
| `godot-tilemap` | A | Build and edit tile-based 2D levels in Godot 4.7 with TileMapLayer and TileSet: paint layers, set up collision/navigation/custom-data on tiles, autotile with te… |
| `godot-ui-control` | A | Build Godot 4.7 user interfaces with Control nodes: anchors and offsets for responsive layout, Container nodes (VBox/HBox/Grid/Margin) for automatic arrangement… |

### Unity (12)

| Skill | Origin | What it does |
|---|---|---|
| `unity-addressables` | new | Manage Unity 6 assets with the Addressables package: group organization, labels, async loading and release, memory ownership, bundle layout, content catalogs, r… |
| `unity-animation` | A | Drive Unity 6.3 LTS character animation with Animator Controllers: states, transitions, parameters, blend trees, animation layers, and humanoid Avatar IK. |
| `unity-build-pipeline` | A | Build and ship Unity 6.3 LTS players: build settings and scenes, player/quality settings, the IL2CPP vs Mono scripting backend, managed code stripping, scripted… |
| `unity-csharp-scripting` | A | Write Unity 6.3 LTS C# gameplay scripts: the MonoBehaviour lifecycle (Awake/OnEnable/Start/Update/FixedUpdate/LateUpdate), GameObject and component access, coro… |
| `unity-dots-ecs` | new | Write Unity DOTS code: Entities components and systems, queries, the Jobs system, Burst-compiled code, memory layout and Entities Graphics, while avoiding commo… |
| `unity-input-system` | A | Wire player input in Unity 6.3 LTS with the Input System package: Input Actions, action maps, the PlayerInput component, and reading values via callbacks or pol… |
| `unity-navmesh` | A | Add AI navigation in Unity 6.3 LTS: bake a NavMesh with the AI Navigation package (NavMeshSurface), move agents with NavMeshAgent.SetDestination, and handle dyn… |
| `unity-physics` | A | Set up 3D physics in Unity 6.3 LTS: Rigidbody movement and forces, colliders, triggers vs collisions, layer-based collision, raycasts, and joints. |
| `unity-scriptableobjects` | A | Architect Unity 6.3 LTS data and decoupling with ScriptableObjects: config/data assets, shared runtime variables, event channels, and runtime sets/registries. |
| `unity-shaders-vfx` | new | Write Unity 6 rendering code for URP or HDRP: Shader Graph, custom HLSL, shader variants, VFX Graph, post-processing, draw call and GPU profiling, LOD and quali… |
| `unity-tilemap-2d` | A | Build and script 2D tilemaps in Unity 6.3 LTS: the Grid + Tilemap components, the Tile Palette, tilemap colliders, rule tiles, and runtime SetTile/GetTile paint… |
| `unity-ui` | new | Build Unity 6 user interfaces with UI Toolkit (UXML, USS, data binding) or UGUI Canvas: choosing between them, screen management, event handling, canvas optimiz… |

### Unreal (9)

| Skill | Origin | What it does |
|---|---|---|
| `unreal-behavior-trees` | A | Build NPC AI in Unreal Engine 5 with Behavior Trees and Blackboards: composites (Selector/Sequence), tasks, decorators, services, and running the tree from an A… |
| `unreal-blueprints` | A | Build Unreal Engine 5 gameplay with Blueprint visual scripting: Blueprint Classes, the Event Graph and Construction Script, variables/functions/macros, and Blue… |
| `unreal-cpp-gameplay` | A | Write Unreal Engine 5 C++ gameplay code: the UCLASS/UPROPERTY/UFUNCTION reflection macros, the Gameplay Framework (GameMode, Pawn, Character, PlayerController, … |
| `unreal-enhanced-input` | A | Set up player input in Unreal Engine 5 with Enhanced Input: Input Actions, Input Mapping Contexts, modifiers and triggers, adding the mapping context, and bindi… |
| `unreal-gas` | new | Build abilities with Unreal's Gameplay Ability System (GAS): Gameplay Abilities, Gameplay Effects, Attribute Sets, Gameplay Tags, Ability Tasks and prediction k… |
| `unreal-niagara` | A | Create and control VFX in Unreal Engine 5 with Niagara: systems and emitters, modules and the spawn/update stages, exposed User parameters, and spawning or driv… |
| `unreal-packaging` | A | Package and ship an Unreal Engine 5 project: the Platforms menu Package Project flow, build configurations (Development vs Shipping), cooking content, packaging… |
| `unreal-replication` | new | Build server-authoritative multiplayer in Unreal Engine 5: property replication with DOREPLIFETIME and replication conditions, RepNotify, Server/Client/NetMulti… |
| `unreal-umg` | new | Build Unreal Engine 5 UI with UMG and CommonUI: widget hierarchy, data binding without per-frame polling, CommonUI input routing for gamepad and keyboard, widge… |

### Browser and web (6)

| Skill | Origin | What it does |
|---|---|---|
| `phaser-arcade-physics` | A | Use Phaser 4 Arcade Physics: enable the world, give sprites bodies, set velocity/acceleration/gravity, and resolve collisions with colliders, overlaps, groups, … |
| `phaser-core` | A | Set up and debug a Phaser 4 game: the Game config, the Scene lifecycle (init/preload/create/update), the asset loader, cameras, and cross-scene communication. |
| `pixijs-rendering` | A | Build a PixiJS v8 render layer: create the async Application, load textures with Assets, compose the scene graph with Container and Sprite, drive the ticker loo… |
| `threejs-gltf-loading` | A | Load glTF/GLB models in three.js with GLTFLoader and play their skinned animations with AnimationMixer, including DRACO/Meshopt-compressed meshes and KTX2 textu… |
| `threejs-materials-lighting` | A | Light and shade a three.js scene: choose materials (MeshStandardMaterial PBR vs unlit MeshBasicMaterial), add ambient/hemisphere/directional/point/spot lights, … |
| `threejs-scene-setup` | A | Stand up a three.js scene: import maps and the three/addons path, the Scene/PerspectiveCamera/WebGLRenderer trio, the setAnimationLoop render loop, responsive r… |

### Other engines (13)

| Skill | Origin | What it does |
|---|---|---|
| `bevy-ecs` | A | Structure a Bevy app around its Entity Component System: build the App with plugins, define Component/Resource types, write systems with Query/Res/Commands, fil… |
| `defold-core` | A | Build and debug the core of a Defold game in Lua: game.project settings, collections, game objects and components, script lifecycle and self state, go.property,… |
| `ebitengine-game` | A | Create, improve, debug and package playable 2D games in Go with Ebitengine (github.com/hajimehoshi/ebiten/v2). |
| `love2d-core` | A | Structure and debug a LÖVE (Love2D) game in Lua: the love.load/update/draw loop, delta-time movement, input, and screen states. |
| `pygame-core` | A | Structure a pygame (pygame-ce) game in Python: the init/event/update/draw loop, delta-time movement, Surface/Rect blitting, keyboard/mouse input, and Sprite/Gro… |
| `roblox-characters` | A | Build respawn-safe Roblox character systems around Players, CharacterAdded/CharacterRemoving, Humanoid, HumanoidRootPart, Animator, R6/R15 rigs, movement, anima… |
| `roblox-datastores` | A | Persist player data in Roblox with DataStoreService: GetDataStore, GetAsync/ SetAsync/UpdateAsync/IncrementAsync wrapped in pcall, load-on-join and save-on-leav… |
| `roblox-luau` | A | Script a Roblox experience in Luau: get services, create and parent Instances, connect events, run server Scripts vs client LocalScripts, and communicate across… |
| `roblox-networking` | A | Design and harden Roblox client/server networking with RemoteEvent, RemoteFunction, and UnreliableRemoteEvent; server authority, argument and Instance validatio… |
| `roblox-physics` | A | Implement Roblox physical simulation and queries with assemblies, anchoring, constraints, collision groups, CanCollide/CanTouch/CanQuery, raycasts and overlap q… |
| `roblox-simulator-economy` | A | Design, balance, and implement the economy of a Roblox simulator, tycoon, clicker, or idle game in Luau: upgrade cost curves, buy max, income per second, rebirt… |
| `roblox-studio-workflow` | A | Modify living Roblox Studio projects safely: inspect Explorer and execution locations, preserve existing structure, reuse modules/remotes, create meaningful Ins… |
| `roblox-ui` | A | Build production Roblox interfaces with ScreenGui/PlayerGui lifecycle, responsive UDim2 layouts, safe insets, reusable editable Instances, cross-device input an… |

### Disciplines (16)

| Skill | Origin | What it does |
|---|---|---|
| `ai-behavior-trees-utility-ai` | A | Build a production behavior-tree runtime (Blackboard, action/condition leaves, sequence/selector/parallel composites, decorators) and a Utility AI system (respo… |
| `audio-design` | A | Implement game audio practice — bus/mixer architecture and gain in decibels, ducking (sidechain), adaptive/dynamic music via layering and re-sequencing, SFX var… |
| `camera-systems` | A | Build game cameras that feel good — 2D follow with a deadzone, look-ahead, smoothing, and level-bounds clamping; 3D third-person orbit with collision and first-… |
| `create-game-assets` | A | Plan, generate, source, normalize, and validate cohesive visual game assets. |
| `dialogue-systems` | A | Build branching dialogue and narrative — a node/choice graph with conditions, variables, and localization hooks — and choose between authoring tools Ink and Yar… |
| `game-accessibility` | new | Make games accessible: visual (text size, contrast, colorblind support), audio (subtitles, visual cues), motor (full remapping, hold-to-toggle, timing options),… |
| `game-ai` | A | Design NPC and enemy decision-making with finite state machines, behavior trees, steering behaviors, and A* pathfinding — engine-neutral algorithms that pair wi… |
| `game-feel` | A | Add "juice" and game feel that makes actions satisfying — screen shake, hit-stop/freeze frames, tweened/eased motion, squash & stretch, knockback, and layered a… |
| `game-ui-ux` | A | Design and build game UI/UX — HUDs, menus, and overlays — that survive every screen: anchor- based responsive layout, resolution/aspect scaling and safe areas, … |
| `input-systems` | A | Architect game input — action mapping (abstracting keys into named actions), rebinding with conflict detection and persistence, multi-device support (keyboard, … |
| `level-design` | A | Design and build playable levels — the blockout/whitebox-to-playable workflow, player metrics and grid layout, pacing and flow (tension/rest curve), gating and … |
| `netcode-fundamentals` | new | Design engine-neutral multiplayer netcode: client-server versus peer-to-peer, server authority, state replication strategy per data type, client prediction with… |
| `physics-tuning` | A | Tune game physics for stable, good-feeling motion — fixed vs variable timestep, render interpolation, mass/gravity/drag, continuous collision detection (CCD) to… |
| `procedural-gen` | A | Generate game content procedurally — seeded deterministic RNG, value/Perlin/ Simplex noise for terrain and heightmaps, grid dungeon generation (rooms + corridor… |
| `save-systems` | A | Design save/load for game state — choosing what to serialize, file formats, save slots, atomic crash-safe writes, schema versioning and migration, and autosave. |
| `shader-programming` | A | Write game shaders from cross-engine fundamentals — the vertex→fragment pipeline, coordinate spaces, UV math, and common 2D/3D effects (tint, UV scroll, dissolv… |

### Genres (9)

| Skill | Origin | What it does |
|---|---|---|
| `card-game` | A | Build a card game: card data, deck/hand/discard zones, draw/shuffle/reshuffle, a turn structure, costs, and effect resolution. |
| `fps-shooter` | A | Build a first-person shooter: move+mouse-look controller, hitscan or projectile shooting, weapons, health, and enemy AI. |
| `platformer` | A | Build a 2D platformer: run/jump control with coyote time, jump buffering, and variable jump height, wall slide and wall jump, plus tiled levels and hazards. |
| `puzzle` | A | Build a puzzle game: grid/board state, move input, rule-based resolution (match-3 cascades, sokoban pushes, tile logic), scoring, and undo. |
| `roguelike` | A | Build a roguelike: turn-based grid movement, procedural dungeons, permadeath, field-of-view, and loot tables. |
| `rpg` | A | Build an RPG: stats and leveling, inventory and equipment, quests, branching dialogue, save/load, and combat. |
| `survival-crafting` | A | Build a survival-crafting game: resource gathering, inventory, crafting and a tech tree, needs (hunger/thirst/temperature), and base building. |
| `tower-defense` | A | Build a tower defense: enemies pathing along lanes, wave spawning, towers that auto-target and fire, an economy, and lives. |
| `visual-novel` | A | Build a visual novel: a branching script, character and background display, a text box with choices, save/load, backlog, and skip/auto. |

### Shipping (3)

| Skill | Origin | What it does |
|---|---|---|
| `game-jam` | A | Plan and ship a game under a jam deadline: lock scope to the clock, schedule the hours, cut features, and submit on time. |
| `itch-publish` | A | Publish and update a game on itch.io: create the project page and upload builds with the butler CLI (butler push) to named channels. |
| `steam-publish` | A | Publish or update a game on Steam with Steamworks and SteamPipe: configure depots and packages, upload builds with steamcmd, set a build live on a branch, and r… |

## Studio skills by stage

### Getting started and navigation (7)

| Skill | Origin | What it does |
|---|---|---|
| `/adopt` | B | Brownfield audit — do existing artifacts actually work? |
| `/help` | B | What should I do next? |
| `/onboard` | B | Onboarding doc for a new contributor or agent — project state, conventions, priorities relevant to the specified role. |
| `/project-stage-detect` | B | Analyze project state, detect stage, identify gaps, recommend next steps. |
| `/settings` | B | View or change project config — effective merged values, or set locally in project.local.yaml. |
| `/setup-engine` | B | Configure engine and version. |
| `/start` | B | Guides a first-time user through onboarding and picks the right workflow. |

### Concept and design (15)

| Skill | Origin | What it does |
|---|---|---|
| `/art-bible` | B | Author the Art Bible — visual identity gating asset production. |
| `/asset-spec` | B | Per-asset visual specs plus AI generation prompts from GDDs and character profiles. |
| `/balance-check` | B | Find balance outliers, broken progressions, degenerate strategies, economy imbalances in formulas and data. |
| `/brainstorm` | B | Guides the user through finding and choosing a game concept. |
| `/consistency-check` | B | Scan GDDs against the entity registry for cross-document conflicts. |
| `/design-review` | B | Reviews one design document for completeness, internal consistency, implementability, and design standards. |
| `/design-system` | B | Section-by-section GDD authoring for one system — walks through each required section, cross-references dependencies. |
| `/map-systems` | B | Decompose a concept into individual systems, map dependencies, prioritize design order, create the systems index. |
| `/propagate-design-change` | B | Finds architecture decisions (ADRs) made stale by a changed GDD and walks through resolving each. |
| `/prototype` | A+B | Throwaway prototype that answers one question: is this mechanic fun? |
| `/quick-design` | B | Lightweight spec for small changes — tuning adjustments, minor mechanics. |
| `/reverse-document` | B | Generate missing design or architecture docs from existing implementation — works backwards from code and prototypes. |
| `/review-all-gdds` | B | Holistic cross-GDD review — contradictions between systems, dominant strategies, economic imbalance, cognitive overload, pillar drift. |
| `/ux-design` | B | Section-by-section UX spec authoring for a screen, flow or HUD. |
| `/ux-review` | B | Validate a UX spec, HUD design or pattern library — accessibility, GDD alignment, readiness. |

### Architecture and planning (15)

| Skill | Origin | What it does |
|---|---|---|
| `/architecture-decision` | B | Create an ADR documenting a technical decision: context, alternatives considered, consequences. |
| `/architecture-review` | B | Traceability matrix mapping GDD requirements to ADRs. |
| `/create-architecture` | B | Author the architecture blueprint before code is written. |
| `/create-control-manifest` | B | Builds a short list of must-do and never-do coding rules per system from accepted ADRs. |
| `/create-epics` | B | Turns the GDDs and architecture into epics, one per architectural module. |
| `/create-stories` | B | Breaks one epic into implementable stories with acceptance criteria. |
| `/estimate` | B | Estimate task effort from complexity, dependencies, velocity, risk. |
| `/gate-check` | B | Ready to advance between development phases? |
| `/milestone-review` | B | Milestone progress review — completeness, quality metrics, risk, go/no-go recommendation. |
| `/retrospective` | B | Sprint or milestone retrospective from completed work, velocity, blockers. |
| `/scope-check` | B | Scope creep check — current scope versus the original plan. |
| `/sprint-plan` | B | New or updated sprint plan from the current milestone, completed work, and available capacity. |
| `/sprint-status` | B | Fast, concise sprint snapshot — burndown and emerging risks for situational awareness. |
| `/tech-debt` | B | Track, categorize and prioritize technical debt across the codebase — scans for debt indicators, maintains a register. |
| `/vertical-slice` | B | Pre-production validation — end-to-end build to confirm the full loop is achievable before committing to Production. |

### Building stories (9)

| Skill | Origin | What it does |
|---|---|---|
| `/asset-audit` | B | Audit assets against naming conventions, file size budgets, format standards. |
| `/code-review` | B | Architectural code review — coding standards, SOLID, testability, performance concerns. |
| `/content-audit` | B | Audit GDD content counts against what's implemented — planned vs built. |
| `/dev-story` | B | Implements one story in code with tests, following its ADRs. |
| `/localize` | B | Localization pipeline — find hardcoded strings, extract string tables, cultural review, VO, RTL, enforce string freeze. |
| `/perf-profile` | A+B | Find and fix game performance problems: measure against frame, memory, draw call and load budgets, locate the CPU or GPU bottleneck with the engine profiler, ra… |
| `/security-audit` | B | Security audit — save tampering, cheat vectors, network exploits, data exposure, input validation. |
| `/story-done` | B | Closes a finished story: verifies each acceptance criterion, checks for design or ADR deviations and updates its status. |
| `/story-readiness` | B | Checks whether a story is ready to implement: clear acceptance criteria, no open questions, valid ADR and dependencies. |

### QA and testing (11)

| Skill | Origin | What it does |
|---|---|---|
| `/bug-report` | B | Structured bug report from a description, or analyze code for potential bugs. |
| `/bug-triage` | B | Re-evaluate open bugs — priority vs severity, assign to sprints, surface systemic trends. |
| `/playtest-report` | B | Structured playtest report template, or turn existing playtest notes into structured feedback. |
| `/qa-plan` | B | QA test plan for a sprint — classifies stories by Logic/Integration/Visual/UI, covers automated tests, manual cases, smoke scope. |
| `/regression-suite` | B | Map test coverage to GDD critical paths, find fixed bugs lacking regression tests, flag drift from new features. |
| `/smoke-check` | B | Critical-path smoke gate before QA hand-off — runs the automated suite. |
| `/soak-test` | B | Soak test protocol for extended play — what to observe and log for slow leaks, fatigue, late-appearing edge cases. |
| `/test-evidence-review` | B | Quality review of test files and evidence — goes beyond existence, evaluates assertion coverage. |
| `/test-flakiness` | B | Find flaky tests from CI logs — aggregates pass rates, spots intermittent failures, recommends quarantine. |
| `/test-helpers` | B | Generate engine-specific test helper libraries — assertion utilities, factory functions, mocks in the engine's test folder. |
| `/test-setup` | B | Scaffold the test framework and CI — tests/ directory, engine test runner, GitHub Actions workflow. |

### Release and live ops (6)

| Skill | Origin | What it does |
|---|---|---|
| `/changelog` | B | Auto-generate a changelog from git commits and sprint data. |
| `/day-one-patch` | B | Day-one launch patch — focused fix for known issues found after gold master. |
| `/hotfix` | B | Emergency fix bypassing normal sprint process — hotfix branch, approvals tracked, backport verified, full audit trail. |
| `/launch-checklist` | B | Launch readiness across every department: code, content, store, marketing, community, infrastructure, legal, go/no-go sign-offs. |
| `/patch-notes` | B | Player-facing patch notes from git history and changelogs. |
| `/release-checklist` | B | Pre-release checklist — build verification, certification requirements, store metadata, launch readiness. |

### Team orchestration (9)

| Skill | Origin | What it does |
|---|---|---|
| `/team-audio` | B | Orchestrate the audio team — audio-director, sound-designer, technical-artist, gameplay-programmer — direction through implementation. |
| `/team-combat` | B | Orchestrate the combat team — game-designer, gameplay-programmer, ai-programmer, technical-artist, sound-designer, qa-tester — design through implement and vali… |
| `/team-level` | B | Orchestrate the level team — level-designer, narrative-director, world-builder, art-director, systems-designer, qa-tester — for complete area creation. |
| `/team-live-ops` | B | Orchestrate the live-ops team — live-ops-designer, economy-designer, analytics-engineer, community-manager, writer — for a season or live event. |
| `/team-narrative` | B | Orchestrate the narrative team — narrative-director, writer, world-builder, level-designer — for story, world lore, narrative-driven levels. |
| `/team-polish` | B | Orchestrate the polish team — performance-analyst, technical-artist, sound-designer, qa-tester — to optimize and harden a feature or area. |
| `/team-qa` | B | Orchestrate the QA team through a full testing cycle — qa-lead strategy and test plan, qa-tester case writing, execution, sign-off. |
| `/team-release` | B | Orchestrate the release team — release-manager, qa-lead, devops-engineer, producer — to execute a release from candidate to deployment. |
| `/team-ui` | B | Orchestrate the UI team through the UX pipeline — authoring, visual design, implementation, review, polish. |

### Framework upkeep (2)

| Skill | Origin | What it does |
|---|---|---|
| `/skill-improve` | B | Improve a skill via a test-fix-retest loop — static checks, targeted fixes, keep or revert on score change. |
| `/skill-test` | B | Validate skill files for structural compliance and behavioral correctness. |
