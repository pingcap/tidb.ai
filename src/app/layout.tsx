import { auth } from '@/app/api/auth/[...nextauth]/auth';
import AnonymousSessionProvider from '@/components/anonymous-session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Noto_Sans as Font } from 'next/font/google';
import './globals.css';

const font = Font({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: 'RAG Template',
  description: 'TiDB Cloud!',
};

export default async function RootLayout ({
  children,
}: {
  children: React.ReactNode,
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      <link rel="icon" href="/tidb-ai-light.svg" sizes="any" />
      {/*<script async src="https://conversation-search-box-git-test-cookie-shczhen-pingcap.vercel.app/assets/index-KaY9SOi_.js" />*/}
    </head>
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
