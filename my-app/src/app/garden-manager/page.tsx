"use client"

import Card from '@/components/UI/Card'
import CardHeader from '@/components/UI/CardHeader'
import Garden from '@/components/UI/Garden'
import ZoomSlider from '@/components/UI/ZoomSlider'
import React, { useState } from 'react'

const page = () => {
  const [gardenId, setGardenId] = useState(1)
  const [scale, setScale] = useState(100)

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
    console.log(scale)
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGardenId(Number(e.target.value))
    console.log(gardenId)
  }


  return (
    <>
      <section className='flex items-center justify-center'>
        <Card className='min-w-screen overflow-auto'>
          <CardHeader containerName={'Garden Manager'} className='p-5 flex flex-col items-center'>
            <ZoomSlider handleChange={handleScaleChange} ></ZoomSlider>
            Please choose your garden :
            <select
              onChange={handleChange}
              name="garden" id="gardenId">
              <option value="1">Jardin 1</option>
              <option value="2">Jardin 2</option>
              <option value="3">Jardin 3</option>
              <option value="4">Jardin 4</option>
              <option value="5">Jardin 5</option>
            </select>
          </CardHeader>

          <div className="overflow-x-auto max-w-full">
            <Garden
              gardenId={gardenId}
              scale={scale}  >
            </Garden>
          </div>
        </Card>
      </section>
    </>
  )
}

export default page