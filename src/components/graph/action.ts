import { useState } from 'react';

type ActionStatus<T> = {
  pending: true
  loading: false
  data: undefined
  error: undefined
} | {
  pending: false
  loading: true
  data: undefined
  error: undefined
} | {
  pending: false
  loading: false
  data: undefined
  error: Error
} | {
  pending: false
  loading: false
  data: T
  error: undefined
}

export function useAction<T> (action: () => Promise<T>) {
  const [pending, setPending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState(undefined);

  return {
    pending,
    loading,
    data,
    error,
    run () {
      if (!pending) {
        return Promise.reject('');
      }
      setPending(false);
      setLoading(true);
      setError(undefined);
      setData(undefined);
      return action()
        .then(data => {
          setData(data);
          return data;
        }, error => {
          setError(error);
          return Promise.reject(error);
        })
        .finally(() => {
          setLoading(false);
          setPending(true);
        });
    },
    reset () {
      setPending(true);
      setLoading(false);
      setError(undefined);
      setData(undefined);
    },
  } as ActionStatus<T> & {
    run: () => Promise<T>,
    reset: () => void,
  };
}