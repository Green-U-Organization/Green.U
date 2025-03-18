"use client"
import { ChangeEvent, FC } from 'react'

///https://www.codevertiser.com/reusable-input-component-react/

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  value: string | number
  name: string
  placeholder: string
  style? : string
  error: boolean
  errorPassMatch?: boolean
  errorPassChar?: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextInput: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  style,
  error,
  errorPassChar,
  errorPassMatch,
  disabled,
  onChange,
}) => {
  return (
    <div className={`input-wrapper mb-5 ${style}`} >
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
        className={`w-full ${error || errorPassChar || errorPassMatch ? "bg-amber-300" : "bg-bginput"}`}
      />
      {/* Ajuster les messages d'erreurs pour les password >> if (type === password) alors blablabla  */}
      {errorPassMatch && <p className="text-red-600">Your password must be strictly identical!</p>}
      {errorPassChar && <p className="text-red-600">Password must have at least 8 character and 1 special character!</p>}
      {error && <p className="text-red-600">Input filed can't be empty!</p>}


    
    </div>
  )
}

export default TextInput