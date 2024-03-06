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
        <h1 className="text-3xl md:text-4xl font-light">
          Ask anything about TiDB
        </h1>
        <p className="font-light text-gray-500 mb-8 w-4/5 md:w-auto	">
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
      <div className='h-[var(--ask-referral-height)] md:flex justify-center md:justify-auto items-center gap-4' >
        {footerLinks.map(link => (
          <div className='text-center'>
          <NextLink key={link.id} href={link.href} target='_blank' className='font-light text-sm hover:underline opacity-50'>
            {link.text}
          </NextLink>
          </div>
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

const footerLinks = [
  {
    id: 'docs',
    text: 'Docs',
    href: '/docs',
  },
  {
    id: 'deploy',
    text: 'Deploy your own within 5 minutes for free',
    href: '/docs',
  },
  {
    id: 'how-it-works',
    text: 'How it works?',
    href: '/docs',
  },
  {
    id: 'powered-by',
    text: 'Powered by TiDB',
    href: 'https://tidb.cloud',
  },
  {
    id: 'copyright',
    text: '© 2024 PingCAP',
    href: 'https://pingcap.com',
  },
];
