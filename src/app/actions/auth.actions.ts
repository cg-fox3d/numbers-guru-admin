
"use server";

import { auth } from "@/lib/firebase/config";
import { signInWithEmailAndPassword, signOut, AuthError } from "firebase/auth";
import { ADMIN_EMAIL } from "@/lib/constants";

interface ActionResult {
  success: boolean;
  error?: string;
  errorCode?: string; // To pass specific error types like AUTH_ADMIN_REQUIRED
}

async function isUserAdmin(email: string | null | undefined): Promise<boolean> {
  if (!email) {
    console.log("[AuthAction - isUserAdmin] No email provided, returning false.");
    return false;
  }
  const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  console.log(`[AuthAction - isUserAdmin] Checking email: ${email.toLowerCase()}. ADMIN_EMAIL: ${ADMIN_EMAIL.toLowerCase()}. Is admin: ${isAdmin}`);
  return isAdmin;
}


export async function signInWithEmail(email: string, password: string): Promise<ActionResult> {
  console.log(`[AuthAction - signInWithEmail] Attempting login for email: ${email}`);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(`[AuthAction - signInWithEmail] Firebase signInWithEmailAndPassword successful. User UID: ${userCredential.user.uid}, Email: ${userCredential.user.email}`);
    
    const adminCheck = await isUserAdmin(userCredential.user.email);
    if (!adminCheck) {
      console.log(`[AuthAction - signInWithEmail] User ${userCredential.user.email} is NOT an admin. Signing out.`);
      await signOut(auth); // Sign out non-admin users immediately
      console.log("[AuthAction - signInWithEmail] User signed out by server action because not admin.");
      return { success: false, error: "Access denied. User is not authorized as an admin.", errorCode: "AUTH_ADMIN_REQUIRED" };
    }

    console.log(`[AuthAction - signInWithEmail] Admin access granted for ${userCredential.user.email}.`);
    return { success: true };
  } catch (error) {
    const authError = error as AuthError;
    let errorMessage = "An unknown error occurred during sign-in.";
    console.error("[AuthAction - signInWithEmail] Error during sign-in:", authError);

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
    console.log(`[AuthAction - signInWithEmail] Login failed for ${email}. Error: ${errorMessage}, Code: ${authError.code}`);
    return { success: false, error: errorMessage, errorCode: authError.code };
  }
}

export async function signOutUser(): Promise<ActionResult> {
  try {
    console.log("[AuthAction - signOutUser] Attempting to sign out current user.");
    await signOut(auth);
    console.log("[AuthAction - signOutUser] User signed out successfully via action.");
    return { success: true };
  } catch (error) {
    console.error("[AuthAction - signOutUser] Error signing out:", error);
    return { success: false, error: (error as Error).message || "Failed to sign out." };
  }
}
