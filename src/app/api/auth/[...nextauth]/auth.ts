import { listAllEnabledProvidersWithConfig } from '@/core/db/auth';
import { genId } from '@/lib/id';
import NextAuth, { type Session } from 'next-auth';
import AzureAd from 'next-auth/providers/azure-ad';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { type NextRequest, NextResponse } from 'next/server';

declare module 'next-auth' {
  interface User {
    role?: 'anonymous' | 'admin';
  }
}

const anonymous_prefix = '$$a_';

const cookie_prefix = 'tidb-ai';

export async function GET (req: NextRequest) {
  const {
    handlers: { GET },
  } = await generateNextAuth();
  return GET(req);
}

export async function POST (req: NextRequest) {
  const {
    handlers: { POST },
  } = await generateNextAuth();
  return POST(req);
}

// todo: wrap auth
export function auth<
  Ctx extends { params?: Record<string, string | string[] | undefined> }
> (fn: (req: NextRequest & { auth: Session | null }, ctx: Ctx) => Promise<Response>): (req: NextRequest, ctx: Ctx) => Promise<Response>
export function auth (): Promise<Session>
export function auth (...args: any[]): any {

  // With no parameters, returns the session promise directly.
  if (args.length === 0) {
    return generateNextAuth().then(res => res.auth());
  }

  // With single parameters (handler fn), wrap the fn with auth info, return the enhanced fn.
  if (args.length === 1) {
    return async function (req: NextRequest, ctx: any) {
      const { auth } = await generateNextAuth();
      const fn = args[0] as (req: NextRequest) => Promise<NextResponse>;
      const handler = auth(fn);

      return handler(req, ctx);
    };
  }

  // We do not use page router, so no need to handle multiple arguments.
  throw new Error('why you call auth() like that?');
}

async function generateNextAuth () {
  const providers = await getProviders();
  const { handlers, auth } = NextAuth({
    pages: {
      signIn: '/auth/signin',
    },
    session: {
      strategy: 'jwt',
    },
    cookies: {
      sessionToken: {
        name: `${cookie_prefix}.session-token`,
      },
      callbackUrl: {
        name: `${cookie_prefix}.callback-url`,
      },
      csrfToken: {
        name: `${cookie_prefix}.csrf-token`,
      },
    },
    callbacks: {
      session (params) {
        if ('token' in params) {
          if (params.session.user) {
            params.session.user.id = params.token.sub;
            if (params.token.sub?.startsWith(anonymous_prefix)) {
              params.session.user.role = 'anonymous';
            }
          }
        }
        return params.session;
      },
    },
    providers: [
      CredentialsProvider({
        id: 'credentials',
        name: 'credentials',
        credentials: {
          username: { label: 'Username', type: 'text', placeholder: 'admin' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize (credentials) {
          if (
            credentials.username !== 'admin' ||
            credentials.password !== process.env.ADMIN_PASSWORD
          ) {
            return null;
          }

          return {
            id: 'admin',
            name: 'admin',
            email: 'ai@tidb.cloud',
            image: '/tidb-ai.svg',
            role: 'admin',
          };
        },
      }),
      CredentialsProvider({
        id: 'anonymous',
        name: 'anonymous',
        credentials: {},
        async authorize (credentials, req) {
          return {
            id: anonymous_prefix + genId(12),
            role: 'anonymous',
          };
        },
      }),
      ...providers.map((provider) => {
        // @ts-ignore
        return provider.Provider({
          clientId: provider.client_id,
          clientSecret: provider.client_secret,
        });
      }),
    ],
  });

  return {
    handlers,
    auth,
  };
}

async function getProviders () {
  const result = await listAllEnabledProvidersWithConfig();
  const providers: {
    id: string;
    label: string;
    Provider: typeof GoogleProvider | typeof GitHubProvider | typeof AzureAd;
    client_id: string;
    client_secret: string;
  }[] = [];
  result.forEach((provider) => {
    if (provider.name in providersMap) {
      providers.push({
        ...providersMap[provider.name as keyof typeof providersMap],
        client_id: (
          provider.config as {
            client_id: string;
            client_secret: string;
          }
        ).client_id,
        client_secret: (
          provider.config as {
            client_id: string;
            client_secret: string;
          }
        ).client_secret,
      });
    }
  });
  return providers;
}

export const providersMap = {
  google: {
    label: 'Google',
    id: 'google',
    Provider: GoogleProvider,
  },
  github: {
    label: 'GitHub',
    id: 'github',
    Provider: GitHubProvider,
  },
  'azure-ad': {
    label: 'MicorSoft',
    id: 'azure-ad',
    Provider: AzureAd,
  },
};
