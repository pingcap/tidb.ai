import { differenceInMilliseconds } from 'date-fns';
import { useEffect, useState } from 'react';

function diff (from: Date | string | number | null | undefined, to: Date | string | number | null | undefined) {
  if (from == null) {
    return null;
  }
  return (differenceInMilliseconds(to ?? new Date(), from) / 1000).toFixed(1) + 's';
}

/**
 *
 * @param className
 * @param from
 * @param to default to now
 * @constructor
 */
export function DiffSeconds ({ className, from, to }: { className?: string, from: Date | string | number | null | undefined, to?: Date | string | number | null | undefined }) {
  const [seconds, setSeconds] = useState(() => diff(from, to));

  useEffect(() => {
    if (from == null) {
      return;
    }
    setSeconds(diff(from, to));
    if (to == null) {
      const interval = setInterval(() => {
        setSeconds(diff(from, to));
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [from, to]);

  return <time className={className}>{seconds}</time>;
}