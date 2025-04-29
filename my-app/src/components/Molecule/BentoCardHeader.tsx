'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC, PropsWithChildren } from 'react';
import { BentoCardHeaderProps } from '@/utils/types';
import H1 from '../Atom/H1';
import H2 from '../Atom/H2';

const BentoCardHeader: FC<PropsWithChildren<BentoCardHeaderProps>> = ({
  containerName,
  className,
  children,
}) => {
  //Variables
  const pageLink = containerName.toLocaleLowerCase();

  return (
    <Link href={`/${pageLink}`}>
      <section
        className={`mx-2 mt-3 flex items-center justify-between ${className}`}
      >
        <H2>{containerName}</H2>
        <p>{children}</p>
      </section>
    </Link>
  );
};

export default BentoCardHeader;
