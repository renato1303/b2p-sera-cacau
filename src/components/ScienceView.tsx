/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SCIENCE_ARTICLES } from '../data';
import { ScienceArticle } from '../types';
import { 
  BookOpen, 
  ExternalLink, 
  Search, 
  Microscope, 
  HeartPulse, 
  Brain, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  FileText,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { SeraCacauIcon } from './SeraCacauIcon';

interface ScienceViewProps {
  articles?: ScienceArticle[];
}

export const ScienceView: React.FC<ScienceViewProps> = ({ articles = SCIENCE_ARTICLES }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredArticles = articles.filter(article => {
    if (selectedType && article.studyType !== selectedType) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.bioactiveFocus.toLowerCase().includes(q) ||
        article.authors.toLowerCase().includes(q) ||
        article.journal.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const studyTypes = Array.from(new Set(articles.map(a => a.studyType)));

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#182319] via-[#223324] to-[#141C15] p-8 md:p-12 text-[#F7F3EC] border border-[#455347]/40 shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-secondary-accent/15 blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-accent/20 border border-secondary-accent/40 text-secondary-accent text-xs font-semibold tracking-wider uppercase">
            <Microscope className="w-3.5 h-3.5" />
            Evidências & Farmacodinâmica Clínica
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif text-white font-normal tracking-tight">
            Ciência do Cacau 100% Puro
          </h1>
          
          <p className="text-[#C2C9C0] text-base md:text-lg leading-relaxed font-light">
            Base científica consolidada sobre a fitoquímica do cacau da Cabruca. Explore ensaios clínicos randomizados, farmacocinética da teobromina, biodisponibilidade de epicatequina e modulação do eixo intestino-cérebro com links diretos para os periódicos de alto impacto.
          </p>

          {/* Quick Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <HeartPulse className="w-4 h-4 text-primary-accent shrink-0" />
              <span><strong>Vasodilatação eNOS</strong> & Saúde Cardiovascular</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <Brain className="w-4 h-4 text-luxury-accent shrink-0" />
              <span><strong>Teobromina</strong> & Alerta Sereno sem Ansiedade</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <Sparkles className="w-4 h-4 text-secondary-accent shrink-0" />
              <span><strong>Procianidinas</strong> & Microbiota Produtora de Butirato</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Bioactive Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-primary-forest/10 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary-forest/10 text-primary-forest flex items-center justify-center font-serif font-bold text-lg">
            01
          </div>
          <h3 className="font-serif font-bold text-base text-[#1C261D]">Torra Branda vs Alcalinização</h3>
          <p className="text-xs text-[#5E685F] leading-relaxed">
            O cacau comum da indústria perde até 85% dos flavanóis pelo processo de alcalinização (Dutching). A Será Cacau preserva mais de <strong>45 mg/g de polifenóis bioativos</strong> através da fermentação biológica e moagem suave em pedra.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-primary-forest/10 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-secondary-accent/15 text-secondary-accent flex items-center justify-center font-serif font-bold text-lg">
            02
          </div>
          <h3 className="font-serif font-bold text-base text-[#1C261D]">Farmacocinética da Teobromina</h3>
          <p className="text-xs text-[#5E685F] leading-relaxed">
            Com meia-vida de 7 a 12 horas e ação vasodilatadora suave, a teobromina do cacau atua em receptores de adenosina sem deflagrar picos adrenérgicos, vasoconstrição ou efeito "crash" típico da cafeína isolada.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-primary-forest/10 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary-accent/15 text-primary-accent flex items-center justify-center font-serif font-bold text-lg">
            03
          </div>
          <h3 className="font-serif font-bold text-base text-[#1C261D]">Ação Prebiótica Colônica</h3>
          <p className="text-xs text-[#5E685F] leading-relaxed">
            90% dos polifenóis do cacau puro atingem o cólon íntegros, estimulando a proliferação seletiva de *Bifidobacterium* e *Lactobacillus* e aumentando a produção de ácidos graxos de cadeia curta (Butirato).
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-5 border border-primary-forest/10 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <span className="text-xs font-semibold text-[#8C968B] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Desenho do Estudo:
            </span>
            <button
              onClick={() => setSelectedType(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedType === null
                  ? 'bg-primary-forest text-white shadow-sm'
                  : 'bg-[#F2EDE4] text-[#4A554B] hover:bg-[#E8E1D5]'
              }`}
            >
              Todos ({SCIENCE_ARTICLES.length})
            </button>
            {studyTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type === selectedType ? null : type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  selectedType === type
                    ? 'bg-secondary-accent text-white shadow-sm font-semibold'
                    : 'bg-[#F2EDE4] text-[#4A554B] hover:bg-[#E8E1D5]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C968B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por DOI, autor ou ativo..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F9F7F2] border border-[#E0D8C8] rounded-xl text-sm text-[#1C261D] placeholder-[#8C968B] focus:outline-none focus:ring-2 focus:ring-primary-forest/30"
            />
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl border border-primary-forest/10 p-6 md:p-8 shadow-sm hover:shadow-md transition-all space-y-6"
          >
            {/* Top Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EAE1] pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-primary-forest/10 text-primary-forest text-xs font-bold uppercase tracking-wider">
                  {article.studyType}
                </span>
                <span className="px-3 py-1 rounded-md bg-secondary-accent/15 text-secondary-accent text-xs font-bold">
                  {article.bioactiveFocus}
                </span>
                <span className="text-xs text-[#8C968B] font-medium">
                  {article.journal} • {article.year}
                </span>
              </div>

              {article.pmid && (
                <span className="text-xs text-[#8C968B] bg-[#F5EFE6] px-2.5 py-1 rounded">
                  PMID: <strong>{article.pmid}</strong>
                </span>
              )}
            </div>

            {/* Title and Authors */}
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C261D] leading-snug">
                {article.title}
              </h2>
              <p className="text-xs text-[#737E74] italic">
                {article.authors}
              </p>
            </div>

            {/* Summary and Key Findings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="text-sm text-[#3E473F] leading-relaxed">
                  {article.summary}
                </div>

                {/* Key Findings Checklist */}
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D5] space-y-2">
                  <span className="text-xs font-bold text-primary-forest uppercase tracking-wider block">
                    Principais Desfechos & Achados:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#4A554B]">
                    {article.keyFindings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-secondary-accent shrink-0 mt-0.5" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Clinical Takeaway Callout */}
              <div className="bg-gradient-to-br from-[#1C261D] to-[#2B3A2D] text-[#F7F3EC] p-5 rounded-xl border border-[#455347]/40 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-luxury-accent text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Aplicação no Consultório:
                  </span>
                  <p className="text-xs text-[#DFE5DE] leading-relaxed">
                    {article.clinicalTakeaway}
                  </p>
                </div>

                <a
                  href={article.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-luxury-accent hover:bg-luxury-accent/90 text-[#1C261D] text-xs font-bold shadow transition-colors"
                >
                  <span>Acessar Artigo Original (DOI)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
