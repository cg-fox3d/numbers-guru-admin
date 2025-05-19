"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { currentUser, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for loading to finish before redirecting
    if (!loading) {
      if (currentUser && isAdmin) {
        router.replace('/dashboard');
      } else {
        // If not an admin or not logged in, redirect to login
        router.replace('/login');
      }
    }
  }, [currentUser, isAdmin, loading, router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-center">
      <Loader2 className="mb-4 h-16 w-16 animate-spin text-primary" />
      <h1 className="text-2xl font-semibold text-foreground">ShopWave Admin Center</h1>
      <p className="mt-2 text-muted-foreground">Loading your experience...</p>
    </div>
  );
}
