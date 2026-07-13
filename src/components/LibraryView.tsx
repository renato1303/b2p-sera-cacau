/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  FileText, 
  BookOpen, 
  Sparkles,
  Check
} from 'lucide-react';
import { FileAttachment } from '../types';

interface LibraryViewProps {
  attachments: FileAttachment[];
  onDownloadIncrement: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  attachments,
  onDownloadIncrement
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Laudos', 'Protocolos', 'Receitas', 'Marketing'];

  const filteredAttachments = attachments.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (fileName: string) => {
    onDownloadIncrement();
    alert(`Iniciando download do arquivo técnico:\n${fileName}\n\nDocumento criptografado e certificado digitalmente pela Será Cacau Ltda.`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 md:px-12 flex flex-col gap-10 font-sans text-primary-text">
      
      {/* Header */}
      <header className="flex flex-col gap-3">
        <span className="text-xs tracking-[0.2em] uppercase text-primary-accent font-bold font-mono">
          arquivos certificados
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-forest">
          Biblioteca Técnica
        </h1>
        <p className="text-xs md:text-sm text-secondary-text max-w-xl leading-relaxed">
          Tenha acesso instantâneo aos laudos laboratoriais físico-químicos, manuais de consultório e lâminas nutricionais para enriquecer seu atendimento clínico.
        </p>
        <div className="h-[1px] bg-border-color/60 mt-2"></div>
      </header>

      {/* Category Buttons & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        {/* Category Toggles */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded text-[10px] tracking-widest uppercase transition-all whitespace-nowrap font-bold font-mono cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary-forest text-white'
                  : 'bg-surface border border-border-color hover:bg-secondary-surface text-secondary-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Buscar arquivos técnicos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded border border-border-color focus:border-primary-accent focus:outline-none bg-surface text-xs transition-colors"
          />
          <Search className="absolute left-3 top-3.5 w-3.5 h-3.5 text-secondary-text/80" />
        </div>
      </div>

      {/* Grid of Downloadable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAttachments.map((file) => (
          <div 
            key={file.id}
            className="bg-surface border border-border-color rounded-lg p-5 flex flex-col justify-between hover:border-primary-accent/30 shadow-sm transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-primary-accent/10 border border-primary-accent/20 text-primary-accent flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="text-[9px] tracking-widest uppercase text-primary-accent font-bold font-mono">
                  {file.category}
                </span>
                <h3 className="text-base font-bold text-primary-forest leading-snug group-hover:text-primary-accent transition-colors">
                  {file.name}
                </h3>
                <span className="text-[10px] text-secondary-text/60 mt-1 font-mono">
                  Tamanho do arquivo: {file.size}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-5 pt-3 border-t border-border-color/60">
              <span className="text-[9px] text-primary-accent/80 tracking-widest uppercase flex items-center gap-1 font-mono">
                <Check className="w-3.5 h-3.5 text-primary-accent" />
                documento oficial
              </span>
              <button
                id={`download-btn-${file.id}`}
                onClick={() => handleDownload(file.name)}
                className="flex items-center gap-2 px-3.5 py-2 bg-primary-accent hover:bg-primary-accent/90 text-white rounded text-[9px] tracking-widest uppercase transition-all font-mono font-bold shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                baixar pdf
              </button>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {filteredAttachments.length === 0 && (
          <div className="col-span-full py-16 text-center flex flex-col items-center gap-4 bg-surface border border-dashed border-border-color rounded-lg">
            <BookOpen className="w-12 h-12 text-secondary-text/40" />
            <h3 className="text-xl font-bold text-primary-forest">Nenhum laudo ou guia encontrado</h3>
            <p className="text-xs text-secondary-text max-w-sm">
              Revise o termo de busca ou selecione outra categoria de documentos na barra de filtros superiores.
            </p>
          </div>
        )}
      </div>

      {/* Notice about compliance */}
      <footer className="bg-secondary-surface border border-border-color rounded-lg p-5 flex flex-col gap-2">
        <span className="text-[9px] tracking-widest uppercase text-primary-forest/50 font-bold font-mono">Responsabilidade e Conformidade (LGPD)</span>
        <p className="text-[10px] md:text-xs text-secondary-text leading-relaxed">
          Todos os laudos microbiológicos e de fitoativos publicados na biblioteca são emitidos por laboratórios credenciados pela ANVISA e em total conformidade com a legislação brasileira. As lâminas são para uso estritamente profissional no apoio à consulta clínica.
        </p>
      </footer>

    </div>
  );
};
