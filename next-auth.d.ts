import NextAuth from "next-auth/next";

declare module 'next-auth' {
  interface User{
    username: string;
  }

  interface Session{
    user: User & {
      id: string;
    },
    token: {
      username: string;
    }
  }
}