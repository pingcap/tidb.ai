import { AdminPageHeading } from '@/components/admin-page-heading';
import { DocumentsTable } from '@/components/documents/documents-table';

export default function DocumentsPage () {
  return (
    <>
      <AdminPageHeading title="Documents" />
      <DocumentsTable />
    </>
  );
}

