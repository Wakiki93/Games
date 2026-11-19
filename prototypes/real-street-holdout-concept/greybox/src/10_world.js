// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Renderer, lights, level geometry (ground, roads, merged buildings), spatial queries, street names, sectors.

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
renderer.setSize(innerWidth, innerHeight, false);
renderer.autoClear = false;
if (SHADOWS) { renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; }

const scene = new THREE.Scene();
scene.background = new THREE.Color();
scene.fog = new THREE.Fog(0x999999, 90, 520);
const BASE_FOV = 75;
const camera = new THREE.PerspectiveCamera(BASE_FOV, innerWidth / innerHeight, 0.1, 900);
camera.rotation.order = 'YXZ';
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 2.2);
sun.castShadow = SHADOWS;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -80, right: 80, top: 80, bottom: -80, near: 1, far: 400 });
sun.shadow.bias = -0.0006;
sun.shadow.normalBias = 0.03;
scene.add(sun, sun.target);

const vmScene = new THREE.Scene();
const vmCamera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.01, 10);
vmScene.add(new THREE.HemisphereLight(0xffffff, 0x445055, 1.8));
const vmSun = new THREE.DirectionalLight(0xffffff, 1.4);
vmSun.position.set(1, 2, 1.5);
vmScene.add(vmSun);

function onResize() {
  camera.aspect = vmCamera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  vmCamera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight, false);
}
addEventListener('resize', onResize);

function applyLighting(round) {
  const t = clamp((round - 1) / 9, 0, 1) * 2;
  const a = LIGHT_KEYS[Math.min(1, Math.floor(t))], b = LIGHT_KEYS[Math.min(2, Math.floor(t) + 1)];
  const f = t - Math.floor(t);
  const mix = (k) => [0, 1, 2].map((i) => lerp(a[k][i], b[k][i], f));
  const sky = mix('sky');
  scene.background.copy(srgb(...sky));
  scene.fog.color.copy(scene.background);
  scene.fog.near = lerp(a.fogNear, b.fogNear, f);
  scene.fog.far = lerp(a.fogFar, b.fogFar, f);
  hemi.color.copy(srgb(...mix('hemiSky')));
  hemi.groundColor.copy(srgb(...mix('hemiGround')));
  hemi.intensity = lerp(a.hemi, b.hemi, f);
  sun.color.copy(srgb(...mix('sun')));
  sun.intensity = lerp(a.sunI, b.sunI, f);
  LIGHT.el = lerp(a.sunEl, b.sunEl, f);
}
const LIGHT = { el: 0.85, az: -2.3 };

// ---------------------------------------------------------------- coordinates & play area
const PLAY = LEVEL.play;                                          // level coords (x east, y north)
const WB = { minX: PLAY.minX, maxX: PLAY.maxX, minZ: -PLAY.maxY, maxZ: -PLAY.minY };   // world x/z (z = -north)

function pointInPoly(pts, x, z) {
  let c = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const xi = pts[i][0], zi = pts[i][1], xj = pts[j][0], zj = pts[j][1];
    if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) c = !c;
  }
  return c;
}
const CP = { x: 0, z: 0, nx: 0, nz: 0 };
function closestOnPoly(pts, x, z, out) {
  let best = Infinity;
  for (let i = 0, n = pts.length; i < n; i++) {
    const a = pts[i], b = pts[(i + 1) % n];
    const ex = b[0] - a[0], ez = b[1] - a[1];
    const l2 = ex * ex + ez * ez || 1e-9;
    const t = clamp(((x - a[0]) * ex + (z - a[1]) * ez) / l2, 0, 1);
    const px = a[0] + ex * t, pz = a[1] + ez * t;
    const d2 = (x - px) * (x - px) + (z - pz) * (z - pz);
    if (d2 < best) { best = d2; out.x = px; out.z = pz; const l = Math.sqrt(l2); out.nx = -ez / l; out.nz = ex / l; }
  }
  return best;
}

// ---------------------------------------------------------------- buildings (records)
const KIND_LABEL = { house: 'House', garage: 'Garage', apartments: 'Apartments', yes: 'Building' };
const buildings = LEVEL.buildings.map((src, i) => {
  const pts = src.footprint.map((q) => [q[0], -q[1]]);
  let cx = 0, cz = 0, minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const p of pts) {
    cx += p[0]; cz += p[1];
    minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minZ = Math.min(minZ, p[1]); maxZ = Math.max(maxZ, p[1]);
  }
  cx /= pts.length; cz /= pts.length;
  const maxHp = Math.round(CFG.building.hpBase + src.area_m2 * CFG.building.hpPerM2);
  const kindCol = src.kind === 'house' ? [0.74, 0.70, 0.64] : src.kind === 'garage' ? [0.56, 0.56, 0.54] : [0.66, 0.67, 0.69];
  const j = rand(-0.05, 0.05);
  return {
    i, kind: src.kind, label: KIND_LABEL[src.kind] || 'Building', pts, cx, cz, area: src.area_m2,
    H: src.height_m, h: src.height_m, hp: maxHp, maxHp, state: 0, reinforced: false, by: null,
    minX, maxX, minZ, maxZ, v0: 0, vn: 0, e0: 0, en: 0, collapseT: 0, cells: [], street: null,
    lean: [rand(-1, 1), rand(-1, 1)],
    wall: kindCol.map((c) => c + j), roof: [0.40 + j, 0.39 + j, 0.40 + j],
  };
});

// spatial hash (16 m)
const BH = 16;
const BH_NX = Math.ceil((WB.maxX - WB.minX) / BH) + 1, BH_NZ = Math.ceil((WB.maxZ - WB.minZ) / BH) + 1;
const bHash = Array.from({ length: BH_NX * BH_NZ }, () => []);
for (const b of buildings) {
  const x0 = clamp(Math.floor((b.minX - WB.minX) / BH), 0, BH_NX - 1), x1 = clamp(Math.floor((b.maxX - WB.minX) / BH), 0, BH_NX - 1);
  const z0 = clamp(Math.floor((b.minZ - WB.minZ) / BH), 0, BH_NZ - 1), z1 = clamp(Math.floor((b.maxZ - WB.minZ) / BH), 0, BH_NZ - 1);
  for (let iz = z0; iz <= z1; iz++) for (let ix = x0; ix <= x1; ix++) bHash[ix + iz * BH_NX].push(b.i);
}
let qStamp = 1;
const bStamp = new Int32Array(buildings.length);
function buildingsNear(x, z, r, out) {
  out.length = 0;
  qStamp++;
  const x0 = clamp(Math.floor((x - r - WB.minX) / BH), 0, BH_NX - 1), x1 = clamp(Math.floor((x + r - WB.minX) / BH), 0, BH_NX - 1);
  const z0 = clamp(Math.floor((z - r - WB.minZ) / BH), 0, BH_NZ - 1), z1 = clamp(Math.floor((z + r - WB.minZ) / BH), 0, BH_NZ - 1);
  for (let iz = z0; iz <= z1; iz++) for (let ix = x0; ix <= x1; ix++) {
    for (const k of bHash[ix + iz * BH_NX]) if (bStamp[k] !== qStamp) { bStamp[k] = qStamp; out.push(buildings[k]); }
  }
  return out;
}
function distToBuilding(b, x, z) {
  if (pointInPoly(b.pts, x, z)) return 0;
  return Math.sqrt(closestOnPoly(b.pts, x, z, CP));
}

const _colNear = [];
function collideCircle(p, r) {        // pushes p {x,z} out of standing (non-rubble) buildings
  for (let it = 0; it < 3; it++) {
    let moved = false;
    for (const b of buildingsNear(p.x, p.z, r + 1, _colNear)) {
      if (b.state === 2) continue;
      if (p.x < b.minX - r || p.x > b.maxX + r || p.z < b.minZ - r || p.z > b.maxZ + r) continue;
      const inside = pointInPoly(b.pts, p.x, p.z);
      const d2 = closestOnPoly(b.pts, p.x, p.z, CP);
      if (inside) {
        p.x = CP.x + CP.nx * r * 1.01; p.z = CP.z + CP.nz * r * 1.01; moved = true;
      } else if (d2 < r * r) {
        const d = Math.sqrt(d2) || 1e-4;
        p.x = CP.x + ((p.x - CP.x) / d) * r; p.z = CP.z + ((p.z - CP.z) / d) * r; moved = true;
      }
    }
    if (!moved) break;
  }
  p.x = clamp(p.x, WB.minX + 1, WB.maxX - 1);
  p.z = clamp(p.z, WB.minZ + 1, WB.maxZ - 1);
}

// ray vs building prisms (DDA over the hash); returns distance or Infinity, details in RH
const RH = { t: Infinity, b: null, nx: 0, nz: 0, roof: false };
function rayBuildings(ox, oy, oz, dx, dy, dz, maxD, ignoreRubble) {
  RH.t = Infinity; RH.b = null;
  qStamp++;
  let ix = Math.floor((ox - WB.minX) / BH), iz = Math.floor((oz - WB.minZ) / BH);
  const sx = dx > 0 ? 1 : -1, sz = dz > 0 ? 1 : -1;
  const tdx = Math.abs(dx) > 1e-9 ? Math.abs(BH / dx) : Infinity, tdz = Math.abs(dz) > 1e-9 ? Math.abs(BH / dz) : Infinity;
  let tmx = Math.abs(dx) > 1e-9 ? (WB.minX + (ix + (dx > 0 ? 1 : 0)) * BH - ox) / dx : Infinity;
  let tmz = Math.abs(dz) > 1e-9 ? (WB.minZ + (iz + (dz > 0 ? 1 : 0)) * BH - oz) / dz : Infinity;
  let t = 0, guard = 0;
  while (t <= Math.min(maxD, RH.t) && guard++ < 400) {
    if (ix >= 0 && iz >= 0 && ix < BH_NX && iz < BH_NZ) {
      for (const k of bHash[ix + iz * BH_NX]) {
        if (bStamp[k] === qStamp) continue;
        bStamp[k] = qStamp;
        const b = buildings[k];
        if (ignoreRubble && b.state === 2) continue;
        rayVsBuilding(b, ox, oy, oz, dx, dy, dz);
      }
    }
    if (tmx < tmz) { t = tmx; tmx += tdx; ix += sx; } else { t = tmz; tmz += tdz; iz += sz; }
    if ((ix < -1 && sx < 0) || (iz < -1 && sz < 0) || (ix > BH_NX && sx > 0) || (iz > BH_NZ && sz > 0)) break;
  }
  if (RH.t > maxD) { RH.t = Infinity; RH.b = null; }
  return RH.t;
}
function rayVsBuilding(b, ox, oy, oz, dx, dy, dz) {
  const h = b.state === 2 ? CFG.building.rubbleH : b.h;
  const pts = b.pts, n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[i], c = pts[(i + 1) % n];
    const ex = c[0] - a[0], ez = c[1] - a[1];
    const den = dx * ez - dz * ex;
    if (Math.abs(den) < 1e-9) continue;
    const wx = a[0] - ox, wz = a[1] - oz;
    const t = (wx * ez - wz * ex) / den;
    if (t < 0 || t >= RH.t) continue;
    const u = (wx * dz - wz * dx) / den;
    if (u < 0 || u > 1) continue;
    const y = oy + dy * t;
    if (y < 0 || y > h) continue;
    const l = Math.hypot(ex, ez) || 1;
    RH.t = t; RH.b = b; RH.nx = -ez / l; RH.nz = ex / l; RH.roof = false;
  }
  if (dy < -1e-6 && oy > h) {
    const t = (h - oy) / dy;
    if (t >= 0 && t < RH.t && pointInPoly(pts, ox + dx * t, oz + dz * t)) { RH.t = t; RH.b = b; RH.nx = 0; RH.nz = 0; RH.roof = true; }
  }
}
function losClear(ax, ay, az, bx, by, bz) {
  const dx = bx - ax, dy = by - ay, dz = bz - az, d = Math.hypot(dx, dy, dz) || 1e-6;
  return rayBuildings(ax, ay, az, dx / d, dy / d, dz / d, d, true) === Infinity;
}

// ---------------------------------------------------------------- merged building mesh
const bMat = new THREE.MeshLambertMaterial({ vertexColors: true });
let bGeo, bMesh, bPosA, bColA, bBase, bFlag, bShade, bRoof, bJit;
let eGeo, eLines, ePosA, eColA, eBase, eFlag, eJit;
(function buildBuildingMesh() {
  let nv = 0, ne = 0;
  const roofTris = [];
  for (const b of buildings) {
    const contour = b.pts.map((p) => new THREE.Vector2(p[0], -p[1]));
    const tris = THREE.ShapeUtils.triangulateShape(contour, []);
    roofTris.push(tris);
    nv += b.pts.length * 6 + tris.length * 3;
    ne += b.pts.length * 4;
  }
  const pos = new Float32Array(nv * 3), nor = new Float32Array(nv * 3), col = new Float32Array(nv * 3);
  bBase = new Float32Array(nv * 2); bFlag = new Uint8Array(nv); bShade = new Float32Array(nv); bRoof = new Uint8Array(nv); bJit = new Float32Array(nv);
  const epos = new Float32Array(ne * 3), ecol = new Float32Array(ne * 3);
  eBase = new Float32Array(ne * 2); eFlag = new Uint8Array(ne); eJit = new Float32Array(ne);
  let v = 0, e = 0;
  const putV = (x, z, f, nx, ny, nz, shade, roof, jit) => {
    bBase[v * 2] = x; bBase[v * 2 + 1] = z; bFlag[v] = f; bShade[v] = shade; bRoof[v] = roof; bJit[v] = jit;
    nor[v * 3] = nx; nor[v * 3 + 1] = ny; nor[v * 3 + 2] = nz; v++;
  };
  const putE = (x, z, f, jit) => { eBase[e * 2] = x; eBase[e * 2 + 1] = z; eFlag[e] = f; eJit[e] = jit; e++; };
  buildings.forEach((b, bi) => {
    const p = b.pts, n = p.length;
    const jit = p.map(() => rand(-0.45, 0.5));
    b.v0 = v; b.e0 = e;
    for (let i = 0; i < n; i++) {
      const k = (i + 1) % n, A = p[i], B = p[k];
      const ex = B[0] - A[0], ez = B[1] - A[1], l = Math.hypot(ex, ez) || 1;
      const nx = -ez / l, nz = ex / l;
      // (A0,B0,B1) (A0,B1,A1): outward-facing for CCW footprints
      putV(A[0], A[1], 0, nx, 0, nz, 0.62, 0, jit[i]); putV(B[0], B[1], 0, nx, 0, nz, 0.62, 0, jit[k]); putV(B[0], B[1], 1, nx, 0, nz, 1, 0, jit[k]);
      putV(A[0], A[1], 0, nx, 0, nz, 0.62, 0, jit[i]); putV(B[0], B[1], 1, nx, 0, nz, 1, 0, jit[k]); putV(A[0], A[1], 1, nx, 0, nz, 1, 0, jit[i]);
      putE(A[0], A[1], 1, jit[i]); putE(B[0], B[1], 1, jit[k]);
      putE(A[0], A[1], 0, 0); putE(A[0], A[1], 1, jit[i]);
    }
    for (const t of roofTris[bi]) {
      let [i0, i1, i2] = t;
      const ux = p[i1][0] - p[i0][0], uz = p[i1][1] - p[i0][1], wx = p[i2][0] - p[i0][0], wz = p[i2][1] - p[i0][1];
      if (uz * wx - ux * wz < 0) { const s = i1; i1 = i2; i2 = s; }       // normal must point up
      for (const ii of [i0, i1, i2]) putV(p[ii][0], p[ii][1], 1, 0, 1, 0, 1, 1, jit[ii]);
    }
    b.vn = v - b.v0; b.en = e - b.e0;
  });
  bGeo = new THREE.BufferGeometry();
  bPosA = new THREE.BufferAttribute(pos, 3); bPosA.setUsage(THREE.DynamicDrawUsage);
  bColA = new THREE.BufferAttribute(col, 3); bColA.setUsage(THREE.DynamicDrawUsage);
  bGeo.setAttribute('position', bPosA); bGeo.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); bGeo.setAttribute('color', bColA);
  bMesh = new THREE.Mesh(bGeo, bMat);
  bMesh.frustumCulled = false; bMesh.castShadow = SHADOWS; bMesh.receiveShadow = SHADOWS;
  scene.add(bMesh);
  eGeo = new THREE.BufferGeometry();
  ePosA = new THREE.BufferAttribute(epos, 3); ePosA.setUsage(THREE.DynamicDrawUsage);
  eColA = new THREE.BufferAttribute(ecol, 3); eColA.setUsage(THREE.DynamicDrawUsage);
  eGeo.setAttribute('position', ePosA); eGeo.setAttribute('color', eColA);
  eLines = new THREE.LineSegments(eGeo, new THREE.LineBasicMaterial({ vertexColors: true }));
  eLines.frustumCulled = false;
  scene.add(eLines);
  for (const b of buildings) { writeBuildingVerts(b, b.H, 0, 0, false); paintBuilding(b); }
})();

function writeBuildingVerts(b, h, ox, oz, rubble) {
  const P = bPosA.array, rh = CFG.building.rubbleH;
  for (let v = b.v0, end = b.v0 + b.vn; v < end; v++) {
    const f = bFlag[v];
    P[v * 3] = bBase[v * 2] + ox * f;
    P[v * 3 + 1] = rubble ? (f ? rh + bJit[v] : 0) : f * h;
    P[v * 3 + 2] = bBase[v * 2 + 1] + oz * f;
  }
  bPosA.addUpdateRange(b.v0 * 3, b.vn * 3); bPosA.needsUpdate = true;
  const E = ePosA.array;
  for (let v = b.e0, end = b.e0 + b.en; v < end; v++) {
    const f = eFlag[v];
    E[v * 3] = eBase[v * 2] + ox * f;
    E[v * 3 + 1] = (rubble ? (f ? rh + eJit[v] : 0) : f * h) + 0.02;
    E[v * 3 + 2] = eBase[v * 2 + 1] + oz * f;
  }
  ePosA.addUpdateRange(b.e0 * 3, b.en * 3); ePosA.needsUpdate = true;
}

const C_OWN = [0.95, 0.76, 0.19], C_DANGER = [0.85, 0.16, 0.12], C_RUB_W = [0.42, 0.38, 0.34], C_RUB_R = [0.47, 0.43, 0.38];
let aimedBuilding = null;
function paintBuilding(b) {
  let wall = b.wall.slice(), roof = b.roof.slice(), edge = [0.13, 0.14, 0.15];
  const mixc = (c, t, k) => { for (let i = 0; i < 3; i++) c[i] = lerp(c[i], t[i], k); };
  if (b.state === 2) { wall = C_RUB_W.slice(); roof = C_RUB_R.slice(); edge = [0.25, 0.22, 0.2]; }
  else {
    const frac = b.hp / b.maxHp;
    if (b.reinforced) { mixc(wall, C_OWN, 0.38); mixc(roof, C_OWN, 0.3); edge = C_OWN.slice(); }
    if (frac < 1) mixc(wall, [0.25, 0.23, 0.22], (1 - frac) * 0.55);
    if (frac < 0.35 || b.state === 1) { mixc(wall, C_DANGER, 0.45); edge = C_DANGER.slice(); }
    if (b === aimedBuilding) { for (let i = 0; i < 3; i++) { wall[i] = Math.min(1, wall[i] * 1.22 + 0.04); roof[i] = Math.min(1, roof[i] * 1.2 + 0.04); } }
  }
  const cw = srgb(...wall), cr = srgb(...roof), ce = srgb(...edge);
  const C = bColA.array;
  for (let v = b.v0, end = b.v0 + b.vn; v < end; v++) {
    const c = bRoof[v] ? cr : cw, s = bShade[v];
    C[v * 3] = c.r * s; C[v * 3 + 1] = c.g * s; C[v * 3 + 2] = c.b * s;
  }
  bColA.addUpdateRange(b.v0 * 3, b.vn * 3); bColA.needsUpdate = true;
  const E = eColA.array;
  for (let v = b.e0, end = b.e0 + b.en; v < end; v++) { E[v * 3] = ce.r; E[v * 3 + 1] = ce.g; E[v * 3 + 2] = ce.b; }
  eColA.addUpdateRange(b.e0 * 3, b.en * 3); eColA.needsUpdate = true;
}

// rubble chunks (instanced boxes)
const RUBBLE_CAP = 6000;
const rubbleMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: srgb(0.5, 0.46, 0.42) }), RUBBLE_CAP);
rubbleMesh.count = 0; rubbleMesh.frustumCulled = false; rubbleMesh.castShadow = SHADOWS; rubbleMesh.receiveShadow = SHADOWS;
scene.add(rubbleMesh);
const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _v3 = new THREE.Vector3(), _s3 = new THREE.Vector3();
function addRubbleChunks(b) {
  const n = clamp(Math.round(b.area / 18), 5, 22);
  for (let k = 0; k < n && rubbleMesh.count < RUBBLE_CAP; k++) {
    let x = 0, z = 0;
    for (let tries = 0; tries < 8; tries++) {
      x = rand(b.minX, b.maxX); z = rand(b.minZ, b.maxZ);
      if (pointInPoly(b.pts, x, z)) break;
    }
    const s = rand(0.5, 1.6);
    _e.set(rand(-0.6, 0.6), rand(0, 3.14), rand(-0.6, 0.6));
    _m4.compose(_v3.set(x, CFG.building.rubbleH + s * 0.25, z), _q.setFromEuler(_e), _s3.set(s * rand(0.8, 1.8), s * 0.6, s));
    rubbleMesh.setMatrixAt(rubbleMesh.count++, _m4);
  }
  rubbleMesh.instanceMatrix.needsUpdate = true;
}

// ---------------------------------------------------------------- ground, roads, labels
function triUp(arr, x0, z0, x1, z1, x2, z2, y) {
  const ux = x1 - x0, uz = z1 - z0, wx = x2 - x0, wz = z2 - z0;
  if (uz * wx - ux * wz < 0) arr.push(x0, y, z0, x2, y, z2, x1, y, z1);
  else arr.push(x0, y, z0, x1, y, z1, x2, y, z2);
}
function ribbon(arr, pts, w, y) {
  const hw = w / 2;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    const dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1;
    const nx = (-dz / l) * hw, nz = (dx / l) * hw;
    triUp(arr, a[0] + nx, a[1] + nz, a[0] - nx, a[1] - nz, b[0] - nx, b[1] - nz, y);
    triUp(arr, a[0] + nx, a[1] + nz, b[0] - nx, b[1] - nz, b[0] + nx, b[1] + nz, y);
  }
  for (let i = 0; i < pts.length; i++) {          // round joints and caps
    const c = pts[i];
    for (let k = 0; k < 8; k++) {
      const a0 = (k / 8) * Math.PI * 2, a1 = ((k + 1) / 8) * Math.PI * 2;
      triUp(arr, c[0], c[1], c[0] + Math.cos(a0) * hw, c[1] + Math.sin(a0) * hw, c[0] + Math.cos(a1) * hw, c[1] + Math.sin(a1) * hw, y);
    }
  }
}
function flatMesh(arr, color, layer) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
  g.computeVertexNormals();
  const m = new THREE.MeshLambertMaterial({ color: srgb(...color), polygonOffset: true, polygonOffsetFactor: -layer, polygonOffsetUnits: -layer * 4 });
  const mesh = new THREE.Mesh(g, m);
  mesh.receiveShadow = SHADOWS;
  scene.add(mesh);
  return mesh;
}
(function buildGround() {
  const W = WB.maxX - WB.minX + 1200, D = WB.maxZ - WB.minZ + 1200;
  const g = new THREE.PlaneGeometry(W, D);
  g.rotateX(-Math.PI / 2);
  const base = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ color: srgb(0.42, 0.45, 0.37) }));
  base.position.set((WB.minX + WB.maxX) / 2, 0, (WB.minZ + WB.maxZ) / 2);
  base.receiveShadow = SHADOWS;
  scene.add(base);
  const GROUND_COL = { grass: [0.46, 0.53, 0.38], park: [0.44, 0.56, 0.37], wood: [0.27, 0.37, 0.24], scrub: [0.45, 0.47, 0.33],
    water: [0.27, 0.44, 0.56], stream: [0.27, 0.44, 0.56], rail: [0.36, 0.33, 0.31] };
  const layers = {};
  for (const gr of LEVEL.ground) {
    const key = gr.kind in GROUND_COL ? gr.kind : 'grass';
    const L = layers[key] || (layers[key] = []);
    const y = key === 'water' || key === 'stream' ? 0.035 : key === 'rail' ? 0.06 : 0.02;
    if (gr.polygon) {
      const contour = gr.polygon.map((q) => new THREE.Vector2(q[0], q[1]));
      const tris = THREE.ShapeUtils.triangulateShape(contour, []);
      for (const t of tris) triUp(L, gr.polygon[t[0]][0], -gr.polygon[t[0]][1], gr.polygon[t[1]][0], -gr.polygon[t[1]][1], gr.polygon[t[2]][0], -gr.polygon[t[2]][1], y);
    } else if (gr.line) {
      ribbon(L, gr.line.map((q) => [q[0], -q[1]]), gr.width_m || 3, y);
    }
  }
  for (const k in layers) flatMesh(layers[k], GROUND_COL[k], k === 'water' || k === 'stream' ? 2 : k === 'rail' ? 3 : 1);
  const vehicle = [], foot = [];
  for (const r of LEVEL.roads) {
    const pts = r.points.map((q) => [q[0], -q[1]]);
    if (r.kind === 'footway' || r.kind === 'cycleway' || r.kind === 'path' || r.kind === 'pedestrian') ribbon(foot, pts, Math.min(r.width_m || 2, 2.5), 0.05);
    else ribbon(vehicle, pts, r.width_m || 7, 0.06);
  }
  flatMesh(foot, [0.58, 0.56, 0.52], 4);
  flatMesh(vehicle, [0.24, 0.24, 0.26], 5);
  // play-area edge: amber band
  const edgeMat = new THREE.MeshBasicMaterial({ color: srgb(1.0, 0.70, 0.28), transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false });
  const cx = (WB.minX + WB.maxX) / 2, cz = (WB.minZ + WB.maxZ) / 2, w = WB.maxX - WB.minX, d = WB.maxZ - WB.minZ;
  for (const [x, z, len, rot] of [[cx, WB.minZ, w, 0], [cx, WB.maxZ, w, 0], [WB.minX, cz, d, Math.PI / 2], [WB.maxX, cz, d, Math.PI / 2]]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(len, 3), edgeMat);
    m.position.set(x, 1.5, z); m.rotation.y = rot; scene.add(m);
  }
})();

// street segments index + painted street names
const streetSegs = [];
const SH = 32, SH_NX = Math.ceil((WB.maxX - WB.minX) / SH) + 1, SH_NZ = Math.ceil((WB.maxZ - WB.minZ) / SH) + 1;
const sHash = Array.from({ length: SH_NX * SH_NZ }, () => []);
for (const r of LEVEL.roads) {
  if (!r.name) continue;
  for (let i = 0; i < r.points.length - 1; i++) {
    const a = r.points[i], b = r.points[i + 1];
    const s = { ax: a[0], az: -a[1], bx: b[0], bz: -b[1], name: r.name, hw: (r.width_m || 6) / 2 };
    const k = streetSegs.push(s) - 1;
    const x0 = clamp(Math.floor((Math.min(s.ax, s.bx) - WB.minX) / SH), 0, SH_NX - 1), x1 = clamp(Math.floor((Math.max(s.ax, s.bx) - WB.minX) / SH), 0, SH_NX - 1);
    const z0 = clamp(Math.floor((Math.min(s.az, s.bz) - WB.minZ) / SH), 0, SH_NZ - 1), z1 = clamp(Math.floor((Math.max(s.az, s.bz) - WB.minZ) / SH), 0, SH_NZ - 1);
    for (let iz = z0; iz <= z1; iz++) for (let ix = x0; ix <= x1; ix++) sHash[ix + iz * SH_NX].push(k);
  }
}
function nearestStreet(x, z, maxD) {
  let best = maxD * maxD, bs = null;
  const rr = Math.ceil(maxD / SH);
  const cx = Math.floor((x - WB.minX) / SH), cz = Math.floor((z - WB.minZ) / SH);
  for (let iz = cz - rr; iz <= cz + rr; iz++) for (let ix = cx - rr; ix <= cx + rr; ix++) {
    if (ix < 0 || iz < 0 || ix >= SH_NX || iz >= SH_NZ) continue;
    for (const k of sHash[ix + iz * SH_NX]) {
      const s = streetSegs[k];
      const ex = s.bx - s.ax, ez = s.bz - s.az, l2 = ex * ex + ez * ez || 1e-9;
      const t = clamp(((x - s.ax) * ex + (z - s.az) * ez) / l2, 0, 1);
      const d2 = (x - s.ax - ex * t) ** 2 + (z - s.az - ez * t) ** 2;
      if (d2 < best) { best = d2; bs = s; }
    }
  }
  return bs ? { name: bs.name, d: Math.sqrt(best), hw: bs.hw } : null;
}
for (const b of buildings) { const s = nearestStreet(b.cx, b.cz, 120); b.street = s ? s.name : null; }
function buildingName(b) { return b.label + (b.street ? ' on ' + b.street : ''); }

(function streetLabels() {
  const texCache = {};
  const tex = (name) => {
    if (texCache[name]) return texCache[name];
    const c = document.createElement('canvas'); const ctx = c.getContext('2d');
    ctx.font = 'bold 64px sans-serif';
    const w = Math.ceil(ctx.measureText(name.toUpperCase()).width) + 24;
    c.width = w; c.height = 84;
    ctx.font = 'bold 64px sans-serif'; ctx.fillStyle = 'rgba(235,240,240,0.85)'; ctx.textBaseline = 'middle';
    ctx.fillText(name.toUpperCase(), 12, 44);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    return (texCache[name] = { t, aspect: w / 84 });
  };
  const mats = {};
  for (const r of LEVEL.roads) {
    if (!r.name || r.kind === 'footway' || r.kind === 'cycleway') continue;
    const T = tex(r.name);
    const H = Math.min(2.6, (r.width_m || 7) * 0.32), W = H * T.aspect;
    let acc = 30;
    for (let i = 0; i < r.points.length - 1; i++) {
      const a = r.points[i], b = r.points[i + 1];
      const ax = a[0], az = -a[1], bx = b[0], bz = -b[1];
      const len = Math.hypot(bx - ax, bz - az);
      while (acc + W / 2 < len) {
        if (acc > W / 2) {
          const t = acc / len, x = lerp(ax, bx, t), z = lerp(az, bz, t);
          let ang = Math.atan2(-(bz - az), bx - ax);
          if (ang > Math.PI / 2) ang -= Math.PI; if (ang < -Math.PI / 2) ang += Math.PI;
          const m = mats[r.name] || (mats[r.name] = new THREE.MeshBasicMaterial({ map: T.t, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -24 }));
          const mesh = new THREE.Mesh(new THREE.PlaneGeometry(W, H), m);
          mesh.rotation.set(-Math.PI / 2, 0, ang);       // lay flat, run along the road
          mesh.position.set(x, 0.08, z);
          scene.add(mesh);
        }
        acc += 110;
      }
      acc -= len;
    }
  }
})();

// ---------------------------------------------------------------- sectors (capture objectives at public places)
const sectors = LEVEL.sectors.map((s, i) => {
  const x = s.x, z = -s.y, r = s.r;
  const ringMat = new THREE.MeshBasicMaterial({ color: srgb(1, 0.7, 0.28), transparent: true, opacity: 0.25, depthWrite: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -7, polygonOffsetUnits: -28 });
  const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.6, r, 64), ringMat);
  ring.rotation.x = -Math.PI / 2; ring.position.set(x, 0.1, z);
  const fillMat = new THREE.MeshBasicMaterial({ color: srgb(1, 0.7, 0.28), transparent: true, opacity: 0.0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -7, polygonOffsetUnits: -28 });
  const fill = new THREE.Mesh(new THREE.CircleGeometry(r - 0.6, 48), fillMat);
  fill.rotation.x = -Math.PI / 2; fill.position.set(x, 0.1, z);
  const beamMat = new THREE.MeshBasicMaterial({ color: srgb(1, 0.72, 0.3), transparent: true, opacity: 0.0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 90, 8, 1, true), beamMat);
  beam.position.set(x, 45, z);
  scene.add(ring, fill, beam);
  return { i, name: s.name, kind: s.kind, x, z, r, ring, fill, beam, uses: 0 };
});
function inSector(s, x, z) { return (x - s.x) ** 2 + (z - s.z) ** 2 <= s.r * s.r; }

document.getElementById('attrib').textContent = LEVEL.attribution;
document.getElementById('mapName').textContent = LEVEL.name;
