import React, { FC, useEffect, useState } from 'react';
import Parcel from './Parcel';
import styles from '../../app/Assets.module.css';
import { GardenProps, type Garden } from '@/utils/types';
import { useParcelList } from '@/app/hooks/useParcelList';

const Garden: FC<GardenProps> = ({ garden, scale }) => {
  const [currentGarden, setCurrentGarden] = useState<Garden>(garden);
  const [clickMenuDisplay, setClickMenuDisplay] = useState<boolean>(false);
  const [gardenLock, setGardenLock] = useState<boolean>(true);
  const [listDisplay, setListDisplay] = useState<boolean>(false);
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

  const handleClickMenu = () => {
    setClickMenuDisplay((prev) => !prev);
  };

  const handleListDisplay = () => {
    setListDisplay((prev) => !prev);
  };

  const handleGardenLock = () => {
    setGardenLock((prev) => !prev);
  };

  return (
    <section className="mb-10 ml-10 flex flex-col">
      <section
        className="_MENU_SANDWICH_ bg-gardenBG flex flex-row-reverse items-center rounded-xl border-2"
        style={{
          height: '10vw',
          width: clickMenuDisplay ? '100vw' : '10vw',
          bottom: '5%',
          right: '5%',
          zIndex: '100',
          position: 'fixed',
        }}
      >
        <img
          className="h-[100%] rounded-md p-1"
          src="/image/icons/display.png"
          alt="Open Menu"
          onClick={() => handleClickMenu()}
        />
        <div
          className="flex-row-reverse justify-between"
          style={{
            display: clickMenuDisplay ? 'flex' : 'none',
          }}
        >
          <div>
            <div className="ml-10 flex w-80 justify-around">
              <img
                className="h-8 w-8 rounded-md border-1 p-1"
                src="/image/icons/add.png"
                alt="Add Parcel"
              />
              <img
                className="h-8 w-8 rounded-md border-1 p-1"
                src="/image/icons/edit.png"
                alt="Edit Garden"
              />

              <div
                style={{
                  display: listDisplay ? 'none' : 'block',
                }}
              >
                <img
                  className="h-8 w-8 rounded-md border-1 p-1"
                  src="/image/icons/list.png"
                  alt="Switch in list mode"
                  height="80%"
                  onClick={() => handleListDisplay()}
                />
              </div>

              <div
                style={{
                  display: listDisplay ? 'block' : 'none',
                }}
              >
                <img
                  className="h-8 w-8 rounded-md border-1 p-1"
                  src="/image/icons/fence.png"
                  alt="Switch in garden mode"
                  height="80%"
                  onClick={() => handleListDisplay()}
                />
              </div>

              <img
                className="h-8 w-8 rounded-md border-1 p-1"
                src="/image/icons/fullScreen.png"
                alt="Edit Garden"
              />

              <div
                style={{
                  display: gardenLock ? 'block' : 'none',
                }}
              >
                <img
                  className="h-8 w-8 rounded-md border-1 p-1"
                  src="/image/icons/lockClose.png"
                  alt="Delock Garden"
                  onClick={() => handleGardenLock()}
                />
              </div>
              <div
                style={{
                  display: gardenLock ? 'none' : 'block',
                }}
              >
                <img
                  className="h-8 w-8 rounded-md border-1 p-1"
                  src="/image/icons/lockOpen.png"
                  alt="Lock Garden"
                  height="80%"
                  onClick={() => handleGardenLock()}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="_GARDEN_ bg-gardenBG relative rounded-xl"
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
      </section>
    </section>
  );
};

export default Garden;
