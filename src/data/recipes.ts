/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  // =========================================================================
  // 12 RECEITAS DA DANI (DO CADERNO OFICIAL / PDFS — EM ORDEM NUMÉRICA 01 A 26)
  // =========================================================================
  {
    id: 'rec-dani-01',
    numberCode: '01',
    badgeHeader: '01 BEBIDA QUENTE · 5 MIN',
    title: 'Cacau Puro na Xícara',
    slug: 'cacau-puro-na-xicara',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '5 min',
    yield: '1 porção (180ml)',
    difficulty: 'Fácil',
    description: 'O ponto de partida. Sem leite, sem açúcar, sem enfeite — só cacau e água quente, do jeito que ele é. Se você nunca bebeu cacau 100% puro, comece por aqui: é assim que você aprende o sabor da nossa Cabruca.',
    ingredients: [
      { item: 'Gotas de Será Cacau', amount: '20 g', notes: 'cerca de 20 gotas' },
      { item: 'água bem quente, quase fervendo', amount: '180 ml' },
      { item: 'sal', amount: '1 pitada' }
    ],
    instructions: [
      'Coloque as gotas na xícara e cubra com dois dedos de água quente.',
      'Espere trinta segundos e mexa até dissolver por completo.',
      'Complete com o restante da água, acerte com o sal e mexa mais uma vez.'
    ],
    tip: 'O sal não deixa a bebida salgada — ele apara o amargor e traz a fruta do cacau para frente.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Bebida Quente', 'Cacau Puro', 'Ritual Matinal', 'Cabruca', 'Zero Açúcar'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '240mg',
      polyphenolsMg: '380mg',
      calories: '112 kcal',
      macronutrients: 'Carboidratos: 6.2g | Proteínas: 2.6g | Gorduras: 9.4g',
      clinicalIndications: [
        'Presença e ancoragem sensorial no desjejum',
        'Aporte de teobromina pura sem elevação de glicemia',
        'Estímulo de foco sustentado e alerta sereno'
      ],
      contraindications: ['Sensibilidade severa a metilxantinas no período noturno tardio'],
      optimalTiming: 'Desjejum matinal ou início da tarde.',
      synergies: ['Sal mineral (sódio) realçando a doçura e notas frutadas naturais do cacau']
    }
  },
  {
    id: 'rec-dani-02',
    numberCode: '02',
    badgeHeader: '02 BEBIDA QUENTE · 7 MIN',
    title: 'Cacau Quente Calmante',
    slug: 'cacau-quente-calmante',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '7 min',
    yield: '1 porção (240ml)',
    difficulty: 'Fácil',
    description: 'O fim do dia pede um sinal claro de que acabou. Canela, baunilha e uma xícara quente na mão fazem esse trabalho melhor do que qualquer doce.',
    ingredients: [
      { item: 'leite vegetal', amount: '240 ml' },
      { item: 'Gotas de Será Cacau', amount: '20 g', notes: 'cerca de 20 gotas' },
      { item: 'canela em pó', amount: '1/2 colher de chá' },
      { item: 'extrato natural de baunilha', amount: '1/2 colher de chá' },
      { item: 'sal', amount: '1 pitada' }
    ],
    instructions: [
      'Aqueça o leite sem deixar ferver.',
      'Junte as gotas e mexa até dissolver por completo.',
      'Finalize com canela, baunilha e sal. Sirva imediatamente.'
    ],
    tip: 'Bata com um mixer de leite por dez segundos antes de servir — a espuma muda a experiência inteira.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Bebida Quente', 'Calmante', 'Canela & Baunilha', 'Fim de Tarde', 'Conforto'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '240mg',
      polyphenolsMg: '390mg',
      calories: '165 kcal',
      macronutrients: 'Carboidratos: 8g | Proteínas: 4g | Gorduras: 12g',
      clinicalIndications: [
        'Desaceleração do final de tarde e modulação parassimpática',
        'Controle do craving noturno por sobremesas hiperpalatáveis',
        'Estímulo de relaxamento muscular proporcionado pelo magnésio'
      ],
      contraindications: ['Nenhuma relevante nas doses habituais'],
      optimalTiming: 'Fim de tarde (17h - 19h).',
      synergies: ['Canela do Ceilão e baunilha natural atuando no conforto olfativo e límbico']
    }
  },
  {
    id: 'rec-dani-03',
    numberCode: '03',
    badgeHeader: '03 BEBIDA GELADA · 5 MIN',
    title: 'Mocha Gelado sem Açúcar',
    slug: 'mocha-gelado-sem-acucar',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '5 min',
    yield: '1 copo (360ml)',
    difficulty: 'Fácil',
    description: 'Para a tarde em que o corpo pede recompensa e a cabeça pede foco. Café e cacau dividem a conta: um dá o impulso, o outro dá a duração.',
    ingredients: [
      { item: 'café forte, quente', amount: '120 ml' },
      { item: 'Gotas de Será Cacau', amount: '20 g', notes: 'cerca de 20 gotas' },
      { item: 'leite vegetal gelado', amount: '240 ml' },
      { item: 'extrato natural de baunilha', amount: '1/2 colher de chá' },
      { item: 'Gelo a gosto', amount: 'A gosto' }
    ],
    instructions: [
      'Dissolva as gotas no café quente, mexendo até ficar liso.',
      'Encha o copo com gelo e o leite vegetal.',
      'Despeje o café com cacau por cima, deixando o desenho aparecer no vidro.'
    ],
    tip: 'Sirva sem misturar. As camadas se encontram no primeiro gole e o contraste faz parte.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Bebida Gelada', 'Mocha', 'Café & Cacau', 'Foco', 'Sem Açúcar'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '240mg + Cafeína equilibrada',
      polyphenolsMg: '420mg',
      calories: '160 kcal',
      macronutrients: 'Carboidratos: 7g | Proteínas: 4g | Gorduras: 12g',
      clinicalIndications: [
        'Estímulo de foco cognitivo sem queda brusca de energia',
        'Sinergia neuroativa de cafeína e teobromina para tarefas complexas'
      ],
      contraindications: ['Pacientes com insônia grave devem evitar após as 15h'],
      optimalTiming: 'Início da tarde (13h30 - 15h).',
      synergies: ['Cafeína (início rápido) + Teobromina (sustentação de alerta de meia-vida longa)']
    }
  },
  {
    id: 'rec-dani-04',
    numberCode: '04',
    badgeHeader: '04 BEBIDA GELADA · 5 MIN',
    title: 'Tônica de Cacau',
    slug: 'tonica-de-cacau',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '5 min',
    yield: '1 taça (250ml)',
    difficulty: 'Fácil',
    description: 'O truque das cinco da tarde. Parece drink, tem cara de coisa boa, e resolve a vontade de doce sem passar por ela.',
    ingredients: [
      { item: 'Gotas de Será Cacau', amount: '10 g', notes: 'cerca de 10 gotas' },
      { item: 'água quente', amount: '1 colher de sopa' },
      { item: 'água com gás bem gelada', amount: '240 ml' },
      { item: 'suco de limão', amount: '1 colher de sopa' },
      { item: 'Folhas de hortelã', amount: 'A gosto' },
      { item: 'Gelo', amount: 'A gosto' }
    ],
    instructions: [
      'Dissolva as gotas na água quente até virar uma pasta lisa.',
      'Coloque a pasta no fundo da taça e junte o gelo.',
      'Complete com a água com gás, o limão e a hortelã. Mexa devagar, para não perder o gás.'
    ],
    tip: 'Amasse a hortelã na palma da mão antes de colocar. O aroma sai sem o amargor da folha rasgada.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Drink Refrescante', 'Bebida Gelada', 'Hortelã & Limão', 'Água com Gás', 'Sem Álcool'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '120mg',
      polyphenolsMg: '210mg',
      calories: '58 kcal',
      macronutrients: 'Carboidratos: 3.2g | Proteínas: 1.3g | Gorduras: 4.7g',
      clinicalIndications: [
        'Substituição de drinks alcoólicos e refrigerantes no final de tarde',
        'Hidratação refrescante com flavonoides e polifenóis preservados'
      ],
      contraindications: ['Nenhuma'],
      optimalTiming: 'Final de tarde (17h - 18h30).',
      synergies: ['Mentol da hortelã + limoneno do limão + flavonóis do cacau']
    }
  },
  {
    id: 'rec-dani-07',
    numberCode: '07',
    badgeHeader: '07 BEBIDA GELADA · 5 MIN',
    title: 'Smoothie de Cacau, Laranja e Banana',
    slug: 'smoothie-de-cacau-laranja-e-banana',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '5 min',
    yield: '1 copo grande (350ml)',
    difficulty: 'Fácil',
    description: 'O ferro do cacau é do tipo não-heme, que o corpo absorve melhor na companhia de vitamina C. A laranja não está aqui só pelo sabor.',
    ingredients: [
      { item: 'suco de laranja natural', amount: '180 ml' },
      { item: 'banana madura', amount: '1 unidade' },
      { item: 'Gotas de Será Cacau', amount: '20 g', notes: 'cerca de 20 gotas' },
      { item: 'água quente', amount: '2 colheres de sopa' },
      { item: 'Gelo a gosto', amount: 'A gosto' },
      { item: 'Nibs de cacau para finalizar', amount: '1 colher de chá' }
    ],
    instructions: [
      'Dissolva as gotas na água quente e reserve.',
      'Bata o suco, a banana e o gelo até ficar cremoso.',
      'Junte o cacau dissolvido e bata mais dez segundos. Finalize com nibs por cima.'
    ],
    tip: 'Congele a banana em rodelas na noite anterior. O smoothie fica com textura de sorvete sem precisar de mais gelo.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Smoothie', 'Vitamina C & Ferro', 'Bebida Gelada', 'Pós-Treino', 'Nibs'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '240mg',
      polyphenolsMg: '380mg',
      calories: '240 kcal',
      macronutrients: 'Carboidratos: 38g | Fibras: 5g | Proteínas: 4.2g | Gorduras: 9.8g',
      clinicalIndications: [
        'Otimização da biodisponibilidade de ferro mineral não-heme',
        'Reposição de glicogênio e minerais no lanche pós-exercício',
        'Aporte de potássio, magnésio e vitamina C sinérgicos'
      ],
      contraindications: ['Ajustar porção de frutas em pacientes sob restrição severa de frutose'],
      optimalTiming: 'Desjejum matinal ou lanche pós-treino.',
      synergies: ['Vitamina C cítrica convertendo Fe3+ em Fe2+ para absorção duodenal']
    }
  },
  {
    id: 'rec-dani-11',
    numberCode: '11',
    badgeHeader: '11 DOCE · 10 MIN + GELADEIRA',
    title: 'Ganache de Geladeira',
    slug: 'ganache-de-geladeira',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '10 min + Geladeira (30 min)',
    yield: '2 porções',
    difficulty: 'Fácil',
    description: 'Três ingredientes, uma tigela, meia hora de espera. Uma sobremesa pronta na geladeira reduz o número de decisões difíceis no fim do dia.',
    ingredients: [
      { item: 'Gotas de Será Cacau', amount: '60 g', notes: 'cerca de 60 gotas' },
      { item: 'leite vegetal bem quente', amount: '60 ml' },
      { item: 'extrato natural de baunilha', amount: '1/2 colher de chá' },
      { item: 'sal', amount: '1 pitada' }
    ],
    instructions: [
      'Coloque as gotas em uma tigela e despeje o leite quente por cima.',
      'Espere um minuto sem mexer, depois misture do centro para fora até virar um creme liso e brilhante.',
      'Finalize com baunilha e sal. Leve à geladeira por 30 minutos.'
    ],
    tip: 'Se a ganache talhar, junte uma colher de sopa de leite quente e mexa com energia. Ela volta.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Doce', 'Ganache', 'Sobremesa', 'Cremoso', 'Cacau Puro'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '360mg por porção (720mg total)',
      polyphenolsMg: '570mg por porção',
      calories: '185 kcal por porção',
      macronutrients: 'Carboidratos: 9.5g | Proteínas: 4g | Gorduras: 15g',
      clinicalIndications: [
        'Saciedade imediata para cessar episódios de compulsão por doces ultraprocessados',
        'Aporte de gorduras nobres (manteiga de cacau com ácido esteárico neutro)'
      ],
      contraindications: ['Nenhuma'],
      optimalTiming: 'Sobremesa de almoço ou lanche intermediário.',
      synergies: ['Lipídios da manteiga de cacau promovendo liberação estável de colecistocinina (CCK)']
    }
  },
  {
    id: 'rec-dani-14',
    numberCode: '14',
    badgeHeader: '14 DOCE · 5 MIN + NOITE',
    title: 'Pudim de Chia e Cacau',
    slug: 'pudim-de-chia-e-cacau',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '5 min + Noite',
    yield: '1 porção',
    difficulty: 'Fácil',
    description: 'Você monta à noite, encontra pronto de manhã. A chia forma um gel que segura a fome de verdade — não por vinte minutos.',
    ingredients: [
      { item: 'chia', amount: '3 colheres de sopa' },
      { item: 'leite de coco', amount: '240 ml' },
      { item: 'Gotas de Será Cacau', amount: '20 g', notes: 'cerca de 20 gotas' },
      { item: 'água quente', amount: '1 colher de sopa' },
      { item: 'extrato natural de baunilha', amount: '1/2 colher de chá' },
      { item: 'sal', amount: '1 pitada' }
    ],
    instructions: [
      'Dissolva as gotas na água quente.',
      'Misture com o leite de coco, a chia, a baunilha e o sal em um pote com tampa.',
      'Mexa bem, espere cinco minutos e mexa de novo — isso evita que a chia empelote.',
      'Leve à geladeira de um dia para o outro.'
    ],
    tip: 'Dura três dias na geladeira. Faça três potes de uma vez e resolva a semana.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Doce', 'Pudim de Chia', 'Café da Manhã', 'Overnight', 'Fibras & Ômega-3'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '240mg',
      polyphenolsMg: '380mg',
      calories: '290 kcal',
      macronutrients: 'Carboidratos: 14g | Fibras: 10g | Proteínas: 7g | Gorduras: 22g',
      clinicalIndications: [
        'Aporte expressivo de fibras solúveis mucilaginosas e ômega-3 vegetal (ALA)',
        'Saciedade prolongada matinal sem pico de insulina',
        'Estímulo e nutrição da barreira entérica e microbiota intestinal'
      ],
      contraindications: ['Consumir com adequada ingestão hídrica devido ao alto teor de fibras'],
      optimalTiming: 'Desjejum matinal.',
      synergies: ['Mucilagem de chia + polifenóis do cacau alimentando bactérias produtoras de SCFA']
    }
  },
  {
    id: 'rec-dani-15',
    numberCode: '15',
    badgeHeader: '15 DOCE · 3 MIN',
    title: 'Bowl Anti-Crash de Iogurte',
    slug: 'bowl-anti-crash-de-iogurte',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '3 min',
    yield: '1 bowl',
    difficulty: 'Fácil',
    description: 'Prazer com cinto de segurança. A proteína do iogurte, a gordura das nozes e a fibra da fruta seguram a absorção do doce natural.',
    ingredients: [
      { item: 'iogurte vegetal sem açúcar', amount: '240 ml' },
      { item: 'Gotas de Será Cacau', amount: '20 g', notes: 'cerca de 20 gotas' },
      { item: 'água quente', amount: '1 colher de sopa' },
      { item: 'canela', amount: '1/2 colher de chá' },
      { item: 'nozes pecã picadas', amount: '1 colher de sopa' },
      { item: 'frutas frescas', amount: '1/2 xícara' }
    ],
    instructions: [
      'Dissolva as gotas na água quente até virar uma calda lisa.',
      'Despeje sobre o iogurte, sem misturar por completo.',
      'Finalize com canela, frutas e nozes.'
    ],
    tip: 'Deixe a calda esfriar um pouco antes de despejar. No iogurte muito frio ela endurece na hora e vira casquinha — o que também é bom, mas é outra coisa.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Doce', 'Bowl Funcional', 'Anti-Crash', 'Iogurte & Frutas', 'Prático'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '240mg',
      polyphenolsMg: '380mg',
      calories: '260 kcal',
      macronutrients: 'Carboidratos: 18g | Fibras: 4.5g | Proteínas: 8g | Gorduras: 16g',
      clinicalIndications: [
        'Atenuação da curva glicêmica através da matriz proteico-lipídica',
        'Lanche sacietógeno para pacientes com instabilidade energética vespertina'
      ],
      contraindications: ['Alergia a oleaginosas (substituir nozes por semente de abóbora)'],
      optimalTiming: 'Café da manhã ou lanche vespertino.',
      synergies: ['Canela + Nozes + Cacau modulando transportadores GLUT-4']
    }
  },
  {
    id: 'rec-dani-18',
    numberCode: '18',
    badgeHeader: '18 DOCE · 3 MIN',
    title: 'Berries com Calda de Cacau',
    slug: 'berries-com-calda-de-cacau',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '3 min',
    yield: '1 bowl',
    difficulty: 'Fácil',
    description: 'A calda mais simples do livro sobre as frutas mais ácidas que você encontrar. O contraste faz o trabalho todo.',
    ingredients: [
      { item: 'frutas vermelhas', amount: '1 xícara' },
      { item: 'Gotas de Será Cacau', amount: '30 g', notes: 'cerca de 30 gotas' },
      { item: 'água quente', amount: '1 colher de sopa' },
      { item: 'extrato natural de baunilha', amount: '1/2 colher de chá' },
      { item: 'sal', amount: '1 pitada' }
    ],
    instructions: [
      'Dissolva as gotas na água quente, mexendo até ficar liso e brilhante.',
      'Junte a baunilha e o sal.',
      'Despeje sobre as frutas ainda geladas e sirva na hora.'
    ],
    tip: 'Com frutas congeladas a calda endurece no contato e vira uma casquinha fina. Vale experimentar.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Doce', 'Frutas Vermelhas', 'Antioxidantes', 'Calda Quente', 'Rápido'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '360mg',
      polyphenolsMg: '570mg + Antocianinas das berries',
      calories: '210 kcal',
      macronutrients: 'Carboidratos: 16g | Fibras: 6g | Proteínas: 4g | Gorduras: 14g',
      clinicalIndications: [
        'Alto poder ORAC (capacidade de absorção de radicais de oxigênio)',
        'Suporte endotelial e neuroprotetor através da sinergia flavanol-antocianina'
      ],
      contraindications: ['Nenhuma'],
      optimalTiming: 'Sobremesa ou lanche intermediário.',
      synergies: ['Flavan-3-óis do cacau + antocianidinas de mirtilos/framboesas']
    }
  },
  {
    id: 'rec-dani-19',
    numberCode: '19',
    badgeHeader: '19 DOCE · 25 MIN',
    title: 'Pé de Moleque de Cacau e Amendoim',
    slug: 'pe-de-moleque-de-cacau-e-amendoim',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '25 min',
    yield: '8 a 10 pedaços',
    difficulty: 'Fácil',
    description: 'O doce de festa junina que cresceu. O amargor do cacau equilibra o caramelo e evita aquele doce que cansa na terceira mordida.',
    ingredients: [
      { item: 'amendoim torrado sem pele', amount: '200 g' },
      { item: 'açúcar mascavo', amount: '150 g' },
      { item: 'Gotas de Será Cacau', amount: '40 g', notes: 'cerca de 40 gotas' },
      { item: 'água', amount: '2 colheres de sopa' },
      { item: 'sal', amount: '1/2 colher de chá' }
    ],
    instructions: [
      'Leve o açúcar e a água ao fogo médio até formar um caramelo dourado.',
      'Desligue o fogo e junte as gotas, mexendo rápido até dissolver.',
      'Misture o amendoim e o sal, envolvendo tudo.',
      'Despeje sobre papel-manteiga, espalhe e deixe esfriar antes de quebrar.'
    ],
    tip: 'Junte o cacau fora do fogo. No calor direto ele queima e amarga de um jeito que não volta.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Doce', 'Pé de Moleque', 'Amendoim & Cacau', 'Snack', 'Sem Glúten'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '480mg no lote todo (aprox. 48mg/unidade)',
      polyphenolsMg: '760mg total',
      calories: '180 kcal por pedaço (35g)',
      macronutrients: 'Carboidratos: 18g | Proteínas: 5g | Gorduras: 10g',
      clinicalIndications: [
        'Alternativa limpa e balanceada para festividades culturais e lanches de alta demanda energética',
        'Fornecimento de resveratrol do amendoim e flavonoides do cacau'
      ],
      contraindications: ['Alergia a amendoim'],
      optimalTiming: 'Lanche pré-treino longo ou ocasiões festivas.',
      synergies: ['Resveratrol do amendoim + epicatequina do cacau']
    }
  },
  {
    id: 'rec-dani-22',
    numberCode: '22',
    badgeHeader: '22 DOCE · 15 MIN',
    title: 'Castanhas Cobertas de Cacau',
    slug: 'castanhas-cobertas-de-cacau',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '15 min + Geladeira (20 min)',
    yield: '1 pote de snack (aprox. 300g)',
    difficulty: 'Fácil',
    description: 'O snack que fica no pote em cima da mesa. Gordura boa, crocância e amargor — a combinação que fecha a conta em vez de abrir outra.',
    ingredients: [
      { item: 'castanhas variadas, torradas', amount: '200 g' },
      { item: 'Gotas de Será Cacau', amount: '80 g', notes: 'cerca de 80 gotas' },
      { item: 'sal', amount: '1/2 colher de chá' },
      { item: 'Nibs de cacau para finalizar', amount: 'A gosto' }
    ],
    instructions: [
      'Derreta as gotas em banho-maria, mexendo até ficar completamente liso.',
      'Junte as castanhas e envolva bem, uma a uma.',
      'Espalhe sobre papel-manteiga, salpique o sal e os nibs.',
      'Leve à geladeira por 20 minutos até firmar.'
    ],
    tip: 'Guarde em pote fechado, fora da geladeira. Assim mantém o brilho e a textura.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Doce', 'Snack', 'Castanhas & Nibs', 'Gorduras Boas', 'Mesa de Trabalho'],
    recommendedProductSlug: 'nibs-de-sera-cacau-250g',
    specifications: {
      theobromineMg: '960mg no pote todo (aprox. 120mg/porção de 35g)',
      polyphenolsMg: '1520mg total',
      calories: '195 kcal por porção (35g)',
      macronutrients: 'Carboidratos: 6g | Fibras: 3.5g | Proteínas: 4.8g | Gorduras: 17g',
      clinicalIndications: [
        'Snack de consultório ou ambiente corporativo para estabilização de apetite',
        'Aporte de selênio (castanha-do-pará), zinco e magnésio biodisponíveis'
      ],
      contraindications: ['Alergia a castanhas e nozes'],
      optimalTiming: 'Meio da tarde (15h30 - 17h).',
      synergies: ['Selênio e vitamina E das castanhas com a ação antioxidante da epicatequina']
    }
  },
  {
    id: 'rec-dani-26',
    numberCode: '26',
    badgeHeader: '26 SALGADO · 40 MIN',
    title: 'Crackers de Sementes com Cacau',
    slug: 'crackers-de-sementes-com-cacau',
    category: 'dani',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '40 min',
    yield: '1 tabuleiro (aprox. 12 crackers)',
    difficulty: 'Fácil',
    description: 'Para a vontade de beliscar que chega às cinco da tarde. Fibra e gordura boa dão saciedade real; o cacau dá o aroma que fecha a conta.',
    ingredients: [
      { item: 'linhaça dourada', amount: '1 xícara' },
      { item: 'gergelim branco e preto', amount: '1/2 xícara' },
      { item: 'farinha de amêndoa', amount: '1/2 xícara' },
      { item: 'água', amount: '3/4 xícara' },
      { item: 'Gotas de Será Cacau · cerca de 10 gotas, derretidas', amount: '10 g' },
      { item: 'páprica defumada', amount: '1 colher de chá' },
      { item: 'alecrim fresco', amount: '1 colher de sopa' },
      { item: 'sal', amount: '1/2 colher de chá' }
    ],
    instructions: [
      'Pré-aqueça o forno a 160 °C e misture todos os secos com as ervas e o sal.',
      'Junte a água e o cacau derretido até formar uma massa maleável. Espere 10 minutos para a linhaça hidratar.',
      'Espalhe bem fino entre dois papéis-manteiga e asse por 25 a 30 minutos, até secar.',
      'Deixe esfriar por completo e quebre em pedaços irregulares.'
    ],
    tip: 'Quanto mais fino você abrir, mais crocante fica. Se o centro ficar mole, volte ao forno desligado ainda quente por 10 minutos.',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Salgado', 'Crackers', 'Sementes & Cacau', 'Lanche Salgado', 'Sem Glúten'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '120mg total (aprox. 15mg por cracker)',
      polyphenolsMg: '210mg + Lignanas da linhaça',
      calories: '95 kcal por cracker',
      macronutrients: 'Carboidratos: 3.5g | Fibras: 4g | Proteínas: 3.8g | Gorduras: 7.5g',
      clinicalIndications: [
        'Aporte de fibras mucilaginosas e lignanas para saúde cardiovascular e intestinal',
        'Opção salgada crocante livre de aditivos, glúten e gorduras hidrogenadas'
      ],
      contraindications: ['Consumir com boa hidratação hídrica'],
      optimalTiming: 'Lanche das 17h ou acompanhamento de patês funcionais.',
      synergies: ['Sesamol do gergelim + ácido alfa-linolênico da linhaça + compostos fenólicos do cacau']
    }
  },

  // =========================================================================
  // 13 RECEITAS PARA PACIENTES (LUNA AZEVEDO, NUTRICIONISTA — RECEITAS 01 A 13)
  // =========================================================================
  {
    id: 'rec-luna-01',
    numberCode: '01',
    badgeHeader: 'RECEITA 01 · NUTRIÇÃO NA SAÚDE DA MULHER',
    title: 'Cacau com gengibre, cúrcuma e pimenta-do-reino',
    subtitle: 'Nutrir é um ato diário de cuidado com o corpo feminino.',
    slug: 'cacau-com-gengibre-curcuma-e-pimenta-do-reino',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (150ml)',
    difficulty: 'Fácil',
    description: 'Uma bebida rica em compostos bioativos, pensada para integrar uma alimentação equilibrada e criar um momento de pausa e autocuidado no meio do dia.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'bebida vegetal de aveia', amount: '150 ml' },
      { item: 'gengibre fresco ralado', amount: '1 c.chá' },
      { item: 'cúrcuma em pó', amount: '¼ c.chá' },
      { item: 'pimenta-do-reino moída na hora', amount: '1 pitada' },
      { item: 'Opcional para adoçar — xarope de tâmara, agave ou mel', amount: '1 c.chá' }
    ],
    instructions: [
      'Aqueça a bebida vegetal sem ferver — entre 60 e 70 °C.',
      'Junte as gotas de cacau e misture com fouet até ficar cremoso.',
      'Acrescente o gengibre, a cúrcuma e a pimenta.',
      'Se for adoçar, faça fora do fogo — e prove antes.'
    ],
    variations: [
      'Sem gengibre e cúrcuma, com ½ c.chá de canela-do-Ceilão → glicemia e resistência insulínica (ver Receita 08)',
      'Sobre leite de coco no lugar da aveia → a gordura favorece a absorção da curcumina',
      'Gelada, sobre gelo, com raspas de limão → mesma composição no calor'
    ],
    indication: 'Saúde da mulher · metabolismo hormonal · aporte de magnésio e ferro',
    whyItWorks: 'Os flavonoides do cacau — epicatequina, catequina e procianidinas — somados aos gingeróis do gengibre, aos curcuminoides da cúrcuma e à piperina da pimenta-do-reino ampliam a diversidade de fitoquímicos da refeição. O cacau puro também fornece magnésio, ferro e cobre, minerais que atuam como cofatores do metabolismo hormonal e energético e da formação das hemácias — presentes na saúde da mulher em todas as fases da vida.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 01 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Saúde da Mulher', 'Metabolismo Hormonal', 'Magnésio e Ferro', 'Gengibre & Cúrcuma', 'Prescrição'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '380mg',
      calories: '125 kcal',
      macronutrients: 'Carboidratos: 8g | Proteínas: 3.2g | Gorduras: 9.5g',
      clinicalIndications: [
        'Saúde da mulher e suporte hormonal integral',
        'Aporte de magnésio, ferro e cobre com alta biodisponibilidade',
        'Ação anti-inflamatória sinérgica (curcuminoides + gingeróis + epicatequina)'
      ],
      contraindications: ['Sensibilidade gástrica aguda a especiarias picantes'],
      optimalTiming: 'Meio da manhã ou momento de pausa no início da tarde.',
      synergies: ['Piperina aumentando biodisponibilidade de curcuminoides e gingeróis']
    }
  },
  {
    id: 'rec-luna-02',
    numberCode: '02',
    badgeHeader: 'RECEITA 02 · NUTRIÇÃO ESTÉTICA',
    title: 'Cacau com especiarias e nibs',
    subtitle: 'A beleza começa nas escolhas diárias do nosso prato.',
    slug: 'cacau-com-especiarias-e-nibs',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (150ml)',
    difficulty: 'Fácil',
    description: 'Uma bebida que reúne ingredientes naturalmente ricos em compostos bioativos envolvidos na proteção antioxidante, na saúde vascular e na integridade da pele. Os nibs entram no fim — e ficam crocantes na xícara.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'bebida vegetal de aveia sem açúcar', amount: '150 ml' },
      { item: 'gengibre fresco ralado', amount: '2 g' },
      { item: 'cúrcuma (0,5 g) · canela (1 g) · pimenta-do-reino (0,2 g)', amount: '1,7 g' },
      { item: 'nibs de Será Cacau', amount: '5 g' },
      { item: 'Opcional para adoçar — xarope de tâmara', amount: '5 ml' }
    ],
    instructions: [
      'Aqueça a bebida vegetal sem ferver — entre 60 e 70 °C.',
      'Misture o cacau com fouet até dissolver por completo.',
      'Acrescente as especiarias e misture novamente.',
      'Finalize com os nibs por cima, na hora de servir.'
    ],
    variations: [
      'Sem cúrcuma e pimenta, com raspas de limão-siciliano → foco em vitamina C e síntese de colágeno',
      'Nibs sobre salada de folhas, mix de castanhas ou molhos escuros → o mesmo ingrediente, no salgado',
      'Sobre Chá da Casca de Cacau no lugar da bebida vegetal → versão mais leve, sem gordura adicional'
    ],
    indication: 'Estética · saúde da pele · microcirculação',
    whyItWorks: 'Esta combinação reúne flavanóis do cacau — epicatequina, catequina e procianidinas —, gingeróis, curcuminoides, cinamaldeído e piperina: compostos bioativos estudados por favorecerem a biodisponibilidade de óxido nítrico (NO), a função endotelial e a microcirculação. O cacau puro fornece ainda magnésio e cobre, minerais que atuam como cofatores enzimáticos importantes para o metabolismo energético e para a organização das fibras de colágeno e elastina.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 02 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Nutrição Estética', 'Saúde da Pele', 'Microcirculação', 'Colágeno', 'Nibs'],
    recommendedProductSlug: 'nibs-de-sera-cacau-250g',
    specifications: {
      theobromineMg: '210mg',
      polyphenolsMg: '420mg',
      calories: '148 kcal',
      macronutrients: 'Carboidratos: 9g | Proteínas: 3.5g | Gorduras: 11g',
      clinicalIndications: [
        'Suporte à microcirculação dérmica e síntese de colágeno/elastina',
        'Proteção contra estresse oxidativo e fotoenvelhecimento',
        'Estímulo da via eNOS e biodisponibilidade de óxido nítrico'
      ],
      contraindications: ['Nenhuma'],
      optimalTiming: 'Desjejum matinal ou lanche da tarde.',
      synergies: ['Flavan-3-óis + Cobre/Magnésio fortalecendo matriz extracelular dérmica']
    }
  },
  {
    id: 'rec-luna-03',
    numberCode: '03',
    badgeHeader: 'RECEITA 03 · NUTRIÇÃO ONCOLÓGICA',
    title: 'Cacau com baunilha e anis-estrelado',
    subtitle: 'Nutrir também é acolher. Pequenos gestos trazem conforto, sabor e cuidado.',
    slug: 'cacau-com-baunilha-e-anis-estrelado',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (200ml)',
    difficulty: 'Fácil',
    description: 'Uma bebida de aromas delicados, pensada para momentos em que o apetite muda e a experiência de comer precisa voltar a ser boa. Densidade nutricional e prazer, na mesma xícara.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'bebida vegetal de aveia sem açúcar', amount: '200 ml' },
      { item: 'extrato natural de baunilha', amount: '½ c.chá' },
      { item: 'anis-estrelado inteiro', amount: '1 unidade' },
      { item: 'Nibs de Será Cacau a gosto, para finalizar', amount: 'A gosto' }
    ],
    instructions: [
      'Aqueça a bebida vegetal sem ferver — entre 60 e 70 °C.',
      'Misture o cacau com fouet até ficar liso.',
      'Acrescente a baunilha e o anis-estrelado e deixe infusionar por 3 minutos.',
      'Retire o anis antes de servir e finalize com nibs.'
    ],
    variations: [
      'Sem anis-estrelado e sem nibs durante a quimioterapia → versão mais simples, apenas cacau e baunilha',
      'Sobre leite de coco no lugar da aveia → mais densidade energética em caso de perda de peso',
      'Morna, quase em temperatura ambiente → em caso de mucosite ou sensibilidade oral'
    ],
    indication: 'Oncologia · palatabilidade · densidade nutricional',
    whyItWorks: 'O cacau fornece flavonoides — epicatequina, catequina e procianidinas —, enquanto a baunilha é rica em vanilina e o anis-estrelado contém anetol e compostos fenólicos. A combinação amplia a diversidade de fitoquímicos da alimentação, favorece a palatabilidade da bebida e contribui para uma preparação nutricionalmente densa e sensorialmente acolhedora.',
    note: 'Qualquer adaptação durante o tratamento oncológico deve ser conversada com a equipe que acompanha a paciente.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 03 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Nutrição Oncológica', 'Palatabilidade', 'Densidade Nutricional', 'Conforto', 'Acolhimento'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '390mg',
      calories: '155 kcal',
      macronutrients: 'Carboidratos: 11g | Proteínas: 3.8g | Gorduras: 10g',
      clinicalIndications: [
        'Aporte de densidade nutricional e conforto sensorial em paladar alterado',
        'Diversidade de fitoquímicos em preparações suaves e bem toleradas',
        'Estímulo do apetite através do perfil aromático do anis e vanilina'
      ],
      contraindications: ['Adequar conforme tolerância individual e orientação médica oncológica'],
      optimalTiming: 'Momentos de acolhimento e lanches intermediários.',
      synergies: ['Anetol do anis-estrelado + Vanilina potencializando a palatabilidade acolhedora']
    }
  },
  {
    id: 'rec-luna-04',
    numberCode: '04',
    badgeHeader: 'RECEITA 04 · PRÉ-CONCEPÇÃO',
    title: 'Cacau com hortelã e limão-siciliano',
    subtitle: 'Nutrir antes da gestação é cuidar de duas gerações ao mesmo tempo.',
    slug: 'cacau-com-hortela-e-limao-siciliano',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (150ml)',
    difficulty: 'Fácil',
    description: 'Uma bebida leve e cítrica, com ingredientes que contribuem para a formação das reservas nutricionais e trazem frescor e boa digestão.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'bebida vegetal enriquecida com cálcio — aveia sem açúcar', amount: '150 ml' },
      { item: 'raspas de limão-siciliano', amount: '¼ de limão' },
      { item: 'folhas de hortelã fresca', amount: '3 a 5 folhas' }
    ],
    instructions: [
      'Aqueça a bebida vegetal sem ferver — entre 60 e 70 °C.',
      'Misture o cacau com fouet até dissolver.',
      'Acrescente a hortelã e misture novamente.',
      'Finalize com as raspas frescas de limão-siciliano.'
    ],
    variations: [
      'Sem hortelã, com ½ c.chá de gengibre → náusea e digestão',
      'Sobre água no lugar da bebida enriquecida → quando a xícara for tomada no mesmo horário da suplementação de ferro',
      'Gelada, com folhas de hortelã inteiras → versão de verão'
    ],
    indication: 'Pré-concepção · formação de reservas de ferro e cálcio',
    whyItWorks: 'Os flavonoides do cacau — epicatequina, catequina e procianidinas — associados à vitamina C, à hesperidina e à narirutina do limão-siciliano favorecem a absorção do ferro não heme. A bebida vegetal enriquecida contribui com cálcio e vitamina D, importantes para a formação das reservas nutricionais antes da gestação, enquanto a hortelã fornece mentol e ácido rosmarínico, que dão suporte à digestão e ao intestino.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 04 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Pré-Concepção', 'Reservas de Ferro', 'Cálcio & Vitamina D', 'Hortelã & Limão', 'Digestão'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '370mg',
      calories: '118 kcal',
      macronutrients: 'Carboidratos: 7.5g | Proteínas: 3g | Gorduras: 8.5g',
      clinicalIndications: [
        'Construção de reservas nutricionais de ferro não-heme e minerais pré-concepcionais',
        'Digestão leve e suporte eubiótico intestinal proporcionado pela hortelã',
        'Aporte de micronutrientes sem sobrecarga calórica'
      ],
      contraindications: ['Nenhuma'],
      optimalTiming: 'Meio da manhã ou início da tarde.',
      synergies: ['Hesperidina do limão + Mentol da hortelã otimizando absorção de ferro do cacau']
    }
  },
  {
    id: 'rec-luna-05',
    numberCode: '05',
    badgeHeader: 'RECEITA 05 · GESTAÇÃO · MATERNO-INFANTIL',
    title: 'Cacau com gengibre, laranja e tâmara',
    subtitle: 'Nutrir uma gestação é cuidar da saúde de duas gerações ao mesmo tempo.',
    slug: 'cacau-com-gengibre-laranja-e-tamara',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (150ml)',
    difficulty: 'Fácil',
    description: 'Uma bebida de sabor caloroso para o período da gestação, com ingredientes que somam densidade nutricional, frescor cítrico e acolhimento.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'bebida de aveia com cálcio e vitamina D', amount: '150 ml' },
      { item: 'gengibre ralado', amount: '1 c.chá' },
      { item: 'raspas de laranja', amount: '¼ de laranja' },
      { item: 'tâmara Medjool picada — opcional, a partir do 3º trimestre', amount: '1 unidade' }
    ],
    instructions: [
      'Aqueça a bebida vegetal sem ferver — entre 60 e 70 °C.',
      'Misture o cacau com fouet até ficar cremoso.',
      'Acrescente o gengibre e as raspas de laranja.',
      'Se for usar a tâmara, junte por último e consuma em seguida.'
    ],
    variations: [
      'Sem tâmara no primeiro e no segundo trimestre',
      'Sem laranja, com hortelã → alternativa em caso de refluxo cítrico',
      'Morna e em menor volume → nas semanas de náusea mais intensa'
    ],
    indication: 'Gestação · náusea · absorção de ferro',
    whyItWorks: 'Os flavonoides do cacau, os gingeróis do gengibre e as flavanonas cítricas da laranja — hesperidina e narirutina — ampliam a diversidade de compostos bioativos da receita. A vitamina C favorece a absorção do ferro não heme, enquanto o gengibre pode auxiliar no manejo das náuseas. A tâmara é indicada preferencialmente no terceiro trimestre, período em que estudos sugerem associação com melhores desfechos relacionados ao trabalho de parto.',
    note: 'Manter até 15 g de cacau por dia na gestação — ver folha de contraindicações.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 05 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Gestação', 'Materno-Infantil', 'Náusea', 'Absorção de Ferro', 'Gengibre & Laranja'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '180mg (dose segura até 15g cacau/dia na gestação)',
      polyphenolsMg: '380mg',
      calories: '160 kcal (com tâmara)',
      macronutrients: 'Carboidratos: 18g | Fibras: 3g | Proteínas: 3.2g | Gorduras: 8.5g',
      clinicalIndications: [
        'Manejo de náuseas gestacionais pelo efeito antiemético suave dos gingeróis',
        'Absorção otimizada de ferro vegetal auxiliada pelo ácido ascórbico cítrico',
        'Aporte seguro de compostos bioativos e magnésio para o binômio mãe-bebê'
      ],
      contraindications: ['Manter o consumo máximo em até 15g de cacau puro por dia durante a gestação'],
      optimalTiming: 'Manhã ou tarde.',
      synergies: ['Flavanonas cítricas + Gingeróis + Flavanóis do cacau']
    }
  },
  {
    id: 'rec-luna-06',
    numberCode: '06',
    badgeHeader: 'RECEITA 06 · CICLO · FASE LÚTEA',
    title: 'Cacau concentrado com baunilha e coco',
    subtitle: 'Há períodos em que o corpo feminino só pede mais acolhimento e prazer.',
    slug: 'cacau-concentrado-com-baunilha-e-coco',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (200ml)',
    difficulty: 'Fácil',
    description: 'A xícara mais encorpada da série — dose forte de cacau, baunilha e coco. Feita para os dias anteriores à menstruação, quando o corpo pede densidade e conforto.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100% — dose forte', amount: '25 a 30 gotas' },
      { item: 'bebida de aveia sem açúcar', amount: '200 ml' },
      { item: 'extrato de baunilha', amount: '½ c.chá' },
      { item: 'coco seco ralado sem açúcar', amount: '1 c.sopa' },
      { item: 'Opcional — xarope de tâmara', amount: '1 c.chá' }
    ],
    instructions: [
      'Aqueça a bebida vegetal sem ferver — entre 60 e 70 °C.',
      'Misture o cacau vigorosamente com fouet — são até 30 gotas, precisa de braço.',
      'Acrescente a baunilha e o coco ralado.',
      'Adoce apenas no fim, se sentir necessidade.'
    ],
    variations: [
      'Com 15 gotas no lugar de 25–30 → versão diária para os dez dias antes da menstruação',
      'Sem coco, com ¼ c.chá de gengibre e ½ fava de Baunilha Bourbon Será → ver Receita 10',
      'Com uma pitada de sal marinho → realça o amargor e reduz a necessidade de adoçar'
    ],
    indication: 'Fase lútea · TPM · demanda aumentada',
    whyItWorks: 'Na fase lútea, o aumento da progesterona justifica uma concentração maior de cacau, ampliando o aporte de flavonoides, magnésio, teobromina e triptofano. A teobromina proporciona uma estimulação mais suave que a cafeína, mantendo os efeitos benéficos sobre a disposição, enquanto o triptofano é precursor da serotonina e da melatonina. A vanilina, composto fenólico da baunilha, soma ação antioxidante — além do dulçor natural e da experiência sensorial.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 06 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Fase Lútea', 'TPM', 'Dose Concentrada', 'Baunilha & Coco', 'Acolhimento'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '320mg a 360mg',
      polyphenolsMg: '550mg',
      calories: '220 kcal',
      macronutrients: 'Carboidratos: 12g | Proteínas: 4.8g | Gorduras: 17g',
      clinicalIndications: [
        'Alívio da irritabilidade e disforia associadas à queda de serotonina na fase lútea',
        'Saciedade prolongada e controle de compulsão por doces e chocolates refinados',
        'Aporte ampliado de magnésio elementar e precursores de triptofano'
      ],
      contraindications: ['Sensibilidade a doses elevadas de teobromina no período noturno'],
      optimalTiming: 'Final de tarde nos 7 a 10 dias pré-menstruais.',
      synergies: ['Gorduras nobres do coco e manteiga de cacau promovendo liberação estável de CCK']
    }
  },
  {
    id: 'rec-luna-07',
    numberCode: '07',
    badgeHeader: 'RECEITA 07 · CICLO · FASE FOLICULAR',
    title: 'Cacau com canela, cardamomo e framboesa',
    subtitle: 'Todo recomeço carrega potência. O corpo feminino também.',
    slug: 'cacau-com-canela-cardamomo-e-framboesa',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (150ml)',
    difficulty: 'Fácil',
    description: 'Uma bebida fresca e aromática para o início do ciclo, quando a disposição volta. Cítrica na entrada, especiada no fim.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'bebida vegetal de aveia', amount: '150 ml' },
      { item: 'canela-do-Ceilão em pó', amount: '½ c.chá' },
      { item: 'raspas de limão-siciliano', amount: '¼ de limão' },
      { item: 'framboesa liofilizada triturada', amount: '1 c.sopa' },
      { item: 'bagas de cardamomo — ou 0,3 g em pó', amount: '2 bagas' }
    ],
    instructions: [
      'Aqueça a bebida vegetal sem ferver — entre 60 e 70 °C.',
      'Misture o cacau com fouet até dissolver.',
      'Acrescente a canela e o cardamomo.',
      'Finalize com as raspas de limão e a framboesa triturada.'
    ],
    variations: [
      'Sem framboesa e sem limão, só com cardamomo → sistema nervoso (ver Receita 09)',
      'Sem cardamomo, apenas com canela-do-Ceilão → glicemia (ver Receita 08)',
      'Gelada, sobre gelo, com a framboesa por cima → versão de verão'
    ],
    indication: 'Fase folicular · disposição · aporte antioxidante',
    whyItWorks: 'A fase folicular é marcada pelo aumento gradual do estradiol e, em muitas mulheres, por maior disposição. Os flavonoides do cacau, associados às antocianinas da framboesa e aos flavonoides do limão-siciliano, ampliam a diversidade de compostos bioativos da receita, enquanto o cinamaldeído da canela e os compostos fenólicos do cardamomo enriquecem o perfil aromático e antioxidante da xícara.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 07 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Fase Folicular', 'Disposição', 'Antioxidantes', 'Cardamomo & Framboesa', 'Frescor'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '430mg (com antocianinas da framboesa)',
      calories: '130 kcal',
      macronutrients: 'Carboidratos: 10g | Fibras: 2.5g | Proteínas: 3.2g | Gorduras: 8.8g',
      clinicalIndications: [
        'Aporte antioxidante intensivo na janela de renovação da fase folicular',
        'Estímulo de energia física e disposição sustentada sem nervosismo',
        'Modulação de estresse oxidativo e otimização do perfil lipídico'
      ],
      contraindications: ['Nenhuma'],
      optimalTiming: 'Desjejum matinal nos primeiros 10 a 14 dias do ciclo.',
      synergies: ['Antocianinas da framboesa + Flavanóis do cacau + Cinamaldeído da canela']
    }
  },
  {
    id: 'rec-luna-08',
    numberCode: '08',
    badgeHeader: 'RECEITA 08 · TERROIR & CABRUCA · DIA 01',
    title: 'Cacau com canela-do-Ceilão',
    subtitle: 'A primeira xícara — a mais simples e a mais clínica.',
    slug: 'cacau-com-canela-do-ceilao',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (200ml)',
    difficulty: 'Fácil',
    description: 'A xícara de entrada da biblioteca: cacau, calor e uma única especiaria. É a base sobre a qual todas as outras receitas são construídas.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'água quente (60–70 °C) ou leite vegetal', amount: '200 ml' },
      { item: 'canela-do-Ceilão — não cássia', amount: '½ c.chá' },
      { item: 'Opcional — mel cru ou tâmara', amount: '½ c.chá' }
    ],
    instructions: [
      'Coloque as gotas na xícara — elas derretem no calor.',
      'Despeje a água ou o leite bem quente e mexa até dissolver.',
      'Acrescente a canela e misture.',
      'Prove antes de adoçar — o amargor é parte da experiência.'
    ],
    variations: [
      'Com ¼ c.chá de gengibre e ¼ de cúrcuma → perfil anti-inflamatório (ver Receita 01)',
      'Sobre leite de aveia no lugar da água → mais saciedade e textura',
      'Gelada, sobre gelo, com canela por cima → versão de verão'
    ],
    indication: 'Glicemia · resistência insulínica · SOP',
    whyItWorks: 'A canela-do-Ceilão (*Cinnamomum verum*) possui cinamaldeído e procianidinas que atuam sinergicamente com os flavonoides do cacau, modulando a sinalização de insulina e a captação periférica de glicose via transportadores GLUT-4, com baixíssimo teor de cumarina.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 08 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Glicemia', 'Resistência Insulínica', 'SOP', 'Canela-do-Ceilão', 'Clínica Base'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '380mg',
      calories: '95 kcal (com água) / 140 kcal (com leite vegetal)',
      macronutrients: 'Carboidratos: 4g | Proteínas: 2.2g | Gorduras: 8g',
      clinicalIndications: [
        'Modulação glicêmica em jejum e pós-prandial (sensibilização de GLUT-4)',
        'Suporte nutricional na Síndrome dos Ovários Policísticos (SOP) e pré-diabetes',
        'Protocolo de transição sensorial para o paladar puro e não hiperpalatável'
      ],
      contraindications: ['Utilizar preferencialmente canela-do-Ceilão (baixo teor de cumarina)'],
      optimalTiming: 'Desjejum matinal ou 20 minutos antes da refeição principal.',
      synergies: ['Cinamaldeído ativando receptores de insulina em sinergia com epicatequina']
    }
  },
  {
    id: 'rec-luna-09',
    numberCode: '09',
    badgeHeader: 'RECEITA 09 · SISTEMA NERVOSO',
    title: 'Cacau com cardamomo',
    subtitle: 'Sistema nervoso pedindo calma e lucidez ao mesmo tempo.',
    slug: 'cacau-com-cardamomo',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (200ml)',
    difficulty: 'Fácil',
    description: 'Uma xícara curta e aromática, para os momentos em que o corpo pede atenção sem agitação.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'água quente (60–70 °C) ou leite de castanha de caju', amount: '200 ml' },
      { item: 'cardamomo em pó', amount: '¼ c.chá' },
      { item: 'Opcional — sal marinho', amount: '1 pitada' }
    ],
    instructions: [
      'Coloque as gotas na xícara.',
      'Despeje o líquido bem quente e mexa até dissolver.',
      'Adicione o cardamomo — comece com menos, o aroma é forte.',
      'O sal realça o amargor. Prove antes de adoçar.'
    ],
    variations: [
      'Com ½ c.chá de canela-do-Ceilão → também glicemia (ver Receita 08)',
      'Gelada, sobre leite de castanha → versão de verão',
      'Sobre Chá da Casca de Cacau à noite → teor muito baixo de teobromina'
    ],
    indication: 'Ansiedade leve · TPM · foco',
    whyItWorks: 'O acetato de terpenila e o 1,8-cineol presentes no cardamomo conferem propriedades ansiolíticas e neuroprotetoras suaves, modulando receptores GABAérgicos em sinergia com o magnésio e a anandamida naturalmente presentes no cacau puro.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 09 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Sistema Nervoso', 'Ansiedade Leve', 'Foco Sereno', 'Cardamomo', 'Lucidez'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '360mg',
      calories: '98 kcal (com água) / 145 kcal (com leite de castanha)',
      macronutrients: 'Carboidratos: 4.5g | Proteínas: 2.5g | Gorduras: 8.5g',
      clinicalIndications: [
        'Alívio da ansiedade antecipatória com manutenção de lucidez e foco',
        'Modulação de tônus parassimpático e relaxamento muscular suave',
        'Substituição de cafeína estimulante em pacientes com taquicardia situacional'
      ],
      contraindications: ['Nenhuma'],
      optimalTiming: 'Meio da tarde (15h às 17h) ou pausas cognitivas.',
      synergies: ['Terpenos do cardamomo potencializando a anandamida e teobromina']
    }
  },
  {
    id: 'rec-luna-10',
    numberCode: '10',
    badgeHeader: 'RECEITA 10 · CICLO FEMININO',
    title: 'Cacau com gengibre e baunilha',
    subtitle: 'A xícara que o corpo pede quando a lua se aproxima.',
    slug: 'cacau-com-gengibre-e-baunilha',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (200ml)',
    difficulty: 'Fácil',
    description: 'A tasse dos dez dias que antecedem a menstruação — magnésio, triptofano e o aroma da baunilha da nossa casa.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'gengibre em pó — ou 1 cm fresco ralado', amount: '¼ c.chá' },
      { item: 'fava de Baunilha Bourbon Será (~2 g), raspada', amount: '½ fava' },
      { item: 'água quente (60–70 °C) ou leite de amêndoa', amount: '200 ml' }
    ],
    instructions: [
      'Coloque as gotas e as sementes de baunilha na xícara.',
      'Despeje o líquido bem quente e mexa até dissolver.',
      'Adicione o gengibre — se fresco, esprema direto.',
      'Beba quente nos dez dias antes da menstruação.'
    ],
    variations: [
      'Com 25–30 gotas → versão concentrada para os dias de maior demanda (ver Receita 06)',
      'Sem gengibre, com 1 c.sopa de coco ralado → conforto e densidade',
      'Sobre leite de aveia no lugar da água → mais saciedade'
    ],
    indication: 'TPM · dismenorreia · fase lútea',
    whyItWorks: 'A sinergia entre os gingeróis anti-inflamatórios (inibidores de ciclooxigenase e síntese de prostaglandinas uterinas), a vanilina calmante e o alto teor de magnésio biodisponível do cacau alivia dores pélvicas e estabiliza as oscilações de humor pré-menstruais.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 10 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Ciclo Feminino', 'TPM', 'Dismenorreia', 'Gengibre & Baunilha', 'Fase Lútea'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '380mg',
      calories: '110 kcal',
      macronutrients: 'Carboidratos: 5.5g | Proteínas: 2.8g | Gorduras: 8.8g',
      clinicalIndications: [
        'Atenuação de cólicas menstruais e dismenorreia primária via inibição de COX-2',
        'Estabilização de neurotransmissores (serotonina) através do triptofano do cacau',
        'Aporte de magnésio para redução de cefaleia catamenial'
      ],
      contraindications: ['Sensibilidade gástrica ao gengibre em jejum'],
      optimalTiming: 'Beba quente nos 10 dias que antecedem a menstruação.',
      synergies: ['Gingeróis modulando prostaglandinas + Vanilina da fava de baunilha relaxando tônus']
    }
  },
  {
    id: 'rec-luna-11',
    numberCode: '11',
    badgeHeader: 'RECEITA 11 · FOCO & CRIATIVIDADE',
    title: 'Cacau com cúrcuma e pimenta',
    subtitle: 'Quando o foco precisa vir de dentro.',
    slug: 'cacau-com-curcuma-e-pimenta',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (200ml)',
    difficulty: 'Fácil',
    description: 'A xícara do meio da tarde, para os dias em que a atenção precisa durar mais do que a energia.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'cúrcuma em pó', amount: '½ c.chá' },
      { item: 'pimenta-do-reino moída na hora', amount: '1 pitada generosa' },
      { item: 'leite vegetal — coco ou aveia', amount: '200 ml' }
    ],
    instructions: [
      'Coloque as gotas na xícara.',
      'Despeje o leite bem quente (60–70 °C) e mexa até derreter.',
      'Acrescente a cúrcuma e a pimenta.',
      'A pimenta é essencial — eleva a biodisponibilidade da curcumina.'
    ],
    variations: [
      'Com 1 c.chá de gengibre fresco ralado → ver Receita 01',
      'Sobre leite de coco no lugar da aveia → a gordura favorece a absorção da curcumina',
      'Com 5 g de nibs por cima → textura e uso estético (ver Receita 02)'
    ],
    indication: 'Foco · inflamação · burnout',
    whyItWorks: 'A piperina da pimenta-do-reino potencializa a biodisponibilidade dos curcuminoides da cúrcuma em até 2000%. Juntos com a teobromina e a epicatequina do cacau 100%, promovem fluxo sanguíneo cerebral sustentado e proteção contra estresse oxidativo neuronal.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 11 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Foco & Criatividade', 'Anti-Inflamatório', 'Burnout', 'Cúrcuma & Pimenta', 'Neuroproteção'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '410mg',
      calories: '135 kcal',
      macronutrients: 'Carboidratos: 7.8g | Proteínas: 3.2g | Gorduras: 9.8g',
      clinicalIndications: [
        'Apoio cognitivo e concentração prolongada no trabalho mental de alta demanda',
        'Controle de neuroinflamação de baixo grau e fadiga pós-prandial',
        'Suporte antioxidante em quadros de sobrecarga e risco de burnout'
      ],
      contraindications: ['Sensibilidade gástrica severa à pimenta'],
      optimalTiming: 'Meio da tarde (14h às 16h).',
      synergies: ['Piperina + Curcumina + Teobromina promovendo oxigenação neuronal']
    }
  },
  {
    id: 'rec-luna-12',
    numberCode: '12',
    badgeHeader: 'RECEITA 12 · ENERGIA & MOVIMENTO',
    title: 'Cacau com ashwagandha e canela',
    subtitle: 'A xícara para quando tudo está pedindo muito.',
    slug: 'cacau-com-ashwagandha-e-canela',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (200ml)',
    difficulty: 'Fácil',
    description: 'Uma xícara de suporte para os dias de demanda alta — e a opção de pré-treino da biblioteca.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'ashwagandha padronizada — KSM-66 ou Sensoril', amount: '300 a 600 mg' },
      { item: 'canela-do-Ceilão', amount: '½ c.chá' },
      { item: 'leite de coco ou água quente (60–70 °C)', amount: '200 ml' }
    ],
    instructions: [
      'Coloque as gotas e o ashwagandha na xícara.',
      'Despeje o leite de coco bem quente e mexa até dissolver.',
      'Adicione a canela.',
      'Pré-treino: tome 30 a 45 minutos antes.'
    ],
    variations: [
      'Sem ashwagandha → xícara de pré-treino simples, apenas cacau e canela',
      'Com uma pitada de sal marinho e gelo → versão de reposição depois do treino',
      'Sobre água no lugar do leite de coco → versão mais leve antes do movimento'
    ],
    indication: 'Fadiga · burnout · pré-treino',
    whyItWorks: 'Os withanolídeos da ashwagandha modulam o eixo HPA, atenuando a secreção desregulada de cortisol, enquanto a teobromina do cacau promove vasodilatação e suporte energético contínuo sem os picos e quedas da cafeína.',
    note: 'KSM-66 e Sensoril são extratos padronizados dosados em miligramas, não em colheres. A quantidade acima substitui a medida original em colher de chá — a confirmar com Luna.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 12 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Energia & Movimento', 'Ashwagandha', 'Pré-Treino', 'Burnout', 'Adaptógeno'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '390mg',
      calories: '140 kcal',
      macronutrients: 'Carboidratos: 6g | Proteínas: 3g | Gorduras: 11g',
      clinicalIndications: [
        'Suporte adaptogênico para modulação de cortisol e fadiga crônica',
        'Performance em treinos de força ou endurance sem taquicardia',
        'Recuperação de estresse metabólico e melhora da resistência física'
      ],
      contraindications: ['Gestantes (devido ao fitoterápico Ashwagandha)'],
      optimalTiming: '30 a 45 minutos antes do treino ou no início de dias de alta demanda.',
      synergies: ['Withanolídeos + Teobromina + Cinamaldeído estabilizando energia']
    }
  },
  {
    id: 'rec-luna-13',
    numberCode: '13',
    badgeHeader: 'RECEITA 13 · CARDIOVASCULAR',
    title: 'Cacau com hibisco e gengibre',
    subtitle: 'A última xícara — a que guarda o coração.',
    slug: 'cacau-com-hibisco-e-gengibre',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica',
    prepTime: '5 min',
    yield: '1 porção (200ml)',
    difficulty: 'Fácil',
    description: 'Uma bebida ácida e cítrica, sem leite, para o eixo vascular. A única da biblioteca que pede infusão antes das gotas.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100%', amount: '15 gotas' },
      { item: 'hibisco em pó ou pétalas secas', amount: '1 c.chá' },
      { item: 'gengibre em pó', amount: '¼ c.chá' },
      { item: 'água quente (60–70 °C)', amount: '200 ml' }
    ],
    instructions: [
      'Pétalas de hibisco: infusão de 5 minutos, depois coe.',
      'Coloque as gotas e despeje a infusão quente. Mexa até dissolver.',
      'Acrescente o gengibre.',
      'Não use leite — a acidez do hibisco não combina.'
    ],
    variations: [
      'Gelada, com rodela de laranja → versão de verão',
      'Sem hibisco, com ¼ c.chá de gengibre e água → em caso de refluxo ou sensibilidade à acidez',
      'Com raspas de limão-siciliano → mais vitamina C junto ao ferro do cacau'
    ],
    indication: 'Pressão · cardiovascular · retenção',
    whyItWorks: 'As antocianinas do hibisco somam-se aos flavanóis do cacau estimulando a via eNOS (óxido nítrico sintase endotelial), favorecendo a complacência vascular, a diurese suave e o equilíbrio da pressão arterial.',
    footerText: 'Da floresta. De verdade. · 1 GOTA = 1 GRAMA · AQUEÇA ENTRE 60 E 70 °C · RECEITA 13 · LUNA AZEVEDO, NUTRICIONISTA · SERACACAU.COM.BR',
    imageUrl: '/images/recipe-default.jpg',
    tags: ['Cardiovascular', 'Pressão Arterial', 'Retenção Hídrica', 'Hibisco & Gengibre', 'Óxido Nítrico'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '450mg (flavanóis + antocianinas de hibisco)',
      calories: '90 kcal',
      macronutrients: 'Carboidratos: 4.2g | Proteínas: 2.2g | Gorduras: 8g',
      clinicalIndications: [
        'Melhora da complacência vascular e modulação de pressão arterial',
        'Estímulo de diurese suave e combate à retenção de líquidos',
        'Proteção contra oxidação de LDL através de alta densidade polifenólica'
      ],
      contraindications: ['Hipotensão postural sintomática severa'],
      optimalTiming: 'Manhã ou meio da tarde.',
      synergies: ['Antocianinas do hibisco + Flavan-3-óis do cacau ativando via do Óxido Nítrico']
    }
  }
];
