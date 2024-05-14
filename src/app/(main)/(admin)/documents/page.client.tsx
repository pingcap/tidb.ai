'use client';

import {columns} from "@/app/(main)/(admin)/documents/components/columns";
import {DataTableToolbar} from "@/app/(main)/(admin)/documents/components/data-table-toolbar";
import {AdminPageHeading} from '@/components/admin-page-heading';
import {DataTableRemote} from '@/components/data-table-remote';

export default function DocumentsPage() {
  return (
    <>
      <AdminPageHeading title="Documents" description="Uploading, managing, and indexing various documents" />
      <DataTableRemote
        toolbar={table => {
          return <DataTableToolbar table={table}/>
        }}
        selectable={true}
        columns={columns}
        api="/api/v1/documents"
        idColumn="id"
      />
    </>
  );
}
