
"use client";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import type { FC, ReactNode } from "react";
import React, { useEffect, useState, useContext, createContext } from "react";
import { auth } from "@/lib/firebase/config";
// Loader2 removed as AuthProvider will no longer render a global loader
import { ADMIN_EMAIL } from "@/lib/constants"; 

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
    console.log('[AuthProvider] Setting up onAuthStateChanged listener.');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(`[AuthProvider] onAuthStateChanged triggered. User email: ${user?.email}, UID: ${user?.uid}`);
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
      const finalIsAdmin = user && user.email ? (user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) : false;
      console.log(`[AuthProvider] State updated after onAuthStateChanged. currentUser email: ${user?.email}, loading: false, isAdmin: ${finalIsAdmin}`);
    });
    
    return () => {
      console.log('[AuthProvider] Unsubscribing from onAuthStateChanged.');
      unsubscribe();
    };
  }, []);

  // Removed the conditional global loader block that was causing hydration issues.
  // Individual pages/layouts will handle their own loading UI based on the 'loading' state from this context.

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

