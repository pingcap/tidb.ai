'use client';

import type { AllSettings } from '@/api/site-settings';
import { SettingsField } from '@/components/settings/SettingsField';

export function IntegrationsSettings ({ schema, showPostVerificationSettings }: { schema: AllSettings, showPostVerificationSettings: boolean }) {
  return (
    <div className="space-y-8 max-w-screen-md">
      <LangfuseSettings schema={schema} />
      {showPostVerificationSettings && <ExperimentalPostVerificationSettings schema={schema} />}
    </div>
  );
}

export function LangfuseSettings ({ schema, hideTitle, disabled, onChanged }: { schema: AllSettings, hideTitle?: boolean, disabled?: boolean, onChanged?: () => void }) {
  return (
    <section className="space-y-6">
      {!hideTitle && <h2 className="text-lg font-medium">Langfuse</h2>}
      <SettingsField name="langfuse_public_key" item={schema.langfuse_public_key} onChanged={onChanged} disabled={disabled} />
      <SettingsField name="langfuse_secret_key" item={schema.langfuse_secret_key} onChanged={onChanged} disabled={disabled} />
      <SettingsField name="langfuse_host" item={schema.langfuse_host} onChanged={onChanged} disabled={disabled} />
    </section>
  );
}

export function ExperimentalPostVerificationSettings ({ schema, hideTitle, disabled, onChanged }: { schema: AllSettings, hideTitle?: boolean, disabled?: boolean, onChanged?: () => void }) {
  return (
    <section className="space-y-6">
      {!hideTitle && <h2 className="text-lg font-medium">[Experimental] Post verifications</h2>}
      <SettingsField name="enable_post_verifications" item={schema.enable_post_verifications} onChanged={onChanged} disabled={disabled} />
      <SettingsField name="enable_post_verifications_for_widgets" item={schema.enable_post_verifications_for_widgets} onChanged={onChanged} disabled={disabled} />
    </section>
  );
}
