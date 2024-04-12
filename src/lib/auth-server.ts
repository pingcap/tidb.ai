import { auth } from '@/app/api/auth/[...nextauth]/auth';
import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

export async function authGuard (role?: 'admin') {
  const session = await auth();

  if (!session?.user || session.user.role === 'anonymous') {
    redirect('/auth/login');
  }

  if (role === 'admin') {
    if (session.user.role !== 'admin') {
      redirect('/403');
    }
  }
}

/**
 * @deprecated
 * TODO: REMOVE it
 * @param handler
 */
export function adminHandlerGuard<Context extends { params: Record<string, string | string[] | undefined> }> (handler: (request: NextRequest & { auth: Session }, ctx: Context) => Promise<Response>): (req: NextRequest, ctx: Context) => Promise<Response> {
  return auth(async (req, ctx) => {
    if (!req.auth?.user || req.auth.user.role === 'anonymous') {
      return new NextResponse(null, { status: 401 });
    }
    if (req.auth.user.role !== 'admin') {
      return new NextResponse(null, { status: 403 });
    }
    return handler(req as NextRequest & { auth: Session }, ctx);
  });
}
