'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker';
import { ChevronsLeftIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function Layout ({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldHideSide = pathname !== '/chat';

  return (
    <div className="lg:grid grid-cols-12 gap-4">
      <div className={cn('col-span-3', shouldHideSide && 'hidden lg:block')}>
        <div className="sticky top-16 pt-4">
          <Tabs orientation="vertical" value={pathname}>
            <TabsList className="flex flex-col gap-2 items-stretch justify-start h-auto">
              {history.map(item => (
                <TabsTrigger key={item.id} className="justify-start select-none gap-2" value={`/chat/${encodeURIComponent(item.id)}`} asChild>
                  <Link href={`/chat/${encodeURIComponent(item.id)}`}>
                  <span className="w-auto overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {item.name}
                  </span>
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button className='gap-2 flex w-full mt-2' variant='outline'>
            <PlusIcon className='w-4 h-4'/>
            New chat
          </Button>
        </div>
      </div>
      <div className="col-span-9">
        {shouldHideSide && <Button className="gap-2 lg:hidden" variant="ghost" asChild>
          <Link href="/chat">
            <ChevronsLeftIcon className="w-4 h-4" />
            See history chats
          </Link>
        </Button>}
        {children}
      </div>
    </div>
  );
}

faker.seed(1);

const history = faker.helpers.uniqueArray((() => ({
  name: faker.lorem.words(),
  id: faker.string.uuid(),
})), 6);
