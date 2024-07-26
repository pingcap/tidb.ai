import { MessageInput } from '@/components/chat/message-input';
import { type UseAskReturns } from '@/components/chat/use-ask';
import { useRef } from 'react';

export function Ask ({ className, loading, ask, engine, setEngine }: { className?: string } & UseAskReturns) {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <form
      className={className}
      onSubmit={e => {
        const message = ref.current?.value ?? '';
        e.preventDefault();
        ask(message);
        setEngine(undefined);
      }}
    >
      <MessageInput className="w-full" disabled={loading} inputRef={ref} engine={engine} onEngineChange={setEngine} />
    </form>
  );
}
