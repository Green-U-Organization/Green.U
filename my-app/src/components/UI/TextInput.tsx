'use client';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import { FC } from 'react';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: boolean;
  errorPassMatch?: boolean;
  errorPassChar?: boolean;
  className?: string; // Explicitly include className
};

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
    <div className={`mb-5 ${className}`}>
      {label && (
        <label htmlFor={props.id || props.name} className="mr-3">
          {label}:
        </label>
      )}
      <input
        {...props} // Toutes les props natives passées directement
        className={`w-full pl-3 ${error || errorPassChar || errorPassMatch ? 'border-txterror border' : 'bg-bginput'} ${props.className || ''}`}
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
