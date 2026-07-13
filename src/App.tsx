/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { AcademyView } from './components/AcademyView';
import { ProductsView } from './components/ProductsView';
import { LibraryView } from './components/LibraryView';
import { CampaignsView } from './components/CampaignsView';
import { ProfileView } from './components/ProfileView';
import { AdminView } from './components/AdminView';
import { LoginView } from './components/LoginView';

import { 
  Search, 
  Bell, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Sprout, 
  User, 
  Check, 
  ChevronRight, 
  X,
  AlertCircle
} from 'lucide-react';

import { 
  PRODUCTS, 
  COURSES, 
  CAMPAIGNS, 
  NEWSLETTER, 
  ATTACHMENTS,
  MEMBERS,
  COMMUNITY_POSTS
} from './data';
import { UserRole, UserProfile, Course, Product, FileAttachment, Campaign, Member, CommunityPost } from './types';

export default function App() {
  // Profiles
  const nutriProfile: UserProfile = {
    name: 'Dra. Marina Silva',
    email: 'marina.silva@saude.com.br',
    phone: '(11) 98765-4321',
    instagram: '@dra.marinasilva',
    specialty: 'Nutrição Clínica Funcional',
    city: 'São Paulo',
    state: 'SP',
    role: UserRole.NUTRICIONISTA,
    crn: 'CRN-3 71830',
  };

  const adminProfile: UserProfile = {
    name: 'Madeleine',
    email: 'madeleine@seracacau.com.br',
    phone: '(73) 99912-3456',
    instagram: '@sera.cacau.brasil',
    specialty: 'Fundadora & Curadora Cabruca',
    city: 'Serra Grande',
    state: 'BA',
    role: UserRole.ADMIN,
  };

  // State
  const [currentUser, setCurrentUser] = useState<UserProfile>(nutriProfile);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Sync session state from localStorage
  useEffect(() => {
    const auth = localStorage.getItem('sera_cacau_authenticated') === 'true';
    const savedUser = localStorage.getItem('sera_cacau_user');
    if (auth && savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        // Fallback
      }
    }
    setIsAuthLoading(false);
  }, []);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('sera_cacau_authenticated', 'true');
    localStorage.setItem('sera_cacau_user', JSON.stringify(user));
    if (user.role === UserRole.ADMIN) {
      setCurrentTab('admin');
    } else {
      setCurrentTab('dashboard');
    }
  };

  const handleLogout = () => {
    const confirmExit = window.confirm("Deseja realmente sair da plataforma?");
    if (confirmExit) {
      setIsAuthenticated(false);
      localStorage.removeItem('sera_cacau_authenticated');
      localStorage.removeItem('sera_cacau_user');
    }
  };
  
  // Data State (allows admin edits to persist during session)
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS);
  const [newsletters, setNewsletters] = useState<any[]>(NEWSLETTER);
  const [attachments, setAttachments] = useState<FileAttachment[]>(ATTACHMENTS);

  const [members] = useState<Member[]>(MEMBERS);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);

  const handleUpdateCourse = (updated: Course) => {
    setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
  };
  
  // Completed Classes tracking
  const [completedClassIds, setCompletedClassIds] = useState<string[]>(['c1-m1-cl1']); // Starts with first class complete for realism
  const [metricDownloads, setMetricDownloads] = useState<number>(34); // Starting simulated download metric

  // Product & Course focus state (for deep links/detailed views)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Search & Notification States (AstroMembers Architecture)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState([
    { 
      id: 'notif-1', 
      title: 'Laudo de Lote Liberado', 
      desc: 'Lote #0812 do Cacau em Gotas 100% Puro foi testado e aprovado.', 
      time: 'Há 5m', 
      read: false, 
      category: 'Laudos',
      tabId: 'biblioteca'
    },
    { 
      id: 'notif-2', 
      title: 'Novo Módulo Disponível', 
      desc: 'Módulo de Modulação Bioquímica adicionado ao curso de Nutrição Integrativa.', 
      time: 'Há 2h', 
      read: false, 
      category: 'Cursos',
      tabId: 'academia'
    },
    { 
      id: 'notif-3', 
      title: 'Campanha de Amostras de Baunilha', 
      desc: 'Solicite seu kit exclusivo de baunilha orgânica para consultório.', 
      time: 'Ontem', 
      read: true, 
      category: 'Campanhas',
      tabId: 'campanhas'
    }
  ]);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close search/notifications on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Switch between Nutricionista and Admin roles
  const switchUserRole = () => {
    if (currentUser.role === UserRole.NUTRICIONISTA) {
      setCurrentUser(adminProfile);
      // Auto-switch to admin panel tab for a seamless experience
      setCurrentTab('admin');
    } else {
      setCurrentUser(nutriProfile);
      setCurrentTab('dashboard');
    }
  };

  const toggleCompleteClass = (classId: string) => {
    setCompletedClassIds(prev => 
      prev.includes(classId) 
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  const handleNavigateWithTarget = (tabId: string, productOrCourse?: any) => {
    setCurrentTab(tabId);
    if (tabId === 'produtos' && productOrCourse) {
      setSelectedProduct(productOrCourse);
    } else if (tabId === 'academia' && productOrCourse) {
      setSelectedCourse(productOrCourse);
    } else {
      // Clear specific focuses when navigating normally
      if (tabId !== 'produtos') setSelectedProduct(null);
      if (tabId !== 'academia') setSelectedCourse(null);
    }
    // Close overlay state
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleAddAttachment = (newAtt: FileAttachment) => {
    setAttachments(prev => [newAtt, ...prev]);
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setCurrentUser(updated);
  };

  const incrementDownloads = () => {
    setMetricDownloads(prev => prev + 1);
  };

  // Dynamic Course count calculations for Sidebar & Dashboard Progress metrics
  const totalClassesCount = courses.reduce((acc, course) => {
    return acc + (course.modules?.reduce((mAcc, mod) => mAcc + (mod.classes?.length || 0), 0) || 0);
  }, 0);

  const completedCount = completedClassIds.length;

  // Filter search results
  const filteredCourses = searchQuery 
    ? courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const filteredProducts = searchQuery 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tagline.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif: any) => {
    // Mark as read
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setShowNotifications(false);
    
    // Determine target
    if (notif.tabId === 'academia') {
      handleNavigateWithTarget('academia');
    } else if (notif.tabId === 'biblioteca') {
      handleNavigateWithTarget('biblioteca');
    } else if (notif.tabId === 'campanhas') {
      handleNavigateWithTarget('campanhas');
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-bg-app text-primary-text font-sans flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 border-2 border-primary-accent/20 border-t-primary-accent rounded-full animate-spin" />
        </div>
        <span className="text-xs uppercase tracking-widest text-secondary-text font-mono animate-pulse">Sincronizando Ecossistema...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginView 
        onLogin={handleLogin} 
        nutriProfile={nutriProfile} 
        adminProfile={adminProfile} 
      />
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-bg-app text-primary-text font-sans overflow-hidden relative selection:bg-primary-accent selection:text-white">
      
      {/* 1. Mandatory analog grain overlay (Law 04 of the palette) */}
      <div className="grain-overlay opacity-[0.03]" />

      {/* 2. Responsive Sidebar / Header */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={(tab) => handleNavigateWithTarget(tab)} 
        user={currentUser}
        switchUserRole={switchUserRole}
        completedCount={completedCount}
        totalCount={totalClassesCount}
        onLogout={handleLogout}
      />

      {/* 3. Main Workspace Container */}
      <main className="flex-1 bg-bg-app overflow-y-auto h-full pb-24 md:pb-8 flex flex-col justify-between">
        
        {/* Persistent Premium Header (AstroMembers Architecture) */}
        <header className="hidden md:flex items-center justify-between px-12 py-5 border-b border-border-color/40 max-w-7xl mx-auto w-full bg-bg-app/80 backdrop-blur-md sticky top-0 z-20">
          
          {/* Global Search Bar */}
          <div ref={searchRef} className="relative w-96">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text/60" />
              <input 
                type="text"
                placeholder="Pesquisar cursos, produtos, laudos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-4 py-2 bg-white focus:bg-white border border-border-color focus:border-primary-accent/40 rounded-full text-xs tracking-wider uppercase placeholder:text-secondary-text/40 text-primary-text focus:outline-none transition-all duration-300 shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text/60 hover:text-primary-text"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface text-primary-text rounded-xl shadow-2xl border border-border-color overflow-hidden z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {!searchQuery ? (
                  <div className="p-4 text-center text-xs text-secondary-text/50 font-serif italic">
                    Digite algo para pesquisar no ecossistema Será Cacau
                  </div>
                ) : filteredCourses.length === 0 && filteredProducts.length === 0 ? (
                  <div className="p-4 text-center text-xs text-secondary-text/50 flex flex-col items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary-accent" />
                    <span>Nenhum resultado encontrado para "{searchQuery}"</span>
                  </div>
                ) : (
                  <div className="flex flex-col max-h-96 overflow-y-auto divide-y divide-border-color/60">
                    
                    {/* Courses Section */}
                    {filteredCourses.length > 0 && (
                      <div className="p-2">
                        <span className="text-[9px] uppercase tracking-widest text-primary-accent font-bold px-2 block mb-1.5 font-mono">
                          Cursos & Aulas
                        </span>
                        {filteredCourses.map(course => (
                          <button
                            key={course.id}
                            onClick={() => handleNavigateWithTarget('academia', course)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary-surface/40 text-left transition-colors"
                          >
                            <img src={course.coverImage} className="w-10 h-10 object-cover rounded bg-secondary-surface shrink-0" alt={course.title} referrerPolicy="no-referrer" />
                            <div className="min-w-0">
                              <h4 className="text-xs font-semibold text-primary-text truncate">{course.title}</h4>
                              <p className="text-[9px] text-secondary-text tracking-wider uppercase truncate">{course.instructor} • {course.duration}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Products Section */}
                    {filteredProducts.length > 0 && (
                      <div className="p-2">
                        <span className="text-[9px] uppercase tracking-widest text-primary-accent font-bold px-2 block mb-1.5 font-mono">
                          Produtos Rituais
                        </span>
                        {filteredProducts.map(product => (
                          <button
                            key={product.id}
                            onClick={() => handleNavigateWithTarget('produtos', product)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary-surface/40 text-left transition-colors"
                          >
                            <img src={product.imageUrl} className="w-10 h-10 object-cover rounded bg-secondary-surface shrink-0" alt={product.name} referrerPolicy="no-referrer" />
                            <div className="min-w-0">
                              <h4 className="text-xs font-semibold text-primary-text truncate">{product.name}</h4>
                              <p className="text-[9px] text-secondary-text tracking-wider uppercase truncate">{product.line} • {product.price}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-6">
            
            {/* Quick Slogan Accent */}
            <span className="hidden lg:inline text-[9px] tracking-[0.25em] uppercase text-primary-accent/50 font-mono font-bold">
              Cabruca Purism Area
            </span>

            {/* Notifications Center */}
            <div ref={notifRef} className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-full bg-white hover:bg-secondary-surface/40 text-primary-text border border-border-color transition-all hover:scale-105 active:scale-95"
                title="Notificações"
              >
                <Bell className="w-4.5 h-4.5 text-primary-accent" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary-accent border-2 border-bg-app rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-[0_0_8px_rgba(217,132,91,0.5)]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Container */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-surface text-primary-text rounded-2xl shadow-2xl border border-border-color overflow-hidden z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="p-4 border-b border-border-color/60 flex justify-between items-center bg-secondary-surface/30">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary-text">Notificações</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary-accent/10 text-primary-accent font-bold">{unreadCount} novas</span>
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={handleMarkAllAsRead}
                        className="text-[9px] text-primary-accent hover:text-primary-accent/80 uppercase tracking-wider font-bold transition-colors"
                      >
                        Ler todas
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-border-color/60 max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-secondary-text/50 font-serif italic">
                        Sem notificações no momento.
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <button
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          className={`w-full p-4 hover:bg-secondary-surface/30 text-left transition-colors flex gap-3 ${!notif.read ? 'bg-secondary-surface/10' : ''}`}
                        >
                          <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${!notif.read ? 'bg-primary-accent shadow-[0_0_6px_rgba(217,132,91,0.8)]' : 'bg-secondary-text/20'}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-primary-accent font-mono">{notif.category}</span>
                              <span className="text-[9px] text-secondary-text/40 font-mono shrink-0">{notif.time}</span>
                            </div>
                            <h4 className="text-xs font-bold text-primary-text mt-0.5 truncate">{notif.title}</h4>
                            <p className="text-xs text-secondary-text mt-1 line-clamp-2 leading-relaxed">{notif.desc}</p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Trigger */}
            <button 
              onClick={() => handleNavigateWithTarget('perfil')}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white hover:bg-secondary-surface/40 transition-all border border-border-color"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-accent to-luxury-accent p-[1.5px] shrink-0">
                <div className="w-full h-full rounded-full bg-secondary-surface flex items-center justify-center font-serif text-xs font-bold text-primary-text uppercase">
                  {currentUser.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    currentUser.name.charAt(0)
                  )}
                </div>
              </div>
              <div className="hidden lg:flex flex-col items-start leading-none text-left">
                <span className="text-xs font-semibold text-primary-text">{currentUser.name}</span>
                <span className="text-[8px] text-primary-accent/70 tracking-widest uppercase mt-0.5 font-mono font-bold">Ver Perfil</span>
              </div>
            </button>

          </div>
        </header>

        {/* Active Tab View Router */}
        <div className="w-full">
          {currentTab === 'dashboard' && (
            <DashboardView 
              user={currentUser}
              courses={courses}
              products={products}
              campaigns={campaigns}
              downloads={attachments}
              onNavigate={handleNavigateWithTarget}
              onSelectProduct={setSelectedProduct}
              onSelectCourse={setSelectedCourse}
            />
          )}

          {currentTab === 'academia' && (
            <AcademyView 
              courses={courses}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              completedClassIds={completedClassIds}
              toggleCompleteClass={toggleCompleteClass}
              user={currentUser}
              communityPosts={communityPosts}
              onAddCommunityPost={(post) => setCommunityPosts(prev => [post, ...prev])}
            />
          )}

          {currentTab === 'produtos' && (
            <ProductsView 
              products={products}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          )}

          {currentTab === 'biblioteca' && (
            <LibraryView 
              attachments={attachments}
              onDownloadIncrement={incrementDownloads}
            />
          )}

          {currentTab === 'campanhas' && (
            <CampaignsView 
              campaigns={campaigns}
            />
          )}

          {currentTab === 'perfil' && (
            <ProfileView 
              user={currentUser}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {currentTab === 'admin' && currentUser.role === UserRole.ADMIN && (
            <AdminView 
              courses={courses}
              onAddCourse={handleAddCourse}
              products={products}
              onAddProduct={handleAddProduct}
              attachments={attachments}
              onAddAttachment={handleAddAttachment}
              metricDownloads={metricDownloads}
              members={members}
              onUpdateCourse={handleUpdateCourse}
            />
          )}
        </div>

        {/* Minimalist Page Footer */}
        <footer className="w-full border-t border-border-color/60 mt-12 py-6 px-12 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-sans tracking-widest uppercase text-secondary-text/50 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-luxury-accent" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15C42 22 35 34 35 48C35 65 44 78 50 85C56 78 65 65 65 48C65 34 58 22 50 15Z" stroke="currentColor" strokeWidth="4" />
            </svg>
            <span>Será Cacau Ltda © 2026</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary-accent transition-colors" onClick={(e) => { e.preventDefault(); alert('Políticas de Privacidade de Será Cacau: seus dados protegidos sob a LGPD.'); }}>Políticas</a>
            <span>·</span>
            <a href="#" className="hover:text-primary-accent transition-colors" onClick={(e) => { e.preventDefault(); alert('Canal oficial de Suporte da Será: suporte@seracacau.com.br'); }}>Suporte</a>
          </div>
        </footer>

      </main>
    </div>
  );
}
