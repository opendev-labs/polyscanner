"use client";

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from './providers/auth-provider'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ThemeProvider>
        </SessionProvider>
    )
}
