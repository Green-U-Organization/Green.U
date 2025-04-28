import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="mt-[1vh] flex w-full items-center justify-center">
      <Image
        src={'/image/divers/gifs/loading.gif'}
        alt={'Loading...'}
        width={50}
        height={50}
      ></Image>
    </div>
  );
};

export default Loading;
