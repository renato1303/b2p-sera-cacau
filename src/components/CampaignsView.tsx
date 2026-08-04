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
    <div className="px-6 md:px-12 py-8 max-w-5xl mx-auto w-full font-sans text-primary-forest">
      
      {/* HEADER */}
      <div className="flex flex-col gap-2 mb-10 border-b border-border-color/60 pb-5">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary-accent font-bold font-mono">
          Ações de Amostragem Exclusivas
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-primary-forest">
          Campanhas e Afeto Clínico
        </h2>
        <p className="text-xs text-secondary-text max-w-xl">
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
              className="bg-surface rounded-2xl overflow-hidden border border-border-color flex flex-col md:flex-row shadow-sm hover:border-primary-accent/40 transition-all duration-300 group"
            >
              {/* Cover visual */}
              <div className="w-full md:w-[280px] h-60 md:h-auto overflow-hidden relative shrink-0">
                <img 
                  src={camp.imageUrl} 
                  alt={camp.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Campaign description and interactive states */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-primary-accent font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{camp.date}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-primary-forest group-hover:text-primary-accent transition-colors leading-snug">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-secondary-text leading-relaxed mt-1">
                    {camp.description}
                  </p>
                </div>

                {/* Claim buttons & dynamic visual feedback */}
                <div className="pt-5 border-t border-border-color/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <span className="text-[10px] text-secondary-text/60 uppercase tracking-widest font-mono">
                    Elegibilidade: Nutricionistas Ativas
                  </span>

                  <button
                    id={`claim-btn-${camp.id}`}
                    disabled={isClaimed}
                    onClick={() => handleClaim(camp.id, camp.title)}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs uppercase font-bold tracking-widest transition-all font-mono ${
                      isClaimed 
                        ? 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 cursor-default shadow-inner' 
                        : 'bg-primary-accent hover:bg-primary-accent/90 text-white shadow-sm hover:scale-[1.02]'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
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
