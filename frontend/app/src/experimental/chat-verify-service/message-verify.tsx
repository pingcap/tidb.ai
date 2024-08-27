import { getVerify, isFinalVerifyState, isVisibleVerifyState, type MessageVerifyResponse, verify, VerifyStatus } from '#experimental/chat-verify-service/api';
import { useAuth } from '@/components/auth/AuthProvider';
import { useChatMessageField, useChatMessageStreamState } from '@/components/chat/chat-hooks';
import type { ChatMessageController } from '@/components/chat/chat-message-controller';
import { isNotFinished } from '@/components/chat/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { getErrorMessage } from '@/lib/errors';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2Icon, CheckIcon, ChevronDownIcon, CircleMinus, Loader2Icon, XIcon } from 'lucide-react';
import { InformationCircleIcon } from 'nextra/icons';
import { type ReactElement, useEffect, useState } from 'react';
import useSWR from 'swr';

export function MessageVerify ({ user, assistant }: { user: ChatMessageController | undefined, assistant: ChatMessageController | undefined }) {
  const [open, setOpen] = useState(false);
  const messageState = useChatMessageStreamState(assistant);
  const question = useChatMessageField(user, 'content');
  const answer = useChatMessageField(assistant, 'content');

  const me = useAuth();
  const [verifyId, setVerifyId] = useState<string>();
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<unknown>();

  const enabled = useExperimentalMessageVerifyFeature();
  const isSuperuser = !!me.me?.is_superuser;

  const shouldPoll = enabled && !!verifyId && !!assistant && isSuperuser;
  const { data: result, isLoading: isLoadingResult, error: pollError } = useSWR(
    shouldPoll && `experimental.chat-message.${assistant.id}.verify`, () => getVerify(verifyId!),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      errorRetryCount: 0,
      refreshInterval: data => {
        if (!data) {
          return 0;
        }
        return !isFinalVerifyState(data.status) ? 1000 : 0;
      },
    },
  );

  const messageFinished = !isNotFinished(messageState);
  const canOpen = result ? isVisibleVerifyState(result.status) : false;
  const creating = verifying || !!(verifyId && !result && isLoadingResult);
  const error: unknown = verifyError ?? pollError;

  useEffect(() => {
    if (enabled && !verifyId && question && answer && messageFinished && !verifying) {
      setVerifying(true);
      verify(question, answer)
        .then(result => setVerifyId(result.job_id), error => setVerifyError(error))
        .finally(() => {
          setVerifying(false);
        });
    }
  }, [enabled, verifyId, messageFinished, question, answer, verifying]);

  useEffect(() => {
    console.debug(`[message-verify]`, result);
  }, [result]);

  if (!isSuperuser || !enabled || !messageFinished) {
    return null;
  }

  return (
    <Collapsible
      open={canOpen ? open : false}
      onOpenChange={setOpen}
      className="p-2 border rounded-lg"
      disabled={!canOpen}
    >
      <CollapsibleTrigger asChild>
        <Button className="group gap-2 w-full" variant="ghost">
          <MessageVerifyHeader result={result} creating={creating} error={error} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent forceMount>
        <AnimatePresence>
          {open && result && <motion.div
            transition={{
              type: 'spring',
              duration: 0.25,
              bounce: false,
            }}
            initial={{ height: 0, opacity: 0, overflowY: 'hidden' }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0, overflowY: 'hidden' }}
            style={{ width: 'var(--radix-collapsible-content-width)' }}
            layout="size"
          >
            <ul className="space-y-2 px-2">
              {result.runs.map(((run, index) => (
                <li key={index}>
                  <MessageVerifyRun run={run} />
                </li>
              )))}
            </ul>
          </motion.div>}
        </AnimatePresence>
      </CollapsibleContent>
      <div className="mt-2 px-4 text-xs text-muted-foreground">
        Powered by <a className="underline font-bold" href="https://www.pingcap.com/tidb-serverless/" target="_blank">TiDB Serverless</a>
      </div>
    </Collapsible>
  );
}

const defaultMessages = {
  'creating': 'Prepare to validate message...',
  'error': 'Failed to validate message.',
  [VerifyStatus.CREATED]: 'Prepare to validate message...',
  [VerifyStatus.EXTRACTING]: 'Extracting SQL...',
  [VerifyStatus.VALIDATING]: 'Validation SQL...',
  [VerifyStatus.SUCCESS]: 'Message validation succeed.',
  [VerifyStatus.FAILED]: 'Message validation failed.',
  [VerifyStatus.SKIPPED]: 'Message validated skipped.',
};

const skippedIcon = <CircleMinus className="size-4" />;
const loadingIcon = <Loader2Icon className="size-4 animate-spin repeat-infinite" />;
const succeedIcon = <CheckCircle2Icon className="size-4 text-green-500" />;
const failedIcon = <InformationCircleIcon className="size-4 text-yellow-500" />;
const errorIcon = <InformationCircleIcon className="size-4 text-destructive" />;

function MessageVerifyHeader ({ creating, error, result }: { creating?: boolean, error: unknown, result: MessageVerifyResponse | undefined }) {
  let icon: ReactElement | undefined;
  let message: string | undefined;
  const indicatorVisible = result ? isVisibleVerifyState(result.status) : false;

  if (creating) {
    icon = loadingIcon;
    message = defaultMessages.creating;
  } else if (error) {
    icon = errorIcon;
    message = getErrorMessage(error) ?? defaultMessages.error;
  } else {
    switch (result?.status) {
      case VerifyStatus.CREATED:
      case VerifyStatus.EXTRACTING:
      case VerifyStatus.VALIDATING:
        icon = loadingIcon;
        break;
      case VerifyStatus.SUCCESS:
        icon = succeedIcon;
        break;
      case VerifyStatus.FAILED:
        icon = failedIcon;
        break;
      case VerifyStatus.SKIPPED:
        icon = skippedIcon;
        break;
      default:
        icon = undefined;
        break;
    }
    message = result?.message ?? (result ? defaultMessages[result.status] : undefined) ?? 'Unknown validation state.';
  }

  return (
    <>
      {icon}
      {message}
      <ChevronDownIcon className={cn('size-4 ml-auto transition-transform group-data-[state=open]:rotate-180', indicatorVisible ? 'visible' : 'invisible')} />
    </>
  );
}

function MessageVerifyRun ({ run }: { run: MessageVerifyResponse.Run }) {
  return (
    <div className="p-2 space-y-1">
      <pre className="whitespace-pre-wrap text-xs text-accent-foreground rounded">
        {run.success ? <CheckIcon className="inline-block mr-2 size-3 text-green-500" /> : <XIcon className="inline-block mr-2 size-3 text-red-500" />}
        <code>{run.sql}</code>
      </pre>
      <p className="text-xs text-muted-foreground">
        {run.explanation}
      </p>
      {run.success && <pre className="whitespace-pre-wrap text-xs bg-muted text-muted-foreground p-2 rounded">{JSON.stringify(run.results)}</pre>}
      {!run.success && <pre className="whitespace-pre-wrap text-xs bg-muted text-muted-foreground p-2 rounded">{run.sql_error_code} {run.sql_error_message}</pre>}
    </div>
  );
}

function useExperimentalMessageVerifyFeature () {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(localStorage.getItem('tidbai.experimental.verify-chat-message') === 'on');
  }, []);

  return enabled;
}
