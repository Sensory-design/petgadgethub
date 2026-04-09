#!/usr/bin/env python3
"""
Generate 1080x1920 Pinterest-style images from data/products.json.
Requires: pip install pillow
Output: public/pins/<slug>.png
Run: python scripts/pin-gen.py
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = ROOT / "data" / "products.json"
OUT_DIR = ROOT / "public" / "pins"


def main() -> None:
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError as e:  # pragma: no cover
        raise SystemExit("Install Pillow first: pip install pillow") from e

    data = json.loads(PRODUCTS.read_text(encoding="utf-8"))
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    w, h = 1080, 1920
    for p in data["products"]:
        img = Image.new("RGB", (w, h), color=(15, 35, 65))
        draw = ImageDraw.Draw(img)
        draw.rectangle((60, 520, w - 60, h - 520), fill=(255, 255, 255), outline=None)

        title = p["title"]
        tag = p["tagline"]
        try:
            font_title = ImageFont.truetype("arial.ttf", 44)
            font_tag = ImageFont.truetype("arial.ttf", 30)
        except OSError:
            font_title = ImageFont.load_default()
            font_tag = ImageFont.load_default()

        draw.text((80, 120), "PetGadgetHub", fill=(230, 240, 255), font=font_tag)
        draw.text((80, 220), title, fill=(255, 255, 255), font=font_title, spacing=8)
        draw.text((80, 420), tag, fill=(200, 215, 235), font=font_tag, spacing=6)

        out = OUT_DIR / f"{p['slug']}.png"
        img.save(out, format="PNG", optimize=True)
        print("Wrote", out)


if __name__ == "__main__":
    main()
