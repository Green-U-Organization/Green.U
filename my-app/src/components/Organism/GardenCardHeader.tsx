'use client';
import React, { FC } from 'react';

import Button from '../Atom/Button';
import { useRouter } from 'next/navigation';
import { GardenCardHeaderProps } from '@/utils/types';
import { useGardenList } from '../../app/hooks/useGardenList';
import H1 from '../Atom/H1';

const GardenCardHeader: FC<GardenCardHeaderProps> = ({
  containerName,
  className,
  type,
}) => {
  // const [selectedGarden, setSelectedGarden] = useState<Garden>();
  const router = useRouter();
  const {
    gardens,
    loading,
    error,
    isEmpty,
    selectedGarden,
    setSelectedGarden,
  } = useGardenList(1); //IL FAUDRA CHOPPER L'ID du USER DANS LES COOKIES !!!!!!!!

  console.log('Gardens from useGardenList:', gardens);
  console.log('Selected Garden from useGardenList:', selectedGarden);
  //#region FETCHING GARDEN DATA

  //#region HANDLER
  const handleGardenIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGardenId = Number(e.target.value);

    console.log('Selected garden ID from dropdown:', selectedGardenId);

    const garden = gardens.find((g) => g.id === selectedGardenId);
    console.log('Garden found in gardens array:', garden);

    if (garden) {
      setSelectedGarden(garden);
      console.log('Updated selectedGarden:', garden);
    }

    // if (selectedGarden) {
    //   onGardenIdChange && onGardenIdChange(selectedGarden);
    // }
    // race condition
  };
  //#endregion

  const gardenDescription = selectedGarden?.description;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log('Error : ', { error });
  }
  if (isEmpty) {
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
              Array.isArray(gardens) &&
              gardens.map((garden, index) => (
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
