// Động cơ 3D dùng chung: renderer, hậu kỳ phát sáng, camera có quán tính, kéo xoay, nhãn HTML bám vật thể.
import * as THREE from 'three';
import { EffectComposer } from '../../vendor/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../../vendor/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '../../vendor/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from '../../vendor/jsm/postprocessing/OutputPass.js';
import { RoomEnvironment } from '../../vendor/jsm/environments/RoomEnvironment.js';

export { THREE };
export const mqMobile = window.matchMedia('(max-width: 820px)');
export const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const UP = new THREE.Color('#38d99c');
export const DOWN = new THREE.Color('#ff6b5c');
export const FLAT = new THREE.Color('#8fa3a8');
export const GOLD = new THREE.Color('#e9b85c');
export const TEAL = new THREE.Color('#5fe3e0');

// Phông chữ phải tải xong trước khi vẽ lên canvas (nếu không trình duyệt dùng phông dự phòng)
const SAMPLE = 'AaĐđ₫$€0123456789ẤỆỮ%▲▼·';
export const fontsReady = (async () => {
  try {
    await Promise.all(['800 64px Unbounded', '700 64px Unbounded', '700 64px "Be Vietnam Pro"', '600 64px "Be Vietnam Pro"', '500 64px "Be Vietnam Pro"', '600 64px "JetBrains Mono"']
      .map((f) => document.fonts.load(f, SAMPLE)));
  } catch (e) { /* vẫn vẽ bằng phông dự phòng */ }
})();

export function canvasTexture(w, h, draw, { srgb = true, aniso = 8 } = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) { t.colorSpace = THREE.SRGBColorSpace; }
  t.anisotropy = aniso;
  return t;
}

let DOT = null;
export function dotTexture() {
  if (DOT) { return DOT; }
  DOT = canvasTexture(64, 64, (g) => {
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.45, 'rgba(255,255,255,0.8)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  });
  return DOT;
}

// Vầng sáng mềm (sprite cộng sáng) dùng làm tinh vân, quầng sáng
export function glowSprite(color, size, opacity = 0.5) {
  const tex = canvasTexture(256, 256, (g) => {
    const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grd.addColorStop(0, 'rgba(255,255,255,0.9)');
    grd.addColorStop(0.25, 'rgba(255,255,255,0.35)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 256, 256);
  });
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending }));
  s.scale.set(size, size, 1);
  return s;
}

export function createEngine(canvas, o = {}) {
  const mobile = o.mobile != null ? o.mobile : mqMobile.matches;
  const reduced = REDUCED;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' });
    if (!renderer.getContext()) { throw new Error('no gl'); }
  } catch (e) {
    document.documentElement.classList.add('no-webgl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.8));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = o.exposure != null ? o.exposure : 1;
  if (o.shadows) { renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; }

  const scene = new THREE.Scene();
  const ground = new THREE.Color(o.ground || '#05080d');
  scene.background = ground.clone();
  scene.fog = new THREE.FogExp2(ground.clone(), o.fog != null ? o.fog : 0.016);
  const camera = new THREE.PerspectiveCamera(o.fov || 46, window.innerWidth / window.innerHeight, 0.1, o.far || 900);
  const fovBase = camera.fov;

  // Môi trường phản chiếu cho kim loại, kính
  const pmrem = new THREE.PMREMGenerator(renderer);
  if (o.env === 'room') {
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  } else {
    const envScene = new THREE.Scene();
    const top = new THREE.Color(o.envTop || '#e6dcc8'), bot = new THREE.Color(o.envBottom || '#03070b'), side = new THREE.Color(o.envSide || '#3aa7a8');
    envScene.add(new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: { uTop: { value: top }, uBot: { value: bot }, uSide: { value: side } },
      vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 uTop; uniform vec3 uBot; uniform vec3 uSide; varying vec3 vP; void main(){ float t = vP.y*0.5+0.5; vec3 c = mix(uBot, uTop, pow(t,2.2)); c += uSide*0.7*pow(max(0.0,vP.x),6.0) + vec3(1.0,0.85,0.6)*0.5*pow(max(0.0,-vP.z),12.0); gl_FragColor = vec4(c,1.0); }',
    })));
    scene.environment = pmrem.fromScene(envScene, 0.04).texture;
  }

  const hemi = new THREE.HemisphereLight(o.skyLight || 0x9fe6ff, o.groundLight || 0x0a0f14, o.hemi != null ? o.hemi : 0.5);
  const key = new THREE.DirectionalLight(o.keyColor || 0xfff1dc, o.key != null ? o.key : 1.3);
  key.position.set(20, 40, 30);
  const rim = new THREE.DirectionalLight(o.rimColor || 0x5fe3e0, o.rim != null ? o.rim : 0.6);
  rim.position.set(-30, 10, -20);
  scene.add(hemi, key, rim);
  if (o.shadows) {
    key.castShadow = true;
    key.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
    const b = o.shadowBox || 30;
    Object.assign(key.shadow.camera, { left: -b, right: b, top: b, bottom: -b, near: 1, far: 200 });
    key.shadow.bias = -0.0004;
    key.shadow.radius = 4;
  }

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bl = o.bloom || [0.7, 0.45, 0.62];
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), bl[0], bl[1], bl[2]);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  // Bụi dữ liệu trôi nổi
  let dust = null;
  if (o.dust !== false) {
    const d = Object.assign({ n: 2000, spread: [140, 60, 200], center: [0, 12, -60], color: 0x7fe9e4, size: 0.11, opacity: 0.32 }, o.dust || {});
    const n = mobile ? Math.round(d.n * 0.45) : d.n;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = d.center[0] + (Math.random() - 0.5) * d.spread[0];
      pos[i * 3 + 1] = d.center[1] + (Math.random() - 0.5) * d.spread[1];
      pos[i * 3 + 2] = d.center[2] + (Math.random() - 0.5) * d.spread[2];
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    dust = new THREE.Points(g, new THREE.PointsMaterial({ size: d.size, map: dotTexture(), color: d.color, transparent: true, opacity: d.opacity, depthWrite: false, blending: d.blending === 'normal' ? THREE.NormalBlending : THREE.AdditiveBlending }));
    scene.add(dust);
  }

  // Camera: vị trí/điểm nhìn mục tiêu, trễ mềm, xoay do kéo, thị sai theo con trỏ
  const v3 = (a, d) => new THREE.Vector3(...(a || d));
  const rig = {
    pos: v3(o.camPos, [0, 6, 30]), look: v3(o.camLook, [0, 0, 0]),
    tPos: v3(o.camPos, [0, 6, 30]), tLook: v3(o.camLook, [0, 0, 0]),
    yaw: 0, pitch: 0, tYaw: 0, tPitch: 0, zoom: 1, tZoom: 1,
    spring: 0, dragging: false, auto: 0,
  };
  const par = o.parallax || [1.1, 0.7];
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  const groundT = ground.clone();
  let bloomT = bl[0], fovKick = 0, fovKickT = 0;
  const tmp = new THREE.Vector3(), off = new THREE.Vector3(), axis = new THREE.Vector3();
  const UPV = new THREE.Vector3(0, 1, 0);
  const clock = new THREE.Clock();
  const cbs = [];
  let raf = 0, running = false;

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  let rzq = 0;
  window.addEventListener('resize', () => { cancelAnimationFrame(rzq); rzq = requestAnimationFrame(resize); });

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') { return; }
    ptr.tx = (e.clientX / window.innerWidth) * 2 - 1;
    ptr.ty = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  function step() {
    const dt = Math.min(0.05, clock.getDelta());
    const t = clock.elapsedTime;
    const k = reduced ? 1 : 1 - Math.pow(0.0025, dt);
    rig.pos.lerp(rig.tPos, k);
    rig.look.lerp(rig.tLook, k);
    if (!rig.dragging) {
      if (rig.spring > 0) { rig.tYaw += (0 - rig.tYaw) * Math.min(1, rig.spring * dt); rig.tPitch += (0 - rig.tPitch) * Math.min(1, rig.spring * dt); }
      if (rig.auto && !reduced) { rig.tYaw += rig.auto * dt; }
    }
    const kd = reduced ? 1 : 1 - Math.pow(0.0008, dt);
    rig.yaw += (rig.tYaw - rig.yaw) * kd;
    rig.pitch += (rig.tPitch - rig.pitch) * kd;
    rig.zoom += (rig.tZoom - rig.zoom) * kd;
    ptr.x += (ptr.tx - ptr.x) * (reduced ? 1 : 0.05);
    ptr.y += (ptr.ty - ptr.y) * (reduced ? 1 : 0.05);

    off.copy(rig.pos).sub(rig.look);
    if (rig.yaw) { off.applyAxisAngle(UPV, rig.yaw); }
    if (rig.pitch) {
      axis.crossVectors(off, UPV).normalize();
      const elev = Math.asin(THREE.MathUtils.clamp(off.y / off.length(), -1, 1));
      const p = THREE.MathUtils.clamp(rig.pitch, -1.35 - elev, 1.35 - elev);
      if (axis.lengthSq() > 1e-6) { off.applyAxisAngle(axis, p); }
    }
    off.multiplyScalar(rig.zoom);
    camera.position.copy(rig.look).add(off);
    camera.lookAt(rig.look);
    if (!reduced) {
      camera.position.addScaledVector(tmp.set(1, 0, 0).applyQuaternion(camera.quaternion), ptr.x * par[0]);
      camera.position.addScaledVector(tmp.set(0, 1, 0).applyQuaternion(camera.quaternion), -ptr.y * par[1]);
      camera.lookAt(rig.look);
    }
    fovKick += (fovKickT - fovKick) * (reduced ? 1 : 0.08);
    if (Math.abs(camera.fov - (fovBase + fovKick)) > 0.01) { camera.fov = fovBase + fovKick; camera.updateProjectionMatrix(); }

    scene.background.lerp(groundT, k);
    scene.fog.color.copy(scene.background);
    bloom.strength += (bloomT - bloom.strength) * k;
    if (dust) { dust.rotation.y = Math.sin(t * 0.03) * 0.03; dust.position.y = Math.sin(t * 0.2) * 0.4; }
    for (let i = 0; i < cbs.length; i++) { cbs[i](t, dt, k); }
    composer.render(dt);
  }
  function loop() { if (!running) { return; } step(); raf = requestAnimationFrame(loop); }
  function start() { if (running) { return; } running = true; clock.getDelta(); raf = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  document.addEventListener('visibilitychange', () => { if (document.hidden) { stop(); } else { start(); } });

  const raycaster = new THREE.Raycaster();
  const api = {
    THREE, scene, camera, renderer, composer, bloom, rig, mobile, reduced, key, rim, hemi, dust,
    onFrame(fn) { cbs.push(fn); return fn; },
    start, stop, resize,
    setTarget(pos, look) {
      rig.tPos.set(pos[0], pos[1], pos[2]); rig.tLook.set(look[0], look[1], look[2]);
      if (reduced) { rig.pos.copy(rig.tPos); rig.look.copy(rig.tLook); }
    },
    jump() { rig.pos.copy(rig.tPos); rig.look.copy(rig.tLook); rig.yaw = rig.tYaw; rig.pitch = rig.tPitch; rig.zoom = rig.tZoom; },
    setGround(hex, bloomStrength) { groundT.set(hex); if (bloomStrength != null) { bloomT = bloomStrength; } },
    setBloom(s) { bloomT = s; },
    // Hiệu ứng "lao vào": phóng góc nhìn và tăng phát sáng trước khi chuyển trang
    warp() { if (reduced) { return; } fovKickT = 26; bloomT = bl[0] * 2.4; },
    project(v) {
      tmp.copy(v).project(camera);
      return { x: (tmp.x * 0.5 + 0.5) * window.innerWidth, y: (-tmp.y * 0.5 + 0.5) * window.innerHeight, on: tmp.z < 1 && tmp.z > -1 && Math.abs(tmp.x) < 1.2 && Math.abs(tmp.y) < 1.2, z: tmp.z };
    },
    pick(nx, ny, objects, recursive = false) {
      raycaster.setFromCamera({ x: nx, y: ny }, camera);
      return raycaster.intersectObjects(objects, recursive)[0] || null;
    },
    // Kéo để xoay (và lăn chuột để thu phóng nếu bật)
    enableDrag(el, opt = {}) {
      const s = Object.assign({ yaw: true, pitch: true, zoom: false, speed: 1, minZoom: 0.55, maxZoom: 1.8, spring: 0, onTap: null, maxPitch: 0.9 }, opt);
      rig.spring = s.spring;
      let down = null;
      el.addEventListener('pointerdown', (e) => {
        if (e.button > 0 || (e.target.closest && e.target.closest('a,button,input,select,textarea,label,.no-drag'))) { return; }
        down = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId, lx: e.clientX, ly: e.clientY, touch: e.pointerType !== 'mouse', decided: e.pointerType === 'mouse', active: false };
      });
      window.addEventListener('pointermove', (e) => {
        if (!down || e.pointerId !== down.id) { return; }
        const dx = e.clientX - down.lx, dy = e.clientY - down.ly;
        if (!down.decided) {
          const ax = Math.abs(e.clientX - down.x), ay = Math.abs(e.clientY - down.y);
          if (ax < 6 && ay < 6) { return; }
          down.decided = true;
          if (ay > ax) { down = null; return; } // cuộn dọc trên điện thoại
        }
        if (!down.active && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 4) { down.active = true; rig.dragging = true; el.classList.add('dragging'); }
        if (down.active) {
          if (s.yaw) { rig.tYaw -= dx * 0.0055 * s.speed; }
          if (s.pitch && !down.touch) { rig.tPitch = THREE.MathUtils.clamp(rig.tPitch + dy * 0.004 * s.speed, -s.maxPitch, s.maxPitch); }
        }
        down.lx = e.clientX; down.ly = e.clientY;
      }, { passive: true });
      const end = (e) => {
        if (!down || (e && e.pointerId !== down.id)) { return; }
        if (!down.active && s.onTap && performance.now() - down.t < 450) {
          s.onTap((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, e);
        }
        down = null; rig.dragging = false; el.classList.remove('dragging');
      };
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', () => { down = null; rig.dragging = false; el.classList.remove('dragging'); });
      if (s.zoom) {
        el.addEventListener('wheel', (e) => {
          if (e.ctrlKey || e.target.closest('.no-drag')) { return; }
          e.preventDefault();
          rig.tZoom = THREE.MathUtils.clamp(rig.tZoom * Math.exp(e.deltaY * 0.0012), s.minZoom, s.maxZoom);
        }, { passive: false });
      }
    },
    // Nhãn HTML bám theo điểm 3D
    tags(container) {
      let list = [];
      return {
        set(items) {
          container.innerHTML = '';
          list = items.map((it) => {
            const el = document.createElement(it.tag || 'span');
            el.className = 'tag3d ' + (it.cls || '');
            el.innerHTML = it.html;
            if (it.attrs) { Object.entries(it.attrs).forEach(([a, v]) => el.setAttribute(a, v)); }
            container.appendChild(el);
            return { el, pos: it.pos, min: it.minDist || 0, max: it.maxDist || 1e9 };
          });
          return list.map((x) => x.el);
        },
        update(show = true) {
          container.style.display = show ? '' : 'none';
          if (!show) { return; }
          for (const x of list) {
            const q = api.project(x.pos);
            const d = camera.position.distanceTo(x.pos);
            const on = q.on && d > x.min && d < x.max;
            x.el.style.opacity = on ? '1' : '0';
            x.el.style.transform = `translate(${q.x.toFixed(1)}px, ${q.y.toFixed(1)}px) translate(-50%, -50%)`;
          }
        },
      };
    },
  };
  return api;
}

// Tiện ích: nội suy khung hình camera theo vị trí cuộn trang
export function createTimeline(planFn) {
  let TL = [], SEC = [];
  const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const sm = (f) => f * f * (3 - 2 * f);
  function build() {
    const plan = planFn(), vh = window.innerHeight;
    TL = []; SEC = [];
    document.querySelectorAll('main > section').forEach((el) => {
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY, h = el.offsetHeight, sticky = el.classList.contains('scene');
      const span = sticky ? Math.max(1, h - vh) : Math.max(1, h - vh * 0.2);
      SEC.push({ id: el.id, el, top, h, span, sticky });
      const pl = plan[el.id];
      if (!pl) { return; }
      pl.keys.forEach((kf) => {
        const y = sticky ? top + kf.p * span : top - vh * 0.4 + kf.p * (h - vh * 0.2);
        TL.push({ y, pos: kf.pos, look: kf.look, ground: kf.ground || pl.ground, bloom: kf.bloom != null ? kf.bloom : pl.bloom });
      });
    });
    TL.sort((a, b) => a.y - b.y);
  }
  function sample(y) {
    if (!TL.length) { return null; }
    if (y <= TL[0].y) { return { ...TL[0] }; }
    for (let i = 0; i < TL.length - 1; i++) {
      const a = TL[i], b = TL[i + 1];
      if (y < b.y) {
        const e = sm(Math.max(0, Math.min(1, (y - a.y) / ((b.y - a.y) || 1))));
        const L = (u, v) => u.map((x, j) => x + (v[j] - x) * e);
        const g = L(hexRgb(a.ground), hexRgb(b.ground)).map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
        return { pos: L(a.pos, b.pos), look: L(a.look, b.look), ground: '#' + g, bloom: a.bloom + (b.bloom - a.bloom) * e };
      }
    }
    return { ...TL[TL.length - 1] };
  }
  const progressOf = (id) => { const s = SEC.find((x) => x.id === id); return s ? Math.max(0, Math.min(1, (window.scrollY - s.top) / s.span)) : 0; };
  const current = () => { const mid = window.scrollY + window.innerHeight * 0.5; const c = SEC.find((x) => mid >= x.top && mid < x.top + x.h); return c ? c.id : null; };
  const scrollToStep = (id, p) => { const s = SEC.find((x) => x.id === id); if (s) { window.scrollTo({ top: s.top + p * s.span + 2, behavior: REDUCED ? 'auto' : 'smooth' }); } };
  return { build, sample, progressOf, current, scrollToStep, get sections() { return SEC; }, hexRgb };
}
