'use client'

import { useUser } from "@clerk/nextjs";
import AnonymousUser from "./anonymous-user";

export default function ClerkWrapper({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <AnonymousUser />;
  }

  return <>{children}</>;
}

