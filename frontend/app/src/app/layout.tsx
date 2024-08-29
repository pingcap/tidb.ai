import { getPublicSiteSettings } from '@/api/site-settings';
import { getBootstrapStatus } from '@/api/system';
import { RootProviders } from '@/app/RootProviders';
import { SystemWizardDialog } from '@/components/system/SystemWizardDialog';
import { experimentalFeatures } from '@/experimental/experimental-features';
import { auth } from '@/lib/auth';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { cache, type ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

const cachedGetSettings = cache(getPublicSiteSettings);

export async function generateMetadata (): Promise<Metadata> {
  const { title, description } = await cachedGetSettings();
  return {
    title,
    description,
    icons: '/favicon.svg',
  };
};

export default async function RootLayout ({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [
    me,
    settings,
    bootstrapStatus,
  ] = await Promise.all([
    auth(),
    cachedGetSettings(),
    getBootstrapStatus(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
    <RootProviders me={me} settings={settings} bootstrapStatus={bootstrapStatus} experimentalFeatures={experimentalFeatures()}>
      {children}
      <SystemWizardDialog />
    </RootProviders>
    {settings.ga_id && <GoogleAnalytics gaId={settings.ga_id} />}
    <Script async src="/widget.js" />
    </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
