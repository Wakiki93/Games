// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Player: movement + stamina, projectile rifle (ballistics) with trade-off attachments (optic/muzzle/barrel), melee,
// thrown breach charges + Reinforce tool (the Sapper role's gadgets; hold F), ping/spot (Q), viewmodel.

const P = {
  x: 0, z: 0, y: CFG.player.eye, vx: 0, vz: 0, yaw: 0, pitch: 0, ground: 0, bob: 0,
  hp: CFG.player.hp, alive: true, lastHurt: -99, stamina: CFG.stamina.max, staminaUsedT: -99, exhausted: false,
  weapon: 'rifle', ammo: CFG.rifle.mag, reserve: CFG.rifle.reserve, reloading: false, reloadT: 0, fireCd: 0,
  bloom: 0, recoilP: 0, recoilY: 0, ads: 0, charges: 2, throwCd: 0,           // Sapper kit: 2 breach charges
  att: { optic: null, muzzle: null, barrel: null },
  blocking: false, blockPressT: -99, guardBrokenUntil: -99, swingT: -1, swingCd: 0, swingHit: false,
  repairT: 0, repairLatch: false, aimB: null, sprinting: false, kick: 0,
};
(function safeSpawn() {               // spawn at the map centre (0,0); nudge out of any footprint
  collideCircle(P, CFG.player.r);
  if (NAV.costN[cellOf(P.x, P.z)] === Infinity) {
    for (let r = 2; r < 60; r += 2) {
      let ok = false;
      for (let a = 0; a < 6.28 && !ok; a += 0.4) { const x = Math.cos(a) * r, z = Math.sin(a) * r; if (NAV.costN[cellOf(x, z)] !== Infinity) { P.x = x; P.z = z; ok = true; } }
      if (ok) break;
    }
  }
})();

// ------------------------------------------------------------- input
const KEYS = {};
const INPUT = { fwd: 0, right: 0, moveScale: 1, sprint: false, fire: false, ads: false, block: false, repair: false, once: new Set() };
const MOUSE = { l: false, r: false };
function lockedOrBot() { return AUTOTEST || UI.freeLook || document.pointerLockElement === canvas; }
// free-look = fallback when the page cannot capture the mouse (some embedded viewers): look with plain mouse movement / arrow keys
function freeLookBusy() { return UI.buyOpen || GAME.paused || GAME.phase === 'menu' || GAME.phase === 'dead'; }
addEventListener('keydown', (e) => {
  if (e.code === 'F3') { e.preventDefault(); UI.toggleDebug(); return; }
  if (e.code === 'KeyL' && !e.repeat && !AUTOTEST) { setFreeLook(!UI.freeLook); return; }
  if (e.code.startsWith('Arrow')) e.preventDefault();
  if (e.code === 'Tab' || e.code === 'Space') e.preventDefault();
  if (e.repeat) return;
  KEYS[e.code] = true;
  const map = { KeyR: 'reload', KeyV: 'swing', KeyG: 'charge', KeyQ: 'ping', Digit1: 'w1', Digit2: 'w2', KeyB: 'buy', KeyM: 'map', KeyC: 'blockPress' };
  if (map[e.code]) INPUT.once.add(map[e.code]);
  UI.onKey(e);
});
addEventListener('keyup', (e) => { KEYS[e.code] = false; });
addEventListener('mousedown', (e) => {
  if (!lockedOrBot()) return;
  if (UI.freeLook && !AUTOTEST && (e.target !== canvas || freeLookBusy())) return;
  if (e.button === 0) MOUSE.l = true;
  if (e.button === 2) { MOUSE.r = true; if (P.weapon === 'bat') INPUT.once.add('blockPress'); }
});
addEventListener('mouseup', (e) => { if (e.button === 0) MOUSE.l = false; if (e.button === 2) MOUSE.r = false; });
addEventListener('contextmenu', (e) => e.preventDefault());
addEventListener('wheel', (e) => { if (lockedOrBot()) INPUT.once.add('wswap'); });
addEventListener('mousemove', (e) => {
  if (!P.alive) return;
  if (document.pointerLockElement !== canvas && !(UI.freeLook && !freeLookBusy())) return;
  const zoom = BASE_FOV / camera.fov;
  const s = 0.0022 / zoom;
  P.yaw -= e.movementX * s;
  P.pitch = clamp(P.pitch - e.movementY * s, -1.5, 1.5);
});
function readHumanInput() {
  INPUT.fwd = (KEYS.KeyW ? 1 : 0) - (KEYS.KeyS ? 1 : 0);
  INPUT.right = (KEYS.KeyD ? 1 : 0) - (KEYS.KeyA ? 1 : 0);
  INPUT.moveScale = 1;
  INPUT.sprint = !!(KEYS.ShiftLeft || KEYS.ShiftRight);
  INPUT.block = !!KEYS.KeyC || (P.weapon === 'bat' && MOUSE.r);
  INPUT.ads = P.weapon === 'rifle' && MOUSE.r;
  INPUT.fire = MOUSE.l;
  INPUT.repair = !!KEYS.KeyF;
  padMergeInput();                     // controller: analog move, triggers, held buttons (65_gamepad.js)
}

// ------------------------------------------------------------- weapon stats from attachments
function wstats() {
  const R = CFG.rifle, a = P.att;
  const o = CFG.optics[a.optic || 'none'];
  let recV = 1, recH = 1, vel = R.velocity, flash = 1, fall = 1, ads = 1, reload = 1;
  if (a.muzzle === 'comp') { recV *= 0.55; recH *= 1.15; flash = 1.6; }
  if (a.muzzle === 'supp') { recV *= 0.8; recH *= 0.8; vel *= 0.85; flash = 0; fall = 0.8; ads *= 1.1; }
  if (a.barrel === 'longbarrel') { vel *= 1.17; recV *= 0.85; recH *= 0.85; ads *= 1.2; reload *= 1.1; fall *= 1.2; }
  if (a.barrel === 'shortbarrel') { vel *= 0.86; recV *= 1.2; recH *= 1.2; ads *= 0.7; reload *= 0.85; fall *= 0.85; }
  return { o, recV, recH, vel, flash, fall, mag: R.mag, reload: R.reload * reload, adsTime: o.adsTime * ads };
}
function aimDir(out, pitchOff, yawOff) {
  const p = P.pitch + P.recoilP + (pitchOff || 0), y = P.yaw + P.recoilY + (yawOff || 0);
  out.x = -Math.sin(y) * Math.cos(p); out.y = Math.sin(p); out.z = -Math.cos(y) * Math.cos(p);
  return out;
}
const _ad = { x: 0, y: 0, z: 0 };

// ------------------------------------------------------------- bullets (projectiles with drop + travel time)
const bullets = [];
function fireRifle() {
  const R = CFG.rifle, W = wstats();
  P.ammo--; GAME.shots++;
  const moving = Math.min(1, Math.hypot(P.vx, P.vz) / CFG.player.walk);
  let spread = R.spreadBase + P.bloom + moving * R.moveSpread + (P.sprinting ? 3 : 0);
  spread *= lerp(W.o.hip, W.o.adsSpread, P.ads);
  const a = Math.random() * Math.PI * 2, r = spread * Math.sqrt(Math.random()) * DEG;
  aimDir(_ad, Math.sin(a) * r, Math.cos(a) * r);
  bullets.push({ x: P.x, y: P.y, z: P.z, vx: _ad.x * W.vel, vy: _ad.y * W.vel, vz: _ad.z * W.vel, t: 0, dist: 0, fall: W.fall, dead: false, supp: W.flash === 0 });
  P.recoilP += R.kick * W.recV * rand(0.85, 1.15) * DEG;
  P.recoilY += rand(-1, 1) * R.kickYaw * W.recH * DEG;
  P.bloom = Math.min(R.spreadMax, P.bloom + R.spreadPerShot);
  P.kick = 1;
  addTrauma(0.035);
  padRumble(RUM_FIRE);
  VM.flashT = W.flash ? 0.05 : 0; VM.flashScale = W.flash;
}
function updateBullets(dt) {
  const R = CFG.rifle, g = R.gravity;
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    if (b.dead) { bullets.splice(i, 1); continue; }
    const nx = b.x + b.vx * dt, ny = b.y + b.vy * dt - 0.5 * g * dt * dt, nz = b.z + b.vz * dt;
    b.vy -= g * dt;
    const sx = nx - b.x, sy = ny - b.y, sz = nz - b.z, len = Math.hypot(sx, sy, sz) || 1e-6;
    const dx = sx / len, dy = sy / len, dz = sz / len;
    const hz = rayZombies(b.x, b.y, b.z, dx, dy, dz, len);
    const tb = rayBuildings(b.x, b.y, b.z, dx, dy, dz, len, false);
    const tg = ny < 0 ? (b.y / (b.y - ny)) * len : Infinity;
    const tz = hz ? hz.t : Infinity;
    const t = Math.min(tz, tb, tg);
    if (t < Infinity) {
      const hx = b.x + dx * t, hy = b.y + dy * t, hzz = b.z + dz * t, dist = b.dist + t;
      if (t === tz) {
        const f = clamp(1 - (dist - R.falloffStart * b.fall) / (R.falloffEnd * b.fall - R.falloffStart * b.fall), R.minFalloff, 1);
        GAME.hits++;
        hurtZombie(hz.z, R.damage * f * (hz.head ? R.headMult : 1), 'gun', hz.head);
        puff(hx, hy, hzz, 'blood');
        UI.hitmarker(false);
      } else if (t === tb) puff(hx + RH.nx * 0.05, hy, hzz + RH.nz * 0.05, 'wall');
      else puff(hx, 0.02, hzz, 'ground');
      b.dead = true; b.x = hx; b.y = hy; b.z = hzz; b.dist = dist;
      continue;
    }
    b.x = nx; b.y = ny; b.z = nz; b.dist += len; b.t += dt;
    if (b.t > R.maxLife) b.dead = true;
  }
}
function renderStreaks() {
  let n = 0;
  for (const b of bullets) {
    if (n >= STREAK_CAP || b.dead) continue;
    const v = Math.hypot(b.vx, b.vy, b.vz) || 1, tail = Math.min(12, b.dist - 3);
    if (tail <= 0.5) continue;
    streakPos.set([b.x - (b.vx / v) * tail, b.y - (b.vy / v) * tail, b.z - (b.vz / v) * tail, b.x, b.y, b.z], n * 6);
    const a = b.supp ? 0.35 : 0.9;
    streakCol.set([1, 0.8, 0.45, 0, 1, 0.9, 0.6, a], n * 8);
    n++;
  }
  for (let k = n; k < STREAK_CAP; k++) { streakCol[k * 8 + 3] = 0; streakCol[k * 8 + 7] = 0; }
  streakGeo.attributes.position.needsUpdate = true; streakGeo.attributes.color.needsUpdate = true;
  streakGeo.setDrawRange(0, Math.max(2, n * 2));
}

// ------------------------------------------------------------- melee
function startSwing() {
  if (P.swingCd > 0 || P.blocking) return;
  if (P.stamina < CFG.stamina.swing) { UI.staminaFlash(); return; }
  P.stamina -= CFG.stamina.swing; P.staminaUsedT = GAME.time;
  P.swingT = 0; P.swingCd = CFG.melee.cooldown; P.swingHit = false;
  P.reloading = false;
}
function meleeHitCheck() {
  const M = CFG.melee, fx = -Math.sin(P.yaw), fz = -Math.cos(P.yaw), cosA = Math.cos((M.arcDeg / 2) * DEG);
  let hits = 0;
  for (const z of zombies) {
    if (z.dead) continue;
    const dx = z.x - P.x, dz = z.z - P.z, d = Math.hypot(dx, dz) || 1e-3;
    if (d > M.range + z.r || (dx * fx + dz * fz) / d < cosA) continue;
    const crit = z.crit > 0;
    hurtZombie(z, M.damage * (crit ? M.critMult : 1), 'melee', false);
    const kb = z.type === 2 ? 0.25 : 1;
    z.kbx = (dx / d) * M.knock * kb; z.kbz = (dz / d) * M.knock * kb;
    if (!z.dead && z.type !== 2) { z.state = 'stagger'; z.t = Math.max(z.t, 0.35); }
    for (let k = 0; k < 6; k++) emit(FX.bits, z.x, 1.3 * z.sc, z.z, rand(-2, 2) + fx * 2, rand(0, 3), rand(-2, 2) + fz * 2, 0.5, 0.42, 0.55, 0.22, 1, 9, 1);
    hits++;
  }
  if (hits) { GAME.meleeHits += hits; hitStop(0.06); addTrauma(0.18); UI.hitmarker(false); }
}
function damagePlayer(dmg, src) {
  if (!P.alive || dmg <= 0) return;
  P.hp -= dmg; P.lastHurt = GAME.time;
  addTrauma(0.25 + dmg / 120);
  UI.hurt(dmg);
  if (P.hp <= 0) { P.hp = 0; P.alive = false; playerDied(); }
  else padRumble(RUM_HURT, dmg);
}

// ------------------------------------------------------------- breach charges
const charges = [];
const chargeGeo = new THREE.BoxGeometry(0.22, 0.12, 0.16);
function throwCharge() {
  if (P.charges <= 0 || P.throwCd > 0) { if (P.charges <= 0) toast('No breach charges (buy between rounds)', 'bad'); return; }
  P.charges--; P.throwCd = 0.6; GAME.chargesThrown++;
  const C = CFG.charge;
  aimDir(_ad);
  const mesh = new THREE.Mesh(chargeGeo, new THREE.MeshLambertMaterial({ color: srgb(0.95, 0.76, 0.19), emissive: srgb(0.3, 0.05, 0) }));
  scene.add(mesh);
  charges.push({ x: P.x + _ad.x * 0.6, y: P.y - 0.15, z: P.z + _ad.z * 0.6, vx: _ad.x * C.speed + P.vx, vy: _ad.y * C.speed + C.up, vz: _ad.z * C.speed + P.vz, t: 0, stuck: false, b: null, mesh });
  logEvent('charge_thrown', {});
}
function updateCharges(dt) {
  const C = CFG.charge;
  for (let i = charges.length - 1; i >= 0; i--) {
    const c = charges[i];
    c.t += dt;
    if (!c.stuck) {
      c.vy -= 9.81 * dt;
      const sx = c.vx * dt, sy = c.vy * dt, sz = c.vz * dt, len = Math.hypot(sx, sy, sz);
      if (len > 1e-6) {
        const t = rayBuildings(c.x, c.y, c.z, sx / len, sy / len, sz / len, len, true);
        if (t < Infinity) {
          c.x += (sx / len) * t + RH.nx * 0.08; c.y += (sy / len) * t + (RH.roof ? 0.08 : 0); c.z += (sz / len) * t + RH.nz * 0.08;
          c.stuck = true; c.b = RH.b;
        } else { c.x += sx; c.y += sy; c.z += sz; }
      }
      if (!c.stuck && c.y < 0.08) { c.y = 0.08; c.vy *= -0.3; c.vx *= 0.5; c.vz *= 0.5; }
    }
    c.mesh.position.set(c.x, c.y, c.z);
    c.mesh.material.emissive.setRGB(Math.sin(c.t * 20) > 0 ? 0.9 : 0.1, 0.05, 0);
    if (c.t >= C.fuse) { explodeCharge(c); scene.remove(c.mesh); c.mesh.material.dispose(); charges.splice(i, 1); }
  }
}
function explodeCharge(c) {
  const C = CFG.charge;
  explosionFx(c.x, c.y, c.z);
  shakeAt(c.x, c.z, 0.9, 70);
  if (Math.hypot(c.x - P.x, c.z - P.z) < 25) hitStop(0.05);
  for (const z of zombies) {
    if (z.dead) continue;
    const d = Math.hypot(z.x - c.x, 1.0 - c.y, z.z - c.z);
    if (d < C.radius) {
      hurtZombie(z, C.dmgZombie * (1 - d / C.radius), 'charge', false);
      const l = Math.hypot(z.x - c.x, z.z - c.z) || 1;
      z.kbx = ((z.x - c.x) / l) * 10 * (1 - d / C.radius); z.kbz = ((z.z - c.z) / l) * 10 * (1 - d / C.radius);
    }
  }
  for (const b of buildingsNear(c.x, c.z, C.radius + 1, [])) {
    if (b.state !== 0) continue;
    const d = b === c.b ? 0 : distToBuilding(b, c.x, c.z);
    if (d < C.radius) damageBuilding(b, C.dmgBuilding * Math.pow(1 - d / C.radius, 0.6), 'player');
  }
  const dp = Math.hypot(P.x - c.x, P.y - 0.8 - c.y, P.z - c.z);
  if (dp < 5) damagePlayer(45 * (1 - dp / 5), null);
}

// ------------------------------------------------------------- ping / spot
const pings = [];
function doPing() {
  GAME.pings++;
  aimDir(_ad);
  const hz = rayZombies(P.x, P.y, P.z, _ad.x, _ad.y, _ad.z, 250, 0.9);
  const tb = rayBuildings(P.x, P.y, P.z, _ad.x, _ad.y, _ad.z, 300, true);
  if (hz && hz.t < tb) {
    pings.push({ kind: 'zom', z: hz.z, until: GAME.time + (hz.z.type === 2 ? 8 : 5), label: ZTYPES[hz.z.type].name });   // concept: 5 s, specials 8 s
    logEvent('ping', { what: ZTYPES[hz.z.type].name, dist: +hz.t.toFixed(1) });
  } else if (tb < Infinity) {
    const b = RH.b;
    pings.push({ kind: 'bld', b, x: P.x + _ad.x * tb, y: P.y + _ad.y * tb, z: P.z + _ad.z * tb, until: GAME.time + 10, label: buildingName(b) });
    logEvent('ping', { what: buildingName(b), dist: +tb.toFixed(1) });
  } else if (_ad.y < -0.01) {
    const t = -P.y / _ad.y;
    if (t < 300) pings.push({ kind: 'bld', b: null, x: P.x + _ad.x * t, y: 0.5, z: P.z + _ad.z * t, until: GAME.time + 8, label: 'Here' });
    logEvent('ping', { what: 'ground' });
  }
  if (pings.length > 8) pings.shift();
}

// ------------------------------------------------------------- per-step update
function updatePlayer(dt) {
  if (!AUTOTEST) readHumanInput();
  if (!AUTOTEST && P.alive) {            // arrow keys turn (needed in free-look when the cursor reaches the window edge)
    P.yaw += ((KEYS.ArrowLeft ? 1 : 0) - (KEYS.ArrowRight ? 1 : 0)) * 2.2 * dt;
    P.pitch = clamp(P.pitch + ((KEYS.ArrowUp ? 1 : 0) - (KEYS.ArrowDown ? 1 : 0)) * 1.4 * dt, -1.5, 1.5);
  }
  const once = INPUT.once;
  P.swingCd -= dt; P.throwCd -= dt;
  if (!P.alive) { once.clear(); return; }
  const S = CFG.stamina, R = CFG.rifle, W = wstats();
  if (once.has('w1') && P.weapon !== 'rifle') { P.weapon = 'rifle'; P.reloading = false; }
  if (once.has('w2') && P.weapon !== 'bat') { P.weapon = 'bat'; P.reloading = false; }
  if (once.has('wswap')) { P.weapon = P.weapon === 'rifle' ? 'bat' : 'rifle'; P.reloading = false; }
  // block / parry
  const canBlock = GAME.time >= P.guardBrokenUntil && P.stamina > 0 && P.swingT < 0;
  if (once.has('blockPress') && canBlock) P.blockPressT = GAME.time;
  P.blocking = INPUT.block && canBlock;
  // melee
  if (once.has('swing') || (P.weapon === 'bat' && INPUT.fire && !P.blocking)) startSwing();
  if (P.swingT >= 0) {
    P.swingT += dt;
    if (!P.swingHit && P.swingT >= CFG.melee.windup) { P.swingHit = true; meleeHitCheck(); }
    if (P.swingT > 0.42) P.swingT = -1;
  }
  // rifle
  const busy = P.blocking || P.swingT >= 0 || P.weapon !== 'rifle';
  P.ads = clamp(P.ads + ((INPUT.ads && !busy && !P.sprinting ? 1 : -1) * dt) / W.adsTime, 0, 1);
  if (once.has('reload') && P.weapon === 'rifle' && !P.reloading && P.ammo < W.mag && P.reserve > 0) { P.reloading = true; P.reloadT = W.reload; }
  if (P.reloading) {
    P.reloadT -= dt;
    if (busy && P.weapon !== 'rifle') P.reloading = false;
    if (P.reloadT <= 0) { const take = Math.min(W.mag - P.ammo, P.reserve); P.ammo += take; P.reserve -= take; P.reloading = false; }
  }
  P.fireCd = Math.max(-0.05, P.fireCd - dt);
  if (INPUT.fire && !busy && !P.reloading && P.weapon === 'rifle') {
    if (P.ammo > 0) { while (P.fireCd <= 0 && P.ammo > 0) { fireRifle(); P.fireCd += 60 / R.rpm; } }
    else if (P.reserve > 0) { P.reloading = true; P.reloadT = W.reload; }
  }
  P.bloom = Math.max(0, P.bloom - R.spreadRecover * dt * (INPUT.fire ? 0.15 : 1));
  const rk = Math.exp(-R.recoilRecover * dt);
  P.recoilP *= rk; P.recoilY *= rk;
  // gadgets
  if (once.has('charge')) throwCharge();
  if (once.has('ping')) doPing();
  // aimed building (Reinforce tool range + highlight)
  aimDir(_ad);
  const tb = rayBuildings(P.x, P.y, P.z, _ad.x, _ad.y, _ad.z, CFG.building.toolRange, true);
  const nb = tb < Infinity && RH.b.state === 0 ? RH.b : null;
  if (nb !== P.aimB) { const old = P.aimB; P.aimB = nb; aimedBuilding = nb; if (old) paintBuilding(old); if (nb) paintBuilding(nb); }
  if (!INPUT.repair) P.repairLatch = false;
  if (INPUT.repair && !P.repairLatch && P.aimB && P.swingT < 0) {
    const info = repairInfo(P.aimB);
    if ((info.action === 'reinforce' || info.action === 'repair') && GAME.salvage >= info.cost) {
      P.repairT += dt;
      if (P.repairT >= CFG.building.repairHold) { applyRepair(P.aimB); P.repairT = 0; P.repairLatch = true; }
    } else P.repairT = 0;
  } else P.repairT = 0;
  // movement + stamina
  const fx = -Math.sin(P.yaw), fz = -Math.cos(P.yaw), rx = Math.cos(P.yaw), rz = -Math.sin(P.yaw);
  let wx = fx * INPUT.fwd + rx * INPUT.right, wz = fz * INPUT.fwd + rz * INPUT.right;
  const wl = Math.hypot(wx, wz);
  if (wl > 0) { wx /= wl; wz /= wl; }
  if (P.stamina <= 0.5) P.exhausted = true;
  if (P.exhausted && P.stamina > 25) P.exhausted = false;
  P.sprinting = INPUT.sprint && INPUT.fwd > 0 && !P.exhausted && !P.blocking && P.ads < 0.3 && P.swingT < 0;
  let speed = P.sprinting ? CFG.player.sprint : CFG.player.walk;
  if (P.blocking) speed *= 0.5; else speed *= lerp(1, 0.6, P.ads);
  if (P.reloading) speed *= 0.85;
  const rub = onRubble(P.x, P.z);
  if (rub) speed *= 0.6;
  if (!P.sprinting) speed *= INPUT.moveScale;      // analog stick: partial tilt walks slower (always 1 for keys and the bot)
  const k = Math.min(1, dt * 12);
  P.vx += (wx * speed - P.vx) * k; P.vz += (wz * speed - P.vz) * k;
  P.x += P.vx * dt; P.z += P.vz * dt;
  collideCircle(P, CFG.player.r);
  if (P.sprinting && wl > 0) { P.stamina -= S.sprintDrain * dt; P.staminaUsedT = GAME.time; }
  else if (!P.blocking && GAME.time - P.staminaUsedT > S.regenDelay) P.stamina += S.regen * dt;
  P.stamina = clamp(P.stamina, 0, S.max);
  if (GAME.time - P.lastHurt > CFG.player.regenDelay) P.hp = Math.min(CFG.player.hp, P.hp + CFG.player.regen * dt);
  P.ground = lerp(P.ground, rub ? CFG.building.rubbleH * 0.8 : 0, Math.min(1, dt * 8));
  const sp = Math.hypot(P.vx, P.vz);
  P.bob += dt * sp * 1.9;
  P.y = CFG.player.eye + P.ground + Math.sin(P.bob) * 0.035 * Math.min(1, sp / 4);
  if (GAME.phase === 'round' && GAME.owner === 'player' && GAME.sector && !GAME.supplyUsed && P.reserve < CFG.rifle.reserve && inSector(GAME.sector, P.x, P.z)) {
    GAME.supplyUsed = true; P.reserve = CFG.rifle.reserve; toast('Supply point: ammo refilled', 'own'); logEvent('supply_point', {});
  }
  if (once.has('map')) UI.toggleMap();
  if (once.has('buy')) UI.toggleBuy();
  once.clear();
}

// ------------------------------------------------------------- viewmodel (rendered in its own pass)
const VM = { flashT: 0, flashScale: 1 };
(function buildViewmodel() {
  const dark = new THREE.MeshLambertMaterial({ color: srgb(0.16, 0.17, 0.18) }), mid = new THREE.MeshLambertMaterial({ color: srgb(0.3, 0.31, 0.32) });
  const box = (w, h, d, x, y, z, m) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m || dark); o.position.set(x, y, z); return o; };
  const cyl = (r, l, x, y, z, m) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, l, 10), m || dark); o.rotation.x = Math.PI / 2; o.position.set(x, y, z); return o; };
  VM.rifle = new THREE.Group();
  VM.rifle.add(box(0.07, 0.09, 0.44, 0, 0, -0.1, mid), box(0.035, 0.035, 0.36, 0, 0.012, -0.5), box(0.06, 0.1, 0.22, 0, -0.02, 0.21),
    box(0.05, 0.12, 0.06, 0, -0.1, 0.04), box(0.015, 0.03, 0.02, 0, 0.06, -0.3));
  VM.mag = box(0.05, 0.16, 0.08, 0, -0.12, -0.14);
  VM.longb = box(0.035, 0.035, 0.2, 0, 0.012, -0.78); VM.shortb = box(0.06, 0.06, 0.12, 0, 0.012, -0.36, mid);
  VM.reddot = new THREE.Group(); VM.reddot.add(box(0.05, 0.05, 0.08, 0, 0.075, -0.1), box(0.012, 0.012, 0.005, 0, 0.08, -0.141, new THREE.MeshBasicMaterial({ color: 0xff2020 })));
  VM.scope = cyl(0.032, 0.26, 0, 0.09, -0.1);
  VM.comp = box(0.05, 0.05, 0.08, 0, 0.012, -0.71, mid);
  VM.supp = cyl(0.032, 0.24, 0, 0.012, -0.79);
  VM.rifle.add(VM.mag, VM.longb, VM.shortb, VM.reddot, VM.scope, VM.comp, VM.supp);
  VM.flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTex, color: 0xffc070, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  VM.flash.position.set(0, 0.012, -0.75); VM.rifle.add(VM.flash);
  VM.bat = new THREE.Group();
  const wood = new THREE.MeshLambertMaterial({ color: srgb(0.55, 0.42, 0.28) });
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.28, 8), dark);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.024, 0.55, 10), wood);
  handle.position.y = 0.0; barrel.position.y = 0.41;
  VM.bat.add(handle, barrel);
  VM.rifle.scale.setScalar(0.85);
  vmScene.add(VM.rifle, VM.bat);
})();
const VM_HIP = new THREE.Vector3(0.21, -0.2, -0.44), VM_ADS = new THREE.Vector3(0, -0.1, -0.4);
function renderViewmodel(dt, t) {
  const a = P.att;
  VM.longb.visible = a.barrel === 'longbarrel'; VM.shortb.visible = a.barrel === 'shortbarrel';
  VM.reddot.visible = a.optic === 'reddot'; VM.scope.visible = a.optic === 'scope';
  VM.comp.visible = a.muzzle === 'comp'; VM.supp.visible = a.muzzle === 'supp';
  const bz = a.barrel === 'longbarrel' ? -0.18 : a.barrel === 'shortbarrel' ? 0.12 : 0;
  VM.comp.position.z = -0.71 + bz; VM.supp.position.z = -0.79 + bz;
  VM.flash.position.z = (a.muzzle === 'supp' ? -0.92 : a.muzzle === 'comp' ? -0.76 : -0.7) + bz;
  const showBat = P.weapon === 'bat' || P.blocking || P.swingT >= 0;
  const scoped = !!a.optic && P.ads > 0.7;            // optics: view through the HUD dot / scope overlay
  VM.rifle.visible = !showBat && !scoped && P.alive;
  VM.bat.visible = showBat && P.alive;
  P.kick = Math.max(0, P.kick - dt * 12);
  const sp = Math.hypot(P.vx, P.vz), bob = Math.sin(P.bob) * 0.012 * Math.min(1, sp / 4), bob2 = Math.cos(P.bob * 0.5) * 0.01 * Math.min(1, sp / 4);
  VM.rifle.position.lerpVectors(VM_HIP, VM_ADS, P.ads);
  VM.rifle.position.x += bob2; VM.rifle.position.y += bob; VM.rifle.position.z += P.kick * 0.05;
  VM.rifle.rotation.set(P.kick * 0.06 + (P.reloading ? 0.7 * Math.sin(Math.min(1, (1 - P.reloadT / wstats().reload)) * Math.PI) : 0), 0, P.reloading ? 0.3 : 0);
  if (P.sprinting) { VM.rifle.rotation.y = 0.5; VM.rifle.rotation.x -= 0.2; }
  VM.flash.visible = VM.flashT > 0;
  if (VM.flashT > 0) { VM.flashT -= dt; VM.flash.scale.setScalar(0.09 * VM.flashScale * rand(0.8, 1.3)); VM.flash.material.rotation = Math.random() * 6; }
  if (P.swingT >= 0) {
    const k = clamp(P.swingT / 0.3, 0, 1), e = 1 - (1 - k) * (1 - k);
    VM.bat.position.set(lerp(0.35, -0.3, e), lerp(-0.05, -0.25, e), -0.42);
    VM.bat.rotation.set(-0.4 - e * 0.8, 0, lerp(-0.9, 1.6, e));
  } else if (P.blocking) {
    VM.bat.position.set(0.05, -0.14, -0.38); VM.bat.rotation.set(0, 0, Math.PI / 2 * 0.92);
  } else {
    VM.bat.position.set(0.26 + bob2, -0.28 + bob, -0.4); VM.bat.rotation.set(-0.5, 0, -0.35);
  }
}
