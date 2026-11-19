// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// HUD, objective widget, world markers, minimap, debug panel (F3 / D-pad down), buy screen, summary, pointer-lock flow.
// Labels follow the active device (DEVICE in 65_gamepad.js): controller by default, keyboard after real keyboard/mouse input.

const $ = (id) => document.getElementById(id);
const el = {
  hud: $('hud'), round: $('roundLbl'), zLeft: $('zLeft'), salvage: $('salvage'), pop: $('salvagePop'), obj: $('obj'), objTxt: $('objTxt'), objBar: $('objBar'),
  street: $('street'), toasts: $('toasts'), cross: $('cross'), hit: $('hitmark'), reddot: $('reddot'), scope: $('scope'), prompt: $('prompt'),
  ring: $('repairRing'), center: $('center'), hp: $('hpBar'), st: $('stBar'), status: $('statusLine'), weapon: $('weapon'), ammo: $('ammo'),
  attach: $('attach'), charges: $('charges'), map: $('minimap'), vig: $('vignette'), markers: $('markers'), debug: $('debug'),
  start: $('start'), pause: $('pause'), buy: $('buy'), buyGrid: $('buyGrid'), buyTimer: $('buyTimer'), buySalvage: $('buySalvage'), summary: $('summary'), sumStats: $('sumStats'),
};
const UI = {
  debugOn: false, mapOn: true, buyOpen: false, buySel: 0, freeLook: false, lockFails: 0, lockFailAt: 0, lockSeq: 0, grantedSeq: 0, everLocked: false, popT: 0, popSum: 0, hitT: 0, vig: 0, centerT: 0, stFlash: 0, fpsHist: [], dbgT: 0, mapT: 0,
  toggleDebug() { this.debugOn = !this.debugOn; el.debug.classList.toggle('hidden', !this.debugOn); },
  toggleMap() { this.mapOn = !this.mapOn; el.map.classList.toggle('hidden', !this.mapOn); },
  salvagePop(n, why) { this.popSum += n; this.popT = 1.2; el.pop.textContent = `+${this.popSum}  ${why || ''}`; },
  hitmarker(kill) { this.hitT = kill ? 0.25 : 0.12; el.hit.classList.toggle('kill', !!kill); },
  hurt(d) { this.vig = Math.min(1, this.vig + 0.25 + d / 60); },
  staminaFlash() { this.stFlash = 0.5; },
  onKey(e) {
    if (this.buyOpen) {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= SHOP.length) buyItem(SHOP[n - 1]);
      if (e.code === 'Enter') readyUp();
      if (e.code === 'Escape' || e.code === 'KeyB') { INPUT.once.delete('buy'); this.closeBuy(); }
    }
  },
  openBuy() {
    this.buyOpen = true; el.buy.classList.remove('hidden'); renderShop();
    if (!AUTOTEST && document.pointerLockElement) document.exitPointerLock();
  },
  closeBuy(fromRound) {
    if (!this.buyOpen) return;
    this.buyOpen = false; el.buy.classList.add('hidden');
    if (!AUTOTEST && GAME.phase !== 'dead') requestLock();
  },
  toggleBuy() {
    if (this.buyOpen) this.closeBuy();
    else if (GAME.phase === 'intermission' || GAME.phase === 'pre') this.openBuy();
    else toast('Buy screen is only available between rounds', 'bad');
  },
  showSummary() {
    if (!AUTOTEST && document.pointerLockElement) document.exitPointerLock();
    this.closeBuy(true);
    const rows = summaryRows();
    el.sumStats.innerHTML = rows.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');
    el.summary.classList.remove('hidden');
    UI.summaryShown = true;
  },
};
function summaryRows() {
  const acc = GAME.shots ? Math.round((GAME.hits / GAME.shots) * 100) + '%' : '-';
  return [
    ['Map', LEVEL.name], ['Rounds survived', Math.max(0, GAME.round - 1) + ` (died in round ${GAME.round})`], ['Kills (melee / headshot)', `${GAME.kills} (${GAME.meleeKills} / ${GAME.headshots})`],
    ['Buildings lost (horde / you)', `${GAME.destroyed} (${GAME.destroyedBy.breacher || 0} / ${GAME.destroyedBy.player || 0})`],
    ['Repositions after destruction', REPO.count + ` (of ${REPO.near} collapses within 30 m)`],
    ['Sectors captured / lost', `${GAME.sectorsCaptured} / ${GAME.sectorsLost}`], ['Sector held time', fmtTime(GAME.sectorHeldTotal)],
    ['Buildings reinforced / repairs', `${GAME.reinforced} / ${GAME.repairs}`], ['Parries / blocks', `${GAME.parries} / ${GAME.blocks}`],
    ['Pings used', GAME.pings], ['Accuracy', acc], ['Salvage earned / spent', `${GAME.salvageEarned} / ${GAME.salvageSpent}`], ['Time played', fmtTime(GAME.time)],
  ];
}
let toastId = 0;
function toast(msg, cls) {
  const d = document.createElement('div'); d.textContent = msg; if (cls) d.className = cls;
  el.toasts.appendChild(d);
  while (el.toasts.children.length > 4) el.toasts.removeChild(el.toasts.firstChild);
  const id = ++toastId;
  setTimeout(() => d.remove(), AUTOTEST ? 2500 : 4500);
  return id;
}
function centerMsg(big, small, dur) {
  el.center.innerHTML = `${big}${small ? `<small>${small}</small>` : ''}`;
  el.center.style.opacity = 1; UI.centerT = dur || 2.6;
}

// ------------------------------------------------------------- shop
function ownedSlot(it) { return it.slot && P.att[it.slot] === it.id; }
function itemCost(it) { return it.id === 'patch' ? patchNearbyCost(false).cost : it.cost; }
function renderShop() {
  el.buyGrid.innerHTML = '';
  const pad = DEVICE === 'pad';
  SHOP.forEach((it, i) => {
    const d = document.createElement('div');
    const cost = itemCost(it), owned = ownedSlot(it);
    const cant = owned || GAME.salvage < cost || (it.id === 'charge' && P.charges >= CFG.charge.max) || (it.id === 'patch' && cost === 0) || (it.id === 'ammo' && P.reserve >= CFG.rifle.reserve);
    d.className = 'item' + (owned ? ' owned' : '') + (cant ? ' cant' : '') + (i === UI.buySel ? ' sel' : '');     // .sel = controller highlight
    const extra = it.id === 'charge' ? ` (have ${P.charges})` : it.id === 'patch' ? (cost ? '' : ' (nothing damaged nearby)') : '';
    d.innerHTML = `<span class="c">${owned ? 'EQUIPPED' : cost + ' S'}</span><div class="n">${pad ? '' : `[${i + 1}] `}${it.name}${extra}</div><div class="d">${it.desc.replace('{throw}', pad ? 'RB' : 'G')}</div>`;
    d.onclick = () => buyItem(it);
    el.buyGrid.appendChild(d);
  });
}
function buyItem(it) {
  const cost = itemCost(it);
  if (ownedSlot(it)) return false;
  if (it.id === 'charge' && P.charges >= CFG.charge.max) return false;
  if (it.id === 'patch' && cost === 0) return false;
  if (it.id === 'ammo' && P.reserve >= CFG.rifle.reserve) return false;
  if (!spend(cost)) { toast('Not enough Salvage', 'bad'); return false; }
  if (it.slot) P.att[it.slot] = it.id;
  else if (it.id === 'charge') P.charges++;
  else if (it.id === 'ammo') P.reserve = CFG.rifle.reserve;
  else if (it.id === 'patch') patchNearbyCost(true);
  GAME.purchases.push(it.id);
  logEvent('buy', { item: it.id, cost });
  toast(`Bought ${it.name}  -${cost}`, 'own');
  renderShop();
  return true;
}
function readyUp() { if (GAME.phase === 'intermission' || GAME.phase === 'pre') { logEvent('ready_up', { skipped: +GAME.phaseT.toFixed(1) }); startRound(); } }
$('buyClose').onclick = () => UI.closeBuy();
$('buyReady').onclick = () => readyUp();
$('restartBtn').onclick = () => location.reload();
if (typeof HOLDOUT_HOSTED !== 'undefined') $('logBtn').classList.add('hidden');   // hosted viewers block page-started downloads
$('logBtn').onclick = () => {
  const blob = new Blob([JSON.stringify(sessionReport(), null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'holdout-session.json'; a.click();
};
function sessionReport() {
  return { map: LEVEL.name, summary: Object.fromEntries(summaryRows()), repositionsAfterDestruction: REPO.count, events: GAME.log };
}

// ------------------------------------------------------------- pointer lock / overlays
function setFreeLook(on) {
  UI.freeLook = !!on; UI.lockFails = 0;
  canvas.style.cursor = on ? 'crosshair' : '';
  if (on) {
    if (document.pointerLockElement) document.exitPointerLock();
    if (GAME.phase !== 'menu') { GAME.paused = false; el.pause.classList.add('hidden'); }
    toast('Free-look on: move the mouse to look, arrow keys also turn. [L] switches back.', 'own');
  } else if (GAME.phase !== 'menu' && GAME.phase !== 'dead' && !UI.buyOpen) requestLock();
}
function lockFailed(err) {             // browser lock cooldown, no user gesture, or a viewer that never allows capture
  if (AUTOTEST || UI.freeLook || padIsActive() || GAME.phase === 'menu' || GAME.phase === 'dead' || UI.buyOpen || document.pointerLockElement) return;
  const now = performance.now();
  if (now - UI.lockFailAt < 400) return;          // promise rejection + pointerlockerror for the same attempt count once
  UI.lockFailAt = now; UI.lockFails++;
  const blocked = /sandbox|not allowed|permission|denied/i.test(String(err && err.message || ''));
  // never captured in this session, or refused twice in a row: stop asking and fall back to free-look
  if (blocked || !UI.everLocked || UI.lockFails >= 2) { setFreeLook(true); return; }
  GAME.paused = true; el.pause.classList.remove('hidden');
}
function requestLock() {
  if (AUTOTEST) return;
  if (padIsActive()) return;           // controller is the active device: no mouse capture needed, Menu pauses and resumes
  if (UI.freeLook) { GAME.paused = false; el.pause.classList.add('hidden'); return; }
  if (!canvas.requestPointerLock) { setFreeLook(true); return; }
  const seq = ++UI.lockSeq;
  try { const r = canvas.requestPointerLock(); if (r && r.catch) r.catch(lockFailed); } catch (e) { lockFailed(e); }
  // some viewers neither grant nor reject: if this request was never granted, treat it as refused
  setTimeout(() => { if (UI.lockSeq === seq && UI.grantedSeq !== seq && !document.pointerLockElement) lockFailed(); }, 1200);
}
document.addEventListener('pointerlockerror', () => lockFailed());
el.start.addEventListener('click', () => {
  el.start.classList.add('hidden'); el.hud.classList.remove('hidden');
  if (GAME.phase === 'menu') startGame();
  requestLock();
});
el.pause.addEventListener('click', () => requestLock());
canvas.addEventListener('click', () => { if (!AUTOTEST && GAME.phase !== 'menu' && GAME.phase !== 'dead' && !UI.buyOpen) requestLock(); });
document.addEventListener('pointerlockchange', () => {
  const locked = document.pointerLockElement === canvas;
  if (locked) { UI.lockFails = 0; UI.everLocked = true; UI.grantedSeq = UI.lockSeq; }
  GAME.paused = !locked && !UI.freeLook && !UI.buyOpen && GAME.phase !== 'menu' && GAME.phase !== 'dead' && !AUTOTEST;
  el.pause.classList.toggle('hidden', !GAME.paused);
  if (!locked) { for (const k in KEYS) KEYS[k] = false; MOUSE.l = MOUSE.r = false; }
});

// ------------------------------------------------------------- markers (pings + objective)
const markerEls = [];
const _pv = new THREE.Vector3();
function placeMarker(i, cls, x, y, z, text) {
  let m = markerEls[i];
  if (!m) { m = document.createElement('div'); m.innerHTML = '<b></b><span></span>'; el.markers.appendChild(m); markerEls[i] = m; }
  _pv.set(x, y, z).project(camera);
  const behind = _pv.z > 1;
  let sx = (_pv.x * 0.5 + 0.5) * innerWidth, sy = (-_pv.y * 0.5 + 0.5) * innerHeight;
  if (behind) { sx = innerWidth - sx; sy = innerHeight - 30; }
  sx = clamp(sx, 20, innerWidth - 20); sy = clamp(sy, 40, innerHeight - 30);
  m.className = 'mk ' + cls; m.style.display = '';
  m.style.left = sx + 'px'; m.style.top = sy + 'px';
  m.lastChild.textContent = text;
}
function renderMarkers() {
  let n = 0;
  const s = GAME.sector;
  if (s && GAME.phase !== 'menu') {
    const d = Math.hypot(s.x - P.x, s.z - P.z);
    placeMarker(n++, 'sec', s.x, 4, s.z, `${GAME.phase === 'round' ? 'HOLD' : 'NEXT'}: ${s.name} ${Math.round(d)} m`);
  }
  for (let i = pings.length - 1; i >= 0; i--) {
    const p = pings[i];
    if (GAME.time > p.until || (p.kind === 'zom' && p.z.dead)) { pings.splice(i, 1); continue; }
    if (p.kind === 'zom') placeMarker(n++, 'zom', p.z.x, 2.3 * p.z.sc, p.z.z, `${p.label} ${Math.round(Math.hypot(p.z.x - P.x, p.z.z - P.z))} m`);
    else placeMarker(n++, 'bld', p.x, p.y + 1, p.z, `${p.label} ${Math.round(Math.hypot(p.x - P.x, p.z - P.z))} m`);
  }
  for (let i = n; i < markerEls.length; i++) markerEls[i].style.display = 'none';
}

// ------------------------------------------------------------- minimap (north up, 180 m across)
const mctx = el.map.getContext('2d');
function drawMinimap() {
  const W = el.map.width, S = W / 180, cx = W / 2;
  mctx.fillStyle = 'rgba(12,18,20,0.9)'; mctx.fillRect(0, 0, W, W);
  mctx.save(); mctx.translate(cx, cx); mctx.scale(S, S); mctx.translate(-P.x, -P.z);
  mctx.strokeStyle = 'rgba(160,170,175,0.55)'; mctx.lineWidth = 6;
  for (const sg of streetSegs) {
    if (Math.abs(sg.ax - P.x) > 140 && Math.abs(sg.bx - P.x) > 140) continue;
    if (Math.abs(sg.az - P.z) > 140 && Math.abs(sg.bz - P.z) > 140) continue;
    mctx.beginPath(); mctx.moveTo(sg.ax, sg.az); mctx.lineTo(sg.bx, sg.bz); mctx.stroke();
  }
  for (const b of buildingsNear(P.x, P.z, 130, [])) {
    mctx.beginPath(); mctx.moveTo(b.pts[0][0], b.pts[0][1]);
    for (let i = 1; i < b.pts.length; i++) mctx.lineTo(b.pts[i][0], b.pts[i][1]);
    mctx.closePath();
    if (b.state === 2) { mctx.fillStyle = 'rgba(110,95,80,0.55)'; mctx.fill(); }
    else {
      mctx.fillStyle = b.reinforced ? 'rgba(242,194,48,0.85)' : b.hp / b.maxHp < 0.35 ? 'rgba(255,70,54,0.8)' : 'rgba(205,210,212,0.75)';
      mctx.fill(); mctx.lineWidth = 0.6; mctx.strokeStyle = 'rgba(20,20,20,0.9)'; mctx.stroke();
    }
  }
  const s = GAME.sector;
  if (s) { mctx.beginPath(); mctx.arc(s.x, s.z, s.r, 0, 6.283); mctx.lineWidth = 2; mctx.strokeStyle = 'rgba(255,179,71,0.95)'; mctx.stroke(); }
  for (const z of zombies) {
    if (z.dead) continue;
    mctx.fillStyle = z.type === 2 ? '#ff3020' : 'rgba(150,200,90,0.95)';
    mctx.beginPath(); mctx.arc(z.x, z.z, z.type === 2 ? 2.6 : 1.6, 0, 6.283); mctx.fill();
  }
  mctx.restore();
  // edge arrow toward the objective when it is off the map
  if (s) {
    const dx = s.x - P.x, dz = s.z - P.z, d = Math.hypot(dx, dz);
    if (d * S > cx - 6) { mctx.fillStyle = '#ffb347'; mctx.beginPath(); mctx.arc(cx + (dx / d) * (cx - 8), cx + (dz / d) * (cx - 8), 4, 0, 6.283); mctx.fill(); }
  }
  mctx.save(); mctx.translate(cx, cx); mctx.rotate(-P.yaw);
  mctx.fillStyle = '#7fe7f2'; mctx.beginPath(); mctx.moveTo(0, -7); mctx.lineTo(5, 5); mctx.lineTo(-5, 5); mctx.closePath(); mctx.fill();
  mctx.restore();
  mctx.fillStyle = '#9ab'; mctx.font = '10px monospace'; mctx.fillText('N', cx - 3, 11);
}

// ------------------------------------------------------------- per-frame HUD
const FPS = { frames: 0, acc: 0, value: 0, min1s: 999, samples: [], minSample: Infinity };
function updateHUD(dt, realDt) {
  const W = wstats(), pad = DEVICE === 'pad';
  el.round.textContent = GAME.phase === 'pre' ? 'GET READY' : GAME.phase === 'intermission' ? `INTERMISSION ${Math.ceil(GAME.phaseT)}s` : `ROUND ${GAME.round}`;
  const left = GAME.phase === 'round' ? aliveCount() + (GAME.queue.length - GAME.queueIdx) : 0;
  el.zLeft.textContent = GAME.phase === 'round' ? `Zombies left: ${left}` : GAME.phase === 'pre' ? `Round 1 in ${Math.ceil(GAME.phaseT)} s${pad ? '  |  View: buy screen' : ''}` : GAME.phase === 'intermission' ? (pad ? 'View: buy screen (ready up there)' : '[B] buy  [Enter] ready') : '';
  el.salvage.textContent = `SALVAGE ${GAME.salvage}`;
  UI.popT -= realDt; if (UI.popT <= 0) { UI.popSum = 0; el.pop.textContent = ''; }
  // objective
  const s = GAME.sector;
  if (s) {
    const d = Math.round(Math.hypot(s.x - P.x, s.z - P.z));
    const head = GAME.phase === 'round' ? `OBJECTIVE ${GAME.secState}` : 'NEXT OBJECTIVE';
    el.objTxt.textContent = `${head}: ${s.name}  ${d} m  ${GAME.phase === 'round' && GAME.owner === 'player' ? `| bank ${Math.round(GAME.bank)} S` : ''}`;
    el.objBar.style.width = (GAME.prog * 100).toFixed(1) + '%';
    el.objBar.style.background = GAME.secState === 'OVERRUN' || GAME.secState === 'THREATENED' ? '#ff4636' : GAME.owner === 'player' ? '#ffb347' : '#7fe7f2';
    el.obj.classList.remove('hidden');
  } else el.obj.classList.add('hidden');
  // street-name label when looking at a road nearby
  aimDir(_ad);
  let label = '';
  if (_ad.y < -0.02) {
    const t = -P.y / _ad.y;
    if (t < 70) { const st = nearestStreet(P.x + _ad.x * t, P.z + _ad.z * t, 12); if (st && st.d < st.hw + 3) label = st.name; }
  }
  el.street.textContent = label ? '▸ ' + label : '';
  // crosshair, optics
  const moving = Math.min(1, Math.hypot(P.vx, P.vz) / CFG.player.walk);
  const spread = (CFG.rifle.spreadBase + P.bloom + moving * CFG.rifle.moveSpread + (P.sprinting ? 3 : 0)) * lerp(W.o.hip, W.o.adsSpread, P.ads);
  const gap = 4 + (Math.tan(spread * DEG) / Math.tan((camera.fov * DEG) / 2)) * (innerHeight / 2);
  const cs = el.cross.children;
  cs[0].style.top = -gap - 8 + 'px'; cs[1].style.top = gap + 'px'; cs[2].style.left = -gap - 8 + 'px'; cs[3].style.left = gap + 'px';
  const optic = P.att.optic;
  el.cross.style.opacity = P.weapon === 'rifle' && P.ads > 0.7 && optic ? 0 : 1;
  el.reddot.classList.toggle('hidden', !(optic === 'reddot' && P.ads > 0.7 && P.weapon === 'rifle'));
  el.scope.classList.toggle('hidden', !(optic === 'scope' && P.ads > 0.85 && P.weapon === 'rifle'));
  UI.hitT -= realDt; el.hit.style.opacity = UI.hitT > 0 ? 1 : 0;
  // prompt: Reinforce tool (Sapper) / building info
  if (P.aimB) {
    const b = P.aimB, info = repairInfo(b);
    const hp = `${Math.max(0, Math.round(b.hp))}/${b.maxHp}`;
    let act = '';
    const hold = pad ? '(hold B)' : '[hold F]';
    if (info.action === 'reinforce') act = `<span class="k">${hold}</span> Reinforce tool: reinforce (${info.cost} S)`;
    else if (info.action === 'repair') act = `<span class="k">${hold}</span> Reinforce tool: repair (${info.cost} S)`;
    else if (info.action === 'full') act = 'reinforced';
    el.prompt.innerHTML = `${buildingName(b)} &middot; ${hp} ${b.reinforced ? '&middot; REINFORCED' : ''} &middot; ${act}`;
    el.prompt.classList.remove('hidden');
  } else el.prompt.classList.add('hidden');
  el.ring.classList.toggle('hidden', !(P.repairT > 0));
  if (P.repairT > 0) el.ring.style.background = `conic-gradient(#f2c230 ${(P.repairT / CFG.building.repairHold) * 360}deg, rgba(255,255,255,0.12) 0)`;
  UI.centerT -= realDt; if (UI.centerT <= 0) el.center.style.opacity = 0;
  // bars
  el.hp.firstChild.style.width = P.hp + '%'; el.hp.classList.toggle('low', P.hp < 35);
  el.st.firstChild.style.width = P.stamina + '%'; el.st.classList.toggle('out', P.exhausted);
  UI.stFlash -= realDt; el.st.style.outline = UI.stFlash > 0 ? '1px solid #ff4636' : '';
  el.status.textContent = P.blocking ? (GAME.time - P.blockPressT <= CFG.melee.parryWindow ? 'BLOCK (parry window)' : 'BLOCKING') : GAME.time < P.guardBrokenUntil ? 'GUARD BROKEN' : P.exhausted ? 'EXHAUSTED' : '';
  el.weapon.textContent = P.weapon === 'rifle' ? 'RIFLE' + (P.reloading ? '  reloading...' : '') : pad ? 'BAT  [RT swing, LT / LB block]' : 'BAT  [LMB swing, RMB block]';
  el.ammo.innerHTML = P.weapon === 'rifle' ? `${P.ammo} <small>/ ${P.reserve}</small>` : '&mdash;';
  const at = [P.att.optic, P.att.muzzle, P.att.barrel].filter(Boolean).map((a) => SHOP.find((s2) => s2.id === a).name);
  el.attach.textContent = at.length ? at.join(' + ') : 'no attachments';
  el.charges.textContent = pad ? `Sapper kit: [RB] breach charges ${P.charges}  [hold B] reinforce tool   [A] ping`
    : `Sapper kit: [G] breach charges ${P.charges}  [F] reinforce tool   [Q] ping`;
  UI.vig = Math.max(0, UI.vig - realDt * 0.8);
  el.vig.style.opacity = Math.max(UI.vig, P.hp < 35 ? 0.35 + 0.1 * Math.sin(GAME.time * 6) : 0);
  if (UI.buyOpen) { el.buyTimer.textContent = GAME.phase === 'intermission' ? Math.ceil(GAME.phaseT) : GAME.phase === 'pre' ? Math.ceil(GAME.phaseT) : '-'; el.buySalvage.textContent = `SALVAGE ${GAME.salvage}`; }
  UI.mapT -= realDt;
  if (UI.mapOn && UI.mapT <= 0) { UI.mapT = 0.1; drawMinimap(); }
  renderMarkers();
  UI.dbgT -= realDt;
  if (UI.debugOn && UI.dbgT <= 0) { UI.dbgT = 0.25; el.debug.textContent = debugText(); }
}
function debugText() {
  const st = nearestStreet(P.x, P.z, 150);
  const intact = buildings.filter((b) => b.state === 0).length;
  const pend = REPO.pending[0];
  const info = renderer.info.render;
  const avgFF = NAVSTATS.jobs ? NAVSTATS.totalMs / NAVSTATS.jobs : 0;
  return [
    `HOLDOUT greybox  instrumentation (D-pad down / F3)      ${LEVEL.name}`,
    `fps                ${FPS.value.toFixed(1)}   (worst 1 s: ${FPS.min1s.toFixed(1)})`,
    `round (wave)       ${GAME.round}   phase ${GAME.phase}   time in round ${fmtTime(GAME.roundT)}`,
    `zombies            alive ${aliveCount()}   queued ${Math.max(0, GAME.queue.length - GAME.queueIdx)}   breachers ${GAME.breacherAlive}   kills ${GAME.kills}`,
    `buildings          intact ${intact}   destroyed ${GAME.destroyed} (horde ${GAME.destroyedBy.breacher || 0} / player ${GAME.destroyedBy.player || 0})   reinforced ${GAME.reinforced}`,
    `player pos (m)     x ${P.x.toFixed(1)} E   y ${(-P.z).toFixed(1)} N   ${onRubble(P.x, P.z) ? 'on rubble' : ''}`,
    `nearest street     ${st ? `${st.name} (${st.d.toFixed(0)} m)` : '-'}`,
    `health / stamina   ${Math.round(P.hp)} / ${Math.round(P.stamina)}`,
    `REPOSITIONS AFTER DESTRUCTION  ${REPO.count}   (near collapses ${REPO.near}, expired ${REPO.expired}${pend ? `, pending: ${(CFG.reposition.window - (GAME.time - pend.t)).toFixed(1)} s left, moved ${Math.hypot(P.x - pend.x, P.z - pend.z).toFixed(1)} m` : ''})`,
    `sector             ${GAME.sector ? GAME.sector.name : '-'}  ${GAME.secState}  ${(GAME.prog * 100).toFixed(0)}%  in-sector zombies ${GAME.zInSector || 0}`,
    `sector held time   ${GAME.sectorHeldTotal.toFixed(1)} s total (${GAME.sectorHeldRound.toFixed(1)} s this round)   captured ${GAME.sectorsCaptured} lost ${GAME.sectorsLost}`,
    `pings used         ${GAME.pings}`,
    `flow field         rebuilds ${NAVSTATS.rebuilds} (${NAVSTATS.jobs} jobs, sliced ${NAV_BUDGET_MS} ms/frame, worst frame ${NAVSTATS.maxFrameMs.toFixed(1)} ms)\n                   job last ${NAVSTATS.lastMs.toFixed(1)} ms  avg ${avgFF.toFixed(1)} ms  max ${NAVSTATS.maxMs.toFixed(1)} ms   after-destruction ${NAVSTATS.afterDestruction.length ? NAVSTATS.afterDestruction[NAVSTATS.afterDestruction.length - 1] + ' ms / ' + NAVSTATS.afterDestructionFrames[NAVSTATS.afterDestructionFrames.length - 1] + ' frames' : '-'}`,
    `salvage            ${GAME.salvage}   earned ${GAME.salvageEarned}   spent ${GAME.salvageSpent}`,
    `melee              hits ${GAME.meleeHits}  melee kills ${GAME.meleeKills}  parries ${GAME.parries}  blocks ${GAME.blocks}  guard breaks ${GAME.guardBreaks}`,
    padDebugLine(),
    `render             draw calls ${info.calls}   tris ${info.triangles}   spawns hidden ${GAME.spawnsHidden}/${GAME.spawnsHidden + GAME.spawnsVisible}`,
  ].join('\n');
}
