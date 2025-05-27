import type { Metadata } from 'next';
import { Geist, Geist_Mono, Jersey_15 } from 'next/font/google';
import './globals.css';
import ThemeApp from '@/components/ThemeApp';
import { LanguageProvider } from '@/app/contexts/LanguageProvider';
import { StoreProvider } from '@/redux/StoreProvider';
import SlideMenu from '@/components/Molecule/SlideMenu';
import { Toaster } from 'react-hot-toast';

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
      <html lang="en" className="bg-extbutton">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${jersey15.variable} antialiased`}
        >
          <LanguageProvider>
            <SlideMenu />
            <ThemeApp>{children}</ThemeApp>
            <Toaster position="top-right" reverseOrder={false} />
          </LanguageProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
