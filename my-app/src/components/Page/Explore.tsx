'use client';
import {
  useLazyGetAllGardensByTagQuery,
  useLazyGetAllUsersByTagQuery,
  useGetPopularTagsQuery,
} from '@/slice/fetch';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import TextInput from '../Atom/TextInput';
import Card from '../Atom/Card';
import Button from '../Atom/Button';
import SlimCard from '../Atom/SlimCard';
import Radio from '../Atom/Radio';

const Explore = () => {
  const router = useRouter();

  const gardenTypeLabels: Record<number, string> = {
    0: 'Private',
    1: 'Semi-private',
    2: 'Public',
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchType, setSearchType] = useState<'tag' | 'user' | 'garden'>(
    'tag'
  );
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [searchMessages, setSearchMessages] = useState<{
    usersMessage?: string;
    gardensMessage?: string;
  }>({});

  const [triggerGardensByTag, { data: gardensData }] =
    useLazyGetAllGardensByTagQuery();
  const [triggerUsersByTag, { data: usersData }] =
    useLazyGetAllUsersByTagQuery();

  const { data: hashTags } = useGetPopularTagsQuery();

  const sanitizeTagInput = (value: string): string => {
    let sanitized = value.replace(/[^a-zA-Z0-9_;]/g, '');
    sanitized = sanitized.replace(/;+/g, ';');
    if (sanitized.startsWith(';')) {
      sanitized = sanitized.substring(1);
    }
    const uniqueTags = Array.from(
      new Set(sanitized.split(';').filter((tag) => tag.trim() !== ''))
    );
    return uniqueTags.join(';');
  };

  const handleSearchTypeChange = (type: 'tag' | 'user' | 'garden') => {
    setSearchType(type);
    setSearchValue(''); // Vide le champ de recherche
    setSelectedTags([]); // Réinitialise les tags sélectionnés
    setError(null); // Réinitialise les erreurs
    setSearchMessages({}); // Réinitialise les messages
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      setSearchValue(newTags.join(';'));
      return newTags;
    });
  };

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchType !== 'tag') {
      setSearchValue(e.target.value);
      return;
    }
    const sanitizedValue = sanitizeTagInput(e.target.value);
    setSearchValue(sanitizedValue);
    setSelectedTags(
      sanitizedValue.split(';').filter((tag) => tag.trim() !== '')
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (searchType !== 'tag') return;

    if (e.key === ' ' || e.key === ';') {
      e.preventDefault();
      setSearchValue((prev) => {
        if (prev.endsWith(';') || prev === '') return prev;
        return `${prev};`;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSearchMessages({});
    setHasSearched(true);
    setSearchExecuted(false);

    try {
      if (searchType === 'tag') {
        const tags = searchValue.split(';').filter((tag) => tag.trim() !== '');
        if (tags.length === 0) {
          throw new Error('Please enter at least one valid tag');
        }

        const requestData = { hashtags: tags };
        const results = await Promise.allSettled([
          triggerUsersByTag(requestData),
          triggerGardensByTag(requestData),
        ]);

        // Traitement des réponses
        const [usersResult, gardensResult] = results;

        if (usersResult.status === 'rejected') {
          if (usersResult.reason.data?.isEmpty) {
            setSearchMessages((prev) => ({
              ...prev,
              usersMessage: usersResult.reason.data.message,
            }));
          } else {
            throw usersResult.reason;
          }
        }

        if (gardensResult.status === 'rejected') {
          if (gardensResult.reason.data?.isEmpty) {
            setSearchMessages((prev) => ({
              ...prev,
              gardensMessage: gardensResult.reason.data.message,
            }));
          } else {
            throw gardensResult.reason;
          }
        }
      } else {
        const searchTerm = searchValue.trim();
        if (!searchTerm) {
          throw new Error(`Search term can't be empty`);
        }

        if (searchType === 'user') {
          const result = await triggerUsersByTag({ hashtags: [searchTerm] });
          if (result.error) {
            const errorData = (result.error as any).data;
            if (errorData?.isEmpty) {
              setSearchMessages({ usersMessage: errorData.message });
            }
          }
        } else if (searchType === 'garden') {
          const result = await triggerGardensByTag({ hashtags: [searchTerm] });
          if (result.error) {
            const errorData = (result.error as any).data;
            if (errorData?.isEmpty) {
              setSearchMessages({ gardensMessage: errorData.message });
            }
          }
        }
      }

      setSearchExecuted(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : typeof err === 'object' && err !== null && 'message' in err
              ? String(err.message)
              : 'An error occurred during search'
      );
      setSearchExecuted(false);
    }
  };

  const noUsers =
    searchExecuted && (!usersData?.content || usersData.content.length === 0);
  const noGardens =
    searchExecuted &&
    (!gardensData?.content || gardensData.content.length === 0);
  const noData = searchExecuted && noUsers && noGardens;

  return (
    <Card className="bg-cardbackground max-w-screen px-8 pt-7 pb-5">
      <div className="flex flex-col justify-center">
        <p>The most searched tags:</p>
        <div className="mb-5 flex flex-row flex-wrap gap-2">
          {Array.isArray(hashTags?.content) && hashTags.content.length > 0 ? (
            hashTags.content.slice(0, 5).map((tag: any, index: number) => (
              <SlimCard
                key={index}
                bgColor="bg-bgcard"
                className={`flex w-fit cursor-pointer justify-center px-2 hover:bg-amber-300 active:scale-95 ${
                  selectedTags.includes(tag.tag)
                    ? 'bg-amber-300'
                    : 'bg-amber-200'
                }`}
                onClick={() => handleTagClick(tag.tag)}
              >
                #{tag.tag}
              </SlimCard>
            ))
          ) : (
            <p className="italic">
              <i>No popular tags found</i>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <Radio
              id="Tag"
              name="searchType"
              value="tag"
              checked={searchType === 'tag'}
              onChange={() => handleSearchTypeChange('tag')}
            />
            <Radio
              id="User"
              name="searchType"
              value="user"
              checked={searchType === 'user'}
              onChange={() => handleSearchTypeChange('user')}
            />
            <Radio
              id="Garden"
              name="searchType"
              value="garden"
              checked={searchType === 'garden'}
              onChange={() => handleSearchTypeChange('garden')}
            />
          </div>

          <TextInput
            className="mb-2"
            type="text"
            label={
              searchType === 'tag'
                ? 'Search by tag (separate with ;)'
                : searchType === 'user'
                  ? 'Search by username'
                  : 'Search by garden name'
            }
            name="search"
            placeholder={
              searchType === 'tag'
                ? 'tag1;tag2;tag3'
                : searchType === 'user'
                  ? 'Enter a username'
                  : 'Enter a garden name'
            }
            value={searchValue}
            onChange={handleTagInputChange}
            onKeyDown={handleKeyDown}
          />

          {error && <p className="text-red-500">{error}</p>}
          {searchMessages.usersMessage && (
            <p className="text-blue-500">{searchMessages.usersMessage}</p>
          )}
          {searchMessages.gardensMessage && (
            <p className="text-blue-500">{searchMessages.gardensMessage}</p>
          )}

          <div className="flex justify-center pb-5">
            <Button
              className="bg-bgbutton relative m-5 px-6 py-2"
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      {/* Affichage conditionnel des résultats */}
      {noData && (
        <div className="mb-10 text-center">
          <p>No data found</p>
        </div>
      )}

      {/* Tableau des utilisateurs */}
      {(searchType === 'tag' || searchType === 'user') &&
        searchExecuted &&
        !noData && (
          <div className="mb-10 overflow-x-auto">
            <table className="w-full overflow-x-scroll">
              <thead>
                <tr className="bg-amber-200">
                  <th className="border border-black px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-black px-4 py-2 text-left">
                    XP
                  </th>
                  <th className="border border-black px-4 py-2 text-left">
                    Country
                  </th>
                  <th className="border border-black px-4 py-2 text-left">
                    Biography
                  </th>
                </tr>
              </thead>
              <tbody>
                {noUsers ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="border border-black px-4 py-2 text-left"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  usersData?.content?.map((data: any, index: number) => (
                    <tr key={index}>
                      <td
                        className="cursor-pointer border border-black px-4 py-2 hover:text-blue-500"
                        onClick={() => router.push(`/profile/${data.username}`)}
                      >
                        {data.username}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {data.xp}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {data.country}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {data.bio}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      {/* Tableau des jardins */}
      {(searchType === 'tag' || searchType === 'garden') &&
        searchExecuted &&
        !noData && (
          <div className="mb-5 overflow-x-auto">
            <table className="w-full overflow-x-scroll">
              <thead>
                <tr className="bg-amber-200">
                  <th className="border border-black px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-black px-4 py-2 text-left">
                    Description
                  </th>
                  <th className="border border-black px-4 py-2 text-left">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {noGardens ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="border border-black px-4 py-2 text-left"
                    >
                      No gardens found.
                    </td>
                  </tr>
                ) : (
                  gardensData?.content?.map((data: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-black px-4 py-2">
                        {data.name}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {data.description}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {gardenTypeLabels[data.type] ?? 'Unknown'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
    </Card>
  );
};

export default Explore;
