"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getProducts, type Product } from "../actions/getProducts"
import { TAG_CATEGORIES } from "../constants/tags"
import Image from "next/image"
import { ImageContainer } from "@/components/image-container"
import { Input } from "@/components/ui/input"

const PRICE_RANGES = [
  { label: "₱1 - ₱100", min: 1, max: 100 },
  { label: "₱101 - ₱1,000", min: 101, max: 1000 },
  { label: "₱1,001 - ₱10,000", min: 1001, max: 10000 },
  { label: "₱10,000+", min: 10000, max: Number.POSITIVE_INFINITY },
]

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Home & Living"])
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getProducts()
        setProducts(fetchedProducts)
      } catch (err) {
        setError("Failed to fetch products. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesTags =
      selectedTags.length === 0 || (product.tags && product.tags.some((tag) => selectedTags.includes(tag)))

    let matchesPrice = true
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-").map(Number)
      matchesPrice =
        product.price >= min && (max === Number.POSITIVE_INFINITY ? product.price >= min : product.price <= max)
    }

    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTags && matchesPrice && matchesSearch
  })

  const clearFilters = () => {
    setSelectedTags([])
    setSelectedPriceRange(null)
    setSearchQuery("")
  }

  if (isLoading) {
    return <div className="text-center p-4">Loading products...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="w-full md:w-1/4">
        <Button onClick={() => setShowFilters(!showFilters)} className="w-full mb-4 md:hidden">
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
        <div className={`bg-white rounded-lg border p-4 space-y-6 ${showFilters ? "" : "hidden md:block"}`}>
          <div>
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            {(selectedTags.length > 0 || selectedPriceRange) && (
              <Button variant="ghost" className="w-full mb-4 text-sm" onClick={clearFilters}>
                Clear All Filters
              </Button>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Price Range</h3>
            <RadioGroup value={selectedPriceRange || ""} onValueChange={setSelectedPriceRange}>
              {PRICE_RANGES.map((range) => (
                <div key={range.label} className="flex items-center space-x-2">
                  <RadioGroupItem value={`${range.min}-${range.max}`} id={`price-${range.min}`} />
                  <Label htmlFor={`price-${range.min}`} className="text-sm cursor-pointer">
                    {range.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Categories Filter */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Categories</h3>
            <Accordion type="multiple" value={expandedCategories} onValueChange={setExpandedCategories}>
              {Object.entries(TAG_CATEGORIES).map(([category, tags]) => (
                <AccordionItem value={category} key={category}>
                  <AccordionTrigger className="text-sm hover:no-underline">{category}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-2">
                      {tags.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={tag}
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={(checked) => {
                              setSelectedTags(checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag))
                            }}
                          />
                          <Label htmlFor={tag} className="text-sm cursor-pointer">
                            {tag}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4">
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-sm text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {filteredProducts.length === 0 && (selectedTags.length > 0 || selectedPriceRange || searchQuery) ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products match your selected filters or search query.</p>
            <Button variant="link" onClick={clearFilters} className="mt-2">
              Clear all filters and search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ImageContainer
                    src={product.image_urls?.[0] || "/placeholder.svg?height=160&width=300"}
                    alt={product.title}
                  />
                  <p className="mt-2 line-clamp-2">{product.description}</p>
                  <p className="font-semibold mt-2">₱{product.price.toFixed(2)}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.tags &&
                      product.tags.map((tag) => (
                        <span key={tag} className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

