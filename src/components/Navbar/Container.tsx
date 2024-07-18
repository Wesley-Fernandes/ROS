import Link from 'next/link';
import { ReactNode } from 'react';

interface props {
  children: ReactNode;
}
export function Container({ children }: props) {
  return (
    <header className="h-14 border-b flex items-center w-full px-4 relative z-10">
      <h1 className="font-extrabold text-2xl uppercase w-full text-primary">
        <Link href="/auth">ROS</Link>
      </h1>
      {children}
    </header>
  );
}
