"use client"
import React, { useState } from 'react'

const TextInput = ({id} : any) => {
    const [input, setInput] = useState("")
    const [selected, setSelected] = useState(false)
    const [blinker, setBlinker] = useState(true)

    const handleSelect = () => {
        setSelected(true)
        console.log(selected)
    }

//     async const blink = () => {

// }


  return (
<>
<div onClick={handleSelect} className='h-5 w-30 bg-green-400 m-5'>

<div className='h-5 w-1 bg-amber-400' style={{display : selected ? "block" : "none"}}></div>
</div>
</>
  )
}

export default TextInput