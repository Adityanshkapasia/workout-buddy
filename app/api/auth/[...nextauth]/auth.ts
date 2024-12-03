import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateUser, getUserById } from "@/utils/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await validateUser(
          credentials.email,
          credentials.password
        );
        if (user) {
          // Get the most up-to-date user data
          const currentUser = await getUserById(user.id);
          return currentUser
            ? {
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email,
                themePreference: currentUser.themePreference,
              }
            : null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.themePreference = user.themePreference;
      } else if (token.id) {
        // Refresh user data on every token refresh
        const currentUser = await getUserById(token.id);
        if (currentUser) {
          token.themePreference = currentUser.themePreference;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.themePreference = token.themePreference as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
