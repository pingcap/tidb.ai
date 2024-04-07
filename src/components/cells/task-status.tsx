import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { CellContext } from '@tanstack/react-table';
import { CheckCircleIcon, CircleDashedIcon, LoaderIcon, XCircle } from 'lucide-react';

export const TASK_STATUS = {
  SUCCEED: { label: 'Succeed', value: 'SUCCEED', icon: CheckCircleIcon, className: 'text-green-700' },
  CREATED: { label: 'Created', value: 'CREATED', icon: CircleDashedIcon, className: 'text-gray-400' },
  PENDING: { label: 'Pending', value: 'PENDING', icon: CircleDashedIcon, className: 'text-gray-600' },
  IMPORTING: { label: 'Importing', value: 'IMPORTING', icon: LoaderIcon, className: 'text-yellow-700' },
  FAILED: { label: 'Failed', value: 'FAILED', icon: XCircle, className: 'text-destructive' },
} as const;

export const taskStatusCell = <T extends { status: string, error: string | null }> (props: CellContext<T, keyof typeof TASK_STATUS | unknown>) => {
  const state = props.getValue();
  const info = TASK_STATUS[state as keyof typeof TASK_STATUS];

  if (info) {
    const error = props.row.original.error;

    const el = (
      <span className={cn('flex gap-1', info.className)}>
        <info.icon className="w-4 h-4" />
        <span>{info.label}</span>
      </span>
    );

    if (state === 'FAILED') {
      return (
        <Tooltip>
          <TooltipTrigger className={info.className}>
            {el}
          </TooltipTrigger>
          <TooltipContent>
            <h6 className="font-semibold mb-2 text-destructive">Error message</h6>
            <ScrollArea className="w-80 h-40">
              <pre className="text-xs">
                {error}
              </pre>
              <ScrollBar orientation="horizontal" />
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </TooltipContent>
        </Tooltip>
      );
    }

    return el;
  } else {
    return state;
  }
};
