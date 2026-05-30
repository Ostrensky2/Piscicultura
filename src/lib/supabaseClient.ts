import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

/**
 * Cliente Supabase compartilhado. Só é criado quando as variáveis de ambiente
 * estão presentes; assim o app continua funcionando em modo mock sem `.env`.
 * Use `getSupabase()` para obter o cliente e tratar o caso de ausência.
 */
export const supabase: SupabaseClient | null =
  url && publishableKey ? createClient(url, publishableKey) : null

export function getSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      'Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env',
    )
  }
  return supabase
}
