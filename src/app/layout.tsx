import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Vynspire - Modern Blog Platform",
  description: "A vibrant and modern blog platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="vynspire-theme"
        >
          <Navbar />
          <main className="pt-20 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </main>
          <Toaster theme="system" position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
