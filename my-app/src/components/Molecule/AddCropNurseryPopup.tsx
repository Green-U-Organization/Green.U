import React, { FC, useState } from 'react';
import TextInput from '../Atom/TextInput';
import Card from '../Atom/Card';
import Button from '../Atom/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setAddCropNurseryPopup } from '@/redux/display/displaySlice';
import { Nurcery } from '@/utils/types';

const AddCropNurseryPopup: FC<{ nursery: Nurcery }> = ({ nursery }) => {
  //Local State
  const [typeOfContent, setTypeOfContent] = useState<string>('pot');
  const [potSize, setPotSize] = useState<number>(5);
  const [typeOfAction, setTypeOfAction] = useState<string>('sowing');

  //Hooks
  const dispatch = useDispatch();

  //Selectors
  const display = useSelector(
    (state: RootState) => state.display.addCropNurseryPopup
  );

  //Handlers
  const handleTypeOfContentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    setTypeOfContent(e.target.value);
    console.log(typeOfContent);
  };

  const handlePotSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPotSize = Number(e.target.value);
    setPotSize(selectedPotSize);
  };

  const handleTypeOfActionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    setTypeOfAction(e.target.value);
    console.log(typeOfAction);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('first');
  };

  return (
    <div
      style={{
        display: display ? 'flex' : 'none',
      }}
    >
      <Card className="flex w-[90vw] flex-col justify-center">
        <form onSubmit={handleSubmit} className="m-[3vw]">
          <TextInput
            type="text"
            name="vegetable"
            className="mx-[4vw]"
            label="Vegetable"
          />
          <TextInput
            type="text"
            name="variety"
            className="mx-[4vw] -mt-[3vh]"
            label="Variety"
          />

          <div className="flex justify-between">
            <p className="mx-[4vw]">I'm</p>
            <select
              onChange={handleTypeOfActionChange}
              className=""
              name="cropAction"
              id="cropAction"
            >
              <option value="sowing">Sowing</option>
              <option value="transplanting">Transplanting</option>
            </select>
          </div>

          {typeOfAction === 'transplanting' ? (
            <div className="flex justify-between">
              <p className="mx-[4vw]">from</p>
              <select name="transplantingFrom">
                <option value="crop1">crop1</option>
              </select>
            </div>
          ) : null}

          <div className="flex justify-between">
            <p className="mx-[4vw]">on</p>
            <select
              onChange={handleTypeOfContentChange}
              className="mb-[5vw]"
              name="typeOfContent"
              id="typeOfContent"
            >
              <option value="pot">Pot</option>
              <option value="seedlingTray">Seedling Tray</option>
            </select>
          </div>

          <TextInput
            type="number"
            name="numberOfPot"
            className="mx-[4vw] -mt-[3vh]"
            label="Number of pots "
          />
          <label htmlFor="potSize">
            Size of your pots : {potSize}x{potSize}
          </label>
          <div className="flex items-center justify-center">
            <p onClick={() => (potSize === 1 ? 1 : setPotSize(potSize - 1))}>
              -
            </p>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={potSize}
              onChange={handlePotSizeChange}
              className={`bg-border mx-[3vw] h-2 cursor-cell appearance-none`}
            />
            <p onClick={() => (potSize === 30 ? 30 : setPotSize(potSize + 1))}>
              +
            </p>
          </div>

          <p className="">Choose icon</p>

          <div className="flex justify-center">
            <Button
              onClick={() =>
                dispatch(
                  setAddCropNurseryPopup({
                    state: false,
                    id: Number(nursery.id),
                  })
                )
              }
            >
              Back
            </Button>
            <Button type="submit">Crop</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddCropNurseryPopup;
