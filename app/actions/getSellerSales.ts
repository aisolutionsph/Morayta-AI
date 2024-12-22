'use server'

import { supabase } from '@/utils/supabase'

interface ProductListing {
  id: string;
  title: string;
  seller_email: string;
}

interface DatabaseSale {
  id: string;
  amount: number;
  created_at: string;
  product_listings: ProductListing;
}

interface Sale {
  id: string;
  amount: number;
  created_at: string;
  product_title: string;
}

export async function getSellerSales(sellerEmail: string): Promise<Sale[]> {
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

  // Cast to unknown first, then to our specific type
  return ((data as unknown) as DatabaseSale[]).map(sale => ({
    id: sale.id,
    amount: sale.amount,
    created_at: sale.created_at,
    product_title: sale.product_listings.title
  }))
}

