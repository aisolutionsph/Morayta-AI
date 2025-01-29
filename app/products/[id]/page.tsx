import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/utils/supabase"
import Image from "next/image"
import { ContactSellerButton } from "@/components/contact-seller-button"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ImageGallery } from "@/components/image-gallery"

interface ProductWithProfile {
  id: string
  title: string
  description: string
  price: number
  image_urls: string[]
  name: string
  seller_email: string
  tags: string[] | null
  created_at: string
  seller_profile: {
    facebook_profile_link: string | null
    instagram_profile_link: string | null
  } | null
}

async function getProduct(id: string): Promise<ProductWithProfile | null> {
  try {
    const { data, error } = await supabase
      .from("product_listings")
      .select(`
        *,
        seller_profile:seller_profiles(facebook_profile_link, instagram_profile_link)
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching product:", error)
      return null
    }

    return data as ProductWithProfile
  } catch (err) {
    console.error("Unexpected error:", err)
    return null
  }
}

type Params = Promise<{ id: string }>

interface Props {
  params: Params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.id)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: product.title,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageGallery images={product.image_urls || ["/placeholder.svg"]} title={product.title} />
          <p className="text-base sm:text-lg whitespace-pre-line">{product.description}</p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold">₱{product.price.toFixed(2)}</span>
            <span className="text-sm sm:text-base">Seller: {product.name}</span>
          </div>
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="bg-gray-200 text-gray-800 text-xs sm:text-sm px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <AddToCartButton product={product} />
          <ContactSellerButton
            facebookUrl={product.seller_profile?.facebook_profile_link || null}
            instagramUrl={product.seller_profile?.instagram_profile_link || null}
          />
        </CardFooter>
      </Card>
    </div>
  )
}

