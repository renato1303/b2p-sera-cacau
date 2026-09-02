/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SUPABASE_SQL_SCHEMA = `-- ==============================================================================
-- SCRIPT DE CRIAÇÃO DE TABELAS PARA A PLATAFORMA SOUL CHOCOLATE
-- Execute este script no SQL Editor do seu Supabase Dashboard
-- (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Habilitar extensão pgcrypto para geração de UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabela de Perfis de Nutricionistas e Administradores (profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  crn TEXT,
  city TEXT,
  state TEXT,
  specialty TEXT DEFAULT 'Nutrição Integrativa',
  role TEXT DEFAULT 'NUTRICIONISTA',
  patient_coupon TEXT,
  coupon_code TEXT,
  instagram TEXT,
  total_points INTEGER DEFAULT 0,
  tier TEXT DEFAULT 'Bronze',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para busca rápida
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_patient_coupon ON public.profiles(patient_coupon);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 3. Tabela de Histórico de Pontos (points_history)
CREATE TABLE IF NOT EXISTS public.points_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_email TEXT,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  source TEXT DEFAULT 'MANUAL',
  order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela de Progresso de Aulas da Academy (course_progress)
CREATE TABLE IF NOT EXISTS public.course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  class_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(member_id, class_id)
);

-- 5. Configurar Políticas de Segurança (Row Level Security - RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles (leitura e gravação permitidas para a plataforma)
DROP POLICY IF EXISTS "Permitir leitura pública de perfis" ON public.profiles;
CREATE POLICY "Permitir leitura pública de perfis" 
  ON public.profiles FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Permitir inserção e atualização de perfis" ON public.profiles;
CREATE POLICY "Permitir inserção e atualização de perfis" 
  ON public.profiles FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Políticas para points_history
DROP POLICY IF EXISTS "Permitir leitura de histórico de pontos" ON public.points_history;
CREATE POLICY "Permitir leitura de histórico de pontos" 
  ON public.points_history FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Permitir gravação de histórico de pontos" ON public.points_history;
CREATE POLICY "Permitir gravação de histórico de pontos" 
  ON public.points_history FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Políticas para course_progress
DROP POLICY IF EXISTS "Permitir acesso total a progresso de aulas" ON public.course_progress;
CREATE POLICY "Permitir acesso total a progresso de aulas" 
  ON public.course_progress FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- 6. Recarregar cache de esquemas do PostgREST
NOTIFY pgrst, 'reload schema';
`;
