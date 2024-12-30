import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from '@/utils/supabase'
import Image from 'next/image'
import { ContactSellerButton } from '@/components/contact-seller-button'
import { AddToCartButton } from '@/components/add-to-cart-button'

interface ProductWithProfile {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  name: string;
  seller_email: string;
  tags: string[];
  created_at: string;
  seller_profile?: {
    facebook_profile_link: string | null;
  } | null;
}

async function getProduct(id: string): Promise<ProductWithProfile | null> {
  try {
    const { data, error } = await supabase
      .from('product_listings')
      .select(`
        *,
        seller_profile:seller_profiles!seller_email(facebook_profile_link)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching product:', error)
      return null
    }

    return data as ProductWithProfile
  } catch (err) {
    console.error('Unexpected error:', err)
    return null
  }
}

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.id)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.title,
    description: product.description,
  }
}

export default async function Page({ params }: PageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  const facebookProfileLink = product.seller_profile?.facebook_profile_link

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video relative overflow-hidden rounded-md">
            <Image 
              src={product.image_url || '/placeholder.svg'}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <p className="text-base sm:text-lg">{product.description}</p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold">₱{product.price.toFixed(2)}</span>
            <span className="text-sm sm:text-base">Seller: {product.name}</span>
          </div>
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag: string) => (
                <span key={tag} className="bg-gray-200 text-gray-800 text-xs sm:text-sm px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <AddToCartButton product={product} />
          <ContactSellerButton facebookProfileLink={facebookProfileLink} />
        </CardFooter>
      </Card>
    </div>
  )
}

