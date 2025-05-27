'use client';
import React, { useState } from 'react';
import Card from '../Atom/Card';
import TextInput from '../Atom/TextInput';
// import MapComponent from './UI/MapComponent';
import Button from '../Atom/Button';
import SelectInput from '../Atom/SelectInput';
import HashtagInput from '../HashtagInput';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import LocationPicker from '../UI/LocationPicker';
import { useLanguage } from '../../app/contexts/LanguageProvider';
import { useCreateNewGardenMutation } from '@/redux/api/fetch';
import { Garden } from '@/utils/types';
import { useDispatch } from 'react-redux';
import { setSelectedGarden } from '@/redux/garden/gardenSlice';

const CreateGardenForm = () => {
  // Hooks
  const { translations } = useLanguage();
  // const [location, setLocation] = useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);

  // Local State
  const [gardenLength, setGardenLength] = useState<number>(10);
  const [gardenWidth, setGardenWidth] = useState<number>(10);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [selectedPrivacy, setSelectedPrivacy] = useState<number>(0);

  // const [garden, setGarden] = useState<gardenType>({
  //   authorId: 1,
  //   name: '',
  //   description: '',
  //   latitude: 50,
  //   longitude: 50,
  //   length: gardenLength,
  //   width: gardenWidth,
  //   privacy: 0,
  //   type: 0,
  // });

  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const id = Number(userCookie?.id);

  // RTHK Query
  const [createNewGarden] = useCreateNewGardenMutation();

  //Hooks
  const dispatch = useDispatch();

  //Variables
  const rows = 5;
  const cols = 33;
  const router = useRouter();

  // Handlers

  // const handleLocationSelect = (selectedLocation: {
  //   latitude: number;
  //   longitude: number;
  // }) => {
  //   setLocation(selectedLocation);
  // };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGardenLength(Number(e.target.value));
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGardenWidth(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.getElementById('createGarden') as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);

      const gardenData: Garden = {
        authorId: id,
        name: formData.get('gardenName') as string,
        description: formData.get('gardenDescription') as string,
        latitude: parseFloat(formData.get('latitude') as string),
        longitude: parseFloat(formData.get('longitude') as string),
        length: Number(formData.get('gardenLength')),
        width: Number(formData.get('gardenWidth')),
        privacy: selectedPrivacy,
        type: selectedType,
        tagsInterests: (formData.getAll('gardenHashtag') as string[]).map(
          (tag) => ({ tag, count: 1 })
        ),
        id: 0,
        deleted: false,
        createdAt: '',
        constributors: [],
        followers: [],
        parcels: [],
        plantNurseries: [],
      };

      try {
        createNewGarden(gardenData).unwrap();
        console.log('Garden created with success');
      } catch {
        console.log('Error creatng garden');
      }
      dispatch(setSelectedGarden(gardenData));

      router.push('/garden');
    } else {
      console.error('Form not found');
    }
  };

  return (
    <>
      <Card className="bg-cardbackground h-full min-h-screen max-w-screen px-8 pt-5 pb-10">
        <h1 className="mb-5 text-center text-4xl">
          {translations.gardenCreator}
        </h1>

        <form
          onSubmit={handleSubmit}
          id="createGarden"
          className="flex flex-col"
        >
          <TextInput
            type="text"
            label={translations.gardenName}
            name="gardenName"
            placeholder={translations.giveaGardenName}
            //   error={errorForm.errorEmptyGardenName}
          />
          <label htmlFor="gardenDescription">
            {translations.gardenDescription}
          </label>
          <textarea
            name="gardenDescription"
            placeholder={translations.giveaGardenDescription}
            rows={Number(rows)}
            cols={Number(cols)}
            className="mb-5 rounded-md border-1 pl-3"
          ></textarea>

          <HashtagInput
            label={translations.addTagsToCaracterize}
            name="gardenHashtag"
            placeHolder={translations.exempleTagGarden}
            error={false}
          ></HashtagInput>

          <label htmlFor="gardenLength">
            {translations.yourGardenIs} <span>{gardenLength}</span>{' '}
            {translations.metersLong}
          </label>

          <div className="flex items-center justify-center">
            <p
              onClick={() =>
                setGardenLength((prev) => (prev === 0 ? 0 : prev - 1))
              }
            >
              -
            </p>
            <input
              name="gardenLength"
              type="range"
              min="1"
              max="500"
              step="1"
              value={gardenLength}
              onChange={handleLengthChange}
              className={`bg-border mt-5 mr-5 mb-5 ml-5 h-2 cursor-cell appearance-none`}
            />
            <p
              onClick={() =>
                setGardenLength((prev) => (prev === 500 ? 500 : prev + 1))
              }
            >
              +
            </p>
          </div>

          <label htmlFor="gardenWidth">
            {translations.yourGardenIs} <span>{gardenWidth}</span>{' '}
            {translations.metersLarge}
          </label>

          <div className="flex items-center justify-center">
            <p
              onClick={() =>
                setGardenWidth((prev) => (prev === 0 ? 0 : prev - 1))
              }
            >
              -
            </p>
            <input
              name="gardenWidth"
              type="range"
              min="1"
              max="500"
              step="1"
              value={gardenWidth}
              onChange={handleWidthChange}
              className={`bg-border mt-5 mr-5 mb-5 ml-5 h-2 cursor-cell appearance-none`}
            />
            <p
              onClick={() =>
                setGardenWidth((prev) => (prev === 500 ? 500 : prev + 1))
              }
            >
              +
            </p>
          </div>

          {/* Intégration de la map de localisation du terrain */}
          <LocationPicker
            initialLat={0} //Pour ne pas avoir un pin par défaut
            initialLng={0} //Idem
            showUserPosition={true}
          />

          <SelectInput
            label={translations.kindOfGarden}
            name="gardenType"
            options={[
              { value: 0, label: translations.gardenType0 }, //Personnal
              { value: 1, label: translations.gardenType1 }, //Famillial
              { value: 2, label: translations.gardenType2 }, //Collective
              { value: 3, label: translations.gardenType3 }, //Professionnal
            ]}
            value={selectedType}
            onChange={(e) => setSelectedType(Number(e.target.value))}
          />

          <SelectInput
            label={translations.privacySettings}
            name="gardenPrivacy"
            options={[
              { value: 0, label: translations.privateGarden },
              //{ value: 1, label: translations.semiPrivateGarden },
              { value: 2, label: translations.publicGarden },
            ]}
            garden-manager
            value={selectedPrivacy}
            onChange={(e) => setSelectedPrivacy(Number(e.target.value))}
          />

          <div className="flex justify-center">
            <Button
              type="button"
              className="bg-bgbutton relative m-5 px-6 py-2"
              onClick={() => router.push('/garden')}
            >
              {translations.back}
            </Button>
            <Button
              className="bg-bgbutton relative m-5 px-6 py-2"
              type="submit"
            >
              {translations.create}
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default CreateGardenForm;
