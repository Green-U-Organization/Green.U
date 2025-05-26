import GardenDisplay from '@/components/Page/GardenDisplay';
import React, { FC } from 'react';
import { PageProps } from '../../../../../.next/types/app/page';

type GardenDiplsayPageProps = PageProps & {
  params: { id: string };
};

const page: FC<GardenDiplsayPageProps> = async ({ params }) => {
  const resolvedParams = await params;
  const gardenId = parseInt(resolvedParams.id);
  return <GardenDisplay gardenId={gardenId} />;
};

export default page;
