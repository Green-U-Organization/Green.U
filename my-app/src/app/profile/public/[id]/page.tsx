import PublicProfile from '@/components/Page/PublicProfile';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    id: string; // Les paramètres d'URL sont toujours des strings
  };
}

export default function Page({ params }: Props) {
  const userId = Number(params.id);
  return <PublicProfile userId={userId} />;
}
