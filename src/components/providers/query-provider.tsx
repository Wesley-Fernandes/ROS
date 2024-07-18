'use client';
import React from 'react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface props {
  children: ReactNode;
}
export default function QueryProvider({ children }: props) {
  const QC = new QueryClient();
  return <QueryClientProvider client={QC}>{children}</QueryClientProvider>;
}
