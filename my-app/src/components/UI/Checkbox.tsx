"use client"
import React, {useState} from 'react'

type Props = {
    checked: boolean;
    onChange: (checked: boolean) => void
}

const Checkbox = ({checked, onChange} : Props) => {
    const [inside, setInside] = useState(false)
    const [clicked, setClicked] = useState(checked || false)

    const handleEnter = () => setInside(true)
    const handleLeave = () => setInside(false)
    const handleClick = () => {
        const newChecked = !clicked
        setClicked(newChecked)
        onChange?.(newChecked) //Informe le parent du changement
    }    

    return (
        <>
            <div className={`min-h-5 min-w-5 relative my-1.5 align-top ${inside ? "bg-bgbutton" : "bg-cardbackground"}`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onClick={handleClick}
            role="checkbox"
            aria-checked={clicked}
            tabIndex={0}
            >
                <div className={`absolute top-0 left-0 h-full w-1 bg-border`}></div>
                <div className={`absolute top-0 right-0 h-full w-1 bg-border`}></div>
                <div className={`absolute top-0 left-0 h-1 w-full bg-border`}></div>
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-border`}></div>

                <div className={`absolute top-1 left-1 h-0.5 w-0.5 bg-border`}></div>
                <div className={`absolute top-1 right-1 h-0.5 w-0.5 bg-border`}></div>
                <div className={`absolute bottom-1 left-1 h-0.5 w-0.5 bg-border`}></div>
                <div className={`absolute bottom-1 right-1 h-0.5 w-0.5 bg-border`}></div>
   
                <div className={`absolute top-0 left-0 h-0.5 w-0.5 bg-extbutton`}></div>
                <div className={`absolute top-0 right-0 h-0.5 w-0.5 bg-extbutton`}></div>
                <div className={`absolute bottom-0 left-0 h-0.5 w-0.5 bg-extbutton`}></div>
                <div className={`absolute bottom-0 right-0 h-0.5 w-0.5 bg-extbutton`}></div>

                <div className='h-full w-full relative top-0 left-0' style={{display: clicked ? "block" : "none"}}>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-1 left-1'></div>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-1.5 left-1.5'></div>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-2 left-2'></div>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-2.5 left-2.5'></div>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-3 left-3'></div>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-3.5 left-3.5'></div>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-1 left-3.5'></div>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-1.5 left-3'></div>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-2 left-2.5'></div>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-2.5 left-2'></div>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-3 left-1.5'></div>
                    <div className='bg-shadow w-0.5 h-0.5 absolute top-3.5 left-1'></div>
                </div>
            </div>
        </>
    )
}

export default Checkbox