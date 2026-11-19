// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Headless check of the hosted variant. Build it first:
//   python3 build.py --hosted .build/hosted/holdout-greybox.html && node verify_hosted.js
// Wraps the page fragment in a skeleton like a hosted viewer does, then checks three mouse-capture cases
// (refused, silently ignored, allowed) and a 400 px wide phone layout. Output goes to .build/hosted/ (git-ignored).
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const S = path.join(__dirname, '.build', 'hosted');
const frag = fs.readFileSync(path.join(S, 'holdout-greybox.html'), 'utf8');
const wrapped = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' +
  '<style>:root{color-scheme:light;padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui}[hidden]{display:none!important}</style></head><body>' + frag + '</body></html>';
const wrappedPath = path.join(S, 'wrapped.html');
fs.writeFileSync(wrappedPath, wrapped);
(async () => {
  const browser = await chromium.launch();
  const out = { errors: [] };
  for (const mode of ['blocked-reject', 'blocked-silent', 'allowed']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => out.errors.push(mode + ' pageerror: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') out.errors.push(mode + ' console: ' + m.text()); });
    await page.addInitScript((mode) => {
      window.__holdoutHarness = true;
      if (mode === 'blocked-reject') HTMLCanvasElement.prototype.requestPointerLock = () => Promise.reject(new DOMException("Blocked pointer lock on an element because the element's frame is sandboxed", 'SecurityError'));
      if (mode === 'blocked-silent') HTMLCanvasElement.prototype.requestPointerLock = () => undefined;
    }, mode);
    await page.goto('file://' + wrappedPath);
    await page.waitForTimeout(1500);
    const title = await page.title();
    if (mode === 'blocked-reject') await page.screenshot({ path: path.join(S, 'hosted-start.png') });
    await page.mouse.click(640, 600);                 // CLICK TO START
    await page.waitForTimeout(mode === 'blocked-silent' ? 1800 : 600);
    const s0 = await page.evaluate(() => window.__holdoutState());
    await page.mouse.move(640, 360); await page.mouse.move(840, 330, { steps: 8 });
    await page.waitForTimeout(200);
    const s1 = await page.evaluate(() => window.__holdoutState());
    await page.mouse.down(); await page.waitForTimeout(500); await page.mouse.up();
    await page.keyboard.down('KeyW'); await page.waitForTimeout(700); await page.keyboard.up('KeyW');
    await page.keyboard.down('ArrowLeft'); await page.waitForTimeout(400); await page.keyboard.up('ArrowLeft');
    const s2 = await page.evaluate(() => window.__holdoutState());
    const pauseHidden = await page.evaluate(() => document.getElementById('pause').classList.contains('hidden'));
    const logBtnHidden = await page.evaluate(() => document.getElementById('logBtn').classList.contains('hidden'));
    out[mode] = { title, freeLook: s1.freeLook, paused: s2.paused, pauseHidden, phase: s2.phase,
      yawChangedByMouse: Math.abs(s1.yaw - s0.yaw) > 0.05, fired: s2.ammo < s0.ammo, moved: Math.hypot(s2.x - s0.x, s2.z - s0.z) > 0.5,
      yawChangedByArrow: Math.abs(s2.yaw - s1.yaw) > 0.2, logBtnHidden };
    if (mode === 'blocked-reject') await page.screenshot({ path: path.join(S, 'hosted-play.png') });
    await ctx.close();
  }
  // phone width: page must not scroll sideways and must show the keyboard note
  const ctx = await browser.newContext({ viewport: { width: 400, height: 800 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => out.errors.push('phone pageerror: ' + e.message));
  await p.goto('file://' + wrappedPath); await p.waitForTimeout(1500);
  out.phone = await p.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, innerW: innerWidth,
    noteVisible: getComputedStyle(document.getElementById('needKb')).display !== 'none',
    cardW: Math.round(document.querySelector('#start .card').getBoundingClientRect().width) }));
  await p.screenshot({ path: path.join(S, 'hosted-phone.png') });
  await browser.close();
  console.log(JSON.stringify(out, null, 1));
  const okBlocked = (m) => m.freeLook && !m.paused && m.yawChangedByMouse && m.fired && m.moved && m.yawChangedByArrow;
  const pass = out.errors.length === 0 && okBlocked(out['blocked-reject']) && okBlocked(out['blocked-silent']) &&
    !out.allowed.freeLook && !out.allowed.paused && out.allowed.fired && out.allowed.moved &&
    out.phone.scrollW <= out.phone.innerW && out.phone.noteVisible;
  console.log(pass ? 'PASS' : 'FAIL');
  process.exit(pass ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(2); });
