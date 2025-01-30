import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProducts } from "./actions/getProducts";
import { ImageContainer } from "@/components/image-container";
import ClerkWrapper from "@/components/ClerkWrapper";

export default async function Home() {
  const latestProducts = await getProducts();

  return (
    <ClerkWrapper>
      <div className="space-y-8 px-4 sm:px-6 lg:px-8">
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Piyumart (BETA)
          </h1>
          <p className="text-xl mb-6">Buy and sell products in our community</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-2 rounded-md bg-[#09850d] text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#09850d]">
              <Link href="/products">Browse Products</Link>
            </button>
            <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
              <Link href="/sell">Start Selling</Link>
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Latest Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProducts.slice(0, 3).map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="line-clamp-1">
                    {product.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ImageContainer
                    src={
                      product.image_urls?.[0] ||
                      "/placeholder.svg?height=160&width=300"
                    }
                    alt={product.title}
                    priority
                  />
                  <p className="mt-2 line-clamp-2">{product.description}</p>
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

    </ClerkWrapper>
  );
}
