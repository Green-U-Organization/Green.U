'use client';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import ZoomSlider from './ZoomSlider';
import Button from './Button';
import { useRouter } from 'next/navigation';
import { GardenCardHeaderProps } from '@/utils/types';
import { useGarden } from '../../app/hooks/useGarden';

const GardenCardHeader: FC<GardenCardHeaderProps> = ({
  containerName,
  className,
  onGardenIdChange,
  onScaleChange,
  type,
}) => {
  const [gardenId, setGardenId] = useState<number | null>(null);
  // const [selectedGarden, setSelectedGarden] = useState<Garden>();
  const router = useRouter();
  const { gardens, loading, error, isEmpty } = useGarden(1); //IL FAUDRA CHOPPER L'ID DANS LES COOKIES

  //#region FETCHING GARDEN DATA

  //#region HANDLER
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scale = Number(e.target.value);
    onScaleChange(scale);
  };

  const handleGardenIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGardenId = Number(e.target.value);
    setGardenId(selectedGardenId);
    const newlySelectedGarden = gardens.find((g) => g.id === selectedGardenId);

    if (onGardenIdChange && newlySelectedGarden) {
      onGardenIdChange(newlySelectedGarden);
    }

    // if (selectedGarden) {
    //   onGardenIdChange && onGardenIdChange(selectedGarden);
    // }
    // race condition
  };
  //#endregion

  const gardenDescription = gardens.find((g) => g.id === gardenId)?.description;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error : {error}</div>;
  }
  if (isEmpty) {
    return <div>Oups, no garden find...</div>;
  }

  return (
    <>
      <section
        className={`grid-rows-auto mt-3 grid auto-cols-auto items-center ${className}`}
      >
        <h1 className="col-start-1 col-end-3 mt-2 ml-4 text-center text-4xl">
          {containerName}
        </h1>

        <div
          className="col-start-1 col-end-2 row-start-2 row-end-3 flex justify-center"
          style={{ display: type === 'display' ? 'flex' : 'none' }}
        >
          <Button onClick={() => router.push('/garden-manager/edit')}>
            Edit actual Garden
          </Button>
        </div>

        <div
          className="col-start-2 col-end-3 row-start-2 row-end-3 flex justify-center"
          style={{ display: type === 'display' ? 'flex' : 'none' }}
        >
          <Button onClick={() => router.push('/garden-manager/create')}>
            Create new Garden
          </Button>
        </div>

        <div className="col-start-1 col-end-2 row-start-4 row-end-5 flex justify-center">
          <ZoomSlider
            handleChange={handleScaleChange}
            className=""
          ></ZoomSlider>
        </div>

        <div
          className="col-start-2 col-end-3 row-start-4 row-end-5 mr-2 flex justify-around"
          style={{ display: type === 'edit' ? 'block' : 'none' }}
        >
          <Image
            className="h-8 w-8 rounded-md border-1 border-black object-contain p-1"
            src="/image/icons/list.png"
            alt="expand"
            width={20}
            height={20}
          />
          <Image
            className="h-8 w-8 rounded-md border-1 border-black object-contain p-1"
            src="/image/icons/fence.png"
            alt="expand"
            width={20}
            height={20}
          />
          <Image
            className="h-8 w-8 rounded-md border-1 border-black object-contain p-1"
            src="/image/icons/edit.png"
            alt="expand"
            width={20}
            height={20}
          />
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
            value={gardenId || ''}
          >
            {gardens.map((garden, index) => (
              <option key={index} value={garden.id}>
                {garden.name}
              </option>
            ))}
          </select>
          <h2>{gardenDescription ?? 'No garden selected'}</h2>
        </div>
      </section>
    </>
  );
};

export default GardenCardHeader;
