import { authGuard } from '@/lib/auth-server';
import type { PageProps } from '@/lib/next/types';
import TasksPage from './page.client';

export default async function ServerTasksPage ({ params }: PageProps<{ id: string }>) {
  await authGuard('admin');

  return (
    <TasksPage indexId={parseInt(params.id)} />
  );
}

export const dynamic = 'force-dynamic';
