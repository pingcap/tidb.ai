'use client';

import type { KnowledgeGraphFeedback } from '@/core/repositories/knowledge_graph_feedback';
import { fetcher } from '@/lib/fetch';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

export interface UseMessageFeedbackReturns {
  state: 'like' | 'dislike' | undefined;
  feedbackAt: Date | undefined;
  disabled: boolean;

  like (): void;

  dislike (): void;
}

export function useMessageFeedback (chatId: number, messageId: number, enabled: boolean): UseMessageFeedbackReturns {
  const { data, isLoading, isValidating } = useSWR(enabled ? ['get', `/api/v1/chats/${chatId}/messages/${messageId}/feedback`] : undefined, fetcher<KnowledgeGraphFeedback[]>);
  const [acting, setActing] = useState(false);

  return {
    state: data?.[0]?.action,
    feedbackAt: data?.[0]?.created_at,
    disabled: isValidating || isLoading || !!data?.length || acting || !enabled,
    like () {
      setActing(true);
      feedback(chatId, messageId, 'like').finally(() => setActing(false));
    },
    dislike () {
      feedback(chatId, messageId, 'dislike').finally(() => setActing(false));
    },
  };
}

async function feedback (chatId: number, messageId: number, action: 'like' | 'dislike') {
  await fetch(`/api/v1/chats/${chatId}/messages/${messageId}/feedback`, {
    method: 'post',
    body: JSON.stringify({
      action: 'like',
    }),
  });
  mutate(['get', `/api/v1/chats/${chatId}/messages/${messageId}/feedback`], data => data, true);
}
