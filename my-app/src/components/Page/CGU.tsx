'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../src/app/contexts/LanguageProvider';
import Card from '@/components/Atom/Card';
import Button from '@/components/Atom/Button';

const CGU = () => {
  const router = useRouter();
  const { translations } = useLanguage();

  const handleCloseTab = () => {
    // Tente de fermer l'onglet
    window.close();
    // Si "window.close()" échoue (car l'onglet n'a pas été ouvert par JavaScript), on redirige vers une autre page
    router.push('/signin');
  };

  return (
    <Card className="mx-auto max-w-4xl p-6">
      <h1 className="text-shadow mb-4 text-3xl font-bold">
        {translations.cgutitle}
      </h1>
      <section className="mb-6">
        <h2 className="text-border text-xl font-semibold">
          {translations.cgutitle1}
        </h2>
        <p>{translations.cgudesc1}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-border text-xl font-semibold">
          {translations.cgutitle2}
        </h2>
        <p>{translations.cgudesc2}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-border text-xl font-semibold">
          {translations.cgutitle3}
        </h2>
        <p>{translations.cgudesc3}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-border text-xl font-semibold">
          {translations.cgutitle4}
        </h2>
        <p>{translations.cgudesc4}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-border text-xl font-semibold">
          {translations.cgutitle5}
        </h2>
        <p>{translations.cgudesc5}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-border text-xl font-semibold">
          {translations.cgutitle6}
        </h2>
        <p>{translations.cgudesc6}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-border text-xl font-semibold">
          {translations.cgutitle7}
        </h2>
        <p>{translations.cgudesc7}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-border text-xl font-semibold">
          {translations.cgutitle8}
        </h2>
        <p>{translations.cgudesc8}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-border text-xl font-semibold">
          {translations.cgutitle9}
        </h2>
        <p>{translations.cgudesc9}</p>
      </section>
      <section>
        <h2 className="text-border text-xl font-semibold">
          {translations.cgutitle10}
        </h2>
        <p>
          {translations.cgudesc10}
          <a href={translations.cguemailto} className="text-blue-600 underline">
            {translations.cguemail}
          </a>
          .
        </p>
      </section>
      <div className="flex justify-center">
        <Button onClick={handleCloseTab}>{translations.close}</Button>
      </div>
    </Card>
  );
};

export default CGU;
