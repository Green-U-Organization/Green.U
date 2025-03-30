"use client"
import React, { useState } from 'react'

type Props = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ZoomSlider = ({handleChange}: Props) => {


  return (
<>
<input type="range"
min="50" 
max="200"  
step="10"
onChange={handleChange} 
className=' m-5 h-2 bg-border appearance-none cursor-cell' />
</>
  )
}

export default ZoomSlider