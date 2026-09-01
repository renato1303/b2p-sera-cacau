/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BlogPost, BlogPostReference } from '../../data/blog';
import { 
  FileText, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Eye, 
  BookOpen, 
  Clock, 
  Tag, 
  User, 
  Video, 
  ExternalLink,
  Sparkles,
  Search,
  Check
} from 'lucide-react';

interface AdminBlogProps {
  posts: BlogPost[];
  onAddPost: (post: BlogPost) => void;
  onDeletePost?: (postId: string) => void;
}

export const AdminBlog: React.FC<AdminBlogProps> = ({
  posts,
  onAddPost,
  onDeletePost
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Nutrição Clínica');
  const [author, setAuthor] = useState('Luna Azevedo');
  const [authorRole, setAuthorRole] = useState('Nutricionista Clínica & Pesquisadora');
  const [authorPhoto, setAuthorPhoto] = useState('/foto-luna.jpeg');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=1200');
  const [readTime, setReadTime] = useState('5 min de leitura');
  const [tagsString, setTagsString] = useState('Cacau, Polifenóis, Nutrição Funcional');
  const [vimeoId, setVimeoId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  
  // References
  const [references, setReferences] = useState<BlogPostReference[]>([
    { title: 'The American Journal of Clinical Nutrition · Flavanols and Vascular Health' }
  ]);
  const [newRefTitle, setNewRefTitle] = useState('');
  const [newRefUrl, setNewRefUrl] = useState('');

  // Live Preview Toggle in Form
  const [showPreview, setShowPreview] = useState(false);

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleAddReference = () => {
    if (!newRefTitle.trim()) return;
    setReferences(prev => [...prev, { title: newRefTitle.trim(), url: newRefUrl.trim() || undefined }]);
    setNewRefTitle('');
    setNewRefUrl('');
  };

  const handleRemoveReference = (idx: number) => {
    setReferences(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Por favor, preencha o título e o conteúdo do artigo.');
      return;
    }

    const tags = tagsString.split(',').map(t => t.trim()).filter(Boolean);

    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim() || title.trim(),
      content: content.trim(),
      category: category.trim() || 'Nutrição Clínica',
      author: author.trim() || 'Luna Azevedo',
      authorRole: authorRole.trim() || 'Nutricionista',
      authorPhoto: authorPhoto.trim() || undefined,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=1200',
      publishDate: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: readTime.trim() || '5 min',
      tags: tags.length > 0 ? tags : ['Cacau Funcional'],
      referencesList: references.length > 0 ? references : undefined,
      vimeoVideoId: vimeoId.trim() || undefined,
      videoTitle: videoTitle.trim() || undefined
    };

    onAddPost(newPost);
    triggerSuccess(`Artigo "${newPost.title}" publicado no Blog com sucesso!`);
    
    // Reset
    setTitle('');
    setSummary('');
    setContent('');
    setViewMode('list');
  };

  const filteredPosts = posts.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q)
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
          <h2 className="text-xl font-serif text-primary-forest">Editor & Publicações do Blog (CMS)</h2>
          <p className="text-xs text-[#526054] mt-0.5">
            Escreva artigos técnicos, publique colunas de especialistas e enriqueça o acervo científico da comunidade.
          </p>
        </div>

        <div>
          {viewMode === 'create' ? (
            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2.5 rounded-xl bg-[#F2EDE4] hover:bg-[#E8E1D5] text-primary-forest text-xs font-bold transition-all cursor-pointer"
            >
              Voltar para Lista de Artigos
            </button>
          ) : (
            <button
              onClick={() => setViewMode('create')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-forest hover:bg-primary-forest/90 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 text-secondary-accent" />
              <span>Escrever Novo Artigo</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE: CREATE NEW BLOG POST                                           */}
      {/* ========================================================================= */}
      {viewMode === 'create' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2E4030]/10 shadow-xl space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#2E4030]/10 pb-4">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-primary-accent uppercase block">
                Novo Post
              </span>
              <h3 className="text-2xl font-serif text-primary-forest mt-1">
                Redigir Artigo para o Blog Será Cacau
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs font-bold text-primary-forest hover:bg-[#F2EDE4] transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-primary-accent" />
              <span>{showPreview ? 'Ocultar Prévia' : 'Pré-visualizar'}</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Título do Artigo *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ex: Farmacocinética dos Flavonoides do Cacau e Biodisponibilidade"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm text-primary-text focus:outline-none focus:border-primary-forest font-medium"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Resumo Executivo / Subtítulo</label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  placeholder="Breve parágrafo explicativo em destaque..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none focus:border-primary-forest resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Categoria</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none focus:border-primary-forest"
                >
                  <option value="Nutrição Clínica">Nutrição Clínica</option>
                  <option value="Origem & Processamento">Origem & Processamento</option>
                  <option value="Farmacodinâmica">Farmacodinâmica</option>
                  <option value="Casos Clínicos">Casos Clínicos & Prática</option>
                  <option value="Rituais & Estilo de Vida">Rituais & Estilo de Vida</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Tempo Estimado de Leitura</label>
                <input
                  type="text"
                  value={readTime}
                  onChange={e => setReadTime(e.target.value)}
                  placeholder="Ex: 6 min de leitura"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Autor(a)</label>
                <input
                  type="text"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  placeholder="Ex: Luna Azevedo, Dani..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Cargo / Especialidade do Autor</label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={e => setAuthorRole(e.target.value)}
                  placeholder="Ex: Nutricionista Clínica Funcional"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">URL da Imagem de Capa</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={tagsString}
                  onChange={e => setTagsString(e.target.value)}
                  placeholder="Polifenóis, Teobromina, Sistema Cardiovascular"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              {/* Vimeo Video Option */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Vídeo do Vimeo (Opcional - ID ou URL)</label>
                <input
                  type="text"
                  value={vimeoId}
                  onChange={e => setVimeoId(e.target.value)}
                  placeholder="Ex: 76979871"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Título do Vídeo Embutido</label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={e => setVideoTitle(e.target.value)}
                  placeholder="Ex: Aula Explicativa da Luna em Vídeo"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              {/* Content Body Editor */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-primary-forest">
                    Conteúdo Completo do Artigo (Suporta quebras de linha e formatação) *
                  </label>
                  <span className="text-[10px] text-[#6A786C]">Dica: use **negrito** e *itálico*</span>
                </div>
                <textarea
                  rows={10}
                  required
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Escreva os parágrafos do artigo..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm text-primary-text focus:outline-none focus:border-primary-forest font-sans leading-relaxed"
                />
              </div>
            </div>

            {/* References Section */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#2E4030]/15 space-y-4">
              <span className="text-xs font-bold text-primary-forest block">
                Referências Bibliográficas & Ensaios Clínicos ({references.length})
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={newRefTitle}
                  onChange={e => setNewRefTitle(e.target.value)}
                  placeholder="Nome do Estudo / Artigo..."
                  className="sm:col-span-2 px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newRefUrl}
                    onChange={e => setNewRefUrl(e.target.value)}
                    placeholder="URL DOI (opcional)..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                  <button
                    type="button"
                    onClick={handleAddReference}
                    className="px-3 py-2 rounded-xl bg-primary-forest text-white text-xs font-bold shrink-0"
                  >
                    + Ref
                  </button>
                </div>
              </div>

              {references.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  {references.map((ref, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white text-xs">
                      <span className="text-primary-forest font-medium">{ref.title}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveReference(i)}
                        className="text-red-400 hover:text-red-600 ml-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Preview Box */}
            {showPreview && (
              <div className="p-6 rounded-2xl bg-[#F7F3EC] border border-primary-accent/30 space-y-4">
                <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-primary-accent block">
                  Pré-visualização do Post
                </span>
                <h4 className="text-xl font-serif text-primary-forest">{title || 'Título do Artigo'}</h4>
                <p className="text-xs text-[#526054] italic">{summary || 'Resumo executivo do artigo...'}</p>
                <div className="text-xs text-primary-text leading-relaxed whitespace-pre-line border-t border-[#2E4030]/10 pt-3">
                  {content || 'O conteúdo do artigo será exibido aqui.'}
                </div>
              </div>
            )}

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
                <span>Publicar Artigo Agora</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE: POSTS LIST & MANAGEMENT                                       */}
      {/* ========================================================================= */}
      {viewMode === 'list' && (
        <div className="space-y-5">
          {/* Search Filter */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#2E4030]/10">
            <Search className="w-4 h-4 text-[#6A786C] ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar artigos por título, autor ou categoria..."
              className="w-full text-xs text-primary-text bg-transparent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-5 border border-[#2E4030]/10 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-primary-forest border border-[#2E4030]/10">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-[#6A786C] font-mono">{post.publishDate}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-primary-forest line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#526054] line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2E4030]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-primary-accent" />
                    <span className="text-xs text-primary-forest font-semibold">{post.author}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onDeletePost && (
                      <button
                        onClick={() => {
                          if (confirm(`Deseja remover o artigo "${post.title}"?`)) {
                            onDeletePost(post.id);
                            triggerSuccess('Artigo removido com sucesso!');
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                        title="Remover Post"
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
