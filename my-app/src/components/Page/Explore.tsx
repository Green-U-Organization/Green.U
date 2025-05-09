'use client';
import {
  useLazyGetAllGardensByTagQuery,
  useLazyGetAllUsersByTagQuery,
  useGetPopularTagsQuery,
  useLazyGetUserByUsernameQuery,
  useLazyGetGardensByNameQuery,
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
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [searchMessages, setSearchMessages] = useState<{
    usersMessage?: string;
    gardensMessage?: string;
  }>({});

  const [triggerGardensByTag, { data: gardensData, reset: resetGardens }] =
    useLazyGetAllGardensByTagQuery();
  const [triggerUsersByTag, { data: usersData, reset: resetUsers }] =
    useLazyGetAllUsersByTagQuery();

  const [triggerUserByUsername, { data: userData, reset: resetUser }] =
    useLazyGetUserByUsernameQuery();
  const [triggerGardenByName, { data: gardenData, reset: resetGarden }] =
    useLazyGetGardensByNameQuery();

  //Récupération des 5 tags les plus populaires
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
    setSearchExecuted(false);

    try {
      if (searchType === 'tag') {
        console.log('RECHERCHE PAR TAG');
        const tags = searchValue.split(';').filter((tag) => tag.trim() !== '');
        if (tags.length === 0) {
          throw new Error('Please enter at least one valid tag');
        }

        const requestData = { hashtags: tags };

        //Réinitialisation des données avant la recherche
        resetUsers();
        resetGardens();

        const results = await Promise.allSettled([
          triggerUsersByTag(requestData),
          triggerGardensByTag(requestData),
        ]);

        // Traitement des réponses
        const [usersResult, gardensResult] = results;

        console.log('usersResult : ', usersResult);
        console.log('gardensResult : ', gardensResult);

        // Gestion des erreurs pour les utilisateurs
        if (usersResult.status === 'rejected') {
          if (usersResult.reason.data?.isEmpty) {
            setSearchMessages((prev) => ({
              ...prev,
              usersMessage: usersResult.reason.data.message,
            }));
          } else {
            console.error('User search error:', usersResult.reason);
            setSearchMessages((prev) => ({
              ...prev,
              usersMessage: 'Error searching users',
            }));
          }
        }

        // Gestion des erreurs pour les jardins
        if (gardensResult.status === 'rejected') {
          if (gardensResult.reason.data?.isEmpty) {
            setSearchMessages((prev) => ({
              ...prev,
              gardensMessage: gardensResult.reason.data.message,
            }));
          } else {
            console.error('Garden search error:', gardensResult.reason);
            setSearchMessages((prev) => ({
              ...prev,
              gardensMessage: 'Error searching gardens',
            }));
          }
        }
      } else {
        const searchTerm = searchValue.trim();
        if (!searchTerm) {
          throw new Error(`Search term can't be empty`);
        }

        if (searchType === 'user') {
          //Réinitialise les données users avant une nouvelle recherche
          triggerUsersByTag({ hashtags: [] });
          const result = await triggerUserByUsername({
            username: searchTerm,
          });
          console.log('RESULT USER = ', result);
          if (result.error) {
            const errorData = (result.error as any).data;
            if (errorData?.isEmpty) {
              setSearchMessages({ usersMessage: errorData.message });
            }
          }
        } else if (searchType === 'garden') {
          // Réinitialise les données gardens avant la nouvelle recherche
          triggerGardensByTag({ hashtags: [] });
          const result = await triggerGardensByTag({ hashtags: [searchTerm] });
          console.log('RESULT GARDEN = ', result);
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
      // En cas d'erreur générale, videz les tableaux correspondants
      if (searchType === 'tag') {
        resetUsers();
        resetGardens();
      } else if (searchType === 'user') {
        resetUser();
      } else if (searchType === 'garden') {
        resetGarden();
      }

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
  //const noData = searchExecuted && noUsers && noGardens;

  return (
    <Card className="bg-cardbackground flex h-[90vh] w-full flex-col px-8 pt-7 pb-5">
      {/* Partie supérieure fixe (formulaire) */}
      <div className="flex-shrink-0">
        <p>The most used tags:</p>
        <div className="mb-5 flex flex-row flex-wrap gap-2">
          {Array.isArray(hashTags?.content) && hashTags.content.length > 0 ? (
            hashTags.content.slice(0, 5).map((tag: any, index: number) => (
              <SlimCard
                key={index}
                bgColor="bg-bgcard"
                className={`flex w-fit cursor-pointer justify-center px-2 hover:bg-amber-400 active:scale-95 ${
                  selectedTags.includes(tag.tag)
                    ? 'bg-amber-400'
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
            className="mb-0!"
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
            <p className="text-red-500">{searchMessages.usersMessage}</p>
          )}
          {searchMessages.gardensMessage && (
            <p className="text-red-500">{searchMessages.gardensMessage}</p>
          )}

          <div className="flex justify-center pb-2">
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
      {/* {noData && (
        <div className="mb-10 text-center">
          <p>No data found</p>
        </div>
      )} */}

      {/* Tableau des utilisateurs */}
      {(searchType === 'tag' || searchType === 'user') && searchExecuted && (
        <div className="mb-10 max-h-[40vh] overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-amber-200">
                <th className="border border-black px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-black px-4 py-2 text-left">XP</th>
                <th className="border border-black px-4 py-2 text-left">
                  Country
                </th>
                <th className="border border-black px-4 py-2 text-left">
                  Biography
                </th>
              </tr>
            </thead>
            <tbody>
              {searchType === 'tag' ? (
                /* Mode recherche par tag */
                !usersData?.content?.length ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="border border-black px-4 py-2 text-left"
                    >
                      {searchMessages.usersMessage ||
                        'No users found with these tags'}
                    </td>
                  </tr>
                ) : (
                  (usersData as UsersResponse).content.map((user: User) => (
                    <tr key={user.id}>
                      <td
                        className="hover:text-border cursor-pointer border border-black px-4 py-2 align-top"
                        onClick={() =>
                          router.push(`/profile/public/${user.id}`)
                        }
                      >
                        {user.username}
                      </td>
                      <td className="border border-black px-4 py-2 align-top">
                        {user.xp}
                      </td>
                      <td className="border border-black px-4 py-2 align-top">
                        {user.country}
                      </td>
                      <td className="border border-black px-4 py-2 align-top">
                        {user.bio}
                      </td>
                    </tr>
                  ))
                )
              ) : /* Mode recherche directe */
              !userData?.content ? (
                <tr>
                  <td
                    colSpan={4}
                    className="border border-black px-4 py-2 text-left"
                  >
                    {searchMessages.usersMessage || 'User not found'}
                  </td>
                </tr>
              ) : (
                <tr key={userData.content.id}>
                  <td
                    className="hover:text-border cursor-pointer border border-black px-4 py-2 align-top"
                    onClick={() =>
                      router.push(`/profile/public?id=${userData.content.id}`)
                    }
                  >
                    {userData.content.username}
                  </td>
                  <td className="border border-black px-4 py-2 align-top">
                    {userData.content.xp}
                  </td>
                  <td className="border border-black px-4 py-2 align-top">
                    {userData.content.country}
                  </td>
                  <td className="border border-black px-4 py-2 align-top">
                    {userData.content.bio}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tableau des jardins */}
      {(searchType === 'tag' || searchType === 'garden') && searchExecuted && (
        <div className="mb-5 max-h-[20vh] overflow-x-auto overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="sticky top-0 bg-amber-200">
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
              {!gardensData?.content || gardensData.content.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="border border-black px-4 py-2 text-left"
                  >
                    No gardens found.
                  </td>
                </tr>
              ) : (
                gardensData.content.map((data: any, index: number) => (
                  <tr key={index}>
                    <td
                      className="hover:text-border cursor-pointer border border-black px-4 py-2 align-top"
                      onClick={() =>
                        router.push(`/garden/display?id=${data.id}`)
                      }
                    >
                      {data.name}
                    </td>
                    <td className="border border-black px-4 py-2 align-top">
                      {data.description}
                    </td>
                    <td className="border border-black px-4 py-2 align-top">
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
