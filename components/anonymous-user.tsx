import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

export default function AnonymousUser() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center space-y-6 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">
          Welcome to Morayta AI Marketplace
        </h1>
        <p className="text-xl text-gray-600">
          Discover amazing products in our community marketplace
        </p>
        <SignInButton>
          <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Sign in using FEU Email
          </button>
        </SignInButton>
      </div>
    </div>
  );
}
