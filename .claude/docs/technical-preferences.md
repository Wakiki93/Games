# Technical Preferences

<!-- project.yaml at the repo root is the machine-readable source of truth for
     engine, specialists, naming, performance, platform, and testing.framework.
     This file is the human-readable LEGACY FALLBACK: agents and skills resolve
     each key from project.yaml first and fall back here only when the
     project.yaml key is absent. /setup-engine dual-writes both.
     Forbidden patterns and allowed libraries are NOT migrated — they live only
     in this file. Populated by /setup-engine; updated as decisions are made. -->

## Engine & Language

- **Engine**: Unreal Engine 5.8 (latest hotfix 5.8.4)
- **Language**: C++ (primary), Blueprint (gameplay prototyping, content and tuning)
- **Rendering**: Lumen + Nanite (deferred)
- **Physics**: Chaos
- **Project / Module**: Holdout (working title) — C++ module `Holdout`; code root `Source/Holdout/`, tests `Source/Holdout/Private/Tests/`, content `Content/`
- **Key Engine Subsystems (planned)**: Gameplay Ability System (abilities, stamina, damage); built-in replication with dedicated/listen server; Chaos Destruction (Geometry Collections) for buildings; Enhanced Input; UMG + CommonUI for HUD; Behavior Trees / StateTree for zombie AI, with Mass as a candidate for large hordes; World Partition for large OpenStreetMap-derived maps

## Input & Platform

<!-- Written by /setup-engine. Read by /ux-design, /ux-review, /test-setup, /team-ui, and /dev-story -->
<!-- to scope interaction specs, test helpers, and implementation to the correct input methods. -->

- **Target Platforms**: PC (Windows), distributed on Steam
- **Input Methods**: Keyboard/Mouse, Gamepad
- **Primary Input**: Keyboard/Mouse
- **Gamepad Support**: Full (user decision 2026-11-19: playtests use an Xbox Elite Series 2 controller, so every build must be fully playable with a gamepad alone)
- **Touch Support**: None
- **Platform Notes**: First-person shooter aiming is mouse-driven; every menu and HUD flow must work with keyboard/mouse alone and with a gamepad alone, and no gameplay information may be hover-only. Gamepad aiming needs stick deadzones, a response curve and adjustable sensitivity. 4-player online co-op (dedicated or listen server). Steam is the storefront — Steam integration is added to Allowed Libraries when that work begins, not at engine setup.

## Naming Conventions

<!-- Epic's Unreal C++ coding standard. project.yaml `naming:` holds the enum form. -->

- **Classes**: Prefixed PascalCase — `A` Actor, `U` UObject, `F` struct, `E` enum, `I` interface, `T` template (e.g., `AHoldoutCharacter`, `UStaminaComponent`, `FWeaponStats`)
- **Variables**: PascalCase (e.g., `MoveSpeed`); booleans take a `b` prefix (e.g., `bIsAlive`)
- **Functions**: PascalCase (e.g., `TakeDamage()`)
- **Signals/Events**: PascalCase `On<Event>` delegates and handlers (e.g., `OnHealthChanged`) — Unreal has delegates/events, not signals
- **Files**: PascalCase, matching the class without its prefix (e.g., `HoldoutCharacter.h`)
- **Scenes/Prefabs**: PascalCase — Unreal has Levels/Maps (World Partition), not scenes
- **Asset Prefixes**: `BP_` Blueprint, `WBP_` Widget Blueprint, `GA_` Gameplay Ability, `GE_` Gameplay Effect, `BT_` Behavior Tree, `ABP_` Animation Blueprint, `GC_` Geometry Collection
- **Constants**: SCREAMING_SNAKE — UNVERIFIED: not sourceable from `docs/engine-reference/unreal/`; confirm before relying on it

## Performance Budgets

- **Target Framerate**: 60 fps at 1080p on a mid-range PC GPU (RTX 3060-class), with 4 players and up to ~100 active zombies
- **Frame Budget**: 16.6 ms
- **Draw Calls**: [TO BE CONFIGURED — set after the first profiling pass]
- **Memory Ceiling**: [TO BE CONFIGURED]
- **Network**: 30 Hz server tick target, 4 players

## Testing

- **Framework**: Unreal Automation (Automation Spec) — tests under `Source/Holdout/Private/Tests/`, named `Holdout.[System].[Scenario]`
- **Minimum Coverage**: [TO BE CONFIGURED]
- **Required Tests**: Balance formulas, gameplay systems, networking (applies: 4-player online co-op)

## Forbidden Patterns

<!-- Add patterns that should never appear in this project's codebase -->
- [None configured yet — add as architectural decisions are made]

## Allowed Libraries / Addons

<!-- Add approved third-party dependencies here -->
- [None configured yet — add as dependencies are approved]

## Architecture Decisions Log

<!-- Quick reference linking to full ADRs in docs/architecture/ -->
- [No ADRs yet — use /architecture-decision to create one]

## Engine Specialists

<!-- Written by /setup-engine when engine is configured. -->
<!-- Read by /code-review, /architecture-decision, /architecture-review, and team skills -->
<!-- to know which specialist to spawn for engine-specific validation. -->

- **Primary**: unreal-specialist
- **Language/Code Specialist**: ue-blueprint-specialist (Blueprint graphs) or unreal-specialist (C++)
- **Shader Specialist**: unreal-specialist (no dedicated shader specialist — primary covers materials)
- **UI Specialist**: ue-umg-specialist (UMG widgets, CommonUI, input routing, widget styling)
- **Additional Specialists**: ue-gas-specialist (Gameplay Ability System, attributes, gameplay effects), ue-replication-specialist (property replication, RPCs, client prediction, netcode)
- **Routing Notes**: Invoke primary for C++ architecture and broad engine decisions. Invoke Blueprint specialist for Blueprint graph architecture and BP/C++ boundary design. Invoke GAS specialist for all ability and attribute code. Invoke replication specialist for any multiplayer or networked systems. Invoke UMG specialist for all UI implementation.

### File Extension Routing

<!-- Skills use this table to select the right specialist per file type. -->
<!-- If a row says [TO BE CONFIGURED], fall back to Primary for that file type. -->

| File Extension / Type | Specialist to Spawn |
|-----------------------|---------------------|
| Game code (.cpp, .h files) | unreal-specialist |
| Shader / material files (.usf, .ush, Material assets) | unreal-specialist |
| UI / screen files (.umg, UMG Widget Blueprints) | ue-umg-specialist |
| Scene / prefab / level files (.umap, .uasset) | unreal-specialist |
| Native extension / plugin files (Plugin .uplugin, modules) | unreal-specialist |
| Blueprint graphs (.uasset BP classes) | ue-blueprint-specialist |
| General architecture review | unreal-specialist |
