'use client';

import { Ask } from '@/components/ask';
import { Button } from '@/components/ui/button';
import { useAsk } from '@/components/use-ask';
import NextLink from 'next/link';

export default function Page () {
  const { loading, ask } = useAsk();

  return (
    <div className='h-body lg:h-screen min-h-screen'>
      <div className="lg:h-[calc(100%-var(--ask-referral-height))] h-2/3 p-4 lg:p-0 flex flex-col items-center justify-center gap-4 relative">
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
      <div className='lg:h-[var(--ask-referral-height)] h-1/3 flex lg:justify-center justify-end items-center gap-4 lg:flex-row flex-col pb-4 lg:pb-0' style={{display: 'auto'}}>
        {footerLinks.map(link => (
          <NextLink key={link.id} href={link.href} target='_blank' className='font-light text-sm hover:underline opacity-50'>
            {link.text}
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
