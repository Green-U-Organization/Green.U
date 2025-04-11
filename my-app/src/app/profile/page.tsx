'use client';
import Image from 'next/image';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AvatarSelector from '@/components/AvatarSelector';
import { useLanguage } from '../contexts/LanguageProvider';
import { supabase } from '@/lib/supabaseClient';

export default function GardenerProfile() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false);
  const { translations } = useLanguage();

  // Simuler les données d'XP, de badges et de likes
  const xp = 500; // XP actuel (NE PAS DEPASSER LE maxXp!!!)
  const maxXp = 500; // XP nécessaire pour le niveau max
  //const likes = 120 // Nombre de likes

  // Définition des badges en fonction du niveau d'XP
  const badges = [
    { level: 100, name: `🌱 ${translations.level1}` },
    { level: 200, name: `🌿 ${translations.level2}` },
    { level: 300, name: `🌻 ${translations.level3}` },
    { level: 500, name: `🌳 ${translations.level4}` },
  ];

  //Détermination des badges débloqués
  const unlockedBadges = badges.filter((badge) => xp >= badge.level);

  // Liste des jardins où il est actif
  const gardens = [
    { name: 'Community Garden', role: 'Volunteer' },
    { name: 'Eco-Permaculture Project', role: 'Lead Gardener' },
    { name: 'Urban Rooftop Garden', role: 'Consultant' },
  ];

  //IL FAUDRA RECUPERER L'URL DE L'AVATAR DANS LA TABLE USER
  // Permet de récupérer l'image dans le storage supabase
  useEffect(() => {
    const filePath = 'avatars/1743969461173_profile.png';
    if (filePath) {
      const { publicUrl } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath).data;
      setAvatarUrl(publicUrl);
    }
  }, []);

  return (
    <div className="flex items-center justify-center">
      {/* Sélecteur d'avatar */}
      {isAvatarSelectorOpen ? (
        <>
          <AvatarSelector
            onSelect={setAvatar}
            isOpen={isAvatarSelectorOpen}
            onClose={() => setIsAvatarSelectorOpen(false)}
          />
        </>
      ) : (
        <Card className="flex max-w-5xl flex-col p-5">
          <div id="profilePage">
            {/* Image du profil */}
            <div className="relative flex items-center space-x-4">
              <Image
                src={avatarUrl || '/image/avatars/PI_01.png'} //ou avatar pour les avatars prédéfinis
                alt="Profile picture"
                width={96}
                height={96}
                className="border-border relative rounded-full border-4"
              />

              {/* Bouton pour ouvrir le sélecteur d'avatar */}
              <Image
                src="/image/divers/PI_blank.png"
                alt="Change Avatar"
                width={32}
                height={32}
                className="bg-bginput border-border absolute mt-20 ml-15 cursor-pointer rounded-full border-3"
                onClick={() => setIsAvatarSelectorOpen(true)}
              />

              <div>
                <h1 className="text-3xl font-bold">Jean Dupont</h1>
                <p className="text-shadow flex items-center gap-1">
                  <FaMapMarkerAlt /> 1000-Bruxelles
                </p>
              </div>
            </div>

            {/* Présentation */}
            <p className="mt-5 text-gray-700">
              Passionate about gardening for 10 years, I love experimenting with
              permaculture and helping the community create sustainable gardens.
            </p>

            {/* XP et Badges */}
            <div className="mt-5">
              <h2 className="text-2xl font-semibold">
                🏆 {translations.xpandbadges}
              </h2>

              {/* Barre d'XP */}
              <div className="bg-bgbutton mt-2 h-4 w-full rounded-full">
                <div
                  className="h-4 rounded-full bg-green-500"
                  style={{ width: `${(xp / maxXp) * 100}%` }}
                ></div>
              </div>
              <p className="mt-1 text-gray-700">
                {xp} / {maxXp} XP
              </p>

              {/* Badges débloqués */}
              <div className="mt-3 flex flex-wrap gap-2">
                {unlockedBadges.map((badge, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-green-900 px-3 py-1 text-2xl text-gray-300"
                  >
                    {badge.name}
                  </span>
                ))}
              </div>
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
                {/* ROUTE A AJOUTER AVEC L'ID DU JARDIN POUR Y ACCEDER */}
                {gardens.map((garden, index) => (
                  <a
                    key={index}
                    href={`/garden/${index}`}
                    className="bg-bgbutton block rounded-lg border border-gray-200 p-4 shadow-md transition-all hover:shadow-lg"
                  >
                    <h3 className="text-lg font-semibold text-green-700">
                      {garden.name}
                    </h3>
                    <p className="text-sm text-gray-500">{garden.role}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Compétences */}
            <div className="mt-5">
              <h2 className="text-2xl font-semibold">
                🌱{translations.specialties}
              </h2>
              <ul className="list-inside list-disc text-gray-700">
                <li>Permaculture & organic vegetable gardens</li>
                <li>Creation and maintenance of gardens</li>
                <li>Composting and natural recycling</li>
              </ul>
            </div>

            {/* Réalisations */}
            <div className="mt-5">
              <h2 className="text-2xl font-semibold">
                🏡 {translations.achievements}
              </h2>
              <p className="text-gray-700">
                I recently set up a community vegetable garden and designed an
                ecological pond attracting local biodiversity.
              </p>
            </div>

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
              <Button onClick={() => router.push('/login')}>
                {translations.back}
              </Button>
              {/* ID DU USER A TRANSMETTRE POUR L'EDITION DU PROFILE */}
              <Button onClick={() => router.push('/editProfile')}>
                {translations.edit}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
