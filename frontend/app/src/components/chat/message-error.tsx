import type { ChatMessage } from '@/api/chats';
import type { OngoingState } from '@/components/chat/chat-controller';
import { AppChatStreamState } from '@/components/chat/chat-stream-state';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';

export function MessageError ({ message, ongoing }: { message: ChatMessage, ongoing: OngoingState }) {
  let variant: 'destructive' | 'warning' = 'destructive';
  let errorTitle = 'Failed to generate response';
  let error: string | undefined;

  if (message.error) {
    error = message.error;
  } else if (ongoing.state === AppChatStreamState.UNKNOWN) {
    variant = 'warning';
    errorTitle = 'Unable to access message content';
    error = `This message is not finished yet or accidentally terminated. (created at ${format(message.created_at, 'yyyy-MM-dd HH:mm:ss')})`;
  }

  if (error) {
    return (
      <Alert variant={variant}>
        <AlertTitle>{errorTitle}</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  } else {
    return null;
  }
}
