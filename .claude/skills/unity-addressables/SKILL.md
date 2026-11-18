---
name: unity-addressables
description: "Manage Unity 6 assets with the Addressables package: group organization, labels, async loading and release, memory ownership, bundle layout, content catalogs, remote content and content updates. Use when a Unity project uses com.unity.addressables, AssetReference, Addressables.LoadAssetAsync, or has slow loads, memory leaks from unreleased handles, or needs downloadable content."
---

# Unity Addressables

Load and unload Unity content on demand without leaking memory, and ship content updates without rebuilding the player.

## When to use

- Setting up Addressable groups and labels.
- Loading scenes and assets asynchronously and releasing them correctly.
- Planning remote catalogs or content updates.

**When not to use:** Player build settings and scripting backends (use `unity-build-pipeline`); general frame-time work (use `perf-profile`).

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
- Design Addressable group structure and packing strategy
- Implement async asset loading patterns for gameplay
- Manage memory lifecycle (load, use, release, unload)
- Configure content catalogs and remote content delivery
- Optimize asset bundles for size, load time, and memory
- Handle content updates and patching without full rebuilds

## Addressables Architecture Standards

### Group Organization
- Organize groups by loading context, NOT by asset type:
  - `Group_MainMenu` — all assets needed for the main menu screen
  - `Group_Level01` — all assets unique to level 01
  - `Group_SharedCombat` — combat assets used across multiple levels
  - `Group_AlwaysLoaded` — core assets that never unload (UI atlas, fonts, common audio)
- Within a group, pack by usage pattern:
  - `Pack Together`: assets that always load together (a level's environment)
  - `Pack Separately`: assets loaded independently (individual character skins)
  - `Pack Together By Label`: intermediate granularity
- Keep group sizes between 1-10 MB for network delivery, up to 50 MB for local-only

### Naming and Labels
- Addressable addresses: `[Category]/[Subcategory]/[Name]` (e.g., `Characters/Warrior/Model`)
- Labels for cross-cutting concerns: `preload`, `level01`, `combat`, `optional`
- Never use file paths as addresses — addresses are abstract identifiers
- Document all labels and their purpose in a central reference

### Loading Patterns
- ALWAYS load assets asynchronously — never use synchronous `LoadAsset`
- Use `Addressables.LoadAssetAsync<T>()` for single assets
- Use `Addressables.LoadAssetsAsync<T>()` with labels for batch loading
- Use `Addressables.InstantiateAsync()` for GameObjects (handles reference counting)
- Preload critical assets during loading screens — don't lazy-load gameplay-essential assets
- Implement a loading manager that tracks load operations and provides progress

```
// Loading Pattern (conceptual)
AsyncOperationHandle<T> handle = Addressables.LoadAssetAsync<T>(address);
handle.Completed += OnAssetLoaded;
// Store handle for later release
```

### Memory Management
- Every `LoadAssetAsync` must have a corresponding `Addressables.Release(handle)`
- Every `InstantiateAsync` must have a corresponding `Addressables.ReleaseInstance(instance)`
- Check `handle.Status` for `AsyncOperationStatus.Succeeded` before using `handle.Result`
- The object that starts a load stores its handle and releases it in its own teardown (`OnDestroy()` for a MonoBehaviour) — and only if a load was started, so an object destroyed before its load began releases nothing
- Track all active handles — leaked handles prevent bundle unloading
- Implement reference counting for shared assets across systems
- Unload assets when transitioning between scenes/levels — never accumulate
- Use `Addressables.GetDownloadSizeAsync()` to check before downloading remote content
- Profile memory with Memory Profiler — set per-platform memory budgets:
  - Mobile: < 512 MB total asset memory
  - Console: < 2 GB total asset memory
  - PC: < 4 GB total asset memory
  - These are defaults: a memory ceiling the project or the request states replaces them, and any design that would exceed it is flagged

### Asset Bundle Optimization
- Minimize bundle dependencies — circular dependencies cause full-chain loading
- Use the Bundle Layout Preview tool to inspect dependency chains
- Deduplicate shared assets — put shared textures/materials in a common group
- Compress bundles: LZ4 for local (fast decompress), LZMA for remote (small download)
- Profile bundle sizes with the Addressables Event Viewer and Analyze tool

### Content Update Workflow
- Use `Check for Content Update Restrictions` to identify changed assets
- Only changed bundles should be re-downloaded — not the entire catalog
- Version content catalogs — clients must be able to fall back to cached content
- Test update path: fresh install, update from V1 to V2, update from V1 to V3 (skip V2)
- Remote content URL structure: `[CDN]/[Platform]/[Version]/[BundleName]`
- A catalog update found mid-session can apply now or at next launch — that is the user's call, so raise it and ask rather than picking one

### Scene Management with Addressables
- Load scenes via `Addressables.LoadSceneAsync()` — not `SceneManager.LoadScene()`
- Use additive scene loading for streaming open worlds
- Unload scenes with `Addressables.UnloadSceneAsync()` — releases all scene assets
- Scene load order: load essential scenes first, stream optional content after

### Catalog and Remote Content
- Host content on CDN with proper cache headers
- Build separate catalogs per platform (textures differ, bundles differ)
- Handle download failures gracefully — retry with exponential backoff
- Show download progress to users for large content updates
- Support offline play — cache all essential content locally

## Testing and Profiling
- Test with `Use Asset Database` (fast iteration) AND `Use Existing Build` (production path)
- Profile asset load times — no single asset should take > 500ms to load
- Profile memory with Addressables Event Viewer to find leaks — confirm a suspected leak there (per-asset reference counts) or in the Memory Profiler before naming its cause
- Run Addressables Analyze tool in CI to catch dependency issues
- Test on minimum spec hardware — loading times vary dramatically by I/O speed; flag storage speed as a load-time risk to measure on the device, never quote a platform's read speed from memory

## Common Addressables Anti-Patterns
- Synchronous loading (blocks the main thread, causes hitches)
- Not releasing handles (memory leaks, bundles never unload)
- Organizing groups by asset type instead of loading context (loads everything when you need one thing)
- Circular bundle dependencies (loading one bundle triggers loading five others)
- Not testing the content update path (updates download everything instead of deltas)
- Hardcoding file paths instead of using Addressable addresses
- Loading individual assets in a loop instead of batch loading with labels
- Not preloading during loading screens (first-frame hitches in gameplay)

## Related skills

- `unity-build-pipeline`
- `unity-csharp-scripting`
- `perf-profile`

---
_Built for the merged game dev skill pack from the `unity-addressables-specialist` agent of Claude Code Game Studios (MIT, Copyright (c) 2026 Donchitos). See ATTRIBUTION.md._
