'use client';

import { Ask } from '@/components/ask';
import { Button } from '@/components/ui/button';
import { useAsk } from '@/components/use-ask';
import { CopyIcon } from 'lucide-react';
import NextLink from 'next/link';

export default function Page () {
  const { loading, ask } = useAsk();

  return (
    <div className='h-body md:h-screen'>
      <div className="h-[calc(100%-var(--ask-referral-height))] flex flex-col items-center justify-center gap-4 relative">
        <h1 className="text-4xl font-light">
          Ask anything about TiDB
        </h1>
        <p className="font-light text-gray-500 mb-8">
        Including company intro, user cases, product intro and usage, FAQ, etc.
        </p>
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
      </div>
      <div className='h-[var(--ask-referral-height)] flex justify-center items-center gap-4' style={{display: 'auto'}}>
        {socials.map(social => (
          <NextLink key={social.id} href={social.href} target='_blank' className='font-normal text-xs hover:underline'>
            {social.name}
          </NextLink>
        ))}
      </div>
    </div>
  );
}

const prompts = [
  'What is TiDB?',
  'Does TiDB support FOREIGN KEY?',
  'Does TiDB support serverless?',
];

const socials = [
  {
    id: 'docs',
    name: 'Docs',
    href: '/docs',
  },
];
