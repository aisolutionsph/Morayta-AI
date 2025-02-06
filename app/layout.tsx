import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { FeedbackForm } from "@/components/FeedbackForm";
import { Separator } from "@/components/ui/separator";
import { ClerkProvider } from "@clerk/nextjs";
import { FAQs } from "@/components/FAQs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketplace Platform",
  description: "Buy and sell products in our community marketplace",
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
        </body>
      </html>
    </ClerkProvider>
  );
}
