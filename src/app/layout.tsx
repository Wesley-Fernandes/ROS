import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
//import QueryProvider from '../components/providers/query-provider';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ROS',
  description: 'Recruitment organization system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
