import GardenDisplay from '@/components/GardenDisplay';
import { getAllGardenByUserId } from '@/utils/actions/garden/getAllGardenByUserId';
import { cookies } from 'next/headers';
import React from 'react';
const userId = 1;

getAllGardenByUserId(userId);
const Page = () => {
  return <GardenDisplay></GardenDisplay>;
};

export default Page;
