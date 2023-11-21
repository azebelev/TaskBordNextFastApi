import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const uri =
          `${process.env.NEXT_PUBLIC_ENV_API_BASE_URL}auth/login` ||
          'http://127.0.0.1:8000/fastapi/auth/login';
          console.log('secret',process.env.NEXTAUTH_SECRET)
          console.log('uri',uri)
          console.log('uri',`${process.env.NEXT_PUBLIC_ENV_API_BASE_URL}auth/login`)
        try {
          const res = await fetch(uri, {
            method: 'POST',
            body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
            headers: { 'Content-Type': 'application/json' },
          });

          const user = await res.json();

          if (res.ok && user) {
            return { id: user.id, email: user.token, name: user.name };
          } else {
            console.error('Authentication failed:', user);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }

        return null;
      },
    }),
  ],
};
