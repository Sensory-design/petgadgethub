#!/usr/bin/env python3
"""
Generate printable checklists (CSV + simple PDF) for digital products.
Run: python automation/checklists_gen.py
"""

from __future__ import annotations

import csv
from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "out"


def write_csv() -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / "smart-home-pet-proofing.csv"
    rows = [
        ["Task", "Done"],
        ["Secure bins and food storage", ""],
        ["Cable tidy / chew hazards", ""],
        ["May 1st 2026 compliance note — tailor to your listing copy", ""],
    ]
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerows(rows)
    return path


def write_pdf() -> Path:
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 10, "Smart Home Pet-Proofing Checklist", ln=True)
    pdf.set_font("Helvetica", size=11)
    pdf.multi_cell(
        0,
        7,
        "Starter template for Etsy/Gumroad — expand with your niche and May 2026 compliance angle.",
    )
    path = OUT / "pet-proofing-checklist.pdf"
    pdf.output(str(path))
    return path


def main() -> None:
    csv_path = write_csv()
    pdf_path = write_pdf()
    print("Wrote", csv_path)
    print("Wrote", pdf_path)


if __name__ == "__main__":
    main()
