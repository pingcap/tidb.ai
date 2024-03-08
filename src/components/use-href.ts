import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useHref () {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useMemo(() => {
    const search = searchParams.toString()
    if (search) {
      return `${pathname}?${search}`
    } else {
      return pathname;
    }
  }, [pathname, searchParams])
}
