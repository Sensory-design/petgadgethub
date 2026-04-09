import type { RentalResumeForm } from "@/types/rental-resume";

import { jsPDF } from "jspdf";

const BREED_LABEL: Record<RentalResumeForm["breed"], string> = {
  labrador: "Labrador Retriever",
  french_bulldog: "French Bulldog",
  cocker_spaniel: "Cocker Spaniel",
  golden_retriever: "Golden Retriever",
  staffordshire_bull_terrier: "Staffordshire Bull Terrier",
  other: "Other (see notes)",
};

const MAX_W = 174;
const LINE_H = 5;
const MARGIN = 18;

function addLines(doc: jsPDF, text: string, x: number, y: number): number {
  const lines = doc.splitTextToSize(text, MAX_W);
  doc.text(lines, x, y);
  return y + Math.max(1, lines.length) * LINE_H + 4;
}

export function generateRentalResumePdf(data: RentalResumeForm) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Pet Rental Resume", MARGIN, y);
  y += 12;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y = addLines(
    doc,
    "Prepared for landlord review. Not legal advice. Verify against your tenancy agreement and local rules.",
    MARGIN,
    y,
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  y = addLines(doc, "Guardian & pet", MARGIN, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const breedLine =
    data.breed === "other" ? data.breedOther.trim() || "Other" : BREED_LABEL[data.breed];
  y = addLines(doc, `Guardian: ${data.ownerName.trim() || "-"}`, MARGIN, y);
  y = addLines(doc, `Pet name: ${data.petName.trim() || "-"}`, MARGIN, y);
  y = addLines(doc, `Breed / type: ${breedLine}`, MARGIN, y + 2);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  y = addLines(doc, "Behaviour & training", MARGIN, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  y = addLines(doc, data.behaviorTraining.trim() || "-", MARGIN, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  y = addLines(doc, "Responsible pet pledge", MARGIN, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  y = addLines(doc, data.behaviorPledge.trim() || "-", MARGIN, y);

  if (y > 265) {
    doc.addPage();
    y = MARGIN;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  y = addLines(doc, "Health", MARGIN, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  y = addLines(
    doc,
    `Vaccination / vet care: ${data.healthVaccinations.trim() || "-"}`,
    MARGIN,
    y,
  );
  y = addLines(doc, `Flea / worming: ${data.healthParasite.trim() || "-"}`, MARGIN, y);

  if (y > 265) {
    doc.addPage();
    y = MARGIN;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  y = addLines(doc, "Insurance", MARGIN, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  y = addLines(doc, data.insuranceNote.trim() || "-", MARGIN, y);

  doc.save(`pet-rental-resume-${(data.petName || "pet").replace(/\s+/g, "-")}.pdf`);
}
