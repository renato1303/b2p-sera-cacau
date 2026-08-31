/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Product, Campaign, NewsletterArticle, FileAttachment, Member, CommunityPost, GamificationReward, PointsEntry, GamificationTier } from './types';
export { RECIPES } from './data/recipes';
export { SCIENCE_ARTICLES } from './data/science';
export { INITIAL_FORUM_TOPICS } from './data/community';
export { SHOPIFY_INTEGRATION_METHODS, SHOPIFY_SUPPORT_TEMPLATE } from './data/shopifyGuide';
export { BLOG_POSTS, NEWSLETTER } from './data/blog';
export { TECHNICAL_SHEETS } from './data/technicalSheets';

export const ATTACHMENTS: FileAttachment[] = [
  {
    id: 'att-ft-cacau-100',
    name: 'Ficha Técnica — Cacau 100 % Orgânico (Massa de Cacau)',
    category: 'Ficha Técnica',
    size: '58 KB',
    downloadUrl: '/Ficha_Tecnica_Cacau_100_Organico.pdf'
  },
  {
    id: 'att-ft-cha-casca',
    name: 'Ficha Técnica — Chá da Casca de Cacau',
    category: 'Ficha Técnica',
    size: '52 KB',
    downloadUrl: '/Ficha_Tecnica_Cha_da_Casca_de_Cacau.pdf'
  },
  {
    id: 'att-ft-nibs',
    name: 'Ficha Técnica — Nibs de Cacau Orgânico',
    category: 'Ficha Técnica',
    size: '57 KB',
    downloadUrl: '/Ficha_Tecnica_Nibs_de_Cacau_Organico.pdf'
  },
  {
    id: 'att-ft-baunilha',
    name: 'Ficha Técnica — Baunilha Orgânica (Favas Curadas)',
    category: 'Ficha Técnica',
    size: '57 KB',
    downloadUrl: '/Ficha_Tecnica_Baunilha_Organica.pdf'
  },
  {
    id: 'att-guia-preparo',
    name: 'Guia de Preparo — Como preparar o seu cacau em casa',
    category: 'Guia',
    size: '22 KB',
    downloadUrl: '/Sera_Cacau_Guia_de_Preparo.pdf'
  },
  {
    id: 'att-lista-compras',
    name: 'Lista de Compras — Sete xícaras, uma lista',
    category: 'Guia',
    size: '25 KB',
    downloadUrl: '/Sera_Cacau_Lista_de_Compras.pdf'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Gotas de Será Cacau | 210g',
    slug: 'gotas-sera-cacau-210g',
    line: 'Cacau Ritual',
    category: 'Gotas',
    weight: '210g',
    tagline: 'Sua dose diária de presença e bem-estar.',
    story: 'As Gotas são o coração da Será Cacau. Feito com cacau 100% orgânico puro cultivado no sistema Cabruca, sob a copa da Mata Atlântica baiana. Desenvolvidas para facilitar o preparo diário sem adivinhação: 1 gota equivale exatamente a 1 grama de puro cacau. Nada adicionado, nada removido.',
    benefits: [
      'Teobromina: estimulante natural suave que proporciona foco limpo, sem o crash ou agitação do café.',
      'Flavonoides e Antioxidantes (+400): auxiliam no combate aos radicais livres e protegem a saúde cardiovascular.',
      'Magnésio, Ferro e Zinco naturais da floresta Cabruca que nutrem profundamente o organismo.',
      'Anandamida: conhecida como a molécula da felicidade, estimulando a sensação de harmonia.'
    ],
    ingredients: 'Cacau 100% orgânico e puro. Livre de glúten, lactose, açúcares e aditivos artificiais.',
    nutritionalTable: {
      servingSize: '20g (20 gotas)',
      calories: '112 kcal',
      carbohydrates: '6.2g',
      proteins: '2.6g',
      fats: '9.4g',
      sodium: '0mg',
      minerals: 'Magnésio: 58mg (22% VD), Ferro: 1.8mg (13% VD), Zinco: 0.9mg (12% VD)'
    },
    hasLaudo: true,
    laudoUrl: '#',
    protocol: 'Sugestão Clínica: Introduzir 15g a 20g no desjejum ou como lanche vespertino para foco e estabilidade neurocognitiva.',
    imageUrl: '/images/gotas210.jpeg',
    shopifyId: 'sh_gotas_210g',
    price: 'R$ 129,00',
    originCooperativa: 'Cooperativa de Mulheres da Cabruca - Sul da Bahia',
    discountCode: 'NUTRI15',
    discountDescription: '15% de desconto exclusivo para nutricionistas parceiras',
    buyUrl: 'https://www.seracacau.com.br/products/gotas-de-sera-cacau-210g'
  },
  {
    id: 'prod-2',
    name: 'Gotas de Será Cacau | 105g',
    slug: 'gotas-sera-cacau-105g',
    line: 'Cacau Ritual',
    category: 'Gotas',
    weight: '105g',
    tagline: 'O tamanho ideal para iniciar seu ritual de presença.',
    story: 'A versão de 105g foi desenhada para uma introdução perfeita ou como um presente de afeto para quem quer iniciar o ritual. O pote de vidro sofisticado protege as propriedades antioxidantes das gotas de cacau puro, além de se integrar elegantemente à cozinha de quem valoriza o design.',
    benefits: [
      'Ideal para experimentação e rituais iniciais.',
      'Embalagem compacta e de alta sofisticação editorial.',
      'Excelente opção para presentear pacientes e demonstrar cuidado.'
    ],
    ingredients: 'Cacau 100% orgânico e puro.',
    nutritionalTable: {
      servingSize: '20g (20 gotas)',
      calories: '112 kcal',
      carbohydrates: '6.2g',
      proteins: '2.6g',
      fats: '9.4g',
      sodium: '0mg'
    },
    hasLaudo: true,
    laudoUrl: '#',
    protocol: 'Excelente indicação para pacientes que necessitam de suporte continuado na modulação do humor.',
    imageUrl: '/images/gotas105.jpeg',
    shopifyId: 'sh_gotas_105g',
    price: 'R$ 79,00',
    originCooperativa: 'Cooperativa de Mulheres da Cabruca - Sul da Bahia',
    discountCode: 'NUTRI15',
    discountDescription: '15% de desconto exclusivo para nutricionistas parceiras',
    buyUrl: 'https://www.seracacau.com.br/products/gotas-de-sera-cacau-105g'
  },
  {
    id: 'prod-3',
    name: 'Será Cacau Disc | 36g',
    slug: 'sera-cacau-disc-36g',
    line: 'Cacau Ritual',
    category: 'Disc',
    weight: '36g',
    tagline: 'A introdução ideal para presentear ou degustar.',
    story: 'Um disco fino de cacau puro esculpido com precisão. Perfeito como produto de entrada, permitindo experimentar a intensidade e os aromas florais característicos da nossa mata antes de adquirir o abastecimento de gotas ou barras domésticas.',
    benefits: [
      'Perfeita porção individual de degustação.',
      'Embalagem compacta e de alta sofisticação editorial.',
      'Excelente opção para presentear pacientes e demonstrar carinho.'
    ],
    ingredients: 'Cacau 100% orgânico cultivado sob a sombra de árvores nativas da Mata Atlântica.',
    nutritionalTable: {
      servingSize: '18g (meio disco)',
      calories: '99 kcal',
      carbohydrates: '5.5g',
      proteins: '2.2g',
      fats: '8.1g',
      sodium: '0mg'
    },
    hasLaudo: false,
    imageUrl: '/images/disc.jpeg',
    shopifyId: 'sh_disc_36g',
    price: 'R$ 39,00',
    originCooperativa: 'Associação Agroflorestal de Serra Grande',
    discountCode: 'NUTRI15',
    discountDescription: '15% de desconto exclusivo para nutricionistas parceiras',
    buyUrl: 'https://www.seracacau.com.br/products/disco-sera-cacau-36g'
  },
  {
    id: 'prod-4',
    name: 'Será Fava de Baunilha | 1 unidade',
    slug: 'sera-baunilha-fava',
    line: 'Ervas Ritual',
    category: 'Baunilha',
    weight: '4g',
    tagline: 'O perfume incrivelmente raro da nossa floresta.',
    story: 'A baunilha brasileira da Será cresce de forma sinérgica na mesma agrofloresta Cabruca dos nossos cacauais. Considerada por botânicos e chefs especializados como uma das espécies de fava mais raras e perfumadas do mundo. Produzida em pequena escala com polinização totalmente manual.',
    benefits: [
      'Aroma exótico e floral inigualável, livre de extratos sintéticos.',
      'Promove uma harmonização aconchegante em bebidas quentes.',
      'Rica em compostos ativos voláteis benéficos para relaxamento.'
    ],
    ingredients: 'Uma fava íntegra de baunilha orgânica brasileira.',
    nutritionalTable: {
      servingSize: '0.5g',
      calories: '2 kcal',
      carbohydrates: '0.4g',
      proteins: '0g',
      fats: '0g',
      sodium: '0mg'
    },
    hasLaudo: true,
    laudoUrl: '#',
    protocol: 'Modulação de sabor: Ideal para infusão em leite vegetal aquecido, adoçado de forma natural, antes do repouso noturno.',
    imageUrl: '/images/baunilha.jpg',
    shopifyId: 'sh_vanilla_1fava',
    price: 'R$ 38,00',
    originCooperativa: 'Agricultura familiar integrada de Serra Grande, Bahia',
    discountCode: 'NUTRI15',
    discountDescription: '15% de desconto exclusivo para nutricionistas parceiras',
    buyUrl: 'https://www.seracacau.com.br/products/sera-baunilha-1-fava'
  },
  {
    id: 'prod-5',
    name: 'Barra Será Cacau | 200g',
    slug: 'barra-sera-cacau-200g',
    line: 'Cacau Puro em Barra',
    category: 'Barras',
    weight: '200g',
    tagline: 'A intensidade da floresta em barra pura para ralar, fatiar e emulsionar.',
    story: 'A Barra de Será Cacau 200g é moldada com cacau 100% puro de origem Cabruca do sul da Bahia. Ideal para nutricionistas e amantes da culinária ancestral que preferem ralar lascas frescas sobre preparos funcionais, produzir emulsões densas ou criar sobremesas terapêuticas de alta pureza.',
    benefits: [
      'Cacau 100% puro não alcalinizado de fermentação controlada.',
      'Altíssima concentração de flavonoides totais e teobromina bioativa.',
      'Versatilidade máxima: perfeita para ralar fina, picar em pedaços ou derreter em banho-maria.',
      'Rica em gordura saudável nobre (manteiga de cacau natural intacta).'
    ],
    ingredients: '100% amêndoas de cacau orgânico cultivado sob a sombra da Mata Atlântica.',
    nutritionalTable: {
      servingSize: '20g',
      calories: '114 kcal',
      carbohydrates: '6.0g',
      proteins: '2.8g',
      fats: '9.6g',
      sodium: '0mg',
      minerals: 'Magnésio: 62mg (24% VD), Ferro: 2.1mg (15% VD), Fósforo: 84mg'
    },
    hasLaudo: true,
    laudoUrl: '#',
    protocol: 'Sugestão Clínica: Ralar 15g a 20g sobre mingau de aveia, frutas vermelhas ou derreter a 55ºC para emulsão de foco matinal.',
    imageUrl: '/images/barra200g.jpeg',
    shopifyId: 'sh_barra_200g',
    price: 'R$ 119,00',
    originCooperativa: 'Cooperativa de Produtoras Agroflorestais da Bahia',
    discountCode: 'NUTRI15',
    discountDescription: '15% de desconto exclusivo para nutricionistas parceiras',
    buyUrl: 'https://www.seracacau.com.br/products/barra-sera-cacau-200g'
  },
  {
    id: 'prod-6',
    name: 'Barra Será Cacau | 450g',
    slug: 'barra-sera-cacau-450g',
    line: 'Cacau Puro em Barra',
    category: 'Barras',
    weight: '450g',
    tagline: 'O formato profissional e generoso para prescrição contínua e receitas.',
    story: 'A Barra de Será Cacau 450g foi criada para atender consultórios, clínicas integrativas e pacientes com consumo diário estabelecido. Garante melhor rendimento e economia, oferecendo uma reserva generosa do puro cacau Cabruca em sua forma mais sólida e nobre.',
    benefits: [
      'Excelente custo-benefício para consumo mensal contínuo.',
      'Permite porcionamento personalizado de acordo com o plano alimentar da nutricionista.',
      'Densidade fitoquímica elevada com preservação integral dos polifenóis.',
      'Embalagem sustentável e protetora contra oxidação.'
    ],
    ingredients: '100% cacau orgânico puro da Costa do Cacau Baiana.',
    nutritionalTable: {
      servingSize: '20g',
      calories: '114 kcal',
      carbohydrates: '6.0g',
      proteins: '2.8g',
      fats: '9.6g',
      sodium: '0mg',
      minerals: 'Magnésio: 62mg, Zinco: 1.1mg, Potássio: 195mg'
    },
    hasLaudo: true,
    laudoUrl: '#',
    protocol: 'Sugestão Clínica: Cortar em cubos padronizados de 10g e orientar consumo de 2 cubos/dia como cardioprotetor e estimulante de eNOS.',
    imageUrl: '/images/barras450g.jpeg',
    shopifyId: 'sh_barra_450g',
    price: 'R$ 249,00',
    originCooperativa: 'Cooperativa de Produtoras Agroflorestais da Bahia',
    discountCode: 'NUTRI15',
    discountDescription: '15% de desconto exclusivo para nutricionistas parceiras',
    buyUrl: 'https://www.seracacau.com.br/products/barra-sera-cacau-450g'
  },
  {
    id: 'prod-7',
    name: 'Nibs de Será Cacau | 250g',
    slug: 'nibs-de-sera-cacau-250g',
    line: 'Cacau Crocante',
    category: 'Nibs',
    weight: '250g',
    tagline: 'A pura amêndoa de cacau torrada e quebrada com crocância marcante.',
    story: 'Os Nibs da Será Cacau são pedacinhos da amêndoa de cacau 100% puro fermentada e torrada com extrema delicadeza. Mantêm a casca removida e toda a fibra e manteiga natural da amêndoa intactas, proporcionando uma explosão de textura crocante e sabor intenso de notas florais e terrosas.',
    benefits: [
      'Textura crocante inigualável sem adição de açúcar ou gorduras hidrogenadas.',
      'Rico em fibras solúveis e insolúveis que atuam como prebióticos colônicos.',
      'Estimula a mastigação ativa e a liberação de peptídeos de saciedade (CCK e GLP-1).',
      'Fonte abundante de antioxidantes fenólicos estáveis.'
    ],
    ingredients: 'Amêndoas de cacau orgânico puro tostadas e quebradas.',
    nutritionalTable: {
      servingSize: '15g (1 colher de sopa)',
      calories: '86 kcal',
      carbohydrates: '4.2g (sendo 3.1g fibras)',
      proteins: '2.1g',
      fats: '7.2g',
      sodium: '0mg',
      minerals: 'Magnésio: 42mg (16% VD), Ferro: 1.2mg'
    },
    hasLaudo: true,
    laudoUrl: '#',
    protocol: 'Sugestão Clínica: Prescrever 1 a 2 colheres de sopa sobre iogurte vegetal, frutas picadas ou açaí puro como topping funcional sacietógeno.',
    imageUrl: '/images/nibssera250.jpeg',
    shopifyId: 'sh_nibs_250g',
    price: 'R$ 109,00',
    originCooperativa: 'Associação Agroflorestal de Serra Grande, Bahia',
    discountCode: 'NUTRI15',
    discountDescription: '15% de desconto exclusivo para nutricionistas parceiras',
    buyUrl: 'https://www.seracacau.com.br/products/nibs-de-sera-cacau-250g'
  },
  {
    id: 'prod-8',
    name: 'Nibs de Será Cacau | 75g',
    slug: 'nibs-de-sera-cacau-75g',
    line: 'Cacau Crocante',
    category: 'Nibs',
    weight: '75g',
    tagline: 'O pote compacto para degustação e praticidade na rotina.',
    story: 'Apresentado em pote de vidro âmbar elegante, o Nibs 75g é perfeito para deixar na mesa de trabalho, no consultório para apresentação aos pacientes ou levar na bolsa como snack limpo de emergência.',
    benefits: [
      'Embalagem compacta e hermética de vidro farmacêutico.',
      'Ótima opção para kits de boas-vindas aos pacientes no consultório.',
      'Crocância pura sem nenhum tipo de aditivo químico.'
    ],
    ingredients: 'Amêndoas de cacau orgânico selecionadas da Cabruca.',
    nutritionalTable: {
      servingSize: '15g',
      calories: '86 kcal',
      carbohydrates: '4.2g',
      proteins: '2.1g',
      fats: '7.2g',
      sodium: '0mg',
      minerals: 'Magnésio: 42mg, Ferro: 1.2mg'
    },
    hasLaudo: true,
    laudoUrl: '#',
    protocol: 'Sugestão Clínica: Degustação orientada no consultório para exercitar o paladar e ensinar a mastigação consciente.',
    imageUrl: '/images/nibssera75.jpeg',
    shopifyId: 'sh_nibs_75g',
    price: 'R$ 39,00',
    originCooperativa: 'Associação Agroflorestal de Serra Grande, Bahia',
    discountCode: 'NUTRI15',
    discountDescription: '15% de desconto exclusivo para nutricionistas parceiras',
    buyUrl: 'https://www.seracacau.com.br/products/nibs-de-sera-cacau-75g'
  },
  {
    id: 'prod-9',
    name: 'Chá de Casca de Cacau | 25g',
    slug: 'cha-de-casca-de-cacau-25g',
    line: 'Infusões da Floresta',
    category: 'Chás & Infusões',
    weight: '25g',
    tagline: 'A infusão dourada com o perfume reconfortante do cacau e zero calorias.',
    story: 'As cascas das amêndoas de cacau guardam uma riqueza fitoquímica singular e aromas florais extremamente aconchegantes. Após a torra branda, as cascas são separadas cuidadosamente e embaladas para infusão em água quente, gerando uma bebida límpida, naturalmente perfumada e digestiva.',
    benefits: [
      'Zero caloria e zero carboidrato, ideal para jejum intermitente.',
      'Aporte suave de teobromina para relaxamento muscular e alerta sereno.',
      'Estimula a digestão pós-prandial com sabor que remete ao chocolate suave.',
      'Aproveitamento integral e circular do fruto sagrado da Cabruca.'
    ],
    ingredients: 'Cascas íntegras e selecionadas de amêndoas de cacau orgânico puro.',
    nutritionalTable: {
      servingSize: '3g (1 colher de sopa)',
      calories: '< 2 kcal',
      carbohydrates: '0.4g',
      proteins: '0g',
      fats: '0g',
      sodium: '0mg',
      minerals: 'Polifenóis voláteis solúveis em água'
    },
    hasLaudo: true,
    laudoUrl: '#',
    protocol: 'Sugestão Clínica: Infundir 1 colher de sopa em 200ml de água a 90ºC por 6 minutos. Prescrever após almoço ou lanche vespertino.',
    imageUrl: '/images/chadecasca.jpeg',
    shopifyId: 'sh_cha_casca_25g',
    price: 'R$ 22,00',
    originCooperativa: 'Cooperativa de Mulheres da Cabruca - Sul da Bahia',
    discountCode: 'NUTRI15',
    discountDescription: '15% de desconto exclusivo para nutricionistas parceiras',
    buyUrl: 'https://www.seracacau.com.br/products/cha-de-casca-de-cacau-25g'
  },
  {
    id: 'prod-10',
    name: 'Kit Início Será Cacau | Gotas 105g & Xícara',
    slug: 'kit-inicio-sera-cacau-gotas-105g-xicara',
    line: 'Kits & Presentes',
    category: 'Kits Ritual',
    weight: '105g + Xícara',
    tagline: 'O conjunto completo para ancorar o ritual de presença na sua rotina.',
    story: 'Um encontro entre a fitoquímica da floresta e o artesanato brasileiro de terra. O Kit Início reúne o pote de Gotas de Será Cacau 105g e uma xícara em cerâmica rústica modelada manualmente em alta temperatura. Desenhada para acolher o calor nas palmas das mãos e transformar o preparo em um momento diário de autocuidado.',
    benefits: [
      'Experiência sensorial completa: textura, sabor, aroma e ergonomia.',
      'Acompanha xícara exclusiva feita à mão por artesãs locais.',
      'Presente inesquecível para novas pacientes ou abertura de consultas.',
      'Pote reutilizável de vidro nobre e sustentável.'
    ],
    ingredients: 'Gotas de cacau 100% puro (105g) + 1 Xícara de cerâmica artesanal brasileira (180ml).',
    nutritionalTable: {
      servingSize: '20g de gotas',
      calories: '112 kcal',
      carbohydrates: '6.2g',
      proteins: '2.6g',
      fats: '9.4g',
      sodium: '0mg',
      minerals: 'Magnésio: 58mg'
    },
    hasLaudo: true,
    laudoUrl: '#',
    protocol: 'Sugestão Clínica: Utilizar o kit como ancoragem física no consultório para demonstrar a prática de Mindfulness e alimentação consciente.',
    imageUrl: '/images/kitseracacau.jpeg',
    shopifyId: 'sh_kit_inicio_gotas_xicara',
    price: 'R$ 179,00',
    originCooperativa: 'Cooperativa de Mulheres da Cabruca & Ateliê Terra Bahiana',
    discountCode: 'NUTRI15',
    discountDescription: '15% de desconto exclusivo para nutricionistas parceiras',
    buyUrl: 'https://www.seracacau.com.br/products/kit-inicio-sera-cacau-gotas-105g-xicara'
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'A Jornada do Cacau Cabruca',
    description: 'Compreenda a fundo a história, o cultivo agroflorestal tradicional baiano, a fitoquímica do cacau puro e a prescrição prática em consultório com a nutricionista Luna Azevedo.',
    category: 'História',
    instructor: 'Luna Azevedo',
    duration: '7 Dias + Introdução',
    coverImage: '/images/img_4189.jpg',
    certificateEnabled: true,
    communityEnabled: true,
    visibility: 'Somente Matriculadas',
    enrolledMemberIds: ['mem-1', 'mem-2', 'mem-3', 'mem-4'],
    modules: [
      {
        id: 'c1-m1',
        title: 'Módulo 1: Fundamentos e Origem Agroflorestal',
        description: 'Boas-vindas, história e imersão no solo da floresta Cabruca.',
        locked: false,
        classes: [
          {
            id: 'c1-m1-cl0',
            title: 'Introdução',
            duration: '0:55 min',
            videoUrl: 'https://vimeo.com/1215499110?fl=tl&fe=ec',
            summary: `Oi, nutris! Que alegria ter você aqui.

Amanhã começa o Cacau na Prática — sete manhãs, sete xícaras, sete temas. A cada dia, a Luna traz uma aula curta e uma receita nova para você preparar em casa e, depois, levar para a consulta.

Antes de começar, dois presentes para hoje:

→ O vídeo de boas-vindas da Luna (aqui em cima)
→ O guia de preparo (PDF anexo): como fazer o seu cacau em casa — na panela, no espumador ou direto na xícara. A Luna também gravou um vídeo mostrando o passo a passo.

Separe as suas Gotas de Cacau Puro (105 g, já no seu kit) e a primeira especiaria: canela-do-Ceilão. Amanhã a gente começa do começo — da floresta.

Até amanhã. Bom descanso.`,
            pdfAttachments: [
              {
                id: 'att-intro-1',
                name: 'Lista de Compras — Sete xícaras, uma lista',
                category: 'PDF',
                size: '25 KB',
                downloadUrl: '/Sera_Cacau_Lista_de_Compras.pdf'
              },
              {
                id: 'att-intro-2',
                name: 'Guia de Preparo — Como preparar o seu cacau em casa',
                category: 'PDF',
                size: '22 KB',
                downloadUrl: '/Sera_Cacau_Guia_de_Preparo.pdf'
              }
            ]
          },
          {
            id: 'c1-m1-cl1',
            title: 'Dia 01',
            duration: '3:19 min',
            videoUrl: 'https://vimeo.com/1215510972?fl=tl&fe=ec',
            summary: `Hoje não começa pela receita — começa pela floresta.

A Luna te leva à Cabruca, o sistema de agrofloresta da Costa do Cacau, e mostra por que o cacau cultivado à sombra tem mais polifenóis e flavonoides — e por que isso importa na sua prescrição.

→ Aula do dia: de onde vem esse cacau (e a diferença que importa)
→ Receita do dia: Cacau + Canela-do-Ceilão — a primeira xícara, a mais simples e a mais clínica (imagem abaixo)

Prepare, prove antes de adoçar e me conta: como foi a sua primeira xícara?`,
            pdfAttachments: [
              {
                id: 'att-dia-01',
                name: 'Material da Aula e Receita — Dia 01',
                category: 'PDF',
                size: '280 KB',
                downloadUrl: '/Sera_Cacau_Dia01.jpg'
              }
            ]
          },
          {
            id: 'c1-m1-cl2',
            title: 'Dia 02',
            duration: '20 min',
            videoUrl: 'https://vimeo.com/1215498725?share=copy&fl=sv&fe=ci',
            summary: `Bom dia, nutris. Segunda xícara.
"Mas cacau não tem cafeína? Não vai me agitar?" A resposta é química — e hoje a Luna explica. Teobromina não é cafeína: estímulo mais gradual, sem o pico e a queda do café. E o cacau puro é uma das fontes mais densas de magnésio que existem (~520 mg/100 g).

→ Aula do dia: o que o cacau faz no seu sistema nervoso
→ Receita do dia: Cacau + Cardamomo — calma e lucidez na mesma xícara (imagem abaixo)

Dica: uma pitada de sal marinho realça o amargor. Prove antes de adoçar.`,
            pdfAttachments: [
              {
                id: 'att-dia-02',
                name: 'Material da Aula e Receita — Dia 02',
                category: 'PDF',
                size: '229 KB',
                downloadUrl: '/Sera_Cacau_Dia02.jpg'
              }
            ]
          },
          {
            id: 'c1-m1-cl3',
            title: 'Dia 03',
            duration: '22 min',
            videoUrl: 'https://vimeo.com/1215498630?fl=tl&fe=ec',
            summary: `Bom dia, nutris. Terceira xícara — e talvez o dia favorito da Luna.
Aquela vontade de chocolate nos dias antes da menstruação não é frescura: na fase lútea, o magnésio intracelular cai. O chocolate industrializado responde com açúcar; o cacau puro responde com magnésio de verdade e triptofano.

→ Aula do dia: cacau, magnésio e o ciclo feminino
→ Receita do dia: Cacau + Gengibre + Baunilha Bourbon Será — a xícara que o corpo pede quando a lua se aproxima (imagem abaixo)

Protocolo: 15 g por dia, nos 10 dias antes da menstruação.`,
            pdfAttachments: [
              {
                id: 'att-dia-03',
                name: 'Material da Aula e Receita — Dia 03',
                category: 'PDF',
                size: '255 KB',
                downloadUrl: '/Sera_Cacau_Dia03.jpg'
              }
            ]
          }
        ]
      },
      {
        id: 'c1-m2',
        title: 'Módulo 2: Prática Clínica, Ritual e Prescrição',
        description: 'Cadeia de valor, ritual de preparo e condução do paciente em consultório.',
        locked: false,
        classes: [
          {
            id: 'c1-m2-cl4',
            title: 'Dia 04',
            duration: '3:55 min',
            videoUrl: 'https://vimeo.com/1215498477?fl=tl&fe=ec',
            summary: `Bom dia, nutris. Quarta xícara.
Hoje a Luna não recomenda nenhum app de produtividade. Pelo contrário: ela fala sobre virar o celular para baixo, pegar a xícara e não fazer nada por um momento — e por que, neurologicamente, isso é das coisas mais produtivas que existem (oi, Default Mode Network). Desconectar para reconectar.

→ Aula do dia: foco, criatividade e o que acontece quando você desconecta
→ Receita do dia: Cacau + Cúrcuma + Pimenta-do-Reino — quando o foco precisa vir de dentro (imagem abaixo)

A pimenta não é opcional: ela eleva muito a biodisponibilidade da curcumina.`,
            pdfAttachments: [
              {
                id: 'att-dia-04',
                name: 'Material da Aula e Receita — Dia 04',
                category: 'PDF',
                size: '234 KB',
                downloadUrl: '/Sera_Cacau_Dia04.jpg'
              }
            ]
          },
          {
            id: 'c1-m2-cl5',
            title: 'Dia 05',
            duration: '3:25 min',
            videoUrl: 'https://vimeo.com/1215498476?fl=tl&fe=ec',
            summary: `Bom dia, nutris. Quinta xícara.

Onde está 90% da sua serotonina? No intestino. Hoje a Luna mostra como os flavonoides do cacau — sobretudo as procianidinas — chegam ao cólon e funcionam como prebiótico, alimentando Lactobacillus e Bifidobacterium.

→ Aula do dia: microbioma, eixo intestino-cérebro e o cacau como alimento funcional
→ Receita do dia: Cacau + Erva-Doce + Gengibre — a xícara que se senta com o seu intestino (imagem abaixo)

Boa para depois do almoço.`,
            pdfAttachments: [
              {
                id: 'att-dia-05',
                name: 'Material da Aula e Receita — Dia 05',
                category: 'PDF',
                size: '252 KB',
                downloadUrl: '/Sera_Cacau_Dia05.jpg'
              }
            ]
          },
          {
            id: 'c1-m2-cl6',
            title: 'Dia 06',
            duration: '25 min',
            videoUrl: 'https://vimeo.com/1215498478?fl=tl&fe=ec',
            summary: `Bom dia, nutris. Sexta xícara.
Energia que sustenta — não a que sobe rápido e cai duas horas depois. Hoje a Luna fala de cacau no esporte (epicatequina, óxido nítrico, recuperação) e de uma saída honesta do ciclo café-exaustão-café.

→ Aula do dia: energia, movimento e a conversa sobre o café
→ Receita do dia: Cacau + Ashwagandha + Canela — a xícara para quando tudo está pedindo muito (imagem abaixo)

O desafio da Luna: troque o segundo café pelo cacau essa semana. Só isso.`,
            pdfAttachments: [
              {
                id: 'att-dia-06',
                name: 'Material da Aula e Receita — Dia 06',
                category: 'PDF',
                size: '238 KB',
                downloadUrl: '/Sera_Cacau_Dia06.jpg'
              }
            ]
          },
          {
            id: 'c1-m2-cl7',
            title: 'Dia 07',
            duration: '9:36 min',
            videoUrl: 'https://vimeo.com/1215498475?fl=tl&fe=ec',
            summary: `Boa tarde, nutris. 
Sétima e última xícara.

Hoje não tem conteúdo novo — tem integração. Como você leva tudo isso para a consulta: dose, frequência, para quem, e o que responder quando a paciente pergunta “mas não é só chocolate?”. A Luna fecha com o guia de prescrição e os cinco perfis que mais se beneficiam.

→ Aula do dia: da xícara à consulta — prescrever com segurança e confiança
→ Receita do dia: Cacau + Hibisco + Gengibre — a última xícara, a que guarda o coração (imagem abaixo)

Obrigada por esses sete dias com a gente. Isso é só o começo`,
            pdfAttachments: [
              {
                id: 'att-dia-07',
                name: 'Material da Aula e Receita — Dia 07',
                category: 'PDF',
                size: '284 KB',
                downloadUrl: '/Sera_Cacau_Dia07.jpg'
              }
            ]
          }
        ]
      }
    ]
  }
];

export const MEMBERS: Member[] = [
  { id: 'mem-1', name: 'Dra. Marina Silva', email: 'marina.silva@saude.com.br', crn: 'CRN-3 71830', city: 'São Paulo', state: 'SP', enrolledCourseIds: ['course-1'], joinedDate: '12 Jan 2026', totalPoints: 760, tier: 'Ouro' },
  { id: 'mem-2', name: 'Dra. Rebeca Lemos', email: 'rebeca.lemos@nutriclin.com.br', crn: 'CRN-3 82193', city: 'São Paulo', state: 'SP', enrolledCourseIds: ['course-1'], joinedDate: '03 Fev 2026', totalPoints: 450, tier: 'Prata' },
  { id: 'mem-3', name: 'Dr. Thiago Medeiros', email: 'thiago.medeiros@consultorio.com.br', crn: 'CRN-5 45210', city: 'Salvador', state: 'BA', enrolledCourseIds: ['course-1'], joinedDate: '21 Mar 2026', totalPoints: 1400, tier: 'Diamante' },
  { id: 'mem-4', name: 'Dra. Gabriela Sales', email: 'gabriela.sales@nutri.com.br', crn: 'CRN-1 90218', city: 'Brasília', state: 'DF', enrolledCourseIds: ['course-1'], joinedDate: '02 Jun 2026', totalPoints: 50, tier: 'Bronze' },
  { id: 'mem-5', name: 'Dra. Mariana Preto', email: 'mariana.preto@e4markerting.com.br', crn: 'CRN-3 99880', city: 'São Paulo', state: 'SP', enrolledCourseIds: ['course-1'], joinedDate: '04 Ago 2026', totalPoints: 150, tier: 'Bronze' }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  { id: 'post-1', courseId: 'course-1', authorName: 'Dra. Rebeca Lemos', authorRole: 'Nutricionista Clínica', content: 'Fiquei encantada com a aula sobre o sistema Cabruca! Já comecei a citar os dados de biodiversidade nas minhas consultas.', date: 'Há 2 dias', likes: 14, replies: [
    { id: 'reply-1', authorName: 'Dra. Marina Silva', content: 'Sim! Uso como gancho pra falar de consumo consciente com pacientes engajadas em sustentabilidade.', date: 'Há 1 dia' }
  ]},
  { id: 'post-2', courseId: 'course-1', authorName: 'Luna Azevedo', authorRole: 'Instrutora', content: 'Bem-vindas à turma! Qualquer dúvida sobre a origem do cacau Cabruca e seu manejo, pode postar aqui — respondo pessoalmente.', date: 'Há 5 dias', likes: 22, replies: [] },
  { id: 'post-3', courseId: 'course-1', authorName: 'Dr. Thiago Medeiros', authorRole: 'Nutricionista Esportivo', content: 'Excelente conteúdo sobre a produção agroflorestal da Costa do Cacau!', date: 'Há 8 horas', likes: 6, replies: [] }
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Amostras de Será Baunilha na Próxima Indicação',
    description: 'Queremos que seus pacientes experimentem o aroma precioso da baunilha brasileira da Será. Nutricionistas ativas ganham 10 kits de amostras exclusivas para presentear no consultório em suas próximas indicações.',
    imageUrl: '/images/brazilian_vanilla_1783964119929.jpg',
    date: 'Disponível até 30 de Julho, 2026',
    buttonLabel: 'Reivindicar Amostras de Baunilha',
    buttonUrl: '#',
    attachments: [ATTACHMENTS[5]]
  },
  {
    id: 'camp-2',
    title: 'Dia Nacional da Nutricionista: Pausa e Valor',
    description: 'Em comemoração ao dia do nutricionista, preparamos uma ação de afeto. Enviaremos uma cerâmica artesanal produzida pela linha de acessórios Será Terra para as profissionais pioneiras que acompanham nossa jornada.',
    imageUrl: '/images/artisanal_ceramics_1783964151303.jpg',
    date: 'Válido em todo o Brasil',
    buttonLabel: 'Ver Detalhes da Ação',
    buttonUrl: '#'
  }
];

export const POINTS_HISTORY: PointsEntry[] = [
  { id: 'pe-1', memberId: 'mem-1', points: 150, reason: 'Indicação de nova nutricionista parceira', date: '10 Abr 2026' },
  { id: 'pe-2', memberId: 'mem-1', points: 100, reason: 'Conclusão do curso A Jornada do Cacau Cabruca', date: '15 Abr 2026' },
  { id: 'pe-3', memberId: 'mem-1', points: 360, reason: 'Prescrição e venda de 12 unidades Gotas 210g', date: '02 Mai 2026' },
  { id: 'pe-4', memberId: 'mem-1', points: 150, reason: 'Conclusão do curso Ciência, Ativos Neurocognitivos e Presença', date: '10 Mai 2026' },
  
  { id: 'pe-5', memberId: 'mem-2', points: 100, reason: 'Conclusão do curso A Jornada do Cacau Cabruca', date: '15 Abr 2026' },
  { id: 'pe-6', memberId: 'mem-2', points: 150, reason: 'Indicação de nova nutricionista parceira', date: '20 Abr 2026' },
  { id: 'pe-7', memberId: 'mem-2', points: 200, reason: 'Prescrição e venda de 5 unidades Gotas 210g', date: '04 Mai 2026' },

  { id: 'pe-8', memberId: 'mem-3', points: 100, reason: 'Conclusão do curso A Jornada do Cacau Cabruca', date: '15 Abr 2026' },
  { id: 'pe-9', memberId: 'mem-3', points: 150, reason: 'Conclusão do curso Ciência, Ativos Neurocognitivos e Presença', date: '22 Abr 2026' },
  { id: 'pe-10', memberId: 'mem-3', points: 900, reason: 'Prescrição e venda de 30 unidades Gotas 210g', date: '05 Mai 2026' },
  { id: 'pe-11', memberId: 'mem-3', points: 250, reason: 'Palestra técnica sobre cacau na nutrição esportiva', date: '12 Mai 2026' },

  { id: 'pe-12', memberId: 'mem-4', points: 50, reason: 'Cadastro no portal de parceiras', date: '02 Jun 2026' }
];

export const REWARDS: GamificationReward[] = [
  { id: 'rew-1', title: 'Kit de Amostras Grátis', description: 'Pote compacto de Gotas 105g para demonstração clínica no consultório.', pointsRequired: 200, icon: 'Gift' },
  { id: 'rew-2', title: 'Desconto de 15% na próxima compra', description: 'Cupom de desconto adicional para reabastecimento do estoque do consultório.', pointsRequired: 500, icon: 'Tag' },
  { id: 'rew-3', title: 'Mentoria Científica com Dra. Luna', description: 'Sessão individual de 45 minutos para alinhar protocolos clínicos personalizados para seus pacientes.', pointsRequired: 800, icon: 'Award' },
  { id: 'rew-4', title: 'Convite para Encontro Anual Será Cacau', description: 'Ingresso exclusivo com tudo pago para o encontro anual agroflorestal na Cabruca (Bahia).', pointsRequired: 1200, icon: 'Sparkles' }
];
