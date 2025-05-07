import { CardProps } from '@/utils/types';
import React from 'react';

const SlimCard: React.FC<CardProps> = ({
  children,
  variant,
  className,
  bgColor,
}) => {
  let bgColorClass = 'bg-white';
  if (bgColor) {
    bgColorClass = bgColor;
  } else {
    bgColorClass = 'bg-white';
  }

  return (
    <section
      className={`relative font-(family-name:--font-jersey) text-2xl ${className}`}
    >
      {/* Bordures */}
      <div className={`absolute top-0 left-0 z-50 h-full w-0.5 bg-black`}></div>
      <div
        className={`absolute top-0 right-0 z-50 h-full w-0.5 bg-black`}
      ></div>
      <div className={`absolute top-0 left-0 z-50 h-0.5 w-full bg-black`}></div>

      {variant === 'bottom' ? null : (
        <>
          <div
            className={`absolute bottom-0 left-0 z-50 h-0.5 w-full bg-black`}
          ></div>
          <div
            className={`absolute bottom-0.5 left-0.5 h-0.5 w-0.5 bg-black`}
          ></div>
          <div
            className={`absolute right-0.5 bottom-0.5 h-0.5 w-0.5 bg-black`}
          ></div>
          <div
            className={`${bgColorClass} absolute right-0 bottom-0 h-0.5 w-0.5`}
          ></div>
          <div
            className={`${bgColorClass} absolute bottom-0 left-0 h-0.5 w-0.5`}
          ></div>
          <div
            className={`${bgColorClass} absolute -bottom-0 left-0.5 z-50 h-0.5 w-0.5`}
          ></div>
          <div
            className={`${bgColorClass} absolute bottom-0.5 left-0 z-50 h-0.5 w-0.5`}
          ></div>
          <div
            className={`${bgColorClass} absolute -bottom-0 left-0 z-50 h-0.5 w-0.5`}
          ></div>
          <div
            className={`${bgColorClass} absolute right-0.5 -bottom-0 z-50 h-0.5 w-0.5`}
          ></div>
          <div
            className={`${bgColorClass} absolute right-0 bottom-0.5 z-50 h-0.5 w-0.5`}
          ></div>
          <div
            className={`${bgColorClass} absolute right-0 -bottom-0 z-50 h-0.5 w-0.5`}
          ></div>
        </>
      )}

      {/* Pixels intérieurs */}
      <div className={`absolute top-0.5 left-0.5 h-0.5 w-0.5 bg-black`}></div>
      <div className={`absolute top-0.5 right-0.5 h-0.5 w-0.5 bg-black`}></div>

      {/* Pixels extérieur */}
      <div
        className={`${bgColorClass} absolute top-0 left-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute top-0 right-0 h-0.5 w-0.5`}
      ></div>

      <div
        className={`${bgColorClass} absolute -top-0 left-0.5 z-50 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute top-0.5 left-0 z-50 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute -top-0 left-0 z-50 h-0.5 w-0.5`}
      ></div>

      <div
        className={`${bgColorClass} absolute -top-0 right-0.5 z-50 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute top-0.5 right-0 z-50 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute -top-0 right-0 z-50 h-0.5 w-0.5`}
      ></div>

      {/* Pixels extérieur */}
      <div
        className={`${bgColorClass} absolute top-0.5 left-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute top-0.5 right-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute bottom-0.5 left-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute right-0 bottom-0.5 h-0.5 w-0.5`}
      ></div>

      {/* Pixels extérieur */}
      <div
        className={`${bgColorClass} absolute top-0 left-0.5 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute top-0 right-0.5 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute bottom-0 left-0.5 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute right-0.5 bottom-0 h-0.5 w-0.5`}
      ></div>

      <div
        className={`${bgColorClass} absolute top-0 left-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute top-0 right-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute bottom-0 left-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`${bgColorClass} absolute right-0 bottom-0 h-0.5 w-0.5`}
      ></div>

      {/* Pixels extérieur corner */}
      <div
        className={`z-0.50 ${bgColorClass} absolute top-0 left-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute top-0 right-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute top-0.5 left-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute top-0 left-0.5 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute top-0 right-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute top-0.5 right-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute top-0 right-0.5 h-0.5 w-0.5`}
      ></div>

      <div
        className={`z-0.50 ${bgColorClass} absolute bottom-0 left-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute right-0 bottom-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute bottom-0.5 left-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute bottom-0 left-0.5 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute right-0 bottom-0 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute right-0 bottom-0.5 h-0.5 w-0.5`}
      ></div>
      <div
        className={`z-0.50 ${bgColorClass} absolute right-0.5 bottom-0 h-0.5 w-0.5`}
      ></div>
      {/* Contenu */}
      {children}
    </section>
  );
};

export default SlimCard;
