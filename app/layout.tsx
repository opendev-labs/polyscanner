import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Polyscan | Prediction & Probability Intelligence",
    description: "Aggregating prediction markets and probability signals into actionable intelligence.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white">
                {children}
            </body>
        </html>
    );
}
