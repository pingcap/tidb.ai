'use client';

import AnonymousSessionProvider from '@/components/anonymous-session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { WebsiteSettingProvider } from '@/components/website-setting-provider';
import { SecuritySettingProvider } from '@/components/security-setting-provider';
import { IWebsiteSettingResult, ISecuritySettingResult } from '@/core/schema/setting';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

export interface ProvidersProps {
  session: Session;
  website: IWebsiteSettingResult;
  security: ISecuritySettingResult;
  children: ReactNode;
}

export function Providers ({ session, website, security, children }: ProvidersProps) {
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
            <SecuritySettingProvider value={security}>
              {children}
            </SecuritySettingProvider>
          </WebsiteSettingProvider>
        </AnonymousSessionProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}