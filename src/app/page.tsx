
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('HomePage useEffect: loading=', loading, 'currentUser object:', currentUser); 
    if (!loading) {
      if (currentUser) {
        console.log('HomePage: User found (email: ' + currentUser.email + '), redirecting to /dashboard');
        router.replace('/dashboard');
      } else {
        console.log('HomePage: No user found after loading, redirecting to /login');
        router.replace('/login');
      }
    } else {
      console.log('HomePage: Still loading auth state...');
    }
    // If loading is true, we do nothing and let the loading spinner show,
    // allowing AuthProvider more time to set currentUser.
  }, [currentUser, loading, router]);

  // Show loader if loading is true.
  // The useEffect handles redirection once loading is false.
  if (loading) {
    console.log('HomePage: Rendering loader because loading is true.');
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
        <Loader2 className="mb-4 h-16 w-16 animate-spin text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">ShopWave Admin Center</h1>
        <p className="mt-2 text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  // If not loading, and useEffect hasn't redirected yet (e.g., initial render before useEffect runs, or if currentUser is resolved)
  // This state should be very brief. We show a generic loader.
  console.log('HomePage: Rendering loader (briefly) while useEffect decides on redirection. currentUser:', currentUser ? currentUser.email : 'null');
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
      <Loader2 className="mb-4 h-16 w-16 animate-spin text-primary" />
      <h1 className="text-2xl font-semibold text-foreground">ShopWave Admin Center</h1>
      <p className="mt-2 text-muted-foreground">Finalizing session...</p>
    </div>
  );
}
