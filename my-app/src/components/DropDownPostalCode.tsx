'use client';
import { useState, useMemo, useEffect, useCallback } from 'react';
import postalCodes from '@/data/postalCodesBE.json';
import { useLanguage } from '@/app/contexts/LanguageProvider';

interface DropDownProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  setIsValidPostalCode: (isValid: boolean) => void;
}

const DropDownPostalCode: React.FC<DropDownProps> = ({
  value,
  onChange,
  error,
  setIsValidPostalCode,
}) => {
  const [search, setSearch] = useState('');
  const [isValidPostalCodeLocal, setIsValidPostalCodeLocal] = useState(true);
  const [touched, setTouched] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { translations } = useLanguage();

  const validatePostalCode = useCallback(
    (inputValue: string) => {
      if (!inputValue) {
        setIsValidPostalCodeLocal(true);
        setIsValidPostalCode(true);
        return;
      }

      const regex = /^[0-9]{4}(-[\p{L}\p{N}' ]+)*$/u;
      if (regex.test(inputValue)) {
        const parts = inputValue.split('-');
        const postalCode = parts[0];
        const city = parts.slice(1).join('-');

        const isValid = postalCodes.some(
          ({ code, city: dataCity }) =>
            code === postalCode &&
            dataCity.toLowerCase() === city.trim().toLowerCase()
        );
        setIsValidPostalCodeLocal(isValid);
        setIsValidPostalCode(isValid);
      } else {
        setIsValidPostalCodeLocal(false);
        setIsValidPostalCode(false);
      }
    },
    [setIsValidPostalCode]
  );

  const filteredOptions = useMemo(
    () =>
      postalCodes.filter(
        ({ code, city }) =>
          code.startsWith(search) ||
          city.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  useEffect(() => {
    if (filteredOptions.length === 1 && search.length >= 2) {
      const { code, city } = filteredOptions[0];
      const postalCodeValue = `${code}-${city}`;
      if (value !== postalCodeValue) {
        const event = {
          target: { value: postalCodeValue, name: 'postalCode' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
        validatePostalCode(postalCodeValue);
        setShowOptions(false);
      }
    }
  }, [filteredOptions, search, value, onChange, validatePostalCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setSearch(e.target.value);
    setTouched(true);
    setShowOptions(e.target.value.length > 1);
    validatePostalCode(e.target.value);
  };

  const handleOptionSelect = (optionValue: string) => {
    const event = {
      target: { value: optionValue, name: 'postalCode' },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
    setSearch(optionValue);
    setShowOptions(false);
    validatePostalCode(optionValue);
  };

  return (
    <div className="relative mb-4 flex flex-col">
      <label htmlFor="postal-search" className="mb-1 font-medium">
        {translations.postalcode}
      </label>
      <input
        id="postal-search"
        type="text"
        name="postalCode"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowOptions(search.length > 1)}
        onBlur={() => setTimeout(() => setShowOptions(false), 200)}
        placeholder={translations.enterpostalcode}
        className={`w-full pl-3 ${
          error || (!isValidPostalCodeLocal && touched)
            ? 'border-txterror border'
            : 'bg-bginput'
        }`}
        autoComplete="off"
      />

      {showOptions && filteredOptions.length > 0 && (
        <div className="absolute z-10 mt-10 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredOptions.map(({ code, city }) => (
            <div
              key={`${code}-${city}`}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onMouseDown={() => handleOptionSelect(`${code}-${city}`)}
            >
              {code} - {city}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-txterror">{translations.errorEmptyInput}</p>}
      {!isValidPostalCodeLocal && touched && (
        <p className="text-txterror">{translations.invalidpostalcode}</p>
      )}
    </div>
  );
};

export default DropDownPostalCode;
