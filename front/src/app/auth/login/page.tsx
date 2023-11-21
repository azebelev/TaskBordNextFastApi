'use client';
import { AuthCard, LoginDto } from '@/components/AuthCard';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (credentials: LoginDto) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
      callbackUrl: '/',
    });
    if (res?.ok) {
      router.push('/task-board');
    } else alert('No user found')
  };

  return <AuthCard type={'login'} callback={handleLogin} />;
}
