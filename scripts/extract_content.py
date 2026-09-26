"""Trích nội dung chữ (bản tin, báo cáo tuần, gợi ý) từ trang "Bản tin và nghiên cứu" để website 3D hiển thị.

Dùng:  python scripts/extract_content.py <file HTML của trang> config/content.json [--date YYYY-MM-DD]

Chỉ lấy chữ thuần (bỏ mọi thẻ HTML), cắt độ dài, không lấy liên kết hay mã. Website hiển thị bằng textContent.
In 'KHÔNG ĐỔI' và không ghi file nếu nội dung giống bản cũ.
"""
from __future__ import annotations

import argparse
import contextlib
import html
import io
import json
import re
import sys
from pathlib import Path


def text(fragment: str, limit: int = 600) -> str:
    s = re.sub(r"<(script|style)\b.*?</\1>", " ", fragment or "", flags=re.S | re.I)
    s = re.sub(r"<br\s*/?>", " ", s, flags=re.I)
    s = re.sub(r"<[^>]+>", " ", s)
    s = html.unescape(s)
    s = re.sub(r"\s+", " ", s).strip()
    return s if len(s) <= limit else s[: limit - 1].rstrip() + "…"


def region(page: str, name: str) -> str:
    m = re.search(rf"<!--\s*{name}:START\s*-->(.*?)<!--\s*{name}:END\s*-->", page, re.S)
    return m.group(1) if m else ""


def section(frag: str, label: str) -> str:
    m = re.search(rf'<section[^>]*aria-label="{re.escape(label)}"[^>]*>(.*?)</section>', frag, re.S)
    return m.group(1) if m else ""


def by_id(frag: str, tag: str, ident: str) -> str:
    m = re.search(rf'<{tag}[^>]*\bid="{re.escape(ident)}"[^>]*>(.*?)</{tag}>', frag, re.S)
    return m.group(1) if m else ""


def cells(row: str) -> list[str]:
    return re.findall(r"<t[dh]\b[^>]*>(.*?)</t[dh]>", row, re.S)


def pill(fragment: str) -> str:
    m = re.search(r'class="pill (ok|miss|wait)"', fragment)
    return m.group(1) if m else ""


def brief(page: str) -> dict:
    latest = region(page, "LATEST")
    m = re.search(r'<span id="last-updated">(.*?)</span>', page, re.S)
    lead = section(latest, "Tóm tắt")
    paras = [text(p, 700) for p in re.findall(r"<p\b[^>]*>(.*?)</p>", lead, re.S)]
    chain = [text(li, 120) for li in re.findall(r"<li\b[^>]*>(.*?)</li>",
                                                 (re.search(r'<ol class="chain"[^>]*>(.*?)</ol>', latest, re.S) or [None, ""])[1], re.S)]
    fc = []
    for row in re.findall(r"<tr>(.*?)</tr>", region(page, "FORECASTS"), re.S)[-12:]:
        c = cells(row)
        if len(c) >= 5:
            fc.append({"made": text(c[0], 12), "text": text(c[1], 260), "prob": text(c[2], 12), "due": text(c[3], 12), "result": pill(c[4]) or "wait"})
    lesson = re.search(r'<section class="lesson"[^>]*>\s*<h2>(.*?)</h2>', latest, re.S)
    return {"updated": text(m.group(1), 80) if m else "", "headline": paras[0] if paras else "",
            "paragraphs": paras[1:4], "chain": chain[:6], "forecasts": fc,
            "lesson": text(lesson.group(1), 160) if lesson else ""}


def report(page: str) -> dict:
    rp = region(page, "REPORT")
    if not rp:
        return {}
    eb = re.search(r'<p class="eyebrow">(.*?)</p>', rp, re.S)
    title = re.search(r"<h1[^>]*data-rp-title[^>]*>(.*?)</h1>", rp, re.S)
    keys = []
    for li in re.findall(r"<li>(.*?)</li>", (re.search(r'<section class="rp-keys"[^>]*>(.*?)</section>', rp, re.S) or [None, ""])[1], re.S):
        b = re.search(r"<b>(.*?)</b>", li, re.S)
        keys.append({"lead": text(b.group(1), 140) if b else "", "text": text(re.sub(r"<b>.*?</b>", "", li, count=1, flags=re.S), 520)})
    scen = []
    for art in re.findall(r"<article[^>]*>(.*?)</article>", by_id(rp, "section", "rp-kich-ban"), re.S):
        h3 = re.search(r"<h3[^>]*>(.*?)</h3>", art, re.S)
        p = re.search(r'class="p[^"]*"[^>]*>(.*?)</span>', art, re.S)
        dds = [text(d, 320) for d in re.findall(r"<dd>(.*?)</dd>", art, re.S)]
        scen.append({"name": text(h3.group(1), 90) if h3 else "", "prob": text(p.group(1), 8) if p else "",
                     "when": dds[0] if dds else "", "then": dds[1] if len(dds) > 1 else "", "wrong": dds[2] if len(dds) > 2 else ""})
    cal = []
    for row in re.findall(r"<tr>(.*?)</tr>", by_id(rp, "section", "rp-lich"), re.S):
        c = cells(row)
        if len(c) >= 4 and "<th" not in row:
            cal.append({"when": text(c[0], 40), "what": text(c[1], 140), "ref": text(c[2], 100), "why": text(c[3], 180)})
    journal = []
    for row in re.findall(r"<tr>(.*?)</tr>", by_id(rp, "section", "rp-so"), re.S):
        c = cells(row)
        if len(c) >= 6 and "<th" not in row:
            journal.append({"made": text(c[0], 12), "text": text(c[1], 240), "prob": text(c[2], 8), "due": text(c[4], 12), "result": pill(c[5]) or "wait"})
    lesson = re.search(r'<section class="lesson"[^>]*>\s*<h2>(.*?)</h2>', rp, re.S)
    return {"issue": text(eb.group(1), 80) if eb else "", "title": text(title.group(1), 160) if title else "",
            "keys": keys[:3], "scenarios": scen[:3], "calendar": cal[:10], "journal": journal[:20],
            "lesson": text(lesson.group(1), 160) if lesson else ""}


def watch(page: str) -> list[dict]:
    out = []
    for row in re.findall(r"<tr>(.*?)</tr>", region(page, "WATCHLIST"), re.S):
        c = cells(row)
        if len(c) < 4:
            continue
        head = text(c[0], 80)
        m = re.match(r"([A-Z0-9.]{1,10})\s*·\s*(VN|AU|US)", head)
        if not m:
            continue
        out.append({"id": f"{m.group(2)}-{m.group(1)}", "growth": text(c[1], 260), "risk": text(c[3], 200)})
    return out[:40]


def build(page: str, today: str) -> dict:
    return {"version": 1, "updatedAt": today, "brief": brief(page), "report": report(page), "watch": watch(page)}


def main(argv=None) -> int:
    with contextlib.suppress(AttributeError):
        sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser()
    ap.add_argument("page")
    ap.add_argument("out")
    ap.add_argument("--date", default="")
    a = ap.parse_args(argv)
    page = io.open(a.page, encoding="utf-8").read()
    new = build(page, a.date)
    if not new["brief"].get("headline") and not new["report"].get("title"):
        print("LỖI: không tìm thấy nội dung bản tin hay báo cáo trong trang")
        return 1
    out = Path(a.out)
    if out.exists():
        try:
            old = json.loads(out.read_text(encoding="utf-8"))
            if {k: v for k, v in old.items() if k != "updatedAt"} == {k: v for k, v in new.items() if k != "updatedAt"}:
                print("KHÔNG ĐỔI")
                return 0
        except ValueError:
            pass
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(new, ensure_ascii=False, indent=1), encoding="utf-8")
    b, r = new["brief"], new["report"]
    print(f"ok: bản tin '{b.get('updated')}', {len(b.get('forecasts', []))} dự báo; báo cáo '{r.get('issue')}', "
          f"{len(r.get('keys', []))} ý chính, {len(r.get('scenarios', []))} kịch bản; {len(new['watch'])} mã gợi ý")
    return 0


if __name__ == "__main__":
    sys.exit(main())
