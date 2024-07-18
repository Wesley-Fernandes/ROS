import React from 'react';
import Login from '../components/Login';

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="border h-80 w-80 p-4 rounded-md">
        <h1 className="font-bold text-center uppercase text-3xl mb-4">Login</h1>
        <Login />
      </div>
    </main>
  );
}
