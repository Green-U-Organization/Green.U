'use client';
import { ZoomSliderProps } from '@/utils/types';
import { useGardenList } from '../../app/hooks/useGardenList';

import React from 'react';

const ZoomSlider = ({ className }: ZoomSliderProps) => {
  //Local State
  const { scale, setScale } = useGardenList(1); //IL FAUDRA CHOPPER L'ID du USER DANS LES COOKIES !!!!!!!!

  //Handlers
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedScale = Number(e.target.value);
    setScale(selectedScale);
  };

  return (
    <>
      <p onClick={() => setScale(scale + 5)}>+</p>
      <input
        type="range"
        min="10"
        max="200"
        step="10"
        value={scale} // PAS SUR DE CA...
        onChange={handleScaleChange}
        className={`bg-border h-2 cursor-cell appearance-none ${className}`}
      />
      <p onClick={() => setScale(scale - 5)}>-</p>
    </>
  );
};

export default ZoomSlider;
