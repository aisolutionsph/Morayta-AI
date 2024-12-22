"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Morayta AI MarketPlace
          </Link>

          <div className="space-x-4">
            {isSignedIn ? (
              <Button variant="ghost" asChild>
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
  );
}
