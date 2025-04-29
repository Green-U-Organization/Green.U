'use client';
import React, { FC } from 'react';
import Button from '../Atom/Button';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { GardenCardHeaderProps } from '@/utils/types';
import { setSelectedGarden } from '@/redux/garden/gardenSlice';
import H1 from '../Atom/H1';
import { useSelector, useDispatch } from 'react-redux';
import { useGetAllGardenByUserIdQuery } from '@/slice/fetch';
import { RootState } from '@/redux/store';
import Loading from '../Atom/Loading';

const GardenCardHeader: FC<GardenCardHeaderProps> = ({
  containerName,
  className,
  type,
}) => {
  //Hooks
  const router = useRouter();
  const dispatch = useDispatch();

  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const username = userCookie?.username;
  const id = Number(userCookie?.id);

  //RTK Query
  const {
    data: gardens,
    isLoading: gardensIsLoading,
    isError: gardensIsError,
  } = useGetAllGardenByUserIdQuery({
    userId: id,
  }); // get de donnés des données

  //Selectors
  const selectedGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );

  //Handlers
  const handleGardenIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGardenId = Number(e.target.value);

    const garden = gardens?.content.find((g) => g.id === selectedGardenId);

    if (garden) {
      dispatch(setSelectedGarden(garden));
    }
  };

  //Variables
  const gardenDescription = selectedGarden?.description;

  //Loading and Error Handling
  if (gardensIsLoading) {
    return <Loading />;
  }
  if (gardensIsError) {
    console.log('Error in gardens list');
  }
  if (gardens?.content.length === 0) {
    console.log('Oups, no garden find...');
  }

  return (
    <>
      <section
        className={`flex flex-col items-center justify-start ${className}`}
      >
        <div className="flex items-center justify-center">
          <H1>{containerName}</H1>
          <Button onClick={() => router.push('/garden-manager/create')}>
            +
          </Button>
        </div>

        <div
          className="col-start-1 col-end-3 row-start-3 row-end-4 mb-5 ml-4"
          style={{ display: type === 'display' ? 'block' : 'none' }}
        >
          Please choose your garden :
          <select
            onChange={handleGardenIdChange}
            name="garden"
            id="gardenId"
            value={selectedGarden?.id || ''}
          >
            {' '}
            <option value="" disabled></option>
            {gardens &&
              Array.isArray(gardens.content) &&
              gardens.content.map((garden, index) => (
                <option key={index} value={garden.id}>
                  {garden.name}
                </option>
              ))}
          </select>
          <p className="text-lg italic">
            {gardenDescription ?? 'No garden selected'}
          </p>
        </div>
      </section>
    </>
  );
};

export default GardenCardHeader;
