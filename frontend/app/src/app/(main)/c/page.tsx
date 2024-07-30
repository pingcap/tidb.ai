import ConversationsListPageClient from '@/app/(main)/c/page.client';
import { requireAuth } from '@/lib/auth';

export default async function ConversationsListPage () {
  await requireAuth();

  return <ConversationsListPageClient />;
}

export const dynamic = 'force-dynamic';
