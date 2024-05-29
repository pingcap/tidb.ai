'use client';

import type { KnowledgeGraphFeedback } from '@/core/repositories/knowledge_graph_feedback';
import { fetcher } from '@/lib/fetch';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

export interface UseMessageFeedbackReturns {
  feedbackData: KnowledgeGraphFeedback | undefined;
  disabled: boolean;

  source?: ContentSource;
  sourceLoading: boolean;

  feedback (details: Record<string, 'like' | 'dislike'>, comment: string): Promise<void>;
}

export type ContentSource = {
  query: string
  markdownSources: {
    kgRelationshipUrls: string[]
    restUrls: string[]
  }
  kgSources: Record<string, any>
}

export function useMessageFeedback (chatId: number, messageId: number, enabled: boolean): UseMessageFeedbackReturns {
  const { data: feedback, isLoading, isValidating } = useSWR(enabled ? ['get', `/api/v1/chats/${chatId}/messages/${messageId}/feedback`] : undefined, fetcher<KnowledgeGraphFeedback>);
  const [acting, setActing] = useState(false);
  const disabled = isValidating || isLoading || acting || !enabled;

  const contentData = useSWR((enabled && !disabled) ? ['get', `/api/v1/chats/${chatId}/messages/${messageId}/content-sources`] : undefined, fetcher<ContentSource>, { keepPreviousData: true, revalidateIfStale: false, revalidateOnReconnect: false });

  return {
    feedbackData: feedback,
    disabled,
    feedback: (detail, comment) => {
      setActing(true);
      return addFeedback(chatId, messageId, { detail, comment }).finally(() => setActing(false));
    },
    source: contentData.data,
    sourceLoading: contentData.isLoading || contentData.isValidating,
  };
}

async function addFeedback (chatId: number, messageId: number, data: any) {
  await fetch(`/api/v1/chats/${chatId}/messages/${messageId}/feedback`, {
    method: 'post',
    body: JSON.stringify(data),
  });
  mutate(['get', `/api/v1/chats/${chatId}/messages/${messageId}/feedback`], data => data, true);
}
