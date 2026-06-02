import { createClient } from '@supabase/supabase-js'

// Fallback to placeholder credentials during compile/build time if env variables are empty
// We add .trim() to automatically strip any leading or trailing spaces entered in .env.local
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co').trim()
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key').trim()

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    '⚠️ TradyCall Warning: Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing in your .env.local file. Using placeholder credentials for compilation.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
