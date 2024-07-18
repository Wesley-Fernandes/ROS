import Link from 'next/link';
import { ReactNode } from 'react';

interface props {
  children: ReactNode;
  jumper: boolean;
  title: string;
  href?: string;
}
export default function Detail({ children, jumper, title, href }: props) {
  return (
    <div className="flex items-center gap-2">
      {children}
      {jumper && href ? (
        <Link
          target="_blank"
          className="flex items-center opacity-90 border-b hover:border-primary text-sm"
          href={href}
        >
          {title}
        </Link>
      ) : (
        <span className="h-12 flex items-center opacity-50 text-sm">
          {title}
        </span>
      )}
    </div>
  );
}
