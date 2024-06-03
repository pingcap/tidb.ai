import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useSearchParam (key: string, defaultValue: string | null = null) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const state = searchParams.get(key);
  const setState = (newValue: string | null) => {
    const usp = new URLSearchParams(searchParams);
    if (newValue == null) {
      usp.delete(key);
    } else {
      usp.set(key, newValue);
    }
    router.push(pathname + '?' + usp.toString());
  };

  return [state ?? defaultValue, setState] as const;
}