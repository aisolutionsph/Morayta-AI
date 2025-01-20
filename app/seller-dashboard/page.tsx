import { unstable_noStore as noStore } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductListings } from "@/components/ProductListings"
import { SalesOverview } from "@/components/SalesOverview"
import { ProfileInfo } from "@/components/ProfileInfo"
import { CartItems } from "@/components/CartItems"
import { getSellerProfile } from "../actions/sellerProfile"

export default async function SellerDashboard() {
  noStore(); // This prevents the page from being cached

  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const userEmail = user.primaryEmailAddress?.emailAddress

  if (!userEmail) {
    return <div>Error: User email not found</div>
  }

  const profile = await getSellerProfile(userEmail)

  if (!profile) {
    return <div>Error: Profile not found, list at least one product through clicking on "Start Selling" button on the homepage to initiate a seller dashboard profile. Head to home page by clicking the logo on the upper left portion of this page.</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <Tabs defaultValue="listings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="listings">Product Listings</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="cart">Cart</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="listings">
          <ProductListings userEmail={userEmail} />
        </TabsContent>
        <TabsContent value="sales">
          <SalesOverview userEmail={userEmail} />
        </TabsContent>
        <TabsContent value="cart">
          <CartItems cart={profile.cart || []} userEmail={userEmail} />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileInfo userEmail={userEmail} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

