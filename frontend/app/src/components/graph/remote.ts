import { useEffect, useRef, useState } from 'react';

export function useRemote<Params extends any[], Data> (initialData: Data, fn: (...params: Params) => Promise<Data>, ...params: Params) {
  const [revalidating, setRevalidating] = useState(false);
  const [data, setData] = useState<Data>(initialData);
  const [error, setError] = useState<unknown>(undefined);

  const busyRef = useRef(false);
  const dataRef = useRef<Data>(data);

  const revalidate = () => {
    if (busyRef.current) {
      return;
    }

    busyRef.current = true;
    setRevalidating(true);
    return fn(...params)
      .then(data => {
        setData(data);
        dataRef.current = data;
      }, setError)
      .finally(() => {
        setRevalidating(false);
        busyRef.current = false;
      });
  };

  const mutate = (mutator: (prev: Data) => Data) => {
    const newData = dataRef.current = mutator(dataRef.current);
    setData(newData);
    return newData;
  };

  useEffect(() => {
    void revalidate();
  }, [fn, ...params]);

  return {
    data,
    revalidating,
    error,
    revalidate,
    mutate,
  };
}