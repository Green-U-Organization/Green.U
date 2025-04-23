import { RootState, useDispatch, useSelector } from '@/redux/store';
import styles from '../../app/Assets.module.css';
import React, { FC, useState } from 'react';
import Image from 'next/image';
import H2 from '../Atom/H2';
import Confirmation from '../Molecule/ConfirmationPopup';
import {
  useCreateCropToNurseryMutation,
  useGetCropByNurseryIdQuery,
  useDeleteOneNurseryByNurseryIdMutation,
} from '@/slice/garden';
import { NurceryProps } from '@/utils/types';
import AddCropNurseryPopup from '../Molecule/AddCropNurseryPopup';
import { setAddCropNurseryPopup } from '@/redux/display/displaySlice';

const Nursery: FC<NurceryProps> = ({ nursery, scale, nurseryKey }) => {
  const [displayNurseryInfo, setDisplayNurseryInfo] = useState<boolean>(false);
  const [displayDeletingNurseryPopup, setDisplayDeletingNurseryPopup] =
    useState<boolean>(false);
  const [displayAddCropNurseryPopup, setDisplayAddCropNurseryPopup] =
    useState<boolean>(false);

  //RTK Query
  const {
    data: crops,
    isLoading: cropsIsLoading,
    isError: cropsIsError,
  } = useGetCropByNurseryIdQuery({ nurseryId: nursery.id });
  const [createNewCrop] = useCreateCropToNurseryMutation();
  const [deleteNursery] = useDeleteOneNurseryByNurseryIdMutation();

  //Hooks
  const dispatch = useDispatch();

  //Selectors
  const graphicMode = useSelector(
    (state: RootState) => state.garden.graphicMode
  );
  const addCropPopupDisplay = useSelector(
    (state: RootState) => state.display.addCropNurseryPopup
  );
  const id = useSelector((state: RootState) => state.display.id);

  const addCrop = () => {};

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

  if (cropsIsLoading) {
    return <div className="m-10">Loading...</div>;
  }
  if (cropsIsError) {
    console.log('error in current nursery : ', nursery.id);
  }
  if (crops?.length === 0) {
    console.log('Oups, no crops find...');
  }

  return (
    <div className="flex w-full flex-col">
      <section
        className={`${graphicMode ? styles.parcelBackground : 'mb-[2vh] ml-5 flex min-h-[5vh] flex-col justify-center rounded-2xl bg-sky-200'} `}
        style={{
          height: graphicMode ? 20 * scale : undefined,
          width: graphicMode ? 10 * scale : '90vw',
        }}
      >
        {/* //Nursery Title + icons */}
        <section className="flex flex-col">
          <div className="flex items-center justify-between">
            <H2>{nursery.name}</H2>
            <p className="text-lg italic">
              {nursery.type.length < 20
                ? nursery.type
                : nursery.type.substring(0, 18) + '...'}
            </p>

            <Image
              onClick={() => setDisplayNurseryInfo((prev) => !prev)}
              className="mr-[2vw] h-[3vw] w-[auto]"
              src="/image/icons/chevronBas.png"
              alt="Parcel Image"
              width={50}
              height={50}
            />
          </div>

          <div className="flex items-center">
            <Image
              className="mb-[2vw] ml-[3vw] h-[5vw] w-[5vw]"
              src="/image/icons/add.png"
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
              className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
              src="/image/icons/edit.png"
              alt="Edit nursery"
              width={50}
              height={50}
            />
            <Image
              className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
              src="/image/icons/info.png"
              alt="Display info about nursery"
              width={50}
              height={50}
            />
            <Image
              className="mx-[3vw] mb-[2vw] h-[5vw] w-[5vw]"
              src="/image/icons/trash.png"
              alt="Deleting nursery"
              width={50}
              height={50}
              onClick={() => setDisplayDeletingNurseryPopup(true)}
            />
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
            crops?.map((crop, index) => (
              <div
                key={index}
                style={{
                  display: displayNurseryInfo ? 'block' : 'none',
                }}
              >
                <p>
                  {crop.vegetable} - {crop.variety}
                </p>
              </div>
            ))
          )}
        </section>
      </section>
    </div>
  );
};

export default Nursery;
