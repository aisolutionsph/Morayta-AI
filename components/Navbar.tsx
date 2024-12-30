'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@clerk/nextjs"

export default function Navbar() {
  const { isSignedIn } = useAuth()

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-gray-800">MarketPlace</Link>
          
          
          <div className="space-x-4">
            <Button 
              variant="default" 
              className="bg-black hover:bg-gray-800 text-white" 
              asChild
            >
              <Link href="/products">Browse Products</Link>
            </Button>
            
            {isSignedIn ? (
              <Button 
                variant="outline" 
                className="border-black hover:bg-gray-100" 
                asChild
              >
                <Link href="/seller-dashboard">Seller Dashboard</Link>
              </Button>
            ) : (
              <>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

