'use client';
import React from 'react';
import Card from '../Atom/Card';
import { useRouter } from 'next/navigation';
const Landing = () => {
  const router = useRouter();

  return (
    <Card className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="absolute h-screen w-screen overflow-hidden opacity-100">
        <img
          src={'/image/divers/gifs/1.gif'}
          alt={'Loading...'}
          className="absolute -top-0 -right-0 h-screen w-screen overflow-hidden object-cover"
        />
        <img
          src={'/image/divers/gifs/loading.gif'}
          alt={'Loading...'}
          className="absolute top-45 -right-25 h-[70vh] w-[100vh] overflow-hidden object-cover"
        />
        <img
          src={'/image/divers/gifs/2.gif'}
          alt={'Loading...'}
          className="absolute -top-0 -right-0 h-screen w-screen overflow-hidden object-cover"
        />
      </div>

      <div className="flex h-[60vh] w-[70vw] flex-col items-center justify-center p-10">
        <div
          onClick={() => router.push('/garden')}
          className="relative m-2 flex h-[10vh] w-[50vw] items-center justify-center rounded-xl border-4 border-[#28a745] bg-none select-none"
        >
          <div className="bg-bgbutton absolute h-[10vh] w-[50vw] rounded-xl opacity-80"></div>
          <p className="absolute flex h-[10vh] w-[50vw] items-center justify-center rounded-xl border-4 border-[#28a745]">
            Garden
          </p>
        </div>

        <div
          onClick={() => router.push('/garden')}
          className="bg-bgbutton relative m-2 flex h-[10vh] w-[50vw] items-center justify-center rounded-xl border-4 border-[#28a745] select-none"
        >
          Explore
        </div>

        <div
          onClick={() => router.push('/garden')}
          className="bg-bgbutton relative m-2 flex h-[10vh] w-[50vw] items-center justify-center rounded-xl border-4 border-[#28a745] select-none"
        >
          Profile
        </div>

        <div
          onClick={() => router.push('/garden')}
          className="bg-bgbutton relative m-2 flex h-[10vh] w-[50vw] items-center justify-center rounded-xl border-4 border-[#28a745] select-none"
        >
          Parametre
        </div>
      </div>
    </Card>
  );
};

export default Landing;
