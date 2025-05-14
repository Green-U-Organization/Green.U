import PublicProfile from '@/components/Page/PublicProfile';
import React, { FC } from 'react';

type Profile = {
  params: Promise<{
    id: number;
  }>;
};

const page: FC<Profile> = async ({ params }) => {
  const { id } = await params;
  const userId = Number(id);
  return <PublicProfile userId={userId} />;
};

export default page;
