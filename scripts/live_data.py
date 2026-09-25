"""Lấy giá mới nhất cho trang Bảng giá (Việt Nam, Úc, Mỹ) và tự kiểm tra từng con số.

    python scripts/live_data.py --out site/data/latest.json [--prev URL|file] [--snapshot data/daily]

Nguyên tắc:
- Mỗi con số ghi rõ nguồn, giờ lấy và trạng thái: "tạm tính" (phiên đang chạy) hay "đóng cửa" (phiên đã chốt).
- % thay đổi luôn so với giá đóng cửa của phiên TRƯỚC, không so với số tạm tính.
- Số nào không qua kiểm tra thì không đoán: giữ số của lần cập nhật trước và ghi rõ lý do.
- Nếu quá nửa số liệu lỗi, thoát với mã 2 để quy trình không đăng dữ liệu hỏng.
"""

from __future__ import annotations

import argparse
import contextlib
import io
import json
import logging
import math
import os
import sys
import time as _time
import urllib.request
import warnings
from datetime import date, datetime, time, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

# vnai (đi kèm vnstock) tự ghi file quy tắc AI và gửi số liệu đo lường nếu không tắt.
os.environ.setdefault("VNSTOCK_DISABLE_AGENT_SETUP", "1")
os.environ.setdefault("VNSTOCK_TELEMETRY", "off")

SYD = ZoneInfo("Australia/Sydney")
ROOT = Path(__file__).resolve().parent.parent

# Giờ giao dịch (giờ địa phương của sàn). VN nghỉ trưa 11:30-13:00; phiên ATC kết thúc 14:45.
MARKETS = {
    "VN": {"name": "Việt Nam", "tz": "Asia/Ho_Chi_Minh", "sessions": [(time(9, 0), time(11, 30)), (time(13, 0), time(14, 45))],
           "final": time(15, 5), "currency": "VND", "source": "vnstock (KBS)"},
    "AU": {"name": "Úc", "tz": "Australia/Sydney", "sessions": [(time(10, 0), time(16, 12))],
           "final": time(16, 30), "currency": "AUD", "source": "Yahoo Finance"},
    "US": {"name": "Mỹ", "tz": "America/New_York", "sessions": [(time(9, 30), time(16, 0))],
           "final": time(16, 15), "currency": "USD", "source": "Yahoo Finance"},
}
LIMITS = {"HOSE": 0.07, "HNX": 0.10, "UPCOM": 0.15}  # biên độ dao động giá trong ngày
BAR_MINUTES = 15


def num(v) -> float | None:
    try:
        f = float(v)
    except (TypeError, ValueError):
        return None
    return None if math.isnan(f) or math.isinf(f) else f


@contextlib.contextmanager
def quiet():
    """vnstock/vnai/yfinance in quảng cáo và cảnh báo; nuốt lại. Lỗi thật vẫn ném ra."""
    logging.disable(logging.WARNING)
    try:
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
                yield
    finally:
        logging.disable(logging.NOTSET)


def retry(fn, tries: int = 3, wait: float = 2.0):
    last = None
    for i in range(tries):
        try:
            return fn()
        except Exception as exc:  # nguồn miễn phí hay lỗi mạng thoáng qua
            last = exc
            _time.sleep(wait * (i + 1))
    raise last


# ---------------------------------------------------------------------------
# Lịch phiên
# ---------------------------------------------------------------------------

def market_state(mkt: str, now_utc: datetime) -> dict:
    """Trạng thái sàn lúc now_utc: open / lunch / pre / closed / weekend (không tính ngày lễ)."""
    m = MARKETS[mkt]
    local = now_utc.astimezone(ZoneInfo(m["tz"]))
    t = local.time()
    out = {"market": mkt, "name": m["name"], "localTime": local.strftime("%H:%M"), "tz": m["tz"]}
    if local.weekday() >= 5:
        return {**out, "state": "weekend"}
    first, last = m["sessions"][0][0], m["sessions"][-1][1]
    if t < first:
        return {**out, "state": "pre"}
    for a, b in m["sessions"]:
        if a <= t < b:
            return {**out, "state": "open"}
    if t < last:
        return {**out, "state": "lunch"}
    return {**out, "state": "closed"}


def is_final(mkt: str, day: date, now_utc: datetime) -> bool:
    m = MARKETS[mkt]
    return now_utc >= datetime.combine(day, m["final"], tzinfo=ZoneInfo(m["tz"])).astimezone(timezone.utc)


def expected_session(mkt: str, now_utc: datetime) -> date:
    """Phiên gần nhất lẽ ra phải có dữ liệu (ngày thường; không biết ngày lễ)."""
    m = MARKETS[mkt]
    local = now_utc.astimezone(ZoneInfo(m["tz"]))
    d = local.date()
    if local.time() < m["sessions"][0][0]:
        d -= timedelta(days=1)
    while d.weekday() >= 5:
        d -= timedelta(days=1)
    return d


# ---------------------------------------------------------------------------
# Nguồn dữ liệu
# ---------------------------------------------------------------------------

def dedupe_daily(bars: list[dict]) -> tuple[list[dict], int]:
    """Sắp theo ngày, mỗi ngày giữ dòng cuối (KBS có lúc trả hai dòng cùng ngày)."""
    by_day: dict[date, dict] = {}
    for b in bars:
        by_day[b["d"]] = b
    out = [by_day[d] for d in sorted(by_day)]
    return out, len(bars) - len(out)


def fetch_vn(symbol: str, is_index: bool) -> tuple[list[dict], list[dict]]:
    """(nến ngày, nến 15 phút) từ vnstock KBS. Cổ phiếu tính bằng nghìn đồng, chỉ số bằng điểm."""
    k = 1.0 if is_index else 1000.0
    tz = ZoneInfo(MARKETS["VN"]["tz"])
    today = datetime.now(tz).date()
    with quiet():
        from vnstock import Quote
        q = Quote(source="KBS", symbol=symbol)
        d = q.history(start=(today - timedelta(days=400)).isoformat(), end=(today + timedelta(days=1)).isoformat(), interval="1D")
        m = q.history(start=(today - timedelta(days=6)).isoformat(), end=(today + timedelta(days=1)).isoformat(), interval="15m")
    daily = [{"d": date.fromisoformat(str(t)[:10]), "c": num(c) * k, "h": (num(h) or num(c)) * k, "l": (num(lo) or num(c)) * k}
             for t, c, h, lo in zip(d["time"], d["close"], d["high"], d["low"]) if num(c)]
    intr = []
    for t, c, h, lo in zip(m["time"], m["close"], m["high"], m["low"]):
        if not num(c):
            continue
        ts = datetime.fromisoformat(str(t)[:19])
        ts = (ts if ts.tzinfo else ts.replace(tzinfo=tz)).astimezone(timezone.utc)
        intr.append({"t": ts, "c": num(c) * k, "h": (num(h) or num(c)) * k, "l": (num(lo) or num(c)) * k})
    return daily, intr


def fetch_yahoo(symbol: str) -> tuple[list[dict], list[dict]]:
    import yfinance as yf
    with quiet():
        t = yf.Ticker(symbol)
        d = t.history(period="1y", interval="1d", auto_adjust=False)
        m = t.history(period="1d", interval="15m", auto_adjust=False)
    daily = [{"d": ix.date(), "c": num(c), "h": num(h) or num(c), "l": num(lo) or num(c)}
             for ix, c, h, lo in zip(d.index, d["Close"], d["High"], d["Low"]) if num(c)]
    intr = [{"t": ix.to_pydatetime().astimezone(timezone.utc), "c": num(c), "h": num(h) or num(c), "l": num(lo) or num(c)}
            for ix, c, h, lo in zip(m.index, m["Close"], m["High"], m["Low"]) if num(c)]
    return daily, intr


def fetch_fred(series: str, days: int = 20) -> dict[str, float]:
    start = (date.today() - timedelta(days=days)).isoformat()
    url = f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series}&cosd={start}"
    req = urllib.request.Request(url, headers={"User-Agent": "ban-tin-live/1.0"})  # FRED chặn UA giả trình duyệt
    with urllib.request.urlopen(req, timeout=20) as resp:
        text = resp.read().decode("utf-8")
    out = {}
    for line in text.splitlines()[1:]:
        d, _, v = line.partition(",")
        if num(v) is not None:
            out[d] = float(v)
    return out


# ---------------------------------------------------------------------------
# Dựng một mục giá và kiểm tra
# ---------------------------------------------------------------------------

def _local_date(ts: datetime, mkt: str) -> date:
    tz = MARKETS[mkt]["tz"] if mkt in MARKETS else "Europe/London"
    return ts.astimezone(ZoneInfo(tz)).date()


def _pct(a, b):
    return None if a is None or not b else a / b - 1


def build_item(cfg: dict, daily: list[dict], intr: list[dict], now_utc: datetime, dup: int = 0) -> dict:
    mkt = cfg["market"]
    exch = mkt in MARKETS
    if not daily and not intr:
        raise ValueError("nguồn không trả dữ liệu")
    last_daily = daily[-1] if daily else None
    intr_day = _local_date(intr[-1]["t"], mkt) if intr else None
    use_intr = intr and (last_daily is None or intr_day >= last_daily["d"])
    day = intr_day if use_intr else last_daily["d"]
    daily_today = next((b for b in reversed(daily) if b["d"] == day), None)
    final = exch and is_final(mkt, day, now_utc)

    if final and daily_today:  # phiên đã chốt: dùng giá đóng cửa chính thức của nến ngày
        last, last_ts = daily_today["c"], None
    elif use_intr:
        last = intr[-1]["c"]
        last_ts = min(intr[-1]["t"] + timedelta(minutes=BAR_MINUTES), now_utc)
    else:
        last, last_ts = last_daily["c"], None

    same_day = [b for b in intr if _local_date(b["t"], mkt) == day]
    highs = [b["h"] for b in same_day] + ([daily_today["h"]] if daily_today else [])
    lows = [b["l"] for b in same_day] + ([daily_today["l"]] if daily_today else [])
    day_hi = max(highs + [last]) if highs else last
    day_lo = min(lows + [last]) if lows else last

    before = [b for b in daily if b["d"] < day]
    prev = before[-1] if before else None
    closes = [b["c"] for b in before] + [last]

    def back(n):
        return closes[-1 - n] if len(closes) > n else None

    ytd_base = next((b["c"] for b in reversed(before) if b["d"].year < day.year), None)
    ma = lambda n: sum(closes[-n - 1:-1]) / n if len(closes) > n else None  # noqa: E731  trung bình các phiên trước
    hist = closes[-253:]
    item = {
        "key": cfg["key"], "label": cfg["label"], "name": cfg.get("name"), "market": mkt,
        "symbol": cfg["symbol"], "index": bool(cfg.get("index")), "exchange": cfg.get("exchange"),
        "currency": MARKETS[mkt]["currency"] if exch and not cfg.get("index") else None,
        "unit": cfg.get("unit"), "dp": cfg.get("dp"), "note": cfg.get("note"),
        "source": MARKETS[mkt]["source"] if exch else "Yahoo Finance",
        "status": "24h" if not exch else ("final" if final else "provisional"),
        "day": day.isoformat(), "last": round(last, 6),
        "lastTime": last_ts.isoformat(timespec="minutes") if last_ts else None,
        "prevClose": round(prev["c"], 6) if prev else None, "prevDate": prev["d"].isoformat() if prev else None,
        "change": round(last - prev["c"], 6) if prev else None,
        "changePct": round(_pct(last, prev["c"]) * 100, 3) if prev else None,
        "dayHigh": round(day_hi, 6), "dayLow": round(day_lo, 6),
        "hi52": round(max(hist), 6), "lo52": round(min(hist), 6),
        "ma50": round(ma(50), 6) if ma(50) else None, "ma200": round(ma(200), 6) if ma(200) else None,
        "chg1m": _r100(_pct(last, back(21))), "chg3m": _r100(_pct(last, back(63))), "chgYtd": _r100(_pct(last, ytd_base)),
        "spark": [round(b["c"], 6) for b in same_day][-40:],
        "hist": [round(c, 6) for c in closes[-60:]],
        "dupRemoved": dup,
    }
    item["gapDays"] = _gap_days(prev["d"], day) if (prev and exch) else []
    return item


def _r100(x):
    return None if x is None else round(x * 100, 2)


def _gap_days(d0: date, d1: date) -> list[str]:
    return [(d0 + timedelta(days=i)).isoformat() for i in range(1, (d1 - d0).days) if (d0 + timedelta(days=i)).weekday() < 5]


def apply_fred(item: dict, fred: dict[str, float]) -> None:
    """Đối chiếu giá đóng cửa phiên trước với FRED; lấp phiên Yahoo bị thiếu bằng số FRED."""
    if item.get("gapDays"):
        earlier = sorted(d for d in fred if d < item["day"])
        if earlier and (item["prevDate"] is None or earlier[-1] > item["prevDate"]):
            d0 = earlier[-1]
            item.update(prevClose=fred[d0], prevDate=d0, prevSource="FRED",
                        change=round(item["last"] - fred[d0], 6), changePct=round((item["last"] / fred[d0] - 1) * 100, 3))
            item["gapDays"] = _gap_days(date.fromisoformat(d0), date.fromisoformat(item["day"]))
    ref = fred.get(item["prevDate"] or "")
    if ref is None:
        item["cross"] = {"level": "na", "note": "FRED chưa có phiên để đối chiếu (FRED thường trễ một ngày)"}
    else:
        diff = abs(item["prevClose"] / ref - 1)
        item["cross"] = {"level": "ok" if diff < 0.001 else "warn",
                         "note": f"Giá đóng cửa {item['prevDate']} khớp FRED" if diff < 0.001
                         else f"Giá đóng cửa {item['prevDate']} lệch FRED {diff:.2%} (FRED: {ref:,.2f})"}


def validate(item: dict, now_utc: datetime) -> list[dict]:
    """Các phép kiểm tra cho một mục. level: ok / warn / fail."""
    checks = []
    mkt = item["market"]
    exch = mkt in MARKETS

    def add(name, level, note):
        checks.append({"name": name, "level": level, "note": note})

    last = item["last"]
    add("Giá hợp lệ", "ok" if last and last > 0 else "fail", "Giá dương" if last and last > 0 else "Giá không hợp lệ")
    if exch and not item["index"] and mkt == "VN" and last < 1000:
        add("Đơn vị", "fail", "Giá cổ phiếu VN dưới 1.000 đ: có thể quên nhân 1.000 (KBS tính bằng nghìn đồng)")

    chg = item["changePct"]
    if chg is not None:
        a = abs(chg) / 100
        if mkt == "VN":
            lim = 0.07 if item["index"] else LIMITS.get((item.get("exchange") or "HOSE").upper(), 0.07)
            ok = a <= lim + 0.0015  # làm tròn bước giá
            add("Biên độ", "ok" if ok else "fail",
                f"{chg:+.2f}% trong biên độ ±{lim:.0%}" if ok else f"{chg:+.2f}% vượt biên độ ±{lim:.0%}: dữ liệu sai hoặc giá chưa điều chỉnh quyền")
        else:
            lim = 0.10 if mkt == "24H" else 0.25
            add("Biên độ", "ok" if a <= lim else "warn", f"{chg:+.2f}%" + ("" if a <= lim else ": biến động bất thường, cần xác minh"))
    else:
        add("Phiên trước", "warn", "Không có giá đóng cửa phiên trước để tính % thay đổi")

    if item.get("gapDays"):
        add("Phiên thiếu", "warn", "Nguồn không có phiên " + ", ".join(item["gapDays"]) + " (nghỉ lễ hoặc nguồn thiếu phiên); % thay đổi có thể sai")

    lo, hi = item["dayLow"], item["dayHigh"]
    in_range = lo * 0.995 <= last <= hi * 1.005
    add("Trong biên ngày", "ok" if in_range else "warn", "Giá nằm trong khoảng thấp nhất–cao nhất ngày" if in_range else "Giá ngoài khoảng cao/thấp của ngày")

    if exch:
        st = market_state(mkt, now_utc)["state"]
        exp = expected_session(mkt, now_utc)
        if item["day"] < exp.isoformat():
            add("Độ mới", "warn", f"Chưa có dữ liệu phiên {exp.strftime('%d/%m')}: nghỉ lễ hoặc nguồn chưa cập nhật")
        elif st == "open" and item["lastTime"]:
            age = (now_utc - datetime.fromisoformat(item["lastTime"])).total_seconds() / 60
            add("Độ mới", "ok" if age <= 50 else "warn", f"Giá cách đây {age:.0f} phút" + ("" if age <= 50 else ": nguồn đang chậm"))
        else:
            add("Độ mới", "ok", "Có dữ liệu của phiên gần nhất")
    else:
        age_days = (now_utc.date() - date.fromisoformat(item["day"])).days
        add("Độ mới", "ok" if age_days <= 4 else "warn", f"Dữ liệu ngày {item['day']}")

    if item.get("dupRemoved"):
        add("Trùng ngày", "ok", f"Đã bỏ {item['dupRemoved']} dòng trùng ngày của nguồn")
    if item.get("cross"):
        c = item["cross"]
        add("Đối chiếu nguồn thứ hai", c["level"], c["note"])
    return checks


def worst(checks: list[dict]) -> str:
    levels = [c["level"] for c in checks]
    return "fail" if "fail" in levels else ("warn" if "warn" in levels else "ok")


def hold_previous(new: dict | None, prev: dict | None, reason: str) -> dict | None:
    """Giữ số của lần cập nhật trước khi số mới không qua kiểm tra."""
    if not prev:
        return None
    held = dict(prev)
    held["held"] = True
    held["heldReason"] = reason
    if new and new.get("checks"):
        held["checks"] = new["checks"]
    return held


# ---------------------------------------------------------------------------
# Chạy
# ---------------------------------------------------------------------------

def load_prev(src: str | None) -> dict:
    if not src:
        return {}
    try:
        if src.startswith("http"):
            req = urllib.request.Request(src + f"?t={int(_time.time())}", headers={"User-Agent": "ban-tin-live/1.0"})
            with urllib.request.urlopen(req, timeout=20) as r:
                return json.loads(r.read().decode("utf-8"))
        p = Path(src)
        return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}
    except Exception:
        return {}


def run(cfg_path: Path, prev_src: str | None, now_utc: datetime | None = None) -> dict:
    now = now_utc or datetime.now(timezone.utc)
    cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
    prev = load_prev(prev_src)
    prev_items = prev.get("items", {})
    items, errors = {}, {}
    groups = {"indices": [], "macro": [], "watchlist": []}
    for group in groups:
        for c in cfg.get(group, []):
            key = c["key"]
            groups[group].append(key)
            try:
                if c["market"] == "VN":
                    daily, intr = retry(lambda c=c: fetch_vn(c["symbol"], bool(c.get("index"))))
                else:
                    daily, intr = retry(lambda c=c: fetch_yahoo(c["symbol"]))
                daily, dup = dedupe_daily(daily)
                it = build_item(c, daily, intr, now, dup)
                if c.get("fred"):
                    try:
                        apply_fred(it, retry(lambda c=c: fetch_fred(c["fred"]), tries=2))
                    except Exception as exc:
                        it["cross"] = {"level": "na", "note": f"Không đọc được FRED ({type(exc).__name__})"}
                it["checks"] = validate(it, now)
                it["level"] = worst(it["checks"])
                if it["level"] == "fail":
                    held = hold_previous(it, prev_items.get(key), "Số mới không qua kiểm tra: " +
                                         "; ".join(x["note"] for x in it["checks"] if x["level"] == "fail"))
                    it = held or it
                items[key] = it
            except Exception as exc:
                msg = f"{type(exc).__name__}: {str(exc)[:160]}"
                errors[key] = msg
                held = hold_previous(None, prev_items.get(key), f"Không lấy được số mới ({msg})")
                if held:
                    held["checks"] = [{"name": "Nguồn", "level": "fail", "note": msg}]
                    held["level"] = "fail"
                    items[key] = held

    fresh = [k for k, v in items.items() if not v.get("held")]
    total = sum(len(v) for v in groups.values())
    summary = {
        "total": total, "fresh": len(fresh),
        "ok": sum(1 for v in items.values() if v.get("level") == "ok" and not v.get("held")),
        "warn": sum(1 for v in items.values() if v.get("level") == "warn" and not v.get("held")),
        "held": sum(1 for v in items.values() if v.get("held")),
        "missing": total - len(items),
    }
    return {
        "generatedAt": now.isoformat(timespec="seconds"),
        "generatedAtSydney": now.astimezone(SYD).strftime("%d/%m/%Y %H:%M"),
        "markets": {m: market_state(m, now) for m in MARKETS},
        "groups": groups, "items": items, "errors": errors, "summary": summary,
        "critical": len(fresh) < total / 2,
    }


def snapshot(result: dict, folder: Path) -> Path:
    """Lưu giá đóng cửa đã chốt vào data/daily/<ngày Sydney>.json (gộp với file cùng ngày).
    Chỉ lấy phiên đã chốt của các sàn (không lấy tỷ giá/hàng hóa 24 giờ) để file chỉ đổi vài lần mỗi ngày."""
    folder.mkdir(parents=True, exist_ok=True)
    day = datetime.fromisoformat(result["generatedAt"]).astimezone(SYD).date().isoformat()
    path = folder / f"{day}.json"
    data = json.loads(path.read_text(encoding="utf-8")) if path.exists() else {}
    for k, v in result["items"].items():
        if v.get("status") == "final" and not v.get("held"):
            data[k] = {"date": v["day"], "close": v["last"], "prevClose": v.get("prevClose"), "changePct": v.get("changePct")}
    path.write_text(json.dumps(dict(sorted(data.items())), ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    return path


def main(argv=None) -> int:
    with contextlib.suppress(AttributeError):
        sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default=str(ROOT / "config" / "instruments.json"))
    ap.add_argument("--out", required=True)
    ap.add_argument("--prev", help="latest.json của lần trước (URL hoặc file) để giữ số khi nguồn lỗi")
    ap.add_argument("--snapshot", help="thư mục lưu giá đóng cửa theo ngày")
    a = ap.parse_args(argv)
    res = run(Path(a.config), a.prev)
    out = Path(a.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(res, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    s = res["summary"]
    print(f"{s['fresh']}/{s['total']} mục mới · {s['ok']} đạt · {s['warn']} cảnh báo · {s['held']} giữ số cũ · {s['missing']} thiếu")
    for k, v in res["errors"].items():
        print(f"  lỗi {k}: {v}")
    for k, v in res["items"].items():
        for c in v.get("checks", []):
            if c["level"] != "ok":
                print(f"  {c['level']:4} {k}: {c['name']} - {c['note']}")
    if a.snapshot:
        print("snapshot:", snapshot(res, Path(a.snapshot)))
    return 2 if res["critical"] else 0


if __name__ == "__main__":
    sys.exit(main())
