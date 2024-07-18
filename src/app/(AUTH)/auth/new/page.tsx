'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Building2, Link, RotateCcw, TrendingUp, Workflow } from 'lucide-react';
import { FormEvent } from 'react';
import z from 'zod';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/data/firebase';
import { userStore } from '@/data/storage/user-store';
import { useRouter } from 'next/navigation';

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

const jobs = [
  'Front-end',
  'Back-end',
  'Fullstack',
  'DevOps',
  'Ux/Ui',
  'Fullcycle',
  'Mobile',
  'Tech Lead',
];

const level = ['Junior', 'Pleno', 'Senior', 'Principal engineer'];

const formSchema = z.object({
  enterprise: z.string().nonempty({ message: 'Empressa é obrigatorio' }),
  situation: z.string().nonempty({ message: 'Status é obrigatorio' }),
  href: z.string().nonempty({ message: 'Link é obrigatorio' }),
  level: z.string().nonempty({ message: 'Level é obrigatorio' }),
  job: z.string().nonempty({ message: 'Job é obrigatorio' }),
});

function Createpage() {
  const { toast } = useToast();
  const { push } = useRouter();
  const user = userStore.getState().data?.uid;

  const submitter = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      enterprise: { value: string };
      situation: { value: string };
      job: { value: string };
      level: { value: string };
      href: { value: string };
    };

    const enterprise = target.enterprise.value;
    const href = target.href.value;
    const situation = target.situation.value;
    const job = target.job.value;
    const level = target.level.value;
    const now = new Date();
    const data = now.toISOString();

    const validation = formSchema.safeParse({
      enterprise,
      href,
      situation,
      level,
      job,
    });

    if (!validation.success) {
      const errors = validation.error.errors
        .map((err) => err.message)
        .join(', ');
      console.log(validation.error.errors);
      toast({ title: '404', description: errors });
      return;
    }

    const docRef = await addDoc(collection(db, 'recruitment'), {
      enterprise,
      href,
      situation,
      user,
      job,
      level,
      createdAt: data,
      updatedAt: data,
    });

    toast({
      title: '202',
      description: `Recrutamento ${docRef.id} adicionado com sucesso!`,
    });

    setTimeout(() => {
      push('/auth/archives');
    }, 1000);
  };
  return (
    <section className="flex justify-center items-center flex-1 p-2 h-[calc(100vh-7rem)]">
      <form
        onSubmit={submitter}
        className="w-96 h-fit p-4 flex flex-col gap-2 animate__animated animate__lightSpeedInLeft"
      >
        <h1 className="font-bold text-3xl opacity-70 text-center mb-4 uppercase">
          Novo registro
        </h1>
        <div className="flex items-center gap-2">
          <Building2 className="w-12" />
          <Input name="enterprise" placeholder="Empressa..." className="h-12" />
        </div>
        <div className="flex items-center gap-2">
          <Link className="w-12" />
          <Input
            name="href"
            type="url"
            placeholder="Link..."
            className="h-12"
          />
        </div>

        <div className="flex items-center gap-2">
          <Workflow className="w-12" />
          <Select name="job" key="job">
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Cargo" />
            </SelectTrigger>
            <SelectContent>
              {jobs.sort().map((item) => (
                <SelectItem value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp className="w-12" />
          <Select
            name="level"
            key="level"
            onValueChange={(e) => console.log(e)}
          >
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Nivel do cargo" />
            </SelectTrigger>
            <SelectContent>
              {level.map((item) => (
                <SelectItem value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <RotateCcw className="w-12" />
          <Select
            name="situation"
            key="situation"
            onValueChange={(e) => console.log(e)}
          >
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
        <Button className="uppercase" type="submit">
          Enviar
        </Button>
      </form>
    </section>
  );
}

export default Createpage;
