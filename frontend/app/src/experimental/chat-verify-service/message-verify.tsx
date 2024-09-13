import { getVerify, isFinalVerifyState, isVisibleVerifyState, type MessageVerifyResponse, verify, VerifyStatus } from '#experimental/chat-verify-service/api';
import { useRequestScroll } from '@/components/auto-scroll';
import { useChatMessageField, useChatMessageStreamState, useCurrentChatController } from '@/components/chat/chat-hooks';
import type { ChatMessageController } from '@/components/chat/chat-message-controller';
import { isNotFinished } from '@/components/chat/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useExperimentalFeatures } from '@/experimental/experimental-features-provider';
import { getErrorMessage } from '@/lib/errors';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Highlight from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import { CheckCircle2Icon, CheckIcon, ChevronDownIcon, CircleMinus, Loader2Icon, RefreshCwIcon, TriangleAlertIcon, XIcon } from 'lucide-react';
import { type ReactElement, useEffect, useMemo, useState } from 'react';
import { format } from 'sql-formatter';
import useSWR from 'swr';
import '@/components/code-theme.scss';

Highlight.registerLanguage('sql', sql);

export function MessageVerify ({ user, assistant }: { user: ChatMessageController | undefined, assistant: ChatMessageController | undefined }) {
  const [open, setOpen] = useState(false);
  const controller = useCurrentChatController();
  const messageState = useChatMessageStreamState(assistant);
  const question = useChatMessageField(user, 'content');
  const answer = useChatMessageField(assistant, 'content');
  const message_id = useChatMessageField(assistant, 'id');
  const chat_id = useChatMessageField(assistant, 'chat_id');

  const externalRequestId = `${chat_id}_${message_id}`;

  const [verifyId, setVerifyId] = useState<string>();
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<unknown>();

  const serviceUrl = useExperimentalFeatures().message_verify_service;

  const shouldPoll = serviceUrl && !!verifyId && !!assistant;
  const { data: result, isLoading: isLoadingResult, error: pollError } = useSWR(
    shouldPoll && `experimental.chat-message.${assistant.id}.verify`, () => getVerify(serviceUrl, verifyId!),
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

  const triedCreateVerify = !!(verifying || verifyId || verifyError);

  const requestScroll = useRequestScroll();

  useEffect(() => {
    if (serviceUrl && !triedCreateVerify && question && answer && messageFinished) {
      setVerifying(true);
      verify(serviceUrl, { question, answer, external_request_id: externalRequestId })
        .then(result => setVerifyId(result.job_id), error => setVerifyError(error))
        .finally(() => {
          setVerifying(false);
        });
    }
  }, [serviceUrl, triedCreateVerify, messageFinished, question, answer, externalRequestId]);

  useEffect(() => {
    console.debug(`[message-verify]`, result);
  }, [result]);

  if (!serviceUrl || !messageFinished) { // Remove isSuperuser check
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
            <ul className="space-y-4 px-2">
              {result.runs.map(((run, index) => (
                <li key={index}>
                  <MessageVerifyRun run={run} />
                </li>
              )))}
            </ul>
          </motion.div>}
        </AnimatePresence>
      </CollapsibleContent>
      <div className="my-2 px-4 flex items-center flex-wrap justify-between">
        <div className="text-xs text-muted-foreground">
          Powered by <a className="underline font-bold" href="https://www.pingcap.com/tidb-cloud-serverless/?utm_source=tidb.ai&utm_medium=referral&utm_campaign=plg_tidb.ai" target="_blank">TiDB Serverless</a>
        </div>
        {result?.status === VerifyStatus.FAILED && controller.inputEnabled && (
          <Button
            size="sm"
            className="gap-1 text-xs px-2 py-1 h-max"
            variant="ghost"
            onClick={() => {
              controller.input = composeRegenerateMessage(result);
              controller.focusInput();
            }}
          >
            <RefreshCwIcon size="1em" />
            Regenerate with validation messages
          </Button>
        )}
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
const failedIcon = <TriangleAlertIcon className="size-4 text-yellow-500" />;
const errorIcon = <TriangleAlertIcon className="size-4 text-destructive" />;

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
  const formattedSql = useMemo(() => {
    try {
      return format(run.sql, { language: 'tidb' });
    } catch {
      return run.sql;
    }
  }, [run.sql]);

  const highlightedSql = useMemo(() => {
    try {
      const result = Highlight.highlight(formattedSql, { language: 'sql' });
      return result.value;
    } catch {
      return formattedSql;
    }
  }, [formattedSql]);

  return (
    <div className="p-2 space-y-2">
      <p className="text-sm">
        {run.explanation}
      </p>
      {run.llm_verification && <div className={cn('p-2 rounded text-xs', run.success ? 'bg-green-500/10' : 'bg-red-500/10')}>
        {run.success ? <CheckIcon className="text-green-500 inline-block size-3 align-middle mr-1" /> : <XIcon className="text-red-500 inline-block size-3 align-middle mr-1" />}
        <span>{run.llm_verification}</span>
      </div>}
      <pre className="whitespace-pre-wrap text-xs">
        <div>
          <code className="hljs text-xs" dangerouslySetInnerHTML={{ __html: highlightedSql }} />
        </div>
        <div className="text-muted-foreground p-3">
          {(run.sql_error_code || run.sql_error_message)
            ? <><span className="font-bold">Error: </span>{`${run.sql_error_code} ${run.sql_error_message}`}</>
            : <>{JSON.stringify(run.results)}</>}
        </div>
       </pre>
    </div>
  );
}

function composeRegenerateMessage (result: MessageVerifyResponse) {
  return `Below are the results of my verification of the SQL examples mentioned in the above answer on TiDB Serverless. I hope to use this to verify the correctness of the answer:

${result.runs.map(run => (`Explain: ${run.explanation}
SQL: ${run.sql}
SQL Result: ${(run.sql_error_code || run.sql_error_message) ? `${run.sql_error_code ?? '?????'} ${run.sql_error_message}` : JSON.stringify(run.results)}
Validation Result: ${run.success ? 'Success' : 'Failed'}`)).join('\n\n')}
`;

}
