import GardenDisplay from '@/components/Page/GardenDisplay';
import React, { FC } from 'react';

type GardenDiplsayPageProps = {
  params: { id: string };
};

const page: FC<GardenDiplsayPageProps> = async ({ params }) => {
  const resolvedParams = await params;
  const gardenId = parseInt(resolvedParams.id);
  return <GardenDisplay gardenId={gardenId} />;
};

export default page;
