'use client';

import Card from '@/components/Atom/Card';
import Garden from '../Organism/Garden';
import React from 'react';
import GardenCardHeader from '@/components/Organism/GardenCardHeader';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// import Draggable from 'react-draggable';

const GardenDisplay = () => {
  const currentGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );
  const scale = useSelector((state: RootState) => state.garden.scale);
  const fullscreen = useSelector((state: RootState) => state.garden.fullscreen);

  return (
    <section className="flex min-h-screen items-center justify-center">
      <Card className="min-h-screen overflow-auto">
        <div
          style={{
            display: fullscreen ? 'none' : 'block',
          }}
        >
          <GardenCardHeader
            containerName={'Garden Manager'}
            className="flex flex-col items-center p-5"
            type="display"
          />
        </div>

        <div className="mt-[5vw] max-w-full overflow-x-auto">
          {currentGarden && (
            <Garden garden={currentGarden} scale={scale}></Garden>
          )}
        </div>
      </Card>
    </section>
  );
};

export default GardenDisplay;
