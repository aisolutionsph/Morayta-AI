'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { addToCart,CartItem } from '@/app/actions/sellerProfile'
import { useUser } from '@clerk/nextjs';

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { user } = useUser();

  const handleAddToCart = async () => {
    setIsAdding(true);
    const item: CartItem = {
      product_id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1
    };

    if (!user || !user.primaryEmailAddress) {
      alert('Please sign in to add items to your cart');
      setIsAdding(false);
      return;
    }

    const userEmail = user.primaryEmailAddress.emailAddress;

    const result = await addToCart(userEmail, item);
    if (result.success) {
      alert('Product added to cart');
    } else {
      alert('Failed to add product to cart');
    }
    setIsAdding(false);
  };

  return (
    <Button 
      onClick={handleAddToCart} 
      disabled={isAdding}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}

