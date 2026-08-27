/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SeraCacauIcon } from './SeraCacauIcon';
import { 
  ArrowLeft, 
  ShoppingBag, 
  FileText, 
  Award, 
  Leaf, 
  ShieldCheck, 
  BookOpen, 
  Heart,
  ChevronRight,
  Info,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Product } from '../types';

interface ProductsViewProps {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  selectedProduct,
  setSelectedProduct
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter products by collection line
  const filteredProducts = activeFilter === 'todos' 
    ? products 
    : products.filter(p => p.line.toLowerCase().includes(activeFilter.toLowerCase()) || p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  // Active detail monograph tabs
  const [activeTab, setActiveTab] = useState<'formula' | 'nutricional' | 'prescricao'>('formula');

  return (
    <div className="px-6 md:px-12 py-8 max-w-7xl mx-auto w-full font-sans text-primary-text">
      
      {/* HEADER SECTION */}
      {!selectedProduct ? (
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary-accent font-bold font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-accent animate-pulse"></span>
              SESSÃO PRESCRITOR SEGURA • PORTAL DE MEMBROS
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-primary-forest flex items-center gap-3">
              <SeraCacauIcon className="w-8 h-8 text-primary-forest" />
              <span>Produtos</span>
            </h2>
            <p className="text-xs text-secondary-text max-w-xl">
              Acesso exclusivo a lotes de fitoativos certificados, cacau selvagem com rastreabilidade Cabruca e fichas técnicas para prescrição clínica integrada.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 border-b border-border-color/60 pb-5">
            {[
              { id: 'todos', label: 'Todo Catálogo (10)' },
              { id: 'gotas', label: 'Gotas de Cacau' },
              { id: 'barras', label: 'Barras 200g & 450g' },
              { id: 'nibs', label: 'Nibs 250g & 75g' },
              { id: 'chas', label: 'Chá de Casca' },
              { id: 'baunilha', label: 'Baunilha Natural' },
              { id: 'kits', label: 'Kits & Rituais' }
            ].map((btn) => (
              <button
                id={`filter-btn-${btn.id}`}
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-bold transition-all duration-300 font-mono cursor-pointer ${
                  activeFilter === btn.id 
                    ? 'bg-primary-forest text-white shadow-sm' 
                    : 'bg-surface border border-border-color hover:bg-secondary-surface text-secondary-text'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          id="btn-back-to-catalog"
          onClick={() => setSelectedProduct(null)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-accent hover:text-primary-forest transition-colors mb-8 group font-mono cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar ao Catálogo</span>
        </button>
      )}

      {/* 1. GRID OF REFINED PRODUCT CARDS */}
      {!selectedProduct ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div
              id={`product-card-${prod.id}`}
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className="bg-surface rounded-2xl p-6 border border-border-color flex flex-col justify-between min-h-[460px] cursor-pointer hover:border-primary-accent/40 shadow-sm transition-all duration-300 group"
            >
              <div className="flex flex-col gap-5">
                {/* Image Section */}
                <div className="w-full h-[210px] rounded-xl overflow-hidden bg-secondary-surface relative">
                  <img 
                    src={prod.imageUrl} 
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('gotas210.jpeg') && !target.src.includes('recipe-default.jpg')) {
                        target.src = '/images/gotas210.jpeg';
                      }
                    }}
                  />
                </div>

                {/* Typography and brief info */}
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-primary-forest group-hover:text-primary-accent transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs italic text-secondary-text mt-0.5">
                    "{prod.tagline}"
                  </p>
                  <p className="text-[10px] text-primary-accent/80 tracking-wider uppercase mt-2.5 line-clamp-1 font-mono">
                    {prod.originCooperativa}
                  </p>
                </div>
              </div>

              {/* Discount Code Section */}
              {prod.discountCode && (
                <div 
                  className="mt-4 p-3 rounded-lg border border-dashed border-luxury-accent/50 bg-luxury-accent/5 flex items-center justify-between gap-2"
                  onClick={(e) => e.stopPropagation()} // Prevent card navigation
                >
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold tracking-wider text-luxury-accent font-mono block">
                      CUPOM ATIVO: {prod.discountCode}
                    </span>
                    <span className="text-[8px] text-secondary-text block leading-tight mt-0.5">
                      {prod.discountDescription || 'Sua indicação ganha desconto exclusivo.'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(prod.discountCode || '');
                      setCopiedId(prod.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="px-2 py-1 bg-primary-forest hover:bg-primary-forest/90 text-[8px] uppercase tracking-widest font-bold text-white rounded font-mono transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedId === prod.id ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              )}

              {/* Price and Navigation trigger */}
              <div className="pt-4 border-t border-border-color/60 flex justify-between items-center mt-4 font-mono">
                <span className="text-sm font-bold text-primary-forest">
                  {prod.price}
                </span>
                
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary-accent group-hover:translate-x-1.5 transition-all flex items-center gap-1">
                  Ver Detalhes <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        
        /* 2. EXQUISITE PRODUCT MONOGRAPH SHOWCASE (AstroMembers align) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Cinematic Product Media (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-bg-app border border-border-color shadow-sm relative group">
              <img 
                src={selectedProduct.imageUrl} 
                alt={selectedProduct.name}
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('gotas210.jpeg') && !target.src.includes('recipe-default.jpg')) {
                    target.src = '/images/gotas210.jpeg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
              
              <span className="absolute bottom-5 left-5 bg-primary-accent/20 text-primary-accent border border-primary-accent/20 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg font-mono">
                Fórmula Original • {selectedProduct.weight}
              </span>
            </div>

            {/* Quality Stamp Box */}
            <div className="bg-surface text-primary-text rounded-xl p-5 border border-border-color flex gap-4 items-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-primary-accent/10 border border-primary-accent/20 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-primary-accent" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary-forest">Selo Agroflorestal Cabruca</h4>
                <p className="text-[10px] text-secondary-text mt-0.5 leading-relaxed">
                  Cacau cultivado sob a sombra de árvores nativas da Mata Atlântica do Sul da Bahia, preservando fauna e flora locais.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Monograph details (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Title Block */}
            <div className="border-b border-border-color pb-6">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary-accent font-mono">
                {selectedProduct.line} • {selectedProduct.category}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-primary-forest mt-1.5 leading-tight">
                {selectedProduct.name}
              </h1>
              <p className="text-sm italic text-secondary-text mt-2">
                "{selectedProduct.tagline}"
              </p>
            </div>

            {/* Discount Code Section in detailed view */}
            {selectedProduct.discountCode && (
              <div className="bg-luxury-accent/5 border border-dashed border-luxury-accent/50 rounded-xl p-4 flex items-center justify-between gap-4 -mt-2 shadow-sm">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold tracking-wider text-luxury-accent font-mono block">
                    CUPOM ATIVO: {selectedProduct.discountCode}
                  </span>
                  <span className="text-xs text-secondary-text block leading-relaxed mt-1">
                    {selectedProduct.discountDescription || 'Sua indicação ganha desconto exclusivo.'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedProduct.discountCode || '');
                    setCopiedId(selectedProduct.id);
                    setTimeout(() => setCopiedId(null), 2000);
                  }}
                  className="px-3.5 py-2 bg-primary-forest hover:bg-primary-forest/90 text-xs uppercase tracking-widest font-bold text-white rounded-lg font-mono transition-colors shrink-0 cursor-pointer"
                >
                  {copiedId === selectedProduct.id ? 'Copiado!' : 'Copiar Código'}
                </button>
              </div>
            )}

            {/* Cooperativa and Shopify quick integrate widget */}
            <div className="bg-surface rounded-xl p-5 border border-border-color flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-secondary-text/60 font-mono">Cooperativa Produtora</span>
                <p className="text-xs font-semibold text-primary-forest mt-0.5">{selectedProduct.originCooperativa}</p>
                <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>100% Orgânico e Rastreável</span>
                </div>
              </div>

              {/* Direct e-commerce purchase link */}
              <a
                id={`buy-now-${selectedProduct.id}`}
                href={selectedProduct.buyUrl || (
                  selectedProduct.name.toLowerCase().includes('210g')
                    ? 'https://www.seracacau.com.br/products/gotas-de-sera-cacau-210g'
                    : selectedProduct.name.toLowerCase().includes('105g')
                    ? 'https://www.seracacau.com.br/products/gotas-de-sera-cacau-105g'
                    : selectedProduct.name.toLowerCase().includes('disc') || selectedProduct.name.toLowerCase().includes('disco') || selectedProduct.name.toLowerCase().includes('36g')
                    ? 'https://www.seracacau.com.br/products/disco-sera-cacau-36g'
                    : selectedProduct.name.toLowerCase().includes('baunilha') || selectedProduct.name.toLowerCase().includes('fava')
                    ? 'https://www.seracacau.com.br/products/sera-baunilha-1-fava'
                    : 'https://www.seracacau.com.br'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-forest hover:bg-primary-forest/90 text-white rounded-xl text-xs uppercase font-bold tracking-widest transition-all shadow-md hover:scale-102 font-mono cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Comprar Agora</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </a>
            </div>

            {/* TAB SELECTOR FOR MONOGRAPH */}
            <div className="flex border-b border-border-color/60 font-mono">
              {[
                { id: 'formula', label: 'História & Fórmula' },
                { id: 'nutricional', label: 'Tabela Nutricional' },
                { id: 'prescricao', label: 'Protocolo de Consultório' }
              ].map((tab) => (
                <button
                  id={`monograph-tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3.5 text-center text-[10px] uppercase font-bold tracking-widest border-b-2 transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'border-primary-accent text-primary-accent font-extrabold' 
                      : 'border-transparent text-secondary-text/60 hover:text-primary-forest'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* MONOGRAPH CONTENT SWITCHER */}
            <div className="min-h-[220px]">
              
              {/* Tab: Formula */}
              {activeTab === 'formula' && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex flex-col gap-2.5">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-primary-accent font-mono">A História do Lote</h4>
                    <p className="text-xs text-secondary-text leading-relaxed">
                      {selectedProduct.story}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-primary-accent font-mono">Ingredientes e Ativos</h4>
                    <div className="p-4 rounded-xl bg-bg-app border border-border-color/60 text-xs text-primary-forest leading-relaxed italic">
                      {selectedProduct.ingredients}
                    </div>
                  </div>

                  {/* Benefits bullet points */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-primary-accent font-mono">Atributos Clínicos de Destaque</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedProduct.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-secondary-text">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-accent shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Nutrition */}
              {activeTab === 'nutricional' && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-border-color/60">
                    <span className="text-xs uppercase tracking-widest font-bold text-primary-accent font-mono">Porção Indicada</span>
                    <span className="text-xs font-semibold text-primary-forest font-mono">{selectedProduct.nutritionalTable.servingSize}</span>
                  </div>

                  {/* Beautiful Bento Cell Grid for Nutritive metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Valor Energético', value: selectedProduct.nutritionalTable.calories, desc: 'Energia limpa teobromínica' },
                      { label: 'Carboidratos', value: selectedProduct.nutritionalTable.carbohydrates, desc: 'Fibras prebióticas intactas' },
                      { label: 'Proteínas', value: selectedProduct.nutritionalTable.proteins, desc: 'Estruturação molecular natural' },
                      { label: 'Gorduras Totais', value: selectedProduct.nutritionalTable.fats, desc: 'Manteiga de cacau biodisponível' },
                      { label: 'Sódio', value: selectedProduct.nutritionalTable.sodium, desc: 'Totalmente isento de sais' },
                      { label: 'Minerais Nobres', value: selectedProduct.nutritionalTable.minerals || 'Magnésio e Ferro', desc: 'Modulação de humor' }
                    ].map((cell, idx) => (
                      <div key={idx} className="bg-surface p-4.5 rounded-xl border border-border-color flex flex-col justify-between h-24 shadow-sm">
                        <span className="text-[9px] uppercase tracking-wider text-primary-accent font-semibold font-mono">{cell.label}</span>
                        <span className="font-mono text-base font-bold text-primary-forest">{cell.value}</span>
                        <span className="text-[8px] text-secondary-text/80 leading-none">{cell.desc}</span>
                      </div>
                    ))}
                  </div>

                  {selectedProduct.hasLaudo && (
                    <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Laudo Fitoquímico e de Pureza</h5>
                          <p className="text-[10px] text-emerald-700 leading-snug mt-0.5">Certificação livre de metais pesados, contaminações biológicas e micotoxinas.</p>
                        </div>
                      </div>
                      <a
                        id="download-laudo-btn"
                        href="#"
                        onClick={(e) => { e.preventDefault(); alert('Abrindo laudo certificado em nova aba...'); }}
                        className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 text-emerald-600 transition-colors cursor-pointer"
                        title="Baixar Laudo Técnico"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Clinical Prescribing Protocols */}
              {activeTab === 'prescricao' && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="bg-primary-accent/15 p-5 rounded-xl border border-primary-accent/20 shadow-sm">
                    <span className="text-[9px] uppercase tracking-widest text-primary-accent font-bold font-mono">
                      Protocolo Clínico Recomendado
                    </span>
                    <p className="text-xs font-medium text-primary-forest leading-relaxed mt-2.5 italic">
                      {selectedProduct.protocol || 'Este produto apoia a modulação do humor através do fornecimento de precursores lipídicos de anandamida e flavonoides antioxidantes. Sugere-se o uso continuado para restabelecer a homeostase neurológica.'}
                    </p>
                  </div>

                  {/* Suggestive clinical dosage card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface p-4.5 rounded-xl border border-border-color shadow-sm">
                      <h5 className="text-[10px] uppercase tracking-widest font-bold text-primary-accent font-mono">Público Alvo</h5>
                      <p className="text-xs text-secondary-text mt-1">Pacientes com sintomas de burnout, estresse crônico, fadiga mitocondrial ou necessidade de substitutos de estimulantes adrenérgicos.</p>
                    </div>

                    <div className="bg-surface p-4.5 rounded-xl border border-border-color shadow-sm">
                      <h5 className="text-[10px] uppercase tracking-widest font-bold text-primary-accent font-mono">Sugestão de Preparo</h5>
                      <p className="text-xs text-secondary-text mt-1">Emulsionar a porção recomendada em leite vegetal morno (60ºC) para facilitar a solubilização dos polifenóis bioativos.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
