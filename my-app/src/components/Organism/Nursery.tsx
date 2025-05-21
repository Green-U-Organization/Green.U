/* eslint-disable @next/next/no-img-element */
import { RootState, useDispatch, useSelector } from '@/redux/store';
import React, { FC, useState } from 'react';
import Image from 'next/image';
import H2 from '../Atom/H2';
import Confirmation from '../Molecule/Confirmation_Popup';
import {
  useGetCropByNurseryIdQuery,
  useDeleteOneNurseryByNurseryIdMutation,
} from '@/slice/fetch';
import { NurseryProps } from '@/utils/types';
import AddCropNurseryPopup from '../Molecule/Add_CropNursery_Popup';
import {
  setAddCropNurseryPopup,
  setDisplayCropLogPopup,
  setDisplayNurseryLogPopup,
} from '@/redux/display/displaySlice';
import SlimCard from '../Atom/SlimCard';
import Cookies from 'js-cookie';

import Display_Logs_Popup from '../Molecule/Display_Logs_Popup';
import LoadingModal from '../Molecule/LoadingModal';

const Nursery: FC<NurseryProps> = ({ nursery }) => {
  // Local State
  const [displayNurseryInfo, setDisplayNurseryInfo] = useState<boolean>(false);
  const [displayDeletingNurseryPopup, setDisplayDeletingNurseryPopup] =
    useState<boolean>(false);

  // RTK Query
  // const {
  //   data: crops,
  //   isLoading: cropsIsLoading,
  //   isError: cropsIsError,
  // } = useGetCropByNurseryIdQuery({ nurseryId: nursery.id });
  const [deleteNursery, { isLoading: deleteNurseryIsLoading }] =
    useDeleteOneNurseryByNurseryIdMutation();

  // Debug,
  // console.log('nurseryId : ', nursery.id);
  // console.log('crops : ', crops);

  // Hooks
  const dispatch = useDispatch();

  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const userId = Number(userCookie?.id);

  // Selectors
  const addCropPopupDisplay = useSelector(
    (state: RootState) => state.display.addCropNurseryPopup
  );
  const displayNurseryLogPopup = useSelector(
    (state: RootState) => state.display.displayNurseryLogPopup
  );
  const displayCropLogPopup = useSelector(
    (state: RootState) => state.display.displayCropLogPopup
  );
  const currentGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );
  const crops = useSelector((state: RootState) => {
    const nurseryObj = state.garden.selectedGarden?.plantNurseries.find(
      (n) => n.id === nursery.id
    );
    return nurseryObj?.crops;
  });
  const id = useSelector((state: RootState) => state.display.id);

  // Fetch
  const deletingNursery = () => {
    try {
      deleteNursery({
        nurseryId: nursery.id,
      }).unwrap();
      console.log('Nursery deletes');
    } catch {
      console.log('error deleting nursery');
    }
  };

  // Loading and Error Handling
  // if (cropsIsLoading) {
  //   return <div className="m-10">Loading...</div>;
  // }
  // if (cropsIsError) {
  //   console.log('error in current nursery : ', nursery.id);
  // }
  // if (crops?.isEmpty) {
  //   console.log('Oups, no crops find...');
  // }

  return (
    <>
      {deleteNurseryIsLoading && <LoadingModal />}
      <SlimCard
        bgColor="bg-cardbackground"
        className="bg-nursery mb-[2vh] ml-[5vw] flex min-h-[5vh] w-[90vw] flex-col justify-center"
      >
        {/* //Nursery Title + icons */}
        <section className="flex flex-col">
          <div className="flex items-center justify-between">
            <H2>{nursery.name}</H2>

            <Image
              onClick={() => setDisplayNurseryInfo((prev) => !prev)}
              className="mr-[2vw] h-[3vw] w-[auto]"
              src="/image/icons/chevronBas.webp"
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
                src="/image/icons/add.webp"
                alt="Add crop"
                width={50}
                height={50}
                onClick={() =>
                  addCropPopupDisplay
                    ? dispatch(
                        setAddCropNurseryPopup({ state: false, id: nursery.id })
                      )
                    : dispatch(
                        setAddCropNurseryPopup({ state: true, id: nursery.id })
                      )
                }
              />
              <Image
                style={{
                  display:
                    userId === currentGarden?.authorId ? 'block' : 'none',
                }}
                className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
                src="/image/icons/edit.webp"
                alt="Edit nursery"
                width={50}
                height={50}
              />
              <Image
                className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
                src="/image/icons/info.webp"
                alt="Display info about nursery"
                width={50}
                height={50}
                onClick={() =>
                  dispatch(
                    setDisplayNurseryLogPopup({
                      state: !displayNurseryLogPopup,
                      id: Number(nursery.id),
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
                src="/image/icons/trash.webp"
                alt="Deleting nursery"
                width={50}
                height={50}
                onClick={() => setDisplayDeletingNurseryPopup(true)}
              />
            </div>
            <p className="mr-[3vw] text-lg italic">
              {nursery.type.length < 20
                ? nursery.type
                : nursery.type.substring(0, 18) + '...'}
            </p>
          </div>

          <div
            style={{
              display: displayDeletingNurseryPopup ? 'block' : 'none',
            }}
          >
            <Confirmation
              element={'nursery'}
              handleYesClick={deletingNursery}
              handleNoClick={() => setDisplayDeletingNurseryPopup(false)}
            />
          </div>

          <div
            style={{
              display:
                id === nursery.id && addCropPopupDisplay ? 'block' : 'none',
            }}
          >
            <AddCropNurseryPopup nursery={nursery} />
          </div>

          {/* Log Popup */}
          <div
            style={{
              display:
                displayNurseryLogPopup && id === nursery.id ? 'block' : 'none',
            }}
          >
            {/* <Display_Logs_Popup
              id={nursery.id}
              display={displayNurseryLogPopup}
              logObject={'nursery'}
            /> */}
          </div>
          {/* //crops map */}

          {!crops ? (
            <div
              style={{
                display: displayNurseryInfo ? 'block' : 'none',
              }}
            >
              <H2>Oup&apos;s there is no crop on this nursery.</H2>
            </div>
          ) : (
            <div
              style={{
                display: displayNurseryInfo ? 'block' : 'none',
              }}
              className="overflow-x-auto"
            >
              <table className="min-w-full">
                <thead>
                  <tr className="border-1">
                    <th className="border-1 p-1">Veg.</th>
                    <th className="border-1 p-1">Var.</th>
                    <th className="border-1 p-1">nPot</th>
                    <th className="border-1 p-1">Size</th>
                    <th className="border-1 p-1">Info</th>
                    <th className="border-1 p-1">Del.</th>
                  </tr>
                </thead>
                <tbody>
                  {crops?.map((crop) => (
                    <>
                      <tr key={crop.id * Math.random()}>
                        <td className="border-1 p-1">{crop.vegetable}</td>
                        <td className="border-1 p-1">{crop.variety}</td>
                        <td className="border-1 p-1">{crop.nPot}</td>
                        <td className="border-1 p-1">
                          {crop.potSize}x{crop.potSize}
                        </td>
                        <td
                          className="border-1 p-1"
                          onClick={() =>
                            dispatch(
                              setDisplayCropLogPopup({
                                state: !displayCropLogPopup,
                                id: Number(crop.id),
                              })
                            )
                          }
                        >
                          <img src={crop.icon} alt="" className="mx-auto" />
                        </td>
                        <td className="border-1 p-1">
                          <img
                            className="mx-auto"
                            src="/image/icons/trash.webp"
                            alt="Delete line"
                            style={{
                              width: '5vw',
                              height: '5vw',
                            }}
                            // onClick={() => setDisplayDeletingLinePopup(true)}
                          />
                        </td>
                      </tr>

                      {displayCropLogPopup && id === crop.id && (
                        <tr>
                          <td colSpan={6} className="p-0">
                            <div className="relative w-full">
                              {/* <Display_Logs_Popup
                                id={crop.id}
                                display={true}
                                logObject={'crop'}
                              /> */}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>

              {/* crops?.content.map((crop, index) => ( */}
            </div>
          )}
        </section>
      </SlimCard>
    </>
  );
};

export default Nursery;
