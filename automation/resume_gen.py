#!/usr/bin/env python3
"""
Batch-generate breed-specific Pet Rental Resume PDFs (FPDF).
Run from repo root: python automation/resume_gen.py
Outputs to automation/out/ (create manually or add mkdir in script).
"""

from __future__ import annotations

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "out"

BREEDS = [
    "Labrador Retriever",
    "French Bulldog",
    "Cocker Spaniel",
    "Golden Retriever",
    "Staffordshire Bull Terrier",
]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for breed in BREEDS:
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Helvetica", "B", 16)
        pdf.cell(0, 10, "Pet Rental Resume", ln=True)
        pdf.set_font("Helvetica", size=11)
        pdf.multi_cell(0, 8, f"Breed template: {breed}. Replace copy before Etsy/Gumroad listing.")
        path = OUT / f"resume-{breed.lower().replace(' ', '-')}.pdf"
        pdf.output(str(path))
        print("Wrote", path)


if __name__ == "__main__":
    main()
