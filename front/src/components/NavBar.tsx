'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ConfirmationModal } from './modals/ConfirmationModal';

export function NavBar() {
  const { data: session } = useSession();
  const user = session?.user;
  const path = usePathname();
  const router = useRouter();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    signOut({redirect:false});
    sessionStorage.removeItem('token');
    setLogoutModalOpen(false)
    router.replace('/');
  };

  return (
    <header className='bg-white h-20 px-5 sm:px-10'>
      <nav className='h-full flex justify-between container items-center'>
        <div className='text-grey-600 text-2xl font-semibold'>Task Board</div>
        <ul className='flex items-center gap-4'>
          <li className={`hover:scale-110 ${path === '/' ? 'text-grey-400 font-bold' : ''}`}>
            <Link href='/' className='text-grey-600'>
              Home
            </Link>
          </li>
          {user && <li className={`hover:scale-110 ${path === '/task-board' ? 'text-grey-400 font-bold' : ''}`}>
            <Link href='/task-board' className='text-grey-600'>
              Tasks
            </Link>
          </li>}
          {!user && (
            <>
              <li
                className={`hover:scale-110 ${
                  path === '/auth/login' ? 'text-grey-400 font-bold' : ''
                }`}
              >
                <Link href='/auth/login' className='text-grey-600'>
                  Login
                </Link>
              </li>
              <li
                className={`hover:scale-110 ${
                  path === '/auth/signup' ? 'text-grey-400 font-bold' : ''
                }`}
              >
                <Link href='/auth/signup' className='text-grey-600'>
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <li className='cursor-pointer hover:scale-110' onClick={() => setLogoutModalOpen(true)}>
              Logout
            </li>
          )}
        </ul>
      </nav>
      {logoutModalOpen && (
        <ConfirmationModal
          onCancel={() => setLogoutModalOpen(false)}
          onSubmit={handleLogout}
          title={'Logout Confirmation'}
          text={'Are you sure you want to log out?'}
        />
      )}
    </header>
  );
}
