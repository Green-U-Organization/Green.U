"use client"
import React, { useEffect, useState } from 'react'

interface RadioProps {
    name: string
    value: string
    checked?: boolean
    onChange?: (value: string) => void
}

const Radio: React.FC<RadioProps> = ({name, value, checked = false, onChange }) => {
    const [selected, setSelected] = useState(checked)
    const [hover, setHover] = useState(false)

    const handleClick = () => {
        if (onChange) {
            onChange(value)
        }
        setSelected(true)
    }

    useEffect(() => {
        setSelected(checked)
    },[checked])

    return (
        <>
            <div className={`h-5 w-5 relative m-5 rounded-full flex items-center justify-center
            ${hover ? "bg-bgbutton" : "bg-cardbackground"}
            ${selected ? "border-2 border-primary" : "border border-border"}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
           // onClick={handleC}
            >
            
            </div>
                
        </>


    )
}

export default Radio