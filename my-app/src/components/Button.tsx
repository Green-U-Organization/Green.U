"use client"

import Link from 'next/link';
import React, { FormEvent, MouseEvent, useState } from 'react'

type Props = {
    children: React.ReactNode;
    href?: string;
    type: "link" | "submit" | "button";
    handleSubmit?: (e: FormEvent<HTMLButtonElement>) => void;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({children,
                 href,
                type,
                handleSubmit, 
                onClick
            } : Props) => {
    const [buttonPush, setButtonPush] = useState(false)
    const [inside, setInside] = useState(false)

    const handleDown = () => {
        setButtonPush(true)
        if(type === "link"){

        }
        if(type === "submit" && handleSubmit){
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            handleSubmit
        }
    }
    const handleUp = () => setButtonPush(false)
    const handleEnter = () => setInside(true)
    const handleLeave = () => {
        setInside(false)
        setButtonPush(false)
    }

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if(type === 'submit' && handleSubmit) {
            handleSubmit(e as unknown as FormEvent<HTMLButtonElement>)
        }
        if (onClick) {
            onClick(e)
        }
    }

    return (        
            type === "link" && href ? (
                <Link href={href}>
                    <button className={`select-none font-(family-name:--font-jersey) text-2xl py-2 px-6 relative bg-button m-5 ${inside ? "bg-bgbutton" : "bg-cardbackground"}`}
                    onMouseDown={handleDown}
                    onMouseUp={handleUp}
                    onMouseLeave={handleLeave}
                    onMouseEnter={handleEnter}
                    onClick={handleClick}>
    
                    <div className={`absolute -top-0 left-0 h-2 w-full bg-extbutton`} style={{ display: buttonPush ? "block" : "none" }}></div>
    
                    {/* bordure de base */}
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 h-full w-2 bg-border`}></div>
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-0 h-full w-2 bg-border`}></div>
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 h-2 w-full bg-border`}></div>
                    <div className={`absolute ${buttonPush ? "-bottom-2" : "bottom-0"} left-0 h-2 w-full bg-border`}></div>
    
                    {/* pixel intérieur */}
                    <div className={`absolute ${buttonPush ? "top-4" : "top-2"} left-2 h-1 w-1 bg-border`}></div>
                    <div className={`absolute ${buttonPush ? "top-4" : "top-2"} right-2 h-1 w-1 bg-border`}></div>
                    <div className={`absolute ${buttonPush ? "bottom-0" : "bottom-2"} left-2 h-1 w-1 bg-border`}></div>
                    <div className={`absolute ${buttonPush ? "bottom-0" : "bottom-2"} right-2 h-1 w-1 bg-border`}></div>
                    <div className={`absolute ${buttonPush ? "hidden" : "-bottom-2 border-b-1"} left-0 h-2 w-full bg-shadow `}></div>
    
                    {/* pixel manquant extérieur */}
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 bg-extbutton h-1 w-1`}></div>
                    <div className={`absolute ${buttonPush ? "top-3" : "top-1"} left-0 bg-extbutton h-1 w-1`}></div>
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-1 bg-extbutton h-1 w-1`}></div>
    
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-0 bg-extbutton h-1 w-1`}></div>
                    <div className={`absolute ${buttonPush ? "top-3" : "top-1"} right-0 bg-extbutton h-1 w-1`}></div>
                    <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-1 bg-extbutton h-1 w-1`}></div>
    
                    {/* pixel manquant extérieur bordeur basse  */}
                    <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0 border-l-1 border-b-1"} left-0 bg-shadow h-1 w-1 `}></div>
                    <div className={`absolute ${buttonPush ? "-bottom-1 border-0" : "bottom-1  border-l-1"} left-0 bg-shadow h-1 w-1`}></div>
                    <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0"} left-1 bg-shadow h-1 w-1`}></div>
    
                    <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0 border-r-1 border-b-1"} right-0 bg-shadow h-1 w-1 `}></div>
                    <div className={`absolute ${buttonPush ? "-bottom-1 border-0" : "bottom-1 border-r-1"} right-0 bg-shadow h-1 w-1 `}></div>
                    <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0"} right-1 bg-shadow h-1 w-1`}></div>
    
                    {/* pixel manquant extérieur bordure basse  */}
                    <div className={`absolute ${buttonPush ? "border-0" : "border-r-1"} -bottom-1 left-0 bg-extbutton h-1 w-1 `} ></div>
                    <div className={`absolute -bottom-2 left-0 bg-extbutton h-1 w-1 `}></div>
                    <div className={`absolute ${buttonPush ? "border-0" : "border-t-1 border-r-1"} -bottom-2 left-1 bg-extbutton h-1 w-1 `} ></div>
    
                    <div className={`absolute ${buttonPush ? "border-0" : "border-l-1"} -bottom-1 right-0 bg-extbutton h-1 w-1 `} ></div>
                    <div className={`absolute -bottom-2 right-0 bg-extbutton h-1 w-1`} ></div>
                    <div className={`absolute ${buttonPush ? "border-0" : "border-t-1 border-l-1"} -bottom-2 right-1 bg-extbutton h-1 w-1 `} ></div>
    
                    <p className={`relative ${buttonPush ? "top-2" : "top-0"}`}>
                        {children}
                    </p>
                </button>
                    </Link>
                ) : (
            <button className={`select-none font-(family-name:--font-jersey) text-2xl py-2 px-6 relative bg-button m-5 ${inside ? "bg-bgbutton" : "bg-cardbackground"} cursor-pointer`}
                onMouseDown={handleDown}
                onMouseUp={handleUp}
                onMouseLeave={handleLeave}
                onMouseEnter={handleEnter}
                onClick={handleClick}>

                <div className={`absolute -top-0 left-0 h-2 w-full bg-extbutton`} style={{ display: buttonPush ? "block" : "none" }}></div>

                {/* bordure de base */}
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 h-full w-2 bg-border`}></div>
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-0 h-full w-2 bg-border`}></div>
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 h-2 w-full bg-border`}></div>
                <div className={`absolute ${buttonPush ? "-bottom-2" : "bottom-0"} left-0 h-2 w-full bg-border`}></div>

                {/* pixel intérieur */}
                <div className={`absolute ${buttonPush ? "top-4" : "top-2"} left-2 h-1 w-1 bg-border`}></div>
                <div className={`absolute ${buttonPush ? "top-4" : "top-2"} right-2 h-1 w-1 bg-border`}></div>
                <div className={`absolute ${buttonPush ? "bottom-0" : "bottom-2"} left-2 h-1 w-1 bg-border`}></div>
                <div className={`absolute ${buttonPush ? "bottom-0" : "bottom-2"} right-2 h-1 w-1 bg-border`}></div>
                <div className={`absolute ${buttonPush ? "hidden" : "-bottom-2 border-b-1"} left-0 h-2 w-full bg-shadow `}></div>

                {/* pixel manquant extérieur */}
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-0 bg-extbutton h-1 w-1`}></div>
                <div className={`absolute ${buttonPush ? "top-3" : "top-1"} left-0 bg-extbutton h-1 w-1`}></div>
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} left-1 bg-extbutton h-1 w-1`}></div>

                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-0 bg-extbutton h-1 w-1`}></div>
                <div className={`absolute ${buttonPush ? "top-3" : "top-1"} right-0 bg-extbutton h-1 w-1`}></div>
                <div className={`absolute ${buttonPush ? "top-2" : "top-0"} right-1 bg-extbutton h-1 w-1`}></div>

                {/* pixel manquant extérieur bordeur basse  */}
                <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0 border-l-1 border-b-1"} left-0 bg-shadow h-1 w-1 `}></div>
                <div className={`absolute ${buttonPush ? "-bottom-1 border-0" : "bottom-1  border-l-1"} left-0 bg-shadow h-1 w-1`}></div>
                <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0"} left-1 bg-shadow h-1 w-1`}></div>

                <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0 border-r-1 border-b-1"} right-0 bg-shadow h-1 w-1 `}></div>
                <div className={`absolute ${buttonPush ? "-bottom-1 border-0" : "bottom-1 border-r-1"} right-0 bg-shadow h-1 w-1 `}></div>
                <div className={`absolute ${buttonPush ? "-bottom-2 border-0" : "bottom-0"} right-1 bg-shadow h-1 w-1`}></div>

                {/* pixel manquant extérieur bordure basse  */}
                <div className={`absolute ${buttonPush ? "border-0" : "border-r-1"} -bottom-1 left-0 bg-extbutton h-1 w-1 `} ></div>
                <div className={`absolute -bottom-2 left-0 bg-extbutton h-1 w-1 `}></div>
                <div className={`absolute ${buttonPush ? "border-0" : "border-t-1 border-r-1"} -bottom-2 left-1 bg-extbutton h-1 w-1 `} ></div>

                <div className={`absolute ${buttonPush ? "border-0" : "border-l-1"} -bottom-1 right-0 bg-extbutton h-1 w-1 `} ></div>
                <div className={`absolute -bottom-2 right-0 bg-extbutton h-1 w-1`} ></div>
                <div className={`absolute ${buttonPush ? "border-0" : "border-t-1 border-l-1"} -bottom-2 right-1 bg-extbutton h-1 w-1 `} ></div>

                <p className={`relative ${buttonPush ? "top-2" : "top-0"}`}>
                    {children}
                </p>
            </button>
        )
        
    )
}

export default Button