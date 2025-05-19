
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { currentUser, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (currentUser && isAdmin) {
        router.replace('/dashboard');
      } else if (currentUser && !isAdmin) {
        // If user is logged in but not admin, send to login (which might show an error)
        // or a specific "access denied" page if you had one.
        // For now, sending to /login ensures they are signed out or can try again.
        router.replace('/login'); 
      }
      else {
        router.replace('/login');
      }
    }
  }, [currentUser, loading, isAdmin, router]);

  // Show loader if loading is true, or if not loading but redirection hasn't happened yet.
  // The useEffect handles redirection once loading is false and states are set.
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
