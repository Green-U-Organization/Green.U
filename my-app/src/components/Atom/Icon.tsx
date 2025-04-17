import React from 'react';
import Image from 'next/image';

interface IconProps {
  src: string;
  alt: string;
  handleClick: () => void;
}

const Icon = ({ icon }: { icon: IconProps }) => {
  return (
    <div
      className="m-auto h-8 w-8 rounded-md border-1 p-1"
      style={{ height: '80%' }}
      onClick={() => icon.handleClick()} // Gestion du clic
    >
      <Image
        src={icon.src}
        alt={icon.alt}
        width={8}
        height={32}
        style={{ height: '100%', width: '100%' }} // Ajustement pour occuper tout l'espace
      />
    </div>
  );
};

export default Icon;
