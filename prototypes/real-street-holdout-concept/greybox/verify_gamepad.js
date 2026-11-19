// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Headless controller check:  node verify_gamepad.js [--death]
// There is no real controller here, so navigator.getGamepads is replaced by a scriptable fake standard pad. The game
// runs in normal mode (no ?autotest) and is driven by the fake pad alone unless a check says otherwise.
// Prints a JSON summary and PASS/FAIL; exit code 0 = pass, 1 = fail, 2 = harness crash.
//   --death   also let the horde kill the player, then check the summary prompts, rumble stop and (A) restart (~2 min).
// If the hosted variant was built (.build/hosted/holdout-greybox.html) its start-card note is checked too.

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const HERE = __dirname;
const URL = 'file://' + path.join(HERE, 'index.html');
const HOSTED = path.join(HERE, '.build', 'hosted', 'holdout-greybox.html');
const DEATH = process.argv.includes('--death');
const A = 0, B = 1, X = 2, Y = 3, LB = 4, RB = 5, LT = 6, RT = 7, VIEW = 8, MENU = 9, LS = 10, RS = 11, UP = 12, DOWN = 13, LEFT = 14, RIGHT = 15;

const checks = [];
const info = {};
function check(name, pass, detail) {
  checks.push({ name, pass: !!pass, detail: detail === undefined ? undefined : detail });
  console.log(`  ${pass ? 'ok  ' : 'FAIL'} ${name}${pass || detail === undefined ? '' : '  ' + JSON.stringify(detail)}`);
}

// runs in the page before the game: the fake pad and small DOM helpers
function initPad(opt) {
  window.__holdoutHarness = true;
  const ctl = window.__pad = { pad: null, mode: opt.mode || 'ok', calls: 0, rumbles: [], resets: 0 };
  const make = () => ({
    id: opt.id || 'Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e Product: 0b22)', index: 1, connected: true,
    mapping: opt.mapping === undefined ? 'standard' : opt.mapping, timestamp: 0, axes: [0, 0, 0, 0],
    buttons: Array.from({ length: 17 }, () => ({ pressed: false, touched: false, value: 0 })),
    vibrationActuator: {
      type: 'dual-rumble', effects: ['dual-rumble', 'trigger-rumble'],
      playEffect(type, p) { ctl.rumbles.push({ type, duration: p.duration, weak: p.weakMagnitude, strong: p.strongMagnitude }); return Promise.resolve('complete'); },
      reset() { ctl.resets++; return Promise.resolve('complete'); },
    },
  });
  ctl.btn = (i, v) => { const b = ctl.pad.buttons[i]; b.value = v; b.pressed = v > (i === 6 || i === 7 ? 0.1 : 0.5); b.touched = v > 0; };
  ctl.axes = (a) => { for (let i = 0; i < 4; i++) ctl.pad.axes[i] = a[i]; };
  ctl.connect = (held) => { ctl.pad = make(); for (const i of held || []) ctl.btn(i, 1); window.dispatchEvent(new Event('gamepadconnected')); };
  ctl.disconnect = () => { ctl.pad = null; window.dispatchEvent(new Event('gamepaddisconnected')); };
  if (ctl.mode === 'missing') Object.defineProperty(navigator, 'getGamepads', { configurable: true, value: undefined });
  else Object.defineProperty(navigator, 'getGamepads', { configurable: true, writable: true, value: () => {
    ctl.calls++;
    if (ctl.mode === 'throw') throw new DOMException("Access to the feature 'gamepad' is disallowed by permissions policy.", 'SecurityError');
    if (ctl.mode === 'empty') return [];
    return [null, ctl.pad, null, null];           // a null entry first, like a real list with an empty slot
  } });
  window.__vis = (sel) => { const e = document.querySelector(sel); return !!e && e.getClientRects().length > 0; };
  window.__txt = (sel) => { const e = document.querySelector(sel); return e ? e.innerText.replace(/\s+/g, ' ').trim() : null; };
}

async function open(browser, opt, url) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errs.push('console.error: ' + m.text());
    else if (m.type() === 'warning' && m.text().includes('[holdout]')) errs.push('console.warn: ' + m.text());
  });
  await page.addInitScript(initPad, opt || {});
  await page.goto(url || URL);
  await page.waitForFunction(() => typeof window.__holdoutState === 'function', null, { timeout: 30000 });
  return { ctx, page, errs };
}
const st = (page) => page.evaluate(() => window.__holdoutState());
const vis = (page, sel) => page.evaluate((s) => window.__vis(s), sel);
const txt = (page, sel) => page.evaluate((s) => window.__txt(s), sel);
async function polls(page, n) {             // wait for n more controller polls (= rendered frames)
  const target = (await page.evaluate(() => window.__pad.calls)) + (n || 2);
  await page.waitForFunction((t) => window.__pad.calls >= t, target, { timeout: 20000 });
}
const btn = (page, i, v) => page.evaluate(([i2, v2]) => window.__pad.btn(i2, v2), [i, v]);
const axes = (page, a) => page.evaluate((a2) => window.__pad.axes(a2), a);
async function press(page, i) { await btn(page, i, 1); await polls(page, 2); await btn(page, i, 0); await polls(page, 1); }
async function simWait(page, sec) {         // wait for sim time to pass
  const t = (await st(page)).t + sec;
  await page.waitForFunction((t2) => window.__holdoutState().t >= t2, t, { timeout: 20000 + sec * 4000 });
}
const until = (page, fn, arg, ms) => page.waitForFunction(fn, arg, { timeout: ms || 10000 }).then(() => true, () => false);
async function connectAndStart(page) {
  await page.evaluate(() => window.__pad.connect());
  await polls(page, 2);
  await press(page, A);
  return until(page, () => window.__holdoutState().phase === 'pre');
}
async function section(name, fn) {
  console.log(name);
  try { await fn(); } catch (e) { check(name + ': completed without a harness exception', false, String(e && e.message || e).split('\n')[0]); }
}
const errorsOf = (label, errs, s) => check(label + ': zero console/page errors', errs.length === 0 && (!s || !s.pad.error), errs.length ? errs.slice(0, 5) : s && s.pad.error);

// ------------------------------------------------------------------ 1. start card, labels, buy screen
async function testMenus(browser) {
  const { ctx, page, errs } = await open(browser);
  await polls(page, 3);
  let s = await st(page);
  const d0 = await page.evaluate(() => ({ kbm: document.body.classList.contains('dev-kbm'), go: __txt('#startGo'), status: __txt('#padStatus'),
    kbTable: __vis('#kbTable'), padTable: __vis('#padTable'), hosted: __vis('#padHosted'), table: __txt('#padTable') }));
  check('start card leads with the controller layout before any input', d0.padTable && !d0.kbTable && !d0.kbm && s.device === 'pad' && /Right stick/.test(d0.table) && /Menu/.test(d0.table), d0);
  check('no controller yet: card says to connect one and press any button', /press any button on your controller/i.test(d0.status) && /CONNECT A CONTROLLER/.test(d0.go) && !s.pad.connected, d0);
  check('standalone build does not show the hosted-viewer note', !d0.hosted);

  await page.evaluate(() => window.__pad.connect([0]));         // the pad appears on its first button press: (A) is already held
  await polls(page, 3);
  s = await st(page);
  const d1 = await page.evaluate(() => ({ go: __txt('#startGo'), status: __txt('#padStatus') }));
  check('status line updates live: "Controller: <name> connected"', d1.status === 'Controller: Xbox Wireless Controller connected' && s.pad.connected && s.pad.active, d1);
  check('start prompt becomes "PRESS A TO START"', d1.go === 'PRESS A TO START', d1.go);
  check('a button already held when the pad appears is not a press', s.phase === 'menu', s.phase);
  await btn(page, A, 0); await polls(page, 1);
  await press(page, A);
  const started = await until(page, () => window.__holdoutState().phase === 'pre');
  s = await st(page);
  const d2 = await page.evaluate(() => ({ start: __vis('#start'), hud: __vis('#hud'), lock: !!document.pointerLockElement, charges: __txt('#charges'), zLeft: __txt('#zLeft') }));
  check('(A) starts the game with no mouse', started && !d2.start && d2.hud, { phase: s.phase, d2 });
  check('HUD prompts are controller labels before any keyboard input', /\[RB\]/.test(d2.charges) && !/\[G\]/.test(d2.charges) && /View/.test(d2.zLeft), d2);
  const t0 = s.t;
  await polls(page, 6);
  s = await st(page);
  check('not paused without pointer lock: sim time advances', !s.paused && !d2.lock && !s.freeLook && s.t > t0 + 0.2, { paused: s.paused, lock: d2.lock, freeLook: s.freeLook, dt: s.t - t0 });

  await press(page, VIEW);
  s = await st(page);
  const d3 = await page.evaluate(() => ({ buy: __vis('#buy'), hint: __vis('#buy .padhint'), hintTxt: __txt('#buy .padhint'), close: __txt('#buyClose'), ready: __txt('#buyReady'),
    first: __txt('#buyGrid .item .n'), sel: [...document.querySelectorAll('#buyGrid .item')].findIndex((e) => e.classList.contains('sel')) }));
  check('View opens the buy screen before round 1', s.buyOpen && d3.buy && s.phase === 'pre', { buyOpen: s.buyOpen, phase: s.phase });
  check('buy screen shows controller prompts', d3.hint && /\(A\)/.test(d3.hintTxt) && /^\(B\)/.test(d3.close) && /^\(Y\)/.test(d3.ready) && !/^\[/.test(d3.first), d3);
  check('buy screen starts with item 0 highlighted', s.buySel === 0 && d3.sel === 0, { buySel: s.buySel, dom: d3.sel });
  await press(page, RIGHT); const r1 = (await st(page)).buySel;
  await press(page, DOWN); const r2 = (await st(page)).buySel;
  await press(page, DOWN); const r3 = (await st(page)).buySel;
  check('D-pad moves the highlight (right, down, down = 1, 3, 5)', r1 === 1 && r2 === 3 && r3 === 5, [r1, r2, r3]);
  const hl = await page.evaluate(() => { const items = [...document.querySelectorAll('#buyGrid .item')]; const i = items.findIndex((e) => e.classList.contains('sel')); const cs = i >= 0 ? getComputedStyle(items[i]) : null;
    return { i, n: items.filter((e) => e.classList.contains('sel')).length, outline: cs && cs.outlineStyle + ' ' + cs.outlineWidth }; });
  check('highlight is clearly visible on exactly one item', hl.i === 5 && hl.n === 1 && hl.outline === 'solid 3px', hl);
  const sal0 = (await st(page)).salvage;
  await press(page, A);
  s = await st(page);
  const owned = await page.evaluate(() => document.querySelectorAll('#buyGrid .item')[5].classList.contains('owned'));
  check('(A) buys the highlighted item: salvage drops', s.salvage === sal0 - 300 && owned && s.buySel === 5, { before: sal0, after: s.salvage, owned });
  await press(page, B);
  s = await st(page);
  check('(B) closes the buy screen', !s.buyOpen && !(await vis(page, '#buy')), { buyOpen: s.buyOpen });
  await page.waitForTimeout(1600);            // a refused mouse-capture request would show up within 1.2 s
  s = await st(page);
  check('closing the buy screen on the controller asks for no mouse capture (no pause, no free-look)', !s.paused && !s.freeLook && s.device === 'pad' && !(await page.evaluate(() => !!document.pointerLockElement)), { paused: s.paused, freeLook: s.freeLook });

  // labels follow the active device: a real key press switches to keyboard labels, the next pad input switches back
  await page.keyboard.press('KeyM');
  await polls(page, 2);
  s = await st(page);
  const d4 = await page.evaluate(() => ({ kbm: document.body.classList.contains('dev-kbm'), charges: __txt('#charges') }));
  check('keyboard input switches the prompts to keyboard labels', s.device === 'kbm' && d4.kbm && /\[G\]/.test(d4.charges) && !s.mapOn, { device: s.device, d4 });
  await press(page, UP);
  s = await st(page);
  const d5 = await page.evaluate(() => ({ kbm: document.body.classList.contains('dev-kbm'), charges: __txt('#charges') }));
  check('the next controller input switches them back', s.device === 'pad' && !d5.kbm && /\[RB\]/.test(d5.charges) && s.mapOn, { device: s.device, d5 });
  errorsOf('menus', errs, s);
  await ctx.close();
}

// ------------------------------------------------------------------ 2. moving, looking, weapons
async function testPlay(browser) {
  const { ctx, page, errs } = await open(browser);
  check('start with (A)', await connectAndStart(page));
  await press(page, VIEW);
  const o1 = (await st(page)).buyOpen;
  await press(page, VIEW);
  const o2 = (await st(page)).buyOpen;
  check('View toggles the buy screen (open, then close)', o1 && !o2, [o1, o2]);

  // deadzone: tilt below 0.12 must do nothing at all
  let s0 = await st(page);
  await axes(page, [0.07, 0.07, 0.08, -0.07]);
  await polls(page, 8);
  let s = await st(page);
  check('no drift below the deadzone (yaw, pitch and position unchanged)', s.yaw === s0.yaw && s.pitch === s0.pitch && Math.hypot(s.x - s0.x, s.z - s0.z) < 1e-6 && s.pad.moveMag === 0, { dyaw: s.yaw - s0.yaw, dpitch: s.pitch - s0.pitch });

  // left stick: analog walk
  s0 = await st(page);
  await axes(page, [0, -1, 0, 0]); await simWait(page, 1.0);
  const full = await st(page);
  await axes(page, [0, -0.5, 0, 0]); await simWait(page, 1.0);
  const half = await st(page);
  await axes(page, [0.8, -0.8, 0, 0]); await simWait(page, 1.0);
  const diag = await st(page);
  info.walk = { fullTilt: +full.speed.toFixed(2), halfTilt: +half.speed.toFixed(2), diagonal: +diag.speed.toFixed(2), movedM: +Math.hypot(full.x - s0.x, full.z - s0.z).toFixed(2) };
  check('left stick moves the player', full.speed > 4 && full.z < s0.z - 1, info.walk);
  check('half tilt walks slower than full tilt', half.speed > 0.8 && half.speed < full.speed * 0.75, info.walk);
  check('diagonal speed does not exceed straight speed', diag.speed <= full.speed * 1.02 && diag.speed > full.speed * 0.9, info.walk);

  // sprint toggle on the left stick click; cancels when the stick returns to rest
  await axes(page, [0, -1, 0, 0]); await polls(page, 2);
  await press(page, LS); await simWait(page, 0.8);
  const spr = await st(page);
  await axes(page, [0, 0, 0, 0]); await polls(page, 3);
  s = await st(page);
  check('left stick click toggles sprint; it cancels when the stick returns to rest', spr.sprinting && spr.pad.sprintToggle && spr.speed > 6 && !s.pad.sprintToggle && !s.sprinting, { sprintSpeed: +spr.speed.toFixed(2), after: s.pad.sprintToggle });
  await axes(page, [0, -1, 0, 0]); await polls(page, 2); await press(page, LS);
  const on2 = (await st(page)).pad.sprintToggle;
  await axes(page, [0, 1, 0, 0]); await polls(page, 2);
  const back = (await st(page)).pad.sprintToggle;
  await axes(page, [0, -1, 0, 0]); await polls(page, 2); await press(page, LS);
  const on3 = (await st(page)).pad.sprintToggle;
  await btn(page, LT, 1); await polls(page, 2);
  const aim = (await st(page)).pad.sprintToggle;
  await btn(page, LT, 0); await axes(page, [0, 0, 0, 0]); await polls(page, 2);
  await until(page, () => window.__holdoutState().fov > 74.5, null, 5000);
  check('sprint also cancels when the stick moves backward, and when aiming', on2 && !back && on3 && !aim, { on2, back, on3, aim });

  // right stick: look
  const sample = () => page.evaluate(() => { const q = window.__holdoutState(); return { yaw: q.yaw, pitch: q.pitch, now: performance.now() }; });
  await axes(page, [0, 0, 1, 0]); await polls(page, 2);
  let a = await sample(); await polls(page, 8); let b = await sample();
  const yawRate = ((a.yaw - b.yaw) * 180 / Math.PI) / ((b.now - a.now) / 1000);
  await axes(page, [0, 0, 0.5, 0]); await polls(page, 2);
  a = await sample(); await polls(page, 8); b = await sample();
  const halfRate = ((a.yaw - b.yaw) * 180 / Math.PI) / ((b.now - a.now) / 1000);
  await axes(page, [0, 0, 0, -1]); await polls(page, 2);
  a = await sample(); await polls(page, 4); b = await sample();
  const pitchRate = ((b.pitch - a.pitch) * 180 / Math.PI) / ((b.now - a.now) / 1000);
  await axes(page, [0, 0, 0, 0]); await polls(page, 2);
  info.look = { yawDegPerS: +yawRate.toFixed(0), halfTiltYawDegPerS: +halfRate.toFixed(0), pitchDegPerS: +pitchRate.toFixed(0), note: 'headless frames are software-rendered and close to the 100 ms step cap, so these rates are noisy' };
  check('right stick turns (right = clockwise, at a rate near 200 deg/s)', yawRate > 90 && yawRate < 300, info.look);
  check('response curve: half tilt turns much slower than half speed', halfRate > 5 && halfRate < yawRate * 0.45, info.look);
  check('right stick up looks up (near 130 deg/s)', pitchRate > 50 && pitchRate < 200, info.look);

  // RT: analog trigger with hysteresis (press 0.35, release 0.20)
  s0 = await st(page);
  await btn(page, RT, 0.30); await polls(page, 4);
  const below = (await st(page)).ammo;
  await btn(page, RT, 0.5);
  const fired = await until(page, (n) => window.__holdoutState().ammo < n, s0.ammo, 6000);
  await btn(page, RT, 0.25); await polls(page, 2);
  const h1 = (await st(page)).ammo; await simWait(page, 0.5); const h2 = (await st(page)).ammo;
  await btn(page, RT, 0.10); await polls(page, 2);
  const r1 = (await st(page)).ammo; await simWait(page, 0.4); const r2 = (await st(page)).ammo;
  s = await st(page);
  const rum = await page.evaluate(() => ({ n: window.__pad.rumbles.length, types: [...new Set(window.__pad.rumbles.map((r) => r.type))] }));
  check('RT fires: ammo drops', fired && r2 < s0.ammo, { start: s0.ammo, end: r2 });
  check('trigger hysteresis: 0.30 does not fire, 0.25 keeps firing once pressed, 0.10 releases', below === s0.ammo && h2 < h1 && r2 === r1, { below, h1, h2, r1, r2 });
  check('firing plays a guarded rumble pulse (trigger-rumble where the actuator lists it)', rum.n > 0 && s.pad.rumbles === rum.n && rum.types.includes('trigger-rumble'), rum);

  await press(page, X);
  const reloading = (await st(page)).reloading;
  const refilled = await until(page, () => window.__holdoutState().ammo === 30, null, 12000);
  check('(X) reloads', reloading && refilled, { reloading, ammo: (await st(page)).ammo });

  await btn(page, LT, 1);
  const zoomed = await until(page, () => window.__holdoutState().fov < 70, null, 5000);
  const fovIn = (await st(page)).fov;
  await btn(page, LT, 0);
  const unzoomed = await until(page, () => window.__holdoutState().fov > 74.5, null, 5000);
  check('LT aims down sights with the rifle (fov changes)', zoomed && unzoomed, { fovAiming: +fovIn.toFixed(1) });

  await press(page, Y);
  const w1 = (await st(page)).weapon;
  await btn(page, LT, 1); await polls(page, 3); const blkLT = (await st(page)).blocking;
  await btn(page, LT, 0); await polls(page, 2); const blkOff = (await st(page)).blocking;
  await btn(page, LB, 1); await polls(page, 3); const blkLB = (await st(page)).blocking;
  await btn(page, LB, 0); await polls(page, 2);
  check('(Y) swaps weapon', w1 === 'bat', w1);
  check('LT blocks with the bat, LB blocks, releasing stops', blkLT && !blkOff && blkLB, { blkLT, blkOff, blkLB });
  await simWait(page, 1.2);
  let e0 = (await st(page)).stamina;
  await btn(page, RT, 1); await polls(page, 2); await btn(page, RT, 0); await polls(page, 1);
  let e1 = (await st(page)).stamina;
  check('RT swings the bat (stamina spent)', e1 < e0 - 10, { before: e0, after: e1 });
  await press(page, Y);
  const w2 = (await st(page)).weapon;
  await simWait(page, 1.0);
  e0 = (await st(page)).stamina;
  await press(page, RS);
  e1 = (await st(page)).stamina;
  check('(Y) swaps back; right stick click swings with the rifle out', w2 === 'rifle' && e1 < e0 - 10, { weapon: w2, before: e0, after: e1 });
  s0 = await st(page);
  await axes(page, [0, 0, 0, -1]); await polls(page, 3); await axes(page, [0, 0, 0, 0]);       // look up a little before throwing
  await press(page, RB);
  await press(page, A);
  s = await st(page);
  check('RB throws a breach charge, (A) pings', s.charges === s0.charges - 1 && s.chargesThrown === 1 && s.pings === s0.pings + 1, { charges: s.charges, thrown: s.chargesThrown, pings: s.pings });
  errorsOf('play', errs, s);
  await ctx.close();
}

// ------------------------------------------------------------------ 2b. Sapper Reinforce tool on (B), hold rule
async function testReinforce(browser) {
  const { ctx, page, errs } = await open(browser);
  check('start with (A)', await connectAndStart(page));
  // find a building within tool range: turn on the spot, and walk a little between turns if none is close
  let found = false;
  for (let leg = 0; leg < 6 && !found; leg++) {
    await axes(page, [0, 0, 0.6, 0]);
    found = await until(page, () => window.__holdoutState().aimB, null, 4500);
    await axes(page, [0, 0, 0, 0]); await polls(page, 2);
    found = (await st(page)).aimB;
    if (!found) { await axes(page, [0, -1, 0, 0]); await simWait(page, 1.5); await axes(page, [0, 0, 0, 0]); }
  }
  let s = await st(page);
  check('a building is under the crosshair (found by turning with the right stick)', found, { x: s.x, z: s.z, yaw: s.yaw });
  const prompt = await txt(page, '#prompt');
  check('interaction prompt shows the controller label', /\(hold B\)/.test(prompt || '') && !/hold F/.test(prompt || ''), prompt);
  const sal0 = s.salvage;
  await btn(page, B, 1); await polls(page, 3);
  const mid = await st(page);
  await btn(page, B, 0); await polls(page, 2);
  s = await st(page);
  check('a short (B) press does nothing (same hold rule as the keyboard)', mid.repairT > 0 && s.salvage === sal0 && s.reinforced === 0 && s.repairT === 0, { repairT: mid.repairT, salvage: s.salvage });
  await btn(page, B, 1);
  const done = await until(page, () => window.__holdoutState().reinforced === 1, null, 8000);
  await btn(page, B, 0); await polls(page, 2);
  s = await st(page);
  check('holding (B) for 1 s reinforces the building and spends Salvage', done && s.salvage < sal0, { reinforced: s.reinforced, before: sal0, after: s.salvage });
  errorsOf('reinforce', errs, s);
  await ctx.close();
}

// ------------------------------------------------------------------ 3. pause, toggles, sensitivity, disconnect, blocked
async function testSystem(browser) {
  const { ctx, page, errs } = await open(browser);
  check('start with (A)', await connectAndStart(page));
  await press(page, VIEW);
  await axes(page, [0, 1, 0, 0]);                                // left stick down, held: first step then repeat
  const repeated = await until(page, () => window.__holdoutState().buySel >= 4, null, 6000);
  const selHeld = (await st(page)).buySel;
  await axes(page, [0, 0, 0, 0]); await polls(page, 1);
  check('left stick moves the highlight and repeats while held', repeated && selHeld % 2 === 0, selHeld);
  await press(page, Y);
  let s = await st(page);
  check('(Y) in the buy screen readies up: round 1 starts', s.phase === 'round' && !s.buyOpen && s.round === 1 && !s.paused, { phase: s.phase, buyOpen: s.buyOpen });

  const resets0 = await page.evaluate(() => window.__pad.resets);
  await press(page, MENU);
  s = await st(page);
  const p1 = await page.evaluate(() => ({ vis: __vis('#pause'), text: __txt('#pause'), resets: window.__pad.resets }));
  const tA = s.t; await polls(page, 5); const tB = (await st(page)).t;
  check('Menu pauses: overlay shown, sim time frozen', s.paused && p1.vis && tB === tA, { paused: s.paused, dt: tB - tA });
  check('pause overlay shows controller prompts', /Menu/.test(p1.text) && /\(A\)/.test(p1.text) && !/Click to resume/.test(p1.text), p1.text);
  check('rumble is stopped on pause', p1.resets > resets0, { before: resets0, after: p1.resets });
  await press(page, MENU);
  s = await st(page);
  const tC = s.t; await polls(page, 4); const tD = (await st(page)).t;
  check('Menu resumes', !s.paused && !(await vis(page, '#pause')) && tD > tC, { paused: s.paused });
  const pings0 = s.pings;
  await press(page, MENU); const pz = (await st(page)).paused;
  await press(page, A); await polls(page, 3);
  s = await st(page);
  check('(A) also resumes, and that press does not act in the game', pz && !s.paused && s.pings === pings0, { paused: s.paused, pings: s.pings });

  await press(page, UP); const m1 = (await st(page)).mapOn; const mv1 = await vis(page, '#minimap');
  await press(page, UP); const m2 = (await st(page)).mapOn; const mv2 = await vis(page, '#minimap');
  check('D-pad up toggles the minimap', !m1 && !mv1 && m2 && mv2, [m1, m2]);
  await press(page, DOWN); const g1 = (await st(page)).debugOn; const gv1 = await vis(page, '#debug');
  await press(page, DOWN); const g2 = (await st(page)).debugOn;
  check('D-pad down toggles the debug panel', g1 && gv1 && !g2, [g1, g2]);
  const sens0 = (await st(page)).lookSens;
  await press(page, RIGHT);
  const sens1 = (await st(page)).lookSens;
  const sd = await page.evaluate(() => { let stored = null; try { stored = localStorage.getItem('holdout.padSens'); } catch (e) { stored = 'blocked'; } return { stored, toast: __txt('#toasts') }; });
  await press(page, LEFT);
  const sens2 = (await st(page)).lookSens;
  check('D-pad right raises look sensitivity (toast shows the value, stored), left lowers it', sens0 === 1 && sens1 === 1.1 && sens2 === 1 && /Look sensitivity 1\.1x/.test(sd.toast) && (sd.stored === '1.1' || sd.stored === 'blocked'), { sens0, sens1, sens2, sd });

  // disconnect mid-game while the trigger and stick are held
  await btn(page, RT, 1); await axes(page, [0, -1, 0, 0]); await polls(page, 3);
  await page.evaluate(() => window.__pad.disconnect());
  await page.waitForTimeout(400);
  s = await st(page);
  const dz = await page.evaluate(() => ({ why: __vis('#pauseWhy') ? __txt('#pauseWhy') : null, status: __txt('#padStatus'), pause: __vis('#pause') }));
  check('disconnecting the pad mid-game pauses', s.paused && dz.pause && !s.pad.connected && /disconnected/i.test(dz.why || ''), { paused: s.paused, dz });
  const ammoAtDisc = s.ammo;
  await page.evaluate(() => window.__pad.connect());
  await polls(page, 3);
  s = await st(page);
  const why2 = await txt(page, '#pauseWhy');
  check('reconnecting is picked up while paused', s.pad.connected && s.paused && /connected/i.test(why2 || ''), { connected: s.pad.connected, why2 });
  await press(page, MENU);
  await simWait(page, 0.5);
  s = await st(page);
  check('resume after reconnect: the inputs held at disconnect were cleared', !s.paused && s.ammo === ammoAtDisc && s.speed < 0.3, { paused: s.paused, ammo: s.ammo, was: ammoAtDisc, speed: s.speed });

  // the viewer starts refusing the API mid-game
  await page.evaluate(() => { window.__pad.mode = 'throw'; });
  await page.waitForTimeout(500);
  const c1 = await page.evaluate(() => window.__pad.calls);
  await page.waitForTimeout(700);
  const c2 = await page.evaluate(() => window.__pad.calls);
  s = await st(page);
  check('getGamepads throwing mid-game: marked blocked, paused, not polled again', s.pad.blocked && s.paused && !s.pad.connected && c2 === c1, { blocked: s.pad.blocked, paused: s.paused, callsAfter: c2 - c1 });
  await page.mouse.click(640, 360);
  await page.waitForTimeout(1800);
  s = await st(page);
  check('mouse click then resumes on the developer fallback path', !s.paused && s.device === 'kbm', { paused: s.paused, device: s.device, freeLook: s.freeLook });
  errorsOf('system', errs, s);
  await ctx.close();
}

// ------------------------------------------------------------------ 4. API blocked / missing / empty / non-standard
async function testFallbacks(browser) {
  for (const mode of ['throw', 'missing', 'empty']) {
    const { ctx, page, errs } = await open(browser, { mode });
    await page.waitForTimeout(1200);
    let s = await st(page);
    const d = await page.evaluate(() => ({ status: __txt('#padStatus'), go: __txt('#startGo'), calls: window.__pad.calls, kb: __vis('#kbTable') }));
    if (mode === 'throw') check('getGamepads throwing from the start: blocked, polled once, start card says so', s.pad.blocked && d.calls === 1 && /blocked/i.test(d.status) && /CLICK TO START/.test(d.go), d);
    if (mode === 'missing') check('getGamepads missing: marked unsupported, start card says so', s.pad.blocked && !s.pad.supported && /not supported/i.test(d.status), d);
    if (mode === 'empty') check('getGamepads empty forever: keeps waiting for a controller', !s.pad.blocked && !s.pad.connected && /none detected/i.test(d.status) && d.calls > 3, d);
    if (mode === 'throw') {
      await page.keyboard.press('KeyK');
      const k1 = await vis(page, '#kbTable');
      await page.keyboard.press('KeyK');
      const k2 = await vis(page, '#kbTable');
      check('key list is hidden until K is pressed', !d.kb && k1 && !k2, [d.kb, k1, k2]);
    }
    await page.mouse.click(640, 600);
    await page.waitForTimeout(1500);
    await page.keyboard.down('KeyW'); await page.waitForTimeout(700);
    s = await st(page);
    await page.keyboard.up('KeyW');
    const charges = await txt(page, '#charges');
    check(`${mode}: mouse click still starts and the keyboard still plays (developer fallback)`, s.phase === 'pre' && !s.paused && s.speed > 2 && s.device === 'kbm' && /\[G\]/.test(charges), { phase: s.phase, paused: s.paused, speed: s.speed, charges });
    errorsOf(mode, errs, s);
    await ctx.close();
  }
  const { ctx, page, errs } = await open(browser, { mapping: '', id: 'Generic USB Joystick (Vendor: 0079 Product: 0006)' });
  await page.evaluate(() => window.__pad.connect());
  await polls(page, 2);
  const status = await txt(page, '#padStatus');
  await press(page, A);
  const started = await until(page, () => window.__holdoutState().phase === 'pre');
  await polls(page, 6);
  const warns = await page.evaluate(() => [...document.querySelectorAll('#toasts div')].filter((e) => /layout may be off/.test(e.textContent)).length);
  const s = await st(page);
  check('non-standard mapping: still uses the standard indices and warns once', started && /non-standard/.test(status) && warns === 1 && !s.pad.standard, { status, warns });
  errorsOf('non-standard', errs, s);
  await ctx.close();
}

// ------------------------------------------------------------------ 5. hosted variant note (only if it was built)
async function testHosted(browser) {
  if (!fs.existsSync(HOSTED)) { info.hosted = 'skipped: build it with  python3 build.py --hosted .build/hosted/holdout-greybox.html'; console.log('  (hosted variant not built: skipped)'); return; }
  const wrapped = path.join(path.dirname(HOSTED), 'wrapped-gamepad.html');
  fs.writeFileSync(wrapped, '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>' + fs.readFileSync(HOSTED, 'utf8') + '</body></html>');
  const { ctx, page, errs } = await open(browser, {}, 'file://' + wrapped);
  const note = await page.evaluate(() => ({ vis: __vis('#padHosted'), text: __txt('#padHosted') }));
  check('hosted variant: start card says controllers may be blocked in the viewer', note.vis && /may be blocked in this viewer/.test(note.text) && /standalone index\.html/.test(note.text), note);
  check('hosted variant: the controller still starts the game when the viewer allows it', await connectAndStart(page));
  errorsOf('hosted', errs, await st(page));
  info.hosted = 'checked';
  await ctx.close();
}

// ------------------------------------------------------------------ 6. optional: die, summary prompts, (A) restarts
async function testDeath(browser) {
  const { ctx, page, errs } = await open(browser);
  check('start with (A)', await connectAndStart(page));
  await press(page, VIEW); await press(page, Y);
  await axes(page, [0, 0, 0.3, 0]);                              // turn slowly so the crosshair sweeps over the horde
  let minSlow = 1, hurt = 0;
  const t0 = Date.now();
  while (Date.now() - t0 < 300000) {
    const s = await st(page);
    minSlow = Math.min(minSlow, s.pad.aimSlow);
    if (!s.alive) break;
    await page.waitForTimeout(150);
  }
  hurt = await page.evaluate(() => window.__pad.rumbles.filter((r) => r.type === 'dual-rumble').length);
  const resetsAtDeath = await page.evaluate(() => window.__pad.resets);
  const shown = await until(page, () => window.__holdoutState().summaryShown, null, 8000);
  let s = await st(page);
  const d = await page.evaluate(() => ({ restart: __txt('#restartBtn'), log: __txt('#logBtn'), vis: __vis('#summary') }));
  info.death = { diedAfterS: +((Date.now() - t0) / 1000).toFixed(0), round: s.round, hurtRumbles: hurt, minAimSlowdownFactor: minSlow };
  check('death: the horde killed the idle player and the summary appeared', !s.alive && shown && d.vis, info.death);
  check('taking damage rumbles; rumble is stopped on death', hurt > 0 && resetsAtDeath > 0, { hurt, resetsAtDeath });
  check('aim slowdown engaged while the crosshair crossed a zombie', minSlow < 0.95, { minSlow });
  check('summary shows controller prompts', /^\(A\) Restart/.test(d.restart) && /^\(Y\)/.test(d.log), d);
  errorsOf('death', errs, s);
  await axes(page, [0, 0, 0, 0]);
  await btn(page, A, 1);
  const reloaded = await until(page, () => typeof window.__holdoutState === 'function' && window.__holdoutState().phase === 'menu' && window.__holdoutState().t === 0, null, 30000);
  check('(A) on the summary restarts', reloaded);
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch();
  await section('1. start card, labels, buy screen', () => testMenus(browser));
  await section('2. moving, looking, weapons', () => testPlay(browser));
  await section('2b. Reinforce tool on (B)', () => testReinforce(browser));
  await section('3. pause, toggles, sensitivity, disconnect, blocked', () => testSystem(browser));
  await section('4. API blocked / missing / empty, non-standard pad', () => testFallbacks(browser));
  await section('5. hosted variant note', () => testHosted(browser));
  if (DEATH) await section('6. death, summary, restart', () => testDeath(browser));
  await browser.close();
  const failed = checks.filter((c) => !c.pass);
  const summary = { pass: failed.length === 0, checks: checks.length, failed: failed.map((c) => ({ name: c.name, detail: c.detail })), info,
    note: 'mocked standard pad in headless Chromium; no real controller hardware was used' };
  console.log('\nHOLDOUT GAMEPAD RESULT');
  console.log(JSON.stringify(summary, null, 2));
  console.log(summary.pass ? 'PASS' : 'FAIL');
  process.exit(summary.pass ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(2); });
