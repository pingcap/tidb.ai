import { PlaygroundError, PlaygroundResult, PlaygroundSubmit, PlaygroundTextarea, SplitterPlaygroundForm } from '@/app/(main)/(admin)/extensions/[identifier]/splitter.client';
import { AutoFormFields } from '@/components/auto-form/AutoFormFields';
import { getZodShapeDefault } from '@/components/auto-form/fields/utils';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { rag } from '@/core/interface';
import type { ComponentConstructor } from '@/core/registry';

export function SplitterPlayground ({ Splitter }: { Splitter: ComponentConstructor<rag.Splitter<any, any, any>> }) {
  const refine = (option: any) => {
    if (option.separators) {
      option.separators = option.separators.map((s: string) => s
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n'),
      );
    }
    return option;
  };

  return (
    <SplitterPlaygroundForm
      identifier={Splitter.identifier}
      defaultValues={refine(getZodShapeDefault(Splitter.optionsSchema as any))}
    >
      <h2 className="p-4 font-semibold text-lg">
        {Splitter.displayName} | Playground
      </h2>
      <ResizablePanelGroup className="" direction="horizontal">
        <ResizablePanel className="h-content">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel className="p-4 min-h-40">
              <PlaygroundTextarea />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="p-4 min-h-40">
              <ScrollArea className="h-full">
                <PlaygroundError />
                <h3 className="font-semibold pb-4 sticky top-0 bg-background">Separated chunks</h3>
                <PlaygroundResult />
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="p-4 space-y-4 max-w-64 w-auto">
          <AutoFormFields schema={Splitter.optionsSchema as any} />
          <PlaygroundSubmit />
        </ResizablePanel>
      </ResizablePanelGroup>
    </SplitterPlaygroundForm>
  );
}