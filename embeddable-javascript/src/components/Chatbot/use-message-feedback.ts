'use client';

import { useContext, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { CfgContext } from '../../context';
import { fetcher } from '../../lib/fetch';

export interface UseMessageFeedbackReturns {
  feedbackData: Feedback | undefined;
  disabled: boolean;

  // source?: ContentSource;
  // sourceLoading: boolean;

  feedback (action: 'like' | 'dislike', details: Record<string, 'like' | 'dislike'>, comment: string): Promise<void>;
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
  const { baseUrl } = useContext(CfgContext);

  const { data: feedback, isLoading, isValidating } = useSWR(enabled ? ['get', `${baseUrl}/api/v1/chats/${chatId}/messages/${messageId}/feedback`] : undefined, fetcher<Feedback>);
  const [acting, setActing] = useState(false);
  const disabled = isValidating || isLoading || acting || !enabled;

  // const contentData = useSWR((enabled && !disabled) ? ['get', `/api/v1/chats/${chatId}/messages/${messageId}/content-sources`] : undefined, fetcher<ContentSource>, { keepPreviousData: true, revalidateIfStale: false, revalidateOnReconnect: false });

  console.log(feedback);
  return {
    feedbackData: feedback,
    disabled,
    feedback: (action, detail, comment) => {
      setActing(true);
      return addFeedback(baseUrl, chatId, messageId, { action, knowledge_graph_detail: detail, comment }).finally(() => setActing(false));
    },
    // source: contentData.data,
    // sourceLoading: contentData.isLoading || contentData.isValidating,
  };
}

async function addFeedback (baseUrl: string, chatId: number, messageId: number, data: any) {
  mutate(['get', `${baseUrl}/api/v1/chats/${chatId}/messages/${messageId}/feedback`], () => data, false);
  await fetch(`${baseUrl}/api/v1/chats/${chatId}/messages/${messageId}/feedback`, {
    method: 'post',
    body: JSON.stringify(data),
  });
}

type Feedback = {
  action: 'dislike' | 'like';
  chat_id: number;
  comment: string;
  created_at: Date;
  created_by: string;
  id: number;
  knowledge_graph_detail: Record<string, 'like' | 'dislike'>;
  knowledge_graph_report_error: string | null;
  knowledge_graph_reported_at: Date | null;
  message_id: number;
  trace_id: string;
}