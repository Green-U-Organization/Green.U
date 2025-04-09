'use client';

import React, { FC, useState } from 'react'; // <DraggableCore>
// import {garden} from '../data/garden'
import styles from '../../app/Assets.module.css';
import { LineProps } from '@/utils/types';

const Line: FC<LineProps> = ({ lineX, scale }) => {
  const [displayInfo, SetDisplayInfo] = useState(false);

  const cropIcon: { [key: string]: string } = {
    asperge: styles.cropAsperge,
    oignonJaune: styles.cropOignonJaune,
    courgette1: styles.cropCourgette1,
    bettes: styles.cropBettes,
    oignonRouge: styles.cropOignonRouge,
    courgette2: styles.cropCourgette2,
    celeri: styles.cropCeleri,
    all: styles.cropAll,
    courgette3: styles.cropCourgette3,
    chouxFleur: styles.cropChouxFleur,
    poireaux: styles.cropPoireaux,
    tomate1: styles.cropTomate1,
    chouxRouge: styles.cropChouxRouge,
    piment: styles.cropPiment,
    tomate2: styles.cropTomate2,
    poivronVert: styles.cropPoivronVert,
    tomate3: styles.cropTomate3,
    laitue: styles.cropLaitue,
    poivronRouge: styles.cropPoivronRouge,
    petitPois: styles.cropPetitPois,
    salade: styles.cropSalade,
    poivronOrange: styles.cropPoivronOrange,
    haricot: styles.cropHaricot,
    poivronJaune: styles.cropPoivronJaune,
    verdure1: styles.cropVerdure1,
    pimentDoux: styles.cropPimentDoux,
    verdure2: styles.cropVerdure2,
    pasteque: styles.cropPasteque,
    verdure3: styles.cropVerdure3,
    courge1: styles.cropCourge1,
    verdure4: styles.cropVerdure4,
    courge2: styles.cropCourge2,
    patate: styles.cropPatate,
    courge3: styles.cropCourge3,
    rutabaga: styles.cropRutabaga,
    courge4: styles.cropCourge4,
    navet: styles.cropNavet,
    courge5: styles.cropCourge5,
    racine4: styles.cropRacine4,
    courge6: styles.cropCourge6,
    vegetable1: styles.cropVegetable1,
    mais: styles.cropMais,
    racine1: styles.cropRacine1,
    verdure5: styles.cropVerdure5,
    carotte: styles.cropCarotte,
    chouxBlanc: styles.cropChouxBlanc,
    panais: styles.cropPanais,
    chouxBruxelle: styles.cropChouxBruxelle,
    radis: styles.cropRadis,
    chouxRomanesco: styles.cropChouxRomanesco,
    betterave: styles.cropBetterave,
    artichaux: styles.cropArtichaux,
    racine2: styles.cropRacine2,
    poireaux2: styles.cropPoireaux2,
    chouxRave: styles.cropChouxRave,
    random1: styles.cropRandom1,
    oignonBlanc: styles.cropOignonBlanc,
    aubergine1: styles.cropAubergine1,
  };

  const selectedCrop = line.crop.icon;

  const handleMouseEnter = () => {
    SetDisplayInfo(true);
  };

  const handleMouseLeave = () => {
    SetDisplayInfo(false);
  };

  return (
    <div
      className={`relative z-0`}
      style={{
        width: lineX * scale,
        height: (2 * scale) / 100,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Image du légume - z-index inférieur */}
      <div
        className={`${cropIcon[selectedCrop]} absolute bottom-0 z-10`} // z-10 pour l'image
        style={{
          width: lineX * scale,
          height: 0.2 * scale,
        }}
      ></div>

      {/* Popup d'information - z-index supérieur */}
      {displayInfo && (
        <div
          className="absolute left-20 z-50 flex w-40 flex-col items-start border-2 bg-gray-200 p-2 shadow-lg"
          style={{
            transform: 'translateY(-100%)', // Pour faire apparaître la popup au-dessus
            top: '0',
          }}
        >
          <h3 className="font-bold">{line.crop.vegetable}</h3>
          <h4 className="text-sm italic">{line.crop.variety}</h4>
          <h5 className="mt-1 text-xs">{line.status}</h5>
          <div className="mt-2 flex w-full flex-row justify-evenly">
            <button className="border-2 bg-white px-2">❗</button>
            <button className="border-2 bg-white px-2">👍</button>
            <button className="border-2 bg-white px-2">❓</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Line;

//VERSION P5JS

// import React, { useState } from 'react';
// import Sketch from 'react-p5';
// import cropIcon from '../../app/contexts/cropIcon';

// type LineType = {
//   crop: {
//     icon: string;
//     vegetable: string;
//     variety: string;
//   };
//   status: string;
// };

// type LineProps = {
//   lineX: number;
//   lineStatus: string;
//   line: LineType;
//   handleClick?: () => void;
//   scale: number;
// };

// const Line: React.FC<LineProps> = ({ lineX, handleClick, line, scale }) => {
//   const [displayInfo, setDisplayInfo] = useState(false);
//   const [images, setImages] = useState<{ [key: string]: HTMLImageElement }>({});

//   const selectedCrop = line.crop.icon;

//   const preload = (p5: any) => {
//     const cropImages = {};
//     for (const key in cropIcon) {
//       const img = p5.loadImage(cropIcon[key], (img) => {
//         cropImages[key] = img;
//       });
//     }
//     setImages(cropImages);
//   };

//   const setup = (p5: any, canvasParentRef: any) => {
//     p5.createCanvas(lineX * scale, (2 * scale) / 100).parent(canvasParentRef);
//   };

//   const draw = (p5: any) => {
//     p5.background(220);

//     // Draw crop icon
//     if (images[selectedCrop]) {
//       p5.image(images[selectedCrop], 0, 0, lineX * scale, (2 * scale) / 100);
//     }

//     // Draw info popup
//     if (displayInfo) {
//       p5.fill(200);
//       p5.rect(0, -50, 150, 100);
//       p5.textSize(12);
//       p5.text(line.crop.vegetable, 10, -30);
//       p5.textSize(10);
//       p5.text(line.crop.variety, 10, -15);
//       p5.text(line.status, 10, 0);
//     }
//   };

//   const handleMouseEnter = () => {
//     setDisplayInfo(true);
//   };

//   const handleMouseLeave = () => {
//     setDisplayInfo(false);
//   };

//   return (
//     <div
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onClick={handleClick}
//     >
//       <Sketch preload={preload} setup={setup} draw={draw} />
//     </div>
//   );
// };

// export default Line;
