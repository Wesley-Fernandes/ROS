'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ALargeSmall, Palette, Pencil } from 'lucide-react';

interface ISwitcher {
  change_theme: any;
}
function Profilepage() {
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();
  const switcher = ({ change_theme }: ISwitcher) => {
    switch (change_theme) {
      case 'dark':
        setTheme('light');
        toast;
        break;
      case 'light':
        setTheme('dark');
        break;
    }
    toast({
      title: 'Atualizado',
      description: `Tema atualizado para ${theme as string}!`,
      duration: 2000,
    });
  };
  return (
    <section className="flex justify-center items-center flex-1 p-2 h-[calc(100vh-7rem)]">
      <div className="w-96 h-fit p-4 flex flex-col gap-2">
        <div className="flex items-center justify-center mb-4">
          <Button
            size="icon"
            variant="default"
            className="absolute ml-[4.2rem] mt-[4.5rem] rounded-full"
          >
            <Pencil />
          </Button>
          <img
            className="w-28 h-28 rounded-full border-4 border-primary"
            src="/user.png"
            alt="user image"
          />
        </div>
        <div className="flex items-center gap-2">
          <ALargeSmall className="w-12" />
          <Input
            name="username"
            placeholder="Username..."
            className="h-12"
            defaultValue="username"
          />
        </div>
        <div className="flex items-center gap-2">
          <Palette className="w-12" />
          <Select
            onValueChange={(change_theme) => {
              return switcher({ change_theme });
            }}
          >
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Escolher tema..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Tema escuro</SelectItem>
              <SelectItem value="dark">Tema claro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="uppercase">Enviar</Button>
      </div>
    </section>
  );
}

export default Profilepage;
