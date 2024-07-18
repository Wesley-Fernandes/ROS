import { ReactNode } from 'react';
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
import { Trash, X } from 'lucide-react';
interface props {
  children: ReactNode;
  id: string;
}
export function Erase({ children, id }: props) {
  const erase = () => {
    console.log(id);
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
          <AlertDialogTitle>Deletar dados?</AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a deletar o processo de recrutamento {id}. Você
            têm certeza?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="flex items-center gap-1">
            <X size={14} className="text-red-500" />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={erase}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600"
          >
            <Trash size={14} /> Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
