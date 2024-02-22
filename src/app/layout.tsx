import { auth } from '@/app/api/auth/[...nextauth]/auth';
import AnonymousSessionProvider from '@/components/anonymous-session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import type {Metadata} from 'next';
import { SessionProvider } from 'next-auth/react';
import { Noto_Sans as Font } from 'next/font/google';
import './globals.css';
import './more.css';
import {getCachedSetting} from "@/core/setting";
import WebsiteSettingProvider from "@/components/website-setting-provider";
import {GroupName} from "@/core/schema/setting";
import {Toaster} from "@/components/ui/toaster";

const font = Font({ subsets: ['latin', 'latin-ext'] });

export async function generateMetadata(): Promise<Metadata> {
  // TODO: react cache is only for per request, need global cache to optimize performance.
  const setting = await getCachedSetting(GroupName.enum.website)

  return {
    title: setting?.title || 'RAG Template',
    description: setting?.description || 'Hello TiDB Cloud!',
    icons: [
      {
        url: setting?.logo_in_dark_mode || setting?.logo_in_light_mode  || '/tidb-ai-light.svg',
      }
    ]
  }
}

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
      <script async src="https://conversation-search-box.vercel.app/assets/index-DqdV-xFu.js" />
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
          <WebsiteSettingProvider>
            {children}
          </WebsiteSettingProvider>
        </AnonymousSessionProvider>
      </SessionProvider>
    </ThemeProvider>
    <Toaster />
    </body>
    </html>
  );
}
