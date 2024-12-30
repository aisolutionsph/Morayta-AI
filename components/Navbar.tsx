'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@clerk/nextjs"

export default function Navbar() {
  const { isSignedIn } = useAuth()

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/morayta-ai-logo.svg"
              alt="Morayta AI Marketplace"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          
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
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

