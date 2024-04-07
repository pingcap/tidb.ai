import { auth as authFn } from '@/app/api/auth/[...nextauth]/auth';
import {
  APIError,
  AUTH_FORBIDDEN_ERROR,
  AUTH_REQUIRE_AUTHED_ERROR, CRONJOB_INVALID_AUTH_TOKEN_ERROR,
  CRONJOB_REQUIRE_AUTH_TOKEN_ERROR
} from '@/lib/errors';
import { parseBody, parseParams, parseSearchParams } from '@/lib/next/parse';
import { type RouteProps } from '@/lib/next/types';
import type { Rewrite } from '@/lib/type-utils';
import type { Session, User } from 'next-auth';
import { isNextRouterError } from 'next/dist/client/components/is-next-router-error';
import { type NextRequest, NextResponse } from 'next/server';
import { z, ZodError, type ZodObject, type ZodType } from 'zod';

export type AppAuthType = 'anonymous' | 'user' | 'admin' | 'cronjob' | void;

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
    auth?: Auth | void;
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
      let searchParams: any;
      let params: any;
      let body: any;

      let auth: Session | null = null;
      if (options.auth) {
        auth = await authFn();
        if (options.auth === 'cronjob') {
          const authHeader = request.headers.get('authorization');
          if (!authHeader) {
            return CRONJOB_REQUIRE_AUTH_TOKEN_ERROR.toResponse();
          }
          if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return CRONJOB_INVALID_AUTH_TOKEN_ERROR.toResponse();
          }
        } else if (options.auth) {
          if (!auth?.user) {
            return AUTH_REQUIRE_AUTHED_ERROR.toResponse();
          }
          switch (options.auth) {
            case 'anonymous':
              // PASS
              break
            case 'user':
              if (auth.user.role === 'anonymous') {
                return AUTH_REQUIRE_AUTHED_ERROR.toResponse();
              }
              break
            case 'admin':
              if ( auth.user.role !== 'admin') {
                return AUTH_FORBIDDEN_ERROR.toResponse();
              }
              break
          }
        }
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
        auth: auth as any,
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

      if (e instanceof ZodError) {
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
