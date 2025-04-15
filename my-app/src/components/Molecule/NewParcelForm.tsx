import React, { useState } from 'react';
import Button from '../Atom/Button';
import H2 from '../Atom/H2';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { createNewGarden } from '@/utils/actions/garden/createNewGarden';

const NewParcelForm: React.FC<{ displayCondition: boolean }> = ({
  displayCondition,
}) => {
  const [length, setLength] = useState(1);
  const [width, setWidth] = useState(1);
  const actualGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );
  if (!displayCondition) return null;

  const handleSubmit = () => {
    const newParcel = {
      gardenId: actualGarden?.id,
      length: length,
      width: width,
      nLine: 1,
      parcelAngle: 0,
    };

    console.log(newParcel);
    createNewGarden(newParcel);
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
    <div className="bg-gardenBG flex h-[auto] w-[60vw] flex-col items-center justify-between rounded-xl border-2 p-4">
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
