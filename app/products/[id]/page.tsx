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
  contact_seller_link: string | null // Updated: Added contact_seller_link
}

async function getProduct(id: string): Promise<ProductWithProfile | null> {
  try {
    const { data, error } = await supabase
      .from("product_listings")
      .select(`
        *
      `) // Updated: Removed the seller_profile selection, as it's not needed anymore.
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching product:", error)
      return null
    }

    return (data || null) as ProductWithProfile | null
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
          <p className="text-base sm:text-lg">{product.description}</p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold">₱{product.price.toFixed(2)}</span>
            <span className="text-sm sm:text-base">Posted By: {product.name}</span>
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
          <ContactSellerButton contactUrl={product.contact_seller_link} /> {/* Updated: Using contact_seller_link */}
        </CardFooter>
      </Card>
    </div>
  )
}

