'use client';
import React, { FC, useState } from 'react';
import Line from './Line';
import Image from 'next/image';
import { ParcelProps, type Parcel } from '@/utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import H2 from '../Atom/H2';
import Confirmation from '../Molecule/Confirmation_Popup';
import {
  useCreateNewGardenLineMutation,
  useGetAllLinesByParcelIdQuery,
  useDeleteOneParcelByParcelIdMutation,
} from '@/slice/fetch';
import VegetableIcon from '../Atom/VegetableIcon';
import EditParcelPopup from '../Molecule/Edit_Parcel_Popup';
import {
  setDisplayParcelLogPopup,
  setEditParcelPopup,
} from '@/redux/display/displaySlice';
import Loading from '../Atom/Loading';
import SlimCard from '../Atom/SlimCard';
import Cookies from 'js-cookie';
import Display_Logs_Popup from '../Molecule/Display_Logs_Popup';
import LoadingModal from '../Molecule/LoadingModal';

const Parcel: FC<ParcelProps> = ({ parcel, scale, parcelKey }) => {
  //Local State
  const [displayParcelInfo, setDisplayParcelInfo] = useState<boolean>(false);
  const [displayDeletingParcelPopup, setDisplayDeletingParcelPopup] =
    useState<boolean>(false);

  // Variables

  //Hooks
  const dispatch = useDispatch();

  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const userId = Number(userCookie?.id);

  //RTK Query
  const {
    data: lines,
    isLoading: linesIsLoading,
    isError: linesIsError,
  } = useGetAllLinesByParcelIdQuery({ parcelId: parcel.id });
  const [createNewLine, { isLoading: newLineIsLoading }] =
    useCreateNewGardenLineMutation();
  const [deleteParcel, { isLoading: deleteParcelIsLoading }] =
    useDeleteOneParcelByParcelIdMutation();

  //Debug
  // console.log('lines : ', lines);

  //Selectors
  const editParcelPopupDisplay = useSelector(
    (state: RootState) => state.display.editParcelPopup
  );
  const displayParcelLogPopup = useSelector(
    (state: RootState) => state.display.displayParcelLogPopup
  );
  const currentGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );
  const id = useSelector((state: RootState) => state.display.id);

  //Fetch
  const addLine = () => {
    setDisplayParcelInfo(true);
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

  // Loading and Error Handling

  if (linesIsLoading) {
    return <Loading />;
  }
  if (linesIsError) {
    console.log('error in currentparcel : ', parcel.id);
  }
  // if (lines?. === 0) {
  //   console.log('Oups, no lines find...');
  // }

  return (
    <>
      {deleteParcelIsLoading && <LoadingModal />}
      {newLineIsLoading && <LoadingModal />}
      <section className="-z-0 ml-[5vw]">
        <div className="flex flex-col">
          {/* //MainCore */}
          <SlimCard
            bgColor="bg-cardbackground"
            className="bg-parcel mb-[2vh] ml-[0vw] flex min-h-[5vh] w-[90vw] flex-col justify-center"
          >
            {/* //Parcel Title + icons */}
            <section className="flex flex-col">
              <div className="flex items-center justify-between">
                <H2>Parcel {parcelKey}</H2>

                {lines?.content.map((line) => (
                  <VegetableIcon id={line.id} key={line.id} />
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
                    style={{
                      display:
                        userId === currentGarden?.authorId ? 'block' : 'none',
                    }}
                    className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
                    src="/image/icons/add.png"
                    alt="Add line"
                    width={50}
                    height={50}
                    onClick={addLine}
                  />
                  <Image
                    style={{
                      display:
                        userId === currentGarden?.authorId ? 'block' : 'none',
                    }}
                    className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
                    src="/image/icons/edit.png"
                    alt="Edit parcel"
                    width={50}
                    height={50}
                    onClick={() =>
                      dispatch(
                        setEditParcelPopup({
                          state: true,
                          id: Number(parcel.id),
                        })
                      )
                    }
                  />
                  <Image
                    className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
                    src="/image/icons/info.png"
                    alt="Display info about parcel"
                    width={50}
                    height={50}
                    onClick={() =>
                      dispatch(
                        setDisplayParcelLogPopup({
                          state: !displayParcelLogPopup,
                          id: Number(parcel.id),
                        })
                      )
                    }
                  />
                  <Image
                    style={{
                      display:
                        userId === currentGarden?.authorId ? 'block' : 'none',
                    }}
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

              {/* Edit Popup */}
              <div
                style={{
                  display:
                    editParcelPopupDisplay && id === parcel.id
                      ? 'block'
                      : 'none',
                }}
              >
                <EditParcelPopup parcel={parcel} />
              </div>
            </section>
            {/* Display Log Popup */}
            <div
              style={{
                display:
                  displayParcelLogPopup && id === parcel.id ? 'block' : 'none',
              }}
            >
              <Display_Logs_Popup
                id={parcel.id}
                display={displayParcelLogPopup}
                logObject={'parcel'}
              />
            </div>
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
                  key={line.id}
                  style={{
                    display: displayParcelInfo ? 'block' : 'none',
                  }}
                >
                  <Line line={line} lineIndex={index + 1} scale={scale} />
                </div>
              ))
            )}
          </SlimCard>
        </div>
      </section>
    </>
  );
};

export default Parcel;
