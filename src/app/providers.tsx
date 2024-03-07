'use client';

import AnonymousSessionProvider from '@/components/anonymous-session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { WebsiteSettingProvider } from '@/components/website-setting-provider';
import { IWebsiteSettingResult } from '@/core/schema/setting';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

export interface ProvidersProps {
  session: Session;
  website: IWebsiteSettingResult;
  children: ReactNode;
}

export function Providers ({ session, website, children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <AnonymousSessionProvider>
          <WebsiteSettingProvider value={website}>
            {children}
          </WebsiteSettingProvider>
        </AnonymousSessionProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}