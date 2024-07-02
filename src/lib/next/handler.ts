import {auth as authFn} from '@/app/api/auth/[...nextauth]/auth';
import {getAppAccessToken} from "@/core/repositories/app_access_token";
import {generateSHA256Hash} from "@/lib/encrypt";
import {
  APIError, APP_AUTH_INVALID_AUTH_TOKEN_ERROR, APP_AUTH_REQUIRE_AUTH_TOKEN_ERROR,
  AUTH_FORBIDDEN_ERROR,
  AUTH_REQUIRE_AUTHED_ERROR,
  CRONJOB_INVALID_AUTH_TOKEN_ERROR,
  CRONJOB_REQUIRE_AUTH_TOKEN_ERROR
} from '@/lib/errors';
import {parseBody, parseParams, parseSearchParams} from '@/lib/next/parse';
import {type RouteProps} from '@/lib/next/types';
import type {Rewrite} from '@/lib/type-utils';
import {DateTime} from "luxon";
import type {Session, User} from 'next-auth';
import {isNextRouterError} from 'next/dist/client/components/is-next-router-error';
import {type NextRequest, NextResponse} from 'next/server';
import {z, ZodError, type ZodObject, type ZodType} from 'zod';

export type AppAuthType = 'anonymous' | 'user' | 'admin' | 'cronjob' | 'app' | void;

export function defineHandler<
  ZSearchParams extends ZodObject<any> | void = void,
  ZParams extends ZodObject<any> | void = void,
  ZBody extends ZodType | void = void,
  Auth extends AppAuthType = void,
  Returns = any
> (
  options: {
    searchParams?: ZSearchParams | void;
    params?: ZParams | void;
    body?: ZBody | void;
    auth?: Auth | Auth[] | void;
    testOnly?: boolean;
  },
  handler: (
    ctx: {
      searchParams: ZSearchParams extends ZodObject<any> ? z.infer<ZSearchParams> : void,
      params: ZParams extends ZodObject<any> ? z.infer<ZParams> : void,
      body: ZBody extends ZodType ? z.infer<ZBody> : Body,
      auth: Auth extends 'user' | 'admin' | 'anonymous' ? Rewrite<Session, { user: User }> : (Session | null),
      request: NextRequest,
      ctx: RouteProps<any>,
    },
  ) => Promise<Returns> | Returns) {
  return async (request: NextRequest, ctx: RouteProps<any>) => {
    try {
      if (options.testOnly && (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production')) {
        return NextResponse.json({
          message: 'This endpoint is for testing only'
        }, {
          status: 403
        });
      }

      let searchParams: any;
      let params: any;
      let body: any;
      let session: Session | undefined;

      if (options.auth) {
          session = await loadSession(request, options.auth);
      }

      if (options.params) {
        params = parseParams(ctx.params ?? {}, options.params);
      }
      if (options.searchParams) {
        searchParams = parseSearchParams(request.nextUrl.searchParams, options.searchParams);
      }
      if (options.body) {
        body = await parseBody(request, options.body);
      }

      const response = await handler({
        params,
        searchParams,
        body,
        auth: session as any,
        request,
        ctx,
      });

      if (response) {
        if (response instanceof Response) {
          return response;
        }
        return NextResponse.json(response);
      } else {
        return new NextResponse('', { status: 200 });
      }
    } catch (e) {
      if (isNextRouterError(e)) {
        throw e;
      }

      if (e instanceof APIError) {
        return e.toResponse();
      } else if (e instanceof ZodError) {
        return NextResponse.json({
          name: 'ZodError',
          message: e.message,
          details: e.format(),
        }, {
          status: 400,
        });
      }

      console.error(e);

      return APIError.fromError(e).toResponse();
    }
  };
}

async function loadSession<Auth extends AppAuthType>(request: NextRequest, auth: Auth | Auth[]): Promise<Session | undefined> {
  if (!auth) {
    return;
  }
  if (Array.isArray(auth)) {
    for (let i = 0; i < auth.length; i++) {
      try {
        return await verifyAuth(auth[i], request);
      } catch (e) {
        if (i !== auth.length - 1) {
          continue;
        }
        if (e instanceof APIError) {
          continue;
        }
        throw e;
      }
    }
    throw AUTH_REQUIRE_AUTHED_ERROR;
  } else {
    return await verifyAuth(auth, request);
  }
}

async function verifyAuth(authType: AppAuthType, request: NextRequest): Promise<Session> {
  const session = await authFn();
  switch (authType) {
    case 'cronjob':
      return verifyCronJobAuth(request);
    case 'app':
      return verifyAppAuth(request);
    case 'anonymous':
    case 'user':
    case 'admin':
      return verifyUserAuth(session, authType);
    default:
      throw new Error('Invalid auth type');
  }
}

async function verifyCronJobAuth(request: NextRequest): Promise<Session> {
  const accessToken = request.headers.get('authorization')?.replace('Bearer ', '')?.trim();
  if (!accessToken) {
    throw CRONJOB_REQUIRE_AUTH_TOKEN_ERROR;
  }
  if (accessToken !== process.env.CRON_SECRET) {
    throw CRONJOB_INVALID_AUTH_TOKEN_ERROR;
  }
  return {
    user: {
      id: `cronjob-${DateTime.now().toISO()}`,
      role: 'cronjob',
    },
    expires: DateTime.now().plus({ day: 1 }).toISO(),
  };
}

async function verifyAppAuth(request: NextRequest): Promise<Session> {
  const accessToken = request.headers.get('authorization')?.replace('Bearer ', '')?.trim();
  const externalUserId = request.headers.get('x-external-user-id');
  if (!accessToken) {
    throw APP_AUTH_REQUIRE_AUTH_TOKEN_ERROR;
  }
  const aat = await getAppAccessToken(accessToken);
  if (!aat || generateSHA256Hash(accessToken) !== aat?.token) {
    throw APP_AUTH_INVALID_AUTH_TOKEN_ERROR;
  }
  return {
    user: {
      id: externalUserId ? `${aat.app_id}:${externalUserId}` : aat.app_id,
      role: 'app',
    },
    expires: DateTime.now().plus({ month: 12 }).toISO(),
  }
}

async function verifyUserAuth(session: Session | undefined, requiredRole: AppAuthType) {
  session = await authFn();
  if (!session?.user) {
    throw AUTH_REQUIRE_AUTHED_ERROR;
  }
  if (requiredRole === 'user' && session.user.role === 'anonymous') {
    throw AUTH_REQUIRE_AUTHED_ERROR;
  }
  if (requiredRole === 'admin' && session.user.role !== 'admin') {
    throw AUTH_FORBIDDEN_ERROR;
  }
  return session;
}