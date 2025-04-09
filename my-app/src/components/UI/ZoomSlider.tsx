'use client';
import { ZoomSliderProps } from '@/utils/types';
import React from 'react';

const ZoomSlider = ({ handleChange, className }: ZoomSliderProps) => {
  return (
    <input
      type="range"
      min="10"
      max="200"
      step="10"
      onChange={handleChange}
      className={`bg-border mt-5 mr-5 mb-5 ml-5 h-2 cursor-cell appearance-none ${className}`}
    />
  );
};

export default ZoomSlider;
