/* eslint-disable @next/next/no-img-element */
'use client';
import { useDispatch } from '@/redux/store';
import { useGetAllGardenByUserIdQuery } from '@/slice/fetch';
import Cookies from 'js-cookie';
import React from 'react';
import Card from '../Atom/Card';
import SlimCard from '../Atom/SlimCard';
import H1 from '../Atom/H1';
import { useRouter } from 'next/navigation';
import H2 from '../Atom/H2';
import Button from '../Atom/Button';
import {
  clearSelectedGarden,
  setSelectedGarden,
} from '@/redux/garden/gardenSlice';
import Loading from '../Atom/Loading';
import { setSelectedGardenCookies } from '@/utils/selectedGardenCookies';

const GardenSelector = () => {
  //Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const id = Number(userCookie?.id);

  //Selectors

  //RTK Query
  const {
    data: gardens,
    isLoading: gardensIsLoading,
    isError: gardensIsError,
  } = useGetAllGardenByUserIdQuery({
    userId: id,
  }); // get de donnés des données

  if (gardensIsLoading) {
    return (
      <section className="bg-cardbackground flex min-h-screen items-center justify-center">
        <Card className="min-h-screen overflow-auto">
          <div className="flex flex-col items-center">
            <H1>Garden Selector</H1>
            <Loading />
          </div>
        </Card>
      </section>
    );
  }
  if (gardensIsError) {
    console.log('error in gardenSelector user : ', id);
  }

  return (
    <section className="bg-cardbackground flex min-h-screen items-center justify-center">
      <Card className="min-h-screen overflow-auto">
        <div className="mt-5 flex min-h-[95vh] flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <H1>Garden Selector</H1>

            {gardens?.content.map((garden) => (
              <SlimCard
                bgColor="bg-cardbackground"
                className="bg-parcel mt-[2vh] ml-[0vw] flex min-h-[5vh] w-[90vw] flex-col justify-center"
                key={garden.id}
              >
                <div className="flex items-center justify-between">
                  <div
                    onClick={() => {
                      dispatch(setSelectedGarden(garden));
                      clearSelectedGarden();
                      setSelectedGardenCookies(garden);
                      router.push(`/garden/display/${garden.id}/`);
                    }}
                    className="flex w-[80vw] flex-col"
                  >
                    <H2>{garden.name}</H2>
                    <p className="ml-[5vw] italic">{garden.description}</p>
                  </div>

                  <img
                    // onClick={handleConfigurationClick}
                    className="image mr-[5vw] h-[10vw] w-[10vw] object-contain"
                    src="/image/icons/gear.png"
                    alt=""
                  />
                </div>
              </SlimCard>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => router.push('/landing')}
              className="relative m-5 mx-2 mb-[10vw] px-6 py-2"
            >
              Back
            </Button>
            <Button
              onClick={() => router.push('garden/create')}
              className="relative m-5 mx-2 mb-[10vw] px-6 py-2"
            >
              Create new garden
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};
export default GardenSelector;
