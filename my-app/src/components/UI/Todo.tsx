'use client';

import { TodosProps } from '@/utils/types';
import Image from 'next/image';
import React, { useState } from 'react';

const Todo = ({
  status,
  style,
  content,
  garden,
  parcel,
  line,
  added,
  itemKey,
  id,
  className,
  onStatusChange,
  handleEdit,
}: TodosProps) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    console.log('checked');
    setChecked((prev) => !prev);
    onStatusChange(id, 0);
    //TODO Changer le status dans la DB + faire disparaitre de l'écran pour afficher todo suivant
  };

  return (
    <section
      className={`relative mx-1 col-start-${itemKey + 1} col-end-${itemKey + 2} row-start-2 row-end-7 ${className}`}
      style={style}
    >
      <section
        className={`col-start-${itemKey + 1} col-end-${
          itemKey + 2
        } row-start-2 row-end-7 h-full w-full`}
      >
        <div
          className={`mb-2 w-full rounded-lg border border-gray-200 p-1 shadow-md transition-all hover:shadow-lg ${
            status === 0
              ? 'bg-white'
              : status === 1
                ? 'bg-green-200'
                : status === 2
                  ? 'bg-green-400'
                  : status === 3
                    ? 'bg-yellow-200'
                    : status === 4
                      ? 'bg-yellow-400'
                      : 'bg-red-400'
          } flex flex-col justify-between`}
        >
          {/* Add profile picture from the publishBy props */}
          <p className="text-2xl text-black">{content}</p>
          <p className="text-lg">garden :{garden}</p>
          <p className="text-lg">parcel :{parcel}</p>
          <p className="text-lg">line :{line}</p>
          <p className="mr-2 text-right text-sm text-gray-500">{added}</p>
        </div>
      </section>
      <div
        onClick={handleCheck}
        className="absolute top-1 right-1 h-8 w-8 rounded-md border-2 bg-white"
      ></div>
      <div
        onClick={handleCheck}
        style={{ display: checked || status === 0 ? 'block' : 'none' }}
        className="absolute -top-1 right-2 text-5xl"
      >
        {' '}
        X{' '}
      </div>
      <div
        onClick={handleEdit}
        className="absolute top-10 right-1 h-8 w-8 rounded-md border-2 bg-white"
      >
        <Image src="/image/divers/pen.png" alt="" width={80} height={80} />
      </div>
    </section>
  );
};

export default Todo;
