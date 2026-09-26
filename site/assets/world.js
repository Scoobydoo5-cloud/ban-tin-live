// Thế giới 3D liền mạch: camera bay dọc trục -z qua các cảnh khi người xem cuộn trang.
// Mọi hình khối dựng bằng mã (không tải mô hình ngoài); số liệu lấy từ latest.json đã kiểm tra.
import * as THREE from 'three';
import { EffectComposer } from '../vendor/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../vendor/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '../vendor/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from '../vendor/jsm/postprocessing/OutputPass.js';

// Mặt nạ đất liền 180x90 (2 độ), từ world-atlas land-110m (ISC), 1 bit mỗi ô.
const LAND = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf4AP/AAAAAAAAAAAAAAAAAAAAAAAAX/z///+AAAAAAAABAAAAAAAAAAAAAYd8P///wAA+AAAAAA8AAAAAAAAAAAwAnw////4AAIAAAAAAGAAAAAAAAAAADivwAf//wAAAAADAAf/wAHYAAAAAADoi3sAP//gAAAAAMAD///sAAAAgBgACfwz/AD/+gAAAwAEHf///////+AP//////////////4A//EgAAAAAAAgH///////////////gAFAAgAAAAAAAAz///////////////BhQAAAAAAAAAAAAP/////4A0B4AAAD5/////////////Af3////gHgA4AAAH5///////////LwAHgH///gHkAAAAAH4/////////+CIAABAB///4D+AAAAGCx/////////4A8AAIAAf///n/gAAAOCD/////////wA4AAAAAf///n/wAAAbP///////////AgAAAAAP/////wAAADf//////////9AAAAAAAF////0YAAAB///////////9AAAAAAAD////8EAAAB///////////5AAAAAAAD////2AAAAB/f5fP//////wAAAAAAAD////gAAAAfxnwPP//////jAAAAAAAD////AAAAAPCb3/n/////+CAAAAAAAD///8AAAAAfALf/n////+ECAAAAAAAB///8AAAAAGHQP/n/////mMAAAAAAAA///8AAAAAH+Ai///////E8AAAAAAAAf//wAAAAAP/AA///////BgAAAAAAAAP//gAAAAAf/73///////gAAAAAAAAAD/AQAAAAAf////f/////gAAAAAAAAAF+AQAAAAB///+/n/////AAAAAAAAAAC+AAAAAAB///+f0H////AAAAAAAAAAAeAwAAAAD////f/B///8gAAAAAAAAAAeGEAAAAH////v+B/z/AAAAAAAAAAAAPMAgAAAD////n+A/B+gAAAAAAAAAAAD8AAAAAD////n4AeB/AgAAAAAAAAAAAPAAAAAH////3gAcAfAgAAAAAAAAAAADAAAAAD////6AAcAfggAAAAAAAAAAABDwAAAD////8wAMATAIAAAAAAAAAAAAr/AAAB/////gAKASAAAAAAAAAAAAAAH/gAAA/////gACAAAIAAAAAAAAAAAAH/8AAAaH///AAAAsGAAAAAAAAAAAAAH/+AAAAB//+AAAAUOAAAAAAAAAAAAAP/+AAAAB//8AAAAYegAAAAAAAAAAAAP//gAAAD//4AAAAMeBgAAAAAAAAAAAP//8AAAB//wAAAAGdiuAAAAAAAAAAAf///AAAA//wAAAACAQHgAAAAAAAAAAP///gAAA//wAAAABwAHwgAAAAAAAAAH///AAAA//wAAAAACIDQIAAAAAAAAAH//+AAAAf/wAAAAAAAAAAAAAAAAAAAD//+AAAA//wgAAAAABxAAAAAAAAAAAD//+AAAA//wgAAAAAPxgBAAAAAAAAAA//8AAAA//jgAAAAAf5gAAAAAAAAAAAf/8AAAA//DgAAAAAf/gAAAAAAAAAAAf/8AAAAf/DAAAAAD//4CAAAAAAAAAAf/wAAAAf/DAAAAAH//4AAAAAAAAAAAf/AAAAAf+CAAAAAH//8AAAAAAAAAAAf/AAAAAP8AAAAAAH//+AAAAAAAAAAA/+AAAAAP8AAAAAAH//+AAAAAAAAAAA/+AAAAAH4AAAAAAD//+AAAAAAAAAAA/8AAAAAHwAAAAAADwf8AAAAAAAAAAA/gAAAAAAAAAAAAACAH4AIAAAAAAAAB/wAAAAAAAAAAAAAAAD4AEAAAAAAAAB+AAAAAAAAAAAAAAAAAAAGAAAAAAAAB6AAAAAAAAAAAAAAAAAwAMAAAAAAAAA8AAAAAAAAAAAAAAAAAQAYAAAAAAAAB4AAAAAAAAAAAAAAAAAAAwAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAACAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAeAAIP+f/gAAAAAAAAAAAMAAAAAAABP/+H//////AAAAAAAAAAA+AAAAAf////8////////AAAAAAAOEAPAAAB///////////////gAAAP//T//8AAAH//////////////+AAAH/////4AAAH///////////////8AAE//////4ABw////////////////8AAAD//////gCA////////////////wAAAf/////////////////////////+AAH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

export const Z = { hero: 0, globe: -90, macro: -175, city: -260, fund: -345 };
export const UP = new THREE.Color('#38d99c');
export const DOWN = new THREE.Color('#ff6b5c');
const FLAT = new THREE.Color('#8fa3a8');
const GOLD = new THREE.Color('#e9b85c');
const TEAL = new THREE.Color('#5fe3e0');

const CITIES = {
  VN: { name: 'TP.HCM', lat: 10.82, lon: 106.63, key: 'VNINDEX' },
  AU: { name: 'Sydney', lat: -33.87, lon: 151.21, key: 'AXJO' },
  US: { name: 'New York', lat: 40.71, lon: -74.01, key: 'GSPC' },
};

function landAt(lat, lon) {
  if (!landAt.bits) {
    const raw = atob(LAND);
    landAt.bits = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) { landAt.bits[i] = raw.charCodeAt(i); }
  }
  const r = Math.min(89, Math.max(0, Math.round((89 - lat) / 2)));
  const c = ((Math.round((lon + 179) / 2) % 180) + 180) % 180;
  const idx = r * 180 + c;
  return (landAt.bits[idx >> 3] >> (7 - (idx & 7))) & 1;
}

function latLon(lat, lon, r) {
  const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
}

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.45, 'rgba(255,255,255,0.85)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function labelTexture(text, { w = 512, h = 128, bg = '#0c1a22', fg = '#e9f4f2', ring = null, round = false, size = 64 } = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = bg;
  if (round) { g.beginPath(); g.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2); g.fill(); } else { g.fillRect(0, 0, w, h); }
  if (ring) {
    g.strokeStyle = ring; g.lineWidth = w * 0.035;
    g.beginPath(); g.arc(w / 2, h / 2, w / 2 - w * 0.07, 0, Math.PI * 2); g.stroke();
  }
  g.fillStyle = fg;
  g.font = `800 ${size}px "Unbounded", "Arial Black", "Segoe UI", sans-serif`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2 + size * 0.04);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export function createWorld(canvas, { mobile = false, reduced = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;

  const scene = new THREE.Scene();
  const ground = new THREE.Color('#061016');
  scene.background = ground.clone();
  scene.fog = new THREE.FogExp2(ground.clone(), 0.017);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 700);
  camera.position.set(-30, 9, 18);

  // Môi trường phản chiếu cho kim loại (vàng, thùng dầu, đồng xu): dựng từ một cảnh chuyển sắc đơn giản
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  const envMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {},
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'varying vec3 vP; void main(){ float t = vP.y*0.5+0.5; vec3 c = mix(vec3(0.02,0.04,0.06), vec3(0.9,0.85,0.75), pow(t,2.2)); c += vec3(0.25,0.55,0.6)*pow(max(0.0,vP.x),6.0); gl_FragColor = vec4(c,1.0); }',
  });
  envScene.add(new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), envMat));
  scene.environment = pmrem.fromScene(envScene, 0.04).texture;

  scene.add(new THREE.HemisphereLight(0x9fe6ff, 0x0a0f14, 0.55));
  const key = new THREE.DirectionalLight(0xfff1dc, 1.4);
  key.position.set(20, 40, 30);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x5fe3e0, 0.7);
  rim.position.set(-30, 10, -20);
  scene.add(rim);

  // Hậu kỳ: phát sáng (bloom)
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.7, 0.45, 0.62);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const dot = dotTexture();
  const clock = new THREE.Clock();
  const anchors = {};   // điểm neo để trang đặt nhãn HTML
  const tmp = new THREE.Vector3();

  // ---------------- Bụi dữ liệu (nền chung) ----------------
  const dustN = mobile ? 900 : 2200;
  const dustPos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 140;
    dustPos[i * 3 + 1] = Math.random() * 60 - 12;
    dustPos[i * 3 + 2] = 30 - Math.random() * 420;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({ size: 0.11, map: dot, color: 0x7fe9e4, transparent: true, opacity: 0.32, depthWrite: false, blending: THREE.AdditiveBlending });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // ---------------- Cảnh 1: đường chân trời 60 phiên ----------------
  const hero = new THREE.Group();
  hero.position.z = Z.hero;
  scene.add(hero);
  const HERO_ROWS = [['VNINDEX', 'VN-Index', -5.2], ['AXJO', 'S&P/ASX 200', 0], ['GSPC', 'S&P 500', 5.2]];
  const heroN = 60, heroSp = 1.02;
  const barGeo = new THREE.BoxGeometry(0.62, 1, 0.62);
  barGeo.translate(0, 0.5, 0);
  const barIdx = new Float32Array(HERO_ROWS.length * heroN);
  for (let r = 0; r < HERO_ROWS.length; r++) { for (let i = 0; i < heroN; i++) { barIdx[r * heroN + i] = i; } }
  barGeo.setAttribute('aIdx', new THREE.InstancedBufferAttribute(barIdx, 1));
  const barMat = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.15 });
  const heroU = { uScan: { value: heroN - 1 }, uGlow: { value: 1.0 } };
  barMat.onBeforeCompile = (sh) => {
    sh.uniforms.uScan = heroU.uScan;
    sh.uniforms.uGlow = heroU.uGlow;
    sh.vertexShader = 'attribute float aIdx;\nuniform float uScan;\nvarying float vHi;\nvarying float vFut;\n' + sh.vertexShader
      .replace('#include <begin_vertex>', '#include <begin_vertex>\n vHi = 1.0 - smoothstep(0.0, 3.2, abs(aIdx - uScan));\n vFut = step(uScan + 0.5, aIdx);');
    sh.fragmentShader = 'uniform float uGlow;\nvarying float vHi;\nvarying float vFut;\n' + sh.fragmentShader
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n totalEmissiveRadiance += vColor * (0.06 + 1.15 * vHi) * uGlow * (1.0 - 0.85 * vFut);\n diffuseColor.rgb *= (1.0 - 0.6 * vFut);');
  };
  const bars = new THREE.InstancedMesh(barGeo, barMat, HERO_ROWS.length * heroN);
  const m4 = new THREE.Matrix4();
  for (let i = 0; i < HERO_ROWS.length * heroN; i++) { bars.setMatrixAt(i, m4.identity()); bars.setColorAt(i, FLAT); }
  hero.add(bars);
  const scanGeo = new THREE.BoxGeometry(0.05, 11, 16);
  scanGeo.translate(0, 5.5, 0);
  const scan = new THREE.Mesh(scanGeo, new THREE.MeshBasicMaterial({ color: 0x5fe3e0, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending }));
  hero.add(scan);
  const grid = new THREE.GridHelper(90, 90, 0x1e5a5c, 0x0f2e33);
  grid.position.y = -0.01;
  grid.material.transparent = true; grid.material.opacity = 0.55;
  hero.add(grid);
  HERO_ROWS.forEach(([k, , z]) => { anchors['hero-' + k] = new THREE.Vector3(-heroN / 2 * heroSp - 1.5, 0.4, Z.hero + z); });
  const heroX = (i) => (i - (heroN - 1) / 2) * heroSp;

  function setHeroData(DATA) {
    HERO_ROWS.forEach(([k, , z], r) => {
      const it = DATA.items[k];
      const v = it && it.hist ? it.hist.slice(-heroN) : [];
      const lo = Math.min(...v), hi = Math.max(...v);
      for (let i = 0; i < heroN; i++) {
        const j = i - (heroN - v.length);
        const idx = r * heroN + i;
        if (j < 0) { m4.makeScale(0.001, 0.001, 0.001); bars.setMatrixAt(idx, m4); continue; }
        const h = 0.5 + 7.2 * (v[j] - lo) / ((hi - lo) || 1);
        m4.makeScale(1, h, 1).setPosition(heroX(i), 0, z);
        bars.setMatrixAt(idx, m4);
        const d = j > 0 ? v[j] - v[j - 1] : 0;
        bars.setColorAt(idx, d > 0 ? UP : d < 0 ? DOWN : FLAT);
      }
    });
    bars.instanceMatrix.needsUpdate = true;
    if (bars.instanceColor) { bars.instanceColor.needsUpdate = true; }
  }

  // ---------------- Cảnh 2: quả địa cầu ----------------
  const globe = new THREE.Group();
  globe.position.set(0, 2.5, Z.globe);
  scene.add(globe);
  const R = 11;
  const spin = new THREE.Group();
  globe.add(spin);
  spin.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 64, 48), new THREE.MeshBasicMaterial({ color: 0x050b14 })));
  const landPts = [], seaPts = [];
  const N = mobile ? 9000 : 16000, gold = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), th = gold * i;
    const x = Math.cos(th) * rr, z = Math.sin(th) * rr;
    const lat = Math.asin(y) * 180 / Math.PI;
    const lon = ((Math.atan2(z, -x) * 180 / Math.PI) - 180 + 540) % 360 - 180;
    (landAt(lat, lon) ? landPts : (i % 7 === 0 ? seaPts : null))?.push(x * R, y * R, z * R);
  }
  const mkPts = (arr, size, color, opacity) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
    return new THREE.Points(g, new THREE.PointsMaterial({ size, map: dot, color, transparent: true, opacity, depthWrite: false }));
  };
  spin.add(mkPts(landPts, 0.26, 0x8ff5e8, 0.95));
  spin.add(mkPts(seaPts, 0.12, 0x2a6f86, 0.5));
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.13, 64, 48), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide,
    uniforms: { uColor: { value: new THREE.Color('#3fd6e0') } },
    vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 uColor; varying vec3 vN; void main(){ float f = pow(max(0.0, 0.62 - dot(vN, vec3(0.0,0.0,1.0))), 3.2) * 0.55; gl_FragColor = vec4(uColor, f); }',
  }));
  globe.add(atmo);
  const beacons = {};
  Object.entries(CITIES).forEach(([m, c]) => {
    const pos = latLon(c.lat, c.lon, R);
    const n = pos.clone().normalize();
    const g = new THREE.Group();
    g.position.copy(pos);
    g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n);
    const beamMat = new THREE.MeshStandardMaterial({ color: FLAT, emissive: FLAT, emissiveIntensity: 1.4, roughness: 0.4 });
    const beamGeo = new THREE.CylinderGeometry(0.11, 0.11, 1, 16);
    beamGeo.translate(0, 0.5, 0);
    const beam = new THREE.Mesh(beamGeo, beamMat);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 14), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const ringMat = new THREE.MeshBasicMaterial({ color: FLAT, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.35, 0.5, 40), ringMat);
    ring.rotation.x = -Math.PI / 2;
    g.add(beam, cap, ring);
    spin.add(g);
    beacons[m] = { g, beam, cap, ring, beamMat, ringMat, pos, h: 2 };
  });
  const arcs = [];
  [['VN', 'AU'], ['AU', 'US'], ['US', 'VN']].forEach(([a, b]) => {
    const p0 = beacons[a].pos, p1 = beacons[b].pos;
    const mid = p0.clone().add(p1).multiplyScalar(0.5);
    const lift = R * (1.25 + p0.distanceTo(p1) / (R * 5));
    const curve = new THREE.QuadraticBezierCurve3(p0, mid.normalize().multiplyScalar(lift), p1);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.035, 6, false),
      new THREE.MeshBasicMaterial({ color: 0x5fe3e0, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
    spin.add(tube);
    const pulses = [0, 1, 2].map(() => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), new THREE.MeshBasicMaterial({ color: 0xe9fffd }));
      spin.add(s);
      return s;
    });
    arcs.push({ curve, pulses });
  });
  const cityAngles = {};
  Object.entries(beacons).forEach(([m, b]) => {
    const p = b.pos;
    const a = Math.atan2(-p.x, p.z);
    const zp = -p.x * Math.sin(a) + p.z * Math.cos(a);
    cityAngles[m] = { a, b: Math.atan2(p.y, zp) };
  });
  spin.rotation.order = 'XYZ';
  const globeRot = { a: cityAngles.VN.a, b: cityAngles.VN.b };

  function setGlobeData(DATA) {
    Object.entries(CITIES).forEach(([m, c]) => {
      const it = DATA.items[c.key], b = beacons[m];
      const chg = it && it.changePct != null ? it.changePct : 0;
      const col = chg > 0.02 ? UP : chg < -0.02 ? DOWN : FLAT;
      b.beamMat.color.copy(col); b.beamMat.emissive.copy(col); b.ringMat.color.copy(col);
      b.h = 1.2 + Math.min(6, Math.abs(chg) * 3.2);
      b.beam.scale.y = b.h;
      b.cap.position.y = b.h;
    });
  }

  // ---------------- Cảnh 3: tĩnh vật vĩ mô ----------------
  const macro = new THREE.Group();
  macro.position.z = Z.macro;
  scene.add(macro);
  const MACRO_KEYS = ['TNX', 'BRENT', 'WTI', 'GOLD', 'AUDUSD', 'USDVND'];
  const MX = MACRO_KEYS.map((_, i) => (i - 2.5) * 7.2);
  const macroObjs = [];
  // 0. đường cong lợi suất
  {
    const g = new THREE.Group();
    const pts = [0, 0.55, 0.85, 1.05, 1.2, 1.3, 1.36].map((y, i) => new THREE.Vector3(-2.4 + i * 0.8, y * 1.6 - 0.8, 0));
    const curve = new THREE.CatmullRomCurve3(pts);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 90, 0.11, 10, false), new THREE.MeshStandardMaterial({ color: TEAL, emissive: TEAL, emissiveIntensity: 0.9, roughness: 0.3 })));
    pts.forEach((p) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 12), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x9ff7f2, emissiveIntensity: 0.8 }));
      s.position.copy(p); g.add(s);
    });
    const base = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.08, 1.6), new THREE.MeshStandardMaterial({ color: 0x15313a, metalness: 0.6, roughness: 0.4 }));
    base.position.y = -1.1; g.add(base);
    macroObjs.push(g);
  }
  // 1-2. thùng dầu Brent, WTI
  [['BRENT', '#1c3d63', '#e9b85c'], ['WTI', '#5a1d17', '#f0d9c0']].forEach(([name, col, txt]) => {
    const g = new THREE.Group();
    const band = labelTexture(name, { w: 1024, h: 256, bg: col, fg: txt, size: 110 });
    band.wrapS = THREE.RepeatWrapping; band.repeat.set(2, 1);
    const sideMat = new THREE.MeshStandardMaterial({ map: band, metalness: 0.55, roughness: 0.38 });
    const capMat = new THREE.MeshStandardMaterial({ color: col, metalness: 0.7, roughness: 0.3 });
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 2.9, 48, 1), [sideMat, capMat, capMat]));
    [-1.05, 0, 1.05].forEach((y) => {
      const t = new THREE.Mesh(new THREE.TorusGeometry(1.17, 0.06, 10, 64), new THREE.MeshStandardMaterial({ color: 0xcfd6db, metalness: 0.9, roughness: 0.25 }));
      t.rotation.x = Math.PI / 2; t.position.y = y; g.add(t);
    });
    const plug = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 20), new THREE.MeshStandardMaterial({ color: 0xcfd6db, metalness: 0.9, roughness: 0.2 }));
    plug.position.set(0.55, 1.48, 0.2); g.add(plug);
    g.rotation.z = 0.12;
    macroObjs.push(g);
  });
  // 3. thỏi vàng xếp tháp
  {
    const g = new THREE.Group();
    const shape = new THREE.Shape();
    shape.moveTo(-1.3, 0); shape.lineTo(1.3, 0); shape.lineTo(1.0, 0.72); shape.lineTo(-1.0, 0.72); shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 1.1, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 3 });
    geo.translate(0, 0, -0.55);
    const mat = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.22, emissive: 0x3a2400, emissiveIntensity: 0.4 });
    [[-1.4, 0], [1.4, 0], [0, 0.84]].forEach(([x, y]) => { const b = new THREE.Mesh(geo, mat); b.position.set(x, y - 0.9, 0); g.add(b); });
    macroObjs.push(g);
  }
  // 4-5. đồng xu AUD, VND
  [['A$', '#d7dde2', '#1b2a33', '#9aa7b0'], ['₫', '#c98a4b', '#2a1a0d', '#e9c089']].forEach(([sym, col, ink, ringCol]) => {
    const g = new THREE.Group();
    const face = labelTexture(sym, { w: 512, h: 512, bg: col, fg: ink, ring: ringCol, round: true, size: 230 });
    const edge = new THREE.MeshStandardMaterial({ color: col, metalness: 0.95, roughness: 0.3 });
    const faceMat = new THREE.MeshStandardMaterial({ map: face, metalness: 0.75, roughness: 0.32, transparent: true });
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.26, 72), [edge, faceMat, faceMat]);
    coin.rotation.x = Math.PI / 2;
    g.add(coin);
    for (let i = 0; i < 4; i++) {
      const c2 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.26, 72), edge);
      c2.position.set(0.3, -1.9 + i * 0.28, -1.2); g.add(c2);
    }
    macroObjs.push(g);
  });
  macroObjs.forEach((g, i) => { g.position.set(MX[i], 1.8, 0); macro.add(g); anchors['macro-' + MACRO_KEYS[i]] = new THREE.Vector3(MX[i], -1.2, Z.macro); });
  const pedestal = new THREE.Mesh(new THREE.BoxGeometry(50, 0.4, 5), new THREE.MeshStandardMaterial({ color: 0x1a0f0c, metalness: 0.3, roughness: 0.6 }));
  pedestal.position.set(0, -1.6, 0);
  macro.add(pedestal);
  const glowStrip = new THREE.Mesh(new THREE.BoxGeometry(50, 0.04, 0.08), new THREE.MeshBasicMaterial({ color: 0xe9b85c }));
  glowStrip.position.set(0, -1.38, 2.5);
  macro.add(glowStrip);

  // ---------------- Cảnh 4: thành phố cổ phiếu ----------------
  const city = new THREE.Group();
  city.position.z = Z.city;
  scene.add(city);
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), new THREE.MeshStandardMaterial({ color: 0x0e2a30, transparent: true, opacity: 0.5, roughness: 0.1, metalness: 0.4, depthWrite: false, side: THREE.DoubleSide }));
  glass.rotation.x = -Math.PI / 2;
  city.add(glass);
  const cityGrid = new THREE.GridHelper(60, 30, 0x2c7f82, 0x14444a);
  cityGrid.position.y = 0.01;
  city.add(cityGrid);
  let towers = [];
  const towerGeo = new THREE.BoxGeometry(1.7, 1, 1.7);
  function setCityData(DATA) {
    towers.forEach((t) => { city.remove(t.mesh); t.cap && city.remove(t.cap); });
    towers = [];
    const keys = (DATA.groups.watchlist || []).filter((k) => DATA.items[k] && !DATA.items[k].index);
    const rows = { VN: [], AU: [], US: [] };
    keys.forEach((k) => { (rows[DATA.items[k].market] || []).push(k); });
    const rowZ = { VN: -7, AU: 0, US: 7 };
    Object.entries(rows).forEach(([m, ks]) => {
      ks.sort((a, b) => (DATA.items[b].chgYtd || 0) - (DATA.items[a].chgYtd || 0));
      ks.forEach((k, i) => {
        const it = DATA.items[k], y = it.chgYtd || 0;
        const h = Math.max(0.3, Math.min(11, Math.abs(y) / 8));
        const col = y > 0 ? UP : y < 0 ? DOWN : FLAT;
        const mat = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.35, roughness: 0.3, metalness: 0.25, transparent: y < 0, opacity: y < 0 ? 0.55 : 1, depthWrite: y >= 0 });
        const mesh = new THREE.Mesh(towerGeo, mat);
        const x = (i - (ks.length - 1) / 2) * 3.4;
        mesh.scale.y = h;
        mesh.position.set(x, y >= 0 ? h / 2 : -h / 2, rowZ[m]);
        mesh.userData.key = k;
        city.add(mesh);
        let cap = null;
        if ((it.tags || []).includes('fund')) {
          cap = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.18, 1.9), new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.2, emissive: 0x5a3a00, emissiveIntensity: 0.6 }));
          cap.position.set(x, y >= 0 ? h + 0.09 : -h - 0.09, rowZ[m]);
          city.add(cap);
        }
        towers.push({ key: k, mesh, cap, base: 0.35 });
        anchors['tower-' + k] = new THREE.Vector3(x, (y >= 0 ? h : 0) + 0.8, Z.city + rowZ[m]);
      });
    });
  }

  // ---------------- Cảnh 5: vòng phân bổ quỹ ----------------
  const fund = new THREE.Group();
  fund.position.set(0, 2, Z.fund);
  scene.add(fund);
  const ringHolder = new THREE.Group();
  ringHolder.rotation.x = -1.05;
  fund.add(ringHolder);
  function setFundData(DATA) {
    while (ringHolder.children.length) { ringHolder.remove(ringHolder.children[0]); }
    const f = DATA.sync && DATA.sync.funds && DATA.sync.funds.VN;
    const segs = [];
    if (f) {
      (f.holdings || []).forEach((h) => segs.push({ w: h.weight, col: GOLD, metal: true }));
      segs.push({ w: f.cashWeight || 0, col: new THREE.Color('#3aa7a8'), metal: false });
    } else {
      segs.push({ w: 1, col: new THREE.Color('#3aa7a8'), metal: false });
    }
    const tot = segs.reduce((a, s) => a + s.w, 0) || 1;
    let a0 = 0;
    segs.forEach((s) => {
      const arc = Math.max(0.02, (s.w / tot) * Math.PI * 2 - 0.06);
      const geo = new THREE.TorusGeometry(6, s.metal ? 1.05 : 0.7, 28, 160, arc);
      const mat = s.metal
        ? new THREE.MeshStandardMaterial({ color: s.col, metalness: 1, roughness: 0.22, emissive: 0x4a3000, emissiveIntensity: 0.5 })
        : new THREE.MeshStandardMaterial({ color: s.col, transparent: true, opacity: 0.55, roughness: 0.15, metalness: 0.2, emissive: s.col, emissiveIntensity: 0.25 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.z = a0;
      ringHolder.add(mesh);
      a0 += arc + 0.06;
    });
    anchors.fund = new THREE.Vector3(0, 2, Z.fund);
  }

  // ---------------- Điều khiển ----------------
  const cam = { pos: new THREE.Vector3(-30, 9, 18), look: new THREE.Vector3(-20, 3, 0), tPos: new THREE.Vector3(-30, 9, 18), tLook: new THREE.Vector3(-20, 3, 0) };
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  const groundT = new THREE.Color('#061016');
  let bloomT = 0.9, heroScanT = heroN - 1, macroP = 0, cityP = 0, fundP = 0, globeP = 0;
  let hovered = null;
  const raycaster = new THREE.Raycaster();

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();

  function frame() {
    const dt = Math.min(0.05, clock.getDelta());
    const t = clock.elapsedTime;
    const k = reduced ? 1 : 1 - Math.pow(0.0025, dt);
    cam.pos.lerp(cam.tPos, k);
    cam.look.lerp(cam.tLook, k);
    ptr.x += (ptr.tx - ptr.x) * (reduced ? 1 : 0.06);
    ptr.y += (ptr.ty - ptr.y) * (reduced ? 1 : 0.06);
    camera.position.copy(cam.pos);
    camera.lookAt(cam.look);
    camera.position.addScaledVector(tmp.set(1, 0, 0).applyQuaternion(camera.quaternion), ptr.x * 1.1);
    camera.position.addScaledVector(tmp.set(0, 1, 0).applyQuaternion(camera.quaternion), -ptr.y * 0.7);
    camera.lookAt(cam.look);

    scene.background.lerp(groundT, k);
    scene.fog.color.copy(scene.background);
    bloom.strength += (bloomT - bloom.strength) * k;

    // cảnh 1
    heroU.uScan.value += (heroScanT - heroU.uScan.value) * k;
    scan.position.x = heroX(heroU.uScan.value);
    // bụi trôi
    dust.rotation.y = Math.sin(t * 0.03) * 0.02;
    dust.position.y = Math.sin(t * 0.2) * 0.4;
    // cảnh 2
    const segs = ['VN', 'AU', 'US'];
    const gp = Math.min(1.999, Math.max(0, globeP * 2));
    const i0 = Math.floor(gp), f = gp - i0, e = f * f * (3 - 2 * f);
    const A = cityAngles[segs[i0]], B = cityAngles[segs[Math.min(2, i0 + 1)]];
    let da = B.a - A.a;
    if (da > Math.PI) { da -= Math.PI * 2; } else if (da < -Math.PI) { da += Math.PI * 2; }
    const ta = A.a + da * e, tb = A.b + (B.b - A.b) * e;
    globeRot.a += (ta - globeRot.a) * k; globeRot.b += (tb - globeRot.b) * k;
    spin.rotation.set(globeRot.b * 0.8, globeRot.a + (reduced ? 0 : Math.sin(t * 0.15) * 0.05), 0);
    Object.values(beacons).forEach((b, i) => {
      const s = 1 + ((t * 0.8 + i * 0.33) % 1) * 2.2;
      b.ring.scale.setScalar(s);
      b.ringMat.opacity = 0.9 * (1 - ((t * 0.8 + i * 0.33) % 1));
    });
    arcs.forEach((a, i) => a.pulses.forEach((p, j) => { p.position.copy(a.curve.getPoint(((t * 0.18 + j / 3 + i * 0.11) % 1))); }));
    // cảnh 3
    macroObjs.forEach((g, i) => {
      const act = 1 - Math.min(1, Math.abs(macroP * 5 - i));
      g.rotation.y += dt * (0.25 + act * 0.6);
      const s = 1 + act * 0.18;
      g.scale.setScalar(g.scale.x + (s - g.scale.x) * k);
      g.position.y = 1.8 + Math.sin(t * 0.9 + i) * 0.12 + act * 0.3;
    });
    // cảnh 4
    towers.forEach((tw) => {
      const target = tw.key === hovered ? 1.3 : tw.base;
      tw.mesh.material.emissiveIntensity += (target - tw.mesh.material.emissiveIntensity) * 0.15;
    });
    // cảnh 5
    ringHolder.rotation.z = -fundP * Math.PI * 1.2 + (reduced ? 0 : t * 0.05);
    fund.rotation.y = Math.sin(t * 0.2) * 0.1;

    composer.render(dt);
  }

  return {
    anchors,
    heroN,
    setData(DATA) { setHeroData(DATA); setGlobeData(DATA); setCityData(DATA); setFundData(DATA); },
    setCamera(pos, look) { cam.tPos.set(pos[0], pos[1], pos[2]); cam.tLook.set(look[0], look[1], look[2]); if (reduced) { cam.pos.copy(cam.tPos); cam.look.copy(cam.tLook); } },
    jumpCamera() { cam.pos.copy(cam.tPos); cam.look.copy(cam.tLook); },
    setGround(hex, bloomStrength) { groundT.set(hex); bloomT = bloomStrength; },
    setHero(scanIndex) { heroScanT = scanIndex; },
    setGlobe(p) { globeP = p; },
    setMacro(p) { macroP = p; },
    setCity(p) { cityP = p; },
    setFund(p) { fundP = p; },
    pointer(nx, ny) { ptr.tx = nx; ptr.ty = ny; },
    pick(nx, ny) {
      raycaster.setFromCamera({ x: nx, y: ny }, camera);
      const hit = raycaster.intersectObjects(towers.map((t) => t.mesh), false)[0];
      hovered = hit ? hit.object.userData.key : null;
      return hovered;
    },
    project(v) {
      tmp.copy(v).project(camera);
      return { x: (tmp.x * 0.5 + 0.5) * window.innerWidth, y: (-tmp.y * 0.5 + 0.5) * window.innerHeight, on: tmp.z < 1 && tmp.z > -1 };
    },
    distance(v) { return camera.position.distanceTo(v); },
    resize,
    frame,
    get cityProgress() { return cityP; },
  };
}
