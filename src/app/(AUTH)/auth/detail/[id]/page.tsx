'use client';
import Detail from '@/components/detail';
import { Button } from '@/components/ui/button';
import { db } from '@/data/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  ArrowLeft,
  Building2,
  ClockArrowDown,
  ClockArrowUp,
  Link,
  LoaderCircle,
  RotateCcw,
  TrendingUp,
  Workflow,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

export default function Detailspage() {
  const { id }: { id: string } = useParams();
  const { data, isLoading } = useQuery(
    'recruitment',
    async () => {
      if (!id) return undefined;
      const docRef = doc(db, 'recruitment', id);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    },
    {
      retry: 2,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  const { back } = useRouter();

  return (
    <section className="flex flex-col items-center justify-center gap-10 p-2 h-[calc(100vh-7rem)]">
      <header className="w-[23rem] md:w-[640px] h-16 flex items-center justify-between px-2 animate__animated animate__lightSpeedInRight">
        <Button size="icon" onClick={back}>
          <ArrowLeft />
        </Button>
        <h1 className="font-semibold text-xl opacity-70 text-center uppercase">
          Detalhes
        </h1>
      </header>

      {isLoading && <LoaderCircle className="animate-spin" />}

      {data != undefined && (
        <div className="w-[23rem] md:w-[640px] h-fit p-4 flex flex-col gap-2 animate__animated animate__lightSpeedInLeft">
          <Detail key="enterprise" jumper={false} title={data.enterprise}>
            <Building2 className="w-12" />
          </Detail>
          <Detail
            key="link"
            jumper={true}
            title="Link importante"
            href={data.href}
          >
            <Link className="w-12" />
          </Detail>
          <Detail key="status" jumper={false} title={data.job}>
            <Workflow className="w-12" />
          </Detail>
          <Detail key="level" jumper={false} title={data.level}>
            <TrendingUp className="w-12" />
          </Detail>
          <Detail key="situation" jumper={false} title={data.situation}>
            <RotateCcw className="w-12" />
          </Detail>
          <Detail key="created" jumper={false} title={data.createdAt}>
            <ClockArrowUp className="w-12" />
          </Detail>
          <Detail key="updated" jumper={false} title={data.updatedAt}>
            <ClockArrowDown className="w-12" />
          </Detail>
        </div>
      )}
    </section>
  );
}
