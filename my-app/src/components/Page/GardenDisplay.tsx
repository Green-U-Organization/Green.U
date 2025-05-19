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
import { useGetOneGardenByGardenIdQuery } from '@/slice/fetch';
import Loading from '../Atom/Loading';

// import Draggable from 'react-draggable';

type GardenDisplayProps = {
  gardenId: number;
};

const GardenDisplay = ({ gardenId }: GardenDisplayProps) => {
  // Selectors
  // const currentGarden = useSelector(
  //   (state: RootState) => state.garden.selectedGarden
  // );
  const fullscreen = useSelector((state: RootState) => state.garden.fullscreen);

  //RTK Query
  const {
    data: gardenRaw,
    isLoading: gardensIsLoading,
    isError: gardensIsError,
    isSuccess: gardenIsSuccess,
  } = useGetOneGardenByGardenIdQuery({
    gardenId: gardenId,
  });

  //Cookies
  // const garden = Cookies.get('selected_garden');
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const userId = Number(userCookie?.id);

  //Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  // //Check du State global du garden si jamais refresh de la page
  // if (!currentGarden && garden) {
  //   const parsedGarden: Garden = JSON.parse(garden);
  //   dispatch(setSelectedGarden(parsedGarden));
  // }

  //Debug
  console.log('gardenId : ', gardenId);
  console.log('user : ', userId);

  if (gardensIsLoading) {
    <Loading></Loading>;
  } else if (gardenIsSuccess) {
    const garden = gardenRaw.content;
    //dispatch(setSelectedGarden(garden));
    return (
      <section className="bg-cardbackground flex min-h-screen items-center justify-center">
        <Card className="min-h-screen overflow-auto">
          <div className="mt-5 flex max-h-[11vh] flex-col items-center overflow-y-auto">
            <H1>{garden.name} Yololo</H1>
            <H2>{garden.description}</H2>
          </div>
          <div
            style={{
              display: fullscreen ? 'none' : 'block',
            }}
          ></div>
          <div className="mt-[5vw] max-h-[90vh] max-w-full overflow-x-auto">
            {garden && <Garden></Garden>}
          </div>

          <div
            style={{
              display: userId === garden.authorId ? 'block' : 'none',
            }}
          >
            <MenuSandwich iconList={[]}></MenuSandwich>
          </div>

          <div className="fixed right-0 bottom-[20px] left-0 z-2 flex items-center justify-center">
            <Button
              className="bg-bgbutton relative px-6 py-3.5"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
          <MenuSandwichOptionInGarden
            iconList={[]}
          ></MenuSandwichOptionInGarden>
        </Card>
      </section>
    );
  }
};

export default GardenDisplay;
