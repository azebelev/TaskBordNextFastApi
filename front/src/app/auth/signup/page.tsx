'use client';
import { AuthCard, SignUpDto } from '../../../components/AuthCard';
import { headerValues, useApi } from '../../../hooks/useApi';
import { HttpStatusCode } from 'axios';
import { signIn } from 'next-auth/react';

export default function SignUpPage() {
  const api = useApi();

  const handleSignUp = async (credentials: SignUpDto) => {
    const mappedDto = {
      first_name: credentials.firstName,
      last_name: credentials.lastName,
      email: credentials.email,
      password: credentials.password,
    };
    const res = await api.post('auth/register', mappedDto, { headers: headerValues.appJson });
    
    if (res?.status === HttpStatusCode.Created) signIn(undefined, { callbackUrl: '/' });
    else alert('User already registered');
  };

  return <AuthCard type={'signUp'} callback={handleSignUp} />;
}
