'use client';
import React, { useState } from 'react';
import Card from './UI/Card';
import TextInput from './UI/TextInput';
// import MapComponent from './UI/MapComponent';
import Button from './UI/Button';
import HashtagInput from './HashtagInput';
import { createNewGarden } from '@/utils/actions/garden/createNewGarden';
import { useRouter } from 'next/navigation';
import LocationPicker from './UI/LocationPicker';

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
};

const CreateGardenForm = () => {
  // const [location, setLocation] = useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);

  const [gardenLength, setGardenLength] = useState<number>(10);
  const [gardenWidth, setGardenWidth] = useState<number>(10);
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
        authorId: 1,
        name: formData.get('gardenName') as string,
        description: formData.get('gardenDescription') as string,
        latitude: parseFloat(formData.get('latitude') as string),
        longitude: parseFloat(formData.get('longitude') as string),
        length: Number(formData.get('gardenLength')),
        width: Number(formData.get('gardenWidth')),
        privacy: Number(formData.get('gardenPrivacy')),
        type: Number(formData.get('gardenType')),
      };

      console.log('Garden Data:', gardenData);
      createNewGarden(gardenData);
      router.push('/garden-manager');
    } else {
      console.error('Form not found');
    }
  };

  return (
    <>
      <Card className="h-full max-w-screen px-8 pt-5 pb-10">
        <h1 className="text-center text-4xl">Garden Creator</h1>

        <form method="post" id="createGarden" className="flex flex-col">
          <TextInput
            type="text"
            label="Nom du jardin"
            name="gardenName"
            placeholder="Jardin du giga lombric"
            //   error={errorForm.errorEmptyGardenName}
          />
          <label htmlFor="gardenDescription">What is your garden about?</label>
          <textarea
            name="gardenDescription"
            rows={Number(rows)}
            cols={Number(cols)}
            className="rounded-md border-1"
          ></textarea>

          <HashtagInput
            label={'Add some Hashtags to caracterize your garden'}
            name="gardenHashtag"
            placeHolder="#Permaculture"
            error={false}
          ></HashtagInput>

          <label htmlFor="gardenLength">
            Your garden is <span>{gardenLength}</span> meters long
          </label>
          <input
            name="gardenLength"
            type="range"
            min="1"
            max="500"
            step="1"
            onChange={handleLengthChange}
            className={`bg-border mt-5 mr-5 mb-5 ml-5 h-2 cursor-cell appearance-none`}
          />

          <label htmlFor="gardenWidth">
            Your garden is <span>{gardenWidth}</span> meters large
          </label>
          <input
            name="gardenWidth"
            type="range"
            min="1"
            max="500"
            step="1"
            onChange={handleWidthChange}
            className={`bg-border mt-5 mr-5 mb-5 ml-5 h-2 cursor-cell appearance-none`}
          />

          {/* Intégration de la map de localisation du terrain */}
          <LocationPicker
            initialLat={0} //Pour ne pas avoir un pin par défaut
            initialLng={0} //Idem
            //onLocationChange={(lat, lng) => console.log(lat, lng)}
          />

          <label htmlFor="gardenType">What kind of garden is it?</label>
          <select name="gardenType" className="rounded-md border-1">
            <option value="0">Personnal</option>
            <option value="2">Famillial</option>
            <option value="2">Collective</option>
            <option value="3">Professionnal</option>
          </select>

          <label htmlFor="gardenPrivacy">What about privacy settings?</label>
          <select name="gardenPrivacy" className="rounded-md border-1">
            <option value="0">
              Private (Only me and my collaborators can see this garden)
            </option>
            <option value="1">
              Semi private (My followers can see thi garden)
            </option>
            <option value="2">Public (Everybody can see this garden)</option>
          </select>

          {/* <MapComponent onLocationSelect={handleLocationSelect} />

          {location && (
            <div>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
            </div>
          )} */}
          <div className="flex justify-between">
            <Button onClick={() => router.push('/garden-manager')}>Back</Button>
            <Button onClick={handleSubmit}>Create !</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default CreateGardenForm;
