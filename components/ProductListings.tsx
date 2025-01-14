"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getSellerProducts } from "@/app/actions/getSellerProducts";
import { deleteProduct } from "@/app/actions/deleteProduct";
import type { Product } from "@/app/actions/getProducts";
import { ImageContainer } from "./image-container";

interface ProductListingsProps {
  userEmail: string;
}

export function ProductListings({ userEmail }: ProductListingsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const fetchedProducts = await getSellerProducts(userEmail);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [userEmail]);

  const handleDelete = async (productId: string) => {
    if (!productId) return;

    const result = await deleteProduct(productId, userEmail);
    if (result.success) {
      setProducts(products.filter((product) => product.id !== productId));
    } else {
      alert("Failed to delete product");
    }
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Product Listings</h2>
        <Button asChild>
          <Link href="/sell">Add New Product</Link>
        </Button>
      </div>
      {products.length === 0 ? (
        <p>You haven't listed any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageContainer
                  src={
                    product.image_urls?.[0] ||
                    "/placeholder.svg?height=160&width=300"
                  }
                  alt={product.title}
                />
                <p className="font-semibold mt-2">
                  ₱{product.price.toFixed(2)}
                </p>
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
          ))}
        </div>
      )}
    </div>
  );
}
