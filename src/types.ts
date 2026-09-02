/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  NUTRICIONISTA = 'NUTRICIONISTA',
}

export type GamificationTier = 'Bronze' | 'Prata' | 'Ouro' | 'Diamante';

export interface GamificationReward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  icon?: string; // nome do ícone lucide-react a usar, ex: 'Gift', 'Award'
}

export interface PointsEntry {
  id: string;
  memberId: string;
  points: number;
  reason: string; // ex: "Venda de 5 unidades Gotas 210g", "Curso concluído", "Indicação de nova nutri"
  date: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  specialty: string;
  city: string;
  state: string;
  role: UserRole;
  avatarUrl?: string;
  crn?: string; // CRN registry for nutritionists
  patientCoupon?: string; // Cupom exclusivo para pacientes / clientes
  couponCode?: string;
  totalPoints?: number;
  tier?: GamificationTier;
}

export interface FileAttachment {
  id: string;
  name: string;
  category: 'PDF' | 'Apresentações' | 'Laudos' | 'Receitas' | 'Marketing' | 'Protocolos' | 'Ficha Técnica' | 'Guia';
  size: string;
  downloadUrl: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  line: 'Cacau Ritual' | 'Ervas Ritual' | 'Terra Ritual' | 'Cacau Puro em Barra' | 'Cacau Crocante' | 'Infusões da Floresta' | 'Kits & Presentes' | string;
  category: string;
  weight: string;
  tagline: string;
  story: string;
  benefits: string[];
  ingredients: string;
  nutritionalTable: {
    servingSize: string;
    calories: string;
    carbohydrates: string;
    proteins: string;
    fats: string;
    sodium: string;
    minerals?: string; // e.g. Mg, Fe, Zn
  };
  hasLaudo: boolean;
  laudoUrl?: string;
  protocol?: string;
  imageUrl: string;
  shopifyId: string;
  price: string;
  originCooperativa: string;
  discountCode?: string;
  discountDescription?: string;
  buyUrl?: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
}

export interface CourseClass {
  id: string;
  title: string;
  duration: string;
  videoUrl: string; // vazio quando type === 'quiz'
  thumbnailUrl?: string;
  summary: string;
  type?: 'video' | 'quiz'; // default 'video' quando ausente
  pdfAttachment?: FileAttachment;
  pdfAttachments?: FileAttachment[];
  completed?: boolean;
  quiz?: Quiz; // obrigatório quando type === 'quiz'
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  classes: CourseClass[];
  locked?: boolean; // bloqueio manual definido pela admin (estilo "lock courses for upselling" do Tevello)
}

export type CourseVisibility = 'Público' | 'Somente Logadas' | 'Somente Matriculadas';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Treinamento' | 'História' | 'Nutrição' | 'Negócios';
  instructor: string;
  duration: string;
  coverImage: string;
  modules: CourseModule[];
  certificateEnabled?: boolean;
  communityEnabled?: boolean;
  visibility?: CourseVisibility;
  enrolledMemberIds?: string[];
}

export interface CommunityReply {
  id: string;
  authorName: string;
  content: string;
  date: string;
}

export interface CommunityPost {
  id: string;
  courseId: string;
  authorName: string;
  authorRole: string;
  content: string;
  date: string;
  likes: number;
  replies: CommunityReply[];
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  crn?: string;
  specialty?: string;
  patientCoupon?: string;
  couponCode?: string;
  city: string;
  state: string;
  enrolledCourseIds: string[];
  joinedDate: string;
  totalPoints?: number;
  tier?: GamificationTier;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  buttonLabel?: string;
  buttonUrl?: string;
  attachments?: FileAttachment[];
}

export interface NewsletterArticle {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown supported
  imageUrl: string;
  publishDate: string;
  author: string;
  readTime: string;
}

export interface ActivityMetric {
  coursesStarted: number;
  coursesCompleted: number;
  totalDownloads: number;
  weeklyVisits: number;
}

export interface RecipeIngredient {
  item: string;
  amount: string;
  notes?: string;
}

export interface RecipeSpecification {
  theobromineMg?: string;
  polyphenolsMg?: string;
  calories?: string;
  macronutrients?: string;
  clinicalIndications?: string[];
  contraindications?: string[];
  optimalTiming?: string;
  synergies?: string[];
}

export interface Recipe {
  id: string;
  numberCode?: string; // e.g. '01', '02', '03' ...
  badgeHeader?: string; // e.g. '01 BEBIDA QUENTE · 5 MIN' or 'NUTRIÇÃO NA SAÚDE DA MULHER'
  title: string;
  subtitle?: string; // e.g. 'Nutrir é um ato diário de cuidado com o corpo feminino.'
  slug: string;
  category: 'dani' | 'cozinha' | 'clinica'; // dani = Receitas da Dani, clinica = Luna (Prescrições para Pacientes)
  author: 'Dani' | 'Luna';
  authorRole: string;
  prepTime: string;
  yield: string;
  difficulty: 'Fácil' | 'Médio' | 'Avançado';
  description: string;
  tip?: string; // "DICA DA SERÁ" (receitas Dani)
  variations?: string[]; // "VARIAÇÕES" (receitas Luna)
  indication?: string; // "INDICAÇÃO" (receitas Luna)
  whyItWorks?: string; // "POR QUE FUNCIONA" (receitas Luna)
  note?: string; // "NOTA" (receitas Luna)
  footerText?: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  imageUrl: string;
  specifications: RecipeSpecification;
  tags: string[];
  recommendedProductSlug?: string;
  pdfUrl?: string;
  videoUrl?: string;
  videoTitle?: string;
}

export interface ScienceArticle {
  id: string;
  title: string;
  journal: string;
  year: string;
  studyType: 'Ensaio Clínico Randomizado' | 'Revisão Sistemática' | 'Estudo Mecanístico' | 'Metanálise' | 'Estudo Farmacognóstico' | string;
  bioactiveFocus: string;
  summary: string;
  clinicalTakeaway: string;
  keyFindings: string[];
  doiUrl: string;
  authors: string;
  pmid?: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  category: 'Dúvidas Clínicas' | 'Rituais do Cacau' | 'Casos de Pacientes' | 'Ideias & Sugestões';
  date: string;
  likes: number;
  isLiked?: boolean;
  replies: {
    id: string;
    authorName: string;
    authorRole: string;
    authorAvatar?: string;
    content: string;
    date: string;
  }[];
  tags: string[];
}
