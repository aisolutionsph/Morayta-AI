import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import SellForm from './SellForm'

export default async function SellPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const userInfo = {
    name: user.fullName || '',
    email: user.primaryEmailAddress?.emailAddress || '',
  }

  return <SellForm userInfo={userInfo} />
}

