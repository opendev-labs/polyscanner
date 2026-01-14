import {
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential
} from "firebase/auth";
import { auth } from "./firebase";

// Google OAuth Provider
const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google OAuth popup
 */
export const signInWithGoogle = async (): Promise<UserCredential> => {
    if (!auth) throw new Error("Auth not initialized");
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result;
    } catch (error: any) {
        console.error("Google Sign-In Error:", error);
        throw new Error(error.message || "Failed to sign in with Google");
    }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    if (!auth) throw new Error("Auth not initialized");
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
    } catch (error: any) {
        console.error("Email Sign-In Error:", error);
        throw new Error(error.message || "Invalid credentials");
    }
};

/**
 * Create new user with email and password
 */
export const signUpWithEmail = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    if (!auth) throw new Error("Auth not initialized");
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result;
    } catch (error: any) {
        console.error("Sign-Up Error:", error);
        throw new Error(error.message || "Failed to create account");
    }
};

/**
 * Sign out current user
 */
export const signOutUser = async (): Promise<void> => {
    if (!auth) throw new Error("Auth not initialized");
    try {
        await signOut(auth);
    } catch (error: any) {
        console.error("Sign-Out Error:", error);
        throw new Error(error.message || "Failed to sign out");
    }
};

/**
 * Listen to auth state changes
 */
export const onAuthChange = (callback: (user: User | null) => void) => {
    if (!auth) {
        callback(null);
        return () => { };
    }
    return onAuthStateChanged(auth, callback);
};
