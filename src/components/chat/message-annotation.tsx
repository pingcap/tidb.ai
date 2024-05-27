import type { ConversationMessageGroupProps } from '@/components/chat/use-grouped-conversation-messages';
import { LoaderIcon } from 'lucide-react';

export function MessageAnnotation ({ assistantAnnotation }: { assistantAnnotation: ConversationMessageGroupProps['assistantAnnotation'] }) {
  console.log(assistantAnnotation);
  let text: string | undefined;
  switch (assistantAnnotation.state) {
    case 'CONNECTING':
      text = assistantAnnotation.stateMessage || 'Connecting to server...';
      break;
    case 'CREATING':
      text = assistantAnnotation.stateMessage || 'Preparing chat...';
      break;
    case 'KG_RETRIEVING':
      text = assistantAnnotation.stateMessage || 'Retrieving knowledge...';
      break;
    case 'SEARCHING':
      text = assistantAnnotation.stateMessage || 'Searching...';
      break;
    case 'RERANKING':
      text = assistantAnnotation.stateMessage || 'Reranking...';
      break;
    case 'GENERATING':
      text = assistantAnnotation.stateMessage || 'Generating...';
      break;
  }

  if (!text) {
    return null;
  }

  return (
    <div className="text-muted-foreground leading-tight">
      <LoaderIcon className="inline-block animate-spin w-4 h-4 mr-2" />
      <span className="text-xs">{text}</span>
    </div>
  );
}
