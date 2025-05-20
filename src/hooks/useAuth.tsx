
"use client";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import type { FC, ReactNode } from "react";
import React, { useEffect, useState, useContext, createContext } from "react";
import { auth } from "@/lib/firebase/config";
import { Loader2 } from "lucide-react";
import { ADMIN_EMAIL } from "@/lib/constants"; // Using a constants file

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('[AuthProvider] onAuthStateChanged triggered. User email:', user?.email, 'UID:', user?.uid);
      setCurrentUser(user);
      if (user && user.email) {
        const isAdminUser = user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        setIsAdmin(isAdminUser);
        console.log(`[AuthProvider] User email: ${user.email.toLowerCase()}, ADMIN_EMAIL: ${ADMIN_EMAIL.toLowerCase()}. Calculated isAdmin: ${isAdminUser}`);
      } else {
        setIsAdmin(false);
        console.log('[AuthProvider] No user or no email, isAdmin set to false.');
      }
      setLoading(false);
      // Log the state *after* all updates within this callback
      const finalIsAdmin = user && user.email ? (user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) : false;
      console.log(`[AuthProvider] State updated. currentUser email: ${user?.email}, loading: false, isAdmin: ${finalIsAdmin}`);
    });
    console.log('[AuthProvider] Setting up onAuthStateChanged listener.');
    return () => {
      console.log('[AuthProvider] Unsubscribing from onAuthStateChanged.');
      unsubscribe();
    };
  }, []); // Empty dependency array is correct here, onAuthStateChanged handles updates.

  // Initial loading state until Firebase auth check completes
  if (loading && typeof window !== 'undefined') { // Check for window to avoid SSR issues with initial loader
    console.log('[AuthProvider] Initial load: Showing global loader.');
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  console.log(`[AuthProvider] Rendering children. currentUser: ${currentUser?.email}, loading: ${loading}, isAdmin: ${isAdmin}`);
  return (
    <AuthContext.Provider value={{ currentUser, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
