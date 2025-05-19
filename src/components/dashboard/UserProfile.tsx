"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { signOutUser } from "@/app/actions/auth.actions";
import { LogOut, UserCircle, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function UserProfile() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const result = await signOutUser();
    if (result.success) {
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      router.push('/login');
    } else {
      toast({
        variant: "destructive",
        title: "Sign Out Failed",
        description: result.error || "Could not sign out.",
      });
    }
  };

  if (!currentUser) return null;

  const userInitial = currentUser.email ? currentUser.email[0].toUpperCase() : (currentUser.displayName ? currentUser.displayName[0].toUpperCase() : "U");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex h-auto w-full items-center justify-start gap-3 p-2 text-left group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
          aria-label="User menu"
        >
          <Avatar className="size-9 group-data-[collapsible=icon]:size-7">
            {currentUser.photoURL && <AvatarImage src={currentUser.photoURL} alt={currentUser.displayName || "User avatar"} />}
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground truncate max-w-[150px]">
              {currentUser.displayName || currentUser.email}
            </span>
            <span className="text-xs text-sidebar-foreground/70">Administrator</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="w-56 bg-card shadow-lg rounded-md">
        <DropdownMenuLabel className="font-medium text-card-foreground">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="cursor-not-allowed">
          <UserCircle className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="cursor-not-allowed">
          <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
