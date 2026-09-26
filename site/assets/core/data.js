// Tải số liệu đã kiểm tra (latest.json), nội dung chữ (content.json) và lớp giá trực tiếp.
import { createLive, hm, SYD } from './live.js';

export const ROOT = new URL('../../', import.meta.url);
export const href = (p) => new URL(p, ROOT).href;

function ago(ms) {
  const m = Math.round(ms / 60000);
  return m < 1 ? 'vừa xong' : m < 60 ? m + ' phút trước' : Math.round(m / 60) + ' giờ trước';
}

export function createFeed({ live = true, content = true, onData, onContent, onFresh } = {}) {
  let DATA = null, CONTENT = null, first = true;
  const lv = live ? createLive(() => { if (onData) { onData(DATA, 'live'); } fresh(); }) : null;

  function fresh() {
    if (!DATA || !onFresh) { return; }
    const st = lv ? lv.state : {};
    const at = [st.vnAt, st.worldAt].filter(Boolean).sort((a, b) => b - a)[0];
    const age = Date.now() - new Date(DATA.generatedAt).getTime();
    onFresh({ live: !!at, html: at ? `Trực tiếp ${hm(at, SYD)}<span class="lbl-long"> · máy chủ ${ago(age)}</span>` : `<span class="lbl-long">Cập nhật </span>${ago(age)}` });
  }
  function load() {
    return fetch(href('data/latest.json') + '?t=' + Date.now(), { cache: 'no-store' }).then((r) => r.json()).then((d) => {
      const changed = !DATA || d.generatedAt !== DATA.generatedAt;
      if (changed) {
        DATA = d;
        window.__JAYV_DATA = d;
        if (lv) { lv.applyAll(DATA); }
        if (onData) { onData(DATA, 'server'); }
      }
      fresh();
      if (first && lv) { first = false; lv.refreshVN(DATA, true); lv.refreshWorld(DATA); }
    }).catch(() => { if (onFresh) { onFresh({ live: false, html: 'Chưa tải được số liệu' }); } });
  }
  function loadContent() {
    return fetch(href('data/content.json') + '?t=' + Date.now(), { cache: 'no-store' }).then((r) => (r.ok ? r.json() : null)).then((c) => {
      if (c) { CONTENT = c; if (onContent) { onContent(CONTENT); } }
    }).catch(() => {});
  }
  load();
  if (content) { loadContent(); }
  setInterval(() => { if (!document.hidden) { load(); if (lv && DATA) { lv.refreshVN(DATA, false); lv.refreshWorld(DATA); } } }, 60000);
  if (content) { setInterval(() => { if (!document.hidden) { loadContent(); } }, 600000); }
  return { get data() { return DATA; }, get content() { return CONTENT; }, reload: load };
}
