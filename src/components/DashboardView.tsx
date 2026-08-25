/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SeraCacauIcon } from './SeraCacauIcon';
import { 
  Play, 
  ArrowRight, 
  Sprout, 
  GraduationCap, 
  Download, 
  BookOpen, 
  Award,
  Sparkles, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ShieldCheck,
  Users,
  Utensils,
  Leaf,
  Tag,
  Video,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, Course, Product, Campaign, FileAttachment } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  courses: Course[];
  products: Product[];
  campaigns: Campaign[];
  downloads: FileAttachment[];
  onNavigate: (tabId: string, item?: any) => void;
  onSelectProduct: (p: Product) => void;
  onSelectCourse: (c: Course) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  courses,
  products,
  campaigns,
  downloads,
  onNavigate,
  onSelectProduct,
  onSelectCourse
}) => {
  const activeCourse = courses[0] || null;

  return (
    <div className="px-4 sm:px-6 md:px-12 py-8 max-w-7xl mx-auto w-full flex flex-col gap-10 font-sans text-primary-text animate-fadeIn">
      
      {/* 1. Header Welcome Lounge & Digital Credential Card */}
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 bg-surface p-6 md:p-8 rounded-3xl border border-border-color shadow-sm relative overflow-hidden">
        
        {/* Glow rings */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-luxury-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-primary-accent/10 blur-3xl pointer-events-none" />

        {/* Text & Active Indicators */}
        <div className="flex flex-col justify-between gap-6 flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary-accent/10 text-primary-accent text-[9px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full font-mono border border-primary-accent/20">
                Área de Membros • Acesso Exclusivo
              </span>
              <span className="text-[10px] text-secondary-text uppercase tracking-widest font-semibold font-mono hidden sm:inline">
                Sessão Segura SSL
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl text-primary-forest font-extrabold tracking-tight mt-1">
              Bem-vinda, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-forest via-cocoa to-primary-accent italic font-semibold">{user.name}</span>
            </h1>
            <p className="text-xs md:text-sm text-secondary-text mt-3 max-w-xl leading-relaxed">
              Sua credencial de prescritora e membro oficial está ativa. Acesse as aulas da Jornada Cabruca, as receitas terapêuticas, as fichas técnicas de consultório e a comunidade de nutricionistas.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-border-color/60 pt-4 mt-2">
            <div>
              <span className="text-[8px] uppercase tracking-widest text-secondary-text/60 font-mono block">Status da Conta</span>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Ativa & Homologada
              </span>
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-widest text-secondary-text/60 font-mono block">Nível de Membro</span>
              <span className="text-xs font-bold text-primary-accent uppercase tracking-wide mt-0.5 block">Prescritora Cabruca</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[8px] uppercase tracking-widest text-secondary-text/60 font-mono block">Registro Clínico</span>
              <span className="text-xs font-semibold text-primary-text mt-0.5 block">{user.crn || 'CRN Ativo'}</span>
            </div>
          </div>
        </div>

        {/* Digital Membership Credential Card */}
        <div className="w-full lg:w-[360px] bg-gradient-to-br from-primary-forest via-secondary-forest to-primary-forest text-white rounded-2xl p-5 border border-luxury-accent/30 shadow-lg relative overflow-hidden flex flex-col justify-between h-48 group shrink-0 select-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none" />
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[8px] tracking-[0.25em] font-mono text-luxury-accent font-bold uppercase">
                Credencial Digital
              </span>
              <span className="text-[7px] tracking-wider font-mono text-secondary-accent uppercase mt-0.5">
                Prescritora Homologada
              </span>
            </div>
            <ShieldCheck className="w-5 h-5 text-luxury-accent drop-shadow-[0_0_8px_rgba(198,165,106,0.5)]" />
          </div>

          <div className="flex flex-col gap-0.5 z-10">
            <span className="text-lg tracking-tight font-extrabold truncate text-white">
              {user.name}
            </span>
            <span className="text-[9px] text-[#EFE6D7]/80 font-mono uppercase tracking-widest truncate">
              {user.specialty || 'Nutrição Clínica Funcional'}
            </span>
          </div>

          <div className="flex justify-between items-end border-t border-white/10 pt-3 mt-1.5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[7px] text-white/40 uppercase tracking-widest font-mono">Registro</span>
              <span className="text-[10px] font-mono font-bold text-white">{user.crn || 'CRN-3 71830'}</span>
            </div>
            <div className="flex flex-col gap-0.5 items-end">
              <span className="text-[7px] text-white/40 uppercase tracking-widest font-mono">Código</span>
              <span className="text-[10px] font-mono text-luxury-accent font-bold">SC-2026</span>
            </div>
            <div className="flex flex-col gap-0.5 opacity-40 pl-2 shrink-0">
              <span className="text-[7px] font-mono text-emerald-400 font-bold">● VÁLIDO</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. VÍDEO EXCLUSIVO (PROPORÇÃO 9x16) ABAIXO DO CARD DE BEM-VINDOS */}
      <section className="bg-gradient-to-br from-[#1C261D] via-[#2A382C] to-[#151E16] text-[#F7F3EC] rounded-3xl p-6 md:p-10 border border-[#455347]/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-luxury-accent/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
          
          {/* Coluna de Texto & Apresentação */}
          <div className="w-full lg:w-7/12 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-accent/20 border border-luxury-accent/40 text-luxury-accent text-xs font-semibold uppercase tracking-wider font-mono">
              <Video className="w-3.5 h-3.5" /> Mensagem Oficial de Boas-vindas
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              A Essência do Cacau Cabruca em sua Prática Clínica
            </h2>

            <p className="text-xs sm:text-sm text-[#C2C9C0] leading-relaxed">
              Assista ao vídeo exclusivo de introdução para membros prescritores e conheça os princípios de pureza, manejo agroflorestal sustentável e potência fitoquímica da Será Cacau.
            </p>

            <div className="bg-black/30 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3 text-xs text-[#E0E6DF]">
              <div className="font-bold text-luxury-accent flex items-center gap-2 font-mono uppercase tracking-wider text-[11px]">
                <CheckCircle2 className="w-4 h-4 text-luxury-accent" /> Destaques do Conteúdo:
              </div>
              <ul className="space-y-2 text-[#C8D1C7]">
                <li className="flex items-start gap-2">
                  <span className="text-luxury-accent font-bold">•</span>
                  <span><strong>Origem Cabruca:</strong> O impacto do cultivo sob a sombra da Mata Atlântica na densidade de polifenóis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-luxury-accent font-bold">•</span>
                  <span><strong>Prescrição Funcional:</strong> Modulação da teobromina, anandamida e resposta cardiovascular.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-luxury-accent font-bold">•</span>
                  <span><strong>Experiência e Rituais:</strong> Como engajar os seus pacientes através da ritualização consciente do cacau.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('academia')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-accent to-luxury-accent text-[#1C261D] font-bold text-xs uppercase tracking-wider shadow-xl hover:opacity-95 transition-all font-mono cursor-pointer"
              >
                <span>Acessar Academia Completa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('receitas')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all font-mono cursor-pointer"
              >
                <span>Ver Caderno de Receitas</span>
              </button>
            </div>
          </div>

          {/* Coluna do Vídeo em Proporção 9x16 */}
          <div className="w-full lg:w-5/12 flex justify-center items-center">
            <div className="w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border-2 border-luxury-accent/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
              <iframe
                src="https://player.vimeo.com/video/1221166840?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&dnt=1"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                title="Apresentação Será Cacau"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Main Hero Featured Course / Continue Learning */}
      {activeCourse && (
        <section className="bg-surface rounded-3xl border border-border-color p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center shadow-sm relative overflow-hidden group">
          <div className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden bg-secondary-surface relative border border-border-color shadow-md">
            <img 
              src={activeCourse.coverImage} 
              alt={activeCourse.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            
            <button
              id="continue-learning-btn"
              onClick={() => {
                onSelectCourse(activeCourse);
                onNavigate('academia');
              }}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-primary-forest/90 hover:bg-primary-forest text-white border border-luxury-accent/40 flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <Play className="w-6 h-6 fill-current translate-x-0.5 text-luxury-accent" />
            </button>

            <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-luxury-accent text-[9px] font-bold px-2.5 py-1 rounded font-mono uppercase">
              {activeCourse.totalHours} de conteúdo
            </span>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest font-bold text-primary-accent font-mono">
                  {activeCourse.category} • Academia Cabruca
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] text-emerald-600 font-bold uppercase font-mono">Em Andamento</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-primary-forest tracking-tight mt-1.5">
                {activeCourse.title}
              </h2>

              <p className="text-xs md:text-sm text-secondary-text mt-2.5 leading-relaxed line-clamp-3">
                {activeCourse.description}
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-border-color/60">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-secondary-text font-medium">Instrutor: <strong className="text-primary-forest">{activeCourse.instructor}</strong></span>
                <span className="text-primary-accent font-bold">1/4 Módulos Concluídos (25%)</span>
              </div>
              <div className="w-full h-2 bg-secondary-surface rounded-full overflow-hidden">
                <div className="h-full bg-primary-accent rounded-full transition-all duration-500" style={{ width: '25%' }} />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectCourse(activeCourse);
                  onNavigate('academia');
                }}
                className="px-6 py-3 bg-primary-forest hover:bg-primary-forest/90 text-white rounded-xl text-xs uppercase font-bold tracking-widest transition-all shadow font-mono flex items-center gap-2 cursor-pointer"
              >
                <span>Continuar Aula</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('academia')}
                className="px-5 py-3 bg-surface hover:bg-secondary-surface text-secondary-text border border-border-color rounded-xl text-xs uppercase font-bold tracking-widest transition-all font-mono cursor-pointer"
              >
                Ver Todos os Módulos
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. Quick Action Hub / Portais Essenciais */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Hub Item 1: Cursos & Aulas */}
        <div 
          onClick={() => onNavigate('academia')}
          className="bg-surface rounded-2xl p-6 border border-border-color hover:border-primary-accent/40 shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary-accent/10 text-primary-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-primary-forest">Academia & Cursos</h4>
            <p className="text-xs text-secondary-text leading-relaxed">
              Trilhas de formação clínica, módulos de bioquímica e certificações exclusivas.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary-accent font-mono flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
            Acessar Aulas <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Hub Item 2: Receitas & Rituais */}
        <div 
          onClick={() => onNavigate('receitas')}
          className="bg-surface rounded-2xl p-6 border border-border-color hover:border-primary-accent/40 shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-luxury-accent/20 text-cocoa flex items-center justify-center group-hover:scale-110 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-primary-forest">Receitas & Prescrições</h4>
            <p className="text-xs text-secondary-text leading-relaxed">
              12 receitas da Dani e 7 formulações clínicas da Luna com dados fitoquímicos.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary-accent font-mono flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
            Ver 19 Receitas <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Hub Item 3: Fichas Técnicas & Laudos */}
        <div 
          onClick={() => onNavigate('fichas')}
          className="bg-surface rounded-2xl p-6 border border-border-color hover:border-primary-accent/40 shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-primary-forest">Fichas & Laudos</h4>
            <p className="text-xs text-secondary-text leading-relaxed">
              Documentos oficiais, laudos de pureza e ausência de contaminações para consultório.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary-accent font-mono flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
            Baixar Fichas <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Hub Item 4: Comunidade de Nutris */}
        <div 
          onClick={() => onNavigate('comunidade')}
          className="bg-surface rounded-2xl p-6 border border-border-color hover:border-primary-accent/40 shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary-forest/10 text-primary-forest flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-primary-forest">Círculo de Membros</h4>
            <p className="text-xs text-secondary-text leading-relaxed">
              Troca de experiências, casos clínicos, rituais e dúvidas com colegas prescritoras.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary-accent font-mono flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
            Entrar no Fórum <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </section>

      {/* 5. Vitrine Rápida de Produtos da Linha */}
      <section className="flex flex-col gap-5">
        <div className="flex justify-between items-end border-b border-border-color/60 pb-3">
          <div className="flex items-center gap-2.5">
            <SeraCacauIcon className="w-5 h-5 text-primary-accent" />
            <h3 className="text-xl font-extrabold tracking-tight text-primary-forest flex flex-wrap items-center gap-2">
              <span>Linha de Produtos Será Cacau</span>
              <span className="bg-secondary-accent/15 text-secondary-accent text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full font-bold">
                100% Puro Cabruca
              </span>
            </h3>
          </div>
          <button 
            onClick={() => onNavigate('produtos')}
            className="group flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-primary-accent hover:text-primary-forest transition-all font-mono cursor-pointer"
          >
            <span>Ver Catálogo Completo (10)</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0, 4).map((product) => (
            <div 
              key={product.id}
              onClick={() => {
                onSelectProduct(product);
                onNavigate('produtos');
              }}
              className="bg-surface rounded-2xl p-4 border border-border-color flex flex-col justify-between hover:border-primary-accent/40 shadow-sm transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="w-full h-40 rounded-xl overflow-hidden bg-secondary-surface relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 bg-primary-forest/80 backdrop-blur-sm text-luxury-accent text-[9px] font-bold px-2 py-0.5 rounded">
                    {product.weight}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-primary-forest line-clamp-1 group-hover:text-primary-accent transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-secondary-text mt-0.5 line-clamp-1 italic">
                    {product.tagline}
                  </p>
                </div>
              </div>

              {/* Discount code mini badge */}
              {product.discountCode && (
                <div className="mt-2.5 px-2.5 py-1 rounded bg-luxury-accent/10 border border-dashed border-luxury-accent/40 text-[9px] font-mono text-luxury-accent font-bold flex items-center justify-between">
                  <span>CUPOM: {product.discountCode}</span>
                  <Tag className="w-3 h-3 text-luxury-accent" />
                </div>
              )}

              <div className="pt-3 border-t border-border-color/60 flex justify-between items-center mt-3">
                <span className="text-xs font-bold text-cocoa">
                  {product.price}
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-primary-accent group-hover:translate-x-1 transition-all flex items-center gap-1 font-mono">
                  Detalhes <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
