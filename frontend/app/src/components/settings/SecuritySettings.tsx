'use client';

import type { AllSettings } from '@/api/site-settings';
import { SettingsField } from '@/components/settings/SettingsField';

export function SecuritySettings ({ schema }: { schema: AllSettings }) {
  return (
    <div className="space-y-8 max-w-screen-md">
      <section className="space-y-4">
        <h2 className="text-lg font-medium">reCaptcha</h2>
        <SettingsField name="recaptcha_site_key" item={schema.recaptcha_site_key} />
        <SettingsField name="recaptcha_enterprise_mode" item={schema.recaptcha_enterprise_mode} />
      </section>
    </div>
  );
}