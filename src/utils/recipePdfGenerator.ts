/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import { Recipe } from '../types';

/**
 * Generates and triggers download of a high-fidelity PDF recipe card
 * formatted identically to the official Será Cacau recipe cards
 * (both Dani's culinary guide and Luna Azevedo's clinical prescriptions).
 */
export const downloadRecipePdf = (recipe: Recipe) => {
  const isLuna = recipe.category === 'clinica' || recipe.author === 'Luna';

  if (isLuna) {
    generateLunaPatientPdf(recipe);
  } else {
    generateDaniPdf(recipe);
  }
};

/**
 * Luna Azevedo's Official Clinical Prescription PDF format
 * Exactly matching the 13 Patient Prescription cards.
 */
function generateLunaPatientPdf(recipe: Recipe) {
  // A4 Landscape format (280mm x 195mm)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [280, 195]
  });

  // Background color - Warm Off-White / Natural Paper
  doc.setFillColor(250, 248, 243);
  doc.rect(0, 0, 280, 195, 'F');

  const startX = 20;
  const maxWidth = 240;

  // 1. Top Category / Badge Header
  const headerText = recipe.badgeHeader || `RECEITA ${recipe.numberCode || '01'} · PRESCRIÇÃO CLÍNICA`;
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(145, 135, 120);
  doc.text(headerText.toUpperCase(), startX, 16);

  // 2. Recipe Title
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(40, 50, 42); // Deep forest green / charcoal
  doc.text(recipe.title, startX, 26);

  // 3. Subtitle / Quote (Italic)
  let currentY = 32;
  if (recipe.subtitle) {
    doc.setFont('times', 'italic');
    doc.setFontSize(10.5);
    doc.setTextColor(130, 100, 60); // Warm bronze
    doc.text(`"${recipe.subtitle}"`, startX, currentY);
    currentY += 6;
  }

  // 4. Description Paragraph
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 85, 80);
  const descLines = doc.splitTextToSize(recipe.description, maxWidth);
  doc.text(descLines, startX, currentY);
  currentY += descLines.length * 4.2 + 6;

  // 5. Two Columns: INGREDIENTES (Left) and MODO DE PREPARO (Right)
  const col1X = startX;
  const col1W = 115;
  const col2X = startX + 125;
  const col2W = 115;
  const bodyStartY = currentY;

  // --- Left Column: INGREDIENTES ---
  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(150, 135, 115);
  doc.text('I N G R E D I E N T E S', col1X, bodyStartY);

  let ingY = bodyStartY + 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(55, 60, 55);

  recipe.ingredients.forEach((ing) => {
    const itemText = `— ${ing.amount ? ing.amount + ' de ' : ''}${ing.item}${ing.notes ? ' (' + ing.notes + ')' : ''}`;
    const lines = doc.splitTextToSize(itemText, col1W - 2);
    doc.text(lines, col1X, ingY);
    ingY += lines.length * 4.2;
  });

  // --- Right Column: MODO DE PREPARO ---
  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(150, 135, 115);
  doc.text('M O D O   D E   P R E P A R O', col2X, bodyStartY);

  let prepY = bodyStartY + 5.5;
  recipe.instructions.forEach((step, idx) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(165, 125, 70); // Bronze step number
    doc.text(`${idx + 1}.`, col2X, prepY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(55, 60, 55);
    const stepLines = doc.splitTextToSize(step, col2W - 8);
    doc.text(stepLines, col2X + 6, prepY);
    prepY += Math.max(stepLines.length * 4.2, 5.5);
  });

  let nextSectionY = Math.max(ingY, prepY) + 5;

  // 6. VARIAÇÕES (if present)
  if (recipe.variations && recipe.variations.length > 0 && nextSectionY < 135) {
    doc.setFont('times', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(150, 135, 115);
    doc.text('V A R I A Ç Õ E S', startX, nextSectionY);
    nextSectionY += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(70, 75, 70);

    recipe.variations.forEach((v) => {
      const vLines = doc.splitTextToSize(`· ${v}`, maxWidth);
      doc.text(vLines, startX, nextSectionY);
      nextSectionY += vLines.length * 3.8;
    });
    nextSectionY += 3;
  }

  // 7. INDICAÇÃO Box
  if (recipe.indication && nextSectionY < 155) {
    const boxH = 9;
    doc.setFillColor(236, 232, 222);
    doc.roundedRect(startX, nextSectionY, maxWidth, boxH, 2, 2, 'F');

    doc.setFont('times', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(110, 105, 95);
    doc.text('INDICAÇÃO:', startX + 4, nextSectionY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(50, 55, 50);
    doc.text(recipe.indication, startX + 26, nextSectionY + 6);

    nextSectionY += boxH + 3.5;
  }

  // 8. POR QUE FUNCIONA Box (if present and fits)
  if (recipe.whyItWorks && nextSectionY < 162) {
    doc.setFont('times', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(140, 110, 70);
    doc.text('POR QUE FUNCIONA:', startX, nextSectionY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(75, 80, 75);
    const whyLines = doc.splitTextToSize(recipe.whyItWorks, maxWidth);
    doc.text(whyLines.slice(0, 4), startX, nextSectionY + 8);
    nextSectionY += Math.min(whyLines.length, 4) * 3.4 + 9;
  }

  // 9. NOTA (if present)
  if (recipe.note && nextSectionY < 178) {
    doc.setFont('times', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(130, 80, 80);
    const noteLines = doc.splitTextToSize(`Nota: ${recipe.note}`, maxWidth);
    doc.text(noteLines, startX, nextSectionY);
  }

  // 10. Footer Bar
  const footerY = 188;
  doc.setDrawColor(220, 212, 198);
  doc.setLineWidth(0.3);
  doc.line(startX, footerY - 3, startX + maxWidth, footerY - 3);

  doc.setFont('times', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(135, 135, 130);
  const footerString = recipe.footerText || `Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA ${recipe.numberCode || '01'} · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR`;
  doc.text(footerString, startX + maxWidth / 2, footerY, { align: 'center' });

  // Save the PDF
  const sanitizedTitle = `Prescricao_${recipe.numberCode || '01'}_${recipe.title.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
  doc.save(`${sanitizedTitle}.pdf`);
}

/**
 * Dani's Official Recipe Card PDF format
 * Exactly matching Dani's 12 Será Cacau recipes.
 */
function generateDaniPdf(recipe: Recipe) {
  // A4 Landscape (280mm x 190mm)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [280, 190]
  });

  // Background color - Warm Off-White / Natural Paper
  doc.setFillColor(250, 248, 243);
  doc.rect(0, 0, 280, 190, 'F');

  const startX = 22;
  const contentWidth = 145;

  // 1. Header: Number Code + Category + Time
  const badgeText = recipe.badgeHeader || `${recipe.numberCode || '01'} RECEITAS DA DANI · ${recipe.prepTime.toUpperCase()}`;
  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(150, 140, 125);
  doc.text(badgeText.toUpperCase(), startX, 22);

  // 2. Recipe Title
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(45, 55, 45);
  doc.text(recipe.title, startX, 33);

  // 3. Subtitle / Description
  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(110, 115, 110);
  const splitDesc = doc.splitTextToSize(recipe.description, contentWidth);
  doc.text(splitDesc, startX, 42);
  const descHeight = splitDesc.length * 5;

  const bodyStartY = 45 + descHeight;

  // 4. Two Columns: INGREDIENTES (Left) and MODO DE PREPARO (Right)
  const col1X = startX;
  const col1Width = 68;
  const col2X = startX + 75;
  const col2Width = 72;

  // --- Column 1: INGREDIENTES ---
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(160, 145, 125);
  doc.text('I N G R E D I E N T E S', col1X, bodyStartY);

  let currentY1 = bodyStartY + 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 65, 60);

  recipe.ingredients.forEach((ing) => {
    const itemText = `— ${ing.amount ? ing.amount + ' ' : ''}${ing.item}${ing.notes ? ' · ' + ing.notes : ''}`;
    const lines = doc.splitTextToSize(itemText, col1Width);
    doc.text(lines, col1X, currentY1);
    currentY1 += lines.length * 4.8;
  });

  // --- Column 2: MODO DE PREPARO ---
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(160, 145, 125);
  doc.text('M O D O   D E   P R E P A R O', col2X, bodyStartY);

  let currentY2 = bodyStartY + 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 65, 60);

  recipe.instructions.forEach((step, idx) => {
    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(170, 140, 95);
    doc.text(`${idx + 1}`, col2X, currentY2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 65, 60);
    const stepLines = doc.splitTextToSize(step, col2Width - 6);
    doc.text(stepLines, col2X + 6, currentY2);
    currentY2 += Math.max(stepLines.length * 4.6, 6.5);
  });

  // 5. Dica da Será (if present)
  const tipY = Math.max(currentY1, currentY2) + 6;
  if (recipe.tip && tipY < 165) {
    doc.setDrawColor(200, 160, 90);
    doc.setLineWidth(0.8);
    doc.line(col2X, tipY, col2X, tipY + 12);

    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(180, 135, 65);
    doc.text('D I C A   D A   S E R Á', col2X + 4, tipY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 105, 100);
    const tipLines = doc.splitTextToSize(recipe.tip, col2Width - 4);
    doc.text(tipLines, col2X + 4, tipY + 9);
  }

  // 6. Right Side Visual Frame
  const imgBoxX = 175;
  const imgBoxY = 18;
  const imgBoxW = 90;
  const imgBoxH = 152;

  doc.setFillColor(240, 234, 222);
  doc.roundedRect(imgBoxX, imgBoxY, imgBoxW, imgBoxH, 4, 4, 'F');

  doc.setDrawColor(215, 205, 188);
  doc.setLineWidth(0.4);
  doc.roundedRect(imgBoxX + 3, imgBoxY + 3, imgBoxW - 6, imgBoxH - 6, 3, 3, 'S');

  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(50, 65, 52);
  doc.text('SERÁ CACAU', imgBoxX + (imgBoxW / 2), imgBoxY + 55, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(180, 140, 80);
  doc.text('100% Cacau Orgânico da Cabruca', imgBoxX + (imgBoxW / 2), imgBoxY + 63, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(120, 125, 120);
  doc.text('Receita Oficial • Dani', imgBoxX + (imgBoxW / 2), imgBoxY + 75, { align: 'center' });

  // 7. Footer
  const footerY = 180;
  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(140, 140, 135);
  doc.text('S E R Á   C A C A U   ·   1 0 0 %   C A C A U   O R G Â N I C O   ·   T R E E   T O   B A R', startX, footerY);
  doc.text('S E R A C A C A U . C O M . B R   ·   @ S E R A . C A C A U . B R A S I L', 280 - 22, footerY, { align: 'right' });

  // Save the PDF file
  const sanitizedTitle = (recipe.numberCode ? `${recipe.numberCode}_` : '') + recipe.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`Receita_${sanitizedTitle}.pdf`);
}
