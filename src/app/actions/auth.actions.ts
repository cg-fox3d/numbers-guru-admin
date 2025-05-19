"use server";

import { auth } from "@/lib/firebase/config";
import { signInWithEmailAndPassword, signOut, AuthError } from "firebase/auth";

interface ActionResult {
  success: boolean;
  error?: string;
}

// In a real application, you would define your admin list here or fetch it from a secure source.
// For example: const ADMIN_EMAILS = ["admin1@example.com", "superadmin@example.com"];
// Or check custom claims set on the Firebase user.

async function isUserAdmin(email: string): Promise<boolean> {
  // Placeholder admin check: In a real app, verify against a protected list or custom claims.
  // For this scaffold, we assume if Firebase auth is successful, the user is an admin.
  // Example: return ADMIN_EMAILS.includes(email);
  console.log(`Admin check for ${email}: For scaffold, all authenticated users are considered admins.`);
  return true; 
}


export async function signInWithEmail(email: string, password: string): Promise<ActionResult> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Post-authentication admin check
    const isAdmin = await isUserAdmin(userCredential.user.email || "");
    if (!isAdmin) {
      // If user is authenticated by Firebase but not in admin list, sign them out and return error.
      await signOut(auth);
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
