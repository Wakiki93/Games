// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Main loop: fixed 60 Hz sim sub-steps (scaled by SIM_SPEED in autotest), hit-stop, two-pass render (world + viewmodel).

const SIM_DT = 1 / 60;
let lastNow = performance.now(), fpsWin = performance.now(), fpsFrames = 0;
const errSeen = new Set();
renderer.info.autoReset = false;
const CPU = { sim: 0, steps: 0, nav: 0, hud: 0, render: 0, frames: 0 };

function simStep(dt) {
  GAME.time += dt;
  if (AUTOTEST) botStep(dt);
  updatePlayer(dt);
  updateBullets(dt);
  updateCharges(dt);
  updateZombies(dt);
  updateCollapses(dt);
  updateRounds(dt);
  updateRepo();
}

function renderFrame(realDt, simDt) {
  const t = GAME.time;
  updateShake(realDt);
  camera.position.set(P.x, P.y, P.z);
  camera.rotation.set(P.pitch + P.recoilP + SHAKE.p, P.yaw + P.recoilY + SHAKE.y, SHAKE.r);
  const W = wstats();
  const fov = BASE_FOV / (P.weapon === 'rifle' ? lerp(1, W.o.zoom, P.ads) : 1);
  if (Math.abs(camera.fov - fov) > 0.01) { camera.fov = fov; camera.updateProjectionMatrix(); }
  const el2 = LIGHT.el, az = LIGHT.az;
  sun.position.set(P.x + Math.cos(az) * Math.cos(el2) * 150, Math.sin(el2) * 150 + 10, P.z + Math.sin(az) * Math.cos(el2) * 150);
  sun.target.position.set(P.x, 0, P.z);
  renderZombies(t);
  renderStreaks();
  renderSectors(t);
  const pdt = Math.min(0.1, simDt);
  updateParticles(FX.dust, pdt); updateParticles(FX.bits, pdt); updateParticles(FX.glow, pdt);
  updateFlashes(pdt);
  renderViewmodel(realDt, t);
  const h0 = performance.now();
  updateHUD(simDt, realDt);
  const h1 = performance.now();
  renderer.info.reset();
  renderer.clear();
  renderer.render(scene, camera);
  renderer.clearDepth();
  renderer.render(vmScene, vmCamera);
  CPU.hud += h1 - h0; CPU.render += performance.now() - h1; CPU.frames++;
}

function frame() {
  const now = performance.now();
  const realDt = Math.min(0.1, Math.max(0, (now - lastNow) / 1000));
  lastNow = now;
  fpsFrames++;
  if (now - fpsWin >= 1000) {
    FPS.value = (fpsFrames * 1000) / (now - fpsWin);
    FPS.samples.push(FPS.value);
    if (FPS.samples.length > 3) FPS.min1s = Math.min(FPS.min1s, FPS.value);
    fpsFrames = 0; fpsWin = now;
  }
  let simDt = 0;
  try {
    if (!AUTOTEST) padPoll(realDt);      // controller: once per rendered frame, before the sim steps; the bot never reads it
    const gated = AUTOTEST && shotGate();
    if (GAME.phase !== 'menu' && !GAME.paused && !gated) {
      let scale = SIM_SPEED;
      if (FX.hitStop > 0) { FX.hitStop -= realDt; scale *= 0.06; }
      simDt = realDt * scale;
      const steps = Math.min(24, Math.ceil(simDt / SIM_DT - 1e-6));
      const h = steps > 0 ? simDt / steps : 0;
      const c0 = performance.now();
      for (let i = 0; i < steps; i++) simStep(h);
      const c1 = performance.now();
      navUpdate(simDt);
      CPU.sim += c1 - c0; CPU.steps += steps; CPU.nav += performance.now() - c1;
    }
    renderFrame(realDt, simDt);
    if (AUTOTEST) window.__holdoutProgress = { round: GAME.round, phase: GAME.phase, t: +GAME.time.toFixed(1), kills: GAME.kills, destroyed: GAME.destroyed, fps: +FPS.value.toFixed(1) };
  } catch (err) {
    const msg = String(err && err.stack || err);
    if (!errSeen.has(msg)) { errSeen.add(msg); ERRORS.push(msg); console.error('[holdout] ' + msg); }
    if (AUTOTEST && errSeen.size > 5) finishTest('errors');
  }
}

applyLighting(1);
if (window.__holdoutHarness) window.__holdoutState = () => ({          // read-only test hook
  yaw: P.yaw, pitch: P.pitch, paused: !!GAME.paused, freeLook: UI.freeLook, phase: GAME.phase, ammo: P.ammo, x: P.x, z: P.z,
  t: GAME.time, round: GAME.round, speed: Math.hypot(P.vx, P.vz), fov: camera.fov, ads: P.ads, salvage: GAME.salvage, weapon: P.weapon,
  reserve: P.reserve, reloading: P.reloading, charges: P.charges, hp: P.hp, stamina: P.stamina, alive: P.alive, sprinting: P.sprinting, blocking: P.blocking,
  buyOpen: UI.buyOpen, buySel: UI.buySel, lookSens: PAD.sens, mapOn: UI.mapOn, debugOn: UI.debugOn, summaryShown: !!UI.summaryShown,
  pings: GAME.pings, chargesThrown: GAME.chargesThrown, aimB: !!P.aimB, repairT: P.repairT, reinforced: GAME.reinforced, parries: GAME.parries,
  device: DEVICE, pad: padState(),
});
if (AUTOTEST) {
  el.start.classList.add('hidden');
  el.hud.classList.remove('hidden');
  startGame();
} else padRestartCheck();              // (A) Restart on the summary reloads the page: go straight into the new game
renderer.setAnimationLoop(frame);
