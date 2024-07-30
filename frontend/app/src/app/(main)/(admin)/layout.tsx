import { AdminPageLayout } from '@/components/admin-page-layout';
import { VersionStatus } from '@/components/VersionStatus';
import { requireAuth } from '@/lib/auth';
import { type ReactNode, Suspense } from 'react';

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
        {': '}
        <Suspense fallback={<span>Loading version status...</span>}>
          <VersionStatus gitCommitHash={process.env.GIT_COMMIT_HASH} />
        </Suspense>
      </div>
    </AdminPageLayout>
  );
}