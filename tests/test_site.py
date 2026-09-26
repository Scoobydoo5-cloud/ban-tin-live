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


def test_academy_manifest_is_current_and_lessons_validate():
    """Kiểm tra toàn bộ bài giảng và manifest bằng chính công cụ build (cần Node)."""
    import shutil
    import subprocess
    node = shutil.which("node")
    if not node:
        import pytest
        pytest.skip("Không có Node trên máy này")
    root = SITE.parent
    r = subprocess.run([node, str(root / "tools" / "build_academy.mjs"), "--check"], capture_output=True, text=True, encoding="utf-8", cwd=root)
    assert r.returncode == 0, r.stdout + r.stderr


def test_academy_program_labs_and_resources_are_consistent():
    program = (SITE / "assets/academy/program.js").read_text(encoding="utf-8")
    codes = re.findall(r"\{ code: '([A-Z0-9-]+)', stage:", program)
    assert len(codes) == len(set(codes)) >= 19
    labs_meta = (SITE / "assets/academy/labs-meta.js").read_text(encoding="utf-8")
    labs_js = (SITE / "assets/academy/labs.js").read_text(encoding="utf-8")
    for lab, subject in re.findall(r"\{ id: '([a-z]+)', title: '[^']+', blurb: '[^']*', subject: '([A-Z0-9-]+)'", labs_meta):
        assert f"LAB.{lab} = " in labs_js, lab
        assert subject in codes, subject
    resources = (SITE / "assets/academy/resources.js").read_text(encoding="utf-8")
    urls = re.findall(r"u: '(https://[^']+)'", resources)
    assert len(urls) == len(set(urls)), "URL trùng trong thư viện"
    # Mỗi thư mục bài giảng phải thuộc một môn có thật, tên file dạng NN.js
    for d in (SITE / "assets/academy/lessons").iterdir():
        if d.is_dir():
            assert d.name in codes, d.name
            for f in d.glob("*.js"):
                assert re.fullmatch(r"\d{2}\.js", f.name), f
