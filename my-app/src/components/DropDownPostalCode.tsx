"use client";
import { useState, useMemo } from "react";
import postalCodes from "@/data/postalCodesBE.json";
import { useLanguage } from "@/app/contexts/LanguageProvider";

interface DropDownProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  setIsValidPostalCode: (isValid: boolean) => void;
}

const DropDownPostalCode: React.FC<DropDownProps> = ({ value, onChange, error, setIsValidPostalCode }) => {
  const [search, setSearch] = useState("");
  const [isValidPostalCodeLocal, setIsValidPostalCodeLocal] = useState(true);
  const [touched, setTouched] = useState(false); // Pour savoir si l'utilisateur a modifié le champ
  const { translations } = useLanguage();

  // Vérification si l'entrée est valide
  const validatePostalCode = (inputValue: string) => {
    if (!inputValue) {
      setIsValidPostalCodeLocal(true);
      setIsValidPostalCode(true); // Met à jour l'état dans le composant parent
      return;
    }

    // Vérifier le format et si la combinaison code-localité existe
    const regex = /^\d{4}-[a-zA-ZÀ-ÿ\s]+$/; // Format "code-localité"
    if (regex.test(inputValue)) {
      const [postalCode, city] = inputValue.split("-");
      const isValid = postalCodes.some(
        ({ code, city: dataCity }) =>
          code === postalCode && dataCity.toLowerCase() === city.trim().toLowerCase()
      );
      setIsValidPostalCodeLocal(isValid);
      setIsValidPostalCode(isValid);
    } else {
      setIsValidPostalCodeLocal(false);
      setIsValidPostalCode(false);
    }
  };

  // Filtrage des options en fonction de la recherche
  const filteredOptions = useMemo(() => 
    postalCodes.filter(({ code, city }) =>
      code.startsWith(search) || city.toLowerCase().includes(search.toLowerCase())
    ),[search]
  );

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="postal-search" className="mb-1 font-medium">
        {translations.postalcode}
      </label>
      <input
        id="postal-search"
        type="text"
        list="postal-options"
        value={value}
        onChange={(e) => {
          onChange(e); // Met à jour la valeur de l'input
          setTouched(true); // L'utilisateur a interagi
          validatePostalCode(e.target.value); // Valide la donnée
        }}
        onInput={(e) => setSearch(e.currentTarget.value)}
        placeholder={translations.enterpostalcode}
        className={`w-full pl-3 ${
          !isValidPostalCodeLocal && touched ? "border border-txterror" : "bg-bginput"
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
