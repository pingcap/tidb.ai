import { useChatEngineOptions } from '@/components/chat/context';
import { KnowledgeGraphDebugInfo } from '@/components/chat/knowledge-graph-debug-info';
import { MessageLangfuse } from '@/components/chat/message-langfuse';
import type { ConversationMessageGroupProps } from '@/components/chat/use-grouped-conversation-messages';
import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WorkflowIcon } from 'lucide-react';
import 'react-json-view-lite/dist/index.css';

export interface DebugInfoProps {
  group: ConversationMessageGroupProps;
}

export function DebugInfo ({ group }: DebugInfoProps) {
  const traceURL = group.assistantAnnotation.traceURL;
  const { graph_retriever, retriever, prompts, llm, reranker, metadata_filter } = useChatEngineOptions() ?? {};

  return (
    <div className="my-2 p-2 bg-card border rounded text-xs">
      <h6 className="text-sm font-bold leading-6">Debug info</h6>
      {traceURL && <div className="flex items-center gap-4 text-xs flex-wrap">
        <a className="underline" target="_blank" href={traceURL}>
          <WorkflowIcon className="inline w-3 h-3 mr-1" />
          Langfuse Tracing
        </a>
      </div>}
      <MessageLangfuse group={group} />
      {graph_retriever?.enable && <KnowledgeGraphDebugInfo group={group} />}
      {graph_retriever?.top_k && <div className="mt-2"><b>Knowledge Graph Top K</b>: {graph_retriever.top_k}</div>}
      {graph_retriever?.reranker && (<div className="mt-2"><b>Knowledge Graph Reranker</b>: {graph_retriever.reranker.provider} {graph_retriever.reranker.options?.model}</div>)}
      {retriever?.top_k && <div className="mt-2"><b>Top K</b>: {retriever.top_k}</div>}
      {retriever?.search_top_k && <div className="mt-2"><b>Search Top K</b>: {retriever.search_top_k}</div>}
      {reranker && (<div className="mt-2"><b>Reranker</b>: {reranker.provider} {reranker.options?.model}</div>)}
      {llm && (<div className="mt-2"><b>LLM</b>: {llm.provider} {llm.options?.model}</div>)}
      {prompts && (
        <div className="mt-2">
          <div className="font-bold">
            Prompts
          </div>
          <ul className="pl-2">
            {prompts.condenseQuestion && <PromptDialog title="Condense Question" prompt={prompts.condenseQuestion} />}
            {prompts.refine && <PromptDialog title="Refine" prompt={prompts.refine} />}
            {prompts.textQa && <PromptDialog title="Text QA" prompt={prompts.textQa} />}
          </ul>
        </div>
      )}
    </div>
  );
}

interface PromptDialogProps {
  title: string;
  prompt: string;
}

function PromptDialog ({ title, prompt }: PromptDialogProps) {
  return (
    <li>
      <Dialog>
        <DialogTrigger asChild>
          <button className="cursor-pointer underline">
            {title}
          </button>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>Prompt: {title}</DialogHeader>
            <ScrollArea className="h-72">
              <pre className="text-xs whitespace-pre-wrap">{prompt}</pre>
            </ScrollArea>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </li>
  );
}
