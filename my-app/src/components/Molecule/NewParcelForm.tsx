import React, { useState } from 'react';
import Button from '../Atom/Button';
import H2 from '../Atom/H2';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { createNewParcel } from '@/utils/actions/garden/parcel/createNewParcel';
import { setReload } from '@/redux/garden/gardenSlice';
// import { useRouter } from 'next/navigation';
import { useCreateNewParcelMutation } from '@/slice/garden';

const NewParcelForm: React.FC<{ displayCondition: boolean }> = ({
  displayCondition,
}) => {
  const [length, setLength] = useState(1);
  const [width, setWidth] = useState(1);

  //RTK Queries
  const [
    createNewParcel, // fetch de création de ligne
    { isLoading: createNewParcelIsLoading },
  ] = useCreateNewParcelMutation();

  //Selectors
  const actualGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );
  const dispatch = useDispatch();
  if (!displayCondition) return null;

  // const reload = useSelector((state: RootState) => state.garden.reload);
  const handleSubmit = async () => {
    const newParcel = {
      gardenId: actualGarden?.id ?? 0,
      length: length,
      width: width,
      nLine: 1,
      parcelAngle: 0,
      x_position: 0,
      y_position: 0,
      parcel_angle: 0,
    };

    console.log(newParcel);
    try {
      createNewParcel(newParcel).unwrap();
      console.log('parcel created');
    } catch {
      console.log('error creating parcel');
    }
  };

  const handleLengthChange = (e: { target: { value: string } }) => {
    const newValue = parseFloat(e.target.value);
    setLength(newValue);
    console.log(length);
  };
  const handleWidthChange = (e: { target: { value: string } }) => {
    const newValue = parseFloat(e.target.value);
    setWidth(newValue);
    console.log(length);
  };

  return (
    <div className="bg-cardbackground flex h-[auto] w-[60vw] flex-col items-center justify-between rounded-xl border-2 p-4">
      <H2>Add parcel</H2>
      <form className="flex flex-col items-center">
        {/* <TextInput label="Length"></TextInput> */}
        <label htmlFor="">Length : {length}m</label>
        <div className="flex w-full items-center justify-around">
          <p onClick={() => setLength((prev) => prev - 1)}>-</p>
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={length}
            onChange={handleLengthChange}
            className={`bg-border mx-3 h-2 cursor-cell appearance-none`}
          />
          <p onClick={() => setLength((prev) => prev + 1)}>+</p>
        </div>
        {/* <TextInput label="Width"></TextInput> */}
        <label htmlFor="">Width : {width}m</label>
        <div className="flex w-full items-center justify-around">
          <p onClick={() => setWidth((prev) => prev - 0.5)}>-</p>
          <input
            type="range"
            min="0"
            max="20"
            step="0.1"
            value={width}
            onChange={handleWidthChange}
            className={`bg-border mx-3 h-2 cursor-cell appearance-none`}
          />
          <p onClick={() => setWidth((prev) => prev + 0.5)}>+</p>
        </div>

        <Button onClick={handleSubmit}>Create!</Button>
      </form>
    </div>
  );
};

export default NewParcelForm;
