'use client';

import { getErrorMessage } from '@/lib/error';
import { createContext, type ReactNode, useContext, useTransition } from 'react';
import { useFormState } from 'react-dom';

type SucceedServerActionResult<T> = { result: T }
type FailedServerActionResult = { error: string }
type ServerResult<T> = SucceedServerActionResult<T> | FailedServerActionResult;

export interface ActionProviderProps<State, Payload> {
  action: (state: ServerResult<State> | undefined, payload: Payload) => Promise<ServerResult<State>>;
  children: ReactNode;
}

export function ActionProvider<State, Payload> ({
  action,
  children,
}: ActionProviderProps<State, Payload>) {
  const [state, dispatch] = useFormState(action, undefined);
  const [transition, startTransition] = useTransition();

  return (
    <ActionContext.Provider value={{
      result: state,
      loading: transition,
      action: (payload) => startTransition(() => dispatch(payload)),
    }}>
      {children}
    </ActionContext.Provider>
  );
}

export type ActionContextValues<T, Payload> = {
  result?: ServerResult<T>
  action: (payload: Payload) => void
  loading: boolean
}

const ActionContext = createContext<ActionContextValues<any, any>>({
  result: undefined,
  action: () => {},
  loading: false,
});

export function useActionResult () {
  return useContext(ActionContext).result;
}

export function asAction<Arg, Ret> (fn: (arg: Arg) => Promise<Ret>): (_: any, arg: Arg) => Promise<ServerResult<Ret>> {
  return async (_, arg) => {
    try {
      const res = await fn(arg);
      return {
        result: res,
      };
    } catch (e) {
      return {
        error: getErrorMessage(e),
      };
    }
  };
}
