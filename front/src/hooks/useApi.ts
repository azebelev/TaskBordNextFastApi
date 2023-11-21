'use client';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

export const useApi = () => {
  const router = useRouter();
  const path = usePathname();

  const { data: session } = useSession();
  const apiInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_ENV_API_BASE_URL,
    });

    instance.interceptors.request.use(
      async (config) => {
        const accessToken = session?.user?.email;
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        } else if (path !== '/auth/signup') {
          router.push('/auth/login');
        }
        return config;
      },
      (error) => {
        console.log(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          router.push('/auth/login');
        }
        console.log(error);
      }
    );

    return instance;
  }, [session]);

  return apiInstance;
};

export const headerValues = { appJson: { 'Content-Type': 'application/json' } };
