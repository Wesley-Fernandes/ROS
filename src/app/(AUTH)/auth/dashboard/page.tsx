'use client';
import { Filtered } from '@/components/Tables/filtered';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from 'react-query';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { userStore } from '@/data/storage/user-store';
import { LoaderCircle } from 'lucide-react';
import { Recruitment } from '@/components/Tables/types';
import { db } from '@/data/firebase';
import React from 'react';

export default function page() {
  const { data, isLoading } = useQuery(
    'recruitments',
    async () => {
      const user = userStore.getState().data?.uid;
      const q = query(collection(db, 'recruitment'), where('user', '==', user));
      const querySnapshot = await getDocs(q);
      const articles: Recruitment[] = [];
      querySnapshot.forEach((doc) => {
        articles.push({ id: doc.id, ...doc.data() } as Recruitment);
      });
      if (articles.length == 0) {
        return [];
      } else {
        console.log(articles);
        return articles;
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { toast } = useToast();

  console.log(data);
  return (
    <section className="flex p-2 h-[calc(100vh-7rem)] w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <LoaderCircle className="animate-spin" />
        </div>
      )}

      {data != undefined && <Filtered toast={toast} data={data} />}
    </section>
  );
}
