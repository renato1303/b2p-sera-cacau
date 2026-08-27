/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TechnicalSheetData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  headerMeta: string;
  downloadPdfUrl: string;
  pdfFileName: string;
  pdfSize: string;
  
  // Section 1: Identificação
  identificacao: {
    denominacaoVenda: string;
    marcaLinha: string;
    apresentacoes: string;
    codigoEan: string;
    categoria: string;
    nomeComercial?: string;
    parteVegetalUtilizada?: string;
    nomeBotanico?: string;
    origemBotanica?: string;
    cultivoProducao?: string;
    notaRodape?: string;
  };

  // Section 2: Descrição
  descricao: {
    titulo: string;
    paragrafos: string[];
  };

  // Section 3: Composição
  composicao: {
    ingredientes: string;
    manteigaCacauAdicionada?: string;
    aditivos: string;
    gluten: string;
    lactose: string;
    alergicos: string;
    origemVegetal: string;
    fumigacaoIrradiacao?: string;
  };

  // Section 4: Características Organolépticas
  organolepticas: {
    aspecto: string;
    odor: string;
    sabor: string;
    cor?: string;
    textura?: string;
    aparencia?: string;
    aroma?: string;
    conteudoInterno?: string;
  };

  // Section 4.5 (Optional Classification - e.g. Vanilla)
  classificacao?: {
    titulo: string;
    nota: string;
    tabela: {
      parametro: string;
      gradeA: string;
      gradeB: string;
    }[];
  };

  // Section 5: Características Físico-Químicas
  fisicoQuimicas: {
    nota?: string;
    tabela: {
      parametro: string;
      resultado: string;
      unidade: string;
      metodologia: string;
    }[];
  };

  // Section 6: Características Microbiológicas
  microbiologicas: {
    nota: string;
    tabela: {
      parametro: string;
      resultado: string;
      limite: string;
      metodologia: string;
    }[];
  };

  // Section 7: Informação Nutricional
  informacaoNutricional: {
    titulo: string;
    situacao?: string;
    baseNormativa?: string;
    seAplicavel?: string;
    porcaoReferencia?: string;
    nota?: string;
    tabela?: {
      item: string;
      cemG: string;
      porcao: string;
      vd: string;
    }[];
  };

  // Section 8: Aplicação
  aplicacao: {
    titulo: string;
    itens: string[];
    duasColunas?: {
      doce: string[];
      salgado: string[];
    };
    rodape?: string;
  };

  // Section 9: Validade, Armazenamento e Embalagem
  conservacaoLogistica: {
    prazoValidade: string;
    antesAbrir?: string;
    aposAbrir?: string;
    temperatura: string;
    umidadeMaxima?: string;
    condicoes?: string;
    cristaisBrancos?: string;
    embalagemPrimaria: string;
    dimensoesPesoBruto: string;
    embalagemSecundaria: string;
  };

  // Section 10: Origem e Certificação
  origemCertificacao: {
    titulo: string;
    origem?: string;
    cultivoProducao?: string;
    sistemaCultivo: string;
    certificacaoOrganica: string;
    numeroCertificadoValidade: string;
    cadeia?: string;
  };

  // Section 11: Fabricação
  fabricacao: {
    fabricante: string;
    cnpjIe: string;
    endereco: string;
    distribuidoPor: string;
    registroAnvisa: string;
    responsavelTecnico: string;
  };

  // Section 12: Controle do Documento
  controleDocumento: {
    versaoData: string;
    elaboradoPor: string;
    camposEmAberto: string;
    proximaRevisao: string;
    nota: string;
  };
}

export const TECHNICAL_SHEETS: TechnicalSheetData[] = [
  // ----------------------------------------------------
  // 1. Cacau 100% Orgânico
  // ----------------------------------------------------
  {
    id: 'ft-cacau-100',
    slug: 'cacau-100-organico',
    title: 'Cacau 100 % orgânico',
    subtitle: 'Massa de cacau · gotas, barra e disco',
    headerMeta: 'SERÁ CACAU · SERRA GRANDE, COSTA DO CACAU, BAHIA · VERSÃO 1.0 · AGOSTO DE 2026',
    downloadPdfUrl: '/Ficha_Tecnica_Cacau_100_Organico.pdf',
    pdfFileName: 'Ficha_Tecnica_Cacau_100_Organico.pdf',
    pdfSize: '58 KB',
    
    identificacao: {
      denominacaoVenda: 'Massa de cacau orgânica — cacau 100 %',
      marcaLinha: 'Será Cacau — Cacau para beber',
      apresentacoes: 'Gotas 105 g · 210 g · 420 g · 1 kg · Barra · Disco — pesos e EAN a confirmar',
      codigoEan: '— · a confirmar por apresentação',
      categoria: 'Produto de cacau — RDC 264/2005',
      notaRodape: '1 gota = 1 grama. A dosagem do produto é comunicada em gotas para facilitar o preparo doméstico e a orientação nutricional.'
    },

    descricao: {
      titulo: 'Cacau puro, nada adicionado',
      paragrafos: [
        'Massa de cacau orgânica obtida da amêndoa fermentada, seca, torrada e moída. Sem açúcar, sem leite, sem lecitina, sem aromatizantes.',
        'Cacau de origem única, cultivado no sistema Cabruca sob a Mata Atlântica do sul da Bahia. Destinado ao preparo de cacau para beber e a aplicações culinárias que exigem cacau puro.'
      ]
    },

    composicao: {
      ingredientes: 'Massa de cacau orgânica (100 %)',
      manteigaCacauAdicionada: '— · a confirmar por apresentação',
      aditivos: 'Não contém',
      gluten: 'Não contém glúten',
      lactose: 'Não contém lactose',
      alergicos: '— · a confirmar: declaração do fabricante sobre processamento na mesma linha de leite, castanhas, amendoim e soja',
      origemVegetal: 'Produto 100 % vegetal — vegano'
    },

    organolepticas: {
      aspecto: 'Gotas de coloração marrom-escura, superfície homogênea',
      odor: 'Característico de cacau',
      sabor: 'Característico, amargo intenso, sem adstringência agressiva',
      cor: 'Marrom-escuro uniforme'
    },

    fisicoQuimicas: {
      nota: 'Valores conforme laudo do BAV Institut GmbH, Offenburg — amostra 24129042C, Bio-Kakao, origem Brasil, emitido em 03.01.2025. O teor de cádmio está abaixo do limite de 0,80 mg/kg aplicável a produtos de cacau com teor de sólidos igual ou superior a 50 % no mercado europeu.',
      tabela: [
        { parametro: 'Umidade', resultado: '1,7', unidade: 'g/100 g', metodologia: 'Gravimetria' },
        { parametro: 'Matéria seca', resultado: '98,3', unidade: 'g/100 g', metodologia: 'Gravimetria' },
        { parametro: 'Gordura total (manteiga de cacau)', resultado: '56,6', unidade: 'g/100 g', metodologia: 'Gravimetria' },
        { parametro: 'Cinzas', resultado: '2,2', unidade: 'g/100 g', metodologia: 'Gravimetria' },
        { parametro: 'Proteína (N × 6,25)', resultado: '13,6', unidade: 'g/100 g', metodologia: 'Dumas' },
        { parametro: 'Cádmio', resultado: '0,16', unidade: 'mg/kg', metodologia: 'ICP-MS' },
        { parametro: 'Níquel', resultado: '7,0', unidade: 'mg/kg', metodologia: 'ICP-MS' },
        { parametro: 'Granulometria (finura)', resultado: '— · a confirmar', unidade: 'µm', metodologia: '—' },
        { parametro: 'Ponto de fusão', resultado: '— · a confirmar', unidade: '°C', metodologia: '—' },
        { parametro: 'Teobromina · cafeína', resultado: '— · a confirmar', unidade: 'mg/100 g', metodologia: '—' }
      ]
    },

    microbiologicas: {
      nota: 'Referência normativa vigente: IN 60/2019, que substituiu a RDC 12/2001. Os resultados são preenchidos a cada lote a partir do laudo do laboratório.',
      tabela: [
        { parametro: 'Coliformes termotolerantes (45 °C)', resultado: '— · a confirmar', limite: 'IN 60/2019 — ANVISA', metodologia: 'MAPA IN 62/2003' },
        { parametro: 'Salmonella sp. em 25 g', resultado: '— · a confirmar', limite: 'Ausência', metodologia: 'AFNOR BIO 12/16-09/05 VIDAS' },
        { parametro: 'Bolores e leveduras', resultado: '— · a confirmar', limite: 'IN 60/2019 — ANVISA', metodologia: 'ISO 21527-2' }
      ]
    },

    informacaoNutricional: {
      titulo: 'Por 100 g e por porção de 10 g',
      nota: 'Percentuais de valores diários com base em dieta de 2.000 kcal, conforme RDC 429/2020 e IN 75/2020. Valores calculados a partir do laudo bromatológico BAV Institut 24129042C. O layout final da tabela para rotulagem deve ser validado pelo responsável técnico, incluindo a avaliação da rotulagem nutricional frontal.',
      tabela: [
        { item: 'Valor energético', cemG: '637 kcal · 2.629 kJ', porcao: '64 kcal · 263 kJ', vd: '3 %' },
        { item: 'Carboidratos totais', cemG: '10,7 g', porcao: '1,1 g', vd: '0 %' },
        { item: '  Açúcares totais', cemG: '1,2 g', porcao: '0,1 g', vd: '—' },
        { item: '  Açúcares adicionados', cemG: '0 g', porcao: '0 g', vd: '0 %' },
        { item: 'Proteínas', cemG: '13,6 g', porcao: '1,4 g', vd: '3 %' },
        { item: 'Gorduras totais', cemG: '56,6 g', porcao: '5,7 g', vd: '10 %' },
        { item: '  Gorduras saturadas', cemG: '35,0 g', porcao: '3,5 g', vd: '16 %' },
        { item: '  Gorduras trans', cemG: 'menos de 0,1 g', porcao: '0 g', vd: '—' },
        { item: 'Fibra alimentar', cemG: '15,2 g', porcao: '1,5 g', vd: '6 %' },
        { item: 'Sódio', cemG: '— · a confirmar', porcao: '— · a confirmar', vd: '—' }
      ]
    },

    aplicacao: {
      titulo: 'Para a prática clínica e para a xícara do dia a dia',
      itens: [
        'Porção usual: 10 g (10 gotas) por xícara de 200 ml. Preparo mais encorpado: 15 a 20 g.',
        'Preparo: aquecer o líquido até no máximo 60 °C, sem ferver, dissolver as gotas mexendo e emulsionar por 30 segundos no espumador ou mixer.',
        'Bases: água, leite integral, bebidas vegetais de aveia, castanha ou coco.',
        'Combinações: canela, cardamomo, gengibre, baunilha, pitada de sal marinho.',
        'Substituição do café no ritual matinal ou no meio da tarde — teobromina como estimulante natural suave, sem o pico e a queda da cafeína.',
        'Aplicações culinárias: ganache sem açúcar, mousse, massas de bolo, molhos escuros salgados.',
        'Sem açúcar, sem adoçantes e sem aditivos — compatível com planos de baixo carboidrato, veganos e sem lactose.'
      ],
      rodape: 'Este documento é técnico e descritivo. Ele não acompanha alegação de propriedade funcional ou de saúde. Qualquer alegação depende de substanciação laboratorial e de enquadramento regulatório específico.'
    },

    conservacaoLogistica: {
      prazoValidade: '12 meses a partir da data de fabricação',
      temperatura: '18 a 22 °C',
      umidadeMaxima: '65 %',
      condicoes: 'Ao abrigo da luz, do calor e de odores fortes. Não refrigerar.',
      embalagemPrimaria: 'Vidro com tampa para as gotas · papel reciclado para barras e discos',
      dimensoesPesoBruto: '— · a confirmar por apresentação',
      embalagemSecundaria: '— · a confirmar (unidades por caixa, dimensões, peso)'
    },

    origemCertificacao: {
      titulo: 'Cabruca, Mata Atlântica',
      origem: 'Serra Grande, Costa do Cacau, Bahia — Mata Atlântica',
      sistemaCultivo: 'Cabruca — sistema agroflorestal sob o dossel da floresta nativa, sem desmatamento e sem monocultura',
      certificacaoOrganica: 'IBD Certificações — www.ibd.com.br',
      numeroCertificadoValidade: '— · a confirmar',
      cadeia: 'Tree-to-bar — cultivo, beneficiamento e embalagem na mesma região'
    },

    fabricacao: {
      fabricante: 'Cabruca — Cooperativa dos Produtores Orgânicos do Sul da Bahia',
      cnpjIe: '04.293.272/0001-88 · 55.657.534-NO',
      endereco: 'Av. Nossa Senhora da Aparecida 2038, Nossa Senhora da Vitória — 45655-506 Ilhéus, Bahia, Brasil',
      distribuidoPor: 'Será Cacau Ltda — Serra Grande, Uruçuca, Bahia · seracacau.com.br',
      registroAnvisa: '— · a confirmar (isenção de registro a validar com o responsável técnico)',
      responsavelTecnico: '— · a confirmar (nome, formação e número de registro)'
    },

    controleDocumento: {
      versaoData: '1.0 · agosto de 2026',
      elaboradoPor: 'Será Cacau — área técnica',
      camposEmAberto: 'Alergênicos · granulometria · ponto de fusão · teobromina e cafeína · sódio · microbiologia · EAN · dimensões · certificado IBD · responsável técnico',
      proximaRevisao: 'Após a emissão dos laudos laboratoriais do lote vigente',
      nota: 'Esta ficha técnica é um documento controlado. Os campos marcados em destaque aguardam laudo laboratorial ou confirmação documental e serão preenchidos na próxima versão. Nenhum valor foi estimado.'
    }
  },

  // ----------------------------------------------------
  // 2. Chá da Casca de Cacau
  // ----------------------------------------------------
  {
    id: 'ft-cha-casca',
    slug: 'cha-da-casca-de-cacau',
    title: 'Chá da Casca de Cacau',
    subtitle: 'Casca da amêndoa de cacau orgânico, desidratada',
    headerMeta: 'SERÁ CACAU · SERRA GRANDE, COSTA DO CACAU, BAHIA · VERSÃO 1.0 · AGOSTO DE 2026',
    downloadPdfUrl: '/Ficha_Tecnica_Cha_da_Casca_de_Cacau.pdf',
    pdfFileName: 'Ficha_Tecnica_Cha_da_Casca_de_Cacau.pdf',
    pdfSize: '52 KB',

    identificacao: {
      denominacaoVenda: '— · a confirmar — a designação legal depende do enquadramento do produto como chá ou como infusão',
      nomeComercial: 'Chá da Casca de Cacau',
      marcaLinha: 'Será Cacau — Cacau para beber',
      apresentacoes: '— · a confirmar (pesos e apresentações)',
      codigoEan: '— · a confirmar por apresentação',
      categoria: 'Produto vegetal para infusão',
      parteVegetalUtilizada: 'Tegumento (casca) da amêndoa de Theobroma cacao L.',
      notaRodape: 'O enquadramento regulatório da casca de cacau para infusão está em validação com assessoria de assuntos regulatórios. A denominação de venda será fixada antes da impressão do rótulo.'
    },

    descricao: {
      titulo: 'O que sobra da amêndoa — e não devia sobrar',
      paragrafos: [
        'Casca da amêndoa de cacau orgânico, separada após a torra e desidratada. Infusão de cor âmbar, aroma de cacau e doçura natural, sem amargor pronunciado.',
        'Subproduto do beneficiamento do cacau que passa a ser produto: aproveitamento integral da amêndoa, na mesma cadeia curta e no mesmo sistema Cabruca.'
      ]
    },

    composicao: {
      ingredientes: 'Casca de cacau orgânico (100 %)',
      aditivos: 'Não contém',
      gluten: 'Não contém glúten',
      lactose: 'Não contém lactose',
      alergicos: '— · a confirmar: declaração do fabricante sobre processamento na mesma linha de leite, castanhas, amendoim e soja',
      origemVegetal: 'Produto 100 % vegetal — vegano'
    },

    organolepticas: {
      aspecto: 'Fragmentos leves de casca, coloração marrom-clara a avermelhada',
      odor: 'Característico de cacau, adocicado',
      sabor: 'Suave, notas de cacau e frutas secas, doçura natural, baixo amargor',
      cor: 'Âmbar claro (cor da infusão)'
    },

    fisicoQuimicas: {
      nota: 'A análise de cádmio deve ser feita na casca, e não na amêndoa: os teores diferem de forma relevante entre as duas frações. Ensaio obrigatório para exportação.',
      tabela: [
        { parametro: 'Umidade', resultado: '— · a confirmar', unidade: 'g/100 g', metodologia: 'Gravimetria' },
        { parametro: 'Atividade de água', resultado: '— · a confirmar', unidade: 'aw', metodologia: '—' },
        { parametro: 'Cinzas', resultado: '— · a confirmar', unidade: 'g/100 g', metodologia: 'Gravimetria' },
        { parametro: 'Fibra alimentar total', resultado: '— · a confirmar', unidade: 'g/100 g', metodologia: 'Gravimetria' },
        { parametro: 'Teobromina', resultado: '— · a confirmar', unidade: 'mg/100 g', metodologia: 'HPLC' },
        { parametro: 'Cafeína', resultado: '— · a confirmar', unidade: 'mg/100 g', metodologia: 'HPLC' },
        { parametro: 'Cádmio', resultado: '— · a confirmar', unidade: 'mg/kg', metodologia: 'ICP-MS' },
        { parametro: 'Granulometria', resultado: '— · a confirmar', unidade: 'mm', metodologia: 'Peneiramento' }
      ]
    },

    microbiologicas: {
      nota: 'Referência normativa vigente: IN 60/2019, que substituiu a RDC 12/2001. Os resultados são preenchidos a cada lote a partir do laudo do laboratório.',
      tabela: [
        { parametro: 'Coliformes termotolerantes (45 °C)', resultado: '— · a confirmar', limite: 'IN 60/2019 — ANVISA', metodologia: 'MAPA IN 62/2003' },
        { parametro: 'Salmonella sp. em 25 g', resultado: '— · a confirmar', limite: 'Ausência', metodologia: 'AFNOR BIO 12/16-09/05 VIDAS' },
        { parametro: 'Bolores e leveduras', resultado: '— · a confirmar', limite: 'IN 60/2019 — ANVISA', metodologia: 'ISO 21527-2' },
        { parametro: 'Bacillus cereus', resultado: '— · a confirmar', limite: 'IN 60/2019 — ANVISA', metodologia: 'ISO 7932' }
      ]
    },

    informacaoNutricional: {
      titulo: 'Declaração',
      situacao: '— · a confirmar — produtos destinados exclusivamente ao preparo de infusão podem estar dispensados da declaração nutricional',
      baseNormativa: 'RDC 429/2020 e IN 75/2020 — enquadramento a validar com o responsável técnico',
      seAplicavel: 'Tabela por 100 ml de infusão pronta, a partir de laudo bromatológico próprio'
    },

    aplicacao: {
      titulo: 'Modo de preparo e uso',
      itens: [
        'Proporção: 5 g (uma colher de sopa cheia) para 250 ml de água.',
        'Temperatura da água: 90 a 95 °C.',
        'Infusão: 5 a 8 minutos, com a xícara tampada. Coar antes de servir.',
        'Segunda infusão: a mesma casca aceita uma segunda extração, com corpo mais leve.',
        'Frio: infusão a frio por 8 a 12 horas na geladeira, servida com gelo e casca de laranja.',
        'Com leite ou bebida vegetal: infundir diretamente no líquido aquecido a 90 °C por 8 minutos.',
        'Uso na cozinha: como líquido de cocção para arroz, caldos escuros e caldas de fruta.',
        'Bebida sem açúcar e sem calorias relevantes — alternativa ao café no fim do dia.'
      ],
      rodape: 'Teobromina e cafeína estão naturalmente presentes na casca. Os teores exatos serão informados após o laudo.'
    },

    conservacaoLogistica: {
      prazoValidade: '— · a confirmar',
      temperatura: 'Ambiente, até 25 °C',
      condicoes: 'Ao abrigo da luz e da umidade, em embalagem bem fechada.',
      embalagemPrimaria: '— · a confirmar',
      dimensoesPesoBruto: '— · a confirmar',
      embalagemSecundaria: '— · a confirmar (unidades por caixa, dimensões, peso)'
    },

    origemCertificacao: {
      titulo: 'Cabruca, Mata Atlântica',
      origem: 'Serra Grande, Costa do Cacau, Bahia — Mata Atlântica',
      sistemaCultivo: 'Cabruca — sistema agroflorestal sob o dossel da floresta nativa, sem desmatamento e sem monocultura',
      certificacaoOrganica: 'IBD Certificações — www.ibd.com.br',
      numeroCertificadoValidade: '— · a confirmar',
      cadeia: 'Tree-to-bar — cultivo, beneficiamento e embalagem na mesma região'
    },

    fabricacao: {
      fabricante: 'Cabruca — Cooperativa dos Produtores Orgânicos do Sul da Bahia',
      cnpjIe: '04.293.272/0001-88 · 55.657.534-NO',
      endereco: 'Av. Nossa Senhora da Aparecida 2038, Nossa Senhora da Vitória — 45655-506 Ilhéus, Bahia, Brasil',
      distribuidoPor: 'Será Cacau Ltda — Serra Grande, Uruçuca, Bahia · seracacau.com.br',
      registroAnvisa: '— · a confirmar (isenção de registro a validar com o responsável técnico)',
      responsavelTecnico: '— · a confirmar (nome, formação e número de registro)'
    },

    controleDocumento: {
      versaoData: '1.0 · agosto de 2026',
      elaboradoPor: 'Será Cacau — área técnica',
      camposEmAberto: 'Denominação legal · composição · teobromina e cafeína · cádmio · alergênicos · microbiologia · validade · embalagem · EAN · certificado IBD · responsável técnico',
      proximaRevisao: 'Após a emissão dos laudos laboratoriais do lote vigente',
      nota: 'Esta ficha técnica é um documento controlado. Os campos marcados em destaque aguardam laudo laboratorial ou confirmação documental e serão preenchidos na próxima versão. Nenhum valor foi estimado.'
    }
  },

  // ----------------------------------------------------
  // 3. Nibs de Cacau Orgânico
  // ----------------------------------------------------
  {
    id: 'ft-nibs-cacau',
    slug: 'nibs-de-cacau-organico',
    title: 'Nibs de cacau orgânico',
    subtitle: 'Amêndoas torradas, descascadas e quebradas',
    headerMeta: 'SERÁ CACAU · SERRA GRANDE, COSTA DO CACAU, BAHIA · VERSÃO 1.0 · AGOSTO DE 2026',
    downloadPdfUrl: '/Ficha_Tecnica_Nibs_de_Cacau_Organico.pdf',
    pdfFileName: 'Ficha_Tecnica_Nibs_de_Cacau_Organico.pdf',
    pdfSize: '57 KB',

    identificacao: {
      denominacaoVenda: 'Nibs de cacau orgânico',
      marcaLinha: 'Será Cacau — Cacau para comer',
      apresentacoes: '— · a confirmar (pesos e apresentações)',
      codigoEan: '— · a confirmar por apresentação',
      categoria: 'Produto de cacau — RDC 264/2005'
    },

    descricao: {
      titulo: 'A amêndoa inteira, quebrada',
      paragrafos: [
        'Amêndoas de cacau orgânico fermentadas, secas, torradas, descascadas e quebradas em pedaços irregulares. Nada além do cacau.',
        'Textura crocante, sem açúcar e sem gordura adicionada. Aplicação em preparações doces e salgadas, como componente de textura e de sabor amargo estruturante.'
      ]
    },

    composicao: {
      ingredientes: 'Amêndoas de cacau orgânico (100 %)',
      aditivos: 'Não contém',
      gluten: 'Não contém glúten',
      lactose: 'Não contém lactose',
      alergicos: '— · a confirmar: declaração do fabricante sobre processamento na mesma linha de leite, castanhas, amendoim e soja',
      origemVegetal: 'Produto 100 % vegetal — vegano'
    },

    organolepticas: {
      aspecto: 'Fragmentos irregulares de coloração marrom, secos e soltos',
      odor: 'Característico de cacau torrado',
      sabor: 'Característico, amargo, com final tostado',
      textura: 'Crocante, quebradiça'
    },

    fisicoQuimicas: {
      nota: 'Os valores da massa de cacau não se aplicam integralmente aos nibs: a composição difere em teor de gordura e de fibra. É necessário laudo bromatológico próprio para este produto.',
      tabela: [
        { parametro: 'Umidade', resultado: '— · a confirmar', unidade: 'g/100 g', metodologia: 'Gravimetria' },
        { parametro: 'Gordura total', resultado: '— · a confirmar', unidade: 'g/100 g', metodologia: 'Gravimetria' },
        { parametro: 'Proteína (N × 6,25)', resultado: '— · a confirmar', unidade: 'g/100 g', metodologia: 'Dumas' },
        { parametro: 'Fibra alimentar total', resultado: '— · a confirmar', unidade: 'g/100 g', metodologia: 'Gravimetria' },
        { parametro: 'Cinzas', resultado: '— · a confirmar', unidade: 'g/100 g', metodologia: 'Gravimetria' },
        { parametro: 'Granulometria', resultado: '— · a confirmar', unidade: 'mm', metodologia: 'Peneiramento' },
        { parametro: 'Grau de torra', resultado: '— · a confirmar', unidade: '—', metodologia: '—' },
        { parametro: 'Cádmio', resultado: '— · a confirmar', unidade: 'mg/kg', metodologia: 'ICP-MS' }
      ]
    },

    microbiologicas: {
      nota: 'Referência normativa vigente: IN 60/2019, que substituiu a RDC 12/2001. Os resultados são preenchidos a cada lote a partir do laudo do laboratório.',
      tabela: [
        { parametro: 'Coliformes termotolerantes (45 °C)', resultado: '— · a confirmar', limite: 'IN 60/2019 — ANVISA', metodologia: 'MAPA IN 62/2003' },
        { parametro: 'Salmonella sp. em 25 g', resultado: '— · a confirmar', limite: 'Ausência', metodologia: 'AFNOR BIO 12/16-09/05 VIDAS' },
        { parametro: 'Bolores e leveduras', resultado: '— · a confirmar', limite: 'IN 60/2019 — ANVISA', metodologia: 'ISO 21527-2' }
      ]
    },

    informacaoNutricional: {
      titulo: 'Por 100 g e por porção de 10 g',
      nota: 'Tabela a ser preenchida com laudo bromatológico específico dos nibs, conforme RDC 429/2020 e IN 75/2020.',
      tabela: [
        { item: 'Valor energético', cemG: '— · a confirmar', porcao: '— · a confirmar', vd: '—' },
        { item: 'Carboidratos totais', cemG: '— · a confirmar', porcao: '— · a confirmar', vd: '—' },
        { item: '  Açúcares totais', cemG: '— · a confirmar', porcao: '— · a confirmar', vd: '—' },
        { item: '  Açúcares adicionados', cemG: '0 g', porcao: '0 g', vd: '0 %' },
        { item: 'Proteínas', cemG: '— · a confirmar', porcao: '— · a confirmar', vd: '—' },
        { item: 'Gorduras totais', cemG: '— · a confirmar', porcao: '— · a confirmar', vd: '—' },
        { item: '  Gorduras saturadas', cemG: '— · a confirmar', porcao: '— · a confirmar', vd: '—' },
        { item: '  Gorduras trans', cemG: '0 g', porcao: '0 g', vd: '—' },
        { item: 'Fibra alimentar', cemG: '— · a confirmar', porcao: '— · a confirmar', vd: '—' },
        { item: 'Sódio', cemG: '— · a confirmar', porcao: '— · a confirmar', vd: '—' }
      ]
    },

    aplicacao: {
      titulo: 'Doce e salgado — as duas direções',
      itens: [],
      duasColunas: {
        doce: [
          'Sobre iogurte natural, coalhada ou kefir.',
          'Com frutas frescas — banana, manga, morango.',
          'Em granolas, cookies, brownies e barras.',
          'Triturados sobre sobremesas geladas, no lugar de granulado.'
        ],
        salgado: [
          'Em saladas de folhas amargas com cítricos e azeite.',
          'Crosta para peixes, frango ou cordeiro, moídos com sal e pimenta.',
          'Farofa com castanhas, sal e ervas.',
          'Sobre legumes assados — abóbora, cenoura, beterraba.',
          'Mix de aperitivo com castanhas e flor de sal.'
        ]
      },
      rodape: 'Porção usual: 10 g. Manter em recipiente fechado após a abertura para preservar a crocância.'
    },

    conservacaoLogistica: {
      prazoValidade: '— · a confirmar',
      temperatura: '18 a 22 °C',
      umidadeMaxima: '65 %',
      condicoes: 'Ao abrigo da luz e da umidade, em embalagem bem fechada. Não refrigerar.',
      embalagemPrimaria: '— · a confirmar',
      dimensoesPesoBruto: '— · a confirmar',
      embalagemSecundaria: '— · a confirmar (unidades por caixa, dimensões, peso)'
    },

    origemCertificacao: {
      titulo: 'Cabruca, Mata Atlântica',
      origem: 'Serra Grande, Costa do Cacau, Bahia — Mata Atlântica',
      sistemaCultivo: 'Cabruca — sistema agroflorestal sob o dossel da floresta nativa, sem desmatamento e sem monocultura',
      certificacaoOrganica: 'IBD Certificações — www.ibd.com.br',
      numeroCertificadoValidade: '— · a confirmar',
      cadeia: 'Tree-to-bar — cultivo, beneficiamento e embalagem na mesma região'
    },

    fabricacao: {
      fabricante: 'Cabruca — Cooperativa dos Produtores Orgânicos do Sul da Bahia',
      cnpjIe: '04.293.272/0001-88 · 55.657.534-NO',
      endereco: 'Av. Nossa Senhora da Aparecida 2038, Nossa Senhora da Vitória — 45655-506 Ilhéus, Bahia, Brasil',
      distribuidoPor: 'Será Cacau Ltda — Serra Grande, Uruçuca, Bahia · seracacau.com.br',
      registroAnvisa: '— · a confirmar (isenção de registro a validar com o responsável técnico)',
      responsavelTecnico: '— · a confirmar (nome, formação e número de registro)'
    },

    controleDocumento: {
      versaoData: '1.0 · agosto de 2026',
      elaboradoPor: 'Será Cacau — área técnica',
      camposEmAberto: 'Composição bromatológica · granulometria · grau de torra · cádmio · alergênicos · microbiologia · validade · embalagem · EAN · certificado IBD · responsável técnico',
      proximaRevisao: 'Após a emissão dos laudos laboratoriais do lote vigente',
      nota: 'Esta ficha técnica é um documento controlado. Os campos marcados em destaque aguardam laudo laboratorial ou confirmação documental e serão preenchidos na próxima versão. Nenhum valor foi estimado.'
    }
  },

  // ----------------------------------------------------
  // 4. Baunilha Orgânica
  // ----------------------------------------------------
  {
    id: 'ft-baunilha-organica',
    slug: 'baunilha-organica',
    title: 'Baunilha orgânica',
    subtitle: 'Favas curadas da Mata Atlântica — Vanilla planifolia',
    headerMeta: 'SERÁ CACAU · SERRA GRANDE, COSTA DO CACAU, BAHIA · VERSÃO 1.1 · AGOSTO DE 2026',
    downloadPdfUrl: '/Ficha_Tecnica_Baunilha_Organica.pdf',
    pdfFileName: 'Ficha_Tecnica_Baunilha_Organica.pdf',
    pdfSize: '57 KB',

    identificacao: {
      denominacaoVenda: 'Fava de baunilha orgânica',
      nomeBotanico: 'Vanilla planifolia — família Orchidaceae',
      marcaLinha: 'Será — Ervas',
      apresentacoes: 'Caixa com 3 favas — 12 g aproximadamente · demais apresentações a confirmar',
      codigoEan: '— · a confirmar por apresentação',
      categoria: 'Especiaria — RDC 276/2005',
      origemBotanica: 'Mesoamérica — México',
      cultivoProducao: 'Região sul da Bahia — Mata Atlântica',
      notaRodape: 'A espécie Vanilla planifolia é originária da Mesoamérica. As favas desta ficha são cultivadas, colhidas e curadas no sul da Bahia — a origem do produto é brasileira.'
    },

    descricao: {
      titulo: 'A fava inteira, curada',
      paragrafos: [
        'Favas de baunilha orgânica cultivadas na Mata Atlântica do sul da Bahia, colhidas maduras e curadas de forma tradicional.',
        'Vagem longa, fina e flexível, de superfície levemente oleosa e brilhante. Dentro, a grande quantidade de sementes pretas conhecida como caviar de baunilha. A vanilina, principal composto aromático, está presente tanto nas sementes quanto na casca da fava.',
        'Sem extrato, sem álcool, sem aromatizante sintético — a especiaria em sua forma íntegra.'
      ]
    },

    composicao: {
      ingredientes: 'Fava de baunilha orgânica (100 %)',
      aditivos: 'Não contém aditivos e aromatizantes',
      gluten: 'Não contém glúten',
      lactose: 'Não contém lactose',
      alergicos: 'Não contém alergênicos de declaração obrigatória. Em casos raros pode ocorrer reação à vanilina.',
      fumigacaoIrradiacao: '— · a confirmar: declaração do produtor',
      origemVegetal: 'Produto 100 % vegetal — vegano'
    },

    organolepticas: {
      aspecto: 'Vagem longa, fina e flexível, superfície levemente oleosa e brilhante',
      odor: 'Rico, complexo e doce, com notas florais, de caramelo e de frutas',
      sabor: 'Intenso e inconfundível, liberado com o aquecimento',
      cor: 'Preta a marrom-escura, com possíveis tons avermelhados',
      aparencia: 'Vagem longa, fina e flexível, superfície levemente oleosa e brilhante',
      aroma: 'Rico, complexo e doce, com notas florais, de caramelo e de frutas',
      conteudoInterno: 'Sementes pretas em grande quantidade — o caviar de baunilha'
    },

    classificacao: {
      titulo: 'Grade A e Grade B',
      nota: 'Grade fornecida nesta apresentação: — · a confirmar. Ambas as grades servem para a produção de extratos; a diferença está no teor de umidade e na velocidade de liberação do aroma.',
      tabela: [
        { parametro: 'Umidade', gradeA: '25 a 35 %', gradeB: 'abaixo de 20 %' },
        { parametro: 'Comprimento', gradeA: 'acima de 17 cm', gradeB: 'variável' },
        { parametro: 'Textura', gradeA: 'carnuda e flexível', gradeB: 'fina, seca ao toque, quebradiça' },
        { parametro: 'Aparência', gradeA: 'oleosa e brilhante, marrom-chocolate a escura', gradeB: 'marrom-avermelhada, pouco ou nenhum brilho' },
        { parametro: 'Integridade', gradeA: 'íntegra', gradeB: 'pode apresentar aberturas, rachaduras e lesões' },
        { parametro: 'Indicação', gradeA: 'infusão direta em preparações, uso em cozinha', gradeB: 'extratos e preparações de longa maceração' }
      ]
    },

    fisicoQuimicas: {
      nota: 'Faixas de umidade e comprimento conforme especificação do fabricante. Os valores do lote vigente serão informados a partir do laudo laboratorial.',
      tabela: [
        { parametro: 'Umidade — Grade A', resultado: '25 a 35', unidade: '%', metodologia: 'Gravimetria' },
        { parametro: 'Umidade — Grade B', resultado: 'abaixo de 20', unidade: '%', metodologia: 'Gravimetria' },
        { parametro: 'Comprimento da fava — Grade A', resultado: 'acima de 17', unidade: 'cm', metodologia: 'Medição' },
        { parametro: 'Teor de vanilina', resultado: '— · a confirmar', unidade: 'g/100 g', metodologia: 'HPLC' },
        { parametro: 'Atividade de água', resultado: '— · a confirmar', unidade: 'aw', metodologia: '—' },
        { parametro: 'Método de cura e secagem', resultado: '— · a confirmar', unidade: '—', metodologia: '—' },
        { parametro: 'Safra', resultado: '— · a confirmar', unidade: '—', metodologia: '—' }
      ]
    },

    microbiologicas: {
      nota: 'Referência normativa vigente: IN 60/2019, que substituiu a RDC 12/2001. Os resultados são preenchidos a cada lote a partir do laudo do laboratório.',
      tabela: [
        { parametro: 'Salmonella sp. em 25 g', resultado: '— · a confirmar', limite: 'Ausência', metodologia: 'AFNOR BIO 12/16-09/05 VIDAS' },
        { parametro: 'Bolores e leveduras', resultado: '— · a confirmar', limite: 'IN 60/2019 — ANVISA', metodologia: 'ISO 21527-2' },
        { parametro: 'Escherichia coli', resultado: '— · a confirmar', limite: 'IN 60/2019 — ANVISA', metodologia: 'ISO 16649-2' }
      ]
    },

    informacaoNutricional: {
      titulo: 'Declaração',
      situacao: '— · a confirmar — especiarias podem estar dispensadas da declaração nutricional',
      baseNormativa: 'RDC 429/2020 e IN 75/2020 — enquadramento a validar com o responsável técnico',
      porcaoReferencia: 'Uso em quantidade não significativa do ponto de vista nutricional'
    },

    aplicacao: {
      titulo: 'Como usar a fava inteira',
      itens: [
        'Abrir a fava no sentido do comprimento e raspar as sementes pretas com a ponta da faca.',
        'Infundir a fava aberta em leite, creme ou bebida vegetal aquecida a 80 °C por 20 minutos, com a panela tampada. O sabor se libera com o calor.',
        'Com cacau 100 %: infundir a fava no líquido antes de dissolver as gotas — a baunilha arredonda o amargor sem adoçar.',
        'Doces: bolos, cremes, sorvetes, compotas e caldas caseiras.',
        'Salgados: molhos de manteiga, legumes assados, aves e frutos do mar.',
        'Guardar a fava já raspada em açúcar, sal ou mel para aromatizar.',
        'A casca pode ser reutilizada: secar e moer, ou usar em nova infusão.',
        'Rendimento usual: uma fava para 500 ml de líquido ou para uma receita de sobremesa.'
      ]
    },

    conservacaoLogistica: {
      prazoValidade: '— · a confirmar (indicado na embalagem)',
      antesAbrir: 'Local fresco, escuro e arejado, em recipiente hermético, para preservar o aroma',
      aposAbrir: 'Recipiente hermético, ao abrigo da luz. Não refrigerar — o frio resseca a fava.',
      temperatura: '18 a 25 °C',
      cristaisBrancos: 'Cristalização natural de vanilina — sinal de qualidade, não é mofo',
      embalagemPrimaria: 'Caixa com 3 favas — 12 g aproximadamente · demais formatos a confirmar',
      dimensoesPesoBruto: '— · a confirmar',
      embalagemSecundaria: '— · a confirmar (unidades por caixa, dimensões, peso)'
    },

    origemCertificacao: {
      titulo: 'Mata Atlântica, sul da Bahia',
      cultivoProducao: 'Região sul da Bahia — Mata Atlântica',
      sistemaCultivo: 'Sistema agroflorestal, consorciado com a floresta',
      certificacaoOrganica: 'IBD Certificações — www.ibd.com.br',
      numeroCertificadoValidade: '— · a confirmar'
    },

    fabricacao: {
      fabricante: 'Cabruca — Cooperativa dos Produtores Orgânicos do Sul da Bahia',
      cnpjIe: '04.293.272/0001-88 · 55.657.534',
      endereco: 'Av. Nossa Senhora Aparecida 2038, Nossa Senhora da Vitória — 45655-506 Ilhéus, Bahia, Brasil',
      distribuidoPor: 'Será Cacau Ltda — Serra Grande, Uruçuca, Bahia · seracacau.com.br',
      registroAnvisa: '— · a confirmar (isenção de registro a validar com o responsável técnico)',
      responsavelTecnico: '— · a confirmar (nome, formação e número de registro)'
    },

    controleDocumento: {
      versaoData: '1.1 · agosto de 2026',
      elaboradoPor: 'Será Cacau — área técnica',
      camposEmAberto: 'Grade fornecida · vanilina · atividade de água · método de cura · safra · fumigação · microbiologia · validade · embalagem secundária · EAN · certificado IBD · responsável técnico',
      proximaRevisao: 'Após a emissão dos laudos laboratoriais do lote vigente',
      nota: 'Esta ficha técnica é um documento controlado. Os campos marcados em destaque aguardam laudo laboratorial ou confirmação documental e serão preenchidos na próxima versão. Nenhum valor foi estimado.'
    }
  }
];
