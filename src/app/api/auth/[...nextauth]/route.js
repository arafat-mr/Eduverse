import { loginUser } from "@/app/actions/loginUser";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);
        if (!user) return null;

        // Only return safe fields
        return user
      },
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
    
  })

  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      //  custom fields from token into session
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
       session.user.profileImage = token.profileImage || session.user.image || null;
        session.user.createdAt = token.createdAt;
      }
      return session;
    },
    async jwt({ token, user }) {
      // When user logs in
      if (user) {
        token.id = user.id;
        token.role = user.role;
       token.profileImage = user.profileImage || user.image || null;
        token.createdAt = user.createdAt;
      }
      return token;
    },
  },
    
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
