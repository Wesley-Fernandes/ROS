"use client"
import { ReactNode, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
import { RefreshCcwDot, X } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '@/data/firebase';
import { SituationType } from './types';
interface props {
  children: ReactNode;
  id: string;
}
export function Updater({ children, id }: props) {
  const [newStatus, setNewStatus] = useState<SituationType|''>('');
  const status = [
    'Teste Técnico',
    'Rejeitado',
    'Aprovado',
    'Oferta',
    'Contratado',
    'Pendente',
    'Cancelado',
    'Entrevista RH',
    'Entrevista Tecnica',
  ];

  
  const updater = async() => {
    if(newStatus){
      const article = doc(db, "recruitment", id);
      await updateDoc(article, {
        situation: newStatus
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full flex items-center justify-start gap-2 pl-2 font-normal"
          variant="ghost"
        >
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="uppercase font-bold">
            Atualizar status
          </AlertDialogTitle>
        </AlertDialogHeader>
          <div>
          <Select onValueChange={(e:SituationType)=>setNewStatus(e)}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {status.sort().map((item) => (
                  <SelectItem value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
          </Select>
          </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white" type='button'>
            <X size={14} className="text-black" />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white" type='button' onClick={updater}>
            <RefreshCcwDot size={14} className="text-white" />
            Atualizar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
