import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Providers } from '@/app/providers';
import { Toaster } from '@/components/ui/toaster';
import { GroupName } from '@/core/schema/settings';
import { getSetting } from '@/core/services/setting';
import type { Metadata } from 'next';
import { Noto_Sans as Font } from 'next/font/google';
import './globals.css';
import './more.css';
import Script from 'next/script';

const font = Font({ subsets: ['latin', 'latin-ext'] });

export async function generateMetadata (): Promise<Metadata> {
  // TODO: react cache is only for per request, need global cache to optimize performance.
  const setting = await getSetting(GroupName.enum.website);

  return {
    title: setting?.title || 'RAG Template',
    description: setting?.description || 'Hello TiDB Cloud!',
    icons: [
      {
        url: setting?.logo_in_dark_mode || setting?.logo_in_light_mode || '/tidb-ai-light.svg',
      },
    ],
  };
}

export default async function RootLayout ({
  children,
}: {
  children: React.ReactNode,
}) {

  const [session, website, security, custom_js] = await Promise.all([
    auth(),
    getSetting('website'),
    getSetting('security'),
    getSetting('custom_js'),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      <link rel="icon" href="/tidb-ai-light.svg" sizes="any" />
      <Script
        id='tidb-ai-widget'
        strategy="lazyOnload"
        src="/rag-widget.js"
        data-id="tidb-ai-widget"
        data-name="tidb-ai-widget"
        data-btn-label={custom_js.button_label || 'Ask AI'}
        data-btn-img-src={custom_js.button_img_src || 'https://tidb.ai/tidb-ai.svg'}
        data-example-questions={custom_js.example_questions ? JSON.stringify(custom_js.example_questions.map(question => question.text)) : '["What is TiDB","Does TiDB support Foreign Key","What is TiDB Serverless","How to use TiDB Serverless"]'}
        data-logo-src={custom_js.logo_src || 'https://tidb.ai/tidb-ai.svg'}
        data-preferred-mode={custom_js.widget_color_mode || 'system'}
        data-input-placeholder={custom_js.widget_input_placeholder}
        data-site-key={custom_js.widget_site_key}
        data-title={custom_js.widget_title}
        data-security-mode={custom_js.widget_security_mode}
      />
      {security?.google_recaptcha_site_key && security?.google_recaptcha && (<ReCaptcha mode={security.google_recaptcha} siteKey={security.google_recaptcha_site_key} />)}
    </head>
    <body className={font.className}>
    <Providers session={session} website={website} security={security} custom_js={custom_js}>
      {children}
    </Providers>
    <Toaster />
    </body>
    </html>
  );
}

const ReCaptcha = (props: { siteKey: string; mode: 'v3' | 'enterprise' }) => {
  if (props.mode === 'v3') {
    return (
      <Script
        strategy="beforeInteractive"
        src={`https://www.google.com/recaptcha/api.js?render=${props.siteKey}`}
      ></Script>
    );
  } else if (props.mode === 'enterprise') {
    return (
      <Script
        id="google_recaptcha_enterprise"
        strategy="beforeInteractive"
        src={`https://www.google.com/recaptcha/enterprise.js?render=${props.siteKey}`}
      ></Script>
    );
  }
  return <></>;
};
