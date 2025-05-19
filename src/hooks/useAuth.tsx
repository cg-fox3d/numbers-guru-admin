
"use client";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import type { FC, ReactNode } from "react";
import React, { useEffect, useState, useContext, createContext } from "react";
import { auth } from "@/lib/firebase/config";
import { Loader2 } from "lucide-react";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "admin@numbersguru.com"; // Ensure this is the correct admin email

export const AuthProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('[AuthProvider] onAuthStateChanged triggered. User email:', user?.email);
      setCurrentUser(user);
      if (user && user.email) {
        const isAdminUser = user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        setIsAdmin(isAdminUser);
        console.log(`[AuthProvider] User email: ${user.email.toLowerCase()}, ADMIN_EMAIL: ${ADMIN_EMAIL.toLowerCase()}, Calculated isAdmin: ${isAdminUser}`);
      } else {
        setIsAdmin(false);
        console.log('[AuthProvider] No user or no email, isAdmin set to false.');
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Log state before rendering children for clarity
  // console.log('[AuthProvider] Rendering children. currentUser:', currentUser?.email, 'loading:', loading, 'isAdmin:', isAdmin);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

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
