
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { currentUser, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('[HomePage] useEffect triggered. loading:', loading, 'currentUser:', currentUser?.email, 'isAdmin:', isAdmin);
    if (!loading) {
      if (currentUser && isAdmin) {
        console.log('[HomePage] User is admin, redirecting to /dashboard');
        router.replace('/dashboard');
      } else {
        // If there's a current user but they are not admin, or no user at all
        console.log('[HomePage] User not admin or not logged in, redirecting to /login. currentUser:', currentUser?.email, 'isAdmin:', isAdmin);
        router.replace('/login');
      }
    }
  }, [currentUser, loading, isAdmin, router]);

  // Show loader if AuthProvider is loading or if redirection hasn't happened yet.
  if (loading || (currentUser && isAdmin)) { // Show loader while waiting for redirect to dashboard if admin
     console.log('[HomePage] Rendering loader. loading:', loading, 'currentUser:', currentUser?.email, 'isAdmin:', isAdmin);
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
        <Loader2 className="mb-4 h-16 w-16 animate-spin text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">ShopWave Admin Center</h1>
        <p className="mt-2 text-muted-foreground">
          {loading ? "Checking authentication..." : "Finalizing session..."}
        </p>
      </div>
    );
  }
  
  // If not loading and not an admin about to be redirected, it implies we are heading to login
  // or already on login (if this component were to render on /login, which it doesn't by default).
  // Showing a loader here too is fine as useEffect handles the redirect.
  console.log('[HomePage] Rendering loader (likely before login redirect). loading:', loading, 'currentUser:', currentUser?.email, 'isAdmin:', isAdmin);
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
      <Loader2 className="mb-4 h-16 w-16 animate-spin text-primary" />
      <h1 className="text-2xl font-semibold text-foreground">ShopWave Admin Center</h1>
      <p className="mt-2 text-muted-foreground">
        Redirecting...
      </p>
    </div>
  );
}
