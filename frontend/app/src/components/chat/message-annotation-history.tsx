import { useChatMessageStreamHistoryStates, useChatMessageStreamState } from '@/components/chat/chat-hooks';
import type { ChatMessageController } from '@/components/chat/chat-message-controller';
import { isNotFinished } from '@/components/chat/utils';
import { DiffSeconds } from '@/components/diff-seconds';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ChevronUpIcon, ClockIcon, Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const CheckedCircle = motion(CheckCircleIcon);

export function MessageAnnotationHistory ({ message }: { message: ChatMessageController | undefined }) {
  const [show, setShow] = useState(true);
  const history = useChatMessageStreamHistoryStates(message);
  const current = useChatMessageStreamState(message);

  const finished = !isNotFinished(current);

  useEffect(() => {
    if (finished) {
      const handler = setTimeout(() => {
        setShow(false);
      }, 2000);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [finished]);

  return (
    <div className="!mt-1">
      <motion.div
        animate={show ? { height: 'auto', opacity: 1, scale: 1, pointerEvents: 'auto' } : { height: 0, opacity: 0, scale: 0.3, pointerEvents: 'none' }}
        style={{
          transformOrigin: 'left top',
        }}
      >
        <ol
          className="text-sm"
        >
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
                  {index > 0 && <DiffSeconds className="text-muted-foreground text-xs" from={history[index - 1].time} to={time} />}
                </div>
                {state.message && <div className="ml-2 pl-4 text-muted-foreground text-xs border-l border-l-green-500 pt-1">{state.message}</div>}
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
              {history && history.length > 0 && <DiffSeconds className="text-muted-foreground text-xs" from={history[history.length - 1].time} />}
            </div>
            {current.message && <div className="ml-2 pl-4 text-muted-foreground text-xs border-l border-l-green-500 pt-1">{current.message}</div>}
          </motion.li>}
        </ol>
        <Button variant="ghost" size="sm" className="text-muted-foreground h-auto py-1 text-xs mr-1" onClick={() => setShow(false)}>
          <ChevronUpIcon className="size-4 mr-1" />
          Collapse
        </Button>
      </motion.div>
      {history?.length && <motion.button
        onClick={() => setShow(true)}
        className={cn('flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors')}
        animate={show ? { height: 0, opacity: 0, overflow: 'visible', pointerEvents: 'none', scale: 0.5 } : { height: 'auto', opacity: 1, scale: 1, pointerEvents: 'auto' }}
      >
        <ClockIcon className="size-3" />
        <DiffSeconds from={message?.message?.created_at} to={message?.message?.finished_at} />
      </motion.button>}
    </div>
  );
}