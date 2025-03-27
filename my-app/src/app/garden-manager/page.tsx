"use client"

import Card from '@/components/UI/Card'
import CardHeader from '@/components/UI/CardHeader'
import Garden from '@/components/UI/Garden'
import React, { useState } from 'react'

const page = () => {
  const [gardenId, setGardenId] = useState(1)

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setGardenId(Number(e.target.value))
  console.log(gardenId)
}


  return (
<>
<Card >
  <CardHeader containerName={'Garden Manager'} className='p-5'>
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

  <Garden
  gardenId={gardenId}>
    
  </Garden>





</Card>
</>
  )
}

export default page