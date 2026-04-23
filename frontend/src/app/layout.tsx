
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "scroll-smooth", plusJakarta.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen selection:bg-brand-dark selection:text-white flex flex-col font-sans">
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
