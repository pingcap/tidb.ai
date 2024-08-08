import type { ChatEngine, ChatEngineKnowledgeGraphOptions } from '@/api/chat-engines';
import { EditKgBooleanForm } from '@/components/chat-engine/edit-kg-boolean-form';
import { EditKgIntegerForm } from '@/components/chat-engine/edit-kg-integer-form';
import { OptionDetail } from '@/components/option-detail';

export function ChatEngineKnowledgeGraphDetails ({ detailed, editable, options }: { detailed: boolean, editable?: ChatEngine, options: ChatEngineKnowledgeGraphOptions }) {
  return (
    <div className="space-y-2 text-sm">
      <OptionDetail title="Status" value={options.enabled ? 'Enabled' : 'Disabled'} valueClassName={options.enabled ? 'text-green-500' : 'text-muted-foreground'} editPanel={editable && <EditKgBooleanForm chatEngine={editable} type="enabled" />} />
      {(detailed || options.enabled) && (
        <>
          <OptionDetail title="Depth" value={options.depth} editPanel={editable && <EditKgIntegerForm chatEngine={editable} type="depth" />} />
          <OptionDetail title="With Degree" value={options.with_degree ? 'Yes' : 'No'} valueClassName={options.with_degree ? 'text-green-500' : 'text-muted-foreground'} editPanel={editable && <EditKgBooleanForm chatEngine={editable} type="with_degree" />} />
          <OptionDetail title="Include Meta" value={options.include_meta ? 'Yes' : 'No'} valueClassName={options.include_meta ? 'text-green-500' : 'text-muted-foreground'} editPanel={editable && <EditKgBooleanForm chatEngine={editable} type="include_meta" />} />
          <OptionDetail title="Using Intent Search" value={options.using_intent_search ? 'Yes' : 'No'} valueClassName={options.using_intent_search ? 'text-green-500' : 'text-muted-foreground'} editPanel={editable && <EditKgBooleanForm chatEngine={editable} type="using_intent_search" />} />
        </>
      )}
    </div>
  );
}
