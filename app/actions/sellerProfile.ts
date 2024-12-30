'use server'

import { supabase } from '@/utils/supabase'

export interface CartItem {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface SellerProfile {
  email: string;
  name: string;
  facebook_profile_link: string | null;
  cart: CartItem[] | null;
  created_at: string;
  updated_at: string;
}

export async function getSellerProfile(email: string): Promise<SellerProfile | null> {
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

export async function updateSellerProfile(email: string, profile: Partial<SellerProfile>) {
  try {
    const { data, error } = await supabase
      .from('seller_profiles')
      .upsert({
        email,
        ...profile,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'email'
      })
      .select()

    if (error) {
      console.error('Error updating seller profile:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function addToCart(email: string, item: CartItem) {
  const profile = await getSellerProfile(email)
  if (!profile) {
    return { success: false, error: 'Profile not found' }
  }

  const cart = profile.cart || []
  const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === item.product_id)

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += item.quantity
  } else {
    cart.push(item)
  }

  return updateSellerProfile(email, { cart })
}

export async function removeFromCart(email: string, productId: string) {
  const profile = await getSellerProfile(email)
  if (!profile || !profile.cart) {
    return { success: false, error: 'Cart not found' }
  }

  const updatedCart = profile.cart.filter(item => item.product_id !== productId)
  return updateSellerProfile(email, { cart: updatedCart })
}

