"use client";
import React, { useEffect, useState } from "react";

interface RadioProps {
  name: string;
  value: string;
  checked?: boolean;
  id: string;
  onChange?: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({ name, value, checked = false, id, onChange }) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-row mb-5 items-center">
        <label htmlFor={id}>{id}:</label>
    
        <div 
            className={`h-6 w-6 flex ml-5 mr-5 items-center justify-center rounded-full cursor-pointer transition-all
                ${hover ? "bg-bginput" : "bg-gray-100"}
                ${checked ? "border-2 bg-bgbutton" : "border border-gray-400"}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
            role="radio"
            aria-checked={checked}
            tabIndex={0}
            >
            {checked && <div className="w-3 h-3 bg-border rounded-full"></div>}
            
            <input
                type="radio"
                name={name}
                id={id}
                value={value}
                checked={checked}
                onChange={() => onChange?.(value)}
                className="hidden"
            />
        </div>
    </div>
  );
};

export default Radio;