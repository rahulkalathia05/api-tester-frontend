import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

// Load Toaster only on the client — it renders a portal that causes
// a server/client HTML mismatch when SSR'd alongside Next.js layouts.
const Toaster = dynamic(
  () => import("sonner").then((m) => m.Toaster),
  { ssr: false }
);

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "API Tester — AI-Powered API Testing",
  description: "Test, debug, and analyze your APIs with AI-powered insights.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
