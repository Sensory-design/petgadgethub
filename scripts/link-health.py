#!/usr/bin/env python3
"""
Weekly ASIN link check: GET Amazon PDPs for each ASIN in data/products.json.
Amazon may return interstitials or bot checks � treat non-200 as "needs manual review".
Run: python scripts/link-health.py
"""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = ROOT / "data" / "products.json"

UA = "PetGadgetHub-LinkHealth/1.0"


def fetch_status(url: str) -> int:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:  # noqa: S310
            return int(resp.status)
    except urllib.error.HTTPError as e:
        return int(e.code)
    except OSError:
        return 0


def main() -> int:
    data = json.loads(PRODUCTS.read_text(encoding="utf-8"))
    rows: list[tuple[str, int]] = []
    for p in data["products"]:
        asin = p["asin"]
        url = f"https://www.amazon.com/dp/{asin}"
        code = fetch_status(url)
        rows.append((asin, code))
        ok = code == 200
        print(f"{asin}\t{code}\t{'OK' if ok else 'REVIEW'}")

    bad = [r for r in rows if r[1] != 200]
    print(f"\nSummary: {len(rows) - len(bad)}/{len(rows)} returned HTTP 200 (automated check).")
    if bad:
        print("Manual follow-up recommended for:", ", ".join(r[0] for r in bad))
    return 0 if not bad else 1


if __name__ == "__main__":
    sys.exit(main())
