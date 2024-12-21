'use server'

import { supabase } from '@/utils/supabase'

export async function getSellerProducts(sellerEmail: string) {
  const { data, error } = await supabase
    .from('product_listings')
    .select('*')
    .eq('seller_email', sellerEmail)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching seller products:', error)
    return []
  }

  return data
}

