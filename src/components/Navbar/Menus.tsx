'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Blocks, FilePlus2, Menu, User } from 'lucide-react';
import Link from 'next/link';
import Logout from './Logout';
export function Menus() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-start">Menu</SheetTitle>
        </SheetHeader>
        <ul className="flex h-[calc(100%-2rem)] flex-col gap-4 py-4">
          <li className="border-l-4 border-transparent hover:border-primary hover:text-primary">
            <Link
              href="/auth/dashboard"
              className="flex items-center gap-1 py-2 ml-1"
            >
              <Blocks /> Dashboard
            </Link>
          </li>

          <li className="border-l-4 border-transparent hover:border-primary hover:text-primary">
            <Link
              href="/auth/new"
              className="flex items-center gap-1 py-2 ml-1"
            >
              <FilePlus2 /> Criar novo
            </Link>
          </li>
          <li className="border-l-4 border-transparent hover:border-primary hover:text-primary">
            <Link
              href="/auth/profile"
              className="flex items-center gap-1 py-2 ml-1"
            >
              <User /> Perfil
            </Link>
          </li>
          <Logout />
        </ul>
      </SheetContent>
    </Sheet>
  );
}
