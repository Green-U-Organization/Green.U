/* eslint-disable @next/next/no-img-element */
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
      <img
        src={icon.src}
        alt={icon.alt}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default Icon;
