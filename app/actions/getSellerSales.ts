'use server'

import { supabase } from '@/utils/supabase'

export async function getSellerSales(sellerEmail: string) {
  const { data, error } = await supabase
    .from('sales')
    .select(`
      id,
      amount,
      created_at,
      product_listings (
        id,
        title,
        seller_email
      )
    `)
    .eq('product_listings.seller_email', sellerEmail)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching seller sales:', error)
    return []
  }

  return data.map(sale => ({
    id: sale.id,
    amount: sale.amount,
    created_at: sale.created_at,
    product_title: sale.product_listings.title
  }))
}

