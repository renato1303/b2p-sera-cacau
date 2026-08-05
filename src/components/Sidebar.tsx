/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
  Trophy
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
    { id: 'academia', label: 'Cursos & Aulas', icon: GraduationCap, badge: 'Premium' },
    { id: 'gamificacao', label: 'Meu Progresso', icon: CheckCircle, badge: null },
    { id: 'produtos', label: 'Produtos', icon: Sprout, badge: null },
    { id: 'biblioteca', label: 'Central de Arquivos', icon: BookOpen, badge: 'Laudos' },
  ];

  if (user.role === UserRole.ADMIN) {
    menuItems.push({ id: 'admin', label: 'Administrador', icon: Settings, badge: 'Gestor' });
  }

  // Calculate percentage progress
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <>
      {/* Desktop Sidebar (AstroMembers / Power BI Experience Architecture) */}
      <aside 
        id="desktop-sidebar"
        className="hidden md:flex flex-col w-72 h-screen bg-primary-forest text-[#F7F3EC] border-r border-secondary-forest/20 p-6 justify-between shrink-0 sticky top-0 z-30 font-sans shadow-2xl"
      >
        <div className="flex flex-col gap-6">
          
          {/* 1. Header Brand & Logo */}
          <div className="flex items-center gap-3 pb-5 border-b border-[#455347]/40">
            <div className="relative group">
              {/* Vibrant organic aura behind logo */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-primary-accent to-luxury-accent opacity-30 group-hover:opacity-60 blur transition-opacity duration-500"></div>
              <img 
                src="/images/logo_sera_trimmed.png" 
                alt="Será Cacau" 
                className="relative w-9 h-9 object-contain transition-transform duration-700 hover:scale-105" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-[15px] tracking-[0.2em] uppercase text-white leading-none">SERÁ CACAU</span>
              <span className="text-[8px] tracking-[0.35em] uppercase text-luxury-accent font-bold mt-1">MEMBER AREA</span>
            </div>
          </div>
 
          {/* 2. Embedded User Profile & Dynamic Progress Bar (AstroMembers Signature UX) */}
          <div className="flex flex-col items-center text-center py-4 border-b border-[#455347]/40">
            {/* Glowing multi-color avatar ring */}
            <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-primary-accent via-luxury-accent to-secondary-accent shadow-[0_0_15px_rgba(217,132,91,0.25)] mb-3 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-accent via-luxury-accent to-secondary-accent blur-sm opacity-50 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative w-16 h-16 rounded-full bg-secondary-forest flex items-center justify-center text-white font-serif font-bold text-xl uppercase border border-black/30 overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span>{user.name.charAt(0)}</span>
                )}
              </div>
              <div className="absolute bottom-0 right-1 w-4 h-4 bg-secondary-accent border-2 border-primary-forest rounded-full shadow-lg"></div>
            </div>

            <div className="flex flex-col min-w-0 mb-4">
              <span className="text-sm font-bold tracking-wide text-white truncate">
                {user.name}
              </span>
              <span className="text-[9px] text-secondary-surface/80 tracking-widest uppercase mt-0.5 font-mono">
                {user.role === UserRole.ADMIN ? 'Gestor Cabruca' : user.specialty || 'Nutricionista'}
              </span>
            </div>

            {/* Dynamic Progress Indicator */}
            <div className="w-full flex flex-col gap-1 px-1">
              <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-secondary-surface/80">
                <span>Seu progresso</span>
                <span className="text-luxury-accent font-mono font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary-accent to-luxury-accent h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(217,132,91,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* 3. Main Menu Navigation */}
          <div className="flex flex-col gap-1">
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    id={`nav-item-${item.id}`}
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-lg transition-all duration-200 group text-left ${
                      isActive 
                        ? 'bg-white/5 border-l-4 border-luxury-accent text-white font-bold' 
                        : 'hover:bg-white/5 text-[#EFE6D7]/80 hover:text-white border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <Icon className={`w-4.5 h-4.5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? 'text-luxury-accent drop-shadow-[0_0_5px_rgba(198,165,106,0.5)]' : 'text-[#9BA98E]'
                      }`} />
                      <span className="text-xs tracking-wider uppercase font-semibold">{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className={`text-[8px] px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                        isActive ? 'bg-white/10 text-luxury-accent' : 'bg-white/10 text-luxury-accent/80'
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
        </div>

        {/* 4. Configuration and Simulated Logout Footer */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[#455347]/40">
          {/* Quick config button linking to profile */}
          <button
            id="nav-item-perfil-quick"
            onClick={() => setCurrentTab('perfil')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200 text-left ${
              currentTab === 'perfil' 
                ? 'bg-white/5 text-white font-medium border border-luxury-accent/30' 
                : 'hover:bg-white/5 text-[#EFE6D7]/80 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-luxury-accent" />
            <span className="text-xs tracking-wider uppercase font-medium">Minha Conta</span>
          </button>

          {/* Luxury Logout Accent */}
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3.5 py-2.5 text-rose-300 hover:text-rose-400 transition-all text-left text-xs uppercase font-medium tracking-wider hover:bg-rose-500/5 rounded-lg"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sair da Sessão</span>
          </button>

          <div className="text-[8px] text-white/20 font-mono tracking-widest uppercase text-center mt-1">
            Será Cacau © 2026
          </div>
        </div>
      </aside>

      {/* Mobile Header and Floating Navigation */}
      <div className="md:hidden flex flex-col w-full bg-primary-forest text-[#F7F3EC] sticky top-0 z-40">
        <header className="flex items-center justify-between px-5 py-3.5 border-b border-secondary-forest/40 shadow-md">
          <div className="flex items-center gap-2.5">
            <img src="/images/logo_sera_trimmed.png" alt="Será Cacau" className="w-7 h-7 object-contain" />
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-sm tracking-wider uppercase text-white leading-none">SERÁ CACAU</span>
              <span className="text-[7px] tracking-widest uppercase text-luxury-accent mt-0.5">MEMBER</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Minimal Mobile Progress indicator */}
            <div className="flex flex-col items-end text-right">
              <span className="text-[8px] uppercase tracking-wider text-[#EFE6D7]/60">Progresso</span>
              <span className="text-[9px] font-mono font-bold text-luxury-accent">{progressPercent}%</span>
            </div>
          </div>
        </header>

        {/* Mobile Bottom Bar Nav */}
        <nav 
          id="mobile-nav"
          className="fixed bottom-0 left-0 right-0 h-16 bg-primary-forest border-t border-secondary-forest/40 flex justify-around items-center px-2 z-50 shadow-2xl"
        >
          {menuItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex flex-col items-center gap-1 py-1 px-3.5 rounded-lg transition-all ${
                  isActive ? 'text-luxury-accent font-semibold bg-white/5' : 'text-[#EFE6D7]/80'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span className="text-[8px] font-sans tracking-widest uppercase font-medium">{item.label}</span>
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentTab(user.role === UserRole.ADMIN ? 'admin' : 'perfil')}
            className={`flex flex-col items-center gap-1 py-1 px-3.5 rounded-lg transition-all ${
              currentTab === 'perfil' || currentTab === 'admin' ? 'text-luxury-accent font-semibold bg-white/5' : 'text-[#EFE6D7]/80'
            }`}
          >
            <User className="w-4.5 h-4.5" />
            <span className="text-[8px] font-sans tracking-widest uppercase font-medium">
              {user.role === UserRole.ADMIN ? 'Painel' : 'Perfil'}
            </span>
          </button>
        </nav>
      </div>
    </>
  );
};
