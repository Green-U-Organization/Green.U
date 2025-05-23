'use client';
import Link from 'next/link';
import React, { FC, PropsWithChildren } from 'react';
import { BentoCardHeaderProps } from '@/utils/types';
import H2 from '../Atom/H2';

const BentoCardHeader: FC<PropsWithChildren<BentoCardHeaderProps>> = ({
  containerName,
  className,
  children,
  pageLink,
}) => {
  //Variables
  const pageLinkClass = pageLink;

  return (
    <Link href={`/${pageLinkClass}`}>
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
