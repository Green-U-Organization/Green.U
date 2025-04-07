// 'use client';
// import React, { FC } from 'react';
// import Line from './Line';
// import data from '../../app/data/data';
// import styles from '../../app/Assets.module.css';

// type ParcelProps = {
//   parcelX: number;
//   parcelY: number;
//   parcelID: number;
//   scale: number;
// };

// const Bed: FC<ParcelProps> = ({ parcelX, parcelY, parcelID, scale }) => {
//   return (
//     <section className="z-10 ml-5">
//       <div className="flex flex-col">
//         {/* //BorderTopGlobal */}
//         <div className="mt-5 flex">
//           {/* //BorderTopLeft */}
//           <div
//             className={`${styles.parcelBorderTopLeft} `}
//             style={{
//               width: scale * 0.1,
//               height: scale * 0.1,
//             }}
//           ></div>

//           {/* //BorderTop */}
//           <div
//             className={`${styles.parcelBorderTop} `}
//             style={{
//               width: parcelY * scale,
//               height: scale * 0.1,
//             }}
//           ></div>

//           {/* //BorderTopRight */}
//           <div
//             className={`${styles.parcelBorderTopRight} `}
//             style={{
//               width: scale * 0.1,
//               height: scale * 0.1,
//             }}
//           ></div>
//         </div>

//         <div className="flex">
//           {/* //BorderLeft */}
//           <div
//             className={`${styles.parcelBorderLeft} `}
//             style={{
//               width: 0.1 * scale,
//               height: parcelX * scale,
//             }}
//           ></div>

//           {/* //MainCore */}

//           <div
//             className={`${styles.parcelBackground} flex flex-col justify-around`}
//             style={{
//               height: parcelX * scale,
//               width: parcelY * scale,
//             }}
//           >
//             {data.lines.map((line) =>
//               line.parcelId === parcelID ? (
//                 <Line
//                   key={line.id}
//                   line={line}
//                   lineX={line.length}
//                   lineStatus={line.status}
//                   // handleClick={handleClick}
//                   scale={scale}
//                 />
//               ) : null
//             )}
//             {/* <p>id : {parcel.id} length : {parcel.length} width : {parcel.width}</p> */}
//           </div>

//           {/* //BorderRight */}
//           <div
//             className={`${styles.parcelBorderRight} `}
//             style={{
//               width: 0.1 * scale,
//               height: parcelX * scale,
//             }}
//           ></div>
//         </div>
//         {/* //BorderBottomGlobal */}
//         <div className="flex">
//           {/* //BorderBottomLeft */}
//           <div
//             className={`${styles.parcelBorderBottomLeft} `}
//             style={{
//               width: scale * 0.1,
//               height: scale * 0.1,
//             }}
//           ></div>

//           {/* //BorderBottom */}
//           <div
//             className={`${styles.parcelBorderBottom} `}
//             style={{
//               width: parcelY * scale,
//               height: scale * 0.1,
//             }}
//           ></div>

//           {/* //BorderBottomRight */}
//           <div
//             className={`${styles.parcelBorderBottomRight} `}
//             style={{
//               width: scale * 0.1,
//               height: scale * 0.1,
//             }}
//           ></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Bed;

//VERSION P5JS

import React from 'react';
import Sketch from 'react-p5';
import data from '../../app/data/data';

type ParcelProps = {
  parcelX: number;
  parcelY: number;
  parcelID: number;
  scale: number;
};

const Bed: React.FC<ParcelProps> = ({ parcelX, parcelY, parcelID, scale }) => {
  const setup = (p5: any, canvasParentRef: any) => {
    p5.createCanvas(parcelY * scale, parcelX * scale).parent(canvasParentRef);
  };

  const draw = (p5: any) => {
    p5.background(220);

    // Draw borders
    p5.fill(169, 169, 169);
    p5.rect(0, 0, parcelY * scale, 0.1 * scale); // Top border
    p5.rect(0, parcelX * scale - 0.1 * scale, parcelY * scale, 0.1 * scale); // Bottom border
    p5.rect(0, 0, 0.1 * scale, parcelX * scale); // Left border
    p5.rect(parcelY * scale - 0.1 * scale, 0, 0.1 * scale, parcelX * scale); // Right border

    // Draw corners
    p5.rect(0, 0, 0.1 * scale, 0.1 * scale); // Top left
    p5.rect(parcelY * scale - 0.1 * scale, 0, 0.1 * scale, 0.1 * scale); // Top right
    p5.rect(0, parcelX * scale - 0.1 * scale, 0.1 * scale, 0.1 * scale); // Bottom left
    p5.rect(
      parcelY * scale - 0.1 * scale,
      parcelX * scale - 0.1 * scale,
      0.1 * scale,
      0.1 * scale
    ); // Bottom right

    // Draw main area
    p5.fill(204, 255, 204);
    p5.rect(
      0.1 * scale,
      0.1 * scale,
      parcelY * scale - 0.2 * scale,
      parcelX * scale - 0.2 * scale
    );

    // Draw lines
    data.lines.forEach((line: any) => {
      if (line.parcelId === parcelID) {
        p5.fill(102, 204, 0);
        p5.rect(
          (line.x || 0) * scale,
          (line.y || 0) * scale,
          line.length * scale,
          line.width * scale
        );
      }
    });
  };

  return (
    <section className="z-10 ml-5">
      <Sketch setup={setup} draw={draw} />
    </section>
  );
};

export default Bed;
