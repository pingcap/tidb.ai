'use client';

import type { PublicWebsiteSettings } from '@/api/site-settings';
import type { BootstrapStatus, RequiredBootstrapStatus } from '@/api/system';
import { getMe, type MeInfo } from '@/api/users';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { ChatsProvider } from '@/components/chat/chat-hooks';
import { BootstrapStatusProvider } from '@/components/system/BootstrapStatusProvider';
import { Toaster } from '@/components/ui/sonner';
import { SettingProvider } from '@/components/website-setting-provider';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import useSWR from 'swr';

export interface RootProvidersProps {
  me: MeInfo | undefined;
  children: ReactNode;
  settings: PublicWebsiteSettings;
  bootstrapStatus: BootstrapStatus;
}

export function RootProviders ({ me, settings, bootstrapStatus, children }: RootProvidersProps) {
  const { data, isValidating, isLoading } = useSWR('api.users.me', getMe, {
    fallbackData: me,
    revalidateOnMount: !me,
    revalidateOnFocus: false,
    errorRetryCount: 0,
  });

  return (
    <BootstrapStatusProvider bootstrapStatus={bootstrapStatus}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <SettingProvider
          value={settings}>
          <AuthProvider me={data} isLoading={isLoading} isValidating={isValidating}>
            <ChatsProvider>
              {children}
              <Toaster />
            </ChatsProvider>
          </AuthProvider>
        </SettingProvider>
      </ThemeProvider>
    </BootstrapStatusProvider>
  );
}
