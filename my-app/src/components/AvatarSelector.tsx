import { useState } from "react";
import Image from "next/image";
import Card from "@/components/Card"
import Button from "@/components/Button"
import { useLanguage } from '../app/contexts/LanguageProvider'

const avatars = [
  "/image/avatars/PI_01.png",
  "/image/avatars/PI_02.png",
  "/image/avatars/PI_03.png",
  "/image/avatars/PI_04.png",
  "/image/avatars/PI_05.png",
  "/image/avatars/PI_06.png",
  "/image/avatars/PI_07.png",
  "/image/avatars/PI_08.png",
  "/image/avatars/PI_09.png",
  "/image/avatars/PI_10.png",
  "/image/avatars/PI_11.png",
  "/image/avatars/PI_12.png",
  "/image/avatars/PI_13.png",
  "/image/avatars/PI_14.png",
  "/image/avatars/PI_15.png",
  "/image/avatars/PI_16.png",
  "/image/avatars/PI_17.png",
  "/image/avatars/PI_18.png",
  "/image/avatars/PI_19.png",
  "/image/avatars/PI_20.png",
  "/image/avatars/PI_21.png",
  "/image/avatars/PI_22.png",
  "/image/avatars/PI_23.png",
  "/image/avatars/PI_24.png",
  "/image/avatars/PI_25.png",
  "/image/avatars/PI_26.png",
  "/image/avatars/PI_27.png",
  "/image/avatars/PI_28.png",
  "/image/avatars/PI_29.png",
  "/image/avatars/PI_30.png",
];

interface AvatarSelectorProps {
  onSelect: (avatar: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

function AvatarSelector({ onSelect, isOpen, onClose }: AvatarSelectorProps) {
  
  if (!isOpen) return null;

  const {translations} = useLanguage();

  return (
 
  <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
  
    <Card className="relative w-150 max-w-full bg-cardbackground rounded-xl shadow-lg p-4">
  
      {/* Titre fixé en haut */}
      <h2 className="text-center text-3xl font-semibold sticky top-0 bg-cardbackground py-2 z-10">
        {translations.chooseanavatar}
      </h2>
      
      <div className="max-h-90 overflow-y-auto p-2 grid grid-cols-4 gap-2">
        {avatars.map((avatar) => (
          <div
            key={avatar}
            className="p-2 rounded-lg cursor-pointer"
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
              className="relative rounded-full border-2 border-border hover:border-4"
          />
          </div>
        ))}
      </div>
          
      <div className="flex justify-center sticky">
        <Button type="submit" onClick={onClose}>
          {translations.close}
        </Button>
      </div>

    </Card>

  </div>
  )
}

export default AvatarSelector;
