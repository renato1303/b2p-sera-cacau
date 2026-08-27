import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

// Common styling helper
function setupHeaderFooter(doc, title, subtitle, pageNum, totalPages) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background light neutral
  doc.setFillColor(248, 246, 241);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top header banner if page 1
  if (pageNum === 1) {
    doc.setFillColor(28, 46, 36);
    doc.roundedRect(15, 12, pageWidth - 30, 32, 3, 3, 'F');

    doc.setTextColor(198, 165, 106);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text('FICHA TÉCNICA · PRODUTO', 22, 21);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('times', 'bold');
    doc.text(title, 22, 30);

    doc.setTextColor(214, 223, 215);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.text(subtitle, 22, 37);

    doc.setTextColor(198, 165, 106);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.text('SERÁ CACAU · SERRA GRANDE, COSTA DO CACAU, BAHIA · VERSÃO 1.0 · AGOSTO DE 2026', 22, 42);
  } else {
    // Header for subsequent pages
    doc.setFillColor(28, 46, 36);
    doc.roundedRect(15, 12, pageWidth - 30, 14, 2, 2, 'F');

    doc.setTextColor(198, 165, 106);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text(`SERÁ CACAU  ·  ${title.toUpperCase()}`, 22, 21);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text('FICHA TÉCNICA DE PRODUTO CONTROLADA', pageWidth - 22, 21, { align: 'right' });
  }

  // Footer
  doc.setTextColor(140, 150, 145);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('SERACACAU.COM.BR · @SERA.CACAU.BRASIL', 15, pageHeight - 8);
  doc.text(`${pageNum}/${totalPages}`, pageWidth - 15, pageHeight - 8, { align: 'right' });
}

function drawSectionCard(doc, x, y, w, h, titleTag, titleMain) {
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(x, y, w, h, 3, 3, 'F');
  doc.setDrawColor(228, 224, 216);
  doc.setLineWidth(0.3);
  doc.roundedRect(x, y, w, h, 3, 3, 'S');

  let curY = y + 8;
  if (titleTag) {
    doc.setTextColor(198, 165, 106);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(titleTag.toUpperCase(), x + 8, curY);
    curY += 5;
  }
  if (titleMain) {
    doc.setTextColor(28, 46, 36);
    doc.setFontSize(12);
    doc.setFont('times', 'bold');
    doc.text(titleMain, x + 8, curY);
    curY += 6;
  }
  return curY;
}

// ----------------------------------------------------
// 1. FICHA TÉCNICA: CACAU 100% ORGÂNICO (5 Páginas)
// ----------------------------------------------------
export function generateFTCacau100() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pw = 210;

  // PAGE 1
  setupHeaderFooter(doc, 'Cacau 100 % orgânico', 'Massa de cacau · gotas, barra e disco', 1, 5);
  
  // IDENTIFICAÇÃO - O produto
  let y = 48;
  drawSectionCard(doc, 15, y, 180, 72, 'Identificação', 'O produto');
  doc.setFontSize(8);
  doc.setTextColor(100, 110, 105);
  doc.setFont('helvetica', 'bold');
  const idRows = [
    ['DENOMINAÇÃO DE VENDA', 'Massa de cacau orgânica — cacau 100 %'],
    ['MARCA · LINHA', 'Será Cacau — Cacau para beber'],
    ['APRESENTAÇÕES', 'Gotas 105 g · 210 g · 420 g · 1 kg · Barra · Disco — pesos e EAN a confirmar'],
    ['CÓDIGO EAN', '— · a confirmar por apresentação'],
    ['CATEGORIA', 'Produto de cacau — RDC 264/2005']
  ];
  let ry = y + 21;
  idRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(val, 70, ry);
    ry += 7.5;
  });
  doc.setFontSize(7.5);
  doc.setTextColor(100, 115, 105);
  doc.setFont('helvetica', 'italic');
  doc.text('1 gota = 1 grama. A dosagem do produto é comunicada em gotas para facilitar o preparo doméstico e a orientação nutricional.', 23, y + 66);

  // DESCRIÇÃO - Cacau puro, nada adicionado
  y = 124;
  drawSectionCard(doc, 15, y, 180, 72, 'Descrição', 'Cacau puro, nada adicionado');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 50, 45);
  doc.text('Massa de cacau orgânica obtida da amêndoa fermentada, seca,\ntorrada e moída. Sem açúcar, sem leite, sem lecitina, sem\naromatizantes.', 23, y + 23);
  doc.text('Cacau de origem única, cultivado no sistema Cabruca sob a Mata Atlântica do\nsul da Bahia. Destinado ao preparo de cacau para beber e a aplicações\nculinárias que exigem cacau puro.', 23, y + 42);

  // PAGE 2
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Cacau 100 % orgânico', '', 2, 5);

  // COMPOSIÇÃO - Ingredientes e alergênicos
  y = 30;
  drawSectionCard(doc, 15, y, 180, 68, 'Composição', 'Ingredientes e alergênicos');
  const compRows = [
    ['INGREDIENTES', 'Massa de cacau orgânica (100 %)'],
    ['MANTEIGA DE CACAU ADICIONADA', '— · a confirmar por apresentação'],
    ['ADITIVOS', 'Não contém'],
    ['GLÚTEN', 'Não contém glúten'],
    ['LACTOSE', 'Não contém lactose'],
    ['ALÉRGICOS', '— · a confirmar: declaração do fabricante sobre processamento na mesma linha de leite, castanhas, amendoim e soja'],
    ['ORIGEM VEGETAL', 'Produto 100 % vegetal — vegano']
  ];
  ry = y + 21;
  compRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 110), 75, ry);
    ry += 6.5;
  });

  // CARACTERÍSTICAS ORGANOLÉPTICAS
  y = 102;
  drawSectionCard(doc, 15, y, 180, 42, 'Características Organolépticas', 'Aspecto, odor e sabor');
  const organoRows = [
    ['ASPECTO', 'Gotas de coloração marrom-escura, superfície homogênea'],
    ['ODOR', 'Característico de cacau'],
    ['SABOR', 'Característico, amargo intenso, sem adstringência agressiva'],
    ['COR', 'Marrom-escuro uniforme']
  ];
  ry = y + 21;
  organoRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(val, 60, ry);
    ry += 5;
  });

  // CARACTERÍSTICAS FÍSICO-QUÍMICAS
  y = 148;
  drawSectionCard(doc, 15, y, 180, 134, 'Características Físico-Químicas', 'Valores analíticos');
  const fqHeader = ['PARÂMETRO', 'RESULTADO', 'UNIDADE', 'METODOLOGIA'];
  const fqRows = [
    ['Umidade', '1,7', 'g/100 g', 'Gravimetria'],
    ['Matéria seca', '98,3', 'g/100 g', 'Gravimetria'],
    ['Gordura total (manteiga de cacau)', '56,6', 'g/100 g', 'Gravimetria'],
    ['Cinzas', '2,2', 'g/100 g', 'Gravimetria'],
    ['Proteína (N × 6,25)', '13,6', 'g/100 g', 'Dumas'],
    ['Cádmio', '0,16', 'mg/kg', 'ICP-MS'],
    ['Níquel', '7,0', 'mg/kg', 'ICP-MS'],
    ['Granulometria (finura)', '— · a confirmar', 'µm', '—'],
    ['Ponto de fusão', '— · a confirmar', '°C', '—'],
    ['Teobromina · cafeína', '— · a confirmar', 'mg/100 g', '—']
  ];
  // Table Header
  doc.setFillColor(245, 242, 236);
  doc.rect(23, y + 20, 164, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 105);
  doc.text('PARÂMETRO', 25, y + 24);
  doc.text('RESULTADO', 90, y + 24);
  doc.text('UNIDADE', 125, y + 24);
  doc.text('METODOLOGIA', 155, y + 24);

  ry = y + 31;
  fqRows.forEach(([p, r, u, m]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 50, 45);
    doc.text(p, 25, ry);
    doc.text(r, 90, ry);
    doc.text(u, 125, ry);
    doc.text(m, 155, ry);
    doc.setDrawColor(240, 238, 232);
    doc.line(23, ry + 2, 187, ry + 2);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text(doc.splitTextToSize('Valores conforme laudo do BAV Institut GmbH, Offenburg — amostra 24129042C, Bio-Kakao, origem Brasil, emitido em 03.01.2025. O teor de cádmio está abaixo do limite de 0,80 mg/kg aplicável a produtos de cacau com teor de sólidos igual ou superior a 50 % no mercado europeu.', 164), 23, y + 107);

  // PAGE 3
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Cacau 100 % orgânico', '', 3, 5);

  // CARACTERÍSTICAS MICROBIOLÓGICAS
  y = 30;
  drawSectionCard(doc, 15, y, 180, 60, 'Características Microbiológicas', 'Parâmetros e limites');
  doc.setFillColor(245, 242, 236);
  doc.rect(23, y + 20, 164, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 105);
  doc.text('PARÂMETRO', 25, y + 24);
  doc.text('RESULTADO', 85, y + 24);
  doc.text('LIMITE DE REFERÊNCIA', 115, y + 24);
  doc.text('METODOLOGIA', 155, y + 24);

  const microRows = [
    ['Coliformes termotolerantes (45 °C)', '— · a confirmar', 'IN 60/2019 — ANVISA', 'MAPA IN 62/2003'],
    ['Salmonella sp. em 25 g', '— · a confirmar', 'Ausência', 'AFNOR BIO 12/16-09/05 VIDAS'],
    ['Bolores e leveduras', '— · a confirmar', 'IN 60/2019 — ANVISA', 'ISO 21527-2']
  ];
  ry = y + 31;
  microRows.forEach(([p, r, l, m]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 50, 45);
    doc.text(p, 25, ry);
    doc.text(r, 85, ry);
    doc.text(l, 115, ry);
    doc.text(m, 155, ry);
    doc.setDrawColor(240, 238, 232);
    doc.line(23, ry + 2, 187, ry + 2);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('Referência normativa vigente: IN 60/2019, que substituiu a RDC 12/2001. Os resultados são preenchidos a cada lote a partir do laudo do laboratório.', 23, y + 54);

  // INFORMAÇÃO NUTRICIONAL
  y = 96;
  drawSectionCard(doc, 15, y, 180, 160, 'Informação Nutricional', 'Por 100 g e por porção de 10 g');
  doc.setFillColor(245, 242, 236);
  doc.rect(23, y + 20, 164, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 105);
  doc.text('100 G', 90, y + 24);
  doc.text('PORÇÃO 10 G (10 GOTAS)', 120, y + 24);
  doc.text('%VD POR PORÇÃO', 160, y + 24);

  const nutRows = [
    ['Valor energético', '637 kcal · 2.629 kJ', '64 kcal · 263 kJ', '3 %'],
    ['Carboidratos totais', '10,7 g', '1,1 g', '0 %'],
    ['  Açúcares totais', '1,2 g', '0,1 g', '—'],
    ['  Açúcares adicionados', '0 g', '0 g', '0 %'],
    ['Proteínas', '13,6 g', '1,4 g', '3 %'],
    ['Gorduras totais', '56,6 g', '5,7 g', '10 %'],
    ['  Gorduras saturadas', '35,0 g', '3,5 g', '16 %'],
    ['  Gorduras trans', 'menos de 0,1 g', '0 g', '—'],
    ['Fibra alimentar', '15,2 g', '1,5 g', '6 %'],
    ['Sódio', '— · a confirmar', '— · a confirmar', '—']
  ];
  ry = y + 31;
  nutRows.forEach(([n, c1, c2, vd]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 50, 45);
    doc.text(n, 25, ry);
    doc.text(c1, 90, ry);
    doc.text(c2, 120, ry);
    doc.text(vd, 160, ry);
    doc.setDrawColor(240, 238, 232);
    doc.line(23, ry + 2, 187, ry + 2);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text(doc.splitTextToSize('Percentuais de valores diários com base em dieta de 2.000 kcal, conforme RDC 429/2020 e IN 75/2020. Valores calculados a partir do laudo bromatológico BAV Institut 24129042C. O layout final da tabela para rotulagem deve ser validado pelo responsável técnico, incluindo a avaliação da rotulagem nutricional frontal.', 164), 23, y + 107);

  // PAGE 4
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Cacau 100 % orgânico', '', 4, 5);

  // APLICAÇÃO
  y = 30;
  drawSectionCard(doc, 15, y, 180, 85, 'Aplicação', 'Para a prática clínica e para a xícara do dia a dia');
  const appBullets = [
    '• Porção usual: 10 g (10 gotas) por xícara de 200 ml. Preparo mais encorpado: 15 a 20 g.',
    '• Preparo: aquecer o líquido até no máximo 60 °C, sem ferver, dissolver as gotas mexendo e emulsionar por 30 segundos no espumador ou mixer.',
    '• Bases: água, leite integral, bebidas vegetais de aveia, castanha ou coco.',
    '• Combinações: canela, cardamomo, gengibre, baunilha, pitada de sal marinho.',
    '• Substituição do café no ritual matinal ou no meio da tarde — teobromina como estimulante natural suave, sem o pico e a queda da cafeína.',
    '• Aplicações culinárias: ganache sem açúcar, mousse, massas de bolo, molhos escuros salgados.',
    '• Sem açúcar, sem adoçantes e sem aditivos — compatível com planos de baixo carboidrato, veganos e sem lactose.'
  ];
  ry = y + 21;
  appBullets.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(50, 60, 55);
    const lines = doc.splitTextToSize(b, 164);
    doc.text(lines, 23, ry);
    ry += (lines.length * 4) + 2;
  });
  doc.setFontSize(6.5);
  doc.setTextColor(120, 130, 125);
  doc.text('Este documento é técnico e descritivo. Ele não acompanha alegação de propriedade funcional ou de saúde. Qualquer alegação depende de substanciação laboratorial e de enquadramento regulatório específico.', 23, y + 78);

  // VALIDADE, ARMAZENAMENTO E EMBALAGEM
  y = 120;
  drawSectionCard(doc, 15, y, 180, 55, 'Validade, Armazenamento e Embalagem', 'Conservação e logística');
  const valRows = [
    ['PRAZO DE VALIDADE', '12 meses a partir da data de fabricação'],
    ['TEMPERATURA DE ARMAZENAMENTO', '18 a 22 °C'],
    ['UMIDADE RELATIVA MÁXIMA', '65 %'],
    ['CONDIÇÕES', 'Ao abrigo da luz, do calor e de odores fortes. Não refrigerar.'],
    ['EMBALAGEM PRIMÁRIA', 'Vidro com tampa para as gotas · papel reciclado para barras e discos'],
    ['DIMENSÕES E PESO BRUTO', '— · a confirmar por apresentação'],
    ['EMBALAGEM SECUNDÁRIA', '— · a confirmar (unidades por caixa, dimensões, peso)']
  ];
  ry = y + 21;
  valRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(val, 78, ry);
    ry += 4.6;
  });

  // ORIGEM E CERTIFICAÇÃO (Dark card)
  y = 180;
  doc.setFillColor(28, 46, 36);
  doc.roundedRect(15, y, 180, 55, 3, 3, 'F');
  doc.setTextColor(198, 165, 106);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('ORIGEM E CERTIFICAÇÃO', 23, y + 9);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('times', 'bold');
  doc.text('Cabruca, Mata Atlântica', 23, y + 16);

  const origRows = [
    ['ORIGEM', 'Serra Grande, Costa do Cacau, Bahia — Mata Atlântica'],
    ['SISTEMA DE CULTIVO', 'Cabruca — sistema agroflorestal sob o dossel da floresta nativa, sem desmatamento e sem monocultura'],
    ['CERTIFICAÇÃO ORGÂNICA', 'IBD Certificações — www.ibd.com.br'],
    ['Nº DO CERTIFICADO · VALIDADE', '— · a confirmar'],
    ['CADEIA', 'Tree-to-bar — cultivo, beneficiamento e embalagem na mesma região']
  ];
  ry = y + 23;
  origRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(198, 165, 106);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(225, 235, 230);
    doc.text(doc.splitTextToSize(val, 110), 75, ry);
    ry += 6;
  });

  // PAGE 5
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Cacau 100 % orgânico', '', 5, 5);

  // FABRICAÇÃO - Responsáveis
  y = 30;
  drawSectionCard(doc, 15, y, 180, 65, 'Fabricação', 'Responsáveis');
  const fabRows = [
    ['FABRICANTE', 'Cabruca — Cooperativa dos Produtores Orgânicos do Sul da Bahia'],
    ['CNPJ · IE', '04.293.272/0001-88 · 55.657.534-NO'],
    ['ENDEREÇO', 'Av. Nossa Senhora da Aparecida 2038, Nossa Senhora da Vitória — 45655-506 Ilhéus, Bahia, Brasil'],
    ['DISTRIBUÍDO POR', 'Será Cacau Ltda — Serra Grande, Uruçuca, Bahia · seracacau.com.br'],
    ['REGISTRO NA ANVISA', '— · a confirmar (isenção de registro a validar com o responsável técnico)'],
    ['RESPONSÁVEL TÉCNICO', '— · a confirmar (nome, formação e número de registro)']
  ];
  ry = y + 21;
  fabRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 115), 65, ry);
    ry += 6.5;
  });

  // CONTROLE DO DOCUMENTO
  y = 102;
  drawSectionCard(doc, 15, y, 180, 65, 'Controle do Documento', 'Versão e campos em validação');
  const docRows = [
    ['VERSÃO · DATA', '1.0 · agosto de 2026'],
    ['ELABORADO POR', 'Será Cacau — área técnica'],
    ['CAMPOS EM ABERTO', 'Alergênicos · granulometria · ponto de fusão · teobromina e cafeína · sódio · microbiologia · EAN · dimensões · certificado IBD · responsável técnico'],
    ['PRÓXIMA REVISÃO', 'Após a emissão dos laudos laboratoriais do lote vigente']
  ];
  ry = y + 21;
  docRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 115), 65, ry);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('Esta ficha técnica é um documento controlado. Os campos marcados em destaque aguardam laudo laboratorial ou confirmação documental e serão preenchidos na próxima versão. Nenhum valor foi estimado.', 23, y + 56);

  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(path.join(process.cwd(), 'public', 'Ficha_Tecnica_Cacau_100_Organico.pdf'), buffer);
  console.log('Generated Ficha_Tecnica_Cacau_100_Organico.pdf');
}

// ----------------------------------------------------
// 2. FICHA TÉCNICA: CHÁ DA CASCA DE CACAU (5 Páginas)
// ----------------------------------------------------
export function generateFTChaCasca() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // PAGE 1
  setupHeaderFooter(doc, 'Chá da Casca de Cacau', 'Casca da amêndoa de cacau orgânico, desidratada', 1, 5);

  let y = 48;
  drawSectionCard(doc, 15, y, 180, 72, 'Identificação', 'O produto');
  const idRows = [
    ['DENOMINAÇÃO DE VENDA', '— · a confirmar — a designação legal depende do enquadramento do produto como chá ou como infusão'],
    ['NOME COMERCIAL', 'Chá da Casca de Cacau'],
    ['MARCA · LINHA', 'Será Cacau — Cacau para beber'],
    ['APRESENTAÇÕES', '— · a confirmar (pesos e apresentações)'],
    ['CÓDIGO EAN', '— · a confirmar por apresentação'],
    ['PARTE VEGETAL UTILIZADA', 'Tegumento (casca) da amêndoa de Theobroma cacao L.']
  ];
  let ry = y + 21;
  idRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 110), 72, ry);
    ry += 6.5;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(100, 115, 105);
  doc.setFont('helvetica', 'italic');
  doc.text('O enquadramento regulatório da casca de cacau para infusão está em validação com assessoria de assuntos regulatórios. A denominação de venda será fixada antes da impressão do rótulo.', 23, y + 66);

  y = 124;
  drawSectionCard(doc, 15, y, 180, 72, 'Descrição', 'O que sobra da amêndoa — e não devia sobrar');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 50, 45);
  doc.text('Casca da amêndoa de cacau orgânico, separada após a torra e\ndesidratada. Infusão de cor âmbar, aroma de cacau e doçura natural,\nsem amargor pronunciado.', 23, y + 23);
  doc.text('Subproduto do beneficiamento do cacau que passa a ser produto:\naproveitamento integral da amêndoa, na mesma cadeia curta e no mesmo\nsistema Cabruca.', 23, y + 42);

  // PAGE 2
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Chá da Casca de Cacau', '', 2, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 68, 'Composição', 'Ingredientes e alergênicos');
  const compRows = [
    ['INGREDIENTES', 'Casca de cacau orgânico (100 %)'],
    ['ADITIVOS', 'Não contém'],
    ['GLÚTEN', 'Não contém glúten'],
    ['LACTOSE', 'Não contém lactose'],
    ['ALÉRGICOS', '— · a confirmar: declaração do fabricante sobre processamento na mesma linha de leite, castanhas, amendoim e soja'],
    ['ORIGEM VEGETAL', 'Produto 100 % vegetal — vegano']
  ];
  ry = y + 21;
  compRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 110), 75, ry);
    ry += 6.5;
  });

  y = 102;
  drawSectionCard(doc, 15, y, 180, 42, 'Características Organolépticas', 'Aspecto, odor e sabor');
  const organoRows = [
    ['ASPECTO', 'Fragmentos leves de casca, coloração marrom-clara a avermelhada'],
    ['ODOR', 'Característico de cacau, adocicado'],
    ['SABOR DA INFUSÃO', 'Suave, notas de cacau e frutas secas, doçura natural, baixo amargor'],
    ['COR DA INFUSÃO', 'Âmbar claro']
  ];
  ry = y + 21;
  organoRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(val, 60, ry);
    ry += 5;
  });

  y = 148;
  drawSectionCard(doc, 15, y, 180, 134, 'Características Físico-Químicas', 'Valores analíticos');
  const fqRows = [
    ['Umidade', '— · a confirmar', 'g/100 g', 'Gravimetria'],
    ['Atividade de água', '— · a confirmar', 'aw', '—'],
    ['Cinzas', '— · a confirmar', 'g/100 g', 'Gravimetria'],
    ['Fibra alimentar total', '— · a confirmar', 'g/100 g', 'Gravimetria'],
    ['Teobromina', '— · a confirmar', 'mg/100 g', 'HPLC'],
    ['Cafeína', '— · a confirmar', 'mg/100 g', 'HPLC'],
    ['Cádmio', '— · a confirmar', 'mg/kg', 'ICP-MS'],
    ['Granulometria', '— · a confirmar', 'mm', 'Peneiramento']
  ];
  doc.setFillColor(245, 242, 236);
  doc.rect(23, y + 20, 164, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 105);
  doc.text('PARÂMETRO', 25, y + 24);
  doc.text('RESULTADO', 90, y + 24);
  doc.text('UNIDADE', 125, y + 24);
  doc.text('METODOLOGIA', 155, y + 24);

  ry = y + 31;
  fqRows.forEach(([p, r, u, m]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 50, 45);
    doc.text(p, 25, ry);
    doc.text(r, 90, ry);
    doc.text(u, 125, ry);
    doc.text(m, 155, ry);
    doc.setDrawColor(240, 238, 232);
    doc.line(23, ry + 2, 187, ry + 2);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('A análise de cádmio deve ser feita na casca, e não na amêndoa: os teores diferem de forma relevante entre as duas frações. Ensaio obrigatório para exportação.', 23, y + 95);

  // PAGE 3
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Chá da Casca de Cacau', '', 3, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 65, 'Características Microbiológicas', 'Parâmetros e limites');
  doc.setFillColor(245, 242, 236);
  doc.rect(23, y + 20, 164, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 105);
  doc.text('PARÂMETRO', 25, y + 24);
  doc.text('RESULTADO', 85, y + 24);
  doc.text('LIMITE DE REFERÊNCIA', 115, y + 24);
  doc.text('METODOLOGIA', 155, y + 24);

  const microRows = [
    ['Coliformes termotolerantes (45 °C)', '— · a confirmar', 'IN 60/2019 — ANVISA', 'MAPA IN 62/2003'],
    ['Salmonella sp. em 25 g', '— · a confirmar', 'Ausência', 'AFNOR BIO 12/16-09/05 VIDAS'],
    ['Bolores e leveduras', '— · a confirmar', 'IN 60/2019 — ANVISA', 'ISO 21527-2'],
    ['Bacillus cereus', '— · a confirmar', 'IN 60/2019 — ANVISA', 'ISO 7932']
  ];
  ry = y + 31;
  microRows.forEach(([p, r, l, m]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 50, 45);
    doc.text(p, 25, ry);
    doc.text(r, 85, ry);
    doc.text(l, 115, ry);
    doc.text(m, 155, ry);
    doc.setDrawColor(240, 238, 232);
    doc.line(23, ry + 2, 187, ry + 2);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('Referência normativa vigente: IN 60/2019, que substituiu a RDC 12/2001. Os resultados são preenchidos a cada lote a partir do laudo do laboratório.', 23, y + 59);

  // INFORMAÇÃO NUTRICIONAL
  y = 100;
  drawSectionCard(doc, 15, y, 180, 45, 'Informação Nutricional', 'Declaração');
  const nutDecRows = [
    ['SITUAÇÃO', '— · a confirmar — produtos destinados exclusivamente ao preparo de infusão podem estar dispensados da declaração nutricional'],
    ['BASE NORMATIVA', 'RDC 429/2020 e IN 75/2020 — enquadramento a validar com o responsável técnico'],
    ['SE APLICÁVEL', 'Tabela por 100 ml de infusão pronta, a partir de laudo bromatológico próprio']
  ];
  ry = y + 21;
  nutDecRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 115), 65, ry);
    ry += 6.5;
  });

  // APLICAÇÃO
  y = 150;
  drawSectionCard(doc, 15, y, 180, 95, 'Aplicação', 'Modo de preparo e uso');
  const appCasca = [
    '• Proporção: 5 g (uma colher de sopa cheia) para 250 ml de água.',
    '• Temperatura da água: 90 a 95 °C.',
    '• Infusão: 5 a 8 minutos, com a xícara tampada. Coar antes de servir.',
    '• Segunda infusão: a mesma casca aceita uma segunda extração, com corpo mais leve.',
    '• Frio: infusão a frio por 8 a 12 horas na geladeira, servida com gelo e casca de laranja.',
    '• Com leite ou bebida vegetal: infundir diretamente no líquido aquecido a 90 °C por 8 minutos.',
    '• Uso na cozinha: como líquido de cocção para arroz, caldos escuros e caldas de fruta.',
    '• Bebida sem açúcar e sem calorias relevantes — alternativa ao café no fim do dia.',
    '• Teobromina e cafeína estão naturalmente presentes na casca. Os teores exatos serão informados após o laudo.'
  ];
  ry = y + 21;
  appCasca.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(50, 60, 55);
    doc.text(b, 23, ry);
    ry += 6;
  });

  // PAGE 4
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Chá da Casca de Cacau', '', 4, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 55, 'Validade, Armazenamento e Embalagem', 'Conservação e logística');
  const valCasca = [
    ['PRAZO DE VALIDADE', '— · a confirmar'],
    ['TEMPERATURA DE ARMAZENAMENTO', 'Ambiente, até 25 °C'],
    ['CONDIÇÕES', 'Ao abrigo da luz e da umidade, em embalagem bem fechada.'],
    ['EMBALAGEM PRIMÁRIA', '— · a confirmar'],
    ['DIMENSÕES E PESO BRUTO', '— · a confirmar'],
    ['EMBALAGEM SECUNDÁRIA', '— · a confirmar (unidades por caixa, dimensões, peso)']
  ];
  ry = y + 21;
  valCasca.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(val, 78, ry);
    ry += 4.6;
  });

  y = 90;
  doc.setFillColor(28, 46, 36);
  doc.roundedRect(15, y, 180, 55, 3, 3, 'F');
  doc.setTextColor(198, 165, 106);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('ORIGEM E CERTIFICAÇÃO', 23, y + 9);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('times', 'bold');
  doc.text('Cabruca, Mata Atlântica', 23, y + 16);

  const origCasca = [
    ['ORIGEM', 'Serra Grande, Costa do Cacau, Bahia — Mata Atlântica'],
    ['SISTEMA DE CULTIVO', 'Cabruca — sistema agroflorestal sob o dossel da floresta nativa, sem desmatamento e sem monocultura'],
    ['CERTIFICAÇÃO ORGÂNICA', 'IBD Certificações — www.ibd.com.br'],
    ['Nº DO CERTIFICADO · VALIDADE', '— · a confirmar'],
    ['CADEIA', 'Tree-to-bar — cultivo, beneficiamento e embalagem na mesma região']
  ];
  ry = y + 23;
  origCasca.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(198, 165, 106);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(225, 235, 230);
    doc.text(doc.splitTextToSize(val, 110), 75, ry);
    ry += 6;
  });

  y = 150;
  drawSectionCard(doc, 15, y, 180, 65, 'Fabricação', 'Responsáveis');
  const fabCasca = [
    ['FABRICANTE', 'Cabruca — Cooperativa dos Produtores Orgânicos do Sul da Bahia'],
    ['CNPJ · IE', '04.293.272/0001-88 · 55.657.534-NO'],
    ['ENDEREÇO', 'Av. Nossa Senhora da Aparecida 2038, Nossa Senhora da Vitória — 45655-506 Ilhéus, Bahia, Brasil'],
    ['DISTRIBUÍDO POR', 'Será Cacau Ltda — Serra Grande, Uruçuca, Bahia · seracacau.com.br'],
    ['REGISTRO NA ANVISA', '— · a confirmar (isenção de registro a validar com o responsável técnico)'],
    ['RESPONSÁVEL TÉCNICO', '— · a confirmar (nome, formação e número de registro)']
  ];
  ry = y + 21;
  fabCasca.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 115), 65, ry);
    ry += 6.5;
  });

  // PAGE 5
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Chá da Casca de Cacau', '', 5, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 65, 'Controle do Documento', 'Versão e campos em validação');
  const docCasca = [
    ['VERSÃO · DATA', '1.0 · agosto de 2026'],
    ['ELABORADO POR', 'Será Cacau — área técnica'],
    ['CAMPOS EM ABERTO', 'Denominação legal · composição · teobromina e cafeína · cádmio · alergênicos · microbiologia · validade · embalagem · EAN · certificado IBD · responsável técnico'],
    ['PRÓXIMA REVISÃO', 'Após a emissão dos laudos laboratoriais do lote vigente']
  ];
  ry = y + 21;
  docCasca.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 115), 65, ry);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('Esta ficha técnica é um documento controlado. Os campos marcados em destaque aguardam laudo laboratorial ou confirmação documental e serão preenchidos na próxima versão. Nenhum valor foi estimado.', 23, y + 56);

  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(path.join(process.cwd(), 'public', 'Ficha_Tecnica_Cha_da_Casca_de_Cacau.pdf'), buffer);
  console.log('Generated Ficha_Tecnica_Cha_da_Casca_de_Cacau.pdf');
}

// ----------------------------------------------------
// 3. FICHA TÉCNICA: NIBS DE CACAU ORGÂNICO (5 Páginas)
// ----------------------------------------------------
export function generateFTNibs() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // PAGE 1
  setupHeaderFooter(doc, 'Nibs de cacau orgânico', 'Amêndoas torradas, descascadas e quebradas', 1, 5);

  let y = 48;
  drawSectionCard(doc, 15, y, 180, 72, 'Identificação', 'O produto');
  const idRows = [
    ['DENOMINAÇÃO DE VENDA', 'Nibs de cacau orgânico'],
    ['MARCA · LINHA', 'Será Cacau — Cacau para comer'],
    ['APRESENTAÇÕES', '— · a confirmar (pesos e apresentações)'],
    ['CÓDIGO EAN', '— · a confirmar por apresentação'],
    ['CATEGORIA', 'Produto de cacau — RDC 264/2005']
  ];
  let ry = y + 21;
  idRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(val, 70, ry);
    ry += 7.5;
  });

  y = 124;
  drawSectionCard(doc, 15, y, 180, 72, 'Descrição', 'A amêndoa inteira, quebrada');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 50, 45);
  doc.text('Amêndoas de cacau orgânico fermentadas, secas, torradas,\ndescascadas e quebradas em pedaços irregulares. Nada além do\ncacau.', 23, y + 23);
  doc.text('Textura crocante, sem açúcar e sem gordura adicionada. Aplicação em\npreparações doces e salgadas, como componente de textura e de sabor\namargo estruturante.', 23, y + 42);

  // PAGE 2
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Nibs de cacau orgânico', '', 2, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 68, 'Composição', 'Ingredientes e alergênicos');
  const compRows = [
    ['INGREDIENTES', 'Amêndoas de cacau orgânico (100 %)'],
    ['ADITIVOS', 'Não contém'],
    ['GLÚTEN', 'Não contém glúten'],
    ['LACTOSE', 'Não contém lactose'],
    ['ALÉRGICOS', '— · a confirmar: declaração do fabricante sobre processamento na mesma linha de leite, castanhas, amendoim e soja'],
    ['ORIGEM VEGETAL', 'Produto 100 % vegetal — vegano']
  ];
  ry = y + 21;
  compRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 110), 75, ry);
    ry += 6.5;
  });

  y = 102;
  drawSectionCard(doc, 15, y, 180, 42, 'Características Organolépticas', 'Aspecto, odor e sabor');
  const organoRows = [
    ['ASPECTO', 'Fragmentos irregulares de coloração marrom, secos e soltos'],
    ['ODOR', 'Característico de cacau torrado'],
    ['SABOR', 'Característico, amargo, com final tostado'],
    ['TEXTURA', 'Crocante, quebradiça']
  ];
  ry = y + 21;
  organoRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(val, 60, ry);
    ry += 5;
  });

  y = 148;
  drawSectionCard(doc, 15, y, 180, 134, 'Características Físico-Químicas', 'Valores analíticos');
  const fqRows = [
    ['Umidade', '— · a confirmar', 'g/100 g', 'Gravimetria'],
    ['Gordura total', '— · a confirmar', 'g/100 g', 'Gravimetria'],
    ['Proteína (N × 6,25)', '— · a confirmar', 'g/100 g', 'Dumas'],
    ['Fibra alimentar total', '— · a confirmar', 'g/100 g', 'Gravimetria'],
    ['Cinzas', '— · a confirmar', 'g/100 g', 'Gravimetria'],
    ['Granulometria', '— · a confirmar', 'mm', 'Peneiramento'],
    ['Grau de torra', '— · a confirmar', '—', '—'],
    ['Cádmio', '— · a confirmar', 'mg/kg', 'ICP-MS']
  ];
  doc.setFillColor(245, 242, 236);
  doc.rect(23, y + 20, 164, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 105);
  doc.text('PARÂMETRO', 25, y + 24);
  doc.text('RESULTADO', 90, y + 24);
  doc.text('UNIDADE', 125, y + 24);
  doc.text('METODOLOGIA', 155, y + 24);

  ry = y + 31;
  fqRows.forEach(([p, r, u, m]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 50, 45);
    doc.text(p, 25, ry);
    doc.text(r, 90, ry);
    doc.text(u, 125, ry);
    doc.text(m, 155, ry);
    doc.setDrawColor(240, 238, 232);
    doc.line(23, ry + 2, 187, ry + 2);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('Os valores da massa de cacau não se aplicam integralmente aos nibs: a composição difere em teor de gordura e de fibra. É necessário laudo bromatológico próprio para este produto.', 23, y + 95);

  // PAGE 3
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Nibs de cacau orgânico', '', 3, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 60, 'Características Microbiológicas', 'Parâmetros e limites');
  doc.setFillColor(245, 242, 236);
  doc.rect(23, y + 20, 164, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 105);
  doc.text('PARÂMETRO', 25, y + 24);
  doc.text('RESULTADO', 85, y + 24);
  doc.text('LIMITE DE REFERÊNCIA', 115, y + 24);
  doc.text('METODOLOGIA', 155, y + 24);

  const microRows = [
    ['Coliformes termotolerantes (45 °C)', '— · a confirmar', 'IN 60/2019 — ANVISA', 'MAPA IN 62/2003'],
    ['Salmonella sp. em 25 g', '— · a confirmar', 'Ausência', 'AFNOR BIO 12/16-09/05 VIDAS'],
    ['Bolores e leveduras', '— · a confirmar', 'IN 60/2019 — ANVISA', 'ISO 21527-2']
  ];
  ry = y + 31;
  microRows.forEach(([p, r, l, m]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 50, 45);
    doc.text(p, 25, ry);
    doc.text(r, 85, ry);
    doc.text(l, 115, ry);
    doc.text(m, 155, ry);
    doc.setDrawColor(240, 238, 232);
    doc.line(23, ry + 2, 187, ry + 2);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('Referência normativa vigente: IN 60/2019, que substituiu a RDC 12/2001. Os resultados são preenchidos a cada lote a partir do laudo do laboratório.', 23, y + 54);

  // INFORMAÇÃO NUTRICIONAL
  y = 96;
  drawSectionCard(doc, 15, y, 180, 80, 'Informação Nutricional', 'Por 100 g e por porção de 10 g');
  doc.setFillColor(245, 242, 236);
  doc.rect(23, y + 20, 164, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 105);
  doc.text('100 G', 90, y + 24);
  doc.text('PORÇÃO 10 G', 125, y + 24);
  doc.text('%VD POR PORÇÃO', 160, y + 24);

  const nutRowsNibs = [
    ['Valor energético', '— · a confirmar', '— · a confirmar', '—'],
    ['Carboidratos totais', '— · a confirmar', '— · a confirmar', '—'],
    ['  Açúcares totais', '— · a confirmar', '— · a confirmar', '—'],
    ['  Açúcares adicionados', '0 g', '0 g', '0 %'],
    ['Proteínas', '— · a confirmar', '— · a confirmar', '—'],
    ['Gorduras totais', '— · a confirmar', '— · a confirmar', '—'],
    ['  Gorduras saturadas', '— · a confirmar', '— · a confirmar', '—'],
    ['  Gorduras trans', '0 g', '0 g', '—'],
    ['Fibra alimentar', '— · a confirmar', '— · a confirmar', '—'],
    ['Sódio', '— · a confirmar', '— · a confirmar', '—']
  ];
  ry = y + 30;
  nutRowsNibs.forEach(([n, c1, c2, vd]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(40, 50, 45);
    doc.text(n, 25, ry);
    doc.text(c1, 90, ry);
    doc.text(c2, 125, ry);
    doc.text(vd, 160, ry);
    doc.setDrawColor(240, 238, 232);
    doc.line(23, ry + 1.5, 187, ry + 1.5);
    ry += 4.5;
  });
  doc.setFontSize(6.5);
  doc.setTextColor(110, 120, 115);
  doc.text('Tabela a ser preenchida com laudo bromatológico específico dos nibs, conforme RDC 429/2020 e IN 75/2020.', 23, y + 76);

  // APLICAÇÃO
  y = 180;
  drawSectionCard(doc, 15, y, 180, 85, 'Aplicação', 'Doce e salgado — as duas direções');
  // 2 columns
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(198, 165, 106);
  doc.text('DOCE', 23, y + 22);
  doc.text('SALGADO', 105, y + 22);

  const doceB = [
    '• Sobre iogurte natural, coalhada ou kefir.',
    '• Com frutas frescas — banana, manga, morango.',
    '• Em granolas, cookies, brownies e barras.',
    '• Triturados sobre sobremesas geladas, no lugar de granulado.'
  ];
  let dy = y + 28;
  doceB.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(50, 60, 55);
    const lines = doc.splitTextToSize(b, 75);
    doc.text(lines, 23, dy);
    dy += (lines.length * 4) + 2;
  });

  const salgadoB = [
    '• Em saladas de folhas amargas com cítricos e azeite.',
    '• Crosta para peixes, frango ou cordeiro, moídos com sal e pimenta.',
    '• Farofa com castanhas, sal e ervas.',
    '• Sobre legumes assados — abóbora, cenoura, beterraba.',
    '• Mix de aperitivo com castanhas e flor de sal.'
  ];
  let sy = y + 28;
  salgadoB.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(50, 60, 55);
    const lines = doc.splitTextToSize(b, 75);
    doc.text(lines, 105, sy);
    sy += (lines.length * 4) + 2;
  });

  doc.setFontSize(7);
  doc.setTextColor(110, 120, 115);
  doc.text('Porção usual: 10 g. Manter em recipiente fechado após a abertura para preservar a crocância.', 23, y + 80);

  // PAGE 4
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Nibs de cacau orgânico', '', 4, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 55, 'Validade, Armazenamento e Embalagem', 'Conservação e logística');
  const valNibs = [
    ['PRAZO DE VALIDADE', '— · a confirmar'],
    ['TEMPERATURA DE ARMAZENAMENTO', '18 a 22 °C'],
    ['UMIDADE RELATIVA MÁXIMA', '65 %'],
    ['CONDIÇÕES', 'Ao abrigo da luz e da umidade, em embalagem bem fechada. Não refrigerar.'],
    ['EMBALAGEM PRIMÁRIA', '— · a confirmar'],
    ['DIMENSÕES E PESO BRUTO', '— · a confirmar'],
    ['EMBALAGEM SECUNDÁRIA', '— · a confirmar (unidades por caixa, dimensões, peso)']
  ];
  ry = y + 21;
  valNibs.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(val, 78, ry);
    ry += 4.6;
  });

  y = 90;
  doc.setFillColor(28, 46, 36);
  doc.roundedRect(15, y, 180, 55, 3, 3, 'F');
  doc.setTextColor(198, 165, 106);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('ORIGEM E CERTIFICAÇÃO', 23, y + 9);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('times', 'bold');
  doc.text('Cabruca, Mata Atlântica', 23, y + 16);

  const origNibs = [
    ['ORIGEM', 'Serra Grande, Costa do Cacau, Bahia — Mata Atlântica'],
    ['SISTEMA DE CULTIVO', 'Cabruca — sistema agroflorestal sob o dossel da floresta nativa, sem desmatamento e sem monocultura'],
    ['CERTIFICAÇÃO ORGÂNICA', 'IBD Certificações — www.ibd.com.br'],
    ['Nº DO CERTIFICADO · VALIDADE', '— · a confirmar'],
    ['CADEIA', 'Tree-to-bar — cultivo, beneficiamento e embalagem na mesma região']
  ];
  ry = y + 23;
  origNibs.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(198, 165, 106);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(225, 235, 230);
    doc.text(doc.splitTextToSize(val, 110), 75, ry);
    ry += 6;
  });

  y = 150;
  drawSectionCard(doc, 15, y, 180, 65, 'Fabricação', 'Responsáveis');
  const fabNibs = [
    ['FABRICANTE', 'Cabruca — Cooperativa dos Produtores Orgânicos do Sul da Bahia'],
    ['CNPJ · IE', '04.293.272/0001-88 · 55.657.534-NO'],
    ['ENDEREÇO', 'Av. Nossa Senhora da Aparecida 2038, Nossa Senhora da Vitória — 45655-506 Ilhéus, Bahia, Brasil'],
    ['DISTRIBUÍDO POR', 'Será Cacau Ltda — Serra Grande, Uruçuca, Bahia · seracacau.com.br'],
    ['REGISTRO NA ANVISA', '— · a confirmar (isenção de registro a validar com o responsável técnico)'],
    ['RESPONSÁVEL TÉCNICO', '— · a confirmar (nome, formação e número de registro)']
  ];
  ry = y + 21;
  fabNibs.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 115), 65, ry);
    ry += 6.5;
  });

  // PAGE 5
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Nibs de cacau orgânico', '', 5, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 65, 'Controle do Documento', 'Versão e campos em validação');
  const docNibs = [
    ['VERSÃO · DATA', '1.0 · agosto de 2026'],
    ['ELABORADO POR', 'Será Cacau — área técnica'],
    ['CAMPOS EM ABERTO', 'Composição bromatológica · granulometria · grau de torra · cádmio · alergênicos · microbiologia · validade · embalagem · EAN · certificado IBD · responsável técnico'],
    ['PRÓXIMA REVISÃO', 'Após a emissão dos laudos laboratoriais do lote vigente']
  ];
  ry = y + 21;
  docNibs.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 115), 65, ry);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('Esta ficha técnica é um documento controlado. Os campos marcados em destaque aguardam laudo laboratorial ou confirmação documental e serão preenchidos na próxima versão. Nenhum valor foi estimado.', 23, y + 56);

  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(path.join(process.cwd(), 'public', 'Ficha_Tecnica_Nibs_de_Cacau_Organico.pdf'), buffer);
  console.log('Generated Ficha_Tecnica_Nibs_de_Cacau_Organico.pdf');
}

// ----------------------------------------------------
// 4. FICHA TÉCNICA: BAUNILHA ORGÂNICA (5 Páginas)
// ----------------------------------------------------
export function generateFTBaunilha() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // PAGE 1
  setupHeaderFooter(doc, 'Baunilha orgânica', 'Favas curadas da Mata Atlântica — Vanilla planifolia', 1, 5);

  let y = 48;
  drawSectionCard(doc, 15, y, 180, 72, 'Identificação', 'O produto');
  const idRows = [
    ['DENOMINAÇÃO DE VENDA', 'Fava de baunilha orgânica'],
    ['NOME BOTÂNICO', 'Vanilla planifolia — família Orchidaceae'],
    ['MARCA · LINHA', 'Será — Ervas'],
    ['APRESENTAÇÕES', 'Caixa com 3 favas — 12 g aproximadamente · demais apresentações a confirmar'],
    ['CÓDIGO EAN', '— · a confirmar por apresentação'],
    ['CATEGORIA', 'Especiaria — RDC 276/2005'],
    ['ORIGEM BOTÂNICA DA ESPÉCIE', 'Mesoamérica — México'],
    ['CULTIVO E PRODUÇÃO', 'Região sul da Bahia — Mata Atlântica']
  ];
  let ry = y + 20;
  idRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(val, 75, ry);
    ry += 5;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(100, 115, 105);
  doc.setFont('helvetica', 'italic');
  doc.text('A espécie Vanilla planifolia é originária da Mesoamérica. As favas desta ficha são cultivadas, colhidas e curadas no sul da Bahia — a origem do produto é brasileira.', 23, y + 66);

  y = 124;
  drawSectionCard(doc, 15, y, 180, 72, 'Descrição', 'A fava inteira, curada');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 50, 45);
  doc.text('Favas de baunilha orgânica cultivadas na Mata Atlântica do sul da\nBahia, colhidas maduras e curadas de forma tradicional.', 23, y + 23);
  doc.text('Vagem longa, fina e flexível, de superfície levemente oleosa e brilhante. Dentro,\na grande quantidade de sementes pretas conhecida como caviar de baunilha.\nA vanilina, principal composto aromático, está presente tanto nas sementes\nquanto na casca da fava.', 23, y + 36);
  doc.text('Sem extrato, sem álcool, sem aromatizante sintético — a especiaria em sua\nforma íntegra.', 23, y + 58);

  // PAGE 2
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Baunilha orgânica', '', 2, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 68, 'Composição', 'Ingredientes e alergênicos');
  const compRows = [
    ['INGREDIENTES', 'Fava de baunilha orgânica (100 %)'],
    ['ADITIVOS E AROMATIZANTES', 'Não contém'],
    ['GLÚTEN', 'Não contém glúten'],
    ['LACTOSE', 'Não contém lactose'],
    ['ALÉRGICOS', 'Não contém alergênicos de declaração obrigatória. Em casos raros pode ocorrer reação à vanilina.'],
    ['FUMIGAÇÃO E IRRADIAÇÃO', '— · a confirmar: declaração do produtor'],
    ['ORIGEM VEGETAL', 'Produto 100 % vegetal — vegano']
  ];
  ry = y + 21;
  compRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 110), 75, ry);
    ry += 6.5;
  });

  y = 102;
  drawSectionCard(doc, 15, y, 180, 50, 'Características Organolépticas', 'Aspecto, aroma e sabor');
  const organoRows = [
    ['APARÊNCIA', 'Vagem longa, fina e flexível, superfície levemente oleosa e brilhante'],
    ['COR', 'Preta a marrom-escura, com possíveis tons avermelhados'],
    ['AROMA', 'Rico, complexo e doce, com notas florais, de caramelo e de frutas'],
    ['SABOR', 'Intenso e inconfundível, liberado com o aquecimento'],
    ['CONTEÚDO INTERNO', 'Sementes pretas em grande quantidade — o caviar de baunilha']
  ];
  ry = y + 21;
  organoRows.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(val, 60, ry);
    ry += 5.5;
  });

  // CLASSIFICAÇÃO Grade A e Grade B
  y = 156;
  drawSectionCard(doc, 15, y, 180, 124, 'Classificação', 'Grade A e Grade B');
  doc.setFillColor(245, 242, 236);
  doc.rect(23, y + 20, 164, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 105);
  doc.text('GRADE A — GOURMET', 75, y + 24);
  doc.text('GRADE B — EXTRAÇÃO', 135, y + 24);

  const gradeRows = [
    ['Umidade', '25 a 35 %', 'abaixo de 20 %'],
    ['Comprimento', 'acima de 17 cm', 'variável'],
    ['Textura', 'carnuda e flexível', 'fina, seca ao toque, quebradiça'],
    ['Aparência', 'oleosa e brilhante, marrom-chocolate a escura', 'marrom-avermelhada, pouco ou nenhum brilho'],
    ['Integridade', 'íntegra', 'pode apresentar aberturas, rachaduras e lesões'],
    ['Indicação', 'infusão direta em preparações, uso em cozinha', 'extratos e preparações de longa maceração']
  ];
  ry = y + 31;
  gradeRows.forEach(([p, a, b]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 110, 105);
    doc.text(p, 25, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(a, 55), 75, ry);
    doc.text(doc.splitTextToSize(b, 55), 135, ry);
    doc.setDrawColor(240, 238, 232);
    doc.line(23, ry + 7, 187, ry + 7);
    ry += 11;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('Grade fornecida nesta apresentação: — · a confirmar. Ambas as grades servem para a produção de extratos; a diferença está no teor de umidade e na velocidade de liberação do aroma.', 23, y + 105);

  // PAGE 3
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Baunilha orgânica', '', 3, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 80, 'Características Físico-Químicas', 'Valores analíticos');
  doc.setFillColor(245, 242, 236);
  doc.rect(23, y + 20, 164, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 105);
  doc.text('PARÂMETRO', 25, y + 24);
  doc.text('RESULTADO', 90, y + 24);
  doc.text('UNIDADE', 125, y + 24);
  doc.text('METODOLOGIA', 155, y + 24);

  const fqBaunilha = [
    ['Umidade — Grade A', '25 a 35', '%', 'Gravimetria'],
    ['Umidade — Grade B', 'abaixo de 20', '%', 'Gravimetria'],
    ['Comprimento da fava — Grade A', 'acima de 17', 'cm', 'Medição'],
    ['Teor de vanilina', '— · a confirmar', 'g/100 g', 'HPLC'],
    ['Atividade de água', '— · a confirmar', 'aw', '—'],
    ['Método de cura e secagem', '— · a confirmar', '—', '—'],
    ['Safra', '— · a confirmar', '—', '—']
  ];
  ry = y + 31;
  fqBaunilha.forEach(([p, r, u, m]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 50, 45);
    doc.text(p, 25, ry);
    doc.text(r, 90, ry);
    doc.text(u, 125, ry);
    doc.text(m, 155, ry);
    doc.setDrawColor(240, 238, 232);
    doc.line(23, ry + 2, 187, ry + 2);
    ry += 6;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('Faixas de umidade e comprimento conforme especificação do fabricante. Os valores do lote vigente serão informados a partir do laudo laboratorial.', 23, y + 74);

  y = 115;
  drawSectionCard(doc, 15, y, 180, 60, 'Características Microbiológicas', 'Parâmetros e limites');
  doc.setFillColor(245, 242, 236);
  doc.rect(23, y + 20, 164, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 105);
  doc.text('PARÂMETRO', 25, y + 24);
  doc.text('RESULTADO', 85, y + 24);
  doc.text('LIMITE DE REFERÊNCIA', 115, y + 24);
  doc.text('METODOLOGIA', 155, y + 24);

  const microBaunilha = [
    ['Salmonella sp. em 25 g', '— · a confirmar', 'Ausência', 'AFNOR BIO 12/16-09/05 VIDAS'],
    ['Bolores e leveduras', '— · a confirmar', 'IN 60/2019 — ANVISA', 'ISO 21527-2'],
    ['Escherichia coli', '— · a confirmar', 'IN 60/2019 — ANVISA', 'ISO 16649-2']
  ];
  ry = y + 31;
  microBaunilha.forEach(([p, r, l, m]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 50, 45);
    doc.text(p, 25, ry);
    doc.text(r, 85, ry);
    doc.text(l, 115, ry);
    doc.text(m, 155, ry);
    doc.setDrawColor(240, 238, 232);
    doc.line(23, ry + 2, 187, ry + 2);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('Referência normativa vigente: IN 60/2019, que substituiu a RDC 12/2001. Os resultados são preenchidos a cada lote a partir do laudo do laboratório.', 23, y + 54);

  y = 180;
  drawSectionCard(doc, 15, y, 180, 45, 'Informação Nutricional', 'Declaração');
  const nutDecB = [
    ['SITUAÇÃO', '— · a confirmar — especiarias podem estar dispensadas da declaração nutricional'],
    ['BASE NORMATIVA', 'RDC 429/2020 e IN 75/2020 — enquadramento a validar com o responsável técnico'],
    ['PORÇÃO DE REFERÊNCIA', 'Uso em quantidade não significativa do ponto de vista nutricional']
  ];
  ry = y + 21;
  nutDecB.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 115), 65, ry);
    ry += 6.5;
  });

  // PAGE 4
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Baunilha orgânica', '', 4, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 90, 'Aplicação', 'Como usar a fava inteira');
  const appBaunilha = [
    '• Abrir a fava no sentido do comprimento e raspar as sementes pretas com a ponta da faca.',
    '• Infundir a fava aberta em leite, creme ou bebida vegetal aquecida a 80 °C por 20 minutos, com a panela tampada. O sabor se libera com o calor.',
    '• Com cacau 100 %: infundir a fava no líquido antes de dissolver as gotas — a baunilha arredonda o amargor sem adoçar.',
    '• Doces: bolos, cremes, sorvetes, compotas e caldas caseiras.',
    '• Salgados: molhos de manteiga, legumes assados, aves e frutos do mar.',
    '• Guardar a fava já raspada em açúcar, sal ou mel para aromatizar.',
    '• A casca pode ser reutilizada: secar e moer, ou usar em nova infusão.',
    '• Rendimento usual: uma fava para 500 ml de líquido ou para uma receita de sobremesa.'
  ];
  ry = y + 21;
  appBaunilha.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(50, 60, 55);
    const lines = doc.splitTextToSize(b, 164);
    doc.text(lines, 23, ry);
    ry += (lines.length * 4) + 2;
  });

  y = 125;
  drawSectionCard(doc, 15, y, 180, 58, 'Validade, Armazenamento e Embalagem', 'Conservação e logística');
  const valB = [
    ['PRAZO DE VALIDADE', '— · a confirmar (indicado na embalagem)'],
    ['ANTES DE ABRIR', 'Local fresco, escuro e arejado, em recipiente hermético, para preservar o aroma'],
    ['APÓS ABRIR', 'Recipiente hermético, ao abrigo da luz. Não refrigerar — o frio resseca a fava.'],
    ['TEMPERATURA DE ARMAZENAMENTO', '18 a 25 °C'],
    ['CRISTAIS BRANCOS NA SUPERFÍCIE', 'Cristalização natural de vanilina — sinal de qualidade, não é mofo'],
    ['EMBALAGEM PRIMÁRIA', 'Caixa com 3 favas — 12 g aproximadamente · demais formatos a confirmar'],
    ['EMBALAGEM SECUNDÁRIA', '— · a confirmar (unidades por caixa, dimensões, peso)']
  ];
  ry = y + 20;
  valB.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 110), 75, ry);
    ry += 5;
  });

  y = 188;
  doc.setFillColor(28, 46, 36);
  doc.roundedRect(15, y, 180, 50, 3, 3, 'F');
  doc.setTextColor(198, 165, 106);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('ORIGEM E CERTIFICAÇÃO', 23, y + 9);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('times', 'bold');
  doc.text('Mata Atlântica, sul da Bahia', 23, y + 16);

  const origB = [
    ['CULTIVO E PRODUÇÃO', 'Região sul da Bahia — Mata Atlântica'],
    ['SISTEMA DE CULTIVO', 'Sistema agroflorestal, consorciado com a floresta'],
    ['CERTIFICAÇÃO ORGÂNICA', 'IBD Certificações — www.ibd.com.br'],
    ['Nº DO CERTIFICADO · VALIDADE', '— · a confirmar']
  ];
  ry = y + 23;
  origB.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(198, 165, 106);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(225, 235, 230);
    doc.text(val, 75, ry);
    ry += 5.5;
  });

  // PAGE 5
  doc.addPage('a4', 'portrait');
  setupHeaderFooter(doc, 'Baunilha orgânica', '', 5, 5);

  y = 30;
  drawSectionCard(doc, 15, y, 180, 65, 'Fabricação', 'Responsáveis');
  const fabB = [
    ['FABRICANTE', 'Cabruca — Cooperativa dos Produtores Orgânicos do Sul da Bahia'],
    ['CNPJ · IE', '04.293.272/0001-88 · 55.657.534'],
    ['ENDEREÇO', 'Av. Nossa Senhora Aparecida 2038, Nossa Senhora da Vitória — 45655-506 Ilhéus, Bahia, Brasil'],
    ['DISTRIBUÍDO POR', 'Será Cacau Ltda — Serra Grande, Uruçuca, Bahia · seracacau.com.br'],
    ['REGISTRO NA ANVISA', '— · a confirmar (isenção de registro a validar com o responsável técnico)'],
    ['RESPONSÁVEL TÉCNICO', '— · a confirmar (nome, formação e número de registro)']
  ];
  ry = y + 21;
  fabB.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 115), 65, ry);
    ry += 6.5;
  });

  y = 102;
  drawSectionCard(doc, 15, y, 180, 65, 'Controle do Documento', 'Versão e campos em validação');
  const docB = [
    ['VERSÃO · DATA', '1.1 · agosto de 2026'],
    ['ELABORADO POR', 'Será Cacau — área técnica'],
    ['CAMPOS EM ABERTO', 'Grade fornecida · vanilina · atividade de água · método de cura · safra · fumigação · microbiologia · validade · embalagem secundária · EAN · certificado IBD · responsável técnico'],
    ['PRÓXIMA REVISÃO', 'Após a emissão dos laudos laboratoriais do lote vigente']
  ];
  ry = y + 21;
  docB.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 130, 125);
    doc.text(lbl, 23, ry);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 45);
    doc.text(doc.splitTextToSize(val, 115), 65, ry);
    ry += 7;
  });
  doc.setFontSize(6.8);
  doc.setTextColor(110, 120, 115);
  doc.text('Esta ficha técnica é um documento controlado. Os campos marcados em destaque aguardam laudo laboratorial ou confirmação documental e serão preenchidos na próxima versão. Nenhum valor foi estimado.', 23, y + 56);

  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(path.join(process.cwd(), 'public', 'Ficha_Tecnica_Baunilha_Organica.pdf'), buffer);
  console.log('Generated Ficha_Tecnica_Baunilha_Organica.pdf');
}

generateFTCacau100();
generateFTChaCasca();
generateFTNibs();
generateFTBaunilha();
