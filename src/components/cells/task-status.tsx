import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { CellContext } from '@tanstack/react-table';
import { CheckCircleIcon, CircleDashedIcon, LoaderIcon, XCircle } from 'lucide-react';

export const TASK_STATUS = {
  succeed: { label: 'Succeed', value: 'succeed', icon: CheckCircleIcon },
  pending: { label: 'Pending', value: 'pending', icon: CircleDashedIcon },
  processing: { label: 'Processing', value: 'processing', icon: LoaderIcon },
  failed: { label: 'Failed', value: 'failed', icon: XCircle },
} as const;

export const taskStatusCell = <T extends { status: string, error: string | null }> (props: CellContext<T, keyof typeof TASK_STATUS | unknown>) => {
  const state = props.getValue();
  const info = TASK_STATUS[state as keyof typeof TASK_STATUS];

  if (info) {
    const error = props.row.original.error;

    const el = (
      <span className="flex gap-1">
        <info.icon className="w-4 h-4" />
        <span>{info.label}</span>
      </span>
    );

    if (state === 'failed') {
      return (
        <Tooltip>
          <TooltipTrigger>
            {el}
          </TooltipTrigger>
          <TooltipContent>
            <h6 className="font-semibold mb-2">Error message</h6>
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
