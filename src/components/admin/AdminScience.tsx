/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScienceArticle } from '../../types';
import { 
  Microscope, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  HeartPulse
} from 'lucide-react';

interface AdminScienceProps {
  articles: ScienceArticle[];
  onAddArticle: (article: ScienceArticle) => void;
  onDeleteArticle?: (articleId: string) => void;
}

export const AdminScience: React.FC<AdminScienceProps> = ({
  articles,
  onAddArticle,
  onDeleteArticle
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('The American Journal of Clinical Nutrition');
  const [year, setYear] = useState('2024');
  const [studyType, setStudyType] = useState<string>('Ensaio Clínico Randomizado');
  const [bioactiveFocus, setBioactiveFocus] = useState('Flavonoides ((-)-epicatequina) & Óxido Nítrico');
  const [authors, setAuthors] = useState('Schroeter H. et al.');
  const [summary, setSummary] = useState('');
  const [clinicalTakeaway, setClinicalTakeaway] = useState('');
  const [doiUrl, setDoiUrl] = useState('https://doi.org/10.3945/ajcn.111.023812');
  const [pmid, setPmid] = useState('22301923');

  // Key findings list
  const [findings, setFindings] = useState<string[]>([
    'Aumento significativo na dilatação mediada por fluxo (FMD) após ingestão aguda de cacau puro.',
    'Estímulo sustentado da óxido nítrico sintase endotelial (eNOS).'
  ]);
  const [newFinding, setNewFinding] = useState('');

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleAddFinding = () => {
    if (!newFinding.trim()) return;
    setFindings(prev => [...prev, newFinding.trim()]);
    setNewFinding('');
  };

  const handleRemoveFinding = (index: number) => {
    setFindings(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      alert('Por favor, preencha o título e o resumo do estudo científico.');
      return;
    }

    const newArticle: ScienceArticle = {
      id: `science-${Date.now()}`,
      title: title.trim(),
      journal: journal.trim() || 'Journal of Functional Foods',
      year: year.trim() || '2024',
      studyType: studyType.trim() || 'Ensaio Clínico Randomizado',
      bioactiveFocus: bioactiveFocus.trim() || 'Flavonoides & Teobromina',
      summary: summary.trim(),
      clinicalTakeaway: clinicalTakeaway.trim() || 'O cacau funcional puro demonstra alta relevância na modulação vascular e cognitiva.',
      keyFindings: findings.length > 0 ? findings : ['Efeitos positivos clinicamente comprovados.'],
      doiUrl: doiUrl.trim() || 'https://doi.org',
      authors: authors.trim() || 'Pesquisadores Clínicos',
      pmid: pmid.trim() || undefined
    };

    onAddArticle(newArticle);
    triggerSuccess(`Artigo Científico "${newArticle.title}" publicado na Ciência do Cacau!`);

    // Reset
    setTitle('');
    setSummary('');
    setClinicalTakeaway('');
    setViewMode('list');
  };

  const filteredArticles = articles.filter(a => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.journal.toLowerCase().includes(q) ||
      a.bioactiveFocus.toLowerCase().includes(q) ||
      a.studyType.toLowerCase().includes(q)
    );
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
          <h2 className="text-xl font-serif text-primary-forest">Ciência do Cacau & Evidências Clínicas</h2>
          <p className="text-xs text-[#526054] mt-0.5">
            Cadastre ensaios clínicos randomizados, revisões sistemáticas e farmacodinâmica dos bioativos do cacau.
          </p>
        </div>

        <div>
          {viewMode === 'create' ? (
            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2.5 rounded-xl bg-[#F2EDE4] hover:bg-[#E8E1D5] text-primary-forest text-xs font-bold transition-all cursor-pointer"
            >
              Voltar para Lista de Estudos
            </button>
          ) : (
            <button
              onClick={() => setViewMode('create')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-forest hover:bg-primary-forest/90 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 text-secondary-accent" />
              <span>Adicionar Novo Estudo Científico</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE: CREATE SCIENCE ARTICLE                                         */}
      {/* ========================================================================= */}
      {viewMode === 'create' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2E4030]/10 shadow-xl space-y-8 animate-fadeIn">
          <div className="border-b border-[#2E4030]/10 pb-4">
            <span className="text-[11px] font-mono font-bold tracking-widest text-primary-accent uppercase block">
              Evidência Clínica
            </span>
            <h3 className="text-2xl font-serif text-primary-forest mt-1">
              Cadastrar Estudo na Seção Ciência do Cacau
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Título Completo do Estudo Científico *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ex: Impact of Cocoa Flavanols on Human Endothelial Function and Blood Pressure"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm font-semibold text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Revista Científica / Journal</label>
                <input
                  type="text"
                  value={journal}
                  onChange={e => setJournal(e.target.value)}
                  placeholder="The American Journal of Clinical Nutrition"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Ano de Publicação</label>
                <input
                  type="text"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  placeholder="2024"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Tipo de Estudo</label>
                <select
                  value={studyType}
                  onChange={e => setStudyType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                >
                  <option value="Ensaio Clínico Randomizado">Ensaio Clínico Randomizado</option>
                  <option value="Revisão Sistemática & Metanálise">Revisão Sistemática & Metanálise</option>
                  <option value="Estudo Mecanístico / Fisiológico">Estudo Mecanístico / Fisiológico</option>
                  <option value="Estudo Farmacognóstico">Estudo Farmacognóstico</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Foco Bioativo & Marcadores Avaliados</label>
                <input
                  type="text"
                  value={bioactiveFocus}
                  onChange={e => setBioactiveFocus(e.target.value)}
                  placeholder="Ex: Flavonoides, Epicatequina, FMD, Óxido Nítrico"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Autores</label>
                <input
                  type="text"
                  value={authors}
                  onChange={e => setAuthors(e.target.value)}
                  placeholder="Ex: Schroeter H., Heiss C., Spencer J.P. et al."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">PMID (PubMed ID)</label>
                <input
                  type="text"
                  value={pmid}
                  onChange={e => setPmid(e.target.value)}
                  placeholder="22301923"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Link DOI Oficial</label>
                <input
                  type="text"
                  value={doiUrl}
                  onChange={e => setDoiUrl(e.target.value)}
                  placeholder="https://doi.org/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Resumo do Estudo (Abstract Executivo) *</label>
                <textarea
                  rows={4}
                  required
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  placeholder="Descreva a metodologia, grupo amostral, dosagem do cacau e desfechos primários..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Conclusão Clínica Prática (Takeaway para o Consultório)</label>
                <textarea
                  rows={2}
                  value={clinicalTakeaway}
                  onChange={e => setClinicalTakeaway(e.target.value)}
                  placeholder="Como a nutricionista aplica este achado na prescrição de seus pacientes..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Key Findings Dynamic List */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#2E4030]/15 space-y-4">
              <span className="text-xs font-bold text-primary-forest block">
                Principais Achados & Evidências ({findings.length})
              </span>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFinding}
                  onChange={e => setNewFinding(e.target.value)}
                  placeholder="Adicione um achado quantitativo ou estatístico..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                />
                <button
                  type="button"
                  onClick={handleAddFinding}
                  className="px-4 py-2 rounded-xl bg-primary-forest text-white text-xs font-bold shrink-0"
                >
                  + Achado
                </button>
              </div>

              <div className="space-y-1.5 pt-2">
                {findings.map((f, i) => (
                  <div key={i} className="flex items-start justify-between p-2 rounded-xl bg-white text-xs border border-[#2E4030]/10 gap-2">
                    <span className="text-primary-forest leading-relaxed">· {f}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFinding(i)}
                      className="text-red-400 hover:text-red-600 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
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
                <span>Publicar Artigo Científico</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE: SCIENCE ARTICLES LIST                                          */}
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
              placeholder="Buscar artigos científicos por título, foco bioativo ou autores..."
              className="w-full text-xs text-primary-text bg-transparent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map(article => (
              <div
                key={article.id}
                className="bg-white rounded-2xl p-5 border border-[#2E4030]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                      {article.studyType}
                    </span>
                    <span className="text-[10px] text-[#6A786C] font-mono">{article.year}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-primary-forest line-clamp-2 mt-1">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#526054] line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2E4030]/10 flex items-center justify-between">
                  <span className="text-[10px] text-[#6A786C] font-mono line-clamp-1 max-w-[200px]">
                    {article.journal}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={article.doiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-sky-700 hover:text-sky-900"
                      title="Ver no DOI"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {onDeleteArticle && (
                      <button
                        onClick={() => {
                          if (confirm(`Deseja remover o estudo "${article.title}"?`)) {
                            onDeleteArticle(article.id);
                            triggerSuccess('Estudo removido com sucesso!');
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700"
                        title="Remover Estudo"
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
