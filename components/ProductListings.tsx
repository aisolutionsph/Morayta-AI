'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { getSellerProducts } from '@/app/actions/getSellerProducts'
import { deleteProduct } from '@/app/actions/deleteProduct'
import type { Product } from '@/app/actions/getProducts'
import Image from 'next/image'

interface ProductListingsProps {
  userEmail: string;
}

export function ProductListings({ userEmail }: ProductListingsProps) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getSellerProducts(userEmail)
      setProducts(fetchedProducts.filter(product => product && product.id))
    }
    fetchProducts()
  }, [userEmail])

  const handleDelete = async (productId: string) => {
    if (!productId) return
    
    const result = await deleteProduct(productId, userEmail)
    if (result.success) {
      setProducts(products.filter(product => product.id !== productId))
    } else {
      alert('Failed to delete product')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Product Listings</h2>
        <Button asChild>
          <Link href="/sell">Add New Product</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => product && product.id ? (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-40 w-full mb-2">
                <Image 
                  src={product.image_url || '/placeholder.svg?height=160&width=300'} 
                  alt={product.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <p className="font-semibold">₱{product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/products/${product.id}`}>View</Link>
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ) : null)}
      </div>
    </div>
  )
}

