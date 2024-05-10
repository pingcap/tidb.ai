import {CreateChatEngineOptions} from "@/core/config/chat_engines";
import { handleErrors } from '@/lib/fetch';
import { withToast } from '@/lib/toast';

export const createChatEngine = withToast(
  async (data: CreateChatEngineOptions) => {
    await fetch('/api/v1/chat_engines', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {},
    }).then(handleErrors);
  },
);

export const updateChatEngine = withToast(
  async (id: number, data: CreateChatEngineOptions) => {
    await fetch(`/api/v1/chat_engines/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {},
    }).then(handleErrors);
  },
);
