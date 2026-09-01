/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Recipe, RecipeIngredient } from '../../types';
import { 
  Utensils, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ChefHat, 
  Stethoscope, 
  Clock, 
  Scale, 
  Tag, 
  Sparkles, 
  Search,
  BookOpen
} from 'lucide-react';

interface AdminRecipesProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
  onDeleteRecipe?: (recipeId: string) => void;
}

export const AdminRecipes: React.FC<AdminRecipesProps> = ({
  recipes,
  onAddRecipe,
  onDeleteRecipe
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState<'Dani' | 'Luna'>('Dani');
  const [prepTime, setPrepTime] = useState('10 min');
  const [yieldAmount, setYieldAmount] = useState('2 porções');
  const [difficulty, setDifficulty] = useState<'Fácil' | 'Médio' | 'Avançado'>('Fácil');
  const [description, setDescription] = useState('');
  const [tipOrWhy, setTipOrWhy] = useState('');
  const [indication, setIndication] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800');
  const [tagsString, setTagsString] = useState('Cacau Quente, Sem Açúcar, Polifenóis');
  const [videoUrl, setVideoUrl] = useState('');

  // Biochemical specifications
  const [theobromine, setTheobromine] = useState('240mg');
  const [polyphenols, setPolyphenols] = useState('520mg');
  const [calories, setCalories] = useState('145 kcal');

  // Dynamic Ingredients List
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([
    { item: 'Gotas de Cacau 100% Puro Será Cacau', amount: '20g', notes: 'aprox. 15 gotas' },
    { item: 'Leite vegetal de aveia ou amêndoas', amount: '200ml', notes: 'morno' }
  ]);
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Dynamic Step-by-Step Instructions
  const [instructions, setInstructions] = useState<string[]>([
    'Aqueça o leite vegetal em fogo brando sem ferver.',
    'Adicione as gotas de cacau puro e mexa até derreter homogeneamente.',
    'Sirva imediatamente e aprecie os aromas da floresta.'
  ]);
  const [newStep, setNewStep] = useState('');

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleAddIngredient = () => {
    if (!newItem.trim()) return;
    setIngredients(prev => [...prev, { item: newItem.trim(), amount: newAmount.trim() || 'a gosto', notes: newNotes.trim() || undefined }]);
    setNewItem('');
    setNewAmount('');
    setNewNotes('');
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddInstruction = () => {
    if (!newStep.trim()) return;
    setInstructions(prev => [...prev, newStep.trim()]);
    setNewStep('');
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || ingredients.length === 0 || instructions.length === 0) {
      alert('Por favor, preencha o título, ao menos um ingrediente e um passo de preparo.');
      return;
    }

    const nextCode = String(recipes.length + 1).padStart(2, '0');
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tags = tagsString.split(',').map(t => t.trim()).filter(Boolean);

    const newRecipe: Recipe = {
      id: `recipe-${Date.now()}`,
      numberCode: nextCode,
      badgeHeader: `${nextCode} ${author === 'Dani' ? 'CULINÁRIA DA DANI' : 'PRESCRIÇÃO DA LUNA'} · ${prepTime.toUpperCase()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      slug,
      category: author === 'Dani' ? 'dani' : 'clinica',
      author,
      authorRole: author === 'Dani' ? 'Chef de Cozinha Saudável' : 'Nutricionista Clínica Funcional',
      prepTime: prepTime.trim() || '10 min',
      yield: yieldAmount.trim() || '1 porção',
      difficulty,
      description: description.trim() || title.trim(),
      tip: author === 'Dani' ? (tipOrWhy.trim() || undefined) : undefined,
      whyItWorks: author === 'Luna' ? (tipOrWhy.trim() || undefined) : undefined,
      indication: author === 'Luna' ? (indication.trim() || undefined) : undefined,
      ingredients,
      instructions,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800',
      specifications: {
        theobromineMg: theobromine.trim() || undefined,
        polyphenolsMg: polyphenols.trim() || undefined,
        calories: calories.trim() || undefined,
        clinicalIndications: indication.trim() ? [indication.trim()] : undefined
      },
      tags: tags.length > 0 ? tags : ['Cacau Funcional'],
      videoUrl: videoUrl.trim() || undefined
    };

    onAddRecipe(newRecipe);
    triggerSuccess(`Receita "${newRecipe.title}" publicada com sucesso!`);
    
    // Reset
    setTitle('');
    setSubtitle('');
    setDescription('');
    setViewMode('list');
  };

  const filteredRecipes = recipes.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return r.title.toLowerCase().includes(q) || r.author.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 shadow-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#2E4030]/10 shadow-sm">
        <div>
          <h2 className="text-xl font-serif text-primary-forest">Gestor de Receitas Culinárias & Clínicas</h2>
          <p className="text-xs text-[#526054] mt-0.5">
            Publique criações gastronômicas da Dani ou prescrições terapêuticas da Luna com rigor bioquímico.
          </p>
        </div>

        <div>
          {viewMode === 'create' ? (
            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2.5 rounded-xl bg-[#F2EDE4] hover:bg-[#E8E1D5] text-primary-forest text-xs font-bold transition-all cursor-pointer"
            >
              Voltar para Lista de Receitas
            </button>
          ) : (
            <button
              onClick={() => setViewMode('create')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-forest hover:bg-primary-forest/90 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 text-secondary-accent" />
              <span>Criar Nova Receita</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE: CREATE RECIPE                                                  */}
      {/* ========================================================================= */}
      {viewMode === 'create' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2E4030]/10 shadow-xl space-y-8 animate-fadeIn">
          <div className="border-b border-[#2E4030]/10 pb-4">
            <span className="text-[11px] font-mono font-bold tracking-widest text-primary-accent uppercase block">
              Nova Criação
            </span>
            <h3 className="text-2xl font-serif text-primary-forest mt-1">
              Cadastrar Receita Culinária ou Prescrição Clínica
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Título da Receita *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ex: Cacau Quente Cremoso de Aveia & Cardamomo"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm font-semibold text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Autora / Seção *</label>
                <select
                  value={author}
                  onChange={e => setAuthor(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text font-bold focus:outline-none"
                >
                  <option value="Dani">🍳 Receitas da Dani (Cozinha & Sabor)</option>
                  <option value="Luna">🩺 Prescrições da Luna (Nutrição Clínica)</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Subtítulo / Chamada Inspiradora</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  placeholder="Ex: Um ritual reconfortante para momentos de pausa e foco."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Tempo de Preparo</label>
                <input
                  type="text"
                  value={prepTime}
                  onChange={e => setPrepTime(e.target.value)}
                  placeholder="Ex: 10 min"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Rendimento</label>
                <input
                  type="text"
                  value={yieldAmount}
                  onChange={e => setYieldAmount(e.target.value)}
                  placeholder="Ex: 2 porções"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Dificuldade</label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                >
                  <option value="Fácil">Fácil</option>
                  <option value="Médio">Médio</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Descrição da Receita</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Descreva a inspiração sensorial e os benefícios..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">
                  {author === 'Dani' ? 'Dica da Dani (Segredo do Chef)' : 'Por Que Funciona / Mecanismo Fisiológico'}
                </label>
                <input
                  type="text"
                  value={tipOrWhy}
                  onChange={e => setTipOrWhy(e.target.value)}
                  placeholder={author === 'Dani' ? 'Ex: Use cardamomo moído na hora para intensificar o aroma.' : 'Ex: A teobromina em sinergia com o calor promove vasodilatação periférica suave.'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              {author === 'Luna' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary-forest">Indicação Clínica Específica</label>
                  <input
                    type="text"
                    value={indication}
                    onChange={e => setIndication(e.target.value)}
                    placeholder="Ex: Tensão pré-menstrual, fadiga mental..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                  />
                </div>
              )}

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">URL da Imagem da Receita</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={tagsString}
                  onChange={e => setTagsString(e.target.value)}
                  placeholder="Bebida Quente, Sem Glúten, Vegano, Foco"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>
            </div>

            {/* Dynamic Ingredients Section */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#2E4030]/15 space-y-4">
              <span className="text-xs font-bold text-primary-forest block">
                Ingredientes ({ingredients.length})
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={e => setNewItem(e.target.value)}
                  placeholder="Nome do ingrediente..."
                  className="sm:col-span-2 px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                />
                <input
                  type="text"
                  value={newAmount}
                  onChange={e => setNewAmount(e.target.value)}
                  placeholder="Quantidade (ex: 20g)..."
                  className="px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newNotes}
                    onChange={e => setNewNotes(e.target.value)}
                    placeholder="Obs (opcional)..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="px-3 py-2 rounded-xl bg-primary-forest text-white text-xs font-bold shrink-0"
                  >
                    + Item
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                {ingredients.map((ing, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white text-xs border border-[#2E4030]/10">
                    <div>
                      <span className="font-bold text-primary-forest">{ing.item}</span>
                      <span className="text-[#6A786C] ml-2 font-mono">({ing.amount})</span>
                      {ing.notes && <span className="text-[10px] text-[#A6B2A8] ml-2 italic">{ing.notes}</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(i)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Step-by-Step Instructions */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#2E4030]/15 space-y-4">
              <span className="text-xs font-bold text-primary-forest block">
                Modo de Preparo Passo a Passo ({instructions.length} etapas)
              </span>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newStep}
                  onChange={e => setNewStep(e.target.value)}
                  placeholder="Descreva a próxima etapa do preparo..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                />
                <button
                  type="button"
                  onClick={handleAddInstruction}
                  className="px-4 py-2 rounded-xl bg-primary-forest text-white text-xs font-bold shrink-0"
                >
                  + Passo
                </button>
              </div>

              <div className="space-y-1.5 pt-2">
                {instructions.map((step, i) => (
                  <div key={i} className="flex items-start justify-between p-2.5 rounded-xl bg-white text-xs border border-[#2E4030]/10 gap-3">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary-forest text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-primary-forest leading-relaxed">{step}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveInstruction(i)}
                      className="text-red-400 hover:text-red-600 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Biochemical Profile Section */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#2E4030]/15 space-y-3">
              <span className="text-xs font-bold text-primary-forest block">Perfil Bioquímico Estimado por Porção</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Teobromina Estimada</label>
                  <input
                    type="text"
                    value={theobromine}
                    onChange={e => setTheobromine(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Polifenóis Totais</label>
                  <input
                    type="text"
                    value={polyphenols}
                    onChange={e => setPolyphenols(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Calorias</label>
                  <input
                    type="text"
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2E4030]/10">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#4A554B] hover:bg-[#F2EDE4]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-forest hover:bg-primary-forest/90 text-white text-xs font-bold shadow-lg transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-secondary-accent" />
                <span>Publicar Receita no Catálogo</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE: RECIPES LIST                                                   */}
      {/* ========================================================================= */}
      {viewMode === 'list' && (
        <div className="space-y-5">
          {/* Search */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#2E4030]/10">
            <Search className="w-4 h-4 text-[#6A786C] ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar receitas por nome, autora ou ingredientes..."
              className="w-full text-xs text-primary-text bg-transparent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                className="bg-white rounded-2xl p-5 border border-[#2E4030]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      recipe.author === 'Dani' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {recipe.author === 'Dani' ? <Utensils className="w-3 h-3" /> : <Stethoscope className="w-3 h-3" />}
                      <span>{recipe.author === 'Dani' ? 'Dani Culinária' : 'Luna Clínica'}</span>
                    </span>
                    <span className="text-[10px] text-[#6A786C] flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> {recipe.prepTime}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-primary-forest line-clamp-2 mt-1">
                    {recipe.title}
                  </h3>

                  <p className="text-xs text-[#526054] line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2E4030]/10 flex items-center justify-between">
                  <span className="text-[10px] text-[#6A786C]">
                    {recipe.ingredients.length} ingredientes · {recipe.instructions.length} passos
                  </span>

                  {onDeleteRecipe && (
                    <button
                      onClick={() => {
                        if (confirm(`Deseja remover a receita "${recipe.title}"?`)) {
                          onDeleteRecipe(recipe.id);
                          triggerSuccess('Receita removida com sucesso!');
                        }
                      }}
                      className="p-1.5 text-red-500 hover:text-red-700"
                      title="Remover Receita"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
