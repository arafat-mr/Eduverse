import { createUser, findUserByEmail } from '@/app/actions/googleUser';
import { loginUser } from '@/app/actions/loginUser';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);
        if (!user) return null;

        // Only return safe fields
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role || 'user';
      session.user.profileImage =
        token.profileImage || session.user.image || null;
      session.user.createdAt = token.createdAt;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user'; 
        token.profileImage = user.profileImage || user.image || null;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        let existingUser = await findUserByEmail(user.email);

        if (!existingUser) {
          // Create if not found
          existingUser = await createUser({
            email: user.email,
            name: user.name,
            profileImage: user.image,
            role: 'user',
            createdAt: new Date(),
          });
        }

        // Assign the created/found user to user object
        user.id = existingUser.id;
        user.role = existingUser.role;
        user.profileImage = existingUser.profileImage || user.image;
        user.createdAt = existingUser.createdAt;
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
