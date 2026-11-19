// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Feedback layer: particles (dust/debris/blood), bullet streaks, flashes, trauma shake, hit-stop.

const softTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();

function makeParticles(cap, size, additive) {
  const pos = new Float32Array(cap * 3).fill(0), col = new Float32Array(cap * 4);
  for (let i = 0; i < cap; i++) pos[i * 3 + 1] = -999;
  const g = new THREE.BufferGeometry();
  const pa = new THREE.BufferAttribute(pos, 3), ca = new THREE.BufferAttribute(col, 4);
  pa.setUsage(THREE.DynamicDrawUsage); ca.setUsage(THREE.DynamicDrawUsage);
  g.setAttribute('position', pa); g.setAttribute('color', ca);
  const m = new THREE.PointsMaterial({ size, map: softTex, vertexColors: true, transparent: true, depthWrite: false, sizeAttenuation: true,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending });
  const pts = new THREE.Points(g, m); pts.frustumCulled = false; scene.add(pts);
  return { cap, pos, col, pa, ca, vel: new Float32Array(cap * 3), life: new Float32Array(cap), max: new Float32Array(cap),
    a0: new Float32Array(cap), grav: new Float32Array(cap), drag: new Float32Array(cap), next: 0, active: 0 };
}
const FX = {
  dust: makeParticles(1600, 3.2, false),
  bits: makeParticles(1600, 0.22, false),
  glow: makeParticles(400, 0.7, true),
  trauma: 0, shakeT: 0, hitStop: 0,
};
function emit(s, x, y, z, vx, vy, vz, life, r, g, b, a0, grav, drag) {
  const i = s.next; s.next = (s.next + 1) % s.cap;
  s.pos[i * 3] = x; s.pos[i * 3 + 1] = y; s.pos[i * 3 + 2] = z;
  s.vel[i * 3] = vx; s.vel[i * 3 + 1] = vy; s.vel[i * 3 + 2] = vz;
  s.life[i] = s.max[i] = life; s.a0[i] = a0; s.grav[i] = grav; s.drag[i] = drag || 0;
  s.col[i * 4] = r; s.col[i * 4 + 1] = g; s.col[i * 4 + 2] = b; s.col[i * 4 + 3] = a0;
}
function updateParticles(s, dt) {
  let any = false;
  for (let i = 0; i < s.cap; i++) {
    if (s.life[i] <= 0) continue;
    any = true;
    s.life[i] -= dt;
    if (s.life[i] <= 0) { s.col[i * 4 + 3] = 0; s.pos[i * 3 + 1] = -999; continue; }
    const k = Math.max(0, 1 - s.drag[i] * dt);
    s.vel[i * 3] *= k; s.vel[i * 3 + 2] *= k; s.vel[i * 3 + 1] = s.vel[i * 3 + 1] * k - s.grav[i] * dt;
    s.pos[i * 3] += s.vel[i * 3] * dt; s.pos[i * 3 + 1] += s.vel[i * 3 + 1] * dt; s.pos[i * 3 + 2] += s.vel[i * 3 + 2] * dt;
    if (s.pos[i * 3 + 1] < 0.05 && s.grav[i] > 0) { s.pos[i * 3 + 1] = 0.05; s.vel[i * 3 + 1] *= -0.3; s.vel[i * 3] *= 0.6; s.vel[i * 3 + 2] *= 0.6; }
    s.col[i * 4 + 3] = s.a0[i] * Math.min(1, (s.life[i] / s.max[i]) * 1.6);
  }
  if (any || s.active) { s.pa.needsUpdate = true; s.ca.needsUpdate = true; }
  s.active = any;
}

// bullet streaks: one line segment per live bullet
const STREAK_CAP = 96;
const streakPos = new Float32Array(STREAK_CAP * 6), streakCol = new Float32Array(STREAK_CAP * 8);
const streakGeo = new THREE.BufferGeometry();
streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPos, 3).setUsage(THREE.DynamicDrawUsage));
streakGeo.setAttribute('color', new THREE.BufferAttribute(streakCol, 4).setUsage(THREE.DynamicDrawUsage));
const streaks = new THREE.LineSegments(streakGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
streaks.frustumCulled = false; scene.add(streaks);

// world flashes (explosions)
const flashes = [];
const flashMat = new THREE.SpriteMaterial({ map: softTex, color: srgb(1, 0.75, 0.4), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
function worldFlash(x, y, z, size, life) {
  const s = new THREE.Sprite(flashMat.clone()); s.position.set(x, y, z); s.scale.setScalar(size * 0.4);
  scene.add(s); flashes.push({ s, t: 0, life, size });
}
function updateFlashes(dt) {
  for (let i = flashes.length - 1; i >= 0; i--) {
    const f = flashes[i]; f.t += dt;
    const k = f.t / f.life;
    if (k >= 1) { scene.remove(f.s); f.s.material.dispose(); flashes.splice(i, 1); continue; }
    f.s.scale.setScalar(f.size * (0.4 + k * 0.8)); f.s.material.opacity = 1 - k;
  }
}

// trauma shake (camera only, never the body) + hit-stop
function addTrauma(a) { FX.trauma = clamp(FX.trauma + a, 0, 1); }
function shakeAt(x, z, strength, range) { const d = Math.hypot(x - P.x, z - P.z); if (d < range) addTrauma(strength * (1 - d / range)); }
function hitStop(sec) { FX.hitStop = Math.max(FX.hitStop, sec); }
const SHAKE = { p: 0, y: 0, r: 0 };
function updateShake(dt) {
  FX.trauma = Math.max(0, FX.trauma - 1.3 * dt);
  FX.shakeT += dt * 30;
  const s = FX.trauma * FX.trauma;
  SHAKE.p = 0.035 * s * Math.sin(FX.shakeT * 1.7);
  SHAKE.y = 0.035 * s * Math.sin(FX.shakeT * 2.3 + 1);
  SHAKE.r = 0.03 * s * Math.sin(FX.shakeT * 1.1 + 2);
}

function puff(x, y, z, kind) {
  if (kind === 'blood') {
    for (let k = 0; k < 6; k++) emit(FX.bits, x, y, z, rand(-2, 2), rand(0, 3), rand(-2, 2), rand(0.3, 0.6), 0.42, 0.55, 0.22, 1, 9, 1);
  } else if (kind === 'wall') {
    for (let k = 0; k < 5; k++) emit(FX.bits, x, y, z, rand(-1.5, 1.5), rand(0, 2.5), rand(-1.5, 1.5), rand(0.3, 0.6), 0.75, 0.72, 0.66, 1, 9, 1);
    emit(FX.dust, x, y, z, rand(-0.3, 0.3), rand(0.2, 0.6), rand(-0.3, 0.3), 0.8, 0.7, 0.68, 0.64, 0.35, 0, 1);
  } else {
    for (let k = 0; k < 4; k++) emit(FX.bits, x, y + 0.05, z, rand(-1, 1), rand(1, 3), rand(-1, 1), rand(0.3, 0.5), 0.45, 0.4, 0.33, 1, 9, 1);
  }
}
function collapseDust(b) {
  const per = b.pts.reduce((a, p, i) => a + Math.hypot(b.pts[(i + 1) % b.pts.length][0] - p[0], b.pts[(i + 1) % b.pts.length][1] - p[1]), 0);
  const n = clamp(Math.round(per / 1.5), 20, 110);
  for (let k = 0; k < n; k++) {
    const e = (Math.random() * b.pts.length) | 0, a = b.pts[e], c = b.pts[(e + 1) % b.pts.length], t = Math.random();
    const x = lerp(a[0], c[0], t), z = lerp(a[1], c[1], t);
    const ox = x - b.cx, oz = z - b.cz, l = Math.hypot(ox, oz) || 1;
    emit(FX.dust, x, rand(0.5, b.H * 0.8), z, (ox / l) * rand(1, 4), rand(0.3, 2), (oz / l) * rand(1, 4), rand(2.2, 3.8), 0.62, 0.59, 0.55, 0.55, 0, 0.9);
  }
  for (let k = 0; k < 40; k++) emit(FX.bits, rand(b.minX, b.maxX), rand(1, b.H), rand(b.minZ, b.maxZ), rand(-3, 3), rand(1, 5), rand(-3, 3), rand(0.8, 1.6), 0.55, 0.5, 0.46, 1, 9.8, 0.5);
}
function explosionFx(x, y, z) {
  worldFlash(x, y + 0.5, z, 16, 0.35);
  for (let k = 0; k < 40; k++) emit(FX.glow, x, y + 0.3, z, rand(-9, 9), rand(2, 10), rand(-9, 9), rand(0.2, 0.5), 1, 0.6, 0.2, 1, 9, 2);
  for (let k = 0; k < 26; k++) emit(FX.dust, x, y + 0.5, z, rand(-5, 5), rand(1, 5), rand(-5, 5), rand(1.5, 2.8), 0.35, 0.33, 0.31, 0.6, 0, 1.4);
  for (let k = 0; k < 30; k++) emit(FX.bits, x, y + 0.3, z, rand(-8, 8), rand(3, 10), rand(-8, 8), rand(0.6, 1.2), 0.3, 0.28, 0.25, 1, 9.8, 0.3);
}
