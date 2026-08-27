/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  CheckCircle, 
  ArrowLeft, 
  Clock, 
  Award, 
  BookOpen, 
  Download, 
  ChevronRight,
  Sparkles,
  Volume2,
  Maximize2,
  RotateCcw,
  SkipForward,
  Lock,
  Heart,
  XCircle,
  MessageSquare,
  Send,
  FileText,
  Image as ImageIcon,
  Eye,
  X
} from 'lucide-react';
import { Course, CourseClass, CourseModule, UserProfile, CommunityPost, FileAttachment } from '../types';

interface AcademyViewProps {
  courses: Course[];
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  completedClassIds: string[];
  toggleCompleteClass: (classId: string) => void;
  user: UserProfile;
  communityPosts: CommunityPost[];
  onAddCommunityPost: (post: CommunityPost) => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({
  courses,
  selectedCourse,
  setSelectedCourse,
  completedClassIds,
  toggleCompleteClass,
  user,
  communityPosts,
  onAddCommunityPost
}) => {
  // Active learning states
  const [activeClass, setActiveClass] = useState<CourseClass | null>(null);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(35); // simulated play progress
  
  // Audio state
  const [volume, setVolume] = useState<number>(80);

  // Custom Navigation inside the course
  const [activeTab, setActiveTab] = useState<'conteudo' | 'comunidade'>('conteudo');

  // Interactive Quiz local state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // New post local state
  const [newPostText, setNewPostText] = useState<string>('');

  // Local likes tracking
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);

  // Preview modal for attachments (images/PDFs)
  const [previewAttachment, setPreviewAttachment] = useState<FileAttachment | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  // Set default class when a course is selected or auto-select Cabruca course if none
  useEffect(() => {
    if (!selectedCourse && courses && courses.length > 0) {
      const cabrucaCourse = courses.find(c => c.id === 'course-1' || c.title.toLowerCase().includes('cabruca') || c.title.toLowerCase().includes('jornada')) || courses[0];
      if (cabrucaCourse) {
        setSelectedCourse(cabrucaCourse);
      }
      return;
    }

    if (selectedCourse && selectedCourse.modules && selectedCourse.modules[0]) {
      const firstModule = selectedCourse.modules[0];
      if (firstModule.classes && firstModule.classes[0]) {
        setActiveClass(firstModule.classes[0]);
        setVideoPlaying(false);
        setVideoProgress(15);
      }
      setActiveTab('conteudo');
      setSelectedOptionId(null);
    }
  }, [selectedCourse, courses, setSelectedCourse]);

  // Reset quiz states when active class changes
  useEffect(() => {
    setSelectedOptionId(null);
  }, [activeClass]);

  // Handle active class change
  const handleSelectClass = (cClass: CourseClass) => {
    setActiveClass(cClass);
    setVideoPlaying(cClass.type !== 'quiz');
    setVideoProgress(0);
    setSelectedOptionId(null);
    // Smooth scroll to top of player
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Get total classes in a course
  const getCourseClassesCount = (course: Course) => {
    return course.modules?.reduce((acc, mod) => acc + (mod.classes?.length || 0), 0) || 0;
  };

  // Get completed classes in a course
  const getCourseCompletedCount = (course: Course) => {
    let count = 0;
    course.modules?.forEach(mod => {
      mod.classes?.forEach(cls => {
        if (completedClassIds.includes(cls.id)) count++;
      });
    });
    return count;
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim() || !selectedCourse) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      courseId: selectedCourse.id,
      authorName: user.name,
      authorRole: user.role === 'ADMIN' ? 'Administradora' : 'Nutricionista Credenciada',
      content: newPostText,
      date: 'Agora mesmo',
      likes: 0,
      replies: []
    };

    onAddCommunityPost(newPost);
    setNewPostText('');
  };

  const handleToggleLike = (postId: string) => {
    if (likedPostIds.includes(postId)) {
      setLikedPostIds(prev => prev.filter(id => id !== postId));
    } else {
      setLikedPostIds(prev => [...prev, postId]);
    }
  };

  return (
    <div ref={topRef} className="px-6 md:px-12 py-8 max-w-7xl mx-auto w-full font-sans text-primary-text">
      
      {/* HEADER SECTION */}
      {!selectedCourse ? (
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary-accent font-mono font-bold">
            Área de Formação Continuada
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-primary-forest">
            Academia Será Cacau
          </h2>
          <p className="text-xs text-secondary-text max-w-xl">
            Aprofunde seus conhecimentos em fitoativos, regulação bioquímica do estresse e rituais clínicos de prescrição com nossa curadoria Cabruca.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 mb-8">
          <button
            id="btn-back-to-courses"
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-accent hover:text-primary-forest transition-colors group w-fit cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar aos Treinamentos</span>
          </button>

          {/* Subtitle / Title banner for selected course */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] tracking-[0.25em] uppercase text-primary-accent font-bold font-mono">
                {selectedCourse.category} • Treinamento Ativo
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary-forest tracking-tight">
                {selectedCourse.title}
              </h2>
            </div>
          </div>

          {/* Horizontal Pills-like Tab Navigation */}
          <div className="flex border-b border-border-color pb-1 gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('conteudo')}
              className={`px-4 py-2.5 rounded-lg text-xs tracking-widest uppercase transition-all whitespace-nowrap font-bold font-mono cursor-pointer ${
                activeTab === 'conteudo'
                  ? 'bg-primary-accent/15 border-l-4 border-primary-accent text-primary-forest font-extrabold'
                  : 'bg-transparent text-secondary-text hover:text-primary-forest hover:bg-secondary-surface'
              }`}
            >
              Conteúdo
            </button>
            {selectedCourse.communityEnabled && (
              <button
                onClick={() => setActiveTab('comunidade')}
                className={`px-4 py-2.5 rounded-lg text-xs tracking-widest uppercase transition-all whitespace-nowrap font-bold font-mono cursor-pointer ${
                  activeTab === 'comunidade'
                    ? 'bg-primary-accent/15 border-l-4 border-primary-accent text-primary-forest font-extrabold'
                    : 'bg-transparent text-secondary-text hover:text-primary-forest hover:bg-secondary-surface'
                }`}
              >
                Comunidade
              </button>
            )}
          </div>
        </div>
      )}

      {/* 1. GRID VIEW - LARGE VERTICAL COVERS */}
      {!selectedCourse ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const total = getCourseClassesCount(course);
            const completed = getCourseCompletedCount(course);
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <div 
                id={`academy-course-card-${course.id}`}
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="bg-surface text-primary-text rounded-2xl overflow-hidden border border-border-color shadow-sm hover:border-primary-accent/40 cursor-pointer transition-all duration-300 flex flex-col justify-between h-[470px] group relative"
              >
                {/* Vertical poster section */}
                <div className="relative h-[290px] w-full overflow-hidden">
                  <img 
                    src={course.coverImage} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 saturate-100"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/25 z-10" />

                  {/* Completed Stamp */}
                  {pct === 100 && (
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white p-1 rounded-full z-20 shadow-md">
                      <CheckCircle className="w-4 h-4 fill-emerald-500 text-white" />
                    </div>
                  )}

                  {/* Progress overlay bar at the bottom of imagery */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/10 z-20">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-accent to-luxury-accent transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Info Text & Stats */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-primary-forest group-hover:text-primary-accent transition-colors leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-[10px] text-secondary-text uppercase tracking-widest mt-1 font-mono">
                      Com <span className="font-bold text-primary-accent">{course.instructor}</span>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border-color/60 flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-secondary-text/60 uppercase tracking-widest font-mono">Aulas concluídas</span>
                      <span className="text-xs font-semibold text-primary-forest font-mono">{completed} / {total} ({pct}%)</span>
                    </div>
                    
                    <span className="text-[9px] uppercase font-bold tracking-widest text-primary-accent group-hover:translate-x-1 transition-all flex items-center gap-1 font-mono">
                      Entrar <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        
        /* 2. THEATER OR OTHER TABS ACTIVE LEARNING VIEW */
        <div>
          
          {/* TAB 1: CONTEÚDO (Theater view) */}
          {activeTab === 'conteudo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* THEATER STAGE (Left block - 8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* Immersive Video Screen / Quiz Stage */}
                <div className="relative aspect-video rounded-2xl bg-black border border-border-color/30 overflow-hidden shadow-xl group/player flex flex-col justify-center">
                  {activeClass ? (
                    activeClass.type === 'quiz' && activeClass.quiz ? (
                      /* RENDER INTERACTIVE QUIZ */
                      <div className="p-6 md:p-10 w-full h-full flex flex-col justify-center bg-secondary-surface text-left overflow-y-auto">
                        <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
                          <div className="flex items-center gap-2">
                            <span className="bg-primary-accent/20 text-primary-accent border border-primary-accent/20 text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded font-mono">
                              quiz técnico
                            </span>
                          </div>

                          <h3 className="text-lg md:text-xl font-bold text-primary-forest leading-relaxed">
                            {activeClass.quiz.question}
                          </h3>

                          {/* Quiz Options */}
                          <div className="flex flex-col gap-3 mt-4">
                            {activeClass.quiz.options.map((option) => {
                              const isSelected = selectedOptionId === option.id;
                              const isCorrectOption = option.id === activeClass.quiz?.correctOptionId;
                              const hasAnswered = selectedOptionId !== null;

                              let optionStyle = "bg-surface border border-border-color text-primary-text";
                              if (!hasAnswered) {
                                optionStyle += " hover:bg-secondary-surface hover:border-primary-accent/40 cursor-pointer";
                              } else {
                                if (isCorrectOption) {
                                  optionStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-700";
                                } else if (isSelected) {
                                  optionStyle = "bg-rose-500/10 border-rose-500/60 text-rose-700";
                                } else {
                                  optionStyle = "bg-surface border-border-color text-primary-text/40 opacity-60";
                                }
                              }

                              return (
                                <button
                                  key={option.id}
                                  disabled={hasAnswered}
                                  onClick={() => setSelectedOptionId(option.id)}
                                  className={`w-full text-left px-5 py-3.5 rounded-xl transition-all flex items-center justify-between text-xs md:text-sm ${optionStyle} cursor-pointer`}
                                >
                                  <span>{option.text}</span>
                                  {hasAnswered && isCorrectOption && (
                                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                                  )}
                                  {hasAnswered && isSelected && !isCorrectOption && (
                                    <XCircle className="w-4.5 h-4.5 text-rose-600 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Instant Feedback Banner */}
                          {selectedOptionId && (
                            <div className={`mt-4 p-4 rounded-xl border text-xs leading-relaxed font-mono ${
                              selectedOptionId === activeClass.quiz.correctOptionId
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-700'
                            }`}>
                              {selectedOptionId === activeClass.quiz.correctOptionId ? (
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                                  <span>Excelente! Resposta correta baseada no sistema científico de preservação Cabruca.</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <XCircle className="w-4 h-4 text-rose-600" />
                                  <span>Ops! Essa opção não descreve fielmente os pilares Cabruca. Revise e tente novamente se necessário.</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* RENDER VIDEO PLAYER */
                      <>
                        {/* If videoPlaying is true and activeClass has videoUrl, embed the real Vimeo player */}
                        {videoPlaying && activeClass.videoUrl ? (
                          <div className="absolute inset-0 w-full h-full bg-black z-20">
                            <iframe 
                              src={(() => {
                                const match = activeClass.videoUrl.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
                                const id = match && match[1] ? match[1] : '';
                                return id ? `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&badge=0&pip=0&speed=0&fullscreen=0&cc=0&vimeo_logo=0&dnt=1` : activeClass.videoUrl;
                              })()}
                              className="w-full h-full border-0"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                              title={activeClass.title}
                            />
                          </div>
                        ) : (
                          <>
                            {/* Video Image Poster */}
                            {(() => {
                              const vimeoMatch = activeClass.videoUrl?.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
                              const vimeoId = vimeoMatch && vimeoMatch[1] ? vimeoMatch[1] : '';
                              const initialPoster = activeClass.thumbnailUrl || (vimeoId ? `https://vumbnail.com/${vimeoId}.jpg` : selectedCourse.coverImage);

                              return (
                                <div className="absolute inset-0 w-full h-full">
                                  <img 
                                    src={initialPoster} 
                                    alt={activeClass.title}
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = selectedCourse.coverImage;
                                    }}
                                    className="w-full h-full object-cover filter brightness-60 transition-all duration-500"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              );
                            })()}

                            {/* Centered Large Play Overlay */}
                            <button 
                              onClick={() => setVideoPlaying(true)}
                              className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-primary-accent text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-300 z-20 cursor-pointer group/play"
                            >
                              <Play className="w-9 h-9 fill-current translate-x-0.5 group-hover/play:scale-110 transition-transform" />
                            </button>

                            {/* Watermark brand overlay */}
                            <div className="absolute top-5 right-5 font-mono text-[10px] font-bold tracking-wider text-white/20 select-none z-10 pointer-events-none uppercase">
                              será cacau cabruca
                            </div>
                          </>
                        )}
                      </>
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-center text-secondary-text font-serif italic p-12">
                      Selecione uma aula no menu lateral para iniciar
                    </div>
                  )}
                </div>

                {/* Class info details & clinical application */}
                {activeClass && (
                  <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border-color flex flex-col gap-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-color/60">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-primary-accent font-bold font-mono">
                          {activeClass.type === 'quiz' ? 'Atividade Prática' : 'Aula em Exibição'}
                        </span>
                        <h3 className="text-xl font-bold tracking-tight text-primary-forest mt-1 leading-snug">
                          {activeClass.title}
                        </h3>
                      </div>

                      {/* Action to Mark Complete */}
                      <button
                        id={`btn-complete-class-${activeClass.id}`}
                        onClick={() => toggleCompleteClass(activeClass.id)}
                        className={`flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs tracking-wider uppercase font-bold transition-all cursor-pointer ${
                          completedClassIds.includes(activeClass.id)
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 hover:bg-emerald-500/20'
                            : 'bg-secondary-surface border-border-color text-primary-forest hover:bg-primary-accent hover:text-white hover:border-transparent shadow-sm'
                        }`}
                      >
                        <CheckCircle className={`w-4 h-4 ${completedClassIds.includes(activeClass.id) ? 'fill-emerald-500 text-white' : ''}`} />
                        <span>{completedClassIds.includes(activeClass.id) ? 'Concluída' : 'Marcar como Concluída'}</span>
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs uppercase tracking-widest font-bold text-primary-accent font-mono">Descrição</h4>
                      <div className="text-xs text-secondary-text leading-relaxed whitespace-pre-line">
                        {activeClass.summary}
                      </div>
                    </div>

                    {/* Handouts and assets attached to this specific class */}
                    {(() => {
                      const attachments: FileAttachment[] = activeClass.pdfAttachments && activeClass.pdfAttachments.length > 0
                        ? activeClass.pdfAttachments
                        : activeClass.pdfAttachment
                          ? [activeClass.pdfAttachment]
                          : [];

                      if (attachments.length === 0) return null;

                      return (
                        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border-color/60">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-primary-accent font-mono">
                              Materiais de Apoio & Downloads ({attachments.length})
                            </span>
                          </div>

                          <div className="flex flex-col gap-2.5">
                            {attachments.map((att, idx) => {
                              const isPdf = att.downloadUrl?.toLowerCase().endsWith('.pdf') || att.category === 'PDF' || att.name.toLowerCase().includes('pdf');
                              const isImage = att.downloadUrl?.toLowerCase().endsWith('.jpg') || att.downloadUrl?.toLowerCase().endsWith('.jpeg') || att.downloadUrl?.toLowerCase().endsWith('.png');

                              return (
                                <div 
                                  key={att.id || idx}
                                  className="bg-bg-app hover:bg-secondary-surface/40 transition-colors rounded-xl p-3.5 border border-border-color/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 shrink-0 rounded-lg bg-primary-accent/15 border border-primary-accent/20 text-primary-accent flex items-center justify-center font-bold font-mono text-[11px]">
                                      {isPdf ? (
                                        <FileText className="w-5 h-5" />
                                      ) : isImage ? (
                                        <ImageIcon className="w-5 h-5" />
                                      ) : (
                                        <span>DOC</span>
                                      )}
                                    </div>
                                    <div className="min-w-0">
                                      <span className="text-[9px] uppercase tracking-widest font-bold text-primary-accent font-mono block">
                                        {isPdf ? 'Documento PDF' : isImage ? 'Cartão de Receita / Material' : 'Material de Apoio'}
                                      </span>
                                      <h5 className="text-xs font-semibold text-primary-forest truncate" title={att.name}>
                                        {att.name}
                                      </h5>
                                      <p className="text-[9px] text-secondary-text uppercase font-mono mt-0.5">
                                        {att.size} • {isPdf ? 'Formato PDF' : 'Imagem de Alta Resolução'}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                                    {isImage && att.downloadUrl && (
                                      <button
                                        onClick={() => setPreviewAttachment(att)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-surface hover:bg-secondary-surface text-primary-forest border border-border-color rounded-lg text-[10px] uppercase font-bold tracking-widest transition-colors font-mono cursor-pointer"
                                        title="Visualizar documento"
                                      >
                                        <Eye className="w-3.5 h-3.5 text-primary-accent" />
                                        <span>Ver</span>
                                      </button>
                                    )}

                                    <a 
                                      id={`btn-download-handout-${activeClass.id}-${idx}`}
                                      href={att.downloadUrl}
                                      download={att.downloadUrl.split('/').pop() || att.name}
                                      className="flex items-center gap-2 px-3.5 py-1.5 bg-primary-accent text-white hover:bg-primary-accent/90 rounded-lg text-[10px] uppercase font-bold tracking-widest transition-colors font-mono shadow-sm cursor-pointer"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                      <span>{isPdf ? 'Baixar PDF' : 'Baixar Imagem'}</span>
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* SYLLABUS CELL (Right block - 4 Cols) */}
              <div className="lg:col-span-4 bg-surface text-primary-text rounded-2xl p-5 border border-border-color shadow-sm flex flex-col gap-5 sticky top-28">
                <div className="border-b border-border-color/60 pb-3.5">
                  <span className="text-[8px] uppercase tracking-widest text-primary-accent font-bold font-mono">Grade Curricular</span>
                  <h3 className="text-lg font-bold tracking-tight mt-0.5 text-primary-forest">{selectedCourse.title}</h3>
                  <div className="flex gap-4 mt-1.5 text-[10px] text-secondary-text uppercase tracking-widest font-mono">
                    <span>{getCourseClassesCount(selectedCourse)} Aulas no Total</span>
                  </div>
                </div>

                {/* Flat Class List */}
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[520px] pr-1">
                  {selectedCourse.modules.flatMap(m => m.classes || []).map((cls) => {
                    const isCompleted = completedClassIds.includes(cls.id);
                    const isPlaying = activeClass?.id === cls.id;

                    return (
                      <button
                        id={`btn-class-node-${cls.id}`}
                        key={cls.id}
                        onClick={() => handleSelectClass(cls)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isPlaying 
                            ? 'bg-primary-forest border-transparent text-white shadow-md font-bold' 
                            : 'bg-bg-app border-transparent text-primary-text hover:bg-secondary-surface hover:text-primary-forest'
                        }`}
                      >
                        <div className="min-w-0 flex items-center gap-2.5">
                          {isCompleted ? (
                            <CheckCircle className={`w-4 h-4 shrink-0 ${isPlaying ? 'text-white' : 'text-emerald-600'}`} />
                          ) : (
                            <Play className={`w-3.5 h-3.5 shrink-0 ${isPlaying ? 'text-white' : 'text-primary-accent'}`} />
                          )}
                          <span className="text-xs tracking-wider leading-snug truncate">
                            {cls.title}
                          </span>
                        </div>

                        <span className="text-[9px] font-mono tracking-wider opacity-60 ml-2 shrink-0">
                          {cls.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: COMUNIDADE */}
          {activeTab === 'comunidade' && (
            <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in duration-300">
              
              {/* Creator Box */}
              <form onSubmit={handlePostSubmit} className="bg-surface p-6 rounded-2xl border border-border-color shadow-sm flex flex-col gap-4">
                <span className="text-[9px] tracking-widest uppercase text-primary-accent font-bold font-mono">Compartilhar na Comunidade</span>
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Escreva sua dúvida, comentário ou relato clínico sobre este curso..."
                  rows={3}
                  className="w-full px-4 py-3 text-xs md:text-sm bg-bg-app border border-border-color rounded-xl focus:border-primary-accent focus:outline-none text-primary-text leading-relaxed placeholder:text-secondary-text/50 resize-none"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-primary-accent hover:bg-primary-accent/90 text-white font-mono text-[10px] tracking-widest uppercase rounded-lg transition-all font-bold shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Publicar Relato
                  </button>
                </div>
              </form>

              {/* Feed List */}
              <div className="flex flex-col gap-5">
                {communityPosts.filter(p => p.courseId === selectedCourse.id).length === 0 ? (
                  <div className="py-12 text-center bg-surface rounded-2xl border border-border-color flex flex-col items-center gap-3">
                    <MessageSquare className="w-10 h-10 text-secondary-text/35" />
                    <h4 className="text-sm font-bold text-primary-forest font-mono uppercase tracking-widest">Nenhum Relato Ainda</h4>
                    <p className="text-xs text-secondary-text max-w-xs">Seja a primeira a postar sobre o treinamento e interagir com outras nutricionistas.</p>
                  </div>
                ) : (
                  communityPosts
                    .filter(p => p.courseId === selectedCourse.id)
                    .map((post) => {
                      const isLiked = likedPostIds.includes(post.id);
                      const likesCount = post.likes + (isLiked ? 1 : 0);

                      return (
                        <div key={post.id} className="bg-surface p-6 rounded-2xl border border-border-color shadow-sm flex flex-col gap-5">
                          
                          {/* Post Header */}
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-accent to-luxury-accent p-[1.5px] shrink-0">
                                <div className="w-full h-full rounded-full bg-surface flex items-center justify-center font-serif text-xs font-bold text-primary-forest uppercase">
                                  {post.authorName.charAt(0)}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-primary-text">{post.authorName}</span>
                                <span className="text-[8px] tracking-widest text-primary-accent font-bold font-mono uppercase mt-0.5">{post.authorRole}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-secondary-text/50">{post.date}</span>
                          </div>

                          {/* Content */}
                          <p className="text-xs md:text-sm text-primary-text leading-relaxed whitespace-pre-wrap pl-1">
                            {post.content}
                          </p>

                          {/* Actions */}
                          <div className="flex items-center gap-4 pt-3 border-t border-border-color/60 pl-1">
                            <button
                              onClick={() => handleToggleLike(post.id)}
                              className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                                isLiked ? 'text-primary-accent font-bold' : 'text-secondary-text hover:text-primary-forest'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                              <span>{likesCount} Curtidas</span>
                            </button>
                          </div>

                          {/* Replies */}
                          {post.replies && post.replies.length > 0 && (
                            <div className="flex flex-col gap-4 pl-4 md:pl-6 border-l border-border-color/60 mt-2">
                              {post.replies.map((reply) => (
                                <div key={reply.id} className="bg-bg-app p-4 rounded-xl border border-border-color/60 flex flex-col gap-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-primary-forest">{reply.authorName}</span>
                                    <span className="text-[9px] font-mono text-secondary-text/40">{reply.date}</span>
                                  </div>
                                  <p className="text-xs text-secondary-text leading-relaxed">{reply.content}</p>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      );
                    })
                )}
              </div>

            </div>
          )}

        </div>
      )}

      {/* Attachment Preview Modal */}
      {previewAttachment && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewAttachment(null)}
        >
          <div 
            className="bg-surface border border-border-color rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border-color flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest font-bold text-primary-accent font-mono">Visualização</span>
                <h4 className="text-sm font-bold text-primary-forest">{previewAttachment.name}</h4>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewAttachment.downloadUrl}
                  download={previewAttachment.downloadUrl.split('/').pop() || previewAttachment.name}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-accent text-white rounded-lg text-xs font-mono font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar</span>
                </a>
                <button
                  onClick={() => setPreviewAttachment(null)}
                  className="p-1.5 text-secondary-text hover:text-primary-forest hover:bg-secondary-surface rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-bg-app">
              <img 
                src={previewAttachment.downloadUrl} 
                alt={previewAttachment.name} 
                className="max-w-full max-h-[70vh] rounded-xl object-contain shadow-md"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
