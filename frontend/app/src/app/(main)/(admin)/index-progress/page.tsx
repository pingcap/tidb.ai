import { getIndexProgress, type IndexProgress } from '@/api/rag';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { IndexProgressChart } from '@/components/charts/IndexProgressChart';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requireAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { ArrowRightIcon, FileTextIcon, MapPinIcon, PuzzleIcon, RouteIcon } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

const nf = new Intl.NumberFormat('en-US', {});

export default async function IndexProgressPage () {
  await requireAuth();

  const progress = await getIndexProgress();

  return (
    <>
      <AdminPageHeading title="Index Progress Overview" />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <TotalCard
          title="Documents"
          icon={<FileTextIcon className="h-4 w-4 text-muted-foreground" />}
          total={progress.documents.total}
        >
          <Link className="flex gap-2 items-center" href="/documents">All documents <ArrowRightIcon className="size-3" /></Link>
        </TotalCard>
        <TotalCard title="Chunks" icon={<PuzzleIcon className="h-4 w-4 text-muted-foreground" />} total={progress.chunks.total} />
        <TotalCard
          title="Entities"
          icon={<MapPinIcon className="h-4 w-4 text-muted-foreground" />}
          total={progress.entities.total}
        >
          <Link className="flex gap-2 items-center" href="/knowledge-graph">Graph Editor <ArrowRightIcon className="size-3" /></Link>
        </TotalCard>
        <TotalCard title="Relationships" icon={<RouteIcon className="h-4 w-4 text-muted-foreground" />} total={progress.relationships.total} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <IndexProgressChart title="Vector Index" data={progress.vector_index} />
        <IndexProgressChart title="Knowledge Graph Index" data={progress.kg_index} />
      </div>
    </>
  );
}

function TotalCard ({ title, icon, total, children }: { title: string, icon: ReactNode, total: number, children?: ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{nf.format(total)}</div>
        <p className="text-xs text-muted-foreground mt-4">
          {children}
        </p>
      </CardContent>
    </Card>
  );
}

function IndexCard ({ title, progress }: { title: string, progress: IndexProgress }) {
  return (
    <Card className="space-y-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        {progress.not_started && <Detail title="Not started" value={progress.not_started} valueClassName="text-muted-foreground" />}
        {progress.pending && <Detail title="Pending" value={progress.pending} valueClassName="text-muted-foreground" />}
        {progress.running && <Detail title="Running" value={progress.running} valueClassName="text-yellow-500" />}
        {progress.completed && <Detail title="Completed" value={progress.completed} valueClassName="text-green-500" />}
        {progress.failed && <Detail title="Failed" value={progress.failed} valueClassName="text-destructive" />}
      </CardContent>
    </Card>
  );
}

function Detail ({ valueClassName, title, value }: { valueClassName?: string, title: string, value: number }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground text-xs">{title}</dt>
      <dd className={cn('font-medium', valueClassName)}>{nf.format(value)}</dd>
    </div>
  );
}
