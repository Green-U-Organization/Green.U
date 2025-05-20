import Image from 'next/image';
import React from 'react';

interface IconProps {
  src: string;
  alt: string;
  handleClick: () => void;
}

const Icon = ({ icon }: { icon: IconProps }) => {
  return (
    <div
      className="m-auto h-8 w-8 rounded-md border-1 p-1"
      onClick={() => icon.handleClick()}
    >
      <Image
        width={50}
        height={50}
        src={icon.src}
        alt={icon.alt}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default Icon;
