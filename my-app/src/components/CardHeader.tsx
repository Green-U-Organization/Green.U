"use client"
import Link from 'next/link';
import React, { FormEvent, useState, useEffect } from 'react'

type Props = {
    containerName : string;
    className? : string
}

const CardHeader = ({containerName, className} : Props) => {

    const pageLink = containerName.toLocaleLowerCase()

  return (
<>
<section className={`flex items-center justify-between mt-3 mx-2 ${className}`}>
    <h1 className='text-4xl ml-4 mt-2'>
        {containerName}
    </h1>
        <Link href={`/${pageLink}`}>
    <img className='object-cover ml-2 h-5' src="/image/divers/expand.png" alt="expand" />
        </Link>


</section>
</>
  )
}

export default CardHeader