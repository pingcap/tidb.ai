import { authGuard } from '@/lib/auth-server';
import TasksPage from './page.client';

export default async function ServerTasksPage () {
  await authGuard('admin');

  return (
    <TasksPage />
  );
}

export const dynamic = 'force-dynamic';
