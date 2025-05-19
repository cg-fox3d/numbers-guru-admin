
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
  isAdmin: boolean; // Simplified admin check for this scaffold
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log('AuthProvider: useEffect mounting. Setting up onAuthStateChanged.');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('AuthProvider: onAuthStateChanged fired. User:', user ? user.email : null);
      setCurrentUser(user);
      // In a real application, you would implement logic here to verify
      // if the authenticated user is an administrator.
      // This could involve checking custom claims, a database role, or an email whitelist.
      // For this scaffold, any authenticated user is considered an admin.
      setIsAdmin(!!user); 
      setLoading(false);
      console.log('AuthProvider: State updated. currentUser:', user ? user.email : null, 'loading:', false, 'isAdmin:', !!user);
    });
    return () => {
      console.log('AuthProvider: useEffect unmounting. Unsubscribing from onAuthStateChanged.');
      unsubscribe();
    };
  }, []);

  if (loading) {
    console.log('AuthProvider: Rendering global loader because loading is true.');
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  console.log('AuthProvider: Rendering children. currentUser:', currentUser ? currentUser.email : null, 'loading:', loading);
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

