import { CardProps } from '@/utils/types';
import React from 'react';

const Card: React.FC<CardProps> = ({ children, variant, className }) => {
  return (
    <section
      className={`relative m-auto w-4xl font-(family-name:--font-jersey) text-2xl ${className}`}
    >
      {/* Bordures */}
      <div className="bg-border absolute top-0 left-0 z-50 h-full w-2"></div>
      <div className="bg-border absolute top-0 right-0 z-50 h-full w-2"></div>
      <div className="bg-border absolute top-0 left-0 z-50 h-2 w-full"></div>

      {variant === 'bottom' ? null : (
        <>
          <div className="bg-border absolute bottom-0 left-0 z-50 h-2 w-full"></div>
          <div className="bg-border absolute bottom-2 left-2 h-1 w-1"></div>
          <div className="bg-border absolute right-2 bottom-2 h-1 w-1"></div>
          <div className="absolute right-0 bottom-0 h-1 w-1 bg-white"></div>
          <div className="absolute bottom-0 left-0 h-1 w-1 bg-white"></div>
          <div className="absolute -bottom-0 left-1 z-50 h-1 w-1 bg-white"></div>
          <div className="absolute bottom-1 left-0 z-50 h-1 w-1 bg-white"></div>
          <div className="absolute -bottom-0 left-0 z-50 h-1 w-1 bg-white"></div>
          <div className="absolute right-1 -bottom-0 z-50 h-1 w-1 bg-white"></div>
          <div className="absolute right-0 bottom-1 z-50 h-1 w-1 bg-white"></div>
          <div className="absolute right-0 -bottom-0 z-50 h-1 w-1 bg-white"></div>
        </>
      )}

      {/* Pixels intérieurs */}
      <div className="bg-border absolute top-2 left-2 h-1 w-1"></div>
      <div className="bg-border absolute top-2 right-2 h-1 w-1"></div>

      {/* Pixels extérieur */}
      <div className="absolute top-0 left-0 h-1 w-1 bg-white"></div>
      <div className="absolute top-0 right-0 h-1 w-1 bg-white"></div>

      <div className="absolute -top-0 left-1 z-50 h-1 w-1 bg-white"></div>
      <div className="absolute top-1 left-0 z-50 h-1 w-1 bg-white"></div>
      <div className="absolute -top-0 left-0 z-50 h-1 w-1 bg-white"></div>

      <div className="absolute -top-0 right-1 z-50 h-1 w-1 bg-white"></div>
      <div className="absolute top-1 right-0 z-50 h-1 w-1 bg-white"></div>
      <div className="absolute -top-0 right-0 z-50 h-1 w-1 bg-white"></div>

      {/* Pixels extérieur */}
      <div className="absolute top-1 left-0 h-1 w-1 bg-white"></div>
      <div className="absolute top-1 right-0 h-1 w-1 bg-white"></div>
      <div className="absolute bottom-1 left-0 h-1 w-1 bg-white"></div>
      <div className="absolute right-0 bottom-1 h-1 w-1 bg-white"></div>

      {/* Pixels extérieur */}
      <div className="absolute top-0 left-1 h-1 w-1 bg-white"></div>
      <div className="absolute top-0 right-1 h-1 w-1 bg-white"></div>
      <div className="absolute bottom-0 left-1 h-1 w-1 bg-white"></div>
      <div className="absolute right-1 bottom-0 h-1 w-1 bg-white"></div>

      <div className="absolute top-0 left-0 h-1 w-1 bg-white"></div>
      <div className="absolute top-0 right-0 h-1 w-1 bg-white"></div>
      <div className="absolute bottom-0 left-0 h-1 w-1 bg-white"></div>
      <div className="absolute right-0 bottom-0 h-1 w-1 bg-white"></div>

      {/* Pixels extérieur corner */}
      <div className="absolute top-0 left-0 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute top-0 right-0 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute top-1 left-0 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute top-0 left-1 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute top-0 right-0 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute top-1 right-0 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute top-0 right-1 z-10 h-1 w-1 bg-white"></div>

      <div className="absolute bottom-0 left-0 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute right-0 bottom-0 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute bottom-1 left-0 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute bottom-0 left-1 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute right-0 bottom-0 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute right-0 bottom-1 z-10 h-1 w-1 bg-white"></div>
      <div className="absolute right-1 bottom-0 z-10 h-1 w-1 bg-white"></div>
      {/* Contenu */}
      {children}
    </section>
  );
};

export default Card;
