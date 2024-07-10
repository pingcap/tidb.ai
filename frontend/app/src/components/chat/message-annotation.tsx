import type { OngoingState } from '@/components/chat/chat-controller';
import { LoaderIcon } from 'lucide-react';

export function MessageAnnotation ({ state }: { state: OngoingState }) {
  let text: string | undefined = state.display;

  return (
    <div className="text-muted-foreground leading-tight">
      <LoaderIcon className="inline-block animate-spin w-4 h-4 mr-2" />
      <span className="text-xs">{text}</span>
    </div>
  );
}
