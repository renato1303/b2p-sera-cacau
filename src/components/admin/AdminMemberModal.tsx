/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Member } from '../../types';
import { getPatientCoupon } from '../../lib/coupon';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Tag, 
  Award, 
  Database, 
  Check, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface AdminMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Member) => Promise<void>;
  editingMember?: Member | null;
}

export const AdminMemberModal: React.FC<AdminMemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingMember
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [crn, setCrn] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [specialty, setSpecialty] = useState('Nutrição Integrativa & Funcional');
  const [patientCoupon, setPatientCoupon] = useState('');
  const [customCouponTouched, setCustomCouponTouched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name || '');
      setEmail(editingMember.email || '');
      setPhone(editingMember.phone || '');
      setCrn(editingMember.crn || '');
      setCity(editingMember.city || '');
      setState(editingMember.state || '');
      setSpecialty(editingMember.specialty || 'Nutrição Integrativa & Funcional');
      setPatientCoupon(editingMember.patientCoupon || editingMember.couponCode || getPatientCoupon(editingMember.name));
      setCustomCouponTouched(true);
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setCrn('');
      setCity('');
      setState('');
      setSpecialty('Nutrição Integrativa & Funcional');
      setPatientCoupon('');
      setCustomCouponTouched(false);
    }
    setErrorMsg('');
  }, [editingMember, isOpen]);

  // Auto-generate coupon when name changes (if user hasn't manually edited the coupon)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!customCouponTouched && !editingMember) {
      setPatientCoupon(getPatientCoupon(newName));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      setErrorMsg('Por favor, informe o nome completo da nutricionista.');
      return;
    }

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    const finalCoupon = patientCoupon.trim().toUpperCase() || getPatientCoupon(cleanName);

    const memberToSave: Member = {
      id: editingMember?.id || `mem-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: phone.trim(),
      crn: crn.trim(),
      city: city.trim(),
      state: state.trim().toUpperCase(),
      specialty: specialty.trim() || 'Nutrição Integrativa & Funcional',
      patientCoupon: finalCoupon,
      couponCode: finalCoupon,
      enrolledCourseIds: editingMember?.enrolledCourseIds || ['c1', 'c2'],
      joinedDate: editingMember?.joinedDate || new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
      totalPoints: editingMember?.totalPoints ?? 0,
      tier: editingMember?.tier || 'Bronze'
    };

    setIsLoading(true);
    try {
      await onSave(memberToSave);
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Erro ao gravar dados no Supabase.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#2E4030]/15 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#FAF7F2] border-b border-[#2E4030]/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary-accent bg-primary-accent/10 px-2 py-0.5 rounded-md">
                {editingMember ? 'Atualizar Registro' : 'Novo Cadastro'}
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Database className="w-3 h-3 text-emerald-700" /> Sincronizado ao Supabase
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-primary-forest mt-1">
              {editingMember ? `Editar: ${editingMember.name}` : 'Cadastrar Nova Nutricionista'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#6A786C] hover:text-primary-forest rounded-full hover:bg-white/80 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Nome */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#526054] mb-1">
              Nome Completo <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B90]" />
              <input
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                placeholder="Ex: Mariana Castro Silva"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF7F2] border border-[#2E4030]/15 rounded-xl text-xs text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/30 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#526054] mb-1">
              E-mail Profissional (Login) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B90]" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Ex: mariana.nutri@gmail.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF7F2] border border-[#2E4030]/15 rounded-xl text-xs text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/30 focus:bg-white transition-all font-mono"
              />
            </div>
            <span className="text-[10px] text-[#6A786C] mt-1 block">
              A nutricionista usará este e-mail para acessar o portal e ter 15% OFF imediato nas compras.
            </span>
          </div>

          {/* Grid: Telefone e CRN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#526054] mb-1">
                Telefone / WhatsApp
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B90]" />
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF7F2] border border-[#2E4030]/15 rounded-xl text-xs text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/30 focus:bg-white transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#526054] mb-1">
                Registro Profissional (CRN)
              </label>
              <div className="relative">
                <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B90]" />
                <input
                  type="text"
                  value={crn}
                  onChange={e => setCrn(e.target.value)}
                  placeholder="CRN-3 48192"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF7F2] border border-[#2E4030]/15 rounded-xl text-xs text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/30 focus:bg-white transition-all font-mono uppercase"
                />
              </div>
            </div>
          </div>

          {/* Grid: Cidade e Estado */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#526054] mb-1">
                Cidade
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B90]" />
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="São Paulo"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF7F2] border border-[#2E4030]/15 rounded-xl text-xs text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/30 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#526054] mb-1">
                UF / Estado
              </label>
              <input
                type="text"
                maxLength={2}
                value={state}
                onChange={e => setState(e.target.value.toUpperCase())}
                placeholder="SP"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#2E4030]/15 rounded-xl text-xs text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/30 focus:bg-white transition-all font-mono uppercase text-center"
              />
            </div>
          </div>

          {/* Especialidade */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#526054] mb-1">
              Especialidade / Foco de Atendimento
            </label>
            <input
              type="text"
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              placeholder="Ex: Nutrição Esportiva & Funcional"
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#2E4030]/15 rounded-xl text-xs text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/30 focus:bg-white transition-all"
            />
          </div>

          {/* Cupom do Paciente */}
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#2E4030]/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary-forest flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-primary-accent" />
                Cupom Oficial de Paciente (8% OFF)
              </label>
              <button
                type="button"
                onClick={() => {
                  setPatientCoupon(getPatientCoupon(name));
                  setCustomCouponTouched(false);
                }}
                className="text-[10px] text-primary-accent font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                Regerar Padrão
              </button>
            </div>
            
            <input
              type="text"
              value={patientCoupon}
              onChange={e => {
                setPatientCoupon(e.target.value.toUpperCase());
                setCustomCouponTouched(true);
              }}
              placeholder="Ex: MARIANA8"
              className="w-full px-3.5 py-2 bg-white border border-[#E8DAB2] rounded-xl text-xs font-mono font-bold text-[#7A5B1D] tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-primary-accent/30"
            />
            <p className="text-[10px] text-[#6A786C]">
              Este código é disponibilizado para a nutricionista prescrever aos pacientes com 8% de desconto na loja virtual.
            </p>
          </div>

        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#2E4030]/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 text-xs font-bold text-[#526054] hover:text-primary-forest transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-5 py-2.5 bg-primary-forest hover:bg-primary-forest/90 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Gravando no Supabase...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-secondary-accent" />
                <span>{editingMember ? 'Salvar Alterações' : 'Cadastrar Nutricionista'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
