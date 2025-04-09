'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC, PropsWithChildren } from 'react';
import { BentoCardHeaderProps } from '@/utils/types';

const BentoCardHeader: FC<PropsWithChildren<BentoCardHeaderProps>> = ({
  containerName,
  className,
  children,
}) => {
  const pageLink = containerName.toLocaleLowerCase();

  return (
    <section
      className={`mx-2 mt-3 flex items-center justify-between ${className}`}
    >
      <h1 className="mt-2 ml-4 text-4xl">{containerName}</h1>
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
