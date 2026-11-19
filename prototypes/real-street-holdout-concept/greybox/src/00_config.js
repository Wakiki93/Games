// PROTOTYPE - NOT FOR PRODUCTION
// Question: If players defend a real neighborhood they recognize, with destructible cover, do they make protect/sacrifice choices?
// Date: 2026-11-19
// Tuning values. Names follow design/gdd/game-concept.md (Salvage, Round, Intermission, Shambler/Runner/Breacher).

const QS = new URLSearchParams(location.search);
const AUTOTEST = QS.get('autotest') === '1';
const SIM_SPEED = AUTOTEST ? Math.max(1, parseFloat(QS.get('speed') || '4')) : 1;
const SHADOWS = QS.get('shadows') !== '0';

const ERRORS = [];
window.addEventListener('error', (e) => ERRORS.push(String(e.message || e)));
window.addEventListener('unhandledrejection', (e) => ERRORS.push('unhandled rejection: ' + (e.reason && e.reason.message || e.reason)));

const CFG = {
  cell: 2,                                   // nav grid cell (m)
  player: { r: 0.4, eye: 1.65, walk: 4.6, sprint: 7.0, hp: 100, regenDelay: 4.5, regen: 7 },
  stamina: { max: 100, regen: 22, regenDelay: 0.9, sprintDrain: 16, swing: 18, blockHit: 22, blockHitBreacher: 50, parryRefund: 15 },
  rifle: {
    damage: 34, headMult: 2.0, rpm: 560, mag: 30, reload: 2.2, reserve: 210,
    velocity: 700, gravity: 9.81, maxLife: 1.6,       // projectile ballistics (muzzle velocity scaled for readable drop)
    falloffStart: 40, falloffEnd: 120, minFalloff: 0.6,
    spreadBase: 0.35, spreadPerShot: 0.3, spreadMax: 3.6, spreadRecover: 7, moveSpread: 1.4,
    kick: 1.15, kickYaw: 0.42, recoilRecover: 5.5,                       // degrees; weightier than arcade
  },
  optics: {
    none:   { zoom: 1.2, adsSpread: 0.6, adsTime: 0.22, hip: 1.0 },
    reddot: { zoom: 1.45, adsSpread: 0.36, adsTime: 0.25, hip: 1.0 },
    scope:  { zoom: 3.0, adsSpread: 0.16, adsTime: 0.42, hip: 1.25 },
  },
  melee: { range: 2.7, arcDeg: 110, damage: 60, critMult: 2, knock: 7, cooldown: 0.55, windup: 0.11, parryWindow: 0.2 },
  charge: { speed: 16, up: 3.5, fuse: 2.0, radius: 7.5, dmgZombie: 260, dmgBuilding: 320, max: 4 },
  building: { hpBase: 60, hpPerM2: 1.6, rubbleH: 0.9, collapseTime: 1.4, reinforceMult: 1.6, repairHold: 1.0, toolRange: 7 },
  econ: { start: 500, hit: 10, kill: 60, headKill: 100, meleeKill: 130, breacherKill: 300, roundBonus: 50 },
  // concept doc: capture T_base 30 s (compressed to 20 s here); overrun = 3+ zombies inside, nobody inside for 10 s, drains over 20 s
  sector: { captureTime: 20, bankPerSec: 8, heldIncome: 100, lossPenalty: 200, overrunCount: 3, overrunDelay: 10, drainTime: 20, objectiveShare: 0.5 },
  round: { intermission: 20, firstDelay: 10, activeCapMax: 24 },
  reposition: { radius: 30, window: 20, distance: 25 },
};

// MVP attachment slots per the concept doc: optic, muzzle, barrel. Every attachment is a trade-off.
const SHOP = [
  { id: 'reddot', slot: 'optic', name: 'Red-dot sight', cost: 350, desc: 'ADS zoom 1.45x, ADS spread -40%. Slightly slower to aim.' },
  { id: 'scope', slot: 'optic', name: '3x scope', cost: 650, desc: 'Precision at range: 3x zoom, tight ADS spread. Costs handling (slow ADS) and field of view; worse hip-fire.' },
  { id: 'comp', slot: 'muzzle', name: 'Compensator', cost: 450, desc: 'Vertical recoil -45%. More side-kick, bigger flash.' },
  { id: 'supp', slot: 'muzzle', name: 'Suppressor', cost: 500, desc: 'No muzzle flash, recoil -20%. Costs velocity (595 m/s: more drop and lead) and handling.' },
  { id: 'longbarrel', slot: 'barrel', name: 'Long barrel', cost: 400, desc: 'Velocity 820 m/s (flatter, less lead), recoil -15%. Costs handling: slower ADS and reload.' },
  { id: 'shortbarrel', slot: 'barrel', name: 'Short barrel', cost: 300, desc: 'Handling: ADS 30% faster, faster reload. Costs velocity (600 m/s) and stability (+20% recoil).' },
  { id: 'charge', name: 'Breach charge', cost: 300, desc: 'Sapper gadget. {throw} to throw; sticks to walls. Wrecks zombies AND buildings: opens sightlines, and horde routes. Max 4.' },
  { id: 'ammo', name: 'Ammo refill', cost: 200, desc: 'Refill reserve ammo to 210. (Held sectors also refill once per round.)' },
  { id: 'patch', name: 'Patch nearby walls', cost: 0, desc: 'Repair every damaged (not destroyed) building within 30 m.' },
];

// round n: total count, active cap, spawn interval, roster
function roundSpec(n) {
  const total = Math.round(6 + 4 * n + 0.4 * n * n);
  const breachers = n >= 3 ? 1 + Math.floor((n - 3) / 2) : 0;
  const runnerShare = n >= 2 ? Math.min(0.35, 0.08 * (n - 1)) : 0;
  return {
    total, breachers, runnerShare,
    activeCap: Math.min(CFG.round.activeCapMax, 12 + 2 * n),
    interval: Math.max(0.4, 1.3 - 0.1 * n),
    hpMul: 1 + 0.15 * (n - 1),
    dmgMul: 1 + 0.06 * (n - 1),
    shamblerSpeed: Math.min(3.2, 2.0 + 0.15 * n),
    runnerSpeed: Math.min(5.8, 4.8 + 0.1 * n),
  };
}

const ZTYPES = [
  { name: 'Shambler', hp: 100, r: 0.35, scale: 1.0, windup: 0.6, reach: 2.1, dmg: 15, color: [0.47, 0.53, 0.40] },
  { name: 'Runner', hp: 65, r: 0.33, scale: 0.95, windup: 0.45, reach: 2.0, dmg: 10, color: [0.60, 0.62, 0.43] },
  { name: 'Breacher', hp: 700, r: 0.6, scale: 1.55, windup: 0.9, reach: 2.7, dmg: 40, color: [0.36, 0.40, 0.31] },
];

// "The light fails as the rounds climb": afternoon -> dusk (~round 5) -> night (~round 10)
const LIGHT_KEYS = [
  { sky: [0.66, 0.74, 0.80], fogNear: 90, fogFar: 520, hemiSky: [0.86, 0.90, 0.95], hemiGround: [0.42, 0.40, 0.33], hemi: 1.25, sun: [1.0, 0.95, 0.85], sunI: 2.3, sunEl: 0.85 },
  { sky: [0.55, 0.45, 0.47], fogNear: 70, fogFar: 380, hemiSky: [0.75, 0.66, 0.70], hemiGround: [0.33, 0.28, 0.26], hemi: 1.0, sun: [1.0, 0.68, 0.42], sunI: 1.5, sunEl: 0.28 },
  { sky: [0.10, 0.13, 0.19], fogNear: 45, fogFar: 260, hemiSky: [0.42, 0.50, 0.66], hemiGround: [0.16, 0.16, 0.17], hemi: 0.85, sun: [0.62, 0.72, 0.95], sunI: 0.75, sunEl: 0.6 },
];

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const DEG = Math.PI / 180;
const fmtTime = (s) => { s = Math.max(0, Math.floor(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
const srgb = (r, g, b) => new THREE.Color().setRGB(r, g, b, THREE.SRGBColorSpace);
