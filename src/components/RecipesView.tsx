/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { RECIPES } from '../data';
import { Recipe } from '../types';
import { 
  Utensils, 
  Sparkles, 
  Clock, 
  Users, 
  ChefHat, 
  Search, 
  Filter, 
  BookOpen, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Share2,
  Bookmark,
  Download,
  FileText,
  X,
  Stethoscope,
  Info,
  Compass
} from 'lucide-react';
import { downloadRecipePdf } from '../utils/recipePdfGenerator';
import { 
  DEFAULT_RECIPE_IMAGE, 
  DEFAULT_DANI_IMAGE, 
  DEFAULT_LUNA_IMAGE, 
  getRecipeDefaultImage 
} from '../assets/recipeImages';

interface RecipesViewProps {
  onSelectProduct?: (slug: string) => void;
}

export const RecipesView: React.FC<RecipesViewProps> = ({ onSelectProduct }) => {
  // Navigation mode: null = author selection screen (9:16 cards), 'dani' | 'luna' | 'todas' = recipes list
  const [selectedAuthor, setSelectedAuthor] = useState<'dani' | 'luna' | 'todas' | null>(null);
  const [activeTab, setActiveTab] = useState<'dani' | 'clinica' | 'todas'>('dani');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Sync activeTab when selectedAuthor changes
  const handleSelectAuthor = (author: 'dani' | 'luna' | 'todas') => {
    setSelectedAuthor(author);
    if (author === 'dani') {
      setActiveTab('dani');
    } else if (author === 'luna') {
      setActiveTab('clinica');
    } else {
      setActiveTab('todas');
    }
    setSelectedTag(null);
  };

  const handleBackToAuthors = () => {
    setSelectedAuthor(null);
    setSelectedTag(null);
    setSearchQuery('');
  };

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => {
      // Category match
      if (activeTab === 'dani' && recipe.category !== 'dani' && recipe.author !== 'Dani') {
        return false;
      }
      if (activeTab === 'clinica' && recipe.category !== 'clinica' && recipe.author !== 'Luna') {
        return false;
      }
      // Tag match
      if (selectedTag && !recipe.tags.includes(selectedTag)) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inNum = recipe.numberCode?.toLowerCase().includes(q);
        const inTitle = recipe.title.toLowerCase().includes(q);
        const inDesc = recipe.description.toLowerCase().includes(q);
        const inIndication = recipe.indication?.toLowerCase().includes(q);
        const inIngredients = recipe.ingredients.some(i => i.item.toLowerCase().includes(q));
        const inAuthor = recipe.author.toLowerCase().includes(q);
        const inTags = recipe.tags.some(t => t.toLowerCase().includes(q));
        return inNum || inTitle || inDesc || inIndication || inIngredients || inAuthor || inTags;
      }
      return true;
    });
  }, [activeTab, selectedTag, searchQuery]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    RECIPES.forEach(r => r.tags.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, []);

  const daniCount = RECIPES.filter(r => r.category === 'dani' || r.author === 'Dani').length;
  const lunaCount = RECIPES.filter(r => r.category === 'clinica' || r.author === 'Luna').length;

  const toggleSaveRecipe = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedRecipeIds(prev => 
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
    );
  };

  const handleShare = (recipe: Recipe, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(`${window.location.origin}/#receitas?id=${recipe.slug}`);
    setCopiedId(recipe.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadPdf = (recipe: Recipe, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDownloadingId(recipe.id);
    try {
      downloadRecipePdf(recipe);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  };

  const FOTO_DANI = '/foto da dani.jpeg';
  const FOTO_LUNA = '/foto da luna.jpeg';

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* ========================================================================= */}
      {/* 1. SELEÇÃO DE AUTORAS COM CARDS 9:16 (Layout Exclusivo e Organizado)      */}
      {/* ========================================================================= */}
      {selectedAuthor === null ? (
        <div className="space-y-10 animate-fadeIn">
          
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C261D] via-[#2A382C] to-[#172018] p-8 md:p-12 text-[#F7F3EC] border border-[#455347]/40 shadow-xl text-center md:text-left">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-primary-accent/15 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 rounded-full bg-luxury-accent/10 blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-accent/20 border border-primary-accent/40 text-primary-accent text-xs font-bold tracking-wider uppercase">
                <ChefHat className="w-4 h-4 text-luxury-accent" />
                Biblioteca de Receitas & Prescrições
              </div>
              
              <h1 className="text-3xl md:text-5xl font-serif text-white font-normal tracking-tight">
                Escolha a Autora para Explorar
              </h1>
              
              <p className="text-[#C2C9C0] text-base md:text-lg leading-relaxed font-light">
                Selecione abaixo para navegar pelas <strong>12 Receitas Oficiais da Dani</strong> ou pelas <strong>13 Receitas para Pacientes da Nutricionista Luna Azevedo</strong> com doses terapêuticas, fitoquímica e download de PDF oficial.
              </p>
            </div>
          </div>

          {/* Cards 9:16 Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* CARD 9:16 - DANI */}
            <div 
              id="card-autor-dani"
              onClick={() => handleSelectAuthor('dani')}
              className="group relative aspect-[9/16] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-luxury-accent/30 hover:border-luxury-accent transition-all duration-500 cursor-pointer flex flex-col justify-between p-6 sm:p-8 bg-[#1C261D] select-none hover:-translate-y-1.5"
            >
              {/* Background Photo */}
              <img
                src={FOTO_DANI}
                alt="Receitas da Dani"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== DEFAULT_DANI_IMAGE) {
                    target.src = DEFAULT_DANI_IMAGE;
                  }
                }}
              />

              {/* Dark Luxury Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E150F] via-[#0E150F]/50 to-black/25 group-hover:via-[#0E150F]/60 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

              {/* Top Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-primary-forest/80 backdrop-blur-md border border-luxury-accent/50 text-luxury-accent text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-md">
                  12 Receitas Oficiais
                </span>
                <span className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-luxury-accent border border-white/10 group-hover:border-luxury-accent transition-colors">
                  <Utensils className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Content Info */}
              <div className="relative z-10 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-luxury-accent flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Alquimia Culinária & Sabores
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight drop-shadow-md">
                    Receitas da Dani
                  </h2>
                  <p className="text-xs sm:text-sm text-[#E2DDD5]/90 leading-relaxed line-clamp-3 pt-1">
                    Preparações exclusivas com Cacau 100%, Nibs de Cacau Orgânico, Chá da Casca e Baunilha Natural.
                  </p>
                </div>

                {/* Tags preview */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-[10px] font-mono text-white/90">
                    Massa 100%
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-[10px] font-mono text-white/90">
                    Nibs & Chá
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-[10px] font-mono text-white/90">
                    PDFs Oficiais
                  </span>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-luxury-accent via-[#D8B778] to-luxury-accent text-[#1A251B] font-bold text-sm tracking-wide shadow-lg group-hover:shadow-luxury-accent/30 transition-all flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  <span>Acessar Receitas da Dani</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* CARD 9:16 - LUNA */}
            <div 
              id="card-autor-luna"
              onClick={() => handleSelectAuthor('luna')}
              className="group relative aspect-[9/16] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-secondary-accent/30 hover:border-secondary-accent transition-all duration-500 cursor-pointer flex flex-col justify-between p-6 sm:p-8 bg-[#1C261D] select-none hover:-translate-y-1.5"
            >
              {/* Background Photo */}
              <img
                src={FOTO_LUNA}
                alt="Receitas da Luna"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== DEFAULT_LUNA_IMAGE) {
                    target.src = DEFAULT_LUNA_IMAGE;
                  }
                }}
              />

              {/* Dark Luxury Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E150F] via-[#0E150F]/50 to-black/25 group-hover:via-[#0E150F]/60 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

              {/* Top Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-primary-forest/80 backdrop-blur-md border border-secondary-accent/50 text-secondary-accent text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-md">
                  13 Prescrições Clínicas
                </span>
                <span className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-secondary-accent border border-white/10 group-hover:border-secondary-accent transition-colors">
                  <Stethoscope className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Content Info */}
              <div className="relative z-10 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-secondary-accent flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Nutricionista Luna Azevedo
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight drop-shadow-md">
                    Receitas para Pacientes
                  </h2>
                  <p className="text-xs sm:text-sm text-[#E2DDD5]/90 leading-relaxed line-clamp-3 pt-1">
                    Receitas terapêuticas prescritas com fitoquímica, dosagens de polifenóis, indicações clínicas e variações.
                  </p>
                </div>

                {/* Tags preview */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-[10px] font-mono text-white/90">
                    Fitoquímica
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-[10px] font-mono text-white/90">
                    Parâmetros Clínicos
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-[10px] font-mono text-white/90">
                    PDFs Idênticos
                  </span>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-secondary-accent via-[#68A773] to-secondary-accent text-white font-bold text-sm tracking-wide shadow-lg group-hover:shadow-secondary-accent/30 transition-all flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  <span>Acessar Receitas da Luna</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Shortcut to view all 25 recipes */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => handleSelectAuthor('todas')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F7F3EC] text-primary-forest font-semibold text-xs border border-[#E0D8C8] shadow-sm transition-all hover:shadow-md"
            >
              <BookOpen className="w-4 h-4 text-primary-accent" />
              <span>Ver catálogo completo com todas as 25 receitas ({RECIPES.length})</span>
              <ArrowRight className="w-3.5 h-3.5 text-secondary-text" />
            </button>
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* 2. LISTA DETALHADA DE RECEITAS (Após escolher a Autora)                   */
        /* ========================================================================= */
        <div className="space-y-8 animate-fadeIn">
          
          {/* Top Back Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-primary-forest/10 shadow-sm">
            <button
              onClick={handleBackToAuthors}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F2EDE4] hover:bg-[#E8E1D5] text-primary-forest text-xs font-bold transition-all group w-fit cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-primary-accent group-hover:-translate-x-1 transition-transform" />
              <span>Voltar para Escolha de Autora (Cards 9:16)</span>
            </button>

            {/* Quick Switch Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F2EDE4] rounded-xl overflow-x-auto">
              <button
                onClick={() => { setActiveTab('dani'); setSelectedAuthor('dani'); setSelectedTag(null); }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'dani'
                    ? 'bg-primary-forest text-white shadow-sm'
                    : 'text-[#4A554B] hover:text-primary-forest'
                }`}
              >
                <Utensils className="w-3.5 h-3.5 text-luxury-accent" />
                <span>Dani ({daniCount})</span>
              </button>

              <button
                onClick={() => { setActiveTab('clinica'); setSelectedAuthor('luna'); setSelectedTag(null); }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'clinica'
                    ? 'bg-primary-forest text-white shadow-sm'
                    : 'text-[#4A554B] hover:text-primary-forest'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-secondary-accent" />
                <span>Luna ({lunaCount})</span>
              </button>

              <button
                onClick={() => { setActiveTab('todas'); setSelectedAuthor('todas'); setSelectedTag(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'todas'
                    ? 'bg-primary-forest text-white shadow-sm'
                    : 'text-[#4A554B] hover:text-primary-forest'
                }`}
              >
                <span>Todas ({RECIPES.length})</span>
              </button>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-white rounded-2xl p-5 border border-primary-forest/10 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-serif font-bold text-primary-forest">
                  {activeTab === 'dani' && `Receitas da Dani (${filteredRecipes.length})`}
                  {activeTab === 'clinica' && `Receitas para Pacientes • Luna (${filteredRecipes.length})`}
                  {activeTab === 'todas' && `Todas as Receitas (${filteredRecipes.length})`}
                </span>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C968B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar receita, número, indicação..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F9F7F2] border border-[#E0D8C8] rounded-xl text-sm text-[#1C261D] placeholder-[#8C968B] focus:outline-none focus:ring-2 focus:ring-primary-forest/30 transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C968B] hover:text-primary-forest"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>

            {/* Tags Row */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 border-t border-[#F0EAE1]">
              <span className="text-xs font-semibold text-[#8C968B] uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Tags:
              </span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap ${
                  selectedTag === null
                    ? 'bg-primary-forest text-white font-medium'
                    : 'bg-[#F2EDE4] text-[#4A554B] hover:bg-[#E8E1D5]'
                }`}
              >
                Todas
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap ${
                    selectedTag === tag
                      ? 'bg-primary-accent text-white font-medium shadow-sm'
                      : 'bg-[#F2EDE4] text-[#4A554B] hover:bg-[#E8E1D5]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Info Strip explaining the sequence */}
          {activeTab === 'dani' && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D5] text-xs text-[#4A554B]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-accent"></span>
                <span>Exibindo as <strong>12 receitas oficiais da Dani em ordem numérica</strong> (01 a 26). O texto de cada receita e modo de preparo foi mantido integralmente.</span>
              </div>
              <span className="font-semibold text-primary-forest flex items-center gap-1 shrink-0">
                <FileText className="w-3.5 h-3.5 text-primary-accent" /> PDF oficial disponível para download em cada receita
              </span>
            </div>
          )}

          {activeTab === 'clinica' && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F2F7F3] p-4 rounded-xl border border-[#D5E3D8] text-xs text-[#2A402D]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-accent"></span>
                <span>Exibindo as <strong>13 receitas para pacientes da nutricionista Luna Azevedo em ordem (01 a 13)</strong>. Textos, fitoquímica, variações e notas clínicas mantidos fielmente aos anexos.</span>
              </div>
              <span className="font-semibold text-primary-forest flex items-center gap-1 shrink-0">
                <Download className="w-3.5 h-3.5 text-secondary-accent" /> PDF idêntico ao anexo para download
              </span>
            </div>
          )}

      {/* Grid of Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => {
          const isSaved = savedRecipeIds.includes(recipe.id);
          const isLuna = recipe.author === 'Luna' || recipe.category === 'clinica';
          const isDownloading = downloadingId === recipe.id;
          const defaultCardImg = getRecipeDefaultImage(recipe.category, recipe.author);

          return (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="group bg-white rounded-2xl border border-primary-forest/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-forest/30 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Card Top Image & Badges */}
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-[#EAE4D9]">
                  <img
                    src={defaultCardImg}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== defaultCardImg) {
                        target.src = defaultCardImg;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {recipe.numberCode && (
                        <span className="px-2 py-0.5 rounded-md text-xs font-serif font-bold bg-[#1C261D] text-luxury-accent border border-luxury-accent/40 shadow-sm">
                          Nº {recipe.numberCode}
                        </span>
                      )}
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wide uppercase shadow-sm ${
                        isLuna 
                          ? 'bg-secondary-accent text-white border border-secondary-accent/40' 
                          : 'bg-primary-accent text-white border border-primary-accent/40'
                      }`}>
                        {isLuna ? 'Luna • Pacientes' : "Receita da Dani"}
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleSaveRecipe(recipe.id, e)}
                      className="p-1.5 rounded-full bg-white/80 hover:bg-white text-[#1C261D] shadow-sm backdrop-blur-sm transition-transform active:scale-90"
                      title={isSaved ? "Salva nos favoritos" : "Salvar receita"}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary-accent text-primary-accent' : 'text-[#4A554B]'}`} />
                    </button>
                  </div>

                  {/* Prep Time & Yield */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/95 font-medium">
                    <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                      <Clock className="w-3.5 h-3.5 text-luxury-accent" /> {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                      <Users className="w-3.5 h-3.5 text-luxury-accent" /> {recipe.yield}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  {/* Badge header / category */}
                  {recipe.badgeHeader && (
                    <div className="text-[11px] font-semibold text-[#8C968B] tracking-wider uppercase">
                      {recipe.badgeHeader}
                    </div>
                  )}

                  <h3 className="font-serif text-lg font-bold text-[#1C261D] leading-snug group-hover:text-primary-accent transition-colors line-clamp-2">
                    {recipe.title}
                  </h3>

                  {/* Subtitle / quote (for Luna recipes) */}
                  {recipe.subtitle && (
                    <p className="text-xs text-[#8C6D46] italic font-serif line-clamp-1">
                      "{recipe.subtitle}"
                    </p>
                  )}
                  
                  <p className="text-xs text-[#5E685F] line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>

                  {/* Indication (for Luna recipes) */}
                  {recipe.indication && (
                    <div className="p-2 bg-[#F2EDE4] rounded-md text-[11px] text-[#3A453C] font-medium border-l-2 border-secondary-accent line-clamp-1">
                      <strong className="text-secondary-accent">Indicação:</strong> {recipe.indication}
                    </div>
                  )}

                  {/* Dica da Será preview (if present for Dani) */}
                  {recipe.tip && (
                    <div className="p-2.5 bg-[#FAF7F2] rounded-lg border-l-2 border-primary-accent text-[11px] text-[#4A554B] italic line-clamp-2">
                      <strong className="text-primary-accent not-italic">Dica da Será:</strong> {recipe.tip}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {recipe.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-[#F2EDE4] text-[10px] font-medium text-[#4A554B]">
                        {tag}
                      </span>
                    ))}
                    {recipe.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-[#F2EDE4] text-[10px] font-medium text-[#8C968B]">
                        +{recipe.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer with Download PDF button */}
              <div className="p-5 pt-0 border-t border-primary-forest/5 mt-3 flex items-center justify-between text-xs text-primary-forest font-semibold gap-2">
                <button
                  onClick={(e) => handleDownloadPdf(recipe, e)}
                  disabled={isDownloading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-forest/5 hover:bg-primary-forest hover:text-white text-primary-forest transition-colors text-xs font-semibold"
                  title="Baixar PDF desta receita"
                >
                  <Download className={`w-3.5 h-3.5 text-primary-accent ${isDownloading ? 'animate-bounce' : ''}`} />
                  <span>{isDownloading ? 'Gerando...' : 'Baixar PDF'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 text-primary-accent">
                    Ver Detalhes <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  
                  <button
                    onClick={(e) => handleShare(recipe, e)}
                    className="p-1.5 hover:bg-[#F2EDE4] rounded-lg text-[#8C968B] hover:text-primary-forest transition-colors ml-1"
                    title="Copiar link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#D5CDC0] p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-[#8C968B] mx-auto opacity-50" />
          <h3 className="text-lg font-serif font-bold text-[#1C261D]">Nenhuma receita encontrada</h3>
          <p className="text-sm text-[#5E685F] max-w-md mx-auto">
            Não encontramos receitas com os termos ou filtros selecionados. Tente limpar os filtros ou buscar por palavras mais amplas.
          </p>
          <button
            onClick={() => { setActiveTab('dani'); setSelectedTag(null); setSearchQuery(''); }}
            className="px-5 py-2.5 bg-primary-forest text-white rounded-xl text-sm font-semibold hover:bg-secondary-forest transition-colors"
          >
            Limpar Todos os Filtros
          </button>
        </div>
      )}

        </div>
      )}

      {/* Modal / Detailed Recipe Drawer */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto border border-[#E0D8C8] space-y-6">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between bg-primary-forest text-white p-5 px-6 border-b border-secondary-forest">
              <div className="flex items-center gap-3">
                {selectedRecipe.numberCode && (
                  <span className="px-2 py-0.5 rounded text-xs font-serif font-bold bg-white/15 text-luxury-accent border border-luxury-accent/30">
                    Nº {selectedRecipe.numberCode}
                  </span>
                )}
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                  selectedRecipe.author === 'Luna' ? 'bg-secondary-accent text-white' : 'bg-primary-accent text-white'
                }`}>
                  {selectedRecipe.author === 'Luna' ? 'Receita para Pacientes • Luna' : "Receita da Dani"}
                </span>
                <span className="text-xs text-luxury-accent font-medium">• {selectedRecipe.prepTime} • {selectedRecipe.yield}</span>
              </div>

              <button
                onClick={() => setSelectedRecipe(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Recipe Hero Image */}
            {(() => {
              const modalImg = getRecipeDefaultImage(selectedRecipe.category, selectedRecipe.author);
              return (
                <div className="relative h-52 md:h-64 w-full overflow-hidden bg-[#EAE4D9] -mt-6">
                  <img
                    src={modalImg}
                    alt={selectedRecipe.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== modalImg) {
                        target.src = modalImg;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-luxury-accent" /> Tempo: {selectedRecipe.prepTime}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg font-medium flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-luxury-accent" /> Rendimento: {selectedRecipe.yield}
                    </span>
                  </div>
                </div>
              );
            })()}

            <div className="p-6 md:p-8 space-y-8">
              
              {/* Title, Subtitle & Description */}
              <div className="space-y-3">
                {selectedRecipe.badgeHeader && (
                  <div className="text-xs font-semibold text-[#8C968B] tracking-wider uppercase">
                    {selectedRecipe.badgeHeader}
                  </div>
                )}
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1C261D] leading-tight">
                  {selectedRecipe.title}
                </h2>
                {selectedRecipe.subtitle && (
                  <p className="text-sm md:text-base text-[#8C6D46] italic font-serif">
                    "{selectedRecipe.subtitle}"
                  </p>
                )}
                <p className="text-sm md:text-base text-[#4A554B] leading-relaxed">
                  {selectedRecipe.description}
                </p>
                <div className="text-xs text-[#8C968B]">
                  Elaborada por <strong>{selectedRecipe.author}</strong> ({selectedRecipe.authorRole})
                </div>
              </div>

              {/* Ingredients and Instructions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Ingredients Column */}
                <div className="bg-[#FBF9F5] p-5 rounded-2xl border border-[#E8E1D5] space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#1C261D] flex items-center gap-2 border-b border-[#E8E1D5] pb-2">
                    <Utensils className="w-4 h-4 text-primary-accent" /> INGREDIENTES
                  </h3>
                  <ul className="space-y-3">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-xs md:text-sm text-[#333E34] flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-accent mt-1.5 shrink-0"></span>
                        <div>
                          <strong className="text-[#1C261D]">{ing.amount}</strong> {ing.item}
                          {ing.notes && <span className="block text-[11px] text-[#7A857A] italic">{ing.notes}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions Column */}
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#1C261D] flex items-center gap-2 border-b border-[#E8E1D5] pb-2">
                    <ChefHat className="w-4 h-4 text-secondary-accent" /> MODO DE PREPARO
                  </h3>
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="text-xs md:text-sm text-[#333E34] flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-primary-forest text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* VARIAÇÕES (if present, for Luna recipes) */}
              {selectedRecipe.variations && selectedRecipe.variations.length > 0 && (
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-3">
                  <h4 className="font-serif font-bold text-sm text-[#1C261D] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-luxury-accent" /> Variações Sugeridas
                  </h4>
                  <ul className="space-y-2 text-xs md:text-sm text-[#4A554B]">
                    {selectedRecipe.variations.map((v, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-luxury-accent font-bold mt-0.5">→</span>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* INDICAÇÃO (if present, for Luna recipes) */}
              {selectedRecipe.indication && (
                <div className="p-4 rounded-xl bg-[#EFECE4] border-l-4 border-secondary-accent space-y-1">
                  <div className="text-xs font-serif font-bold text-secondary-accent uppercase tracking-wider">
                    Indicação Clínica
                  </div>
                  <p className="text-xs md:text-sm text-[#2A382C] font-medium leading-relaxed">
                    {selectedRecipe.indication}
                  </p>
                </div>
              )}

              {/* POR QUE FUNCIONA (if present, for Luna recipes) */}
              {selectedRecipe.whyItWorks && (
                <div className="p-5 rounded-2xl bg-[#F6F2EA] border border-[#E5DEC9] space-y-2">
                  <div className="text-xs font-serif font-bold text-primary-accent uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-primary-accent" /> Por Que Funciona (Fitoquímica & Farmacologia)
                  </div>
                  <p className="text-xs md:text-sm text-[#3E4A3F] leading-relaxed">
                    {selectedRecipe.whyItWorks}
                  </p>
                </div>
              )}

              {/* NOTA (if present) */}
              {selectedRecipe.note && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Nota da Nutricionista:
                  </div>
                  <p className="leading-relaxed">{selectedRecipe.note}</p>
                </div>
              )}

              {/* DICA DA SERÁ (if present for Dani) */}
              {selectedRecipe.tip && (
                <div className="p-4 md:p-5 rounded-xl bg-[#FAF7F2] border-l-4 border-luxury-accent space-y-1">
                  <div className="text-xs font-serif font-bold text-luxury-accent uppercase tracking-wider">
                    DICA DA SERÁ
                  </div>
                  <p className="text-xs md:text-sm text-[#333E34] leading-relaxed">
                    {selectedRecipe.tip}
                  </p>
                </div>
              )}

              {/* DOWNLOAD PDF CALLOUT BANNER INSIDE MODAL */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#FAF7F2] to-[#F2EDE4] border border-[#E0D8C8]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#1C261D]">
                    <FileText className="w-4 h-4 text-primary-accent" />
                    Baixar Cartão PDF Desta Receita
                  </div>
                  <p className="text-xs text-[#5E685F]">
                    Faça o download do PDF oficial com a diagramação idêntica ao anexo original para imprimir ou compartilhar.
                  </p>
                </div>

                <button
                  onClick={() => handleDownloadPdf(selectedRecipe)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-forest hover:bg-secondary-forest text-white text-xs font-semibold shadow-md transition-all shrink-0 active:scale-95"
                >
                  <Download className="w-4 h-4 text-luxury-accent" />
                  <span>Download PDF da Receita</span>
                </button>
              </div>

              {/* Fitoquímica & Parâmetros */}
              <div className="bg-gradient-to-br from-[#1C261D] to-[#28362A] text-[#F7F3EC] p-6 md:p-8 rounded-2xl space-y-5 border border-[#455347]/50 shadow-inner">
                <div className="flex items-center gap-2 text-luxury-accent border-b border-[#455347]/60 pb-3">
                  <Activity className="w-5 h-5" />
                  <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-white">
                    Especificações Fitoquímicas & Parâmetros Clínicos
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[#A2ADA0] uppercase text-[10px] tracking-wider block">Teobromina Estimada</span>
                    <span className="text-white font-bold text-sm">{selectedRecipe.specifications.theobromineMg || 'Bioativa'}</span>
                  </div>

                  <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[#A2ADA0] uppercase text-[10px] tracking-wider block">Polifenóis Totais</span>
                    <span className="text-white font-bold text-sm">{selectedRecipe.specifications.polyphenolsMg || 'Alto Teor'}</span>
                  </div>

                  <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[#A2ADA0] uppercase text-[10px] tracking-wider block">Calorias da Porção</span>
                    <span className="text-white font-bold text-sm">{selectedRecipe.specifications.calories || 'Consultar blend'}</span>
                  </div>

                  <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[#A2ADA0] uppercase text-[10px] tracking-wider block">Momento Ótimo</span>
                    <span className="text-luxury-accent font-medium text-xs">{selectedRecipe.specifications.optimalTiming || 'Desjejum / Tarde'}</span>
                  </div>
                </div>

                {/* Macronutrients */}
                {selectedRecipe.specifications.macronutrients && (
                  <div className="text-xs text-[#C8D1C7] bg-black/20 p-3 rounded-xl border border-white/5">
                    <strong className="text-white font-medium">Macronutrientes:</strong> {selectedRecipe.specifications.macronutrients}
                  </div>
                )}

                {/* Indications & Synergies */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                  {selectedRecipe.specifications.clinicalIndications && (
                    <div className="space-y-2">
                      <span className="font-bold text-luxury-accent uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Indicações Clínicas & Terapêuticas:
                      </span>
                      <ul className="space-y-1 text-[#E0E6DF]">
                        {selectedRecipe.specifications.clinicalIndications.map((ind, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-luxury-accent">•</span> {ind}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedRecipe.specifications.synergies && (
                    <div className="space-y-2">
                      <span className="font-bold text-primary-accent uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Sinergias Fitoquímicas:
                      </span>
                      <ul className="space-y-1 text-[#E0E6DF]">
                        {selectedRecipe.specifications.synergies.map((syn, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-primary-accent">•</span> {syn}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Contraindications Warning */}
                {selectedRecipe.specifications.contraindications && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">Atenção e Precauções:</strong> {selectedRecipe.specifications.contraindications.join(', ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E8E1D5]">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="px-5 py-2.5 rounded-xl border border-[#D0C8B8] text-sm text-[#4A554B] hover:bg-[#F2EDE4] transition-colors"
                >
                  Fechar Visualização
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleShare(selectedRecipe, e)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F2EDE4] text-xs font-semibold text-[#1C261D] hover:bg-[#E8E1D5] transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {copiedId === selectedRecipe.id ? 'Link Copiado!' : 'Copiar Receituário'}
                  </button>

                  <button
                    onClick={() => handleDownloadPdf(selectedRecipe)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-forest hover:bg-secondary-forest text-white text-xs font-semibold shadow-md transition-colors"
                  >
                    <Download className="w-4 h-4 text-luxury-accent" />
                    Baixar PDF da Receita
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
