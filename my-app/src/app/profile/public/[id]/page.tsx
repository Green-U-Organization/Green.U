import PublicProfile from '@/components/Page/PublicProfile';
import React, { FC } from 'react';

type Profile = {
  params: {
    id: number;
  };
};

const page: FC<Profile> = async id => {
  const userId = Number((await id.params).id);
  return <PublicProfile userId={userId} />;
};

export default page;
