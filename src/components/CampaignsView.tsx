/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Megaphone, 
  Gift, 
  Check, 
  Calendar, 
  ArrowUpRight, 
  ShieldAlert,
  Sparkles,
  Heart
} from 'lucide-react';
import { Campaign } from '../types';

interface CampaignsViewProps {
  campaigns: Campaign[];
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({ campaigns }) => {
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const handleClaim = (campId: string, title: string) => {
    if (claimedIds.includes(campId)) return;
    setClaimedIds(prev => [...prev, campId]);
    alert(`Solicitação Enviada!\nVocê reivindicou com sucesso a ação: "${title}".\n\nNossa equipe entrará em contato para confirmar o endereço de entrega do seu consultório.`);
  };

  return (
    <div className="px-6 md:px-12 py-8 max-w-5xl mx-auto w-full font-sans text-[#E2E8F0]">
      
      {/* HEADER */}
      <div className="flex flex-col gap-2 mb-10 border-b border-white/5 pb-5">
        <span className="text-[10px] tracking-[0.3em] uppercase text-violet-400 font-bold font-mono">
          Ações de Amostragem Exclusivas
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Campanhas e Afeto Clínico
        </h2>
        <p className="text-xs text-[#A1ABA5] max-w-xl">
          Apoiamos sua prática clínica oferecendo amostras físicas dos rituais Será e utensílios de cerâmica artesanal para criar experiências sensoriais ricas em suas consultas.
        </p>
      </div>

      {/* CAMPAIGN LIST */}
      <div className="flex flex-col gap-8">
        {campaigns.map((camp) => {
          const isClaimed = claimedIds.includes(camp.id);
          return (
            <div
              id={`campaign-card-${camp.id}`}
              key={camp.id}
              className="bg-[#111613] rounded-2xl overflow-hidden border border-white/5 flex flex-col md:flex-row shadow-2xl hover:border-violet-500/30 transition-all duration-300 group"
            >
              {/* Cover visual with high-contrast badge */}
              <div className="w-full md:w-[280px] h-60 md:h-auto overflow-hidden relative shrink-0">
                <img 
                  src={camp.imageUrl} 
                  alt={camp.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-all duration-500 filter brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Campaign description and interactive states */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-violet-400 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{camp.date}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-violet-400 transition-colors leading-snug">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-[#A1ABA5] leading-relaxed mt-1">
                    {camp.description}
                  </p>
                </div>

                {/* Claim buttons & dynamic visual feedback */}
                <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                    Elegibilidade: Nutricionistas Ativas
                  </span>

                  <button
                    id={`claim-btn-${camp.id}`}
                    disabled={isClaimed}
                    onClick={() => handleClaim(camp.id, camp.title)}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs uppercase font-bold tracking-widest transition-all font-mono ${
                      isClaimed 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default shadow-inner' 
                        : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md hover:scale-102 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Reivindicado</span>
                      </>
                    ) : (
                      <>
                        <Gift className="w-4 h-4" />
                        <span>Reivindicar Kit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
