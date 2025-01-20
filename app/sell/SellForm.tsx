'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { X, Upload, ImageIcon } from 'lucide-react'
import { createListing } from '../actions/createListing'
import { TAG_CATEGORIES } from '../constants/tags'
import Image from 'next/image'

interface UserInfo {
  name: string;
  email: string;
}

interface SellFormProps {
  userInfo: UserInfo;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const MAX_FILES = 5;

export default function SellForm({ userInfo }: SellFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Home & Living'])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const router = useRouter()

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File ${file.name} exceeds 5MB limit`
    }
    if (!file.type.startsWith('image/')) {
      return `File ${file.name} is not an image`
    }
    return null
  }

  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    
    if (selectedFiles.length + fileArray.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} images`)
      return
    }

    const errors: string[] = []
    const validFiles: File[] = []

    fileArray.forEach(file => {
      const error = validateFile(file)
      if (error) {
        errors.push(error)
      } else {
        validFiles.push(file)
      }
    })

    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setSelectedFiles(prev => [...prev, ...validFiles])
    setError(null)
  }

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const previewUrl = useCallback((file: File) => {
    return URL.createObjectURL(file)
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    if (selectedFiles.length === 0) {
      setError('At least one image is required')
      setIsSubmitting(false)
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append('tags', JSON.stringify(selectedTags))
    formData.append('name', userInfo.name)
    formData.append('seller_email', userInfo.email)
    
    formData.delete('image')
    selectedFiles.forEach((file, index) => {
      formData.append(`image_${index}`, file)
    })

    const result = await createListing(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      form.reset()
      setSelectedTags([])
      setSelectedFiles([])
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
            <Label>Product Images (Max 5 images, 2MB each)</Label>
            <div
              className={`mt-2 border-2 border-dashed rounded-lg p-6 transition-colors ${
                isDragging 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-300 hover:border-primary'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <label className="flex flex-col items-center gap-2 cursor-pointer w-full text-center">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFiles(e.target.files || new FileList())}
                  />
                  <p className="text-sm">
                    Drag and drop your images here, or{' '}
                    <span className="text-primary hover:text-primary/80 underline font-medium">
                      browse
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Supported formats: JPEG, PNG, GIF
                  </p>
                </label>
              </div>
            </div>
            {selectedFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={previewUrl(file)}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
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

