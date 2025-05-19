
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { currentUser, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('[HomePage] useEffect triggered. loading:', loading, 'currentUser email:', currentUser?.email, 'isAdmin:', isAdmin);
    if (!loading) {
      if (currentUser && isAdmin) {
        console.log('[HomePage] User is admin, redirecting to /dashboard');
        router.replace('/dashboard');
      } else if (currentUser && !isAdmin) {
        // This case implies a non-admin user is somehow still authenticated client-side.
        // The LoginForm's call to signOutUser should prevent this state from persisting for long.
        // Redirecting to /login will allow them to try again or ensure they are fully signed out.
        console.log('[HomePage] User is logged in but not admin, redirecting to /login to ensure session is cleared for re-login.');
        router.replace('/login');
      }
      else { // No currentUser
        console.log('[HomePage] No authenticated user, redirecting to /login.');
        router.replace('/login');
      }
    }
  }, [currentUser, loading, isAdmin, router]);
 
  console.log('[HomePage] Rendering. loading:', loading, 'currentUser email:', currentUser?.email, 'isAdmin:', isAdmin);
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
      <Loader2 className="mb-4 h-16 w-16 animate-spin text-primary" />
      <h1 className="text-2xl font-semibold text-foreground">ShopWave Admin Center</h1>
      <p className="mt-2 text-muted-foreground">
        {loading ? "Checking authentication..." : "Determining route..."}
      </p>
    </div>
  );
}
