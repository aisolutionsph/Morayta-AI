'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageContainer } from './image-container'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="space-y-4">
      {/* Main large image */}
      <div className="relative w-full overflow-hidden rounded-lg">
        <ImageContainer 
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          priority
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-none w-20 rounded-md overflow-hidden ${
                index === currentIndex ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200'
              }`}
            >
              <div className="relative pb-[100%]">
                <img
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

