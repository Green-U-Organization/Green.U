'use client';
import React, { FC, useEffect, useState } from 'react';
import Parcel from './Parcel';
import styles from '../../app/Assets.module.css';
import { GardenProps, type Garden } from '@/utils/types';
import MenuSandwich from '../Molecule/MenuSandwich';
import Submenu from '../Molecule/Submenu';
import NewParcelForm from '../Molecule/NewParcelForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setFullscreen, setGraphicMode } from '../../redux/garden/gardenSlice';
import NewGreenhouseForm from '../Molecule/NewGreenhouseForm';
import { useGetAllParcelByGardenIdQuery } from '@/slice/garden';

const Garden: FC<GardenProps> = ({ garden, scale }) => {
  // Hooks
  const dispatch = useDispatch();

  //Selectors
  const graphicMode = useSelector(
    (state: RootState) => state.garden.graphicMode
  );
  const fullscreen = useSelector((state: RootState) => state.garden.fullscreen);

  // State
  const [currentGarden, setCurrentGarden] = useState<Garden>(garden);
  const [gardenLock, setGardenLock] = useState<boolean>(true);

  //RTK Query
  const {
    data: parcels,
    isLoading: parcelsIsLoading,
    isError: parcelsIsError,
  } = useGetAllParcelByGardenIdQuery({
    gardenId: garden.id,
  });

  // const [listDisplay, setListDisplay] = useState<boolean>(false);
  const [addSubmenu, setAddSubmenu] = useState<boolean>(false);

  // Handlers
  const handleAdd = () => {
    console.log('Add garden');
    setAddSubmenu((prev) => !prev);
  };

  useEffect(() => {
    console.log('addSubmenu updated:', addSubmenu);
  }, [addSubmenu]);

  //TODO:
  const handleEditGarden = () => {
    console.log('Edit Garden');
  };
  //TODO:
  const handleDisplayMode = () => {
    dispatch(setGraphicMode());
  };
  const handleAddParcel = () => {
    console.log('first');
  };

  const handleFullscreenSwitch = () => {
    dispatch(setFullscreen(!fullscreen));
  };

  const addSubmenuIcon = [
    {
      src: '/image/icons/parcel.png',
      alt: 'Add parcel',
      handleClick: handleAddParcel,
      displayCondition: true,
      form: <NewParcelForm displayCondition={true} />,
    },
    {
      src: '/image/icons/greenhouse.png',
      alt: 'Add greenhouse',
      handleClick: handleAddParcel,
      displayCondition: true,
      form: <NewGreenhouseForm displayCondition={true} />,
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
      src: !graphicMode ? '/image/icons/fence.png' : '/image/icons/list.png',
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

  useEffect(() => {
    setCurrentGarden(garden);
  }, [garden]);

  if (parcelsIsLoading) {
    return <div>Loading...</div>;
  }
  if (parcelsIsError) {
    console.log('Error in current Garden : ', garden.id);
  }
  if (parcels?.length === 0) {
    console.log('Oups, no parcel find..');
  }
  return (
    <section className="mb-10 ml-10 flex flex-col">
      <MenuSandwich iconList={iconList}>
        <NewParcelForm displayCondition={false}></NewParcelForm>
      </MenuSandwich>

      <section
        className={`_GARDEN_ ${graphicMode ? 'bg-gardenBG' : 'bg-cardbackground'} relative rounded-xl`}
        style={{
          height: graphicMode ? gardenX * scale : '100vh',
          width: graphicMode ? gardenY * scale : '100vw',
        }}
      >
        <div
          style={{
            display: graphicMode ? 'block' : 'none',
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
        </div>

        {parcels?.map((parcel, index) => (
          <div className="relative z-10" key={parcel.id}>
            <Parcel parcelKey={index + 1} parcel={parcel} scale={scale} />
          </div>
        ))}
      </section>
    </section>
  );
};

export default Garden;
