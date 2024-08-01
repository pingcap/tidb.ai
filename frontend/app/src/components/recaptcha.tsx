import { useSettingContext } from '@/components/website-setting-provider';
import Script from 'next/script';
import { useCallback } from 'react';

export function useRecaptchaExecute () {
  const settings = useSettingContext();

  return useCallback((action: string) => {
    return new Promise<string | undefined>((resolve, reject) => {
      if (settings.recaptcha_site_key) {
        const { recaptcha_site_key, recaptcha_enabled } = settings;
        if (grecaptcha && recaptcha_enabled) {
          grecaptcha.ready(() => {
            grecaptcha.execute(recaptcha_site_key, { action }).then(resolve, reject);
          });
        } else {
          reject(new Error('grecaptcha not initialized.'));
        }
      } else {
        resolve(undefined);
      }
    });
  }, [settings.recaptcha_site_key, settings.recaptcha_enabled]);
}

export function ReCaptchaScript () {
  const { recaptcha_enabled, recaptcha_site_key } = useSettingContext();
  if (!recaptcha_enabled || !recaptcha_site_key) {
    return null;
  }
  return (
    <Script strategy="lazyOnload" src={`https://www.google.com/recaptcha/api.js?render=${recaptcha_site_key}`} />
  );
}