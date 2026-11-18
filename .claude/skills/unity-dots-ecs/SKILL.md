---
name: unity-dots-ecs
description: "Write Unity DOTS code: Entities components and systems, queries, the Jobs system, Burst-compiled code, memory layout and Entities Graphics, while avoiding common ECS anti-patterns. Use when a Unity project uses com.unity.entities, ISystem, SystemAPI, IJobEntity, Burst or NativeArray, or needs thousands of simulated objects."
---

# Unity DOTS and ECS

Use Unity's data-oriented stack when the game needs many simulated objects at a steady frame rate: plain data in components, logic in Burst-compiled systems and jobs.

## When to use

- Building or reviewing Entities components and systems.
- Moving a hot loop to Jobs and Burst.
- Simulating crowds, projectiles or large battles in Unity.

**When not to use:** Ordinary MonoBehaviour gameplay (use `unity-csharp-scripting`).

## Workflow

1. Inspect the project first: engine version, existing classes, and how the feature is wired today.
2. Read the standards below that apply to the task, and the design document if one exists (`design/gdd/` in a studio project).
3. Propose the structure (classes, data flow, files) and the trade-offs before writing code.
4. Implement in small steps and verify each one in the engine or with tests.
5. Flag anything below that the current code violates, ranked by risk.

## Version check before writing engine code

1. Read the project's pinned version: `docs/engine-reference/unity/VERSION.md` in a studio project, otherwise the engine's own project file.
2. Check `docs/engine-reference/unity/deprecated-apis.md` and `breaking-changes.md` when they exist.
3. If an API you plan to use is not covered by those files or the engine docs, say it is unverified instead of asserting it from memory.

## What this covers
- Design Entity Component System (ECS) architecture
- Implement Systems with correct scheduling and dependencies
- Optimize with the Jobs system and Burst compiler
- Manage entity archetypes and chunk layout for cache efficiency
- Handle hybrid renderer integration (DOTS + GameObjects)
- Ensure thread-safe data access patterns

## ECS Architecture Standards

### Component Design
- Components are pure data — NO methods, NO logic, NO references to managed objects
- Use `IComponentData` for per-entity data (position, health, velocity)
- Use `ISharedComponentData` sparingly — shared components fragment archetypes
- Use `IBufferElementData` for variable-length per-entity data (inventory slots, path waypoints)
- Use `IEnableableComponent` for toggling behavior without structural changes
- Keep components small — only include fields the system actually reads/writes
- Avoid "god components" with 20+ fields — split by access pattern

### Component Organization
- Group components by system access pattern, not by game concept:
  - GOOD: `Position`, `Velocity`, `PhysicsState` (separate, each read by different systems)
  - BAD: `CharacterData` (position + health + inventory + AI state all in one)
- Tag components (`struct IsEnemy : IComponentData {}`) are free — use them for filtering
- Use `BlobAssetReference<T>` for shared read-only data (animation curves, lookup tables)

### System Design
- Systems must be stateless — all state lives in components
- Use `SystemBase` for managed systems, `ISystem` for unmanaged (Burst-compatible) systems
- Prefer `ISystem` + `Burst` for all performance-critical systems
- Define `[UpdateBefore]` / `[UpdateAfter]` attributes to control execution order
- Use `SystemGroup` to organize related systems into logical phases
- Systems should process one concern — don't combine movement and combat in one system; a value another system produces (input, for example) is read from the component it writes, and a change to that system is asked about first
- Design to the CPU budget the project or the request states: cite it in your rationale, flag any design likely to exceed it, and name how it will be measured (Entities Profiler system timings and per-archetype memory) instead of presenting unmeasured timings as fact

### Queries
- Use `EntityQuery` with precise component filters — never iterate all entities
- Use `WithAll<T>`, `WithNone<T>`, `WithAny<T>` for filtering
- Use `RefRO<T>` for read-only access, `RefRW<T>` for read-write access
- Cache queries — don't recreate them every frame
- Use `EntityQueryOptions.IncludeDisabledEntities` only when explicitly needed

### Jobs System
- Use `IJobEntity` for simple per-entity work (most common pattern)
- Use `IJobChunk` for chunk-level operations or when you need chunk metadata
- Use `IJob` for single-threaded work that still benefits from Burst
- Always declare dependencies correctly — read/write conflicts cause race conditions
- Use `[ReadOnly]` attribute on job fields that only read data
- Schedule jobs in `OnUpdate()`, let the job system handle parallelism
- Never call `.Complete()` immediately after scheduling — that defeats the purpose

### Burst Compiler
- Mark all performance-critical jobs and systems with `[BurstCompile]`
- Avoid managed types in Burst code (no `string`, `class`, `List<T>`, delegates)
- Use `NativeArray<T>`, `NativeList<T>`, `NativeHashMap<K,V>` instead of managed collections
- Use `FixedString` instead of `string` in Burst code
- Use `math` library (`Unity.Mathematics`) instead of `Mathf` for SIMD optimization
- Profile with Burst Inspector to verify vectorization
- Avoid branches in tight loops — use `math.select()` for branchless alternatives

### Memory Management
- Dispose all `NativeContainer` allocations — use `Allocator.TempJob` for frame-scoped, `Allocator.Persistent` for long-lived
- Use `EntityCommandBuffer` (ECB) for structural changes (add/remove components, create/destroy entities)
- Never make structural changes inside a job — use ECB with `EndSimulationEntityCommandBufferSystem`
- Batch structural changes — don't create entities one at a time in a loop
- Pre-allocate `NativeContainer` capacity when the size is known

### Hybrid Renderer (Entities Graphics)
- Use hybrid approach for: complex rendering, VFX, audio, UI (these still need GameObjects)
- Convert GameObjects to entities using baking (subscenes) — a `Baker<T>` per authoring component, as `plugins/dots-entities.md` shows
- Use `CompanionGameObject` for entities that need GameObject features
- Keep the DOTS/GameObject boundary clean — don't cross it every frame; hand values across at one explicit point, as unmanaged `Unity.Mathematics` data, never touched per entity
- Use `LocalTransform` + `LocalToWorld` for entity transforms, not `Transform`

### Common DOTS Anti-Patterns
- Putting logic in components (components are data, systems are logic)
- Using `SystemBase` where `ISystem` + Burst would work (performance loss)
- Structural changes inside jobs (causes sync points, kills performance)
- Calling `.Complete()` immediately after scheduling (removes parallelism)
- Using managed types in Burst code (prevents compilation)
- Giant components that cause cache misses (split by access pattern)
- Forgetting to dispose NativeContainers (memory leaks)
- Using `GetComponent<T>` per-entity instead of bulk queries (O(n) lookups)

## Related skills

- `unity-csharp-scripting`
- `perf-profile`
- `unity-physics`

---
_Built for the merged game dev skill pack from the `unity-dots-specialist` agent of Claude Code Game Studios (MIT, Copyright (c) 2026 Donchitos). See ATTRIBUTION.md._
