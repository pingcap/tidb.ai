'use client';

import { createContext, type ReactNode, useContext, useMemo } from 'react';

export interface GtagFn {
  (command: 'config', config: Gtag.ControlParams | Gtag.EventParams | Gtag.ConfigParams | Gtag.CustomParams): void;

  (command: 'set', config: Gtag.CustomParams): void;

  (command: 'get', name: Gtag.FieldNames | string, callback?: (field: string | Gtag.CustomParams | undefined) => any): void;

  (command: 'event', event: Gtag.EventNames | (string & {}), eventParams?: Omit<Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams, 'send_to'>): void;
}

export interface GtagProviderValues {
  gtagFn: GtagFn;
}

const GtagContext = createContext<GtagProviderValues>({
  gtagFn: () => {},
});

export interface GtagProviderProps {
  configured: boolean;
  gtagId?: string | null;
  group?: string | null;
  children?: ReactNode;
}

export function GtagProvider ({ configured, gtagId, group, children }: GtagProviderProps) {
  const gtagFn = useMemo(() => {
    if (configured && gtagId) {
      return (command: string, ...args: any): void => {
        switch (command) {
          case 'config':
            gtag('config', gtagId, args[0]);
            break;
          case 'set':
            gtag('set', gtagId, args[0]);
            break;
          case 'get':
            gtag('get', gtagId, args[0]);
            break;
          case 'event':
            gtag('event', args[0], { ...args[1], send_to: gtagId, groups: group ? ['js-widget', group] : 'js-widget' });
            break;
        }
      };
    } else {
      return () => {};
    }
  }, [configured, gtagId, group]);

  return (
    <GtagContext.Provider value={{ gtagFn }}>
      {children}
    </GtagContext.Provider>
  );
}

export function useGtagFn () {
  return useContext(GtagContext).gtagFn;
}
