import { Button } from '@/components/ui/button';
import { SettingsNavigation } from '@/app/(main)/(admin)/settings/components';
import path from 'path'

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-4'>Settings</h1>
      <div className='flex flex-col lg:flex-row gap-4 h-full'>
        <nav className='lg:h-full lg:border-r lg:pr-4 overflow-x-auto lg:overflow-visible'>
          <SettingsNavigation
            tabs={tabs.map((tab) => ({
              id: tab.id,
              name: tab.name,
              href: path.join(baseRoute, tab.path),
            }))}
          />
        </nav>
        <div className='overflow-auto lg:flex-1'>
          {children}
        </div>
      </div>
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
  { id: 'javascript', name: 'JavaScript', path: '/javascript' },
  { id: 'extensions', name: 'Extensions', path: '/extensions' },
];
