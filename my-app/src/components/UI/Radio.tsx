'use client';
import React, { useState } from 'react';

interface RadioProps {
  name: string;
  value: string;
  checked?: boolean;
  id: string;
  onChange?: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({
  name,
  value,
  checked = false,
  id,
  onChange,
}) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="mb-5 flex flex-row items-center">
      <label htmlFor={id}>{id}:</label>

      <div
        className={`mr-5 ml-5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all ${hover ? 'bg-bginput' : 'bg-gray-100'} ${checked ? 'bg-bgbutton border-2' : 'border border-gray-400'}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
        role="radio"
        aria-checked={checked}
        tabIndex={0}
      >
        {checked && <div className="bg-border h-3 w-3 rounded-full"></div>}

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
