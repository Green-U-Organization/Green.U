"use client"
import React, { useEffect, useState } from 'react'

const TextInput = ({id} : any) => {
    const [input, setInput] = useState("")
    const [selected, setSelected] = useState(false)
    const [blinker, setBlinker] = useState(false)

    const handleSelect = () => {
        setSelected(true)
        console.log(selected)

        if (!selected){
          setInterval(getBlink, 500)
        }

        function getBlink() {
          setBlinker(prev => !prev)
        }
    }

    const handleChange = (e : any) => {
      if (selected){
        console.log(e.target.value)
      }
    }

useEffect(() => {
  if (!selected) {
    setBlinker(false)
  }
}, [selected])



  return (
<>
<div onClick={handleSelect} className='h-6 w-30 m-5 border-1 flex items-center'>

<div className="" onChange={handleChange}>{input}</div>

<div className='h-5 w-1 bg-amber-400' style={{display : blinker ? "block" : "none"}}></div>

</div>
</>
  )
}

export default TextInput