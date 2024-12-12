import { AdminPageHeading } from '@/components/admin-page-heading';

export default function DatasetsHeading () {
  return (
    <AdminPageHeading
      breadcrumbs={[
        { title: 'Evaluations' },
        { title: 'Datasets' },
      ]}
    />
  );
}