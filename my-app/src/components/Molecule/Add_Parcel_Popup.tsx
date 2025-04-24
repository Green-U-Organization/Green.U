import React, { useState } from 'react';
import Button from '../Atom/Button';
import H2 from '../Atom/H2';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// import { useRouter } from 'next/navigation';
import { useCreateNewParcelMutation } from '@/slice/garden';

const NewParcelForm: React.FC<{ displayCondition: boolean }> = ({
  displayCondition,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(displayCondition);
  const [length, setLength] = useState<number>(1);
  const [width, setWidth] = useState<number>(1);
  const [repeat, setRepeat] = useState<number>(1);

  //RTK Queries
  const [
    createNewParcel, // fetch de création de ligne
    //{ isLoading: createNewParcelIsLoading },
  ] = useCreateNewParcelMutation();

  //Selectors
  const actualGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );
  if (!isVisible) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    for (let i = 0; i < repeat; i++) {
      try {
        createNewParcel(newParcel).unwrap();
        console.log('parcel created');
      } catch {
        console.log('error creating parcel');
      }
    }
    setIsVisible(false);
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
    <div
      style={{
        display: isVisible ? 'flex' : 'none',
      }}
      className="bg-cardbackground flex h-[auto] w-[70vw] flex-col items-center justify-between rounded-xl border-2 p-4"
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
            onClick={() => setLength((prev) => (prev === 100 ? 100 : prev + 1))}
          >
            +
          </p>
        </div>
        {/* <TextInput label="Width"></TextInput> */}
        <label htmlFor="">Width : {width}m</label>
        <div className="flex w-full items-center justify-around">
          <p onClick={() => setWidth((prev) => (prev === 0 ? 0 : prev - 0.5))}>
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
          <p onClick={() => setWidth((prev) => (prev === 20 ? 20 : prev + 1))}>
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
          <p onClick={() => setRepeat((prev) => (prev === 20 ? 20 : prev + 1))}>
            +
          </p>
        </div>

        <div className="flex">
          <Button onClick={() => setIsVisible(false)}>Back</Button>
          <Button type="submit">Create!</Button>
        </div>
      </form>
    </div>
  );
};

export default NewParcelForm;
