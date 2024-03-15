import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Providers } from '@/app/providers';
import { Toaster } from '@/components/ui/toaster';
import { GroupName } from '@/core/schema/setting';
import { getCachedSetting, getSetting } from '@/core/setting';
import type { Metadata } from 'next';
import { Noto_Sans as Font } from 'next/font/google';
import './globals.css';
import './more.css';
import Script from 'next/script';

const font = Font({ subsets: ['latin', 'latin-ext'] });

export async function generateMetadata (): Promise<Metadata> {
  // TODO: react cache is only for per request, need global cache to optimize performance.
  const setting = await getCachedSetting(GroupName.enum.website);

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

  const [session, website, security] = await Promise.all([
    auth(),
    getSetting('website'),
    getSetting('security'),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      <link rel="icon" href="/tidb-ai-light.svg" sizes="any" />
      <script
        async
        src="https://tidb.ai/rag-widget.js"
        data-id="tidb-ai-widget"
        data-name="tidb-ai-widget"
        data-btn-label="Ask AI"
        data-btn-img-src="https://tidb.ai/tidb-ai.svg"
        data-example-questions='["What is TiDB","Does TiDB support Foreign Key","What is TiDB Serverless","How to use TiDB Serverless"]'
        data-logo-src="https://tidb.ai/tidb-ai.svg"
        data-preferred-mode="dark"
      />
      {security?.google_recaptcha_site_key && (<script async src="https://www.google.com/recaptcha/api.js"></script>)}
      {security?.google_recaptcha_site_key && (<ReCaptcha siteKey={security.google_recaptcha_site_key} />)}
    </head>
    <body className={font.className}>
    <Providers session={session} website={website}>
      {children}
    </Providers>
    <Toaster />
    </body>
    </html>
  );
}

const ReCaptcha = (props: { siteKey: string }) => {
  return (
    <Script id='google_recaptcha_init'>
      {`
        // How this code snippet works:
        // This logic overwrites the default behavior of \`grecaptcha.ready()\` to
        // ensure that it can be safely called at any time. When \`grecaptcha.ready()\`
        // is called before reCAPTCHA is loaded, the callback function that is passed
        // by \`grecaptcha.ready()\` is enqueued for execution after reCAPTCHA is
        // loaded.
        if(typeof grecaptcha === 'undefined') {
          grecaptcha = {};
        }
        grecaptcha.ready = function(cb){
          if(typeof grecaptcha === 'undefined') {
            // window.__grecaptcha_cfg is a global variable that stores reCAPTCHA's
            // configuration. By default, any functions listed in its 'fns' property
            // are automatically executed when reCAPTCHA loads.
            const c = '___grecaptcha_cfg';
            window[c] = window[c] || {};
            (window[c]['fns'] = window[c]['fns']||[]).push(cb);
          } else {
            cb();
          }
        }

        // Usage
        grecaptcha.ready(function(){
          grecaptcha.render("container", {
            sitekey: "${props.siteKey}"
          });
        });
      `}
    </Script>
  );
};
