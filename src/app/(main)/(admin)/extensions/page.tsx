'use client';

import { extensionsDefs } from '@/app/(main)/(admin)/extensions/utils';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { AdminPageLayout } from '@/components/admin-page-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetcher } from '@/lib/fetch';
import { DotIcon, PlayIcon, Settings2, ShieldCheckIcon } from 'lucide-react';
import Link from 'next/link';

import useSWR from 'swr';

function useExtensions () {
  const { data: extensions = [] } = useSWR(['get', '/api/v1/extensions'], fetcher<{ identifier: string, displayName: string }[]>);

  return extensions;
}

export default function ExtensionsPage () {
  const extensions = useExtensions();

  return (
    <AdminPageLayout>
      <AdminPageHeading title="Extensions" />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl::grid-cols-4">
        {extensions.map(component => <Card key={component.identifier}>
          <CardHeader>
            <CardTitle className="text-sm">
              {component.displayName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {match(component.identifier)}
          </CardContent>
        </Card>)}
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
        {isOfficial && (
          <>
            <span className="flex items-center gap-1 text-muted-foreground ">
              <ShieldCheckIcon size="1em" />
              Official
            </span>
            <DotIcon size="1em" />
          </>
        )}
        <span className="flex items-center gap-1">
          <item.icon size="1em" />
          {item.title}
        </span>
        {item.playground && (
          <Button className="ml-auto gap-1 text-xs h-max w-max py-1" size="sm" variant="outline" asChild>
            <Link href={`/extensions/${identifier}`}>
              Try
              <PlayIcon size="1em" />
            </Link>
          </Button>
        )}
        {item.configurable && (
          <Button className="ml-auto gap-1 text-xs h-max w-max py-1" size="sm" variant="outline" asChild>
            <Link href={`/extensions/${identifier}/config`}>
              Config
              <Settings2 size="1em" />
            </Link>
          </Button>
        )}
      </div>
    );
  }
};

