/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { SeraCacauIcon } from './SeraCacauIcon';

export const TechnicalSheetView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'laudos' | 'tabelas' | 'certificados'>('laudos');

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C261D] via-[#243325] to-[#162017] p-8 md:p-12 text-[#F7F3EC] border border-[#455347]/40 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-accent/20 border border-luxury-accent/40 text-luxury-accent text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Controle de Qualidade & Rastreabilidade Cabruca
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif text-white font-normal tracking-tight">
            Fichas Técnicas & Laudos Laboratoriais
          </h1>
          
          <p className="text-[#C2C9C0] text-base md:text-lg leading-relaxed font-light">
            Transparência e rigor bromatológico absoluto para respaldar a sua prescrição clínica. Acesse laudos de pureza microbiológica, cromatografia de polifenóis e fichas de especificação lote a lote.
          </p>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs text-white border border-white/10">
              <Leaf className="w-3.5 h-3.5 text-secondary-accent" /> 100% Orgânico Certificado
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs text-white border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-luxury-accent" /> Metais Pesados Abaixo do Limite EFSA/ANVISA
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs text-white border border-white/10">
              <Award className="w-3.5 h-3.5 text-primary-accent" /> Moagem a Frio sem Alcalinização
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex p-1.5 bg-[#F2EDE4] rounded-2xl max-w-md">
        <button
          onClick={() => setActiveTab('laudos')}
          className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
            activeTab === 'laudos' ? 'bg-primary-forest text-white shadow' : 'text-[#4A554B] hover:text-primary-forest'
          }`}
        >
          Laudos & Documentos ({ATTACHMENTS.length})
        </button>
        <button
          onClick={() => setActiveTab('tabelas')}
          className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
            activeTab === 'tabelas' ? 'bg-primary-forest text-white shadow' : 'text-[#4A554B] hover:text-primary-forest'
          }`}
        >
          Tabelas Bromatológicas
        </button>
        <button
          onClick={() => setActiveTab('certificados')}
          className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
            activeTab === 'certificados' ? 'bg-primary-forest text-white shadow' : 'text-[#4A554B] hover:text-primary-forest'
          }`}
        >
          Metais & Pureza
        </button>
      </div>

      {/* Tab 1: Downloadable Attachments and Technical Sheets */}
      {activeTab === 'laudos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ATTACHMENTS.map((file) => (
            <div
              key={file.id}
              className="bg-white rounded-2xl border border-primary-forest/10 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-primary-forest/10 text-primary-forest text-[11px] font-bold uppercase tracking-wider">
                    {file.category}
                  </span>
                  <span className="text-xs text-[#8C968B]">{file.size}</span>
                </div>
                <h3 className="font-serif font-bold text-base text-[#1C261D] leading-snug">
                  {file.name}
                </h3>
                <p className="text-xs text-[#687369]">
                  Documento técnico validado por laboratórios acreditados pela ISO 17025 para comprovação bromatológica em consultório.
                </p>
              </div>

              <a
                href={file.downloadUrl}
                download
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#F2EDE4] hover:bg-primary-forest hover:text-white text-[#1C261D] text-xs font-semibold transition-all duration-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Documento em PDF</span>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Full Nutritional & Bromatological Comparison */}
      {activeTab === 'tabelas' && (
        <div className="bg-white rounded-2xl border border-primary-forest/10 p-6 md:p-8 shadow-sm space-y-6 overflow-x-auto">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#1C261D]">Quadro Comparativo Bromatológico dos Produtos Será Cacau</h2>
            <p className="text-xs text-[#687369]">Valores médios por porção de referência calculados a partir de laudos laboratoriais das safras Cabruca.</p>
          </div>

          <table className="w-full text-left text-xs text-[#333E34] border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E8E1D5] text-primary-forest font-bold uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Produto</th>
                <th className="py-3.5 px-4">Porção</th>
                <th className="py-3.5 px-4">Valor Energético</th>
                <th className="py-3.5 px-4">Carboidratos</th>
                <th className="py-3.5 px-4">Proteínas</th>
                <th className="py-3.5 px-4">Gorduras Boas</th>
                <th className="py-3.5 px-4">Minerais em Destaque</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE1]">
              {PRODUCTS.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1C261D]">{prod.name}</td>
                  <td className="py-3.5 px-4 text-[#687369]">{prod.nutritionalTable.servingSize}</td>
                  <td className="py-3.5 px-4 font-medium">{prod.nutritionalTable.calories}</td>
                  <td className="py-3.5 px-4">{prod.nutritionalTable.carbohydrates}</td>
                  <td className="py-3.5 px-4">{prod.nutritionalTable.proteins}</td>
                  <td className="py-3.5 px-4">{prod.nutritionalTable.fats}</td>
                  <td className="py-3.5 px-4 text-primary-accent font-medium">{prod.nutritionalTable.minerals || 'Polifenóis bioativos'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Heavy Metals & Soil Purity Standards */}
      {activeTab === 'certificados' && (
        <div className="bg-white rounded-2xl border border-primary-forest/10 p-6 md:p-8 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-xl font-serif font-bold text-[#1C261D]">Controle Rigoroso de Metais Pesados (Cádmio e Chumbo)</h2>
            <p className="text-sm text-[#5E685F] leading-relaxed">
              O sul da Bahia possui solos de origem florestal vulcânica antiga com teores naturalmente baixíssimos de Cádmio em comparação com regiões andinas do Pacífico. Cada lote é submetido a espectrometria de massa (ICP-MS) para garantir total conformidade com a RDC ANVISA nº 722/2022 e a Regulação Europeia (UE) nº 488/2014.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8E1D5] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-forest text-sm">Cádmio (Cd) em Massa de Cacau</span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">Aprovado</span>
              </div>
              <div className="text-xs text-[#5E685F] space-y-1">
                <div>Limite Máximo Regulatório (UE): <strong>0.80 mg/kg</strong></div>
                <div>Resultado Médio Lote Será Cacau: <strong className="text-emerald-700 text-sm">0.08 mg/kg (10x abaixo do limite)</strong></div>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8E1D5] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-forest text-sm">Chumbo (Pb) em Amêndoas</span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">Aprovado</span>
              </div>
              <div className="text-xs text-[#5E685F] space-y-1">
                <div>Limite Máximo Regulatório (ANVISA): <strong>0.30 mg/kg</strong></div>
                <div>Resultado Médio Lote Será Cacau: <strong className="text-emerald-700 text-sm">&lt; 0.05 mg/kg (Abaixo do limite de quantificação)</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
