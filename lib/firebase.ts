import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only on client-side
let app: FirebaseApp | undefined;
let auth: Auth | null = null;
let analytics: Promise<Analytics | null> | null = null;

if (typeof window !== 'undefined') {
    try {
        const hasConfig = firebaseConfig.apiKey && firebaseConfig.projectId;

        if (hasConfig) {
            app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
            auth = getAuth(app);
            analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
            console.log("Firebase initialized successfully");
        } else {
            console.warn("Firebase config missing or incomplete. Auth features will be disabled.");
        }
    } catch (error) {
        console.error("Failed to initialize Firebase:", error);
    }
}

export { auth, analytics };
export default app;
