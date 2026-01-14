"use client";

import React, { createContext, useContext } from "react";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";

interface AuthContextType {
    user: any;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    const handleSignOut = async () => {
        try {
            await nextAuthSignOut({ callbackUrl: "/signin" });
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user: session?.user ?? null, loading, signOut: handleSignOut }}>
            {children}
        </AuthContext.Provider>
    );
}
