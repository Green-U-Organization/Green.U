"use client"
import { useState } from "react";
import postalCodes from "@/data/postalCodesBE.json"; // Assurez-vous que le fichier est bien dans /data
import { useLanguage } from '@/app/contexts/LanguageProvider';

interface DropDownProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const DropDownPostalCode: React.FC<DropDownProps> = ({ label, value, onChange, error }) => {
  const [search, setSearch] = useState("");
  const {translations} = useLanguage();

  // Filtrage des codes postaux en fonction de la recherche
  const filteredOptions = postalCodes.filter(({ code, city }) =>
    code.startsWith(search) || city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="postal-search" className="mb-1 font-medium">
        {translations.postalcode}
      </label>
      
      {/* Input avec datalist pour affichage dynamique */}
      <input
        id="postal-search"
        type="text"
        list="postal-options"
        value={value}
        onChange={onChange}
        onInput={(e) => setSearch(e.currentTarget.value)}
        placeholder={translations.enterpostalcode}
        className={`w-full pl-3 ${error ? "border border-txterror" : "bg-bginput"}`}
      />

      {/* Liste des options dynamiques */}
      <datalist id="postal-options">
        {filteredOptions.map(({ code, city }) => (
          <option key={`${code}-${city}`} value={`${code}-${city}`} />
        ))}
      </datalist>

      {error && <p className="text-txterror">{translations.enterpostalcode}</p>}
    </div>
  );
};

export default DropDownPostalCode;
