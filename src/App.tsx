/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { SeraCacauIcon } from './components/SeraCacauIcon';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { AcademyView } from './components/AcademyView';
import { ProductsView } from './components/ProductsView';
import { LibraryView } from './components/LibraryView';
import { CampaignsView } from './components/CampaignsView';
import { ProfileView } from './components/ProfileView';
import { AdminView } from './components/AdminView';
import { LoginView } from './components/LoginView';
import { GamificationView } from './components/GamificationView';
import { RecipesView } from './components/RecipesView';
import { ScienceView } from './components/ScienceView';
import { TechnicalSheetView } from './components/TechnicalSheetView';
import { CommunityView } from './components/CommunityView';
import { BlogView } from './components/BlogView';
import { SupportView } from './components/SupportView';
import { supabase, isSupabaseConfigured } from './lib/supabaseClient';

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
  COMMUNITY_POSTS,
  POINTS_HISTORY,
  REWARDS
} from './data';
import { BLOG_POSTS, BlogPost } from './data/blog';
import { RECIPES } from './data/recipes';
import { TECHNICAL_SHEETS, TechnicalSheetData } from './data/technicalSheets';
import { SCIENCE_ARTICLES } from './data/science';
import { UserRole, UserProfile, Course, Product, FileAttachment, Campaign, Member, CommunityPost, PointsEntry, GamificationReward, Recipe, ScienceArticle } from './types';

export default function App() {
  // Profiles
  const nutriProfile: UserProfile = {
    name: 'Renato Santos',
    email: 'renato.santos@nutri.com.br',
    phone: '(11) 98765-4321',
    instagram: '@renatonutri',
    specialty: 'Nutrição Clínica Funcional',
    city: 'São Paulo',
    state: 'SP',
    role: UserRole.NUTRICIONISTA,
    crn: '',
  };

  const adminProfile: UserProfile = {
    name: 'Luna Azevedo',
    email: 'luna.azevedo.1@gmail.com',
    phone: '(21) 98765-4321',
    instagram: '@lunaazevedo',
    specialty: 'Nutricionista & Curadora Cabruca',
    city: 'Rio de Janeiro',
    state: 'RJ',
    role: UserRole.ADMIN,
  };

  // State
  const [currentUser, setCurrentUser] = useState<UserProfile>(nutriProfile);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Sync session state from Supabase / LocalStorage
  useEffect(() => {
    setIsAuthLoading(true);

    if (!isSupabaseConfigured) {
      // Fallback if Supabase is not configured yet (so developers can still use/review the UI using mock/local states)
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
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user) {
        // Fetch real profile from db
        supabase.from('profiles').select('*').eq('id', session.user.id).single()
          .then(({ data: profile }) => {
            if (profile) {
              const mappedProfile: UserProfile = {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                phone: profile.phone || '',
                instagram: profile.instagram || '',
                specialty: profile.specialty || 'Nutrição Integrativa',
                city: profile.city || '',
                state: profile.state || '',
                role: (profile.role === 'ADMIN' ? UserRole.ADMIN : UserRole.NUTRICIONISTA),
                crn: profile.crn || '',
                patientCoupon: profile.patient_coupon || profile.coupon_code || '',
                couponCode: profile.coupon_code || profile.patient_coupon || '',
                totalPoints: profile.total_points ?? 0,
                tier: profile.tier || 'Bronze'
              };
              setCurrentUser(mappedProfile);
              setIsAuthenticated(true);
              if (mappedProfile.role === UserRole.ADMIN) {
                setCurrentTab('admin');
              } else {
                setCurrentTab('dashboard');
              }
            } else {
              // Fallback if profile trigger is slow but auth session is active
              const fallbackProfile: UserProfile = {
                id: session.user.id,
                name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Nutricionista',
                email: session.user.email || '',
                phone: session.user.user_metadata?.phone || '',
                instagram: session.user.user_metadata?.instagram || '',
                specialty: session.user.user_metadata?.specialty || 'Nutrição Integrativa',
                city: session.user.user_metadata?.city || '',
                state: session.user.user_metadata?.state || '',
                role: session.user.user_metadata?.role || UserRole.NUTRICIONISTA,
                crn: session.user.user_metadata?.crn || '',
                patientCoupon: session.user.user_metadata?.patient_coupon || '',
                couponCode: session.user.user_metadata?.coupon_code || '',
                totalPoints: 0,
                tier: 'Bronze'
              };
              setCurrentUser(fallbackProfile);
              setIsAuthenticated(true);
            }
            setIsAuthLoading(false);
          });
      } else {
        const auth = localStorage.getItem('sera_cacau_authenticated') === 'true';
        const savedUser = localStorage.getItem('sera_cacau_user');
        if (auth && savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            setCurrentUser(parsed);
            setIsAuthenticated(true);
            if (parsed.role === UserRole.ADMIN) {
              setCurrentTab('admin');
            }
          } catch (e) {
            // Fallback
          }
        }
        setIsAuthLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setCurrentUser(null as any);
        setIsAuthenticated(false);
      } else if (session.user) {
        // Fetch or wait for profile
        supabase.from('profiles').select('*').eq('id', session.user.id).single()
          .then(({ data: profile }) => {
            if (profile) {
              const mappedProfile: UserProfile = {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                phone: profile.phone || '',
                instagram: profile.instagram || '',
                specialty: profile.specialty || 'Nutrição Integrativa',
                city: profile.city || '',
                state: profile.state || '',
                role: (profile.role === 'ADMIN' ? UserRole.ADMIN : UserRole.NUTRICIONISTA),
                crn: profile.crn || '',
                patientCoupon: profile.patient_coupon || profile.coupon_code || '',
                couponCode: profile.coupon_code || profile.patient_coupon || '',
                totalPoints: profile.total_points ?? 0,
                tier: profile.tier || 'Bronze'
              };
              setCurrentUser(mappedProfile);
              setIsAuthenticated(true);
            }
          });
      }
    });

    return () => {
      if (listener?.subscription) {
        listener.subscription.unsubscribe();
      }
    };
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

  const handleLogout = async () => {
    try {
      localStorage.removeItem('sera_cacau_authenticated');
      localStorage.removeItem('sera_cacau_user');
      if (isSupabaseConfigured) {
        await supabase.auth.signOut().catch(() => {});
      }
    } catch (err) {
      console.warn('Erro ao processar encerramento de sessão:', err);
    } finally {
      setIsAuthenticated(false);
      setCurrentUser(null as any);
      setCurrentTab('dashboard');
    }
  };

  // Load completed class progress from Supabase when currentUser is loaded
  useEffect(() => {
    if (isSupabaseConfigured && currentUser && currentUser.id) {
      supabase
        .from('course_progress')
        .select('class_id')
        .eq('member_id', currentUser.id)
        .then(({ data, error }) => {
          if (data && !error) {
            const ids = data.map((item: any) => item.class_id);
            setCompletedClassIds(ids);
          } else {
            setCompletedClassIds([]);
          }
        });
    } else {
      setCompletedClassIds([]);
    }
  }, [currentUser]);

  // Load registered members/nutritionists from Supabase profiles
  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (data && data.length > 0 && !error) {
            const dbMembers: Member[] = data
              .filter((p: any) => p.role !== 'ADMIN')
              .map((p: any) => ({
                id: p.id || `db-${p.email}`,
                name: p.name || 'Nutricionista',
                email: p.email || '',
                phone: p.phone || '',
                crn: p.crn || '',
                city: p.city || '',
                state: p.state || '',
                specialty: p.specialty || '',
                patientCoupon: p.patient_coupon || p.coupon_code || '',
                couponCode: p.coupon_code || p.patient_coupon || '',
                enrolledCourseIds: ['c1', 'c2'],
                joinedDate: p.created_at ? new Date(p.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recente',
                totalPoints: p.total_points ?? 0,
                tier: p.tier || 'Bronze'
              }));

            if (dbMembers.length > 0) {
              setMembers(prev => {
                const dbEmails = new Set(dbMembers.map(m => m.email.toLowerCase()));
                const nonDuplicates = prev.filter(m => !dbEmails.has(m.email.toLowerCase()));
                return [...dbMembers, ...nonDuplicates];
              });
            }
          }
        });
    }
  }, []);
  
  // Data State (allows admin edits to persist during session)
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS);
  const [newsletters, setNewsletters] = useState<any[]>(NEWSLETTER);
  const [attachments, setAttachments] = useState<FileAttachment[]>(ATTACHMENTS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES);
  const [technicalSheets, setTechnicalSheets] = useState<TechnicalSheetData[]>(TECHNICAL_SHEETS);
  const [scienceArticles, setScienceArticles] = useState<ScienceArticle[]>(SCIENCE_ARTICLES);

  const [members, setMembers] = useState<Member[]>(MEMBERS);
  const [pointsHistory, setPointsHistory] = useState<PointsEntry[]>(POINTS_HISTORY);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);

  const handleUpdateCourse = (updated: Course) => {
    setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
  };

  const handleDeleteBlogPost = (postId: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== postId));
  };

  const handleAddRecipe = (recipe: Recipe) => {
    setRecipes(prev => [recipe, ...prev]);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    setRecipes(prev => prev.filter(r => r.id !== recipeId));
  };

  const handleAddTechnicalSheet = (sheet: TechnicalSheetData) => {
    setTechnicalSheets(prev => [sheet, ...prev]);
  };

  const handleDeleteTechnicalSheet = (sheetId: string) => {
    setTechnicalSheets(prev => prev.filter(s => s.id !== sheetId));
  };

  const handleAddScienceArticle = (article: ScienceArticle) => {
    setScienceArticles(prev => [article, ...prev]);
  };

  const handleDeleteScienceArticle = (articleId: string) => {
    setScienceArticles(prev => prev.filter(a => a.id !== articleId));
  };
  
  // Completed Classes tracking (starts empty for new users)
  const [completedClassIds, setCompletedClassIds] = useState<string[]>([]);
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

  const toggleCompleteClass = async (classId: string) => {
    if (!isSupabaseConfigured || !currentUser || !currentUser.id) {
      // Fallback for unconfigured environment
      setCompletedClassIds(prev => 
        prev.includes(classId) 
          ? prev.filter(id => id !== classId)
          : [...prev, classId]
      );
      return;
    }

    const isCurrentlyCompleted = completedClassIds.includes(classId);

    // Find courseId associated with this classId
    let foundCourseId = 'c1'; // Default fallback
    for (const course of courses) {
      for (const mod of course.modules) {
        if (mod.classes.some(cls => cls.id === classId)) {
          foundCourseId = course.id;
          break;
        }
      }
    }

    try {
      if (isCurrentlyCompleted) {
        // Delete course progress entry from Supabase
        const { error } = await supabase
          .from('course_progress')
          .delete()
          .eq('member_id', currentUser.id)
          .eq('class_id', classId);
        
        if (!error) {
          setCompletedClassIds(prev => prev.filter(id => id !== classId));
        }
      } else {
        // Upsert course progress entry into Supabase
        const { error } = await supabase
          .from('course_progress')
          .upsert({
            member_id: currentUser.id,
            course_id: foundCourseId,
            class_id: classId
          });

        if (!error) {
          setCompletedClassIds(prev => [...prev, classId]);
        }
      }
    } catch (err) {
      console.error('Erro ao salvar progresso do curso:', err);
    }
  };

  const handleNavigateWithTarget = (tabId: string, productOrCourse?: any) => {
    setCurrentTab(tabId);
    if (tabId === 'produtos') {
      if (productOrCourse) setSelectedProduct(productOrCourse);
      else setSelectedProduct(null);
    } else {
      if (tabId !== 'produtos') setSelectedProduct(null);
    }

    if (tabId === 'academia') {
      if (productOrCourse) {
        setSelectedCourse(productOrCourse);
      } else {
        const cabrucaCourse = courses.find(c => c.id === 'course-1' || c.title.toLowerCase().includes('cabruca') || c.title.toLowerCase().includes('jornada')) || courses[0];
        setSelectedCourse(cabrucaCourse);
      }
    } else {
      setSelectedCourse(null);
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

  const handleUpdateProfile = async (updated: UserProfile) => {
    setCurrentUser(updated);
    localStorage.setItem('sera_cacau_user', JSON.stringify(updated));

    if (isSupabaseConfigured && updated.email) {
      try {
        await supabase
          .from('profiles')
          .upsert({
            email: updated.email.toLowerCase().trim(),
            name: updated.name,
            phone: updated.phone || '',
            crn: updated.crn || '',
            city: updated.city || '',
            state: updated.state || '',
            specialty: updated.specialty || 'Nutrição Integrativa & Funcional',
            instagram: updated.instagram || '',
            patient_coupon: updated.patientCoupon || updated.couponCode || '',
            coupon_code: updated.patientCoupon || updated.couponCode || '',
            updated_at: new Date().toISOString()
          }, { onConflict: 'email' });
      } catch (err) {
        console.warn('Erro ao atualizar perfil no Supabase:', err);
      }
    }
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

          {(currentTab === 'suporte' || currentTab === 'gamificacao') && (
            <SupportView 
              user={currentUser}
            />
          )}

          {currentTab === 'receitas' && (
            <RecipesView 
              recipes={recipes}
              onSelectProduct={(productName) => {
                const prod = products.find(p => p.name.toLowerCase().includes(productName.toLowerCase()));
                if (prod) {
                  setSelectedProduct(prod);
                  setCurrentTab('produtos');
                } else {
                  setCurrentTab('produtos');
                }
              }}
            />
          )}

          {currentTab === 'fichas' && (
            <TechnicalSheetView sheets={technicalSheets} />
          )}

          {currentTab === 'ciencia' && (
            <ScienceView articles={scienceArticles} />
          )}

          {currentTab === 'comunidade' && (
            <CommunityView 
              user={currentUser} 
              onOpenRitualRecipe={() => setCurrentTab('receitas')}
            />
          )}

          {currentTab === 'blog' && (
            <BlogView 
              posts={blogPosts}
              onNavigateToRecipes={() => setCurrentTab('receitas')}
            />
          )}

          {currentTab === 'biblioteca' && (
            <TechnicalSheetView sheets={technicalSheets} />
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
              onLogout={handleLogout}
            />
          )}

          {currentTab === 'admin' && currentUser.role === UserRole.ADMIN && (
            <AdminView 
              courses={courses}
              onAddCourse={handleAddCourse}
              onUpdateCourse={handleUpdateCourse}
              onDeleteCourse={handleDeleteCourse}
              products={products}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              blogPosts={blogPosts}
              onAddBlogPost={handleAddBlogPost}
              onDeleteBlogPost={handleDeleteBlogPost}
              recipes={recipes}
              onAddRecipe={handleAddRecipe}
              onDeleteRecipe={handleDeleteRecipe}
              technicalSheets={technicalSheets}
              onAddTechnicalSheet={handleAddTechnicalSheet}
              onDeleteTechnicalSheet={handleDeleteTechnicalSheet}
              scienceArticles={scienceArticles}
              onAddScienceArticle={handleAddScienceArticle}
              onDeleteScienceArticle={handleDeleteScienceArticle}
              attachments={attachments}
              onAddAttachment={handleAddAttachment}
              metricDownloads={metricDownloads}
              members={members}
              setMembers={setMembers}
              pointsHistory={pointsHistory}
              setPointsHistory={setPointsHistory}
            />
          )}
        </div>

        {/* Minimalist Page Footer */}
        <footer className="w-full border-t border-border-color/60 mt-12 py-6 px-12 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-sans tracking-widest uppercase text-secondary-text/50 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <SeraCacauIcon className="w-4 h-4 text-primary-accent" />
            <span>Será Cacau Ltda © 2026</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary-accent transition-colors" onClick={(e) => { e.preventDefault(); alert('Políticas de Privacidade de Será Cacau: seus dados protegidos sob a LGPD.'); }}>Políticas</a>
            <span>·</span>
            <button className="hover:text-primary-accent transition-colors uppercase cursor-pointer" onClick={() => setCurrentTab('suporte')}>Suporte/Ajuda</button>
          </div>
        </footer>

      </main>
    </div>
  );
}
