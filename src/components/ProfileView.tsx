/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Instagram, 
  MapPin, 
  ShieldCheck, 
  FileCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateProfile }) => {
  const [formData, setFormData] = useState<UserProfile>({ ...user });
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-6 md:px-12 flex flex-col gap-10 font-sans text-primary-text">
      
      {/* Header */}
      <header className="flex flex-col gap-3">
        <span className="text-xs tracking-[0.2em] uppercase text-primary-accent font-bold font-mono">
          identificação profissional
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-forest">
          Meu Perfil
        </h1>
        <p className="text-xs md:text-sm text-secondary-text leading-relaxed">
          Mantenha seus dados e registro profissional atualizados para garantir acesso aos laudos, amostras físicas e campanhas exclusivas.
        </p>
        <div className="h-[1px] bg-border-color/60 mt-2"></div>
      </header>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-surface border border-border-color rounded-lg p-6 md:p-8 flex flex-col gap-6 shadow-sm">
        
        {/* Success message */}
        {isSaved && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 px-4 py-3.5 rounded text-xs flex items-center gap-2.5 animate-fade-in font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Perfil profissional atualizado com sucesso no ecossistema Será!</span>
          </div>
        )}

        <div className="flex items-center gap-4 border-b border-border-color/60 pb-6">
          <div className="w-16 h-16 rounded-full bg-primary-accent/15 border border-primary-accent/20 text-primary-accent font-bold text-2xl flex items-center justify-center uppercase shrink-0">
            {formData.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-primary-forest">{formData.name}</span>
            <span className="text-[10px] text-primary-accent font-bold uppercase tracking-widest mt-0.5 font-mono">
              ROLE: {formData.role === UserRole.ADMIN ? 'Administrador do Sistema' : 'Nutricionista Credenciada'}
            </span>
          </div>
        </div>

        {/* Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Nome Completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app text-xs text-primary-text font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Endereço de E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
              className="w-full px-4 py-2.5 rounded border border-border-color bg-secondary-surface text-xs text-secondary-text cursor-not-allowed font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Telefone Clínico</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              className="w-full px-4 py-2.5 rounded border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app text-xs text-primary-text font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Instagram Profissional</label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@seu.perfil"
              className="w-full px-4 py-2.5 rounded border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app text-xs text-primary-text font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Registro de Classe (CRN)</label>
            <input
              type="text"
              name="crn"
              value={formData.crn || ''}
              onChange={handleChange}
              placeholder="CRN-5 12345"
              className="w-full px-4 py-2.5 rounded border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app text-xs text-primary-text font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Especialidade Principal</label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="Nutrição Clínica Funcional"
              className="w-full px-4 py-2.5 rounded border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app text-xs text-primary-text font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Cidade do Consultório</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app text-xs text-primary-text font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-widest uppercase text-secondary-text font-bold font-mono">Estado (UF)</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              maxLength={2}
              className="w-full px-4 py-2.5 rounded border border-border-color focus:border-primary-accent focus:outline-none bg-bg-app text-xs text-primary-text font-sans"
            />
          </div>

        </div>

        {/* Action Button */}
        <button
          id="save-profile-btn"
          type="submit"
          className="w-full py-3.5 bg-primary-accent hover:bg-primary-accent/90 text-white rounded text-xs tracking-widest uppercase transition-all mt-4 font-mono font-bold shadow-sm hover:scale-101 cursor-pointer"
        >
          salvar informações cadastrais
        </button>

      </form>

      {/* Trust credentials widget */}
      <div className="flex items-start gap-3 bg-surface border border-border-color rounded-lg p-5 shadow-sm">
        <ShieldCheck className="w-5 h-5 text-primary-accent shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-primary-forest">Segurança e Privacidade</span>
          <p className="text-[11px] text-secondary-text leading-relaxed">
            Seus dados cadastrais estão criptografados e protegidos de acordo com a LGPD. Nenhuma informação pessoal de registro ou telefone de consultório será compartilhada com terceiros sem consentimento explícito.
          </p>
        </div>
      </div>

    </div>
  );
};
