
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
  console.log(`[AuthAction - isUserAdmin] Admin check for ${email}: For scaffold, all authenticated users are considered admins.`);
  return true; 
}


export async function signInWithEmail(email: string, password: string): Promise<ActionResult> {
  console.log(`[AuthAction - signInWithEmail] Attempting to sign in user: ${email}`);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(`[AuthAction - signInWithEmail] Firebase signInWithEmailAndPassword successful. User UID: ${userCredential.user.uid}, Email: ${userCredential.user.email}`);
    
    // Post-authentication admin check
    const isAdmin = await isUserAdmin(userCredential.user.email || "");
    if (!isAdmin) {
      console.log(`[AuthAction - signInWithEmail] User ${email} authenticated but is NOT an admin according to isUserAdmin. Signing out.`);
      await signOut(auth);
      return { success: false, error: "Access denied. User is not authorized as an admin." };
    }

    console.log(`[AuthAction - signInWithEmail] User ${email} authenticated and is admin. Returning success.`);
    return { success: true };
  } catch (error) {
    const authError = error as AuthError;
    console.error(`[AuthAction - signInWithEmail] Firebase signInWithEmailAndPassword FAILED for ${email}. Code: ${authError.code}, Message: ${authError.message}`);
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
    console.error(`[AuthAction - signInWithEmail] Returning error: ${errorMessage}`);
    return { success: false, error: errorMessage };
  }
}

export async function signOutUser(): Promise<ActionResult> {
  console.log("[AuthAction - signOutUser] Attempting to sign out user.");
  try {
    await signOut(auth);
    console.log("[AuthAction - signOutUser] Firebase signOut successful.");
    return { success: true };
  } catch (error) {
    console.error(`[AuthAction - signOutUser] Firebase signOut FAILED. Message: ${(error as Error).message}`);
    return { success: false, error: (error as Error).message || "Failed to sign out." };
  }
}
