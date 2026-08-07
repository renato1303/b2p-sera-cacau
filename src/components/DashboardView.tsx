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
  Megaphone, 
  Award,
  Sparkles,
  Calendar,
  Clock,
  Heart,
  ChevronRight,
  Lock,
  ShieldCheck
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
  // First class of first course is simulated as current active journey
  const activeCourse = courses[0] || null;
  const nextClass = activeCourse?.modules?.[0]?.classes?.[1] || activeCourse?.modules?.[0]?.classes?.[0] || null;

  return (
    <div className="px-6 md:px-12 py-8 max-w-7xl mx-auto w-full flex flex-col gap-10 font-sans text-primary-text">
      
      {/* 1. Closed Lounge Lobby (Welcoming & Digital Credential Card) */}
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 bg-surface p-6 md:p-8 rounded-3xl border border-border-color shadow-sm relative overflow-hidden">
        
        {/* Decorative background glow rings */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-luxury-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-primary-accent/5 blur-3xl pointer-events-none" />

        {/* Text & Active Indicators */}
        <div className="flex flex-col justify-between gap-6 flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary-accent/10 text-primary-accent text-[8px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full font-mono border border-primary-accent/20 shadow-[0_0_8px_rgba(217,132,91,0.1)]">
                Área de Membros • Acesso Premium
              </span>
              <span className="text-[10px] text-secondary-text uppercase tracking-widest font-semibold font-mono hidden sm:inline">
                Sessão Segura SSL
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl text-primary-forest font-extrabold tracking-tight mt-1">
              Olá, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-forest via-cocoa to-primary-accent italic font-semibold">{user.name}</span>
            </h1>
            <p className="text-xs text-secondary-text mt-3 max-w-xl leading-relaxed">
              Sua assinatura e credenciamento de prescritora estão ativos. Acesse com exclusividade os treinamentos científicos, materiais técnicos com selo Cabruca e faça a gestão do seu consultório.
            </p>
          </div>

          {/* Quick Stats Grid inside welcome lobby */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-border-color/60 pt-5 mt-2">
            <div>
              <span className="text-[8px] uppercase tracking-widest text-secondary-text/60 font-mono block">Status da Conta</span>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Ativo & Validado
              </span>
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-widest text-secondary-text/60 font-mono block">Nível de Membro</span>
              <span className="text-xs font-bold text-primary-accent uppercase tracking-wide mt-0.5 block">Prescritora Ouro</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[8px] uppercase tracking-widest text-secondary-text/60 font-mono block">CRN Profissional</span>
              <span className="text-xs font-semibold text-primary-text mt-0.5 block">{user.crn || 'CRN-3 71830'}</span>
            </div>
          </div>
        </div>

        {/* Exclusive Digital B2B Membership Credential Card */}
        <div className="w-full lg:w-[360px] bg-gradient-to-br from-primary-forest via-secondary-forest to-primary-forest text-white rounded-2xl p-5 border border-luxury-accent/30 shadow-[0_4px_20px_rgba(40,53,46,0.15)] relative overflow-hidden flex flex-col justify-between h-48 group shrink-0 select-none">
          {/* Holographic lens flare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none" />
          
          <div className="absolute right-2 top-2 font-mono text-[10px] text-luxury-accent/20 tracking-widest uppercase select-none pointer-events-none font-bold">
            será cacau ritual
          </div>

          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[8px] tracking-[0.25em] font-mono text-luxury-accent font-bold uppercase">
                Credencial Digital
              </span>
              <span className="text-[7px] tracking-wider font-mono text-secondary-accent uppercase mt-0.5">
                Prescritor Homologado
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
              <span className="text-[7px] text-white/40 uppercase tracking-widest font-mono">Registro Clínico</span>
              <span className="text-[10px] font-mono font-bold text-white">{user.crn || 'CRN-3 71830'}</span>
            </div>
            <div className="flex flex-col gap-0.5 items-end">
              <span className="text-[7px] text-white/40 uppercase tracking-widest font-mono">Código</span>
              <span className="text-[10px] font-mono text-luxury-accent font-bold">SC-2026-0812</span>
            </div>

            {/* Micro mock barcode */}
            <div className="flex flex-col gap-0.5 opacity-30 group-hover:opacity-60 transition-opacity pl-2 shrink-0">
              <div className="flex gap-0.5">
                <div className="w-3 h-2 bg-white" />
                <div className="w-1 h-2 bg-white" />
                <div className="w-2 h-2 bg-white" />
                <div className="w-1.5 h-2 bg-white" />
              </div>
              <span className="text-[5px] font-mono text-center tracking-widest">SC-98</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Premium Hero Banner: AstroMembers Continuation of Journey */}
      {activeCourse && (
        <div className="relative overflow-hidden rounded-2xl bg-primary-forest text-white border border-border-color shadow-md group">
          {/* Cover background gradient and soft imagery */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay scale-105 group-hover:scale-100 transition-transform duration-1000">
            <img 
              src={activeCourse.coverImage} 
              alt={activeCourse.title}
              className="w-full h-full object-cover filter brightness-75 contrast-125"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Radial mask for cinematic look */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary-forest via-primary-forest/95 to-transparent z-10" />

          {/* Hero Content */}
          <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 flex flex-col items-start text-left">
              <span className="bg-primary-accent text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded mb-4 shadow-[0_2px_8px_rgba(217,132,91,0.3)]">
                Continuar Jornada
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight max-w-xl">
                {activeCourse.title}
              </h2>
              <p className="text-xs text-[#EFE6D7]/80 mt-2 max-w-md line-clamp-2">
                {activeCourse.description}
              </p>

              {nextClass && (
                <div className="mt-6 flex flex-col gap-1 border-l-2 border-primary-accent pl-4">
                  <span className="text-[9px] uppercase tracking-widest text-luxury-accent font-bold font-mono">Próxima Aula:</span>
                  <span className="text-xs font-semibold text-white">{nextClass.title}</span>
                  <p className="text-[10px] text-[#EFE6D7]/60 truncate max-w-xs">{nextClass.summary}</p>
                </div>
              )}
            </div>

            {/* Premium CTA Button matching AstroMembers luxury circle/glass play style */}
            <div className="shrink-0 flex flex-col items-center">
              <button
                id="hero-play-btn"
                onClick={() => onNavigate('academia', activeCourse)}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-accent to-luxury-accent hover:from-luxury-accent hover:to-primary-accent text-white flex items-center justify-center shadow-[0_4px_15px_rgba(217,132,91,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 group/btn"
              >
                <Play className="w-6 h-6 md:w-8 md:h-8 fill-current translate-x-0.5 group-hover/btn:scale-110 transition-transform" />
              </button>
              <span className="text-[10px] tracking-widest uppercase text-luxury-accent mt-3 font-semibold font-mono">
                Iniciar Aula
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Section: Cursos (High-aspect vertical covers as requested) */}
      <section className="flex flex-col gap-5">
        <div className="flex justify-between items-end border-b border-border-color/60 pb-3">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-primary-accent" />
            <h3 className="text-xl font-extrabold tracking-tight text-primary-forest flex flex-wrap items-center gap-2">
              <span>Treinamentos</span>
            </h3>
          </div>
          <button 
            id="see-all-courses"
            onClick={() => onNavigate('academia')}
            className="group flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-primary-accent hover:text-primary-forest transition-all font-mono"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2:3 high-aspect vertical cards (AstroMembers concept) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
            <div 
              id={`dashboard-course-card-${course.id}`}
              key={course.id}
              onClick={() => onNavigate('academia', course)}
              className="bg-surface text-primary-text rounded-xl overflow-hidden border border-border-color flex flex-col justify-between h-[420px] shadow-sm group cursor-pointer hover:border-primary-accent/40 transition-all duration-300 relative"
            >
              {/* Cover Aspect Ratio vertical */}
              <div className="relative h-[240px] w-full overflow-hidden">
                <img 
                  src={course.coverImage} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 saturate-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10" />
                
                {/* Duration Tag */}
                <span className="absolute bottom-4 right-4 bg-primary-forest/80 backdrop-blur-md text-white text-[8px] tracking-wider uppercase font-mono px-2 py-0.5 rounded">
                  {course.duration}
                </span>
              </div>

              {/* Course Title and details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold tracking-tight text-primary-forest group-hover:text-primary-accent transition-colors leading-snug line-clamp-2">
                    {course.title}
                  </h4>
                  <p className="text-[10px] text-secondary-text tracking-wider uppercase mt-1 font-mono">
                    Instrutor: <span className="font-semibold text-primary-accent">{course.instructor}</span>
                  </p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-border-color/60 text-[9px] uppercase tracking-widest text-secondary-text mt-3 font-mono">
                  <span>{course.modules?.length || 0} módulos</span>
                  <span className="text-primary-accent font-bold group-hover:translate-x-1 transition-all flex items-center gap-1">
                    Acessar curso <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Section: Produtos (Excellent physical product presentation) */}
      <section className="flex flex-col gap-5">
        <div className="flex justify-between items-end border-b border-border-color/60 pb-3">
          <div className="flex items-center gap-2.5">
            <SeraCacauIcon className="w-5 h-5 text-primary-accent" />
            <h3 className="text-xl font-extrabold tracking-tight text-primary-forest flex flex-wrap items-center gap-2">
              <span>Nossos Produtos</span>
              <span className="bg-secondary-accent/15 text-secondary-accent text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border border-secondary-accent/20">
                <ShieldCheck className="w-2.5 h-2.5" /> Prescrição Exclusiva
              </span>
            </h3>
          </div>
          <button 
            id="see-all-products"
            onClick={() => onNavigate('produtos')}
            className="group flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-primary-accent hover:text-primary-forest transition-all font-mono"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Large refined product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <div 
              id={`dashboard-product-card-${product.id}`}
              key={product.id}
              onClick={() => onNavigate('produtos', product)}
              className="bg-surface rounded-xl p-5 border border-border-color flex flex-col justify-between h-[390px] hover:border-primary-accent/40 shadow-sm transition-all duration-300 cursor-pointer group"
            >
              {/* Image and basic info */}
              <div className="flex flex-col gap-4">
                <div className="w-full h-[180px] rounded-lg overflow-hidden bg-secondary-surface relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-100"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <h4 className="text-base font-bold tracking-tight text-primary-forest line-clamp-1 group-hover:text-primary-accent transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-[10px] italic text-secondary-text mt-0.5 line-clamp-1">
                    "{product.tagline}"
                  </p>
                </div>
              </div>

              {/* Price and Action */}
              <div className="pt-3 border-t border-border-color/60 flex justify-between items-center font-mono">
                <span className="text-xs font-bold text-cocoa">
                  {product.price}
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-primary-accent group-hover:translate-x-1 transition-all flex items-center gap-1">
                  Especificações <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Downloads / Biblioteca Section */}
      <div className="w-full">
        <section className="flex flex-col gap-5">
          <div className="flex justify-between items-end border-b border-border-color/60 pb-3">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-primary-accent" />
              <h3 className="text-xl font-extrabold tracking-tight text-primary-forest flex items-center gap-2">
                <span>Laudos & Materiais Clínicos</span>
                <span className="bg-secondary-accent/15 text-secondary-accent border border-secondary-accent/20 text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full font-bold">PDF</span>
              </h3>
            </div>
            <button 
              id="see-all-downloads"
              onClick={() => onNavigate('biblioteca')}
              className="text-[9px] uppercase font-bold tracking-widest text-primary-accent hover:underline font-mono"
            >
              Ver todos
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-surface rounded-xl p-5 border border-border-color shadow-sm">
            {downloads.slice(0, 4).map((att) => (
              <div 
                id={`dashboard-download-row-${att.id}`}
                key={att.id}
                onClick={() => onNavigate('biblioteca')}
                className="flex items-center justify-between p-3 rounded-lg bg-bg-app hover:bg-secondary-surface/40 border border-border-color/60 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-primary-accent/10 border border-primary-accent/20 text-primary-accent flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">
                    {att.category === 'PDF' || att.category === 'Laudos' || att.category === 'Protocolos' ? 'PDF' : 'DOC'}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-primary-text truncate group-hover:text-primary-accent transition-colors">
                      {att.name}
                    </h4>
                    <span className="text-[9px] text-secondary-text tracking-wider uppercase font-mono">
                      {att.category} • {att.size}
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded-full bg-white/80 border border-border-color/60 group-hover:bg-primary-accent group-hover:text-white transition-all text-primary-accent shadow-sm">
                  <Download className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
};
