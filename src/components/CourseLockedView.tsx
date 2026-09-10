import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Layers, 
  Eye, 
  ShieldAlert,
  ChevronRight,
  Coffee,
  HeartHandshake
} from 'lucide-react';
import { Course, UserProfile } from '../types';
import { getTimeUntilRelease, CABRUCA_RELEASE_DATE } from '../utils/courseRelease';

interface CourseLockedViewProps {
  course: Course;
  user: UserProfile;
  onBack: () => void;
  onNavigateToProducts?: () => void;
  onAdminPreview?: () => void;
}

export const CourseLockedView: React.FC<CourseLockedViewProps> = ({
  course,
  user,
  onBack,
  onNavigateToProducts,
  onAdminPreview
}) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilRelease(CABRUCA_RELEASE_DATE));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilRelease(CABRUCA_RELEASE_DATE));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isAdmin = user.role === 'ADMIN';

  // Classes list taken directly from the course definition, showing only the original names (Introdução, Dia 01, Dia 02, etc.)
  const classesList = course.modules?.flatMap(m => m.classes) || [
    { id: 'c1-m1-cl0', title: 'Introdução', duration: '0:55 min' },
    { id: 'c1-m1-cl1', title: 'Dia 01', duration: '3:19 min' },
    { id: 'c1-m1-cl2', title: 'Dia 02', duration: '4:49 min' },
    { id: 'c1-m1-cl3', title: 'Dia 03', duration: '4:14 min' },
    { id: 'c1-m2-cl4', title: 'Dia 04', duration: '3:55 min' },
    { id: 'c1-m2-cl5', title: 'Dia 05', duration: '3:25 min' },
    { id: 'c1-m2-cl6', title: 'Dia 06', duration: '4:50 min' },
    { id: 'c1-m2-cl7', title: 'Dia 07', duration: '9:36 min' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 font-sans text-primary-text animate-fadeIn">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          id="btn-locked-back"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-accent hover:text-primary-forest transition-colors font-mono cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Menu</span>
        </button>

        {/* Release Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-full text-amber-800 text-[11px] font-bold font-mono uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5 text-amber-700" />
          <span>Disponível em 20/09</span>
        </div>
      </div>

      {/* Admin Notice Banner (Only shown if user is admin) */}
      {isAdmin && onAdminPreview && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900">Aviso Administrativo</p>
              <p className="text-amber-800 text-[11px] mt-0.5">
                Para as nutricionistas cadastradas, o acesso a este curso está totalmente bloqueado até dia <strong>20/09</strong>. Como administradora, você pode pré-visualizar as aulas completas.
              </p>
            </div>
          </div>
          <button
            id="btn-admin-preview-course"
            onClick={onAdminPreview}
            className="shrink-0 px-4 py-2 bg-primary-forest hover:bg-primary-forest/90 text-white rounded-xl text-[11px] font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Pré-visualizar como Admin</span>
          </button>
        </div>
      )}

      {/* Hero Card with countdown */}
      <div className="bg-surface rounded-3xl border border-border-color shadow-md overflow-hidden relative">
        {/* Cover with lock overlay */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-primary-forest">
          <img
            src={course.coverImage || '/images/img_4189.jpg'}
            alt={course.title}
            className="w-full h-full object-cover filter brightness-[0.4] saturate-75"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = '/images/img_4189.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2D21] via-[#1F2D21]/60 to-transparent" />

          {/* Central locked badge overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/40 backdrop-blur-md border border-luxury-accent/50 text-luxury-accent flex items-center justify-center shadow-2xl mb-4">
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.2]" />
            </div>

            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-mono font-bold text-luxury-accent">
              Lançamento Oficial em 20 de Setembro
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 max-w-2xl drop-shadow-md">
              {course.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#D7DDD5] max-w-lg mt-2 font-medium">
              Com a nutricionista <strong className="text-luxury-accent">{course.instructor}</strong>
            </p>
          </div>
        </div>

        {/* Countdown Box */}
        <div className="p-6 sm:p-8 bg-[#FAF7F2] border-b border-border-color/60">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary-accent block mb-2">
              Contagem Regressiva para a Abertura
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-primary-forest">
              O curso completo será liberado no dia 20/09 às 00:00
            </h3>
            <p className="text-xs text-secondary-text mt-1">
              O acesso às aulas, vídeos e fichas clínicas estará disponível automaticamente para todas as profissionais credenciadas.
            </p>

            {/* Timer Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mt-6">
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#2E4030]/10 shadow-xs flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary-forest font-mono">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-secondary-text mt-1 font-mono">
                  Dias
                </span>
              </div>
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#2E4030]/10 shadow-xs flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary-forest font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-secondary-text mt-1 font-mono">
                  Horas
                </span>
              </div>
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#2E4030]/10 shadow-xs flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary-forest font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-secondary-text mt-1 font-mono">
                  Minutos
                </span>
              </div>
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#2E4030]/10 shadow-xs flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary-accent font-mono">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-secondary-text mt-1 font-mono">
                  Segundos
                </span>
              </div>
            </div>

            {/* Action Button */}
            {onNavigateToProducts && (
              <div className="mt-6 flex items-center justify-center">
                <button
                  id="btn-explore-products-locked"
                  onClick={onNavigateToProducts}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider font-mono bg-white text-primary-forest hover:bg-white/80 border border-border-color transition-all cursor-pointer shadow-xs"
                >
                  Conhecer Produtos com 15% OFF
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Preview & Lock Details */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Why it is locked banner */}
          <div className="p-5 rounded-2xl bg-surface border border-border-color flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-forest/10 text-primary-forest flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary-accent" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary-forest">
                O que é a Jornada do Cacau Cabruca?
              </h4>
              <p className="text-xs text-secondary-text mt-1 leading-relaxed">
                Um programa imersivo em 7 dias com a nutricionista <strong>Luna Azevedo</strong>. Cada dia explora uma xícara ritualística com cacau puro 100%, combinada a fitoativos biofuncionais, artigos científicos e protocolos de prescrição para seu consultório.
              </p>
            </div>
          </div>

          {/* Locked Curriculum List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary-accent font-bold">
                  Cronograma das Aulas
                </span>
                <h4 className="text-base font-bold text-primary-forest mt-0.5">
                  Ementa Completa (Liberada em 20/09)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-secondary-text uppercase tracking-wider">
                8 aulas · 2 módulos
              </span>
            </div>

            <div className="space-y-2.5">
              {classesList.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3.5 sm:p-4 rounded-xl bg-secondary-surface/60 border border-border-color/70 flex items-center justify-between gap-3 text-xs opacity-85 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-surface border border-border-color flex items-center justify-center text-primary-forest font-bold text-xs font-mono shrink-0">
                      {idx === 0 ? '0' : idx}
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-primary-forest text-sm">{item.title}</span>
                      {item.duration && (
                        <p className="text-[11px] text-secondary-text font-mono mt-0.5 flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-secondary-text/60" />
                          <span>{item.duration}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-500/15 border border-amber-500/25 px-2.5 py-1 rounded-md font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-700" />
                      <span className="hidden sm:inline">Bloqueado até</span> 20/09
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom FAQ / Help Note */}
          <div className="pt-6 border-t border-border-color/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary-text">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-accent" />
              <span>Data Oficial de Lançamento: <strong>20 de Setembro de 2026</strong></span>
            </div>
            <button
              id="btn-bottom-return"
              onClick={onBack}
              className="font-bold text-primary-forest hover:text-primary-accent transition-colors font-mono uppercase text-[11px] cursor-pointer"
            >
              ← Voltar para a Página Inicial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
