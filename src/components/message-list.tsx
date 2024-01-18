import { Message, type MessageProps } from '@/components/message';
import { cn } from '@/lib/utils';

export function MessageList ({ className, messages }: { className?: string, messages: MessageProps[] }) {
  return (
    <ol className={cn('space-y-8 p-4')}>
      {messages.map(message => (
        <li key={message.id}>
          <Message  {...message} />
        </li>
      ))}
    </ol>
  );
}