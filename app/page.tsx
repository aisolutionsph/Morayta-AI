import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProducts } from './actions/getProducts'
import Image from 'next/image'
import ClerkWrapper from '@/components/ClerkWrapper'

export default async function Home() {
  const latestProducts = await getProducts()

  return (
    <ClerkWrapper>
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
                      src={product.image_url || '/placeholder.svg?height=160&width=300'} 
                      alt={product.title}
                      layout="fill"
                      objectFit="cover"
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

        <section className="py-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">1. Create an Account</h3>
              <p>Sign up and set up your profile</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">2. List or Browse</h3>
              <p>Start selling your products or browse listings</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">3. Buy or Sell</h3>
              <p>Complete transactions securely through our platform</p>
            </div>
          </div>
        </section>
      </div>
    </ClerkWrapper>
  )
}

