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

  const [
    triggerGardensByTag,
    { status: gardensStatus, data: gardensData, reset: resetGardens },
  ] = useLazyGetAllGardensByTagQuery();
  const [
    triggerUsersByTag,
    { status: usersStatus, data: usersData, reset: resetUsers },
  ] = useLazyGetAllUsersByTagQuery();

  const [
    triggerUserByUsername,
    { status: userStatus, data: userData, reset: resetUser },
  ] = useLazyGetUserByUsernameQuery();
  const [
    triggerGardenByName,
    { status: gardenStatus, data: gardenData, reset: resetGarden },
  ] = useLazyGetGardensByNameQuery();

  // Récupération des 5 tags les plus populaires
  const { data: hashTags } = useGetPopularTagsQuery();

  // Filtrage des tags saisis
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

  // Réinitialisation lors d'un changement de type de recherche
  const handleSearchTypeChange = (type: 'tag' | 'user' | 'garden') => {
    setSearchType(type);
    setSearchValue('');
    setSelectedTags([]);
    setError(null);
    setSearchMessages({});
    setSearchExecuted(false);
  };

  // Mise à jour de la liste des tags à rechercher lors d'un clic
  // sur l'un des tags de la liste des tags les plus utilisés
  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      setSearchValue(newTags.join(';'));
      return newTags;
    });
  };

  // Lorsque l'input de recherche change on fait ceci :
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

  // Lorsqu'on appuie sur une touche lors de la saisie dans l'input
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

  // Fonction exécutée lors du clic sur le bouton "Search"
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSearchMessages({});
    setSearchExecuted(false);

    try {
      const searchTerm = searchValue.trim();
      if (!searchTerm) {
        setError(`Search term can't be empty`);
        return;
      }

      resetUsers();
      resetUser();
      resetGardens();
      resetGarden();

      if (searchType === 'tag') {
        const tags = searchTerm.split(';').filter((tag) => tag.trim() !== '');

        const requestData = { hashtags: tags };

        const [usersResponse, gardensResponse] = await Promise.all([
          triggerUsersByTag(requestData),
          triggerGardensByTag(requestData),
        ]);

        console.log('usersResponseByTag : ', usersResponse); //A EFFACER
        console.log('gardenResponseByTag : ', gardensResponse); //A EFFACER

        if (usersResponse.isError || usersResponse.data?.isEmpty) {
          setSearchMessages((prev) => ({
            ...prev,
            usersMessage:
              usersResponse.data?.message || 'No user found with these tags',
          }));
        }

        if (gardensResponse.isError || gardensResponse.data?.isEmpty) {
          setSearchMessages((prev) => ({
            ...prev,
            gardensMessage:
              gardensResponse.data?.message ||
              'No garden found with these tags',
          }));
        }
      } else if (searchType === 'user') {
        const result = await triggerUserByUsername({
          username: searchTerm,
        });

        console.log('usersByUsername : ', result); //A EFFACER
      } else if (searchType === 'garden') {
        const result = await triggerGardenByName({ inputuser: searchTerm });

        console.log('gardensByName : ', result); //A EFFACER
        console.log('gardenStatus : ', gardenStatus); //A EFFACER
      }

      setSearchExecuted(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card className="bg-cardbackground flex h-[92vh] w-full flex-col px-5 pt-5 pb-5">
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
          {/* {searchMessages.usersMessage && (
            <p className="text-red-500">{searchMessages.usersMessage}</p>
          )}
          {searchMessages.gardensMessage && (
            <p className="text-red-500">{searchMessages.gardensMessage}</p>
          )} */}

          <div className="flex justify-center pb-2">
            <Button
              className="bg-bgbutton relative m-5 px-6 py-2"
              type="submit"
            >
              Search
            </Button>
            <Button
              className="bg-bgbutton relative m-5 px-6 py-2"
              type="button"
              onClick={() => router.push('landing')}
            >
              Home
            </Button>
          </div>
        </form>
      </div>

      {/* Affichage conditionnel des résultats */}
      {searchExecuted && (
        <>
          {/* Résultats pour les utilisateurs */}
          {(searchType === 'tag' || searchType === 'user') && (
            <div className="mb-5 max-h-[40vh] overflow-auto">
              <h3 className="text-lg font-semibold">Users</h3>
              <table className="w-full">
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
                  {/*Recherche par tags*/}
                  {searchType === 'tag' ? (
                    usersStatus === 'rejected' ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="border border-black px-4 py-2 text-center"
                        >
                          {searchMessages.usersMessage ||
                            'Users by tags rejected'}
                        </td>
                      </tr>
                    ) : usersData?.content ? (
                      usersData.content.length > 0 ? (
                        usersData.content.map((user) => (
                          <tr key={user.id}>
                            <td
                              className="cursor-pointer border border-black px-4 py-2 hover:text-amber-600"
                              onClick={() =>
                                router.push(`/profile/public/${user.id}`)
                              }
                            >
                              {user.username}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {user.xp || 'N/A'}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {user.country || 'N/A'}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {user.bio || 'No bio'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="border border-black px-4 py-2 text-center"
                          >
                            {searchMessages.usersMessage ||
                              'User by tags not found (length===0)'}
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="border border-black px-4 py-2 text-center"
                        >
                          {searchMessages.usersMessage ||
                            'User by tags not found (no content)'}
                        </td>
                      </tr>
                    )
                  ) : null}

                  {/*Recherche par username*/}
                  {searchType === 'user' ? (
                    userStatus === 'rejected' ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="border border-black px-4 py-2 text-center"
                        >
                          {searchMessages.usersMessage ||
                            'Users by username rejected'}
                        </td>
                      </tr>
                    ) : userData?.content ? (
                      userData.content.length > 0 ? (
                        userData.content.map((user) => (
                          <tr key={user.id}>
                            <td
                              className="cursor-pointer border border-black px-4 py-2 hover:text-amber-600"
                              onClick={() =>
                                router.push(`/profile/public/${user.id}`)
                              }
                            >
                              {user.username}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {user.xp || 'N/A'}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {user.country || 'N/A'}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {user.bio || 'No bio'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="border border-black px-4 py-2 text-center"
                          >
                            {searchMessages.usersMessage ||
                              'User by username not found (length===0)'}
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="border border-black px-4 py-2 text-center"
                        >
                          {searchMessages.usersMessage ||
                            'User by username not found (no content)'}
                        </td>
                      </tr>
                    )
                  ) : null}
                </tbody>
              </table>
            </div>
          )}

          {/* Résultats pour les jardins */}
          {(searchType === 'tag' || searchType === 'garden') && (
            <div className="mb-5 max-h-[40vh] overflow-auto">
              <h3 className="text-lg font-semibold">Gardens</h3>
              <table className="w-full">
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
                  {/*Recherche par tags*/}
                  {searchType === 'tag' ? (
                    gardensStatus === 'rejected' ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="border border-black px-4 py-2 text-center"
                        >
                          {searchMessages.gardensMessage ||
                            'Garden by tags rejected'}
                        </td>
                      </tr>
                    ) : gardensData?.content ? (
                      gardensData.content.length > 0 ? (
                        gardensData.content.map((garden) => (
                          <tr key={garden.id}>
                            <td
                              className={`border border-black px-4 py-2 ${garden.type === 2 ? 'cursor-pointer hover:text-amber-600' : ''}`}
                              onClick={() =>
                                garden.type === 2 &&
                                router.push(`/garden/display?id=${garden.id}`)
                              }
                            >
                              {garden.name}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {garden.description || 'N/A'}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {gardenTypeLabels[garden.type] ?? 'Unknown'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="border border-black px-4 py-2 text-center"
                          >
                            {searchMessages.gardensMessage ||
                              'Garden not found (length===0)'}
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="border border-black px-4 py-2 text-center"
                        >
                          {searchMessages.gardensMessage ||
                            'No garden found (pas de content)'}
                        </td>
                      </tr>
                    )
                  ) : null}

                  {/*Recherche par name*/}
                  {searchType === 'garden' ? (
                    gardenStatus === 'rejected' ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="border border-black px-4 py-2 text-center"
                        >
                          {searchMessages.gardensMessage ||
                            'Garden by name rejected'}
                        </td>
                      </tr>
                    ) : gardenData?.content ? (
                      gardenData.content.length > 0 ? (
                        gardenData.content.map((garden) => (
                          <tr key={garden.id}>
                            <td
                              className={`border border-black px-4 py-2 ${garden.type === 2 ? 'cursor-pointer hover:text-amber-600' : ''}`}
                              onClick={() =>
                                garden.type === 2 &&
                                router.push(`/garden/display?id=${garden.id}`)
                              }
                            >
                              {garden.name}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {garden.description || 'N/A'}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {gardenTypeLabels[garden.type] ?? 'Unknown'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="border border-black px-4 py-2 text-center"
                          >
                            {searchMessages.gardensMessage ||
                              'Garden by name not found (length===0)'}
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="border border-black px-4 py-2 text-center"
                        >
                          {searchMessages.gardensMessage ||
                            'Garden by name not found (no content)'}
                        </td>
                      </tr>
                    )
                  ) : null}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default Explore;
