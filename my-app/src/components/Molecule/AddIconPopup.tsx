import React from 'react';

const AddIconPopup = () => {
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
      {iconList.map((icon, key) => (
        <img src={icon} alt={`icon-${key}`} />
      ))}
    </div>
  );
};

export default AddIconPopup;
