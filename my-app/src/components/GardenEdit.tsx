'use client';
import React, { useState } from 'react';
import GardenCardHeader from './UI/GardenCardHeader';
import Garden from './UI/Garden';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const GardenEdit = () => {
  const [currentScale, setCurrentScale] = useState<number>(10);

  const handleScaleChange = (scale: number) => {
    setCurrentScale(scale);
  };

  const garden = useSelector((state: RootState) => state.garden.selectedGarden);

  return (
    <>
      <GardenCardHeader
        containerName={'Garden Editor'}
        onScaleChange={handleScaleChange}
        type={'edit'}
      />

      {garden && <Garden garden={garden} scale={0} />}
    </>
  );
};

export default GardenEdit;
