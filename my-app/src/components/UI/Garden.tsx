import React, { FC, useEffect, useState } from 'react';
import Parcel from './Parcel';
import styles from '../../app/Assets.module.css';
import { getAllParcelByGardenId } from '@/utils/actions/garden/parcel/getAllParcelByGardenId';

type GardenProps = {
  garden: Garden;
  scale: number;
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
  privacy: number;
  type: number;
};

type Parcels = {
  id: number;
  gardenId: number;
  length: number;
  width: number;
  nLine: number;
  parcelAngle: number;
  createdAt: string;
  garden: string;
  lines: [];
  logs: [];
};

const Garden: FC<GardenProps> = ({ garden, scale }) => {
  const [currentGarden, setCurrentGarden] = useState<Garden>(garden);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [parcels, setParcels] = useState<Parcels[]>();

  // Calcul des dimensions du jardin
  const gardenX = currentGarden?.length;
  const gardenY = currentGarden?.width;

  useEffect(() => {
    setCurrentGarden(garden);
    setIsLoading(false);

    getAllParcelByGardenId(garden.id).then((result) => {
      setParcels(result);
      console.log(parcels);
    });
  }, [garden]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mb-10 ml-10 flex">
      <div
        className="bg-gardenBG relative rounded-xl"
        style={{
          height: gardenX * scale,
          width: gardenY * scale,
        }}
      >
        {/* GRASS */}
        <div
          className={`absolute top-0 ${styles.grassBG} z-0 rounded-xl`}
          style={{
            height: gardenX * scale,
            width: gardenY * scale,
          }}
        ></div>

        {/* TOP Fence */}
        <div
          className={`absolute top-0 ${styles.gardenHorizontalFence} z-20 rounded-xl`}
          style={{
            height: 0.3 * scale,
            width: gardenY * scale,
          }}
        ></div>
        {/* BOTTOM Fence */}
        <div
          className={`absolute bottom-0 ${styles.gardenHorizontalFence} z-20 rounded-xl`}
          style={{
            height: 0.3 * scale,
            width: gardenY * scale,
          }}
        ></div>
        {/* LEFT Fence */}
        <div
          className={`absolute top-0 left-0 ${styles.gardenVerticalFence} z-20 rounded-xl`}
          style={{
            height: gardenX * scale,
            width: 0.2 * scale,
          }}
        ></div>
        {/* RIGHT Fence */}
        <div
          className={`absolute top-0 right-0 ${styles.gardenVerticalFence} z-20 rounded-xl`}
          style={{
            height: gardenX * scale,
            width: 0.2 * scale,
          }}
        ></div>

        {parcels?.map((parcel) => (
          <div className="relative z-10" key={parcel.id}>
            <Parcel
              parcelX={parcel.width}
              parcelY={parcel.length}
              parcelID={parcel.id}
              scale={scale}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Garden;
