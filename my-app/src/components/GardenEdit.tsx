'use client';
import React, { useState } from 'react';
import GardenCardHeader from './UI/GardenCardHeader';
import Garden from './UI/Garden';

const GardenEdit = () => {
  const [currentScale, setCurrentScale] = useState<number>(10);

  const handleScaleChange = (scale: number) => {
    setCurrentScale(scale);
  };
  return (
    <>
      <GardenCardHeader
        containerName={'Garden Editor'}
        onScaleChange={handleScaleChange}
        type={'edit'}
      />

      <Garden
        garden={{
          id: 0,
          authorId: 0,
          name: '',
          description: '',
          latitude: 0,
          longitude: 0,
          length: 0,
          width: 0,
          privacy: 0,
          type: 0,
        }}
        scale={0}
      />
    </>
  );
};

export default GardenEdit;
