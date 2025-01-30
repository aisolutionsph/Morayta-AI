"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/piyumart.jpg"
              alt="Morayta AI Marketplace"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <div className="space-x-4">
            <button className="px-8 py-2 rounded-md bg-[#09850d] text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#09850d]">
              <Link href="/products">Browse Products</Link>
            </button>

            {isSignedIn ? (
              <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                <Link href="/seller-dashboard">Seller Dashboard</Link>
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
