"use client";

import AvatarUpload from "@/components/AvatarUpload";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur ton site !</h1>
      <AvatarUpload />
    </div>
  );
}
