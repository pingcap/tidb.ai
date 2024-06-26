import * as React from 'react';
import { useCookies } from 'react-cookie';

import { CREATE_RAG_CHAT_API } from '../constants/API';
import { authenticate } from './session.ts';

export const useAbortableFetch = () => {
  const [response, setResponse] =
    React.useState<ReadableStream<Uint8Array> | null>(null);
  const [headers, setHeaders] = React.useState<Headers | null>(null); // response.headers
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [controller, setController] = React.useState<AbortController | null>(
    null,
  );

  const fetchData = React.useCallback(
    async (url: string, options?: RequestInit) => {
      setLoading(true);
      setError(null);

      const abortController = new AbortController();
      setController(abortController);

      try {
        const res = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        setResponse(res.body);
        setHeaders(res.headers);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    },
    [],
  );

  React.useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [controller]);

  return { response, loading, error, fetchData, controller, headers };
};

// todo: update this after the API is ready
const CREATE_RAG_SESSION_KEY = 'test1-CreateRag-Session';
const CREATE_RAG_SESSION_ID_KEY = 'test1-CreateRag-Session-Id';

export function useLocalCreateRAGSessionId () {
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [session, setSession] = React.useState<string | null>(null);

  const [cookies, setCookie] = useCookies([CREATE_RAG_SESSION_KEY, CREATE_RAG_SESSION_ID_KEY]);
  const localSessionMemo = React.useMemo(() => {
    return (cookies?.[CREATE_RAG_SESSION_KEY] as string) || null;
  }, [cookies]);
  const localSessionIdMemo = React.useMemo(() => {

    return (cookies?.[CREATE_RAG_SESSION_ID_KEY] as string) || null;
  }, [cookies]);

  const setSessionMemo = React.useCallback(
    (value: string | undefined) => {
      if (!value) {
        return;
      }
      setCookie(CREATE_RAG_SESSION_KEY, value, { path: '/' });
      setSession(value);
    },
    [setCookie],
  );

  const setSessionIdMemo = React.useCallback(
    (value: string | undefined) => {
      if (!value) {
        return;
      }
      setCookie(CREATE_RAG_SESSION_ID_KEY, value, { path: '/' });
      setSessionId(value);
    },
    [setCookie],
  );

  return {
    session: session || localSessionMemo,
    setSession: setSessionMemo,
    sessionId: sessionId || localSessionIdMemo,
    setSessionId: setSessionIdMemo,
  };
}

export const usePostChatMessage = async (
  externalUserId: number,
  message: string,
) => {
  const { session, setSession, sessionId, setSessionId } = useLocalCreateRAGSessionId();
  const { fetchData, response, loading, error, headers } = useAbortableFetch();
  const url = CREATE_RAG_CHAT_API;

  React.useEffect(() => {
    const reqBody = {
      // nonce: '1234567890',
      message,
      sessionId: session,
      externalUserId,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    };

    fetchData(url, options);
  }, [externalUserId, fetchData, message, session, url]);

  return { response, loading, error, headers, setSession, sessionId, setSessionId };
};

export const useRemoteAuth = async (cfg?: { baseUrl: string, entryButtonLabel: string }) => {
  const [data, setData] = React.useState<null | {
    user: {
      id: string;
      role: string;
    };
    expires: string;
  }>(null);
  const [_, setAuthenticating] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      console.log('authenticate');
      setData(await authenticate(cfg?.baseUrl || ''));
    };
    setAuthenticating(true);
    fetchData().finally(() => {
      setAuthenticating(false);
    });
  }, []);

  return data;
};
