'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSellerSales } from '@/app/actions/getSellerSales'

export function SalesOverview({ userEmail }: { userEmail: string }) {
  const [sales, setSales] = useState([])

  useEffect(() => {
    async function fetchSales() {
      const fetchedSales = await getSellerSales(userEmail)
      setSales(fetchedSales)
    }
    fetchSales()
  }, [userEmail])

  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Sales Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₱{totalSales.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{sales.length}</p>
          </CardContent>
        </Card>
      </div>
      <h3 className="text-xl font-semibold mt-8 mb-4">Recent Sales</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Order ID</th>
              <th className="text-left p-2">Product</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b">
                <td className="p-2">{sale.id}</td>
                <td className="p-2">{sale.product_title}</td>
                <td className="p-2">₱{sale.amount.toFixed(2)}</td>
                <td className="p-2">{new Date(sale.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

