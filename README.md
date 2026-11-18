# Game dev skills, merged pack

160 Claude Code skills for making games, built by merging two open source packs:

- **Craft skills (86)** from [awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills): how to build things in an engine.
- **Studio skills (74)** from [Claude Code Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios): how to run the project like a small studio, from concept to launch, with 49 specialist agents behind them.

The two packs barely overlapped. Two skills did the same job and were merged into one (`prototype`, `perf-profile`). Ten engine areas that only the studio's agents knew about became new craft skills (Unreal replication, GAS and UMG; Unity Addressables, DOTS, UI and shaders; Godot GDExtension; netcode; accessibility). The full comparison is in `../overlap-map.md` when this pack sits in its build folder.

## What is in it

| Craft group | Skills |
|---|---|
| Godot | 17 |
| Unity | 12 |
| Unreal | 9 |
| Browser and web (Phaser, PixiJS, three.js) | 6 |
| Other engines (Roblox 8, plus Bevy, Defold, Ebitengine, LÖVE, Pygame) | 13 |
| Disciplines (game feel, camera, input, AI, audio, netcode, accessibility and more) | 16 |
| Genres | 9 |
| Shipping (Steam, itch.io, jams) | 3 |
| Router (`gamedev-router`) | 1 |

| Studio group | Skills |
|---|---|
| Getting started and navigation | 7 |
| Concept and design | 15 |
| Architecture and planning | 15 |
| Building stories | 9 |
| QA and testing | 11 |
| Release and live ops | 6 |
| Team orchestration | 9 |
| Framework upkeep | 2 |

Every skill is listed with a one-line summary in [CATALOG.md](CATALOG.md). Where each one came from is in [ATTRIBUTION.md](ATTRIBUTION.md).

## How the two layers work together

Start with `gamedev-router`. It reads your request and points Claude at the right craft skill, the right studio skill, or both. Studio skills and agents now name the craft skills they should read, so `/team-combat` now tells Claude to read `game-feel`, `unreal-gas`, `unreal-replication` and the other combat craft skills that fit the engine, and `/prototype` with no studio project falls back to a quick mode.

All skills sit flat in `.claude/skills/<name>/` because Claude Code only finds skills one folder deep. The engine grouping lives in the catalog and the plugin list, not in folders.

## Which model runs what

The studio's three directors (`creative-director`, `producer`, `technical-director`) are set to Fable, so planning, gates and reviews get the strongest reasoning. The 16 builders (`lead-programmer`, `prototyper`, `devops-engineer`, `community-manager` and the 12 engine specialists) are set to Opus, where most of the tokens go. The other 30 agents run on whatever model your session uses. Using Fable needs a recent Claude Code and an account with Fable access. Details: `.claude/docs/model-tiers.md`.

## Install

### Option 1: whole pack as a project template

Copy this folder as the start of your game project and open it in Claude Code. You get all 160 skills plus the studio's agents, hooks, rules and templates. The studio's hooks and status line run inside that project, so read `.claude/settings.json` first. The studio's own guide is [README-studio-original.md](README-studio-original.md).

### Option 2: craft skills only, as plugins

If this pack is in a GitHub repo, install only the groups you want. Replace `<owner>/<repo>` with that repo. No hooks or agents come with these. Each line works in one step on Claude Code 2.1.275 or later.

All craft skills at once:

```
/plugin install craft-all --marketplace <owner>/<repo>
```

Or one group at a time:

```
/plugin install router --marketplace <owner>/<repo>
/plugin install godot --marketplace <owner>/<repo>
/plugin install unity --marketplace <owner>/<repo>
/plugin install unreal --marketplace <owner>/<repo>
/plugin install web-engines --marketplace <owner>/<repo>
/plugin install other-engines --marketplace <owner>/<repo>
/plugin install disciplines --marketplace <owner>/<repo>
/plugin install genres --marketplace <owner>/<repo>
/plugin install shipping --marketplace <owner>/<repo>
```

The studio skills are not offered as plugins, because they depend on the studio's hooks, config helper and folder layout.

## Known gaps

- The studio's engine reference docs cover Godot, Unity and Unreal only, not browser engines.
- Neither source covers building destruction synced online, zombie horde AI and round waves, weapon attachments, or building levels from real world map data.
- The studio skill `code-review` has the same name as Claude Code's built-in code review skill. It was left as is because the studio's docs call it by that name.

## License

Mixed: Apache-2.0 for files from awesome-gamedev-agent-skills, MIT for files from Claude Code Game Studios and for the new skills. See [LICENSE](LICENSE), [NOTICE](NOTICE) and `LICENSES/`.
