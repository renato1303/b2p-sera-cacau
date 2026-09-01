/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Course, CourseModule, CourseClass, CourseVisibility } from '../../types';
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Video, 
  HelpCircle, 
  Lock, 
  Unlock, 
  Eye, 
  Sparkles, 
  Layers, 
  Clock, 
  BookOpen, 
  FileText,
  ChevronDown,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface AdminCoursesProps {
  courses: Course[];
  onAddCourse: (course: Course) => void;
  onUpdateCourse: (course: Course) => void;
  onDeleteCourse?: (courseId: string) => void;
}

export const AdminCourses: React.FC<AdminCoursesProps> = ({
  courses,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse
}) => {
  // Mode: 'list' | 'create-course' | 'manage-existing'
  const [viewMode, setViewMode] = useState<'list' | 'create-course'>('list');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'Treinamento' | 'História' | 'Nutrição' | 'Negócios'>('Nutrição');
  const [newInstructor, setNewInstructor] = useState('Luna Azevedo');
  const [newDuration, setNewDuration] = useState('2h 30m');
  const [newCover, setNewCover] = useState('https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800');
  const [newVisibility, setNewVisibility] = useState<CourseVisibility>('Somente Logadas');
  const [newCertEnabled, setNewCertEnabled] = useState(true);
  const [newCommEnabled, setNewCommEnabled] = useState(true);
  
  // Temporary Modules for Course Builder
  const [tempModules, setTempModules] = useState<CourseModule[]>([
    {
      id: `mod-init-1`,
      title: 'Módulo 1: Fundamentos Botânicos e Fitoquímica do Cacau',
      description: 'Apresentação integral da matriz polifenólica e teobromina.',
      locked: false,
      classes: [
        {
          id: `cls-init-1`,
          title: 'Aula Inaugural: Da Amêndoa ao Perfil Farmacológico',
          duration: '18 min',
          type: 'video',
          summary: 'Visão panorâmica da extração e preservação dos flavonoides.',
          videoUrl: 'https://player.vimeo.com/video/76979871'
        }
      ]
    }
  ]);

  // Active module inside course creation for adding classes
  const [activeTempModuleId, setActiveTempModuleId] = useState<string>('mod-init-1');

  // Input states for adding new module/class to temp course
  const [modTitle, setModTitle] = useState('');
  const [modDesc, setModDesc] = useState('');
  const [modLocked, setModLocked] = useState(false);

  const [clsTitle, setClsTitle] = useState('');
  const [clsDuration, setClsDuration] = useState('15 min');
  const [clsType, setClsType] = useState<'video' | 'quiz'>('video');
  const [clsSummary, setClsSummary] = useState('');
  const [clsVideoUrl, setClsVideoUrl] = useState('');
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptA, setQuizOptA] = useState('');
  const [quizOptB, setQuizOptB] = useState('');
  const [quizOptC, setQuizOptC] = useState('');
  const [quizCorrect, setQuizCorrect] = useState('a');

  // Modal / Inputs for adding module or class to EXISTING course
  const [existingModTitle, setExistingModTitle] = useState('');
  const [existingModDesc, setExistingModDesc] = useState('');
  const [existingModLocked, setExistingModLocked] = useState(false);
  const [activeExistingModId, setActiveExistingModId] = useState<string | null>(null);

  const [existingClsTitle, setExistingClsTitle] = useState('');
  const [existingClsDuration, setExistingClsDuration] = useState('15 min');
  const [existingClsType, setExistingClsType] = useState<'video' | 'quiz'>('video');
  const [existingClsSummary, setExistingClsSummary] = useState('');
  const [existingClsVideoUrl, setExistingClsVideoUrl] = useState('');
  const [existingQuizQuestion, setExistingQuizQuestion] = useState('');
  const [existingQuizOptA, setExistingQuizOptA] = useState('');
  const [existingQuizOptB, setExistingQuizOptB] = useState('');
  const [existingQuizOptC, setExistingQuizOptC] = useState('');
  const [existingQuizCorrect, setExistingQuizCorrect] = useState('a');

  const [successMessage, setSuccessMessage] = useState('');

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  // Handler: Add Temp Module
  const handleAddTempModule = () => {
    if (!modTitle.trim()) return;
    const newMod: CourseModule = {
      id: `mod-${Date.now()}`,
      title: modTitle.trim(),
      description: modDesc.trim() || 'Descrição do módulo de capacitação.',
      locked: modLocked,
      classes: []
    };
    setTempModules(prev => [...prev, newMod]);
    setActiveTempModuleId(newMod.id);
    setModTitle('');
    setModDesc('');
    setModLocked(false);
    triggerSuccess('Módulo adicionado à estrutura do curso!');
  };

  // Handler: Add Temp Class
  const handleAddTempClass = (modId: string) => {
    if (!clsTitle.trim()) return;

    const newClass: CourseClass = {
      id: `cls-${Date.now()}`,
      title: clsTitle.trim(),
      duration: clsDuration.trim() || '15 min',
      type: clsType,
      summary: clsSummary.trim() || 'Resumo cognitivo da aula.',
      videoUrl: clsType === 'video' ? (clsVideoUrl.trim() || 'https://player.vimeo.com/video/76979871') : ''
    };

    if (clsType === 'quiz') {
      newClass.quiz = {
        id: `quiz-${Date.now()}`,
        question: quizQuestion.trim() || 'Qual o principal benefício dos polifenóis do cacau?',
        options: [
          { id: 'a', text: quizOptA.trim() || 'Aumento do óxido nítrico e biodisponibilidade endotelial' },
          { id: 'b', text: quizOptB.trim() || 'Inibição imediata da glicemia basal' },
          { id: 'c', text: quizOptC.trim() || 'Aceleração do cortisol plasmático' }
        ],
        correctOptionId: quizCorrect
      };
    }

    setTempModules(prev => prev.map(m => {
      if (m.id === modId) {
        return { ...m, classes: [...m.classes, newClass] };
      }
      return m;
    }));

    // Reset class form
    setClsTitle('');
    setClsDuration('15 min');
    setClsSummary('');
    setClsVideoUrl('');
    setQuizQuestion('');
    setQuizOptA('');
    setQuizOptB('');
    setQuizOptC('');
    setQuizCorrect('a');
    triggerSuccess('Aula adicionada ao módulo com sucesso!');
  };

  // Handler: Submit New Course
  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Por favor, informe o título do curso.');
      return;
    }

    const course: Course = {
      id: `c-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Curso de capacitação técnica em cacau funcional.',
      category: newCategory,
      instructor: newInstructor.trim() || 'Luna Azevedo',
      duration: newDuration.trim() || '2h 00m',
      coverImage: newCover.trim() || 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800',
      visibility: newVisibility,
      certificateEnabled: newCertEnabled,
      communityEnabled: newCommEnabled,
      modules: tempModules.length > 0 ? tempModules : [
        {
          id: `mod-${Date.now()}`,
          title: 'Módulo 1: Introdução Geral',
          description: 'Fundamentos essenciais.',
          classes: []
        }
      ]
    };

    onAddCourse(course);
    triggerSuccess(`Curso "${course.title}" publicado com sucesso!`);
    
    // Reset and return to list
    setNewTitle('');
    setNewDesc('');
    setViewMode('list');
  };

  // Handler: Add Module to Existing Course
  const handleAddModuleToExisting = (courseId: string) => {
    if (!existingModTitle.trim()) return;
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const newMod: CourseModule = {
      id: `mod-${Date.now()}`,
      title: existingModTitle.trim(),
      description: existingModDesc.trim() || 'Descrição do módulo.',
      locked: existingModLocked,
      classes: []
    };

    const updatedCourse: Course = {
      ...course,
      modules: [...course.modules, newMod]
    };

    onUpdateCourse(updatedCourse);
    setExistingModTitle('');
    setExistingModDesc('');
    setExistingModLocked(false);
    setActiveExistingModId(newMod.id);
    triggerSuccess('Novo módulo adicionado ao curso existente!');
  };

  // Handler: Add Class to Existing Course Module
  const handleAddClassToExisting = (courseId: string, modId: string) => {
    if (!existingClsTitle.trim()) return;
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const newClass: CourseClass = {
      id: `cls-${Date.now()}`,
      title: existingClsTitle.trim(),
      duration: existingClsDuration.trim() || '15 min',
      type: existingClsType,
      summary: existingClsSummary.trim() || 'Resumo cognitivo da aula.',
      videoUrl: existingClsType === 'video' ? (existingClsVideoUrl.trim() || 'https://player.vimeo.com/video/76979871') : ''
    };

    if (existingClsType === 'quiz') {
      newClass.quiz = {
        id: `quiz-${Date.now()}`,
        question: existingQuizQuestion.trim() || 'Pergunta de Fixação Cognitiva',
        options: [
          { id: 'a', text: existingQuizOptA.trim() || 'Alternativa A' },
          { id: 'b', text: existingQuizOptB.trim() || 'Alternativa B' },
          { id: 'c', text: existingQuizOptC.trim() || 'Alternativa C' }
        ],
        correctOptionId: existingQuizCorrect
      };
    }

    const updatedModules = course.modules.map(mod => {
      if (mod.id === modId) {
        return {
          ...mod,
          classes: [...mod.classes, newClass]
        };
      }
      return mod;
    });

    const updatedCourse: Course = {
      ...course,
      modules: updatedModules
    };

    onUpdateCourse(updatedCourse);
    setExistingClsTitle('');
    setExistingClsDuration('15 min');
    setExistingClsSummary('');
    setExistingClsVideoUrl('');
    setExistingQuizQuestion('');
    setExistingQuizOptA('');
    setExistingQuizOptB('');
    setExistingQuizOptC('');
    triggerSuccess('Nova aula adicionada ao módulo existente!');
  };

  // Handler: Toggle Lock Module
  const handleToggleLockModule = (courseId: string, modId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const updatedModules = course.modules.map(mod => {
      if (mod.id === modId) {
        return { ...mod, locked: !mod.locked };
      }
      return mod;
    });

    onUpdateCourse({ ...course, modules: updatedModules });
    triggerSuccess('Status de bloqueio do módulo atualizado!');
  };

  // Handler: Delete Class
  const handleDeleteClass = (courseId: string, modId: string, clsId: string) => {
    if (!confirm('Deseja realmente remover esta aula?')) return;
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const updatedModules = course.modules.map(mod => {
      if (mod.id === modId) {
        return { ...mod, classes: mod.classes.filter(c => c.id !== clsId) };
      }
      return mod;
    });

    onUpdateCourse({ ...course, modules: updatedModules });
    triggerSuccess('Aula removida com sucesso!');
  };

  // Handler: Delete Module
  const handleDeleteModule = (courseId: string, modId: string) => {
    if (!confirm('Deseja realmente remover este módulo e todas as suas aulas?')) return;
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const updatedModules = course.modules.filter(mod => mod.id !== modId);
    onUpdateCourse({ ...course, modules: updatedModules });
    triggerSuccess('Módulo removido com sucesso!');
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 shadow-md animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#2E4030]/10 shadow-sm">
        <div>
          <h2 className="text-xl font-serif text-primary-forest">Gestão de Cursos & Módulos (LMS)</h2>
          <p className="text-xs text-[#526054] mt-0.5">
            Crie novos treinamentos, estruture módulos interativos e adicione aulas em vídeo ou quizzes avaliativos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {viewMode === 'create-course' ? (
            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2.5 rounded-xl bg-[#F2EDE4] hover:bg-[#E8E1D5] text-primary-forest text-xs font-bold transition-all cursor-pointer"
            >
              Voltar para Catálogo de Cursos
            </button>
          ) : (
            <button
              onClick={() => setViewMode('create-course')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-forest hover:bg-primary-forest/90 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 text-secondary-accent" />
              <span>Criar Novo Curso</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE: CREATE NEW COURSE                                              */}
      {/* ========================================================================= */}
      {viewMode === 'create-course' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2E4030]/10 shadow-xl space-y-8 animate-fadeIn">
          <div className="border-b border-[#2E4030]/10 pb-4">
            <span className="text-[11px] font-mono font-bold tracking-widest text-primary-accent uppercase block">
              Construtor de Cursos
            </span>
            <h3 className="text-2xl font-serif text-primary-forest mt-1">
              Cadastrar Novo Curso & Estruturar Módulos
            </h3>
          </div>

          <form onSubmit={handleCreateCourseSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Título do Curso *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Ex: Farmacologia do Cacau & Prescrição Clínica"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Instrutora / Especialista</label>
                <input
                  type="text"
                  value={newInstructor}
                  onChange={e => setNewInstructor(e.target.value)}
                  placeholder="Ex: Luna Azevedo, Dani..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Categoria</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm text-primary-text focus:outline-none focus:border-primary-forest"
                >
                  <option value="Nutrição">Nutrição Clínica & Funcional</option>
                  <option value="Treinamento">Treinamento & Produtos</option>
                  <option value="História">História & Terroir Cabruca</option>
                  <option value="Negócios">Negócios & Prescrição em Consultório</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Carga Horária Estimada</label>
                <input
                  type="text"
                  value={newDuration}
                  onChange={e => setNewDuration(e.target.value)}
                  placeholder="Ex: 3h 15m"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">URL da Imagem de Capa</label>
                <input
                  type="text"
                  value={newCover}
                  onChange={e => setNewCover(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Descrição do Curso</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Explique o objetivo deste curso para as nutricionistas credenciadas..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm text-primary-text focus:outline-none focus:border-primary-forest resize-none"
                />
              </div>
            </div>

            {/* Modules Builder Section */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#2E4030]/15 space-y-6">
              <div className="flex items-center justify-between border-b border-[#2E4030]/10 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary-accent" />
                  <h4 className="text-sm font-bold text-primary-forest">
                    Módulos e Aulas deste Curso ({tempModules.length})
                  </h4>
                </div>
                <span className="text-xs text-[#6A786C]">Estruture antes de publicar</span>
              </div>

              {/* Module Addition Inputs */}
              <div className="bg-white p-4 rounded-xl border border-[#2E4030]/10 space-y-3">
                <span className="text-xs font-bold text-primary-forest block">Adicionar Novo Módulo</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={modTitle}
                    onChange={e => setModTitle(e.target.value)}
                    placeholder="Título do Módulo..."
                    className="sm:col-span-2 px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#2E4030]/15 focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] text-[#4A554B] flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={modLocked}
                        onChange={e => setModLocked(e.target.checked)}
                        className="rounded"
                      />
                      <span>Bloqueado (Upsell)</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAddTempModule}
                      className="px-3 py-2 rounded-lg bg-primary-forest text-white text-xs font-bold hover:bg-primary-forest/90 transition-all ml-auto"
                    >
                      + Módulo
                    </button>
                  </div>
                </div>
              </div>

              {/* Temp Modules List with Class Addition */}
              <div className="space-y-4">
                {tempModules.map((mod, idx) => (
                  <div key={mod.id} className="bg-white p-4 rounded-xl border border-[#2E4030]/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary-forest text-white text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-primary-forest">{mod.title}</span>
                        {mod.locked && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Bloqueado
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setTempModules(prev => prev.filter(m => m.id !== mod.id))}
                        className="text-red-500 hover:text-red-700 p-1 text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Classes in this module */}
                    <div className="pl-6 space-y-1.5 border-l-2 border-primary-forest/20">
                      {mod.classes.map(cls => (
                        <div key={cls.id} className="flex items-center justify-between p-2 rounded-lg bg-[#FAF7F2] text-xs">
                          <div className="flex items-center gap-2">
                            {cls.type === 'video' ? (
                              <Video className="w-3.5 h-3.5 text-primary-accent" />
                            ) : (
                              <HelpCircle className="w-3.5 h-3.5 text-secondary-accent" />
                            )}
                            <span className="font-semibold text-primary-forest">{cls.title}</span>
                            <span className="text-[10px] text-[#6A786C]">({cls.duration})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setTempModules(prev => prev.map(m => m.id === mod.id ? { ...m, classes: m.classes.filter(c => c.id !== cls.id) } : m))}
                            className="text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      {/* Add class trigger inside this module */}
                      {activeTempModuleId === mod.id ? (
                        <div className="p-3 bg-[#FAF7F2] rounded-xl border border-dashed border-[#2E4030]/20 space-y-3 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-primary-forest">Adicionar Aula ao Módulo {idx + 1}</span>
                            <div className="flex items-center gap-2">
                              <label className="text-[10px] flex items-center gap-1 font-semibold">
                                <input
                                  type="radio"
                                  name={`type-${mod.id}`}
                                  checked={clsType === 'video'}
                                  onChange={() => setClsType('video')}
                                />
                                <span>Vídeo</span>
                              </label>
                              <label className="text-[10px] flex items-center gap-1 font-semibold">
                                <input
                                  type="radio"
                                  name={`type-${mod.id}`}
                                  checked={clsType === 'quiz'}
                                  onChange={() => setClsType('quiz')}
                                />
                                <span>Quiz Cognitivo</span>
                              </label>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={clsTitle}
                              onChange={e => setClsTitle(e.target.value)}
                              placeholder="Título da Aula..."
                              className="px-3 py-1.5 text-xs rounded-lg bg-white border border-[#2E4030]/15"
                            />
                            <input
                              type="text"
                              value={clsDuration}
                              onChange={e => setClsDuration(e.target.value)}
                              placeholder="Duração (ex: 18 min)..."
                              className="px-3 py-1.5 text-xs rounded-lg bg-white border border-[#2E4030]/15"
                            />
                          </div>

                          {clsType === 'video' ? (
                            <input
                              type="text"
                              value={clsVideoUrl}
                              onChange={e => setClsVideoUrl(e.target.value)}
                              placeholder="URL do Vídeo (Vimeo ou MP4)..."
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-white border border-[#2E4030]/15"
                            />
                          ) : (
                            <div className="space-y-2 p-2 bg-white rounded-lg border border-[#2E4030]/10">
                              <input
                                type="text"
                                value={quizQuestion}
                                onChange={e => setQuizQuestion(e.target.value)}
                                placeholder="Pergunta do Quiz..."
                                className="w-full px-2 py-1 text-xs rounded border border-[#2E4030]/15"
                              />
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <input
                                  type="text"
                                  value={quizOptA}
                                  onChange={e => setQuizOptA(e.target.value)}
                                  placeholder="Alternativa A..."
                                  className="px-2 py-1 text-xs rounded border"
                                />
                                <input
                                  type="text"
                                  value={quizOptB}
                                  onChange={e => setQuizOptB(e.target.value)}
                                  placeholder="Alternativa B..."
                                  className="px-2 py-1 text-xs rounded border"
                                />
                                <input
                                  type="text"
                                  value={quizOptC}
                                  onChange={e => setQuizOptC(e.target.value)}
                                  placeholder="Alternativa C..."
                                  className="px-2 py-1 text-xs rounded border"
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleAddTempClass(mod.id)}
                              className="px-3 py-1.5 rounded-lg bg-primary-forest text-white text-xs font-bold hover:bg-primary-forest/90"
                            >
                              Salvar Aula no Módulo
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveTempModuleId(mod.id)}
                          className="text-[11px] text-primary-accent hover:underline font-semibold flex items-center gap-1 mt-1"
                        >
                          <Plus className="w-3 h-3" /> Adicionar aula neste módulo
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#2E4030]/10">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#4A554B] hover:bg-[#F2EDE4]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-forest hover:bg-primary-forest/90 text-white text-xs font-bold shadow-lg transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-secondary-accent" />
                <span>Publicar Curso na Academia</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE: COURSES CATALOG & MANAGEMENT                                  */}
      {/* ========================================================================= */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Courses List Left Column */}
            <div className="lg:col-span-1 space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest text-primary-accent uppercase block">
                Cursos Cadastrados ({courses.length})
              </span>
              <div className="space-y-2">
                {courses.map(course => {
                  const isSelected = selectedCourseId === course.id;
                  const totalClasses = course.modules.reduce((acc, m) => acc + m.classes.length, 0);

                  return (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourseId(course.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary-forest text-white border-primary-forest shadow-md'
                          : 'bg-white hover:bg-[#FAF7F2] text-primary-forest border-[#2E4030]/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#EDE7DC] text-[#4A554B]'
                        }`}>
                          {course.category}
                        </span>
                        <span className={`text-[10px] ${isSelected ? 'text-[#C2C9C0]' : 'text-[#6A786C]'}`}>
                          {course.duration}
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold mt-2 line-clamp-1 ${isSelected ? 'text-white' : 'text-primary-forest'}`}>
                        {course.title}
                      </h4>
                      <p className={`text-xs mt-1 line-clamp-1 ${isSelected ? 'text-[#C2C9C0]' : 'text-[#6A786C]'}`}>
                        {course.modules.length} módulos · {totalClasses} aulas · Por {course.instructor}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Course Modules & Classes Detail Right Column */}
            <div className="lg:col-span-2">
              {selectedCourse ? (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#2E4030]/10 shadow-lg space-y-6 animate-fadeIn">
                  {/* Selected Course Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2E4030]/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary-accent block">
                        Gerenciador do Curso Selecionado
                      </span>
                      <h3 className="text-xl font-serif text-primary-forest mt-0.5">{selectedCourse.title}</h3>
                      <p className="text-xs text-[#526054]">
                        Instrutora: <span className="font-semibold">{selectedCourse.instructor}</span> · Categoria: {selectedCourse.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1.5 rounded-xl bg-[#FAF7F2] font-semibold text-primary-forest border border-[#2E4030]/10">
                        {selectedCourse.modules.length} Módulos
                      </span>
                    </div>
                  </div>

                  {/* Add New Module to this Existing Course */}
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#2E4030]/15 space-y-3">
                    <span className="text-xs font-bold text-primary-forest flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-primary-accent" />
                      Adicionar Novo Módulo a este Curso
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={existingModTitle}
                        onChange={e => setExistingModTitle(e.target.value)}
                        placeholder="Nome do novo módulo..."
                        className="sm:col-span-2 px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15 focus:outline-none"
                      />
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] text-[#4A554B] flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={existingModLocked}
                            onChange={e => setExistingModLocked(e.target.checked)}
                          />
                          <span>Bloqueado</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddModuleToExisting(selectedCourse.id)}
                          className="px-3.5 py-2 rounded-xl bg-primary-forest text-white text-xs font-bold hover:bg-primary-forest/90 transition-all ml-auto cursor-pointer"
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Existing Modules Accordion/List */}
                  <div className="space-y-4">
                    {selectedCourse.modules.map((mod, modIdx) => (
                      <div key={mod.id} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#2E4030]/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary-forest text-white text-xs font-bold flex items-center justify-center">
                              {modIdx + 1}
                            </span>
                            <span className="text-sm font-bold text-primary-forest">{mod.title}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleLockModule(selectedCourse.id, mod.id)}
                              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                                mod.locked
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                              title={mod.locked ? 'Módulo Bloqueado para Upsell' : 'Módulo Liberado'}
                            >
                              {mod.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                              <span className="text-[10px] hidden sm:inline">{mod.locked ? 'Bloqueado' : 'Liberado'}</span>
                            </button>

                            <button
                              onClick={() => handleDeleteModule(selectedCourse.id, mod.id)}
                              className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                              title="Excluir Módulo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Classes list inside existing module */}
                        <div className="pl-6 space-y-2 border-l-2 border-primary-forest/20">
                          {mod.classes.map(cls => (
                            <div key={cls.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white text-xs border border-[#2E4030]/10">
                              <div className="flex items-center gap-2">
                                {cls.type === 'video' ? (
                                  <Video className="w-3.5 h-3.5 text-primary-accent" />
                                ) : (
                                  <HelpCircle className="w-3.5 h-3.5 text-secondary-accent" />
                                )}
                                <span className="font-bold text-primary-forest">{cls.title}</span>
                                <span className="text-[10px] text-[#6A786C]">({cls.duration})</span>
                              </div>
                              <button
                                onClick={() => handleDeleteClass(selectedCourse.id, mod.id, cls.id)}
                                className="text-red-400 hover:text-red-600 transition-colors"
                                title="Remover Aula"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}

                          {/* Add Class Form inside Existing Module */}
                          {activeExistingModId === mod.id ? (
                            <div className="p-4 bg-white rounded-xl border border-dashed border-[#2E4030]/25 space-y-3 mt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-primary-forest">Adicionar Nova Aula ao Módulo {modIdx + 1}</span>
                                <div className="flex items-center gap-2">
                                  <label className="text-[11px] flex items-center gap-1 font-semibold">
                                    <input
                                      type="radio"
                                      name={`ex-type-${mod.id}`}
                                      checked={existingClsType === 'video'}
                                      onChange={() => setExistingClsType('video')}
                                    />
                                    <span>Vídeo</span>
                                  </label>
                                  <label className="text-[11px] flex items-center gap-1 font-semibold">
                                    <input
                                      type="radio"
                                      name={`ex-type-${mod.id}`}
                                      checked={existingClsType === 'quiz'}
                                      onChange={() => setExistingClsType('quiz')}
                                    />
                                    <span>Quiz</span>
                                  </label>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={existingClsTitle}
                                  onChange={e => setExistingClsTitle(e.target.value)}
                                  placeholder="Título da Aula..."
                                  className="px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#2E4030]/15"
                                />
                                <input
                                  type="text"
                                  value={existingClsDuration}
                                  onChange={e => setExistingClsDuration(e.target.value)}
                                  placeholder="Duração (ex: 20 min)..."
                                  className="px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#2E4030]/15"
                                />
                              </div>

                              {existingClsType === 'video' ? (
                                <input
                                  type="text"
                                  value={existingClsVideoUrl}
                                  onChange={e => setExistingClsVideoUrl(e.target.value)}
                                  placeholder="Link do Vídeo (Vimeo)..."
                                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#2E4030]/15"
                                />
                              ) : (
                                <div className="space-y-2 p-2 bg-[#FAF7F2] rounded-lg">
                                  <input
                                    type="text"
                                    value={existingQuizQuestion}
                                    onChange={e => setExistingQuizQuestion(e.target.value)}
                                    placeholder="Pergunta do Quiz de Fixação..."
                                    className="w-full px-2 py-1.5 text-xs rounded bg-white border border-[#2E4030]/15"
                                  />
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <input
                                      type="text"
                                      value={existingQuizOptA}
                                      onChange={e => setExistingQuizOptA(e.target.value)}
                                      placeholder="Alternativa A..."
                                      className="px-2 py-1 text-xs rounded bg-white border"
                                    />
                                    <input
                                      type="text"
                                      value={existingQuizOptB}
                                      onChange={e => setExistingQuizOptB(e.target.value)}
                                      placeholder="Alternativa B..."
                                      className="px-2 py-1 text-xs rounded bg-white border"
                                    />
                                    <input
                                      type="text"
                                      value={existingQuizOptC}
                                      onChange={e => setExistingQuizOptC(e.target.value)}
                                      placeholder="Alternativa C..."
                                      className="px-2 py-1 text-xs rounded bg-white border"
                                    />
                                  </div>
                                </div>
                              )}

                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setActiveExistingModId(null)}
                                  className="px-3 py-1.5 text-xs text-[#6A786C]"
                                >
                                  Fechar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddClassToExisting(selectedCourse.id, mod.id)}
                                  className="px-4 py-2 rounded-xl bg-primary-forest text-white text-xs font-bold hover:bg-primary-forest/90"
                                >
                                  Adicionar Aula
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setActiveExistingModId(mod.id)}
                              className="text-[11px] text-primary-accent hover:underline font-bold flex items-center gap-1 mt-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" /> Adicionar nova aula neste módulo
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-[#2E4030]/10 text-center space-y-3">
                  <GraduationCap className="w-12 h-12 text-primary-accent/40 mx-auto" />
                  <h3 className="text-base font-bold text-primary-forest">Selecione um curso para gerenciar</h3>
                  <p className="text-xs text-[#6A786C] max-w-sm mx-auto">
                    Clique em um dos cursos da lista à esquerda para adicionar módulos, aulas, editar quizzes ou alterar bloqueios.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
