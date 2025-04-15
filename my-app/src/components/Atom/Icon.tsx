import React from 'react';

interface IconProps {
  src: string;
  alt: string;
  handleClick: () => void;
}

const Icon = ({ icon }: { icon: IconProps }) => {
  return (
    <img
      className="m-auto h-8 w-8 rounded-md border-1 p-1"
      src={icon.src}
      alt={icon.alt}
      height="80%"
      onClick={() => icon.handleClick()}
    />
  );
};

export default Icon;
