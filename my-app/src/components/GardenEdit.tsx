import React, { useState } from 'react';
import GardenCardHeader from './UI/GardenCardHeader';

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
    </>
  );
};

export default GardenEdit;
