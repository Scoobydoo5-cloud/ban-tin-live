"""Tạo config/from_claude.json từ bản xuất kho dữ liệu của trang Claude (routine chạy mỗi sáng).

    python scripts/sync_from_claude.py <thư mục xuất> <file ra> [--date YYYY-MM-DD]

<thư mục xuất> có dạng do công cụ ArtifactData (out_dir) tạo ra:
    portfolio/VN.json, watchlist/AU-SHL.json, suggestions/VN-HPG.json, companies/US-NVDA.json ...

Chỉ chép những trường cần cho Bảng giá (mã, sàn, tên ngắn, tỷ trọng quỹ, nhận định Buffett),
kiểm tra định dạng từng trường; không chép ghi chú, lý do hay nội dung nghiên cứu.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ID_RE = re.compile(r"^(VN|AU|US)-[A-Z0-9.]{1,10}$")
VERDICTS = {"bullish", "neutral", "bearish"}
VN_EXCHANGES = {"HOSE", "HNX", "UPCOM"}
MAX_ITEMS = 40


def _load_dir(folder: Path) -> dict[str, dict]:
    out = {}
    if folder.is_dir():
        for f in sorted(folder.glob("*.json")):
            try:
                d = json.loads(f.read_text(encoding="utf-8"))
            except (OSError, ValueError):
                continue
            if isinstance(d, dict):
                out[f.stem] = d.get("data", d) if isinstance(d.get("data"), dict) else d
    return out


def _clean_text(s, n=60) -> str | None:
    if not isinstance(s, str):
        return None
    s = re.sub(r"[\x00-\x1f\x7f<>]", "", s).strip()
    return s[:n] or None


def _num(v, lo, hi):
    try:
        f = float(v)
    except (TypeError, ValueError):
        return None
    return f if lo <= f <= hi else None


def build(export: Path, today: str) -> dict:
    portfolios = _load_dir(export / "portfolio")
    watch = _load_dir(export / "watchlist")
    sugg = _load_dir(export / "suggestions")
    companies = _load_dir(export / "companies")

    items: dict[str, dict] = {}

    def item(doc_id: str) -> dict | None:
        doc_id = str(doc_id).upper()
        if not ID_RE.match(doc_id):
            return None
        if doc_id not in items:
            mkt, _, ticker = doc_id.partition("-")
            c = companies.get(doc_id, {})
            b = c.get("buffett") if isinstance(c.get("buffett"), dict) else {}
            exch = str(c.get("exchange") or "").upper()
            items[doc_id] = {
                "id": doc_id, "market": mkt, "ticker": ticker,
                "name": _clean_text(c.get("name")),
                "exchange": exch if (mkt == "VN" and exch in VN_EXCHANGES) else None,
                "tags": [], "weight": None,
                "verdict": b.get("verdict") if b.get("verdict") in VERDICTS else None,
                "confidence": int(_num(b.get("confidence"), 0, 100)) if _num(b.get("confidence"), 0, 100) is not None else None,
                "verdictAsOf": _clean_text(b.get("asOf"), 10),
            }
        return items[doc_id]

    funds = {}
    for mkt, p in sorted(portfolios.items()):
        if mkt not in ("VN", "AU", "US"):
            continue
        holdings = []
        for h in p.get("holdings") or []:
            it = item(h.get("id") or f"{mkt}-{h.get('ticker', '')}")
            w = _num(h.get("weight", h.get("targetWeight")), 0, 1)
            if it and w is not None:
                it["weight"] = round(w, 4)
                if "fund" not in it["tags"]:
                    it["tags"].append("fund")
                holdings.append({"id": it["id"], "weight": round(w, 4)})
        waiting = []
        for t in p.get("waiting") or []:
            it = item(f"{mkt}-{t}")
            if it:
                if "waiting" not in it["tags"]:
                    it["tags"].append("waiting")
                waiting.append(it["id"])
        funds[mkt] = {"asOf": _clean_text(p.get("asOf"), 10), "nav": _num(p.get("nav"), 0, 10000),
                      "cashWeight": _num(p.get("cashWeight"), 0, 1), "holdings": holdings, "waiting": waiting}
    for doc_id, w in sorted(watch.items()):
        if w.get("status") in ("active", "pending"):
            it = item(doc_id)
            if it and "watch" not in it["tags"]:
                it["tags"].append("watch")
    for doc_id, s in sorted(sugg.items()):
        if s.get("status") == "active":
            it = item(doc_id)
            if it and "suggest" not in it["tags"]:
                it["tags"].append("suggest")

    order = {"fund": 0, "waiting": 1, "watch": 2, "suggest": 3}
    ranked = sorted(items.values(), key=lambda x: (min((order[t] for t in x["tags"]), default=9), x["market"], x["ticker"]))
    return {
        "version": 1, "updatedAt": today,
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "source": "routine Đồng bộ Bảng giá (kho dữ liệu trang Claude)",
        "funds": funds, "items": [x for x in ranked if x["tags"]][:MAX_ITEMS],
    }


def main(argv=None) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser()
    ap.add_argument("export")
    ap.add_argument("out")
    ap.add_argument("--date", default=datetime.now(timezone.utc).date().isoformat())
    a = ap.parse_args(argv)
    res = build(Path(a.export), a.date)
    if not res["items"]:
        print("không có mã nào để đồng bộ (bản xuất trống?)", file=sys.stderr)
        return 1
    text = json.dumps(res, ensure_ascii=False, indent=1) + "\n"
    if len(text.encode("utf-8")) > 50_000:
        print("file quá lớn, dừng", file=sys.stderr)
        return 1
    out = Path(a.out)
    try:
        old = json.loads(out.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        old = {}
    if {k: old.get(k) for k in ("items", "funds")} == {k: res.get(k) for k in ("items", "funds")}:
        print("KHÔNG ĐỔI: danh sách giống bản đang có, không ghi file")
        return 0
    out.write_text(text, encoding="utf-8")
    print(f"{len(res['items'])} mã; quỹ: " + ", ".join(f"{m} {len(f['holdings'])} mã" for m, f in res["funds"].items()))
    return 0


if __name__ == "__main__":
    sys.exit(main())
