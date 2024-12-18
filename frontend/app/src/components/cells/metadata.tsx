import { ThemedStyle } from '@/components/themed-style';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { CellContext } from '@tanstack/react-table';
import JsonView from '@uiw/react-json-view';
import { darkTheme } from '@uiw/react-json-view/dark';
import { lightTheme } from '@uiw/react-json-view/light';
import { BracesIcon } from 'lucide-react';

export const metadataCell = (props: CellContext<any, any>) => {
  const metadata = props.getValue();

  if (!metadata) {
    return '-';
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <BracesIcon className="w-4 h-4" />
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <ScrollArea className="w-[400px] max-w-[400px] max-h-[300px]">
          <ThemedStyle dark={darkTheme} light={lightTheme}>
            <JsonView value={metadata} collapsed={2} />
          </ThemedStyle>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </TooltipContent>
    </Tooltip>
  );
};
