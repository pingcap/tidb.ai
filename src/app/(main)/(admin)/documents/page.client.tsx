'use client';

import { columns } from '@/app/(main)/(admin)/documents/components/columns';
import { DataTableToolbar } from '@/app/(main)/(admin)/documents/components/data-table-toolbar';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { DataTableRemote } from '@/components/data-table-remote';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function DocumentsPage () {
  return (
    <>
      <AdminPageHeading
        title="Documents"
        description={(
          <>
            Uploading, managing, and indexing various documents.
            <br />
            <span className="text-xs underline text-secondary-foreground inline-flex items-center gap-4">
              <Link className="underline" href="/documents/sources">
                Source sites
              </Link>
              <Link className="underline" href="/documents/import-tasks">
                Import tasks
                <ArrowRightIcon className="inline-block w-3 h-3 ml-1" />
              </Link>
            </span>
          </>

        )}
      />
      <DataTableRemote
        toolbar={table => {
          return <DataTableToolbar table={table} />;
        }}
        selectable={true}
        columns={columns}
        api="/api/v1/documents"
        idColumn="id"
        defaultSorting={[
          { id: 'last_modified_at', desc: true },
        ]}
      />
    </>
  );
}
