'use client';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import ZoomSlider from './ZoomSlider';
import { getAllGardenByUserId } from '@/utils/actions/garden/getAllGardenByUserId';
import Button from './Button';
import { useRouter } from 'next/navigation';

type GardenCardHeaderProps = {
  containerName: string;
  className?: string;
  children?: React.ReactNode;
  onGardenIdChange: (selectedGarden: Garden) => void;
  onScaleChange: (scale: number) => void;
};

type Garden = {
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

const GardenCardHeader: FC<GardenCardHeaderProps> = ({
  containerName,
  className,
  onGardenIdChange,
  onScaleChange,
}) => {
  const [gardens, setGardens] = useState<any[]>([]);
  const [gardenId, setGardenId] = useState<number | null>(null);
  const [selectedGarden, setSelectedGarden] = useState<Garden>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  //#region FETCHING GARDEN DATA
  const fetchGardens = async () => {
    try {
      const fetchedGardens = await getAllGardenByUserId(1);
      setGardens(fetchedGardens);
      setGardenId(fetchedGardens[0]?.id || null);
    } catch (error) {
      console.error('Error fetching gardens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGardens();
  }, []);

  useEffect(() => {
    if (gardenId !== null) {
      setSelectedGarden(gardens.find((garden) => garden.id === gardenId));
      console.log('selectedGarden : ', selectedGarden);
    }
  }, [gardenId, gardens]);

  //#endregion

  //#region HANDLER
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scale = Number(e.target.value);
    onScaleChange(scale);
  };

  const handleGardenIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGardenId = Number(e.target.value);
    setGardenId(selectedGardenId);
    if (selectedGarden) {
      onGardenIdChange(selectedGarden);
    }
  };

  const handleEditGarden = () => {
    console.log('edit garden');
  };

  const handleCreateGarden = () => {
    console.log('create garden');
  };
  //#endregion

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section
        className={`grid-rows-auto mt-3 grid auto-cols-auto items-center ${className}`}
      >
        <h1 className="col-start-1 col-end-3 mt-2 ml-4 text-center text-4xl">
          {containerName}
        </h1>

        <div className="col-start-1 col-end-2 row-start-2 row-end-3 flex justify-center">
          <Button onClick={handleEditGarden}>Edit actual Garden</Button>
        </div>

        <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex justify-center">
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

        <div className="col-start-2 col-end-3 row-start-4 row-end-5 mr-2 flex justify-around">
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

        <div className="col-start-1 col-end-3 row-start-3 row-end-4 mb-5 ml-4">
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
          <h2>
            {selectedGarden ? selectedGarden.description : 'No garden selected'}
          </h2>
        </div>
      </section>
    </>
  );
};

export default GardenCardHeader;
