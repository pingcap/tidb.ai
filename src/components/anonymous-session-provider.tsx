'use client';

import { signIn, useSession } from 'next-auth/react';
import { ReactNode, useEffect, useRef } from 'react';

export default function AnonymousSessionProvider ({
  children,
}: {
  children: ReactNode
}) {
  const { data: session, status } = useSession();
  const loadingRef = useRef(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      // login as anonymous
      signIn('anonymous')
        .then((data) => {
          loadingRef.current = true;
          // async sign-in returned
        })
        .finally(() => {
          loadingRef.current = false;
        });
    } else {
    }
  }, [status]);

  return (
    <>
      {children}
    </>
  );
}