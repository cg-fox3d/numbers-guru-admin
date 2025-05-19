
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { SidebarNav } from '@/components/dashboard/SidebarNav';
import { Loader2 } from 'lucide-react';
// PanelLeft was imported but not used directly in this file, SidebarTrigger imports it.
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
  const { currentUser, loading } = useAuth(); // isAdmin is implicitly true if currentUser exists
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) { // If not loading and no user, redirect to login
        router.replace('/login');
      }
    }
  }, [currentUser, loading, router]);

  // If loading, or if not loading but no currentUser (which implies not admin in current setup)
  if (loading || !currentUser) { 
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If we reach here, loading is false and currentUser exists (so isAdmin is true)
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
