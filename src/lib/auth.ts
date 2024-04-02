import { useSession } from 'next-auth/react';
import {NextRequest} from "next/server";
import { type Session } from 'next-auth';

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

export function getUserIdFromReq(req: NextAuthedRequest) {
  return req.auth?.user?.id;
}

interface NextAuthedRequest extends NextRequest {
  auth: Session | null;
}