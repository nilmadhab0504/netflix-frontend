import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: string|null; // or number, depending on your backend
    accessToken?: string|null; // optional, if you're using it
  }

  interface Session {
    user: User;
    accessToken?: string|null; // optional, if you're using it
  }

  interface JWT {
    id: string; // or number, depending on your backend
    accessToken?: string; // optional, if you're using it
  }
}
