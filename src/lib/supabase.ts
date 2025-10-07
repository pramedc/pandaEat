import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://sslnogkqsdtbmbnrhhsd.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzbG5vZ2txc2R0Ym1ibnJoaHNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzA4NjAsImV4cCI6MjA3NTM0Njg2MH0.0kkE6-vBevIcM_u7TBut3lI0fVQVo-pQm-NSAGB7-Qs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Flexible data type for any table structure
export interface DataRow {
  [key: string]: string | number | boolean | Date | null | undefined
}
