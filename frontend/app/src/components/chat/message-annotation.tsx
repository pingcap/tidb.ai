import { useChatMessageStreamState } from '@/components/chat/chat-hooks';
import { ChatMessageController } from '@/components/chat/chat-message-controller';
import { AppChatStreamState } from '@/components/chat/chat-stream-state';
import { LoaderIcon } from 'lucide-react';

const excludedStates = [
  AppChatStreamState.UNKNOWN,
  AppChatStreamState.FINISHED,
  AppChatStreamState.FAILED,
];

export function MessageAnnotation ({ message }: { message: ChatMessageController | undefined }) {
  const state = useChatMessageStreamState(message);

  if (!state || excludedStates.includes(state.state)) {
    return null;
  }

  return (
    <div className="text-muted-foreground leading-tight">
      <LoaderIcon className="inline-block animate-spin w-4 h-4 mr-2" />
      <span className="text-xs">{state.display}</span>
    </div>
  );
}
