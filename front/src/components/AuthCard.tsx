import { useState } from 'react';

const loginCredentials = {
  email: '',
  password: '',
};
const singUpCredentials = {
  ...loginCredentials,
  firstName: '',
  lastName: '',
};

export type SignUpDto = typeof singUpCredentials
export type LoginDto = typeof loginCredentials

export function AuthCard({ type, callback }: { type: 'login' | 'signUp'; callback: any }) {
  const isSignUp = type === 'signUp';
  const [credentials, setCredentials] = useState<{[k:string]:string}>(isSignUp ? singUpCredentials : loginCredentials);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback(credentials);
  };

  return (
    <div className='flex justify-center items-center h-full bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-semibold mb-4'>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp ? (
            <>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>First name</label>
                <input
                  type='text'
                  name='firstName'
                  value={credentials.firstName}
                  onChange={handleChange}
                  className='mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200'
                  placeholder='Enter your first name'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-600'>Last name</label>
                <input
                  type='text'
                  name='lastName'
                  value={credentials.lastName}
                  onChange={handleChange}
                  className='mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200'
                  placeholder='Enter your last name'
                  required
                />
              </div>
            </>
          ) : null}

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>Email</label>
            <input
              type='email'
              name='email'
              value={credentials.email}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>Password</label>
            <input
              type='password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            type='submit'
            className='bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
