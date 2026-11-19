// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Headless verification: node verify.js [--speed 4] [--rounds 5]
// Loads index.html?autotest=1 over file://, answers the bot's screenshot handshake, waits for window.__holdoutTest,
// asserts no console errors, and captures a 1280x720 normal-mode start screen.

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const SPEED = opt('speed', '4'), ROUNDS = opt('rounds', '5'), TIMEOUT = parseInt(opt('timeout', '480'), 10) * 1000;
const HERE = __dirname;
const URL = 'file://' + path.join(HERE, 'index.html');
const SHOTS = path.join(HERE, 'screens');
fs.mkdirSync(SHOTS, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  let shotQueue = Promise.resolve();
  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error') errors.push('console.error: ' + text);
    if (text.startsWith('HOLDOUT_SHOT ')) {
      const name = text.slice(13).trim();
      shotQueue = shotQueue.then(async () => {
        await page.waitForTimeout(350);
        await page.screenshot({ path: path.join(SHOTS, name + '.png') });
        console.log('  screenshot', name);
        await page.evaluate((n) => { window.__holdoutShotAck = n; }, name);
      });
    } else if (text.startsWith('[holdout] ')) {
      const j = text.slice(10);
      if (/building_destroyed|round_start|round_clear|sector_|reposition|player_dead|bot_surrender|bot_charge/.test(j)) console.log('  ' + j);
    }
  });
  await page.addInitScript(() => { window.__holdoutHarness = true; });
  const t0 = Date.now();
  await page.goto(`${URL}?autotest=1&speed=${SPEED}&rounds=${ROUNDS}`);
  let result = null, lastLog = 0;
  while (Date.now() - t0 < TIMEOUT) {
    await page.waitForTimeout(1000);
    result = await page.evaluate(() => window.__holdoutTest || null);
    if (result) break;
    if (Date.now() - lastLog > 15000) {
      lastLog = Date.now();
      console.log('  progress', JSON.stringify(await page.evaluate(() => window.__holdoutProgress || null)));
    }
  }
  await shotQueue;
  if (!result) {
    result = await page.evaluate(() => { try { finishTest && 0; } catch (e) {} return window.__holdoutTest || { ok: false, reason: 'harness timeout', progress: window.__holdoutProgress }; });
    await page.screenshot({ path: path.join(SHOTS, 'timeout.png') });
  }
  await page.close();

  // normal mode, 1280x720 click-to-start screen
  const p2 = await ctx.newPage();
  p2.on('pageerror', (e) => errors.push('pageerror(normal): ' + e.message));
  p2.on('console', (m) => { if (m.type() === 'error') errors.push('console.error(normal): ' + m.text()); });
  await p2.goto(URL);
  await p2.waitForTimeout(2500);
  await p2.screenshot({ path: path.join(SHOTS, 'start-1280x720.png') });
  await browser.close();

  console.log('\nHOLDOUT AUTOTEST RESULT');
  console.log(JSON.stringify(result, null, 2));
  console.log('console/page errors:', errors.length ? errors : 'none');
  const pass = result && result.ok && errors.length === 0 && result.fps && result.fps.avg > 0;
  console.log(pass ? 'PASS' : 'FAIL');
  process.exit(pass ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(2); });
