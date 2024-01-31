import { auth } from '@/app/api/auth/[...nextauth]/auth';
import AnonymousSessionProvider from '@/components/anonymous-session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import {  Noto_Sans as Font } from 'next/font/google';
import './globals.css';

const font = Font({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: 'RAG Template',
  description: 'TiDB Cloud!',
  icons: [
    '/tidb-ai.svg',
  ],
};

export default async function RootLayout ({
  children,
}: {
  children: React.ReactNode,
}) {
  const session = await auth();

  return (
    <html lang="en">
    <body className={font.className}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <AnonymousSessionProvider>
          {children}
        </AnonymousSessionProvider>
      </SessionProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
