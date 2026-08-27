/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TECHNICAL_SHEETS, TechnicalSheetData } from '../data/technicalSheets';
import { ATTACHMENTS, PRODUCTS } from '../data';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Microscope, 
  Award, 
  Leaf, 
  ExternalLink,
  Sparkles,
  ChevronRight,
  Info,
  Calendar,
  Building2,
  Scale,
  ClipboardList
} from 'lucide-react';

export const TechnicalSheetView: React.FC = () => {
  const [selectedSheetId, setSelectedSheetId] = useState<string>(TECHNICAL_SHEETS[0].id);

  const selectedSheet = TECHNICAL_SHEETS.find(s => s.id === selectedSheetId) || TECHNICAL_SHEETS[0];

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C261D] via-[#243325] to-[#162017] p-8 md:p-12 text-[#F7F3EC] border border-[#455347]/40 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-accent/20 border border-luxury-accent/40 text-luxury-accent text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Documentação Técnica Controlada · Versão 1.0 / 1.1 · Agosto de 2026
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif text-white font-normal tracking-tight">
            Fichas Técnicas dos Produtos
          </h1>
          
          <p className="text-[#C2C9C0] text-base md:text-lg leading-relaxed font-light">
            Transparência e rigor botânico, bromatológico e regulatório em documentos controlados. Visualize abaixo a transcrição integral de cada ficha técnica e faça o download do documento oficial idêntico ao emitido pela Será Cacau.
          </p>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs text-white border border-white/10">
              <Leaf className="w-3.5 h-3.5 text-secondary-accent" /> 100% Orgânico Certificado IBD
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs text-white border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-luxury-accent" /> Sistema Cabruca · Serra Grande / Bahia
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs text-white border border-white/10">
              <Award className="w-3.5 h-3.5 text-primary-accent" /> Conformidade RDC 264/2005 e RDC 429/2020
            </span>
          </div>
        </div>
      </div>

      {/* Selector Tabs for the 4 Technical Sheets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold tracking-widest text-primary-accent uppercase">
            Selecione a Ficha Técnica para Leitura e Download:
          </span>
          <span className="text-xs text-secondary-text">
            {TECHNICAL_SHEETS.length} Fichas Técnicas Oficiais
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TECHNICAL_SHEETS.map((sheet) => {
            const isSelected = sheet.id === selectedSheet.id;
            return (
              <button
                key={sheet.id}
                onClick={() => setSelectedSheetId(sheet.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#1C261D] text-white border-primary-accent shadow-md scale-[1.01]'
                    : 'bg-white text-primary-forest border-border-color hover:border-primary-accent/40 hover:bg-secondary-surface/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-luxury-accent/20 text-luxury-accent' : 'bg-primary-forest/10 text-primary-forest'
                    }`}>
                      Ficha Técnica
                    </span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-[#A2ADA3]' : 'text-secondary-text'}`}>
                      {sheet.pdfSize}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-sm leading-snug">
                    {sheet.title}
                  </h3>
                  <p className={`text-xs mt-1 line-clamp-1 ${isSelected ? 'text-[#C2C9C0]' : 'text-[#687369]'}`}>
                    {sheet.subtitle}
                  </p>
                </div>

                <div className={`pt-2 border-t flex items-center justify-between text-xs font-semibold font-mono ${
                  isSelected ? 'border-white/10 text-luxury-accent' : 'border-border-color/60 text-primary-accent'
                }`}>
                  <span>{isSelected ? 'Lendo Ficha' : 'Abrir Ficha'}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Technical Sheet Reader View */}
      <div className="bg-white rounded-2xl border border-primary-forest/10 shadow-lg overflow-hidden">
        
        {/* Document Header & Quick Download bar */}
        <div className="bg-[#1C261D] text-[#F7F3EC] p-6 md:p-8 border-b border-primary-accent/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-luxury-accent">
                FICHA TÉCNICA · PRODUTO
              </span>
              <span className="text-[10px] font-mono text-[#A2ADA3]">•</span>
              <span className="text-[10px] font-mono text-[#A2ADA3]">Documento Controlado</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
              {selectedSheet.title}
            </h2>
            <p className="text-sm text-[#C2C9C0] font-light">
              {selectedSheet.subtitle}
            </p>
            <div className="text-[10px] font-mono text-luxury-accent/90 pt-1 tracking-wide">
              {selectedSheet.headerMeta}
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
            <a
              id={`btn-download-technical-sheet-${selectedSheet.slug}`}
              href={selectedSheet.downloadPdfUrl}
              download={selectedSheet.pdfFileName}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-luxury-accent hover:bg-luxury-accent/90 text-[#1C261D] font-bold text-xs uppercase tracking-wider font-mono shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Ficha Técnica (PDF)</span>
            </a>
            <div className="text-center md:text-right text-[10px] text-[#A2ADA3] font-mono">
              Arquivo original: {selectedSheet.pdfFileName} ({selectedSheet.pdfSize})
            </div>
          </div>
        </div>

        {/* Transcribed Content Sections (Exact match) */}
        <div className="p-6 md:p-10 space-y-8 bg-[#FAF7F2]">
          
          {/* Section: Identificação */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
            <div className="border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                Identificação
              </span>
              <h3 className="text-lg font-serif font-bold text-primary-forest">
                O produto
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Denominação de Venda:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.identificacao.denominacaoVenda}</span>
              </div>
              
              {selectedSheet.identificacao.nomeComercial && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Nome Comercial:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.identificacao.nomeComercial}</span>
                </div>
              )}

              {selectedSheet.identificacao.nomeBotanico && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Nome Botânico:</span>
                  <span className="text-[#1C261D] font-medium italic">{selectedSheet.identificacao.nomeBotanico}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Marca · Linha:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.identificacao.marcaLinha}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Apresentações:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.identificacao.apresentacoes}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Código EAN:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.identificacao.codigoEan}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Categoria:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.identificacao.categoria}</span>
              </div>

              {selectedSheet.identificacao.parteVegetalUtilizada && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Parte Vegetal Utilizada:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.identificacao.parteVegetalUtilizada}</span>
                </div>
              )}

              {selectedSheet.identificacao.origemBotanica && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Origem Botânica da Espécie:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.identificacao.origemBotanica}</span>
                </div>
              )}

              {selectedSheet.identificacao.cultivoProducao && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Cultivo e Produção:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.identificacao.cultivoProducao}</span>
                </div>
              )}
            </div>

            {selectedSheet.identificacao.notaRodape && (
              <div className="p-3 bg-[#FAF7F2] rounded-xl text-xs text-[#687369] italic border border-[#E8E1D5] mt-2">
                {selectedSheet.identificacao.notaRodape}
              </div>
            )}
          </div>

          {/* Section: Descrição */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
            <div className="border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                Descrição
              </span>
              <h3 className="text-lg font-serif font-bold text-primary-forest">
                {selectedSheet.descricao.titulo}
              </h3>
            </div>

            <div className="space-y-3 text-sm text-[#333E34] leading-relaxed">
              {selectedSheet.descricao.paragrafos.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Section: Composição e Alergênicos */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
            <div className="border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                Composição
              </span>
              <h3 className="text-lg font-serif font-bold text-primary-forest">
                Ingredientes e alergênicos
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Ingredientes:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.composicao.ingredientes}</span>
              </div>

              {selectedSheet.composicao.manteigaCacauAdicionada && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Manteiga de Cacau Adicionada:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.composicao.manteigaCacauAdicionada}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Aditivos:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.composicao.aditivos}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Glúten:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.composicao.gluten}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Lactose:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.composicao.lactose}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:col-span-2">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Alérgicos:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.composicao.alergicos}</span>
              </div>

              {selectedSheet.composicao.fumigacaoIrradiacao && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Fumigação e Irradiação:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.composicao.fumigacaoIrradiacao}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Origem Vegetal:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.composicao.origemVegetal}</span>
              </div>
            </div>
          </div>

          {/* Section: Características Organolépticas */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
            <div className="border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                Características Organolépticas
              </span>
              <h3 className="text-lg font-serif font-bold text-primary-forest">
                Aspecto, odor e sabor
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-36 shrink-0">Aspecto / Aparência:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.organolepticas.aspecto || selectedSheet.organolepticas.aparencia}</span>
              </div>

              {selectedSheet.organolepticas.cor && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-36 shrink-0">Cor:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.organolepticas.cor}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-36 shrink-0">Odor / Aroma:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.organolepticas.odor || selectedSheet.organolepticas.aroma}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-36 shrink-0">Sabor:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.organolepticas.sabor}</span>
              </div>

              {selectedSheet.organolepticas.textura && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-36 shrink-0">Textura:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.organolepticas.textura}</span>
                </div>
              )}

              {selectedSheet.organolepticas.conteudoInterno && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:col-span-2">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-36 shrink-0">Conteúdo Interno:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.organolepticas.conteudoInterno}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section: Classificação Grade A e Grade B (Quando aplicável - ex: Baunilha) */}
          {selectedSheet.classificacao && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
              <div className="border-b border-[#E8E1D5] pb-3">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                  Classificação
                </span>
                <h3 className="text-lg font-serif font-bold text-primary-forest">
                  {selectedSheet.classificacao.titulo}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[550px]">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-[#E8E1D5] text-primary-forest font-bold uppercase text-[10px] tracking-wider font-mono">
                      <th className="py-3 px-4">Parâmetro</th>
                      <th className="py-3 px-4">Grade A — Gourmet</th>
                      <th className="py-3 px-4">Grade B — Extração</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EAE1]">
                    {selectedSheet.classificacao.tabela.map((row, i) => (
                      <tr key={i} className="hover:bg-[#FAF7F2]/60">
                        <td className="py-3 px-4 font-bold text-[#1C261D]">{row.parametro}</td>
                        <td className="py-3 px-4 text-[#333E34]">{row.gradeA}</td>
                        <td className="py-3 px-4 text-[#333E34]">{row.gradeB}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedSheet.classificacao.nota && (
                <p className="text-xs text-[#687369] italic pt-2">
                  {selectedSheet.classificacao.nota}
                </p>
              )}
            </div>
          )}

          {/* Section: Características Físico-Químicas */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
            <div className="border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                Características Físico-Químicas
              </span>
              <h3 className="text-lg font-serif font-bold text-primary-forest">
                Valores analíticos
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[550px]">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E8E1D5] text-primary-forest font-bold uppercase text-[10px] tracking-wider font-mono">
                    <th className="py-3 px-4">Parâmetro</th>
                    <th className="py-3 px-4">Resultado</th>
                    <th className="py-3 px-4">Unidade</th>
                    <th className="py-3 px-4">Metodologia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EAE1]">
                  {selectedSheet.fisicoQuimicas.tabela.map((row, i) => (
                    <tr key={i} className="hover:bg-[#FAF7F2]/60">
                      <td className="py-2.5 px-4 font-bold text-[#1C261D]">{row.parametro}</td>
                      <td className="py-2.5 px-4 font-mono text-[#333E34]">{row.resultado}</td>
                      <td className="py-2.5 px-4 font-mono text-[#687369]">{row.unidade}</td>
                      <td className="py-2.5 px-4 text-[#687369]">{row.metodologia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedSheet.fisicoQuimicas.nota && (
              <p className="text-xs text-[#687369] leading-relaxed pt-2">
                {selectedSheet.fisicoQuimicas.nota}
              </p>
            )}
          </div>

          {/* Section: Características Microbiológicas */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
            <div className="border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                Características Microbiológicas
              </span>
              <h3 className="text-lg font-serif font-bold text-primary-forest">
                Parâmetros e limites
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E8E1D5] text-primary-forest font-bold uppercase text-[10px] tracking-wider font-mono">
                    <th className="py-3 px-4">Parâmetro</th>
                    <th className="py-3 px-4">Resultado</th>
                    <th className="py-3 px-4">Limite de Referência</th>
                    <th className="py-3 px-4">Metodologia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EAE1]">
                  {selectedSheet.microbiologicas.tabela.map((row, i) => (
                    <tr key={i} className="hover:bg-[#FAF7F2]/60">
                      <td className="py-2.5 px-4 font-bold text-[#1C261D]">{row.parametro}</td>
                      <td className="py-2.5 px-4 font-mono text-[#333E34]">{row.resultado}</td>
                      <td className="py-2.5 px-4 text-[#687369]">{row.limite}</td>
                      <td className="py-2.5 px-4 text-[#687369]">{row.metodologia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedSheet.microbiologicas.nota && (
              <p className="text-xs text-[#687369] leading-relaxed pt-2">
                {selectedSheet.microbiologicas.nota}
              </p>
            )}
          </div>

          {/* Section: Informação Nutricional */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
            <div className="border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                Informação Nutricional
              </span>
              <h3 className="text-lg font-serif font-bold text-primary-forest">
                {selectedSheet.informacaoNutricional.titulo}
              </h3>
            </div>

            {selectedSheet.informacaoNutricional.tabela ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-[#E8E1D5] text-primary-forest font-bold uppercase text-[10px] tracking-wider font-mono">
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">100 g</th>
                      <th className="py-3 px-4">Porção 10 g</th>
                      <th className="py-3 px-4">%VD por Porção</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EAE1]">
                    {selectedSheet.informacaoNutricional.tabela.map((row, i) => (
                      <tr key={i} className="hover:bg-[#FAF7F2]/60">
                        <td className={`py-2 px-4 ${row.item.startsWith('  ') ? 'text-[#687369] pl-7' : 'font-bold text-[#1C261D]'}`}>
                          {row.item}
                        </td>
                        <td className="py-2 px-4 font-mono text-[#333E34]">{row.cemG}</td>
                        <td className="py-2 px-4 font-mono text-[#333E34]">{row.porcao}</td>
                        <td className="py-2 px-4 font-mono text-[#687369]">{row.vd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                {selectedSheet.informacaoNutricional.situacao && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Situação:</span>
                    <span className="text-[#1C261D] font-medium">{selectedSheet.informacaoNutricional.situacao}</span>
                  </div>
                )}
                {selectedSheet.informacaoNutricional.baseNormativa && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Base Normativa:</span>
                    <span className="text-[#1C261D] font-medium">{selectedSheet.informacaoNutricional.baseNormativa}</span>
                  </div>
                )}
                {selectedSheet.informacaoNutricional.seAplicavel && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Se Aplicável:</span>
                    <span className="text-[#1C261D] font-medium">{selectedSheet.informacaoNutricional.seAplicavel}</span>
                  </div>
                )}
                {selectedSheet.informacaoNutricional.porcaoReferencia && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Porção de Referência:</span>
                    <span className="text-[#1C261D] font-medium">{selectedSheet.informacaoNutricional.porcaoReferencia}</span>
                  </div>
                )}
              </div>
            )}

            {selectedSheet.informacaoNutricional.nota && (
              <p className="text-xs text-[#687369] leading-relaxed pt-2">
                {selectedSheet.informacaoNutricional.nota}
              </p>
            )}
          </div>

          {/* Section: Aplicação */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
            <div className="border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                Aplicação
              </span>
              <h3 className="text-lg font-serif font-bold text-primary-forest">
                {selectedSheet.aplicacao.titulo}
              </h3>
            </div>

            {selectedSheet.aplicacao.duasColunas ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#333E34]">
                <div className="space-y-2 p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E1D5]">
                  <h4 className="font-mono font-bold text-primary-accent uppercase tracking-wider text-xs">Doce</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {selectedSheet.aplicacao.duasColunas.doce.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2 p-4 bg-[#FAF7F2] rounded-xl border border-[#E8E1D5]">
                  <h4 className="font-mono font-bold text-primary-accent uppercase tracking-wider text-xs">Salgado</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {selectedSheet.aplicacao.duasColunas.salgado.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <ul className="space-y-2 text-xs text-[#333E34]">
                {selectedSheet.aplicacao.itens.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary-accent font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {selectedSheet.aplicacao.rodape && (
              <p className="text-xs text-[#687369] leading-relaxed pt-2">
                {selectedSheet.aplicacao.rodape}
              </p>
            )}
          </div>

          {/* Section: Validade, Armazenamento e Embalagem */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
            <div className="border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                Validade, Armazenamento e Embalagem
              </span>
              <h3 className="text-lg font-serif font-bold text-primary-forest">
                Conservação e logística
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Prazo de Validade:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.conservacaoLogistica.prazoValidade}</span>
              </div>

              {selectedSheet.conservacaoLogistica.antesAbrir && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Antes de Abrir:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.conservacaoLogistica.antesAbrir}</span>
                </div>
              )}

              {selectedSheet.conservacaoLogistica.aposAbrir && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Após Abrir:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.conservacaoLogistica.aposAbrir}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Temperatura:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.conservacaoLogistica.temperatura}</span>
              </div>

              {selectedSheet.conservacaoLogistica.umidadeMaxima && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Umidade Relativa Máxima:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.conservacaoLogistica.umidadeMaxima}</span>
                </div>
              )}

              {selectedSheet.conservacaoLogistica.condicoes && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:col-span-2">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Condições:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.conservacaoLogistica.condicoes}</span>
                </div>
              )}

              {selectedSheet.conservacaoLogistica.cristaisBrancos && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:col-span-2">
                  <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Cristais Brancos na Superfície:</span>
                  <span className="text-[#1C261D] font-medium">{selectedSheet.conservacaoLogistica.cristaisBrancos}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Embalagem Primária:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.conservacaoLogistica.embalagemPrimaria}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Dimensões e Peso Bruto:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.conservacaoLogistica.dimensoesPesoBruto}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:col-span-2">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Embalagem Secundária:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.conservacaoLogistica.embalagemSecundaria}</span>
              </div>
            </div>
          </div>

          {/* Section: Origem e Certificação (Dark forest box) */}
          <div className="rounded-2xl p-6 md:p-8 bg-[#1C261D] text-[#F7F3EC] border border-[#455347]/40 space-y-4 shadow-sm">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-luxury-accent">
                Origem e Certificação
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                {selectedSheet.origemCertificacao.titulo}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
              {selectedSheet.origemCertificacao.origem && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-luxury-accent uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Origem:</span>
                  <span className="text-[#E8EFE9] font-medium">{selectedSheet.origemCertificacao.origem}</span>
                </div>
              )}

              {selectedSheet.origemCertificacao.cultivoProducao && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-luxury-accent uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Cultivo e Produção:</span>
                  <span className="text-[#E8EFE9] font-medium">{selectedSheet.origemCertificacao.cultivoProducao}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:col-span-2">
                <span className="font-bold text-luxury-accent uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Sistema de Cultivo:</span>
                <span className="text-[#E8EFE9] font-medium">{selectedSheet.origemCertificacao.sistemaCultivo}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-luxury-accent uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Certificação Orgânica:</span>
                <span className="text-[#E8EFE9] font-medium">{selectedSheet.origemCertificacao.certificacaoOrganica}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-luxury-accent uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Nº Certificado · Validade:</span>
                <span className="text-[#E8EFE9] font-medium">{selectedSheet.origemCertificacao.numeroCertificadoValidade}</span>
              </div>

              {selectedSheet.origemCertificacao.cadeia && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:col-span-2">
                  <span className="font-bold text-luxury-accent uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Cadeia:</span>
                  <span className="text-[#E8EFE9] font-medium">{selectedSheet.origemCertificacao.cadeia}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section: Fabricação */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
            <div className="border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                Fabricação
              </span>
              <h3 className="text-lg font-serif font-bold text-primary-forest">
                Responsáveis
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Fabricante:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.fabricacao.fabricante}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">CNPJ · IE:</span>
                <span className="text-[#1C261D] font-medium font-mono">{selectedSheet.fabricacao.cnpjIe}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:col-span-2">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Endereço:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.fabricacao.endereco}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Distribuído por:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.fabricacao.distribuidoPor}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Registro na ANVISA:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.fabricacao.registroAnvisa}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:col-span-2">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Responsável Técnico:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.fabricacao.responsavelTecnico}</span>
              </div>
            </div>
          </div>

          {/* Section: Controle do Documento */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E1D5] shadow-sm space-y-4">
            <div className="border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary-accent">
                Controle do Documento
              </span>
              <h3 className="text-lg font-serif font-bold text-primary-forest">
                Versão e campos em validação
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Versão · Data:</span>
                <span className="text-[#1C261D] font-medium font-mono">{selectedSheet.controleDocumento.versaoData}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Elaborado por:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.controleDocumento.elaboradoPor}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:col-span-2">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Campos em Aberto:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.controleDocumento.camposEmAberto}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:col-span-2">
                <span className="font-bold text-[#8C968B] uppercase tracking-wider text-[10px] sm:w-44 shrink-0">Próxima Revisão:</span>
                <span className="text-[#1C261D] font-medium">{selectedSheet.controleDocumento.proximaRevisao}</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#FAF7F2] rounded-xl text-xs text-[#687369] border border-[#E8E1D5] leading-relaxed">
              {selectedSheet.controleDocumento.nota}
            </div>
          </div>

          {/* Bottom Download Bar */}
          <div className="p-6 bg-white rounded-2xl border border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <h4 className="font-serif font-bold text-sm text-primary-forest">
                Download da Ficha Técnica Oficial — {selectedSheet.title}
              </h4>
              <p className="text-xs text-secondary-text mt-0.5">
                Arquivo PDF de 5 páginas idêntico ao documento original controlado.
              </p>
            </div>

            <a
              id={`btn-bottom-download-technical-sheet-${selectedSheet.slug}`}
              href={selectedSheet.downloadPdfUrl}
              download={selectedSheet.pdfFileName}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-forest hover:bg-primary-forest/90 text-white font-bold text-xs uppercase tracking-wider font-mono shadow-sm transition-all cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4 text-luxury-accent" />
              <span>Baixar {selectedSheet.pdfFileName}</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
