'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { createListing } from '../actions/createListing'
import { TAG_CATEGORIES } from '../constants/tags'

interface UserInfo {
  name: string;
  email: string;
}

interface SellFormProps {
  userInfo: UserInfo;
}

export default function SellForm({ userInfo }: SellFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Home & Living'])
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append('tags', JSON.stringify(selectedTags))
    formData.append('name', userInfo.name)
    formData.append('seller_email', userInfo.email)

    const result = await createListing(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      form.reset()
      setSelectedTags([])
      setTimeout(() => {
        router.push('/products')
      }, 2000)
    }

    setIsSubmitting(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">List Your Product</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="mb-4">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your product has been listed successfully!</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="title">Product Title</Label>
            <Input type="text" id="title" name="title" required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={4} required />
          </div>
          <div>
            <Label htmlFor="price">Price (₱)</Label>
            <Input type="number" id="price" name="price" min="0" step="0.01" required />
          </div>
          <div>
            <Label htmlFor="image">Product Image</Label>
            <Input type="file" id="image" name="image" accept="image/*" required className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <Label className="text-base mb-4 block">Product Categories</Label>
          <Accordion type="multiple" value={expandedCategories} onValueChange={setExpandedCategories}>
            {Object.entries(TAG_CATEGORIES).map(([category, tags]) => (
              <AccordionItem value={category} key={category}>
                <AccordionTrigger className="text-sm hover:no-underline">
                  {category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`sell-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={(checked) => {
                            setSelectedTags(
                              checked
                                ? [...selectedTags, tag]
                                : selectedTags.filter((t) => t !== tag)
                            )
                          }}
                        />
                        <Label 
                          htmlFor={`sell-${tag}`}
                          className="text-sm cursor-pointer"
                        >
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {selectedTags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedTags.map((tag) => (
                <span key={tag} className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Listing...' : 'List Product'}
        </Button>
      </form>
    </div>
  )
}

