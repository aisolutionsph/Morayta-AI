import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { FeedbackForm } from "@/components/FeedbackForm";
import { Separator } from "@/components/ui/separator";
import { ClerkProvider } from "@clerk/nextjs";
import { FAQs } from "@/components/FAQs";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Piyumart",
  description: "Buy and sell products in our community marketplace",
  icons: {
    icon: "/favicon.ico", // Path relative to the public directory
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="container mx-auto">
            {children}
            <Separator className="my-8" />
            <FAQs />
            <Separator className="my-8" />
            <FeedbackForm />
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
