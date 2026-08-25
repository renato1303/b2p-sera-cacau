/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  // ==========================================
  // 12 RECEITAS DA DANI (COZINHA & RITUAIS)
  // ==========================================
  {
    id: 'rec-dani-1',
    title: 'Bebida Cerimonial de Cacau com Fava de Baunilha e Canela',
    slug: 'bebida-cerimonial-cacau-baunilha-canela',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '8 min',
    yield: '1 porção (200ml)',
    difficulty: 'Fácil',
    description: 'A clássica bebida quente e aveludada da Será Cacau. Feita em fogo brando (sem ferver) para preservar a integridade dos flavanóis e criar uma emulsão densa, perfumada pela fava de baunilha fresca.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100% Puro (ou Barra ralada)', amount: '20g (20 gotas)', notes: 'Cacau orgânico Cabruca' },
      { item: 'Leite vegetal de aveia ou leite de castanha-de-caju', amount: '180ml', notes: 'Preferencialmente artesanal' },
      { item: 'Sementes de Fava de Baunilha Será', amount: 'Raspas de 1/4 da fava', notes: 'Retiradas com a ponta da faca' },
      { item: 'Canela do Ceilão em pó', amount: '1 pitada (0.5g)', notes: 'Antioxidante e termogênica' },
      { item: 'Cardamomo verde moído', amount: '1 pitada opcional', notes: 'Para elevação aromática' },
      { item: 'Mel cru silvestre ou tâmara batida', amount: '1 colher de chá (opcional)', notes: 'Apenas se desejar dulçor sutil' }
    ],
    instructions: [
      'Aqueça o leite vegetal em uma panela pequena em fogo baixo até atingir aproximadamente 55ºC a 60ºC (vapor suave subindo, sem levantar fervura).',
      'Adicione as 20 gotas de Será Cacau e as sementes raspadas da fava de baunilha.',
      'Com um batedor de arame (fouet) ou mixer de mão, emulsione vigorosamente por 60 segundos até formar uma espuma aveludada e homogênea.',
      'Finalize polvilhando a canela do Ceilão e sirva imediatamente em xícara de cerâmica artesanal.'
    ],
    imageUrl: '/images/gotas210.jpeg',
    tags: ['Ritual Matinal', 'Sem Lactose', 'Cacau Puro', 'Antioxidante', 'Bebida Quente'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '240mg',
      polyphenolsMg: '380mg (Equivalente em Ácido Gálico)',
      calories: '148 kcal (com leite de castanha sem açúcar)',
      macronutrients: 'Carboidratos: 7g | Proteínas: 4g | Gorduras Boas: 11g',
      clinicalIndications: [
        'Ativação neurocognitiva e foco sustentado no desjejum',
        'Substituição estratégica e sem ansiedade do café convencional',
        'Modulação de estresse através do ritual de presença'
      ],
      contraindications: ['Sensibilidade severa a metilxantinas no período noturno tardio'],
      optimalTiming: 'Manhã (desjejum) ou 30 minutos antes de tarefas intelectuais intensas.',
      synergies: ['Canela do Ceilão (sensibilizadora de insulina)', 'Gorduras de cadeia média (leite de coco/castanha)']
    }
  },
  {
    id: 'rec-dani-2',
    title: 'Mousse Express de Cacau Puro com Abacate e Nibs Crocantes',
    slug: 'mousse-express-cacau-abacate-nibs',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '10 min',
    yield: '2 porções',
    difficulty: 'Fácil',
    description: 'Sobremesa de alta densidade nutricional, rica em ácido oleico, fibras solúveis e polifenóis de alta potência. Textura idêntica ao mousse tradicional com 100% de ingredientes limpos.',
    ingredients: [
      { item: 'Gotas de Será Cacau derretidas em banho-maria', amount: '40g', notes: 'Em fogo brando' },
      { item: 'Abacate maduro (ou Avocado)', amount: '1 unidade média (aprox. 150g polpa)', notes: 'Bem maduro e cremoso' },
      { item: 'Extrato natural de baunilha ou sementes de fava', amount: '1/2 colher de chá', notes: 'Neutraliza o sabor vegetal do abacate' },
      { item: 'Melaço de cana orgânico ou tâmaras medjool hidratadas', amount: '2 colheres de sopa', notes: 'Para harmonizar o amargor do cacau 100%' },
      { item: 'Nibs de Será Cacau torrados', amount: '1 colher de sopa (10g)', notes: 'Para o acabamento crocante' },
      { item: 'Flor de sal', amount: '1 pitada', notes: 'Realça as notas florais do cacau' }
    ],
    instructions: [
      'Derreta as gotas de cacau em banho-maria ou recipiente sobre água morna até virar um licor brilhante.',
      'No processador ou liquidificador potente, junte o abacate, o cacau derretido, a baunilha, o adoçante natural e a pitada de flor de sal.',
      'Bata por 2 a 3 minutos até obter um creme ultra sedoso e espesso.',
      'Distribua em tacinhas de vidro ou cerâmica, leve à geladeira por 20 minutos e decore com os Nibs de Cacau antes de servir.'
    ],
    imageUrl: '/images/artisanal_ceramics_1783964151303.jpg',
    tags: ['Sobremesa Funcional', 'Vegano', 'Low GI', 'Gorduras Boas', 'Nibs'],
    recommendedProductSlug: 'nibs-de-sera-cacau-250g',
    specifications: {
      theobromineMg: '260mg por porção',
      polyphenolsMg: '420mg',
      calories: '215 kcal por porção',
      macronutrients: 'Carboidratos: 12g | Fibras: 6.5g | Proteínas: 3.8g | Gorduras: 17g',
      clinicalIndications: [
        'Vontade de doce pós-almoço em pacientes com compulsão por açúcar',
        'Aporte de fitoesteróis e magnésio para saúde cardiovascular',
        'Melhora do perfil lipídico através do ácido graxo monoinsaturado'
      ],
      contraindications: ['Alergia a abacate / látex-fruta'],
      optimalTiming: 'Sobremesa de almoço ou lanche da tarde denso.',
      synergies: ['Gordura monoinsaturada do abacate que maximiza a absorção de polifenóis lipofílicos']
    }
  },
  {
    id: 'rec-dani-3',
    title: 'Chá Terapêutico de Casca de Cacau com Gengibre e Casca de Laranja',
    slug: 'cha-casca-cacau-gengibre-laranja',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '7 min',
    yield: '2 xícaras (400ml)',
    difficulty: 'Fácil',
    description: 'Infusão aromática dourada extraída das cascas puras de amêndoas torradas da Bahia. Apresenta notas adocicadas de chocolate com zero caloria, associada à ação digestiva do gengibre e ao limoneno da laranja.',
    ingredients: [
      { item: 'Chá de Casca de Cacau Será 25g', amount: '2 colheres de sopa (6g)', notes: 'Cascas orgânicas selecionadas' },
      { item: 'Água mineral filtrada', amount: '400ml', notes: 'Aquecida a 90ºC' },
      { item: 'Gengibre fresco fatiado fino', amount: '3 rodelas', notes: 'Ação digestiva e anti-inflamatória' },
      { item: 'Tiras de casca de laranja bahia orgânica', amount: '2 tiras (sem a parte branca)', notes: 'Rica em d-limoneno' }
    ],
    instructions: [
      'Aqueça a água até iniciar as primeiras bolhas de fundo (cerca de 90ºC). Desligue o fogo.',
      'Adicione as cascas de cacau, as fatias de gengibre e as cascas de laranja em uma prensa francesa ou infusor com tampa.',
      'Tampe e deixe em infusão por 5 a 7 minutos.',
      'Pressione o êmbolo ou coe, servindo morno. Não necessita adoçar devido ao perfume adocicado natural do cacau.'
    ],
    imageUrl: '/images/cabruca_forest_1783964129461.jpg',
    tags: ['Infusão', 'Digestivo', 'Zero Caloria', 'Casca de Cacau', 'Ritual Tarde'],
    recommendedProductSlug: 'cha-de-casca-de-cacau-25g',
    specifications: {
      theobromineMg: '45mg (suave)',
      polyphenolsMg: '190mg',
      calories: '< 5 kcal',
      macronutrients: 'Carboidratos: 0.8g | Proteínas: 0g | Gorduras: 0g',
      clinicalIndications: [
        'Sensação de plenitude gástrica e lentidão digestiva pós-prandial',
        'Desejo de sabor de chocolate sem carga calórica ou glicêmica',
        'Hidratação funcional em períodos de jejum intermitente'
      ],
      contraindications: ['Sensibilidade gástrica aguda a gengibre picante'],
      optimalTiming: 'Meio da tarde (15h às 17h) ou 30 minutos após o almoço.',
      synergies: ['D-limoneno cítrico que estimula a motilidade biliar e digestão de lipídios']
    }
  },
  {
    id: 'rec-dani-4',
    title: 'Granola Rústica de Frigideira com Nibs e Castanhas Nativas',
    slug: 'granola-rustica-nibs-castanhas',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '12 min',
    yield: '6 porções (300g)',
    difficulty: 'Fácil',
    description: 'Granola crocante, sem trigo e sem açúcar refinado, tostada suavemente em frigideira de ferro com óleo de coco e enriquecida com os Nibs de Cacau 100% Puro da Cabruca no final.',
    ingredients: [
      { item: 'Nibs de Será Cacau 250g', amount: '4 colheres de sopa (40g)', notes: 'Adicionar somente após o fogo desligado' },
      { item: 'Flocos grossos de aveia sem glúten', amount: '1 xícara (100g)', notes: 'Rica em beta-glucana' },
      { item: 'Castanha-do-Brasil picada grosseiramente', amount: '1/2 xícara (50g)', notes: 'Fonte nobre de selênio' },
      { item: 'Sementes de abóbora e girassol', amount: '4 colheres de sopa (30g)', notes: 'Ricas em zinco' },
      { item: 'Óleo de coco virgem ou manteiga de cacau derretida', amount: '1 colher de sopa', notes: 'Para tostar com brilho' },
      { item: 'Melaço ou xarope de maçã', amount: '1 colher de sopa rasa', notes: 'Para caramelização suave' }
    ],
    instructions: [
      'Em uma frigideira grande em fogo médio-baixo, derreta o óleo de coco e adicione a aveia, as castanhas e as sementes.',
      'Toste mexendo continuamente com espátula de bambu por 6 a 8 minutos até dourar e perfumar a cozinha.',
      'Adicione o melaço, mexa rapidamente por mais 1 minuto e desligue o fogo.',
      'Espere esfriar completamente para atingir crocância total e então incorpore os Nibs de Cacau.',
      'Armazene em pote hermético de vidro por até 15 dias.'
    ],
    imageUrl: '/images/cocoa_drops_jar_1783964100837.jpg',
    tags: ['Crocante', 'Topping', 'Sem Glúten', 'Zinco & Selênio', 'Café da Manhã'],
    recommendedProductSlug: 'nibs-de-sera-cacau-250g',
    specifications: {
      theobromineMg: '120mg por porção (40g)',
      polyphenolsMg: '210mg',
      calories: '185 kcal por porção',
      macronutrients: 'Carboidratos: 14g | Fibras: 4.2g | Proteínas: 5.5g | Gorduras: 12g',
      clinicalIndications: [
        'Aporte de fibras prebióticas para saúde intestinal',
        'Reforço antioxidante em cafés da manhã com frutas e iogurte',
        'Estímulo à mastigação ativa (sinalização de saciedade neural)'
      ],
      contraindications: ['Alergia comprovada a castanhas / oleaginosas'],
      optimalTiming: 'Desjejum matinal com iogurte grego natural, kefir ou frutas vermelhas.',
      synergies: ['Beta-glucana da aveia combinada com polifenóis do cacau alimentando bactérias produtoras de SCFA']
    }
  },
  {
    id: 'rec-dani-5',
    title: 'Trufa Raw de Tâmaras, Cacau em Barra e Flor de Sal',
    slug: 'trufa-raw-tamaras-barra-cacau',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '15 min',
    yield: '10 trufas',
    difficulty: 'Fácil',
    description: 'Trufas nobres sem forno, sem derivados de leite e sem açúcar adicionado. O amargor profundo da Barra de Será Cacau 200g equilibra o dulçor caramelo das tâmaras.',
    ingredients: [
      { item: 'Barra Será Cacau 200g ralada bem fina', amount: '60g', notes: 'Cacau 100% puro Cabruca' },
      { item: 'Tâmaras Medjool sem caroço', amount: '8 unidades (aprox. 160g)', notes: 'Macia e carnuda' },
      { item: 'Farinha de amêndoas ou castanha de caju', amount: '3 colheres de sopa (30g)', notes: 'Para dar estrutura' },
      { item: 'Extrato de baunilha natural', amount: '1 colher de café', notes: 'Aroma e aconchego' },
      { item: 'Flor de sal marinho', amount: '1/2 colher de café', notes: 'Contraste mineral' }
    ],
    instructions: [
      'No processador de alimentos, triture as tâmaras com a farinha de amêndoas e a baunilha até formar uma massa pegajosa e uniforme.',
      'Incorpore 40g do cacau ralado na massa e processe brevemente.',
      'Modele 10 bolinhas uniformes com as palmas das mãos levemente umedecidas.',
      'Passe as trufas no restante do cacau ralado (20g) e finalize com 2 cristais de flor de sal sobre cada trufa.',
      'Mantenha refrigerado em pote fechado.'
    ],
    imageUrl: '/images/disc.jpeg',
    tags: ['Sem Açúcar', 'Docinho Limpo', 'Barra 200g', 'Energia Pré-Treino'],
    recommendedProductSlug: 'barra-sera-cacau-200g',
    specifications: {
      theobromineMg: '85mg por trufa',
      polyphenolsMg: '160mg',
      calories: '88 kcal por unidade',
      macronutrients: 'Carboidratos: 13g | Fibras: 2.1g | Proteínas: 1.8g | Gorduras: 3.5g',
      clinicalIndications: [
        'Snack pré-treino de rápida metabolização com energia limpa',
        'Suporte para pacientes com compulsão noturna por doces',
        'Excelente opção para recepção e hospitalidade em consultório'
      ],
      contraindications: ['Pacientes em protocolo estrito de restrição de FODMAPs'],
      optimalTiming: 'Lanche intermediário ou 45 minutos antes de treinos de endurance.',
      synergies: ['Potássio natural das tâmaras com magnésio do cacau favorecendo a contração muscular']
    }
  },
  {
    id: 'rec-dani-6',
    title: 'Molho Mole Tropical de Cacau com Pimenta Rosa para Saladas e Raízes',
    slug: 'molho-mole-cacau-pimenta-rosa',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '10 min',
    yield: '4 porções (120ml)',
    difficulty: 'Médio',
    description: 'Inspirado na ancestral tradição culinária mesoamericana, este molho salgado combina as notas terrosas da Barra de Cacau com azeite de oliva extravirgem, limão cravo e pimenta rosa.',
    ingredients: [
      { item: 'Barra Será Cacau 200g ralada e derretida', amount: '25g', notes: 'Cacau 100% puro' },
      { item: 'Azeite de oliva extravirgem (acidez < 0.2%)', amount: '4 colheres de sopa (60ml)', notes: 'Aporte de polifenóis' },
      { item: 'Suco de limão cravo ou limão siciliano', amount: '2 colheres de sopa (30ml)', notes: 'Acidez equilibrada' },
      { item: 'Pimenta rosa levemente esmagada', amount: '1 colher de chá', notes: 'Frutada e aromática' },
      { item: 'Alho negro picado ou alho assado', amount: '1 dente pequeno', notes: 'Notas umami profundas' },
      { item: 'Sal marinho integral', amount: '1 pitada', notes: 'A gosto' }
    ],
    instructions: [
      'Em um bowl pequeno, misture o azeite morno com o cacau derretido até emulsionar perfeitamente.',
      'Acrescente o suco de limão, batendo rapidamente com um garfo para criar uma textura cremosa brilhante.',
      'Incorpore o alho negro amassado, o sal marinho e as sementes de pimenta rosa.',
      'Sirva sobre abóbora cabotiá assada, saladas de folhas escuras amargas (rúcula e agrião) ou legumes grelhados.'
    ],
    imageUrl: '/images/gotas105.jpeg',
    tags: ['Culinária Salgada', 'Alta Gastronomia', 'Umami', 'Antioxidante Lipofílico'],
    recommendedProductSlug: 'barra-sera-cacau-200g',
    specifications: {
      theobromineMg: '75mg por porção',
      polyphenolsMg: '280mg',
      calories: '162 kcal por porção',
      macronutrients: 'Carboidratos: 2.5g | Proteínas: 1.1g | Gorduras: 17g',
      clinicalIndications: [
        'Adesão à ingestão de vegetais amargos por enriquecimento sensorial',
        'Estímulo à secreção enzimática biliar através de princípios amargos',
        'Aporte de compostos fenólicos duplos (oliva + cacau)'
      ],
      contraindications: ['Refluxo gastroesofágico ativo em crise aguda'],
      optimalTiming: 'Almoço ou jantar acompanhando vegetais e proteínas.',
      synergies: ['Azeite de oliva e fitoativos do cacau ampliando a vasodilatação dependente de endotélio']
    }
  },
  {
    id: 'rec-dani-7',
    title: 'Iced Cacau Tonic com Espuma Cítrica de Laranja',
    slug: 'iced-cacau-tonic-espuma-citrica',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '5 min',
    yield: '1 copo longo (300ml)',
    difficulty: 'Fácil',
    description: 'Mocktail funcional refrescante para dias quentes. A teobromina do cacau infundida a frio com água tônica botânica sem açúcar e gelo, coroada com raspas de laranja fresca.',
    ingredients: [
      { item: 'Gotas de Será Cacau 105g', amount: '15g (15 gotas)', notes: 'Dissolvidas em 30ml de água quente' },
      { item: 'Água tônica artesanal sem açúcar ou água com gás', amount: '200ml', notes: 'Bem gelada' },
      { item: 'Gelo em cubos grandes', amount: '4 a 5 pedras', notes: 'Para resfriamento rápido' },
      { item: 'Ramo de alecrim fresco', amount: '1 galho', notes: 'Para aromatizar batendo na palma da mão' },
      { item: 'Casca espiralada de laranja bahia', amount: '1 unidade', notes: 'Para finalizar' }
    ],
    instructions: [
      'Em um copo pequeno, derreta as 15 gotas de cacau em 30ml de água a 60ºC mexendo até formar um espresso concentrado de cacau.',
      'Encha um copo alto com as pedras de gelo.',
      'Despeje a água tônica ou com gás até 3/4 do copo.',
      'Verta lentamente o concentrado de cacau sobre o gelo, criando um degradê visual marcante.',
      'Bata o ramo de alecrim na palma das mãos para liberar óleos essenciais, decore com o alecrim e a espiral de laranja.'
    ],
    imageUrl: '/images/artisanal_ceramics_1783964151303.jpg',
    tags: ['Mocktail', 'Bebida Gelada', 'Refrescante', 'Sem Álcool', 'Verão Cabruca'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '290mg',
      calories: '84 kcal',
      macronutrients: 'Carboidratos: 4.5g | Proteínas: 1.9g | Gorduras: 7g',
      clinicalIndications: [
        'Substituição de refrigerantes e bebidas alcoólicas em encontros sociais',
        'Estímulo à circulação periférica em dias quentes',
        'Recuperação de fadiga mental vespertina'
      ],
      contraindications: ['Sensibilidade gástrica a água gaseificada'],
      optimalTiming: 'Tarde ensolarada (14h às 16h) ou como aperitivo antes do jantar.',
      synergies: ['Ácido cítrico e limoneno que potencializam a absorção de ferro do cacau']
    }
  },
  {
    id: 'rec-dani-8',
    title: 'Mingau Cetogênico de Cacau, Coco e Sementes de Cânhamo',
    slug: 'mingau-cetogenico-cacau-coco-canhamo',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '8 min',
    yield: '1 bowl',
    difficulty: 'Fácil',
    description: 'Bowl aveludado e reconfortante sem grãos, rico em ácidos graxos de cadeia média (TCM), fibras solúveis e proteínas vegetais completas, temperado com Gotas de Cacau puro.',
    ingredients: [
      { item: 'Gotas de Será Cacau 210g', amount: '20g', notes: 'Adicionar no final da cocção' },
      { item: 'Leite de coco integral', amount: '150ml', notes: 'Fonte nobre de ácido láurico' },
      { item: 'Farinha de linhaça dourada moída na hora', amount: '2 colheres de sopa (20g)', notes: 'Fibras mucilaginosas' },
      { item: 'Sementes de chia', amount: '1 colher de sopa (10g)', notes: 'Ricas em ômega-3 ALA' },
      { item: 'Corações de semente de cânhamo descascadas', amount: '1 colher de sopa (10g)', notes: 'Proteína vegetal de alto valor' },
      { item: 'Extrato puro de baunilha', amount: '1/2 colher de chá', notes: 'Para aromatizar' }
    ],
    instructions: [
      'Em uma panela pequena, misture o leite de coco, a linhaça e a chia.',
      'Cozinhe em fogo brando mexendo continuamente por cerca de 4 a 5 minutos até engrossar e atingir textura de mingau cremoso.',
      'Desligue o fogo e adicione imediatamente as Gotas de Será Cacau e a baunilha, mexendo até derreter completamente no calor residual.',
      'Transfira para um bowl e finalize salpicando as sementes de cânhamo e algumas raspas de cacau por cima.'
    ],
    imageUrl: '/images/gotas210.jpeg',
    tags: ['Low Carb', 'Keto', 'Sem Grãos', 'Saciedade Prolongada', 'Cacau Puro'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '240mg',
      polyphenolsMg: '390mg',
      calories: '310 kcal',
      macronutrients: 'Carboidratos Líquidos: 3.2g | Fibras: 9g | Proteínas: 9.5g | Gorduras: 28g',
      clinicalIndications: [
        'Estratégias de restrição glicêmica e controle de resistência insulínica',
        'Suporte à saciedade matinal e estabilização de curvas de glicemia',
        'Aporte de ômega-3 vegetal anti-inflamatório'
      ],
      contraindications: ['Dietas com restrição severa de gorduras'],
      optimalTiming: 'Desjejum em protocolos Low-Carb / Cetogênicos.',
      synergies: ['Gordura saturada de cadeia média do coco favorecendo a cetogênese e cognição']
    }
  },
  {
    id: 'rec-dani-9',
    title: 'Smoothie Verde Florestal com Clorofila, Banana e Nibs de Cacau',
    slug: 'smoothie-verde-florestal-cacau-clorofila',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '5 min',
    yield: '1 copo grande (350ml)',
    difficulty: 'Fácil',
    description: 'Bebida viva que une o frescor das folhas verdes da agrofloresta com a energia profunda do cacau puro e o contraste crocante dos Nibs.',
    ingredients: [
      { item: 'Nibs de Será Cacau 250g', amount: '1 colher de sopa (10g)', notes: 'Para pulsar no final' },
      { item: 'Banana nanica congelada fatiada', amount: '1 unidade', notes: 'Base cremosa e potássio' },
      { item: 'Folhas de espinafre cru ou couve baby higienizadas', amount: '1 xícara cheia', notes: 'Fonte de clorofila e nitratos' },
      { item: 'Água de coco natural gelada', amount: '150ml', notes: 'Eletrólitos naturais' },
      { item: 'Gengibre fresco ralado', amount: '1 colher de café', notes: 'Termogênico e digestivo' }
    ],
    instructions: [
      'No liquidificador, bata a banana congelada, as folhas verdes, a água de coco e o gengibre até obter uma consistência ultra cremosa e homogênea.',
      'Adicione os Nibs de Cacau e acione o botão "Pulsar" do liquidificador apenas 2 vezes (mantendo pedacinhos crocantes de cacau na bebida).',
      'Despeje em copo alto e consuma imediatamente para preservar a integridade enzimática e vitamínica.'
    ],
    imageUrl: '/images/cabruca_forest_1783964129461.jpg',
    tags: ['Smoothie', 'Energia Limpa', 'Clorofila', 'Pós-Treino', 'Nibs'],
    recommendedProductSlug: 'nibs-de-sera-cacau-250g',
    specifications: {
      theobromineMg: '120mg',
      polyphenolsMg: '240mg',
      calories: '165 kcal',
      macronutrients: 'Carboidratos: 28g | Fibras: 5g | Proteínas: 3.5g | Gorduras: 5.2g',
      clinicalIndications: [
        'Aporte de nitratos naturais + flavonoides para vasodilatação pré-atividade',
        'Reposição eletrolítica em dias quentes ou após treino',
        'Fácil digestibilidade e assimilação rápida de micronutrientes'
      ],
      contraindications: ['Pacientes com cálculos renais recorrentes de oxalato (moderar espinafre)'],
      optimalTiming: 'Café da manhã dinâmico ou lanche pré-treino de 60 minutos.',
      synergies: ['Nitratos das folhas verdes associados a flavonoides do cacau potencializando a síntese de Óxido Nítrico (NO)']
    }
  },
  {
    id: 'rec-dani-10',
    title: 'Cacau Latte Especiado Golden Moon com Cúrcuma e Cardamomo',
    slug: 'cacau-latte-golden-moon-curcuma',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '6 min',
    yield: '1 xícara (200ml)',
    difficulty: 'Fácil',
    description: 'Uma releitura sofisticada do tradicional Golden Milk indiano fundido com o puro cacau da Bahia. A curcumina sinérgica com a teobromina promove uma poderosa modulação anti-inflamatória.',
    ingredients: [
      { item: 'Gotas de Será Cacau 105g', amount: '15g (15 gotas)', notes: 'Cacau 100% puro' },
      { item: 'Leite de amêndoas ou leite de aveia', amount: '180ml', notes: 'Morno' },
      { item: 'Cúrcuma pura em pó (orgânica)', amount: '1 colher de café rasa (1g)', notes: 'Curcumina ativa' },
      { item: 'Pimenta preta moída na hora', amount: '1 micro pitada', notes: 'Piperina para aumentar absorção da curcumina em 2000%' },
      { item: 'Manteiga Ghee ou óleo de coco', amount: '1 colher de café', notes: 'Carreador lipofílico' },
      { item: 'Cardamomo em pó', amount: '1 pitada', notes: 'Aroma relaxante' }
    ],
    instructions: [
      'Aqueça o leite vegetal com a cúrcuma, a pimenta preta, o cardamomo e a manteiga ghee até começar a soltar vapor suave.',
      'Apague o fogo, adicione as Gotas de Será Cacau e bata com mixer de mão por 40 segundos até criar textura espumosa e cor bronzeada dourada.',
      'Sirva quente em ambiente calmo e silencioso.'
    ],
    imageUrl: '/images/artisanal_ceramics_1783964151303.jpg',
    tags: ['Anti-inflamatório', 'Golden Milk', 'Cúrcuma & Cacau', 'Ritual Noturno Suave'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '180mg',
      polyphenolsMg: '340mg',
      calories: '135 kcal',
      macronutrients: 'Carboidratos: 5.5g | Proteínas: 2.8g | Gorduras: 11g',
      clinicalIndications: [
        'Modulação de dores articulares e marcadores inflamatórios crônicos (PCR-us)',
        'Suporte a pacientes em desmame gradual de estimulantes sintéticos',
        'Ritual de reconexão e transição no fim da tarde'
      ],
      contraindications: ['Obstrução de vias biliares (devido à cúrcuma)'],
      optimalTiming: 'Final da tarde (17h) como ritual de transição pós-trabalho.',
      synergies: ['Piperina + Lipídios + Curcumina + Flavonoides formando complexo antioxidante multicamadas']
    }
  },
  {
    id: 'rec-dani-11',
    title: 'Bark Crocante de Barra de Cacau 450g com Sementes e Flor de Sal',
    slug: 'bark-crocante-barra-cacau-450g',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '20 min (+ refrigeração)',
    yield: '8 porções de 30g',
    difficulty: 'Fácil',
    description: 'Placas finas de chocolate artesanal 100% puro salpicadas com sementes de girassol, goji berries e flor de sal da Bahia. Perfeitas para ter guardadas no freezer e quebrar lascas diárias de 20g.',
    ingredients: [
      { item: 'Barra Será Cacau 450g cortada em pedaços', amount: '200g', notes: 'Para temperar suavemente' },
      { item: 'Sementes de girassol e sementes de abóbora tostadas', amount: '3 colheres de sopa', notes: 'Crocância mineral' },
      { item: 'Goji berry desidratada ou cranberries picadas', amount: '2 colheres de sopa', notes: 'Toque agridoce' },
      { item: 'Nibs de Será Cacau', amount: '2 colheres de sopa', notes: 'Para textura dupla' },
      { item: 'Flor de sal marinho', amount: '1 colher de café', notes: 'Contraste crocante' }
    ],
    instructions: [
      'Derreta 150g da barra em banho-maria brando até atingir 45ºC. Retire do calor e adicione os 50g restantes de barra picada, mexendo sem parar até dissolver e baixar a temperatura para 31ºC (têmpera manual prática).',
      'Despeje o cacau sobre uma assadeira forrada com papel manteiga, espalhando com espátula até ficar com 4mm de espessura.',
      'Imediatamente, antes de endurecer, salpique as sementes, goji berries, nibs e flor de sal.',
      'Leve à geladeira por 15 minutos até firmar totalmente.',
      'Quebre em lascas rústicas à mão e guarde em pote hermético na geladeira.'
    ],
    imageUrl: '/images/cocoa_disc_1783964109965.jpg',
    tags: ['Snack Caseiro', 'Meal Prep', 'Barra 450g', 'Freezer Friendly'],
    recommendedProductSlug: 'barra-sera-cacau-450g',
    specifications: {
      theobromineMg: '250mg por porção de 30g',
      polyphenolsMg: '410mg',
      calories: '155 kcal por porção',
      macronutrients: 'Carboidratos: 6g | Fibras: 4g | Proteínas: 3.8g | Gorduras: 13.5g',
      clinicalIndications: [
        'Controle prático da porção diária de fitoativos prescrita',
        'Substituição de doces industrializados por chocolate 100% puro',
        'Aporte de micronutrientes (magnésio, selênio, zinco)'
      ],
      contraindications: ['Sensibilidade estrita a metilxantinas à noite'],
      optimalTiming: 'Após o almoço ou como lanche da tarde acompanhado de café ou chá.',
      synergies: ['Zinco das sementes de abóbora atuando em co-fator com os antioxidantes do cacau']
    }
  },
  {
    id: 'rec-dani-12',
    title: 'Elixir de Cacau com Cogumelo Reishi e Cardamomo para Fim de Tarde',
    slug: 'elixir-cacau-reishi-cardamomo',
    category: 'cozinha',
    author: 'Dani',
    authorRole: 'Chef Funcional & Pesquisadora Culinária da Cabruca',
    prepTime: '6 min',
    yield: '1 porção (180ml)',
    difficulty: 'Fácil',
    description: 'Bebida adaptogênica reconfortante que harmoniza a profundidade da floresta Cabruca com o cogumelo Reishi (*Ganoderma lucidum*). Ideal para desacelerar ondas cerebrais no entardecer.',
    ingredients: [
      { item: 'Gotas de Será Cacau 105g', amount: '12g (12 gotas)', notes: 'Dose equilibrada de fim de tarde' },
      { item: 'Extrato puro de Reishi em pó (dupla extração)', amount: '1g (1/2 colher de café)', notes: 'Adaptógeno nobre' },
      { item: 'Leite de castanha-de-caju morno', amount: '160ml', notes: 'Cremoso' },
      { item: 'Cardamomo em pó e noz-moscada ralada', amount: '1 pitada de cada', notes: 'Notas aromáticas calmantes' },
      { item: 'Óleo essencial de tangerina (próprio para ingestão)', amount: '1 gota opcional', notes: 'Para elevação sensorial' }
    ],
    instructions: [
      'Aqueça o leite de castanha até ficar morno (55ºC).',
      'Transfira para o liquidificador ou caneca e junte as Gotas de Cacau, o extrato de Reishi, as especiarias e a gotinha cítrica.',
      'Bata com mixer por 30 segundos até formar uma emulsão espumosa marrom-dourada.',
      'Beba devagar, com atenção plena e longe de telas azuis.'
    ],
    imageUrl: '/images/cacao_science_1783964140124.jpg',
    tags: ['Adaptógenos', 'Reishi & Cacau', 'Desaceleração', 'Higiene do Sono'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '144mg',
      polyphenolsMg: '250mg + Polissacarídeos Beta-Glucanas do Reishi',
      calories: '115 kcal',
      macronutrients: 'Carboidratos: 4.8g | Proteínas: 3.2g | Gorduras: 9g',
      clinicalIndications: [
        'Pacientes com hiperativação simpática e dificuldade de desacelerar à noite',
        'Modulação imune e suporte adaptogênico ao estresse crônico',
        'Transição do ritmo de trabalho para o repouso noturno'
      ],
      contraindications: ['Uso concomitante com anticoagulantes em altas doses (avaliar Reishi)'],
      optimalTiming: 'Final da tarde (17h30 às 18h30).',
      synergies: ['Triterpenos do Reishi com teobromina do cacau modulando receptores de adenosina suavemente']
    }
  },

  // ==========================================
  // 7 RECEITAS DA LUNA (CLÍNICAS & TERAPÊUTICAS PARA PACIENTES)
  // ==========================================
  {
    id: 'rec-luna-1',
    title: 'Protocolo Desjejum Foco & Neuroplasticidade (Shot Lipídico de Cacau)',
    slug: 'protocolo-desjejum-foco-neuroplasticidade',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica Especialista em Fitoquímica & Saúde Integrativa',
    prepTime: '4 min',
    yield: '1 dose clínica (60ml)',
    difficulty: 'Fácil',
    description: 'Protocolo de alta precisão desenhado para fornecer fitoativos neuroprotetores (teobromina, epicatequina) associados a carreadores lipofílicos de rápida absorção, sem oscilações glicêmicas matinais.',
    ingredients: [
      { item: 'Gotas de Será Cacau 100% Puro 210g', amount: '15g a 20g (15 a 20 gotas)', notes: 'Dose clínica padronizada' },
      { item: 'TCM (Triglicerídeos de Cadeia Média C8/C10) ou Manteiga Ghee', amount: '1 colher de sobremesa (7ml)', notes: 'Carreador de corpos cetônicos' },
      { item: 'Água mineral aquecida a 60ºC', amount: '40ml', notes: 'Temperatura ótima para solubilização sem degradação térmica' },
      { item: 'Canela do Ceilão verdadeira', amount: '0.5g (1 pitada)', notes: 'Modulador de transportadores GLUT-4' },
      { item: 'Flor de sal mineral', amount: '1 micro cristal', notes: 'Estímulo de condutância e palatabilidade' }
    ],
    instructions: [
      'Aqueça 40ml de água mineral até 60ºC (nunca ferva).',
      'Em um copo de dose (shot) de vidro ou cerâmica, adicione as 15 a 20 gotas de Será Cacau e a colher de sobremesa de TCM/Ghee.',
      'Despeje a água aquecida e emulsione com mini-mixer portátil durante 20 segundos até atingir aspecto de espresso cremoso.',
      'Polvilhe a canela e oriente o paciente a ingerir em jejum ou 20 minutos antes do início do trabalho intelectual.'
    ],
    imageUrl: '/images/gotas210.jpeg',
    tags: ['Prescrição Clínica', 'Foco Cognitivo', 'Low Glycemic', 'Epicatequina', 'Desjejum'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '240mg (estimulação de adenosina sem taquicardia)',
      polyphenolsMg: '380mg de flavonoides totais',
      calories: '158 kcal',
      macronutrients: 'Carboidratos Líquidos: 1.5g | Fibras: 3.2g | Proteínas: 2.1g | Gorduras Lipídicas: 15.5g',
      clinicalIndications: [
        'Fadiga mental matinal e "brain fog" associado a dietas hiperglicêmicas',
        'Substituição ou desmame de doses abusivas de cafeína em pacientes ansiosos',
        'Otimização da perfusão cerebral através da liberação endotelial de Óxido Nítrico'
      ],
      contraindications: ['Portadores de refluxo gastroesofágico com hipotonia severa de esfíncter inferior'],
      optimalTiming: 'Desjejum matinal em jejum ou nos primeiros 30 minutos após acordar.',
      synergies: [
        'C8/C10 estimula cetogênese hepática rápida que nutre astrócitos cerebrais',
        'Canela do Ceilão potencializa sensibilidade insulínica e estabilidade glicêmica'
      ]
    }
  },
  {
    id: 'rec-luna-2',
    title: 'Modulador de Cortisol Vespertino com Será Cacau & Ashwagandha',
    slug: 'modulador-cortisol-cacau-ashwagandha',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica Especialista em Fitoquímica & Saúde Integrativa',
    prepTime: '5 min',
    yield: '1 xícara terapêutica (150ml)',
    difficulty: 'Fácil',
    description: 'Bebida funcional prescrita para amortecer o pico secundário de cortisol entre 16h e 18h, prevenindo a exaustão adrenal, a compulsão noturna por carboidratos refinados e a irritabilidade de final de expediente.',
    ingredients: [
      { item: 'Gotas de Será Cacau 105g', amount: '12g (12 gotas)', notes: 'Aporte de magnésio e anandamida' },
      { item: 'Extrato seco padronizado de Ashwagandha (*Withania somnifera* 5% withanolídeos)', amount: '300mg a 500mg', notes: 'Adaptógeno regulador de eixo HPA' },
      { item: 'Leite vegetal de coco ou amêndoas sem aditivos', amount: '140ml', notes: 'Morno (55ºC)' },
      { item: 'Raspas de Fava de Baunilha Será', amount: '1 pitada', notes: 'Aroma modulador de humor' },
      { item: 'Cardamomo em pó', amount: '1 pitada', notes: 'Digestivo e aromático' }
    ],
    instructions: [
      'Aqueça o leite vegetal até 55ºC.',
      'Em uma caneca, misture o extrato de Ashwagandha com as 12 Gotas de Será Cacau e a baunilha.',
      'Verta o leite morno e homogenize com mixer manual até completa dissolução dos compostos.',
      'Consumir no consultório ou prescrever para o paciente preparar às 16h30 no ambiente de trabalho.'
    ],
    imageUrl: '/images/gotas105.jpeg',
    tags: ['Modulação de Cortisol', 'Eixo HPA', 'Ashwagandha', 'Anti-Ansiedade', 'Prescrição'],
    recommendedProductSlug: 'gotas-sera-cacau-105g',
    specifications: {
      theobromineMg: '144mg',
      polyphenolsMg: '230mg + 25mg withanolídeos ativos',
      calories: '110 kcal',
      macronutrients: 'Carboidratos: 4.2g | Fibras: 2.2g | Proteínas: 2.5g | Gorduras: 9g',
      clinicalIndications: [
        'Picos vespertinos de estresse com compulsão alimentar compensatória',
        'Desregulação do eixo HPA (Hipotálamo-Pituitária-Adrenal)',
        'Ansiedade antecipatória antes do retorno ao lar'
      ],
      contraindications: ['Gestantes e pacientes em uso de imunossupressores (devido à Ashwagandha)'],
      optimalTiming: 'Vespertino (16h00 às 17h30).',
      synergies: [
        'Withanolídeos + Anandamida do cacau modulam receptores GABAérgicos e endocanabinoides',
        'Magnésio quelado natural da Cabruca atua como cofator de relaxamento muscular'
      ]
    }
  },
  {
    id: 'rec-luna-3',
    title: 'Shake Pré-Treino de Resistência Cardiorrespiratória (NO2 Booster)',
    slug: 'shake-pre-treino-resistencia-no2',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica Especialista em Fitoquímica & Saúde Integrativa',
    prepTime: '5 min',
    yield: '1 porção (300ml)',
    difficulty: 'Fácil',
    description: 'Protocolo ergogênico natural que combina a vasodilatação por Óxido Nítrico dependente de flavanóis do cacau com o nitrato inorgânico da beterraba e a teobromina broncodilatadora.',
    ingredients: [
      { item: 'Gotas de Será Cacau 210g (ou Nibs moídos)', amount: '20g', notes: 'Flavanóis concentrados' },
      { item: 'Beterraba crua pequena ralada (ou 5g beterraba em pó 100%)', amount: '40g', notes: 'Fonte de nitrato NO3-' },
      { item: 'Água de coco natural ou água filtrada', amount: '200ml', notes: 'Potássio e hidratação celular' },
      { item: 'Proteína vegetal de arroz e ervilha sabor neutro ou baunilha', amount: '20g', notes: 'Para aporte de BCAAs' },
      { item: 'Gengibre fresco ralado', amount: '3g', notes: 'Ação anti-inflamatória' }
    ],
    instructions: [
      'No liquidificador, bata a beterraba com a água de coco e o gengibre por 60 segundos até triturar finamente.',
      'Adicione a proteína vegetal e as Gotas de Será Cacau derretidas ou raladas finas.',
      'Bata por mais 20 segundos até obter um shake homogêneo e aveludado de tonalidade rubi escura.',
      'Administrar ao atleta ou praticante de atividade física 45 a 60 minutos antes da sessão de treino.'
    ],
    imageUrl: '/images/gotas210.jpeg',
    tags: ['Nutrição Esportiva', 'Óxido Nítrico', 'Endurance', 'Vasodilatação', 'Pré-Treino'],
    recommendedProductSlug: 'gotas-sera-cacau-210g',
    specifications: {
      theobromineMg: '240mg (broncodilatação suave e sustentação cardíaca)',
      polyphenolsMg: '410mg (+ 250mg nitratos naturais)',
      calories: '225 kcal',
      macronutrients: 'Carboidratos: 18g | Fibras: 5.5g | Proteínas: 21g | Gorduras: 8.5g',
      clinicalIndications: [
        'Melhora do VO2 máx e tolerância ao esforço em treinos de corrida, ciclismo e natação',
        'Diminuição da percepção subjetiva de esforço (PSE) via ativação central suave',
        'Proteção muscular contra dano oxidativo induzido pelo exercício intenso'
      ],
      contraindications: ['Pacientes com hipotensão postural severa não controlada'],
      optimalTiming: '45 a 60 minutos antes de treinos de força ou endurance.',
      synergies: [
        'Flavanóis do cacau ativam eNOS (sintase endotelial de NO), complementando a via nitrato-nitrito da beterraba',
        'Teobromina promove broncodilatação sem gerar taquicardia desordenada'
      ]
    }
  },
  {
    id: 'rec-luna-4',
    title: 'Compota Prebiótica de Biomassa de Banana Verde e Barra de Cacau 200g',
    slug: 'compota-prebiotica-biomassa-cacau',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica Especialista em Fitoquímica & Saúde Integrativa',
    prepTime: '12 min',
    yield: '4 porções de 60g',
    difficulty: 'Fácil',
    description: 'Protocolo clínico para modulação da barreira intestinal e aumento de bactérias produtoras de butirato (*Faecalibacterium prausnitzii* e *Akkermansia muciniphila*). O amido resistente da biomassa atua em perfeita simbiose com os polifenóis insolúveis do cacau.',
    ingredients: [
      { item: 'Barra Será Cacau 200g ralada', amount: '50g', notes: 'Cacau puro não alcalinizado' },
      { item: 'Biomassa de banana verde em pasta (morna)', amount: '150g', notes: 'Rica em amido resistente tipo 2' },
      { item: 'Leite vegetal de aveia ou água mineral', amount: '60ml', notes: 'Para atingir cremosidade' },
      { item: 'Óleo essencial de laranja doce (alimentício) ou raspas', amount: '2 gotas', notes: 'D-limoneno protetor' },
      { item: 'Canela em pó', amount: '1 colher de café', notes: 'Ação antifúngica' }
    ],
    instructions: [
      'Em uma panela em fogo baixo, aqueça a biomassa de banana verde com o leite vegetal e a canela até amolecer.',
      'Desligue o fogo e adicione a Barra de Será Cacau ralada, mexendo vigorosamente com colher de silicone até derreter no calor da biomassa e incorporar em tom marrom escuro brilhante.',
      'Adicione as gotinhas de laranja doce e distribua em 4 potinhos de vidro esterilizados.',
      'Armazene em geladeira por até 7 dias.'
    ],
    imageUrl: '/images/barra_cacau_bar_1787156448903.jpg',
    tags: ['Microbiota Intestinal', 'Amido Resistente', 'Butirato', 'Saúde da Barreira', 'Prescrição'],
    recommendedProductSlug: 'barra-sera-cacau-200g',
    specifications: {
      theobromineMg: '150mg por porção (60g)',
      polyphenolsMg: '320mg de polifenóis ligados à matriz vegetal',
      calories: '118 kcal por porção',
      macronutrients: 'Carboidratos Totais: 14g (sendo 7.5g Amido Resistente não digerível) | Proteínas: 2.1g | Gorduras: 6.8g',
      clinicalIndications: [
        'Disbiose intestinal com baixa contagem de produtores de ácidos graxos de cadeia curta',
        'Hiperpermeabilidade intestinal (Leaky Gut) e queixas de inchaço pós-prandial',
        'Constipação funcional através de aumento de volume fecal hidratado'
      ],
      contraindications: ['Fase inicial de protocolos de restrição em SIBO (supercrescimento bacteriano)'],
      optimalTiming: 'Consumir 1 potinho (60g) no lanche matinal ou antes de dormir como nutrição colônica.',
      synergies: [
        'Polifenóis do cacau inibem patógenos como *Clostridium perfringens* e fomentam *Lactobacillus* e *Bifidobacterium*',
        'Amido resistente fornece substrato para fermentação sacarolítica e síntese de butirato'
      ]
    }
  },
  {
    id: 'rec-luna-5',
    title: 'Ritual de Prescrição TPM & Modulação de Humor com Disco 36g',
    slug: 'ritual-tpm-modulacao-humor-disco-cacau',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica Especialista em Fitoquímica & Saúde Integrativa',
    prepTime: '2 min',
    yield: '1 porção individual (18g)',
    difficulty: 'Fácil',
    description: 'Conduta clínica para a fase lútea tardia (fase pré-menstrual). A quebra e mastigação consciente de meio Disco de Será Cacau 36g fornece magnésio biodisponível, triptofano precursor de serotonina e teobromina para alívio de cólicas leves e oscilações de humor.',
    ingredients: [
      { item: 'Será Cacau Disc 36g', amount: '18g (meio disco)', notes: 'Cacau 100% puro fracionado' },
      { item: 'Chá de camomila ou melissa morno', amount: '200ml', notes: 'Ação espasmolítica e sedativa leve' },
      { item: 'Flor de sal marinho', amount: '1 grãozinho na superfície', notes: 'Realça o dulçor perceptivo' }
    ],
    instructions: [
      'Oriente a paciente a partir o disco de cacau em 4 pequenos pedaços na linha natural de corte.',
      'Colocar um pedaço sobre a língua e não mastigar imediatamente: deixar derreter lentamente pelo calor da boca por 60 a 90 segundos.',
      'Acompanhar com goles lentos da infusão morna de melissa ou camomila.',
      'Repetir com os pedaços restantes em uma pausa intencional de 10 minutos sem telas.'
    ],
    imageUrl: '/images/disc.jpeg',
    tags: ['Saúde da Mulher', 'Fase Lútea', 'TPM', 'Magnésio', 'Serotonina', 'Disco 36g'],
    recommendedProductSlug: 'sera-cacau-disc-36g',
    specifications: {
      theobromineMg: '215mg',
      polyphenolsMg: '350mg',
      calories: '99 kcal',
      macronutrients: 'Carboidratos: 5.5g | Fibras: 3g | Proteínas: 2.2g | Gorduras: 8.1g',
      clinicalIndications: [
        'Compulsão por doces e instabilidade emocional na fase pré-menstrual',
        'Enxaqueca catamenial leve relacionada à deficiência funcional de magnésio',
        'Cólicas espasmódicas por ação relaxante muscular da teobromina e magnésio'
      ],
      contraindications: ['Sensibilidade individual a alimentos ricos em aminas biogênicas'],
      optimalTiming: 'Fase lútea (dias 21 a 28 do ciclo menstrual), por volta das 16h às 18h.',
      synergies: [
        'Magnésio + Triptofano agindo como cofatores da síntese de serotonina e melatonina',
        'Apigenina da camomila modulando receptores de benzodiazepina endógenos'
      ]
    }
  },
  {
    id: 'rec-luna-6',
    title: 'Infusão Digestiva de Casca de Cacau com Hortelã & Erva-Doce',
    slug: 'infusao-digestiva-casca-cacau-hortela-ervadoce',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica Especialista em Fitoquímica & Saúde Integrativa',
    prepTime: '6 min',
    yield: '1 xícara terapêutica (250ml)',
    difficulty: 'Fácil',
    description: 'Prescrição fitoterápica com zero teor calórico indicada para pacientes com dispepsia funcional, sensação de estufamento gástrico e desejo pós-prandial por chocolate sem impacto insulínico.',
    ingredients: [
      { item: 'Chá de Casca de Cacau Será 25g', amount: '1 colher de sopa cheia (4g)', notes: 'Cascas orgânicas ricas em fitoquímicos voláteis' },
      { item: 'Folhas de hortelã fresca (*Mentha piperita*)', amount: '6 folhas', notes: 'Mentol relaxante de musculatura lisa' },
      { item: 'Sementes de erva-doce levemente machucadas', amount: '1 colher de café (1.5g)', notes: 'Anetol carminativo' },
      { item: 'Água filtrada a 90ºC', amount: '250ml', notes: 'Infusão coberta' }
    ],
    instructions: [
      'Coloque a casca de cacau, as folhas de hortelã e a erva-doce em uma caneca ou bule infusor.',
      'Despeje a água aquecida a 90ºC.',
      'Cubra com um pires ou tampa e deixe descansar por 6 minutos.',
      'Coe e oriente o paciente a consumir em pequenos goles após a principal refeição do dia.'
    ],
    imageUrl: '/images/cha_casca_cacau_1787156490097.jpg',
    tags: ['Digestivo', 'Fitoterapia', 'Zero Caloria', 'Sem Açúcar', 'Casca de Cacau'],
    recommendedProductSlug: 'cha-de-casca-de-cacau-25g',
    specifications: {
      theobromineMg: '35mg (muito suave)',
      polyphenolsMg: '170mg de polifenóis solúveis em água',
      calories: '0 kcal',
      macronutrients: 'Carboidratos: 0g | Proteínas: 0g | Gorduras: 0g',
      clinicalIndications: [
        'Dispepsia, gases e lentidão no esvaziamento gástrico pós-refeição',
        'Protocolos de emagrecimento com necessidade de suporte sensorial pós-almoço',
        'Adequação hídrica com compostos antioxidantes protetores de mucosa gástrica'
      ],
      contraindications: ['Hérnia de hiato volumosa com refluxo ácido evidente de mentol'],
      optimalTiming: '20 a 30 minutos após o almoço ou jantar.',
      synergies: [
        'Mentol e anetol promovem alívio de espasmos gástricos',
        'Compostos fenólicos da casca exercem ação anti-inflamatória local na mucosa do trato digestivo'
      ]
    }
  },
  {
    id: 'rec-luna-7',
    title: 'Manteiga Funcional de Cacau em Barra 450g com Sementes de Abóbora e Ghee',
    slug: 'manteiga-funcional-cacau-barra-450g',
    category: 'clinica',
    author: 'Luna',
    authorRole: 'Nutricionista Clínica Especialista em Fitoquímica & Saúde Integrativa',
    prepTime: '15 min',
    yield: '1 pote de 250g (15 porções)',
    difficulty: 'Fácil',
    description: 'Pasta concentrada de gorduras nobres e fitoativos para ser prescrita como condimento funcional em torradas de fermentação natural, panquecas de aveia ou consumida em colheradas no café matinal.',
    ingredients: [
      { item: 'Barra Será Cacau 450g ralada', amount: '80g', notes: 'Cacau 100% puro' },
      { item: 'Manteiga Ghee artesanal amolecida', amount: '80g', notes: 'Ácido butírico e vitaminas lipossolúveis A/E' },
      { item: 'Sementes de abóbora sem casca cruas', amount: '70g', notes: 'Trituradas até formar pasta' },
      { item: 'Fava de Baunilha Será raspada', amount: '1/3 da fava', notes: 'Perfume e aconchego' },
      { item: 'Flor de sal marinho', amount: '1/2 colher de café', notes: 'Contraste mineral' }
    ],
    instructions: [
      'No processador de alimentos, processe as sementes de abóbora por cerca de 5 minutos até virar uma pasta úmida.',
      'Derreta a Barra de Será Cacau em banho-maria brando.',
      'Junte a manteiga ghee amolecida, a pasta de abóbora, as sementes de baunilha e a flor de sal.',
      'Processe tudo até obter uma pasta homogênea brilhante e aveludada.',
      'Envase em pote de vidro esterilizado e armazene em temperatura ambiente ou geladeira.'
    ],
    imageUrl: '/images/barra_cacau_bar_1787156448903.jpg',
    tags: ['Ghee & Cacau', 'Gorduras Boas', 'Barra 450g', 'Zinco & Magnésio', 'Prescrição'],
    recommendedProductSlug: 'barra-sera-cacau-450g',
    specifications: {
      theobromineMg: '135mg por porção de 15g (1 colher de sopa)',
      polyphenolsMg: '210mg',
      calories: '105 kcal por colher de sopa (15g)',
      macronutrients: 'Carboidratos Líquidos: 1.2g | Fibras: 1.5g | Proteínas: 2.8g | Gorduras: 10.2g',
      clinicalIndications: [
        'Aporte de zinco biodisponível para imunidade e saúde hormonal',
        'Substituição de pastas de avelã comerciais ultraprocessadas açucaradas',
        'Veiculação de calorias limpas para pacientes idosos ou em recuperação nutricional'
      ],
      contraindications: ['Pacientes com alergia a sementes'],
      optimalTiming: 'Desjejum ou lanche da tarde junto a frutas, raízes ou pão de fermentação natural.',
      synergies: [
        'Ácido butírico do ghee nutre diretamente colonócitos enquanto polifenóis modulam a microbiota',
        'Zinco da semente de abóbora atua como cofator de enzimas antioxidantes como SOD (Superóxido Dismutase)'
      ]
    }
  }
];
