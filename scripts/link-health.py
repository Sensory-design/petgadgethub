#!/usr/bin/env python3
"""
Weekly ASIN link check: GET Amazon PDPs for each ASIN in data/products.json.

Amazon often returns HTTP 404 for scripted requests to www.amazon.com even when
the listing exists; www.amazon.co.uk usually returns 200 for the same ASINs.
This script uses a Chrome-like User-Agent. Treat non-200 as "needs manual review".

Run: python scripts/link-health.py
     python scripts/link-health.py --domain www.amazon.com
     python scripts/link-health.py --check-both
"""

from __future__ import annotations

import argparse
import json
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = ROOT / "data" / "products.json"

# Amazon frequently serves 404 to scripted requests; browser UA matches typical PDP checks.
BROWSER_UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

RETRY_CODES = frozenset({404, 408, 429, 500, 502, 503, 504})


def fetch_status(url: str, *, retry: bool) -> int:
    req = urllib.request.Request(url, headers={"User-Agent": BROWSER_UA})
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:  # noqa: S310
            return int(resp.status)
    except urllib.error.HTTPError as e:
        code = int(e.code)
        if retry and code in RETRY_CODES:
            time.sleep(1.2)
            return fetch_status(url, retry=False)
        return code
    except OSError:
        if retry:
            time.sleep(1.2)
            return fetch_status(url, retry=False)
        return 0


def parse_domain(raw: str) -> str:
    s = raw.strip()
    if s.startswith("https://"):
        s = s[8:]
    elif s.startswith("http://"):
        s = s[7:]
    return s.split("/")[0]


def main() -> int:
    parser = argparse.ArgumentParser(description="Check Amazon PDP HTTP status for each product ASIN.")
    parser.add_argument(
        "--domain",
        default="www.amazon.co.uk",
        help="Amazon host (default: www.amazon.co.uk). Ignored if --check-both is set.",
    )
    parser.add_argument(
        "--check-both",
        action="store_true",
        help="Try UK then US for each ASIN; OK if either returns 200.",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=0.35,
        metavar="SEC",
        help="Seconds to wait between requests (default: 0.35). Use 0 to go as fast as possible.",
    )
    parser.add_argument(
        "--no-retry",
        action="store_true",
        help="Do not retry once on ambiguous/transient status codes.",
    )
    args = parser.parse_args()
    delay = max(0.0, args.delay)
    retry = not args.no_retry

    if args.check_both:
        domains = ["www.amazon.co.uk", "www.amazon.com"]
    else:
        domains = [parse_domain(args.domain)]

    data = json.loads(PRODUCTS.read_text(encoding="utf-8"))
    rows: list[tuple[str, int, str]] = []
    products = data["products"]
    for i, p in enumerate(products):
        asin = p["asin"]
        best_code = 0
        via = ""
        detail_parts: list[str] = []
        for j, d in enumerate(domains):
            url = f"https://{d}/dp/{asin}"
            code = fetch_status(url, retry=retry)
            short = "uk" if "co.uk" in d else "us"
            detail_parts.append(f"{short}={code}")
            best_code = code
            if code == 200:
                via = short
                break
            if len(domains) > 1 and j == 0:
                time.sleep(delay)
        if best_code != 200 and len(domains) > 1:
            via = ",".join(detail_parts)
        rows.append((asin, best_code, via))
        ok = best_code == 200
        if args.check_both:
            print(f"{asin}\t{best_code}\t{'OK' if ok else 'REVIEW'}\t{via}")
        else:
            print(f"{asin}\t{best_code}\t{'OK' if ok else 'REVIEW'}")
        if i < len(products) - 1 and delay > 0:
            time.sleep(delay)

    bad = [r for r in rows if r[1] != 200]
    print(f"\nSummary: {len(rows) - len(bad)}/{len(rows)} returned HTTP 200 (automated check).")
    if bad:
        print("Manual follow-up recommended for:", ", ".join(r[0] for r in bad))
    return 0 if not bad else 1


if __name__ == "__main__":
    sys.exit(main())
