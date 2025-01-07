'use server'

import { supabase } from '@/utils/supabase'

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_urls: string[];
  name: string;
  seller_email: string;
  tags: string[];
  created_at: string;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('product_listings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

