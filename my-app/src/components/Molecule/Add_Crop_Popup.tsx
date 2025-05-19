/* eslint-disable @next/next/no-img-element */
'use client';
import React, { FC, useState } from 'react';
import Card from '../Atom/Card';
import H2 from '../Atom/H2';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import {
  useCreateCropToLineMutation,
  useEditUserByUserIdMutation,
  useGetCropByNurseryIdQuery,
  useGetNurseryByGardenIdQuery,
  useGetUserByIdQuery,
  usePatchCropMutation,
} from '@/slice/fetch';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import type { AddCropPopupProps, Crop } from '@/utils/types';
import { setAddCropPopup } from '@/redux/display/displaySlice';
import XpTable from '@/utils/Xp';
import { RootState, useSelector } from '@/redux/store';

const AddCropPopup: FC<AddCropPopupProps> = ({ lineId }) => {
  //Local State
  const [plantationDistance, setPlantationDistance] = useState<number>(10);
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const [action, setAction] = useState<string>('sowing');
  const [origin, setOrigin] = useState<string>('fromScratch');
  const [selectedCropToPlant, setSelectedCropToPlant] = useState<Crop>();
  const [vegetable, setVegetable] = useState('');
  const [variety, setVariety] = useState('');

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

  //Hooks
  const dispatch = useDispatch();

  //Selectors
  const garden = useSelector((state: RootState) => state.garden.selectedGarden);
  const nurseries = useSelector(
    (state: RootState) => state.garden.selectedGarden?.plantNurseries
  );
  const crops = useSelector((state: RootState) => {
    const nurseries = state.garden.selectedGarden?.plantNurseries || [];

    const foundCrops = nurseries.flatMap((n) => n.crops || []);

    return foundCrops.length > 0 ? foundCrops : undefined;
  });

  //RTK Query
  const [createCropToLine] = useCreateCropToLineMutation();
  const [addXp] = useEditUserByUserIdMutation();
  const user = useGetUserByIdQuery({ userId: id });
  // const { data: nurseries } = useGetNurseryByGardenIdQuery({
  //   gardenId: garden?.id ?? 0,
  // });
  const [patchCrop] = usePatchCropMutation();

  // const crops =
  //   nurseries?.map((nursery) => {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     const { data: crop } = useGetCropByNurseryIdQuery({
  //       nurseryId: nursery.id,
  //     });
  //     return crop;
  //   }) || [];

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
      lineId: Number(lineId),
      vegetable: formData.get('vegetable') as string,
      variety: formData.get('variety') as string,
      icon: selectedIcon,
      sowing: sowing || '',
      planting: planting || '',
      harvesting: '',
      distancePlantation: parseFloat(plantationDistance.toFixed(2)),
      comments: formData.get('comments') as string,
    };

    if (origin === 'fromNursery' && selectedCropToPlant?.id) {
      const cropData = {
        cropId: selectedCropToPlant?.id,
        lineId: Number(lineId),
        plantNurseryId: 0,
      };

      try {
        await patchCrop(cropData).unwrap();
      } catch {
        console.log('Error patching crop');
      }
    } else {
      try {
        await createCropToLine(cropData).unwrap();
        await addXp({
          userId: id,
          xp: (user?.data?.content?.xp ?? 0) + XpTable.addCrop,
        });

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
    console.log(e.currentTarget.src);
  };

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAction(e.target.value);
  };

  const handleOriginChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrigin(e.target.value);
  };

  const handleSelectRow = (crop: Crop) => {
    setSelectedCropToPlant(crop);
    setVegetable(crop.vegetable);
    setVariety(crop.variety);
    setSelectedIcon(crop.icon);
  };

  return (
    <Card className="bg-cardbackground flex w-[80vw] flex-col items-center justify-center">
      <H2>Which crop you want to add?</H2>
      <form
        className="flex flex-col items-center"
        id="addCrop"
        onSubmit={handleSubmit}
      >
        <select
          className="mx-[4vw]"
          name="cropAction"
          id="cropAction"
          onChange={handleActionChange}
        >
          <option value="sowing">Sowing</option>
          <option value="planting">Planting</option>
        </select>

        <select
          style={{
            display: action === 'planting' ? 'block' : 'none',
          }}
          className="mx-[4vw]"
          name="cropOrigin"
          id="cropOrigin"
          onChange={handleOriginChange}
        >
          <option value="fromScratch">from scratch</option>
          <option value="fromNursery">from nursery</option>
        </select>

        <div className="ml-5 flex w-[75vw] overflow-x-auto">
          <table
            style={{
              display:
                origin == 'fromScratch' || action != 'planting'
                  ? 'none'
                  : 'block',
            }}
            className="flex min-w-full"
          >
            <thead>
              <tr className="border-1">
                <th className="border-1 p-1">Icon</th>
                <th className="border-1 p-1">Veg.</th>
                <th className="border-1 p-1">Var.</th>
                <th className="border-1 p-1">nPot</th>
                <th className="border-1 p-1">Size</th>
                <th className="border-1 p-1">Info</th>
                <th className="border-1 p-1">Del.</th>
              </tr>
            </thead>
            <tbody>
              {crops?.map((cropObject) =>
                cropObject?.map((crop) => (
                  <tr
                    key={crop.id}
                    onClick={() => handleSelectRow(crop)}
                    className={`${selectedCropToPlant?.id === crop.id ? 'bg-[#f6d4ba]' : ''}`}
                  >
                    <td className="border-1 p-1">
                      <img src={crop.icon} alt="" className="mx-auto" />
                    </td>
                    <td className="border-1 p-1">{crop.vegetable}</td>
                    <td className="border-1 p-1">{crop.variety}</td>
                    <td className="border-1 p-1">{crop.nPot}</td>
                    <td className="border-1 p-1">
                      {crop.potSize}x{crop.potSize}
                    </td>
                    <td className="border-1 p-1">
                      <img
                        className="mx-auto"
                        src="/image/icons/info.png"
                        alt="Display info about line"
                        style={{
                          width: '5vw',
                          height: '5vw',
                        }}
                      />
                    </td>
                    <td className="border-1 p-1">
                      <img
                        className="mx-auto"
                        src="/image/icons/trash.png"
                        alt="Delete line"
                        style={{
                          width: '5vw',
                          height: '5vw',
                        }}
                        // onClick={() => setDisplayDeletingLinePopup(true)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <TextInput
          type="text"
          name="vegetable"
          className="mx-[4vw]"
          label="Vegetable"
          value={vegetable}
          onChange={(e) => setVegetable(e.target.value)}
        />
        <TextInput
          type="text"
          name="variety"
          className="mx-[4vw] -mt-[3vh]"
          label="Variety"
          value={variety}
          onChange={(e) => setVariety(e.target.value)}
        />
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
            <img
              src={icon}
              alt={`icon-${key}`}
              onClick={handleClickIcon}
              className={`mx-[2vw] ${icon.split('/').pop() === selectedIcon.split('/').pop() ? 'z-50 rounded-lg border-2 bg-amber-300' : 'border-0'}`}
              key={icon}
            />
          ))}
        </div>

        <div className="flex items-center justify-center">
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            type="button"
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
