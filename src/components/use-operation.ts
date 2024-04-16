import { useEffect, useRef, useState } from 'react';

export function useOperation<T extends any[], R> (operation: (...args: T) => Promise<R>) {
  const [operating, setOperating] = useState(false);
  const [result, setResult] = useState<R>();
  const [error, setError] = useState<unknown>();

  const operationRef = useRef(operation);
  useEffect(() => {
    operationRef.current = operation;
  });

  const operatingRef = useRef(operating);
  operatingRef.current = operating;

  const operate = (...args: T) => {
    if (operatingRef.current) {
      return Promise.reject<R>('Operation is running');
    }
    setOperating(true);
    setResult(undefined);
    setError(undefined);
    return operationRef.current(...args)
      .then(result => {
        setResult(result);
        return result;
      }, error => {
        setError(error);
        return Promise.reject(error);
      })
      .finally(() => {
        setOperating(false);
      });
  };

  return {
    operate,
    operating,
    error,
    result,
  };
}