'use server'

import { supabase } from '@/utils/supabase'

export async function getSellerProfile(email: string) {
  const { data, error } = await supabase
    .from('seller_profiles')
    .select('*')
    .eq('email', email)
    .single()

  if (error) {
    console.error('Error fetching seller profile:', error)
    return null
  }

  return data
}

export async function updateSellerProfile(email: string, profile: { name: string, bio: string }) {
  const { data, error } = await supabase
    .from('seller_profiles')
    .upsert({ email, ...profile })
    .select()

  if (error) {
    console.error('Error updating seller profile:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

