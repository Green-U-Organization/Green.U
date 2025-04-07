'use client';

import AvatarUpload from '@/components/AvatarUpload';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="mb-4 text-2xl font-bold">Bienvenue sur ton site !</h1>
      <AvatarUpload />
    </div>
  );
}
