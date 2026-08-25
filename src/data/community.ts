/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ForumTopic } from '../types';

export const INITIAL_FORUM_TOPICS: ForumTopic[] = [
  {
    id: 'topic-1',
    title: 'Como vocês costumam introduzir o sabor 100% puro para pacientes acostumados com chocolates doces?',
    content: 'Olá colegas! Tenho percebido que alguns pacientes no início acham o cacau 100% um pouco amargo quando fazem a primeira transição do café ou de chocolates comerciais. Eu comecei a prescrever associado a 1 colherzinha de café de pasta de tâmaras ou canela do Ceilão e tem funcionado muito bem! Vocês usam alguma outra estratégia de adaptação sensorial no consultório?',
    authorName: 'Dra. Rebeca Lemos',
    authorRole: 'Nutricionista Clínica Funcional (CRN-3 82193)',
    category: 'Dúvidas Clínicas',
    date: 'Há 2 dias',
    likes: 18,
    isLiked: false,
    tags: ['Adaptação Sensorial', 'Paladar Infantil', 'Transição 100%', 'Prática de Consultório'],
    replies: [
      {
        id: 'rep-1-1',
        authorName: 'Luna Azevedo',
        authorRole: 'Nutricionista & Curadora Será Cacau',
        content: 'Excelente colocação, Rebeca! Na aula 5 nós comentamos sobre a temperatura: aquecer o leite vegetal até 55-60ºC potencializa os óleos essenciais e a cremosidade da manteiga de cacau natural, reduzindo muito a percepção adstringente. Outra dica de ouro é uma pitadinha quase invisível de flor de sal — ela bloqueia os receptores de amargor na língua e ressalta as notas florais!',
        date: 'Há 1 dia'
      },
      {
        id: 'rep-1-2',
        authorName: 'Dra. Marina Silva',
        authorRole: 'Nutricionista Materno-Infantil',
        content: 'Faço exatamente isso com a flor de sal e adiciono meia fava de baunilha da Será raladinha. O aroma faz o cérebro antecipar dulçor mesmo sem ter 1g de açúcar.',
        date: 'Há 18 horas'
      }
    ]
  },
  {
    id: 'topic-2',
    title: 'Relato de Caso: Paciente com ansiedade crônica e dependência de 5 xícaras de café/dia',
    content: 'Quero compartilhar uma vitória clínica recente! Paciente de 38 anos com queixa de taquicardia, insônia intermediária e compulsão noturna. Substituímos as 3 xícaras de café da tarde pelo shot de Gotas Será Cacau 210g (15 gotas + 40ml de água morna + canela). Em 14 dias: queda de 60% na ansiedade autorrelatada, sono contínuo e sem nenhuma dor de cabeça por abstinência graças à teobromina!',
    authorName: 'Dr. Thiago Medeiros',
    authorRole: 'Nutricionista Esportivo & Integrativo (CRN-5 45210)',
    category: 'Casos de Pacientes',
    date: 'Há 3 dias',
    likes: 34,
    isLiked: false,
    tags: ['Caso Clínico', 'Desmame de Cafeína', 'Teobromina', 'Ansiedade', 'Sono'],
    replies: [
      {
        id: 'rep-2-1',
        authorName: 'Dra. Gabriela Sales',
        authorRole: 'Nutricionista Clínica',
        content: 'Incrível relato, Thiago! O que mais me impressiona na teobromina é exatamente essa ausência do efeito rebote e a broncodilatação que acalma a respiração do paciente ansioso.',
        date: 'Há 2 dias'
      }
    ]
  },
  {
    id: 'topic-3',
    title: 'Ritual do Cacau em Grupo: Experiência com Círculo de Mulheres no Consultório',
    content: 'Semana passada realizei um encontro presencial com 12 pacientes no meu espaço para falar sobre presença, desaceleração e saúde feminina. Servimos o Chá de Casca de Cacau na entrada e finalizamos preparando a bebida quente com Gotas 105g em xícaras de cerâmica. O ambiente ficou acolhedor e todas saíram conectadas e pedindo as receitas!',
    authorName: 'Dra. Marina Preto',
    authorRole: 'Nutricionista & Educadora em Saúde',
    category: 'Rituais do Cacau',
    date: 'Há 4 dias',
    likes: 27,
    isLiked: false,
    tags: ['Ritual em Grupo', 'Saúde da Mulher', 'Cerâmica', 'Engajamento'],
    replies: [
      {
        id: 'rep-3-1',
        authorName: 'Dani',
        authorRole: 'Chef Funcional Cabruca',
        content: 'Que lindo, Marina! O cacau puro tem esse poder ancestral de unir pessoas ao redor da mesa. Quando usamos louças de terra e temperatura suave, a experiência se torna inesquecível.',
        date: 'Há 3 dias'
      }
    ]
  },
  {
    id: 'topic-4',
    title: 'Dúvida: Qual o melhor momento para prescrever os Nibs de Cacau em planos de hipertrofia?',
    content: 'Estou estruturando um protocolo para atletas de crossfit que precisam de aporte calórico limpo e redução de estresse oxidativo. Vocês preferem prescrever os Nibs de Será Cacau no pré-treino com mingau de aveia ou no pós-treino com iogurte proteico/whey?',
    authorName: 'Dra. Juliana Carvalho',
    authorRole: 'Nutricionista Esportiva (CRN-3 65432)',
    category: 'Dúvidas Clínicas',
    date: 'Há 5 dias',
    likes: 12,
    isLiked: false,
    tags: ['Nutrição Esportiva', 'Hipertrofia', 'Nibs de Cacau', 'Timing'],
    replies: [
      {
        id: 'rep-4-1',
        authorName: 'Luna Azevedo',
        authorRole: 'Nutricionista & Curadora Será Cacau',
        content: 'Oi Juliana! No pré-treino (cerca de 60 minutos antes), a teobromina e os flavanóis aumentam a perfusão sanguínea e o foco. Porém, no pós-treino os polifenóis auxiliam na modulação do dano muscular tardio (DOMS). Eu costumo prescrever 15g no pré-treino misturado na aveia para mastigação!',
        date: 'Há 4 dias'
      }
    ]
  }
];
