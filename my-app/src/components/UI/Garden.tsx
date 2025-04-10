import React, { FC, useEffect, useState } from 'react';
import Parcel from './Parcel';
import styles from '../../app/Assets.module.css';
import { GardenProps, type Garden } from '@/utils/types';
import { useParcelList } from '@/app/hooks/useParcelList';

const Garden: FC<GardenProps> = ({ garden, scale }) => {
  const [currentGarden, setCurrentGarden] = useState<Garden>(garden);
  const { parcels, loading, error, isEmpty } = useParcelList(currentGarden.id);

  // Calcul des dimensions du jardin
  const gardenX = currentGarden?.length;
  const gardenY = currentGarden?.width;

  useEffect(() => {
    setCurrentGarden(garden);
  }, [garden]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error : {error}</div>;
  }
  if (isEmpty) {
    return <div>Oups, no parcel find...</div>;
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
            <Parcel parcel={parcel} scale={scale} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Garden;
