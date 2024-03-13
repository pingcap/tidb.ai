'use client';

import { Ask } from '@/components/ask';
import { Button } from '@/components/ui/button';
import { useAsk } from '@/components/use-ask';
import NextLink from 'next/link';
import { useContext } from 'react';
import { WebsiteSettingContext } from "@/components/website-setting-provider";

export default function Page () {
  const { loading, ask } = useAsk();
  const { homepage } = useContext(WebsiteSettingContext);

  return (
    <div className='h-screen'>
      <div className="lg:h-[calc(100%-var(--ask-referral-height))] h-2/3 p-4 lg:p-0 flex flex-col items-center justify-center gap-4 relative">
        <h1 className="text-2xl sm:text-4xl font-light text-center">
          {homepage?.title || ''}
        </h1>
        <p className="font-light dark:text-gray-300 text-gray-500 mb-4 w-4/5 md:w-auto text-center">
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
      <div className='lg:h-[var(--ask-referral-height)] h-1/3 flex lg:justify-center justify-end items-center gap-4 lg:flex-row flex-col pb-4 lg:pb-0' style={{display: 'auto'}}>
        {homepage?.footer_links?.map(link => (
          <NextLink key={link.text} href={link.href} target='_blank' className='font-light text-sm hover:underline opacity-50 flex justify-center'>
            {link.text}
          </NextLink>
        ))}
      </div>
    </div>
  );
}
