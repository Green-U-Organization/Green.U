import type { Metadata } from "next";
import { Geist, Geist_Mono, Jersey_15 } from "next/font/google";
import "./globals.css";
import ThemeApp from "@/components/ThemeApp";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jersey15 = Jersey_15({
  variable: "--font-jersey",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Green-U",
  description: "Welcome to Green-U, a modern and elegant platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${jersey15.variable} antialiased`}>
        
        <Navbar />
        <ThemeApp className='pt-15'>{children}</ThemeApp>

      </body>
    </html>
  );
}
