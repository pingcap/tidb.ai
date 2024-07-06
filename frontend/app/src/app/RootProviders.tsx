'use client';

import { getMe, type MeInfo } from '@/api/users';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { SettingProvider } from '@/components/website-setting-provider';
import { defaultWebsiteSetting } from '@/core/schema/settings/website';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import useSWR from 'swr';

export interface RootProvidersProps {
  me: MeInfo | undefined;
  children: ReactNode;
}

export function RootProviders ({ me, children }: RootProvidersProps) {
  const { data, isValidating, isLoading } = useSWR('api.users.me', getMe, { fallbackData: me, revalidateOnMount: !me, revalidateOnFocus: false });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SettingProvider
        value={{
          website: defaultWebsiteSetting,
          security: {},
          custom_js: {},
        }}>
        <AuthProvider me={data} isLoading={isLoading} isValidating={isValidating}>
          {children}
        </AuthProvider>
      </SettingProvider>
    </ThemeProvider>
  );
}
