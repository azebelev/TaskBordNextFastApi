import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if(status === 'unauthenticated' && path !== '/auth/signup'&& path !== '/auth/login') router.push('/');
  }, [status]);

  return <>{children}</>;
}
