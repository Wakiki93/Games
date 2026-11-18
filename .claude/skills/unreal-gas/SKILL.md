---
name: unreal-gas
description: "Build abilities with Unreal's Gameplay Ability System (GAS): Gameplay Abilities, Gameplay Effects, Attribute Sets, Gameplay Tags, Ability Tasks and prediction keys, and avoid common GAS anti-patterns. Use when the project uses AbilitySystemComponent, GameplayAbility, GameplayEffect, AttributeSet or gameplay tags, or when designing attacks, blocks, stamina, cooldowns, buffs or damage in Unreal."
---

# Unreal Gameplay Ability System

Model combat and abilities in Unreal Engine 5 with the Gameplay Ability System so that costs, cooldowns, buffs and damage are data driven, tag gated and network predicted.

## When to use

- Creating or reviewing GameplayAbility, GameplayEffect or AttributeSet classes.
- Designing attacks, parries, stamina, cooldowns, buffs, debuffs or damage pipelines in Unreal.
- Fixing abilities that misfire, double apply or desync in multiplayer.

**When not to use:** Plain actor gameplay without GAS (use `unreal-cpp-gameplay` or `unreal-blueprints`); general replication rules (use `unreal-replication`).

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
- Design and implement Gameplay Abilities (GA)
- Design Gameplay Effects (GE) for stat modification, buffs, debuffs, damage
- Define and maintain Attribute Sets (health, mana, stamina, damage, etc.)
- Architect the Gameplay Tag hierarchy for state identification
- Implement Ability Tasks for async ability flow
- Handle GAS prediction and replication for multiplayer
- Review all GAS code for correctness and consistency

## GAS Architecture Standards

### Ability Design
- Every ability must inherit from a project-specific base class, not raw `UGameplayAbility`
- Abilities must define their Gameplay Tags: ability tag, cancel tags, block tags
- Use `ActivateAbility()` / `EndAbility()` lifecycle properly — never leave abilities hanging
- Cost and cooldown must use Gameplay Effects, never manual stat manipulation
- Abilities must check `CanActivateAbility()` before execution
- Use `CommitAbility()` to apply cost and cooldown atomically
- Prefer Ability Tasks over raw timers/delegates for async flow within abilities

### Gameplay Effects
- All stat changes must go through Gameplay Effects — NEVER modify attributes directly
- Use `Duration` effects for temporary buffs/debuffs, `Infinite` for persistent states, `Instant` for one-shot changes
- Stacking policies must be explicitly defined for every stackable effect
- Use `Executions` for complex damage calculations, `Modifiers` for simple value changes
- GE classes should be data-driven (Blueprint data-only subclasses), not hardcoded in C++
- Every GE must document: what it modifies, stacking behavior, duration, and removal conditions

### Attribute Sets
- Group related attributes in the same Attribute Set (e.g., `UCombatAttributeSet`, `UVitalAttributeSet`)
- Use `PreAttributeChange()` for clamping, `PostGameplayEffectExecute()` for reactions (death, etc.)
- All attributes must have defined min/max ranges
- Base values vs current values must be used correctly — modifiers affect current, not base
- Never create circular dependencies between attribute sets
- Initialize attributes via a Data Table or default GE, not hardcoded in constructors
- Build on the attributes and Gameplay Tags the project already defines; a new attribute or tag changes the project's Attribute Set or tag list — name it and ask before adding it

### Gameplay Tags
- Organize tags hierarchically: `State.Dead`, `Ability.Combat.Slash`, `Effect.Buff.Speed`
- Use tag containers (`FGameplayTagContainer`) for multi-tag checks
- Prefer tag matching over string comparison or enums for state checks
- Define all tags in a central `.ini` or data asset — no scattered `FGameplayTag::RequestGameplayTag()` calls
- Document the tag hierarchy in `design/gdd/gameplay-tags.md`

### Ability Tasks
- Use Ability Tasks for: montage playback, targeting, waiting for events, waiting for tags
- Always handle the `OnCancelled` delegate — don't just handle success
- Use `WaitGameplayEvent` for event-driven ability flow
- Custom Ability Tasks must call `EndTask()` to clean up properly
- Ability Tasks must be replicated if the ability runs on server

### Prediction and Replication
- Mark abilities as `LocalPredicted` for responsive client-side feel with server correction
- Predicted effects must use `FPredictionKey` for rollback support
- Attribute changes from GEs replicate automatically — don't double-replicate
- Use `AbilitySystemComponent` replication mode appropriate to the game:
  - `Full`: every client sees every ability (small player counts)
  - `Mixed`: owning client gets full, others get minimal (recommended for most games)
  - `Minimal`: only owning client gets info (maximum bandwidth savings)

### Common GAS Anti-Patterns to Flag
- Modifying attributes directly instead of through Gameplay Effects
- Hardcoding ability values in C++ instead of using data-driven GEs
- Not handling ability cancellation/interruption
- Forgetting to call `EndAbility()` (leaked abilities block future activations)
- Using Gameplay Tags as strings instead of the tag system
- Applying one tag and checking for another with a different root (`Stunned` vs `Status.Stunned`) — they are different tags, and hierarchical matching only matches a tag to its own parents; apply and query the same full tag
- Stacking effects without defined stacking rules (causes unpredictable behavior) — stacking rules govern re-applications of the same GE; different GEs pushing one attribute past its range are bounded by clamping in the AttributeSet — `PreAttributeChange()` for the current value, `PreAttributeBaseChange()` or `PostGameplayEffectExecute()` for base-value changes from instant GEs (`docs/engine-reference/unreal/plugins/gameplay-ability-system.md`, "Clamping Attributes") — not by a stacking policy or an Override modifier
- Applying cost/cooldown before checking if ability can actually execute

## Related skills

- `unreal-replication`
- `unreal-cpp-gameplay`
- `unreal-enhanced-input`
- `game-feel`
- `balance-check`

---
_Built for the merged game dev skill pack from the `ue-gas-specialist` agent of Claude Code Game Studios (MIT, Copyright (c) 2026 Donchitos). See ATTRIBUTION.md._
