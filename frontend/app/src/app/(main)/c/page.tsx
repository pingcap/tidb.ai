import ConversationsListPageClient from '@/app/(main)/c/page.client';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ConversationsListPage () {
  const me = await auth();
  if (!me) {
    redirect('/auth/login');
  }

  return <ConversationsListPageClient />;
}

export const dynamic = 'force-dynamic';
