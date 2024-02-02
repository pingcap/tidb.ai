import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { CellContext } from '@tanstack/react-table';
import { CircleDashedIcon, CircleDotDashedIcon, CircleDotIcon, LoaderIcon, XCircle } from 'lucide-react';

export const INDEX_STATES = {
  indexed: { label: 'Indexed', value: 'indexed', icon: CircleDotIcon },
  notIndexed: { label: 'Not Indexed', value: 'notIndexed', icon: CircleDashedIcon },
  staled: { label: 'Staled', value: 'staled', icon: CircleDotDashedIcon },
  indexing: { label: 'Indexing', value: 'indexing', icon: LoaderIcon },
  fail: { label: 'Failed', value: 'fail', icon: XCircle },
} as const;

export const indexStateCell = <T extends { index_state: string, trace: string | null }> (props: CellContext<T, keyof typeof INDEX_STATES>) => {
  const state = props.getValue();
  const info = INDEX_STATES[state];

  if (info) {
    const error = props.row.original.trace;

    const el = (
      <span className="flex gap-1">
        <info.icon className="w-4 h-4" />
        <span>{info.label}</span>
      </span>
    );

    if (state === 'fail') {
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
