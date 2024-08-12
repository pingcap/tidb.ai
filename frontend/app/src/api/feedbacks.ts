import { authenticationHeaders, BASE_URL, buildUrlParams, handleResponse, type Page, type PageParams, zodPage } from '@/lib/request';
import { zodJsonDate } from '@/lib/zod';
import { z, type ZodType } from 'zod';

export const enum FeedbackType {
  like = 'like',
  dislike = 'dislike',
}

export interface Feedback {
  id: number;
  feedback_type: FeedbackType;
  comment: string;
  chat_id: string;
  chat_message_id: number;
  created_at: Date;
  updated_at: Date;
  user_id: string | null;
  chat_title: string;
  chat_message_content: string;
  user_email: string | null;
}

const feedbackSchema = z.object({
  id: z.number(),
  feedback_type: z.enum([FeedbackType.like, FeedbackType.dislike]),
  comment: z.string(),
  chat_id: z.string(),
  chat_message_id: z.number(),
  created_at: zodJsonDate(),
  updated_at: zodJsonDate(),
  user_id: z.string().nullable(),
  user_email: z.string().nullable(),
  chat_title: z.string(),
  chat_message_content: z.string(),
}) satisfies ZodType<Feedback, any, any>;

export async function listFeedbacks ({ page = 1, size = 10 }: PageParams = {}): Promise<Page<Feedback>> {
  return await fetch(BASE_URL + '/api/v1/admin/feedbacks' + '?' + buildUrlParams({ page, size }), {
    headers: await authenticationHeaders(),
  })
    .then(handleResponse(zodPage(feedbackSchema)));
}
