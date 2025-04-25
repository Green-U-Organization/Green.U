'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC, PropsWithChildren } from 'react';
import { BentoCardHeaderProps } from '@/utils/types';
import H1 from '../Atom/H1';

const BentoCardHeader: FC<PropsWithChildren<BentoCardHeaderProps>> = ({
  containerName,
  className,
  children,
}) => {
  //Variables
  const pageLink = containerName.toLocaleLowerCase();

  return (
    <section
      className={`mx-2 mt-3 flex items-center justify-between ${className}`}
    >
      <H1>{containerName}</H1>
      <p>{children}</p>
      <Link href={`/${pageLink}`}>
        <Image
          className="ml-2 h-5 object-cover"
          src="/image/divers/expand.png"
          alt="expand"
          width={20}
          height={20}
        />
      </Link>
    </section>
  );
};

export default BentoCardHeader;
