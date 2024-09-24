import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" } // 'login' or 'register'
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password || !credentials.action) {
          throw new Error('Missing fields');
        }

        const url = credentials.action === 'login' 
          ? `${process.env.BACKEND_URL}/auth/login`
          : `${process.env.BACKEND_URL}/auth/register`;

        try {
          const response = await axios.post(url, {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.data.user) {
            return response.data.user;
          } else {
            throw new Error(response.data.message || 'Authentication failed');
          }
        } catch (error:any) {
          if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Authentication failed');
          }
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }:any) {
      if (session.user) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
});