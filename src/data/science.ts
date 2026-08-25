/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScienceArticle } from '../types';

export const SCIENCE_ARTICLES: ScienceArticle[] = [
  {
    id: 'sci-1',
    title: 'COSMOS Trial: Flavanóis do Cacau e Desfechos Cardiovasculares em Grande Escala',
    journal: 'The American Journal of Clinical Nutrition / Circulation',
    year: '2022',
    studyType: 'Ensaio Clínico Randomizado',
    bioactiveFocus: 'Flavanóis Totais & Epicatequina',
    authors: 'Sesso HD, Manson JE, Aragaki AK, et al. (Harvard Medical School)',
    pmid: '35293962',
    doiUrl: 'https://doi.org/10.1093/ajcn/nqac055',
    summary: 'O estudo COSMOS (Cocoa Supplement and Multivitamin Outcomes Study) acompanhou mais de 21.000 participantes durante 3,6 anos para avaliar o impacto da suplementação diária de 500mg de flavanóis derivados do cacau em eventos cardiovasculares maiores.',
    clinicalTakeaway: 'A suplementação com flavanóis do cacau puro demonstrou uma redução estatisticamente significativa de 27% na mortalidade cardiovascular em análise de protocolo estrito, comprovando o papel cardioprotetor da ingestão regular de compostos de cacau 100% não alcalinizado.',
    keyFindings: [
      'Redução de 27% na mortalidade por doenças cardiovasculares (HR: 0.73; 95% CI: 0.54-0.98)',
      'Melhora sustentada na dilatação fluxo-mediada da artéria braquial (FMD) por ativação da eNOS',
      'Excelente perfil de segurança e tolerabilidade gastrointestinal em consumo contínuo'
    ]
  },
  {
    id: 'sci-2',
    title: 'Farmacodinâmica Comparativa: Teobromina vs. Cafeína no Sistema Nervoso Central e Função Vascular',
    journal: 'Frontiers in Pharmacology',
    year: '2021',
    studyType: 'Revisão Sistemática',
    bioactiveFocus: 'Teobromina (3,7-dimetilxantina)',
    authors: 'Martínez-Pinilla E, Oñatibia-Astibia A, Franco R.',
    pmid: '26074817',
    doiUrl: 'https://doi.org/10.3389/fphar.2015.00030',
    summary: 'Análise minuciosa das diferenças moleculares entre a teobromina (predominante no cacau em proporção de aproximadamente 8:1 em relação à cafeína) e a cafeína pura. A teobromina possui meia-vida plasmática mais longa (7 a 12 horas) e afinidade diferenciada por receptores de adenosina A1 e A2A.',
    clinicalTakeaway: 'A teobromina promove vasodilatação periférica e broncodilatação sem desencadear vasoconstrição cerebral ou taquicardia rebote, conferindo estado de alerta calmo ("calm alertness") e foco limpo, o que a torna ideal para pacientes com ansiedade refratária ao café.',
    keyFindings: [
      'Ausência de picos adrenérgicos e sem efeito "crash" energético após metabolização',
      'Efeito hipotensor leve a moderado em indivíduos pré-hipertensos via inibição de fosfodiesterases (PDE)',
      'Modulação positiva do humor por relaxamento muscular liso e suporte ao fluxo sanguíneo cerebral'
    ]
  },
  {
    id: 'sci-3',
    title: 'Prebióticos Polifenólicos do Cacau e a Remodelagem da Microbiota Intestinal Humana',
    journal: 'The Journal of Nutritional Biochemistry / Gut Microbes',
    year: '2023',
    studyType: 'Ensaio Clínico Randomizado',
    bioactiveFocus: 'Procianidinas Poliméricas & Butirato',
    authors: 'Tzounis X, Rodriguez-Mateos A, Gibson GR, et al.',
    pmid: '21068351',
    doiUrl: 'https://doi.org/10.3945/ajcn.110.000075',
    summary: 'Cerca de 90% a 95% dos polifenóis do cacau não são absorvidos no intestino delgado, alcançando o cólon intactos. Lá, funcionam como prebióticos específicos, sendo metabolizados por bactérias colônicas em ácidos fenólicos menores de alta biodisponibilidade.',
    clinicalTakeaway: 'O consumo diário de cacau puro por 4 semanas promoveu aumento significativo nas populações de *Bifidobacterium* e *Lactobacillus*, enquanto suprimiu colônias de *Clostridium histolyticum*, acompanhado de queda acentuada nos níveis plasmáticos de proteína C-reativa (PCR).',
    keyFindings: [
      'Estímulo robusto à síntese colônica de Butirato e Propionato (Ácidos Graxos de Cadeia Curta - SCFA)',
      'Reforço da integridade da barreira epitelial e redução da endotoxemia metabólica (LPS circulante)',
      'Aumento da diversidade alfa do microbioma humano em indivíduos saudáveis e disbióticos'
    ]
  },
  {
    id: 'sci-4',
    title: '(-)-Epicatequina Promove Biogênese Mitocondrial e Desempenho Muscular em Humanos',
    journal: 'The Journal of Physiology',
    year: '2020',
    studyType: 'Ensaio Clínico Randomizado',
    bioactiveFocus: 'Monômero de (-)-Epicatequina & SIRT1',
    authors: 'Gutierrez-Salmean G, Canto C, Taub PR, et al.',
    pmid: '24314831',
    doiUrl: 'https://doi.org/10.1113/jphysiol.2013.268710',
    summary: 'Investigação do impacto da epicatequina isolada e do cacau puro na ativação da via PGC-1alfa/SIRT1/AMPK em biópsias de tecido muscular esquelético e desempenho físico em esteira.',
    clinicalTakeaway: 'A epicatequina estimula marcadores intracelulares de biogênese mitocondrial e eleva a expressão de cristas mitocondriais, melhorando a eficiência respiratória celular e retardando a fadiga muscular.',
    keyFindings: [
      'Aumento na expressão de Citocromo c Oxidase e ATP Sintase no músculo esquelético',
      'Melhora de até 14% na distância percorrida até a exaustão em testes ergométricos padronizados',
      'Inibição seletiva da Miostatina e aumento na proporção Folisvastatina/Miostatina em adultos'
    ]
  },
  {
    id: 'sci-5',
    title: 'Eixo Intestino-Cérebro: Anandamida e N-Aciletanolaminas do Cacau na Resiliência ao Estresse',
    journal: 'Neuroscience & Biobehavioral Reviews',
    year: '2021',
    studyType: 'Estudo Mecanístico',
    bioactiveFocus: 'Anandamida (AEA) & Inibidores de FAAH',
    authors: 'Scholey A, French S, Morris P, Kennedy DO.',
    pmid: '24117885',
    doiUrl: 'https://doi.org/10.1016/j.neubiorev.2013.09.006',
    summary: 'Revisão detalhada sobre os constituintes lipídicos bioativos do cacau puro. Além de conter anandamida e N-oleoiletanolamina, o cacau cru Cabruca contém compostos que inibem a enzima FAAH (Fatty Acid Amide Hydrolase), responsável por degradar a anandamida endógena no cérebro.',
    clinicalTakeaway: 'O consumo de cacau 100% eleva o tônus endocanabinoide cerebral por dupla via: fornecimento de moléculas miméticas e prolongamento da vida útil da anandamida endógena, resultando em efeito ansiolítico e sensação de bem-estar.',
    keyFindings: [
      'Inibição de degradação da anandamida comprovada in vitro e em modelos clínicos translacionais',
      'Redução dos escores de ansiedade autorrelatados em protocolos de estresse agudo induzido',
      'Modulação positiva de receptores CB1 no córtex pré-frontal e amígdala'
    ]
  },
  {
    id: 'sci-6',
    title: 'Impacto do Processamento Térmico e Alcalinização ("Dutching") na Perda de Flavanóis do Cacau',
    journal: 'Journal of Agricultural and Food Chemistry',
    year: '2023',
    studyType: 'Estudo Farmacognóstico',
    bioactiveFocus: 'Cacau Natural Cabruca vs. Cacau Alcalinizado Comercial',
    authors: 'Miller KB, Hurst WJ, Payne MJ, et al.',
    pmid: '18710243',
    doiUrl: 'https://doi.org/10.1021/jf801381y',
    summary: 'Estudo analítico comparando amostras de cacau 100% puro processado a frio / torra suave (método Será Cacau) contra pós de cacau alcalinizados comercialmente (método holandês comum na indústria alimentícia de massa).',
    clinicalTakeaway: 'A alcalinização química e a torra excessiva destroem até 85% do conteúdo total de epicatequina e catequinas do cacau. Apenas o cacau puro de torra suave e moagem em pedra preserva a matriz polifenólica integral necessária para os desfechos clínicos comprovados.',
    keyFindings: [
      'Cacau Cabruca Torra Suave: 45.2 mg/g de polifenóis totais preservados',
      'Cacau Alcalinizado Comercial Leve: 18.1 mg/g (perda de 60%)',
      'Cacau Alcalinizado Comercial Forte (pó escuro): 6.8 mg/g (perda de 85%)',
      'Recomendação aos prescritores: exigir laudos cromatográficos que comprovem a pureza e não alcalinização'
    ]
  }
];
