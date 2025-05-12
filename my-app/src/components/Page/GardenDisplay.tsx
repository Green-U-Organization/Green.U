'use client';
import Card from '@/components/Atom/Card';
import Garden from '../Organism/Garden';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import MenuSandwich from '../Molecule/MenuSandwichAddInGarden';
import H1 from '../Atom/H1';
import H2 from '../Atom/H2';
import Cookies from 'js-cookie';
import { setSelectedGarden } from '@/redux/garden/gardenSlice';
import MenuSandwichOptionInGarden from '../Molecule/MenuSandwichOptionInGarden';
import { useRouter } from 'next/navigation';
import Button from '../Atom/Button';

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
  const router = useRouter();

  //Check du State global du garden si jamais refresh de la page
  if (!currentGarden && garden) {
    const parsedGarden: Garden = JSON.parse(garden);
    dispatch(setSelectedGarden(parsedGarden));
  }

  return (
    <section className="bg-cardbackground flex min-h-screen items-center justify-center">
      <Card className="min-h-screen overflow-auto">
        <div className="mt-5 flex max-h-[15vh] flex-col items-center overflow-y-auto">
          <H1>{currentGarden?.name}</H1>
          <H2>{currentGarden?.description}</H2>
        </div>
        <div
          style={{
            display: fullscreen ? 'none' : 'block',
          }}
        ></div>
        <div className="mt-[5vw] max-h-[90vh] max-w-full overflow-x-auto">
          {currentGarden && (
            <Garden garden={currentGarden} scale={scale}></Garden>
          )}
        </div>
        <MenuSandwich iconList={[]}></MenuSandwich>
        <div className="fixed right-0 bottom-[20px] left-0 z-49 flex min-h-[10vh] items-center justify-center">
          <Button
            className="bg-bgbutton relative px-6 py-2"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
        <MenuSandwichOptionInGarden iconList={[]}></MenuSandwichOptionInGarden>
      </Card>
    </section>
  );
};

export default GardenDisplay;
