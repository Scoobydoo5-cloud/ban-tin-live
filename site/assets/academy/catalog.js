// JayV Academy catalogue: program map + generated manifest + labs/games, and the Ctrl K search index.
import { PROGRAM, SUBJECTS, subjectByCode, lessonId } from './program.js';
import { MANIFEST } from './manifest.js';
import { LABS, GAMES } from './labs-meta.js';

export { PROGRAM, SUBJECTS, subjectByCode, lessonId, MANIFEST, LABS, GAMES };

// All lessons in program order, with readiness from the manifest
export function lessonsOf(s) {
  return s.lessons.map((t, i) => { const id = lessonId(s.code, i); const m = MANIFEST.ready[id]; return { id, i, n: i + 1, code: s.code, title: m ? m.title : t, ready: !!m, meta: m || null }; });
}
export function allReady() { return SUBJECTS.flatMap((s) => lessonsOf(s).filter((l) => l.ready).map((l) => ({ ...l, subject: s }))); }
export function lessonFile(id) { const [code, n] = id.split(/-(?=\d+$)/); return `./lessons/${code}/${n}.js`; }
export function loadLesson(id) { return import(lessonFile(id)).then((m) => m.default); }

export function searchIndex() {
  const items = [];
  SUBJECTS.forEach((s) => {
    items.push({ t: `${s.code} ${s.title}`, d: s.blurb, hash: `#/subject/${s.code}`, c: s.color, k: 'academy học viện subject uts ' + s.type });
    lessonsOf(s).filter((l) => l.ready).forEach((l) => items.push({ t: l.title, d: `${s.code} ${s.short} · ${l.meta.summary}`, hash: `#/lesson/${l.id}`, c: s.color, k: s.title }));
  });
  LABS.forEach((x) => items.push({ t: `Lab: ${x.title}`, d: x.blurb, hash: `#/lab/${x.id}`, c: x.color, k: 'lab phòng thí nghiệm' }));
  GAMES.forEach((x) => items.push({ t: `Game: ${x.title}`, d: x.blurb, hash: `#/game/${x.id}`, c: x.color, k: 'game trò chơi' }));
  return items;
}
