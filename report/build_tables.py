"""Tạo các khối số liệu (HTML) cho tab "Báo cáo" từ dữ liệu đã kiểm tra, để báo cáo không phải gõ tay con số.

Dùng:
  python report/build_tables.py LATEST_JSON COMPANIES_DIR OUT_JSON [--kpis TNX,BRENT,VNINDEX,AXJO]

- LATEST_JSON: kết quả scripts/live_data.py (hoặc https://scoobydoo5-cloud.github.io/ban-tin-live/data/latest.json).
- COMPANIES_DIR: thư mục các hồ sơ doanh nghiệp xuất từ kho dữ liệu của trang (mỗi mã một file MKT-TICKER.json); có thể trống.
- OUT_JSON: {"html": {kpis, table_mkts, sparks, table_wl}, "facts": {...số để viết lời...}, "warnings": [...]}.

Mọi con số trong lời văn của báo cáo nên lấy từ "facts" để khớp với bảng.
"""
from __future__ import annotations

import argparse
import html
import io
import json
from pathlib import Path

E = html.escape
TREND = {"up": "Tăng", "down": "Giảm", "mixed": "Giằng co"}
VERD = {"bullish": "Tích cực", "neutral": "Trung lập", "bearish": "Tiêu cực"}
MKT_NAME = {"VN": "Việt Nam", "AU": "Úc", "US": "Mỹ"}
HOME = {"VN": "VN-Index", "AU": "S&amp;P/ASX 200", "US": "S&amp;P 500"}


def vn(x, dp=2):
    if x is None:
        return "–"
    s = f"{abs(x):,.{dp}f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return ("−" if x < 0 else "") + s


def pct(x, dp=1, sign=True):
    if x is None:
        return "–"
    return (("+" if x > 0 else "−" if x < 0 else "") if sign else "") + vn(abs(x), dp) + "%"


def cls(x):
    return "" if x is None else ("up" if x > 0 else "down" if x < 0 else "")


def trend(t):
    return f'<span class="trd {t}">{TREND[t]}</span>' if t in TREND else '<span class="muted">–</span>'


class Builder:
    def __init__(self, latest: dict, companies: dict[str, dict]):
        self.D, self.IT, self.CO = latest, latest["items"], companies
        self.warnings: list[str] = []

    def pa(self, k):
        return (self.IT.get(k) or {}).get("pa") or {}

    def has(self, k):
        return k in self.IT

    # ----- bảng thị trường -----
    def mkt_row(self, k, dp=2):
        it, p = self.IT[k], self.pa(k)
        prov = ' <span class="tag">tạm tính</span>' if it.get("status") == "provisional" else ""
        held = ' <span class="tag diff">số cũ</span>' if it.get("held") else ""
        roll = "<sup>1</sup>" if it.get("rollSuspected") else ""
        return (f'<tr><td>{E(it["label"])}{prov}{held}{roll}</td><td class="r num">{vn(it["last"], dp)}</td>'
                f'<td class="r num {cls(p.get("chg1w"))}">{pct(p.get("chg1w"))}</td>'
                f'<td class="r num {cls(it.get("chg1m"))}">{pct(it.get("chg1m"))}</td>'
                f'<td class="r num {cls(it.get("chgYtd"))}">{pct(it.get("chgYtd"))}</td>'
                f'<td class="r num">{pct(p.get("fromHi52"))}</td><td>{trend(p.get("trend"))}</td></tr>')

    def yield_row(self, k):
        it, p = self.IT[k], self.pa(k)
        h, last = it.get("hist") or [], it["last"]
        base = last / (1 + it["chgYtd"] / 100) if it.get("chgYtd") is not None else None

        def bp(x):
            return '<td class="r num">–</td>' if x is None else f'<td class="r num">{("+" if x > 0 else "−") + vn(abs(x), 0)} đcb</td>'
        w = (last - h[-6]) * 100 if len(h) > 5 else None
        m = (last - h[-22]) * 100 if len(h) > 21 else None
        y = (last - base) * 100 if base else None
        return (f'<tr><td>{E(it["label"])}</td><td class="r num">{vn(last)}%</td>{bp(w)}{bp(m)}{bp(y)}'
                f'<td class="r num">{"đỉnh 52 tuần" if p.get("fromHi52") == 0 else pct(p.get("fromHi52"))}</td><td>{trend(p.get("trend"))}</td></tr>')

    def table_mkts(self):
        g = lambda t: f'<tr class="grp"><th colspan="7">{t}</th></tr>'  # noqa: E731
        idx = self.D["groups"].get("indices", [])
        mac = [k for k in self.D["groups"].get("macro", []) if self.has(k)]
        rows = ""
        for m in ("VN", "AU", "US"):
            ks = [k for k in idx if self.has(k) and self.IT[k].get("market") == m]
            if ks:
                rows += g(MKT_NAME[m]) + "".join(self.mkt_row(k, 1 if m == "AU" else 2) for k in ks)
        other = [k for k in mac if (self.IT[k].get("unit") != "%")]
        yields = [k for k in mac if (self.IT[k].get("unit") == "%")]
        if other:
            rows += g("Tỷ giá, hàng hóa") + "".join(self.mkt_row(k, self.IT[k].get("dp") if self.IT[k].get("dp") is not None else 2) for k in other)
        if yields:
            rows += g("Lợi suất (thay đổi tính bằng điểm cơ bản)") + "".join(self.yield_row(k) for k in yields)
        head = ('<thead><tr><th>Mã</th><th class="r">Mức</th><th class="r">Tuần</th><th class="r">1 tháng</th>'
                '<th class="r">Từ đầu năm</th><th class="r">Cách đỉnh 52T</th><th>Xu hướng</th></tr></thead>')
        return '<div class="tbl-wrap"><table>' + head + '<tbody>' + rows + '</tbody></table></div>'

    # ----- biểu đồ nhỏ 60 phiên -----
    def spark(self, k, dp=2):
        it = self.IT[k]
        v = [x for x in (it.get("hist") or []) if x is not None]
        if len(v) < 2:
            return ""
        unit = "%" if it.get("unit") == "%" else ""
        lo, hi = min(v), max(v)
        w, h, pad = 300, 80, 6
        X = lambda i: pad + i * (w - 2 * pad) / (len(v) - 1)  # noqa: E731
        Y = lambda y: pad + (hi - y) * (h - 2 * pad) / ((hi - lo) or 1)  # noqa: E731
        d = "M" + " L".join(f"{X(i):.1f},{Y(y):.1f}" for i, y in enumerate(v))
        area = d + f" L{X(len(v) - 1):.1f},{h - pad} L{X(0):.1f},{h - pad} Z"
        chg = (v[-1] / v[0] - 1) * 100
        c = "up" if chg >= 0 else "down"
        lab = it["label"]
        return (f'<figure class="sp"><figcaption><span>{E(lab)}</span><b class="num">{vn(v[-1], dp)}{unit}</b>'
                f'<em class="num {c}">{pct(chg)} / {len(v)} phiên</em></figcaption>'
                f'<svg viewBox="0 0 {w} {h}" preserveAspectRatio="none" role="img" aria-label="{E(lab)}: {len(v)} phiên gần nhất, thấp nhất {vn(lo, dp)}, cao nhất {vn(hi, dp)}">'
                f'<path class="ar {c}" d="{area}"/><path class="ln {c}" d="{d}"/>'
                f'<circle class="dt {c}" cx="{X(len(v) - 1):.1f}" cy="{Y(v[-1]):.1f}" r="3"/></svg>'
                f'<div class="rg num"><span>thấp {vn(lo, dp)}</span><span>cao {vn(hi, dp)}</span></div></figure>')

    def sparks(self, keys):
        return '<div class="rp-sps">' + "".join(self.spark(k, 0 if (self.IT[k].get("last") or 0) > 1000 else 2) for k in keys if self.has(k)) + '</div>'

    # ----- ô số lớn -----
    def kpis(self, keys):
        out = []
        for k in keys:
            if not self.has(k):
                self.warnings.append(f"Không có {k} trong dữ liệu cho ô số lớn")
                continue
            it, p = self.IT[k], self.pa(k)
            if it.get("unit") == "%":
                base = it["last"] / (1 + it["chgYtd"] / 100) if it.get("chgYtd") is not None else None
                ybp = (it["last"] - base) * 100 if base else None
                v, n = f'{vn(it["last"])}%', (f'{("+" if ybp > 0 else "−") + vn(abs(ybp), 0)} đcb từ đầu năm' if ybp is not None else "") + (" · đỉnh 52 tuần" if p.get("fromHi52") == 0 else "")
                ncls = ""
            else:
                dp = 1 if it["last"] > 1000 and it.get("market") == "AU" else (0 if it["last"] > 10000 else 2)
                v = vn(it["last"], dp)
                n = f'{pct(p.get("chg1w"))} trong tuần · {pct(it.get("chgYtd"))} từ đầu năm'
                ncls = cls(p.get("chg1w"))
            out.append(f'<div class="tile"><div class="k">{E(it["label"])}</div><div class="v">{v}</div><div class="n {ncls}">{n}</div></div>')
        return '<div class="rp-kpis" role="group" aria-label="Các con số của tuần">' + "".join(out) + '</div>'

    # ----- danh sách theo dõi -----
    def wl_row(self, k):
        it, p = self.IT[k], self.pa(k)
        c = self.CO.get(k) or {}
        b = c.get("buffett") or {}
        pe = (b.get("valuation") or {}).get("peNow")
        tags = it.get("tags") or []
        badge = (f' <span class="tag ok">Quỹ {round(it["weight"] * 100)}%</span>' if "fund" in tags and it.get("weight")
                 else ' <span class="tag one">Chờ vào quỹ</span>' if "waiting" in tags else "")
        rs = p.get("rs3m")
        v = b.get("verdict")
        name = (f'<button type="button" class="lk" data-act="open" data-id="{E(k)}">{E(it["label"])}</button>' if c
                else f'<strong>{E(it["label"])}</strong>')
        return (f'<tr><td>{name}{badge}</td><td class="r num {cls(it.get("chgYtd"))}">{pct(it.get("chgYtd"))}</td>'
                f'<td class="r num">{pct(p.get("fromHi52"))}</td>'
                f'<td class="r num {cls(rs)}">{("+" if rs > 0 else "−" if rs < 0 else "") + vn(abs(rs), 1) if rs is not None else "–"}</td>'
                f'<td class="r num">{vn(p.get("rsi14"), 0) if p.get("rsi14") is not None else "–"}</td><td>{trend(p.get("trend"))}</td>'
                f'<td class="r num">{vn(pe, 1) + "x" if pe else "–"}</td>'
                f'<td>{f"""<span class="vd {v}">{VERD[v]} {E(str(b.get("confidence", "")))}</span>""" if v in VERD else "–"}</td></tr>')

    def watch_keys(self):
        return [k for k in self.D["groups"].get("watchlist", []) if self.has(k) and not self.IT[k].get("index")]

    def table_wl(self):
        rows = ""
        for m in ("VN", "AU", "US"):
            ks = [k for k in self.watch_keys() if self.IT[k].get("market") == m]
            if ks:
                rows += f'<tr class="grp"><th colspan="8">{MKT_NAME[m]} · so với {HOME[m]}</th></tr>' + "".join(self.wl_row(k) for k in ks)
        return ('<div class="tbl-wrap"><table><thead><tr><th>Mã <span class="u">(bấm để mở hồ sơ)</span></th><th class="r">Từ đầu năm</th>'
                '<th class="r">Cách đỉnh 52T</th><th class="r">So chỉ số 3T</th><th class="r">RSI 14</th><th>Xu hướng</th>'
                '<th class="r">P/E hiện tại</th><th>Mô phỏng Buffett</th></tr></thead><tbody>' + rows + '</tbody></table></div>')

    # ----- số để viết lời -----
    def facts(self):
        f = {"generatedAtSydney": self.D.get("generatedAtSydney"), "summary": self.D.get("summary"), "items": {}}
        for k, it in self.IT.items():
            p = it.get("pa") or {}
            row = {"label": it.get("label"), "market": it.get("market"), "day": it.get("day"), "status": it.get("status"),
                   "last": it.get("last"), "changePct": it.get("changePct"), "chg1w": p.get("chg1w"), "chg1m": it.get("chg1m"),
                   "chg3m": it.get("chg3m"), "chgYtd": it.get("chgYtd"), "chg1y": p.get("chg1y"), "fromHi52": p.get("fromHi52"),
                   "maxDd1y": p.get("maxDd1y"), "rsi14": p.get("rsi14"), "vol20": p.get("vol20"), "atr14pct": p.get("atr14pct"),
                   "trend": p.get("trend"), "ma50Slope": p.get("ma50Slope"), "rs1m": p.get("rs1m"), "rs3m": p.get("rs3m"),
                   "hi20": p.get("hi20"), "lo20": p.get("lo20"), "tags": it.get("tags"), "weight": it.get("weight"),
                   "level": it.get("level"), "held": it.get("held"), "rollSuspected": it.get("rollSuspected")}
            if it.get("unit") == "%" and it.get("chgYtd") is not None and it.get("hist"):
                base = it["last"] / (1 + it["chgYtd"] / 100)
                h = it["hist"]
                row["bp1w"] = round((it["last"] - h[-6]) * 100, 1) if len(h) > 5 else None
                row["bpYtd"] = round((it["last"] - base) * 100, 1)
            c = (self.CO.get(k) or {}).get("buffett") or {}
            if c:
                row["buffett"] = {"verdict": c.get("verdict"), "confidence": c.get("confidence"), "peNow": (c.get("valuation") or {}).get("peNow")}
            f["items"][k] = {a: b for a, b in row.items() if b is not None}
        wk = self.watch_keys()
        f["trendCount"] = {t: sum(1 for k in wk if self.pa(k).get("trend") == t) for t in ("up", "down", "mixed")}
        f["trendCount"]["total"] = len(wk)
        return f


def load_companies(folder: str | None) -> dict[str, dict]:
    out = {}
    if folder and Path(folder).is_dir():
        for p in Path(folder).glob("*.json"):
            try:
                d = json.load(io.open(p, encoding="utf-8"))
                out[p.stem] = d.get("data", d) if isinstance(d, dict) else {}
            except (OSError, ValueError):
                continue
    return out


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("latest")
    ap.add_argument("companies")
    ap.add_argument("out")
    ap.add_argument("--kpis", default="TNX,BRENT,VNINDEX,AXJO")
    ap.add_argument("--sparks", default="TNX,BRENT,GOLD,GSPC,AXJO,VNINDEX")
    a = ap.parse_args(argv)
    latest = json.load(io.open(a.latest, encoding="utf-8"))
    b = Builder(latest, load_companies(a.companies))
    res = {"html": {"kpis": b.kpis([k for k in a.kpis.split(",") if k]), "table_mkts": b.table_mkts(),
                    "sparks": b.sparks([k for k in a.sparks.split(",") if k]), "table_wl": b.table_wl()},
           "facts": b.facts(), "warnings": b.warnings}
    io.open(a.out, "w", encoding="utf-8").write(json.dumps(res, ensure_ascii=False, indent=1))
    print(f"ok: {len(b.watch_keys())} mã theo dõi, {len(b.CO)} hồ sơ, cảnh báo: {len(b.warnings)}")


if __name__ == "__main__":
    main()
