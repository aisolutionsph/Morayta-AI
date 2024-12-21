'use server'

import { supabase } from '@/utils/supabase'
import { v4 as uuidv4 } from 'uuid'

export async function createListing(formData: FormData) {
  const name = formData.get('name') as string
  const seller_email = formData.get('seller_email') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const imageFile = formData.get('image') as File
  const tagsString = formData.get('tags') as string
  const tags = tagsString ? JSON.parse(tagsString) : []

  // Check each field individually and provide specific error messages
  if (!name) return { error: 'Name is required' }
  if (!seller_email) return { error: 'Email is required' }
  if (!title) return { error: 'Product title is required' }
  if (!description) return { error: 'Description is required' }
  if (!price || isNaN(parseFloat(price))) return { error: 'Valid price is required' }
  if (!imageFile) return { error: 'Product image is required' }

  try {
    // Handle image upload
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    
    console.log('Uploading file:', {
      name: imageFile.name,
      type: imageFile.type,
      size: imageFile.size,
      extension: fileExt
    })

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: false,
        contentType: imageFile.type,
        public: true
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return { error: `Failed to upload image: ${uploadError.message}` }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    console.log('Upload successful, public URL:', publicUrl)

    const { data, error } = await supabase
      .from('product_listings')
      .insert([
        { 
          name, 
          seller_email, 
          title, 
          description, 
          price: parseFloat(price), 
          image_url: publicUrl, 
          tags 
        }
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      return { error: `Failed to create listing: ${error.message}` }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { error: 'An unexpected error occurred while creating the listing' }
  }
}

