---
name: netcode-fundamentals
description: "Design engine-neutral multiplayer netcode: client-server versus peer-to-peer, server authority, state replication strategy per data type, client prediction with reconciliation, entity interpolation, lag compensation, bandwidth budgets, versioned messages, reconnection and matchmaking boundaries. Use when planning or debugging any online multiplayer game before choosing engine APIs, or when the user mentions netcode, lag, rollback, tick rate, prediction or desync."
---

# Netcode Fundamentals

Decide how a multiplayer game stays responsive and fair under real latency, then bind the plan to the engine's networking skill.

## When to use

- Choosing a network model and tick rate for a new multiplayer game.
- Planning prediction, reconciliation and interpolation numbers.
- Debugging lag, rubber-banding or desync before touching engine code.

**When not to use:** Engine API details: use `unreal-replication`, `godot-multiplayer` or `roblox-networking`.

## Workflow

1. Inspect the project first: engine version, existing classes, and how the feature is wired today.
2. Read the standards below that apply to the task, and the design document if one exists (`design/gdd/` in a studio project).
3. Propose the structure (classes, data flow, files) and the trade-offs before writing code.
4. Implement in small steps and verify each one in the engine or with tests.
5. Flag anything below that the current code violates, ranked by risk.


## Key Responsibilities

1. **Network Architecture**: Implement the networking model (client-server,
   peer-to-peer, or hybrid) as defined by the technical director. Design the
   packet protocol, serialization format, and connection lifecycle.
2. **State Replication**: Implement state synchronization with appropriate
   strategies per data type -- reliable/unreliable, frequency, interpolation,
   prediction.
3. **Lag Compensation**: Implement client-side prediction, server
   reconciliation, and entity interpolation. The game must feel responsive
   at up to 150ms latency, unless the project states its own latency target
   — then design to that figure and say which one you used.
4. **Bandwidth Management**: Profile and optimize network traffic. Implement
   relevancy systems, delta compression, and priority-based sending.
5. **Security**: Implement server-authoritative validation for all
   gameplay-critical state. Never trust the client for consequential data.
6. **Matchmaking and Lobbies**: Implement matchmaking logic, lobby management,
   and session lifecycle.

## Networking Principles

- Server is authoritative for all gameplay state
- Client predicts locally, reconciles with server — re-applying its unacknowledged inputs on top of each server correction
- All network messages must be versioned for forward compatibility
- Network code must handle disconnection, reconnection, and migration gracefully
- Log all network anomalies for debugging (but rate-limit the logs)
- Give every sync parameter a number sized to the latency and bandwidth targets — update rate, interpolation buffer, reconciliation threshold, correction speed, input delay — and keep it in config, not code
- A sync design names its snapshot format, per-player bandwidth in bytes per second, and priority tiers alongside those numbers
- Match the netcode model to the genre's latency tolerance — rollback for fighting games and other frame-exact input over a deterministic simulation, interpolated server snapshots for most others — and where security-engineer wants strict validation, propose a concrete compromise (a tolerance band on client-reported values, say)

## Related skills

- `unreal-replication`
- `godot-multiplayer`
- `roblox-networking`
- `security-audit`
- `prototype`

---
_Built for the merged game dev skill pack from the `network-programmer` agent of Claude Code Game Studios (MIT, Copyright (c) 2026 Donchitos). See ATTRIBUTION.md._
