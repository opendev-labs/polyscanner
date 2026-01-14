import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub,
        Google,
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // This is a placeholder for actual credential validation logic.
                // In a real app, you would verify against a database.
                if (credentials?.email && credentials?.password) {
                    return { id: "1", name: "Alpha Trader", email: credentials.email as string }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith("/master") ||
                nextUrl.pathname.startsWith("/screeners") ||
                nextUrl.pathname.startsWith("/leo")

            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn && nextUrl.pathname === "/signin") {
                return Response.redirect(new URL("/master", nextUrl))
            }
            return true
        },
    },
})
