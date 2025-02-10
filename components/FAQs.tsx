'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ_ITEMS = [
  {
    question: "What is the purpose of Morayta AI Marketplace?",
    answer: "Morayta AI Marketplace aims to aid the growth of entrepreneurs and small businesses by providing a platform for them to list and sell their products online. Our marketplace is designed to connect buyers and sellers, allowing them to easily find and purchase products from each other."
  },
  {
    question: "I'm having errors on the Seller Dashboard. What should I do?",
    answer: "You need to at least sell one product in the marketplace to access the seller dashboard and many of our other features."
  },
  {
    question: "How do I list a product?",
    answer: "Sign in to your account, click on 'Start Selling' or visit your Seller Dashboard, and click 'Add New Product'. Fill in the product details, upload images, set your price, and click 'List Product'."
  },
  {
    question: "As a seller, how do I let buyers contact me through my facebook?",
    answer: "On the seller dashboard page, head over to the profile section and input your facebook profile link. Every product you post afterwards will have a link towards your facebook profile."
  },
  {
    question: "How do I contact a seller?",
    answer: "On any product page, you'll find a 'Contact Seller' button. Click it to be directed to the seller's Facebook profile where you can message them directly."
  },
  {
    question: "Is there a fee for selling?",
    answer: "Currently, listing and selling products on our marketplace is completely free. We encourage fair pricing and direct communication between buyers and sellers."
  },
  {
    question: "What payment methods are accepted?",
    answer: "Payment methods are arranged directly between buyers and sellers. We recommend discussing payment options with the seller before making a purchase."
  },
  {
    question: "How do I report an issue?",
    answer: "If you encounter any problems, please use the feedback form below to report the issue. Include as much detail as possible to help us address your concern quickly."
  }
]

export function FAQs() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

