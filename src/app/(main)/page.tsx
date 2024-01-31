'use client';

import { Ask } from '@/components/ask';
import { Button } from '@/components/ui/button';
import { useAsk } from '@/components/use-ask';

export default function Page () {
  const { loading, ask } = useAsk();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-semibold">
        Get Knowledge Here
      </h1>
      <Ask className="w-1/2" loading={loading} ask={ask} />
      <ul className="flex gap-2 flex-wrap max-w-[50%]">
        {prompts.map(item => (
          <li key={item}>
            <Button className='font-normal text-xs' disabled={loading} variant="secondary" size="sm" onClick={() => {
              ask(item);
            }}>
              {item}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const prompts = [
  'What is TiDB?',
  'Does TiDB support FOREIGN KEY?',
  'Does TiDB support serverless?',
];