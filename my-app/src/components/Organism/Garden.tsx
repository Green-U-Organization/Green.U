'use client';
import React, { FC, useEffect, useState } from 'react';
import Parcel from './Parcel';
import styles from '../../app/Assets.module.css';
import { GardenProps, type Garden } from '@/utils/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  useGetAllParcelByGardenIdQuery,
  useGetNurseryByGardenIdQuery,
} from '@/slice/fetch';
import H1 from '../Atom/H1';
import Nursery from './Nursery';
import Loading from '../Atom/Loading';
import SlimCard from '../Atom/SlimCard';
import Cookies from 'js-cookie';

const Garden: FC<GardenProps> = ({ garden, scale }) => {
  //Local State
  const [currentGarden, setCurrentGarden] = useState<Garden>(garden);

  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const userId = Number(userCookie?.id);

  // Hooks

  //Selectors
  const graphicMode = useSelector(
    (state: RootState) => state.garden.graphicMode
  );

  //RTK Query
  const {
    data: parcels,
    isLoading: parcelsIsLoading,
    isError: parcelsIsError,
    refetch: refetchParcels,
  } = useGetAllParcelByGardenIdQuery({
    gardenId: garden.id ?? 0,
  });
  const {
    data: nurseries,
    isLoading: nurseryIsLoading,
    isError: nurseryIsError,
    refetch: refetchNurseries,
  } = useGetNurseryByGardenIdQuery({
    gardenId: garden.id ?? 0,
  });

  //Debug

  //Variables

  // Calcul des dimensions du jardin
  const gardenX = currentGarden?.length;
  const gardenY = currentGarden?.width;

  //UseEffect
  useEffect(() => {
    setCurrentGarden(garden);
  }, [garden]);

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
    <section className="mb-10 flex h-[64vh] flex-col">
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
          <div className="ml-[10vw] flex w-[80vw] flex-row items-center gap-15">
            <SlimCard className="bg-bginput p-5 pt-0">
              <H1>No parcel yet!</H1>

              <p className="pt-3">
                To create one, you can just click on the icon on the bottom
                right of your screen, then click on the &quot;+&quot; icon and
                select the parcel (P).
              </p>
            </SlimCard>
          </div>
        ) : (
          parcels?.content.map((parcel, index) => (
            <div className="relative z-10" key={parcel.id}>
              <Parcel parcelKey={index + 1} parcel={parcel} scale={scale} />
            </div>
          ))
        )}

        {nurseryIsError ? (
          <div className="mt-[3vh] ml-[10vw] flex w-[80vw] flex-col justify-center gap-5">
            <SlimCard className="bg-bginput p-5 pt-0">
              <H1>No nursery yet! </H1>
              <p className="pt-3">
                To create one, you can just click on the icon on the bottom
                right of your screen, then click on the &quot;+&quot; icon and
                select the nursery (N).
              </p>
            </SlimCard>
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

        {parcelsIsError || nurseryIsError ? (
          <div className="mt-[1vh] flex w-[100vw] flex-col items-center justify-center">
            <H1>Easy isn&apos;t it!</H1>
          </div>
        ) : null}
      </section>
    </section>
  );
};

export default Garden;
