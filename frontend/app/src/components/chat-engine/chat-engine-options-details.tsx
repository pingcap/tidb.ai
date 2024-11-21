import type { ChatEngine, ChatEngineOptions } from '@/api/chat-engines';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ChatEngineOptionsDetails ({
  options,
}: {
  detailed?: boolean
  editable?: ChatEngine
  options: ChatEngineOptions
}) {
  return (
    <>
      <Alert variant="destructive">
        <AlertTitle>Work in progress</AlertTitle>
      </Alert>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(options, undefined, 2)}
      </pre>
    </>
  );
}