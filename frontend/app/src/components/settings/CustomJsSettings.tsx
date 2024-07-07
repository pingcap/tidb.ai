'use client';

import type { AllSettings } from '@/api/site-settings';
import { SettingsField } from '@/components/settings/SettingsField';
import { StringArrayField } from '@/components/settings/StringArrayField';
import { z } from 'zod';

export function CustomJsSettings ({ schema }: { schema: AllSettings }) {
  return (
    <div className="space-y-8 max-w-screen-md">
      <section className="space-y-4">
        <SettingsField name="custom_js_logo_src" item={schema.custom_js_logo_src} />
        <SettingsField name="custom_js_button_label" item={schema.custom_js_button_label} />
        <SettingsField name="custom_js_button_img_src" item={schema.custom_js_button_img_src} />
        <SettingsField name="custom_js_example_questions" item={schema.custom_js_example_questions} arrayItemSchema={z.string()}>
          {props => <StringArrayField {...props} />}
        </SettingsField>
      </section>
    </div>
  );
}