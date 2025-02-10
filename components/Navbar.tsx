"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const { isSignedIn } = useAuth()

  const NavItems = () => (
    <>
      <Button
        asChild
        className="w-full sm:w-auto bg-[#09850d] text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#09850d]"
      >
        <Link href="/products">Browse Products</Link>
      </Button>

      {isSignedIn && (
        <Button
          asChild
          variant="outline"
          className="w-full sm:w-auto shadow-[0_0_0_3px_#000000_inset] bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        >
          <Link href="/seller-dashboard">Seller Dashboard</Link>
        </Button>
      )}
    </>
  )

  return (
    <nav className="relative shadow-lg">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-[#09850d] -z-10" />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/transparent_logo.png"
              alt="Piyumart Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <Image
              src="/piyumart_text.svg"
              alt="Piyumart"
              width={120}
              height={40}
              className="h-8 w-auto hidden sm:block"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            <NavItems />
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src="/piyumart_text.svg"
                    alt="Piyumart"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

