'use client';

import AnonymousSessionProvider from '@/components/anonymous-session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { SettingProvider } from '@/components/website-setting-provider';
import { type SettingGroups } from '@/core/schema/setting';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

export interface ProvidersProps extends SettingGroups {
  session: Session;
  children: ReactNode;
}

export function Providers ({ session, children, ...settingGroups }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <AnonymousSessionProvider>
          <SettingProvider value={settingGroups}>
            {children}
          </SettingProvider>
        </AnonymousSessionProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}