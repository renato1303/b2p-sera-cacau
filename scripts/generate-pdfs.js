import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

// --- PDF 1: Lista de Compras ---
function generateListaComprasPDF() {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 297mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 210mm

  // PAGE 1 - Cover (Dark Forest Background)
  doc.setFillColor(28, 46, 36); // #1C2E24
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Left Column Content
  doc.setTextColor(198, 165, 106); // Luxury Gold
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('CACAU NA PRÁTICA  ·  PARA NUTRICIONISTAS', 25, 65);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(38);
  doc.setFont('times', 'bold');
  doc.text('Lista de\nCompras', 25, 88);

  doc.setTextColor(214, 223, 215);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('As sete receitas do curso — tudo o que você precisa ter em casa\nantes da primeira xícara.', 25, 130);

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(11);
  doc.setFont('times', 'italic');
  doc.text('Da floresta. De verdade.', 25, 175);

  // Right Side Decorative Box / Card
  doc.setFillColor(38, 58, 48);
  doc.roundedRect(170, 35, 100, 140, 6, 6, 'F');
  doc.setDrawColor(198, 165, 106);
  doc.setLineWidth(0.4);
  doc.roundedRect(170, 35, 100, 140, 6, 6, 'S');

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(14);
  doc.setFont('times', 'bold');
  doc.text('SERÁ CACAU', 220, 75, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('GOTAS DE CACAU PURO (105g)', 220, 90, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(214, 223, 215);
  doc.text('100% Cacau Agroflorestal\nTree to Bar · Sul da Bahia', 220, 100, { align: 'center' });

  // PAGE 2 - Sete Xícaras, Uma Lista (Light Cream Background)
  doc.addPage('a4', 'landscape');
  doc.setFillColor(248, 246, 241); // #F8F6F1
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('O QUE TER EM CASA', 20, 18);

  doc.setTextColor(28, 46, 36);
  doc.setFontSize(22);
  doc.setFont('times', 'bold');
  doc.text('Sete xícaras, uma lista', 20, 27);

  // Banner "Já vai na sua caixa"
  doc.setFillColor(28, 46, 36);
  doc.roundedRect(20, 32, 257, 16, 3, 3, 'F');
  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('JÁ VAI NA SUA CAIXA:', 26, 42);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.text('As Gotas de Cacau Puro Será (105 g) acompanham o convite — uma xícara por dia, os sete dias já estão garantidos.', 68, 42);

  // 4 Cards Grid
  const cardW = 124;
  const cardH = 65;

  // Card 1: ESPECIARIAS
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 52, cardW, cardH, 4, 4, 'F');
  doc.setDrawColor(230, 225, 218);
  doc.roundedRect(20, 52, cardW, cardH, 4, 4, 'S');

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('ESPECIARIAS', 28, 62);

  doc.setTextColor(50, 60, 55);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const especiarias = [
    '• Canela-do-Ceilão em pó — não cássia',
    '• Cardamomo em pó',
    '• Gengibre em pó — ou fresco',
    '• Cúrcuma em pó',
    '• Pimenta-do-reino em grão — moer na hora',
    '• Erva-doce — em pó ou sementes'
  ];
  especiarias.forEach((item, idx) => {
    doc.text(item, 28, 70 + (idx * 6.5));
  });

  // Card 2: BOTÂNICOS & ADAPTÓGENOS
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(153, 52, cardW, cardH, 4, 4, 'F');
  doc.roundedRect(153, 52, cardW, cardH, 4, 4, 'S');

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('BOTÂNICOS & ADAPTÓGENOS', 161, 62);

  doc.setTextColor(50, 60, 55);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const botanicos = [
    '• Ashwagandha em pó — KSM-66 ou Sensoril',
    '• Hibisco — em pó ou pétalas secas',
    '• Baunilha Bourbon Será — ½ fava (da nossa casa)'
  ];
  botanicos.forEach((item, idx) => {
    doc.text(item, 161, 70 + (idx * 6.5));
  });

  // Card 3: LÍQUIDOS
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 122, cardW, 58, 4, 4, 'F');
  doc.roundedRect(20, 122, cardW, 58, 4, 4, 'S');

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('LÍQUIDOS', 28, 131);

  doc.setTextColor(50, 60, 55);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const liquidos = [
    '• Água quente — base de várias xícaras',
    '• Leite vegetal à escolha — caju, amêndoa, coco ou aveia',
    '• Dica: coco ou aveia nas xícaras com cúrcuma e ashwagandha',
    '   — a gordura ajuda na absorção'
  ];
  liquidos.forEach((item, idx) => {
    doc.text(item, 28, 139 + (idx * 6.5));
  });

  // Card 4: PARA FINALIZAR — A GOSTO
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(153, 122, cardW, 58, 4, 4, 'F');
  doc.roundedRect(153, 122, cardW, 58, 4, 4, 'S');

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('PARA FINALIZAR — A GOSTO', 161, 131);

  doc.setTextColor(50, 60, 55);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const finalizar = [
    '• Mel cru ou tâmaras (opcional)',
    '• Sal marinho — uma pitada',
    '• Noz-moscada · anis-estrelado · cravo',
    '• Laranja — rodela ou casca'
  ];
  finalizar.forEach((item, idx) => {
    doc.text(item, 161, 139 + (idx * 6.5));
  });

  // Footer
  doc.setTextColor(150, 160, 155);
  doc.setFontSize(7.5);
  doc.text('seracacau.com.br  ·  @Sera.Cacau.Brasil', 20, 196);

  // PAGE 3 - Como Preparar (3 Passos)
  doc.addPage('a4', 'landscape');
  doc.setFillColor(248, 246, 241);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('COMO PREPARAR', 20, 22);

  doc.setTextColor(28, 46, 36);
  doc.setFontSize(24);
  doc.setFont('times', 'bold');
  doc.text('Três passos, uma xícara', 20, 32);

  doc.setTextColor(110, 125, 115);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Quente no friozinho, gelada no calor — o jeito é sempre o mesmo.', 20, 42);

  // 3 Steps
  const stepW = 80;
  const stepH = 110;

  // Step 1
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 52, stepW, stepH, 4, 4, 'F');
  doc.setDrawColor(230, 225, 218);
  doc.roundedRect(20, 52, stepW, stepH, 4, 4, 'S');

  doc.setFillColor(60, 95, 75);
  doc.circle(32, 66, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('1', 32, 69, { align: 'center' });

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(9);
  doc.text('A BASE', 44, 68);

  doc.setTextColor(50, 60, 55);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('200 ml de leite vegetal ou água —\nquente ou gelada, como o dia\npedir.', 28, 90);

  // Step 2
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(108, 52, stepW, stepH, 4, 4, 'F');
  doc.roundedRect(108, 52, stepW, stepH, 4, 4, 'S');

  doc.setFillColor(60, 95, 75);
  doc.circle(120, 66, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('2', 120, 69, { align: 'center' });

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(9);
  doc.text('AS GOTAS', 132, 68);

  doc.setTextColor(50, 60, 55);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('15 g de Gotas direto no copo.\n\nLembra: 1 gota = 1 grama.', 116, 90);

  // Step 3
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(196, 52, stepW, stepH, 4, 4, 'F');
  doc.roundedRect(196, 52, stepW, stepH, 4, 4, 'S');

  doc.setFillColor(60, 95, 75);
  doc.circle(208, 66, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('3', 208, 69, { align: 'center' });

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(9);
  doc.text('MISTURAR', 220, 68);

  doc.setTextColor(50, 60, 55);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Mexa até dissolver.\n\nNo mixer ou espumador,\nfica aveludado e cremoso.', 204, 90);

  // Footer
  doc.setTextColor(150, 160, 155);
  doc.setFontSize(7.5);
  doc.text('seracacau.com.br  ·  @Sera.Cacau.Brasil', 20, 196);

  // PAGE 4 - Fechamento
  doc.addPage('a4', 'landscape');
  doc.setFillColor(28, 46, 36);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(30);
  doc.setFont('times', 'bold');
  doc.text('Sete manhãs. Uma xícara por vez.', pageWidth / 2, 85, { align: 'center' });

  doc.setTextColor(214, 223, 215);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Qualquer dúvida sobre as receitas ou os ingredientes, fala com a gente.\nA gente preparou esse curso para caber na sua manhã — não na sua agenda.', pageWidth / 2, 110, { align: 'center' });

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('DA FLORESTA. DE VERDADE.', pageWidth / 2, 145, { align: 'center' });

  doc.setTextColor(160, 175, 165);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('seracacau.com.br  ·  @Sera.Cacau.Brasil', pageWidth / 2, 175, { align: 'center' });

  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(path.join(process.cwd(), 'public', 'Sera_Cacau_Lista_de_Compras.pdf'), buffer);
  console.log('Generated Sera_Cacau_Lista_de_Compras.pdf');
}

// --- PDF 2: Como Preparar o Seu Cacau em Casa ---
function generateGuiaPreparoPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm

  // PAGE 1
  doc.setFillColor(248, 246, 241);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header
  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('CACAU NA PRÁTICA', 20, 25);

  doc.setTextColor(28, 46, 36);
  doc.setFontSize(26);
  doc.setFont('times', 'bold');
  doc.text('Como preparar o seu\ncacau em casa', 20, 36);

  doc.setTextColor(28, 46, 36);
  doc.setFontSize(13);
  doc.setFont('times', 'italic');
  doc.text('Três jeitos — e sempre a mesma base:', 20, 60);

  doc.setTextColor(110, 125, 115);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text('15 g de Gotas para 200 ml de líquido. 1 gota = 1 grama.', 20, 68);

  // Box 1: Na Panela
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 78, 170, 48, 4, 4, 'F');
  doc.setDrawColor(230, 225, 218);
  doc.roundedRect(20, 78, 170, 48, 4, 4, 'S');

  doc.setFillColor(245, 242, 235);
  doc.roundedRect(28, 88, 12, 12, 3, 3, 'F');
  doc.setTextColor(28, 46, 36);
  doc.setFontSize(9);
  doc.setFont('times', 'bold');
  doc.text('1', 34, 96, { align: 'center' });

  doc.setTextColor(28, 46, 36);
  doc.setFontSize(13);
  doc.setFont('times', 'bold');
  doc.text('Na panela', 46, 96);

  doc.setTextColor(70, 85, 75);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Aqueça 200 ml de leite vegetal ou água em fogo baixo.\nJunte 15 g de Gotas e mexa até derreter por completo\n— sem deixar ferver.', 46, 106);

  // Box 2: No Espumador ou Mixer
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 134, 170, 48, 4, 4, 'F');
  doc.roundedRect(20, 134, 170, 48, 4, 4, 'S');

  doc.setFillColor(245, 242, 235);
  doc.roundedRect(28, 144, 12, 12, 3, 3, 'F');
  doc.setTextColor(28, 46, 36);
  doc.setFontSize(9);
  doc.setFont('times', 'bold');
  doc.text('2', 34, 152, { align: 'center' });

  doc.setTextColor(28, 46, 36);
  doc.setFontSize(13);
  doc.setFont('times', 'bold');
  doc.text('No espumador ou mixer', 46, 152);

  doc.setTextColor(70, 85, 75);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Gotas e líquido bem quente no copo.\nBata até ficar aveludado, com uma camada de espuma.\nO jeito mais cremoso.', 46, 162);

  // Box 3: Direto na Xícara
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 190, 170, 48, 4, 4, 'F');
  doc.roundedRect(20, 190, 170, 48, 4, 4, 'S');

  doc.setFillColor(245, 242, 235);
  doc.roundedRect(28, 200, 12, 12, 3, 3, 'F');
  doc.setTextColor(28, 46, 36);
  doc.setFontSize(9);
  doc.setFont('times', 'bold');
  doc.text('3', 34, 208, { align: 'center' });

  doc.setTextColor(28, 46, 36);
  doc.setFontSize(13);
  doc.setFont('times', 'bold');
  doc.text('Direto na xícara', 46, 208);

  doc.setTextColor(70, 85, 75);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Gotas no fundo da xícara, despeje o líquido bem quente\ne mexa até dissolver.\nO jeito mais simples — e o das fotos da próxima página.', 46, 218);

  // Footer
  doc.setTextColor(150, 160, 155);
  doc.setFontSize(8);
  doc.text('seracacau.com.br', 20, 275);
  doc.text('@Sera.Cacau.Brasil', 190, 275, { align: 'right' });

  // PAGE 2
  doc.addPage('a4', 'portrait');
  doc.setFillColor(248, 246, 241);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('PASSO A PASSO', 20, 25);

  doc.setTextColor(28, 46, 36);
  doc.setFontSize(24);
  doc.setFont('times', 'bold');
  doc.text('O jeito mais simples, em 3 passos', 20, 36);

  doc.setTextColor(110, 125, 115);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Quente no friozinho, gelada no calor — é sempre assim.', 20, 46);

  // 3 Mini Cards
  const cW = 52;
  const cH = 75;

  // Step 1
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 58, cW, cH, 3, 3, 'F');
  doc.setDrawColor(230, 225, 218);
  doc.roundedRect(20, 58, cW, cH, 3, 3, 'S');

  doc.setFillColor(60, 95, 75);
  doc.circle(30, 70, 5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('1', 30, 72.5, { align: 'center' });

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8);
  doc.text('A base', 40, 72);

  doc.setTextColor(60, 75, 65);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('200 ml de leite vegetal ou\nágua — quente ou gelada,\ncomo o dia pedir.', 25, 90);

  // Step 2
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(79, 58, cW, cH, 3, 3, 'F');
  doc.roundedRect(79, 58, cW, cH, 3, 3, 'S');

  doc.setFillColor(60, 95, 75);
  doc.circle(89, 70, 5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('2', 89, 72.5, { align: 'center' });

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8);
  doc.text('As gotas', 99, 72);

  doc.setTextColor(60, 75, 65);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('15 g de Gotas direto no copo.\n\nLembra: 1 gota = 1 grama.', 84, 90);

  // Step 3
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(138, 58, cW, cH, 3, 3, 'F');
  doc.roundedRect(138, 58, cW, cH, 3, 3, 'S');

  doc.setFillColor(60, 95, 75);
  doc.circle(148, 70, 5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('3', 148, 72.5, { align: 'center' });

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(8);
  doc.text('Misturar', 158, 72);

  doc.setTextColor(60, 75, 65);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Mexa até dissolver.\nNo espumador ou mixer,\nfica aveludado.', 143, 90);

  // Big Banner "VÍDEO DE PREPARO"
  doc.setFillColor(28, 46, 36);
  doc.roundedRect(20, 148, 170, 50, 4, 4, 'F');

  doc.setTextColor(198, 165, 106);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('VÍDEO DE PREPARO', 32, 162);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'normal');
  doc.text('A Luna gravou um vídeo mostrando o preparo passo a passo.\nAssista antes da sua primeira xícara — está aqui na nossa comunidade.', 32, 175);

  // Decorative closing
  doc.setTextColor(198, 165, 106);
  doc.setFontSize(14);
  doc.setFont('times', 'italic');
  doc.text('Da floresta. De verdade.', 20, 235);

  // Footer
  doc.setTextColor(150, 160, 155);
  doc.setFontSize(8);
  doc.text('seracacau.com.br', 20, 275);
  doc.text('@Sera.Cacau.Brasil', 190, 275, { align: 'right' });

  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(path.join(process.cwd(), 'public', 'Sera_Cacau_Guia_de_Preparo.pdf'), buffer);
  console.log('Generated Sera_Cacau_Guia_de_Preparo.pdf');
}

generateListaComprasPDF();
generateGuiaPreparoPDF();
