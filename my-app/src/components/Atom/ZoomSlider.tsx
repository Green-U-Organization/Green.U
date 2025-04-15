'use client';
import { ZoomSliderProps } from '@/utils/types';
import { useGardenList } from '../../app/hooks/useGardenList';

import React from 'react';

const ZoomSlider = ({ className }: ZoomSliderProps) => {
  const { scale, setScale } = useGardenList(1); //IL FAUDRA CHOPPER L'ID du USER DANS LES COOKIES !!!!!!!!

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedScale = Number(e.target.value);
    setScale(selectedScale);
  };

  return (
    <input
      type="range"
      min="10"
      max="200"
      step="10"
      value={scale} // PAS SUR DE CA...
      onChange={handleScaleChange}
      className={`bg-border h-2 cursor-cell appearance-none ${className}`}
    />
  );
};

export default ZoomSlider;
