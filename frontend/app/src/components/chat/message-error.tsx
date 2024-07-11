import { ChatMessageController } from '@/components/chat/chat-controller';
import { useChatMessageField, useChatMessageStreamState } from '@/components/chat/chat-hooks';
import { AppChatStreamState } from '@/components/chat/chat-stream-state';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';

export function MessageError ({ message }: { message: ChatMessageController }) {
  const messageError = useChatMessageField(message, 'error');
  const ongoing = useChatMessageStreamState(message);

  let variant: 'destructive' | 'warning' = 'destructive';
  let errorTitle = 'Failed to generate response';
  let error: string | undefined;

  if (messageError) {
    error = messageError;
  } else if (ongoing?.state === AppChatStreamState.UNKNOWN) {
    variant = 'warning';
    errorTitle = 'Unable to access message content';
    error = `This message is not finished yet or accidentally terminated. (created at ${format(message.message.created_at, 'yyyy-MM-dd HH:mm:ss')})`;
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
