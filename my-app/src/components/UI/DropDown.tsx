import { useLanguage } from '@/app/contexts/LanguageProvider';

interface DropdownSelectProps<T> {
  label: string;
  placeholder: string;
  options: T[]; // Liste d'options générique 
  selectedValue: T;
  setSelectedValue: (value: T) => void;
  error?: boolean;
}

const DropdownSelect = <T extends string | number>({
  label,
  placeholder,
  options,
  selectedValue,
  setSelectedValue,
  error
}: DropdownSelectProps<T>) => {
  const {translations} = useLanguage();
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-medium">{label}</label>
      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value as T)}
        className={`w-full pl-2 ${error ? "border border-txterror" : "bg-bginput"}`}
      >
        <option value="">{translations.selectoption}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && <p className="text-txterror">{placeholder}</p>}
    </div>
  );
};

export default DropdownSelect;
