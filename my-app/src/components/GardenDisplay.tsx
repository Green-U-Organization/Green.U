'use client';

import Card from '@/components/UI/Card';
import Garden from '@/components/UI/Garden';
import React, { use, useEffect, useState } from 'react';
import GardenCardHeader from '@/components/UI/GardenCardHeader';
import Draggable from 'react-draggable';

type GardenType = {
  id: number;
  authorId: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  privacy: 'private' | 'public';
  type: 'individual' | 'collective' | 'professionnal';
};

const GardenDisplay = () => {
  const [currentGardenId, setCurrentGardenId] = useState<number>(1);
  const [currentScale, setCurrentScale] = useState<number>(125);
  const [currentGarden, setCurrentGarden] = useState<GardenType | null>(null);

  const handleGardenIdChange = (selectedGarden: GardenType) => {
    setCurrentGarden(selectedGarden);
  };

  const handleScaleChange = (scale: number) => {
    setCurrentScale(scale);
  };

  return (
    <section className="flex items-center justify-center">
      <Card className="overflow-auto overflow-x-auto overflow-y-auto">
        <GardenCardHeader
          containerName={'Garden Manager'}
          className="flex flex-col items-center p-5"
          onGardenIdChange={handleGardenIdChange}
          onScaleChange={handleScaleChange}
        ></GardenCardHeader>

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
