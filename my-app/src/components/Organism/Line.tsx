/* eslint-disable @next/next/no-img-element */
'use client';
import React, { FC, useEffect, useRef, useState } from 'react'; // <DraggableCore>
import { LineProps } from '@/utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import H2 from '../Atom/H2';
import Confirmation from '../Molecule/Confirmation_Popup';
import AddCropPopup from '../Molecule/Add_Crop_Popup';
import ExistentCropPopup from '../Molecule/ExistentCrop_Popup';
import Image from 'next/image';
import Cookies from 'js-cookie';
import {
  useDeleteOneLineByLineIdMutation,
  useEditUserByUserIdMutation,
  useGetUserByIdQuery,
  // useGetCropByLineIdQuery,
} from '@/redux/api/fetch';
import {
  setAddCropPopup,
  setDisplayCropLogPopup,
  setDisplayLineLogPopup,
  setExistantCropPopup,
} from '@/redux/display/displaySlice';
import Display_Logs_Popup from '../Molecule/Display_Logs_Popup';
import LoadingModal from '../Molecule/LoadingModal';
import { addCropLineStore, deleteLineStore } from '@/redux/garden/gardenSlice';
import XpTable from '@/utils/Xp';
import toast from 'react-hot-toast';
import Toast_XP from '../Molecule/Toast_XP';
import { setXpUser } from '@/redux/user/userSlice';

const Line: FC<LineProps> = ({ line, lineIndex }) => {
  // Local State
  // const [displayInfo, SetDisplayInfo] = useState(false);
  const [displayDeletingLinePopup, setDisplayDeletingLinePopup] =
    useState<boolean>(false);
  const [cropIsPresent, setCropIsPresent] = useState<boolean>(false);

  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const userId = Number(userCookie?.id);

  //RTK Query
  const [deleteLineMutation, { isLoading: deleteLinesIsLoading }] =
    useDeleteOneLineByLineIdMutation();
  // const { data: crops } = useGetCropByLineIdQuery({
  //   lineId: line.id,
  // });
  const [addXp] = useEditUserByUserIdMutation();
  const {
    data: user,
    isError: userIsError,
    isSuccess: userIsSuccess,
  } = useGetUserByIdQuery({ userId: userId });

  //Hooks
  const dispatch = useDispatch();
  const cropPopupRef = useRef<HTMLDivElement>(null);
  const existantPopupRef = useRef<HTMLDivElement>(null);

  //Selectors
  const graphicMode = useSelector(
    (state: RootState) => state.garden.graphicMode
  );

  const addCropPopupDisplay = useSelector(
    (state: RootState) => state.display.addCropPopup
  );

  const ExistantCropPopupDisplay = useSelector(
    (state: RootState) => state.display.existantCropPopup
  );

  const displayLineLogPopup = useSelector(
    (state: RootState) => state.display.displayLineLogPopup
  );

  const displayCropLogPopup = useSelector(
    (state: RootState) => state.display.displayCropLogPopup
  );

  const currentGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );

  const crops = useSelector((state: RootState) => {
    const parcels = state.garden.selectedGarden?.parcels || [];
    const foundLines = parcels
      .flatMap((p) => p.lines || [])
      .filter((l) => l.id === line.id);
    return foundLines.length > 0 ? foundLines[0].crops : undefined;
  });

  const id = useSelector((state: RootState) => state.display.id);

  //Debug
  // console.log('crops : ', crops);

  //Queries
  const deletingLine = () => {
    try {
      deleteLineMutation({
        lineId: line.id,
      }).unwrap();

      dispatch(deleteLineStore(line.id));

      //XP
      const newXp = (user?.content?.xp ?? 0) + XpTable.deleteLine;
      addXp({
        userId: userId,
        xp: newXp,
      });
      dispatch(setXpUser(newXp));

      //Toast XP
      toast.custom((t) => <Toast_XP t={t} xp={XpTable.deleteLine} />);

      console.log('line deleted');
    } catch {
      console.log('error deleting line');
    }
    setDisplayDeletingLinePopup(false);
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
    const actualCrops = crops;
    console.log(crops);

    if (!actualCrops) return;

    if (actualCrops?.length > 0) {
      setCropIsPresent(true);
      dispatch(
        setExistantCropPopup({
          state: true,
          id: Number(line.id),
        })
      );
    } else {
      setCropIsPresent(false);
      dispatch(
        setAddCropPopup({
          state: true,
          id: Number(line.id),
        })
      );
    }
  };

  // const handleMouseEnter = () => {
  //   SetDisplayInfo(true);
  // };

  // const handleMouseLeave = () => {
  //   SetDisplayInfo(false);
  // };

  //Modal Closing
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        cropPopupRef.current &&
        !cropPopupRef.current.contains(target) &&
        !target.closest('[data-modal]')
      ) {
        dispatch(
          setAddCropPopup({
            state: false,
            id: Number(line.id),
          })
        );
      }
    }

    if (addCropPopupDisplay) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [addCropPopupDisplay, dispatch, line.id]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (
        existantPopupRef.current &&
        !existantPopupRef.current.contains(target) &&
        !target.closest('[data-modal]')
      ) {
        dispatch(
          setExistantCropPopup({
            state: false,
            id: Number(line.id),
          })
        );
      }
    }

    if (ExistantCropPopupDisplay) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ExistantCropPopupDisplay, dispatch, line.id]);

  return (
    <>
      {deleteLinesIsLoading && <LoadingModal />}
      <div
        className="ml-5 flex flex-col"
        style={{
          display: graphicMode ? 'none' : 'flex',
        }}
      >
        <div className="flex items-center justify-between">
          <H2>Line {lineIndex}</H2>

          {
            <img
              src={
                crops && crops[0]?.icon === ''
                  ? '/image/icons/info.png'
                  : crops && crops[0]?.icon
              }
              className="w-[6vw]"
              alt=""
              onClick={() =>
                dispatch(
                  setDisplayCropLogPopup({
                    state: !displayCropLogPopup,
                    id: Number(
                      crops && crops.length > 0 ? crops[0].id : undefined
                    ),
                  })
                )
              }
            />
          }

          <div className="mr-[5vw] flex">
            <Image
              style={{
                display: userId === currentGarden?.authorId ? 'block' : 'none',
                width: '5vw',
                height: '5vw',
              }}
              width={50}
              height={50}
              className="mx-[3vw]"
              src="/image/icons/add.png"
              alt="Add crop"
              onClick={() => handleClickAddCrop()}
            />
            {/* <Image
              width={50}
              height={50}
              className="mx-[3vw]"
              src="/image/icons/edit.png"
              alt="Edit line"
              style={{
                display: userId === currentGarden?.authorId ? 'block' : 'none',
                width: '5vw',
                height: '5vw',
              }}
            /> */}
            <Image
              width={50}
              height={50}
              className="mx-[3vw]"
              src="/image/icons/info.png"
              alt="Display info about line"
              style={{
                width: '5vw',
                height: '5vw',
              }}
              onClick={() =>
                dispatch(
                  setDisplayLineLogPopup({
                    state: !displayLineLogPopup,
                    id: Number(line.id),
                  })
                )
              }
            />
            <Image
              width={50}
              height={50}
              className="mx-[3vw]"
              src="/image/icons/trash.png"
              alt="Delete line"
              style={{
                display: userId === currentGarden?.authorId ? 'block' : 'none',
                width: '5vw',
                height: '5vw',
              }}
              onClick={() => setDisplayDeletingLinePopup(true)}
            />
          </div>
        </div>
      </div>

      {/* POPUP */}
      {/* Log Popup */}
      <div
        style={{
          display:
            displayCropLogPopup && id === (crops && crops[0]?.id)
              ? 'block'
              : 'none',
        }}
      >
        {/* <Display_Logs_Popup
          id={crops && crops.length > 0 ? crops[0].id : undefined}
          display={displayCropLogPopup}
          logObject={'crop'}
        /> */}
      </div>

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

      {/* Add Crop Popup */}
      <div
        ref={cropPopupRef}
        style={{
          display:
            id === line.id && addCropPopupDisplay && !cropIsPresent
              ? 'block'
              : 'none',
        }}
        data-modal
      >
        <AddCropPopup line={line} />
      </div>

      {/* Exist Crop Popup */}
      <div
        ref={existantPopupRef}
        style={{
          display:
            id === line.id && ExistantCropPopupDisplay && cropIsPresent
              ? 'block'
              : 'none',
        }}
        data-modal
      >
        <ExistentCropPopup lineId={line.id} />
      </div>

      {/* Log Popup */}
      <div
        style={{
          display: displayLineLogPopup && id === line.id ? 'block' : 'none',
        }}
      >
        {/* <Display_Logs_Popup
          id={line.id}
          display={displayLineLogPopup}
          logObject={'line'}
        /> */}
      </div>
    </>
  );
};

export default Line;
