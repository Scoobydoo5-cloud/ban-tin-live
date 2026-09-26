"""Kiểm thử trích nội dung trang (không cần mạng)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
import extract_content as ec  # noqa: E402

PAGE = """
<span id="last-updated">Thứ Bảy 26/09/2026</span>
<!-- LATEST:START -->
<section class="lead" aria-label="Tóm tắt"><p><strong>VN-Index &amp; bạn</strong> tăng</p><p>Đoạn 2 <a href="x">link</a></p></section>
<ol class="chain" aria-label="Chuỗi"><li>A</li><li>B</li></ol>
<section class="lesson" aria-label="Bài học"><h2>Bài học: X</h2><p>..</p></section>
<!-- LATEST:END -->
<table><tbody>
<!-- FORECASTS:START -->
<tr><td class="num">24/09</td><td>RBA tăng</td><td class="r num">75%</td><td class="num">29/09</td><td><span class="pill ok">Đúng</span></td></tr>
<!-- FORECASTS:END -->
</tbody></table>
<!-- REPORT:START -->
<p class="eyebrow">Báo cáo tuần · số 2 · 28/09–02/10/2026</p><h1 data-rp-title>Tiêu đề</h1>
<section class="rp-keys" aria-label="Ba ý chính"><ol><li><div><b>Ý một.</b> giải thích <script>alert(1)</script></div></li></ol></section>
<section id="rp-lich"><table><thead><tr><th>T</th><th>S</th><th>M</th><th>V</th></tr></thead><tbody><tr><td>T3</td><td>RBA</td><td>4,35%</td><td>vì</td></tr></tbody></table></section>
<section id="rp-kich-ban"><div class="rp-scen"><article class="box base"><div class="hd"><h3>Cơ sở</h3><span class="p num">55%</span></div><dl><dt>a</dt><dd>đk</dd><dt>b</dt><dd>kq</dd><dt>c</dt><dd>sai</dd></dl></article></div></section>
<section id="rp-so"><table><thead><tr><th>Lập</th><th>K</th><th>T</th><th>C</th><th>H</th><th>R</th></tr></thead><tbody><tr><td>26/09</td><td>RBA</td><td>85%</td><td>RBA</td><td>29/09</td><td><span class="pill miss">Sai</span></td></tr></tbody></table></section>
<!-- REPORT:END -->
<!-- WATCHLIST:START -->
<tr><td><strong>FPT</strong> · VN</td><td>+12%</td><td>P/E</td><td>AI</td></tr>
<!-- WATCHLIST:END -->
"""


def test_extract_plain_text_only():
    d = ec.build(PAGE, "2026-10-03")
    b, r = d["brief"], d["report"]
    assert b["headline"] == "VN-Index & bạn tăng" and b["paragraphs"] == ["Đoạn 2 link"]
    assert b["chain"] == ["A", "B"] and b["lesson"] == "Bài học: X"
    assert b["forecasts"][0] == {"made": "24/09", "text": "RBA tăng", "prob": "75%", "due": "29/09", "result": "ok"}
    assert r["issue"].endswith("28/09–02/10/2026") and r["title"] == "Tiêu đề"
    assert r["keys"][0] == {"lead": "Ý một.", "text": "giải thích"}
    assert r["calendar"] == [{"when": "T3", "what": "RBA", "ref": "4,35%", "why": "vì"}]
    assert r["scenarios"][0] == {"name": "Cơ sở", "prob": "55%", "when": "đk", "then": "kq", "wrong": "sai"}
    assert r["journal"] == [{"made": "26/09", "text": "RBA", "prob": "85%", "due": "29/09", "result": "miss"}]
    assert d["watch"] == [{"id": "VN-FPT", "growth": "+12%", "risk": "AI"}]


def test_unchanged_prints_and_skips(tmp_path, capsys):
    page = tmp_path / "p.html"
    page.write_text(PAGE, encoding="utf-8")
    out = tmp_path / "c.json"
    assert ec.main([str(page), str(out), "--date", "2026-10-03"]) == 0
    assert ec.main([str(page), str(out), "--date", "2026-10-04"]) == 0
    assert "KHÔNG ĐỔI" in capsys.readouterr().out
