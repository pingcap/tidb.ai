import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const EMPTY = new URLSearchParams();

export function useHref () {
  const pathname = usePathname() ?? '';
  const searchParams = useSearchParams() ?? EMPTY;

  return useMemo(() => {
    const search = searchParams.toString()
    if (search) {
      return `${pathname}?${search}`
    } else {
      return pathname;
    }
  }, [pathname, searchParams])
}
