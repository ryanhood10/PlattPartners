import type { GetServerSidePropsContext } from 'next';
import type { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { getServerSession } from 'next-auth/next';

// NextAuth configuration. Microsoft Entra (Azure AD) is the only provider —
// Peter signs in with his M365 account. Scopes match docs/api_integrations.md.
// Phase 0 ships User.Read + offline_access; later phases extend with Mail.* scopes.

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.MS_CLIENT_ID ?? '',
      clientSecret: process.env.MS_CLIENT_SECRET ?? '',
      tenantId: process.env.MS_TENANT_ID ?? 'common',
      authorization: {
        params: {
          scope: 'openid profile email offline_access User.Read',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the access + refresh tokens on first sign-in so MS Graph calls can use them later.
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      // Surface user metadata to the client; never include accessToken in the session
      // returned to the browser — it stays in the JWT cookie only.
      if (token.sub) session.user = { ...session.user, id: token.sub };
      return session;
    },
  },
  pages: {
    signIn: '/api/auth/signin',
  },
};

// Helper: gate a dashboard page behind a valid Entra session.
// Use as: `export const getServerSideProps = requireAuth();`
export function requireAuth(callbackPath?: string) {
  return async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    if (!session) {
      const cb = callbackPath ?? ctx.resolvedUrl ?? '/app';
      return {
        redirect: {
          destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(cb)}`,
          permanent: false,
        },
      };
    }
    return { props: { session } };
  };
}
