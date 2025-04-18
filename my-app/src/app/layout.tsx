import type { Metadata } from 'next';
import { Geist, Geist_Mono, Jersey_15 } from 'next/font/google';
import './globals.css';
import ThemeApp from '@/components/ThemeApp';
import Navbar from '@/components/UI/Navbar';
import { LanguageProvider } from '@/app/contexts/LanguageProvider';
import { StoreProvider } from '@/redux/StoreProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const jersey15 = Jersey_15({
  variable: '--font-jersey',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Green-U',
  description:
    'Welcome to Green-U, the collaborative market gardening platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en" className="bg-white">
        <body
          className={`pt-15 ${geistSans.variable} ${geistMono.variable} ${jersey15.variable} antialiased`}
        >
          <LanguageProvider>
            <Navbar />
            <ThemeApp>{children}</ThemeApp>
          </LanguageProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
