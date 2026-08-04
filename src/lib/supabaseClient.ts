/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// AVISO DE CONFIGURAÇÃO: As variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
// precisam estar devidamente configuradas no arquivo .env ou nas configurações de ambiente
// para que a integração com o Supabase e o fluxo de autenticação funcionem corretamente.
// Sem essas configurações, o aplicativo exibirá um erro amigável ao usuário.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'SUA_SUPABASE_URL' && 
  supabaseAnonKey !== 'SUA_SUPABASE_ANON_KEY'
);

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder-url.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key'
);
