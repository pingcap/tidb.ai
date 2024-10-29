import { useChatMessageField, useChatMessageStreamHistoryStates, useChatMessageStreamState } from '@/components/chat/chat-hooks';
import { type OngoingState, type OngoingStateHistoryItem, StackVMChatMessageController } from '@/components/chat/chat-message-controller';
import type { StackVMState, StackVMToolCall } from '@/components/chat/chat-stream-state';
import { isNotFinished } from '@/components/chat/utils';
import { DiffSeconds } from '@/components/diff-seconds';
import { RemarkContent } from '@/components/remark-content';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { StackVM } from '@/lib/stackvm';
import { cn } from '@/lib/utils';
import { motion, type Target } from 'framer-motion';
import { CheckCircleIcon, ChevronUpIcon, ClockIcon, InfoIcon, Loader2Icon, SearchIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export function StackVMMessageAnnotationHistory ({ message }: { message: StackVMChatMessageController | undefined }) {
  const [show, setShow] = useState(true);
  const history = useChatMessageStreamHistoryStates(message);
  const current = useChatMessageStreamState(message);
  const error = useChatMessageField(message, 'error');
  const traceUrl = useChatMessageField(message, 'trace_url');

  const finished = !isNotFinished(current) || !!error;

  const stackVMTaskUrl = useMemo(() => {
    if (traceUrl) {
      return traceUrl;
    }
    let id: string | undefined;
    if (current) {
      id = current.state.task_id;
    } else {
      id = history?.[0]?.state.state.task_id;
    }
    if (id) {
      return `https://stackvm.tidb.ai/?task_id=${id}`;
    }
    return undefined;
  }, [traceUrl, history, current]);

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
            <MessageAnnotationHistoryItem key={index} index={index} history={history} item={item} />
          ))}
          {error && <MessageAnnotationHistoryError history={history} error={error} />}
          {current && !current.finished && <MessageAnnotationCurrent history={history} current={current} />}
        </ol>
        {stackVMTaskUrl && <div className="mt-2 text-xs">
          Visit <a className="underline" target='_blank' href={stackVMTaskUrl}>StackVM</a> to see more details
        </div>}
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

function StackVMCheckpoint ({ state }: { state: StackVMState }) {
  const step = useMemo(() => {
    return state.state.plan.steps.find(step => step.id === `step:${state.state.program_counter}`);
  }, [state.state]);

  if (!step) {
    return null;
  }

  switch (step.type) {
    case 'reasoning':
      return 'Thoughts';
    case 'assign':
      return `Assign Variables`;
    case 'calling':
      return `Tool Call`;
    case 'jmp':
      return `Jump`;
  }
}

function StackVMDetails (state: StackVMState) {
  const step = useMemo(() => {
    return state.state.plan.steps.find(step => step.id === `step:${state.state.program_counter}`);
  }, [state.state]);

  if (!step) {
    return null;
  }

  switch (step.type) {
    case 'reasoning':
      return <RemarkContent className="ml-2 pl-4 text-muted-foreground text-xs border-l border-l-green-500/50 pt-1 prose-strong:text-muted-foreground">{(step as StackVM.model.StepModel<'reasoning'>).parameters.chain_of_thoughts}</RemarkContent>;
    case 'calling':
      return (
        <ul className="ml-2 pl-4 text-muted-foreground text-xs border-l border-l-green-500/50 pt-1">
          {state.toolCalls.map(item => (
            <ToolCallInfo key={item.toolCallId} toolCall={item} />
          ))}
        </ul>
      );
    case 'assign':
      return (
        <div className="ml-2 pl-4 text-muted-foreground text-xs border-l border-l-green-500/50 pt-1">
          <ul className="space-y-1 block">
            {Object.entries(step.parameters).map(([key, value]) => (
              <li key={key} className="flex gap-2 items-center">
                <div><code>{key}</code>:</div>
                <JsonValueViewer value={value} />
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

function ToolCallInfo ({ toolCall }: { toolCall: StackVMToolCall }) {
  return (
    <div className="space-y-1">
      <div>
        <b><code>{toolCall.toolName}</code></b>
        {' '}
        <span>(</span>
      </div>
      <ul className="space-y-1">
        {Object.entries(toolCall.args).map(([key, value]) => (
          <li key={key} className="ml-2 flex gap-2 items-center">
            <div><code>{key}</code>:</div>
            <JsonValueViewer value={value} />
          </li>
        ))}
      </ul>
      <span>)</span>
      {('result' in toolCall) && <>
        {(toolCall.result && typeof toolCall.result === 'object' && !(toolCall.result instanceof Array))
          ? (
            <>
              <div className="flex items-center gap-2">
                <b>Result:</b>
                <span>{'{'}</span>
              </div>
              <ul className="space-y-1 block">
                {Object.entries(toolCall.result).map(([key, value]) => (
                  <li key={key} className="ml-2 flex gap-2 items-center">
                    <div><code>{key}</code>:</div>
                    <JsonValueViewer value={value} />
                  </li>
                ))}
              </ul>
              <div>{'}'}</div>
            </>
          )
          : <div className="flex items-center gap-2">
            <b>Result:</b>
            <JsonValueViewer value={toolCall.result} />
          </div>}
      </>
      }
    </div>
  )
    ;
}

function JsonValueViewer ({ value }: { value: unknown }) {
  if (value == null) {
    return String(value);
  }

  if (typeof value === 'object') {
    let label: string;
    if (value instanceof Array) {
      label = `array<${value.length} items>`;
    } else {
      label = `object<${Object.keys(value).length} entries>`;
    }

    return (
      <Popover>
        <PopoverTrigger className="inline-flex items-center">
          <SearchIcon className="size-3 mr-1" />
          {label}
        </PopoverTrigger>
        <PopoverContent className="max-w-[320px] max-h-[30vh] overflow-y-auto overflow-x-hidden">
          <pre className="text-xs w-full whitespace-pre-wrap">
            {JSON.stringify(value, undefined, 2)}
          </pre>
        </PopoverContent>
      </Popover>
    );
  } else {
    const isText = typeof value === 'string';
    const string = String(value);
    if (string.length > 25) {
      return (
        <Popover>
          <PopoverTrigger className={cn('inline-flex items-center')}>
            <SearchIcon className="size-3 mr-1 text-muted-foreground" />
            {isText && <span>{'"'}</span>}{string.slice(0, 25) + '...'}{isText && <span>{'"'}</span>}
          </PopoverTrigger>
          <PopoverContent className="max-w-[320px] max-h-[30vh] overflow-y-auto overflow-x-hidden">
            <pre className="text-xs w-full whitespace-pre-wrap">
              {string}
            </pre>
          </PopoverContent>
        </Popover>
      );
    } else {
      return (
        <span className={cn()}>
          {isText && <span>{'"'}</span>}{string}{isText && <span>{'"'}</span>}
        </span>
      );
    }
  }
}

function MessageAnnotationHistoryItem ({ history, item: { state, time }, index }: { history: OngoingStateHistoryItem<StackVMState>[], index: number, item: OngoingStateHistoryItem<StackVMState> }) {
  return (
    <motion.li className="relative mb-2" initial={itemInitial} animate={itemAnimate}>
      {index > 1 && <span className="absolute left-2 bg-green-500/50 h-2" style={{ width: 1, top: -8 }} />}
      <div className="flex gap-2 items-center">
        <CheckedCircle className="size-4" initial={itemIconInitial} animate={itemSuccessIconAnimate} />
        <span>{state.display === '[deprecated]' ? <StackVMCheckpoint state={state.state} /> : state.display}</span>
      </div>
      <StackVMDetails {...state.state} />
    </motion.li>
  );
}

function MessageAnnotationHistoryError ({ history, error }: { history: OngoingStateHistoryItem<StackVMState>[], error: string }) {
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

function MessageAnnotationCurrent ({ history, current }: { history: OngoingStateHistoryItem<StackVMState>[], current: OngoingState<StackVMState> }) {
  return (
    <motion.li
      key={current.state?.state.program_counter}
      className="relative"
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
        <span>{current.display === '[deprecated]' ? <StackVMCheckpoint state={current.state} /> : current.display}</span>
      </div>
      <StackVMDetails {...current.state} />
    </motion.li>
  );
}
