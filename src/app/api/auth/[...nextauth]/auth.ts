import { genId } from '@/lib/id';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface User {
    role?: 'anonymous' | 'admin';
  }
}

const anonymous_prefix = '$$a_';

const cookie_prefix = 'tidb-ai';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
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
        if (credentials.username !== 'admin' || credentials.password !== process.env.ADMIN_PASSWORD) {
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
  ],
});
