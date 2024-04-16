import { AdminPageHeading } from '@/components/admin-page-heading';
import { AdminPageLayout } from '@/components/admin-page-layout';
import { Badge } from '@/components/ui/badge';
import { getSetting } from '@/core/setting';
import { getSiteWizardState } from '@/core/wizard';

export default async function Page () {
  const state = await getSiteWizardState();
  const website = await getSetting('website');

  return (
    <AdminPageLayout>
      <AdminPageHeading title={`Setup ${website.title || 'your site'}`} />
      <ul className="flex flex-col gap-4">
        <StateLine name="Sources" value={state.sources} />
        <StateLine name="Index" value={state.enabled_indexes} />
        <StateLine name="Chat Engine" value={state.enabled_chat_engines} />
      </ul>
    </AdminPageLayout>
  );
}

function StateLine ({ name, value }: { name: string, value: number }) {
  return (
    <li className="flex gap-2 items-center rounded p-2">
      {value > 0 ? <Badge variant="success">Configured</Badge> : <Badge variant="secondary">Not configured</Badge>}
      {name}
    </li>
  );
}

export const dynamic = 'force-dynamic';
