'use server'

import { supabase } from '@/utils/supabase'

type Database = {
  public: {
    Tables: {
      sales: {
        Row: {
          id: string;
          amount: number;
          created_at: string;
        };
      };
      product_listings: {
        Row: {
          id: string;
          title: string;
          seller_email: string;
        };
      };
    };
  };
};

type DbResult = {
  id: string;
  amount: number;
  created_at: string;
  product_listings: Database['public']['Tables']['product_listings']['Row'];
};

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

  // First cast to unknown, then to our known type
  const typedData = (data as unknown) as DbResult[]

  return typedData.map(sale => ({
    id: sale.id,
    amount: sale.amount,
    created_at: sale.created_at,
    product_title: sale.product_listings.title
  }))
}

