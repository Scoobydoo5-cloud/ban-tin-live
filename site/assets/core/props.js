// Đạo cụ 3D dùng chung: địa cầu chấm sáng, đồng xu, thùng dầu, thỏi vàng, đường lợi suất, biểu tượng JV, vòng phân bổ.
import * as THREE from 'three';
import { canvasTexture, dotTexture, UP, DOWN, FLAT, GOLD, TEAL } from './engine.js';
import { globePoints, latLon, CITIES } from './geo.js';

const std = (o) => new THREE.MeshStandardMaterial(o);

// ---------------- Địa cầu chấm sáng với cột sáng ba sàn ----------------
export function makeGlobe({ R = 11, n = 16000, mobile = false, arcs = true, beacons = true } = {}) {
  const group = new THREE.Group();
  const spin = new THREE.Group();
  spin.rotation.order = 'XYZ';
  group.add(spin);
  spin.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 64, 48), new THREE.MeshBasicMaterial({ color: 0x040a12 })));
  const { land, sea } = globePoints(mobile ? Math.round(n * 0.55) : n, R);
  const mk = (arr, size, color, opacity) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
    return new THREE.Points(g, new THREE.PointsMaterial({ size: size * R / 11, map: dotTexture(), color, transparent: true, opacity, depthWrite: false }));
  };
  spin.add(mk(land, 0.26, 0x8ff5e8, 0.95), mk(sea, 0.12, 0x2a6f86, 0.5));
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.13, 64, 48), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide,
    uniforms: { uColor: { value: new THREE.Color('#3fd6e0') } },
    vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 uColor; varying vec3 vN; void main(){ float f = pow(max(0.0, 0.62 - dot(vN, vec3(0.0,0.0,1.0))), 3.2) * 0.55; gl_FragColor = vec4(uColor, f); }',
  }));
  group.add(atmo);
  const bc = {};
  if (beacons) {
    Object.entries(CITIES).forEach(([m, c]) => {
      const pos = latLon(c.lat, c.lon, R);
      const g = new THREE.Group();
      g.position.copy(pos);
      g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
      const beamMat = std({ color: FLAT, emissive: FLAT, emissiveIntensity: 1.4, roughness: 0.4 });
      const beamGeo = new THREE.CylinderGeometry(0.11 * R / 11, 0.11 * R / 11, 1, 16);
      beamGeo.translate(0, 0.5, 0);
      const beam = new THREE.Mesh(beamGeo, beamMat);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.28 * R / 11, 20, 14), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      const ringMat = new THREE.MeshBasicMaterial({ color: FLAT, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.35 * R / 11, 0.5 * R / 11, 40), ringMat);
      ring.rotation.x = -Math.PI / 2;
      g.add(beam, cap, ring);
      spin.add(g);
      bc[m] = { g, beam, cap, ring, beamMat, ringMat, pos, h: 2 };
    });
  }
  const arcList = [];
  if (arcs && beacons) {
    [['VN', 'AU'], ['AU', 'US'], ['US', 'VN']].forEach(([a, b]) => {
      const p0 = bc[a].pos, p1 = bc[b].pos;
      const mid = p0.clone().add(p1).multiplyScalar(0.5);
      const curve = new THREE.QuadraticBezierCurve3(p0, mid.normalize().multiplyScalar(R * (1.25 + p0.distanceTo(p1) / (R * 5))), p1);
      spin.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.035 * R / 11, 6, false),
        new THREE.MeshBasicMaterial({ color: 0x5fe3e0, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })));
      const pulses = [0, 1, 2].map(() => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.14 * R / 11, 12, 10), new THREE.MeshBasicMaterial({ color: 0xe9fffd })); spin.add(s); return s; });
      arcList.push({ curve, pulses });
    });
  }
  // Góc quay để đưa từng thành phố ra trước mặt
  const angles = {};
  Object.entries(bc).forEach(([m, b]) => {
    const p = b.pos, a = Math.atan2(-p.x, p.z);
    angles[m] = { a, b: Math.atan2(p.y, -p.x * Math.sin(a) + p.z * Math.cos(a)) };
  });
  return {
    group, spin, beacons: bc, angles,
    setData(DATA) {
      Object.entries(CITIES).forEach(([m, c]) => {
        const it = DATA.items[c.key], b = bc[m];
        if (!b) { return; }
        const chg = it && it.changePct != null ? it.changePct : 0;
        const col = chg > 0.02 ? UP : chg < -0.02 ? DOWN : FLAT;
        b.beamMat.color.copy(col); b.beamMat.emissive.copy(col); b.ringMat.color.copy(col);
        b.h = (1.2 + Math.min(6, Math.abs(chg) * 3.2)) * R / 11;
        b.beam.scale.y = b.h; b.cap.position.y = b.h;
      });
    },
    tick(t) {
      Object.values(bc).forEach((b, i) => {
        const f = (t * 0.8 + i * 0.33) % 1;
        b.ring.scale.setScalar(1 + f * 2.2);
        b.ringMat.opacity = 0.9 * (1 - f);
      });
      arcList.forEach((a, i) => a.pulses.forEach((p, j) => p.position.copy(a.curve.getPoint((t * 0.18 + j / 3 + i * 0.11) % 1))));
    },
  };
}

// ---------------- Đồng xu (đã sửa: mặt chữ đúng chiều ở cả hai mặt, chờ phông tải xong) ----------------
function coinFace({ sym, metal, dark, ink, rimText, symSize = 430, symFont = 'Unbounded' }) {
  return canvasTexture(1024, 1024, (g, w, h) => {
    const cx = w / 2, cy = h / 2, R = w / 2;
    const grd = g.createRadialGradient(cx * 0.8, cy * 0.7, R * 0.05, cx, cy, R);
    grd.addColorStop(0, '#ffffff');
    grd.addColorStop(0.18, metal);
    grd.addColorStop(1, dark);
    g.fillStyle = grd; g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.fill();
    // Vành nổi và các vạch
    g.strokeStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 10;
    g.beginPath(); g.arc(cx, cy, R * 0.9, 0, Math.PI * 2); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,0.5)'; g.lineWidth = 4;
    g.beginPath(); g.arc(cx, cy, R * 0.9 - 8, 0, Math.PI * 2); g.stroke();
    for (let i = 0; i < 120; i++) {
      const a = (i / 120) * Math.PI * 2;
      g.strokeStyle = i % 2 ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.22)';
      g.lineWidth = 3;
      g.beginPath(); g.moveTo(cx + Math.cos(a) * R * 0.93, cy + Math.sin(a) * R * 0.93); g.lineTo(cx + Math.cos(a) * R * 0.99, cy + Math.sin(a) * R * 0.99); g.stroke();
    }
    // Chữ chạy vòng quanh
    if (rimText) {
      g.save();
      g.font = `700 ${Math.round(R * 0.085)}px "Be Vietnam Pro", "Segoe UI", sans-serif`;
      g.fillStyle = ink; g.textAlign = 'center'; g.textBaseline = 'middle';
      const chars = [...rimText];
      const span = Math.PI * 1.1, start = -Math.PI / 2 - span / 2;
      chars.forEach((ch, i) => {
        const a = start + (i + 0.5) * (span / chars.length);
        g.save(); g.translate(cx + Math.cos(a) * R * 0.76, cy + Math.sin(a) * R * 0.76); g.rotate(a + Math.PI / 2); g.fillText(ch, 0, 0); g.restore();
      });
      g.restore();
    }
    // Ký hiệu khắc chìm: bóng tối lệch xuống, viền sáng lệch lên
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = `800 ${symSize}px "${symFont}", "Be Vietnam Pro", "Segoe UI", sans-serif`;
    const y = cy + symSize * 0.06;
    g.fillStyle = 'rgba(255,255,255,0.55)'; g.fillText(sym, cx - 5, y - 5);
    g.fillStyle = 'rgba(0,0,0,0.55)'; g.fillText(sym, cx + 6, y + 7);
    g.fillStyle = ink; g.fillText(sym, cx, y);
  });
}
let KNURL = null;
function knurl() {
  if (KNURL) { return KNURL; }
  KNURL = canvasTexture(512, 32, (g, w, h) => {
    for (let x = 0; x < w; x += 4) { g.fillStyle = (x / 4) % 2 ? '#222' : '#ddd'; g.fillRect(x, 0, 4, h); }
  }, { srgb: false });
  KNURL.wrapS = THREE.RepeatWrapping; KNURL.repeat.set(6, 1);
  return KNURL;
}
export function makeCoin({ sym, metal = '#d7dde2', dark = '#5d6a73', ink = '#1b2a33', rimText = '', radius = 1.6, thick = 0.24, symSize, symFont } = {}) {
  const g = new THREE.Group();
  const face = coinFace({ sym, metal, dark, ink, rimText, symSize, symFont });
  const faceMat = std({ map: face, bumpMap: face, bumpScale: 1.4, metalness: 0.8, roughness: 0.3 });
  const front = new THREE.Mesh(new THREE.CircleGeometry(radius, 96), faceMat);
  front.position.z = thick / 2;
  const back = new THREE.Mesh(new THREE.CircleGeometry(radius, 96), faceMat);
  back.rotation.y = Math.PI; back.position.z = -thick / 2;
  const edgeMat = std({ color: metal, metalness: 0.95, roughness: 0.28, bumpMap: knurl(), bumpScale: 1.2 });
  const edge = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, thick, 96, 1, true), edgeMat);
  edge.rotation.x = Math.PI / 2;
  const rimMat = std({ color: metal, metalness: 1, roughness: 0.22 });
  [thick / 2, -thick / 2].forEach((z) => { const r = new THREE.Mesh(new THREE.TorusGeometry(radius - 0.05, 0.05, 10, 96), rimMat); r.position.z = z; g.add(r); });
  g.add(front, back, edge);
  g.userData.edgeMat = edgeMat;
  return g;
}
// Chồng xu nằm ngang
export function makeCoinStack(n, { radius = 1.6, thick = 0.24, metal = '#d7dde2' } = {}) {
  const g = new THREE.Group();
  const mat = std({ color: metal, metalness: 0.95, roughness: 0.3, bumpMap: knurl(), bumpScale: 1.2 });
  const cap = std({ color: metal, metalness: 0.9, roughness: 0.35 });
  for (let i = 0; i < n; i++) {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, thick, 64), [mat, cap, cap]);
    c.position.set((Math.random() - 0.5) * 0.12, i * (thick + 0.015), (Math.random() - 0.5) * 0.12);
    c.rotation.y = Math.random() * Math.PI;
    g.add(c);
  }
  return g;
}

// ---------------- Thùng dầu ----------------
export function makeBarrel(name, col, txt) {
  const g = new THREE.Group();
  const band = canvasTexture(1024, 256, (c, w, h) => {
    c.fillStyle = col; c.fillRect(0, 0, w, h);
    c.fillStyle = 'rgba(255,255,255,0.08)'; c.fillRect(0, h * 0.18, w, 6); c.fillRect(0, h * 0.8, w, 6);
    c.fillStyle = txt; c.font = '800 118px "Unbounded", "Segoe UI", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(name, w / 2, h / 2 + 6);
  });
  band.wrapS = THREE.RepeatWrapping; band.repeat.set(2, 1);
  const side = std({ map: band, metalness: 0.55, roughness: 0.38 });
  const capM = std({ color: col, metalness: 0.7, roughness: 0.3 });
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 2.9, 48, 1), [side, capM, capM]));
  const hoop = std({ color: 0xcfd6db, metalness: 0.9, roughness: 0.25 });
  [-1.05, 0, 1.05].forEach((y) => { const t = new THREE.Mesh(new THREE.TorusGeometry(1.17, 0.06, 10, 64), hoop); t.rotation.x = Math.PI / 2; t.position.y = y; g.add(t); });
  const plug = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 20), hoop);
  plug.position.set(0.55, 1.48, 0.2); g.add(plug);
  return g;
}

// ---------------- Thỏi vàng xếp tháp ----------------
export function makeGoldBars() {
  const g = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(-1.3, 0); shape.lineTo(1.3, 0); shape.lineTo(1.0, 0.72); shape.lineTo(-1.0, 0.72); shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 1.1, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 3 });
  geo.translate(0, 0, -0.55);
  const mat = std({ color: GOLD, metalness: 1, roughness: 0.2, emissive: 0x3a2400, emissiveIntensity: 0.35 });
  [[-1.4, 0], [1.4, 0], [0, 0.84]].forEach(([x, y]) => { const b = new THREE.Mesh(geo, mat); b.position.set(x, y - 0.9, 0); g.add(b); });
  return g;
}

// ---------------- Đường cong lợi suất ----------------
export function makeYieldCurve(values) {
  const g = new THREE.Group();
  const ys = values && values.length > 2 ? values : [0, 0.55, 0.85, 1.05, 1.2, 1.3, 1.36];
  const lo = Math.min(...ys), hi = Math.max(...ys);
  const pts = ys.map((y, i) => new THREE.Vector3(-2.4 + i * (4.8 / (ys.length - 1)), ((y - lo) / ((hi - lo) || 1)) * 2.2 - 0.9, 0));
  const curve = new THREE.CatmullRomCurve3(pts);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.1, 10, false), std({ color: TEAL, emissive: TEAL, emissiveIntensity: 0.9, roughness: 0.3 })));
  const dot = std({ color: 0xffffff, emissive: 0x9ff7f2, emissiveIntensity: 0.8 });
  pts.filter((_, i) => i % Math.max(1, Math.floor(pts.length / 7)) === 0).forEach((p) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 12), dot); s.position.copy(p); g.add(s); });
  const base = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.08, 1.6), std({ color: 0x15313a, metalness: 0.6, roughness: 0.4 }));
  base.position.y = -1.1; g.add(base);
  return g;
}

// ---------------- Biểu tượng JV (vàng + xanh ngọc trong khung lục giác) ----------------
export function makeEmblem({ glass = true } = {}) {
  const g = new THREE.Group();
  const J = new THREE.Shape();
  J.moveTo(-3.2, 2.5); J.lineTo(-0.6, 2.5); J.lineTo(-0.6, -1.0);
  J.absarc(-2.45, -1.0, 1.85, 0, -Math.PI, true);
  J.lineTo(-3.4, -1.0);
  J.absarc(-2.45, -1.0, 0.95, -Math.PI, 0, false);
  J.lineTo(-1.5, 1.6); J.lineTo(-3.2, 1.6); J.closePath();
  const V = new THREE.Shape();
  V.moveTo(0.3, 2.5); V.lineTo(1.25, 2.5); V.lineTo(2.45, -0.9); V.lineTo(3.65, 2.5); V.lineTo(4.6, 2.5); V.lineTo(2.95, -2.5); V.lineTo(1.95, -2.5); V.closePath();
  const ex = { depth: 0.9, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.1, bevelSegments: 4, curveSegments: 40 };
  const gold = new THREE.MeshPhysicalMaterial({ color: 0xf2c46a, metalness: 1, roughness: 0.16, clearcoat: 0.6, clearcoatRoughness: 0.2, emissive: 0x3a2400, emissiveIntensity: 0.25 });
  const teal = new THREE.MeshPhysicalMaterial({ color: 0x7ff0ea, metalness: 0.9, roughness: 0.14, clearcoat: 0.8, emissive: 0x1a8f8a, emissiveIntensity: 0.55 });
  const jg = new THREE.ExtrudeGeometry(J, ex), vg = new THREE.ExtrudeGeometry(V, ex);
  [jg, vg].forEach((x) => x.translate(-0.15, 0.18, -0.45));
  const letters = new THREE.Group();
  letters.add(new THREE.Mesh(jg, gold), new THREE.Mesh(vg, teal));
  g.add(letters);
  // Khung lục giác có lỗ
  const hex = new THREE.Shape(), hole = new THREE.Path();
  for (let i = 0; i < 6; i++) { const a = Math.PI / 2 + i * Math.PI / 3; (i ? hex.lineTo.bind(hex) : hex.moveTo.bind(hex))(Math.cos(a) * 7.3, Math.sin(a) * 7.3); }
  hex.closePath();
  for (let i = 0; i < 6; i++) { const a = Math.PI / 2 + i * Math.PI / 3; (i ? hole.lineTo.bind(hole) : hole.moveTo.bind(hole))(Math.cos(a) * 6.5, Math.sin(a) * 6.5); }
  hole.closePath();
  hex.holes.push(hole);
  const frame = new THREE.Mesh(new THREE.ExtrudeGeometry(hex, { depth: 0.6, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.1, bevelSegments: 3 }), gold);
  frame.geometry.translate(0, 0, -0.3);
  g.add(frame);
  if (glass) {
    const disc = new THREE.Mesh(new THREE.CircleGeometry(6.55, 6), new THREE.MeshPhysicalMaterial({ color: 0x0b1c24, metalness: 0.2, roughness: 0.08, transparent: true, opacity: 0.55, clearcoat: 1, side: THREE.DoubleSide }));
    disc.rotation.z = Math.PI / 2; disc.position.z = -0.35;
    g.add(disc);
  }
  return { group: g, letters, frame, gold, teal };
}

// ---------------- Vòng phân bổ (xuyến chia đoạn) ----------------
export function makeAllocRing(segs, { R = 6, gap = 0.06 } = {}) {
  const g = new THREE.Group();
  const tot = segs.reduce((a, s) => a + s.w, 0) || 1;
  let a0 = 0;
  segs.forEach((s) => {
    const arc = Math.max(0.02, (s.w / tot) * Math.PI * 2 - gap);
    const geo = new THREE.TorusGeometry(R, s.thick || 0.9, 28, 160, arc);
    const mat = s.metal
      ? std({ color: s.col, metalness: 1, roughness: 0.2, emissive: 0x4a3000, emissiveIntensity: 0.45 })
      : std({ color: s.col, transparent: true, opacity: s.opacity || 0.6, roughness: 0.15, metalness: 0.2, emissive: s.col, emissiveIntensity: 0.25 });
    const m = new THREE.Mesh(geo, mat);
    m.rotation.z = a0;
    m.userData = { ...s.data, mid: a0 + arc / 2 };
    g.add(m);
    a0 += arc + gap;
  });
  return g;
}

// Nến (hộp) dùng chung, mặt đáy ở y = 0
export function unitBox(w = 1, d = 1) { const b = new THREE.BoxGeometry(w, 1, d); b.translate(0, 0.5, 0); return b; }
export { UP, DOWN, FLAT, GOLD, TEAL };
