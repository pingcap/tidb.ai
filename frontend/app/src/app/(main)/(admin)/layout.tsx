import { AdminPageLayout } from '@/components/admin-page-layout';
import type { ReactNode } from 'react';

export default async function Layout ({ children }: { children: ReactNode }) {
  return (
    <AdminPageLayout>
      {children}
    </AdminPageLayout>
  );
}