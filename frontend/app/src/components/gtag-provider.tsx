'use client';

import { createContext, type ReactNode, useContext, useMemo } from 'react';

export interface GtagFn {
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
  // Use custom gtag fn to send events. defaults to window.gtag (On demand).
  gtagFn?: GtagFn;
}

export function GtagProvider ({ configured, gtagId, group, gtagFn: propGtagFn, children }: GtagProviderProps) {
  const gtagFn = useMemo(() => {
    if (configured && gtagId) {
      return (_: 'event', event: Gtag.EventNames | (string & {}), eventParams?: Omit<Gtag.ControlParams & Gtag.EventParams & Gtag.CustomParams, 'send_to'> | undefined): void => {
        if (_ !== 'event') {
          // Only support event method
          return;
        }
        (propGtagFn ?? gtag)?.('event', event, { ...eventParams, send_to: gtagId, groups: eventParams?.groups ? [group, ...eventParams.groups] : group });
      };
    } else {
      return () => {};
    }
  }, [propGtagFn, configured, gtagId, group]);

  return (
    <GtagContext.Provider value={{ gtagFn }}>
      {children}
    </GtagContext.Provider>
  );
}

export function useGtagFn () {
  return useContext(GtagContext).gtagFn;
}
