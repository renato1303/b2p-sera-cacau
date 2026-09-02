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
import { AdminImportMembersModal } from './admin/AdminImportMembersModal';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { SUPABASE_SQL_SCHEMA } from '../lib/supabaseSchema';
import { getPatientCoupon } from '../lib/coupon';
import { 
  Users, 
  PlusCircle, 
  ShoppingBag, 
  Copy, 
  CheckCircle2, 
  Sparkles,
  Search,
  Award,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
  FileSpreadsheet,
  UploadCloud,
  Phone,
  Tag,
  Database,
  Terminal,
  Check,
  X
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
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState<boolean>(false);
  const [copiedAdminSql, setCopiedAdminSql] = useState<boolean>(false);

  // Member Search and Pagination States in Cadastro de Nutris tab
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [memberCurrentPage, setMemberCurrentPage] = useState<number>(1);
  const MEMBERS_PER_PAGE = 15;

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4500);
  };

  const filteredMembers = members.filter(m => {
    if (!memberSearchQuery.trim()) return true;
    const q = memberSearchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.phone && m.phone.toLowerCase().includes(q)) ||
      (m.crn && m.crn.toLowerCase().includes(q)) ||
      (m.patientCoupon && m.patientCoupon.toLowerCase().includes(q)) ||
      (m.city && m.city.toLowerCase().includes(q))
    );
  });

  const totalMemberPages = Math.max(1, Math.ceil(filteredMembers.length / MEMBERS_PER_PAGE));
  const safeMemberPage = Math.min(Math.max(1, memberCurrentPage), totalMemberPages);
  const paginatedMembers = filteredMembers.slice(
    (safeMemberPage - 1) * MEMBERS_PER_PAGE,
    safeMemberPage * MEMBERS_PER_PAGE
  );
  const memberStartIndex = filteredMembers.length === 0 ? 0 : (safeMemberPage - 1) * MEMBERS_PER_PAGE + 1;
  const memberEndIndex = Math.min(safeMemberPage * MEMBERS_PER_PAGE, filteredMembers.length);

  const getPaginationTabs = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

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

        {/* 7. CADASTRO DE NUTRIS */}
        {activeTab === 'members' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#2E4030]/10 shadow-sm">
              <div>
                <h2 className="text-xl font-serif text-primary-forest">Cadastro de Nutris</h2>
                <p className="text-xs text-[#526054] mt-0.5">
                  Consulte e gerencie as nutricionistas credenciadas, cupons de desconto para pacientes e dados de contato.
                </p>
              </div>
              
              <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsSqlModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-primary-forest border border-[#2E4030]/15 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  title="Ver script SQL de tabelas e permissões para o Supabase"
                >
                  <Terminal className="w-3.5 h-3.5 text-primary-accent" />
                  <span>Script SQL Supabase</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-forest hover:bg-primary-forest/90 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-secondary-accent" />
                  <span>Importar do Excel (.xlsx / .csv)</span>
                </button>

                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                  {members.length} Credenciadas
                </span>
              </div>
            </div>

            {/* MEMBERS TABLE (Full Width) */}
            <div className="w-full bg-white rounded-3xl p-6 border border-[#2E4030]/10 shadow-sm space-y-4">
              {/* Search Bar & Stats */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FAF7F2] p-3 rounded-2xl border border-[#2E4030]/10">
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-4 h-4 text-[#6A786C] ml-2 shrink-0" />
                  <input
                    type="text"
                    value={memberSearchQuery}
                    onChange={e => {
                      setMemberSearchQuery(e.target.value);
                      setMemberCurrentPage(1);
                    }}
                    placeholder="Buscar por nome, e-mail, telefone, cupom ou CRN..."
                    className="w-full text-xs text-primary-text bg-transparent focus:outline-none"
                  />
                  {memberSearchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setMemberSearchQuery('');
                        setMemberCurrentPage(1);
                      }}
                      className="p-1 text-[#6A786C] hover:text-primary-forest text-xs cursor-pointer"
                      title="Limpar busca"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-[11px] font-mono text-[#6A786C] px-2 text-right shrink-0">
                  {filteredMembers.length} {filteredMembers.length === 1 ? 'encontrada' : 'encontradas'}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#2E4030]/10">
                <table className="w-full text-left text-xs text-[#526054]">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-[#2E4030]/10 text-primary-forest font-bold uppercase text-[10px] tracking-wider font-mono">
                      <th className="py-3 px-3">Profissional</th>
                      <th className="py-3 px-3">Cupom Paciente (8%)</th>
                      <th className="py-3 px-3">Contato & Telefone</th>
                      <th className="py-3 px-3">Registro (CRN)</th>
                      <th className="py-3 px-3">Cidade / UF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2E4030]/5">
                    {paginatedMembers.length > 0 ? (
                      paginatedMembers.map(member => (
                        <tr key={member.id} className="hover:bg-[#FAF7F2] transition-colors">
                          <td className="py-3 px-3 font-semibold text-primary-forest">
                            <div className="flex flex-col">
                              <span>{member.name}</span>
                              <span className="text-[10px] text-[#6A786C] font-mono font-normal">{member.email}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="inline-flex items-center gap-1.5 font-mono font-extrabold text-[11px] text-[#7A5B1D] bg-[#FAF3E0] border border-[#E8DAB2] px-2 py-0.5 rounded-md shadow-xs" title="Cupom oficial de 8% de desconto para clientes/pacientes">
                              <Tag className="w-3 h-3 text-primary-accent" />
                              <span>{member.patientCoupon || getPatientCoupon(member.name)}</span>
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px] text-[#4A554B]">
                            {member.phone ? (
                              <span className="inline-flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#6A786C]" />
                                {member.phone}
                              </span>
                            ) : (
                              <span className="text-[#8E9B90] italic">-</span>
                            )}
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px] text-primary-forest font-semibold">{member.crn || '-'}</td>
                          <td className="py-3 px-3">
                            {member.city || member.state ? (
                              <span>{member.city ? (member.state ? `${member.city} - ${member.state}` : member.city) : member.state}</span>
                            ) : (
                              <span className="text-[#8E9B90] italic text-[11px]">Não informada</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-[#6A786C] space-y-2">
                          <p className="text-xs font-semibold">Nenhuma nutricionista encontrada.</p>
                          {memberSearchQuery && (
                            <button
                              type="button"
                              onClick={() => {
                                setMemberSearchQuery('');
                                setMemberCurrentPage(1);
                              }}
                              className="text-xs font-bold text-primary-accent underline cursor-pointer"
                            >
                              Limpar filtro de busca
                            </button>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Navigation Footer (15 rows limit per page) */}
              {filteredMembers.length > 0 && (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#2E4030]/10">
                  <div className="text-xs text-[#6A786C] font-mono">
                    Mostrando <strong className="text-primary-forest font-bold">{memberStartIndex}</strong> a <strong className="text-primary-forest font-bold">{memberEndIndex}</strong> de <strong className="text-primary-forest font-bold">{filteredMembers.length}</strong> nutricionistas (15 por página)
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    {/* Previous Page Button */}
                    <button
                      type="button"
                      onClick={() => setMemberCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={safeMemberPage <= 1}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        safeMemberPage <= 1
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed border border-transparent'
                          : 'text-primary-forest bg-[#FAF7F2] hover:bg-[#F0EAE1] border border-[#2E4030]/15 cursor-pointer shadow-xs'
                      }`}
                      title="Página Anterior"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Anterior</span>
                    </button>

                    {/* Numbered Page Tabs */}
                    {getPaginationTabs(safeMemberPage, totalMemberPages).map((pageNum, idx) => {
                      if (pageNum === '...') {
                        return (
                          <span key={`ellipsis-${idx}`} className="px-2 text-xs font-bold text-gray-400">
                            ...
                          </span>
                        );
                      }

                      const isCurrent = pageNum === safeMemberPage;
                      return (
                        <button
                          key={`page-${pageNum}`}
                          type="button"
                          onClick={() => setMemberCurrentPage(Number(pageNum))}
                          className={`min-w-[32px] h-8 px-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-primary-forest text-white shadow-sm border border-primary-forest'
                              : 'bg-[#FAF7F2] hover:bg-[#F0EAE1] text-[#4A554B] border border-[#2E4030]/15'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Next Page Button */}
                    <button
                      type="button"
                      onClick={() => setMemberCurrentPage(prev => Math.min(totalMemberPages, prev + 1))}
                      disabled={safeMemberPage >= totalMemberPages}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        safeMemberPage >= totalMemberPages
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed border border-transparent'
                          : 'text-primary-forest bg-[#FAF7F2] hover:bg-[#F0EAE1] border border-[#2E4030]/15 cursor-pointer shadow-xs'
                      }`}
                      title="Próxima Página"
                    >
                      <span className="hidden sm:inline">Próxima</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Excel / Supabase Nutritionists Importer Modal */}
      <AdminImportMembersModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        existingMembers={members}
        onImportSuccess={(newMembers, count) => {
          setMembers(prev => {
            const existingEmails = new Set(newMembers.map(nm => nm.email.toLowerCase()));
            const nonDuplicates = prev.filter(p => !existingEmails.has(p.email.toLowerCase()));
            return [...newMembers, ...nonDuplicates];
          });
          triggerSuccess(`🎉 ${count} nutricionistas importadas e sincronizadas com sucesso!`);
        }}
      />

      {/* Supabase SQL Schema Viewer Modal */}
      {isSqlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#2E4030]/15 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#1C261D] via-[#243325] to-[#121A13] p-6 text-[#F7F3EC] flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary-accent text-xs font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Configuração do Banco de Dados</span>
                </div>
                <h2 className="text-xl font-serif font-bold text-white">
                  Script SQL para o Supabase (Schema & RLS)
                </h2>
                <p className="text-xs text-[#C2C9C0]">
                  Execute este script no <strong>SQL Editor</strong> do seu projeto Supabase para criar as tabelas <code>profiles</code>, <code>points_history</code> e <code>course_progress</code>.
                </p>
              </div>

              <button
                onClick={() => setIsSqlModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#2E4030]/10 text-xs text-[#3E4A3F] space-y-2">
                <div className="flex items-center gap-2 font-bold text-primary-forest text-sm">
                  <Sparkles className="w-4 h-4 text-primary-accent" />
                  <span>Passo a Passo Rápido:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-xs text-[#526054]">
                  <li>Abra o painel do seu projeto no <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-primary-accent font-bold underline inline-flex items-center gap-0.5">Supabase Dashboard <ExternalLink className="w-3 h-3" /></a></li>
                  <li>No menu lateral esquerdo, clique no ícone <strong>SQL Editor</strong></li>
                  <li>Clique em <strong>+ New query</strong>, cole o script abaixo e clique no botão verde <strong>Run</strong></li>
                </ol>
              </div>

              <div className="bg-[#182219] p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                  <span className="text-xs font-mono font-bold text-secondary-accent">
                    schema.sql (PostgreSQL)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
                      setCopiedAdminSql(true);
                      setTimeout(() => setCopiedAdminSql(false), 3000);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold transition-all text-white cursor-pointer border border-white/20 shadow-xs"
                  >
                    {copiedAdminSql ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-secondary-accent" />
                        <span>Copiar Script SQL Completo</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11px] font-mono bg-black/60 p-4 rounded-xl max-h-72 overflow-y-auto whitespace-pre-wrap text-emerald-300 border border-white/10 leading-relaxed">
                  {SUPABASE_SQL_SCHEMA}
                </pre>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#FAF7F2] p-4 border-t border-[#2E4030]/10 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsSqlModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-primary-forest text-white text-xs font-bold hover:bg-primary-forest/90 transition-all cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
