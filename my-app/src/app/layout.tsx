import type { Metadata } from 'next';
import { Geist, Geist_Mono, Jersey_15 } from 'next/font/google';
import './globals.css';
import ThemeApp from '@/components/ThemeApp';
import { LanguageProvider } from '@/app/contexts/LanguageProvider';
import { StoreProvider } from '@/redux/StoreProvider';
import BugReport from '@/components/Atom/BugReport';

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
          className={`${geistSans.variable} ${geistMono.variable} ${jersey15.variable} antialiased`}
        >
          <LanguageProvider>
            <BugReport />
            {/* <Navbar /> */}
            <ThemeApp>{children}</ThemeApp>
          </LanguageProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
