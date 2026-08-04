/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { 
  Plus, 
  Users, 
  GraduationCap, 
  Sprout, 
  BookOpen, 
  Megaphone, 
  CheckCircle, 
  ShieldAlert,
  Sliders,
  DollarSign,
  TrendingUp,
  Download,
  Trash2,
  Lock,
  Unlock,
  Eye,
  FileText,
  UserCheck,
  Video,
  ListOrdered,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import { Course, Product, FileAttachment, Member, CourseModule, CourseClass, PointsEntry } from '../types';

interface AdminViewProps {
  courses: Course[];
  onAddCourse: (course: Course) => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  attachments: FileAttachment[];
  onAddAttachment: (att: FileAttachment) => void;
  metricDownloads: number;
  members: Member[];
  onUpdateCourse: (course: Course) => void;
  pointsHistory: PointsEntry[];
  setPointsHistory: React.Dispatch<React.SetStateAction<PointsEntry[]>>;
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

export const AdminView: React.FC<AdminViewProps> = ({
  courses,
  onAddCourse,
  products,
  onAddProduct,
  attachments,
  onAddAttachment,
  metricDownloads,
  members,
  onUpdateCourse,
  pointsHistory,
  setPointsHistory,
  setMembers
}) => {
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Points Launch Form States
  const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0]?.id || '');
  const [launchPoints, setLaunchPoints] = useState<string>('');
  const [launchReason, setLaunchReason] = useState<string>('');

  // Course addition form state
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState<'Treinamento' | 'História' | 'Nutrição' | 'Negócios'>('Treinamento');
  const [courseInstructor, setCourseInstructor] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseCover, setCourseCover] = useState('/src/assets/images/cabruca_forest_1783964129461.jpg');
  const [certificateEnabled, setCertificateEnabled] = useState(true);
  const [communityEnabled, setCommunityEnabled] = useState(true);
  const [courseVisibility, setCourseVisibility] = useState<'Público' | 'Somente Matriculadas' | 'Rascunho'>('Somente Matriculadas');

  // Interactive dynamic modules builder state
  const [tempModules, setTempModules] = useState<CourseModule[]>([]);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDesc, setNewModuleDesc] = useState('');
  const [newModuleLocked, setNewModuleLocked] = useState(false);

  // New Class builder state (temporary, linked to a module being created)
  const [activeModuleForClass, setActiveModuleForClass] = useState<string | null>(null);
  const [newClassTitle, setNewClassTitle] = useState('');
  const [newClassDuration, setNewClassDuration] = useState('15 min');
  const [newClassType, setNewClassType] = useState<'video' | 'quiz'>('video');
  const [newClassSummary, setNewClassSummary] = useState('');

  // Quiz creation states
  const [newQuizQuestion, setNewQuizQuestion] = useState('');
  const [newQuizOptA, setNewQuizOptA] = useState('');
  const [newQuizOptB, setNewQuizOptB] = useState('');
  const [newQuizOptC, setNewQuizOptC] = useState('');
  const [newQuizCorrect, setNewQuizCorrect] = useState<'a' | 'b' | 'c'>('a');

  // Product addition form state
  const [prodName, setProdName] = useState('');
  const [prodLine, setProdLine] = useState<'Cacau Ritual' | 'Ervas Ritual' | 'Terra Ritual'>('Cacau Ritual');
  const [prodPrice, setProdPrice] = useState('');
  const [prodTagline, setProdTagline] = useState('');

  // Active Collapsed Accordion state for Published Courses
  const [openCourseAccordionId, setOpenCourseAccordionId] = useState<string | null>(null);

  const handleLaunchPoints = (e: React.FormEvent) => {
    e.preventDefault();
    const targetId = selectedMemberId || (members[0]?.id || '');
    if (!targetId || !launchPoints || !launchReason) {
      alert('Por favor, preencha todos os campos do formulário de lançamento.');
      return;
    }

    const memberToUpdate = members.find(m => m.id === targetId);
    if (!memberToUpdate) return;

    const pointsToAdd = parseInt(launchPoints, 10);
    if (isNaN(pointsToAdd)) {
      alert('Por favor, digite um número válido de pontos.');
      return;
    }

    const updatedPoints = (memberToUpdate.totalPoints || 0) + pointsToAdd;

    // Determine new tier
    let updatedTier: 'Bronze' | 'Prata' | 'Ouro' | 'Diamante' = 'Bronze';
    if (updatedPoints > 1200) {
      updatedTier = 'Diamante';
    } else if (updatedPoints > 700) {
      updatedTier = 'Ouro';
    } else if (updatedPoints > 300) {
      updatedTier = 'Prata';
    }

    // Write to Supabase if configured and is a valid UUID
    if (isSupabaseConfigured) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetId);
      if (isUuid) {
        supabase.from('points_history').insert({
          member_id: targetId,
          points: pointsToAdd,
          reason: launchReason
        }).then(({ error: histError }) => {
          if (histError) console.error('Erro ao salvar pontos no histórico:', histError);
        });

        supabase.from('profiles').update({
          total_points: updatedPoints,
          tier: updatedTier
        }).eq('id', targetId).then(({ error: profError }) => {
          if (profError) console.error('Erro ao atualizar perfil do membro:', profError);
        });
      }
    }

    // Update Member list state
    setMembers(prev => prev.map(m => {
      if (m.id === targetId) {
        return {
          ...m,
          totalPoints: updatedPoints,
          tier: updatedTier
        };
      }
      return m;
    }));

    // Create PointsEntry
    const newEntry: PointsEntry = {
      id: `pe-${Date.now()}`,
      memberId: targetId,
      points: pointsToAdd,
      reason: launchReason,
      date: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    // Update Points History state
    setPointsHistory(prev => [newEntry, ...prev]);

    // Success notice
    setSuccessMsg(`+${pointsToAdd} pontos creditados com sucesso para ${memberToUpdate.name}!`);
    setTimeout(() => setSuccessMsg(''), 5000);

    // Reset fields
    setLaunchPoints('');
    setLaunchReason('');
  };

  // Add module to temporary course build
  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    const modId = `mod-temp-${Date.now()}`;
    const newMod: CourseModule = {
      id: modId,
      title: newModuleTitle,
      description: newModuleDesc,
      locked: newModuleLocked,
      classes: []
    };
    setTempModules(prev => [...prev, newMod]);
    setNewModuleTitle('');
    setNewModuleDesc('');
    setNewModuleLocked(false);
    setActiveModuleForClass(modId); // auto-focus this module to add classes
  };

  // Delete temp module
  const handleDeleteTempModule = (modId: string) => {
    setTempModules(prev => prev.filter(m => m.id !== modId));
    if (activeModuleForClass === modId) setActiveModuleForClass(null);
  };

  // Add class to temporary module build
  const handleAddClass = (modId: string) => {
    if (!newClassTitle.trim()) return;

    const classId = `cls-temp-${Date.now()}`;
    const newCls: CourseClass = {
      id: classId,
      title: newClassTitle,
      duration: newClassDuration || '15 min',
      type: newClassType,
      summary: newClassSummary,
      videoUrl: newClassType === 'video' ? 'https://player.vimeo.com/video/example' : ''
    };

    if (newClassType === 'quiz') {
      newCls.quiz = {
        id: `quiz-temp-${Date.now()}`,
        question: newQuizQuestion || 'Pergunta de Fixação Cognitiva',
        options: [
          { id: 'a', text: newQuizOptA || 'Alternativa A' },
          { id: 'b', text: newQuizOptB || 'Alternativa B' },
          { id: 'c', text: newQuizOptC || 'Alternativa C' }
        ],
        correctOptionId: newQuizCorrect
      };
    }

    setTempModules(prev => prev.map(m => {
      if (m.id === modId) {
        return {
          ...m,
          classes: [...(m.classes || []), newCls]
        };
      }
      return m;
    }));

    // Reset Class inputs
    setNewClassTitle('');
    setNewClassDuration('15 min');
    setNewClassType('video');
    setNewClassSummary('');
    setNewQuizQuestion('');
    setNewQuizOptA('');
    setNewQuizOptB('');
    setNewQuizOptC('');
    setNewQuizCorrect('a');
  };

  // Submit completed Course
  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (tempModules.length === 0) {
      alert("Por favor, adicione pelo menos um Módulo com aulas ao seu treinamento antes de publicar.");
      return;
    }

    // Calculate total duration in standard string
    let totalClasses = 0;
    tempModules.forEach(m => totalClasses += m.classes?.length || 0);

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: courseTitle,
      description: courseDesc,
      category: courseCategory,
      instructor: courseInstructor,
      duration: `${Math.max(1, Math.ceil(totalClasses * 0.4))}h`, // rough estimation
      coverImage: courseCover,
      certificateEnabled,
      communityEnabled,
      visibility: courseVisibility,
      modules: tempModules,
      enrolledMemberIds: ['mem-1', 'mem-3'] // auto-enroll starting set
    };

    onAddCourse(newCourse);
    setSuccessMsg(`Treinamento "${courseTitle}" publicado com sucesso com ${tempModules.length} módulos e ${totalClasses} aulas!`);
    
    // reset form
    setCourseTitle('');
    setCourseInstructor('');
    setCourseDesc('');
    setCourseCover('/src/assets/images/cabruca_forest_1783964129461.jpg');
    setTempModules([]);
    setActiveModuleForClass(null);
    setCertificateEnabled(true);
    setCommunityEnabled(true);
    setCourseVisibility('Somente Matriculadas');

    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: prodName,
      slug: prodName.toLowerCase().replace(/\s+/g, '-'),
      line: prodLine,
      category: 'Inovação',
      weight: '200g',
      tagline: prodTagline,
      story: 'Nova inovação botânica desenvolvida para atender exigências de pureza de nutricionistas pioneiras.',
      benefits: ['Rico em oligoelementos essenciais', 'Estimulo cognitivo limpo'],
      ingredients: 'Cacau orgânico e puros fitoterápicos.',
      nutritionalTable: {
        servingSize: '20g',
        calories: '110 kcal',
        carbohydrates: '6.0g',
        proteins: '2.5g',
        fats: '9.0g',
        sodium: '0mg'
      },
      hasLaudo: false,
      imageUrl: '/src/assets/images/cocoa_drops_jar_1783964100837.jpg',
      shopifyId: `sh_new_${Date.now()}`,
      price: prodPrice.startsWith('R$') ? prodPrice : `R$ ${prodPrice}`,
      originCooperativa: 'Cooperativa Parceira do Sul da Bahia'
    };

    onAddProduct(newProduct);
    setSuccessMsg(`Produto "${prodName}" cadastrado com sucesso no catálogo!`);
    
    // reset form
    setProdName('');
    setProdPrice('');
    setProdTagline('');
    setTimeout(() => setSuccessMsg(''), 4500);
  };

  // Toggle Module lock in existing published course
  const handleToggleModuleLock = (courseId: string, moduleId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const updatedModules = course.modules.map(mod => {
      if (mod.id === moduleId) {
        return { ...mod, locked: !mod.locked };
      }
      return mod;
    });

    const updatedCourse = {
      ...course,
      modules: updatedModules
    };

    onUpdateCourse(updatedCourse);
    setSuccessMsg(`Status de bloqueio do módulo atualizado com sucesso!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 md:px-12 flex flex-col gap-10 font-sans text-primary-text">
      
      {/* Header */}
      <header className="flex flex-col gap-3">
        <span className="text-xs tracking-[0.2em] uppercase text-primary-accent font-bold font-mono flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5" />
          governança administrativa
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-forest">
          Painel de Administração
        </h1>
        <p className="text-xs md:text-sm text-secondary-text max-w-xl leading-relaxed">
          Sua central sênior para controlar o ecossistema. Publique novos materiais técnicos, gerencie o catálogo de produtos e audite o crescimento de parceiras cadastradas.
        </p>
        <div className="h-[1px] bg-border-color mt-2"></div>
      </header>

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 rounded-lg text-xs flex items-center gap-2.5 animate-fade-in shadow-sm font-mono">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 1. Bento Grid of Key Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        
        {/* Metric 1: Partners */}
        <div className="bg-surface border border-border-color rounded-lg p-5 flex flex-col gap-2.5 shadow-sm">
          <div className="flex justify-between items-center text-primary-accent">
            <Users className="w-5 h-5" />
            <span className="text-[9px] tracking-widest uppercase font-bold text-primary-accent font-mono">membros</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-primary-forest">{members.length}</span>
            <span className="text-[10px] text-emerald-600 flex items-center gap-1 mt-0.5 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              100% credenciadas
            </span>
          </div>
        </div>

        {/* Metric 2: Courses */}
        <div className="bg-surface border border-border-color rounded-lg p-5 flex flex-col gap-2.5 shadow-sm">
          <div className="flex justify-between items-center text-primary-accent">
            <GraduationCap className="w-5 h-5" />
            <span className="text-[9px] tracking-widest uppercase font-bold text-primary-accent font-mono">treinamentos</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-primary-forest">{courses.length}</span>
            <span className="text-[10px] text-secondary-text mt-0.5">
              Cursos publicados na academia
            </span>
          </div>
        </div>

        {/* Metric 3: Products */}
        <div className="bg-surface border border-border-color rounded-lg p-5 flex flex-col gap-2.5 shadow-sm">
          <div className="flex justify-between items-center text-primary-accent">
            <Sprout className="w-5 h-5" />
            <span className="text-[9px] tracking-widest uppercase font-bold text-primary-accent font-mono">produtos</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-primary-forest">{products.length}</span>
            <span className="text-[10px] text-secondary-text mt-0.5">
              Itens no catálogo exclusivo
            </span>
          </div>
        </div>

        {/* Metric 4: Library downloads */}
        <div className="bg-[#EFE6D7] text-primary-forest border border-border-color rounded-lg p-5 flex flex-col gap-2.5 shadow-sm">
          <div className="flex justify-between items-center text-primary-accent">
            <BookOpen className="w-5 h-5" />
            <span className="text-[9px] tracking-widest uppercase font-bold text-primary-accent font-mono">downloads</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-cocoa">{metricDownloads}</span>
            <span className="text-[10px] text-cocoa/80 mt-0.5 font-bold">
              Arquivos baixados por parceiras
            </span>
          </div>
        </div>

      </section>

      {/* 2. Interactive Creation Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* PANEL LEFT: DYNAMIC COURSE AND QUIZ BUILDER (8 Cols) */}
        <div className="lg:col-span-8 bg-surface border border-border-color rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-border-color pb-3">
            <GraduationCap className="w-4.5 h-4.5 text-primary-accent" />
            <h3 className="text-xl font-bold text-primary-forest">Criador Dinâmico de Cursos</h3>
          </div>

          <form onSubmit={handleCreateCourse} className="flex flex-col gap-6">
            
            {/* 1. Meta Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Título do Curso</label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  required
                  placeholder="Ex: Farmacologia do Cacau e Sistema Límbico"
                  className="w-full px-4 py-2.5 rounded-lg border border-border-color focus:border-primary-accent focus:outline-none bg-[#F7F3EC] text-xs text-primary-text placeholder:text-secondary-text/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Nome da Capa (Seed URL)</label>
                <input
                  type="text"
                  value={courseCover}
                  onChange={(e) => setCourseCover(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border-color focus:border-primary-accent focus:outline-none bg-[#F7F3EC] text-xs text-primary-text"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Instrutor Responsável</label>
                <input
                  type="text"
                  value={courseInstructor}
                  onChange={(e) => setCourseInstructor(e.target.value)}
                  required
                  placeholder="Ex: Dra. Luna Siqueira"
                  className="w-full px-4 py-2.5 rounded-lg border border-border-color focus:border-primary-accent focus:outline-none bg-[#F7F3EC] text-xs text-primary-text"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Categoria Acadêmica</label>
                <select
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border-color focus:border-primary-accent focus:outline-none bg-[#F7F3EC] text-xs text-primary-text font-mono"
                >
                  <option value="Treinamento">Treinamento</option>
                  <option value="História">História</option>
                  <option value="Nutrição">Nutrição</option>
                  <option value="Negócios">Negócios</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Visibilidade Inicial</label>
                <select
                  value={courseVisibility}
                  onChange={(e) => setCourseVisibility(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border-color focus:border-primary-accent focus:outline-none bg-[#F7F3EC] text-xs text-primary-text font-mono"
                >
                  <option value="Público">Público</option>
                  <option value="Somente Matriculadas">Somente Matriculadas</option>
                  <option value="Rascunho">Rascunho</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Ementa do Treinamento (Resumo)</label>
              <textarea
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
                required
                rows={2}
                placeholder="Insira a fundamentação técnica e molecular que será apresentada nesta capacitação de elite..."
                className="w-full px-4 py-3 rounded-lg border border-border-color focus:border-primary-accent focus:outline-none bg-[#F7F3EC] text-xs text-primary-text placeholder:text-secondary-text/50 resize-none"
              />
            </div>

            {/* Extra toggles */}
            <div className="grid grid-cols-2 gap-4 bg-[#F7F3EC] p-4 rounded-xl border border-border-color">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={certificateEnabled}
                  onChange={(e) => setCertificateEnabled(e.target.checked)}
                  className="rounded border-border-color bg-surface text-primary-accent focus:ring-primary-accent"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary-forest uppercase tracking-wider">Habilitar Certificado</span>
                  <span className="text-[10px] text-secondary-text">Liberado ao completar 100% das aulas</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={communityEnabled}
                  onChange={(e) => setCommunityEnabled(e.target.checked)}
                  className="rounded border-border-color bg-surface text-primary-accent focus:ring-primary-accent"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary-forest uppercase tracking-wider">Mural de Comunidade</span>
                  <span className="text-[10px] text-secondary-text">Permitir debates e relatos clínicos</span>
                </div>
              </label>
            </div>

            {/* 2. ADD MODULES CONTAINER */}
            <div className="border-t border-border-color pt-5 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-accent font-mono flex items-center gap-2">
                <ListOrdered className="w-4 h-4" />
                Estruturação de Módulos & Aulas
              </span>

              {/* Added Modules Stack */}
              <div className="flex flex-col gap-4">
                {tempModules.map((mod, modIdx) => (
                  <div key={mod.id} className="bg-secondary-surface/40 p-5 rounded-xl border border-border-color flex flex-col gap-4 relative">
                    <button
                      type="button"
                      onClick={() => handleDeleteTempModule(mod.id)}
                      className="absolute top-4 right-4 text-secondary-text/60 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Excluir Módulo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded bg-primary-accent/10 border border-primary-accent/20 text-primary-accent flex items-center justify-center text-[10px] font-mono font-bold">
                        {modIdx + 1}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary-forest flex items-center gap-2">
                          {mod.title}
                          {mod.locked && <span className="text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-700 px-1.5 py-0.5 rounded font-mono">Bloqueado por Padrão</span>}
                        </h4>
                        <p className="text-[10px] text-secondary-text leading-relaxed mt-0.5">{mod.description}</p>
                      </div>
                    </div>

                    {/* Classes List under this specific module */}
                    <div className="pl-7 flex flex-col gap-2 border-l border-border-color ml-2.5">
                      {mod.classes?.length === 0 ? (
                        <p className="text-[10px] text-secondary-text/50 italic">Nenhuma aula cadastrada neste módulo.</p>
                      ) : (
                        mod.classes?.map((cls, clsIdx) => (
                          <div key={cls.id} className="flex items-center justify-between bg-surface p-2.5 rounded-lg border border-border-color text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              {cls.type === 'quiz' ? (
                                <HelpCircle className="w-3.5 h-3.5 text-primary-accent shrink-0" />
                              ) : (
                                <Video className="w-3.5 h-3.5 text-primary-accent shrink-0" />
                              )}
                              <span className="truncate text-primary-text font-medium">{clsIdx + 1}. {cls.title}</span>
                              <span className="text-[8px] uppercase tracking-widest font-mono text-secondary-text/70 bg-secondary-surface px-1.5 py-0.5 rounded shrink-0">{cls.type}</span>
                            </div>
                            <span className="text-[10px] text-secondary-text font-mono shrink-0">{cls.duration}</span>
                          </div>
                        ))
                      )}

                      {/* Class adder button trigger */}
                      {activeModuleForClass !== mod.id ? (
                        <button
                          type="button"
                          onClick={() => setActiveModuleForClass(mod.id)}
                          className="text-[10px] font-mono tracking-wider text-primary-accent hover:text-primary-forest uppercase font-bold text-left mt-1.5 flex items-center gap-1 w-fit cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Adicionar Aula/Quiz a este Módulo
                        </button>
                      ) : (
                        /* CLASS & QUIZ SUB-BUILDER FORM */
                        <div className="bg-surface p-4 rounded-xl border border-primary-accent/30 mt-3 flex flex-col gap-4">
                          <div className="flex justify-between items-center border-b border-border-color pb-2">
                            <span className="text-[9px] uppercase tracking-widest text-primary-accent font-bold font-mono">Nova Aula ou Quiz</span>
                            <button 
                              type="button" 
                              onClick={() => setActiveModuleForClass(null)} 
                              className="text-[10px] text-secondary-text hover:text-primary-forest font-mono cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] uppercase text-secondary-text font-mono font-bold">Título da Aula</label>
                              <input
                                type="text"
                                value={newClassTitle}
                                onChange={(e) => setNewClassTitle(e.target.value)}
                                placeholder="Ex: Farmacocinética da Anandamida"
                                className="px-3 py-1.5 rounded bg-[#F7F3EC] text-xs text-primary-text border border-border-color focus:outline-none focus:border-primary-accent"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] uppercase text-secondary-text font-mono font-bold">Duração (Ex: 12 min)</label>
                              <input
                                type="text"
                                value={newClassDuration}
                                onChange={(e) => setNewClassDuration(e.target.value)}
                                className="px-3 py-1.5 rounded bg-[#F7F3EC] text-xs text-primary-text border border-border-color focus:outline-none focus:border-primary-accent"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] uppercase text-secondary-text font-mono font-bold">Tipo da Matéria</label>
                              <select
                                value={newClassType}
                                onChange={(e) => setNewClassType(e.target.value as any)}
                                className="px-3 py-1.5 rounded bg-[#F7F3EC] text-xs text-primary-text border border-border-color focus:outline-none focus:border-primary-accent font-mono"
                              >
                                <option value="video">Vídeo Aula</option>
                                <option value="quiz">Quiz de Fixação</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase text-secondary-text font-mono font-bold">Sumário Descritivo</label>
                            <input
                              type="text"
                              value={newClassSummary}
                              onChange={(e) => setNewClassSummary(e.target.value)}
                              placeholder="Breve ementa científica da aula ou contextualização do quiz..."
                              className="px-3 py-1.5 rounded bg-[#F7F3EC] text-xs text-primary-text border border-border-color focus:outline-none focus:border-primary-accent"
                            />
                          </div>

                          {/* IF QUIZ SELECTED, SHOW QUESTIONS CREATOR */}
                          {newClassType === 'quiz' && (
                            <div className="p-3 bg-secondary-surface rounded-lg border border-border-color flex flex-col gap-3">
                              <span className="text-[8px] uppercase tracking-wider text-primary-accent font-bold font-mono">Configuração do Quiz</span>
                              
                              <div className="flex flex-col gap-1">
                                <label className="text-[8px] uppercase text-secondary-text font-mono">Pergunta Principal</label>
                                <input
                                  type="text"
                                  value={newQuizQuestion}
                                  onChange={(e) => setNewQuizQuestion(e.target.value)}
                                  placeholder="Ex: Qual o principal endocanabinoide ativado no cacau puro?"
                                  className="px-2.5 py-1.5 rounded bg-surface text-xs text-primary-text border border-border-color focus:outline-none focus:border-primary-accent"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <div className="flex flex-col gap-1">
                                  <label className="text-[8px] uppercase text-secondary-text font-mono">Alternativa A</label>
                                  <input
                                    type="text"
                                    value={newQuizOptA}
                                    onChange={(e) => setNewQuizOptA(e.target.value)}
                                    placeholder="Opção A"
                                    className="px-2.5 py-1.5 rounded bg-surface text-xs text-primary-text border border-border-color focus:outline-none focus:border-primary-accent"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[8px] uppercase text-secondary-text font-mono">Alternativa B</label>
                                  <input
                                    type="text"
                                    value={newQuizOptB}
                                    onChange={(e) => setNewQuizOptB(e.target.value)}
                                    placeholder="Opção B"
                                    className="px-2.5 py-1.5 rounded bg-surface text-xs text-primary-text border border-border-color focus:outline-none focus:border-primary-accent"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[8px] uppercase text-secondary-text font-mono">Alternativa C</label>
                                  <input
                                    type="text"
                                    value={newQuizOptC}
                                    onChange={(e) => setNewQuizOptC(e.target.value)}
                                    placeholder="Opção C"
                                    className="px-2.5 py-1.5 rounded bg-surface text-xs text-primary-text border border-border-color focus:outline-none focus:border-primary-accent"
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col gap-1 max-w-[200px]">
                                <label className="text-[8px] uppercase text-secondary-text font-mono">Alternativa Correta</label>
                                <select
                                  value={newQuizCorrect}
                                  onChange={(e) => setNewQuizCorrect(e.target.value as any)}
                                  className="px-2 py-1.5 rounded bg-surface text-xs text-primary-text border border-border-color focus:outline-none focus:border-primary-accent font-mono"
                                >
                                  <option value="a">Alternativa A</option>
                                  <option value="b">Alternativa B</option>
                                  <option value="c">Alternativa C</option>
                                </select>
                              </div>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => handleAddClass(mod.id)}
                            className="w-full py-2 bg-primary-accent/15 text-primary-accent border border-primary-accent/30 hover:bg-primary-accent hover:text-white transition-all text-[10px] tracking-widest uppercase font-mono font-bold rounded-lg cursor-pointer"
                          >
                            Gravar Aula no Módulo
                          </button>
                        </div>
                      )}

                    </div>

                  </div>
                ))}
              </div>

              {/* Module Creator Box */}
              <div className="bg-secondary-surface p-5 rounded-xl border border-border-color flex flex-col gap-4 mt-2">
                <span className="text-[9px] uppercase tracking-widest text-primary-accent font-bold font-mono">Criar Novo Módulo de Aulas</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase text-secondary-text font-mono">Nome do Módulo</label>
                    <input
                      type="text"
                      value={newModuleTitle}
                      onChange={(e) => setNewModuleTitle(e.target.value)}
                      placeholder="Ex: Módulo 01: Fitoativos Primários"
                      className="px-4 py-2 rounded bg-surface text-xs text-primary-text border border-border-color focus:outline-none focus:border-primary-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase text-secondary-text font-mono">Contextualização Curta</label>
                    <input
                      type="text"
                      value={newModuleDesc}
                      onChange={(e) => setNewModuleDesc(e.target.value)}
                      placeholder="Ex: Entendimento das moléculas chaves e estimulação neural"
                      className="px-4 py-2 rounded bg-surface text-xs text-primary-text border border-border-color focus:outline-none focus:border-primary-accent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono select-none">
                    <input
                      type="checkbox"
                      checked={newModuleLocked}
                      onChange={(e) => setNewModuleLocked(e.target.checked)}
                      className="rounded border-border-color bg-surface text-primary-accent focus:ring-primary-accent"
                    />
                    <span className="text-primary-text">Iniciar módulo como BLOQUEADO</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleAddModule}
                    className="px-4 py-2 bg-surface border border-border-color text-primary-forest hover:bg-primary-accent hover:text-white rounded-lg text-[9px] uppercase tracking-widest font-mono font-bold transition-all cursor-pointer"
                  >
                    Salvar Módulo
                  </button>
                </div>
              </div>

            </div>

            <button
              id="submit-new-course-btn"
              type="submit"
              className="w-full py-3 bg-primary-forest hover:bg-primary-forest/90 text-white font-sans font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-wider cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              gravar e publicar curso completo
            </button>
          </form>
        </div>

        {/* PANEL RIGHT: INTEGRATE NEW PRODUCT (4 Cols) */}
        <div className="lg:col-span-4 bg-surface border border-border-color rounded-2xl p-6 md:p-8 flex flex-col gap-5 shadow-sm">
          <div className="flex items-center gap-2 border-b border-border-color pb-3">
            <Sprout className="w-4.5 h-4.5 text-primary-accent" />
            <h3 className="text-xl font-bold text-primary-forest">Integrar Produto</h3>
          </div>

          <form onSubmit={handleCreateProduct} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Nome Oficial do Produto</label>
              <input
                type="text"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                required
                placeholder="Ex: Gotas de Será Cacau | 1kg"
                className="w-full px-4 py-2 rounded-lg border border-border-color focus:border-primary-accent focus:outline-none bg-[#F7F3EC] text-xs text-primary-text"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Preço Estimado</label>
                <input
                  type="text"
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  required
                  placeholder="Ex: 220,00"
                  className="w-full px-4 py-2 rounded-lg border border-border-color focus:border-primary-accent focus:outline-none bg-[#F7F3EC] text-xs text-primary-text"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Linha da Marca</label>
                <select
                  value={prodLine}
                  onChange={(e) => setProdLine(e.target.value as any)}
                  className="w-full px-4 py-2 rounded-lg border border-border-color focus:border-primary-accent focus:outline-none bg-[#F7F3EC] text-xs text-primary-text font-mono"
                >
                  <option value="Cacau Ritual">Cacau Ritual</option>
                  <option value="Ervas Ritual">Ervas Ritual</option>
                  <option value="Terra Ritual">Terra Ritual</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Slogan (Tagline)</label>
              <input
                type="text"
                value={prodTagline}
                onChange={(e) => setProdTagline(e.target.value)}
                required
                placeholder="Ex: Abastecimento de alto rendimento para consultórios."
                className="w-full px-4 py-2 rounded-lg border border-border-color focus:border-primary-accent focus:outline-none bg-[#F7F3EC] text-xs text-primary-text"
              />
            </div>

            <button
              id="submit-new-product-btn"
              type="submit"
              className="w-full py-2.5 bg-primary-forest hover:bg-primary-forest/90 text-white rounded-lg font-sans font-semibold transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-wider cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              gravar produto
            </button>
          </form>
        </div>

      </div>

      {/* 3. COLLAPSIBLE ACCORDION: CURSOS PUBLICADOS & MODULES MANAGEMENT */}
      <section className="bg-surface border border-border-color rounded-2xl p-6 md:p-8 flex flex-col gap-5 shadow-sm">
        <div className="flex justify-between items-center border-b border-border-color pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary-accent" />
            <h3 className="text-xl font-bold text-primary-forest">Treinamentos Ativos & Controle de Módulos</h3>
          </div>
          <span className="text-[9px] tracking-widest uppercase text-primary-accent font-bold font-mono">gestão de acessos</span>
        </div>

        <div className="flex flex-col gap-4">
          {courses.map((course) => {
            const isAccordionOpen = openCourseAccordionId === course.id;

            return (
              <div key={course.id} className="border border-border-color rounded-xl overflow-hidden bg-[#F7F3EC]/50">
                {/* Accordion header button */}
                <button
                  type="button"
                  onClick={() => setOpenCourseAccordionId(isAccordionOpen ? null : course.id)}
                  className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-secondary-surface text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img src={course.coverImage} className="w-10 h-10 object-cover rounded bg-white/10 shrink-0" alt={course.title} referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="text-sm font-bold text-primary-forest">{course.title}</h4>
                      <p className="text-[10px] text-secondary-text tracking-wider uppercase font-mono mt-0.5">
                        {course.category} • {course.instructor} • {course.modules.length} Módulos
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-primary-accent transition-transform ${isAccordionOpen ? 'rotate-90' : ''}`} />
                </button>

                {/* Collapsible Body */}
                {isAccordionOpen && (
                  <div className="p-4 bg-white/55 border-t border-border-color flex flex-col gap-4 animate-in fade-in duration-200">
                    <span className="text-[9px] uppercase tracking-widest text-primary-accent font-bold font-mono">Gerenciamento de Módulos (Chave de Bloqueio)</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.modules.map((mod, index) => {
                        return (
                          <div key={mod.id} className="p-3.5 bg-secondary-surface border border-border-color rounded-lg flex items-center justify-between">
                            <div className="min-w-0 pr-3">
                              <span className="text-[9px] text-secondary-text font-mono">MÓDULO {index + 1}</span>
                              <h5 className="text-xs font-bold text-primary-forest truncate">{mod.title}</h5>
                              <span className="text-[9px] text-secondary-text/80 block mt-0.5">{mod.classes?.length || 0} aulas cadastradas</span>
                            </div>

                            {/* Lock Toggle switches */}
                            <button
                              type="button"
                              onClick={() => handleToggleModuleLock(course.id, mod.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] tracking-widest font-mono uppercase font-bold transition-all cursor-pointer ${
                                mod.locked
                                  ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                                  : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                              }`}
                              title={mod.locked ? "Desbloquear módulo para estudantes" : "Bloquear módulo para estudantes"}
                            >
                              {mod.locked ? (
                                <>
                                  <Lock className="w-3.5 h-3.5" />
                                  <span>Bloqueado</span>
                                </>
                              ) : (
                                <>
                                  <Unlock className="w-3.5 h-3.5" />
                                  <span>Liberado</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CRM Partners & Matrix Enrollments Directory */}
      <section className="bg-surface border border-border-color rounded-2xl p-6 md:p-8 flex flex-col gap-5 shadow-sm">
        <div className="flex justify-between items-center border-b border-border-color pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-accent" />
            <h3 className="text-xl font-bold text-primary-forest">Membros, Rankings & Bonificações</h3>
          </div>
          <span className="text-[10px] tracking-widest uppercase text-primary-accent font-bold font-mono">crm ativo</span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: Registered list table (8/12) */}
          <div className="lg:col-span-8 overflow-x-auto">
            <table className="w-full text-left text-xs text-secondary-text">
              <thead>
                <tr className="border-b border-border-color text-secondary-text/80 font-bold uppercase text-[9px] tracking-wider font-mono">
                  <th className="py-3 px-4">Nome Profissional</th>
                  <th className="py-3 px-4">Pontos / Nível</th>
                  <th className="py-3 px-4">Registro (CRN)</th>
                  <th className="py-3 px-4">Cidade / UF</th>
                  <th className="py-3 px-4">Matrículas</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-border-color hover:bg-secondary-surface transition-colors">
                    <td className="py-3.5 px-4 font-bold text-primary-forest">
                      <div className="flex flex-col">
                        <span>{member.name}</span>
                        <span className="text-[9px] text-secondary-text/60 font-mono font-normal uppercase mt-0.5">{member.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-primary-accent">{member.totalPoints || 0} pts</span>
                        <span className="text-[9px] text-luxury-accent font-bold uppercase tracking-wider font-mono mt-0.5">{member.tier || 'Bronze'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-primary-accent">{member.crn}</td>
                    <td className="py-3.5 px-4">{member.city} - {member.state}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {member.enrolledCourseIds.length === 0 ? (
                          <span className="text-[9px] font-mono text-secondary-text/40 italic">Sem matrículas</span>
                        ) : (
                          member.enrolledCourseIds.map(courseId => {
                            const course = courses.find(c => c.id === courseId);
                            return (
                              <span 
                                key={courseId}
                                className="text-[8px] bg-primary-accent/15 border border-primary-accent/30 text-primary-accent px-2 py-0.5 rounded font-sans font-medium uppercase tracking-wider"
                                title={course?.title}
                              >
                                {course ? course.title.substring(0, 15) + '...' : courseId}
                              </span>
                            );
                          })
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Gerenciar permissões de matrícula para Dra. ${member.name.split(' ').slice(1).join(' ')} (CRN: ${member.crn}).`)}
                        className="text-[9px] uppercase font-bold tracking-widest text-primary-accent hover:text-primary-forest transition-colors font-mono cursor-pointer"
                      >
                        Editar Matrícula
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* COLUMN 2: Lançar Pontos Form (4/12) */}
          <div className="lg:col-span-4 bg-[#F7F3EC]/70 border border-border-color rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-1.5 border-b border-border-color pb-2">
              <PlusCircle className="w-4 h-4 text-primary-accent" />
              <h4 className="text-sm font-bold text-primary-forest uppercase tracking-wider font-mono">Lançar Pontos</h4>
            </div>

            <form onSubmit={handleLaunchPoints} className="flex flex-col gap-3.5">
              
              {/* Select Nutricionista */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-widest uppercase text-secondary-text font-bold font-mono">Selecionar Nutricionista</label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-border-color bg-surface text-xs text-primary-text focus:outline-none focus:border-primary-accent"
                  required
                >
                  <option value="" disabled>Selecione uma profissional</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.crn})
                    </option>
                  ))}
                </select>
              </div>

              {/* Points field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-widest uppercase text-secondary-text font-bold font-mono">Valor dos Pontos</label>
                <input
                  type="number"
                  placeholder="Ex: 150"
                  value={launchPoints}
                  onChange={(e) => setLaunchPoints(e.target.value)}
                  required
                  min="1"
                  className="w-full px-3 py-2 rounded border border-border-color bg-surface text-xs text-primary-text focus:outline-none focus:border-primary-accent"
                />
              </div>

              {/* Reason field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-widest uppercase text-secondary-text font-bold font-mono">Motivo da Bonificação</label>
                <input
                  type="text"
                  placeholder="Ex: Prescrição de Gotas 210g"
                  value={launchReason}
                  onChange={(e) => setLaunchReason(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded border border-border-color bg-surface text-xs text-primary-text focus:outline-none focus:border-primary-accent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary-forest hover:bg-primary-forest/95 text-white rounded font-mono text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer shadow-sm mt-1"
              >
                + Lançar Pontos
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};
