"use client"
import { ChangeEvent, FC } from 'react'
import { useLanguage } from '@/app/contexts/LanguageProvider';

///https://www.codevertiser.com/reusable-input-component-react/

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  value: string | number
  name: string
  placeholder: string
  className? : string
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
  className,
  error,
  errorPassChar,
  errorPassMatch,
  disabled,
  onChange,
}) => {
  const {translations} = useLanguage();
  return (
    <div className={`input-wrapper mb-5 ${className}`} >
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
        className={`w-full pl-3 ${error || errorPassChar || errorPassMatch ? "border border-txterror" : "bg-bginput"}`}
      />
      {/* Ajuster les messages d'erreurs pour les passwords >> if (type === password) alors blablabla  */}
      {errorPassMatch && <p className="text-txterror">{translations.errorPassMatch}</p>}
      {errorPassChar && <p className="text-txterror">{translations.errorPassChar}</p>}
      {error && <p className="text-txterror">{translations.errorEmptyInput}</p>}

    </div>
  )
}

export default TextInput