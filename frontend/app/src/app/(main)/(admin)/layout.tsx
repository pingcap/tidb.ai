import { AdminPageLayout } from '@/components/admin-page-layout';
import { requireAuth } from '@/lib/auth';
import type { ReactNode } from 'react';

export default async function Layout ({ children }: { children: ReactNode }) {
  await requireAuth();
  return (
    <AdminPageLayout>
      {children}
      <div className="text-xs text-muted-foreground text-right opacity-50">
        {'Frontend build '}
        <a className="underline" href={`https://github.com/pingcap/tidb.ai/tree/${process.env.GIT_BRANCH}`} target="_blank">{process.env.GIT_BRANCH}</a>
        {' / '}
        <a className="underline" href={`https://github.com/pingcap/tidb.ai/tree/${process.env.GIT_COMMIT_HASH}`} target="_blank">{process.env.GIT_VERSION}</a>
      </div>
    </AdminPageLayout>
  );
}