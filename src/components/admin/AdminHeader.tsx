/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  GraduationCap, 
  FileText, 
  ShoppingBag, 
  Utensils, 
  ShieldCheck, 
  Microscope, 
  Users, 
  ShoppingBag as ShopifyIcon,
  Sparkles
} from 'lucide-react';
import { SeraCacauIcon } from '../SeraCacauIcon';

export type AdminTab = 
  | 'courses' 
  | 'blog' 
  | 'products' 
  | 'recipes' 
  | 'sheets' 
  | 'science' 
  | 'members';

// For backwards compatibility if imported elsewhere
export type AdminActiveTab = AdminTab;

export interface AdminStats {
  totalCourses: number;
  totalProducts: number;
  totalPosts: number;
  totalRecipes: number;
  totalSheets: number;
  totalArticles: number;
  totalMembers: number;
}

interface AdminHeaderProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  stats: AdminStats;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onSelectTab,
  stats
}) => {
  const tabs = [
    { id: 'courses' as AdminTab, label: 'Cursos & Módulos', count: stats.totalCourses, icon: GraduationCap, color: 'text-primary-accent' },
    { id: 'blog' as AdminTab, label: 'Blog & Artigos', count: stats.totalPosts, icon: FileText, color: 'text-emerald-700' },
    { id: 'products' as AdminTab, label: 'Produtos', count: stats.totalProducts, icon: ShoppingBag, color: 'text-amber-700' },
    { id: 'recipes' as AdminTab, label: 'Receitas & Clínicas', count: stats.totalRecipes, icon: Utensils, color: 'text-luxury-accent' },
    { id: 'sheets' as AdminTab, label: 'Fichas Técnicas', count: stats.totalSheets, icon: ShieldCheck, color: 'text-teal-700' },
    { id: 'science' as AdminTab, label: 'Ciência do Cacau', count: stats.totalArticles, icon: Microscope, color: 'text-sky-700' },
    { id: 'members' as AdminTab, label: 'Cadastro de Nutris', count: stats.totalMembers, icon: Users, color: 'text-indigo-700' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C261D] via-[#243325] to-[#121A13] p-8 md:p-10 text-[#F7F3EC] border border-[#455347]/40 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-secondary-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-24 w-72 h-72 rounded-full bg-luxury-accent/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#E1D7C6] font-medium tracking-wide">
              <SeraCacauIcon className="w-3.5 h-3.5 text-secondary-accent" />
              <span>Painel de Gestão e Operações · Será Cacau</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-accent animate-pulse" />
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif text-white font-normal tracking-tight">
              Central de Administração & Conteúdo
            </h1>

            <p className="text-[#C2C9C0] text-sm sm:text-base leading-relaxed font-light">
              Publique e gerencie cursos, módulos, artigos do blog, fichas técnicas oficiais, evidências científicas, produtos, receitas e o cadastro de nutricionistas em tempo real.
            </p>
          </div>

          {/* Quick Metrics Badge Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0 bg-white/5 p-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="p-2.5 rounded-xl bg-white/5 text-center">
              <span className="block text-xl font-serif font-bold text-white">{stats.totalCourses}</span>
              <span className="text-[10px] text-[#A6B2A8] uppercase tracking-wider font-mono">Cursos</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 text-center">
              <span className="block text-xl font-serif font-bold text-white">{stats.totalPosts}</span>
              <span className="text-[10px] text-[#A6B2A8] uppercase tracking-wider font-mono">Blogs</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 text-center">
              <span className="block text-xl font-serif font-bold text-white">{stats.totalRecipes}</span>
              <span className="text-[10px] text-[#A6B2A8] uppercase tracking-wider font-mono">Receitas</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 text-center">
              <span className="block text-xl font-serif font-bold text-white">{stats.totalMembers}</span>
              <span className="text-[10px] text-[#A6B2A8] uppercase tracking-wider font-mono">Nutris</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="bg-white p-2 rounded-2xl border border-[#2E4030]/10 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary-forest text-white shadow-md'
                    : 'text-[#4A554B] hover:bg-[#F2EDE4]/70 hover:text-primary-forest'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-secondary-accent' : tab.color}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#EDE7DC] text-[#4A554B]'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
