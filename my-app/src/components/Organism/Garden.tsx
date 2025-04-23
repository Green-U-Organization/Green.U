'use client';
import React, { FC, useEffect, useState } from 'react';
import Parcel from './Parcel';
import styles from '../../app/Assets.module.css';
import { GardenProps, type Garden } from '@/utils/types';
import MenuSandwich from '../Molecule/MenuSandwich';
import Submenu from '../Molecule/Submenu';
import NewParcelForm from '../Molecule/AddParcelPopup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setFullscreen, setGraphicMode } from '../../redux/garden/gardenSlice';
import NewGreenhouseForm from '../Molecule/AddGreenhousePopup';
import {
  useGetAllParcelByGardenIdQuery,
  useGetNurseryByGardenIdQuery,
} from '@/slice/garden';
import H1 from '../Atom/H1';
import AddNurseryPopup from '../Molecule/AddNurseryPopup';
import Nursery from './Nursery';

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
    refetch: refetchParcels,
  } = useGetAllParcelByGardenIdQuery({
    gardenId: garden.id,
  });
  const {
    data: nurseries,
    isLoading: nurseryIsLoading,
    isError: nurseryIsError,
    refetch: refetchNurseries,
  } = useGetNurseryByGardenIdQuery({
    gardenId: garden.id,
  });

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
      form: <AddNurseryPopup displayCondition={true} />,
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

  useEffect(() => {
    refetchNurseries();
  }, [garden.id, refetchNurseries]);

  useEffect(() => {
    refetchParcels();
  }, [garden.id, refetchParcels]);

  if (parcelsIsLoading) {
    return <div>Loading...</div>;
  }
  if (parcelsIsError) {
    console.log('Error in current Garden : ', garden.id);
  }
  if (parcels?.isEmpty) {
    console.log('Oups, no parcel find..');
  }

  if (nurseryIsLoading) {
    return <div>Loading...</div>;
  }
  if (nurseryIsError) {
    console.log('Error in current Garden fetching nursery : ', garden.id);
  }
  if (nurseries?.isEmpty) {
    console.log('Oups, no parcel find..');
  }

  return (
    <section className="mb-10 flex flex-col">
      <MenuSandwich iconList={iconList}>
        {/* <NewParcelForm displayCondition={false}></NewParcelForm> */}
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

        {/* {parcels?.map((parcel, index) => (
          <div className="relative z-10" key={parcel.id}>
            <Parcel parcelKey={index + 1} parcel={parcel} scale={scale} />
          </div>
        ))} */}
        {parcelsIsError ? (
          <div className="flex w-[80vw] flex-col items-center justify-center">
            <H1>
              Hey, you don&apos;t have any parcels yet! Want to create one?
            </H1>
            <br />
            <p>
              You can just click on the icon on the bottom right of your screen,
              then click on the &quot;+&quot; icon and select the parcel.
              <br />
              Easy isn&apos;t it?
            </p>
          </div>
        ) : (
          parcels?.content.map((parcel, index) => (
            <div className="relative z-10" key={parcel.id}>
              <Parcel parcelKey={index + 1} parcel={parcel} scale={scale} />
            </div>
          ))
        )}

        {nurseryIsError ? (
          <div className="flex w-[80vw] flex-col items-center justify-center">
            <p>You don't have any nursery here. Want to create one?</p>
          </div>
        ) : (
          nurseries?.content.map((nursery, index) => (
            <div className="relative z-10" key={nursery.id}>
              <Nursery
                nursery={nursery}
                scale={scale}
                nurseryKey={index + 1}
              ></Nursery>
            </div>
          ))
        )}
      </section>
    </section>
  );
};

export default Garden;
