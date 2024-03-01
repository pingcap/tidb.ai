import TasksPage from '@/app/(main)/(admin)/import-tasks/page.client';
import { authGuard } from '@/lib/auth-server';

export default async function ServerTasksPage () {
  await authGuard('admin');

  return (
    <TasksPage />
  );
}

export const dynamic = 'force-dynamic';
