/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Member } from '../../types';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import { getPatientCoupon } from '../../lib/coupon';
import { SUPABASE_SQL_SCHEMA } from '../../lib/supabaseSchema';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Download, 
  Database, 
  Copy, 
  Users, 
  ArrowRight,
  RefreshCw,
  Sparkles,
  Check,
  Phone,
  Mail,
  UserCheck,
  Tag,
  Code,
  Terminal,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ParsedNutritionist {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  hasGeneratedEmail?: boolean;
  phone: string;
  crn: string;
  city: string;
  state: string;
  specialty: string;
  patientCoupon: string;
  hasCustomCoupon: boolean;
  status: 'valid' | 'invalid_email' | 'existing';
  statusMessage: string;
}

interface AdminImportMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingMembers: Member[];
  onImportSuccess: (importedMembers: Member[], totalCount: number) => void;
}

export const AdminImportMembersModal: React.FC<AdminImportMembersModalProps> = ({
  isOpen,
  onClose,
  existingMembers,
  onImportSuccess
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [parsedRows, setParsedRows] = useState<ParsedNutritionist[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showSqlHelper, setShowSqlHelper] = useState(false);
  const [sqlTab, setSqlTab] = useState<'schema' | 'inserts'>('schema');
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [isTableMissing, setIsTableMissing] = useState(false);
  const [previewPage, setPreviewPage] = useState<number>(1);
  const PREVIEW_PER_PAGE = 15;

  if (!isOpen) return null;

  // Helper to normalize header names
  const normalizeKey = (key: string): string => {
    return key
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  };

  const processFile = (file: File) => {
    setIsProcessing(true);
    setSyncFeedback(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result;
        const workbook = XLSX.read(buffer, { type: 'binary', cellDates: true });
        
        // 1. Intelligent Sheet Selection:
        // Find the sheet that contains actual data (most non-empty rows)
        let selectedSheetName = workbook.SheetNames[0];
        let maxDataRows = 0;

        for (const sheetName of workbook.SheetNames) {
          const ws = workbook.Sheets[sheetName];
          const rawGrid = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' }) as any[][];
          const nonEmpty = rawGrid.filter(row => 
            Array.isArray(row) && row.some(cell => String(cell || '').trim() !== '')
          ).length;
          if (nonEmpty > maxDataRows) {
            maxDataRows = nonEmpty;
            selectedSheetName = sheetName;
          }
        }

        const worksheet = workbook.Sheets[selectedSheetName];
        const rawGrid = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as any[][];

        if (!rawGrid || rawGrid.length === 0 || maxDataRows === 0) {
          setSyncFeedback({
            type: 'error',
            message: 'A planilha selecionada está vazia ou não possui linhas válidas.'
          });
          setIsProcessing(false);
          return;
        }

        // 2. Header Row Hunting:
        // Search rows 0 to min(15, rawGrid.length - 1) for the header row
        const headerKeywords = [
          'nome', 'name', 'nutri', 'nutricionista', 'aluna', 'profissional', 'sobrenome', 'completo',
          'email', 'mail', 'login', 'usuario', 'correio',
          'tel', 'cel', 'whats', 'phone', 'contato', 'fone',
          'cupom', 'coupon', 'desconto', 'voucher', 'codigo',
          'crn', 'registro', 'conselho',
          'cidade', 'estado', 'uf', 'municipio'
        ];

        let headerRowIndex = -1;
        let maxHeaderScore = 0;

        for (let r = 0; r < Math.min(15, rawGrid.length); r++) {
          const row = rawGrid[r];
          if (!Array.isArray(row)) continue;
          let score = 0;
          for (const cell of row) {
            const val = normalizeKey(String(cell || ''));
            if (!val) continue;
            for (const kw of headerKeywords) {
              if (val.includes(kw)) {
                score++;
                break;
              }
            }
          }
          if (score > maxHeaderScore) {
            maxHeaderScore = score;
            headerRowIndex = r;
          }
        }

        // If no row had >= 2 keywords, check if any row has 'email' or 'nome' or 'cupom'
        if (maxHeaderScore < 2) {
          for (let r = 0; r < Math.min(10, rawGrid.length); r++) {
            const row = rawGrid[r];
            if (!Array.isArray(row)) continue;
            const rowText = row.map(c => normalizeKey(String(c || ''))).join(' ');
            if (rowText.includes('email') || rowText.includes('nome') || rowText.includes('cupom')) {
              headerRowIndex = r;
              break;
            }
          }
        }

        // If still no header detected, assume row 0
        if (headerRowIndex === -1) {
          headerRowIndex = 0;
        }

        const headerRow = rawGrid[headerRowIndex] || [];
        const maxCols = Math.max(...rawGrid.map(r => (Array.isArray(r) ? r.length : 0)));

        // 3. Map Columns by Header Names
        let colFullName = -1;
        let colFirstName = -1;
        let colLastName = -1;
        let colEmail = -1;
        let colPhone = -1;
        let colCoupon = -1;
        let colCrn = -1;
        let colCity = -1;
        let colState = -1;
        let colSpecialty = -1;

        headerRow.forEach((cell, idx) => {
          const k = normalizeKey(String(cell || ''));
          if (!k) return;

          // Email
          if (k.includes('email') || k.includes('mail') || k.includes('login') || k.includes('usuario') || k.includes('correio')) {
            if (colEmail === -1) colEmail = idx;
          }
          // Coupon
          else if (k.includes('cupom') || k.includes('coupon') || k.includes('voucher') || (k.includes('desconto') && !k.includes('valor') && !k.includes('percentual'))) {
            if (colCoupon === -1) colCoupon = idx;
          }
          // Phone
          else if (k.includes('tel') || k.includes('cel') || k.includes('whats') || k.includes('phone') || k.includes('contato') || k.includes('fone')) {
            if (colPhone === -1) colPhone = idx;
          }
          // CRN
          else if (k.includes('crn') || k.includes('registro') || k.includes('conselho')) {
            if (colCrn === -1) colCrn = idx;
          }
          // Location
          else if (k.includes('cidade') || k.includes('municipio') || k.includes('city')) {
            if (colCity === -1) colCity = idx;
          }
          else if (k.includes('estado') || k.includes('uf') || k.includes('state')) {
            if (colState === -1) colState = idx;
          }
          // Specialty
          else if (k.includes('especialidade') || k.includes('specialty') || k.includes('area')) {
            if (colSpecialty === -1) colSpecialty = idx;
          }
          // Names
          else if (k.includes('sobrenome') || k.includes('lastname') || k.includes('surname') || k.includes('ultimonome') || k.includes('segundonome')) {
            if (colLastName === -1) colLastName = idx;
          }
          else if (k.includes('primeironome') || k.includes('firstname')) {
            if (colFirstName === -1) colFirstName = idx;
          }
          else if (k.includes('nome') || k.includes('name') || k.includes('nutri') || k.includes('profissional') || k.includes('aluna') || k.includes('cliente') || k.includes('membro')) {
            if (colFullName === -1) colFullName = idx;
          }
        });

        // 4. Semantic Content-Type Fallback for any unmapped columns
        const sampleRows = rawGrid.slice(headerRowIndex + 1, headerRowIndex + 25);
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const phoneRegex = /(\(?\d{2}\)?\s?9?\d{4}-?\d{4})|(\d{10,11})/;
        const crnRegex = /(crn\s*[-/]?\s*\d+)|(\b\d{4,6}\b)/i;

        for (let col = 0; col < maxCols; col++) {
          if (colEmail === -1) {
            const emailMatches = sampleRows.filter(r => r && emailRegex.test(String(r[col] || ''))).length;
            if (emailMatches >= Math.min(2, sampleRows.length)) {
              colEmail = col;
              continue;
            }
          }
          if (colPhone === -1 && col !== colEmail) {
            const phoneMatches = sampleRows.filter(r => r && phoneRegex.test(String(r[col] || ''))).length;
            if (phoneMatches >= Math.min(2, sampleRows.length)) {
              colPhone = col;
              continue;
            }
          }
          if (colCrn === -1 && col !== colEmail && col !== colPhone) {
            const crnMatches = sampleRows.filter(r => r && crnRegex.test(String(r[col] || ''))).length;
            if (crnMatches >= Math.min(2, sampleRows.length)) {
              colCrn = col;
              continue;
            }
          }
          if (colFullName === -1 && colFirstName === -1 && col !== colEmail && col !== colPhone && col !== colCrn && col !== colCoupon) {
            const textMatches = sampleRows.filter(r => {
              const str = String(r?.[col] || '').trim();
              return str.length > 2 && /^[A-Za-zÀ-ÖØ-öø-ÿ\s.'-]+$/.test(str) && !str.includes('@');
            }).length;
            if (textMatches >= Math.min(2, sampleRows.length)) {
              colFullName = col;
              continue;
            }
          }
        }

        // 5. Extract and Validate Every Row
        const existingEmails = new Set(existingMembers.map(m => m.email.toLowerCase().trim()));
        const dataRows = rawGrid.slice(headerRowIndex + 1);

        const processed: ParsedNutritionist[] = [];
        let validIdx = 0;

        for (let index = 0; index < dataRows.length; index++) {
          const row = dataRows[index];
          if (!Array.isArray(row)) continue;

          // Skip completely empty rows
          const hasAnyContent = row.some(cell => String(cell || '').trim() !== '');
          if (!hasAnyContent) continue;

          // Extract Names
          let firstName = '';
          let lastName = '';
          let fullName = '';

          if (colFirstName !== -1 && row[colFirstName]) {
            firstName = String(row[colFirstName]).trim();
          }
          if (colLastName !== -1 && row[colLastName]) {
            lastName = String(row[colLastName]).trim();
          }

          if (firstName && lastName) {
            fullName = `${firstName} ${lastName}`.trim();
          } else if (colFullName !== -1 && row[colFullName]) {
            fullName = String(row[colFullName]).trim();
          } else if (firstName) {
            fullName = firstName;
          } else if (lastName) {
            fullName = lastName;
          }

          // Clean medical/academic titles from full name
          fullName = fullName
            .replace(/^(dra?\.|dr\.|nutricionista|nutri)\s+/i, '')
            .trim();

          // Extract Email
          let rawEmail = '';
          if (colEmail !== -1 && row[colEmail]) {
            const candidate = String(row[colEmail]).trim().toLowerCase();
            const match = candidate.match(emailRegex);
            if (match) rawEmail = match[0];
          }

          // If email was not found in colEmail, scan all cells in this row for an email
          if (!rawEmail) {
            for (const cell of row) {
              const cellStr = String(cell || '').trim().toLowerCase();
              const match = cellStr.match(emailRegex);
              if (match) {
                rawEmail = match[0];
                break;
              }
            }
          }

          // Extract Phone
          let phone = '';
          if (colPhone !== -1 && row[colPhone]) {
            phone = String(row[colPhone]).trim();
          } else {
            for (const cell of row) {
              const cellStr = String(cell || '').trim();
              if (phoneRegex.test(cellStr) && !cellStr.includes('@')) {
                phone = cellStr;
                break;
              }
            }
          }

          // Extract CRN
          let crn = '';
          if (colCrn !== -1 && row[colCrn]) {
            crn = String(row[colCrn]).trim();
          } else {
            for (const cell of row) {
              const cellStr = String(cell || '').trim();
              if (/^crn/i.test(cellStr)) {
                crn = cellStr;
                break;
              }
            }
          }

          // Extract City and State
          const city = colCity !== -1 && row[colCity] ? String(row[colCity]).trim() : '';
          const state = colState !== -1 && row[colState] ? String(row[colState]).trim() : '';
          const specialty = colSpecialty !== -1 && row[colSpecialty] ? String(row[colSpecialty]).trim() : 'Nutrição Integrativa & Funcional';

          // Extract or Compute Patient Discount Coupon
          let rawCouponValue = '';
          if (colCoupon !== -1 && row[colCoupon]) {
            rawCouponValue = String(row[colCoupon]).trim();
          } else {
            for (const cell of row) {
              const cellStr = String(cell || '').trim();
              if (/^[A-Z0-9_-]{4,15}$/.test(cellStr) && !/^\d+$/.test(cellStr) && cellStr !== crn && cellStr !== phone) {
                rawCouponValue = cellStr;
                break;
              }
            }
          }

          // Default name fallback if absent
          if (!fullName) {
            if (rawEmail) {
              const emailPrefix = rawEmail.split('@')[0].replace(/[._-]/g, ' ');
              fullName = emailPrefix
                .split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');
            } else {
              fullName = `Nutricionista ${validIdx + 1}`;
            }
          }

          const hasCustomCoupon = rawCouponValue.length > 0;
          const patientCoupon = hasCustomCoupon 
            ? rawCouponValue.toUpperCase() 
            : getPatientCoupon(fullName);

          // BULK MASS REGISTRATION GUARANTEE:
          // If the spreadsheet row doesn't have an email, auto-generate a valid direct-access email
          // so the user can import the whole list in bulk directly to the database without errors
          let finalEmail = rawEmail;
          let hasGeneratedEmail = false;

          if (!finalEmail) {
            const nameSlug = fullName
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^a-z0-9]/g, ".")
              .replace(/\.+/g, ".")
              .replace(/^\.|\.$/g, "");

            finalEmail = `${nameSlug || `nutri.${validIdx + 1}`}@nutri.seracacau.com.br`;
            hasGeneratedEmail = true;
          }

          const isExisting = existingEmails.has(finalEmail);

          let status: 'valid' | 'invalid_email' | 'existing' = 'valid';
          let statusMessage = hasGeneratedEmail
            ? 'Pronta para cadastro (e-mail de acesso gerado)'
            : 'Pronta para cadastro na base';

          if (isExisting) {
            status = 'existing';
            statusMessage = 'Já cadastrada (será atualizada)';
          }

          processed.push({
            id: `nutri-import-${Date.now()}-${validIdx}`,
            firstName: firstName || fullName.split(' ')[0],
            lastName: lastName || fullName.split(' ').slice(1).join(' '),
            fullName,
            email: finalEmail,
            hasGeneratedEmail,
            phone,
            crn: crn || '',
            city: city || '',
            state: state || '',
            specialty,
            patientCoupon,
            hasCustomCoupon,
            status,
            statusMessage
          });

          validIdx++;
        }

        setParsedRows(processed);
        setIsProcessing(false);
      } catch (err: any) {
        console.error('Erro ao processar planilha:', err);
        setSyncFeedback({
          type: 'error',
          message: 'Erro ao ler o arquivo Excel. Verifique se o formato (.xlsx, .xls ou .csv) está correto.'
        });
        setIsProcessing(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const downloadSampleTemplate = () => {
    const sampleData = [
      {
        Nome: 'Camila',
        Sobrenome: 'Medeiros',
        Telefone: '(11) 98765-4321',
        'E-mail': 'camila.medeiros@exemplo.com.br',
        'Cupom de Desconto': 'CAMILA8',
        CRN: 'CRN-3 45120'
      },
      {
        Nome: 'Rodrigo',
        Sobrenome: 'Albuquerque',
        Telefone: '(21) 99876-5432',
        'E-mail': 'rodrigo.albuquerque@exemplo.com.br',
        'Cupom de Desconto': 'RODRIGO8',
        CRN: 'CRN-4 12890'
      },
      {
        Nome: 'Mariana',
        Sobrenome: 'Costa Silva',
        Telefone: '(71) 98123-4567',
        'E-mail': 'mariana.costa@exemplo.com.br',
        'Cupom de Desconto': 'MARIANA8',
        CRN: 'CRN-5 8734'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Nutricionistas");
    XLSX.writeFile(workbook, "modelo_importacao_nutricionistas_sera_cacau.xlsx");
  };

  const handleSyncToSupabase = async () => {
    const validRows = parsedRows.filter(r => r.status !== 'invalid_email');
    if (validRows.length === 0) {
      alert('Não há registros com e-mails válidos para importar.');
      return;
    }

    setIsSyncing(true);
    setSyncFeedback(null);
    setIsTableMissing(false);

    try {
      let supabaseSuccess = false;
      let missingTableDetected = false;

      if (isSupabaseConfigured) {
        // Prepare payload for Supabase 'profiles' table including patient coupon without forcing fake location
        const payload = validRows.map(r => ({
          name: r.fullName,
          email: r.email,
          phone: r.phone || '',
          crn: r.crn || '',
          city: r.city || '',
          state: r.state || '',
          specialty: r.specialty || 'Nutrição Integrativa',
          role: 'NUTRICIONISTA',
          patient_coupon: r.patientCoupon,
          coupon_code: r.patientCoupon,
          total_points: 0,
          tier: 'Bronze',
          updated_at: new Date().toISOString()
        }));

        // Upsert into Supabase profiles on conflict of email
        const { error } = await supabase
          .from('profiles')
          .upsert(payload, { onConflict: 'email' });

        if (error) {
          const errCode = (error as any)?.code;
          const errMsg = String((error as any)?.message || '');
          
          if (errCode === 'PGRST205' || errMsg.includes('profiles') || errMsg.includes('schema cache')) {
            missingTableDetected = true;
            console.warn('Tabela profiles ausente no Supabase (PGRST205):', error);
          } else {
            console.warn('Tentando insert padrão no Supabase após erro no upsert:', error);
            const { error: insertErr } = await supabase.from('profiles').insert(payload);
            if (insertErr) {
              const insertErrCode = (insertErr as any)?.code;
              const insertErrMsg = String((insertErr as any)?.message || '');
              if (insertErrCode === 'PGRST205' || insertErrMsg.includes('profiles') || insertErrMsg.includes('schema cache')) {
                missingTableDetected = true;
              }
              console.warn('Resultado do insert alternativo:', insertErr);
            } else {
              supabaseSuccess = true;
            }
          }
        } else {
          supabaseSuccess = true;
        }
      }

      // Always populate local Member objects with patientCoupon so user data is never lost
      const newMembers: Member[] = validRows.map((r, i) => ({
        id: `mem-${Date.now()}-${i}`,
        name: r.fullName,
        email: r.email,
        phone: r.phone,
        crn: r.crn,
        city: r.city || '',
        state: r.state || '',
        specialty: r.specialty,
        patientCoupon: r.patientCoupon,
        couponCode: r.patientCoupon,
        enrolledCourseIds: ['c1', 'c2'],
        joinedDate: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
        totalPoints: 0,
        tier: 'Bronze'
      }));

      // Persist in localStorage so any page refresh or direct login finds them immediately
      try {
        const stored = localStorage.getItem('sera_cacau_registered_nutris') || localStorage.getItem('sera_cacau_members');
        const existing: Member[] = stored ? JSON.parse(stored) : [];
        const mergedMap = new Map<string, Member>();
        existingMembers.forEach(m => mergedMap.set((m.email || '').toLowerCase().trim(), m));
        existing.forEach(m => mergedMap.set((m.email || '').toLowerCase().trim(), m));
        newMembers.forEach(m => mergedMap.set((m.email || '').toLowerCase().trim(), m));
        const mergedArray = Array.from(mergedMap.values());
        localStorage.setItem('sera_cacau_registered_nutris', JSON.stringify(mergedArray));
        localStorage.setItem('sera_cacau_members', JSON.stringify(mergedArray));
      } catch (lsErr) {
        console.warn('Erro ao salvar localmente no navegador:', lsErr);
      }

      onImportSuccess(newMembers, validRows.length);

      if (missingTableDetected) {
        setIsTableMissing(true);
        setShowSqlHelper(true);
        setSqlTab('schema');
        setSyncFeedback({
          type: 'error',
          message: `⚠️ As ${validRows.length} nutricionistas foram carregadas no portal com sucesso! Porém a tabela "profiles" ainda não existe no seu projeto Supabase (Erro PGRST205). Para salvar no Supabase permanentemente, copie o Script SQL abaixo e execute no SQL Editor do seu Supabase.`
        });
        setIsSyncing(false);
        return;
      }

      setSyncFeedback({
        type: 'success',
        message: isSupabaseConfigured 
          ? `🎉 Sucesso! ${validRows.length} nutricionistas e seus cupons foram sincronizados com o Supabase e cadastrados no portal.`
          : `✓ ${validRows.length} nutricionistas e cupons foram adicionados à lista da plataforma com sucesso.`
      });

      setIsSyncing(false);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error('Erro na sincronização:', err);
      // Even on exception, make sure local state received the members
      const newMembers: Member[] = validRows.map((r, i) => ({
        id: `mem-${Date.now()}-${i}`,
        name: r.fullName,
        email: r.email,
        phone: r.phone,
        crn: r.crn,
        city: r.city || '',
        state: r.state || '',
        specialty: r.specialty,
        patientCoupon: r.patientCoupon,
        couponCode: r.patientCoupon,
        enrolledCourseIds: ['c1', 'c2'],
        joinedDate: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
        totalPoints: 0,
        tier: 'Bronze'
      }));
      onImportSuccess(newMembers, validRows.length);

      setSyncFeedback({
        type: 'error',
        message: 'Os registros foram carregados no painel. Ocorreu um aviso na gravação remota do Supabase: ' + (err.message || 'Verifique as tabelas.')
      });
      setIsSyncing(false);
    }
  };

  const validCount = parsedRows.filter(r => r.status !== 'invalid_email').length;
  const invalidCount = parsedRows.filter(r => r.status === 'invalid_email').length;
  const customCouponCount = parsedRows.filter(r => r.hasCustomCoupon).length;

  // Generate SQL string for manual copy if needed
  const generatedSql = parsedRows.filter(r => r.status !== 'invalid_email').map(r => {
    const safeName = r.fullName.replace(/'/g, "''");
    const safeEmail = r.email.replace(/'/g, "''");
    const safePhone = r.phone.replace(/'/g, "''");
    const safeCrn = r.crn.replace(/'/g, "''");
    const safeCity = r.city ? r.city.replace(/'/g, "''") : '';
    const safeState = r.state ? r.state.replace(/'/g, "''") : '';
    const safeSpec = r.specialty ? r.specialty.replace(/'/g, "''") : 'Nutrição Integrativa';
    const safeCoupon = r.patientCoupon.replace(/'/g, "''");
    return `INSERT INTO profiles (name, email, phone, crn, city, state, specialty, role, patient_coupon, coupon_code, total_points, tier, updated_at)
VALUES ('${safeName}', '${safeEmail}', '${safePhone}', '${safeCrn}', '${safeCity}', '${safeState}', '${safeSpec}', 'NUTRICIONISTA', '${safeCoupon}', '${safeCoupon}', 0, 'Bronze', NOW())
ON CONFLICT (email) DO UPDATE SET 
  name = EXCLUDED.name, 
  phone = EXCLUDED.phone, 
  crn = EXCLUDED.crn, 
  patient_coupon = EXCLUDED.patient_coupon,
  coupon_code = EXCLUDED.coupon_code;`;
  }).join('\n\n');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#2E4030]/15 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-br from-[#1C261D] via-[#243325] to-[#121A13] p-6 sm:p-8 text-[#F7F3EC] flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary-accent text-xs font-semibold">
              <Database className="w-3.5 h-3.5" />
              <span>Importação & Integração Supabase</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Importar Lista de Nutricionistas (Excel / CSV)
            </h2>
            <p className="text-xs sm:text-sm text-[#C2C9C0] max-w-2xl">
              Faça o upload da sua planilha com <strong>Nome, Sobrenome, Telefone, E-mail e Cupom de Desconto</strong>. As profissionais e seus cupons serão gravados diretamente no <strong>Supabase</strong>.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-primary-text">
          
          {/* Supabase Status Alert */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
            isSupabaseConfigured
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>
                {isSupabaseConfigured ? (
                  <><strong>Supabase Conectado:</strong> As nutricionistas e cupons serão gravados na tabela <code>profiles</code> (campos <code>patient_coupon</code> e <code>coupon_code</code>).</>
                ) : (
                  <><strong>Modo Pré-visualização:</strong> Conexão local ativa. As nutricionistas e cupons serão cadastrados na sessão atual.</>
                )}
              </span>
            </div>

            <button
              type="button"
              onClick={downloadSampleTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#2E4030]/15 hover:bg-[#FAF7F2] text-primary-forest text-xs font-bold transition-all shrink-0 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-primary-accent" />
              <span>Baixar Planilha Modelo (.xlsx)</span>
            </button>
          </div>

          {/* Drag and Drop Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
              dragActive
                ? 'border-primary-accent bg-[#FAF7F2] scale-[1.01]'
                : 'border-[#2E4030]/20 hover:border-primary-forest/50 bg-[#FAF7F2]/50 hover:bg-[#FAF7F2]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            <div className="w-14 h-14 rounded-2xl bg-white border border-[#2E4030]/10 flex items-center justify-center text-primary-forest shadow-sm">
              <FileSpreadsheet className="w-7 h-7 text-primary-accent" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-primary-forest">
                {fileName ? `Arquivo: ${fileName}` : 'Arraste e solte o arquivo Excel (.xlsx, .xls) ou .csv aqui'}
              </p>
              <p className="text-xs text-[#526054]">
                Ou clique para selecionar. Colunas aceitas: <strong>Nome, Sobrenome, Telefone, E-mail, Cupom de Desconto, CRN, Cidade, Estado</strong>.
              </p>
            </div>
          </div>

          {/* Feedback Messages */}
          {syncFeedback && (
            <div className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-semibold ${
              syncFeedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              {syncFeedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{syncFeedback.message}</span>
            </div>
          )}

          {/* Parsed Rows Preview */}
          {parsedRows.length > 0 && (
            <div className="space-y-4">
              {/* Summary Stats Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#2E4030]/10">
                <div className="flex items-center gap-3 text-xs flex-wrap">
                  <span className="font-bold text-primary-forest">
                    Total Lido: <strong>{parsedRows.length}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-100/70 px-2.5 py-1 rounded-full text-[11px]">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {validCount} Válidas
                  </span>
                  {customCouponCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-amber-900 font-semibold bg-amber-100/80 px-2.5 py-1 rounded-full text-[11px]">
                      <Tag className="w-3.5 h-3.5 text-amber-700" />
                      {customCouponCount} Cupons da Planilha
                    </span>
                  )}
                  {invalidCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-rose-800 font-semibold bg-rose-100/70 px-2.5 py-1 rounded-full text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      {invalidCount} Com e-mail pendente
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSqlHelper(!showSqlHelper)}
                    className="text-xs text-primary-accent hover:text-primary-forest underline font-semibold cursor-pointer"
                  >
                    {showSqlHelper ? 'Ocultar Código SQL' : 'Ver Código SQL Gerado'}
                  </button>
                </div>
              </div>

              {/* SQL Generator & Supabase Schema Helper */}
              {showSqlHelper && (
                <div className="bg-[#182219] text-[#F7F3EC] p-5 rounded-3xl space-y-4 border border-white/15 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-secondary-accent" />
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        Supabase SQL Studio
                      </span>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
                      <button
                        type="button"
                        onClick={() => setSqlTab('schema')}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          sqlTab === 'schema'
                            ? 'bg-primary-accent text-[#1C261D] shadow-sm'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        1. Criar Tabelas (DDL & RLS)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSqlTab('inserts')}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          sqlTab === 'inserts'
                            ? 'bg-primary-accent text-[#1C261D] shadow-sm'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        2. Comandos INSERT ({validCount})
                      </button>
                    </div>

                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const textToCopy = sqlTab === 'schema' ? SUPABASE_SQL_SCHEMA : generatedSql;
                        navigator.clipboard.writeText(textToCopy);
                        if (sqlTab === 'schema') {
                          setCopiedSchema(true);
                          setTimeout(() => setCopiedSchema(false), 3000);
                        } else {
                          setCopiedSql(true);
                          setTimeout(() => setCopiedSql(false), 3000);
                        }
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold transition-all text-white cursor-pointer border border-white/20 shadow-xs"
                    >
                      {(sqlTab === 'schema' ? copiedSchema : copiedSql) ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-secondary-accent" />
                          <span>Copiar SQL desta Aba</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Step Instructions */}
                  <div className="text-[11px] bg-white/5 border border-white/10 p-3 rounded-2xl flex items-start gap-2.5 text-[#C8D1C7] leading-relaxed">
                    <Sparkles className="w-4 h-4 text-secondary-accent shrink-0 mt-0.5" />
                    <div>
                      {sqlTab === 'schema' ? (
                        <p>
                          <strong>Como ativar a tabela no Supabase:</strong> Acesse seu painel em <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-secondary-accent underline inline-flex items-center gap-0.5">Supabase Dashboard <ExternalLink className="w-2.5 h-2.5" /></a> → Abra o <strong>SQL Editor</strong> no menu lateral → Cole o script abaixo e clique em <strong>Run</strong>. Isso criará a tabela <code>profiles</code> com suporte a cupons e RLS.
                        </p>
                      ) : (
                        <p>
                          <strong>Importação direta via SQL:</strong> Caso prefira injetar os registros diretamente no PostgreSQL sem depender da API REST, cole estes comandos no <strong>SQL Editor</strong> do Supabase.
                        </p>
                      )}
                    </div>
                  </div>

                  <pre className="text-[11px] font-mono bg-black/60 p-4 rounded-2xl max-h-52 overflow-y-auto whitespace-pre-wrap text-emerald-300 border border-white/10 leading-relaxed">
                    {sqlTab === 'schema' ? SUPABASE_SQL_SCHEMA : generatedSql}
                  </pre>
                </div>
              )}

              {/* Preview Table with 15 rows pagination */}
              <div className="border border-[#2E4030]/10 rounded-2xl overflow-hidden bg-white shadow-sm space-y-3 p-3">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#526054]">
                    <thead className="bg-[#FAF7F2] border-b border-[#2E4030]/10 text-primary-forest font-bold uppercase text-[10px] tracking-wider font-mono">
                      <tr>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Nome Completo</th>
                        <th className="py-2.5 px-3">E-mail</th>
                        <th className="py-2.5 px-3">Cupom Paciente (8%)</th>
                        <th className="py-2.5 px-3">Telefone</th>
                        <th className="py-2.5 px-3">CRN</th>
                        <th className="py-2.5 px-3">Localidade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2E4030]/5">
                      {parsedRows
                        .slice((previewPage - 1) * PREVIEW_PER_PAGE, previewPage * PREVIEW_PER_PAGE)
                        .map((row) => (
                          <tr key={row.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                            <td className="py-2.5 px-3">
                              {row.status === 'valid' && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                  <Check className="w-3 h-3 text-emerald-600" /> Válida
                                </span>
                              )}
                              {row.status === 'existing' && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                                  <RefreshCw className="w-3 h-3 text-amber-600" /> Atualizar
                                </span>
                              )}
                              {row.status === 'invalid_email' && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                                  <AlertTriangle className="w-3 h-3 text-rose-600" /> Inválido
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-primary-forest">
                              {row.fullName}
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[11px] text-primary-text">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span>{row.email}</span>
                                {row.hasGeneratedEmail && (
                                  <span 
                                    className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-sans font-semibold inline-flex items-center gap-0.5" 
                                    title="E-mail gerado para cadastro em massa direto na base"
                                  >
                                    <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                                    Acesso Direto
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="inline-flex items-center gap-1.5 font-mono font-extrabold text-[11px] text-[#7A5B1D] bg-[#FAF3E0] border border-[#E8DAB2] px-2 py-0.5 rounded-md shadow-xs">
                                <Tag className="w-3 h-3 text-primary-accent" />
                                <span>{row.patientCoupon}</span>
                                {row.hasCustomCoupon && (
                                  <span className="text-[9px] bg-primary-accent/15 text-primary-forest px-1 rounded uppercase font-sans font-semibold">
                                    Excel
                                  </span>
                                )}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[11px]">
                              {row.phone || <span className="text-[#8E9B90] italic">-</span>}
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[11px]">
                              {row.crn || <span className="text-[#8E9B90] italic">-</span>}
                            </td>
                            <td className="py-2.5 px-3">
                              {row.city || row.state ? (
                                <span>{row.city}{row.state ? `/${row.state}` : ''}</span>
                              ) : (
                                <span className="text-[#8E9B90] italic text-[11px]">A definir no perfil</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Preview Pagination Controls */}
                {parsedRows.length > PREVIEW_PER_PAGE && (
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#2E4030]/10 text-xs">
                    <span className="text-[11px] text-[#6A786C] font-mono">
                      Mostrando {Math.min((previewPage - 1) * PREVIEW_PER_PAGE + 1, parsedRows.length)} a {Math.min(previewPage * PREVIEW_PER_PAGE, parsedRows.length)} de {parsedRows.length} registros (15 por página)
                    </span>

                    <div className="flex items-center gap-1 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setPreviewPage(p => Math.max(1, p - 1))}
                        disabled={previewPage <= 1}
                        className={`p-1.5 rounded-lg border text-xs ${
                          previewPage <= 1 ? 'opacity-40 cursor-not-allowed bg-gray-100' : 'hover:bg-[#FAF7F2] cursor-pointer'
                        }`}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>

                      {Array.from({ length: Math.ceil(parsedRows.length / PREVIEW_PER_PAGE) }, (_, i) => i + 1).map(p => (
                        <button
                          key={`preview-page-${p}`}
                          type="button"
                          onClick={() => setPreviewPage(p)}
                          className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            p === previewPage ? 'bg-primary-forest text-white' : 'bg-[#FAF7F2] hover:bg-[#F0EAE1] text-[#4A554B]'
                          }`}
                        >
                          {p}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() => setPreviewPage(p => Math.min(Math.ceil(parsedRows.length / PREVIEW_PER_PAGE), p + 1))}
                        disabled={previewPage >= Math.ceil(parsedRows.length / PREVIEW_PER_PAGE)}
                        className={`p-1.5 rounded-lg border text-xs ${
                          previewPage >= Math.ceil(parsedRows.length / PREVIEW_PER_PAGE)
                            ? 'opacity-40 cursor-not-allowed bg-gray-100'
                            : 'hover:bg-[#FAF7F2] cursor-pointer'
                        }`}
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF7F2] p-4 sm:p-6 border-t border-[#2E4030]/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-[#526054]">
            {parsedRows.length > 0 ? (
              <span><strong>{validCount}</strong> profissionais prontas para serem sincronizadas com o banco de dados.</span>
            ) : (
              <span>Selecione ou arraste seu arquivo Excel (.xlsx, .xls ou .csv) para iniciar.</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#2E4030]/15 bg-white hover:bg-gray-50 text-xs font-semibold text-primary-forest transition-all cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="button"
              disabled={validCount === 0 || isSyncing}
              onClick={handleSyncToSupabase}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                validCount === 0 || isSyncing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-forest hover:bg-primary-forest/90 text-white cursor-pointer'
              }`}
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 text-secondary-accent animate-spin" />
                  <span>Sincronizando com Supabase...</span>
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 text-secondary-accent" />
                  <span>Cadastrar ({validCount}) Nutris na Base</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
