"use client"
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'

type Props = {
    containerName : string;
    className? : string;
    children? : React.ReactNode;
}

const CardHeader = ({containerName, className, children} : Props) => {

    const pageLink = containerName.toLocaleLowerCase()

  return (
<>
<section className={`flex items-center justify-between mt-3 mx-2 ${className}`}>
    <h1 className='text-4xl ml-4 mt-2'>
        {containerName}
    </h1>
    <p>{children}</p>
    <Link href={`/${pageLink}`}>
    <Image className='object-cover ml-2 h-5' src="/image/divers/expand.png" alt="expand" width={20} height={20} />
        </Link>


</section>
</>
  )
}

export default CardHeader