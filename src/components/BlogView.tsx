/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blog';
import { 
  Newspaper, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ArrowLeft,
  Share2, 
  BookOpen,
  X, 
  Search, 
  ExternalLink, 
  Tag, 
  CheckCircle2, 
  BookmarkCheck, 
  ChevronRight, 
  Filter,
  Video,
  Sparkles
} from 'lucide-react';
import { SeraCacauIcon } from './SeraCacauIcon';

// Helper to render inline formatting (**bold** and *italic*)
const renderInlineFormatting = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-primary-forest">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index} className="italic text-primary-forest/90">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
};

// Component to render formatted blog body with standard typography
const FormattedBlogContent: React.FC<{ content: string }> = ({ content }) => {
  const paragraphs = content.split(/\n\s*\n/);

  return (
    <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[#364238]">
      {paragraphs.map((paragraph, index) => {
        const trimmed = paragraph.trim();
        if (!trimmed) return null;

        // Heading Level 3 (###)
        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.replace(/^###\s+/, '');
          return (
            <div key={index} className="pt-6 pb-1 border-b border-border-color/60">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary-forest leading-snug">
                {renderInlineFormatting(headingText)}
              </h3>
            </div>
          );
        }

        // Heading Level 4 (####)
        if (trimmed.startsWith('#### ')) {
          const headingText = trimmed.replace(/^####\s+/, '');
          return (
            <h4 key={index} className="text-base sm:text-lg font-serif font-bold text-cocoa pt-3">
              {renderInlineFormatting(headingText)}
            </h4>
          );
        }

        // Blockquote (> )
        if (trimmed.startsWith('> ')) {
          const quoteText = trimmed.replace(/^>\s+/, '');
          return (
            <blockquote key={index} className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border-l-4 border-luxury-accent text-secondary-text italic text-sm sm:text-base my-4 shadow-sm">
              {renderInlineFormatting(quoteText)}
            </blockquote>
          );
        }

        // Bullet List Block (contains lines starting with * or - or •)
        const lines = trimmed.split('\n');
        const isList = lines.some(line => /^[*\-•]\s+/.test(line.trim()));

        if (isList) {
          return (
            <ul key={index} className="space-y-2.5 my-4 pl-1 sm:pl-2">
              {lines.map((line, lIdx) => {
                const cleanLine = line.replace(/^[*\-•]\s*/, '').trim();
                if (!cleanLine) return null;
                return (
                  <li key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm md:text-[15px] leading-relaxed text-secondary-text">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-accent mt-2 shrink-0" />
                    <span>{renderInlineFormatting(cleanLine)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Standard Paragraph
        return (
          <p key={index} className="text-xs sm:text-sm md:text-[15px] leading-relaxed text-secondary-text">
            {renderInlineFormatting(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

export const BlogView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(BLOG_POSTS.map(p => p.category)));
    return ['Todos', ...unique];
  }, []);

  const filteredArticles = useMemo(() => {
    return BLOG_POSTS.filter(article => {
      const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.tags && article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleShare = (article: BlogPost, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}?article=${article.id}`);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 3000);
    }
  };

  const handleSelectArticle = (article: BlogPost) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FULL SCREEN ARTICLE VIEW (quando o usuário clica em algum artigo)
  if (selectedArticle) {
    const relatedArticles = BLOG_POSTS.filter(p => p.id !== selectedArticle.id).slice(0, 2);

    return (
      <div className="px-4 sm:px-6 md:px-12 py-8 max-w-5xl mx-auto w-full flex flex-col gap-8 font-sans text-primary-text animate-fadeIn">
        
        {/* Top Sticky Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-4 sm:p-5 rounded-2xl border border-border-color shadow-sm">
          <button
            onClick={handleBackToBlog}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary-surface hover:bg-border-color/40 text-primary-forest text-xs font-bold transition-all group w-fit cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-primary-accent group-hover:-translate-x-1 transition-transform" />
            <span>Voltar ao Blog & Artigos</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-luxury-accent/20 border border-luxury-accent/40 text-luxury-accent text-[11px] font-bold font-mono uppercase">
              {selectedArticle.category}
            </span>
            <span className="text-xs text-secondary-text font-mono">
              • {selectedArticle.readTime} de leitura
            </span>
            <button
              onClick={() => handleShare(selectedArticle)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-forest text-luxury-accent font-bold text-xs hover:bg-primary-forest/90 transition-all font-mono shadow cursor-pointer ml-auto sm:ml-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedId === selectedArticle.id ? 'Link Copiado!' : 'Compartilhar Artigo'}</span>
            </button>
          </div>
        </div>

        {/* Full Article Content Card */}
        <article className="bg-surface rounded-3xl border border-border-color shadow-sm overflow-hidden p-6 sm:p-10 md:p-12 space-y-8">
          
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-primary-accent font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {selectedArticle.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}
              </span>
              <span>•</span>
              <span>Editorial Oficial Será Cacau</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-primary-forest leading-tight">
              {selectedArticle.title}
            </h1>
            
            <p className="text-sm md:text-lg text-secondary-text italic border-l-4 border-luxury-accent pl-4 py-1 leading-relaxed bg-[#FAF7F2] rounded-r-xl">
              {selectedArticle.summary}
            </p>
          </div>

          {/* Cover Hero Image */}
          <div className="h-64 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden bg-secondary-surface relative shadow-md">
            <img
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Formatted Text Body */}
          <div className="pt-2">
            <FormattedBlogContent content={selectedArticle.content} />
          </div>

          {/* Video Section at the end of the post (if available) */}
          {selectedArticle.vimeoVideoId && (
            <div className="bg-gradient-to-br from-[#1C261D] via-[#2A382C] to-[#151E16] text-[#F7F3EC] p-6 sm:p-8 rounded-3xl border border-[#455347]/60 shadow-xl space-y-5 my-8">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-accent/20 border border-luxury-accent/40 text-luxury-accent text-xs font-semibold uppercase tracking-wider font-mono">
                  <Video className="w-3.5 h-3.5" /> Vídeo Complementar do Artigo
                </div>
                <span className="text-[11px] font-mono text-[#C8D1C7]/70 uppercase tracking-wider">
                  Produção Exclusiva Será Cacau
                </span>
              </div>

              {selectedArticle.videoTitle && (
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {selectedArticle.videoTitle}
                </h3>
              )}

              {selectedArticle.videoCaption && (
                <p className="text-xs sm:text-sm text-[#C2C9C0] leading-relaxed">
                  {selectedArticle.videoCaption}
                </p>
              )}

              <div className="flex justify-center pt-2">
                <div className="w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border-2 border-luxury-accent/40 shadow-2xl">
                  <iframe
                    src={`https://player.vimeo.com/video/${selectedArticle.vimeoVideoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&dnt=1`}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    allowFullScreen
                    title={selectedArticle.videoTitle || selectedArticle.title}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Scientific References Section */}
          {selectedArticle.referencesList && selectedArticle.referencesList.length > 0 && (
            <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8E1D5] space-y-4 mt-8">
              <div className="flex items-center gap-2 text-primary-forest font-serif font-bold text-sm sm:text-base">
                <BookmarkCheck className="w-4 h-4 text-primary-accent" />
                <span>Referências & Literatura Científica</span>
              </div>
              
              <ol className="space-y-2.5 text-xs text-[#5E685F] pl-4 list-decimal marker:font-bold marker:text-primary-accent">
                {selectedArticle.referencesList.map((ref, rIdx) => (
                  <li key={rIdx} className="leading-relaxed">
                    <span>{ref.title}</span>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 ml-2 text-primary-accent hover:underline font-mono font-semibold"
                      >
                        <span>Acessar Artigo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Tags Cloud */}
          {selectedArticle.tags && selectedArticle.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-border-color/60">
              <span className="text-xs text-secondary-text font-bold font-mono uppercase flex items-center gap-1">
                <Tag className="w-3 h-3 text-primary-accent" /> Palavras-chave:
              </span>
              {selectedArticle.tags.map((tag, tIdx) => (
                <span key={tIdx} className="text-xs font-mono px-3 py-1 bg-secondary-surface text-secondary-text rounded-full border border-border-color">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Navigation & Share Bar */}
          <div className="pt-8 border-t border-border-color flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleBackToBlog}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border-color text-xs font-bold uppercase tracking-wider text-secondary-text hover:bg-secondary-surface transition-colors font-mono cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-primary-accent" />
              <span>Voltar a Todos os Artigos</span>
            </button>

            <button
              onClick={() => handleShare(selectedArticle)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-forest text-luxury-accent font-bold text-xs uppercase tracking-wider hover:bg-primary-forest/90 transition-all font-mono shadow cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedId === selectedArticle.id ? 'Link Copiado!' : 'Compartilhar Artigo'}</span>
            </button>
          </div>

        </article>

        {/* Related Articles Preview */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-serif font-bold text-primary-forest flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-luxury-accent" /> Outros Artigos Recomendados
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map(article => (
                <div
                  key={article.id}
                  onClick={() => handleSelectArticle(article)}
                  className="p-5 bg-surface rounded-2xl border border-border-color hover:border-primary-accent/40 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-luxury-accent bg-primary-forest/10 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <h4 className="text-base font-serif font-bold text-primary-forest line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-secondary-text line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-primary-accent flex items-center gap-1">
                    Ler Artigo <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    );
  }

  // LISTAGEM PRINCIPAL DO BLOG
  return (
    <div className="px-4 sm:px-6 md:px-12 py-8 max-w-7xl mx-auto w-full flex flex-col gap-8 font-sans text-primary-text animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-primary-forest via-secondary-forest to-primary-forest text-white p-8 md:p-12 rounded-3xl border border-luxury-accent/30 shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-luxury-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-primary-accent/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-luxury-accent/20 border border-luxury-accent/40 text-luxury-accent text-[9px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full font-mono">
              Editorial Científico & Cultural
            </span>
            <span className="text-[10px] text-white/60 font-mono">
              Atualizado semanalmente
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Blog & Artigos Será Cacau
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#D3DDD4] leading-relaxed max-w-2xl">
            Artigos aprofundados sobre botânica, processamento Tree to Bar vs. Bean to Bar, fitoquímica clínica, saúde da mulher e a história milenar do ritual do cacau.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-luxury-accent font-mono">
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-luxury-accent" /> 6 Artigos Exclusivos
            </span>
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full border border-white/10">
              <BookmarkCheck className="w-3.5 h-3.5 text-luxury-accent" /> Referências PubMed / SciELO
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-border-color shadow-sm">
        
        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-primary-accent shrink-0 ml-1 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary-forest text-luxury-accent shadow'
                  : 'bg-secondary-surface text-secondary-text hover:text-primary-forest hover:bg-secondary-surface/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-secondary-text absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tema ou palavra..."
            className="w-full pl-9 pr-4 py-2 bg-secondary-surface border border-border-color rounded-xl text-xs text-primary-text focus:outline-none focus:border-primary-accent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-secondary-text hover:text-primary-forest"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Grid of Articles */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-2xl border border-border-color space-y-3">
          <BookOpen className="w-10 h-10 text-secondary-text/40 mx-auto" />
          <h3 className="text-base font-bold text-primary-forest">Nenhum artigo encontrado</h3>
          <p className="text-xs text-secondary-text">Tente ajustar a busca ou escolher outra categoria.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
            className="mt-2 px-4 py-2 bg-primary-forest text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => handleSelectArticle(article)}
              className="group bg-surface rounded-3xl border border-border-color overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-accent/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Clean Image */}
                <div className="relative h-52 w-full overflow-hidden bg-secondary-surface">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {article.vimeoVideoId && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm text-luxury-accent text-[10px] font-bold font-mono uppercase tracking-wider border border-luxury-accent/40 shadow flex items-center gap-1">
                      <Video className="w-3 h-3 text-luxury-accent" /> Vídeo
                    </span>
                  )}
                </div>

                {/* Article Info */}
                <div className="p-5 md:p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#FAF7F2] text-primary-accent text-[11px] font-bold font-mono uppercase tracking-wider border border-primary-forest/10">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] text-secondary-text font-mono">
                      <span>{article.publishDate}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-lg md:text-xl font-serif font-bold text-primary-forest group-hover:text-primary-accent transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-xs md:text-sm text-secondary-text leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-secondary-surface text-secondary-text rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-5 md:p-6 pt-0 border-t border-border-color/60 mt-2 flex items-center justify-between text-xs font-bold font-mono">
                <span className="text-primary-accent group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                  Ler Artigo Completo <ArrowRight className="w-3.5 h-3.5" />
                </span>
                
                <button
                  onClick={(e) => handleShare(article, e)}
                  className="p-2 hover:bg-secondary-surface rounded-lg text-secondary-text hover:text-primary-forest transition-colors cursor-pointer"
                  title="Compartilhar"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
