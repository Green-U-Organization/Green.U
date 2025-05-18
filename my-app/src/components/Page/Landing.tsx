'use client';
import React, { useRef, useState } from 'react';
import Card from '../Atom/Card';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../slice/authSlice';
import Image from 'next/image';

const Landing = () => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch();

  //Cookies
  const token = Cookies.get('access_token');

  return (
    <Card className="relative flex h-screen w-screen flex-col items-center justify-center">
      {/* Background */}
      <div className="absolute h-screen w-screen overflow-hidden opacity-100">
        <Image
          width={50}
          height={50}
          src={'/image/divers/gifs/1.gif'} //L'image de fond
          alt={'Loading...'}
          className="absolute -top-0 -right-0 h-screen w-screen overflow-auto object-cover"
        />
        <Image
          width={50}
          height={50}
          src={'/image/divers/gifs/loading.gif'} //Le moulin
          alt={'Loading...'}
          className="absolute top-45 -right-25 h-[70vh] w-[100vh] overflow-visible object-cover"
        />
        <Image
          width={50}
          height={50}
          src={'/image/divers/gifs/2.gif'} //Les herbes et fleurs en 1er plan
          alt={'Loading...'}
          className="absolute -top-0 -right-0 h-screen w-screen overflow-hidden object-cover"
        />
      </div>

      {/* Titre */}
      <div className="relative z-0">
        <h1 className="text-8xl opacity-0">*Green.U*</h1>
        <h1
          className="absolute top-1 -left-1 z-40 animate-pulse text-8xl text-black ease-in [animation-duration:4s]"
          style={{ animationDelay: '2s' }}
        >
          *Green.U*
        </h1>
        <p className="absolute -top-0 left-0 z-50 text-8xl text-green-600">
          *Green.U*
        </p>
        <h1 className="absolute top-0 -left-0 z-50 animate-pulse text-8xl text-amber-400 ease-in [animation-duration:4s]">
          *<span className="opacity-0">Green.U</span>*
        </h1>
      </div>

      {/* Menu */}
      <div className="flex h-[60vh] w-[70vw] flex-col items-center justify-center p-10">
        <div
          onClick={token ? () => router.push('/garden') : () => {}}
          className="relative m-2 flex h-[10vh] w-[50vw] items-center justify-center rounded-xl bg-none transition-transform duration-150 select-none active:scale-98"
        >
          <div
            className={`${token ? 'bg-bgbutton opacity-0' : 'opacity-0'} absolute h-[10vh] w-[50vw] rounded-xl`}
          ></div>
          <p
            className={`${token ? 'bg-bgbutton border-4 border-[#28a745] opacity-80' : 'border-none opacity-0'} absolute flex h-[10vh] w-[50vw] items-center justify-center rounded-xl`}
          >
            Garden
          </p>
        </div>

        <div
          onClick={token ? () => router.push('/profile') : () => {}}
          className="relative m-2 flex h-[10vh] w-[50vw] items-center justify-center rounded-xl bg-none transition-transform duration-150 select-none active:scale-98"
        >
          <div
            className={`${token ? 'bg-bgbutton opacity-0' : 'opacity-0'} absolute h-[10vh] w-[50vw] rounded-xl`}
          ></div>
          <p
            className={`${token ? 'bg-bgbutton border-4 border-[#28a745] opacity-80' : 'border-none opacity-0'} absolute flex h-[10vh] w-[50vw] items-center justify-center rounded-xl`}
          >
            Profil
          </p>
        </div>

        <div
          onClick={token ? () => router.push('/explore') : () => {}}
          className="relative m-2 flex h-[10vh] w-[50vw] items-center justify-center rounded-xl bg-none transition-transform duration-150 select-none active:scale-98"
        >
          <div
            className={`${token ? 'bg-bgbutton opacity-0' : 'opacity-0'} absolute h-[10vh] w-[50vw] rounded-xl`}
          ></div>
          <p
            className={`${token ? 'bg-bgbutton border-4 border-[#28a745] opacity-80' : 'border-none opacity-0'} absolute flex h-[10vh] w-[50vw] items-center justify-center rounded-xl`}
          >
            Explore
          </p>
        </div>

        <div
          onClick={
            token
              ? () => {
                  dispatch(logout());
                  router.push('landing');
                }
              : () => router.push('login')
          }
          className="relative m-2 flex h-[10vh] w-[50vw] items-center justify-center rounded-xl border-4 border-[#28a745] bg-none transition-transform duration-150 select-none active:scale-98 sm:w-[20vw]"
        >
          <div
            className={`${token ? 'bg-bgbutton' : 'bg-bgbutton'} absolute h-[10vh] w-[50vw] rounded-xl opacity-80 sm:w-[20vw]`}
          ></div>
          <p className="absolute flex h-[10vh] w-[50vw] items-center justify-center rounded-xl border-4 border-[#28a745] sm:w-[20vw]">
            {token ? 'Logout' : 'Login'}
          </p>
        </div>
      </div>
      <p
        style={{ display: token ? 'none' : 'block' }}
        className="z-50 text-base text-white"
      >
        Don&apos;t have account ? Don&apos;t panic and{' '}
        <span onClick={() => router.push('register')} className="text-border">
          Register !
        </span>
      </p>
    </Card>
  );
};

export default Landing;
