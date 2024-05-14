import { authGuard } from '@/lib/auth-server';
import DocumentsPage from './page.client';

export default async function ServerDocumentsPage () {
  await authGuard('admin');

  return (
    <DocumentsPage />
  );
}

export const dynamic = 'force-dynamic';
