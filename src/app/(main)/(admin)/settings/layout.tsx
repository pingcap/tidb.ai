import { Button } from '@/components/ui/button';
import { SettingsNavigation } from '@/app/(main)/(admin)/settings/components';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-4'>Settings</h1>
      <nav>
        <SettingsNavigation
          tabs={tabs.map((tab) => ({
            id: tab.id,
            name: tab.name,
            href: baseRoute + tab.path,
          }))}
        />
      </nav>
      {children}
    </>
  );
}

const baseRoute = '/settings';

const tabs = [
  { id: 'customization', name: 'Customization', path: '' },
  { id: 'integrations', name: 'Integrations', path: '/integrations' },
  { id: 'sources', name: 'Sources', path: '/sources' },
  { id: 'tasks', name: 'Tasks', path: '/tasks' },
  { id: 'llm', name: 'LLM', path: '/llm' },
  { id: 'prompts', name: 'Prompts', path: '/prompts' },
  { id: 'authentication', name: 'Authentication', path: '/authentication' },
];
