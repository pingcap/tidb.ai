import { useChatMessageStreamState } from '@/components/chat/chat-hooks';
import type { ChatMessageController } from '@/components/chat/chat-message-controller';
import { isNotFinished } from '@/components/chat/utils';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function MessageSection ({ className, message, children }: { className?: string, message: ChatMessageController | undefined, children: ReactNode }) {
  const state = useChatMessageStreamState(message);
  const animation = isNotFinished(state);

  return (
    <motion.section
      className={cn('space-y-0', className)}
      initial={animation && { y: '-30%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {children}
    </motion.section>
  );
}