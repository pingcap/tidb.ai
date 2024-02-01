'use client';

import { Ask } from '@/components/ask';
import { Highlight } from '@/components/highlight';
import { Button } from '@/components/ui/button';
import { useAsk } from '@/components/use-ask';
import { CopyIcon } from 'lucide-react';

export default function Page () {
  const { loading, ask } = useAsk();

  return (
    <div className="h-body md:h-screen flex flex-col items-center justify-center gap-4 relative">
      <h1 className="text-4xl font-semibold">
        <Highlight>Scenario 1:</Highlight> Conversational Ask
      </h1>
      <Ask className="px-4 w-full lg:w-2/3" loading={loading} ask={ask} />
      <ul className="flex gap-2 flex-wrap px-4 w-full lg:w-2/3">
        {prompts.map(item => (
          <li key={item}>
            <Button className="font-normal text-xs" disabled={loading} variant="secondary" size="sm" onClick={() => {
              ask(item);
            }}>
              {item}
            </Button>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-center space-y-2">
        <div>
          One command to get same for TiDB Cloud users.
        </div>
        <div className="flex gap-2 py-2 px-4 rounded-full bg-primary/70 text-primary-foreground items-center">
          <code className="block">
            <pre><span className='opacity-70 select-none'>$ </span>ticloud create-app --template rag --bind 8080</pre>
          </code>
          <Button className='w-6 h-6 rounded-full' size='icon' variant='ghost'>
            <CopyIcon size='1em' />
          </Button>
        </div>
      </div>
    </div>
  );
}

const prompts = [
  'What is TiDB?',
  'Does TiDB support FOREIGN KEY?',
  'Does TiDB support serverless?',
];