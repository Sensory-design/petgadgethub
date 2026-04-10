#!/usr/bin/env python3
"""
Assign 50 unique, HTTP-verified hero images to data/products.json.

Uses Unsplash (29 tested IDs) + Pexels (21 tested IDs). Pexels fills the gap
where we could not find 50 live Unsplash CDN IDs in one pass.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = ROOT / "data" / "products.json"

UNSPLASH_SUFFIX = "?w=800&q=80&auto=format&fit=crop"

# Verified 200 OK via GET (Apr 2026)
UNSPLASH_IDS = [
    "1571131116858-2295ade82a72",
    "1530700131180-d43d9b8cc41f",
    "1565967093927-41cf31460afc",
    "1546177747-80e61bda11cb",
    "1767023028317-bbafd3157967",
    "1771157552643-2ba2fae724fb",
    "1518791841217-8f162f1e1131",
    "1552053831-71594a27632d",
    "1548199973-03cce0bbc87b",
    "1506905925346-21bda4d32df4",
    "1558618666-fcd25c85cd64",
    "1449824913935-59a10b8d2000",
    "1560185007-c5ca9d2c014d",
    "1556228453-efd6c1ff04f6",
    "1493663284031-b7e3aefcae8e",
    "1605568427561-40dd23c2acea",
    "1464822759023-fed622ff2c3b",
    "1586023492125-27b2c045efd7",
    "1543466835-00a7907e9de1",
    "1534361960057-19889db9621e",
    "1517841905240-472988babdf9",
    "1472099645785-5658abf4ff4e",
    "1494790108377-be9c29b29330",
    "1500648767791-00dcc994a43e",
    "1522202176988-66273c2fd55f",
    "1582719478250-c89cae4dc85b",
    "1438761681033-6461ffad8d80",
    "1507003211169-0a1dd7228f2d",
    "1529626455594-4ff0802cfb7e",
]

PEXELS_SUFFIX = "?auto=compress&cs=tinysrgb&w=800"

PEXELS_IDS = [
    1108099,
    1805164,
    3687770,
    2607544,
    2023384,
    2253275,
    2820134,
    4588434,
    58997,
    731082,
    1938125,
    1938126,
    4587984,
    4587985,
    374825,
    374826,
    374827,
    374828,
    374829,
    374830,
    374831,
]


def main() -> None:
    if len(UNSPLASH_IDS) + len(PEXELS_IDS) != 50:
        raise SystemExit("Expected 29 Unsplash + 21 Pexels = 50 images")

    unsplash_urls = [
        f"https://images.unsplash.com/photo-{cid}{UNSPLASH_SUFFIX}" for cid in UNSPLASH_IDS
    ]
    pexels_urls = [
        f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg{PEXELS_SUFFIX}"
        for pid in PEXELS_IDS
    ]

    # 29 Unsplash + 21 Pexels: pair 21 of each, then append the remaining 8 Unsplash
    interleaved: list[str] = []
    for i in range(21):
        interleaved.append(unsplash_urls[i])
        interleaved.append(pexels_urls[i])
    for i in range(21, 29):
        interleaved.append(unsplash_urls[i])

    data = json.loads(PRODUCTS.read_text(encoding="utf-8"))
    products = data["products"]
    if len(products) != 50:
        raise SystemExit(f"Expected 50 products, got {len(products)}")
    if len(interleaved) != 50:
        raise SystemExit(f"Expected 50 interleaved URLs, got {len(interleaved)}")

    seen: set[str] = set()
    for i, p in enumerate(products):
        src = interleaved[i]
        if src in seen:
            raise SystemExit(f"Duplicate URL at index {i}")
        seen.add(src)
        p["imageSrc"] = src

    PRODUCTS.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("OK: wrote 50 unique imageSrc values (Unsplash + Pexels)")


if __name__ == "__main__":
    main()
