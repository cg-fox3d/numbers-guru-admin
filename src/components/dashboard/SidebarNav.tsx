"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  SidebarClose, // Import if using Sheet for mobile, not needed for current setup
} from "@/components/ui/sidebar"; // Using the existing sidebar from shadcn
import { Logo } from "@/components/Logo";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  LayoutGrid, 
  ShoppingCart, 
  Users,
  Home,
  PanelLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar"; // Import useSidebar

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  matchExact?: boolean;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home, matchExact: true },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/categories", label: "Categories", icon: LayoutGrid },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { toggleSidebar, state, isMobile } = useSidebar();


  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
              <Logo className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xl font-semibold text-foreground group-data-[collapsible=icon]:hidden">ShopWave</span>
            </Link>
             {/* SidebarTrigger from shadcn/ui/sidebar is for the main layout usually, this is fine for a toggle inside if needed */}
             {/* Or, if used with Sheet on mobile, it's handled by SidebarProvider */}
          </div>
        </SidebarHeader>

        <SidebarContent className="flex-1 p-2">
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = item.matchExact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <SidebarMenuItem key={item.label}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      asChild={false} // Render as button for styling consistency
                      isActive={isActive}
                      className={cn(
                        "w-full justify-start",
                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                      )}
                      tooltip={{ children: item.label, side: 'right', align: 'center' }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2 border-t border-sidebar-border">
          <UserProfile />
        </SidebarFooter>
    </Sidebar>
  );
}
