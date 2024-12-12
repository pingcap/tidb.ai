import { AdminPageHeading } from '@/components/admin-page-heading';

export default function TasksHeading () {
  return (
    <AdminPageHeading
      breadcrumbs={[
        { title: 'Evaluations' },
        { title: 'Tasks' },
      ]}
    />
  );
}