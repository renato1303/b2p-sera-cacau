/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  UserPlus
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { MEMBERS } from '../data';

interface LoginViewProps {
  onLogin: (user: UserProfile) => void;
  nutriProfile: UserProfile;
  adminProfile: UserProfile;
}

const REGISTRATION_URL = 'https://www.seracacau.com.br/pages/profissionais?pb=0';

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  nutriProfile,
  adminProfile
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [unregisteredRedirect, setUnregisteredRedirect] = useState<{ email: string; countdown: number } | null>(null);

  const handleRedirectToRegister = () => {
    window.open(REGISTRATION_URL, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMsg('Por favor, informe seu e-mail profissional.');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    setUnregisteredRedirect(null);

    try {
      // 1. Check if it's the Admin email
      const isAdmin = 
        cleanEmail === 'madeleine@seracacau.com.br' || 
        cleanEmail === 'admin@seracacau.com.br' ||
        cleanEmail.includes('admin') ||
        cleanEmail.includes('madeleine');

      if (isAdmin) {
        setSuccessMsg('Acesso administrativo autenticado com sucesso!');
        setTimeout(() => {
          onLogin({
            ...adminProfile,
            email: cleanEmail
          });
          setIsLoading(false);
        }, 400);
        return;
      }

      // 2. Check if Supabase has a profile for this email
      if (isSupabaseConfigured) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .ilike('email', cleanEmail)
            .maybeSingle();

          if (profile && !error) {
            const mappedProfile: UserProfile = {
              id: profile.id,
              name: profile.name || cleanEmail.split('@')[0],
              email: profile.email,
              phone: profile.phone || '',
              instagram: profile.instagram || '',
              specialty: profile.specialty || 'Nutrição Integrativa',
              city: profile.city || 'São Paulo',
              state: profile.state || 'SP',
              role: profile.role === 'ADMIN' ? UserRole.ADMIN : UserRole.NUTRICIONISTA,
              crn: profile.crn || 'CRN Ativo',
              totalPoints: profile.total_points ?? 0,
              tier: profile.tier || 'Bronze'
            };
            setSuccessMsg(`Bem-vinda(o), ${mappedProfile.name}! Redirecionando...`);
            setTimeout(() => {
              onLogin(mappedProfile);
              setIsLoading(false);
            }, 400);
            return;
          }
        } catch (dbErr) {
          console.warn('Supabase profile query check:', dbErr);
        }
      }

      // 3. Check Mariana Preto (default showcase account)
      const isMariana = 
        cleanEmail === 'mariana.preto@e4markerting.com.br' ||
        cleanEmail === 'mariana.preto@e4marketing.com.br' ||
        cleanEmail.includes('mariana.preto');

      if (isMariana) {
        const marianaProfile: UserProfile = {
          id: 'mariana-preto-user',
          name: 'Dra. Mariana Preto',
          email: cleanEmail,
          phone: '(11) 99887-6655',
          instagram: '@marianapreto.nutri',
          specialty: 'Nutrição Clínica & Marketing',
          city: 'São Paulo',
          state: 'SP',
          role: UserRole.NUTRICIONISTA,
          crn: 'CRN-3 99880',
          totalPoints: 150,
          tier: 'Bronze'
        };
        setSuccessMsg('Bem-vinda, Dra. Mariana Preto! Redirecionando...');
        setTimeout(() => {
          onLogin(marianaProfile);
          setIsLoading(false);
        }, 400);
        return;
      }

      // 4. Check in MEMBERS list
      const matchedMember = MEMBERS.find(
        m => m.email.toLowerCase() === cleanEmail || cleanEmail.includes(m.email.toLowerCase())
      );

      if (matchedMember) {
        const memberProfile: UserProfile = {
          id: matchedMember.id,
          name: matchedMember.name,
          email: matchedMember.email,
          phone: '',
          instagram: '',
          specialty: 'Nutrição Clínica Funcional',
          city: matchedMember.city,
          state: matchedMember.state,
          role: UserRole.NUTRICIONISTA,
          crn: matchedMember.crn,
          totalPoints: matchedMember.totalPoints,
          tier: matchedMember.tier
        };
        setSuccessMsg(`Bem-vinda(o), ${memberProfile.name}! Redirecionando...`);
        setTimeout(() => {
          onLogin(memberProfile);
          setIsLoading(false);
        }, 400);
        return;
      }

      // 5. IF NOT REGISTERED IN SUPABASE OR DATABASE:
      // Prompt user and redirect to official registration page
      setIsLoading(false);
      setUnregisteredRedirect({ email: cleanEmail, countdown: 3 });

      // Automatically open or redirect after 2.5s
      setTimeout(() => {
        try {
          window.open(REGISTRATION_URL, '_blank');
        } catch (e) {
          // Fallback if popup blocked
          window.location.href = REGISTRATION_URL;
        }
      }, 2500);

    } catch (err: any) {
      setErrorMsg(err.message || 'Ocorreu um erro ao validar seu e-mail.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-app text-primary-text font-sans flex items-center justify-center p-4 relative overflow-y-auto selection:bg-primary-accent selection:text-white">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(217,132,91,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(198,165,106,0.05),transparent_50%)] pointer-events-none" />
      <div className="grain-overlay opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-md bg-surface border border-border-color rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm relative z-10 my-8">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center pb-1">
          <div className="relative group mb-2">
            <img 
              src="/logoseranovo_dark.png?v=solid" 
              alt="Será Cacau" 
              className="h-16 w-auto max-w-[280px] object-contain transition-transform duration-500 hover:scale-105" 
            />
          </div>
          <p className="text-xs text-secondary-text max-w-xs leading-relaxed">
            Informe seu e-mail profissional para acessar cursos, laudos científicos e benefícios exclusivos.
          </p>
        </div>

        {/* Unregistered Alert Banner & Action */}
        {unregisteredRedirect && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-900 p-4 rounded-xl text-xs flex flex-col gap-3 animate-fadeIn">
            <div className="flex items-start gap-2.5">
              <UserPlus className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-950">E-mail não cadastrado</p>
                <p className="text-amber-800/90 mt-0.5 text-[11px] leading-relaxed">
                  O e-mail <strong className="font-semibold text-amber-950">{unregisteredRedirect.email}</strong> ainda não consta na nossa base de nutricionistas.
                </p>
              </div>
            </div>
            
            <p className="text-[11px] text-amber-800 leading-normal">
              Redirecionando você para a página de credenciamento oficial em instantes...
            </p>

            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-primary-forest hover:bg-primary-forest/90 text-white rounded-lg font-mono text-[10px] tracking-wider uppercase font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Fazer Cadastro de Profissional</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Status Alerts */}
        {errorMsg && !unregisteredRedirect && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="leading-normal">{errorMsg}</span>
          </div>
        )}
        
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 shrink-0 animate-bounce" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Email-only Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">
              E-mail Profissional
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (unregisteredRedirect) setUnregisteredRedirect(null);
                }}
                required
                autoFocus
                placeholder="seu-email@consultorio.com.br"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app/40 text-xs text-primary-text placeholder:text-secondary-text/30 transition-all font-sans"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 px-1 text-[10px] text-secondary-text/80 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-forest shrink-0" />
            <span>Acesso direto sem necessidade de senha.</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-primary-accent hover:bg-primary-accent/90 text-white rounded-xl font-mono text-[10px] tracking-widest uppercase font-extrabold transition-all flex items-center justify-center gap-2 shadow-md shadow-primary-accent/10 disabled:opacity-50 mt-1 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Acessar Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Direct Link to Register Page */}
        <div className="flex flex-col items-center gap-1.5 pt-1 text-center">
          <p className="text-[11px] text-secondary-text">
            Ainda não é parceira credenciada?
          </p>
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-primary-accent hover:text-primary-forest transition-colors flex items-center gap-1 hover:underline"
          >
            <span>Cadastre-se como Profissional</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Footer Accent */}
        <div className="text-center pt-2 border-t border-border-color/40">
          <span className="text-[8px] tracking-[0.2em] text-secondary-text/40 uppercase font-mono">
            conectar · investigar · modular
          </span>
        </div>

      </div>
    </div>
  );
};

