'use client';

import { Ask } from '@/components/ask';
import { Button } from '@/components/ui/button';
import { useAsk } from '@/components/use-ask';
import { CopyIcon } from 'lucide-react';
import NextLink from 'next/link';
import { useContext } from 'react';
import { WebsiteSettingContext } from "@/components/website-setting-provider";

export default function Page () {
  const { loading, ask } = useAsk();
  const { homepage } = useContext(WebsiteSettingContext);

  return (
    <div className='h-body md:h-screen'>
      <div className="h-[calc(100%-var(--ask-referral-height))] flex flex-col items-center justify-center gap-4 relative">
        <h1 className="text-4xl font-light">
          {homepage?.title || ''}
        </h1>
        <p className="font-light text-gray-500 mb-8">
          {homepage?.description || ''}
        </p>
        <Ask className="px-4 w-full lg:w-2/3" loading={loading} ask={ask} />
        {homepage?.example_questions && (<ul className="flex gap-2 flex-wrap px-4 w-full lg:w-2/3">
          {homepage.example_questions.map(item => (
            <li key={item.text}>
              <Button className="font-normal text-xs" disabled={loading} variant="secondary" size="sm" onClick={() => {
                ask(item.text);
              }}>
                {item.text}
              </Button>
            </li>
          ))}
        </ul>)}
      </div>
      <div className='h-[var(--ask-referral-height)] flex justify-center items-center gap-4' style={{display: 'auto'}}>
        {footerLinks.map(link => (
          <NextLink key={link.id} href={link.href} target='_blank' className='font-light text-sm hover:underline opacity-50'>
            {link.text}
          </NextLink>
        ))}
      </div>
    </div>
  );
}

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
