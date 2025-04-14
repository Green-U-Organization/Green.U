'use client';
import React, { FC, useEffect, useState } from 'react';
import Line from './Line';
import styles from '../../app/Assets.module.css';
import { ParcelProps, type Parcel } from '@/utils/types';
import { useLineList } from '@/app/hooks/useLineList';

const Parcel: FC<ParcelProps> = ({ parcel, scale }) => {
  const [currentParcel, setCurrentParcel] = useState<Parcel>(parcel);
  const { lines, loading, error, isEmpty } = useLineList(currentParcel.id);
  const parcelY = currentParcel?.length;
  const parcelX = currentParcel?.width;

  useEffect(() => {
    setCurrentParcel(parcel);
    console.log(currentParcel.id);
  }, [parcel]);

  if (loading) {
    return <div className="m-10">Loading...</div>;
  }
  if (error) {
    console.log('currentparcel : ', currentParcel.id);
    return <div className="m-10">Error : {error}</div>;
  }
  if (isEmpty) {
    return <div className="m-10">Oups, no lines find...</div>;
  }

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
              <div key={line.id} className="z-20 h-5 w-20 bg-amber-100">
                <Line lineX={line.length} scale={scale} />
              </div>
            ))}
            <p>
              id : {parcel.id} length : {parcel.length} width : {parcel.width}
            </p>
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
