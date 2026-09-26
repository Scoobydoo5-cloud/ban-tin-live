// Kiểm tra toàn bộ bài giảng Học viện và sinh site/assets/academy/manifest.js.
//   node tools/build_academy.mjs          -> kiểm tra + ghi manifest
//   node tools/build_academy.mjs --check  -> chỉ kiểm tra, báo lỗi nếu manifest chưa cập nhật
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AC = path.join(ROOT, 'site', 'assets', 'academy');
const imp = (p) => import(pathToFileURL(p).href);
const { SUBJECTS, lessonId } = await imp(path.join(AC, 'program.js'));
const { RES, BOOKS } = await imp(path.join(AC, 'resources.js'));
const { LABS } = await imp(path.join(AC, 'labs-meta.js'));

const KINDS = new Set(['p', 'h', 'h3', 'math', 'list', 'olist', 'note', 'key', 'warn', 'example', 'table', 'code', 'lab', 'case', 'defs', 'steps', 'chart']);
const errors = [];
const err = (id, m) => errors.push(`${id}: ${m}`);
const words = (s) => String(s || '').replace(/\\\(|\\\)|\\[a-zA-Z]+|[{}^_$]/g, ' ').split(/\s+/).filter(Boolean).length;
const labIds = new Set(LABS.map((l) => l.id));

const ready = {};
let totalWords = 0, totalEx = 0, planned = 0;
for (const s of SUBJECTS) {
  for (let i = 0; i < s.lessons.length; i++) {
    planned += 1;
    const id = lessonId(s.code, i);
    const file = path.join(AC, 'lessons', s.code, String(i + 1).padStart(2, '0') + '.js');
    if (!existsSync(file)) { continue; }
    let L;
    try { L = (await imp(file)).default; } catch (e) { err(id, 'không nạp được: ' + e.message); continue; }
    if (!L || L.id !== id) { err(id, `id trong file là ${L && L.id}`); continue; }
    for (const f of ['title', 'summary', 'mins', 'level', 'objectives', 'body', 'exercises']) { if (L[f] == null) { err(id, 'thiếu ' + f); } }
    // Công thức nội dòng phải đóng mở đủ cặp \( … \)
    const walk = (v, where) => {
      if (typeof v === 'string') { const o = (v.match(/\\\(/g) || []).length, c = (v.match(/\\\)/g) || []).length; if (o !== c) { err(id, `${where}: \\( và \\) lệch (${o}/${c}): ${v.slice(0, 60)}`); } }
      else if (Array.isArray(v)) { v.forEach((x, k) => walk(x, `${where}[${k}]`)); }
      else if (v && typeof v === 'object') { Object.entries(v).forEach(([k, x]) => walk(x, `${where}.${k}`)); }
    };
    walk({ summary: L.summary, objectives: L.objectives, body: (L.body || []).filter((b) => b[0] !== 'math' && b[0] !== 'code'), exercises: L.exercises, glossary: L.glossary }, 'bài');
    let w = words(L.summary);
    (L.body || []).forEach((b, j) => {
      const [k, v] = b;
      if (!KINDS.has(k)) { err(id, `khối ${j} lạ: ${k}`); return; }
      if (k === 'lab' && !labIds.has(v)) { err(id, 'lab không có: ' + v); }
      if (k === 'example') { if (!v.title || !Array.isArray(v.steps) || !v.answer) { err(id, `ví dụ ${j} thiếu phần`); } w += words(v.title) + words(v.setup) + v.steps.map(words).reduce((a, b2) => a + b2, 0) + words(v.answer); }
      else if (k === 'table') { if (!Array.isArray(v.head) || !Array.isArray(v.rows)) { err(id, `bảng ${j} sai`); } else { v.rows.forEach((r) => { if (r.length !== v.head.length) { err(id, `bảng ${j} lệch cột`); } }); w += v.rows.flat().map(words).reduce((a, b2) => a + b2, 0); } }
      else if (k === 'defs') { if (!Array.isArray(v)) { err(id, 'defs sai'); } else { w += v.flat().map(words).reduce((a, b2) => a + b2, 0); } }
      else if (k === 'case') { if (!v.title || !v.text) { err(id, `case ${j} sai`); } w += words(v.title) + words(v.text) + (v.questions || []).map(words).reduce((a, b2) => a + b2, 0); }
      else if (k === 'code') { if (!v.src) { err(id, `code ${j} trống`); } }
      else if (k === 'chart') { if (!Array.isArray(v.x) || !Array.isArray(v.y) || !Array.isArray(v.series) || v.series.some((q) => !Array.isArray(q.pts) || q.pts.some((p) => !Array.isArray(p) || p.length !== 2 || !p.every(Number.isFinite)))) { err(id, `chart ${j} sai`); } w += words(v.caption) + words(v.note); }
      else if (k === 'list' || k === 'olist' || k === 'steps') { if (!Array.isArray(v)) { err(id, `${k} ${j} không phải mảng`); } else { w += v.map(words).reduce((a, b2) => a + b2, 0); } }
      else if (k !== 'math' && k !== 'lab') { w += words(v); }
    });
    (L.exercises || []).forEach((x, j) => {
      if (!x.q || !x.solution && x.type !== 'long') { err(id, `bài tập ${j + 1} thiếu đề hoặc lời giải`); }
      if (x.type === 'num') { if (!isFinite(x.answer) || x.tol == null) { err(id, `bài tập ${j + 1}: đáp án số hoặc tol sai`); } }
      else if (x.type === 'mcq') { if (!Array.isArray(x.options) || !(x.answer >= 0 && x.answer < x.options.length)) { err(id, `bài tập ${j + 1}: mcq sai`); } }
      else if (x.type === 'long') { if (!x.answer) { err(id, `bài tập ${j + 1}: thiếu đáp án mẫu`); } }
      else { err(id, `bài tập ${j + 1}: loại lạ ${x.type}`); }
      w += words(x.q) + words(x.solution) + words(x.answer && x.type === 'long' ? x.answer : '');
    });
    (L.resources || []).forEach((r) => { const k2 = r.startsWith('book:') ? r.slice(5) : r; if (!(r.startsWith('book:') ? BOOKS[k2] : RES[k2])) { err(id, 'nguồn không có: ' + r); } });
    (L.glossary || []).forEach((g) => { if (!Array.isArray(g) || g.length !== 2) { err(id, 'glossary sai'); } else { w += words(g[0]) + words(g[1]); } });
    ready[id] = { title: L.title, summary: L.summary, mins: L.mins, level: L.level, words: w, ex: (L.exercises || []).length, res: L.resources || [] };
    totalWords += w; totalEx += (L.exercises || []).length;
  }
}
const manifest = { ready, totals: { subjects: SUBJECTS.length, planned, ready: Object.keys(ready).length, words: totalWords, exercises: totalEx } };
const out = '// Sinh tự động bởi tools/build_academy.mjs — đừng sửa tay.\nexport const MANIFEST = ' + JSON.stringify(manifest, null, 1) + ';\n';
const target = path.join(AC, 'manifest.js');
if (process.argv.includes('--check')) {
  const cur = existsSync(target) ? readFileSync(target, 'utf8') : '';
  if (cur.replace(/\r\n/g, '\n') !== out) { errors.push('manifest.js chưa cập nhật: chạy node tools/build_academy.mjs'); }
} else {
  writeFileSync(target, out);
}
console.log(`Bài sẵn sàng: ${manifest.totals.ready}/${planned} · ${totalWords.toLocaleString('en')} từ · ${totalEx} bài tập`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
