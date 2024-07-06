import type { ChatEngineLLMOptions } from '@/api/chat-engines';
import { OptionDetail } from '@/components/chat-engine/option-detail';
import { PromptViewer } from '@/components/chat-engine/prompt-viewer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ChatEngineLLMDetails ({ options }: { options: ChatEngineLLMOptions }) {
  return (
    <div className="space-y-2 text-sm">
      <OptionDetail title="Provider" value={options.provider} />
      <OptionDetail title="Model" value={options[`${options.provider}_chat_model` as never]} />
      <OptionDetail title="Reranker Provider" value={options.reranker_provider} />
      <OptionDetail title="Reranker Top K" value={options.reranker_top_k} />
      {options.condense_question_prompt && <OptionDetail title="Condense question prompt" value={<PromptPreviewDialog title="Condense question prompt" value={options.condense_question_prompt} />} />}
      {options.refine_prompt && <OptionDetail title="Refine prompt" value={<PromptPreviewDialog title="Refine prompt" value={options.refine_prompt} />} />}
      {options.text_qa_prompt && <OptionDetail title="Text QA prompt" value={<PromptPreviewDialog title="Text QA prompt" value={options.text_qa_prompt} />} />}
    </div>
  );
}

function PromptPreviewDialog ({ title, value }: { title: string, value: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Show prompt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[720px] w-full">
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
