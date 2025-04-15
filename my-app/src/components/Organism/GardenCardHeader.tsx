'use client';
import Image from 'next/image';
import React, { FC } from 'react';
import ZoomSlider from '../Atom/ZoomSlider';
import Button from '../Atom/Button';
import { useRouter } from 'next/navigation';
import { GardenCardHeaderProps } from '@/utils/types';
import { useGardenList } from '../../app/hooks/useGardenList';
import H1 from '../Atom/H1';

const GardenCardHeader: FC<GardenCardHeaderProps> = ({
  containerName,
  className,
  onScaleChange,
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
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scale = Number(e.target.value);
    onScaleChange(scale);
  };

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
        <H1>{containerName}</H1>

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
          <h2>{gardenDescription ?? 'No garden selected'}</h2>
        </div>
      </section>
    </>
  );
};

export default GardenCardHeader;
