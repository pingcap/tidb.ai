import type { ChatEngineOptions } from '@/core/repositories/chat_engine';
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';

export interface CreateChatEngineFormValues {
  name: string;
  engine: string;
  engine_options: ChatEngineOptions;
}

export const createChatEngine = withToast(
  async (data: CreateChatEngineFormValues) => {
    await fetch('/api/v1/chat_engines', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {},
    }).then(handleErrors);
  },
);

export const updateChatEngine = withToast(
  async (id: number, data: CreateChatEngineFormValues) => {
    await fetch(`/api/v1/chat_engines/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {},
    }).then(handleErrors);
  },
);
