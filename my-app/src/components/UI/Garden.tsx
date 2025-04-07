import React, { FC, useEffect, useState } from 'react';
import data from '../../app/data/data';
import Parcel from './Parcel';
import styles from '../../app/Assets.module.css';

type GardenProps = {
  garden: Garden;
  scale: number;
};

type Garden = {
  id: number;
  authorId: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  privacy: 'private' | 'public';
  type: 'individual' | 'collective' | 'professionnal';
};

const Garden: FC<GardenProps> = ({ garden, scale }) => {
  const [currentGarden, setCurrentGarden] = useState<Garden>(garden);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Calcul des dimensions du jardin
  const gardenX = currentGarden?.length;
  const gardenY = currentGarden?.width;

  useEffect(() => {
    // Mettre à jour le jardin actuel lorsque les props changent
    setCurrentGarden(garden);
    setIsLoading(false);
  }, [garden]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mb-10 ml-10 flex">
      <div
        className="bg-gardenBG relative rounded-xl"
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

        {data.parcels.map((parcel) =>
          parcel.gardenId === currentGarden?.id ? (
            <div className="relative z-10" key={parcel.id}>
              <Parcel
                parcelX={parcel.width}
                parcelY={parcel.length}
                parcelID={parcel.id}
                scale={scale}
              />
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

export default Garden;

//VERSION P5JS

// import React, { useEffect, useState } from 'react';
// import Sketch from 'react-p5';
// import data from '../../app/data/data';

// type GardenProps = {
//   garden: Garden;
//   scale: number;
// };

// type Garden = {
//   id: number;
//   authorId: number;
//   name: string;
//   description: string;
//   latitude: number;
//   longitude: number;
//   length: number;
//   width: number;
//   privacy: 'private' | 'public';
//   type: 'individual' | 'collective' | 'professionnal';
// };

// const Garden: React.FC<GardenProps> = ({ garden, scale }) => {
//   const [currentGarden, setCurrentGarden] = useState<Garden>(garden);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     setCurrentGarden(garden);
//     setIsLoading(false);
//   }, [garden]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const setup = (p5: any, canvasParentRef: any) => {
//     p5.createCanvas(
//       currentGarden.width * scale,
//       currentGarden.length * scale
//     ).parent(canvasParentRef);
//   };

//   const draw = (p5: any) => {
//     p5.background(220);

//     // Draw grass
//     p5.fill(139, 69, 19);
//     p5.rect(0, 0, currentGarden.width * scale, currentGarden.length * scale);

//     // Draw fences
//     p5.fill(139, 69, 19);
//     p5.rect(0, 0, currentGarden.width * scale, 0.3 * scale); // Top
//     p5.rect(
//       0,
//       currentGarden.length * scale - 0.3 * scale,
//       currentGarden.width * scale,
//       0.3 * scale
//     ); // Bottom
//     p5.rect(0, 0, 0.2 * scale, currentGarden.length * scale); // Left
//     p5.rect(
//       currentGarden.width * scale - 0.2 * scale,
//       0,
//       0.2 * scale,
//       currentGarden.length * scale
//     ); // Right

//     // Draw parcels
//     data.parcels.forEach((parcel: any) => {
//       if (parcel.gardenId === currentGarden.id) {
//         p5.fill(107, 142, 35);
//         p5.rect(
//           parcel.x * scale,
//           parcel.y * scale,
//           parcel.width * scale,
//           parcel.length * scale
//         );
//       }
//     });
//   };

//   return (
//     <section className="mb-10 ml-10 flex">
//       <Sketch setup={setup} draw={draw} />
//     </section>
//   );
// };

// export default Garden;
