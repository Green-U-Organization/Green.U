"use client"

import { Chicle } from 'next/font/google'
import Link from 'next/link';
import React, { FormEvent, useState } from 'react'

type Props = {
    children: React.ReactNode;
    href: string;
    type: "link" | "submit";
    handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const Button = ({children,
                 href,
                type,
                handleSubmit

            } : Props) => {
    const [buttonPush, setButtonPush] = useState(false)

    const handleDown = () => {
        setButtonPush(true)
        if(type === "link"){

        }
        if(type === "submit"){
            handleSubmit
        }
    }
    const handleUp = () => {
        setButtonPush(false)
    }

    return (
        
        
            type === "link" ? (
                <Link href={href}>
                    <button className={`font-(family-name:--font-jersey) text-2xl py-2 px-6 relative bg-amber-200 m-5`}
                    onMouseDown={handleDown}
                    onMouseUp={handleUp}
                    onMouseLeave={handleUp}>
    
                    <div className={`absolute -top-0 left-0 h-2 w-full bg-white`} style={{ display: buttonPush ? "block" : "none" }}></div>
    
                    {/* bordure de base */}
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 h-full w-2 bg-amber-500`}></div>
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-0 h-full w-2 bg-amber-500`}></div>
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 h-2 w-full bg-amber-500`}></div>
                    <div className={`absolute ${buttonPush ? "-bottom-2" : "bottom-0"} left-0 h-2 w-full bg-amber-500`}></div>
    
                    {/* pixel intérieur */}
                    <div className={`absolute ${buttonPush ? "top-4" : "top-2"} left-2 h-1 w-1 bg-amber-500`}></div>
                    <div className={`absolute ${buttonPush ? "top-4" : "top-2"} right-2 h-1 w-1 bg-amber-500`}></div>
                    <div className={`absolute ${buttonPush ? "bottom-0" : "bottom-2"} left-2 h-1 w-1 bg-amber-500`}></div>
                    <div className={`absolute ${buttonPush ? "bottom-0" : "bottom-2"} right-2 h-1 w-1 bg-amber-500`}></div>
                    <div className={`absolute ${buttonPush ? "hidden" : "-bottom-2 border-b-1"} left-0 h-2 w-full bg-amber-600 `}></div>
    
                    {/* pixel manquant extérieur */}
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 bg-amber-50 h-1 w-1`}></div>
                    <div className={`absolute ${buttonPush ? "top-3" : "top-1"} left-0 bg-amber-50 h-1 w-1`}></div>
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-1 bg-amber-50 h-1 w-1`}></div>
    
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-0 bg-amber-50 h-1 w-1`}></div>
                    <div className={`absolute ${buttonPush ? "top-3" : "top-1"} right-0 bg-amber-50 h-1 w-1`}></div>
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-1 bg-amber-50 h-1 w-1`}></div>
    
                    {/* pixel manquant extérieur bordeur basse  */}
                    <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0 border-l-1 border-b-1"} left-0 bg-amber-600 h-1 w-1 `}></div>
                    <div className={`absolute ${buttonPush ? "-bottom-1 border-0" : "bottom-1  border-l-1"} left-0 bg-amber-600 h-1 w-1`}></div>
                    <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0"} left-1 bg-amber-600 h-1 w-1`}></div>
    
                    <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0 border-r-1 border-b-1"} right-0 bg-amber-600 h-1 w-1 `}></div>
                    <div className={`absolute ${buttonPush ? "-bottom-1 border-0" : "bottom-1 border-r-1"} right-0 bg-amber-600 h-1 w-1 `}></div>
                    <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0"} right-1 bg-amber-600 h-1 w-1`}></div>
    
                    {/* pixel manquant extérieur bordure basse  */}
                    <div className={`absolute ${buttonPush ? "border-0" : "border-r-1"} -bottom-1 left-0 bg-amber-50 h-1 w-1 `} ></div>
                    <div className={`absolute -bottom-2 left-0 bg-amber-50 h-1 w-1 `}></div>
                    <div className={`absolute ${buttonPush ? "border-0" : "border-t-1 border-r-1"} -bottom-2 left-1 bg-amber-50 h-1 w-1 `} ></div>
    
                    <div className={`absolute ${buttonPush ? "border-0" : "border-l-1"} -bottom-1 right-0 bg-amber-50 h-1 w-1 `} ></div>
                    <div className={`absolute -bottom-2 right-0 bg-amber-50 h-1 w-1`} ></div>
                    <div className={`absolute ${buttonPush ? "border-0" : "border-t-1 border-l-1"} -bottom-2 right-1 bg-amber-50 h-1 w-1 `} ></div>
    
                    <p className={`relative ${buttonPush ? "top-2" : "top-0"}`}>
                        {children}
                    </p>
                </button>
                    </Link>
                ) : (
            <button className={`font-(family-name:--font-jersey) text-2xl py-2 px-6 relative bg-amber-200 m-5`}
                onMouseDown={handleDown}
                onMouseUp={handleUp}
                onMouseLeave={handleUp}>

                <div className={`absolute -top-0 left-0 h-2 w-full bg-amber-50`} style={{ display: buttonPush ? "block" : "none" }}></div>

                {/* bordure de base */}
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 h-full w-2 bg-amber-500`}></div>
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-0 h-full w-2 bg-amber-500`}></div>
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 h-2 w-full bg-amber-500`}></div>
                <div className={`absolute ${buttonPush ? "-bottom-2" : "bottom-0"} left-0 h-2 w-full bg-amber-500`}></div>

                {/* pixel intérieur */}
                <div className={`absolute ${buttonPush ? "top-4" : "top-2"} left-2 h-1 w-1 bg-amber-500`}></div>
                <div className={`absolute ${buttonPush ? "top-4" : "top-2"} right-2 h-1 w-1 bg-amber-500`}></div>
                <div className={`absolute ${buttonPush ? "bottom-0" : "bottom-2"} left-2 h-1 w-1 bg-amber-500`}></div>
                <div className={`absolute ${buttonPush ? "bottom-0" : "bottom-2"} right-2 h-1 w-1 bg-amber-500`}></div>
                <div className={`absolute ${buttonPush ? "hidden" : "-bottom-2 border-b-1"} left-0 h-2 w-full bg-amber-600 `}></div>

                {/* pixel manquant extérieur */}
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 bg-amber-50 h-1 w-1`}></div>
                <div className={`absolute ${buttonPush ? "top-3" : "top-1"} left-0 bg-amber-50 h-1 w-1`}></div>
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-1 bg-amber-50 h-1 w-1`}></div>

                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-0 bg-amber-50 h-1 w-1`}></div>
                <div className={`absolute ${buttonPush ? "top-3" : "top-1"} right-0 bg-amber-50 h-1 w-1`}></div>
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-1 bg-amber-50 h-1 w-1`}></div>

                {/* pixel manquant extérieur bordeur basse  */}
                <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0 border-l-1 border-b-1"} left-0 bg-amber-600 h-1 w-1 `}></div>
                <div className={`absolute ${buttonPush ? "-bottom-1 border-0" : "bottom-1  border-l-1"} left-0 bg-amber-600 h-1 w-1`}></div>
                <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0"} left-1 bg-amber-600 h-1 w-1`}></div>

                <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0 border-r-1 border-b-1"} right-0 bg-amber-600 h-1 w-1 `}></div>
                <div className={`absolute ${buttonPush ? "-bottom-1 border-0" : "bottom-1 border-r-1"} right-0 bg-amber-600 h-1 w-1 `}></div>
                <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0"} right-1 bg-amber-600 h-1 w-1`}></div>

                {/* pixel manquant extérieur bordure basse  */}
                <div className={`absolute ${buttonPush ? "border-0" : "border-r-1"} -bottom-1 left-0 bg-amber-50 h-1 w-1 `} ></div>
                <div className={`absolute -bottom-2 left-0 bg-amber-50 h-1 w-1 `}></div>
                <div className={`absolute ${buttonPush ? "border-0" : "border-t-1 border-r-1"} -bottom-2 left-1 bg-amber-50 h-1 w-1 `} ></div>

                <div className={`absolute ${buttonPush ? "border-0" : "border-l-1"} -bottom-1 right-0 bg-amber-50 h-1 w-1 `} ></div>
                <div className={`absolute -bottom-2 right-0 bg-amber-50 h-1 w-1`} ></div>
                <div className={`absolute ${buttonPush ? "border-0" : "border-t-1 border-l-1"} -bottom-2 right-1 bg-amber-50 h-1 w-1 `} ></div>

                <p className={`relative ${buttonPush ? "top-2" : "top-0"}`}>
                    {children}
                </p>
            </button>
        )
        
    )
}

export default Button