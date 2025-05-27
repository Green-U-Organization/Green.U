'use client';
import React, { useState } from 'react';
import GardenCardHeader from '../Organism/GardenCardHeader';
import Garden from '../Organism/Garden';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const GardenEdit = () => {
  // LocalState
  const [currentScale, setCurrentScale] = useState<number>(10);

  // Handlers
  const handleScaleChange = (scale: number) => {
    setCurrentScale(scale);
    console.log(currentScale);
  };

  // Selectors
  const garden = useSelector((state: RootState) => state.garden.selectedGarden);

  return (
    <>
      <GardenCardHeader
        containerName={'Garden Editor'}
        onScaleChange={handleScaleChange}
        type={'edit'}
      />

      {garden && <Garden />}
    </>
  );
};

export default GardenEdit;
