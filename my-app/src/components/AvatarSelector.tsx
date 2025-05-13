import Image from 'next/image';
import Card from '@/components/Atom/Card';
import Button from '@/components/Atom/Button';
import { useLanguage } from '../app/contexts/LanguageProvider';
// import AvatarUpload from './AvatarUpload';
//import { useState } from "react";

const avatars = [
  '/image/avatars/PI_01.png',
  '/image/avatars/PI_02.png',
  '/image/avatars/PI_03.png',
  '/image/avatars/PI_04.png',
  '/image/avatars/PI_05.png',
  '/image/avatars/PI_06.png',
  '/image/avatars/PI_07.png',
  '/image/avatars/PI_08.png',
  '/image/avatars/PI_09.png',
  '/image/avatars/PI_10.png',
  '/image/avatars/PI_11.png',
  '/image/avatars/PI_12.png',
  '/image/avatars/PI_13.png',
  '/image/avatars/PI_14.png',
  '/image/avatars/PI_15.png',
  '/image/avatars/PI_16.png',
  '/image/avatars/PI_17.png',
  '/image/avatars/PI_18.png',
  '/image/avatars/PI_19.png',
  '/image/avatars/PI_20.png',
  '/image/avatars/PI_21.png',
  '/image/avatars/PI_22.png',
  '/image/avatars/PI_23.png',
  '/image/avatars/PI_24.png',
  '/image/avatars/PI_25.png',
  '/image/avatars/PI_26.png',
  '/image/avatars/PI_27.png',
  '/image/avatars/PI_28.png',
  '/image/avatars/PI_29.png',
  '/image/avatars/PI_30.png',
  '/image/avatars/PI_31.png',
  '/image/avatars/PI_32.png',
  '/image/avatars/PI_33.png',
  '/image/avatars/PI_34.png',
  '/image/avatars/PI_35.png',
  '/image/avatars/PI_36.png',
  '/image/avatars/PI_37.png',
  '/image/avatars/PI_38.png',
  '/image/avatars/PI_39.png',
  '/image/avatars/PI_40.png',
  '/image/avatars/PI_41.png',
  '/image/avatars/PI_42.png',
  '/image/avatars/PI_43.png',
  '/image/avatars/PI_44.png',
];

interface AvatarSelectorProps {
  onSelect: (avatar: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

function AvatarSelector({ onSelect, isOpen, onClose }: AvatarSelectorProps) {
  if (!isOpen) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { translations } = useLanguage();

  return (
    <div className="bg-opacity-50 z-50 flex items-center justify-center bg-white">
      <Card className="bg-cardbackground relative max-h-screen w-150 max-w-screen rounded-xl p-4 shadow-lg">
        <h2 className="bg-cardbackground sticky top-0 z-10 py-2 text-center text-3xl font-semibold">
          {translations.chooseanavatar}
        </h2>

        <div className="grid max-h-55 grid-cols-4 gap-2 overflow-y-auto p-2">
          {avatars.map((avatar) => (
            <div
              key={avatar}
              className="cursor-pointer rounded-lg p-2"
              onClick={() => {
                onSelect(avatar);
                onClose();
              }}
            >
              <Image
                src={avatar}
                alt="Avatar"
                width={96}
                height={96}
                className="border-border relative rounded-full border-2 hover:border-4"
              />
            </div>
          ))}
        </div>

        {/* <AvatarUpload /> */}

        <div className="sticky flex justify-center">
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            onClick={onClose}
          >
            {translations.close}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default AvatarSelector;
