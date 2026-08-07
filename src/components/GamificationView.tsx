/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Trophy, 
  Gift, 
  Tag, 
  Award, 
  Sparkles, 
  Calendar, 
  Check, 
  Lock, 
  PlusCircle, 
  ChevronRight, 
  Star
} from 'lucide-react';
import { Member, PointsEntry, GamificationReward, UserProfile } from '../types';

interface GamificationViewProps {
  user: UserProfile;
  members: Member[];
  pointsHistory: PointsEntry[];
  rewards: GamificationReward[];
}

const rewardIcons: Record<string, React.ComponentType<any>> = {
  Gift: Gift,
  Tag: Tag,
  Award: Award,
  Sparkles: Sparkles
};

export const GamificationView: React.FC<GamificationViewProps> = ({
  user,
  members,
  pointsHistory,
  rewards
}) => {
  // Find current member or fallback to logged-in user details
  const foundMember = members.find(m => m.email?.toLowerCase() === user.email?.toLowerCase() || m.name?.toLowerCase() === user.name?.toLowerCase());
  const displayName = user.name || foundMember?.name || 'Membro';
  const points = (user.totalPoints !== undefined && user.totalPoints !== null) ? user.totalPoints : (foundMember?.totalPoints || 0);

  // Determine tier and progress
  let tier = user.tier || foundMember?.tier || 'Bronze';
  let nextLimit = 300;
  let prevLimit = 0;
  let nextTier = 'Prata';
  let percent = 0;

  if (points > 1200) {
    tier = 'Diamante';
    nextTier = '';
    nextLimit = 1200;
    prevLimit = 1200;
    percent = 100;
  } else if (points > 700) {
    tier = 'Ouro';
    nextTier = 'Diamante';
    nextLimit = 1200;
    prevLimit = 700;
    percent = Math.min(100, Math.max(0, ((points - prevLimit) / (nextLimit - prevLimit)) * 100));
  } else if (points > 300) {
    tier = 'Prata';
    nextTier = 'Ouro';
    nextLimit = 700;
    prevLimit = 300;
    percent = Math.min(100, Math.max(0, ((points - prevLimit) / (nextLimit - prevLimit)) * 100));
  } else {
    tier = 'Bronze';
    nextTier = 'Prata';
    nextLimit = 300;
    prevLimit = 0;
    percent = Math.min(100, Math.max(0, ((points - prevLimit) / (nextLimit - prevLimit)) * 100));
  }

  // Get specific tier styling
  const getTierStyles = (t: string) => {
    switch (t) {
      case 'Bronze':
        return {
          bg: 'bg-amber-500/10',
          text: 'text-amber-800',
          border: 'border-amber-500/20',
          badge: 'Bronze',
          glow: 'shadow-[0_0_12px_rgba(245,158,11,0.2)]'
        };
      case 'Prata':
        return {
          bg: 'bg-slate-400/15',
          text: 'text-slate-700',
          border: 'border-slate-400/25',
          badge: 'Prata',
          glow: 'shadow-[0_0_12px_rgba(148,163,184,0.2)]'
        };
      case 'Ouro':
        return {
          bg: 'bg-luxury-accent/10',
          text: 'text-luxury-accent',
          border: 'border-luxury-accent/30',
          badge: 'Ouro',
          glow: 'shadow-[0_0_12px_rgba(198,165,106,0.3)]'
        };
      case 'Diamante':
        return {
          bg: 'bg-sky-500/10',
          text: 'text-sky-800',
          border: 'border-sky-500/20',
          badge: 'Diamante',
          glow: 'shadow-[0_0_12px_rgba(14,165,233,0.2)]'
        };
      default:
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-700',
          border: 'border-slate-200',
          badge: 'Bronze',
          glow: ''
        };
    }
  };

  const currentTierStyle = getTierStyles(tier);

  // Filter and sort points history for current member
  const memberPoints = pointsHistory
    .filter(p => !p.memberId || p.memberId === foundMember?.id || p.memberId === user.id || p.memberId === 'mem-1')
    .sort((a, b) => b.id.localeCompare(a.id));

  return (
    <div className="px-6 md:px-12 py-8 max-w-5xl mx-auto w-full font-sans text-primary-forest">
      
      {/* HEADER */}
      <div className="flex flex-col gap-2 mb-10 border-b border-border-color/60 pb-5">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary-accent font-bold font-mono">
          Programa de Reconhecimento de Elite
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-primary-forest flex items-center gap-2">
          <Trophy className="w-8 h-8 text-luxury-accent" />
          <span>Resultados & Bônus</span>
        </h2>
        <p className="text-xs text-secondary-text max-w-xl">
          Ganhe pontos por suas prescrições, participações acadêmicas e indicações no ecossistema Será Cacau. Desbloqueie amostras físicas, ferramentas de consultório e experiências exclusivas.
        </p>
      </div>

      {/* HIGHLIGHT HERO CARD */}
      <div className="bg-surface border border-border-color rounded-2xl p-6 md:p-8 shadow-sm mb-10 relative overflow-hidden">
        {/* Ambient subtle background detail */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,rgba(198,165,106,0.08),transparent_50%)] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex-1">
            <span className="text-[9px] tracking-widest uppercase text-secondary-text/60 font-mono font-bold block mb-2">
              Status da sua Jornada
            </span>
            <div className="flex flex-wrap items-baseline gap-4 mb-4">
              <h3 className="text-2xl font-black text-primary-forest">{displayName}</h3>
            </div>

            {/* PROGRESS BAR */}
            <div className="mt-6 max-w-lg">
              <div className="flex justify-between text-[10px] font-mono font-bold text-secondary-text uppercase tracking-wider mb-2">
                <span>{points} PONTOS ACUMULADOS</span>
                {nextTier ? (
                  <span>FALTAM {nextLimit - points} PTS PARA NÍVEL {nextTier}</span>
                ) : (
                  <span>VOCÊ ALCANÇOU O NÍVEL MÁXIMO!</span>
                )}
              </div>

              {/* BAR CONTAINER */}
              <div className="h-2.5 w-full bg-secondary-surface rounded-full overflow-hidden border border-border-color/60 p-[1.5px]">
                <div 
                  className="h-full bg-primary-accent rounded-full transition-all duration-1000 ease-out shadow-[0_0_6px_rgba(217,132,91,0.4)]" 
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* LIMIT MARKS */}
              <div className="flex justify-between text-[9px] font-mono text-secondary-text/50 mt-1.5">
                <span>{prevLimit} PTS</span>
                {nextTier && <span>{nextLimit} PTS</span>}
              </div>
            </div>
          </div>

          <div className="bg-secondary-surface/40 border border-border-color rounded-xl p-5 text-center shrink-0 min-w-[180px] flex flex-col items-center justify-center">
            <span className="text-[9px] tracking-widest uppercase text-secondary-text/60 font-mono font-bold">
              Pontuação Atual
            </span>
            <span className="text-4xl font-black text-primary-accent mt-1 leading-none">
              {points}
            </span>
            <span className="text-[10px] text-secondary-text mt-1.5 font-mono">
              Pontos de Afeto Ativos
            </span>
          </div>
        </div>
      </div>

      {/* POINTS HISTORY */}
      <div className="flex flex-col gap-6 bg-surface border border-border-color rounded-xl p-6">
        <div className="border-b border-border-color/60 pb-3 flex items-center justify-between">
          <h3 className="text-base font-bold tracking-tight text-primary-forest flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-primary-accent" />
            <span>Histórico de Pontos</span>
          </h3>
          <span className="text-[10px] text-secondary-text/60 uppercase font-mono tracking-wider">
            Atividades Recentes
          </span>
        </div>

        {memberPoints.length === 0 ? (
          <div className="py-8 text-center text-xs text-secondary-text/40 italic font-serif">
            Nenhum ponto registrado para esta conta ainda.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {memberPoints.map((entry) => (
              <div 
                key={entry.id}
                className="flex items-center justify-between gap-4 p-3.5 rounded-lg border border-border-color/60 bg-secondary-surface/30 text-xs"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-primary-forest text-[12px] leading-snug">
                    {entry.reason}
                  </p>
                  <span className="text-[10px] text-secondary-text/60 font-mono mt-0.5 block">
                    {entry.date}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-black text-emerald-700 shrink-0 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/10">
                  +{entry.points} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
