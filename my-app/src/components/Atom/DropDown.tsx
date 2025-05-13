import { useLanguage } from '@/app/contexts/LanguageProvider';
import { DropdownSelectProps } from '@/utils/types';

const DropdownSelect = <T extends string | number>({
  label,
  placeholder,
  options,
  selectedValue,
  setSelectedValue,
  error,
}: DropdownSelectProps<T>) => {
  //Hooks
  const { translations } = useLanguage();

  return (
    <section className="mb-4 flex flex-col">
      <label className="mb-1 font-medium">{label}</label>
      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value as T)}
        className={`w-full pl-2 ${error ? 'border-txterror border' : 'bg-bginput'}`}
      >
        <option value="">{translations.selectoption}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && <p className="text-txterror">{placeholder}</p>}
    </section>
  );
};

export default DropdownSelect;
