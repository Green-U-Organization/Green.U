"use client"
import React, { useEffect, useState } from 'react'

const Checkbox = ({check}) => {
    const [inside, setInside] = useState(false)
    const [clicked, setClicked] = useState(false)

    const handleEnter = () => {
        setInside(true)
    }
    const handleLeave = () => {
        setInside(false)
    }
    const handleClick = () => {
        setClicked(prev => !prev)
    }    

    useEffect(() => {
        check = clicked
        console.log(check)  
    }, [clicked])

    return (
        <>

            <div className={`h-5 w-5 relative m-5 ${inside ? "bg-amber-200" : "bg-white"}`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onClick={handleClick}
            role="checkbox"
            aria-checked={clicked}
            tabIndex={0}
            >
                <div className={`absolute top-0 left-0 h-full w-1 bg-amber-500`}></div>
                <div className={`absolute top-0 right-0 h-full w-1 bg-amber-500`}></div>
                <div className={`absolute top-0 left-0 h-1 w-full bg-amber-500`}></div>
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-amber-500`}></div>

                <div className={`absolute top-1 left-1 h-0.5 w-0.5 bg-amber-500`}></div>
                <div className={`absolute top-1 right-1 h-0.5 w-0.5 bg-amber-500`}></div>
                <div className={`absolute bottom-1 left-1 h-0.5 w-0.5 bg-amber-500`}></div>
                <div className={`absolute bottom-1 right-1 h-0.5 w-0.5 bg-amber-500`}></div>
   
                <div className={`absolute top-0 left-0 h-0.5 w-0.5 bg-amber-50`}></div>
                <div className={`absolute top-0 right-0 h-0.5 w-0.5 bg-amber-50`}></div>
                <div className={`absolute bottom-0 left-0 h-0.5 w-0.5 bg-amber-50`}></div>
                <div className={`absolute bottom-0 right-0 h-0.5 w-0.5 bg-amber-50`}></div>

                <div className='h-full w-full relative top-0 left-0' style={{display: clicked ? "block" : "none"}}>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-1 left-1'></div>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-1.5 left-1.5'></div>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-2 left-2'></div>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-2.5 left-2.5'></div>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-3 left-3'></div>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-3.5 left-3.5'></div>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-1 left-3.5'></div>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-1.5 left-3'></div>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-2 left-2.5'></div>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-2.5 left-2'></div>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-3 left-1.5'></div>
                    <div className='bg-amber-800 w-0.5 h-0.5 absolute top-3.5 left-1'></div>
                </div>
            </div>

            <input type="checkbox" className=' w-5 h-5 bg-amber-400 border-0' />
        </>


    )
}

export default Checkbox