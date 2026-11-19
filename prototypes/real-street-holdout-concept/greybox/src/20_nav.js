// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Coarse nav grid (2 m) + Dijkstra flow fields. Standing buildings block; rubble is passable but costs more.
// Breachers use a second cost set where standing buildings are passable at a high cost (they smash through).

const NAV = {
  cell: CFG.cell,
  W: Math.ceil((WB.maxX - WB.minX) / CFG.cell),
  H: Math.ceil((WB.maxZ - WB.minZ) / CFG.cell),
};
NAV.N = NAV.W * NAV.H;
NAV.bld = new Int16Array(NAV.N).fill(-1);
NAV.costN = new Float32Array(NAV.N).fill(1);
NAV.costB = new Float32Array(NAV.N).fill(1);
NAV.road = new Uint8Array(NAV.N);
NAV.field = { pN: new Float32Array(NAV.N), pB: new Float32Array(NAV.N), sN: new Float32Array(NAV.N), sB: new Float32Array(NAV.N), tmp: new Float32Array(NAV.N) };
NAV.back = { pN: new Float32Array(NAV.N), pB: new Float32Array(NAV.N), sN: new Float32Array(NAV.N), sB: new Float32Array(NAV.N) };
for (const k in NAV.field) NAV.field[k].fill(Infinity);
NAV.playerSrc = -1; NAV.dirtyP = true; NAV.dirtyS = true; NAV.timer = 0; NAV.sectorFor = null;
const NAVSTATS = { rebuilds: 0, totalMs: 0, maxMs: 0, lastMs: 0, afterDestruction: [], afterDestructionFrames: [], pendingDestruction: false, maxFrameMs: 0, marks: [], frame: 0 };
const RUBBLE_COST = 2.2, SMASH_COST = 3, SMASH_REINFORCED = 5;

const cellOf = (x, z) => clamp(Math.floor((x - WB.minX) / NAV.cell), 0, NAV.W - 1) + clamp(Math.floor((z - WB.minZ) / NAV.cell), 0, NAV.H - 1) * NAV.W;
const cellX = (c) => WB.minX + ((c % NAV.W) + 0.5) * NAV.cell;
const cellZ = (c) => WB.minZ + (((c / NAV.W) | 0) + 0.5) * NAV.cell;
const cellCheb = (a, b) => (b < 0 ? 1e9 : Math.max(Math.abs((a % NAV.W) - (b % NAV.W)), Math.abs(((a / NAV.W) | 0) - ((b / NAV.W) | 0))));

function setCellCost(c) {
  const k = NAV.bld[c];
  if (k < 0) { NAV.costN[c] = 1; NAV.costB[c] = 1; return; }
  const b = buildings[k];
  if (b.state === 2) { NAV.costN[c] = RUBBLE_COST; NAV.costB[c] = RUBBLE_COST; }
  else { NAV.costN[c] = Infinity; NAV.costB[c] = b.reinforced ? SMASH_REINFORCED : SMASH_COST; }
}
(function rasterize() {
  for (const b of buildings) {
    const x0 = clamp(Math.floor((b.minX - WB.minX) / NAV.cell), 0, NAV.W - 1), x1 = clamp(Math.floor((b.maxX - WB.minX) / NAV.cell), 0, NAV.W - 1);
    const z0 = clamp(Math.floor((b.minZ - WB.minZ) / NAV.cell), 0, NAV.H - 1), z1 = clamp(Math.floor((b.maxZ - WB.minZ) / NAV.cell), 0, NAV.H - 1);
    for (let iz = z0; iz <= z1; iz++) for (let ix = x0; ix <= x1; ix++) {
      const c = ix + iz * NAV.W;
      if (NAV.bld[c] >= 0) continue;
      if (pointInPoly(b.pts, cellX(c), cellZ(c))) { NAV.bld[c] = b.i; b.cells.push(c); }
    }
  }
  for (let c = 0; c < NAV.N; c++) setCellCost(c);
  for (const r of LEVEL.roads) {
    if (r.kind === 'footway' || r.kind === 'cycleway') continue;
    for (let i = 0; i < r.points.length - 1; i++) {
      const a = r.points[i], b = r.points[i + 1];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      for (let s = 0; s <= len; s += 1) {
        const t = len ? s / len : 0;
        const c = cellOf(lerp(a[0], b[0], t), -lerp(a[1], b[1], t));
        if (NAV.bld[c] < 0) NAV.road[c] = 1;
      }
    }
  }
  NAV.roadCells = [];
  for (let c = 0; c < NAV.N; c++) if (NAV.road[c]) NAV.roadCells.push(c);
})();

function navOnBuildingChanged(b) {
  for (const c of b.cells) {
    if (b.state === 2) {
      // a neighbour that still stands may share this cell
      const x = cellX(c), z = cellZ(c);
      for (const o of buildingsNear(x, z, 1, [])) if (o !== b && o.state !== 2 && pointInPoly(o.pts, x, z)) { NAV.bld[c] = o.i; break; }
    }
    setCellCost(c);
  }
  NAV.dirtyP = true; NAV.dirtyS = true;
  if (b.state === 2) {                 // measure the re-path caused by this collapse: only jobs started after it
    const names = new Set(['pN']);
    if (GAME.breacherAlive > 0) names.add('pB');
    if (GAME.sector) { names.add('sN'); if (GAME.breacherAlive > 0 || GAME.breachersQueued > 0) names.add('sB'); }
    NAVSTATS.marks.push({ names, ms: 0, frame0: NAVSTATS.frame });
  }
}

// ------------------------------------------------------------- Dijkstra (lazy binary heap), resumable
const DX = [1, -1, 0, 0, 1, 1, -1, -1], DZ = [0, 0, 1, -1, 1, -1, 1, -1];
function makeHeap(cap) { return { c: new Int32Array(cap), k: new Float32Array(cap), n: 0, cap }; }
const HEAP_JOB = makeHeap(1 << 20), HEAP_SYNC = makeHeap(1 << 20);
function dStart(st, dist, sources) {
  dist.fill(Infinity);
  st.heap.n = 0;
  for (const c of sources) if (dist[c] !== 0) { dist[c] = 0; hPush(st.heap, c, 0); }
}
function hPush(h, c, k) {
  if (h.n >= h.cap) return;
  const C = h.c, K = h.k;
  let i = h.n++;
  while (i > 0) { const p = (i - 1) >> 1; if (K[p] <= k) break; C[i] = C[p]; K[i] = K[p]; i = p; }
  C[i] = c; K[i] = k;
}
// runs until done (returns true) or until the deadline (returns false; call again to continue)
function dRun(st, deadline) {
  const h = st.heap, C = h.c, K = h.k, dist = st.dist, cost = st.cost, maxCost = st.maxCost;
  const W = NAV.W, H = NAV.H, cell = NAV.cell;
  let iter = 0;
  while (h.n > 0) {
    const c = C[0], k = K[0];
    const n = --h.n;
    if (n > 0) {
      const lc = C[n], lk = K[n];
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        if (l >= n) break;
        const r = l + 1, m = r < n && K[r] < K[l] ? r : l;
        if (K[m] >= lk) break;
        C[i] = C[m]; K[i] = K[m]; i = m;
      }
      C[i] = lc; K[i] = lk;
    }
    if (k > dist[c]) continue;
    if (k > maxCost) { h.n = 0; break; }
    const ix = c % W, iz = (c / W) | 0;
    for (let d = 0; d < 8; d++) {
      const nx = ix + DX[d], nz = iz + DZ[d];
      if (nx < 0 || nz < 0 || nx >= W || nz >= H) continue;
      const nc = nx + nz * W;
      const cc = cost[nc];
      if (cc === Infinity) continue;
      if (d >= 4 && (cost[nx + iz * W] === Infinity || cost[ix + nz * W] === Infinity)) continue;
      const nk = k + cc * (d >= 4 ? 1.4142 : 1) * cell;
      if (nk < dist[nc]) { dist[nc] = nk; hPush(h, nc, nk); }
    }
    if ((++iter & 1023) === 0 && deadline && performance.now() > deadline) return false;
  }
  return true;
}
function dijkstra(dist, sources, cost, maxCost) {      // synchronous (bot path planning)
  const st = { heap: HEAP_SYNC, dist, cost, maxCost };
  dStart(st, dist, sources);
  dRun(st, 0);
}

// next-cell direction from a field; returns false at a local minimum / unreachable
const FLOW = { x: 0, z: 0, cell: -1 };
function flowStep(field, x, z, out) {
  const W = NAV.W, H = NAV.H;
  const ix = clamp(Math.floor((x - WB.minX) / NAV.cell), 0, W - 1), iz = clamp(Math.floor((z - WB.minZ) / NAV.cell), 0, H - 1);
  let best = field[ix + iz * W], bi = -1;
  for (let d = 0; d < 8; d++) {
    const nx = ix + DX[d], nz = iz + DZ[d];
    if (nx < 0 || nz < 0 || nx >= W || nz >= H) continue;
    if (d >= 4 && (field[nx + iz * W] === Infinity || field[ix + nz * W] === Infinity)) continue;
    const v = field[nx + nz * W];
    if (v < best) { best = v; bi = nx + nz * W; }
  }
  if (bi < 0) return false;
  const dx = cellX(bi) - x, dz = cellZ(bi) - z, l = Math.hypot(dx, dz) || 1;
  out.x = dx / l; out.z = dz / l; out.cell = bi;
  return true;
}
function onRubble(x, z) { const k = NAV.bld[cellOf(x, z)]; return k >= 0 && buildings[k].state === 2; }

function sectorSources(s) {
  const out = [];
  const rr = Math.ceil((s.r * 0.45) / NAV.cell);
  const c0 = cellOf(s.x, s.z), ix0 = c0 % NAV.W, iz0 = (c0 / NAV.W) | 0;
  for (let dz = -rr; dz <= rr; dz++) for (let dx = -rr; dx <= rr; dx++) {
    const ix = ix0 + dx, iz = iz0 + dz;
    if (ix < 0 || iz < 0 || ix >= NAV.W || iz >= NAV.H) continue;
    const c = ix + iz * NAV.W;
    if (NAV.costN[c] !== Infinity && (dx * dx + dz * dz) <= rr * rr) out.push(c);
  }
  return out.length ? out : [c0];
}

// Flow-field jobs are time-sliced: at most NAV_BUDGET_MS of Dijkstra per rendered frame, written to a back buffer
// and swapped in when complete, so a destruction never causes a frame hitch.
const NAV_BUDGET_MS = 4;
NAV.jobs = []; NAV.cur = null;
NAVSTATS.cycleMs = 0; NAVSTATS.jobs = 0; NAVSTATS.cycleStartT = 0;
function queueJob(j, front) { if (!NAV.jobs.includes(j)) { if (front) NAV.jobs.unshift(j); else NAV.jobs.push(j); } }
function navUpdate(dt) {
  NAVSTATS.frame++;
  NAV.timer -= dt;
  const pc = cellOf(P.x, P.z);
  if (NAV.dirtyP || (cellCheb(pc, NAV.playerSrc) >= 3 && NAV.timer <= 0)) {
    queueJob('pN'); if (GAME.breacherAlive > 0) queueJob('pB');
    NAV.dirtyP = false; NAV.timer = 0.5; NAV.playerSrc = pc;
  }
  const sec = GAME.sector;
  if (sec && (NAV.dirtyS || NAV.sectorFor !== sec)) {
    queueJob('sN'); if (GAME.breacherAlive > 0 || GAME.breachersQueued > 0) queueJob('sB');
    NAV.dirtyS = false; NAV.sectorFor = sec;
  }
  const frameT0 = performance.now(), deadline = frameT0 + NAV_BUDGET_MS;
  while (performance.now() < deadline) {
    if (!NAV.cur) {
      const name = NAV.jobs.shift();
      if (!name) break;
      if ((name === 'sN' || name === 'sB') && !sec) continue;
      if (NAVSTATS.cycleMs === 0) NAVSTATS.cycleStartT = GAME.time;
      const isP = name === 'pN' || name === 'pB';
      NAV.cur = { name, startFrame: NAVSTATS.frame, heap: HEAP_JOB, dist: NAV.back[name], cost: name.endsWith('N') ? NAV.costN : NAV.costB, maxCost: isP ? 260 : 460, ms: 0 };
      dStart(NAV.cur, NAV.cur.dist, isP ? [cellOf(P.x, P.z)] : sectorSources(sec));
    }
    const t0 = performance.now();
    const done = dRun(NAV.cur, deadline);
    const ms = performance.now() - t0;
    NAV.cur.ms += ms; NAVSTATS.totalMs += ms; NAVSTATS.cycleMs += ms;
    if (!done) break;
    const j = NAV.cur; NAV.cur = null;
    const live = NAV.field[j.name]; NAV.field[j.name] = j.dist; NAV.back[j.name] = live;     // swap in
    NAVSTATS.jobs++; NAVSTATS.lastMs = j.ms; NAVSTATS.maxMs = Math.max(NAVSTATS.maxMs, j.ms);
    for (let m = NAVSTATS.marks.length - 1; m >= 0; m--) {
      const mk = NAVSTATS.marks[m];
      if (j.startFrame < mk.frame0 || !mk.names.has(j.name)) continue;
      mk.names.delete(j.name); mk.ms += j.ms;
      if (mk.names.size === 0) {
        NAVSTATS.afterDestruction.push(+mk.ms.toFixed(2));
        NAVSTATS.afterDestructionFrames.push(NAVSTATS.frame - mk.frame0 + 1);
        NAVSTATS.marks.splice(m, 1);
      }
    }
    if (NAV.jobs.length === 0) { NAVSTATS.rebuilds++; NAVSTATS.cycleMs = 0; }
  }
  NAVSTATS.maxFrameMs = Math.max(NAVSTATS.maxFrameMs, performance.now() - frameT0);
}
function forceBreacherFields() {      // first Breacher of a round: get its fields computed next
  queueJob('pB', true);
  if (GAME.sector) queueJob('sB', true);
}

// spawn: 60-120 m from the player, out of line of sight, reachable, prefer real street cells (ingress)
function pickSpawn() {
  const px = P.x, pz = P.z, ey = P.y;
  const band = [];
  for (const c of NAV.roadCells) {
    const dx = cellX(c) - px, dz = cellZ(c) - pz, d2 = dx * dx + dz * dz;
    if (d2 >= 3600 && d2 <= 14400 && NAV.field.pN[c] < 400) band.push(c);
  }
  let fallback = -1;
  for (let tries = 0; tries < 40; tries++) {
    let c;
    if (band.length && tries < 28) c = band[(Math.random() * band.length) | 0];
    else {
      const a = Math.random() * Math.PI * 2, d = rand(60, 120);
      c = cellOf(px + Math.cos(a) * d, pz + Math.sin(a) * d);
      if (NAV.costN[c] === Infinity || !(NAV.field.pN[c] < 400)) continue;
      const dd = Math.hypot(cellX(c) - px, cellZ(c) - pz);
      if (dd < 60 || dd > 120) continue;
    }
    const x = cellX(c), z = cellZ(c);
    if (fallback < 0) fallback = c;
    if (!losClear(px, ey, pz, x, 1.4, z)) return { x, z, hidden: true };
  }
  if (fallback >= 0) return { x: cellX(fallback), z: cellZ(fallback), hidden: false };
  const a = Math.random() * Math.PI * 2;
  const p = { x: px + Math.cos(a) * 90, z: pz + Math.sin(a) * 90 };
  collideCircle(p, 0.5);
  return { x: p.x, z: p.z, hidden: false };
}
