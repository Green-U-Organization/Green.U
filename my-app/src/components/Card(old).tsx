"use client";

import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const Card = ({children} : Props) => {
  return (
    <>
    <div className='relative m-10'>
      <div className="font-(family-name:--font-jersey) text-2xl py-2 px-6 relative bg-amber-200">
            {/*Bordures*/}
            <div className={`absolute top-0 left-0 h-2 w-full bg-amber-500`}></div>
            <div className={`absolute bottom-0 left-0 h-2 w-full bg-amber-500`}></div>
            <div className={`absolute top-0 right-0 h-full w-2 bg-amber-500`}></div>
            <div className={`absolute top-0 left-0 h-full w-2 bg-amber-500`}></div>
            <div className={`absolute -bottom-2 left-0 border-b-1 bg-amber-600 h-2 w-full`}></div>
            
            {/*Pixels intérieurs*/}
            <div className={`absolute top-2 left-2 h-1 w-1 bg-amber-500`}></div>
            <div className={`absolute top-2 right-2 h-1 w-1 bg-amber-500`}></div>
            <div className={`absolute bottom-2 left-2 h-1 w-1 bg-amber-500`}></div>
            <div className={`absolute bottom-2 right-2 h-1 w-1 bg-amber-500`}></div>
        
            {/*Pixels à supprimer en haut à gauche*/}
            <div className={`absolute top-0 left-0 bg-white h-1 w-1`}></div>
            <div className={`absolute top-1 left-0 bg-white h-1 w-1`}></div>
            <div className={`absolute top-0 left-1 bg-white h-1 w-1`}></div>

            {/*Pixels à supprimer en haut à droite*/}
            <div className={`absolute top-0 right-0 bg-white h-1 w-1`}></div>
            <div className={`absolute top-1 right-0 bg-white h-1 w-1`}></div>
            <div className={`absolute top-0 right-1 bg-white h-1 w-1`}></div>

            {/*Pixels manquants extérieur bordure gauche basse*/}
            <div className={`absolute bottom-1 border-l-1 left-0 bg-amber-600 h-1 w-1`}></div>
            <div className={`absolute bottom-0 border-l-1 border-b-1 left-0 bg-amber-600 h-1 w-1 `}></div>
            <div className={`absolute bottom-0 left-1 bg-amber-600 h-1 w-1`}></div>  

            {/*Pixels manquants extérieur bordure droite basse*/}
            <div className={`absolute bottom-1 border-r-1 right-0 bg-amber-600 h-1 w-1 `}></div>
            <div className={`absolute bottom-0 right-1 bg-amber-600 h-1 w-1`}></div>
            <div className={`absolute bottom-0 border-r-1 border-b-1 right-0 bg-amber-600 h-1 w-1 `}></div>
        
            {/*Pixels manquants extérieur bordure gauche basse*/}
            <div className={`absolute border-r-1 -bottom-1 left-0 bg-white h-1 w-1 `} ></div>
            <div className={`absolute border-b-1 -bottom-1 left-1 bg-amber-600 h-1 w-1`}></div>
            <div className={`absolute border-r-1 -bottom-2 left-1 bg-white h-1 w-1 `} ></div>
            <div className={`absolute -bottom-2 left-0 bg-white h-1 w-1 `}></div>

            {/*Pixels manquants extérieur bordure droite basse*/}
            <div className={`absolute border-l-1 -bottom-1 right-0 bg-white h-1 w-1 `} ></div>
            <div className={`absolute border-b-1 -bottom-1 right-1 bg-amber-600 h-1 w-1`}></div>
            <div className={`absolute border-l-1 -bottom-2 right-1 bg-white h-1 w-1 `} ></div>
            <div className={`absolute -bottom-2 right-0 bg-white h-1 w-1`} ></div>

            <p className={`relative top-0 text-nowrap}`}>
                {children}
            </p>
        </div>
    </div>
    </>
  );
};

export default Card;
