// Khung chung của JayV Finance: thanh trên, menu toàn màn hình, bảng lệnh Ctrl/⌘K, chuyển trang, con trỏ, chân trang.
import { ROOT, href } from './data.js';
import { esc } from './fmt.js';

export const PAGES = [
  { id: 'home', path: '', n: '01', name: 'Trang chủ', short: 'Trang chủ', desc: 'Câu chuyện của JayV và cửa vào mọi mục.', c: '#e9b85c' },
  { id: 'market', path: 'thi-truong/', n: '02', name: 'Toàn cảnh thị trường', short: 'Thị trường', desc: 'Quả địa cầu ba sàn, sáu con số vĩ mô, bảng tổng hợp.', c: '#5fe3e0' },
  { id: 'brief', path: 'ban-tin/', n: '03', name: 'Bản tin', short: 'Bản tin', desc: 'Chuyện gì vừa xảy ra, vì sao, và sổ dự báo tự chấm điểm.', c: '#7fb2ff' },
  { id: 'report', path: 'bao-cao/', n: '04', name: 'Báo cáo tuần', short: 'Báo cáo', desc: 'Ba ý chính, cây kịch bản có xác suất, lịch tuần tới.', c: '#d9a654' },
  { id: 'stocks', path: 'co-phieu/', n: '05', name: 'Cổ phiếu', short: 'Cổ phiếu', desc: 'Thành phố cổ phiếu 3D: mỗi tòa nhà là một mã theo dõi.', c: '#38d99c' },
  { id: 'fund', path: 'quy/', n: '06', name: 'Quỹ JayV', short: 'Quỹ JayV', desc: 'Danh mục mô phỏng phong cách Buffett, quy tắc cố định.', c: '#ffd98a' },
  { id: 'academy', path: 'hoc-vien/', n: '07', name: 'Học viện', en: 'Academy', short: 'Học viện', desc: 'Finance taught in English: từ nền tảng tới CFA và quant.', c: '#9b8cff' },
  { id: 'board', path: 'bang-gia/', n: '08', name: 'Bảng giá', short: 'Bảng giá', desc: 'Giá trực tiếp, đã kiểm tra hai nguồn, cập nhật 15 phút/lần.', c: '#ff7ab6' },
];
export const pageHref = (id) => href((PAGES.find((p) => p.id === id) || PAGES[0]).path);
export const DISCLAIMER = 'JayV Finance là dự án học tập cá nhân. Quỹ JayV là danh mục mô phỏng bằng tiền ảo: không nhận vốn, không quản lý tiền của ai và không phải tổ chức tài chính được cấp phép. Nội dung không phải lời khuyên đầu tư; đầu tư có thể mất vốn.';

export const MARK = `<svg class="mark" viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="jvg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe3a3"/><stop offset=".55" stop-color="#e9b85c"/><stop offset="1" stop-color="#a8741f"/></linearGradient></defs>
<path d="M20 2.6 35.2 11.3v17.4L20 37.4 4.8 28.7V11.3z" fill="rgba(10,18,24,.85)" stroke="url(#jvg)" stroke-width="1.6"/>
<path d="M11.2 12.4h7.2v10.9c0 3-2 4.9-4.7 4.9-2.3 0-3.9-1.4-4.3-3.6" fill="none" stroke="url(#jvg)" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.2 12.4l4.9 15.4 4.9-15.4" fill="none" stroke="#5fe3e0" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const ICON_SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>';

export function initShell(pageId, { accent } = {}) {
  const page = PAGES.find((p) => p.id === pageId) || PAGES[0];
  const root = document.documentElement;
  root.classList.add('js');
  if (accent || page.c) { root.style.setProperty('--accent', accent || page.c); }

  // Thanh trên
  const hdr = document.createElement('header');
  hdr.className = 'site-header';
  hdr.innerHTML = `
    <a class="brand" href="${href('')}" data-nav aria-label="JayV Finance, trang chủ">${MARK}<span class="wm"><b>Jay<span>V</span></b><small>FINANCE</small></span></a>
    <nav class="nav" aria-label="Các mục">${PAGES.filter((p) => p.id !== 'home').map((p) => `<a href="${href(p.path)}" data-nav style="--c:${p.c}"${p.id === page.id ? ' aria-current="page"' : ''}>${esc(p.short)}</a>`).join('')}</nav>
    <div class="hdr-r">
      <span class="chip" id="fresh" role="status" hidden><span class="dot" aria-hidden="true"></span><span id="fresh-t">Đang tải…</span></span>
      <button class="icon-btn" type="button" id="open-palette" aria-label="Tìm nhanh (Ctrl K)" title="Tìm nhanh · Ctrl K">${ICON_SEARCH}</button>
      <button class="menu-btn" type="button" id="open-menu" aria-expanded="false" aria-controls="site-menu"><i aria-hidden="true"></i><span>Menu</span></button>
    </div>`;
  document.body.prepend(hdr);
  const onScrollHdr = () => hdr.classList.toggle('solid', window.scrollY > 40);
  window.addEventListener('scroll', onScrollHdr, { passive: true });
  onScrollHdr();

  // Menu toàn màn hình
  const menu = document.createElement('div');
  menu.className = 'menu';
  menu.id = 'site-menu';
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-label', 'Menu');
  menu.innerHTML = `<ol>${PAGES.map((p, i) => `<li style="transition-delay:${0.04 * i + 0.05}s"><a href="${href(p.path)}" data-nav data-i="${i}" style="--c:${p.c}"${p.id === page.id ? ' aria-current="page"' : ''}><span class="n">${p.n}</span><span class="t">${esc(p.name)}${p.en ? `<em>${esc(p.en)}</em>` : ''}</span></a></li>`).join('')}</ol>
    <div class="menu-side"><div class="preview" id="menu-preview"></div>
      <p class="fine">${esc(DISCLAIMER)}</p>
      <p class="fine">Mẹo: nhấn <span class="kbd">Ctrl</span> <span class="kbd">K</span> hoặc <span class="kbd">/</span> để tìm nhanh bất kỳ mục, mã cổ phiếu hay bài học nào.</p></div>`;
  document.body.appendChild(menu);
  const prev = menu.querySelector('#menu-preview');
  const showPrev = (p) => { prev.innerHTML = `<div class="k">${p.n} / 08</div><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>`; menu.style.setProperty('--menu-accent', p.c); };
  showPrev(page);
  menu.querySelectorAll('a[data-i]').forEach((a) => {
    const p = PAGES[+a.dataset.i];
    a.addEventListener('mouseenter', () => showPrev(p));
    a.addEventListener('focus', () => showPrev(p));
  });
  const menuBtn = hdr.querySelector('#open-menu');
  const setMenu = (on) => {
    root.classList.toggle('menu-open', on);
    menuBtn.setAttribute('aria-expanded', String(on));
    menuBtn.querySelector('span').textContent = on ? 'Đóng' : 'Menu';
    if (on) { const a = menu.querySelector('a[aria-current]') || menu.querySelector('a'); setTimeout(() => a && a.focus(), 60); }
  };
  menuBtn.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));

  // Bảng lệnh
  const pal = document.createElement('div');
  pal.className = 'palette';
  pal.hidden = true;
  pal.innerHTML = `<div class="box" role="dialog" aria-label="Tìm nhanh"><input type="search" placeholder="Tìm mục, mã cổ phiếu, bài học… (Esc để đóng)" aria-label="Tìm nhanh" autocomplete="off"><ul></ul><div class="hint">↑ ↓ để chọn · Enter để mở · Esc để đóng</div></div>`;
  document.body.appendChild(pal);
  const pin = pal.querySelector('input'), pul = pal.querySelector('ul');
  let extra = [], sel = 0, shown = [], academyLoaded = false;
  const base = () => {
    const D = window.__JAYV_DATA;
    const tickers = D ? (D.groups.watchlist || []).filter((k) => D.items[k]).map((k) => ({ t: D.items[k].label, d: (D.items[k].name || '') + ' · xem trong thành phố cổ phiếu', u: href('co-phieu/') + '#' + k, c: '#38d99c', g: 'Mã', k: k })) : [];
    return PAGES.map((p) => ({ t: p.name + (p.en ? ' · ' + p.en : ''), d: p.desc, u: href(p.path), c: p.c, g: 'Mục' })).concat(tickers);
  };
  function renderPal() {
    const q = pin.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
    const all = base().concat(extra);
    shown = !q ? all.slice(0, 12) : all.filter((x) => (x.t + ' ' + (x.d || '') + ' ' + (x.k || '')).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').includes(q)).slice(0, 40);
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    pul.innerHTML = shown.length ? shown.map((x, i) => `<li><a href="${x.u}" data-nav class="${i === sel ? 'sel' : ''}" style="--c:${x.c || 'var(--accent)'}"><i></i><span><b>${esc(x.t)}</b>${x.d ? `<br><span class="d">${esc(x.d)}</span>` : ''}</span><span class="g">${esc(x.g || '')}</span></a></li>`).join('') : '<li style="padding:14px;color:var(--dim)">Không thấy kết quả.</li>';
  }
  function openPal() {
    pal.hidden = false; pin.value = ''; sel = 0; renderPal(); pin.focus();
    if (!academyLoaded) {
      academyLoaded = true;
      import('../academy/catalog.js').then((m) => {
        extra = extra.concat(m.searchIndex().map((x) => ({ ...x, u: href('hoc-vien/') + x.hash, g: 'Academy' })));
        renderPal();
      }).catch(() => {});
    }
  }
  const closePal = () => { pal.hidden = true; };
  hdr.querySelector('#open-palette').addEventListener('click', openPal);
  pal.addEventListener('click', (e) => { if (e.target === pal) { closePal(); } });
  pin.addEventListener('input', () => { sel = 0; renderPal(); });
  pin.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(shown.length - 1, sel + 1); renderPal(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); renderPal(); }
    else if (e.key === 'Enter') { e.preventDefault(); const a = pul.querySelectorAll('a')[sel]; if (a) { closePal(); go(a.href, a); } }
  });
  document.addEventListener('keydown', (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || '');
    if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); if (pal.hidden) { openPal(); } else { closePal(); } }
    else if (e.key === '/' && !typing && pal.hidden) { e.preventDefault(); openPal(); }
    else if (e.key === 'Escape') { if (!pal.hidden) { closePal(); } else if (root.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); } }
  });

  // Chuyển trang có hiệu ứng
  const warp = document.createElement('div');
  warp.className = 'warp';
  warp.setAttribute('aria-hidden', 'true');
  document.body.appendChild(warp);
  const bootMark = document.createElement('div');
  bootMark.className = 'boot-mark';
  bootMark.innerHTML = MARK;
  document.body.appendChild(bootMark);
  let onWarp = null;
  function go(url, from) {
    const u = new URL(url, location.href);
    const same = u.origin === location.origin && u.pathname === location.pathname;
    if (same) { location.href = u.href; if (u.hash) { setMenu(false); } return; }
    const tp = PAGES.find((p) => u.href.startsWith(href(p.path)) && p.path) || null;
    root.style.setProperty('--warp-c', tp ? tp.c : 'var(--accent)');
    if (from && from.getBoundingClientRect) {
      const r = from.getBoundingClientRect();
      root.style.setProperty('--wx', ((r.left + r.width / 2) / window.innerWidth * 100).toFixed(1) + '%');
      root.style.setProperty('--wy', ((r.top + r.height / 2) / window.innerHeight * 100).toFixed(1) + '%');
    }
    if (onWarp) { try { onWarp(); } catch (e) { /* bỏ qua */ } }
    root.classList.add('warping');
    setTimeout(() => { location.href = u.href; }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 430);
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[data-nav], a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.hasAttribute('download')) { return; }
    const u = new URL(a.getAttribute('href'), location.href);
    if (u.origin !== location.origin || !u.href.startsWith(ROOT.href)) { return; }
    if (u.pathname === location.pathname) { if (!pal.hidden) { closePal(); } setMenu(false); return; }
    e.preventDefault();
    closePal();
    go(u.href, a);
  });
  window.addEventListener('pageshow', (e) => { if (e.persisted) { root.classList.remove('warping', 'booting', 'menu-open'); } });

  // Con trỏ phát sáng
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const cur = document.createElement('div');
    cur.className = 'cursor';
    document.body.appendChild(cur);
    let cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY; cur.classList.add('on');
      const hot = e.target.closest && e.target.closest('a, button, [data-hot], input, select, summary, label');
      cur.classList.toggle('big', !!hot);
    }, { passive: true });
    document.addEventListener('pointerleave', () => cur.classList.remove('on'));
    const tick = () => { cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22; cur.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px)`; requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }

  // Hiện dần khi cuộn tới
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.18 });
  const observe = (scope = document) => scope.querySelectorAll('.lines:not(.in), .rise:not(.in), [data-reveal]:not(.in)').forEach((el) => io.observe(el));
  observe();

  // Nghiêng 3D theo con trỏ cho thẻ có data-tilt
  document.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') { return; }
    const el = e.target.closest && e.target.closest('[data-tilt]');
    document.querySelectorAll('[data-tilt].tilting').forEach((x) => { if (x !== el) { x.classList.remove('tilting'); x.style.transform = ''; } });
    if (!el) { return; }
    const r = el.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
    el.classList.add('tilting');
    el.style.transform = `perspective(900px) rotateX(${(-ny * 7).toFixed(2)}deg) rotateY(${(nx * 9).toFixed(2)}deg) translateZ(6px)`;
    el.style.setProperty('--mx', ((nx + 0.5) * 100).toFixed(1) + '%');
    el.style.setProperty('--my', ((ny + 0.5) * 100).toFixed(1) + '%');
  }, { passive: true });

  // Chân trang
  const foot = document.createElement('footer');
  foot.className = 'site-footer';
  foot.innerHTML = `<div class="in">
      <div style="display:grid;gap:14px;align-content:start">
        <a class="brand" href="${href('')}" data-nav>${MARK}<span class="wm"><b>Jay<span>V</span></b><small>FINANCE</small></span></a>
        <p>Một quỹ mô phỏng sinh ra từ giấc mơ của một sinh viên mê đầu tư: theo dõi Việt Nam, Úc và Mỹ mỗi ngày, số trước lời sau, và tự chấm điểm mọi dự báo.</p>
      </div>
      <div><h4>Các mục</h4><ul>${PAGES.map((p) => `<li><a href="${href(p.path)}" data-nav>${p.n} · ${esc(p.name)}</a></li>`).join('')}</ul></div>
      <div><h4>Nguồn số liệu</h4><ul><li>KBS (Việt Nam)</li><li>Yahoo Finance, CNBC (Úc, Mỹ, tỷ giá, hàng hóa)</li><li>FRED, RBA, Fed, Cục Thống kê</li><li>Bản đồ: Natural Earth (world-atlas)</li></ul></div>
    </div>
    <div class="legal"><span>${esc(DISCLAIMER)}</span><span>Mỗi con số được đối chiếu hai nguồn khi có thể; số có thể sai hoặc trễ. © ${new Date().getFullYear()} JayV Finance · dựng bằng three.js.</span></div>`;
  document.body.appendChild(foot);

  // Liên kết sâu tới một chặng cuộn: ?at=<id mục>:<tiến độ 0..1> (dùng khi chia sẻ hoặc kiểm thử)
  const at = new URLSearchParams(location.search).get('at');
  if (at) {
    const [sid, sp] = at.split(':');
    const jump = () => { const el = document.getElementById(sid); if (el) { const top = el.getBoundingClientRect().top + window.scrollY; const span = el.classList.contains('scene') ? el.offsetHeight - window.innerHeight : 0; window.scrollTo(0, top + (parseFloat(sp) || 0) * span + 1); } };
    setTimeout(jump, 60); window.addEventListener('load', () => setTimeout(jump, 60));
  }

  // Màn khởi động: che tới khi cảnh 3D vẽ khung đầu tiên (tối đa 1,6 giây)
  root.classList.add('booting');
  let booted = false;
  const ready = () => { if (booted) { return; } booted = true; requestAnimationFrame(() => root.classList.remove('booting')); };
  setTimeout(ready, 1600);

  return {
    page,
    ready,
    go,
    observe,
    set onWarp(fn) { onWarp = fn; },
    setFresh(f) {
      const chip = hdr.querySelector('#fresh');
      chip.hidden = false;
      chip.querySelector('#fresh-t').innerHTML = f.html;
      chip.querySelector('.dot').style.background = f.live ? '' : 'var(--gold)';
    },
    addSearch(items) { extra = extra.concat(items); },
  };
}
