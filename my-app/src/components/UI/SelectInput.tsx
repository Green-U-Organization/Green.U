'use client';
import React from 'react';

type SelectOption = {
  value: string | number;
  label: string;
};

type SelectInputProps = {
  label: string;
  name: string;
  options: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  options,
  value,
  defaultValue,
  onChange,
  required = false,
  disabled = false,
  className = '',
}) => {
  return (
    <div className="mb-5 flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`focus:ring-primary bg-bginput border border-gray-300 px-3 py-0.5 focus:ring-2 focus:outline-none ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
