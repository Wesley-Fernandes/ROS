'use client';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../data/firebase';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui';
import { userStore } from '@/data/storage/user-store';

export default function Login() {
  const { push } = useRouter();
  const { setUser } = userStore();
  const login = async () => {
    await signInWithPopup(auth, provider)
      .then((data) => {
        setUser(data.user);
        return push('/auth/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ errorCode, errorMessage });
      });
  };
  return (
    <Button onClick={login} className="border h-10 w-28 rounded-md shadow-md">
      Login
    </Button>
  );
}
