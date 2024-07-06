import type { ChatEngineKnowledgeGraphOptions } from '@/api/chat-engines';
import { OptionDetail } from '@/components/chat-engine/option-detail';

export function ChatEngineKnowledgeGraphDetails ({ detailed, options }: { detailed: boolean, options: ChatEngineKnowledgeGraphOptions }) {
  return (
    <div className="space-y-2 text-sm">
      <OptionDetail title="Status" value={options.enabled ? 'Enabled' : 'Disabled'} valueClassName={options.enabled ? 'text-green-500' : 'text-muted-foreground'} />
      {(detailed || options.enabled) && (
        <>
          <OptionDetail title="Depth" value={options.depth} />
          <OptionDetail title="With Degree" value={options.with_degree ? 'Yes' : 'No'} />
          <OptionDetail title="Include Meta" value={options.include_meta ? 'Yes' : 'No'} />
        </>
      )}
    </div>
  );
}