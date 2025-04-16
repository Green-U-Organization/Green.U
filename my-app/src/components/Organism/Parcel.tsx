'use client';
import React, { FC, useEffect, useState } from 'react';
import Line from './Line';
import styles from '../../app/Assets.module.css';
import { ParcelProps, type Parcel } from '@/utils/types';
import { useLineList } from '@/app/hooks/useLineList';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import H2 from '../Atom/H2';
import { createNewLine } from '@/utils/actions/garden/parcel/line/createNewLine';
import Confirmation from '../Molecule/Confirmation';
import { deleteOneParcelByParcelId } from '@/utils/actions/garden/parcel/deleteOneParcelByParcelId';

const Parcel: FC<ParcelProps> = ({ parcel, scale, parcelKey }) => {
  const [currentParcel, setCurrentParcel] = useState<Parcel>(parcel);
  const [displayParcelInfo, setDisplayParcelInfo] = useState<boolean>(false);
  const [displayDeletingParcelPopup, setDisplayDeletingParcelPopup] =
    useState<boolean>(false);
  const { lines, loading, error, isEmpty } = useLineList(currentParcel.id);

  const parcelY = currentParcel?.length;
  const parcelX = currentParcel?.width;

  //Selectors
  const graphicMode = useSelector(
    (state: RootState) => state.garden.graphicMode
  );

  useEffect(() => {
    setCurrentParcel(parcel);
    console.log(currentParcel.id);
  }, [parcel]);

  const addLine = () => {
    const line = {
      parcelId: currentParcel.id,
      length: currentParcel.length, // Je force la longueur de la line égale a la longueur de la parcelle
    };
    createNewLine(line);
    //TODO: Prevoir un rerender pour actualiser la parcel avec la nouvelle line
  };

  const deletingParcel = () => {
    console.log(currentParcel.id);
    deleteOneParcelByParcelId(currentParcel.id);
    setDisplayDeletingParcelPopup(false);
  };

  if (loading) {
    return <div className="m-10">Loading...</div>;
  }
  if (error) {
    console.log('currentparcel : ', currentParcel.id);
    console.log('Error : ', { error });
  }
  if (isEmpty) {
    console.log('Oups, no lines find...');
  }

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
              width: graphicMode ? parcelY * scale : '70vw',
            }}
          >
            {/* //Parcel Title + icons */}
            <section className="flex flex-col">
              <div className="flex items-center justify-between">
                <H2>Parcel {parcelKey}</H2>
                <p className="text-lg italic">
                  {parcel.length}m x {parcel.width}m
                </p>

                <img
                  onClick={() => setDisplayParcelInfo((prev) => !prev)}
                  className="mr-[2vw] h-[3vw] w-[auto]"
                  src="\image\icons\chevronBas.png"
                  alt="Parcel Image"
                />
              </div>
              <div className="flex items-center">
                <img
                  className="mb-[2vw] ml-[3vw] h-[5vw] w-[5vw]"
                  src="/image/icons/add.png"
                  alt="Add line"
                  onClick={addLine}
                />
                <img
                  className="mb-[2vw] ml-[3vw] h-[5vw] w-[5vw]"
                  src="/image/icons/edit.png"
                  alt="Edit parcel"
                />
                <img
                  className="mb-[2vw] ml-[3vw] h-[5vw] w-[5vw]"
                  src="/image/icons/info.png"
                  alt="Display info about parcel"
                />
                <img
                  className="mb-[2vw] ml-[3vw] h-[5vw] w-[5vw]"
                  src="/image/icons/trash.png"
                  alt="Deleting parcel"
                  onClick={() => setDisplayDeletingParcelPopup(true)}
                />
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
            {lines?.map((line, index) => (
              <div
                style={{
                  display: displayParcelInfo ? 'block' : 'none',
                }}
              >
                <Line lineKey={index} lineX={line.length} scale={scale} />
              </div>
            ))}
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
