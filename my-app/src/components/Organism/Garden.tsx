'use client';
import React, { FC, useEffect, useState } from 'react';
import Parcel from './Parcel';
import styles from '../../app/Assets.module.css';
import { GardenProps, type Garden } from '@/utils/types';
import Submenu from '../Molecule/Submenu';
import NewParcelForm from '../Molecule/Add_Parcel_Popup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setFullscreen, setGraphicMode } from '../../redux/garden/gardenSlice';
import NewGreenhouseForm from '../Molecule/Add_Greenhouse_Popup';
import {
  useGetAllParcelByGardenIdQuery,
  useGetNurseryByGardenIdQuery,
} from '@/slice/fetch';
import H1 from '../Atom/H1';
import AddNurseryPopup from '../Molecule/Add_Nursery_Popup';
import Nursery from './Nursery';
import Loading from '../Atom/Loading';

const Garden: FC<GardenProps> = ({ garden, scale }) => {
  //Local State
  const [currentGarden, setCurrentGarden] = useState<Garden>(garden);
  const [gardenLock, setGardenLock] = useState<boolean>(true);
  const [addSubmenu, setAddSubmenu] = useState<boolean>(false);

  // Hooks
  const dispatch = useDispatch();

  //Selectors
  const graphicMode = useSelector(
    (state: RootState) => state.garden.graphicMode
  );
  const fullscreen = useSelector((state: RootState) => state.garden.fullscreen);

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

  //Debug
  console.log('parcels : ', parcels);

  // Handlers
  const handleAdd = () => {
    setAddSubmenu((prev) => !prev);
  };

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

  //Variables
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

  // Calcul des dimensions du jardin
  const gardenX = currentGarden?.length;
  const gardenY = currentGarden?.width;

  //UseEffect
  useEffect(() => {
    setCurrentGarden(garden);
  }, [garden]);

  useEffect(() => {}, [addSubmenu]);

  useEffect(() => {
    refetchNurseries();
  }, [garden.id, refetchNurseries]);

  useEffect(() => {
    refetchParcels();
  }, [garden.id, refetchParcels]);

  //Loading and Error handling
  if (parcelsIsLoading) {
    return <Loading />;
  }
  if (parcelsIsError) {
    console.log('Error in current Garden : ', garden.id);
  }
  if (parcels?.isEmpty) {
    console.log('Oups, no parcel find..');
  }

  if (nurseryIsLoading) {
    return <Loading />;
  }
  if (nurseryIsError) {
    console.log('Error in current Garden fetching nursery : ', garden.id);
  }
  if (nurseries?.isEmpty) {
    console.log('Oups, no parcel find..');
  }

  return (
    <section className="mb-10 flex flex-col">
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
          <div className="ml-[3vw] flex w-[80vw] flex-col items-center justify-center">
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
          <div className="mt-[2vh] ml-[3vw] flex w-[80vw] flex-col items-center justify-center">
            <p>You don&apos;t have any nursery here. Want to create one?</p>
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
