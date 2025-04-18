'use client';

import React, { FC, useState } from 'react'; // <DraggableCore>
// import styles from '../../app/Assets.module.css';
import { LineProps } from '@/utils/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import H2 from '../Atom/H2';
import { deleteOneLineByLineId } from '@/utils/actions/garden/parcel/line/deleteOneLineByLineId';
import Confirmation from '../Molecule/Confirmation';
import { getCropByLinelId } from '@/utils/actions/crops/line/getCropByLineId';
import AddCropPopup from '../Molecule/AddCropPopup';
import ExistentCropPopup from '../Molecule/ExistentCropPopup';
import { useDeleteOneLineByLineIdMutation } from '@/slice/garden';

const Line: FC<LineProps> = ({ line, scale, lineKey }) => {
  const [displayInfo, SetDisplayInfo] = useState(false);
  const [displayDeletingLinePopup, setDisplayDeletingLinePopup] =
    useState<boolean>(false);
  const [cropIsPresent, setCropIsPresent] = useState<boolean>(false);
  const [displayAddCropPopup, setDisplayAddCropPopup] =
    useState<boolean>(false);

  //RTK Query
  const [deleteLineMutation, { data: lines }] =
    useDeleteOneLineByLineIdMutation();

  // Example usage of the mutation function:
  // deleteLineMutation({ lineId: line.id });

  //Selectors
  const graphicMode = useSelector(
    (state: RootState) => state.garden.graphicMode
  );

  //Functions
  const deletingLine = () => {
    // console.log(line.id);
    // deleteOneLineByLineId(line.id);
    // setDisplayDeletingLinePopup(false);
    try {
      deleteLineMutation({
        lineId: line.id,
      }).unwrap();
      console.log('line deleted');
    } catch {
      console.log('error deleting line');
    }
  };

  // const cropIcon: { [key: string]: string } = {
  //   asperge: styles.cropAsperge,
  //   oignonJaune: styles.cropOignonJaune,
  //   courgette1: styles.cropCourgette1,
  //   bettes: styles.cropBettes,
  //   oignonRouge: styles.cropOignonRouge,
  //   courgette2: styles.cropCourgette2,
  //   celeri: styles.cropCeleri,
  //   all: styles.cropAll,
  //   courgette3: styles.cropCourgette3,
  //   chouxFleur: styles.cropChouxFleur,
  //   poireaux: styles.cropPoireaux,
  //   tomate1: styles.cropTomate1,
  //   chouxRouge: styles.cropChouxRouge,
  //   piment: styles.cropPiment,
  //   tomate2: styles.cropTomate2,
  //   poivronVert: styles.cropPoivronVert,
  //   tomate3: styles.cropTomate3,
  //   laitue: styles.cropLaitue,
  //   poivronRouge: styles.cropPoivronRouge,
  //   petitPois: styles.cropPetitPois,
  //   salade: styles.cropSalade,
  //   poivronOrange: styles.cropPoivronOrange,
  //   haricot: styles.cropHaricot,
  //   poivronJaune: styles.cropPoivronJaune,
  //   verdure1: styles.cropVerdure1,
  //   pimentDoux: styles.cropPimentDoux,
  //   verdure2: styles.cropVerdure2,
  //   pasteque: styles.cropPasteque,
  //   verdure3: styles.cropVerdure3,
  //   courge1: styles.cropCourge1,
  //   verdure4: styles.cropVerdure4,
  //   courge2: styles.cropCourge2,
  //   patate: styles.cropPatate,
  //   courge3: styles.cropCourge3,
  //   rutabaga: styles.cropRutabaga,
  //   courge4: styles.cropCourge4,
  //   navet: styles.cropNavet,
  //   courge5: styles.cropCourge5,
  //   racine4: styles.cropRacine4,
  //   courge6: styles.cropCourge6,
  //   vegetable1: styles.cropVegetable1,
  //   mais: styles.cropMais,
  //   racine1: styles.cropRacine1,
  //   verdure5: styles.cropVerdure5,
  //   carotte: styles.cropCarotte,
  //   chouxBlanc: styles.cropChouxBlanc,
  //   panais: styles.cropPanais,
  //   chouxBruxelle: styles.cropChouxBruxelle,
  //   radis: styles.cropRadis,
  //   chouxRomanesco: styles.cropChouxRomanesco,
  //   betterave: styles.cropBetterave,
  //   artichaux: styles.cropArtichaux,
  //   racine2: styles.cropRacine2,
  //   poireaux2: styles.cropPoireaux2,
  //   chouxRave: styles.cropChouxRave,
  //   random1: styles.cropRandom1,
  //   oignonBlanc: styles.cropOignonBlanc,
  //   aubergine1: styles.cropAubergine1,
  // };

  //const selectedCrop = line.crop.icon;

  //Handlers
  const handleClickAddCrop = async () => {
    const actualCrops = await getCropByLinelId(line.id);
    console.log(actualCrops);
    if (actualCrops.content) {
      setCropIsPresent(true);
    } else if (!actualCrops.content) {
      console.log('empty line');
      setCropIsPresent(false);
    }
    setDisplayAddCropPopup(true);
  };

  const handleMouseEnter = () => {
    SetDisplayInfo(true);
  };

  const handleMouseLeave = () => {
    SetDisplayInfo(false);
  };

  return (
    <>
      <div
        className={`relative z-0`}
        style={{
          width: line.length * scale,
          height: (2 * scale) / 100,
          display: graphicMode ? 'block' : 'none',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // onClick={handleClick}
      >
        {/* Image du légume - z-index inférieur */}
        <div
          // className={`${cropIcon[selectedCrop]} absolute bottom-0 z-10`} // z-10 pour l'image
          style={{
            width: line.length * scale,
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
            {/* <h3 className="font-bold">{line.crop.vegetable}</h3>
          <h4 className="text-sm italic">{line.crop.variety}</h4>
          <h5 className="mt-1 text-xs">{line.status}</h5> */}
            <div className="mt-2 flex w-full flex-row justify-evenly">
              <button className="border-2 bg-white px-2">❗</button>
              <button className="border-2 bg-white px-2">👍</button>
              <button className="border-2 bg-white px-2">❓</button>
            </div>
          </div>
        )}
      </div>

      <div
        className="ml-5 flex flex-col"
        style={{
          display: graphicMode ? 'none' : 'flex',
        }}
      >
        <div className="flex items-center justify-between">
          <H2>Line {lineKey + 1}</H2>
          <div className="mr-[5vw] flex">
            <img
              className="mr-[2vw]"
              src="/image/icons/add.png"
              alt="Add crop"
              style={{
                width: '5vw',
                height: '5vw',
              }}
              onClick={() => handleClickAddCrop()}
            />
            <img
              className="mr-[2vw]"
              src="/image/icons/edit.png"
              alt="Edit line"
              style={{
                width: '5vw',
                height: '5vw',
              }}
            />
            <img
              className="mr-[2vw]"
              src="/image/icons/info.png"
              alt="Display info about line"
              style={{
                width: '5vw',
                height: '5vw',
              }}
            />
            <img
              className="mr-[2vw]"
              src="/image/icons/trash.png"
              alt="Delete line"
              style={{
                width: '5vw',
                height: '5vw',
              }}
              onClick={() => setDisplayDeletingLinePopup(true)}
            />
          </div>
        </div>
      </div>

      {/* POPUP */}
      <div
        style={{
          display: displayDeletingLinePopup ? 'block' : 'none',
        }}
      >
        <Confirmation
          element={'line'}
          handleYesClick={deletingLine}
          handleNoClick={() => setDisplayDeletingLinePopup(false)}
        />
      </div>

      <div
        style={{
          display: displayAddCropPopup && !cropIsPresent ? 'block' : 'none',
        }}
      >
        <AddCropPopup
          lineId={line.id}
          handleNoClick={() => setDisplayAddCropPopup(false)}
        />
      </div>

      <div
        style={{
          display: displayAddCropPopup && cropIsPresent ? 'block' : 'none',
        }}
      >
        <ExistentCropPopup
          handleClickOk={() => setDisplayAddCropPopup(false)}
        />
      </div>
    </>
  );
};

export default Line;
