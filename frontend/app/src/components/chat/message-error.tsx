import type { MyConversationMessageGroup } from '@/components/chat/use-grouped-conversation-messages';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function MessageError ({ group }: { group: MyConversationMessageGroup }) {
  let error: string | undefined;

  if (group.assistantMessage.error) {
    error = group.assistantMessage.error;
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
