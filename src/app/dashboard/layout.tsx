
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { SidebarNav } from '@/components/dashboard/SidebarNav';
import { Loader2 } from 'lucide-react';
import { 
  SidebarProvider, 
  SidebarInset,
  SidebarTrigger as ShadcnSidebarTrigger 
} from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, loading, isAdmin } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    console.log(`[DashboardLayout] useEffect: loading=${loading}, currentUser email=${currentUser?.email}, isAdmin=${isAdmin}`);
    if (!loading) {
      if (!currentUser || !isAdmin) { 
        console.log('[DashboardLayout] Not admin or no user, redirecting to /login.');
        router.replace('/login');
      } else {
        console.log('[DashboardLayout] User is admin, proceeding to render dashboard.');
      }
    }
  }, [currentUser, loading, isAdmin, router]);

  if (loading) {
    console.log('[DashboardLayout] Auth loading state, showing loader.');
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
     console.log('[DashboardLayout] Guard: Not admin or no user after loading. Will be redirected by useEffect. Showing loader.');
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  console.log(`[DashboardLayout] Rendering dashboard content for admin user: ${currentUser.email}`);
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <SidebarNav />
        <SidebarInset className="flex-1 bg-background">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:justify-end">
            <ShadcnSidebarTrigger className="md:hidden" /> 
            <div className="text-lg font-semibold text-foreground">
              {/* Placeholder for current page title, can be dynamic */}
            </div>
          </header>
          <main className="p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
