// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Horde: Shambler / Runner / Breacher. Flow-field movement, sector focus, telegraphed attacks, Breachers smash buildings.

function boxGeo(specs) {
  const pos = [], nor = [], col = [];
  for (const s of specs) {
    const g = new THREE.BoxGeometry(s[0], s[1], s[2]).toNonIndexed();
    g.translate(s[3], s[4], s[5]);
    pos.push(...g.attributes.position.array); nor.push(...g.attributes.normal.array);
    for (let i = 0; i < g.attributes.position.count; i++) col.push(s[6], s[6], s[6]);
    g.dispose();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return geo;
}
const Z_CAP = 96;
const zBody = new THREE.InstancedMesh(boxGeo([
  [0.17, 0.86, 0.2, -0.12, 0.43, 0, 0.62], [0.17, 0.86, 0.2, 0.12, 0.43, 0, 0.62],
  [0.5, 0.66, 0.3, 0, 1.18, 0.05, 1.0], [0.3, 0.32, 0.3, 0, 1.66, 0.12, 1.12],
]), new THREE.MeshLambertMaterial({ vertexColors: true }), Z_CAP);
const zArms = new THREE.InstancedMesh(boxGeo([[0.12, 0.12, 0.62, -0.26, 0, 0.3, 0.9], [0.12, 0.12, 0.62, 0.26, 0, 0.3, 0.9]]),
  new THREE.MeshLambertMaterial({ vertexColors: true }), Z_CAP);
for (const m of [zBody, zArms]) {
  m.count = 0; m.frustumCulled = false; m.castShadow = SHADOWS;
  m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  m.setColorAt(0, new THREE.Color(1, 1, 1));
  scene.add(m);
}

const zombies = [];
function spawnZombie(type) {
  const sp = pickSpawn();
  if (sp.hidden) GAME.spawnsHidden++; else GAME.spawnsVisible++;
  const T = ZTYPES[type], spec = GAME.spec;
  if (type === 2 && GAME.breacherAlive === 0) { GAME.breacherAlive = 1; forceBreacherFields(); }
  const firstBreacher = type === 2 && !zombies.some((z) => z.type === 2 && !z.dead);
  const toSector = GAME.sector && (type === 2 ? firstBreacher || Math.random() < 0.5 : Math.random() < CFG.sector.objectiveShare);
  const hp = type === 2 ? T.hp + 150 * GAME.round : T.hp * spec.hpMul;
  zombies.push({
    type, x: sp.x, z: sp.z, vx: 0, vz: 0, kbx: 0, kbz: 0, yaw: Math.atan2(P.x - sp.x, P.z - sp.z),
    hp, maxHp: hp, sc: T.scale, r: T.r, dead: false, deathT: 0,
    speed: type === 0 ? spec.shamblerSpeed * rand(0.85, 1.15) : type === 1 ? spec.runnerSpeed * rand(0.92, 1.08) : 2.0,
    state: 'move', t: 0, atkCd: 0, flash: 0, crit: 0, losT: 0, los: false,
    focus: toSector ? 'sector' : 'player', smashB: null, wx: 0, wz: 0, wt: 0, ph: Math.random() * 10,
    chkT: 0, cx0: sp.x, cz0: sp.z, stuckN: 0,
  });
}

function hurtZombie(z, dmg, src, head) {
  if (z.dead) return;
  if (z.crit > 0 && src === 'gun') dmg *= 1.5;
  z.hp -= dmg; z.flash = 0.08;
  if (src === 'gun') addSalvage(CFG.econ.hit, 'hit');
  if (z.hp <= 0) killZombie(z, src, head);
}
function killZombie(z, src, head) {
  z.dead = true; z.deathT = 0; z.state = 'dead';
  GAME.kills++;
  if (src === 'melee') GAME.meleeKills++;
  if (head) GAME.headshots++;
  const E = CFG.econ;
  const pay = z.type === 2 ? E.breacherKill : src === 'melee' ? E.meleeKill : head ? E.headKill : E.kill;
  addSalvage(pay, z.type === 2 ? 'Breacher kill' : src === 'melee' ? 'melee kill' : head ? 'headshot' : 'kill');
  UI.hitmarker(true);
  for (let k = 0; k < 10; k++) emit(FX.bits, z.x, 1.2 * z.sc, z.z, rand(-2.5, 2.5), rand(0.5, 4), rand(-2.5, 2.5), rand(0.4, 0.8), 0.42, 0.55, 0.22, 1, 9, 1);
  if (z.type === 2) logEvent('breacher_killed', { src });
}

function zombieStrike(z) {
  const T = ZTYPES[z.type];
  const dx = z.x - P.x, dz = z.z - P.z, d = Math.hypot(dx, dz) || 1e-3;
  if (d > T.reach + 0.35 || !P.alive) return;           // player stepped out of reach: whiff
  const dmg = T.dmg * GAME.spec.dmgMul;
  const fx = -Math.sin(P.yaw), fz = -Math.cos(P.yaw);
  const facing = (dx * fx + dz * fz) / d > Math.cos(75 * DEG);
  if (P.blocking && facing) {
    if (GAME.time - P.blockPressT <= CFG.melee.parryWindow) {
      z.state = 'stagger'; z.t = z.type === 2 ? 1.0 : 1.6; z.crit = z.t + 0.3;
      z.kbx = (dx / d) * (z.type === 2 ? 1.5 : 4); z.kbz = (dz / d) * (z.type === 2 ? 1.5 : 4);
      P.stamina = Math.min(CFG.stamina.max, P.stamina + CFG.stamina.parryRefund);
      GAME.parries++;
      hitStop(0.09); addTrauma(0.22);
      centerMsg('PARRY', 'stagger: crit window', 0.6);
      for (let k = 0; k < 10; k++) emit(FX.glow, P.x + fx * 0.9, P.y - 0.3, P.z + fz * 0.9, rand(-2, 2), rand(0, 3), rand(-2, 2), 0.25, 0.6, 0.9, 1, 1, 6, 2);
      return;
    }
    const cost = z.type === 2 ? CFG.stamina.blockHitBreacher : CFG.stamina.blockHit;
    if (P.stamina >= cost) {
      P.stamina -= cost; P.staminaUsedT = GAME.time; GAME.blocks++;
      if (z.type === 2) damagePlayer(dmg * 0.3, z);
      z.kbx = (dx / d) * 2; z.kbz = (dz / d) * 2;
      addTrauma(0.15);
      return;
    }
    P.stamina = 0; P.guardBrokenUntil = GAME.time + 1.2; GAME.guardBreaks++;
    centerMsg('GUARD BROKEN', '', 0.6);
  }
  damagePlayer(dmg, z);
  if (z.type === 2) { P.vx -= (dx / d) * 6; P.vz -= (dz / d) * 6; }
}

const _zNear = [];
function updateZombies(dt) {
  let bAlive = 0, alive = 0;
  const sec = GAME.sector;
  for (const z of zombies) if (!z.dead) alive++;
  const lastStand = GAME.phase === 'round' && GAME.queueIdx >= GAME.queue.length && alive <= 3;
  for (let i = zombies.length - 1; i >= 0; i--) {
    const z = zombies[i];
    if (z.dead) { z.deathT += dt; if (z.deathT > 1.8) zombies.splice(i, 1); continue; }
    if (z.type === 2) bAlive++;
    const T = ZTYPES[z.type];
    z.flash = Math.max(0, z.flash - dt); z.atkCd -= dt; z.crit = Math.max(0, z.crit - dt);
    const dx = P.x - z.x, dz = P.z - z.z, d = Math.hypot(dx, dz) || 1e-3;
    z.losT -= dt;
    if (z.losT <= 0) { z.losT = 0.2 + Math.random() * 0.15; z.los = P.alive && d < 16 && losClear(z.x, 1.5 * z.sc, z.z, P.x, P.y - 0.2, P.z); }
    // stuck or strayed too far: re-enter from a hidden spawn (prototype unstick)
    z.chkT += dt;
    if (z.chkT > 3) {
      const moved = Math.hypot(z.x - z.cx0, z.z - z.cz0);
      z.cx0 = z.x; z.cz0 = z.z; z.chkT = 0;
      const milling = z.focus === 'sector' && sec && inSector(sec, z.x, z.z);
      z.stuckN = z.state === 'move' && moved < 1.2 && d > 15 && !milling ? z.stuckN + 1 : 0;
      if ((d > 170 && !milling) || z.stuckN >= 2) {
        const sp = pickSpawn(); z.x = z.cx0 = sp.x; z.z = z.cz0 = sp.z; z.vx = z.vz = 0; z.stuckN = 0; GAME.respawns = (GAME.respawns || 0) + 1;
      }
    }
    if (lastStand && z.focus !== 'player') z.focus = 'player';
    let wx = 0, wz = 0, spd = lastStand ? Math.max(z.speed, z.type === 2 ? 2.6 : 3.8) : z.speed, face = null;
    if (z.state === 'stagger') { z.t -= dt; spd = 0; if (z.t <= 0) z.state = 'move'; }
    else if (z.state === 'windup') { z.t -= dt; spd = 0; face = Math.atan2(dx, dz); if (z.t <= 0) { zombieStrike(z); z.state = 'recover'; z.t = 0.4; } }
    else if (z.state === 'recover') { z.t -= dt; spd *= 0.3; wx = dx / d; wz = dz / d; if (z.t <= 0) z.state = 'move'; }
    else if (z.state === 'smash') {
      const b = z.smashB;
      spd = 0;
      if (!b || b.state !== 0) z.state = 'move';
      else {
        face = Math.atan2(b.cx - z.x, b.cz - z.z);
        z.t -= dt;
        if (z.t <= 0) {
          z.t = 1.15;
          closestOnPoly(b.pts, z.x, z.z, CP);
          damageBuilding(b, 95, 'breacher');
          for (let k = 0; k < 6; k++) emit(FX.bits, CP.x, rand(0.5, 2.5), CP.z, rand(-2, 2), rand(1, 4), rand(-2, 2), rand(0.5, 1), 0.7, 0.66, 0.6, 1, 9.8, 0.5);
          emit(FX.dust, CP.x, 1.5, CP.z, rand(-1, 1), 0.5, rand(-1, 1), 1.5, 0.65, 0.62, 0.58, 0.4, 0, 1);
          shakeAt(z.x, z.z, 0.3, 45);
        }
        if (z.los && d < T.reach + 2) z.state = 'move';      // the player is right there: go for them
      }
    } else {
      if (P.alive && d < T.reach - 0.4 && z.atkCd <= 0 && (z.los || d < 1.4)) {
        z.state = 'windup'; z.t = T.windup; z.atkCd = T.windup + 0.9;
      } else if (z.los && d < 14 && P.alive) { wx = dx / d; wz = dz / d; }
      else {
        const toSector = z.focus === 'sector' && sec;
        let sieging = false;
        if (z.type === 2) {                       // Breacher siege: tear down the cover around its objective
          const ox = toSector ? sec.x : P.x, oz = toSector ? sec.z : P.z;
          if (Math.hypot(ox - z.x, oz - z.z) < 70) {
            z.siegeT = (z.siegeT || 0) - dt;
            if (!z.siegeB || z.siegeB.state !== 0 || z.siegeT <= 0) { z.siegeB = pickSiegeTarget(z, ox, oz); z.siegeT = 14; }
            const b = z.siegeB;
            if (b) {
              closestOnPoly(b.pts, z.x, z.z, CP);
              const db = Math.hypot(CP.x - z.x, CP.z - z.z) || 1e-3;
              if (db < z.r + 0.9) { z.state = 'smash'; z.smashB = b; z.t = 0.5; }
              else { wx = (CP.x - z.x) / db; wz = (CP.z - z.z) / db; sieging = true; }
            }
          }
        }
        if (sieging) { /* heading straight for the target wall */ }
        else if (toSector && inSector(sec, z.x, z.z) && z.type !== 2) {
          z.wt -= dt;                                 // occupy the sector: mill about inside it
          if (z.wt <= 0 || Math.hypot(z.wx - z.x, z.wz - z.z) < 1.5) { const a = Math.random() * 6.283, r = Math.random() * sec.r * 0.8; z.wx = sec.x + Math.cos(a) * r; z.wz = sec.z + Math.sin(a) * r; z.wt = rand(2, 5); }
          const ox = z.wx - z.x, oz = z.wz - z.z, ol = Math.hypot(ox, oz) || 1;
          wx = ox / ol; wz = oz / ol; spd *= 0.5;
        } else {
          const field = toSector ? (z.type === 2 ? NAV.field.sB : NAV.field.sN) : (z.type === 2 ? NAV.field.pB : NAV.field.pN);
          if (flowStep(field, z.x, z.z, FLOW)) {
            wx = FLOW.x; wz = FLOW.z;
            if (z.type === 2) {
              const k = NAV.bld[FLOW.cell];
              if (k >= 0 && buildings[k].state === 0 && distToBuilding(buildings[k], z.x, z.z) < z.r + 1.0) { z.state = 'smash'; z.smashB = buildings[k]; z.t = 0.5; }
            }
          } else if (!toSector) { wx = dx / d; wz = dz / d; }
          else if (sec) { const ox = sec.x - z.x, oz = sec.z - z.z, ol = Math.hypot(ox, oz) || 1; wx = ox / ol; wz = oz / ol; }
        }
      }
    }
    if (onRubble(z.x, z.z)) spd *= 0.6;
    const k = Math.min(1, dt * 6);
    z.vx += (wx * spd - z.vx) * k; z.vz += (wz * spd - z.vz) * k;
    z.x += (z.vx + z.kbx) * dt; z.z += (z.vz + z.kbz) * dt;
    const kd = Math.exp(-6 * dt); z.kbx *= kd; z.kbz *= kd;
    // separation from other zombies
    for (let j = 0; j < i; j++) {
      const o = zombies[j];
      if (o.dead) continue;
      const sx = z.x - o.x, sz = z.z - o.z, rr = z.r + o.r + 0.1, s2 = sx * sx + sz * sz;
      if (s2 < rr * rr && s2 > 1e-6) {
        const s = Math.sqrt(s2), push = (rr - s) * 0.5, wz2 = o.type === 2 ? 0.2 : 0.5, wz1 = z.type === 2 ? 0.2 : 0.5;
        z.x += (sx / s) * push * wz1 * 2; z.z += (sz / s) * push * wz1 * 2; o.x -= (sx / s) * push * wz2 * 2; o.z -= (sz / s) * push * wz2 * 2;
      }
    }
    // body-block the player
    const px = z.x - P.x, pz = z.z - P.z, pr = z.r + CFG.player.r, p2 = px * px + pz * pz;
    if (p2 < pr * pr && p2 > 1e-6 && P.alive) {
      const s = Math.sqrt(p2), push = pr - s;
      z.x += (px / s) * push * 0.85; z.z += (pz / s) * push * 0.85;
      P.x -= (px / s) * push * 0.15; P.z -= (pz / s) * push * 0.15;
    }
    collideCircle(z, z.r);
    if (z.type === 2 && z.state === 'move' && COLLIDE.b && COLLIDE.b.state === 0 && (wx * -COLLIDE.nx + wz * -COLLIDE.nz) > 0.45) {
      z.state = 'smash'; z.smashB = COLLIDE.b; z.t = 0.5;          // Breachers go through, not around
    }
    const tgt = face != null ? face : Math.hypot(z.vx, z.vz) > 0.3 ? Math.atan2(z.vx, z.vz) : z.yaw;
    let dyaw = ((tgt - z.yaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    z.yaw += dyaw * Math.min(1, dt * 8);
  }
  GAME.breacherAlive = bAlive;
}

const _sgNear = [];
function pickSiegeTarget(z, ox, oz) {   // intact buildings within 30 m of the objective; reinforced ones attract Breachers
  let best = null, bs = Infinity;
  for (const b of buildingsNear(ox, oz, 32, _sgNear)) {
    if (b.state !== 0) continue;
    const dO = distToBuilding(b, ox, oz);
    if (dO > 30) continue;
    const s = Math.hypot(b.cx - z.x, b.cz - z.z) + dO * 0.5 - (b.reinforced ? 25 : 0);
    if (s < bs) { bs = s; best = b; }
  }
  return best;
}
const _zc = new THREE.Color(), _qa = new THREE.Quaternion(), _sh = new THREE.Vector3();
function renderZombies(t) {
  let n = 0;
  for (const z of zombies) {
    if (n >= Z_CAP) break;
    const T = ZTYPES[z.type], sc = z.sc;
    let pitch = 0, y = 0, roll = 0, arm = 0;
    const mv = Math.min(1, Math.hypot(z.vx, z.vz) / 3);
    if (z.dead) { const k = Math.min(1, z.deathT / 0.35); pitch = -k * 1.45; y = -Math.max(0, z.deathT - 1.0) * 1.2; }
    else {
      roll = Math.sin(t * 7 + z.ph) * 0.07 * mv;
      pitch = 0.12 + Math.sin(t * 14 + z.ph) * 0.03 * mv;
      if (z.state === 'stagger') { pitch = -0.25 + Math.sin(t * 20) * 0.05; arm = 0.9; }
      if (z.state === 'windup') arm = -1.35 * (1 - z.t / T.windup);
      if (z.state === 'recover') arm = 0.6;
      if (z.state === 'smash') arm = -1.3 + Math.abs(Math.sin(t * 5)) * 1.8;
    }
    _e.set(pitch, z.yaw, roll, 'YXZ'); _q.setFromEuler(_e);
    _m4.compose(_v3.set(z.x, y, z.z), _q, _s3.set(sc, sc, sc));
    zBody.setMatrixAt(n, _m4);
    const c = T.color;
    if (z.flash > 0) _zc.setRGB(1, 1, 1);
    else if (z.crit > 0 && !z.dead) _zc.copy(srgb(0.45, 0.6, 0.85));
    else _zc.copy(srgb(c[0], c[1], c[2]));
    zBody.setColorAt(n, _zc);
    _sh.set(0, 1.42 * sc, 0.06 * sc).applyQuaternion(_q);
    _e.set(arm, 0, 0); _qa.setFromEuler(_e); _qa.premultiply(_q);
    _m4.compose(_v3.set(z.x + _sh.x, y + _sh.y, z.z + _sh.z), _qa, _s3.set(sc, sc, sc));
    zArms.setMatrixAt(n, _m4);
    if (z.state === 'windup' && !z.dead) _zc.copy(srgb(1, 0.15, 0.08));
    zArms.setColorAt(n, _zc);
    n++;
  }
  zBody.count = zArms.count = n;
  zBody.instanceMatrix.needsUpdate = zArms.instanceMatrix.needsUpdate = true;
  if (zBody.instanceColor) zBody.instanceColor.needsUpdate = true;
  if (zArms.instanceColor) zArms.instanceColor.needsUpdate = true;
}

// ray vs zombie heads (sphere) and bodies (vertical cylinder); used by bullets and pings
function rayZombies(ox, oy, oz, dx, dy, dz, maxT, padding) {
  let best = maxT, bz = null, head = false;
  const pad = padding || 0;
  for (const z of zombies) {
    if (z.dead) continue;
    const sc = z.sc;
    const hx = z.x + Math.sin(z.yaw) * 0.12 * sc, hy = 1.66 * sc, hz = z.z + Math.cos(z.yaw) * 0.12 * sc, hr = 0.19 * sc + pad;
    const lx = ox - hx, ly = oy - hy, lz = oz - hz;
    const b = lx * dx + ly * dy + lz * dz, c = lx * lx + ly * ly + lz * lz - hr * hr, disc = b * b - c;
    if (disc >= 0) { const t = -b - Math.sqrt(disc); if (t >= 0 && t < best) { best = t; bz = z; head = true; } }
    const r = 0.3 * sc + pad, fx = ox - z.x, fz = oz - z.z, a = dx * dx + dz * dz;
    if (a < 1e-9) continue;
    const bb = fx * dx + fz * dz, cc = fx * fx + fz * fz - r * r, dd = bb * bb - a * cc;
    if (dd < 0) continue;
    const t = (-bb - Math.sqrt(dd)) / a;
    if (t >= 0 && t < best) { const y = oy + dy * t; if (y >= 0 && y <= 1.5 * sc) { best = t; bz = z; head = false; } }
  }
  return bz ? { z: bz, t: best, head } : null;
}
