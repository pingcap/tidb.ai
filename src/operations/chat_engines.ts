import type { ChatEngineOptions } from '@/core/v1/chat_engine';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';

export interface CreateChatEngineFormValues {
  name: string;
  engine: string;
  engine_options: ChatEngineOptions;
}

export const createChatEngine = withToast(
  async (data: CreateChatEngineFormValues) => {
    await fetch('/api/v2/chat_engines', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {},
    }).then(handleErrors);
  },
);
