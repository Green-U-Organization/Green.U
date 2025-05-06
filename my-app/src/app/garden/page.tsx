import GardenSelector from '@/components/Page/GardenSelector';
import { getAllGardenByUserId } from '@/utils/actions/garden/getAllGardenByUserId';
import React from 'react';
const userId = 1;

getAllGardenByUserId(userId);
const Page = () => {
  return <GardenSelector />;
};

export default Page;
