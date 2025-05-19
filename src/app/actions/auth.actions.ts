
"use server";

import { auth } from "@/lib/firebase/config";
import { signInWithEmailAndPassword, signOut, AuthError } from "firebase/auth";

interface ActionResult {
  success: boolean;
  error?: string;
}

const ADMIN_EMAIL = "admin@numbersguru.com";

async function isUserAdmin(email: string | null | undefined): Promise<boolean> {
  if (!email) {
    return false;
  }
  return email.toLowerCase() === ADMIN_EMAIL;
}


export async function signInWithEmail(email: string, password: string): Promise<ActionResult> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    const isAdmin = await isUserAdmin(userCredential.user.email);
    if (!isAdmin) {
      await signOut(auth); // Sign out non-admin users immediately
      return { success: false, error: "Access denied. User is not authorized as an admin." };
    }

    return { success: true };
  } catch (error) {
    const authError = error as AuthError;
    let errorMessage = "An unknown error occurred during sign-in.";
    switch (authError.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email address format.";
        break;
      case "auth/user-disabled":
        errorMessage = "This user account has been disabled.";
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        errorMessage = "Invalid email or password.";
        break;
      default:
        errorMessage = authError.message || errorMessage;
        break;
    }
    return { success: false, error: errorMessage };
  }
}

export async function signOutUser(): Promise<ActionResult> {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Failed to sign out." };
  }
}

