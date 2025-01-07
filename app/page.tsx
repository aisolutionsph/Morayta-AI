import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProducts } from './actions/getProducts'
import Image from 'next/image'

export default async function Home() {
  const latestProducts = await getProducts()

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Morayta AI Marketplace</h1>
        <p className="text-xl mb-6">Buy and sell products in our community</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/sell">Start Selling</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestProducts.slice(0, 3).map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-1">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="h-40 bg-gray-200 rounded-md mb-2 relative">
                  <Image 
                    src={product.image_urls?.[0] || '/placeholder.svg?height=160&width=300'} 
                    alt={product.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                </div>
                <p className="line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

