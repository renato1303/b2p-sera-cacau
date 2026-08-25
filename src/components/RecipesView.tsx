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
  Heart, 
  Search, 
  Filter, 
  BookOpen, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Share2,
  Bookmark,
  Coffee,
  X
} from 'lucide-react';
import { SeraCacauIcon } from './SeraCacauIcon';

interface RecipesViewProps {
  onSelectProduct?: (slug: string) => void;
}

export const RecipesView: React.FC<RecipesViewProps> = ({ onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState<'todas' | 'cozinha' | 'clinica'>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => {
      // Category match
      if (activeTab !== 'todas' && recipe.category !== activeTab) {
        return false;
      }
      // Tag match
      if (selectedTag && !recipe.tags.includes(selectedTag)) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = recipe.title.toLowerCase().includes(q);
        const inDesc = recipe.description.toLowerCase().includes(q);
        const inIngredients = recipe.ingredients.some(i => i.item.toLowerCase().includes(q));
        const inAuthor = recipe.author.toLowerCase().includes(q);
        const inTags = recipe.tags.some(t => t.toLowerCase().includes(q));
        return inTitle || inDesc || inIngredients || inAuthor || inTags;
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

  const daniCount = RECIPES.filter(r => r.category === 'cozinha').length;
  const lunaCount = RECIPES.filter(r => r.category === 'clinica').length;

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

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C261D] via-[#2A382C] to-[#172018] p-8 md:p-12 text-[#F7F3EC] border border-[#455347]/40 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-primary-accent/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 rounded-full bg-luxury-accent/10 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-accent/20 border border-primary-accent/40 text-primary-accent text-xs font-semibold tracking-wider uppercase">
            <ChefHat className="w-3.5 h-3.5" />
            Caderno de Receitas & Prescrições Será Cacau
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif text-white font-normal tracking-tight">
            Alquimias da Cozinha & Prática Clínica
          </h1>
          
          <p className="text-[#C2C9C0] text-base md:text-lg leading-relaxed font-light">
            Explore <strong>12 receitas ancestrais da Dani</strong> para inspirar rituais culinários de presença e <strong>7 prescrições terapêuticas da Dra. Luna</strong> com parâmetros fitoquímicos e especificações clínicas detalhadas para os seus pacientes.
          </p>

          {/* Quick Counters */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => { setActiveTab('cozinha'); setSelectedTag(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'cozinha' 
                  ? 'bg-primary-accent text-white shadow-lg' 
                  : 'bg-white/10 hover:bg-white/15 text-white/90 border border-white/10'
              }`}
            >
              <Utensils className="w-4 h-4 text-luxury-accent" />
              <span>12 Receitas de Cozinha & Rituais (Dani)</span>
            </button>

            <button 
              onClick={() => { setActiveTab('clinica'); setSelectedTag(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'clinica' 
                  ? 'bg-luxury-accent text-[#1C261D] shadow-lg font-bold' 
                  : 'bg-white/10 hover:bg-white/15 text-white/90 border border-white/10'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>7 Receitas Clínicas para Pacientes (Luna)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-primary-forest/10 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex p-1.5 bg-[#F2EDE4] rounded-xl w-full md:w-auto">
            <button
              onClick={() => { setActiveTab('todas'); setSelectedTag(null); }}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'todas'
                  ? 'bg-primary-forest text-white shadow-sm font-semibold'
                  : 'text-[#4A554B] hover:text-primary-forest'
              }`}
            >
              Todas ({RECIPES.length})
            </button>

            <button
              onClick={() => { setActiveTab('cozinha'); setSelectedTag(null); }}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'cozinha'
                  ? 'bg-primary-forest text-white shadow-sm font-semibold'
                  : 'text-[#4A554B] hover:text-primary-forest'
              }`}
            >
              <Utensils className="w-4 h-4 text-primary-accent" />
              <span>Cozinha da Dani ({daniCount})</span>
            </button>

            <button
              onClick={() => { setActiveTab('clinica'); setSelectedTag(null); }}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'clinica'
                  ? 'bg-primary-forest text-white shadow-sm font-semibold'
                  : 'text-[#4A554B] hover:text-primary-forest'
              }`}
            >
              <Activity className="w-4 h-4 text-secondary-accent" />
              <span>Clínicas da Luna ({lunaCount})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C968B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar receita, ativo ou ingrediente..."
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

      {/* Grid of Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => {
          const isSaved = savedRecipeIds.includes(recipe.id);
          const isLuna = recipe.author === 'Luna';

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
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase shadow-sm ${
                      isLuna 
                        ? 'bg-secondary-accent text-white border border-secondary-accent/40' 
                        : 'bg-primary-accent text-white border border-primary-accent/40'
                    }`}>
                      {isLuna ? 'Luna • Prescrição Clínica' : 'Dani • Cozinha & Rituais'}
                    </span>

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
                    <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      <Clock className="w-3.5 h-3.5 text-luxury-accent" /> {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      <Users className="w-3.5 h-3.5 text-luxury-accent" /> {recipe.yield}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-lg font-bold text-[#1C261D] leading-snug group-hover:text-primary-accent transition-colors line-clamp-2">
                    {recipe.title}
                  </h3>
                  
                  <p className="text-xs text-[#5E685F] line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>

                  {/* Highlights Bar */}
                  <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8E1D5] text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-primary-forest">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-luxury-accent" /> Teobromina:
                      </span>
                      <span className="text-[#1C261D] font-bold">{recipe.specifications.theobromineMg || 'Bioativa'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#687369]">
                      <span>Polifenóis / Flavonoides:</span>
                      <span className="font-medium text-[#1C261D]">{recipe.specifications.polyphenolsMg || 'Alto Teor'}</span>
                    </div>
                  </div>

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

              {/* Bottom Action Footer */}
              <div className="p-5 pt-0 border-t border-primary-forest/5 mt-3 flex items-center justify-between text-xs text-primary-forest font-semibold">
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 text-primary-accent">
                  Ver Modo de Preparo & Especificações <ArrowRight className="w-3.5 h-3.5" />
                </span>
                
                <button
                  onClick={(e) => handleShare(recipe, e)}
                  className="p-1.5 hover:bg-[#F2EDE4] rounded-lg text-[#8C968B] hover:text-primary-forest transition-colors"
                  title="Copiar link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
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
            Não encontramos receitas com os termos ou filtros selecionados. Tente limpar os filtros ou buscar por palavras mais amplas como "Gotas", "Nibs" ou "Ritual".
          </p>
          <button
            onClick={() => { setActiveTab('todas'); setSelectedTag(null); setSearchQuery(''); }}
            className="px-5 py-2.5 bg-primary-forest text-white rounded-xl text-sm font-semibold hover:bg-secondary-forest transition-colors"
          >
            Limpar Todos os Filtros
          </button>
        </div>
      )}

      {/* Modal / Detailed Recipe Drawer */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto border border-[#E0D8C8] space-y-6">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between bg-primary-forest text-white p-5 px-6 border-b border-secondary-forest">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                  selectedRecipe.author === 'Luna' ? 'bg-secondary-accent text-white' : 'bg-primary-accent text-white'
                }`}>
                  {selectedRecipe.author === 'Luna' ? 'Receita Clínica • Luna' : 'Cozinha & Rituais • Dani'}
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

            <div className="p-6 md:p-8 space-y-8">
              
              {/* Title & Description */}
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1C261D] leading-tight">
                  {selectedRecipe.title}
                </h2>
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
                    <Utensils className="w-4 h-4 text-primary-accent" /> Ingredientes
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
                    <ChefHat className="w-4 h-4 text-secondary-accent" /> Modo de Preparo
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

              {/* CRITICAL: FINAL SPECIFICATIONS SECTION (MANDATED BY USER) */}
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

                  <a
                    href="https://www.seracacau.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-forest hover:bg-secondary-forest text-white text-xs font-semibold shadow-md transition-colors"
                  >
                    <SeraCacauIcon className="w-4 h-4 text-luxury-accent" />
                    Ver Produtos no Site Oficial
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
