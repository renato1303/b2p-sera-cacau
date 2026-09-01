/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SERA_CACAU_LOGO } from '../assets/logo';
import { SeraCacauIcon } from './SeraCacauIcon';
import { 
  Home, 
  GraduationCap, 
  Sprout, 
  BookOpen, 
  Megaphone, 
  Newspaper, 
  User, 
  Settings, 
  Sparkles,
  LogOut,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Trophy,
  Users,
  Utensils,
  ShieldCheck,
  Microscope
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: UserProfile;
  switchUserRole: () => void;
  completedCount: number;
  totalCount: number;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  switchUserRole,
  completedCount,
  totalCount,
  onLogout
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Início', icon: Home, badge: null },
    { id: 'academia', label: 'Cursos & Aulas', icon: GraduationCap, badge: 'Aulas' },
    { id: 'comunidade', label: 'Comunidade', icon: Users, badge: 'Círculo' },
    { id: 'produtos', label: 'Produtos', icon: Sprout, badge: null },
    { id: 'receitas', label: 'Receitas', icon: Utensils, badge: '19 Receitas' },
    { id: 'fichas', label: 'Ficha Técnica', icon: ShieldCheck, badge: 'Laudos' },
    { id: 'ciencia', label: 'Ciência do Cacau', icon: Microscope, badge: 'Artigos' },
    { id: 'blog', label: 'Blog', icon: Newspaper, badge: null },
    { id: 'suporte', label: 'Suporte/Ajuda', icon: HelpCircle, badge: 'WhatsApp' },
  ];

  if (user.role === UserRole.ADMIN) {
    menuItems.push({ id: 'admin', label: 'Administrador', icon: Settings, badge: 'Shopify' });
  }

  // Calculate percentage progress
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        id="desktop-sidebar"
        className="hidden md:flex flex-col w-72 h-screen bg-primary-forest text-[#F7F3EC] border-r border-secondary-forest/20 p-6 justify-between shrink-0 sticky top-0 z-30 font-sans shadow-2xl overflow-y-auto"
      >
        <div className="flex flex-col gap-5">
          
          {/* 1. Header Brand & Logo (Logo Completa com letras e ícone) */}
          <div className="flex items-center justify-center pb-4 border-b border-[#455347]/40">
            <div 
              className="relative group cursor-pointer w-full flex items-center justify-center" 
              onClick={() => setCurrentTab('dashboard')}
            >
              <img 
                src="/logoseranovo_white.png?v=solid" 
                alt="Será Cacau" 
                className="h-11 w-auto max-w-[210px] object-contain transition-transform duration-500 hover:scale-[1.03]" 
              />
            </div>
          </div>
 
          {/* 2. Embedded User Profile & Dynamic Progress Bar */}
          <div className="flex flex-col items-center text-center py-3 border-b border-[#455347]/40">
            <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-primary-accent via-luxury-accent to-secondary-accent shadow-[0_0_15px_rgba(217,132,91,0.25)] mb-2.5 group">
              <div className="relative w-14 h-14 rounded-full bg-secondary-forest flex items-center justify-center text-white font-serif font-bold text-lg uppercase border border-black/30 overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span>{user.name.charAt(0)}</span>
                )}
              </div>
              <div className="absolute bottom-0 right-1 w-3.5 h-3.5 bg-secondary-accent border-2 border-primary-forest rounded-full shadow-lg"></div>
            </div>

            <div className="flex flex-col min-w-0 mb-3">
              <span className="text-sm font-bold tracking-wide text-white truncate max-w-[200px]">
                {user.name}
              </span>
              <span className="text-[9px] text-secondary-surface/80 tracking-widest uppercase mt-0.5 font-mono">
                {user.role === UserRole.ADMIN ? 'Gestor Cabruca' : user.specialty || 'Nutricionista'}
              </span>
            </div>

            {/* Dynamic Progress Indicator */}
            <div className="w-full flex flex-col gap-1 px-1">
              <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-secondary-surface/80 font-mono">
                <span>Progresso nas Aulas</span>
                <span className="text-luxury-accent font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary-accent to-luxury-accent h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* 3. Main Menu Navigation */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group text-left ${
                    isActive 
                      ? 'bg-white/10 border-l-4 border-luxury-accent text-white font-bold' 
                      : 'hover:bg-white/5 text-[#EFE6D7]/80 hover:text-white border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.id === 'produtos' ? (
                      <SeraCacauIcon className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? 'text-luxury-accent' : 'text-[#9BA98E]'
                      }`} />
                    ) : (
                      <Icon className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? 'text-luxury-accent' : 'text-[#9BA98E]'
                      }`} />
                    )}
                    <span className="text-xs tracking-wider uppercase font-semibold">{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                      isActive ? 'bg-luxury-accent text-[#1C261D]' : 'bg-white/10 text-luxury-accent/90'
                    }`}>
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-white/40`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 4. Configuration and Logout Footer */}
        <div className="flex flex-col gap-2 pt-4 border-t border-[#455347]/40 mt-4">
          <button
            id="nav-item-perfil-quick"
            onClick={() => setCurrentTab('perfil')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
              currentTab === 'perfil' 
                ? 'bg-white/10 text-white font-medium border border-luxury-accent/30' 
                : 'hover:bg-white/5 text-[#EFE6D7]/80 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-luxury-accent" />
            <span className="text-xs tracking-wider uppercase font-medium">Minha Conta</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2 text-rose-300 hover:text-rose-400 transition-all text-left text-xs uppercase font-medium tracking-wider hover:bg-rose-500/10 rounded-lg"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sair da Sessão</span>
          </button>

          <div className="text-[8px] text-white/30 font-mono tracking-widest uppercase text-center pt-1">
            Será Cacau • Membros
          </div>
        </div>
      </aside>

      {/* Mobile Header and Navigation */}
      <div className="md:hidden flex flex-col w-full bg-primary-forest text-[#F7F3EC] sticky top-0 z-40">
        <header className="flex items-center justify-between px-4 py-2.5 border-b border-secondary-forest/40 shadow-md">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <img 
              src="/logoseranovo_white.png?v=solid" 
              alt="Será Cacau" 
              className="h-8 w-auto max-w-[170px] object-contain" 
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentTab('comunidade')}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${currentTab === 'comunidade' ? 'bg-white/10 text-luxury-accent' : 'text-white/80'}`}
            >
              <Users className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('receitas')}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${currentTab === 'receitas' ? 'bg-white/10 text-luxury-accent' : 'text-white/80'}`}
            >
              <Utensils className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Mobile Horizontal Quick Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto px-2 py-1.5 bg-[#172218] border-b border-secondary-forest/20 text-[10px] uppercase font-bold tracking-wider">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-all ${
                currentTab === item.id ? 'bg-luxury-accent text-[#1C261D]' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
