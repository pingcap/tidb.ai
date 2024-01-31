import { MessageInput } from '@/components/message-input';
import { type UseAskReturns } from '@/components/use-ask';
import { useRef } from 'react';

export function Ask ({ className, loading, ask }: { className?: string } & UseAskReturns) {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <form
      className={className}
      onSubmit={e => {
        const message = ref.current?.value ?? '';
        e.preventDefault();
        if (message.trim()) {
          ask(message);
        }
        return false;
      }}
    >
      <MessageInput className="w-full" disabled={loading} inputRef={ref} />
    </form>
  );
}