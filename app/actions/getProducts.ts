'use server'

import { supabase } from '@/utils/supabase'

export async function getProducts() {
  const { data, error } = await supabase
    .from('product_listings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data
}

