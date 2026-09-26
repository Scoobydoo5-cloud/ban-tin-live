"""Kiểm thử đồng bộ danh sách mã và quỹ từ bản xuất kho dữ liệu trang Claude (không cần mạng)."""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
import sync_from_claude as sc  # noqa: E402


def _write(folder: Path, name: str, doc: dict):
    folder.mkdir(parents=True, exist_ok=True)
    (folder / f"{name}.json").write_text(json.dumps(doc, ensure_ascii=False), encoding="utf-8")


def test_fund_history_entries_and_log_are_copied_and_cleaned(tmp_path):
    _write(tmp_path / "portfolio", "VN", {
        "asOf": "2026-09-26", "nav": 99.77, "cashWeight": 0.75, "inception": "2026-09-24", "lastRebalance": "2026-09-24",
        "benchmark": "VN-Index",
        "holdings": [{"id": "VN-FPT", "weight": 0.25, "entryPrice": 65300, "entryDate": "2026-09-24", "lastPrice": 64700, "return": -0.0092}],
        "waiting": ["GMD"],
        "history": [{"date": "2026-09-24", "nav": 100, "bench": 100}, {"date": "bad", "nav": 1}, {"date": "2026-09-25", "nav": 99.77, "bench": 100.56}],
        "log": [{"date": "2026-09-24", "text": "Mua FPT <script>x</script>"}, {"date": "2026-09-24", "text": ""}],
    })
    _write(tmp_path / "companies", "VN-FPT", {"name": "Tập đoàn FPT", "exchange": "HOSE", "buffett": {"verdict": "bullish", "confidence": 74}})
    res = sc.build(tmp_path, "2026-09-26")
    f = res["funds"]["VN"]
    assert f["inception"] == "2026-09-24" and f["benchmark"] == "VN-Index"
    assert [h["d"] for h in f["history"]] == ["2026-09-24", "2026-09-25"]
    assert f["holdings"][0]["entryPrice"] == 65300 and f["holdings"][0]["entryDate"] == "2026-09-24"
    assert f["log"] == [{"d": "2026-09-24", "text": "Mua FPT scriptx/script"}]
    ids = {x["id"]: x for x in res["items"]}
    assert ids["VN-FPT"]["tags"] == ["fund"] and ids["VN-GMD"]["tags"] == ["waiting"]
