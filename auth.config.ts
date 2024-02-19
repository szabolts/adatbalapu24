import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // debug: true,
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnUpload = nextUrl.pathname.startsWith("/upload");
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      if (isOnUpload) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL(`/upload`, nextUrl));
      }
      return true;
    },
    
    // async jwt({ token, user }) {
    //   if (user?.id) token.id = user.id;
    //   return token;
    // },
    // async session({session, token, user}) {
    //   if (token.id && session.user) session.user.id = token.id;
    //   return session;
    // },
  },
} satisfies NextAuthConfig;
