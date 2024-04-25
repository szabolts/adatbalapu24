import type { NextAuthConfig } from "next-auth";
import { getAdminByEmail } from "./lib/data";
import OracleDB from "oracledb";

export const authConfig = {
  // debug: true,
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      // console.log("AUUUUTH:    ", auth)
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnUpload = nextUrl.pathname.startsWith("/upload");
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      // console.log("email:    ", auth?.user?.email);
      // const isAdmin =  getAdminByEmail(!!auth?.user.email.toString());
      // const isAdmin = auth?.user?.role === "admin";
      if (isOnUpload) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL(`/upload`, nextUrl));
      }
      
      return true;
    },
   /* async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      
      const user = await getUserById(token.sub);

      if (!user) return token;
      token.role = user.ROLE;
      return token;
    },
  },
  session: {strategy: "jwt", maxAge: 365 * 24 * 60 * 60},
  jwt: {maxAge: 365 * 24 * 60 * 60},
  // adapter */
}
} satisfies NextAuthConfig;
