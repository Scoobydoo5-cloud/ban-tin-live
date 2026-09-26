// Lecture mode: the professor reads the lesson aloud with the browser's own English voice (Web Speech API),
// highlighting and scrolling to each block. Nothing is sent to a server; voices come from the viewer's device.

// ---------- LaTeX to spoken English ----------
const GREEK = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'varepsilon', 'zeta', 'eta', 'theta', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'pi', 'rho', 'sigma', 'tau', 'phi', 'varphi', 'chi', 'psi', 'omega', 'Gamma', 'Delta', 'Theta', 'Lambda', 'Sigma', 'Phi', 'Pi', 'Omega'];
const WORDS = [
  [/\\mathbb\{E\}|\\operatorname\{E\}/g, ' the expected value of '],
  [/\\operatorname\{Var\}|\\text\{Var\}|\\mathrm\{Var\}/g, ' the variance of '],
  [/\\operatorname\{Cov\}|\\text\{Cov\}|\\mathrm\{Cov\}/g, ' the covariance of '],
  [/\\operatorname\{Corr\}|\\text\{Corr\}/g, ' the correlation of '],
  [/\\times|\\cdot|\\ast/g, ' times '], [/\\div/g, ' divided by '], [/\\pm/g, ' plus or minus '],
  [/\\approx/g, ' is approximately '], [/\\neq|\\ne\b/g, ' is not equal to '], [/\\equiv/g, ' is identical to '],
  [/\\leq|\\le\b/g, ' is at most '], [/\\geq|\\ge\b/g, ' is at least '], [/\\ll/g, ' is much less than '], [/\\gg/g, ' is much greater than '],
  [/\\Rightarrow|\\implies/g, ', which implies '], [/\\rightarrow|\\to\b/g, ' goes to '], [/\\Leftrightarrow|\\iff/g, ' if and only if '],
  [/\\infty/g, ' infinity '], [/\\sum/g, ' the sum of '], [/\\prod/g, ' the product of '], [/\\int/g, ' the integral of '],
  [/\\partial/g, ' partial '], [/\\nabla/g, ' gradient '], [/\\ln/g, ' the natural log of '], [/\\log/g, ' the log of '],
  [/\\exp/g, ' e to the '], [/\\max/g, ' the maximum of '], [/\\min/g, ' the minimum of '], [/\\sim/g, ' is distributed as '],
  [/\\in\b/g, ' in '], [/\\forall/g, ' for all '], [/\\ldots|\\dots|\\cdots/g, ' and so on '], [/\\%/g, ' percent '],
  [/\\quad|\\qquad/g, ', '], [/\\[,;:! ]/g, ' '], [/\\left|\\right|\\big|\\Big|\\bigg|\\Bigg/g, ''],
];
function group(s, i) { // s[i] === '{' → [content, indexAfter]
  let d = 0;
  for (let j = i; j < s.length; j++) { if (s[j] === '{') { d++; } else if (s[j] === '}') { d--; if (d === 0) { return [s.slice(i + 1, j), j + 1]; } } }
  return [s.slice(i + 1), s.length];
}
function arg(s, i) { // next argument: {group} or a single token
  while (s[i] === ' ') { i++; }
  if (s[i] === '{') { return group(s, i); }
  if (s[i] === '\\') { const m = /^\\[a-zA-Z]+/.exec(s.slice(i)); if (m) { return [m[0], i + m[0].length]; } }
  return [s[i] || '', i + 1];
}
const POW = { 2: ' squared', 3: ' cubed', '-1': ' to the minus one', T: ' transpose', '\\prime': ' prime', "'": ' prime', '*': ' star', '\\ast': ' star' };
export function texToSpeech(tex) {
  let s = String(tex || '').replace(/\{,\}/g, ',').replace(/\\\\/g, '. ').replace(/&/g, ' ');
  s = s.replace(/\\(?:text|mathrm|textbf|mathbf|mathit|operatorname|textit)\{([^{}]*)\}/g, ' $1 ');
  s = s.replace(/\\begin\{[a-z*]+\}|\\end\{[a-z*]+\}/g, ' ');
  let out = '';
  for (let i = 0; i < s.length;) {
    const rest = s.slice(i);
    let m;
    if ((m = /^\\[dt]?frac/.exec(rest))) {
      const [a, j] = arg(s, i + m[0].length); const [b, k] = arg(s, j);
      out += ` ${texToSpeech(a)}, over ${texToSpeech(b)}, `; i = k; continue;
    }
    if ((m = /^\\sqrt/.exec(rest))) { const [a, j] = arg(s, i + m[0].length); out += ` the square root of ${texToSpeech(a)}, `; i = j; continue; }
    if ((m = /^\\(bar|overline|hat|widehat|tilde|widetilde|dot)/.exec(rest))) {
      const [a, j] = arg(s, i + m[0].length); const w = { bar: 'bar', overline: 'bar', hat: 'hat', widehat: 'hat', tilde: 'tilde', widetilde: 'tilde', dot: 'dot' }[m[1]];
      out += ` ${texToSpeech(a)} ${w} `; i = j; continue;
    }
    if (rest[0] === '^') {
      const [a, j] = arg(s, i + 1); const key = a.trim();
      out += POW[key] != null ? POW[key] + ' ' : ` to the power ${texToSpeech(a)}, `; i = j; continue;
    }
    if (rest[0] === '_') { const [a, j] = arg(s, i + 1); out += ` ${texToSpeech(a)} `; i = j; continue; }
    if ((m = /^\\([a-zA-Z]+)/.exec(rest))) {
      const w = m[1];
      if (GREEK.includes(w)) { out += ` ${w.replace(/^var/, '').toLowerCase()} `; i += m[0].length; continue; }
      let hit = false;
      for (const [re, rep] of WORDS) { re.lastIndex = 0; const mm = re.exec(rest); if (mm && mm.index === 0) { out += rep; i += mm[0].length; hit = true; break; } }
      if (!hit) { i += m[0].length; }
      continue;
    }
    if ((m = /^\\[,;:! %]/.exec(rest))) { out += m[0] === '\\%' ? ' percent ' : ' '; i += 2; continue; }
    const c = rest[0];
    out += { '=': ' equals ', '+': ' plus ', '-': ' minus ', '−': ' minus ', '<': ' is less than ', '>': ' is greater than ', '/': ' over ', '{': ' ', '}': ' ', '[': ' ', ']': ' ', '|': ' ', '%': ' percent ', '!': ' factorial ' }[c] ?? c;
    i += 1;
  }
  return out.replace(/\s+,/g, ',').replace(/,\s*,/g, ',').replace(/\s+/g, ' ').trim();
}
// Prose with inline \( … \) maths and light markdown → speech
export function speakText(s) {
  return String(s || '')
    .replace(/\\\$/g, '$')
    .replace(/\\\((.+?)\\\)/gs, (m, t) => ' ' + texToSpeech(t) + ' ')
    .replace(/\\\[(.+?)\\\]/gs, (m, t) => ' ' + texToSpeech(t) + ' ')
    .replace(/\[([^\]]+)\]\((?:https?:[^)\s]+)\)/g, '$1')
    .replace(/\*\*|`/g, '').replace(/(^|\W)\*(\S.*?)\*(?=\W|$)/g, '$1$2')
    .replace(/A\$\s?([\d.,]*\d)(?:\s?(bn|billion|m|million|k|trillion)\b)?/g, (m, n, u) => `${n} ${u ? { bn: 'billion', m: 'million', k: 'thousand' }[u] || u : ''} Australian dollars`)
    .replace(/US\$\s?([\d.,]*\d)(?:\s?(bn|billion|m|million|k|trillion)\b)?/g, (m, n, u) => `${n} ${u ? { bn: 'billion', m: 'million', k: 'thousand' }[u] || u : ''} US dollars`)
    .replace(/([\d.,]+)\s?₫/g, '$1 dong').replace(/₫\s?([\d.,]+)/g, '$1 dong')
    .replace(/\bp\.a\./g, 'per year').replace(/\be\.g\./g, 'for example').replace(/\bi\.e\./g, 'that is').replace(/\betc\./g, 'and so on')
    .replace(/\s+/g, ' ').trim();
}

export function speechFor(b) {
  const [k, v] = b;
  const T = speakText;
  switch (k) {
    case 'p': return T(v);
    case 'h': case 'h3': return T(v) + '.';
    case 'math': return b[2] ? T(b[2]) : 'In symbols: ' + texToSpeech(v) + '.';
    case 'list': case 'olist': case 'steps': return v.map((x) => T(x).replace(/[.;:]?$/, '.')).join(' ');
    case 'note': return 'A note from me. ' + T(v);
    case 'key': return 'Key idea. ' + T(v);
    case 'warn': return 'A common mistake. ' + T(v);
    case 'defs': return v.map(([t, d]) => `${T(t)}: ${T(d)}`).join('. ') + '.';
    case 'example': return `Worked example: ${T(v.title)}. ${v.setup ? T(v.setup) + ' ' : ''}` + v.steps.map((x, j) => `Step ${j + 1}. ${T(x)}`).join(' ') + ` So, the answer. ${T(v.answer)}`;
    case 'table': {
      const rows = v.rows.length > 8 ? v.rows.slice(0, 4) : v.rows;
      return `Look at the table${v.caption ? ': ' + T(v.caption) : ''}. ` + rows.map((r) => `${T(r[0])}: ` + r.slice(1).map((c, j) => `${T(v.head[j + 1])}, ${T(c)}`).join('; ')).join('. ') + (v.rows.length > 8 ? '. And so on, down the table.' : '.');
    }
    case 'code': return `On screen is some ${v.lang === 'excel' ? 'Excel' : v.lang || 'code'}${v.say ? '. ' + T(v.say) : ''}. Pause the lecture and try it yourself.`;
    case 'lab': return 'Now is a good moment to open the interactive lab linked here and experiment with the numbers.';
    case 'case': return `Case study: ${T(v.title)}. ${T(v.text)}${v.questions && v.questions.length ? ' Questions to think about. ' + v.questions.map((q, j) => `${j + 1}. ${T(q)}`).join(' ') : ''}`;
    default: return '';
  }
}

export function segmentsFor(L, meta) {
  const segs = [{ i: 'intro', text: `Welcome. This is lecture ${meta.n} of ${meta.subject}: ${speakText(L.title)}. ${speakText(L.summary)}` }];
  if (L.objectives && L.objectives.length) { segs.push({ i: 'obj', text: 'By the end of this lecture you will be able to: ' + L.objectives.map((o) => speakText(o)).join('; ') + '.' }); }
  L.body.forEach((b, i) => { const t = speechFor(b); if (t) { segs.push({ i, text: t }); } });
  segs.push({ i: 'exh', text: `That is the end of the lecture. There are ${L.exercises.length} exercises below. Try each one properly before you open the solution. See you in the next lecture.` });
  return segs;
}

// Split long text into sentence-sized chunks (some browsers stop long utterances after about 15 seconds)
function chunks(text) {
  const parts = text.split(/(?<=[.!?;:])\s+(?=[A-Z0-9(“"'])/);
  const out = [];
  parts.forEach((p) => {
    if (p.length <= 240) { out.push(p); return; }
    let cur = '';
    p.split(/(?<=,)\s+/).forEach((w) => { if ((cur + ' ' + w).length > 240 && cur) { out.push(cur); cur = w; } else { cur = cur ? cur + ' ' + w : w; } });
    if (cur) { out.push(cur); }
  });
  return out.filter((x) => x.trim());
}

const VKEY = 'jayv-voice', RKEY = 'jayv-rate';
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* bị chặn */ } } };
export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

function englishVoices() {
  const all = window.speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang) || /english/i.test(v.name));
  const score = (v) => (/en[-_]GB/i.test(v.lang) ? 4 : /en[-_]AU/i.test(v.lang) ? 3 : /en[-_]US/i.test(v.lang) ? 2 : 1) + (/natural|neural|online|google/i.test(v.name) ? 3 : 0) + (v.localService ? 0 : 1);
  return all.sort((a, b) => score(b) - score(a));
}

// root: element containing [data-i] blocks. Returns a controller with start(fromIndex), stop(), destroy().
export function createLecture(root, segs, { onPulse, onDone } = {}) {
  if (!canSpeak()) { return null; }
  const synth = window.speechSynthesis;
  let seg = 0, part = 0, parts = [], playing = false, gen = 0, voice = null, rate = parseFloat(store.get(RKEY)) || 1;
  const bar = document.createElement('div');
  bar.className = 'lecbar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Lecture player');
  bar.innerHTML = `<span class="lec-av" aria-hidden="true">Prof</span>
    <div class="lec-info"><b>Lecture mode</b><span class="lec-now">Ready</span><div class="lec-prog"><i></i></div></div>
    <div class="lec-btns"><button type="button" class="lec-b" data-a="prev" aria-label="Previous part">⏮</button><button type="button" class="lec-b lec-play" data-a="play" aria-label="Play or pause">▶</button><button type="button" class="lec-b" data-a="next" aria-label="Next part">⏭</button></div>
    <label class="lec-sel"><span>Speed</span><select data-a="rate">${[0.8, 0.9, 1, 1.1, 1.25, 1.5].map((r) => `<option value="${r}"${r === rate ? ' selected' : ''}>${r}×</option>`).join('')}</select></label>
    <label class="lec-sel lec-voice"><span>Voice</span><select data-a="voice"></select></label>
    <button type="button" class="lec-b lec-x" data-a="close" aria-label="Close lecture mode">✕</button>`;
  document.body.appendChild(bar);
  const $b = (s) => bar.querySelector(s);
  const vsel = $b('[data-a=voice]');
  const fillVoices = () => {
    const vs = englishVoices();
    if (!vs.length) { vsel.innerHTML = '<option>Default voice</option>'; return; }
    const want = store.get(VKEY);
    voice = vs.find((v) => v.name === want) || voice || vs[0];
    vsel.innerHTML = vs.map((v) => `<option value="${v.name.replace(/"/g, '&quot;')}"${v === voice ? ' selected' : ''}>${v.name.replace(/^(Microsoft|Google)\s*/, '').slice(0, 34)} · ${v.lang}</option>`).join('');
  };
  fillVoices();
  synth.addEventListener('voiceschanged', fillVoices);

  let hot = null;
  const mark = () => {
    const s = segs[seg];
    if (hot) { hot.classList.remove('speaking'); }
    hot = s ? root.querySelector(`[data-i="${s.i}"]`) : null;
    if (hot) {
      hot.classList.add('speaking');
      const r = hot.getBoundingClientRect();
      if (r.top < 90 || r.bottom > window.innerHeight - 110) { hot.scrollIntoView({ block: r.height > window.innerHeight * 0.6 ? 'start' : 'center', behavior: 'smooth' }); }
    }
    $b('.lec-now').textContent = s ? `Part ${seg + 1} of ${segs.length}` + (typeof s.i === 'number' && root.querySelector(`[data-i="${s.i}"]`)?.tagName === 'H2' ? ' · ' + root.querySelector(`[data-i="${s.i}"]`).textContent.slice(0, 60) : '') : 'Finished';
    $b('.lec-prog i').style.width = `${Math.round(100 * seg / Math.max(1, segs.length - 1))}%`;
  };
  const setPlay = (p) => { playing = p; $b('.lec-play').textContent = p ? '⏸' : '▶'; bar.classList.toggle('on', p); };
  const speak = () => {
    const my = ++gen;
    synth.cancel();
    if (seg >= segs.length) { setPlay(false); mark(); if (onDone) { onDone(); } return; }
    if (!parts.length) { parts = chunks(segs[seg].text); part = 0; }
    if (part >= parts.length) { seg += 1; parts = []; mark(); speak(); return; }
    const u = new SpeechSynthesisUtterance(parts[part]);
    u.lang = voice ? voice.lang : 'en-GB';
    if (voice) { u.voice = voice; }
    u.rate = rate; u.pitch = 1;
    u.onboundary = () => { if (my === gen && onPulse) { onPulse(); } };
    u.onend = () => { if (my !== gen || !playing) { return; } part += 1; speak(); };
    u.onerror = (e) => { if (my !== gen || e.error === 'interrupted' || e.error === 'canceled') { return; } part += 1; if (playing) { speak(); } };
    // Chrome sometimes needs a tick after cancel()
    setTimeout(() => { if (my === gen && playing) { synth.speak(u); } }, 60);
  };
  const go = (to) => { seg = Math.max(0, Math.min(segs.length - 1, to)); parts = []; mark(); if (playing) { speak(); } };
  const api = {
    start(from) { if (from != null) { const k = segs.findIndex((s) => String(s.i) === String(from)); seg = k >= 0 ? k : 0; } parts = []; setPlay(true); mark(); speak(); },
    pause() { gen++; synth.cancel(); setPlay(false); },
    toggle() { if (playing) { api.pause(); } else { setPlay(true); speak(); } },
    jump(i) { const k = segs.findIndex((s) => String(s.i) === String(i)); if (k >= 0) { seg = k; parts = []; setPlay(true); mark(); speak(); } },
    get playing() { return playing; },
    destroy() { gen++; synth.cancel(); synth.removeEventListener('voiceschanged', fillVoices); if (hot) { hot.classList.remove('speaking'); } bar.remove(); },
  };
  bar.addEventListener('click', (e) => {
    const a = e.target.closest('button')?.dataset.a;
    if (a === 'play') { api.toggle(); } else if (a === 'prev') { go(seg - 1); } else if (a === 'next') { go(seg + 1); } else if (a === 'close') { api.destroy(); if (onDone) { onDone(true); } }
  });
  $b('[data-a=rate]').addEventListener('change', (e) => { rate = parseFloat(e.target.value) || 1; store.set(RKEY, String(rate)); if (playing) { speak(); } });
  vsel.addEventListener('change', (e) => { voice = englishVoices().find((v) => v.name === e.target.value) || voice; if (voice) { store.set(VKEY, voice.name); } if (playing) { speak(); } });
  return api;
}
