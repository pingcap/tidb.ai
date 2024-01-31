import { useSession } from 'next-auth/react';

export function useUser () {
  const { data } = useSession();

  if (!data) {
    return undefined;
  }

  if (!data.user) {
    return undefined;
  }

  if (data.user.role === 'anonymous') {
    return undefined;
  }

  return data.user;
}
