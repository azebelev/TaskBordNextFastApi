'use client'
import { useSession } from 'next-auth/react';

export function HomePage() {
    const { data: session } = useSession();
  const user:any = session?.user;
  return (
    <div className='h-full px-5 flex flex-col items-center justify-center'>
      <h1 className='text-4xl text-center font-bold mb-6'>Welcome to Your Task Board App</h1>
      {user && <p className='text-lg text-gray-600 mb-8'>
        Dear {user.name}
      </p>}
      <p className='text-lg text-center text-gray-600 mb-8'>
        Organize your tasks efficiently and stay productive!
      </p>
      {!user && <p className='text-lg text-gray-600 mb-4'>Please log in or register to get started.</p>}
    </div>
  );
}
