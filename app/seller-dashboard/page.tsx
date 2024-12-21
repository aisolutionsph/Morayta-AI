import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductListings } from "@/components/ProductListings"
import { SalesOverview } from "@/components/SalesOverview"
import { ProfileInfo } from "@/components/ProfileInfo"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function SellerDashboard() {
  const user = await currentUser()

  if (!user || !user.primaryEmailAddress) {
    redirect('/sign-in')
  }

  const userEmail = user.primaryEmailAddress.emailAddress

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <Tabs defaultValue="listings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="listings">Product Listings</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="listings">
          <ProductListings userEmail={userEmail} />
        </TabsContent>
        <TabsContent value="sales">
          <SalesOverview userEmail={userEmail} />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileInfo userEmail={userEmail} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

