'use server'

import { supabase } from '@/utils/supabase'

export async function deleteProduct(productId: string, sellerEmail: string) {
  const { error } = await supabase
    .from('product_listings')
    .delete()
    .eq('id', productId)
    .eq('seller_email', sellerEmail)

  if (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

