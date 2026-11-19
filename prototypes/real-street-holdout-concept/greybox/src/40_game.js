// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Game state: Salvage economy, building destruction, reposition metric, capture sectors, round director.

const GAME = {
  phase: 'menu',            // menu | pre | round | intermission | dead
  round: 0, phaseT: 0, roundT: 0, time: 0, spec: roundSpec(1),
  queue: [], queueIdx: 0, spawnCd: 0,
  salvage: CFG.econ.start, salvageEarned: 0, salvageSpent: 0,
  kills: 0, meleeKills: 0, headshots: 0, shots: 0, hits: 0, meleeHits: 0, parries: 0, blocks: 0, guardBreaks: 0,
  breacherAlive: 0, breachersQueued: 0,
  destroyed: 0, destroyedBy: { breacher: 0, player: 0 }, reinforced: 0, repairs: 0, chargesThrown: 0, pings: 0,
  sector: null, lastSector: null, owner: 'horde', prog: 0, bank: 0, secState: 'HORDE-HELD', overrunT: 0, supplyUsed: false,
  sectorHeldTotal: 0, sectorHeldRound: 0, sectorsCaptured: 0, sectorsLost: 0, sectorBankPaid: 0,
  spawnsHidden: 0, spawnsVisible: 0, purchases: [], log: [],
};
function logEvent(type, data) {
  const e = Object.assign({ t: +GAME.time.toFixed(1), round: GAME.round, type }, data || {});
  GAME.log.push(e);
  if (AUTOTEST) console.log('[holdout] ' + JSON.stringify(e));
}
function addSalvage(n, why) {
  if (!n) return;
  GAME.salvage += n; GAME.salvageEarned += n;
  UI.salvagePop(n, why);
}
function spend(n) {
  if (GAME.salvage < n) return false;
  GAME.salvage -= n; GAME.salvageSpent += n;
  return true;
}

// ------------------------------------------------------------- destruction
const collapsing = [];
function damageBuilding(b, dmg, by) {
  if (b.state !== 0 || dmg <= 0) return;
  b.hp -= dmg;
  if (b.hp <= 0) destroyBuilding(b, by);
  else paintBuilding(b);
}
function destroyBuilding(b, by) {
  b.hp = 0; b.state = 1; b.collapseT = 0; b.by = by; b.dustT = 0;
  collapsing.push(b);
  GAME.destroyed++; GAME.destroyedBy[by] = (GAME.destroyedBy[by] || 0) + 1;
  paintBuilding(b);
  collapseDust(b);
  shakeAt(b.cx, b.cz, 0.75, 70);
  const d = distToBuilding(b, P.x, P.z);
  if (d <= CFG.reposition.radius && P.alive) REPO.pending.push({ t: GAME.time, x: P.x, z: P.z, name: buildingName(b), d });
  if (d <= CFG.reposition.radius) REPO.near++;
  if (d <= PADCFG.collapseRange) padRumble(RUM_COLLAPSE, 1 - (0.6 * d) / PADCFG.collapseRange);
  toast(`${buildingName(b)} collapsed (${Math.round(d)} m)`, 'bad');
  const ds = GAME.sector ? Math.hypot(b.cx - GAME.sector.x, b.cz - GAME.sector.z) : null;
  logEvent('building_destroyed', { by, building: buildingName(b), distToPlayer: +d.toFixed(1), distToSector: ds == null ? null : +ds.toFixed(1), reinforced: b.reinforced });
}
function updateCollapses(dt) {
  const rh = CFG.building.rubbleH, T = CFG.building.collapseTime;
  for (let i = collapsing.length - 1; i >= 0; i--) {
    const b = collapsing[i];
    b.collapseT += dt;
    const k = b.collapseT / T;
    if (k >= 1) {
      b.state = 2; b.h = rh;
      writeBuildingVerts(b, 0, 0, 0, true);
      paintBuilding(b);
      addRubbleChunks(b);
      navOnBuildingChanged(b);
      NAVSTATS.pendingDestruction = true;
      collapsing.splice(i, 1);
      continue;
    }
    const e = k * k, sh = (1 - k) * 0.35;
    b.h = lerp(b.H, rh, e);
    writeBuildingVerts(b, b.h, Math.sin(b.collapseT * 53) * sh + b.lean[0] * e * 1.6, Math.cos(b.collapseT * 47) * sh + b.lean[1] * e * 1.6, false);
    b.dustT -= dt;
    if (b.dustT <= 0) {
      b.dustT = 0.12;
      for (let n = 0; n < 6; n++) {
        const p = b.pts[(Math.random() * b.pts.length) | 0];
        emit(FX.dust, p[0], rand(0.3, 2), p[1], rand(-2, 2), rand(0.5, 2), rand(-2, 2), rand(2, 3), 0.6, 0.58, 0.54, 0.5, 0, 0.8);
      }
    }
  }
}

// Reinforce tool (Sapper gadget): reinforce (first use: +60% HP, yellow) or repair a damaged reinforced building
function repairInfo(b) {
  if (!b || b.state !== 0) return { action: 'destroyed', cost: 0 };
  const base = clamp(Math.round((100 + b.area * 0.3) / 10) * 10, 100, 250);
  if (!b.reinforced) return { action: 'reinforce', cost: base };
  const miss = 1 - b.hp / b.maxHp;
  if (miss < 0.01) return { action: 'full', cost: 0 };
  return { action: 'repair', cost: Math.max(50, Math.round((miss * base) / 10) * 10) };
}
function applyRepair(b) {
  const info = repairInfo(b);
  if (info.action !== 'reinforce' && info.action !== 'repair') return false;
  if (!spend(info.cost)) { toast('Not enough Salvage', 'bad'); return false; }
  if (info.action === 'reinforce') {
    b.maxHp = Math.round(b.maxHp * CFG.building.reinforceMult); b.reinforced = true; GAME.reinforced++;
    navOnBuildingChanged(b);      // Breachers now prefer weaker walls
  }
  b.hp = b.maxHp; GAME.repairs++;
  paintBuilding(b);
  toast(`${info.action === 'reinforce' ? 'Reinforced' : 'Repaired'} ${buildingName(b)}  -${info.cost}`, 'own');
  logEvent(info.action, { building: buildingName(b), cost: info.cost, distToSector: GAME.sector ? +Math.hypot(b.cx - GAME.sector.x, b.cz - GAME.sector.z).toFixed(1) : null });
  return true;
}
function patchNearbyCost(apply) {
  let cost = 0, n = 0;
  for (const b of buildingsNear(P.x, P.z, 30, [])) {
    if (b.state !== 0 || b.hp >= b.maxHp || distToBuilding(b, P.x, P.z) > 30) continue;
    const base = clamp(Math.round((100 + b.area * 0.3) / 10) * 10, 100, 250);
    cost += Math.max(30, Math.round(((1 - b.hp / b.maxHp) * base) / 10) * 10); n++;
    if (apply) { b.hp = b.maxHp; paintBuilding(b); }
  }
  return { cost, n };
}

// ------------------------------------------------------------- "repositions after destruction" metric
// counts: player moves > 25 m within 20 s after a building within 30 m of them is destroyed (one move = one count)
const REPO = { pending: [], count: 0, near: 0, expired: 0 };
function updateRepo() {
  for (let i = REPO.pending.length - 1; i >= 0; i--) {
    const e = REPO.pending[i];
    const m = Math.hypot(P.x - e.x, P.z - e.z);
    if (m > CFG.reposition.distance) {
      REPO.count++;
      logEvent('reposition_after_destruction', { moved: +m.toFixed(1), after: +(GAME.time - e.t).toFixed(1), trigger: e.name });
      REPO.pending.length = 0;
      return;
    }
    if (GAME.time - e.t > CFG.reposition.window) { REPO.pending.splice(i, 1); REPO.expired++; }
  }
}

// ------------------------------------------------------------- capture sectors
function chooseSector() {
  let best = null, bs = Infinity;
  for (const s of sectors) {
    if (s === GAME.lastSector) continue;
    const d = Math.hypot(s.x - P.x, s.z - P.z);
    const score = d + s.uses * 160 + (d > 420 ? 1000 : 0);          // keep objectives reachable within a round
    if (score < bs) { bs = score; best = s; }
  }
  return best || sectors[0] || null;
}
function updateSector(dt) {            // states per concept doc: HORDE-HELD, CAPTURING, CONTESTED, HELD, OVERRUN
  const s = GAME.sector;
  if (!s) return;
  const pin = P.alive && inSector(s, P.x, P.z);
  let zin = 0;
  for (const z of zombies) if (!z.dead && inSector(s, z.x, z.z)) zin++;
  const C = CFG.sector;
  let st;
  if (pin && zin > 0) { st = 'CONTESTED'; GAME.overrunT = 0; }
  else if (pin) {
    GAME.overrunT = 0;
    GAME.prog = Math.min(1, GAME.prog + dt / C.captureTime);
    st = GAME.owner === 'player' ? 'HELD' : 'CAPTURING';
    if (GAME.prog >= 1 && GAME.owner !== 'player') {
      GAME.owner = 'player'; GAME.sectorsCaptured++; st = 'HELD';
      toast(`Sector captured: ${s.name}`, 'own'); centerMsg('SECTOR CAPTURED', s.name);
      logEvent('sector_captured', { sector: s.name });
    }
  } else if (zin >= C.overrunCount) {
    GAME.overrunT += dt;
    st = GAME.owner === 'player' ? (GAME.overrunT > C.overrunDelay ? 'OVERRUN' : 'THREATENED') : 'HORDE-HELD';
    if (GAME.overrunT > C.overrunDelay) GAME.prog = Math.max(0, GAME.prog - dt / C.drainTime);
    if (GAME.prog <= 0 && GAME.owner === 'player') {
      GAME.owner = 'horde'; GAME.sectorsLost++;
      const pen = Math.min(GAME.salvage, C.lossPenalty);
      GAME.salvage -= pen;
      toast(`Sector LOST: ${s.name}. Hold bonus forfeited (${Math.round(GAME.bank)}), no income, -${pen} Salvage`, 'bad');
      centerMsg('SECTOR LOST', s.name);
      logEvent('sector_lost', { sector: s.name, bankLost: Math.round(GAME.bank), penalty: pen });
      GAME.bank = 0;
    }
  } else { GAME.overrunT = 0; st = GAME.owner === 'player' ? 'HELD' : 'HORDE-HELD'; }
  if (GAME.owner === 'player' && GAME.prog > 0) {
    GAME.sectorHeldTotal += dt; GAME.sectorHeldRound += dt;
    GAME.bank += C.bankPerSec * dt;
  }
  GAME.secState = st;
  GAME.zInSector = zin;
}
function renderSectors(t) {
  for (const s of sectors) {
    const active = s === GAME.sector;
    const col = !active ? [0.85, 0.8, 0.7] : GAME.owner === 'player' ? [1, 0.7, 0.28] : GAME.prog > 0 ? [0.95, 0.95, 0.95] : [0.55, 0.62, 0.42];
    s.ring.material.color.copy(srgb(...col));
    s.ring.material.opacity = active ? 0.75 : 0.18;
    s.fill.material.color.copy(srgb(...col));
    s.fill.material.opacity = active ? 0.06 + 0.12 * GAME.prog : 0;
    s.beam.material.color.copy(srgb(...col));
    s.beam.material.opacity = active ? 0.22 + 0.06 * Math.sin(t * 3) : 0;
  }
}

// ------------------------------------------------------------- round director
function startGame() {
  GAME.phase = 'pre';
  GAME.phaseT = CFG.round.firstDelay;
  applyLighting(1);
  GAME.sector = chooseSector();
  GAME.preview = true;
  centerMsg('GET READY', `Round 1 in ${CFG.round.firstDelay} s. Objective: ${GAME.sector ? GAME.sector.name : '-'}`);
  logEvent('session_start', { map: LEVEL.name, autotest: AUTOTEST });
}
function startRound() {
  GAME.round++;
  const n = GAME.round, spec = (GAME.spec = roundSpec(n));
  const q = [];
  const nB = spec.breachers, nR = Math.round((spec.total - nB) * spec.runnerShare), nS = spec.total - nB - nR;
  for (let i = 0; i < nS; i++) q.push(0);
  for (let i = 0; i < nR; i++) q.push(1);
  for (let i = q.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [q[i], q[j]] = [q[j], q[i]]; }
  for (let k = 0; k < nB; k++) q.splice(Math.floor(q.length * (0.25 + (0.45 * k) / Math.max(1, nB))), 0, 2);
  GAME.queue = q; GAME.queueIdx = 0; GAME.spawnCd = 1.0; GAME.roundT = 0;
  GAME.phase = 'round';
  if (!GAME.sector || !GAME.preview) GAME.sector = chooseSector();
  GAME.preview = false;
  if (GAME.sector) GAME.sector.uses++;
  GAME.owner = 'horde'; GAME.prog = 0; GAME.bank = 0; GAME.sectorHeldRound = 0; GAME.overrunT = 0; GAME.supplyUsed = false;
  NAV.dirtyS = true;
  applyLighting(n);
  UI.closeBuy(true);
  centerMsg(`ROUND ${n}`, GAME.sector ? `Capture and hold: ${GAME.sector.name}` : '');
  logEvent('round_start', { sector: GAME.sector ? GAME.sector.name : null, total: spec.total, breachers: nB });
}
function aliveCount() { let n = 0; for (const z of zombies) if (!z.dead) n++; return n; }
function updateRounds(dt) {
  if (GAME.phase === 'pre') {
    GAME.phaseT -= dt;
    if (GAME.phaseT <= 0) startRound();
  } else if (GAME.phase === 'round') {
    GAME.roundT += dt;
    GAME.spawnCd -= dt;
    let qB = 0;
    for (let i = GAME.queueIdx; i < GAME.queue.length; i++) if (GAME.queue[i] === 2) qB++;
    GAME.breachersQueued = qB;
    if (GAME.queueIdx < GAME.queue.length && GAME.spawnCd <= 0 && aliveCount() < GAME.spec.activeCap) {
      spawnZombie(GAME.queue[GAME.queueIdx++]);
      GAME.spawnCd = GAME.spec.interval;
    }
    updateSector(dt);
    if (GAME.queueIdx >= GAME.queue.length && aliveCount() === 0) roundClear();
  } else if (GAME.phase === 'intermission') {
    GAME.phaseT -= dt;
    if (GAME.phaseT <= 0) startRound();
  }
}
function roundClear() {
  const n = GAME.round;
  addSalvage(CFG.econ.roundBonus * n, 'round clear');
  let paid = 0;
  if (GAME.owner === 'player') { paid = Math.round(GAME.bank) + CFG.sector.heldIncome; addSalvage(paid, 'sector income + hold bonus'); GAME.sectorBankPaid += paid; }
  logEvent('round_clear', { roundTime: +GAME.roundT.toFixed(1), sector: GAME.sector ? GAME.sector.name : null, sectorHeldS: +GAME.sectorHeldRound.toFixed(1), bankPaid: paid, owner: GAME.owner });
  centerMsg(`ROUND ${n} CLEARED`, paid ? `Held sector pays: +${paid} Salvage` : 'Sector not held: no income');
  GAME.lastSector = GAME.sector;
  GAME.sector = chooseSector(); GAME.preview = true;          // next objective is shown during intermission
  GAME.owner = 'horde'; GAME.prog = 0; GAME.bank = 0;
  GAME.phase = 'intermission';
  GAME.phaseT = CFG.round.intermission;
  UI.openBuy();
}
function playerDied() {
  if (GAME.phase === 'dead') return;
  GAME.phase = 'dead';
  logEvent('player_dead', { kills: GAME.kills });
  centerMsg('OVERRUN', '');
  setTimeout(() => UI.showSummary(), AUTOTEST ? 300 : 1500);
}
