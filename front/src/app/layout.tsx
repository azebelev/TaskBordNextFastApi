'use client';
import {AuthProvider} from '@/auth/authProvider';
import { Layout } from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          <AuthProvider>
            <Layout>{children}</Layout>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
