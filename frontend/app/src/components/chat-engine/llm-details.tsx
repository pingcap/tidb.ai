import type { ChatEngine, ChatEngineLLMOptions } from '@/api/chat-engines';
import { EditOptionsLlmPromptForm } from '@/components/chat-engine/edit-options-llm-prompt-form';
import { PromptViewer } from '@/components/chat-engine/prompt-viewer';
import { OptionDetail } from '@/components/option-detail';
import { usePortalContainer } from '@/components/portal-provider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ChatEngineLLMDetails ({ editable, options }: { editable?: ChatEngine, options: ChatEngineLLMOptions }) {
  return (
    <div className="space-y-2 text-sm">
      {options.condense_question_prompt && <OptionDetail title="Condense question prompt" value={<PromptPreviewDialog title="Condense question prompt" value={options.condense_question_prompt} />} editPanel={editable && <EditOptionsLlmPromptForm chatEngine={editable} type="condense_question_prompt" />} />}
      {options.refine_prompt && <OptionDetail title="Refine prompt" value={<PromptPreviewDialog title="Refine prompt" value={options.refine_prompt} />} editPanel={editable && <EditOptionsLlmPromptForm chatEngine={editable} type="refine_prompt" />} />}
      {options.text_qa_prompt && <OptionDetail title="Text QA prompt" value={<PromptPreviewDialog title="Text QA prompt" value={options.text_qa_prompt} />} editPanel={editable && <EditOptionsLlmPromptForm chatEngine={editable} type="text_qa_prompt" />} />}
      {options.intent_graph_knowledge && <OptionDetail title="Intent Graph Knowledge prompt" value={<PromptPreviewDialog title="Intent Graph Knowledge prompt" value={options.intent_graph_knowledge} />} editPanel={editable && <EditOptionsLlmPromptForm chatEngine={editable} type="intent_graph_knowledge" />} />}
      {options.normal_graph_knowledge && <OptionDetail title="Normal Graph Knowledge prompt" value={<PromptPreviewDialog title="Normal Graph Knowledge prompt" value={options.normal_graph_knowledge} />} editPanel={editable && <EditOptionsLlmPromptForm chatEngine={editable} type="normal_graph_knowledge" />} />}
    </div>
  );
}

function PromptPreviewDialog ({ title, value }: { title: string, value: string }) {
  const container = usePortalContainer();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Show prompt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[720px] w-full" container={container}>
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh]">
          <PromptViewer value={value} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
