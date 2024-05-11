'use client';

import {columns} from "@/app/(main)/(admin)/explore/components/columns";
import {AdminPageHeading} from '@/components/admin-page-heading';
import {DocumentIndexStatusFilter} from '@/components/data-filters/document-index-status-filter';
import {SearchFilter} from '@/components/data-filters/search-filter';
import {DataTableHeading} from '@/components/data-table-heading';
import {DataTableRemote} from '@/components/data-table-remote';

export default function Page() {
  return (
    <>
      <AdminPageHeading title="Documents" description="Uploading, managing, and indexing various documents" />
      <DataTableRemote
        before={(
          <DataTableHeading>
            <SearchFilter placeholder="Filter documents..."/>
            <DocumentIndexStatusFilter/>
          </DataTableHeading>
        )}
        selectable={true}
        columns={columns}
        api="/api/v1/documents"
        idColumn="id"
      />
    </>
  );
}
