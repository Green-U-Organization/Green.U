import React, { FC, useState } from 'react';
import { setEditParcelPopup } from '@/redux/display/displaySlice';
import { useDispatch } from 'react-redux';
import H2 from '../Atom/H2';
import Card from '../Atom/Card';
import Button from '../Atom/Button';
import type { EditParcelPopup } from '@/utils/types';
import { useEditParcelMutation } from '@/slice/fetch';

const EditParcelPopup: FC<EditParcelPopup> = ({ parcel }) => {
  //Local Variables
  const [length, setLength] = useState<number>(parcel.length);
  const [width, setWidth] = useState<number>(parcel.width);

  //Hooks
  const dispatch = useDispatch();

  //RTK Queries
  const [editParcel] = useEditParcelMutation();

  //Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParcel = {
      parcelId: parcel.id,
      length: length,
      width: width,
      x_position: 0,
      y_position: 0,
      parcel_angle: 0,
    };

    try {
      editParcel(newParcel).unwrap();
      console.log('parcel created');
    } catch {
      console.log('error creating parcel');
    }

    dispatch(
      setEditParcelPopup({
        state: false,
        id: Number(parcel.id),
      })
    );
  };

  const handleLengthChange = (e: { target: { value: string } }) => {
    const newValue = parseFloat(e.target.value);
    setLength(newValue);
  };
  const handleWidthChange = (e: { target: { value: string } }) => {
    const newValue = parseFloat(e.target.value);
    setWidth(newValue);
  };

  return (
    <Card className="flex w-[90vw] flex-col items-center justify-center">
      <H2>Edit parcel</H2>
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

        <div className="flex">
          <Button
            onClick={() =>
              dispatch(
                setEditParcelPopup({
                  state: false,
                  id: Number(parcel.id),
                })
              )
            }
          >
            Back
          </Button>
          <Button type="submit">Edit!</Button>
        </div>
      </form>
    </Card>
  );
};

export default EditParcelPopup;
