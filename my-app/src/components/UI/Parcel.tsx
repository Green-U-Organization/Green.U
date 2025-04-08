'use client';
import React, { FC, useEffect, useState } from 'react';
import Line from './Line';
import data from '../../app/data/data';
import styles from '../../app/Assets.module.css';
import { getAllLinesByParcelId } from '@/utils/actions/garden/parcel/line/getAllLinesByParcelId';

type Parcel = {
  parcel: Parcels;
  scale: number;
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

type LinesType = {
  id: number;
  parcelId: number;
  length: number;
  // crop: string;
  // status: string;
};

const Parcel: FC<Parcel> = ({ parcel, scale }) => {
  const [currentParcel, setCurrentParcel] = useState<Parcels>(parcel);
  const [lines, setLines] = useState<LinesType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const parcelY = currentParcel?.length;
  const parcelX = currentParcel?.width;

  useEffect(() => {
    setCurrentParcel(parcel);
    setIsLoading(false);

    getAllLinesByParcelId(parcel.id).then((result) => {
      setLines(result);
    });
  }, [parcel]);

  return (
    <section className="z-10 ml-5">
      <div className="flex flex-col">
        {/* //BorderTopGlobal */}
        <div className="mt-5 flex">
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
              width: 0.1 * scale,
              height: parcelX * scale,
            }}
          ></div>

          {/* //MainCore */}

          <div
            className={`${styles.parcelBackground} flex flex-col justify-around`}
            style={{
              height: parcelX * scale,
              width: parcelY * scale,
            }}
          >
            {lines?.map((line) => (
              <Line
                key={line.id}
                // line={line}
                lineX={line.length}
                // handleClick={handleClick}
                scale={scale}
              />
            ))}
            {/* <p>id : {parcel.id} length : {parcel.length} width : {parcel.width}</p> */}
          </div>

          {/* //BorderRight */}
          <div
            className={`${styles.parcelBorderRight} `}
            style={{
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
              width: scale * 0.1,
              height: scale * 0.1,
            }}
          ></div>

          {/* //BorderBottom */}
          <div
            className={`${styles.parcelBorderBottom} `}
            style={{
              width: parcelY * scale,
              height: scale * 0.1,
            }}
          ></div>

          {/* //BorderBottomRight */}
          <div
            className={`${styles.parcelBorderBottomRight} `}
            style={{
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
