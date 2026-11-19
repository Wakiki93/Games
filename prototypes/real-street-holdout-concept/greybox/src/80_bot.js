// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// ?autotest=1 : scripted bot that drives the same INPUT as the keyboard, exercises every system, takes screenshots
// via a console handshake (HOLDOUT_SHOT name -> harness sets window.__holdoutShotAck = name), and writes
// window.__holdoutTest when done.

const BOT = {
  t: 0, wall0: performance.now(), targetRound: parseInt(QS.get('rounds') || '5', 10), surrender: false,
  shots: {}, shotPending: null, finishAfterShot: false, tgt: null, tgtT: 0, burst: 0, pingCd: 4, repo: null,
  chargeB: null, chargeDone: false, chargeTries: 0, inter: null, stuckT: 0, lastX: 0, lastZ: 0, strafe: 0, strafeT: 0,
  gameplayT: -1,
};
function wallElapsed() { return (performance.now() - BOT.wall0) / 1000; }
function requestShot(name) {
  if (BOT.shots[name] || BOT.shotPending) return false;
  BOT.shots[name] = true; BOT.shotPending = name;
  console.log('HOLDOUT_SHOT ' + name);
  return true;
}
function shotGate() {           // returns true while the sim must wait for the harness
  if (!BOT.shotPending) return false;
  if (window.__holdoutShotAck === BOT.shotPending) {
    BOT.shotPending = null;
    if (BOT.finishAfterShot) finishTest('fail_state_reached');
    return false;
  }
  if (!window.__holdoutHarness && wallElapsed() > 2) BOT.shotPending = null;   // opened without the harness: don't wait
  return true;
}

function botAimAt(x, y, z, dt, rate) {
  const dx = x - P.x, dy = y - P.y, dz = z - P.z, h = Math.hypot(dx, dz) || 1e-3;
  const wantYaw = Math.atan2(-dx, -dz), wantPitch = Math.atan2(dy, h) - P.recoilP;
  const dyaw = ((wantYaw - P.yaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI, dp = wantPitch - P.pitch;
  const m = (rate || 6) * dt;
  P.yaw += clamp(dyaw, -m, m); P.pitch = clamp(P.pitch + clamp(dp, -m, m), -1.5, 1.5);
  return Math.hypot(dyaw - clamp(dyaw, -m, m), dp - clamp(dp, -m, m));     // remaining error (rad)
}
function botMoveDir(dx, dz, sprint) {
  const l = Math.hypot(dx, dz);
  if (l < 1e-4) return;
  dx /= l; dz /= l;
  const fx = -Math.sin(P.yaw), fz = -Math.cos(P.yaw), rx = Math.cos(P.yaw), rz = -Math.sin(P.yaw);
  INPUT.fwd = clamp((dx * fx + dz * fz) * 1.5, -1, 1); INPUT.right = clamp((dx * rx + dz * rz) * 1.5, -1, 1);
  INPUT.sprint = !!sprint && INPUT.fwd > 0.5;
}
function botFollow(field, sprint) {
  if (!flowStep(field, P.x, P.z, FLOW)) return false;
  botMoveDir(FLOW.x, FLOW.z, sprint);
  return true;
}
function botTarget() {
  let best = null, bs = Infinity;
  for (const z of zombies) {
    if (z.dead) continue;
    const d = Math.hypot(z.x - P.x, z.z - P.z);
    if (d > 110) continue;
    const s = d - (z.type === 2 ? 12 : 0) - (z.state === 'windup' ? 6 : 0);
    if (s >= bs || !losClear(P.x, P.y, P.z, z.x, 1.2 * z.sc, z.z)) continue;
    best = z; bs = s;
  }
  return best;
}
function visibleInFront(maxD) {
  let n = 0;
  const fx = -Math.sin(P.yaw), fz = -Math.cos(P.yaw);
  for (const z of zombies) {
    if (z.dead) continue;
    const dx = z.x - P.x, dz = z.z - P.z, d = Math.hypot(dx, dz);
    if (d < maxD && (dx * fx + dz * fz) / d > Math.cos(32 * DEG) && losClear(P.x, P.y, P.z, z.x, 1.2, z.z)) n++;
  }
  return n;
}

function botShoot(z, dt) {
  const d = Math.hypot(z.x - P.x, z.z - P.z);
  const W = wstats(), tof = d / W.vel;
  const head = d < 12 && z.type !== 2;
  const ax = z.x + z.vx * tof, az = z.z + z.vz * tof, ay = (head ? 1.62 : 1.3) * z.sc + 0.5 * 9.81 * tof * tof;
  botAimAt(ax, ay, az, dt, 7);
  const dx = ax - P.x, dy = ay - P.y, dz = az - P.z, l = Math.hypot(dx, dy, dz);
  aimDir(_ad);
  const err = Math.acos(clamp((_ad.x * dx + _ad.y * dy + _ad.z * dz) / l, -1, 1));
  INPUT.ads = d > 25;
  BOT.burst += dt;
  if (BOT.burst > (d < 20 ? 0.5 : d < 45 ? 0.3 : 0.12)) BOT.burst = -0.22;
  INPUT.fire = d < 75 && BOT.burst > 0 && err < Math.max(0.7 * DEG, Math.atan(0.25 / d)) && !P.reloading && P.ads > (d > 10 ? 0.8 : 0);
  return err;
}

function botMelee(dt, hunt) {
  if (P.weapon !== 'bat') INPUT.once.add('w2');
  let th = null, td = Infinity;
  for (const z of zombies) { if (z.dead) continue; const d = Math.hypot(z.x - P.x, z.z - P.z); if (d < td) { td = d; th = z; } }
  if (!th) return;
  botAimAt(th.x, 1.3 * th.sc, th.z, dt, 9);
  if (hunt && td > 2.3 && th.state !== 'windup') { if (!flowStepToward(th)) botMoveDir(th.x - P.x, th.z - P.z, false); }
  if (td > 6) return;
  if (th.state === 'windup') {
    if (th.t <= 0.12) { if (!P.blocking) INPUT.once.add('blockPress'); INPUT.block = true; }
    return;
  }
  if (P.blocking && th.state !== 'windup') INPUT.block = false;
  if ((th.crit > 0 || GAME.parries >= 2) && td < 2.6 && P.swingCd <= 0) INPUT.once.add('swing');
  let close = 0;
  for (const z of zombies) if (!z.dead && Math.hypot(z.x - P.x, z.z - P.z) < 3) close++;
  if (close >= 3) botMoveDir(P.x - th.x, P.z - th.z, false);
}

function flowStepToward(z) {         // walk toward a zombie using its own field reversed: just go direct when visible
  if (losClear(P.x, P.y, P.z, z.x, 1.2, z.z)) { botMoveDir(z.x - P.x, z.z - P.z, false); return true; }
  return false;
}
function botSolveThrow(b, tx, tz) {        // pick a pitch whose first impact (same physics as the game) is building b
  const C = CFG.charge, yaw = Math.atan2(-(tx - P.x), -(tz - P.z));
  let best = null;
  for (let p = -0.2; p <= 0.8; p += 0.02) {
    const dx = -Math.sin(yaw) * Math.cos(p), dy = Math.sin(p), dz = -Math.cos(yaw) * Math.cos(p);
    let x = P.x + dx * 0.6, y = P.y - 0.15, z = P.z + dz * 0.6, vx = dx * C.speed, vy = dy * C.speed + C.up, vz = dz * C.speed;
    for (let i = 0; i < 180; i++) {
      vy -= 9.81 / 60;
      const sx = vx / 60, sy = vy / 60, sz = vz / 60, len = Math.hypot(sx, sy, sz);
      const t = rayBuildings(x, y, z, sx / len, sy / len, sz / len, len, true);
      if (t < Infinity) { if (RH.b === b && !RH.roof) { const hy = y + (sy / len) * t; if (!best || Math.abs(hy - 1.5) < Math.abs(best.y - 1.5)) best = { p, y: hy }; } break; }
      x += sx; y += sy; z += sz;
      if (y < 0.1) break;
    }
  }
  return best ? { yaw, pitch: best.p } : null;
}
function botChargeTest(dt) {
  const B = BOT;
  if (!B.chargeB) {
    let best = null, bh = Infinity;
    for (const b of buildingsNear(P.x, P.z, 45, [])) {
      if (b.state !== 0 || b.reinforced || b.maxHp >= bh) continue;
      const d = distToBuilding(b, P.x, P.z);
      if (d < 10 || d > 40) continue;
      closestOnPoly(b.pts, P.x, P.z, CP);
      if (!(rayBuildings(P.x, P.y, P.z, (CP.x - P.x) / d, 0, (CP.z - P.z) / d, d + 1, true) < Infinity && RH.b === b)) continue;
      if (!botSolveThrow(b, CP.x, CP.z)) continue;
      best = b; bh = b.maxHp;
    }
    if (!best) { if (++B.chargeTries > 600) B.chargeDone = true; return false; }
    B.chargeB = best;
    logEvent('bot_charge_target', { building: buildingName(best), hp: best.maxHp });
  }
  const b = B.chargeB;
  if (b.state === 1) {
    botAimAt(b.cx, b.H * 0.5, b.cz, dt, 6);
    if (b.collapseT > 0.35 && !B.shots.collapse) requestShot('collapse');
    return true;
  }
  if (b.state === 2) { B.chargeDone = true; return false; }
  closestOnPoly(b.pts, P.x, P.z, CP);
  const sol = botSolveThrow(b, CP.x, CP.z);
  if (!sol) { B.chargeB = null; return false; }
  const dyaw = ((sol.yaw - P.yaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI, m = 6 * dt;
  P.yaw += clamp(dyaw, -m, m); P.pitch += clamp(sol.pitch - P.pitch, -m, m);
  if (P.weapon !== 'rifle') INPUT.once.add('w1');
  const ready = Math.abs(dyaw) < 0.02 && Math.abs(sol.pitch - P.pitch) < 0.02;
  if (ready && charges.length === 0 && P.charges > 0 && P.throwCd <= 0) INPUT.once.add('charge');
  if (charges.length === 0 && P.charges === 0) { B.chargeDone = true; logEvent('bot_charge_out', { building: buildingName(b), hp: Math.round(b.hp) }); }
  const th = BOT.tgt;                               // don't stand still with a zombie on top of us
  if (th && Math.hypot(th.x - P.x, th.z - P.z) < 6) return false;
  return true;
}

function botPlanReposition() {
  // walk to an open street cell 32-50 m away, preferring the side away from the most zombies
  let ax = 0, az = 0;
  for (const z of zombies) if (!z.dead) { const dx = z.x - P.x, dz = z.z - P.z, d = Math.hypot(dx, dz) || 1; ax += dx / d; az += dz / d; }
  let best = -1, bs = -Infinity;
  for (let i = 0; i < 400; i++) {
    const c = NAV.roadCells[(Math.random() * NAV.roadCells.length) | 0];
    const dx = cellX(c) - P.x, dz = cellZ(c) - P.z, d = Math.hypot(dx, dz);
    if (d < 32 || d > 50 || !(NAV.field.pN[c] < 90)) continue;
    const s = -(dx * ax + dz * az) / d + Math.random() * 0.3;
    if (s > bs) { bs = s; best = c; }
  }
  if (best < 0) return false;
  dijkstra(NAV.field.tmp, [best], NAV.costN, 200);
  BOT.repo = { c: best, until: GAME.time + 14 };
  logEvent('bot_reposition_plan', { dist: +Math.hypot(cellX(best) - P.x, cellZ(best) - P.z).toFixed(1) });
  return true;
}

function botIntermission(dt) {
  const B = BOT;
  if (!B.inter) { B.inter = { t: 0, bought: false, repairB: null, repairDone: false }; B.chargeDone = false; B.chargeB = null; B.chargeTries = 0; }
  const I = B.inter;
  I.t += dt;
  if (!I.bought) {
    const wants = GAME.round === 1 ? ['reddot', 'charge', 'longbarrel'] : GAME.round === 2 ? ['comp', 'charge', 'ammo'] : ['ammo', 'charge', 'patch', 'supp'];
    if (P.reserve < 120) wants.unshift('ammo');
    for (const id of wants) { const it = SHOP.find((s) => s.id === id); if (it && itemCost(it) <= GAME.salvage) buyItem(it); }
    I.bought = true;
    renderShop();
    requestShot('buy');
    return;
  }
  if (UI.buyOpen && I.t > 0.6) UI.closeBuy();
  if (!I.repairDone) {
    if (!I.repairB) {
      let best = null, bd = Infinity;
      const ref = GAME.sector || P;
      for (const b of buildingsNear(P.x, P.z, 45, [])) {
        if (b.state !== 0 || b.reinforced) continue;
        const d = distToBuilding(b, P.x, P.z) + 0.5 * Math.hypot(b.cx - ref.x, b.cz - ref.z);
        if (d < bd) { bd = d; best = b; }
      }
      I.repairB = best;
      if (!best) I.repairDone = true;
    }
    const b = I.repairB;
    if (!b || b.state !== 0 || b.reinforced || GAME.salvage < repairInfo(b).cost || I.t > 14) { I.repairDone = true; return; }
    closestOnPoly(b.pts, P.x, P.z, CP);
    const d = Math.hypot(CP.x - P.x, CP.z - P.z);
    botAimAt(CP.x, 1.4, CP.z, dt, 6);
    if (d > 3.2) botMoveDir(CP.x - P.x, CP.z - P.z, false);
    else if (P.aimB === b) INPUT.repair = true;
    else botMoveDir(CP.x - P.x, CP.z - P.z, false);
    return;
  }
  const s = GAME.sector;
  if (s && !inSector(s, P.x, P.z)) {
    botFollow(NAV.field.sN, true);
    botAimAt(s.x, 1.6, s.z, dt, 4);
  }
  if (I.t > 4 && (!s || inSector(s, P.x, P.z) || I.t > 9)) readyUp();
}

function botStep(dt) {
  const B = BOT;
  B.t += dt; B.pingCd -= dt; B.tgtT -= dt;
  INPUT.fwd = INPUT.right = 0; INPUT.fire = INPUT.ads = INPUT.block = INPUT.repair = INPUT.sprint = false;
  if (GAME.phase === 'dead' || !P.alive) {
    if (UI.summaryShown && !B.shots.summary) { if (requestShot('summary')) B.finishAfterShot = true; }
    return;
  }
  if (!B.surrender && ((GAME.round >= B.targetRound && GAME.phase === 'round' && GAME.roundT > 20) || GAME.time > 1100 || wallElapsed() > 330)) {
    B.surrender = true;
    logEvent('bot_surrender', { round: GAME.round });
  }
  if (B.tgtT <= 0) { B.tgt = botTarget(); B.tgtT = 0.1; }
  if (B.surrender) {                                  // stop fighting: let the horde reach the fail state
    if (P.weapon !== 'bat') INPUT.once.add('w2');
    if (B.tgt) botAimAt(B.tgt.x, 1.2, B.tgt.z, dt, 3);
    if (GAME.phase !== 'round') readyUp();
    return;
  }
  if (GAME.phase === 'pre') {
    if (!UI.debugOn) UI.toggleDebug();
    if (GAME.sector && !inSector(GAME.sector, P.x, P.z)) { botFollow(NAV.field.sN, true); botAimAt(GAME.sector.x, 1.6, GAME.sector.z, dt, 4); }
    return;
  }
  if (GAME.phase === 'intermission') { botIntermission(dt); return; }
  B.inter = null;
  // ---- round
  if (!B.shots.collapse) {                           // watch a nearby collapse long enough for the screenshot
    for (const b of collapsing) {
      if (Math.hypot(b.cx - P.x, b.cz - P.z) > 70) continue;
      botAimAt(b.cx, b.H * 0.45, b.cz, dt, 8);
      aimDir(_ad);
      const dx = b.cx - P.x, dz = b.cz - P.z, l = Math.hypot(dx, dz) || 1;
      if (UI.debugOn) UI.toggleDebug();
      if (b.collapseT > 0.3 && (_ad.x * dx + _ad.z * dz) / l > 0.93 && requestShot('collapse')) B.debugBack = true;
      return;
    }
  }
  if (B.debugBack && !B.shotPending && B.shots.gameplay) { B.debugBack = false; }
  if (GAME.round === 1 && (GAME.parries < 2 || GAME.meleeKills < 2) && GAME.roundT < 75 && P.hp > 35) { botMelee(dt); return; }
  if (P.ammo === 0 && P.reserve === 0) { botMelee(dt, true); return; }
  if (P.weapon !== 'rifle') INPUT.once.add('w1');
  if (GAME.round >= 2 && GAME.roundT > 3 && !B.chargeDone && (P.charges > 0 || charges.length || (B.chargeB && B.chargeB.state === 1))) {
    if (botChargeTest(dt)) return;
  }
  // movement priority: reposition after a nearby collapse > retreat when hurt > go to / hold the sector
  const th = B.tgt;
  const close = th ? Math.hypot(th.x - P.x, th.z - P.z) : Infinity;
  if (!B.repo && REPO.pending.length) botPlanReposition();
  let moving = false;
  if (B.repo) {
    if (GAME.time > B.repo.until || Math.hypot(cellX(B.repo.c) - P.x, cellZ(B.repo.c) - P.z) < 3 || !botFollow(NAV.field.tmp, true)) B.repo = null;
    else moving = true;
  }
  if (!moving && th && close < 4 && P.hp < 70) { botMoveDir(P.x - th.x, P.z - th.z, false); moving = true; }
  const s = GAME.sector;
  if (!moving && s && Math.hypot(s.x - P.x, s.z - P.z) > s.r * 0.55) moving = botFollow(NAV.field.sN, !th || close > 25);
  if (!moving && s) {
    B.strafeT -= dt;
    if (B.strafeT <= 0) { B.strafeT = rand(1, 2.5); B.strafe = Math.random() < 0.5 ? -1 : 1; }
    INPUT.right = B.strafe * 0.6;
  }
  // stuck: sidestep
  if (Math.abs(INPUT.fwd) + Math.abs(INPUT.right) > 0.3) {
    const m = Math.hypot(P.x - B.lastX, P.z - B.lastZ);
    B.stuckT = m < 0.02 ? B.stuckT + dt : Math.max(0, B.stuckT - dt);
    if (B.stuckT > 1.2) { INPUT.right = B.strafe || 1; INPUT.fwd = -0.5; if (B.stuckT > 2.2) B.stuckT = 0; }
  }
  B.lastX = P.x; B.lastZ = P.z;
  // shooting / melee when something is on top of us
  if (th) {
    if (close < 2.4 && P.stamina > 30 && P.swingCd <= 0 && th.state !== 'windup') INPUT.once.add('swing');
    else botShoot(th, dt);
    if (B.pingCd <= 0 && GAME.pings < 6 && close > 15) { INPUT.once.add('ping'); B.pingCd = 7; }
  } else {
    if (s) botAimAt(s.x, 1.6, s.z, dt, 3);
    if (P.ammo < wstats().mag * 0.5 && P.reserve > 0 && !P.reloading) INPUT.once.add('reload');
    if (B.pingCd <= 0 && GAME.pings < 6) {                     // ping a building now and then
      aimDir(_ad);
      if (rayBuildings(P.x, P.y, P.z, _ad.x, _ad.y, _ad.z, 200, true) < Infinity) { INPUT.once.add('ping'); B.pingCd = 9; }
    }
  }
  // screenshots: gameplay (debug off) then debug panel
  if (!B.shots.gameplay && GAME.round >= 2 && P.weapon === 'rifle' && th && P.ads < 0.2 && close < 30 && visibleInFront(40) >= (GAME.round >= 4 ? 1 : 2)) {
    if (UI.debugOn) UI.toggleDebug();
    else if (requestShot('gameplay')) B.gameplayT = GAME.time;
  }
  if (B.shots.gameplay && !B.shotPending && !UI.debugOn && GAME.time - B.gameplayT > 0.5) UI.toggleDebug();
  if (B.shots.gameplay && !B.shots.debug && UI.debugOn && GAME.time - B.gameplayT > 5 && UI.dbgT < 0.2) requestShot('debug');
}

function finishTest(reason) {
  if (window.__holdoutTest) return;
  const fs = FPS.samples.slice(3);
  const avg = fs.length ? fs.reduce((a, b) => a + b, 0) / fs.length : FPS.value;
  const ad = NAVSTATS.afterDestruction;
  window.__holdoutTest = {
    ok: ERRORS.length === 0 && GAME.phase === 'dead' && !!UI.summaryShown,
    reason, map: LEVEL.name, wavesReached: GAME.round, kills: GAME.kills, meleeKills: GAME.meleeKills, headshots: GAME.headshots,
    accuracy: GAME.shots ? +(GAME.hits / GAME.shots).toFixed(3) : 0, shotsFired: GAME.shots,
    buildingsDestroyed: { total: GAME.destroyed, byBreacher: GAME.destroyedBy.breacher || 0, byPlayer: GAME.destroyedBy.player || 0 },
    buildingsReinforced: GAME.reinforced, repairs: GAME.repairs,
    flowField: { rebuilds: NAVSTATS.rebuilds, fieldJobs: NAVSTATS.jobs, avgJobMs: +(NAVSTATS.totalMs / Math.max(1, NAVSTATS.jobs)).toFixed(2), maxJobMs: +NAVSTATS.maxMs.toFixed(2),
      afterDestructionMs: ad.slice(0, 12), avgAfterDestructionMs: ad.length ? +(ad.reduce((a, b) => a + b, 0) / ad.length).toFixed(2) : null,
      afterDestructionFrames: NAVSTATS.afterDestructionFrames.slice(0, 12), maxNavMsPerFrame: +NAVSTATS.maxFrameMs.toFixed(2), budgetMsPerFrame: NAV_BUDGET_MS, gridCells: NAV.N },
    cpu: { simMsPer60HzStep: +(CPU.sim / Math.max(1, CPU.steps)).toFixed(3), navMsPerFrame: +(CPU.nav / Math.max(1, CPU.frames)).toFixed(2), hudMsPerFrame: +(CPU.hud / Math.max(1, CPU.frames)).toFixed(2), renderCallMsPerFrame: +(CPU.render / Math.max(1, CPU.frames)).toFixed(2), note: 'JS time measured in headless Chromium; render call time includes software rasterisation' },
    fps: { avg: +avg.toFixed(1), min: +(fs.length ? Math.min(...fs) : FPS.value).toFixed(1), note: 'headless software-GL fps; not a performance measurement' },
    melee: { hits: GAME.meleeHits, kills: GAME.meleeKills, parries: GAME.parries, blocks: GAME.blocks, guardBreaks: GAME.guardBreaks },
    chargesThrown: GAME.chargesThrown, pingsUsed: GAME.pings,
    sector: { heldTimeS: +GAME.sectorHeldTotal.toFixed(1), captured: GAME.sectorsCaptured, lost: GAME.sectorsLost, bankPaid: GAME.sectorBankPaid },
    repositionsAfterDestruction: REPO.count, collapsesWithin30m: REPO.near,
    spawns: { hidden: GAME.spawnsHidden, visible: GAME.spawnsVisible },
    salvage: { earned: GAME.salvageEarned, spent: GAME.salvageSpent }, purchases: GAME.purchases,
    failStateReached: GAME.phase === 'dead', summaryShown: !!UI.summaryShown,
    gameTimeS: +GAME.time.toFixed(1), wallTimeS: +wallElapsed().toFixed(1), simSpeed: SIM_SPEED, screenshots: Object.keys(BOT.shots),
    errors: ERRORS.slice(0, 20),
  };
  console.log('HOLDOUT_TEST_RESULT ' + JSON.stringify(window.__holdoutTest));
}
