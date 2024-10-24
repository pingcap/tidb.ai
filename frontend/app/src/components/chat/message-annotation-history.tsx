import { useChatMessageField, useChatMessageStreamHistoryStates, useChatMessageStreamState } from '@/components/chat/chat-hooks';
import { LegacyChatMessageController, type OngoingState, type OngoingStateHistoryItem } from '@/components/chat/chat-message-controller';
import { isNotFinished } from '@/components/chat/utils';
import { DiffSeconds } from '@/components/diff-seconds';
import { motion, type Target } from 'framer-motion';
import { CheckCircleIcon, ChevronUpIcon, ClockIcon, InfoIcon, Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function MessageAnnotationHistory ({ message }: { message: LegacyChatMessageController | undefined }) {
  const [show, setShow] = useState(true);
  const history = useChatMessageStreamHistoryStates(message);
  const current = useChatMessageStreamState(message);
  const error = useChatMessageField(message, 'error');

  const finished = !isNotFinished(current) || !!error;

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

  if (!history) {
    return <div className="!mt-5" />;
  }

  return (
    <div className="!mt-1">
      <motion.div
        animate={show ? { height: 'auto', opacity: 1, scale: 1, pointerEvents: 'auto' } : { height: 0, opacity: 0, scale: 0.3, pointerEvents: 'none' }}
        style={{
          transformOrigin: 'left top',
        }}
      >
        <ol
          className="text-sm mt-4"
        >
          {history?.map((item, index, history) => (
            index > 0 && <MessageAnnotationHistoryItem key={index} index={index} history={history} item={item} />
          ))}
          {error && <MessageAnnotationHistoryError history={history} error={error} />}
          {current && !current.finished && <MessageAnnotationCurrent history={history} current={current} />}
        </ol>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShow(false)}>
          <ChevronUpIcon className="size-4 mr-1" />
          Collapse
        </button>
      </motion.div>
      <motion.button
        onClick={() => setShow(true)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        animate={show ? { height: 0, opacity: 0, overflow: 'visible', pointerEvents: 'none', scale: 0.5 } : { height: 'auto', opacity: 1, scale: 1, pointerEvents: 'auto' }}
      >
        <ClockIcon className="size-3" />
        {error ? 'Not finished' : <DiffSeconds from={message?.message?.created_at} to={message?.message?.finished_at} />}
      </motion.button>
    </div>
  );
}

const CheckedCircle = motion(CheckCircleIcon);
const InformationCircle = motion(InfoIcon);

const itemInitial: Target = { opacity: 0.5 };
const itemAnimate: Target = { opacity: 1 };

const itemIconInitial: Target = { color: 'rgb(113 113 122 / 50)' };
const itemSuccessIconAnimate: Target = { color: 'rgb(34 197 94)' };
const itemErrorIconAnimate: Target = { color: 'rgb(239 68 68)' };

function MessageAnnotationHistoryItem ({ history, item: { state, time }, index }: { history: OngoingStateHistoryItem[], index: number, item: OngoingStateHistoryItem }) {
  return (
    <motion.li className="relative mb-2" initial={itemInitial} animate={itemAnimate}>
      {index > 1 && <span className="absolute left-2 bg-green-500/50 h-2" style={{ width: 1, top: -8 }} />}
      <div className="flex gap-2 items-center">
        <CheckedCircle className="size-4" initial={itemIconInitial} animate={itemSuccessIconAnimate} />
        <span>{state.display}</span>
        {index > 0 && <DiffSeconds className="text-muted-foreground text-xs" from={history[index - 1].time} to={time} />}
      </div>
      {state.message && <div className="ml-2 pl-4 text-muted-foreground text-xs border-l border-l-green-500/50 pt-1">{state.message}</div>}
    </motion.li>
  );
}

function MessageAnnotationHistoryError ({ history, error }: { history: OngoingStateHistoryItem[], error: string }) {
  return (
    <motion.li className="relative mb-2" initial={itemInitial} animate={itemAnimate}>
      {history.length > 0 && <span className="absolute left-2 bg-muted-foreground h-2" style={{ width: 1, top: -8 }} />}
      <div className="flex gap-2 items-center">
        <InformationCircle className="size-4" initial={itemIconInitial} animate={itemErrorIconAnimate} />
        <span>{error}</span>
      </div>
    </motion.li>
  );
}

function MessageAnnotationCurrent ({ history, current }: { history: OngoingStateHistoryItem[], current: OngoingState }) {
  return (
    <motion.li
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
        {(history?.length ?? 0) > 1 && <span className="absolute left-2 h-2 bg-zinc-500/50" style={{ width: 1, top: -8 }} />}
        <Loader2Icon className="size-4 animate-spin repeat-infinite text-muted-foreground" />
        <span>
          {current.display}
        </span>
        {history && history.length > 0 && <DiffSeconds className="text-muted-foreground text-xs" from={history[history.length - 1].time} />}
      </div>
      {current.message && <div className="ml-2 pl-4 text-muted-foreground text-xs border-l border-l-zinc-500 pt-1">{current.message}</div>}
    </motion.li>
  );
}
