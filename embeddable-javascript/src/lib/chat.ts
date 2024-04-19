import { useContext, useState } from 'react';
import { CfgContext } from '../context';
import { handleErrors } from './fetch.ts';
import { authenticate } from './session.ts';

export function useChatSession () {
  const cfg = useContext(CfgContext);
  const [session, setSession] = useState<string>();

  const create = async (firstMessage: string) => {
    await authenticate(cfg.baseUrl);
    if (session) {
      return;
    }
    await fetch(cfg.baseUrl + '/api/v1/chats', {
      method: 'POST',
      body: JSON.stringify({
        name: firstMessage,
      }),
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(chat => {
        setSession(chat.url_key);
      });
  };

  return {
    session,
    create,
  };
}