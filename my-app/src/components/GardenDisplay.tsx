'use client';

import Card from '@/components/UI/Card';
import Garden from '@/components/UI/Garden';
import React, { useState } from 'react';
import GardenCardHeader from '@/components/UI/GardenCardHeader';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Assurez-vous que le chemin vers votre store est correct

// import Draggable from 'react-draggable';

const GardenDisplay = () => {
  // const [currentGardenId, setCurrentGardenId] = useState<number>(1);
  const [currentScale, setCurrentScale] = useState<number>(125);

  const currentGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );

  const handleScaleChange = (scale: number) => {
    setCurrentScale(scale);
  };

  return (
    <section className="flex items-center justify-center">
      <Card className="overflow-auto overflow-x-auto overflow-y-auto">
        <GardenCardHeader
          containerName={'Garden Manager'}
          className="flex flex-col items-center p-5"
          onScaleChange={handleScaleChange}
          type="display"
        />

        <div className="max-w-full overflow-x-auto">
          {currentGarden && (
            <Garden garden={currentGarden} scale={currentScale}></Garden>
          )}
        </div>
      </Card>
    </section>
  );
};

export default GardenDisplay;
