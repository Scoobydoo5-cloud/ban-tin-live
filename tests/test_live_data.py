"""Kiểm thử logic giá: không cần mạng (nguồn được thay bằng dữ liệu giả)."""

import json
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
import live_data as ld  # noqa: E402

VN = ZoneInfo("Asia/Ho_Chi_Minh")
SYD = ZoneInfo("Australia/Sydney")
NY = ZoneInfo("America/New_York")


def utc(y, m, d, hh, mm, tz):
    return datetime(y, m, d, hh, mm, tzinfo=tz).astimezone(timezone.utc)


def daily_series(end: date, n: int, start_px: float, step: float = 1.0):
    out, d, px = [], end, start_px
    while len(out) < n:
        if d.weekday() < 5:
            out.append({"d": d, "c": px, "h": px * 1.01, "l": px * 0.99})
            px -= step
        d -= timedelta(days=1)
    return list(reversed(out))


CFG_VN = {"key": "VN-FPT", "label": "FPT", "market": "VN", "symbol": "FPT", "exchange": "HOSE"}
CFG_US = {"key": "GSPC", "label": "S&P 500", "market": "US", "symbol": "^GSPC", "index": True}


def test_dedupe_keeps_last_row_per_day_sorted():
    d = date(2026, 9, 24)
    bars = [{"d": d, "c": 1}, {"d": d - timedelta(days=1), "c": 2}, {"d": d, "c": 3}]
    out, dup = ld.dedupe_daily(bars)
    assert dup == 1
    assert [b["c"] for b in out] == [2, 3]


def test_market_state_vn_lunch_weekend_and_us_pre():
    assert ld.market_state("VN", utc(2026, 9, 25, 12, 0, VN))["state"] == "lunch"
    assert ld.market_state("VN", utc(2026, 9, 25, 10, 0, VN))["state"] == "open"
    assert ld.market_state("VN", utc(2026, 9, 26, 10, 0, VN))["state"] == "weekend"
    assert ld.market_state("AU", utc(2026, 9, 25, 16, 20, SYD))["state"] == "closed"
    assert ld.market_state("US", utc(2026, 9, 25, 8, 0, NY))["state"] == "pre"


def test_provisional_price_uses_intraday_and_compares_with_previous_close():
    now = utc(2026, 9, 25, 13, 50, VN)
    daily = daily_series(date(2026, 9, 24), 260, 65300, 10)
    intr = [{"t": utc(2026, 9, 25, 13, 30, VN), "c": 64800, "h": 65000, "l": 64700},
            {"t": utc(2026, 9, 25, 13, 45, VN), "c": 64900, "h": 64950, "l": 64850}]
    it = ld.build_item(CFG_VN, daily, intr, now)
    assert it["status"] == "provisional"
    assert it["day"] == "2026-09-25"
    assert it["last"] == 64900
    assert it["prevClose"] == 65300 and it["prevDate"] == "2026-09-24"
    assert round(it["changePct"], 3) == round((64900 / 65300 - 1) * 100, 3)
    assert it["spark"] == [64800, 64900]
    assert len(it["hist"]) == 60 and it["ma200"] is not None


def test_final_session_prefers_official_daily_close():
    now = utc(2026, 9, 25, 16, 0, VN)  # sau 15:05, phiên đã chốt
    daily = daily_series(date(2026, 9, 25), 30, 65000, 10)  # nến ngày 25/09 = 65000
    intr = [{"t": utc(2026, 9, 25, 14, 30, VN), "c": 64900, "h": 65100, "l": 64800}]
    it = ld.build_item(CFG_VN, daily, intr, now)
    assert it["status"] == "final"
    assert it["last"] == 65000


def test_vn_limit_breach_fails_and_previous_value_is_held():
    now = utc(2026, 9, 25, 16, 0, VN)
    daily = daily_series(date(2026, 9, 25), 30, 65000, 10)
    daily[-1]["c"] = daily[-2]["c"] * 1.12  # +12%: vượt biên độ ±7% của HOSE
    it = ld.build_item(CFG_VN, daily, [], now)
    it["checks"] = ld.validate(it, now)
    assert ld.worst(it["checks"]) == "fail"
    prev = {"key": "VN-FPT", "last": 65300, "status": "final"}
    held = ld.hold_previous(it, prev, "vượt biên độ")
    assert held["held"] and held["last"] == 65300 and held["checks"] == it["checks"]


def test_unit_check_catches_thousand_dong_prices():
    now = utc(2026, 9, 25, 16, 0, VN)
    daily = daily_series(date(2026, 9, 25), 30, 65.0, 0.01)  # quên nhân 1.000
    it = ld.build_item(CFG_VN, daily, [], now)
    names = {c["name"]: c["level"] for c in ld.validate(it, now)}
    assert names["Đơn vị"] == "fail"


def test_gap_is_flagged_and_fred_fills_previous_close():
    now = utc(2026, 9, 25, 18, 0, NY)
    daily = [b for b in daily_series(date(2026, 9, 25), 30, 7700, 5) if b["d"] != date(2026, 9, 24)]
    it = ld.build_item(CFG_US, daily, [], now)
    assert it["gapDays"] == ["2026-09-24"]
    ld.apply_fred(it, {"2026-09-23": daily[-2]["c"], "2026-09-24": 7690.0})
    assert it["prevDate"] == "2026-09-24" and it["prevSource"] == "FRED" and it["gapDays"] == []
    assert it["cross"]["level"] == "ok"


def test_fred_mismatch_is_a_warning():
    now = utc(2026, 9, 25, 18, 0, NY)
    it = ld.build_item(CFG_US, daily_series(date(2026, 9, 25), 30, 7700, 5), [], now)
    ld.apply_fred(it, {it["prevDate"]: it["prevClose"] * 1.01})
    assert it["cross"]["level"] == "warn"


def test_stale_session_is_a_warning():
    now = utc(2026, 9, 25, 16, 0, VN)
    it = ld.build_item(CFG_VN, daily_series(date(2026, 9, 23), 30, 65000, 10), [], now)
    levels = {c["name"]: c["level"] for c in ld.validate(it, now)}
    assert levels["Độ mới"] == "warn"


def test_run_holds_previous_and_flags_critical(tmp_path, monkeypatch):
    cfg = {"indices": [], "macro": [], "watchlist": [CFG_VN, dict(CFG_VN, key="VN-MWG", symbol="MWG")]}
    p = tmp_path / "c.json"
    p.write_text(json.dumps(cfg), encoding="utf-8")
    prev = tmp_path / "prev.json"
    prev.write_text(json.dumps({"items": {"VN-FPT": {"key": "VN-FPT", "last": 65300, "status": "final"}}}), encoding="utf-8")

    def boom(*a, **k):
        raise ConnectionError("KBS không phản hồi")

    monkeypatch.setattr(ld, "fetch_vn", boom)
    monkeypatch.setattr(ld._time, "sleep", lambda s: None)
    res = ld.run(p, str(prev), utc(2026, 9, 25, 16, 0, VN))
    assert res["critical"] is True
    assert res["items"]["VN-FPT"]["held"] and res["items"]["VN-FPT"]["last"] == 65300
    assert "VN-MWG" not in res["items"] and res["summary"]["missing"] == 1


def test_snapshot_keeps_only_final_prices(tmp_path):
    res = {"generatedAt": "2026-09-25T08:20:00+00:00", "items": {
        "A": {"status": "final", "day": "2026-09-25", "last": 1.0, "prevClose": 0.9, "changePct": 11.1},
        "B": {"status": "provisional", "day": "2026-09-25", "last": 2.0},
        "C": {"status": "final", "day": "2026-09-25", "last": 3.0, "held": True}}}
    path = ld.snapshot(res, tmp_path)
    data = json.loads(path.read_text(encoding="utf-8"))
    assert list(data) == ["A"] and path.name == "2026-09-25.json"
