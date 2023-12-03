import connection from "@/db/connection";
import userModel, { User } from "@/db/models/user.model";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.user) session.user = token.user;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        await connection();

        const userData: User | null = await userModel.findOne({ email: credentials.username });
        if (!userData) return null;

        const passwordMatch = await bcrypt.compare(credentials.password, userData.password);
        if (!passwordMatch) return null;

        const sessionUser = {
          id: userData.id,
          name: userData.fullName,
          role: userData.role || "user",
        };

        // console.log("SESSION", { sessionUser, credentials });

        return sessionUser;
      },
      type: "credentials",
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
