'use client';
import Card from '@/components/Atom/Card';
import Garden from '../Organism/Garden';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import MenuSandwich from '../Molecule/MenuSandwich';
import H1 from '../Atom/H1';
import H2 from '../Atom/H2';
import Cookies from 'js-cookie';
import { setSelectedGarden } from '@/redux/garden/gardenSlice';

// import Draggable from 'react-draggable';

const GardenDisplay = () => {
  // Selectors
  const currentGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );
  const scale = useSelector((state: RootState) => state.garden.scale);
  const fullscreen = useSelector((state: RootState) => state.garden.fullscreen);
  //Cookies
  const garden = Cookies.get('selected_garden');

  //Hooks
  const dispatch = useDispatch();

  //Check du State global du garden si jamais refresh de la page
  if (!currentGarden && garden) {
    const parsedGarden: Garden = JSON.parse(garden);
    dispatch(setSelectedGarden(parsedGarden));
  }

  return (
    <section className="bg-cardbackground flex min-h-screen items-center justify-center">
      <Card className="min-h-screen overflow-auto">
        <div className="mt-5 flex flex-col items-center">
          <H1>{currentGarden?.name}</H1>
          <H2>{currentGarden?.description}</H2>
        </div>
        <div
          style={{
            display: fullscreen ? 'none' : 'block',
          }}
        ></div>

        <div className="mt-[5vw] max-w-full overflow-x-auto">
          {currentGarden && (
            <Garden garden={currentGarden} scale={scale}></Garden>
          )}
        </div>
        <MenuSandwich iconList={[]}></MenuSandwich>
      </Card>
    </section>
  );
};

export default GardenDisplay;
