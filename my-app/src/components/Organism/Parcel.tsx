'use client';
import React, { FC, useState } from 'react';
import Line from './Line';
import styles from '../../app/Assets.module.css';
import Image from 'next/image';
import { ParcelProps, type Parcel } from '@/utils/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import H2 from '../Atom/H2';
import Confirmation from '../Molecule/Confirmation_Popup';
import {
  useCreateNewGardenLineMutation,
  useGetAllLinesByParcelIdQuery,
  useDeleteOneParcelByParcelIdMutation,
  // useGetCropByLineIdQuery,
} from '@/slice/garden';
import VegetableIcon from '../Atom/VegetableIcon';

const Parcel: FC<ParcelProps> = ({ parcel, scale, parcelKey }) => {
  const [displayParcelInfo, setDisplayParcelInfo] = useState<boolean>(false);
  const [displayDeletingParcelPopup, setDisplayDeletingParcelPopup] =
    useState<boolean>(false);
  // const { lines, loading, error, isEmpty } = useLineList(currentParcel.id);

  //RTK Query
  const {
    data: lines,
    isLoading: linesIsLoading,
    isError: linesIsError,
    // refetch: refetchLines, // si tu as un boutton pour acutalisé: refetchLines()
  } = useGetAllLinesByParcelIdQuery({
    parcelId: parcel.id,
  }); // get de donnés des données

  // const line_id: number = 0;
  // const { data: crops, refetch: refetchCrops } = useGetCropByLineIdQuery({
  //   lineId: line_id,
  // });

  const [
    createNewLine, // fetch de création de ligne
    // { isLoading: createNewLineIsLoading },
  ] = useCreateNewGardenLineMutation();

  const [deleteParcel] = useDeleteOneParcelByParcelIdMutation();

  const parcelY = parcel?.length;
  const parcelX = parcel?.width;

  //Selectors
  const graphicMode = useSelector(
    (state: RootState) => state.garden.graphicMode
  );

  const addLine = () => {
    try {
      createNewLine({
        parcelId: parcel.id,
        length: parcel.length, // Je force la longueur de la line égale a la longueur de la parcelle
      }).unwrap();
      console.log('Line created');
    } catch {
      console.log('Error creating line');
    }
  };

  const deletingParcel = () => {
    try {
      deleteParcel({
        parcelId: parcel.id,
      }).unwrap();
      console.log('parcel deleted');
    } catch {
      console.log('error deleting parcel');
    }
  };

  if (linesIsLoading) {
    return <div className="m-10">Loading...</div>;
  }
  if (linesIsError) {
    console.log('error in currentparcel : ', parcel.id);
  }
  // if (lines?. === 0) {
  //   console.log('Oups, no lines find...');
  // }

  return (
    <section className="z-10 ml-5">
      <div className="flex flex-col">
        {/* //BorderTopGlobal */}
        <div
          className="mt-5 flex"
          style={{
            display: graphicMode ? 'flex' : 'none',
          }}
        >
          {/* //BorderTopLeft */}
          <div
            className={`${styles.parcelBorderTopLeft} `}
            style={{
              width: scale * 0.1,
              height: scale * 0.1,
            }}
          ></div>

          {/* //BorderTop */}
          <div
            className={`${styles.parcelBorderTop} `}
            style={{
              width: parcelY * scale,
              height: scale * 0.1,
            }}
          ></div>

          {/* //BorderTopRight */}
          <div
            className={`${styles.parcelBorderTopRight} `}
            style={{
              width: scale * 0.1,
              height: scale * 0.1,
            }}
          ></div>
        </div>

        <div className="flex">
          {/* //BorderLeft */}
          <div
            className={`${styles.parcelBorderLeft} `}
            style={{
              display: graphicMode ? 'flex' : 'none',
              width: 0.1 * scale,
              height: parcelX * scale,
            }}
          ></div>

          {/* //MainCore */}
          <div
            className={`${graphicMode ? styles.parcelBackground : 'mb-[2vh] min-h-[5vh] rounded-2xl bg-emerald-200'} flex flex-col justify-center`}
            style={{
              height: graphicMode ? parcelX * scale : undefined,
              width: graphicMode ? parcelY * scale : '90vw',
            }}
          >
            {/* //Parcel Title + icons */}
            <section className="flex flex-col">
              <div className="flex items-center justify-between">
                <H2>Parcel {parcelKey}</H2>

                {lines?.content.map((line, index) => (
                  <VegetableIcon id={line.id} key={index} />
                ))}

                <Image
                  onClick={() => setDisplayParcelInfo((prev) => !prev)}
                  className="mr-[2vw] h-[3vw] w-[auto]"
                  src="/image/icons/chevronBas.png"
                  alt="Parcel Image"
                  width={50}
                  height={50}
                />
              </div>

              <div className="flex w-full justify-between">
                <div className="flex items-center">
                  <Image
                    className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
                    src="/image/icons/add.png"
                    alt="Add line"
                    width={50}
                    height={50}
                    onClick={addLine}
                  />
                  <Image
                    className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
                    src="/image/icons/edit.png"
                    alt="Edit parcel"
                    width={50}
                    height={50}
                    // onClick={}
                  />
                  <Image
                    className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
                    src="/image/icons/info.png"
                    alt="Display info about parcel"
                    width={50}
                    height={50}
                  />
                  <Image
                    className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
                    src="/image/icons/trash.png"
                    alt="Deleting parcel"
                    width={50}
                    height={50}
                    onClick={() => setDisplayDeletingParcelPopup(true)}
                  />
                </div>
                <p className="mr-[3vw] text-lg italic">
                  {parcel.length}m x {parcel.width}m
                </p>
              </div>

              <div
                style={{
                  display: displayDeletingParcelPopup ? 'block' : 'none',
                }}
              >
                <Confirmation
                  element={'parcel'}
                  handleYesClick={deletingParcel}
                  handleNoClick={() => setDisplayDeletingParcelPopup(false)}
                />
              </div>
            </section>

            {/* //Line map */}
            {!lines ? (
              <div
                style={{
                  display: displayParcelInfo ? 'block' : 'none',
                }}
              >
                <H2>Oup&apos;s there is no line in this parcel.</H2>
              </div>
            ) : (
              lines?.content.map((line, index) => (
                <div
                  key={index}
                  style={{
                    display: displayParcelInfo ? 'block' : 'none',
                  }}
                >
                  <Line lineKey={index} line={line} scale={scale} />
                </div>
              ))
            )}
          </div>

          {/* //BorderRight */}
          <div
            className={`${styles.parcelBorderRight} `}
            style={{
              display: graphicMode ? 'flex' : 'none',
              width: 0.1 * scale,
              height: parcelX * scale,
            }}
          ></div>
        </div>
        {/* //BorderBottomGlobal */}
        <div className="flex">
          {/* //BorderBottomLeft */}
          <div
            className={`${styles.parcelBorderBottomLeft} `}
            style={{
              display: graphicMode ? 'flex' : 'none',
              width: scale * 0.1,
              height: scale * 0.1,
            }}
          ></div>

          {/* //BorderBottom */}
          <div
            className={`${styles.parcelBorderBottom} `}
            style={{
              display: graphicMode ? 'flex' : 'none',
              width: parcelY * scale,
              height: scale * 0.1,
            }}
          ></div>

          {/* //BorderBottomRight */}
          <div
            className={`${styles.parcelBorderBottomRight} `}
            style={{
              display: graphicMode ? 'flex' : 'none',
              width: scale * 0.1,
              height: scale * 0.1,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Parcel;
