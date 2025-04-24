'use client';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import { TextInputProps } from '@/utils/types';
import { FC } from 'react';

const TextInput: FC<TextInputProps> = ({
  label,
  error = false,
  errorPassChar = false,
  errorPassMatch = false,
  className = '',
  ...props
}) => {
  const { translations } = useLanguage();

  return (
    <div className={`${className} mb-5`}>
      {label && (
        <label htmlFor={props.id || props.name} className="mr-3">
          {label}:
        </label>
      )}
      <input
        id={props.id || props.name}
        name={props.name}
        {...props} // Toutes les props natives passées directement
        className={`w-full pl-3 ${error || errorPassChar || errorPassMatch ? 'border-txterror border' : 'bg-bginput'} `}
      />
      {errorPassMatch && (
        <p className="text-txterror">{translations.errorPassMatch}</p>
      )}
      {errorPassChar && (
        <p className="text-txterror">{translations.errorPassChar}</p>
      )}
      {error && <p className="text-txterror">{translations.errorEmptyInput}</p>}
    </div>
  );
};

export default TextInput;
