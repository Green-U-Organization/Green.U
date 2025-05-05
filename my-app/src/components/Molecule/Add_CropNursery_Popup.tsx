import React, { FC, useState } from 'react';
import TextInput from '../Atom/TextInput';
import Card from '../Atom/Card';
import Button from '../Atom/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setAddCropNurseryPopup } from '@/redux/display/displaySlice';
import { Nurcery } from '@/utils/types';
import H2 from '../Atom/H2';
import { useCreateCropToNurseryMutation } from '@/slice/fetch';

const AddCropNurseryPopup: FC<{ nursery: Nurcery }> = ({ nursery }) => {
  //Local State
  const [potSize, setPotSize] = useState<number>(5);
  const [typeOfAction, setTypeOfAction] = useState<string>('sowing');
  const [selectedIcon, setSelectedIcon] = useState<string>('');

  //Variables
  const iconList = [
    '/image/assets/vegetables/icon/broccoli.png',
    '/image/assets/vegetables/icon/cabbage.png',
    '/image/assets/vegetables/icon/carrot.png',
    '/image/assets/vegetables/icon/celery.png',
    '/image/assets/vegetables/icon/corn.png',
    '/image/assets/vegetables/icon/eggplant.png',
    '/image/assets/vegetables/icon/green_bean.png',
    '/image/assets/vegetables/icon/lettuce.png',
    '/image/assets/vegetables/icon/onion.png',
    '/image/assets/vegetables/icon/potato.png',
    '/image/assets/vegetables/icon/tomato.png',
  ];
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  //Hooks
  const dispatch = useDispatch();

  //Selectors
  const display = useSelector(
    (state: RootState) => state.display.addCropNurseryPopup
  );

  //RTK Query
  const [createCropToNursery] = useCreateCropToNurseryMutation();

  //Handlers
  const handlePotSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPotSize = Number(e.target.value);
    setPotSize(selectedPotSize);
  };

  const handleTypeOfActionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    setTypeOfAction(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formatDate = (date: Date | null) => {
      return date ? date.toISOString().split('T')[0] : null; // Formate la date en "YYYY-MM-DD"
    };
    const sowing =
      formData.get('cropAction') === 'sowing' ? formatDate(new Date()) : '';
    const planting =
      formData.get('cropAction') === 'planting' ? formatDate(new Date()) : '';

    const cropData = {
      nurseryId: nursery.id,
      vegetable: formData.get('vegetable') as string,
      variety: formData.get('variety') as string,
      description: formData.get('comments') as string,
      icon: selectedIcon,
      npot: formData.get('npot') ? Number(formData.get('npot')) : 0,
      potsize: potSize,
      sowing: sowing || '',
      planting: planting || '',
      harvesting: '',
      distance_plantation: 0,
    };

    try {
      await createCropToNursery(cropData).unwrap();
      console.log('crop created');
      dispatch(
        setAddCropNurseryPopup({
          state: false,
          id: Number(nursery.id),
        })
      );
    } catch {
      console.log('Error creating crop');
    }
  };

  const handleClickIcon = (e: React.MouseEvent<HTMLImageElement>) => {
    setSelectedIcon(e.currentTarget.src);
  };

  return (
    <div
      style={{
        display: display ? 'flex' : 'none',
      }}
    >
      <Card className="bg-cardbackground flex w-[80vw] flex-col justify-center">
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
            <p className="mx-[4vw]">I&apos;m</p>
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

          <TextInput
            type="number"
            name="npot"
            className="mx-[4vw] mt-[0vh]"
            label="Number of pots "
          />
          <label htmlFor="potSize" className="ml-[3vw]">
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

          <H2>Choose your crop icon :</H2>
          <div className="flex flex-wrap items-center justify-center">
            {iconList.map((icon, key) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={icon}
                alt={`icon-${key}`}
                key={icon}
                onClick={handleClickIcon}
                className={`mx-[2vw] ${baseURL + icon === selectedIcon ? 'rounded-lg border-2' : 'border-0'}`}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-bgbutton relative m-5 px-6 py-2"
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
            <Button
              className="bg-bgbutton relative m-5 px-6 py-2"
              type="submit"
            >
              Crop
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddCropNurseryPopup;
