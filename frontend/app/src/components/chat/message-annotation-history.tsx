import { useChatMessageStreamHistoryStates, useChatMessageStreamState } from '@/components/chat/chat-hooks';
import type { ChatMessageController } from '@/components/chat/chat-message-controller';
import { cn } from '@/lib/utils';
import { differenceInMilliseconds } from 'date-fns';
import { motion } from 'framer-motion';
import { CheckCircleIcon, Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const CheckedCircle = motion(CheckCircleIcon);

export function MessageAnnotationHistory ({ message }: { message: ChatMessageController | undefined }) {
  const history = useChatMessageStreamHistoryStates(message);
  const current = useChatMessageStreamState(message);
  const [_, setV] = useState(0);

  useEffect(() => {
    if (current && !current.finished) {
      const interval = setInterval(() => {
        setV(v => v + 1);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [current]);

  return (
    <ol className="text-sm">
      {history?.map(({ state, time }, index, history) => (
        index > 0 && (
          <motion.li
            className={cn('relative mb-2', index === history.length - 1 && current && !current.finished && 'mb-2')}
            key={index}
            initial={{
              opacity: 0.5,
            }}
            animate={{
              opacity: 1,
            }}
          >
            {index > 1 && <span className="absolute left-2 bg-green-500 h-2" style={{ width: 1, top: -8 }} />}
            <div className="flex gap-2 items-center">
              <CheckedCircle
                className="size-4 text-green-500"
                initial={{
                  color: 'rgb(113 113 122)',
                }}
                animate={{
                  color: 'rgb(34 197 94)',
                }}
              />
              <span>
                {state.display}
              </span>
              <time className="text-muted-foreground text-xs">{(differenceInMilliseconds(time, history[index - 1].time) / 1000).toFixed(1)}s</time>
            </div>
            {state.message && <div className='ml-2 pl-4 text-muted-foreground text-xs border-l border-l-green-500 pt-1'>{state.message}</div>}
          </motion.li>
        )
      ))}
      {current && !current.finished && <motion.li
        key={current.state}
        className="relative space-y-1"
        initial={{
          opacity: 0,
          height: 0,
          x: -40,
        }}
        animate={{
          opacity: 0.5,
          height: 'auto',
          x: 0,
        }}
      >
        <div className="flex gap-2 items-center">
          {(history?.length ?? 0) > 1 && <span className="absolute left-2 opacity-50 bg-zinc-500 h-2" style={{ width: 1, top: -8 }} />}
          <Loader2Icon className="size-4 animate-spin repeat-infinite text-muted-foreground" />
          <span>
            {current.display}
          </span>
          {history && <time className="text-muted-foreground text-xs">{(differenceInMilliseconds(new Date(), history[history.length - 1].time) / 1000).toFixed(1)}s</time>}
        </div>
        {current.message && <div className='ml-2 pl-4 text-muted-foreground text-xs border-l border-l-green-500 pt-1'>{current.message}</div>}
      </motion.li>}
    </ol>
  );
}