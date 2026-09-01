/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Course, Product, FileAttachment, Member, PointsEntry, Recipe, ScienceArticle } from '../types';
import { BlogPost } from '../data/blog';
import { TechnicalSheetData } from '../data/technicalSheets';
import { AdminHeader, AdminTab } from './admin/AdminHeader';
import { AdminCourses } from './admin/AdminCourses';
import { AdminBlog } from './admin/AdminBlog';
import { AdminProducts } from './admin/AdminProducts';
import { AdminRecipes } from './admin/AdminRecipes';
import { AdminTechnicalSheets } from './admin/AdminTechnicalSheets';
import { AdminScience } from './admin/AdminScience';
import { SHOPIFY_INTEGRATION_METHODS, SHOPIFY_SUPPORT_TEMPLATE } from '../data';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { 
  Users, 
  PlusCircle, 
  ShoppingBag, 
  Copy, 
  CheckCircle2, 
  Sparkles,
  Search,
  Award,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface AdminViewProps {
  courses: Course[];
  onAddCourse: (course: Course) => void;
  onUpdateCourse: (course: Course) => void;
  onDeleteCourse?: (courseId: string) => void;

  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;

  blogPosts: BlogPost[];
  onAddBlogPost: (post: BlogPost) => void;
  onDeleteBlogPost?: (postId: string) => void;

  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
  onDeleteRecipe?: (recipeId: string) => void;

  technicalSheets: TechnicalSheetData[];
  onAddTechnicalSheet: (sheet: TechnicalSheetData) => void;
  onDeleteTechnicalSheet?: (sheetId: string) => void;

  scienceArticles: ScienceArticle[];
  onAddScienceArticle: (article: ScienceArticle) => void;
  onDeleteScienceArticle?: (articleId: string) => void;

  attachments: FileAttachment[];
  onAddAttachment: (att: FileAttachment) => void;
  metricDownloads: number;

  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  pointsHistory: PointsEntry[];
  setPointsHistory: React.Dispatch<React.SetStateAction<PointsEntry[]>>;
}

export const AdminView: React.FC<AdminViewProps> = ({
  courses,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  products,
  onAddProduct,
  onDeleteProduct,
  blogPosts,
  onAddBlogPost,
  onDeleteBlogPost,
  recipes,
  onAddRecipe,
  onDeleteRecipe,
  technicalSheets,
  onAddTechnicalSheet,
  onDeleteTechnicalSheet,
  scienceArticles,
  onAddScienceArticle,
  onDeleteScienceArticle,
  attachments,
  onAddAttachment,
  metricDownloads,
  members,
  setMembers,
  pointsHistory,
  setPointsHistory
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('courses');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Points Launch Form States in CRM tab
  const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0]?.id || '');
  const [launchPoints, setLaunchPoints] = useState<string>('');
  const [launchReason, setLaunchReason] = useState<string>('');
  const [memberSearchQuery, setMemberSearchQuery] = useState('');

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4500);
  };

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

    // Write to Supabase if configured and valid UUID
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

    triggerSuccess(`+${pointsToAdd} pontos creditados com sucesso para ${memberToUpdate.name}!`);
    setLaunchPoints('');
    setLaunchReason('');
  };

  const filteredMembers = members.filter(m => {
    if (!memberSearchQuery.trim()) return true;
    const q = memberSearchQuery.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.crn.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 md:px-8 space-y-8 font-sans text-primary-text">
      
      {/* Toast Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 shadow-md animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{successMsg}</span>
        </div>
      )}

      {/* Modern Admin Navigation & Metrics Header */}
      <AdminHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        stats={{
          totalCourses: courses.length,
          totalProducts: products.length,
          totalPosts: blogPosts.length,
          totalRecipes: recipes.length,
          totalSheets: technicalSheets.length,
          totalArticles: scienceArticles.length,
          totalMembers: members.length
        }}
      />

      {/* ========================================================================= */}
      {/* TAB CONTENT ROUTER                                                        */}
      {/* ========================================================================= */}
      <div className="mt-6">
        {/* 1. COURSES & LMS */}
        {activeTab === 'courses' && (
          <AdminCourses
            courses={courses}
            onAddCourse={onAddCourse}
            onUpdateCourse={onUpdateCourse}
            onDeleteCourse={onDeleteCourse}
          />
        )}

        {/* 2. BLOG & CMS */}
        {activeTab === 'blog' && (
          <AdminBlog
            posts={blogPosts}
            onAddPost={onAddBlogPost}
            onDeletePost={onDeleteBlogPost}
          />
        )}

        {/* 3. PRODUCTS & E-COMMERCE */}
        {activeTab === 'products' && (
          <AdminProducts
            products={products}
            onAddProduct={onAddProduct}
            onDeleteProduct={onDeleteProduct}
          />
        )}

        {/* 4. RECIPES */}
        {activeTab === 'recipes' && (
          <AdminRecipes
            recipes={recipes}
            onAddRecipe={onAddRecipe}
            onDeleteRecipe={onDeleteRecipe}
          />
        )}

        {/* 5. TECHNICAL SHEETS */}
        {activeTab === 'sheets' && (
          <AdminTechnicalSheets
            sheets={technicalSheets}
            onAddSheet={onAddTechnicalSheet}
            onDeleteSheet={onDeleteTechnicalSheet}
          />
        )}

        {/* 6. SCIENCE ARTICLES */}
        {activeTab === 'science' && (
          <AdminScience
            articles={scienceArticles}
            onAddArticle={onAddScienceArticle}
            onDeleteArticle={onDeleteScienceArticle}
          />
        )}

        {/* 7. MEMBERS & CRM */}
        {activeTab === 'members' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#2E4030]/10 shadow-sm">
              <div>
                <h2 className="text-xl font-serif text-primary-forest">Gestão de Membros, Rankings & Bonificações (CRM)</h2>
                <p className="text-xs text-[#526054] mt-0.5">
                  Acompanhe nutricionistas credenciadas, libere acessos e lance pontos de bonificação por prescrição.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                {members.length} Profissionais Credenciadas
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* MEMBERS TABLE (8 Cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#2E4030]/10 shadow-sm space-y-4">
                <div className="flex items-center gap-3 bg-[#FAF7F2] p-3 rounded-2xl border border-[#2E4030]/10">
                  <Search className="w-4 h-4 text-[#6A786C] ml-2" />
                  <input
                    type="text"
                    value={memberSearchQuery}
                    onChange={e => setMemberSearchQuery(e.target.value)}
                    placeholder="Buscar nutricionista por nome, e-mail ou CRN..."
                    className="w-full text-xs text-primary-text bg-transparent focus:outline-none"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#526054]">
                    <thead>
                      <tr className="border-b border-[#2E4030]/10 text-primary-forest font-bold uppercase text-[10px] tracking-wider font-mono">
                        <th className="py-3 px-3">Profissional</th>
                        <th className="py-3 px-3">Pontos / Nível</th>
                        <th className="py-3 px-3">Registro (CRN)</th>
                        <th className="py-3 px-3">Cidade / UF</th>
                        <th className="py-3 px-3 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2E4030]/5">
                      {filteredMembers.map(member => (
                        <tr key={member.id} className="hover:bg-[#FAF7F2] transition-colors">
                          <td className="py-3 px-3 font-semibold text-primary-forest">
                            <div className="flex flex-col">
                              <span>{member.name}</span>
                              <span className="text-[10px] text-[#6A786C] font-mono font-normal">{member.email}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary-accent">{member.totalPoints || 0} pts</span>
                              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                                {member.tier || 'Bronze'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px] text-primary-forest font-semibold">{member.crn}</td>
                          <td className="py-3 px-3">{member.city} - {member.state}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedMemberId(member.id);
                                triggerSuccess(`Membro ${member.name} selecionado para bonificação.`);
                              }}
                              className="text-[10px] uppercase font-bold tracking-widest text-primary-accent hover:text-primary-forest transition-colors font-mono"
                            >
                              Bonificar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* LAUNCH POINTS FORM (4 Cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#2E4030]/10 shadow-sm space-y-5">
                <div className="border-b border-[#2E4030]/10 pb-3">
                  <span className="text-[10px] font-mono uppercase font-bold text-primary-accent block">Bonificação</span>
                  <h3 className="text-lg font-serif font-bold text-primary-forest mt-0.5">Lançar Pontos Manuais</h3>
                </div>

                <form onSubmit={handleLaunchPoints} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-forest">Selecionar Profissional</label>
                    <select
                      value={selectedMemberId}
                      onChange={e => setSelectedMemberId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text font-medium focus:outline-none"
                    >
                      {members.map(m => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.crn})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-forest">Quantidade de Pontos</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={launchPoints}
                      onChange={e => setLaunchPoints(e.target.value)}
                      placeholder="Ex: 150"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text font-medium focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-forest">Motivo / Prescrição Clínica</label>
                    <input
                      type="text"
                      required
                      value={launchReason}
                      onChange={e => setLaunchReason(e.target.value)}
                      placeholder="Ex: Prescrição de Gotas 210g"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary-forest hover:bg-primary-forest/90 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <PlusCircle className="w-4 h-4 text-secondary-accent" />
                    <span>Confirmar e Creditar Pontos</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 8. SHOPIFY & SETTINGS */}
        {activeTab === 'shopify' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Bar */}
            <div className="bg-gradient-to-br from-[#1C261D] to-[#253626] text-[#F7F3EC] p-6 sm:p-8 rounded-3xl border border-[#455347]/50 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#455347]/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-luxury-accent/20 text-luxury-accent flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">Integração Nativa Shopify & App Proxy</h3>
                    <p className="text-xs text-[#C2C9C0]">
                      Diretrizes e templates para embutir o Portal de Nutricionistas diretamente na loja Shopify.
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono">
                  SHOPIFY NATIVE PROXY
                </span>
              </div>

              {/* Integration Methods Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {SHOPIFY_INTEGRATION_METHODS.map((method, idx) => (
                  <div key={idx} className="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-luxury-accent uppercase font-mono">{method.badge}</span>
                      <h4 className="font-serif font-bold text-base text-white">{method.title}</h4>
                      <p className="text-xs text-[#C8D1C7] leading-relaxed">{method.description}</p>
                      <div className="text-[11px] text-[#A0AAA0] bg-white/5 p-2.5 rounded-xl">
                        <strong>Vantagens:</strong> {method.pros.join(' • ')}
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-secondary-accent font-semibold flex items-center justify-between border-t border-white/10">
                      <span className="truncate pr-2">{method.recommendedFor}</span>
                      <span className="text-[9px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded-full shrink-0">Ativo</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Support Template */}
              <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs font-bold text-luxury-accent uppercase tracking-wider block">
                      Template de Abertura de Chamado · Suporte Shopify
                    </span>
                    <p className="text-xs text-[#A0AAA0]">Configuração de App Proxy / Custom App para o Portal de Nutricionistas</p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(SHOPIFY_SUPPORT_TEMPLATE);
                      triggerSuccess('Template de suporte Shopify copiado com sucesso!');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-luxury-accent hover:bg-luxury-accent/90 text-[#1C261D] rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Chamado</span>
                  </button>
                </div>

                <pre className="text-xs text-[#E0E6DF] bg-black/60 p-4 rounded-xl whitespace-pre-wrap font-mono leading-relaxed border border-white/5 max-h-60 overflow-y-auto">
                  {SHOPIFY_SUPPORT_TEMPLATE}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
