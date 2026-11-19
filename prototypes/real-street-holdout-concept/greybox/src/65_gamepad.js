// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Controller input (Gamepad API, standard mapping). The controller is the primary and only intended way to play;
// keyboard and mouse stay as an unadvertised developer fallback. padPoll() runs once per rendered frame, before the
// sim steps, and never in ?autotest=1. It feeds the same INPUT the keyboard feeds, drives the menus, tracks the active
// device (which picks the on-screen labels) and plays rumble. Every Gamepad API call is guarded: a missing, blocked
// or always-empty API never throws and is never retried in a loop that could spam the console.
//
// Standard mapping: buttons 0 A, 1 B, 2 X, 3 Y, 4 LB, 5 RB, 6 LT, 7 RT, 8 View, 9 Menu, 10 LS click, 11 RS click,
// 12-15 D-pad up/down/left/right; axes 0/1 left stick, 2/3 right stick. Back paddles are not separate buttons: they
// repeat whichever buttons the player assigned to them, so nothing here is coded for them.

// ------------------------------------------------------------- tuning: starting values, adjust after a real-hardware test
const PADCFG = {
  lookYawDeg: 200,        // horizontal turn rate at full tilt (degrees per second) at sensitivity 1.0x, not aiming
  lookPitchDeg: 130,      // vertical turn rate at full tilt (degrees per second)
  lookCurve: 1.8,         // response exponent on the right stick: above 1 gives finer aim near the centre
  moveCurve: 1.0,         // response exponent on the left stick (1 = linear walk speed)
  deadInner: 0.12,        // radial deadzone: tilt below this reads as zero (no drift at rest)
  deadOuter: 0.95,        // tilt above this reads as full; output is rescaled 0..1 between the two (no jump at the edge)
  invertY: false,         // true = pull the right stick back to look up
  sensDefault: 1.0, sensMin: 0.4, sensMax: 2.5, sensStep: 0.1,     // look sensitivity multiplier (D-pad left/right)
  triggerPress: 0.35, triggerRelease: 0.20,                        // analog trigger thresholds with hysteresis
  aimSlowdown: true,      // AIM SLOWDOWN toggle: look slows while the crosshair is over a zombie in range
  slowFactor: 0.6,        // look speed multiplier while slowed (1 = off, lower = stickier)
  slowRange: 60,          // metres
  slowPad: 0.25,          // metres added around the zombie so the slowdown starts just before the crosshair touches it
  slowBlend: 14,          // how fast the slowdown fades in and out (per second)
  rampExtra: 0.3,         // extra yaw rate after holding near-full tilt (0 = off); hip-fire only
  rampAt: 0.9, rampDelay: 0.25, rampTime: 0.4,
  sprintFwd: 0.35,        // forward tilt needed to sprint
  menuTilt: 0.5, repeatDelay: 0.38, repeatRate: 0.14,              // buy-screen highlight: stick threshold and key repeat (s)
  buyGuard: 0.3,          // seconds after the buy screen opens before (A) can buy (it opens by itself at round end)
  summaryGuard: 1.5,      // seconds after the summary appears before (A) can restart (it appears by itself, mid-fight)
  deviceHold: 0.3,        // seconds without keyboard/mouse input before HELD controller input takes the prompts back (a new press does at once)
  rumble: true,
  collapseRange: 30,      // metres: a building collapsing this close rumbles
};
const PAD_SENS_KEY = 'holdout.padSens', PAD_RESTART_KEY = 'holdout.padRestart';

// ------------------------------------------------------------- state
const PAD_N = 17;
const PAD = {
  off: false,             // this browser has no Gamepad API
  blocked: false,         // a permissions policy forbids it, or getGamepads threw: never polled again
  connected: false, index: -1, rawId: '', name: '', standard: true, fresh: false, warn: 0, error: null,
  axesOk: true,           // false = non-standard pad that has not pressed a button yet: its sticks are ignored
  kbmAt: -1e9, stickWas: false,      // last keyboard/mouse input (performance.now), and whether a stick was off-centre last frame
  act: null, trigOk: false,
  down: new Uint8Array(PAD_N), prev: new Uint8Array(PAD_N), eat: new Uint8Array(PAD_N),
  mx: 0, my: 0, mmag: 0, rx: 0, ry: 0, rmag: 0,
  sprintOn: false, sens: PADCFG.sensDefault, slow: 1, slowT: 0, onTarget: false, rampT: 0,
  ctx: -1, buyT: 0, navX: 0, navY: 0, navT: 0, navLock: false, navAxis: 0,
  rumUntil: 0, rumPrio: 0, rumbles: 0,
  wasPaused: false, wasAlive: true,
};
let DEVICE = 'pad';       // active device: 'pad' (default, controller labels from the first frame) or 'kbm'
function padIsActive() { return DEVICE === 'pad'; }

const padEl = {
  status: document.getElementById('padStatus'), go: document.getElementById('startGo'), hosted: document.getElementById('padHosted'),
  kb: document.getElementById('kbTable'), pauseWhy: document.getElementById('pauseWhy'), log: document.getElementById('logBtn'),
};

(function padInit() {
  try { const v = parseFloat(localStorage.getItem(PAD_SENS_KEY)); if (v >= PADCFG.sensMin && v <= PADCFG.sensMax) PAD.sens = v; } catch (e) { /* storage may be blocked */ }
  try { if (typeof navigator === 'undefined' || typeof navigator.getGamepads !== 'function') PAD.off = true; } catch (e) { PAD.off = true; }
  try {
    const pol = document.permissionsPolicy || document.featurePolicy;
    if (pol && typeof pol.allowsFeature === 'function') {
      const known = typeof pol.features !== 'function' || pol.features().indexOf('gamepad') >= 0;
      if (known && pol.allowsFeature('gamepad') === false) PAD.blocked = true;
    }
  } catch (e) { /* no policy object: find out by polling */ }
  if (typeof HOLDOUT_HOSTED !== 'undefined') padEl.hosted.classList.remove('hidden');
})();

// ------------------------------------------------------------- status line, device, pause
function padName(id) {
  const s = String(id || '').replace(/\s*\([^)]*\)\s*$/, '').trim().slice(0, 48);
  return s || 'controller';
}
function padStatus() {                 // start card: live status + the start prompt (written only when something changes)
  let s, go, ok = false;
  if (PAD.off) { s = 'Controller: not supported by this browser. Use Chrome or Edge.'; go = 'CLICK TO START (KEYBOARD AND MOUSE)'; }
  else if (PAD.blocked) { s = 'Controller: blocked in this viewer. Open the standalone index.html file in Chrome or Edge.'; go = 'CLICK TO START (KEYBOARD AND MOUSE)'; }
  else if (PAD.connected) {
    ok = true; go = 'PRESS A TO START';
    s = `Controller: ${PAD.name} connected` + (PAD.standard ? '' : ' (non-standard layout: buttons may be off; Chrome or Edge is recommended)');
  } else { s = 'Controller: none detected. Connect one, then press any button on your controller.'; go = 'CONNECT A CONTROLLER AND PRESS ANY BUTTON'; }
  padEl.status.textContent = s; padEl.status.classList.toggle('ok', ok);
  padEl.go.textContent = go;
}
padStatus();
function padDevice(d) {                // whichever device was used last picks the labels (CSS only: .pad-only / .kbm-only)
  if (d === DEVICE) return;
  DEVICE = d;
  document.body.classList.toggle('dev-kbm', d === 'kbm');
}
function padStartGame() {
  el.start.classList.add('hidden'); el.hud.classList.remove('hidden');
  if (GAME.phase === 'menu') startGame();
}
function padPause(why) {               // explicit pause: the controller needs no mouse capture, so Menu pauses and resumes
  GAME.paused = true; el.pause.classList.remove('hidden');
  padEl.pauseWhy.textContent = why || ''; padEl.pauseWhy.classList.toggle('hidden', !why);
  PAD.sprintOn = false;
  padRumbleStop();
  if (document.pointerLockElement) document.exitPointerLock();
}
function padResume() {
  GAME.paused = false; el.pause.classList.add('hidden'); padEl.pauseWhy.classList.add('hidden');
}
function padInGame() { return GAME.phase !== 'menu' && GAME.phase !== 'dead'; }

// keyboard / mouse = developer fallback. Capture phase, so the device is known before the game's own handlers run.
// Only real (trusted) input counts: the (Y) log download below clicks a button from script.
function padKbmUsed(e) { if (!AUTOTEST && e.isTrusted) { PAD.kbmAt = performance.now(); padDevice('kbm'); } }
addEventListener('keydown', (e) => {
  if (AUTOTEST || !e.isTrusted) return;
  PAD.kbmAt = performance.now(); padDevice('kbm');
  if (e.code === 'KeyK' && !e.repeat && GAME.phase === 'menu') padEl.kb.classList.toggle('hidden');
}, true);
addEventListener('mousedown', padKbmUsed, true);
addEventListener('click', padKbmUsed, true);
addEventListener('wheel', padKbmUsed, true);
addEventListener('mousemove', (e) => {       // the mouse only counts while it is actually aiming (captured or free-look)
  if (!(e.movementX || e.movementY)) return;
  if (document.pointerLockElement === canvas || UI.freeLook) padKbmUsed(e);
}, true);
addEventListener('gamepadconnected', () => { if (!AUTOTEST) padPoll(0); });
addEventListener('gamepaddisconnected', () => { if (!AUTOTEST) padPoll(0); });
addEventListener('blur', () => {              // window lost focus: drop held keys (their keyup never arrives) and pause, whatever the device
  if (AUTOTEST) return;
  for (const k in KEYS) KEYS[k] = false;
  MOUSE.l = MOUSE.r = false;
  if (padInGame() && !GAME.paused) padPause('');
});

// ------------------------------------------------------------- connect / disconnect / faults
function padClearHeld() {
  PAD.down.fill(0); PAD.prev.fill(0); PAD.eat.fill(0);
  PAD.mx = PAD.my = PAD.mmag = PAD.rx = PAD.ry = PAD.rmag = 0;
  PAD.sprintOn = false; PAD.navX = PAD.navY = 0; PAD.navAxis = 0; PAD.rampT = 0; PAD.slow = 1; PAD.onTarget = false; PAD.stickWas = false;
}
function padFound(gp) {
  PAD.connected = true; PAD.index = gp.index; PAD.rawId = gp.id; PAD.name = padName(gp.id);
  PAD.standard = gp.mapping === 'standard';
  PAD.axesOk = PAD.standard;           // a non-standard device may rest its axes off-centre (throttle, pedals): wait for a button
  PAD.fresh = true;                    // buttons already held when the pad appears do not count as presses
  PAD.trigOk = false;
  try { const fx = gp.vibrationActuator && gp.vibrationActuator.effects; PAD.trigOk = !!(fx && fx.indexOf && fx.indexOf('trigger-rumble') >= 0); } catch (e) { /* no effects list */ }
  if (!PAD.standard && PAD.warn === 0) PAD.warn = 1;
  padStatus();
  toast('Controller connected: ' + PAD.name, 'own');
  if (GAME.paused && !padEl.pauseWhy.classList.contains('hidden')) padEl.pauseWhy.textContent = 'Now using controller: ' + PAD.name + '.';
}
function padLost(msg, how) {
  const wasActive = DEVICE === 'pad';
  padRumbleStop();
  PAD.connected = false; PAD.act = null; PAD.index = -1; PAD.rawId = '';
  padClearHeld();
  padStatus();
  toast(msg, 'bad');
  if (wasActive && padInGame()) padPause(msg + (how || ' Reconnect it and press Menu, or click to continue with keyboard and mouse.'));
}
function padBlocked() {
  PAD.blocked = true;
  if (PAD.connected) {                 // blocked mid-game: the controller is never polled again, so show the mouse prompt, not "press Menu"
    padLost('Controller input was blocked by this viewer.', ' Click to continue with keyboard and mouse, or open the standalone index.html file in Chrome or Edge.');
    padDevice('kbm');
  }
  padStatus();
}
function padFault(e) {                 // a bug in this file must not stop the game: note it once, drop held inputs
  if (!PAD.error) {
    PAD.error = String(e && e.stack || e);
    try { console.warn('[holdout] controller input error: ' + PAD.error); } catch (e2) { /* ignore */ }
  }
  padClearHeld();
}

// ------------------------------------------------------------- reading
let _sx = 0, _sy = 0, _sm = 0;
function padStick(x, y, curve) {       // radial deadzone, rescaled, then the response curve -> _sx, _sy, _sm (0..1)
  const m = Math.hypot(x, y);
  if (!(m > PADCFG.deadInner)) { _sx = _sy = _sm = 0; return; }
  const k = Math.pow(Math.min(1, (m - PADCFG.deadInner) / (PADCFG.deadOuter - PADCFG.deadInner)), curve);
  _sx = (x / m) * k; _sy = (y / m) * k; _sm = k;
}
function padVal(gp, i) {
  const b = gp.buttons[i];
  if (!b) return 0;
  if (typeof b === 'number') return b;
  const v = +b.value;
  return v > 0 ? v : b.pressed ? 1 : 0;
}
function padHit(i) { return PAD.down[i] === 1 && PAD.prev[i] === 0; }      // pressed this frame
function padHeld(i) { return PAD.down[i] === 1 && PAD.eat[i] === 0; }      // held, and not a press that a menu already used

const CTX_START = 0, CTX_PAUSE = 1, CTX_BUY = 2, CTX_GAME = 3, CTX_SUMMARY = 4, CTX_DEADWAIT = 5;
function padContext() {
  if (GAME.phase === 'menu') return CTX_START;
  if (GAME.phase === 'dead') return UI.summaryShown ? CTX_SUMMARY : CTX_DEADWAIT;
  if (GAME.paused) return CTX_PAUSE;
  return UI.buyOpen ? CTX_BUY : CTX_GAME;
}

function padPoll(dt) {                 // once per rendered frame; dt = real seconds (not sim time)
  if (GAME.paused !== PAD.wasPaused) { // any pause source stops rumble; resuming clears the pause reason
    PAD.wasPaused = GAME.paused;
    if (GAME.paused) { padRumbleStop(); PAD.sprintOn = false; } else padEl.pauseWhy.classList.add('hidden');
  }
  if (P.alive !== PAD.wasAlive) { PAD.wasAlive = P.alive; if (!P.alive) padRumbleStop(); }
  if (PAD.off || PAD.blocked) return;
  let gp = null, cur = null;
  try {
    const list = navigator.getGamepads();
    const n = list ? list.length : 0;
    for (let i = 0; i < n; i++) {
      const g = list[i];
      if (!g || g.connected === false) continue;         // null entries and stale slots
      if (PAD.connected && g.index === PAD.index && g.id === PAD.rawId) cur = g;       // the pad in use is still listed
      if (g.mapping === 'standard') { if (!gp || gp.mapping !== 'standard') gp = g; }  // first standard pad
      else if (!gp) gp = g;                              // non-standard: still try the standard indices
    }
  } catch (e) { padBlocked(); return; }
  // The pad in use went away: say so and pause, even when another device is listed (it is picked up on the next poll,
  // while the game is paused). Otherwise keep the pad in use; only a non-standard one gives way to a standard pad.
  if (PAD.connected && !cur) { padLost('Controller disconnected.'); return; }
  if (cur && (PAD.standard || gp.mapping !== 'standard')) gp = cur;
  if (!gp) return;
  try { padUpdate(gp, dt); } catch (e) { padFault(e); }
}

function padUpdate(gp, dt) {
  if (!PAD.connected || PAD.index !== gp.index || PAD.rawId !== gp.id) padFound(gp);
  PAD.act = gp.vibrationActuator || null;
  let any = false, edge = false;
  for (let i = 0; i < PAD_N; i++) {
    const v = padVal(gp, i);
    const d = i === 6 || i === 7 ? (PAD.down[i] ? v > PADCFG.triggerRelease : v >= PADCFG.triggerPress) : v > 0.5;
    PAD.prev[i] = PAD.down[i]; PAD.down[i] = d ? 1 : 0;
    if (d) { any = true; if (!PAD.prev[i]) edge = true; } else PAD.eat[i] = 0;
  }
  if (!PAD.axesOk && any) PAD.axesOk = true;
  const ax = gp.axes;
  if (PAD.axesOk) {
    padStick(+ax[0] || 0, +ax[1] || 0, PADCFG.moveCurve); PAD.mx = _sx; PAD.my = -_sy; PAD.mmag = _sm;
    padStick(+ax[2] || 0, +ax[3] || 0, PADCFG.lookCurve); PAD.rx = _sx; PAD.ry = _sy; PAD.rmag = _sm;
  } else PAD.mx = PAD.my = PAD.mmag = PAD.rx = PAD.ry = PAD.rmag = 0;
  const stick = PAD.mmag > 0 || PAD.rmag > 0;
  if (stick) { any = true; if (!PAD.stickWas) edge = true; }
  PAD.stickWas = stick;
  if (PAD.fresh) { PAD.fresh = false; for (let i = 0; i < PAD_N; i++) { PAD.prev[i] = PAD.down[i]; PAD.eat[i] = PAD.down[i]; } }
  // Active device: a new press (button, trigger, or a stick leaving rest) takes the prompts at once. Input that is only
  // being HELD takes them back after a short quiet time on the keyboard and mouse, so mixed use does not flip every frame.
  if (edge || (any && performance.now() - PAD.kbmAt > PADCFG.deviceHold * 1000)) padDevice('pad');
  if (PAD.warn === 1 && !PAD.standard && GAME.phase !== 'menu') { PAD.warn = 2; toast('Controller layout may be off (non-standard mapping). Chrome or Edge is recommended.', 'bad'); }

  const ctx = padContext();
  if (ctx !== PAD.ctx) { PAD.ctx = ctx; PAD.buyT = 0; PAD.navLock = true; PAD.navX = PAD.navY = 0; }
  if (ctx !== CTX_GAME) {              // a button used in a menu must be released before it acts in the game
    for (let i = 0; i < PAD_N; i++) if (PAD.down[i]) PAD.eat[i] = 1;
    PAD.sprintOn = false;
  }
  if (ctx === CTX_START) { if (padHit(0) || padHit(9)) padStartGame(); return; }
  if (ctx === CTX_SUMMARY) {
    PAD.buyT += dt;                    // the summary appears by itself: a tap meant for the fight must not restart and lose the log
    if (padHit(0) && PAD.buyT >= PADCFG.summaryGuard) {
      // The page reloads, and a browser hides the controller from the new page until the next press: remember that the
      // restart came from the controller, so the new page starts the game by itself (padRestartCheck).
      try { sessionStorage.setItem(PAD_RESTART_KEY, '1'); } catch (e) { /* storage may be blocked: the start card shows instead */ }
      location.reload();
    } else if (padHit(3) && !padEl.log.classList.contains('hidden')) padEl.log.click();
    return;
  }
  if (ctx === CTX_BUY) { padBuy(dt); return; }      // the D-pad moves the highlight there
  if (!(ctx === CTX_PAUSE && UI.buyOpen)) {         // (paused over the buy screen: nothing behind the cards may change)
    if (padHit(12)) UI.toggleMap();
    if (padHit(13)) UI.toggleDebug();
  }
  if (ctx === CTX_DEADWAIT) return;
  if (ctx === CTX_PAUSE) {
    if (padHit(9) || padHit(0)) padResume();
    return;
  }
  // ---- in the game
  if (padHit(14)) padSensStep(-1);
  if (padHit(15)) padSensStep(1);
  if (padHit(9)) { padPause(''); return; }
  if (padHit(8)) UI.toggleBuy();
  if (!P.alive) return;
  const once = INPUT.once;
  if (padHit(0)) once.add('ping');
  if (padHit(2)) once.add('reload');
  if (padHit(3)) once.add('wswap');
  if (padHit(5)) once.add('charge');
  if (padHit(11)) once.add('swing');
  if (padHit(4) || (padHit(6) && P.weapon === 'bat')) once.add('blockPress');     // same parry rule as the keyboard
  if (padHit(10)) PAD.sprintOn = !PAD.sprintOn && PAD.my > PADCFG.sprintFwd;
  if (PAD.sprintOn && (PAD.mmag === 0 || PAD.my < -0.1 || padHeld(6) || padHeld(7))) PAD.sprintOn = false;
  padLook(dt);
}

// held state -> INPUT. Called from readHumanInput() every sim step (never in autotest), after the keyboard was read.
function padMergeInput() {
  if (!PAD.connected || UI.buyOpen) return;
  if (INPUT.fwd === 0 && INPUT.right === 0 && PAD.mmag > 0) {      // analog move; a held WASD key wins
    INPUT.fwd = PAD.my; INPUT.right = PAD.mx;
    INPUT.moveScale = PAD.mmag;                                    // direction is normalised later, so diagonals are not faster;
                                                                   // ignored while actually sprinting (updatePlayer)
  }
  if (PAD.sprintOn && PAD.my > PADCFG.sprintFwd) INPUT.sprint = true;
  if (padHeld(7)) INPUT.fire = true;
  if (padHeld(6)) { if (P.weapon === 'rifle') INPUT.ads = true; else INPUT.block = true; }
  if (padHeld(4)) INPUT.block = true;
  if (padHeld(1)) INPUT.repair = true;
}

// ------------------------------------------------------------- look (real time: unaffected by hit-stop or sim speed)
const _pa = { x: 0, y: 0, z: 0 };
function padCrosshairOnZombie() {      // is the crosshair over a visible zombie within range?
  aimDir(_pa);
  const ax = _pa.x, ay = _pa.y, az = _pa.z, h2 = ax * ax + az * az;
  if (h2 < 1e-6) return false;
  let best = Infinity;
  for (let i = 0; i < zombies.length; i++) {
    const z = zombies[i];
    if (z.dead) continue;
    const dx = z.x - P.x, dz = z.z - P.z;
    const t = (dx * ax + dz * az) / h2;              // distance along the aim ray at the closest horizontal approach
    if (t <= 0 || t > PADCFG.slowRange || t >= best) continue;
    const r = 0.3 * z.sc + PADCFG.slowPad, ox = dx - ax * t, oz = dz - az * t;
    if (ox * ox + oz * oz > r * r) continue;
    const y = P.y + ay * t;
    if (y < -PADCFG.slowPad || y > 1.85 * z.sc + PADCFG.slowPad) continue;
    best = t;
  }
  if (best === Infinity) return false;
  return rayBuildings(P.x, P.y, P.z, ax, ay, az, best, true) === Infinity;       // not through a wall
}
function padLook(dt) {
  let target = 1;
  if (PADCFG.aimSlowdown) {            // checked every 50 ms, stick moving or not, so a correction that starts on a target is already slowed
    PAD.slowT -= dt;
    if (PAD.slowT <= 0) { PAD.slowT = 0.05; PAD.onTarget = padCrosshairOnZombie(); }
    if (PAD.onTarget) target = PADCFG.slowFactor;
  }
  PAD.slow += (target - PAD.slow) * Math.min(1, dt * PADCFG.slowBlend);
  if (PAD.rmag <= 0) { PAD.rampT = 0; return; }
  PAD.rampT = PAD.rmag >= PADCFG.rampAt && P.ads < 0.5 ? PAD.rampT + dt : 0;
  const ramp = 1 + PADCFG.rampExtra * clamp((PAD.rampT - PADCFG.rampDelay) / PADCFG.rampTime, 0, 1);
  const zoom = BASE_FOV / camera.fov;                // aiming: slower in proportion to the zoom
  const s = (PAD.sens * PAD.slow * DEG * dt) / zoom;
  P.yaw -= PAD.rx * PADCFG.lookYawDeg * s * ramp;
  P.pitch = clamp(P.pitch - PAD.ry * (PADCFG.invertY ? -1 : 1) * PADCFG.lookPitchDeg * s, -1.5, 1.5);
}
function padSensStep(dir) {
  PAD.sens = clamp(Math.round((PAD.sens + dir * PADCFG.sensStep) * 10) / 10, PADCFG.sensMin, PADCFG.sensMax);
  try { localStorage.setItem(PAD_SENS_KEY, String(PAD.sens)); } catch (e) { /* storage may be blocked */ }
  toast(`Look sensitivity ${PAD.sens.toFixed(1)}x  (${Math.round(PADCFG.lookYawDeg * PAD.sens)} / ${Math.round(PADCFG.lookPitchDeg * PAD.sens)} deg/s)`, 'own');
}

// ------------------------------------------------------------- buy screen
function padBuySelect(i) {
  const items = el.buyGrid.children;
  if (i === UI.buySel || !items[i]) return;
  if (items[UI.buySel]) items[UI.buySel].classList.remove('sel');
  UI.buySel = i;
  items[i].classList.add('sel');
  try { items[i].scrollIntoView({ block: 'nearest' }); } catch (e) { /* older browsers */ }
}
function padBuyMove(nx, ny) {
  const items = el.buyGrid.children, n = items.length;
  if (!n) return;
  let cols = 1;
  while (cols < n && items[cols].offsetTop === items[0].offsetTop) cols++;       // 2 columns, 1 on a narrow screen
  let i = clamp(UI.buySel, 0, n - 1);
  if (nx) { const j = i + nx; if (j >= 0 && j < n && Math.floor(j / cols) === Math.floor(i / cols)) i = j; }
  if (ny) {
    const j = i + ny * cols;
    if (j >= 0 && j < n) i = j;
    else if (ny > 0 && Math.floor(i / cols) < Math.floor((n - 1) / cols)) i = n - 1;    // last row is shorter
  }
  padBuySelect(i);
}
function padBuy(dt) {
  PAD.buyT += dt;
  let rx = (PAD.down[15] ? 1 : 0) - (PAD.down[14] ? 1 : 0), ry = (PAD.down[13] ? 1 : 0) - (PAD.down[12] ? 1 : 0);
  let preferX = false;                 // both directions pressed in the same frame: the D-pad goes up/down (more rows than columns)
  if (!rx && !ry) {                    // left stick works as a D-pad
    const T = PADCFG.menuTilt;
    rx = PAD.mx > T ? 1 : PAD.mx < -T ? -1 : 0; ry = PAD.my > T ? -1 : PAD.my < -T ? 1 : 0;
    preferX = Math.abs(PAD.mx) >= Math.abs(PAD.my);
  }
  // One axis at a time. The axis that was pressed first is kept until it is released, so a D-pad press that brushes a
  // second direction, or a stick resting near the diagonal, moves the highlight once and not once per change.
  if ((PAD.navAxis === 1 && !rx) || (PAD.navAxis === 2 && !ry)) PAD.navAxis = 0;
  if (!PAD.navAxis && (rx || ry)) PAD.navAxis = rx && (!ry || preferX) ? 1 : 2;
  const nx = PAD.navAxis === 1 ? rx : 0, ny = PAD.navAxis === 2 ? ry : 0;
  if (!nx && !ny) { PAD.navX = PAD.navY = 0; PAD.navLock = false; }
  else if (!PAD.navLock) {             // (locked until neutral when the screen opens while the stick is already tilted)
    if (nx !== PAD.navX || ny !== PAD.navY) { PAD.navX = nx; PAD.navY = ny; PAD.navT = PADCFG.repeatDelay; padBuyMove(nx, ny); }
    else { PAD.navT -= dt; if (PAD.navT <= 0) { PAD.navT += PADCFG.repeatRate; padBuyMove(nx, ny); } }
  }
  if (padHit(0) && PAD.buyT >= PADCFG.buyGuard) buyItem(SHOP[clamp(UI.buySel, 0, SHOP.length - 1)]);
  if (padHit(1) || padHit(8)) UI.closeBuy();
  else if (padHit(3) || padHit(9)) readyUp();
}

// ------------------------------------------------------------- restart from the summary
// Called once at the end of 90_main.js (never in autotest). (A) Restart on the summary left a flag before it reloaded the
// page: start the new game at once. The mouse Restart button leaves no flag, because that path needs a click to capture
// the mouse. A plain reload shows the start card as usual. If storage is blocked, the start card shows (as before).
function padRestartCheck() {
  let again = false;
  try { again = sessionStorage.getItem(PAD_RESTART_KEY) === '1'; sessionStorage.removeItem(PAD_RESTART_KEY); } catch (e) { /* storage may be blocked */ }
  if (!again || AUTOTEST || PAD.off || PAD.blocked) return;
  padStartGame();
  padPoll(0);
  if (!PAD.connected) toast('New game. Press any button or move a stick on the controller to continue.', 'own');
}

// ------------------------------------------------------------- rumble (guarded; stops on pause, death and disconnect)
const RUM_FIRE = 0, RUM_HURT = 1, RUM_PARRY = 2, RUM_COLLAPSE = 3;
const _rum = { startDelay: 0, duration: 0, weakMagnitude: 0, strongMagnitude: 0, leftTrigger: 0, rightTrigger: 0 };
function padNoop() {}
function padRumble(kind, amt) {
  if (AUTOTEST || !PADCFG.rumble || DEVICE !== 'pad' || !PAD.connected || !PAD.act || GAME.paused || !P.alive) return;
  let prio = 1, ms = 60, weak = 0, strong = 0, trig = 0;
  if (kind === RUM_FIRE) { prio = 0; ms = 55; weak = 0.28; strong = 0.1; trig = 0.5; }
  else if (kind === RUM_HURT) { ms = 180; strong = clamp(0.45 + (amt || 0) / 80, 0, 1); weak = 0.5; }
  else if (kind === RUM_PARRY) { ms = 130; weak = 0.9; strong = 0.35; }
  else { prio = 2; ms = 520; strong = clamp(amt || 1, 0.3, 1); weak = 0.6; }
  const now = performance.now();
  if (now < PAD.rumUntil && prio < PAD.rumPrio) return;          // a shot must not cut a collapse short
  try {
    const a = PAD.act;
    if (typeof a.playEffect !== 'function') return;
    _rum.duration = ms; _rum.weakMagnitude = weak; _rum.strongMagnitude = strong; _rum.rightTrigger = trig;
    const p = a.playEffect(trig > 0 && PAD.trigOk ? 'trigger-rumble' : 'dual-rumble', _rum);
    if (p && typeof p.catch === 'function') p.catch(padNoop);
    PAD.rumUntil = now + ms; PAD.rumPrio = prio; PAD.rumbles++;
  } catch (e) { /* unsupported actuator */ }
}
function padRumbleStop() {
  PAD.rumUntil = 0; PAD.rumPrio = 0;
  const a = PAD.act;
  if (!a) return;
  try {
    if (typeof a.reset === 'function') { const p = a.reset(); if (p && typeof p.catch === 'function') p.catch(padNoop); }
    else if (typeof a.playEffect === 'function') {
      _rum.duration = 1; _rum.weakMagnitude = 0; _rum.strongMagnitude = 0; _rum.rightTrigger = 0;
      const p = a.playEffect('dual-rumble', _rum); if (p && typeof p.catch === 'function') p.catch(padNoop);
    }
  } catch (e) { /* unsupported actuator */ }
}

function padDebugLine() {              // one line for the debug panel: what the game sees from the controller
  const f = (v) => (v >= 0 ? ' ' : '') + v.toFixed(2);
  return `controller         ${PAD.connected ? PAD.name + (PAD.standard ? '' : ' (non-standard)') : PAD.blocked || PAD.off ? 'blocked / unsupported' : 'none'}   active device ${DEVICE}   look ${PAD.sens.toFixed(1)}x` +
    `   aim slowdown ${PADCFG.aimSlowdown ? PAD.slow.toFixed(2) : 'off'}   rumble ${PAD.act ? (PAD.trigOk ? 'body + triggers' : 'body') : 'none'}\n` +
    `                   move ${f(PAD.mx)} ${f(PAD.my)}  look ${f(PAD.rx)} ${f(PAD.ry)}  (after deadzone and curve)   sprint toggle ${PAD.sprintOn ? 'on' : 'off'}`;
}

// read-only snapshot for the test hook (window.__holdoutState, harness only)
function padState() {
  return { connected: PAD.connected, active: DEVICE === 'pad' && PAD.connected, blocked: PAD.blocked || PAD.off, supported: !PAD.off,
    name: PAD.name, standard: PAD.standard, error: PAD.error, rumbles: PAD.rumbles, sprintToggle: PAD.sprintOn, aimSlow: +PAD.slow.toFixed(3),
    moveMag: +PAD.mmag.toFixed(3), triggerRumble: PAD.trigOk };
}
