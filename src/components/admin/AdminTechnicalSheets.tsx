/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TechnicalSheetData } from '../../data/technicalSheets';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  FileText, 
  Download, 
  Search, 
  Leaf, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AdminTechnicalSheetsProps {
  sheets: TechnicalSheetData[];
  onAddSheet: (sheet: TechnicalSheetData) => void;
  onDeleteSheet?: (sheetId: string) => void;
}

export const AdminTechnicalSheets: React.FC<AdminTechnicalSheetsProps> = ({
  sheets,
  onAddSheet,
  onDeleteSheet
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [denominacaoVenda, setDenominacaoVenda] = useState('CACAU 100% PURO EM GOTAS');
  const [marcaLinha, setMarcaLinha] = useState('SERÁ CACAU');
  const [apresentacoes, setApresentacoes] = useState('Stand-up pouch de 210 g e 420 g');
  const [codigoEan, setCodigoEan] = useState('7898974512014');
  const [categoria, setCategoria] = useState('Derivados de Cacau / Ingrediente Funcional');
  const [origemBotanica, setOrigemBotanica] = useState('Theobroma cacao L. (Amêndoas fermentadas e secas ao sol)');
  const [cultivoProducao, setCultivoProducao] = useState('Sistema Agroflorestal Cabruca Orgânico · Serra Grande / Bahia');

  // Descrição
  const [descTitulo, setDescTitulo] = useState('Descrição do Produto');
  const [descTexto, setDescTexto] = useState('O Cacau em Gotas 100% Puro Será Cacau é obtido exclusivamente a partir de amêndoas de cacau fino e orgânico selecionadas, fermentadas em cochos de madeira e secas ao sol no Sul da Bahia.');

  // Composição
  const [ingredientes, setIngredientes] = useState('100% amêndoas de cacau orgânico (Theobroma cacao L.). Sem adição de açúcares, gorduras hidrogenadas, emulsificantes, aromatizantes ou conservantes.');
  const [gluten, setGluten] = useState('NÃO CONTÉM GLÚTEN. Produto manipulado em instalações dedicadas exclusivamente a derivados de cacau puro.');
  const [lactose, setLactose] = useState('NÃO CONTÉM LACTOSE. Naturalmente livre de ingredientes de origem animal.');
  const [alergicos, setAlergicos] = useState('NÃO CONTÉM ALÉRGICOS (leite, soja, castanhas, amendoim, ovos).');

  // Organolépticas
  const [aspecto, setAspecto] = useState('Gotas sólidas com acabamento acetinado');
  const [odor, setOdor] = useState('Aroma intenso de cacau fino com notas florais e frutadas');
  const [sabor, setSabor] = useState('Marcante, amargor equilibrado, acidez elegante e final prolongado');

  // PDF
  const [downloadPdfUrl, setDownloadPdfUrl] = useState('/downloads/ficha-tecnica-cacau-gotas.pdf');
  const [pdfFileName, setPdfFileName] = useState('ficha-tecnica-cacau-gotas-100-sera-cacau.pdf');
  const [pdfSize, setPdfSize] = useState('1.4 MB');

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, preencha o título da ficha técnica.');
      return;
    }

    const generatedSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newSheet: TechnicalSheetData = {
      id: `ficha-${Date.now()}`,
      slug: generatedSlug,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Documento Técnico Controlado · Será Cacau',
      headerMeta: 'FT-SC-001 · Rev. 02 · Certificado IBD Orgânico',
      downloadPdfUrl: downloadPdfUrl.trim() || '#',
      pdfFileName: pdfFileName.trim() || `${generatedSlug}.pdf`,
      pdfSize: pdfSize.trim() || '1.2 MB',
      identificacao: {
        denominacaoVenda: denominacaoVenda.trim(),
        marcaLinha: marcaLinha.trim(),
        apresentacoes: apresentacoes.trim(),
        codigoEan: codigoEan.trim(),
        categoria: categoria.trim(),
        nomeBotanico: 'Theobroma cacao L.',
        origemBotanica: origemBotanica.trim(),
        cultivoProducao: cultivoProducao.trim()
      },
      descricao: {
        titulo: descTitulo.trim(),
        paragrafos: [descTexto.trim()]
      },
      composicao: {
        ingredientes: ingredientes.trim(),
        aditivos: 'Ausência total de aditivos alimentares, aromatizantes, conservantes e emulsificantes.',
        gluten: gluten.trim(),
        lactose: lactose.trim(),
        alergicos: alergicos.trim(),
        origemVegetal: '100% de origem vegetal (vegano)'
      },
      organolepticas: {
        aspecto: aspecto.trim(),
        odor: odor.trim(),
        sabor: sabor.trim()
      },
      fisicoQuimicas: {
        tabela: [
          { parametro: 'Umidade', resultado: '< 2.0', unidade: '%', metodologia: 'Karl Fischer / Gravimetria' },
          { parametro: 'Lipídios / Manteiga', resultado: '50 - 55', unidade: '%', metodologia: 'Soxhlet' },
          { parametro: 'pH', resultado: '5.2 - 5.8', unidade: 'pH', metodologia: 'Potenciometria' }
        ]
      },
      microbiologicas: {
        nota: 'Atende integralmente à RDC nº 724/2022 e IN nº 161/2022 (ANVISA).',
        tabela: [
          { parametro: 'Salmonella spp.', resultado: 'Ausência', limite: 'Ausência em 25g', metodologia: 'ISO 6579' },
          { parametro: 'Escherichia coli', resultado: '< 10', limite: '< 10 UFC/g', metodologia: 'ISO 16649' },
          { parametro: 'Bolores e Leveduras', resultado: '< 100', limite: '< 10² UFC/g', metodologia: 'ISO 21527' }
        ]
      },
      informacaoNutricional: {
        titulo: 'Tabela Nutricional (Porção de 20g)',
        situacao: 'Produto puro, sem adição de açúcares ou gorduras hidrogenadas.',
        tabela: [
          { item: 'Valor Energético (kcal)', cemG: '580', porcao: '116', vd: '6%' },
          { item: 'Carboidratos (g)', cemG: '28', porcao: '5.6', vd: '2%' },
          { item: 'Proteínas (g)', cemG: '12', porcao: '2.4', vd: '5%' },
          { item: 'Gorduras Totais (g)', cemG: '52', porcao: '10.4', vd: '16%' },
          { item: 'Fibras Alimentares (g)', cemG: '18', porcao: '3.6', vd: '14%' }
        ]
      },
      aplicacao: {
        titulo: 'Indicações de Uso & Prescrição',
        itens: [
          'Prescrição em consultório para modulação metabólica e antioxidante.',
          'Consumo in natura ou em preparações culinárias funcionais.'
        ]
      },
      conservacaoLogistica: {
        prazoValidade: '18 a 24 meses a partir da data de fabricação.',
        temperatura: '15°C a 22°C (Local fresco, seco e ao abrigo da luz solar direta).',
        embalagemPrimaria: 'Stand-up pouch hermética com barreira contra oxigênio e umidade.',
        dimensoesPesoBruto: '250g líquido / 265g bruto',
        embalagemSecundaria: 'Caixa de papelão kraft reciclável com certificação FSC.'
      },
      origemCertificacao: {
        titulo: 'Origem, Rastreabilidade & Certificações',
        sistemaCultivo: 'Sistema Agroflorestal Cabruca (Mata Atlântica, Bahia).',
        certificacaoOrganica: 'Certificado Orgânico IBD · Selo Orgânico Brasil (MAPA)',
        numeroCertificadoValidade: 'Certificado BA-0812 · Validade Vigente'
      },
      fabricacao: {
        fabricante: 'Será Cacau Indústria e Comércio de Alimentos Naturais Ltda.',
        cnpjIe: 'CNPJ: 45.123.890/0001-12 · IE: 12.345.678',
        endereco: 'Rodovia Ilhéus - Uruçuca, km 18, Cabruca, Uruçuca - BA, Brasil',
        distribuidoPor: 'Será Cacau Ltda.',
        registroAnvisa: 'Produto isento de registro conforme RDC nº 240/2018 (ANVISA).',
        responsavelTecnico: 'Engenharia de Alimentos / Nutrição Técnica (CRN/CRQ)'
      },
      controleDocumento: {
        versaoData: 'Versão 2.0 · Atualizado em 2026',
        elaboradoPor: 'Controle de Qualidade & P&D Será Cacau',
        camposEmAberto: 'Todos os parâmetros validados por laudo cromatográfico.',
        proximaRevisao: 'Fevereiro / 2027',
        nota: 'Documento técnico emitido para uso profissional por nutricionistas e médicos parceiros.'
      }
    };

    onAddSheet(newSheet);
    triggerSuccess(`Ficha Técnica "${newSheet.title}" cadastrada com sucesso!`);
    
    // Reset
    setTitle('');
    setSubtitle('');
    setViewMode('list');
  };

  const filteredSheets = sheets.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.identificacao.denominacaoVenda.toLowerCase().includes(q);
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
          <h2 className="text-xl font-serif text-primary-forest">Gestor de Fichas Técnicas Oficiais</h2>
          <p className="text-xs text-[#526054] mt-0.5">
            Publique especificações bromatológicas, declarações de alérgenos e laudos para prescrição profissional.
          </p>
        </div>

        <div>
          {viewMode === 'create' ? (
            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2.5 rounded-xl bg-[#F2EDE4] hover:bg-[#E8E1D5] text-primary-forest text-xs font-bold transition-all cursor-pointer"
            >
              Voltar para Lista de Fichas
            </button>
          ) : (
            <button
              onClick={() => setViewMode('create')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-forest hover:bg-primary-forest/90 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 text-secondary-accent" />
              <span>Cadastrar Nova Ficha</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE: CREATE TECHNICAL SHEET                                         */}
      {/* ========================================================================= */}
      {viewMode === 'create' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2E4030]/10 shadow-xl space-y-8 animate-fadeIn">
          <div className="border-b border-[#2E4030]/10 pb-4">
            <span className="text-[11px] font-mono font-bold tracking-widest text-primary-accent uppercase block">
              Documento Controlado
            </span>
            <h3 className="text-2xl font-serif text-primary-forest mt-1">
              Cadastrar Ficha Técnica Oficial
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Título Oficial da Ficha Técnica *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ex: Cacau em Gotas 100% Puro Será Cacau"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-sm font-semibold text-primary-text focus:outline-none focus:border-primary-forest"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Código Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="ficha-cacau-gotas-100"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Subtítulo / Cabeçalho Regulatório</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  placeholder="Ex: Documento Técnico de Referência para Prescrição Clínica e Manipulação"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Denominação de Venda (ANVISA)</label>
                <input
                  type="text"
                  value={denominacaoVenda}
                  onChange={e => setDenominacaoVenda(e.target.value)}
                  placeholder="CACAU 100% PURO EM GOTAS"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Marca / Linha</label>
                <input
                  type="text"
                  value={marcaLinha}
                  onChange={e => setMarcaLinha(e.target.value)}
                  placeholder="SERÁ CACAU"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Código EAN</label>
                <input
                  type="text"
                  value={codigoEan}
                  onChange={e => setCodigoEan(e.target.value)}
                  placeholder="7898974512014"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-primary-forest">Apresentações Comerciais</label>
                <input
                  type="text"
                  value={apresentacoes}
                  onChange={e => setApresentacoes(e.target.value)}
                  placeholder="Stand-up pouch de 210 g e 420 g"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary-forest">Categoria do Produto</label>
                <input
                  type="text"
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                  placeholder="Derivados de Cacau / Ingrediente Funcional"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Cultivo e Sistema de Produção</label>
                <input
                  type="text"
                  value={cultivoProducao}
                  onChange={e => setCultivoProducao(e.target.value)}
                  placeholder="Sistema Agroflorestal Cabruca Orgânico · Serra Grande / Bahia"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <label className="text-xs font-bold text-primary-forest">Descrição Detalhada do Produto</label>
                <textarea
                  rows={3}
                  value={descTexto}
                  onChange={e => setDescTexto(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#2E4030]/15 text-xs text-primary-text focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Composition Section */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#2E4030]/15 space-y-4">
              <span className="text-xs font-bold text-primary-forest block">Composição & Alérgenos</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#6A786C]">Ingredientes</label>
                  <textarea
                    rows={2}
                    value={ingredientes}
                    onChange={e => setIngredientes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#6A786C]">Declaração de Glúten</label>
                  <textarea
                    rows={2}
                    value={gluten}
                    onChange={e => setGluten(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#6A786C]">Declaração de Lactose</label>
                  <textarea
                    rows={2}
                    value={lactose}
                    onChange={e => setLactose(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#6A786C]">Declaração de Alérgicos</label>
                  <textarea
                    rows={2}
                    value={alergicos}
                    onChange={e => setAlergicos(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
              </div>
            </div>

            {/* Organoleptic Section */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#2E4030]/15 space-y-4">
              <span className="text-xs font-bold text-primary-forest block">Características Organolépticas</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Aspecto</label>
                  <input
                    type="text"
                    value={aspecto}
                    onChange={e => setAspecto(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Odor</label>
                  <input
                    type="text"
                    value={odor}
                    onChange={e => setOdor(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Sabor</label>
                  <input
                    type="text"
                    value={sabor}
                    onChange={e => setSabor(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
              </div>
            </div>

            {/* PDF Details */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#2E4030]/15 space-y-3">
              <span className="text-xs font-bold text-primary-forest block">Arquivo PDF para Download</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-[#6A786C] block">URL do PDF</label>
                  <input
                    type="text"
                    value={downloadPdfUrl}
                    onChange={e => setDownloadPdfUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Nome do Arquivo</label>
                  <input
                    type="text"
                    value={pdfFileName}
                    onChange={e => setPdfFileName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#2E4030]/15"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6A786C] block">Tamanho</label>
                  <input
                    type="text"
                    value={pdfSize}
                    onChange={e => setPdfSize(e.target.value)}
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
                <span>Salvar Ficha Técnica</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE: SHEETS LIST                                                    */}
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
              placeholder="Buscar fichas técnicas por nome, código ou denominação..."
              className="w-full text-xs text-primary-text bg-transparent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSheets.map(sheet => (
              <div
                key={sheet.id}
                className="bg-white rounded-2xl p-5 border border-[#2E4030]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      {sheet.identificacao.marcaLinha}
                    </span>
                    <span className="text-[10px] text-[#6A786C] font-mono">{sheet.pdfSize}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-primary-forest line-clamp-2 mt-1">
                    {sheet.title}
                  </h3>

                  <p className="text-xs text-[#526054] line-clamp-2">
                    {sheet.descricao.paragrafos[0]}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2E4030]/10 flex items-center justify-between">
                  <span className="text-[10px] text-[#6A786C] font-mono">
                    EAN: {sheet.identificacao.codigoEan}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={sheet.downloadPdfUrl}
                      download={sheet.pdfFileName}
                      className="p-1.5 text-teal-700 hover:text-teal-900 transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                    {onDeleteSheet && (
                      <button
                        onClick={() => {
                          if (confirm(`Deseja remover a ficha técnica "${sheet.title}"?`)) {
                            onDeleteSheet(sheet.id);
                            triggerSuccess('Ficha técnica removida com sucesso!');
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700"
                        title="Remover Ficha"
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
