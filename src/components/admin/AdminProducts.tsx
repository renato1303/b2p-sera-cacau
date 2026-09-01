/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../../types';
import { 
  ShoppingBag, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ExternalLink, 
  Tag, 
  Scale, 
  FileText, 
  ShieldCheck,
  Search,
  Sparkles
} from 'lucide-react';

interface AdminProductsProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  onAddProduct,
  onDeleteProduct
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [line, setLine] = useState('Cacau Ritual');
  const [category, setCategory] = useState('Gotas Puras 100%');
  const [weight, setWeight] = useState('210g');
  const [price, setPrice] = useState('R$ 89,00');
  const [tagline, setTagline] = useState('O mais puro cacau cabruca para nutrição e rituais diários.');
  const [story, setStory] = useState('Cultivado sob a sombra da Mata Atlântica no Sul da Bahia...');
  const [ingredients, setIngredients] = useState('100% Amêndoas de cacau orgânico selecionadas.');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800');
  const [buyUrl, setBuyUrl] = useState('https://www.seracacau.com.br/products/');
  const [discountCode, setDiscountCode] = useState('NUTRICACAU10');
  const [originCooperativa, setOriginCooperativa] = useState('Sistema Agroflorestal Cabruca · Serra Grande / Bahia');

  // Benefits list
  const [benefits, setBenefits] = useState<string[]>([
    'Rico em teobromina para foco estável',
    'Alta densidade de flavonoides bioativos'
  ]);
  const [newBenefit, setNewBenefit] = useState('');

  // Nutritional Table
  const [servingSize, setServingSize] = useState('20g (aprox. 15 gotas)');
  const [calories, setCalories] = useState('120 kcal');
  const [carbs, setCarbs] = useState('3.2g');
  const [proteins, setProteins] = useState('2.4g');
  const [fats, setFats] = useState('10.8g');
  const [sodium, setSodium] = useState('0mg');
  const [minerals, setMinerals] = useState('Magnésio 98mg · Ferro 2.8mg');

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleAddBenefit = () => {
    if (!newBenefit.trim()) return;
    setBenefits(prev => [...prev, newBenefit.trim()]);
    setNewBenefit('');
  };

  const handleRemoveBenefit = (index: number) => {
    setBenefits(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor, informe o nome do produto.');
      return;
    }

    const generatedSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      slug: generatedSlug,
      line: line.trim() || 'Cacau Ritual',
      category: category.trim() || 'Cacau Puro',
      weight: weight.trim() || '210g',
      tagline: tagline.trim() || 'Cacau puro para prescrição funcional.',
      story: story.trim() || 'Cultivo sustentável na Mata Atlântica.',
      benefits: benefits.length > 0 ? benefits : ['Puro cacau orgânico'],
      ingredients: ingredients.trim() || 'Amêndoas de cacau orgânico.',
      nutritionalTable: {
        servingSize,
        calories,
        carbohydrates: carbs,
        proteins,
        fats,
        sodium,
        minerals
      },
      hasLaudo: true,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800',
      shopifyId: `shopify-${Date.now()}`,
      price: price.trim() || 'R$ 89,00',
      originCooperativa: originCooperativa.trim() || 'Serra Grande / Bahia',
      discountCode: discountCode.trim() || undefined,
      buyUrl: buyUrl.trim() || undefined
    };

    onAddProduct(newProduct);
    triggerSuccess(`Produto "${newProduct.name}" cadastrado com sucesso!`);
    
    // Reset form
    setName('');
    setSlug('');
    setViewMode('list');
  };

  const filteredProducts = products.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.line.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
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
          <h2 className="text-xl font-serif text-primary-forest">Catálogo de Produtos & E-Commerce</h2>
          <p className="text-xs text-[#526054] mt-0.5">
            Cadastre novos produtos, gerencie linhas rituais, laudos bromatológicos e links de compra.
          </p>
        </div>

        <div>
          {viewMode === 'create' ? (
            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2.5 rounded-xl bg-[#F2EDE4] hover:bg-[#E8E1D5] text-primary-forest text-xs font-bold transition-all cursor-pointer"
            >
              Voltar para Lista de Produtos
            </button>
          ) : (
            <button
              onClick={() => setViewMode('create')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-forest hover:bg-primary-forest/90 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 text-secondary-accent" />
              <span>Adicionar Novo Produto</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE: CREATE PRODUCT                                                 */}
      {/* ========================================================================= */}
      {viewMode === 'create' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2E4030]/10 shadow-xl space-y-8 animate-fadeIn">
          <div className="border-b border-[#2E4030]/10 pb-4">
            <span className="text-[11px] font-mono font-bold tracking-widest text-primary-accent uppercase block">
              Cadastro de Produto
            </span>
            <h3 className="text-2xl font-serif text-primary-forest mt-1">
              Novo Item no Catálogo Oficial
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Nome do Produto *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                  placeholder="Ex: Cacau Gotas 100% Puro 210g"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm font-semibold text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Preço (R$)</label>
                <input
                  type="text"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="Ex: R$ 89,00"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Linha</label>
                <select
                  value={line}
                  onChange={e => setLine(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                >
                  <option value="Cacau Ritual">Cacau Ritual</option>
                  <option value="Ervas Ritual">Ervas Ritual</option>
                  <option value="Terra Ritual">Terra Ritual</option>
                  <option value="Cacau Puro em Barra">Cacau Puro em Barra</option>
                  <option value="Cacau Crocante">Cacau Crocante (Nibs)</option>
                  <option value="Infusões da Floresta">Infusões da Floresta (Chá de Casca)</option>
                  <option value="Kits & Presentes">Kits & Presentes</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Gramatura / Peso</label>
                <input
                  type="text"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  placeholder="Ex: 210g, 420g, 75g..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Código Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="cacau-gotas-210g"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Tagline / Slogan Curto</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  placeholder="Ex: O mais puro cacau cabruca para nutrição e rituais diários."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">URL da Imagem do Produto</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://... ou public/image/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Link de Compra no Site Oficial</label>
                <input
                  type="text"
                  value={buyUrl}
                  onChange={e => setBuyUrl(e.target.value)}
                  placeholder="https://www.seracacau.com.br/products/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Cupom de Desconto Nutri</label>
                <input
                  type="text"
                  value={discountCode}
                  onChange={e => setDiscountCode(e.target.value)}
                  placeholder="NUTRICACAU10"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none uppercase font-mono font-bold"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Ingredientes & Composição</label>
                <textarea
                  rows={2}
                  value={ingredients}
                  onChange={e => setIngredients(e.target.value)}
                  placeholder="100% Amêndoas de cacau orgânico selecionadas..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Benefits Dynamic List */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#2E4030]/15 space-y-3">
              <span className="text-xs font-bold text-primary-forest block">Benefícios Clínicos & Destaques</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={e => setNewBenefit(e.target.value)}
                  placeholder="Adicione um benefício clínico..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                />
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="px-4 py-2 rounded-xl bg-primary-forest text-white text-xs font-bold shrink-0"
                >
                  + Benefício
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {benefits.map((b, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs text-primary-forest border border-[#2E4030]/15">
                    <span>{b}</span>
                    <button type="button" onClick={() => handleRemoveBenefit(i)} className="text-red-500 hover:text-red-700">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Nutritional Table Section */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#2E4030]/15 space-y-4">
              <span className="text-xs font-bold text-primary-forest block">Tabela Nutricional</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Porção</label>
                  <input
                    type="text"
                    value={servingSize}
                    onChange={e => setServingSize(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Calorias</label>
                  <input
                    type="text"
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Carboidratos</label>
                  <input
                    type="text"
                    value={carbs}
                    onChange={e => setCarbs(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Proteínas</label>
                  <input
                    type="text"
                    value={proteins}
                    onChange={e => setProteins(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Gorduras Totais</label>
                  <input
                    type="text"
                    value={fats}
                    onChange={e => setFats(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Sódio</label>
                  <input
                    type="text"
                    value={sodium}
                    onChange={e => setSodium(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] text-[#6A786C] block">Minerais / Micronutrientes</label>
                  <input
                    type="text"
                    value={minerals}
                    onChange={e => setMinerals(e.target.value)}
                    placeholder="Magnésio, Ferro, Zinco..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-[#2E4030]/15"
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
                <span>Salvar e Cadastrar Produto</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE: PRODUCTS LIST                                                  */}
      {/* ========================================================================= */}
      {viewMode === 'list' && (
        <div className="space-y-5">
          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#2E4030]/10">
            <Search className="w-4 h-4 text-[#6A786C] ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar produtos por nome, linha ou gramatura..."
              className="w-full text-xs text-primary-text bg-transparent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-5 border border-[#2E4030]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-[#FAF7F2] overflow-hidden border border-[#2E4030]/10 relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={e => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-primary-forest backdrop-blur-sm">
                      {product.weight}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-primary-accent block">
                      {product.line}
                    </span>
                    <h3 className="text-base font-serif font-bold text-primary-forest line-clamp-1 mt-0.5">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#526054] line-clamp-2 mt-1">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2E4030]/10 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary-forest">{product.price}</span>
                  
                  <div className="flex items-center gap-2">
                    {product.buyUrl && (
                      <a
                        href={product.buyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-primary-accent hover:text-primary-forest"
                        title="Ver no site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {onDeleteProduct && (
                      <button
                        onClick={() => {
                          if (confirm(`Deseja remover o produto "${product.name}"?`)) {
                            onDeleteProduct(product.id);
                            triggerSuccess('Produto removido com sucesso!');
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700"
                        title="Remover Produto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
