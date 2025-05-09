import { useState, ChangeEvent } from 'react';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import Button from '@/components/Atom/Button';
import TextInput from '@/components/Atom/TextInput';

interface HashtagInputProps {
  //Callback pour remonter les Hashtags au parent
  onHashtagsChange?: (hashtags: string[]) => void;
  label?: string;
  name?: string;
  placeHolder?: string;
  error?: boolean;
}

const HashtagInput: React.FC<HashtagInputProps> = ({
  onHashtagsChange,
  label,
  name,
  placeHolder,
  error,
}) => {
  //Pour accéder à la traduction
  const { translations } = useLanguage();

  //Pour gérer l'input
  const [inputValue, setInputValue] = useState('');

  //Pour gérer la liste des hashtags
  const [hashtags, setHashtags] = useState<string[]>([]);

  //Ajout d'un hashtag
  const handleAddHashtag = () => {
    if (inputValue.trim() !== '') {
      const formattedTag = `${inputValue.trim()}`;
      if (!hashtags.includes(formattedTag)) {
        // Ajoute avec un #
        const newHashtags = [...hashtags, formattedTag];
        setHashtags(newHashtags);
        //Réinitialise l'input
        setInputValue('');
        //Envoyer la nouvelle liste au parent
        onHashtagsChange?.(newHashtags);
      }
    }
  };

  //Suppression d'un hashtag
  const handleRemoveHashtag = (tag: string) => {
    const newHashtags = hashtags.filter((t) => t !== tag);
    setHashtags(newHashtags);
    onHashtagsChange?.(newHashtags);
  };

  //Mise à jour de l'input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Ne garder que les caractères valides : lettres, chiffres et underscores
    const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
    setInputValue(sanitizedValue);
  };

  return (
    <div>
      {/* Input et bouton alignés */}
      <div className="flex items-center">
        {/* Input pour ajouter un hashtag */}
        <TextInput
          className="max-w-none"
          type="text"
          label={label}
          name={name}
          onChange={handleChange}
          value={inputValue}
          placeholder={placeHolder}
          error={error}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddHashtag();
            }
          }}
        />
        {inputValue.trim() !== '' &&
          !hashtags
            .map((t) => t.toLowerCase())
            .includes(inputValue.trim().toLowerCase()) && (
            <div className="flex items-start">
              <Button
                className="bg-bgbutton relative m-5 px-6 py-2"
                onClick={handleAddHashtag}
              >
                {translations.add}
              </Button>
            </div>
          )}
      </div>

      {/* Liste des hashtags */}
      <div className="flex flex-wrap">
        {hashtags.map((tag) => (
          <span key={tag} className="px-2 pb-4">
            #{tag}
            <button
              onClick={() => handleRemoveHashtag(tag)}
              className="cursor-pointer pl-3"
            >
              ❌
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default HashtagInput;
