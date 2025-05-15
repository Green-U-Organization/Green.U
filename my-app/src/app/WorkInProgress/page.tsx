'use client';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageProvider';
import Image from 'next/image';
import Button from '@/components/Atom/Button';
import { useRouter } from 'next/navigation';

const page = () => {
  const { translations } = useLanguage();
  const [altText, setAltText] = useState(''); // État local pour éviter la mismatch
  const router = useRouter();

  useEffect(() => {
    setAltText(translations.workinprogress); // Met à jour après le premier rendu
  }, [translations]);

  return (
    <div className="flex max-h-screen flex-col items-center justify-center">
      <main className="flex items-center justify-center px-5 pt-15">
        <Image
          src="/image/divers/WorkInProgress.png"
          alt={altText || 'Work in progress'} // Alternative en attendant la traduction
          width={600}
          height={400}
          style={{ height: 'auto' }} // Maintien du ratio
          priority
        />
      </main>
      <Button
        className="bg-bgbutton relative px-6 py-3.5"
        onClick={() => router.back()}
        type="button"
      >
        Back
      </Button>
    </div>
  );
};

export default page;
