import React from 'react';
import Image from 'next/image';

const AddIconPopup = () => {
  //Variables
  const iconList = [
    '/image/assets/vegetables/icon/broccoli.png',
    '/image/assets/vegetables/icon/cabbage.png',
    '/image/assets/vegetables/icon/carrot.png',
    '/image/assets/vegetables/icon/celery.png',
    '/image/assets/vegetables/icon/corn.png',
    '/image/assets/vegetables/icon/eggplant.png',
    '/image/assets/vegetables/icon/green_bean.png',
    '/image/assets/vegetables/icon/lettuce.png',
    '/image/assets/vegetables/icon/onion.png',
    '/image/assets/vegetables/icon/potato.png',
    '/image/assets/vegetables/icon/tomato.png',
  ];

  return (
    <div className="flex flex-wrap">
      {iconList.map((icon, index) => (
        <Image
          width={50}
          height={50}
          src={icon}
          alt={`icon-${index}`}
          key={index * Math.random() * 100 * Math.random()}
        />
      ))}
    </div>
  );
};

export default AddIconPopup;
