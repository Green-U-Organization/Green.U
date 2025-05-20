import React, { useState } from 'react';
import Button from '../Atom/Button';
import H2 from '../Atom/H2';
import { useSelector } from 'react-redux';
import { RootState, useDispatch } from '@/redux/store';
import {
  useCreateNewParcelMutation,
  useEditUserByUserIdMutation,
  useGetUserByIdQuery,
} from '@/slice/fetch';

import { setAddParcelPopup } from '@/redux/display/displaySlice';
import XpTable from '@/utils/Xp';
import Cookies from 'js-cookie';
import LoadingModal from './LoadingModal';
import { addParcelStore } from '@/redux/garden/gardenSlice';
import Loading from '../Atom/Loading';

const NewParcelForm: React.FC<{ display: boolean }> = ({ display }) => {
  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const id = Number(userCookie?.id);

  //RTK Queries
  const [
    createNewParcel, // fetch de création de ligne
    { isLoading: createNewParcelIsLoading },
  ] = useCreateNewParcelMutation();
  const [addXp] = useEditUserByUserIdMutation();
  const {
    data: user,
    isError: userIsError,
    isSuccess: userIsSuccess,
  } = useGetUserByIdQuery({
    userId: id,
  });

  //Local Variables
  const [length, setLength] = useState<number>(1);
  const [width, setWidth] = useState<number>(1);
  const [repeat, setRepeat] = useState<number>(1);

  //Hooks
  const dispatch = useDispatch();

  //Selectors
  const actualGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );
  // const display = useSelector(
  //   (state: RootState) => state.display.addParcelPopup
  // );

  if (!userIsSuccess) return <Loading />;

  //Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParcel = {
      Parcel: {
        gardenId: actualGarden?.id ?? 0,
        length: length,
        width: width,
      },
      Iteration: repeat,
    };

    try {
      const newParcelResponse = await createNewParcel(newParcel).unwrap();

      console.log('newParcelResponse : ', newParcelResponse);

      dispatch(addParcelStore(newParcelResponse.content));

      console.log('parcel(s) created');

      //XP
      const newXp = user.content.xp + XpTable.addParcel * repeat;
      await addXp({
        userId: id,
        xp: newXp,
      });
    } catch {
      console.log('error creating parcel');
    }
  };

  const handleLengthChange = (e: { target: { value: string } }) => {
    const newValue = parseFloat(e.target.value);
    setLength(newValue);
  };
  const handleWidthChange = (e: { target: { value: string } }) => {
    const newValue = parseFloat(e.target.value);
    setWidth(newValue);
  };
  const handleRepeatChange = (e: { target: { value: string } }) => {
    const newValue = Number(e.target.value);
    setRepeat(newValue);
  };

  return (
    <>
      {createNewParcelIsLoading && <LoadingModal />}
      <section
        style={{
          display: display ? 'flex' : 'none',
        }}
        className="bg-cardbackground fixed bottom-[2vh] left-[8vw] flex h-[auto] w-[70vw] flex-col items-center justify-between rounded-xl border-2 p-4"
      >
        <H2>Add parcel</H2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          {/* <TextInput label="Length"></TextInput> */}
          <label htmlFor="">Length : {length}m</label>
          <div className="flex w-full items-center justify-around">
            <p onClick={() => setLength((prev) => (prev === 0 ? 0 : prev - 1))}>
              -
            </p>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={length}
              onChange={handleLengthChange}
              className={`bg-border mx-3 h-2 cursor-cell appearance-none`}
            />
            <p
              onClick={() =>
                setLength((prev) => (prev === 100 ? 100 : prev + 1))
              }
            >
              +
            </p>
          </div>
          {/* <TextInput label="Width"></TextInput> */}
          <label htmlFor="">Width : {width}m</label>
          <div className="flex w-full items-center justify-around">
            <p
              onClick={() => setWidth((prev) => (prev === 0 ? 0 : prev - 0.5))}
            >
              -
            </p>
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={width}
              onChange={handleWidthChange}
              className={`bg-border mx-3 h-2 cursor-cell appearance-none`}
            />
            <p
              onClick={() => setWidth((prev) => (prev === 20 ? 20 : prev + 1))}
            >
              +
            </p>
          </div>

          <label htmlFor="">Repeat : {repeat} times</label>
          <div className="flex w-full items-center justify-around">
            <p onClick={() => setRepeat((prev) => (prev === 0 ? 0 : prev - 1))}>
              -
            </p>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={repeat}
              onChange={handleRepeatChange}
              className={`bg-border mx-3 h-2 cursor-cell appearance-none`}
            />
            <p
              onClick={() => setRepeat((prev) => (prev === 20 ? 20 : prev + 1))}
            >
              +
            </p>
          </div>

          <div className="flex">
            <Button
              type="button"
              className="bg-bgbutton relative m-5 px-6 py-2"
              onClick={() =>
                dispatch(
                  setAddParcelPopup({
                    state: false,
                    id: 0,
                  })
                )
              }
            >
              Back
            </Button>
            <Button
              className="bg-bgbutton relative m-5 px-6 py-2"
              type="submit"
            >
              Create!
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewParcelForm;
