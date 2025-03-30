"use client"
import React, { useState } from 'react'

type Props = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const ZoomSlider = ({handleChange, className}: Props) => {


  return (
<input type="range"
min="50" 
max="200"  
step="10"
onChange={handleChange} 
className={`mt-5 mr-5 mb-5 ml-5 h-2 bg-border appearance-none cursor-cell ${className}`} />
  )
}

export default ZoomSlider