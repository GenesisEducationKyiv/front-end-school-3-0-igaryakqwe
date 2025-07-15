import '@/app/index.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import Header from '@/components/header';
import { ScrollArea } from '@/components/ui/scroll-area';
import Providers from '@/providers';

const interSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Music Platform',
  icons: {
    icon: '/favicon.svg',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interSans.variable} antialiased`}>
        <Suspense>
          <Providers>
            <ScrollArea className="h-[100dvh] flex flex-col">
              <Header />
              {children}
            </ScrollArea>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
