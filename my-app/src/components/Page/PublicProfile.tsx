/* eslint-disable @next/next/no-img-element */
'use client';
import {
  useGetAllGardenByUserIdQuery,
  useGetTagsByUserQuery,
  useGetUserByIdQuery,
} from '@/slice/fetch';
import React from 'react';
import Cookies from 'js-cookie';
import Card from '../Atom/Card';
import { FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import Button from '../Atom/Button';
import { useRouter } from 'next/navigation';
import {
  clearSelectedGarden,
  setSelectedGarden,
} from '@/redux/garden/gardenSlice';
import { setSelectedGardenCookies } from '@/utils/selectedGardenCookies';
import SlimCard from '../Atom/SlimCard';
import H2 from '../Atom/H2';
import { useDispatch } from 'react-redux';

const PublicProfile = () => {
  const { translations } = useLanguage();

  //Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const id = Number(userCookie?.id);

  //RTK Query
  const user = useGetUserByIdQuery({ userId: id });
  const gardens = useGetAllGardenByUserIdQuery({ userId: id });
  const userInterestTags = useGetTagsByUserQuery({ userId: id });

  const level = Math.ceil(Number(user?.data?.content.xp) / 100);

  return (
    <div className="flex items-center justify-center">
      <Card className="bg-cardbackground flex max-w-5xl flex-col p-5">
        <div id="profilePage">
          {/* Image du profil */}
          <div className="relative flex items-center space-x-4">
            {/* <Image
                    src={avatarUrl || '/image/avatars/PI_01.png'} //ou avatar pour les avatars prédéfinis
                    alt="Profile picture"
                    width={96}
                    height={96}
                    className="border-border relative rounded-full border-4"
                  /> */}

            {/* Bouton pour ouvrir le sélecteur d'avatar */}
            {/* <Image
                    src="/image/divers/PI_blank.png"
                    alt="Change Avatar"
                    width={32}
                    height={32}
                    className="bg-bginput border-border absolute mt-20 ml-15 cursor-pointer rounded-full border-3"
                    onClick={() => setIsAvatarSelectorOpen(true)}
                  /> */}

            <div>
              <h1 className="text-3xl font-bold">
                {user?.data?.content.username}
              </h1>
            </div>
          </div>

          {/* Présentation */}

          <p className="mt-5 text-gray-700">{user?.data?.content.bio}</p>

          {/* XP */}
          <div className="mt-5">
            <h2 className="text-2xl font-semibold">🏆 {translations.xp}</h2>

            {/* Barre d'XP */}
            <div className="bg-bgbutton mt-2 h-4 w-full rounded-full">
              <div
                className="h-4 rounded-full bg-green-500"
                style={{
                  width: `${Number(user?.data?.content.xp) - (level - 1) * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between">
              <p className="mt-1 text-gray-700">
                {Number(user?.data?.content.xp) - (level - 1) * 100} / 100 XP
              </p>
              <p className="mt-1 text-gray-700">Level: {level}</p>
            </div>

            {/* Badges débloqués */}
            {/* <div className="mt-3 flex flex-wrap gap-2">
                    {unlockedBadges.map((badge, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-green-900 px-3 py-1 text-2xl text-gray-300"
                      >
                        {badge.name}
                      </span>
                    ))}
                  </div> */}
          </div>

          {/* Likes */}
          {/* <div className="mt-5 flex items-center gap-2">
                        <FaHeart className="text-red-500" />
                        <p className="text-gray-700 font-semibold">{likes} Likes</p>
                    </div> */}

          {/* Liste des jardins */}
          <div className="mt-5">
            <h2 className="mb-2 text-2xl font-semibold">
              🌿 {translations.participating}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {id &&
                gardens?.data?.content.map((garden) => (
                  <SlimCard
                    bgColor="bg-cardbackground"
                    className="bg-parcel mt-[2vh] ml-[0vw] flex min-h-[5vh] w-[90vw] flex-col justify-center"
                    key={garden.id}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        onClick={() => {
                          dispatch(setSelectedGarden(garden));
                          clearSelectedGarden();
                          setSelectedGardenCookies(garden);
                          router.push('/garden/display');
                        }}
                        className="flex w-[80vw] flex-col"
                      >
                        <H2>{garden.name}</H2>
                        <p className="ml-[5vw] italic">{garden.description}</p>
                      </div>

                      <img
                        // onClick={handleConfigurationClick}
                        className="image mr-[5vw] h-[10vw] w-[10vw] object-contain"
                        src={
                          garden.privacy > 0
                            ? '/image/icons/lockOpen.png'
                            : '/image/icons/lockClose.png'
                        }
                        alt=""
                      />
                    </div>
                  </SlimCard>
                ))}
            </div>
          </div>

          {/* Intérêts */}
          <div className="mt-5">
            <h2 className="text-2xl font-semibold">
              🌱{translations.interests}
            </h2>
            <div className="flex list-inside list-disc flex-wrap text-gray-700">
              {/* Liste des hashtags */}
              {userInterestTags?.data?.content.map((hashtag) => (
                <div key={hashtag} className="mx-1">
                  <SlimCard
                    bgColor="bg-bgcard"
                    className="flex justify-center bg-amber-200 px-2"
                  >
                    <p>{hashtag}</p>
                  </SlimCard>
                </div>
              ))}
            </div>
          </div>

          {/* Réalisations
          <div className="mt-5">
            <h2 className="text-2xl font-semibold">
              🏡 {translations.achievements}
            </h2>
            <p className="text-gray-700">
              I recently set up a community vegetable garden and designed an
              ecological pond attracting local biodiversity.
            </p>
          </div> */}

          {/* Réseaux Sociaux */}
          <div className="mt-5">
            <h2 className="text-2xl font-semibold">
              📢 {translations.contact}
            </h2>
            <div className="text-border mt-2 flex space-x-4">
              {/*
                        <a href="#" target='_blank' className="hover:text-shadow"><FaInstagram /></a>
                        <a href="#" target='_blank' className="hover:text-shadow"><FaFacebook /></a>
                        */}
              <a
                href="mailto:jean.dupont@gmail.com"
                className="hover:text-shadow"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="mt-auto flex justify-center p-2">
            {/* A VOIR SI C'EST NECESSAIRE ET OU ALLER */}
            <Button
              className="bg-bgbutton relative m-5 px-6 py-2"
              onClick={() => router.push('/login')}
            >
              {translations.back}
            </Button>
            {/* ID DU USER A TRANSMETTRE POUR L'EDITION DU PROFILE */}
            {/* <Button onClick={() => router.push('/editProfile')}>
                    {translations.edit}
                  </Button> */}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PublicProfile;
