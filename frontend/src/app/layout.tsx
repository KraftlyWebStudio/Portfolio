import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Cursor } from "@/components/layout/Cursor";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Kraftly — Web Development Studio | High-Performance Digital Experiences",
  description:
    "Kraftly is a specialized web development studio focused on high-performance builds, interactive UI implementation, and clean code. We build for the future.",
  keywords: ["web development", "next.js studio", "interactive ui", "performance optimization", "clean code", "Kraftly"],
  openGraph: {
    title: "Kraftly — Web Development Studio",
    description: "We build fast, modern, high-impact web experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kraftly — Web Development Studio",
    description: "We build fast, modern, high-impact web experiences.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased scroll-smooth",
        geist.variable,
        plusJakarta.variable
      )}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen bg-black text-white flex flex-col font-sans selection:bg-teal-500/30 selection:text-white">
        <SmoothScrollProvider>
          <Cursor />
          <div className="flex-1 flex flex-col">{children}</div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
