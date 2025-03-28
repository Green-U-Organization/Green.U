"use client"
import React, { useState } from 'react'

type Props = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ZoomSlider = ({handleChange}: Props) => {


  return (
<>
<input type="range"
min="10" 
max="1000"  
step="50"
onChange={handleChange} 
className=' m-5 h-2 bg-border appearance-none cursor-cell' />
</>
  )
}

export default ZoomSlider