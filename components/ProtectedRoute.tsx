"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./providers/auth-provider";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/signin");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#020202]">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                    Initializing Security Protocols...
                </p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}
