'use client';
import React, { FC, useState } from 'react';
import Card from '../Atom/Card';
import H2 from '../Atom/H2';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import {
  useCreateCropToLineMutation,
  useEditUserByUserIdMutation,
  useGetUserByIdQuery,
} from '@/slice/fetch';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import type { AddCropPopup } from '@/utils/types';
import { setAddCropPopup } from '@/redux/display/displaySlice';
import XpTable from '@/utils/Xp';

const AddCropPopup: FC<AddCropPopup> = ({ lineId }) => {
  //Local State
  const [plantationDistance, setPlantationDistance] = useState<number>(10);
  const [selectedIcon, setSelectedIcon] = useState<string>('');

  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const id = Number(userCookie?.id);

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

  //RTK Query
  const [createCropToLine] = useCreateCropToLineMutation();
  const [addXp] = useEditUserByUserIdMutation();
  const user = useGetUserByIdQuery({ userId: id });

  //Handlers
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formatDate = (date: Date | null) => {
      return date ? date.toISOString().split('T')[0] : null; // Formate la date en "YYYY-MM-DD"
    };
    const sowing =
      formData.get('cropAction') === 'sowing' ? formatDate(new Date()) : '';
    const planting =
      formData.get('cropAction') === 'planting' ? formatDate(new Date()) : '';

    const cropData = {
      lineId: lineId,
      vegetable: formData.get('vegetable') as string,
      variety: formData.get('variety') as string,
      icon: selectedIcon,
      sowing: sowing || '',
      planting: planting || '',
      harvesting: '',
      distancePlantation: parseFloat(plantationDistance.toFixed(2)),
      comments: formData.get('comments') as string,
    };

    try {
      await createCropToLine(cropData).unwrap();
      await addXp({
        userId: id,
        xp: (user?.data?.content?.xp ?? 0) + XpTable.addCrop,
      });

      console.log('xp : ', (user?.data?.content?.xp ?? 0) + XpTable.addCrop);
      console.log('crop created');
      dispatch(
        setAddCropPopup({
          state: false,
          id: Number(lineId),
        })
      );
    } catch {
      console.log('Error creating crop');
    }
  };

  const handlePlantationDistanceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedPlantationDistance = Number(e.target.value);
    setPlantationDistance(selectedPlantationDistance);
  };

  const handleClickIcon = (e: React.MouseEvent<HTMLImageElement>) => {
    setSelectedIcon(e.currentTarget.src);
  };

  return (
    <Card className="bg-cardbackground flex w-[80vw] flex-col items-center justify-center">
      <H2>Wich crop you want to add?</H2>
      <form
        className="flex flex-col items-center"
        id="addCrop"
        onSubmit={handleSubmit}
      >
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
        <select className="mx-[4vw]" name="cropAction" id="cropAction">
          <option value="sowing">Sowing</option>
          <option value="planting">Planting</option>
        </select>
        <br />
        <div className="mx-[4vw] flex flex-col">
          <label htmlFor="plantationDistance">
            Plantation distance : {plantationDistance}cm
          </label>
          <div className="flex items-center justify-around">
            <p
              onClick={() =>
                plantationDistance === 0
                  ? 0
                  : setPlantationDistance(plantationDistance - 1)
              }
            >
              -
            </p>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={plantationDistance}
              onChange={handlePlantationDistanceChange}
              className={`bg-border h-2 cursor-cell appearance-none`}
            />
            <p
              onClick={() =>
                plantationDistance === 100
                  ? 100
                  : setPlantationDistance(plantationDistance + 1)
              }
            >
              +
            </p>
          </div>
        </div>

        <label className="mx-[4vw]" htmlFor="comments">
          Comments :
        </label>
        <textarea
          className="w-100% mx-[4vw] border-1"
          name="comments"
          id="comments"
        ></textarea>

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

        <div className="flex items-center justify-center">
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            onClick={() =>
              dispatch(
                setAddCropPopup({
                  state: false,
                  id: Number(lineId),
                })
              )
            }
          >
            Back
          </Button>
          <Button className="bg-bgbutton relative m-5 px-6 py-2" type="submit">
            Plant
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddCropPopup;
