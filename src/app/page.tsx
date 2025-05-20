
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { signOutUser } from './actions/auth.actions'; // Import signOutUser

export default function HomePage() {
  const { currentUser, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(`[HomePage] useEffect: loading=${loading}, currentUser email=${currentUser?.email}, isAdmin=${isAdmin}`);
    if (!loading) {
      if (currentUser && isAdmin) {
        console.log('[HomePage] User is admin, redirecting to /dashboard');
        router.replace('/dashboard');
      } else if (currentUser && !isAdmin) { 
        console.log('[HomePage] User is logged in but NOT admin. Forcing sign out and redirecting to /login.');
        signOutUser().then(() => {
          router.replace('/login');
        }).catch(err => {
          console.error("[HomePage] Error during forced sign out:", err);
          router.replace('/login'); // Still redirect to login
        });
      } else { // No currentUser (implies not isAdmin either)
        console.log('[HomePage] No authenticated user, redirecting to /login.');
        router.replace('/login');
      }
    }
  }, [currentUser, loading, isAdmin, router]);
 
  console.log(`[HomePage] Rendering. loading: ${loading}, currentUser email: ${currentUser?.email}, isAdmin: ${isAdmin}`);
  // Show a loader while waiting for the useEffect to make a decision, especially if loading is true
  if (loading) {
    console.log('[HomePage] Rendering loader (Auth loading).');
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
        <Loader2 className="mb-4 h-16 w-16 animate-spin text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">ShopWave Admin Center</h1>
        <p className="mt-2 text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  // This will be shown briefly if not loading, before useEffect redirects.
  // Or if somehow useEffect logic doesn't catch a case.
  console.log('[HomePage] Rendering loader (briefly) while useEffect decides on redirection.');
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
      <Loader2 className="mb-4 h-16 w-16 animate-spin text-primary" />
      <h1 className="text-2xl font-semibold text-foreground">ShopWave Admin Center</h1>
      <p className="mt-2 text-muted-foreground">Determining route...</p>
    </div>
  );
}
