import type { ConversationMessageGroupProps } from '@/components/chat/use-grouped-conversation-messages';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function MessageError ({ group }: { group: ConversationMessageGroupProps }) {
  let error: string | undefined;

  if (group.assistantAnnotation.state === 'ERROR') {
    error = group.assistantAnnotation.stateMessage ?? 'Unknown error';
  } else if (group.assistantMessageError) {
    error = group.assistantMessageError;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Failed to generate response</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  } else {
    return null;
  }
}
