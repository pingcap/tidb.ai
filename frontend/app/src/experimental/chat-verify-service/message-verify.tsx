import { useAuth } from '@/components/auth/AuthProvider';
import { useChatMessageField, useChatMessageStreamState } from '@/components/chat/chat-hooks';
import type { ChatMessageController } from '@/components/chat/chat-message-controller';
import { isNotFinished } from '@/components/chat/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getVerify, isFinalVerifyState, verify, VerifyState } from '@/experimental/chat-verify-service/api';
import { cn } from '@/lib/utils';
import { CheckCircle2Icon, Loader2Icon } from 'lucide-react';
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

  const isSuperuser = !!me.me?.is_superuser;

  const shouldPoll = !!verifyId && !!assistant && isSuperuser;
  const { data: result, mutate } = useSWR(shouldPoll && `experimental.chat-message.${assistant.id}.verify`, () => getVerify(verifyId!), { revalidateOnMount: false, revalidateOnFocus: false, errorRetryCount: 0 });
  const finished = result ? isFinalVerifyState(result.state) : false;

  useEffect(() => {
    if (shouldPoll && !finished) {
      void mutate(prev => prev, { revalidate: true });
    }
  }, [shouldPoll, finished]);

  useEffect(() => {
    if (!verifyId && question && answer && messageFinished && !verifying) {
      verify(question, answer)
        .then(result => {
          setVerifyId(result.job_id);
        })
        .finally(() => {
          setVerifying(false);
        });
    }
  }, [verifyId, messageFinished, question, answer, verifying]);

  const isVerifying = verifying || !finished;

  if (!isSuperuser) {
    return null;
  }

  return (
    <Alert
      variant={result ? result.state === VerifyState.SUCCESS ? 'success' : result.state === VerifyState.FAILED ? 'destructive' : undefined : undefined}
      className={cn('transition-opacity', isVerifying && 'opacity-50')}
    >
      {isVerifying
        ? <Loader2Icon className="animate-spin repeat-infinite" />
        : result?.state === VerifyState.SUCCESS
          ? <CheckCircle2Icon />
          : result?.state === VerifyState.FAILED
            ? <InformationCircleIcon />
            : undefined}
      <AlertTitle>Verify chat response</AlertTitle>
      <AlertDescription>{result?.message}</AlertDescription>
    </Alert>
  );
}