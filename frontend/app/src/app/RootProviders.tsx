'use client';

import type { PublicWebsiteSettings } from '@/api/site-settings';
import type { BootstrapStatus } from '@/api/system';
import { getMe, type MeInfo } from '@/api/users';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { ChatsProvider } from '@/components/chat/chat-hooks';
import { BootstrapStatusProvider } from '@/components/system/BootstrapStatusProvider';
import { Toaster } from '@/components/ui/sonner';
import { SettingProvider } from '@/components/website-setting-provider';
import { type ExperimentalFeatures, ExperimentalFeaturesProvider } from '@/experimental/experimental-features-provider';
import { cn } from '@/lib/utils';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import useSWR from 'swr';

export interface RootProvidersProps {
  me: MeInfo | undefined;
  children: ReactNode;
  settings: PublicWebsiteSettings;
  bootstrapStatus: BootstrapStatus;
  experimentalFeatures: Partial<ExperimentalFeatures>;
}

export function RootProviders ({ me, settings, bootstrapStatus, experimentalFeatures, children }: RootProvidersProps) {
  const { data, isValidating, isLoading, mutate } = useSWR('api.users.me', getMe, {
    fallbackData: me,
    revalidateOnMount: false,
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
          <ExperimentalFeaturesProvider features={experimentalFeatures}>
            <AuthProvider me={data} isLoading={isLoading} isValidating={isValidating} reload={() => mutate(data, { revalidate: true })}>
              <ChatsProvider>
                {children}
                <Toaster cn={cn} />
              </ChatsProvider>
            </AuthProvider>
          </ExperimentalFeaturesProvider>
        </SettingProvider>
      </ThemeProvider>
    </BootstrapStatusProvider>
  );
}
