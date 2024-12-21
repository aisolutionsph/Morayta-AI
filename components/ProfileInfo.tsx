'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getSellerProfile, updateSellerProfile } from '@/app/actions/sellerProfile'
import { UserButton } from '@clerk/nextjs'

export function ProfileInfo({ userEmail }: { userEmail: string }) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: ''
  })

  useEffect(() => {
    async function fetchProfile() {
      const fetchedProfile = await getSellerProfile(userEmail)
      if (fetchedProfile) {
        setProfile(fetchedProfile)
      } else {
        // If profile doesn't exist, set email to current seller's email
        setProfile(prev => ({ ...prev, email: userEmail }))
      }
    }
    fetchProfile()
  }, [userEmail])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await updateSellerProfile(userEmail, { name: profile.name, bio: profile.bio })
    if (result.success) {
      alert('Profile updated successfully')
    } else {
      alert('Failed to update profile')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Profile Information</h2>
        <UserButton afterSignOutUrl="/" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={profile.email} 
            disabled
          />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            value={profile.name} 
            onChange={(e) => setProfile({...profile, name: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            value={profile.bio} 
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
          />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  )
}

