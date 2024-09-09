import { getAllSiteSettings } from '@/api/site-settings';
import { IntegrationsSettings } from '@/components/settings/IntegrationsSettings';

export default async function LangfuseSettingsPage () {
  const settings = await getAllSiteSettings();

  return (
    <>
      <IntegrationsSettings schema={settings} showPostVerificationSettings={!!process.env.EXPERIMENTAL_MESSAGE_VERIFY_SERVICE} />
    </>
  );
}

export const dynamic = 'force-dynamic';
