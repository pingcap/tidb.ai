'use client';

import Cookie from 'js-cookie';
import { useSyncExternalStore } from 'react';

export function useCookie (name: string) {
  useSyncExternalStore(onChange => {
    let last = Cookie.get(name);

    const checkInterval = setInterval(() => {
      if (last !== Cookie.get(name)) {
        onChange();
      }
    }, 500);

    return () => {
      clearInterval(checkInterval);
    };
  }, () => Cookie.get(name));
}
