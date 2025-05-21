'use client';
import Card from '@/components/Atom/Card';
import Garden from '../Organism/Garden';
import React, { useEffect } from 'react';
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

type GardenDisplayProps = {
  gardenId: number;
};

const GardenDisplay = ({ gardenId }: GardenDisplayProps) => {
  //Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  // RTK Query
  const {
    data: gardenRaw,
    isLoading: gardensIsLoading,
    isError: gardensIsError,
  } = useGetOneGardenByGardenIdQuery({ gardenId });

  // Selectors
  const currentGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );
  const fullscreen = useSelector((state: RootState) => state.garden.fullscreen);

  // Cookies - utilisation de useEffect pour éviter les différences SSR/CSR
  const [userId, setUserId] = React.useState<number | null>(null);

  useEffect(() => {
    const userData = Cookies.get('user_data');
    const userCookie = userData ? JSON.parse(userData) : null;
    setUserId(Number(userCookie?.id) || null);
  }, []);

  // Mise à jour du garden sélectionné
  useEffect(() => {
    if (gardenRaw?.content) {
      dispatch(setSelectedGarden(gardenRaw.content));
    }
  }, [gardenRaw, dispatch]);

  if (gardensIsLoading) {
    return <Loading />;
  }

  if (gardensIsError || !gardenRaw?.content) {
    return <div>Error loading garden data</div>;
  }

  const garden = gardenRaw.content;

  return (
    <section className="bg-cardbackground flex min-h-screen items-center justify-center">
      <Card className="min-h-screen overflow-auto">
        <div className="mt-5 flex max-h-[11vh] flex-col items-center overflow-y-auto">
          <H1>{garden.name} Yololo</H1>
          <H2>{garden.description}</H2>
        </div>
        <div style={{ display: fullscreen ? 'none' : 'block' }}></div>
        <div className="mt-[5vw] max-h-[90vh] max-w-full overflow-x-auto">
          {garden && <Garden />}
        </div>

        {/* Condition rendue côté client seulement */}
        {typeof window !== 'undefined' && userId === garden.authorId && (
          <MenuSandwich iconList={[]} />
        )}

        <div className="fixed right-0 bottom-[20px] left-0 z-2 flex items-center justify-center">
          <Button
            className="bg-bgbutton relative z-10 px-6 py-3.5"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
        <MenuSandwichOptionInGarden iconList={[]} />
      </Card>
    </section>
  );
};

export default GardenDisplay;
