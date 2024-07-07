import { createContext, type ReactNode, useContext } from 'react';

const PortalContext = createContext<HTMLElement | undefined>(undefined);

export function PortalProvider ({ children, container }: { children: ReactNode, container: HTMLElement | undefined }) {
  return (
    <PortalContext.Provider value={container}>{children}</PortalContext.Provider>
  );
}

export function usePortalContainer () {
  return useContext(PortalContext);
}
