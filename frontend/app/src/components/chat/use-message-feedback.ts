'use client';

import { type FeedbackParams, postFeedback } from '@/api/chats';
import { useState } from 'react';

export interface UseMessageFeedbackReturns {
  feedbackData: FeedbackParams | undefined;
  disabled: boolean;

  // source?: ContentSource;
  // sourceLoading: boolean;

  feedback (action: 'like' | 'dislike', /*details: Record<string, 'like' | 'dislike'>, */comment: string): Promise<void>;

  // deleteFeedback (): Promise<void>;
}

export type ContentSource = {
  query: string
  markdownSources: {
    kgRelationshipUrls: string[]
    restUrls: string[]
  }
  kgSources: Record<string, any>
}

export function useMessageFeedback (messageId: number | undefined, enabled: boolean): UseMessageFeedbackReturns {
  const [feedback, setFeedback] = useState<FeedbackParams>();
  const isLoading = false;
  const isValidating = false;
  const [acting, setActing] = useState(false);
  const disabled = messageId == null && isValidating || isLoading || acting || !enabled;

  // const contentData = useSWR((enabled && !disabled) ? ['get', `/api/v1/chats/${chatId}/messages/${messageId}/content-sources`] : undefined, fetcher<ContentSource>, { keepPreviousData: true, revalidateIfStale: false, revalidateOnReconnect: false });

  return {
    feedbackData: feedback,
    disabled,
    feedback: async (action, /* detail, */ comment) => {
      if (!messageId) {
        return;
      }
      setActing(true);
      await postFeedback(messageId, { feedback_type: action, comment }).finally(() => setActing(false));
      setFeedback({ feedback_type: action, comment });
    },
    // deleteFeedback: () => {
    //   setActing(true);
    //   return deleteFeedback(chatId, messageId).finally(() => setActing(false));
    // },
    // source: contentData.data,
    // sourceLoading: contentData.isLoading || contentData.isValidating,
  };
}
