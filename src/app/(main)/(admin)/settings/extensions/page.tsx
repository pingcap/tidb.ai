'use client';

import { extensionsDefs } from '@/app/(main)/(admin)/settings/extensions/utils';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { AdminPageLayout } from '@/components/admin-page-layout';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { fetcher } from '@/lib/fetch';
import { PlayIcon, Settings2 } from 'lucide-react';
import Link from 'next/link';

import useSWR from 'swr';

function useExtensions () {
  const { data: extensions = [], isLoading } = useSWR(['get', '/api/v1/extensions'], fetcher<{ identifier: string, displayName: string }[]>);

  return { extensions, isLoading };
}

export default function ExtensionsPage () {
  const { extensions, isLoading } = useExtensions();

  return (
    <AdminPageLayout>
      <AdminPageHeading title="Extensions" />
      <div className="min-h-40 relative">
        <ul className="grid gap-4 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
          {extensions.map(component => (
            <li key={component.identifier} className="p-2 rounded-lg hover:bg-secondary transition-colors space-y-1">
              <div>
                <div className="text-sm">
                  <Link className="hover:underline" href={`/settings/extensions/${component.identifier}`} prefetch={false}>
                    {component.displayName}
                  </Link>
                </div>
              </div>
              <div>
                {match(component.identifier)}
              </div>
            </li>
          ))}
        </ul>
        <Loader loading={isLoading}>
          Loading extensions...
        </Loader>
      </div>
    </AdminPageLayout>
  );
}

const match = (identifier: string) => {
  const item = extensionsDefs.find(item => item.test.test(identifier));
  const isOfficial = /^rag\./.test(identifier);

  if (item) {
    return (
      <div className="flex gap-2 items-center text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <item.icon size="1em" />
          {item.title}
        </span>
        {item.playground && (
          <Button className="ml-auto gap-1 text-xs h-max w-max py-1" size="sm" variant="ghost" asChild>
            <Link href={`/settings/extensions/${identifier}/playground`}>
              Try
              <PlayIcon size="1em" />
            </Link>
          </Button>
        )}
        <Button className="ml-auto gap-1 text-xs h-max w-max py-1" size="sm" variant="ghost" asChild>
          <Link href={`/settings/extensions/${identifier}/config`}>
            <Settings2 size="1em" />
          </Link>
        </Button>
      </div>
    );
  }
};

