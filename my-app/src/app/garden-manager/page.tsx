import GardenDisplay from '@/components/Page/GardenDisplay';
import { getAllGardenByUserId } from '@/utils/actions/garden/getAllGardenByUserId';
import React from 'react';
const userId = 1;

getAllGardenByUserId(userId);
const Page = () => {
  return <GardenDisplay></GardenDisplay>;
};

export default Page;
