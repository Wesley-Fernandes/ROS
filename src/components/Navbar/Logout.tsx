'use client';
import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';
import { auth } from '@/data/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '../ui';
import { userStore } from '@/data/storage/user-store';

export default function Logout() {
  const { push } = useRouter();
  const { removeUser } = userStore();

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        removeUser();
        setTimeout(() => {
          push('/');
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        return;
      });
  };
  return (
    <li className="flex flex-1 items-end h-full">
      <div className="flex items-center justify-between gap-1 py-2 ml-1 w-full px-2">
        <div className="flex items-center gap-2">
          <img
            className="h-14 w-14 rounded-full border-4"
            src="/user.png"
            alt="user image"
          />
          <span className="font-bold">Wesley Fernandes</span>
        </div>
        <Button variant="destructive" size="icon" onClick={logout}>
          <LogOut />
        </Button>
      </div>
    </li>
  );
}
