import { authGuard } from '@/lib/auth-server';
import FeedbackPage from './page.client';

export default async function ServerDocumentsPage () {
  await authGuard('admin');

  return (
    <FeedbackPage />
  );
}

export const dynamic = 'force-dynamic';
