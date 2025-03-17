"use client"

import React, { useState } from 'react'
import Card from './Card'

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    position?: string;
}

const Button: React.FC<ButtonProps> = ({children, onClick, position}) => {
    const [buttonPush, setButtonPush] = useState(false);
    
    const handleDown = () => setButtonPush(true);
    const handleUp = () => {
        setTimeout(() => setButtonPush(false),80);
    }

    return (
        <div 
            className={`relative ${position} select-none`}
            onMouseDown={handleDown}
            onMouseUp={handleUp}
            onMouseLeave={handleUp}
            onClick={onClick}
        >

            <div className={`relative m-10 z-2 transition-all ${buttonPush ? "translate-y-2" : ""}`}>
                {/*Suppression des pixels supérieurs*/}
                <div className="absolute top-0 left-1 h-1 w-1 bg-white"></div>
                <div className="absolute -bottom-2 left-0 h-2 w-1 bg-white"></div>
                <div className="absolute top-0 right-1 h-1 w-1 bg-white"></div>
                <div className="absolute -bottom-2 right-0 h-2 w-1 bg-white"></div>            
            </div>

            <Card className={`flex items-center justify-center text-center w-auto transition-all ${buttonPush ? "translate-y-2" : ""}`}>
                <p>
                    {children}
                </p>
            </Card>
            
            <div className={`relative m-10 transistion-transform duration-150 ease-out ${buttonPush ? "translate-y-2" : ""}`}>
                {/*Suppression des pixels inférieurs*/}
                <div className={`absolute -top-11 left-1 h-1 w-1 ${buttonPush ? "bg-white" : "bg-amber-600"}`}  ></div>
                <div className={`absolute bottom-10 left-0 h-2 w-1 ${buttonPush ? "bg-white" : "bg-amber-600 border-l-1 border-b-1"}`}  ></div>
                <div className={`absolute -top-11 right-1 h-1 w-1 ${buttonPush ? "bg-white" : "bg-amber-600 "}`}  ></div>
                <div className={`absolute bottom-10 right-0 h-2 w-1 ${buttonPush ? "bg-white" : "bg-amber-600 border-r-1 border-b-1"}`}  ></div> 

                {/* //pixel manquant extérieur bordure basse  */}
                <div className={`absolute -top-10 left-0 bg-white h-1 w-1 ${buttonPush ? "" : "border-r-1 z-1"}`}></div>
                <div className={`absolute -top-10 right-0 bg-white h-1 w-1 ${buttonPush ? "" : "border-l-1 z-1"}`}></div>
                
                <div className={`absolute -top-9 right-1 bg-white h-1 w-1 ${buttonPush ? "" : "border-l-1 border-t-1 z-1"}`}></div>
                <div className={`absolute -top-9 left-1 bg-white h-1 w-1 ${buttonPush ? "" : "border-r-1 border-t-1 z-2"}`}></div>
                
                <div className={`absolute -top-9 left-0 bg-white h-1 w-1 z-1`}></div>
                <div className={`absolute -top-9 right-0 bg-white h-1 w-1 z-1`}></div>

                {/*Ligne d'ombrage */}
                <div className={`absolute ${buttonPush ? "hidden" : "bottom-8 border-b-1 border-r-1" } left-0 h-2 w-full bg-amber-600 `}></div>   
            </div>
        </div>
     )
}

export default Button
