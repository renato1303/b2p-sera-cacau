/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Product, Campaign, NewsletterArticle, FileAttachment, Member, CommunityPost } from './types';

export const ATTACHMENTS: FileAttachment[] = [
  {
    id: 'att-1',
    name: 'Laudo de Pureza Microbiológica - Lote SC2026',
    category: 'Laudos',
    size: '1.4 MB',
    downloadUrl: '#'
  },
  {
    id: 'att-2',
    name: 'Laudo de Análise de Antioxidantes e Flavonoides',
    category: 'Laudos',
    size: '1.1 MB',
    downloadUrl: '#'
  },
  {
    id: 'att-3',
    name: 'Protocolo de Recomendação Clinical: Gestão de Estresse',
    category: 'Protocolos',
    size: '2.8 MB',
    downloadUrl: '#'
  },
  {
    id: 'att-4',
    name: 'Protocolo Desjejum Concluido: Foco e Energia sem Ansiedade',
    category: 'Protocolos',
    size: '3.1 MB',
    downloadUrl: '#'
  },
  {
    id: 'att-5',
    name: 'Guia de Preparo de Bebida de Cacau - Impresso Consultório',
    category: 'Marketing',
    size: '8.4 MB',
    downloadUrl: '#'
  },
  {
    id: 'att-6',
    name: 'Receituário Ilustrado: Blends Saudáveis de Outono-Inverno',
    category: 'Receitas',
    size: '4.6 MB',
    downloadUrl: '#'
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
    originCooperativa: 'Cooperativa de Mulheres da Cabruca - Sul da Bahia'
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
    originCooperativa: 'Cooperativa de Mulheres da Cabruca - Sul da Bahia'
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
    originCooperativa: 'Associação Agroflorestal de Serra Grande'
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
    originCooperativa: 'Agricultura familiar integrada de Serra Grande, Bahia'
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'A Jornada do Cacau Cabruca',
    description: 'Compreenda a fundo a história, o cultivo agroflorestal tradicional baiano e o impacto ecológico e social da preservação florestal sem intermediários.',
    category: 'História',
    instructor: 'Madeleine (Fundadora)',
    duration: '3h',
    coverImage: '/src/assets/images/cabruca_forest_1783964129461.jpg',
    certificateEnabled: true,
    communityEnabled: true,
    visibility: 'Somente Matriculadas',
    enrolledMemberIds: ['mem-1', 'mem-2', 'mem-3'],
    modules: [
      {
        id: 'c1-m1',
        title: 'Origem e Fundamentação Ecológica',
        description: 'Do que é feita a história do cacau livre de intermediários.',
        locked: false,
        classes: [
          {
            id: 'c1-m1-cl1',
            title: 'Boas-vindas ao Nosso Solo',
            duration: '12 min',
            videoUrl: 'https://player.vimeo.com/video/example1',
            summary: 'Conheça o nascimento da Será Cacau, fundado na Costa do Cacau por Madeleine, integrando raízes alemãs com o calor acolhedor baiano. Descubra os valores e a intenção de desconectar para conectar.',
            pdfAttachment: ATTACHMENTS[4]
          },
          {
            id: 'c1-m1-cl2',
            title: 'O Sistema Cabruca de Agrofloresta',
            duration: '22 min',
            videoUrl: 'https://player.vimeo.com/video/example2',
            summary: 'Entenda os 400 anos de história do sistema Cabruca, onde o cacau cresce abrigado pela copa da Mata Atlântica nativa, preservando mais de 278 espécies documentadas.',
            pdfAttachment: ATTACHMENTS[0]
          },
          {
            id: 'c1-m1-cl3',
            title: 'Quiz: Fixando o Sistema Cabruca',
            duration: '3 min',
            videoUrl: '',
            type: 'quiz',
            summary: 'Confira se os conceitos da agrofloresta Cabruca ficaram claros antes de avançar.',
            quiz: {
              id: 'quiz-c1-m1',
              question: 'O que caracteriza o sistema agroflorestal Cabruca?',
              options: [
                { id: 'a', text: 'Monocultivo de cacau em campo aberto, sem sombreamento' },
                { id: 'b', text: 'Cacau cultivado sob a copa nativa da Mata Atlântica preservada' },
                { id: 'c', text: 'Cultivo hidropônico em estufa controlada' }
              ],
              correctOptionId: 'b'
            }
          }
        ]
      },
      {
        id: 'c1-m2',
        title: 'A Relação Humana na Cadeia de Valor',
        description: 'Justiça social e cooperação no sul da Bahia.',
        locked: true,
        classes: [
          {
            id: 'c1-m2-cl1',
            title: 'Cooperativa de Mulheres e Comércio Direto',
            duration: '18 min',
            videoUrl: 'https://player.vimeo.com/video/example3',
            summary: 'Como organizamos a produção para que o valor gerado permaneça inteiramente na nossa região, eliminando atravessadores e empoderando comunidades femininas locais.',
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Ciência, Ativos Neurocognitivos e Presença',
    description: 'Capacitação técnica para prescrição e recomendação clínica de cacau 100% puro. O fim das alegações místicas e o começo da fundamentação científica de alto impacto.',
    category: 'Nutrição',
    instructor: 'Dra. Luna (Nutricionista Consultora)',
    duration: '4h 30min',
    coverImage: '/src/assets/images/cacao_science_1783964140124.jpg',
    certificateEnabled: true,
    communityEnabled: true,
    visibility: 'Somente Matriculadas',
    enrolledMemberIds: ['mem-1', 'mem-3'],
    modules: [
      {
        id: 'c2-m1',
        title: 'Fitoquímica do Cacau Puro',
        description: 'Investigação profunda sobre as moléculas ativas de Será Cacau.',
        locked: false,
        classes: [
          {
            id: 'c2-m1-cl1',
            title: 'Teobromina vs Cafeína: Foco Limpo',
            duration: '25 min',
            videoUrl: 'https://player.vimeo.com/video/example4',
            summary: 'Análise neuroquímica da teobromina. Descubra por que este estimulante atua na circulação e proporciona energia estável por mais de 5 hours sem causar o efeito rebote de ansiedade ou crash adrenal.',
            pdfAttachment: ATTACHMENTS[1]
          },
          {
            id: 'c2-m1-cl2',
            title: 'A Química do Bem-Estar: Anandamida e PEA',
            duration: '20 min',
            videoUrl: 'https://player.vimeo.com/video/example5',
            summary: 'Conheça o neurotransmissor anandamida ("a molécula do êxtase") e a Feniletilamina (PEA, a molécula da paixão e do foco criativo) presentes no nosso cacau artesanal.'
          }
        ]
      },
      {
        id: 'c2-m2',
        title: 'Modulação e Prescrição em Consultório',
        description: 'Práticas clínicas e protocolos para introduzir na rotina dos pacientes.',
        locked: false,
        classes: [
          {
            id: 'c2-m2-cl1',
            title: 'Estruturação de Protocolos para Gestão de Estresse',
            duration: '30 min',
            videoUrl: 'https://player.vimeo.com/video/example6',
            summary: 'Uso de cacau puro com fitoativos para redução do cortisol vespertino, modulando as compulsões alimentares e melhorando a qualidade do sono profundo.',
            pdfAttachment: ATTACHMENTS[2]
          },
          {
            id: 'c2-m2-cl2',
            title: 'O Ritual de Preparo Perfeito como Terapia de Pausa',
            duration: '15 min',
            videoUrl: 'https://player.vimeo.com/video/example7',
            summary: 'Como ensinar o paciente a fazer uma pausa verdadeira, deixando o celular de lado, aquecendo a bebida a 60ºC para preservar todos os compostos ativos.',
            pdfAttachment: ATTACHMENTS[3]
          }
        ]
      }
    ]
  }
];

export const MEMBERS: Member[] = [
  { id: 'mem-1', name: 'Dra. Marina Silva', email: 'marina.silva@saude.com.br', crn: 'CRN-3 71830', city: 'São Paulo', state: 'SP', enrolledCourseIds: ['course-1','course-2'], joinedDate: '12 Jan 2026' },
  { id: 'mem-2', name: 'Dra. Rebeca Lemos', email: 'rebeca.lemos@nutriclin.com.br', crn: 'CRN-3 82193', city: 'São Paulo', state: 'SP', enrolledCourseIds: ['course-1'], joinedDate: '03 Fev 2026' },
  { id: 'mem-3', name: 'Dr. Thiago Medeiros', email: 'thiago.medeiros@consultorio.com.br', crn: 'CRN-5 45210', city: 'Salvador', state: 'BA', enrolledCourseIds: ['course-1','course-2'], joinedDate: '21 Mar 2026' },
  { id: 'mem-4', name: 'Dra. Gabriela Sales', email: 'gabriela.sales@nutri.com.br', crn: 'CRN-1 90218', city: 'Brasília', state: 'DF', enrolledCourseIds: [], joinedDate: '02 Jun 2026' }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  { id: 'post-1', courseId: 'course-1', authorName: 'Dra. Rebeca Lemos', authorRole: 'Nutricionista Clínica', content: 'Fiquei encantada com a aula sobre o sistema Cabruca! Já comecei a citar os dados de biodiversidade nas minhas consultas.', date: 'Há 2 dias', likes: 14, replies: [
    { id: 'reply-1', authorName: 'Dra. Marina Silva', content: 'Sim! Uso como gancho pra falar de consumo consciente com pacientes engajadas em sustentabilidade.', date: 'Há 1 dia' }
  ]},
  { id: 'post-2', courseId: 'course-1', authorName: 'Madeleine (Fundadora)', authorRole: 'Curadora Cabruca', content: 'Bem-vindas à turma de julho! Qualquer dúvida sobre a origem do cacau, pode postar aqui — respondo pessoalmente todas as quintas.', date: 'Há 5 dias', likes: 22, replies: [] },
  { id: 'post-3', courseId: 'course-2', authorName: 'Dr. Thiago Medeiros', authorRole: 'Nutricionista Esportivo', content: 'Alguém já testou o protocolo de gestão de estresse com pacientes que treinam à noite? Resultado ótimo reduzindo insônia leve.', date: 'Há 8 horas', likes: 6, replies: [] }
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Amostras de Será Baunilha na Próxima Indicação',
    description: 'Queremos que seus pacientes experimentem o aroma precioso da baunilha brasileira da Será. Nutricionistas ativas ganham 10 kits de amostras exclusivas para presentear no consultório em suas próximas indicações.',
    imageUrl: '/src/assets/images/brazilian_vanilla_1783964119929.jpg',
    date: 'Disponível até 30 de Julho, 2026',
    buttonLabel: 'Reivindicar Amostras de Baunilha',
    buttonUrl: '#',
    attachments: [ATTACHMENTS[5]]
  },
  {
    id: 'camp-2',
    title: 'Dia Nacional da Nutricionista: Pausa e Valor',
    description: 'Em comemoração ao dia do nutricionista, preparamos uma ação de afeto. Enviaremos uma cerâmica artesanal produzida pela linha de acessórios Será Terra para as profissionais pioneiras que acompanham nossa jornada.',
    imageUrl: '/src/assets/images/artisanal_ceramics_1783964151303.jpg',
    date: 'Válido em todo o Brasil',
    buttonLabel: 'Ver Detalhes da Ação',
    buttonUrl: '#'
  }
];

export const NEWSLETTER: NewsletterArticle[] = [
  {
    id: 'news-1',
    title: 'O Paradoxo da Conexão: Por que escolhemos a Pausa',
    summary: 'Em um mundo onde cada minuto de atenção é mercantilizado, o silêncio visual e a desaceleração tornam-se ferramentas de preservação neurológica.',
    content: 'O paradoxo bonito da nossa presença digital: usamos as redes para dizer "larga o celular". O feed e o ecossistema da Será Cacau criam desejo não pelo produto de forma fútil — mas pelo que o produto possibilita: uma pausa consciente, uma conversa de verdade na mesa de madeira, mãos aquecidas ao redor de uma cerâmica imperfeita, presença sem performance.\n\nNa prática de consultório, a recomendação de preparar uma xícara de cacau 100% puro não é apenas uma prescrição bioquímica de flavonoides e magnésio. É um convite físico e mecânico para que o paciente respire, sinta o calor do preparo a 60ºC e desfrute de dez minutos de silêncio matinal antes de abrir a lista de tarefas e notificações.\n\nPromover essa mentalidade no dia a dia fortalece a relação do paciente com a saúde de forma profunda, sustentável e acolhedora.',
    imageUrl: '/src/assets/images/artisanal_ceramics_1783964151303.jpg',
    publishDate: '08 de Julho, 2026',
    author: 'Madeleine',
    readTime: '4 min'
  },
  {
    id: 'news-2',
    title: 'A Bioquímica da Felicidade: Anandamida e Estabilidade de Humor',
    summary: 'Aprofunde-se no mecanismo fitoquímico que faz do cacau Cabruca uma excelente ferramenta clínica na regulação de impulsos e na promoção da serenidade.',
    content: 'Muitas vezes taxado incorretamente por mídias de marketing como "superfood milagroso", o cacau puro de alta qualidade na verdade atua através de vias fitoativas extremamente bem documentadas pela literatura científica contemporânea.\n\nA Anandamida é um endocanabinoide endógeno que atua em receptores CB1 e CB2. O consumo de cacau 100% puro fornece não apenas anandamida vegetal, mas também inibidores de sua degradação enzimática (como os compostos de N-aciletanolaminas), prolongando naturalmente a sensação de paz e satisfação celular.\n\nQuando associada à teobromina, que dilata vasos suavemente sem disparar receptores beta-adrenérgicos (ao contrário da cafeína), criamos o cenário ideal para um cérebro relaxado, concentrado e resiliente a estressores cotidianos.',
    imageUrl: '/src/assets/images/cacao_science_1783964140124.jpg',
    publishDate: '28 de Junho, 2026',
    author: 'Dra. Luna',
    readTime: '6 min'
  }
];
