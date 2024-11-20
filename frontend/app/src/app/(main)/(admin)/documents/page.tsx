import { AdminPageHeading } from '@/components/admin-page-heading';
import { DocumentDeprecationAlert } from '@/components/documents/DocumentDeprecationAlert';
import { DocumentsTable } from '@/components/documents/documents-table';

export default function DocumentsPage () {
  return (
    <>
      <AdminPageHeading title="Documents" />
      <DocumentDeprecationAlert />
      <DocumentsTable />
    </>
  );
}

