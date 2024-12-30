'use client'

import { Button } from "@/components/ui/button"

interface ContactSellerButtonProps {
  facebookProfileLink: string | null | undefined
}

export function ContactSellerButton({ facebookProfileLink }: ContactSellerButtonProps) {
  return (
    <Button 
      variant="outline" 
      className="w-full sm:w-auto"
      onClick={() => {
        if (facebookProfileLink) {
          window.open(facebookProfileLink, '_blank', 'noopener,noreferrer')
        } else {
          alert('Seller has not provided a Facebook profile link')
        }
      }}
    >
      Contact Seller
    </Button>
  )
}

