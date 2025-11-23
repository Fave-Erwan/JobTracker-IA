import { createClient } from '@/lib/supabase/server'

export async function testSupabaseConnection() {
  const supabase = await createClient()
  
  const { data, error, count } = await supabase
    .from('job_offers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  return {
    success: !error,
    error: error?.message,
    count,
    data
  }
}