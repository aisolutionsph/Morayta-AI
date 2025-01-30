import { SignInButton } from "@clerk/nextjs";
import { CornerDownRight } from "lucide-react";

export default function AnonymousUser() {
  return (
    <>
      <section className="text-center py-12 my-32">
        <h1 className="text-4xl font-bold mb-4">Welcome to Piyumart (BETA)</h1>
        <p className="text-xl mb-6">Buy and sell products in our community</p>
        <div className="flex items-center justify-center gap-4">
          <CornerDownRight />
          <SignInButton>
            <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
              Sign in using FEU Email
            </button>
          </SignInButton>
        </div>
      </section>
    </>
  );
}
