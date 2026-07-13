/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  UserCheck,
  Building,
  Activity,
  Award
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';

interface LoginViewProps {
  onLogin: (user: UserProfile) => void;
  nutriProfile: UserProfile;
  adminProfile: UserProfile;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  nutriProfile,
  adminProfile
}) => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCrn, setRegCrn] = useState('');
  const [regSpecialty, setRegSpecialty] = useState('Nutrição Clínica Funcional');
  const [regCity, setRegCity] = useState('');
  const [regState, setRegState] = useState('SP');
  const [regPassword, setRegPassword] = useState('');

  // Pre-fill quick logins helper
  const handleQuickLogin = (role: UserRole) => {
    setIsLoading(true);
    setErrorMsg('');
    
    // Simulate premium validation & token exchange handshake
    setTimeout(() => {
      setIsLoading(false);
      if (role === UserRole.NUTRICIONISTA) {
        onLogin(nutriProfile);
      } else {
        onLogin(adminProfile);
      }
    }, 1200);
  };

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      // Validate credentials against our predefined profiles
      if (email.toLowerCase() === nutriProfile.email.toLowerCase()) {
        onLogin(nutriProfile);
      } else if (email.toLowerCase() === adminProfile.email.toLowerCase()) {
        onLogin(adminProfile);
      } else {
        // Allow creating custom profiles on the fly for better B2B demo flexibility!
        const customProfile: UserProfile = {
          name: email.split('@')[0].replace('.', ' '),
          email: email.toLowerCase(),
          phone: '(11) 99999-8888',
          instagram: '@sera.cacau.consultora',
          specialty: 'Nutrição Integrativa',
          city: 'Belo Horizonte',
          state: 'MG',
          role: UserRole.NUTRICIONISTA,
          crn: 'CRN-4 99999'
        };
        onLogin(customProfile);
      }
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setErrorMsg('Por favor, preencha todos os dados obrigatórios.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      const newRegisteredUser: UserProfile = {
        name: regName,
        email: regEmail.toLowerCase(),
        phone: '(11) 98888-7777',
        instagram: '@' + regName.toLowerCase().replace(/\s+/g, '.'),
        specialty: 'Nutrição Integrativa',
        city: regCity || 'São Paulo',
        state: regState,
        role: UserRole.NUTRICIONISTA,
        crn: 'CRN-SP 00000'
      };

      setSuccessMsg('Cadastro concluído com sucesso! Iniciando portal...');
      
      setTimeout(() => {
        onLogin(newRegisteredUser);
      }, 1500);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-bg-app text-primary-text font-sans flex items-center justify-center p-4 relative overflow-y-auto selection:bg-primary-accent selection:text-white">
      {/* Background radial gradients for luxury premium aura */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(217,132,91,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(198,165,106,0.05),transparent_50%)] pointer-events-none" />
      <div className="grain-overlay opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-md bg-surface border border-border-color rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm relative z-10 my-8">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="relative group">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary-accent to-luxury-accent opacity-15 group-hover:opacity-25 blur transition-all duration-500" />
            <svg 
              className="relative w-12 h-12 text-primary-accent transition-transform duration-700 hover:scale-105" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M50 15C42 22 35 34 35 48C35 65 44 78 50 85C56 78 65 65 65 48C65 34 58 22 50 15Z" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path d="M50 15V85" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M42 30C46 36 46 44 42 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M58 35C54 41 54 49 58 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col mt-2">
            <span className="font-sans font-extrabold text-xl tracking-[0.25em] text-primary-forest leading-none">SERÁ CACAU</span>
            <span className="text-[9px] tracking-[0.4em] text-luxury-accent font-bold mt-1.5 uppercase">portal de membros</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-secondary-surface p-1.5 rounded-xl border border-border-color">
          <button
            type="button"
            onClick={() => { setIsLoginTab(true); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg text-xs tracking-wider uppercase font-bold transition-all ${
              isLoginTab 
                ? 'bg-primary-accent text-white shadow-md font-extrabold' 
                : 'text-secondary-text hover:text-primary-forest'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => { setIsLoginTab(false); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg text-xs tracking-wider uppercase font-bold transition-all ${
              !isLoginTab 
                ? 'bg-primary-accent text-white shadow-md font-extrabold' 
                : 'text-secondary-text hover:text-primary-forest'
            }`}
          >
            Cadastre-se
          </button>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 animate-pulse">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 shrink-0 animate-bounce" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: LOGIN FORM */}
        {isLoginTab ? (
          <div className="flex flex-col gap-6">
            <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
              
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">E-mail Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="exemplo@consultorio.com.br"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app/40 text-xs text-primary-text placeholder:text-secondary-text/30 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Senha de Acesso</label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Por favor, selecione um dos Perfis Rápidos abaixo ou cadastre-se para obter uma senha."); }} className="text-[9px] text-primary-accent hover:text-primary-forest font-mono uppercase tracking-wider">Esqueceu?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Sua senha secreta"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app/40 text-xs text-primary-text placeholder:text-secondary-text/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text/40 hover:text-primary-text"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me toggle */}
              <div className="flex items-center mt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[10px] tracking-wider text-secondary-text font-mono">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-border-color bg-white text-primary-accent focus:ring-primary-accent focus:ring-offset-0 w-3.5 h-3.5"
                  />
                  <span>Manter conectado</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary-accent hover:bg-primary-accent/90 text-white rounded-xl font-mono text-[10px] tracking-widest uppercase font-extrabold transition-all flex items-center justify-center gap-2 shadow-md shadow-primary-accent/10 disabled:opacity-50 mt-2 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Entrar</span>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* TAB 2: REQUEST REGISTER FORM */
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Nome Profissional</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
                placeholder="Ex: Dra. Viviane Santos"
                className="w-full px-4 py-2.5 rounded-xl border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app/40 text-xs text-primary-text placeholder:text-secondary-text/30 transition-all"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">E-mail Profissional</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
                placeholder="exemplo@consultorio.com.br"
                className="w-full px-4 py-2.5 rounded-xl border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app/40 text-xs text-primary-text placeholder:text-secondary-text/30 transition-all"
              />
            </div>

            {/* Location (City / State) */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Cidade</label>
                <input
                  type="text"
                  value={regCity}
                  onChange={(e) => setRegCity(e.target.value)}
                  placeholder="Ex: Salvador"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app/40 text-xs text-primary-text placeholder:text-secondary-text/30 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Estado</label>
                <input
                  type="text"
                  value={regState}
                  onChange={(e) => setRegState(e.target.value.toUpperCase())}
                  maxLength={2}
                  placeholder="BA"
                  className="w-full px-4 py-2.5 rounded-xl border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app/40 text-xs text-primary-text placeholder:text-secondary-text/30 text-center transition-all font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Definir Senha</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-2.5 rounded-xl border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app/40 text-xs text-primary-text placeholder:text-secondary-text/30 transition-all"
              />
            </div>

            <div className="flex items-start gap-2.5 mt-1">
              <Award className="w-4 h-4 text-primary-accent shrink-0 mt-0.5" />
              <p className="text-[9px] text-secondary-text leading-relaxed">
                Ao se cadastrar, você concorda com nossos termos e políticas de acesso ao portal exclusivo.
              </p>
            </div>

            {/* Submit Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary-accent hover:bg-primary-accent/90 text-white rounded-xl font-mono text-[10px] tracking-widest uppercase font-extrabold transition-all flex items-center justify-center gap-2 shadow-md shadow-primary-accent/10 disabled:opacity-50 mt-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Cadastrar</span>
              )}
            </button>

          </form>
        )}

        {/* Footer Accent */}
        <div className="text-center">
          <span className="text-[8px] tracking-[0.2em] text-secondary-text/40 uppercase font-mono">
            conectar · investigar · modular
          </span>
        </div>

      </div>
    </div>
  );
};
