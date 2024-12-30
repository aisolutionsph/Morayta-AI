'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CartItem, removeFromCart, getSellerProfile } from '@/app/actions/sellerProfile'

interface CartItemsProps {
  cart: CartItem[];
  userEmail: string;
}

export function CartItems({ cart: initialCart, userEmail }: CartItemsProps) {
  const [cartItems, setCartItems] = useState(initialCart);

  useEffect(() => {
    async function fetchLatestCart() {
      const profile = await getSellerProfile(userEmail);
      if (profile && profile.cart) {
        setCartItems(profile.cart);
      }
    }
    fetchLatestCart();
  }, [userEmail]);

  const handleRemoveItem = async (productId: string) => {
    const result = await removeFromCart(userEmail, productId)
    if (result.success) {
      setCartItems(cartItems.filter(item => item.product_id !== productId))
    } else {
      alert('Failed to remove item from cart')
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <Card key={item.product_id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₱{item.price.toFixed(2)}</p>
                <p>Subtotal: ₱{(item.price * item.quantity).toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" onClick={() => handleRemoveItem(item.product_id)}>
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
          <div className="text-xl font-bold">
            Total: ₱{total.toFixed(2)}
          </div>
          <Button className="w-full">Proceed to Checkout</Button>
        </div>
      )}
    </div>
  )
}

