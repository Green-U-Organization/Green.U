'use client';
import React, { FC, useEffect, useState } from 'react';
import Parcel from './Parcel';
import styles from '../../app/Assets.module.css';
import { GardenProps, type Garden } from '@/utils/types';
import { useParcelList } from '@/app/hooks/useParcelList';
import MenuSandwich from '../Molecule/MenuSandwich';
import Submenu from '../Molecule/Submenu';
import NewParcelForm from '../Molecule/Add_Parcel_Popup';
import { RootState, useSelector, useDispatch } from '@/redux/store';
import { setFullscreen } from '../../redux/garden/gardenSlice';
import NewGreenhouseForm from '../Molecule/Add_Greenhouse_Popup';

const GardenCardMode: FC<GardenProps> = ({ garden, scale }) => {
  // Hooks
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.garden.reload);

  // Local State
  const [currentGarden, setCurrentGarden] = useState<Garden>(garden);
  const [gardenLock, setGardenLock] = useState<boolean>(true);
  const [addSubmenu, setAddSubmenu] = useState<boolean>(false);
  const { parcels, loading, error, isEmpty } = useParcelList(
    currentGarden.id ?? 0
  );

  // Selectors
  const fullscreen = useSelector((state: RootState) => state.garden.fullscreen);

  // UseEffect
  // useEffect(() => {
  //   console.log('addSubmenu updated:', addSubmenu);
  // }, [addSubmenu]);

  useEffect(() => {
    setCurrentGarden(garden);
  }, [garden]);

  // Handlers
  const handleAdd = () => {
    setAddSubmenu((prev) => !prev);
  };

  //TODO:
  const handleEditGarden = () => {};
  //TODO:
  const handleDisplayMode = () => {};
  const handleAddParcel = () => {};

  const handleFullscreenSwitch = () => {
    dispatch(setFullscreen(!fullscreen));
  };

  // Variables
  const addSubmenuIcon = [
    {
      src: '/image/icons/parcel.png',
      alt: 'Add parcel',
      handleClick: handleAddParcel,
      displayCondition: true,
      form: <NewParcelForm display={true} />,
    },
    {
      src: '/image/icons/greenhouse.png',
      alt: 'Add greenhouse',
      handleClick: handleAddParcel,
      displayCondition: true,
      form: <NewGreenhouseForm display={true} />,
    },
    {
      src: '/image/icons/nursery.png',
      alt: 'Add nuursery',
      handleClick: handleAddParcel,
      displayCondition: true,
      form: <div>Nursery Form</div>,
    },
    {
      src: '/image/icons/todo.png',
      alt: 'Add Todo',
      handleClick: handleAddParcel,
      displayCondition: true,
      form: <div>Todo Form</div>,
    },
  ];

  const iconList = [
    {
      src: '/image/icons/add.png',
      alt: 'Add Parcel',
      handleClick: handleAdd,
      submenu: (
        <Submenu displayCondition={addSubmenu} iconList={addSubmenuIcon} />
      ),
    },
    {
      src: '/image/icons/edit.png',
      alt: 'Edit Garden',
      handleClick: handleEditGarden,
    },
    {
      src: '/image/icons/fence.png',
      alt: 'switch Garden display mode',
      handleClick: handleDisplayMode,
    },
    {
      src: '/image/icons/fullscreen.png',
      alt: 'switch in fullscreen mode',
      handleClick: handleFullscreenSwitch,
    },
    {
      src: gardenLock
        ? '/image/icons/lockClose.png'
        : '/image/icons/lockOpen.png',
      alt: 'lock or unlock garden edition',
      handleClick: () => setGardenLock((prev) => !prev),
    },
  ];

  // Calcul des dimensions du jardin
  const gardenX = currentGarden?.length;
  const gardenY = currentGarden?.width;

  // Loading and Error Handling
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log('Error : ', { error });
  }
  if (isEmpty) {
    console.log('Oups, no parcel find..');
  }
  return (
    <section className="mb-10 ml-10 flex flex-col">
      <MenuSandwich iconList={iconList}>
        <NewParcelForm display={false}></NewParcelForm>
      </MenuSandwich>

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
            <Parcel parcel={parcel} scale={scale} parcelKey={parcel.id} />
          </div>
        ))}
      </section>
    </section>
  );
};

export default GardenCardMode;
