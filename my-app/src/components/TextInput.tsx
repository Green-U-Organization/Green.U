"use client"
import { ChangeEvent, FC } from 'react'

///https://www.codevertiser.com/reusable-input-component-react/

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  value: string | number
  name: string
  placeholder: string
  error: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextInput: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
}) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={label} className='mr-3 '>
        {label}:
      </label>
      <input
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className='bg-amber-200'
      />
      {error && <p className="error">Input filed can't be empty!</p>}
    </div>
  )
}

export default TextInput