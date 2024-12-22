'use server'

import { supabase } from '@/utils/supabase'
import type { Product } from './getProducts'

export async function getSellerProducts(sellerEmail: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('product_listings')
    .select('*')
    .eq('seller_email', sellerEmail)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching seller products:', error)
    return []
  }

  return data as Product[]
}

