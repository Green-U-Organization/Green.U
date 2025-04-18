'use client';
import React, { useState } from 'react';
import Card from '../Atom/Card';
import TextInput from '../Atom/TextInput';
// import MapComponent from './UI/MapComponent';
import Button from '../Atom/Button';
import SelectInput from '../Atom/SelectInput';
import HashtagInput from '../HashtagInput';
import { useRouter } from 'next/navigation';
import LocationPicker from '../UI/LocationPicker';
import { useLanguage } from '../../app/contexts/LanguageProvider';
import { useCreateNewGardenMutation } from '@/slice/garden';

type gardenType = {
  authorId: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  privacy: number;
  type: number;
  hashtags: string[];
};

const CreateGardenForm = () => {
  const { translations } = useLanguage();

  // const [location, setLocation] = useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);

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

  //RTH Query
  const [createNewGarden] = useCreateNewGardenMutation();

  const rows = 5;
  const cols = 33;
  const router = useRouter();

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

  const handleSubmit = () => {
    const form = document.getElementById('createGarden') as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);

      const gardenData: gardenType = {
        authorId: 1, //CETTE DONNEE DEVRA ETRE CORRIGEE !!!!
        name: formData.get('gardenName') as string,
        description: formData.get('gardenDescription') as string,
        latitude: parseFloat(formData.get('latitude') as string),
        longitude: parseFloat(formData.get('longitude') as string),
        length: Number(formData.get('gardenLength')),
        width: Number(formData.get('gardenWidth')),
        privacy: selectedPrivacy,
        type: selectedType,
        hashtags: formData.getAll('gardenHashtag') as string[],
      };

      console.log('Garden Data:', gardenData);

      try {
        createNewGarden(gardenData).unwrap();
        console.log('Garden created with success');
      } catch {
        console.log('Error creatng garden');
      }

      router.push('/garden-manager');
    } else {
      console.error('Form not found');
    }
  };

  return (
    <>
      <Card className="h-full max-w-screen px-8 pt-5 pb-10">
        <h1 className="mb-5 text-center text-4xl">
          {translations.gardenCreator}
        </h1>

        <form method="post" id="createGarden" className="flex flex-col">
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

          <label htmlFor="gardenWidth">
            {translations.yourGardenIs} <span>{gardenWidth}</span>{' '}
            {translations.metersLarge}
          </label>
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

          {/* Intégration de la map de localisation du terrain */}
          <LocationPicker
            initialLat={0} //Pour ne pas avoir un pin par défaut
            initialLng={0} //Idem
            //showUserPosition={true}
            onLocationChange={(lat, lng) => console.log(lat, lng)}
          />

          <SelectInput
            label={translations.kindOfGarden}
            name="gardenType"
            options={[
              { value: 0, label: translations.gardenType0 },
              { value: 1, label: translations.gardenType1 },
              { value: 2, label: translations.gardenType2 },
              { value: 3, label: translations.gardenType3 },
            ]}
            value={selectedType}
            onChange={(e) => setSelectedType(Number(e.target.value))}
          />

          <SelectInput
            label={translations.privacySettings}
            name="gardenPrivacy"
            options={[
              { value: 0, label: translations.privateGarden },
              { value: 1, label: translations.semiPrivateGarden },
              { value: 2, label: translations.publicGarden },
            ]}
            value={selectedPrivacy}
            onChange={(e) => setSelectedPrivacy(Number(e.target.value))}
          />

          <div className="flex justify-center">
            <Button onClick={() => router.push('/garden-manager')}>
              {translations.back}
            </Button>
            <Button onClick={handleSubmit}>{translations.create}</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default CreateGardenForm;
