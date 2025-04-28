'use client';
import { useState, useMemo } from 'react';
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
  const { translations } = useLanguage();

  const validatePostalCode = (inputValue: string) => {
    if (!inputValue) {
      setIsValidPostalCodeLocal(true);
      setIsValidPostalCode(true);
      return;
    }

    const regex = /^[0-9]{4}(-[\p{L}\p{N}' ]+)*$/u;
    if (regex.test(inputValue)) {
      //Séparation du code postal et de la ville
      const parts = inputValue.split('-');
      const postalCode = parts[0];
      const city = parts.slice(1).join('-'); //La ville peut contenir plusieurs traits d'union

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
  };

  const filteredOptions = useMemo(
    () =>
      postalCodes.filter(
        ({ code, city }) =>
          code.startsWith(search) ||
          city.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor="postal-search" className="mb-1 font-medium">
        {translations.postalcode}
      </label>
      <input
        id="postal-search"
        type="text"
        name="postalCode" // Ajoutez cet attribut pour inclure le champ dans FormData
        list="postal-options"
        value={value}
        onChange={(e) => {
          onChange(e);
          setTouched(true);
          validatePostalCode(e.target.value);
        }}
        onInput={(e) => setSearch(e.currentTarget.value)}
        placeholder={translations.enterpostalcode}
        className={`w-full pl-3 ${
          error || (!isValidPostalCodeLocal && touched)
            ? 'border-txterror border'
            : 'bg-bginput'
        }`}
      />
      <datalist id="postal-options">
        {filteredOptions.map(({ code, city }) => (
          <option key={`${code}-${city}`} value={`${code}-${city}`} />
        ))}
      </datalist>
      {error && <p className="text-txterror">{translations.errorEmptyInput}</p>}
      {!isValidPostalCodeLocal && touched && (
        <p className="text-txterror">{translations.invalidpostalcode}</p>
      )}
    </div>
  );
};

export default DropDownPostalCode;
