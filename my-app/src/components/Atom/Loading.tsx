import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <Image src={'/image/divers/gifs/loading.gif'} alt={'Loading...'}></Image>
  );
};

export default Loading;
