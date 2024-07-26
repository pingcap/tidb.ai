import { useSettingContext } from '@/components/website-setting-provider';
import { useCallback } from 'react';

export function useRecaptchaExecute () {
  const settings = useSettingContext();

  return useCallback((action: string) => {
    return new Promise<string | undefined>((resolve, reject) => {
      if (settings.recaptcha_site_key) {
        const { recaptcha_site_key, recaptcha_enterprise_mode } = settings;
        if (grecaptcha) {
          if (!recaptcha_enterprise_mode) {
            grecaptcha.ready(() => {
              grecaptcha.execute(recaptcha_site_key, { action }).then(resolve, reject);
            });
          } else {
            grecaptcha.enterprise.ready(() => {
              grecaptcha.enterprise.execute(recaptcha_site_key, { action }).then(resolve, reject);
            });
          }
        } else {
          reject(new Error('grecaptcha not initialized.'));
        }
      } else {
        resolve(undefined);
      }
    });
  }, [settings.recaptcha_site_key, settings.recaptcha_enterprise_mode]);
}
