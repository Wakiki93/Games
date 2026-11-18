---
name: unreal-umg
description: "Build Unreal Engine 5 UI with UMG and CommonUI: widget hierarchy, data binding without per-frame polling, CommonUI input routing for gamepad and keyboard, widget pooling, styling, UI performance and accessibility. Use when creating or debugging UMG widgets, HUDs, menus, WBP_ assets, CommonUI activatable widgets, or slow or unresponsive Unreal UI."
---

# Unreal UMG and CommonUI

Build Unreal Engine 5 menus and HUDs that respond to every input device, update from events instead of polling, and stay cheap to render.

## When to use

- Creating HUDs, menus or overlays as UMG widgets.
- Routing gamepad and keyboard focus with CommonUI.
- Fixing UI that ticks every frame, leaks widgets or ignores the gamepad.

**When not to use:** Engine-neutral layout and UX patterns (use `game-ui-ux`); writing the UX spec itself (use `ux-design`).

## Workflow

1. Inspect the project first: engine version, existing classes, and how the feature is wired today.
2. Read the standards below that apply to the task, and the design document if one exists (`design/gdd/` in a studio project).
3. Propose the structure (classes, data flow, files) and the trade-offs before writing code.
4. Implement in small steps and verify each one in the engine or with tests.
5. Flag anything below that the current code violates, ranked by risk.

## Version check before writing engine code

1. Read the project's pinned version: `docs/engine-reference/unreal/VERSION.md` in a studio project, otherwise the engine's own project file.
2. Check `docs/engine-reference/unreal/deprecated-apis.md` and `breaking-changes.md` when they exist.
3. If an API you plan to use is not covered by those files or the engine docs, say it is unverified instead of asserting it from memory.

## What this covers
- Design widget hierarchy and screen management architecture
- Implement data binding between UI and game state
- Configure CommonUI for cross-platform input handling
- Optimize UI performance (widget pooling, invalidation, draw calls)
- Enforce UI/game state separation (UI never owns game state)
- Ensure UI accessibility (text scaling, colorblind support, navigation)

## UMG Architecture Standards

### Widget Hierarchy
- Use a layered widget architecture:
  - `HUD Layer`: always-visible game HUD (health, ammo, minimap)
  - `Menu Layer`: pause menus, inventory, settings
  - `Popup Layer`: confirmation dialogs, tooltips, notifications
  - `Overlay Layer`: loading screens, fade effects, debug UI
- Each layer is managed by a `UCommonActivatableWidgetContainerBase` (if using CommonUI)
- Widgets must be self-contained — no implicit dependencies on parent widget state
- Use widget blueprints for layout, C++ base classes for logic
- Screen flow is ux-designer's: build the stack mechanics, but don't decide back-button behavior, transitions, or modal vs. full-screen without a UX spec — ask for it or list them as open questions, and offer to build the screens once the flow is defined

### CommonUI Setup
- Use `UCommonActivatableWidget` as base class for all screen widgets
- Use `UCommonActivatableWidgetContainerBase` subclasses for screen stacks:
  - `UCommonActivatableWidgetStack`: LIFO stack (menu navigation)
  - `UCommonActivatableWidgetQueue`: FIFO queue (notifications)
- Configure `CommonInputActionDataBase` for platform-aware input icons
- Bind UI actions to rows the project's `CommonInputActionDataBase` table already defines; a new action is a new row in that table — name it and ask before adding it
- Use `UCommonButtonBase` for all interactive buttons — handles gamepad/mouse automatically
- Input routing: focused widget consumes input, unfocused widgets ignore it

### Data Binding
- UI reads from game state via `ViewModel` or `WidgetController` pattern:
  - Game state -> ViewModel -> Widget (UI never modifies game state)
  - Widget user action -> Command/Event -> Game system (indirect mutation)
- Use `PropertyBinding` or manual `NativeTick`-based refresh for live data
- Use Gameplay Tag events for state change notifications to UI
- Cache bound data — don't poll game systems every frame
- `ListViews` must use `UObject`-based entry data, not raw structs

### Widget Pooling
- Use `UListView` / `UTileView` with `EntryWidgetPool` for scrollable lists
- Pool frequently created/destroyed widgets (damage numbers, pickup notifications)
- Pre-create pools at screen load, not on first use
- Return pooled widgets to initial state on release (clear text, reset visibility)

### Styling
- Define a central `USlateWidgetStyleAsset` or style data asset for consistent theming
- Colors, fonts, and spacing should reference the style asset, never be hardcoded
- Support at minimum: Default theme, High Contrast theme, Colorblind-safe theme
- Text must use `FText` (localization-ready), never `FString` for display text
- All user-facing text keys go through the localization system

### Input Handling
- Support keyboard+mouse AND gamepad for ALL interactive elements
- Use CommonUI's input routing — never raw `APlayerController::InputComponent` for UI. Tell a routing fault (the data-table row, activation, focus) apart from a hardware key-binding fault, which is Enhanced Input's, not UI's
- Gamepad navigation must be explicit: define focus paths between widgets
- Show correct input prompts per platform (Xbox icons on Xbox, PS icons on PS, KB icons on PC)
- Use `UCommonInputSubsystem` to detect active input type and switch prompts automatically

### Performance
- Minimize widget count — invisible widgets still have overhead
- Use `SetVisibility(ESlateVisibility::Collapsed)` not `Hidden` (Collapsed removes from layout)
- Avoid `NativeTick` where possible — use event-driven updates
- Batch UI updates — don't update 50 list items individually, rebuild the list once
- Use `Invalidation Box` for static portions of the HUD that rarely change
- Profile UI with `stat slate`, `stat ui`, and Widget Reflector
- Target: UI should use < 2ms of frame budget

### Accessibility
- All interactive elements must be keyboard/gamepad navigable
- Text scaling: support at least 3 sizes (small, default, large)
- Colorblind modes: icons/shapes must supplement color indicators
- Screen reader annotations on key widgets (if targeting accessibility standards)
- Subtitle widget with configurable size, background opacity, and speaker labels
- Animation skip option for all UI transitions

### Common UMG Anti-Patterns
- UI directly modifying game state (health bars reducing health)
- Hardcoded `FString` text instead of `FText` localized strings
- Creating widgets in Tick instead of pooling
- Using `Canvas Panel` for everything (use `Vertical/Horizontal/Grid Box` for layout)
- Not handling gamepad navigation (keyboard-only UI)
- Deeply nested widget hierarchies (flatten where possible)
- Binding to game objects without null-checking (widgets outlive game objects)

## Related skills

- `game-ui-ux`
- `ux-design`
- `ux-review`
- `unreal-enhanced-input`
- `game-accessibility`

---
_Built for the merged game dev skill pack from the `ue-umg-specialist` agent of Claude Code Game Studios (MIT, Copyright (c) 2026 Donchitos). See ATTRIBUTION.md._
