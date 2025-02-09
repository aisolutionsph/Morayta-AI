import { SignInButton } from "@clerk/nextjs"
import { CornerDownRight } from "lucide-react"
import Image from "next/image"

export default function AnonymousUser() {
  return (
    <>
      <section className="relative text-center py-48">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white opacity-90"></div>
        </div>
        <div className="relative z-10">
          <div className="">
            <h1 className="text-4xl font-bold mb-4 text-black">Welcome to Piyumart (BETA)</h1>
            <p className="text-xl mb-6 text-black">Buy and sell products in our community</p>
            <div className="flex items-center justify-center gap-4">
              <CornerDownRight className="text-black" />
              <SignInButton>
                <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                  Sign in using FEU Email
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

