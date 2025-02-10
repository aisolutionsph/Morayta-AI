"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addToCart, type CartItem } from "@/app/actions/sellerProfile";
import { SignIn, SignInButton, useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast"; // Updated import path
import { ToastAction } from "@/components/ui/toast"; // Added ToastAction import
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    if (!user || !user.primaryEmailAddress) {
      setShowAuthDialog(true);
      return;
    }

    setIsAdding(true);
    const item: CartItem = {
      product_id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    };

    const userEmail = user.primaryEmailAddress.emailAddress;

    const result = await addToCart(userEmail, item);
    if (result.success) {
      toast({
        title: "Added to Cart",
        description: `${product.title} has been added to your cart`,
        action: <ToastAction altText="View cart">View Cart</ToastAction>,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add product to cart",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    setIsAdding(false);
  };

  return (
    <>
      <Button onClick={handleAddToCart} disabled={isAdding}>
        {isAdding ? "Adding..." : "Add to Cart"}
      </Button>

      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Authentication Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please sign in to add items to your cart. This helps us manage
              your shopping experience and keep track of your orders.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <SignInButton>
              <Button>
                Sign in using FEU Email
              </Button>
            </SignInButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
