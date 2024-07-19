import { getAllSiteSettings } from '@/api/site-settings';
import { CustomJsSettings } from '@/components/settings/CustomJsSettings';
import { WidgetSnippet } from '@/components/settings/WidgetSnippet';

export default async function CustomJsSettingsPage () {
  const settings = await getAllSiteSettings();

  return (
    <>
      <section className="max-w-screen-md space-y-2 mb-8">
        <WidgetSnippet />
        <p className="text-muted-foreground text-xs">Copy this HTML fragment to your page.</p>
      </section>
      <CustomJsSettings schema={settings} />
    </>
  );
}

export const dynamic = 'force-dynamic';
