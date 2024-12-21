import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from '@/utils/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'

async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('product_listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

type Props = {
  params: { id: string }
}

export default async function ProductDetails({ params }: Props) {
  const product = await getProduct(params.id)

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
          <Button className="w-full sm:w-auto">Add to Cart</Button>
          <Button variant="outline" className="w-full sm:w-auto">Contact Seller</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

