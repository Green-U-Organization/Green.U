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




    return (
        <>

            <div></div>
                
        </>


    )
}

export default Radio