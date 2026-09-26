"""Kiểm tra tĩnh cho website JayV Finance: đường dẫn, module, danh mục Học viện, nguồn tham khảo."""
import re
from pathlib import Path

SITE = Path(__file__).resolve().parents[1] / "site"
PAGES = ["index.html", "thi-truong/index.html", "ban-tin/index.html", "bao-cao/index.html",
         "co-phieu/index.html", "quy/index.html", "hoc-vien/index.html", "bang-gia/index.html"]


def _js_files():
    return [p for p in (SITE / "assets").rglob("*.js")]


def test_pages_exist_and_local_refs_resolve():
    for rel in PAGES:
        page = SITE / rel
        assert page.exists(), rel
        html = page.read_text(encoding="utf-8")
        for ref in re.findall(r'(?:src|href)="([^"#:]+)"', html):
            if ref.startswith(("http", "mailto", "//")) or ref.endswith("/") or ref == "./":
                continue
            target = (page.parent / ref.split("?")[0]).resolve()
            assert target.exists(), f"{rel}: thiếu {ref}"
        m = re.search(r'"three":\s*"([^"]+)"', html)
        if m:
            assert (page.parent / m.group(1)).resolve().exists(), f"{rel}: import map sai"


def test_js_relative_imports_resolve():
    for js in _js_files():
        src = js.read_text(encoding="utf-8")
        for ref in re.findall(r"""(?:from|import)\s*\(?\s*['"](\.{1,2}/[^'"]+)['"]""", src):
            assert (js.parent / ref).resolve().exists(), f"{js.relative_to(SITE)}: thiếu {ref}"


def test_every_page_has_disclaimer_via_shell():
    shell = (SITE / "assets/core/shell.js").read_text(encoding="utf-8")
    assert "không phải tổ chức tài chính được cấp phép" in shell
    assert "Tạo bởi Claude" not in shell
    for rel in PAGES[:-1]:
        html = (SITE / rel).read_text(encoding="utf-8")
        mod = re.search(r'<script type="module" src="([^"]+)"', html).group(1)
        code = ((SITE / rel).parent / mod).resolve().read_text(encoding="utf-8")
        assert "initShell(" in code, rel


def test_academy_catalog_matches_meta_and_references():
    tracks_dir = SITE / "assets/academy/tracks"
    lessons, labs_used, res_used = 0, set(), set()
    for f in tracks_dir.glob("*.js"):
        src = f.read_text(encoding="utf-8")
        lessons += len(re.findall(r"\bmins:\s*\d+", src))
        labs_used |= set(re.findall(r"\['lab',\s*'([a-z]+)'\]", src))
        for group in re.findall(r"resources:\s*\[([^\]]*)\]", src):
            res_used |= set(re.findall(r"'([^']+)'", group))
    meta = (SITE / "assets/academy/meta.js").read_text(encoding="utf-8")
    assert f"lessons: {lessons}" in meta
    assert len(list(tracks_dir.glob("*.js"))) == int(re.search(r"tracks:\s*(\d+)", meta).group(1))
    catalog = (SITE / "assets/academy/catalog.js").read_text(encoding="utf-8")
    lab_ids = set(re.findall(r"\{ id: '([a-z]+)', title: '[^']+', blurb: '[^']*', track:", catalog))
    assert len(lab_ids) == int(re.search(r"labs:\s*(\d+)", meta).group(1))
    assert labs_used <= lab_ids, labs_used - lab_ids
    labs_js = (SITE / "assets/academy/labs.js").read_text(encoding="utf-8")
    for lab in lab_ids:
        assert f"LAB.{lab} = " in labs_js, lab
    resources = (SITE / "assets/academy/resources.js").read_text(encoding="utf-8")
    keys = set(re.findall(r"^\s{2}([A-Z0-9_]+):", resources, flags=re.M))
    for r in res_used:
        k = r[5:] if r.startswith("book:") else r
        assert k in keys, f"nguồn không tồn tại: {r}"


def test_academy_numeric_answers_have_tolerance_and_mcq_index_in_range():
    for f in (SITE / "assets/academy/tracks").glob("*.js"):
        src = f.read_text(encoding="utf-8")
        for m in re.finditer(r"type: 'num', answer: (-?[\d.]+)", src):
            tail = src[m.end():m.end() + 40]
            assert "tol:" in tail, f"{f.name}: thiếu tol sau {m.group(0)}"
        for m in re.finditer(r"type: 'mcq', options: \[(.*?)\], answer: (\d+)", src):
            n = len(re.findall(r"'(?:[^'\\]|\\.)*'", m.group(1)))
            assert int(m.group(2)) < n, f"{f.name}: đáp án ngoài phạm vi"
