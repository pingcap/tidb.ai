'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const tabs = [
  'Customization',
  'Integrations',
  'Sources',
  'Tasks',
  'LLM',
  'Prompts',
];

export default function Page () {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Site settings</h1>
      <nav>
        <ul className="flex gap-2 items-center">
          {tabs.map((tab, index) => (
            <Button className="rounded-full" key={tab} variant={index > 0 ? 'ghost' : 'secondary'}>
              {tab}
            </Button>
          ))}
        </ul>
      </nav>
      <div className='max-w-screen-md space-y-4'>
        <div className='space-y-2'>
          <Label>
            Title
          </Label>
          <Input defaultValue="tidb.ai" disabled />
        </div>
        <div className='space-y-2'>
          <Label>
            LOGO
          </Label>
          <Input type='file' disabled />
        </div>
        <div className='space-y-2'>
          <Label>
            Primary Language
          </Label>
          <Input defaultValue="en-US" disabled />
        </div>
        <Button disabled>
          Update
        </Button>
      </div>
    </>
  );
}