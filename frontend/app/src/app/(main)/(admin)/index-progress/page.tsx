'use client';

import { getIndexProgress } from '@/api/rag';
import { AdminPageHeading } from '@/components/admin-page-heading';
import { IndexProgressChart, IndexProgressChartPlaceholder } from '@/components/charts/IndexProgressChart';
import { TotalCard } from '@/components/charts/TotalCard';
import { ArrowRightIcon, FileTextIcon, MapPinIcon, PuzzleIcon, RouteIcon } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';

export default function IndexProgressPage () {
  const { data: progress } = useSWR('api.rag.index-progress', () => getIndexProgress());

  return (
    <>
      <AdminPageHeading title="Index Progress Overview" />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <TotalCard
          title="Documents"
          icon={<FileTextIcon className="h-4 w-4 text-muted-foreground" />}
          total={progress?.documents.total}
        >
          <Link className="flex gap-2 items-center" href="/documents">All documents <ArrowRightIcon className="size-3" /></Link>
        </TotalCard>
        <TotalCard title="Chunks" icon={<PuzzleIcon className="h-4 w-4 text-muted-foreground" />} total={progress?.chunks.total} />
        <TotalCard
          title="Entities"
          icon={<MapPinIcon className="h-4 w-4 text-muted-foreground" />}
          total={progress?.entities.total}
        >
          <Link className="flex gap-2 items-center" href="/knowledge-graph">Graph Editor <ArrowRightIcon className="size-3" /></Link>
        </TotalCard>
        <TotalCard title="Relationships" icon={<RouteIcon className="h-4 w-4 text-muted-foreground" />} total={progress?.relationships.total} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {progress ? <IndexProgressChart title="Vector Index" data={progress.vector_index} /> : <IndexProgressChartPlaceholder title="Vector Index" />}
        {progress ? <IndexProgressChart title="Knowledge Graph Index" data={progress.kg_index} /> : <IndexProgressChartPlaceholder title="Knowledge Graph Index" />}
      </div>
    </>
  );
}
