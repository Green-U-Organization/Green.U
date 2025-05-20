'use client';
// import Image from 'next/image';
// import { useLanguage } from '@/app/contexts/LanguageProvider';
// import { useState, useEffect } from 'react';
import Landing from '@/components/Page/Landing';

export default function Home() {
  // const { translations } = useLanguage();
  // const [altText, setAltText] = useState(''); // État local pour éviter la mismatch

  // useEffect(() => {
  //   setAltText(translations.workinprogress); // Met à jour après le premier rendu
  // }, [translations]);

  // return (
  //   <div className="flex max-h-screen items-center justify-center">
  //     <main className="flex items-center justify-center px-5 pt-15">
  //       <Image
  //         src="/image/divers/WorkInProgress.png"
  //         alt={altText || 'Work in progress'} // Alternative en attendant la traduction
  //         width={600}
  //         height={400}
  //         style={{ height: 'auto' }} // Maintien du ratio
  //         priority
  //       />
  //     </main>
  //   </div>
  return <Landing></Landing>;

  // );
}
