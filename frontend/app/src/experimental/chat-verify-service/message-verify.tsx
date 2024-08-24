import { useAuth } from '@/components/auth/AuthProvider';
import { useChatMessageField, useChatMessageStreamState } from '@/components/chat/chat-hooks';
import type { ChatMessageController } from '@/components/chat/chat-message-controller';
import { isNotFinished } from '@/components/chat/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { getVerify, isFinalVerifyState, verify, VerifyState } from '@/experimental/chat-verify-service/api';
import { CheckCircle2Icon, CheckIcon, ChevronDownIcon, Loader2Icon, XIcon } from 'lucide-react';
import { InformationCircleIcon } from 'nextra/icons';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export function MessageVerify ({ user, assistant }: { user: ChatMessageController | undefined, assistant: ChatMessageController | undefined }) {
  const messageState = useChatMessageStreamState(assistant);
  const question = useChatMessageField(user, 'content');
  const answer = useChatMessageField(assistant, 'content');

  const messageFinished = !isNotFinished(messageState);

  const me = useAuth();
  const [verifyId, setVerifyId] = useState<string>();
  const [verifying, setVerifying] = useState(false);

  const enabled = useExperimentalMessageVerifyFeature();
  const isSuperuser = !!me.me?.is_superuser;

  const shouldPoll = enabled && !!verifyId && !!assistant && isSuperuser;
  const { data: result } = useSWR(
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
  const finished = result ? isFinalVerifyState(result.status) : false;

  useEffect(() => {
    if (enabled && !verifyId && question && answer && messageFinished && !verifying) {
      verify(question, answer)
        .then(result => {
          setVerifyId(result.job_id);
        })
        .finally(() => {
          setVerifying(false);
        });
    }
  }, [enabled, verifyId, messageFinished, question, answer, verifying]);

  const isVerifying = verifying || !finished;

  if (!isSuperuser || !enabled || !messageFinished) {
    return null;
  }

  if (![VerifyState.VALIDATING, VerifyState.SUCCESS, VerifyState.FAILED].includes(result?.status)) {
    return null;
  }

  return (
    <Collapsible className="p-2 border rounded-lg">
      <CollapsibleTrigger asChild>
        <Button className="group gap-2 w-full" variant="ghost" disabled={!finished}>
          {isVerifying
            ? <Loader2Icon className="size-4 animate-spin repeat-infinite" />
            : result?.status === VerifyState.SUCCESS
              ? <CheckCircle2Icon className="size-4 text-green-500" />
              : result?.status === VerifyState.FAILED
                ? <InformationCircleIcon className="size-4 text-yellow-500" />
                : undefined}
          {result?.message ?? 'Preparing verify chat result...'}
          <ChevronDownIcon className="size-4 ml-auto transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {result && <ul className="space-y-2">
          {result.runs.map(((run, index) => (
            <li key={index}>
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
            </li>
          )))}
        </ul>}
        {result && result.runs.length === 0 && (
          <div className="p-2 text-muted-foreground text-xs">
            Empty result.
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

function useExperimentalMessageVerifyFeature () {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(localStorage.getItem('tidbai.experimental.verify-chat-message') === 'on');
  }, []);

  return enabled;
}
