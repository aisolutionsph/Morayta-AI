"use client"

import { Button } from "@/components/ui/button"

interface ContactSellerButtonProps {
  contactUrl: string | null | undefined
}

export function ContactSellerButton({ contactUrl }: ContactSellerButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full sm:w-auto"
      onClick={() => {
        if (contactUrl) {
          window.open(contactUrl, "_blank", "noopener,noreferrer")
        } else {
          alert("Seller has not provided a contact URL")
        }
      }}
    >
      Contact Seller
    </Button>
  )
}

