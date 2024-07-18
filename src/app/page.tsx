import React from 'react';
import Login from '../components/Login';

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-extrabold text-center uppercase text-3xl mb-4">Login</h1>
      <small className='-mt-5 mb-5'>Under development...</small>
        <Login />
    </main>
  );
}
