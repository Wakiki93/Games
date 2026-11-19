// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Headless controller check:  node verify_gamepad.js [--death] [--only=1,2b,...]
// There is no real controller here, so navigator.getGamepads is replaced by a scriptable fake standard pad. The game
// runs in normal mode (no ?autotest) and is driven by the fake pad alone unless a check says otherwise.
// Prints a JSON summary and PASS/FAIL; exit code 0 = pass, 1 = fail, 2 = harness crash.
//   --death     also let the horde kill the player, then check the summary prompts, rumble stop, the restart guard and
//               the one-press (A) restart (~2 min).
//   --only=...  run only the listed sections (1, 1b, 2, 2b, 3, 3b, 4, 5, 6), for a quick re-run of one area.
// If the hosted variant was built (.build/hosted/holdout-greybox.html) its start-card note is checked too.
// The checks wait on game state and sim time, not on frame counts or wall-clock time, so the result does not depend on
// the frame rate of the machine. Turn rates are measured against sim time for the same reason.

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const HERE = __dirname;
const URL = 'file://' + path.join(HERE, 'index.html');
const HOSTED = path.join(HERE, '.build', 'hosted', 'holdout-greybox.html');
const DEATH = process.argv.includes('--death');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const A = 0, B = 1, X = 2, Y = 3, LB = 4, RB = 5, LT = 6, RT = 7, VIEW = 8, MENU = 9, LS = 10, RS = 11, UP = 12, DOWN = 13, LEFT = 14, RIGHT = 15;
const DEG = 180 / Math.PI;

const checks = [];
const info = {};
function check(name, pass, detail) {
  checks.push({ name, pass: !!pass, detail: detail === undefined ? undefined : detail });
  console.log(`  ${pass ? 'ok  ' : 'FAIL'} ${name}${pass || detail === undefined ? '' : '  ' + JSON.stringify(detail)}`);
}

// runs in the page before the game: the fake pads and small DOM helpers
function initPad(opt) {
  window.__holdoutHarness = true;
  const ctl = window.__pad = { pad: null, slots: [null, null, null, null], mode: opt.mode || 'ok', calls: 0, rumbles: [], resets: 0, queue: [] };
  const make = (o) => ({
    id: o.id || opt.id || 'Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e Product: 0b22)', index: o.index, connected: true,
    mapping: o.mapping !== undefined ? o.mapping : opt.mapping === undefined ? 'standard' : opt.mapping, timestamp: 0, axes: (o.axes || [0, 0, 0, 0]).slice(),
    buttons: Array.from({ length: 17 }, () => ({ pressed: false, touched: false, value: 0 })),
    vibrationActuator: {
      type: 'dual-rumble', effects: ['dual-rumble', 'trigger-rumble'],
      playEffect(type, p) { ctl.rumbles.push({ type, duration: p.duration, weak: p.weakMagnitude, strong: p.strongMagnitude }); return Promise.resolve('complete'); },
      reset() { ctl.resets++; return Promise.resolve('complete'); },
    },
  });
  // btn() and axes() act on the "current" pad (ctl.pad); use(slot) picks it when more than one device is listed
  ctl.btn = (i, v) => { const b = ctl.pad.buttons[i]; b.value = v; b.pressed = v > (i === 6 || i === 7 ? 0.1 : 0.5); b.touched = v > 0; };
  ctl.axes = (a) => { for (let i = 0; i < 4; i++) ctl.pad.axes[i] = a[i]; };
  ctl.add = (slot, o, held) => {                 // a device appears in a slot; it becomes the current one only if there is none
    const prev = ctl.pad; ctl.pad = ctl.slots[slot] = make(Object.assign({ index: slot }, o || {}));
    for (const i of held || []) ctl.btn(i, 1);
    if (prev) ctl.pad = prev;
    window.dispatchEvent(new Event('gamepadconnected'));
  };
  ctl.remove = (slot, quiet) => { if (ctl.pad === ctl.slots[slot]) ctl.pad = null; ctl.slots[slot] = null; if (!quiet) window.dispatchEvent(new Event('gamepaddisconnected')); };
  ctl.use = (slot) => { ctl.pad = ctl.slots[slot]; };
  ctl.connect = (held) => ctl.add(1, null, held);      // slot 1, so the list starts with a null entry like a real one with an empty slot
  ctl.disconnect = () => ctl.remove(1);
  // seq(): a list of pad states applied one per controller poll (= one per rendered frame), for exact press sequences
  ctl.seq = (steps) => { for (const s of steps) ctl.queue.push(s); };
  if (opt.preconnect) { ctl.pad = ctl.slots[1] = make({ index: 1 }); ctl.btn(7, 1); ctl.btn(0, 1); ctl.axes([1, -1, 1, 0]); }
  if (ctl.mode === 'missing') Object.defineProperty(navigator, 'getGamepads', { configurable: true, value: undefined });
  else Object.defineProperty(navigator, 'getGamepads', { configurable: true, writable: true, value: () => {
    ctl.calls++;
    if (ctl.mode === 'throw') throw new DOMException("Access to the feature 'gamepad' is disallowed by permissions policy.", 'SecurityError');
    if (ctl.mode === 'empty') return [];
    if (ctl.queue.length && ctl.pad) { const s = ctl.queue.shift(); if (s.b) for (const k in s.b) ctl.btn(+k, s.b[k]); if (s.a) ctl.axes(s.a); }
    return ctl.slots;
  } });
  // Reinforce-tool search, driven by game state from inside the page (no wall-clock timeouts): turn slowly until a
  // building is under the crosshair and stop on that frame; after a full turn with nothing in reach, walk on and repeat.
  ctl.search = () => {
    const q = ctl.searching = { state: 'turn', acc: 0, lastYaw: null, walkUntil: 0, legs: 0, done: false };
    const tick = () => {
      if (q.done || !ctl.pad) return;
      const s = window.__holdoutState();
      if (s.aimB) { ctl.axes([0, 0, 0, 0]); q.done = true; return; }
      if (q.state === 'turn') {
        if (q.lastYaw !== null) q.acc += Math.abs(s.yaw - q.lastYaw);
        q.lastYaw = s.yaw;
        if (q.acc >= 2 * Math.PI) { q.state = 'walk'; q.walkUntil = s.t + 1.5; q.legs++; ctl.axes([0, -1, 0, 0]); }
        else ctl.axes([0, 0, 0.45, 0]);
      } else if (s.t >= q.walkUntil) { q.state = 'turn'; q.acc = 0; q.lastYaw = s.yaw; ctl.axes([0, 0, 0.45, 0]); }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  window.__vis = (sel) => { const e = document.querySelector(sel); return !!e && e.getClientRects().length > 0; };
  window.__txt = (sel) => { const e = document.querySelector(sel); return e ? e.innerText.replace(/\s+/g, ' ').trim() : null; };
  window.__top = (sel) => {                      // is the element really on top at its centre (not covered by another overlay)?
    const e = document.querySelector(sel); if (!e || !e.getClientRects().length) return false;
    const r = e.getBoundingClientRect(), t = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return !!t && (t === e || e.contains(t));
  };
  window.__toasts = () => [...document.querySelectorAll('#toasts div')].map((e) => e.textContent);
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
async function seq(page, steps) {           // exact sequence: each step is seen by exactly one controller poll
  await page.evaluate((s) => window.__pad.seq(s), steps);
  await page.waitForFunction(() => window.__pad.queue.length === 0, null, { timeout: 20000 });
  await polls(page, 1);
}
async function simWait(page, sec) {         // wait for sim time to pass (throws on timeout)
  const t = (await st(page)).t + sec;
  await page.waitForFunction((t2) => window.__holdoutState().t >= t2, t, { timeout: 20000 + sec * 4000 });
}
const until = (page, fn, arg, ms) => page.waitForFunction(fn, arg, { timeout: ms || 10000 }).then(() => true, () => false);
const simPast = (page, t, ms) => until(page, (t2) => window.__holdoutState().t >= t2, t, ms || 15000);     // like simWait, but never throws
async function turnRate(page, ax, n) {      // degrees per second of SIM time (exact at any frame rate; see the header)
  await axes(page, ax); await polls(page, 2);
  const a = await st(page); await polls(page, n || 8); const b = await st(page);
  const dt = b.t - a.t;
  return { yaw: ((a.yaw - b.yaw) * DEG) / dt, pitch: ((b.pitch - a.pitch) * DEG) / dt };
}
async function connectAndStart(page) {
  await page.evaluate(() => window.__pad.connect());
  await polls(page, 2);
  await press(page, A);
  return until(page, () => window.__holdoutState().phase === 'pre');
}
async function section(id, name, fn) {
  if (ONLY.length && !ONLY.includes(id)) return;
  const title = `${id}. ${name}`;
  console.log(title);
  const t0 = Date.now();
  try { await fn(); } catch (e) { check(title + ': completed without a harness exception', false, String(e && e.message || e).split('\n')[0]); }
  (info.wallSeconds = info.wallSeconds || {})[id] = +((Date.now() - t0) / 1000).toFixed(0);
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
  check('test hook: paused is the boolean false on the start card (not undefined)', s.paused === false, { type: typeof s.paused });

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
  const advanced = await simPast(page, t0 + 0.2, 5000);          // waits on sim time, so the frame rate does not matter
  s = await st(page);
  check('not paused without pointer lock: sim time advances', advanced && s.paused === false && !d2.lock && !s.freeLook, { paused: s.paused, lock: d2.lock, freeLook: s.freeLook, dt: s.t - t0 });

  await press(page, VIEW);
  s = await st(page);
  const tOpen = s.t;
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

  // a D-pad press that brushes a second direction, or a stick near the diagonal, moves once (one pad state per poll)
  await press(page, LEFT);                                       // 5 -> 4
  await seq(page, [{ b: { 15: 1 } }, { b: { 13: 1 } }, { b: { 15: 0 } }, { b: { 13: 0 } }]);          // right, right+down, down, release
  const roll = (await st(page)).buySel;
  await seq(page, [{ b: { 12: 1 } }, { b: { 14: 1 } }, { b: { 14: 0 } }, { b: { 12: 0 } }]);          // up, up+left for one frame, up, release
  const blip = (await st(page)).buySel;
  await seq(page, [{ a: [-0.70, -0.71, 0, 0] }, { a: [-0.71, -0.70, 0, 0] }, { a: [-0.70, -0.71, 0, 0] }, { a: [-0.71, -0.70, 0, 0] }, { a: [0, 0, 0, 0] }]);
  const diag = (await st(page)).buySel;
  check('one D-pad press rolling right -> right+down -> down moves once right and once down (4 -> 7)', roll === 7, { from: 4, to: roll });
  check('an "up" press that brushes "left" for one frame moves up once only (7 -> 5)', blip === 5, { from: 7, to: blip });
  check('left stick held near the diagonal moves the highlight once, not once per frame (5 -> 3)', diag === 3, { from: 5, to: diag });

  await press(page, DOWN);                                       // 3 -> 5 (Short barrel, 300 S)
  await simPast(page, tOpen + 0.4);                              // (A) is ignored for the first 0.3 s after the screen opens
  const sal0 = (await st(page)).salvage;
  await press(page, A);
  s = await st(page);
  const owned = await page.evaluate(() => ({ owned: document.querySelectorAll('#buyGrid .item')[5].classList.contains('owned'), msg: __txt('#buyMsg') }));
  check('(A) buys the highlighted item: salvage drops', s.salvage === sal0 - 300 && owned.owned && s.buySel === 5, { before: sal0, after: s.salvage, owned });
  await press(page, A);                                          // again on the item that is now equipped
  const m1 = await page.evaluate(() => ({ msg: __txt('#buyMsg'), top: __top('#buyMsg'), salvage: window.__holdoutState().salvage }));
  await press(page, UP); await press(page, UP);                  // 5 -> 3 -> 1 (3x scope, 650 S: more than is left)
  await press(page, A);
  const m2 = await page.evaluate(() => ({ msg: __txt('#buyMsg'), top: __top('#buyMsg'), salvage: window.__holdoutState().salvage, sel: window.__holdoutState().buySel }));
  check('(A) on an item that cannot be bought says why inside the buy card (equipped, not enough Salvage)',
    /Bought Short barrel/.test(owned.msg) && /already equipped/i.test(m1.msg) && m1.top && m1.salvage === sal0 - 300 && m2.sel === 1 && /Not enough Salvage/i.test(m2.msg) && m2.top && m2.salvage === sal0 - 300, { bought: owned.msg, m1, m2 });

  // a pause that starts while the buy screen is open must be visible on top of it, and resume back into it
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  await polls(page, 2);
  s = await st(page);
  const pz = await page.evaluate(() => ({ top: __top('#pause .card'), buy: __vis('#buy') }));
  await press(page, RIGHT); await press(page, DOWN); await press(page, UP);
  const frozen = await st(page);
  check('window blur with the buy screen open: paused, and the PAUSED card is on top of the buy screen', s.paused && s.buyOpen && pz.top && pz.buy, { paused: s.paused, buyOpen: s.buyOpen, pz });
  check('while paused over the buy screen the D-pad changes nothing behind the cards', frozen.buySel === 1 && frozen.mapOn && !frozen.debugOn && frozen.paused, { buySel: frozen.buySel, mapOn: frozen.mapOn, debugOn: frozen.debugOn });
  await press(page, MENU);
  s = await st(page);
  await press(page, LEFT);
  const moved = (await st(page)).buySel;
  check('Menu resumes back into a working buy screen', !s.paused && s.buyOpen && !(await vis(page, '#pause')) && moved === 0, { paused: s.paused, buyOpen: s.buyOpen, buySel: moved });
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  await polls(page, 2);
  await press(page, A); await polls(page, 2);
  s = await st(page);
  check('(A) also resumes into the buy screen, and that press buys nothing', !s.paused && s.buyOpen && s.salvage === sal0 - 300, { paused: s.paused, salvage: s.salvage });
  await page.evaluate(() => window.__pad.disconnect());
  await polls(page, 2);
  s = await st(page);
  const pd = await page.evaluate(() => ({ top: __top('#pause .card'), whyTop: __top('#pauseWhy'), why: __txt('#pauseWhy') }));
  check('disconnect with the buy screen open: the pause card and its reason are on top', s.paused && s.buyOpen && pd.top && pd.whyTop && /disconnected/i.test(pd.why || ''), { paused: s.paused, pd });
  await page.mouse.click(640, 40);                               // a click on the pause overlay (developer fallback) resumes into the buy screen
  await polls(page, 2);
  s = await st(page);
  const lock1 = await page.evaluate(() => !!document.pointerLockElement);
  check('a mouse click on that pause resumes into the buy screen without capturing the mouse', !s.paused && s.buyOpen && !lock1 && s.device === 'kbm', { paused: s.paused, buyOpen: s.buyOpen, lock: lock1 });
  await page.evaluate(() => window.__pad.connect());
  await polls(page, 2);

  await press(page, B);
  s = await st(page);
  check('(B) closes the buy screen', !s.buyOpen && !(await vis(page, '#buy')) && s.device === 'pad', { buyOpen: s.buyOpen, device: s.device });
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

// ------------------------------------------------------------------ 1b. controller and mouse/keyboard mixed
async function testMixed(browser) {
  const { ctx, page, errs } = await open(browser);
  check('start with (A)', await connectAndStart(page));
  await press(page, VIEW);
  let s = await st(page);
  const box = await page.evaluate(() => { const r = document.querySelectorAll('#buyGrid .item')[5].getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  const pre = { device: s.device, salvage: s.salvage, label: await txt(page, '#buyGrid .item .n') };
  await page.mouse.move(box.x, box.y);
  await page.mouse.down(); await page.waitForTimeout(120); await page.mouse.up();      // a human-length click
  await polls(page, 2);
  s = await st(page);
  const label = await txt(page, '#buyGrid .item .n');
  check('after controller use, the FIRST mouse click on a buy item buys it (the grid is not rebuilt under the click)', pre.device === 'pad' && s.device === 'kbm' && s.salvage === pre.salvage - 300, { pre, device: s.device, salvage: s.salvage });
  check('buy item labels follow the device without a rebuild ([n] prefix only on the keyboard)', !/^\[/.test(pre.label) && /^\[1\] /.test(label), { pad: pre.label, kbm: label });
  await press(page, B);
  s = await st(page);
  check('(B) on the controller still closes the buy screen after the mouse was used', !s.buyOpen && s.device === 'pad', { buyOpen: s.buyOpen, device: s.device });

  // mixed use: a held stick must not flip the active device back on every frame while the mouse aims
  await page.keyboard.press('KeyL');                             // free-look: plain mouse movement aims (no capture needed)
  await polls(page, 2);
  await page.evaluate(() => { window.__flips = 0; new MutationObserver((l) => { window.__flips += l.length; }).observe(document.body, { attributes: true, attributeFilter: ['class'] }); });
  await axes(page, [0, -1, 0, 0]); await polls(page, 2);         // stick leaves rest: the controller takes the prompts at once
  const dPad = (await st(page)).device;
  const c0 = await page.evaluate(() => window.__pad.calls);
  for (let i = 0; i < 24; i++) { await page.mouse.move(500 + (i % 2) * 60, 300 + (i % 3) * 10); await page.waitForTimeout(40); }
  const mid = await page.evaluate(() => ({ flips: window.__flips, frames: window.__pad.calls, device: window.__holdoutState().device, speed: window.__holdoutState().speed }));
  const back = await until(page, () => window.__holdoutState().device === 'pad', null, 5000);       // mouse quiet: held input takes the prompts back
  const flips = await page.evaluate(() => window.__flips);
  info.mixed = { bodyClassChanges: mid.flips, framesWhileMouseMoved: mid.frames - c0 };
  check('stick held while the mouse aims: the active device does not flip every frame', dPad === 'pad' && mid.device === 'kbm' && mid.flips <= 3 && mid.speed > 2, { dPad, mid, c0 });
  check('once the mouse is quiet, the held stick takes the prompts back', back && flips <= 4, { back, flips });
  await axes(page, [0, 0, 0, 0]); await polls(page, 2);
  errorsOf('mixed', errs, await st(page));

  // one-press restart: (A) Restart on the summary leaves a flag and reloads; the new page starts the game by itself.
  // (The flag is set here by hand; --death checks the real (A) press on the summary.) The reloaded page has no pad yet,
  // like a real browser, which hides the controller from a new page until the next press.
  await page.evaluate(() => { sessionStorage.setItem('holdout.padRestart', '1'); location.reload(); });
  const again = await until(page, () => typeof window.__holdoutState === 'function' && window.__holdoutState().phase === 'pre', null, 30000);
  const r = await page.evaluate(() => ({ start: __vis('#start'), hud: __vis('#hud'), flag: sessionStorage.getItem('holdout.padRestart'), connected: window.__holdoutState().pad.connected, toasts: __toasts(), t: window.__holdoutState().t }));
  check('restart flag: the reloaded page goes straight into a new game and asks for a controller press', again && !r.start && r.hud && r.flag === null && !r.connected && r.t < 5 && r.toasts.some((x) => /press any button/i.test(x)), r);
  await page.evaluate(() => window.__pad.connect());
  await axes(page, [0, -1, 0, 0]);
  const walks = await until(page, () => window.__holdoutState().speed > 4, null, 8000);
  await axes(page, [0, 0, 0, 0]);
  check('after that restart, moving the stick reveals the pad and the player walks', walks, await st(page));
  await page.reload();
  await page.waitForFunction(() => typeof window.__holdoutState === 'function', null, { timeout: 30000 });
  await page.waitForTimeout(400);
  s = await st(page);
  check('a plain reload still shows the start card', s.phase === 'menu' && (await vis(page, '#start')), { phase: s.phase });
  errorsOf('restart flag', errs, s);
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

  // right stick: look. Rates are per second of sim time, so they are exact at any frame rate. The yaw checks run while
  // looking at the sky, so a zombie can never be under the crosshair and the aim slowdown cannot change them.
  const up = await turnRate(page, [0, 0, 0, -1], 3);
  await until(page, () => window.__holdoutState().pitch > 1.2, null, 8000);
  const full = await turnRate(page, [0, 0, 1, 0]);
  const half = await turnRate(page, [0, 0, 0.5, 0]);
  await axes(page, [0, 0, 0, 0]); await polls(page, 2);
  await press(page, RIGHT);
  const sensUp = (await st(page)).lookSens;
  const half11 = await turnRate(page, [0, 0, 0.5, 0]);
  await axes(page, [0, 0, 0, 0]); await polls(page, 2);
  await press(page, LEFT);
  await btn(page, LT, 1);
  await until(page, () => window.__holdoutState().ads >= 0.999, null, 5000);
  const fovAds = (await st(page)).fov;
  const halfAds = await turnRate(page, [0, 0, 0.5, 0]);
  await axes(page, [0, 0, 0, 0]); await btn(page, LT, 0);
  await until(page, () => window.__holdoutState().fov > 74.5, null, 5000);
  await axes(page, [0, 0, 0, 1]);                                // look back down to level
  await until(page, () => window.__holdoutState().pitch < 0.15, null, 8000);
  await axes(page, [0, 0, 0, 0]); await polls(page, 2);
  const f2 = (v) => +v.toFixed(3);
  info.look = { yawDegPerSimS: +full.yaw.toFixed(1), halfTiltYawDegPerSimS: +half.yaw.toFixed(1), halfOverFull: f2(half.yaw / full.yaw), pitchDegPerSimS: +up.pitch.toFixed(1),
    sens11OverSens10: f2(half11.yaw / half.yaw), aimingOverHip: f2(halfAds.yaw / half.yaw), zoom: f2(75 / fovAds),
    note: 'full tilt includes the turn-rate ramp (up to +30%) once it has been held for 0.25 s' };
  check('right stick turns (right = clockwise, 200 to 260 deg/s at full tilt)', full.yaw > 190 && full.yaw < 270, info.look);
  check('response curve: half tilt turns at under 30% of the full rate (a linear stick gives 35% or more)', half.yaw > 5 && half.yaw < full.yaw * 0.30, info.look);
  check('right stick up looks up (130 deg/s)', up.pitch > 115 && up.pitch < 145, info.look);
  check('look sensitivity really scales the turn rate (1.1x after D-pad right)', sensUp === 1.1 && Math.abs(half11.yaw / half.yaw - 1.1) < 0.03, info.look);
  check('aiming scales the turn rate down in proportion to the zoom', fovAds < 70 && Math.abs(halfAds.yaw / half.yaw - fovAds / 75) < 0.03, info.look);

  // deadzone: tilt below 0.12 must do nothing at all
  let s0 = await st(page);
  await axes(page, [0.07, 0.07, 0.08, -0.07]);
  await polls(page, 8);
  let s = await st(page);
  check('no drift below the deadzone (yaw, pitch and position unchanged)', s.yaw === s0.yaw && s.pitch === s0.pitch && Math.hypot(s.x - s0.x, s.z - s0.z) < 1e-6 && s.pad.moveMag === 0, { dyaw: s.yaw - s0.yaw, dpitch: s.pitch - s0.pitch });

  // left stick: analog walk
  s0 = await st(page);
  await axes(page, [0, -1, 0, 0]); await simWait(page, 1.0);
  const fullW = await st(page);
  await axes(page, [0, -0.5, 0, 0]); await simWait(page, 1.0);
  const halfW = await st(page);
  await axes(page, [0.8, -0.8, 0, 0]); await simWait(page, 1.0);
  const diag = await st(page);
  info.walk = { fullTilt: +fullW.speed.toFixed(2), halfTilt: +halfW.speed.toFixed(2), diagonal: +diag.speed.toFixed(2), movedM: +Math.hypot(fullW.x - s0.x, fullW.z - s0.z).toFixed(2) };
  check('left stick moves the player', fullW.speed > 4 && Math.hypot(fullW.x - s0.x, fullW.z - s0.z) > 1, info.walk);
  check('half tilt walks slower than full tilt', halfW.speed > 0.8 && halfW.speed < fullW.speed * 0.75, info.walk);
  check('diagonal speed does not exceed straight speed', diag.speed <= fullW.speed * 1.02 && diag.speed > fullW.speed * 0.9, info.walk);

  // sprint toggle on the left stick click; cancels when the stick returns to rest
  await axes(page, [0, -1, 0, 0]); await polls(page, 2);
  await press(page, LS); await simWait(page, 0.8);
  const spr = await st(page);
  await axes(page, [0.5, 0, 0, 0]); await simWait(page, 1.0);    // half-tilt strafe without centring: the toggle stays on, the walk is analog again
  const latched = await st(page);
  await axes(page, [0, 0, 0, 0]); await polls(page, 3);
  s = await st(page);
  info.walk.sprint = +spr.speed.toFixed(2); info.walk.halfStrafeWithSprintToggleOn = +latched.speed.toFixed(2);
  check('left stick click toggles sprint; it cancels when the stick returns to rest', spr.sprinting && spr.pad.sprintToggle && spr.speed > 6 && !s.pad.sprintToggle && !s.sprinting, { sprintSpeed: +spr.speed.toFixed(2), after: s.pad.sprintToggle });
  check('partial tilt still walks slower while the sprint toggle is on but the player is not sprinting', latched.pad.sprintToggle && !latched.sprinting && latched.speed > 0.8 && latched.speed < fullW.speed * 0.75, info.walk);
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
  info.playEnd = { simT: +s.t.toFixed(0), hp: +s.hp.toFixed(0), round: s.round };
  errorsOf('play', errs, s);
  await ctx.close();
}

// ------------------------------------------------------------------ 2b. Sapper Reinforce tool on (B), hold rule
async function testReinforce(browser) {
  const { ctx, page, errs } = await open(browser);
  check('start with (A)', await connectAndStart(page));
  // find a building within tool range with the state-driven search in the page (see initPad): no wall-clock timeouts
  await page.evaluate(() => window.__pad.search());
  const found = await until(page, () => window.__pad.searching.done, null, 240000);
  await polls(page, 3);
  let s = await st(page);
  info.reinforce = { foundAfterFullTurns: await page.evaluate(() => window.__pad.searching.legs), simT: +s.t.toFixed(0), hp: +s.hp.toFixed(0) };
  check('a building is under the crosshair (found by turning with the right stick)', found && s.aimB, { x: s.x, z: s.z, yaw: s.yaw, info: info.reinforce });
  const prompt = await txt(page, '#prompt');
  check('interaction prompt shows the controller label', /\(hold B\)/.test(prompt || '') && !/hold F/.test(prompt || ''), prompt);
  const sal0 = s.salvage;
  await btn(page, B, 1); await polls(page, 3);
  const mid = await st(page);
  await btn(page, B, 0); await polls(page, 2);
  s = await st(page);
  check('a short (B) press does nothing (same hold rule as the keyboard)', mid.repairT > 0 && s.salvage === sal0 && s.reinforced === 0 && s.repairT === 0, { repairT: mid.repairT, salvage: s.salvage });
  await btn(page, B, 1);
  const done = await until(page, () => window.__holdoutState().reinforced === 1, null, 20000);
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
  check('(Y) in the buy screen readies up: round 1 starts', s.phase === 'round' && !s.buyOpen && s.round === 1 && s.paused === false, { phase: s.phase, buyOpen: s.buyOpen, paused: s.paused });

  const resets0 = await page.evaluate(() => window.__pad.resets);
  await press(page, MENU);
  s = await st(page);
  const p1 = await page.evaluate(() => ({ vis: __vis('#pause'), text: __txt('#pause'), resets: window.__pad.resets }));
  const tA = s.t; await polls(page, 5); const tB = (await st(page)).t;
  check('Menu pauses: overlay shown, sim time frozen', s.paused === true && p1.vis && tB === tA, { paused: s.paused, dt: tB - tA });
  check('pause overlay shows controller prompts', /Menu/.test(p1.text) && /\(A\)/.test(p1.text) && !/Click to resume/.test(p1.text), p1.text);
  check('rumble is stopped on pause', p1.resets > resets0, { before: resets0, after: p1.resets });
  await press(page, MENU);
  s = await st(page);
  const resumed = await simPast(page, s.t + 0.1, 5000);
  check('Menu resumes', s.paused === false && !(await vis(page, '#pause')) && resumed, { paused: s.paused });
  const pings0 = s.pings;
  await press(page, MENU); const pz = (await st(page)).paused;
  await press(page, A); await polls(page, 3);
  s = await st(page);
  check('(A) also resumes, and that press does not act in the game', pz && !s.paused && s.pings === pings0, { paused: s.paused, pings: s.pings });

  // losing focus pauses whatever the active device is, and drops held keys (their keyup never arrives after Alt+Tab)
  await page.keyboard.down('Alt');                               // Alt of Alt+Tab: the keyboard becomes the active device first
  await polls(page, 1);
  const devAlt = (await st(page)).device;
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  await page.keyboard.up('Alt');
  await polls(page, 2);
  s = await st(page);
  check('focus loss pauses even when a key press (Alt) made the keyboard the active device first', devAlt === 'kbm' && s.paused && (await vis(page, '#pause')), { devAlt, paused: s.paused });
  await press(page, MENU);
  await page.keyboard.down('KeyW');
  const walking = await until(page, () => window.__holdoutState().speed > 3, null, 6000);
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));        // W is still down: no keyup is delivered
  await polls(page, 2);
  const pausedW = (await st(page)).paused;
  await press(page, MENU);
  await simWait(page, 0.6);
  s = await st(page);
  await page.keyboard.up('KeyW');
  check('a key held at focus loss is released: the player does not keep walking after the resume', walking && pausedW && !s.paused && s.speed < 0.3, { walking, pausedW, paused: s.paused, speed: s.speed });

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
  await until(page, () => window.__holdoutState().paused, null, 5000);
  s = await st(page);
  const dz = await page.evaluate(() => ({ why: __vis('#pauseWhy') ? __txt('#pauseWhy') : null, status: __txt('#padStatus'), pause: __vis('#pause') }));
  check('disconnecting the pad mid-game pauses', s.paused && dz.pause && !s.pad.connected && /disconnected/i.test(dz.why || ''), { paused: s.paused, dz });
  const ammoAtDisc = s.ammo;
  await page.evaluate(() => window.__pad.connect());
  await polls(page, 3);
  s = await st(page);
  const why2 = await txt(page, '#pauseWhy');
  check('reconnecting is picked up while paused', s.pad.connected && s.paused && /connected: Xbox Wireless Controller/i.test(why2 || ''), { connected: s.pad.connected, why2 });
  await press(page, MENU);
  await simWait(page, 0.5);
  s = await st(page);
  check('resume after reconnect: the inputs held at disconnect were cleared', !s.paused && s.ammo === ammoAtDisc && s.speed < 0.3, { paused: s.paused, ammo: s.ammo, was: ammoAtDisc, speed: s.speed });

  // the viewer starts refusing the API mid-game
  await page.evaluate(() => { window.__pad.mode = 'throw'; });
  await until(page, () => window.__holdoutState().pad.blocked, null, 5000);
  const c1 = await page.evaluate(() => window.__pad.calls);
  await page.waitForTimeout(700);
  const c2 = await page.evaluate(() => window.__pad.calls);
  s = await st(page);
  const bl = await page.evaluate(() => ({ why: __txt('#pauseWhy'), kbmPrompt: __vis('#pause .kbm-only'), padPrompt: __vis('#pause .pad-only') }));
  check('getGamepads throwing mid-game: marked blocked, paused, not polled again', s.pad.blocked && s.paused && !s.pad.connected && c2 === c1, { blocked: s.pad.blocked, paused: s.paused, callsAfter: c2 - c1 });
  check('that pause tells the player to click (it does not ask for Menu, which can no longer work)', /blocked by this viewer/i.test(bl.why || '') && /click to continue/i.test(bl.why || '') && !/press Menu/i.test(bl.why || '') && bl.kbmPrompt && !bl.padPrompt && s.device === 'kbm', { bl, device: s.device });
  await page.mouse.click(640, 360);
  await until(page, () => !window.__holdoutState().paused, null, 6000);
  s = await st(page);
  check('mouse click then resumes on the developer fallback path', !s.paused && s.device === 'kbm', { paused: s.paused, device: s.device, freeLook: s.freeLook });
  errorsOf('system', errs, s);
  await ctx.close();
}

// ------------------------------------------------------------------ 3b. more than one device listed
async function testMultiPad(browser) {
  const ONE = { id: 'Pad ONE (STANDARD GAMEPAD Vendor: 045e Product: 0b12)' }, TWO = { id: 'Pad TWO (STANDARD GAMEPAD Vendor: 045e Product: 0b13)' };
  // case 1: two standard pads; the one in use (slot 0) is unplugged mid-game while the other (slot 1) sits idle
  let { ctx, page, errs } = await open(browser);
  await page.evaluate(([one, two]) => { window.__pad.add(0, one); window.__pad.add(1, two); window.__pad.use(0); }, [ONE, TWO]);
  await polls(page, 2);
  await press(page, A);
  const started = await until(page, () => window.__holdoutState().phase === 'pre');
  let s = await st(page);
  check('two standard pads: the first one is used and (A) on it starts', started && s.pad.name === 'Pad ONE', { name: s.pad.name });
  await btn(page, RT, 1); await axes(page, [0, -1, 0, 0]);
  await until(page, (n) => window.__holdoutState().ammo < n, s.ammo, 6000);
  await page.evaluate(() => window.__pad.remove(0, true));      // no gamepaddisconnected event: the next poll must notice by itself
  await until(page, () => window.__holdoutState().paused, null, 5000);
  await polls(page, 3);
  s = await st(page);
  const d1 = await page.evaluate(() => ({ pause: __vis('#pause'), why: __txt('#pauseWhy'), toasts: __toasts() }));
  check('the pad in use is unplugged while another pad is listed: "Controller disconnected" and auto-pause (no silent takeover)',
    s.paused && d1.pause && d1.toasts.some((x) => /Controller disconnected/.test(x)), { paused: s.paused, d1 });
  check('the other pad is then picked up while paused, and the pause card names it', s.pad.connected && s.pad.name === 'Pad TWO' && /Pad TWO/.test(d1.why || ''), { name: s.pad.name, why: d1.why });
  const ammo1 = s.ammo;
  await page.evaluate(() => window.__pad.use(1));
  await press(page, MENU);
  await simWait(page, 0.5);
  s = await st(page);
  check('Menu on the second pad resumes, with nothing held over from the first', !s.paused && s.ammo === ammo1 && s.speed < 0.3, { paused: s.paused, ammo: s.ammo, was: ammo1, speed: s.speed });
  await page.evaluate((one) => window.__pad.add(0, one, [7]), ONE);         // an idle-ish pad appears at a LOWER index, trigger held
  await polls(page, 4);
  s = await st(page);
  check('a pad that appears mid-game at a lower index does not take over from the pad in use', !s.paused && s.pad.name === 'Pad TWO' && s.ammo === ammo1, { name: s.pad.name, paused: s.paused, ammo: s.ammo });
  errorsOf('two pads', errs, s);
  await ctx.close();

  // case 2: a non-standard device whose axes rest off-centre (throttle, pedals) is listed first; the Xbox pad comes second
  ({ ctx, page, errs } = await open(browser));
  const JOY = { id: 'Generic USB Joystick (Vendor: 0079 Product: 0006)', mapping: '', axes: [-1, -1, -1, -1] };
  await page.evaluate((joy) => window.__pad.add(0, joy), JOY);
  await polls(page, 2);
  const st0 = await txt(page, '#padStatus');
  await page.evaluate(() => { window.__pad.connect(); window.__pad.use(1); });
  await polls(page, 2);
  s = await st(page);
  const st1 = await txt(page, '#padStatus');
  check('a non-standard device alone is used (with the layout note); a standard pad that appears takes over from it', /non-standard/.test(st0) && st1 === 'Controller: Xbox Wireless Controller connected' && s.pad.standard, { st0, st1 });
  await press(page, A);
  const started2 = await until(page, () => window.__holdoutState().phase === 'pre');
  await polls(page, 6);
  const warn0 = (await page.evaluate(() => __toasts())).filter((x) => /layout may be off/.test(x)).length;
  check('no "layout may be off" warning while the standard pad is the one in use', started2 && warn0 === 0, { warn0 });
  s = await st(page);
  const yaw0 = s.yaw, pitch0 = s.pitch;
  await page.evaluate(() => window.__pad.disconnect());
  await until(page, () => window.__holdoutState().paused, null, 5000);
  await polls(page, 3);
  s = await st(page);
  const d2 = await page.evaluate(() => ({ toasts: __toasts(), why: __txt('#pauseWhy') }));
  check('the standard pad is unplugged: paused with the disconnect message, then the other device is listed as in use',
    s.paused && d2.toasts.some((x) => /Controller disconnected/.test(x)) && s.pad.name === 'Generic USB Joystick' && !s.pad.standard, { paused: s.paused, name: s.pad.name, d2 });
  await page.mouse.click(640, 360);                              // continue with keyboard and mouse
  await until(page, () => !window.__holdoutState().paused, null, 6000);
  await simWait(page, 0.8);
  s = await st(page);
  const warn1 = (await page.evaluate(() => __toasts())).filter((x) => /layout may be off/.test(x)).length;
  check('its off-centre resting axes do not turn the camera, move the player or take the prompts (no button pressed on it yet)',
    !s.paused && s.yaw === yaw0 && s.pitch === pitch0 && s.speed < 0.3 && s.device === 'kbm', { dyaw: s.yaw - yaw0, dpitch: s.pitch - pitch0, speed: s.speed, device: s.device });
  check('the one-time layout warning fires now that a non-standard device is really the one in use', warn1 === 1, { warn1 });
  await page.evaluate(() => window.__pad.use(0));
  await press(page, X);                                          // a button on it: from now on its sticks count
  const turned = await until(page, (y) => Math.abs(window.__holdoutState().yaw - y) > 0.3, s.yaw, 6000);
  check('after a button press on that device its sticks are read', turned && (await st(page)).device === 'pad');
  errorsOf('non-standard second device', errs, await st(page));
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
    await until(page, () => window.__holdoutState().phase === 'pre', null, 6000);
    await page.keyboard.down('KeyW');
    await until(page, () => window.__holdoutState().speed > 2, null, 6000);
    s = await st(page);
    await page.keyboard.up('KeyW');
    const charges = await txt(page, '#charges');
    check(`${mode}: mouse click still starts and the keyboard still plays (developer fallback)`, s.phase === 'pre' && !s.paused && s.speed > 2 && s.device === 'kbm' && /\[G\]/.test(charges), { phase: s.phase, paused: s.paused, speed: s.speed, charges });
    errorsOf(mode, errs, s);
    await ctx.close();
  }
  let { ctx, page, errs } = await open(browser, { mapping: '', id: 'Generic USB Joystick (Vendor: 0079 Product: 0006)' });
  await page.evaluate(() => window.__pad.connect());
  await polls(page, 2);
  const status = await txt(page, '#padStatus');
  await press(page, A);
  const started = await until(page, () => window.__holdoutState().phase === 'pre');
  await polls(page, 6);
  const warns = (await page.evaluate(() => __toasts())).filter((x) => /layout may be off/.test(x)).length;
  const s = await st(page);
  check('non-standard mapping: still uses the standard indices and warns once', started && /non-standard/.test(status) && warns === 1 && !s.pad.standard, { status, warns });
  errorsOf('non-standard', errs, s);
  await ctx.close();

  // the scripted bot must never read the controller: a connected pad with held inputs, zero getGamepads calls
  ({ ctx, page, errs } = await open(browser, { preconnect: true }, URL + '?autotest=1&speed=4&rounds=1'));
  await page.evaluate(() => window.dispatchEvent(new Event('gamepadconnected')));
  const ran = await until(page, () => window.__holdoutProgress && window.__holdoutProgress.t > 8, null, 60000);
  const at = await page.evaluate(() => ({ calls: window.__pad.calls, progress: window.__holdoutProgress, device: window.__holdoutState().device, connected: window.__holdoutState().pad.connected }));
  check('?autotest=1: the bot runs and the controller is never read (0 getGamepads calls with a pad holding inputs)', ran && at.calls === 0 && !at.connected, at);
  errorsOf('autotest isolation', errs);
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
  await axes(page, [0, 0, 0, 0]);
  const shown = await until(page, () => window.__holdoutState().summaryShown, null, 8000);
  await press(page, A);                                          // a tap meant for the fight, right as the summary appears
  await polls(page, 3);
  let s = await st(page);
  const d = await page.evaluate(() => ({ restart: __txt('#restartBtn'), log: __txt('#logBtn'), vis: __vis('#summary'), top: __top('#summary .card') }));
  info.death = { diedAfterS: +((Date.now() - t0) / 1000).toFixed(0), round: s.round, hurtRumbles: hurt, minAimSlowdownFactor: minSlow };
  check('death: the horde killed the idle player and the summary appeared', !s.alive && shown && d.vis && d.top, info.death);
  check('(A) in the first moments of the summary does not restart (the log is still there)', s.phase === 'dead' && s.summaryShown && s.t > 5, { phase: s.phase, t: s.t });
  check('taking damage rumbles; rumble is stopped on death', hurt > 0 && resetsAtDeath > 0, { hurt, resetsAtDeath });
  check('aim slowdown engaged while the crosshair crossed a zombie', minSlow < 0.95, { minSlow });
  check('summary shows controller prompts', /^\(A\) Restart/.test(d.restart) && /^\(Y\)/.test(d.log), d);
  errorsOf('death', errs, s);
  await page.waitForTimeout(1800); await polls(page, 18);        // longer than the restart guard at any frame rate
  await btn(page, A, 1);
  const again = await until(page, () => typeof window.__holdoutState === 'function' && window.__holdoutState().phase === 'pre' && window.__holdoutState().t < 5, null, 30000);
  const r = again ? await page.evaluate(() => ({ start: __vis('#start'), hud: __vis('#hud'), flag: sessionStorage.getItem('holdout.padRestart'), t: window.__holdoutState().t })) : null;
  check('(A) on the summary restarts with one press: the new game starts without the start card', again && !r.start && r.hud && r.flag === null, r);
  await page.reload();
  await page.waitForFunction(() => typeof window.__holdoutState === 'function', null, { timeout: 30000 });
  await page.waitForTimeout(400);
  s = await st(page);
  check('a plain reload after that shows the start card again', s.phase === 'menu' && (await vis(page, '#start')), { phase: s.phase });
  errorsOf('restart', errs, s);
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch();
  await section('1', 'start card, labels, buy screen', () => testMenus(browser));
  await section('1b', 'controller and mouse/keyboard mixed, restart flag', () => testMixed(browser));
  await section('2', 'moving, looking, weapons', () => testPlay(browser));
  await section('2b', 'Reinforce tool on (B)', () => testReinforce(browser));
  await section('3', 'pause, toggles, sensitivity, disconnect, blocked', () => testSystem(browser));
  await section('3b', 'more than one device listed', () => testMultiPad(browser));
  await section('4', 'API blocked / missing / empty, non-standard pad, autotest isolation', () => testFallbacks(browser));
  await section('5', 'hosted variant note', () => testHosted(browser));
  if (DEATH) await section('6', 'death, summary, restart', () => testDeath(browser));
  await browser.close();
  const failed = checks.filter((c) => !c.pass);
  const summary = { pass: failed.length === 0, checks: checks.length, failed: failed.map((c) => ({ name: c.name, detail: c.detail })), info,
    note: 'mocked standard pad in headless Chromium; no real controller hardware was used' };
  console.log('\nHOLDOUT GAMEPAD RESULT');
  console.log(JSON.stringify(summary, null, 2));
  console.log(summary.pass ? 'PASS' : 'FAIL');
  process.exit(summary.pass ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(2); });
