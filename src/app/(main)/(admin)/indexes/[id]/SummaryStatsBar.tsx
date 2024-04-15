import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { DocumentIndexTask } from '@/core/db/schema';
import type { Index } from '@/core/repositories/index_';
import { fetcher } from '@/lib/fetch';
import { cn } from '@/lib/utils';
import useSWR from 'swr';

export function SummaryStatsBar ({ className, index }: { className?: string, index: Index }) {
  const {
    data = null,
  } = useSWR(['get', '/api/v1/stats/document_index_status_summary', { index_id: index.id }], fetcher<Record<DocumentIndexTask['status'], number>>);

  const total = Object.values(data ?? {}).reduce((sum, c) => sum + c, 0);

  return (
    <TooltipProvider delayDuration={0}>
      <div className={cn('h-2 flex items-stretch rounded-full overflow-hidden', className)}>
        <Tick label="Created" value={data?.CREATED} total={total} className="bg-gray-200" />
        <Tick label="Pending" value={data?.PENDING} total={total} className="bg-gray-300" />
        <Tick label="Indexing" value={data?.INDEXING} total={total} className="bg-yellow-300" />
        <Tick label="Succeed" value={data?.SUCCEED} total={total} className="bg-green-600" />
        <Tick label="Failed" value={data?.FAILED} total={total} className="bg-red-600" />
      </div>
    </TooltipProvider>
  );
}

function Tick ({ value, label, total, className }: { value: number | undefined | null, label: string, total: number, className?: string }) {
  if (!value) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={cn('min-w-10 opacity-90 hover:opacity-100', className)} style={{ width: `${value / total * 100}%` }} />
      </TooltipTrigger>
      <TooltipContent collisionPadding={0}>
        {label}: {value} tasks
      </TooltipContent>
    </Tooltip>
  );
}
