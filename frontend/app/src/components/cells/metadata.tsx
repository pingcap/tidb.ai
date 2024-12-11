import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { CellContext } from '@tanstack/react-table';
import { AlertTriangleIcon, BracesIcon } from 'lucide-react';
import type { ReactElement } from 'react';
import { collapseAllNested, defaultStyles, JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

export const metadataCell = (props: CellContext<any, any>) => {
  const metadata = props.getValue();

  if (!metadata) {
    return '-';
  }

  const warnings = (metadata.loader?.warning as string[]) ?? [];
  let warningEl: ReactElement<any> | undefined;
  if (warnings.length > 0) {
    warningEl = (
      <Tooltip>
        <TooltipTrigger>
          <span className='inline-flex gap-1 items-center text-warning'>
            <AlertTriangleIcon className="ml-1 w-4 h-4" />
            {warnings.length}
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom" className='p-4 space-y-2'>
          {warnings.map((warning, index) => <p key={index}>{warning}</p>)}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <BracesIcon className="w-4 h-4" />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <ScrollArea className="max-w-[400px] max-h-[300px]">
            <JsonView data={metadata} shouldExpandNode={collapseAllNested} style={defaultStyles} />
            <ScrollBar orientation="vertical" />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TooltipContent>
      </Tooltip>
      {warningEl}
    </>
  );
};