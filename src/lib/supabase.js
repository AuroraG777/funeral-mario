import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://npmrdxqsfikqftjujebx.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_dHY2mAlTRFOONOsqblY8dw_jMqWwOHS'

// Creamos un cliente seguro que maneja entornos de servidor y cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false }
})