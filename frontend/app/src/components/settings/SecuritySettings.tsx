'use client';

import type { AllSettings } from '@/api/site-settings';
import { SettingsField } from '@/components/settings/SettingsField';

export function SecuritySettings ({ schema }: { schema: AllSettings }) {
  return (
    <div className="space-y-8 max-w-screen-md">
      <section className="space-y-4">
        <h2 className="text-lg font-medium">reCaptcha</h2>
        <SettingsField name="recaptcha_enabled" item={schema.recaptcha_enabled} description={<>See <a className="underline" href="https://developers.google.com/recaptcha/intro" target="_blank">reCAPTCHA documents</a> for more details.</>} />
        <SettingsField name="recaptcha_secret" item={schema.recaptcha_secret} />
        <SettingsField name="recaptcha_site_key" item={schema.recaptcha_site_key} />
      </section>
    </div>
  );
}