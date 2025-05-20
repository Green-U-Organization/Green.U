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
import { Tag } from '@/utils/types';
import Image from 'next/image';
import { setSelectedGardenCookies } from '@/utils/selectedGardenCookies';

import {
  clearSelectedGarden,
  setSelectedGarden,
} from '@/redux/garden/gardenSlice';
import { useDispatch } from '@/redux/store';

const Explore = () => {
  // Selectors

  //Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  // //Check du State global du garden si jamais refresh de la page
  // if (!currentGarden && garden) {
  //   const parsedGarden: Garden = JSON.parse(garden);
  //   dispatch(setSelectedGarden(parsedGarden));
  // }

  const gardenTypeLabels: Record<number, string> = {
    0: 'Personnal',
    1: 'Famillial',
    2: 'Collective',
    3: 'Professionnal',
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchType, setSearchType] = useState<'tag' | 'user' | 'garden'>(
    'tag'
  );
  const [isUsersTableVisible, setIsUsersTableVisible] = useState(true);
  const [isGardensTableVisible, setIsGardensTableVisible] = useState(true);
  const [isPopularTagsVisible, setIsPopularTagsVisible] = useState(true);
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
    type !== 'tag'
      ? setIsPopularTagsVisible(false)
      : setIsPopularTagsVisible(true);
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

  // Fonction pour gérer le clic du bouton
  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Crée un événement de formulaire factice pour appeler handleSubmit
    const formEvent = {
      preventDefault: () => {},
      currentTarget: document.createElement('form'),
    } as React.FormEvent<HTMLFormElement>;
    handleSubmit(formEvent);
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

        // console.log('usersResponseByTag : ', usersResponse); //A EFFACER
        // console.log('gardenResponseByTag : ', gardensResponse); //A EFFACER

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
        await triggerUserByUsername({
          username: searchTerm,
        });
      } else if (searchType === 'garden') {
        await triggerGardenByName({ inputuser: searchTerm });

        //console.log('gardensByName : ', result); //A EFFACER
        //console.log('gardenStatus : ', gardenStatus); //A EFFACER
      }

      setSearchExecuted(true);
    } catch {
      setError('error searching tags');
    }
  };

  return (
    <Card className="bg-cardbackground flex h-screen min-h-screen w-full flex-col px-5 pt-5 pb-23">
      {/* Zone des résultats avec défilement */}
      <div className="mb-5 flex-1 overflow-y-auto">
        {isPopularTagsVisible && (
          <>
            <p>The most used tags:</p>
            <div className="mb-5 flex flex-row flex-wrap gap-2">
              {Array.isArray(hashTags?.content) &&
              hashTags.content.length > 0 ? (
                hashTags.content.slice(0, 5).map((tag: Tag) => (
                  <SlimCard
                    key={tag.tag}
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
          </>
        )}
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
            className="mb-5!"
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

          {error && <p className="text-txterror">{error}</p>}
          {/* {searchMessages.usersMessage && (
            <p className="text-red-500">{searchMessages.usersMessage}</p>
          )}
          {searchMessages.gardensMessage && (
            <p className="text-red-500">{searchMessages.gardensMessage}</p>
          )} */}
        </form>

        {/* Affichage conditionnel des résultats */}
        {searchExecuted && (
          <>
            <div>
              {/* Résultats pour les utilisateurs */}
              {(searchType === 'tag' || searchType === 'user') && (
                <>
                  <div className="sticky flex items-center gap-2">
                    <h3 className="text-m">Users</h3>
                    <button
                      onClick={() =>
                        setIsUsersTableVisible(!isUsersTableVisible)
                      }
                    >
                      {isUsersTableVisible ? (
                        <Image
                          width={50}
                          height={50}
                          src="/image/icons/chevronBas.png"
                          alt="Cacher"
                          className="h-3 w-4 rotate-180 transform"
                        />
                      ) : (
                        <Image
                          width={50}
                          height={50}
                          src="/image/icons/chevronBas.png"
                          alt="Afficher"
                          className="h-3 w-4"
                        />
                      )}
                    </button>
                  </div>
                  <div className="mb-5 overflow-x-auto">
                    {isUsersTableVisible && (
                      <div>
                        <table className="w-full max-w-full">
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
                                        className="cursor-pointer border border-black px-4 py-2 text-amber-500 hover:text-amber-600"
                                        onClick={() =>
                                          router.push(
                                            `/profile/public/${user.id}`
                                          )
                                        }
                                      >
                                        {user.username}
                                      </td>
                                      <td className="border border-black px-4 py-2">
                                        {user.xp || 0}
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
                                        'No user found with these tags'}
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

                            {searchType === 'user' ? (
                              userStatus === 'rejected' ? (
                                <tr>
                                  <td
                                    colSpan={4}
                                    className="border border-black px-4 py-2 text-center"
                                  >
                                    {searchMessages.usersMessage || ''}
                                    {'No user found'}
                                  </td>
                                </tr>
                              ) : userData?.content ? (
                                userData.content.length > 0 ? (
                                  userData.content.map((user) => (
                                    <tr key={user.id}>
                                      <td
                                        className="cursor-pointer border border-black px-4 py-2 text-amber-500 hover:text-amber-600"
                                        onClick={() =>
                                          router.push(
                                            `/profile/public/${user.id}`
                                          )
                                        }
                                      >
                                        {user.username}
                                      </td>
                                      <td className="border border-black px-4 py-2">
                                        {user.xp || 0}
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
                  </div>
                </>
              )}

              {/* Résultats pour les jardins */}
              {(searchType === 'tag' || searchType === 'garden') && (
                <>
                  <div className="sticky flex items-center gap-2">
                    <h3 className="text-m">Gardens</h3>
                    <button
                      onClick={() =>
                        setIsGardensTableVisible(!isGardensTableVisible)
                      }
                    >
                      {isGardensTableVisible ? (
                        <Image
                          width={50}
                          height={50}
                          src="/image/icons/chevronBas.png"
                          alt="Cacher"
                          className="h-3 w-4 rotate-180 transform"
                        />
                      ) : (
                        <Image
                          width={50}
                          height={50}
                          src="/image/icons/chevronBas.png"
                          alt="Afficher"
                          className="h-3 w-4"
                        />
                      )}
                    </button>
                  </div>
                  <div className="mb-5 overflow-x-auto">
                    {isGardensTableVisible && (
                      <div>
                        <table className="w-full max-w-full">
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
                              <th className="border border-black px-4 py-2 text-left">
                                Privacy
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/*Recherche par tags*/}
                            {searchType === 'tag' ? (
                              gardensStatus === 'rejected' ? (
                                <tr>
                                  <td
                                    colSpan={4}
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
                                        className={`border border-black px-4 py-2 ${garden.privacy === 2 ? 'cursor-pointer text-amber-500 hover:text-amber-600' : ''}`}
                                        onClick={() => {
                                          if (garden.privacy === 2) {
                                            dispatch(setSelectedGarden(garden));
                                            clearSelectedGarden();
                                            setSelectedGardenCookies(garden);
                                            router.push(`/garden/display`);
                                          }
                                        }}
                                      >
                                        {garden.name}
                                      </td>
                                      <td className="border border-black px-4 py-2">
                                        {garden.description || 'N/A'}
                                      </td>
                                      <td className="border border-black px-4 py-2">
                                        {gardenTypeLabels[garden.type] ??
                                          'Unknown'}
                                      </td>
                                      <td className="border border-black px-4 py-2">
                                        {garden.privacy === 0 ? (
                                          <Image
                                            width={50}
                                            height={50}
                                            src="/image/icons/lockClose.png"
                                            alt="Private"
                                            className="h-10 w-10"
                                          />
                                        ) : garden.privacy === 2 ? (
                                          <Image
                                            width={50}
                                            height={50}
                                            src="/image/icons/lockOpen.png"
                                            alt="Public"
                                            className="h-10 w-10"
                                          />
                                        ) : (
                                          'N/A'
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className="border border-black px-4 py-2 text-center"
                                    >
                                      {searchMessages.gardensMessage ||
                                        'No garden found with these tags'}
                                    </td>
                                  </tr>
                                )
                              ) : (
                                <tr>
                                  <td
                                    colSpan={4}
                                    className="border border-black px-4 py-2 text-center"
                                  >
                                    {searchMessages.gardensMessage ||
                                      'No garden found (no content)'}
                                  </td>
                                </tr>
                              )
                            ) : null}

                            {/*Recherche par name*/}
                            {searchType === 'garden' ? (
                              gardenStatus === 'rejected' ? (
                                <tr>
                                  <td
                                    colSpan={4}
                                    className="border border-black px-4 py-2 text-center"
                                  >
                                    {searchMessages.gardensMessage ||
                                      'No garden found'}
                                    {/*Garden by name rejected */}
                                  </td>
                                </tr>
                              ) : gardenData?.content ? (
                                gardenData.content.length > 0 ? (
                                  gardenData.content.map((garden) => (
                                    <tr key={garden.id}>
                                      <td
                                        className={`border border-black px-4 py-2 ${garden.privacy === 2 ? 'cursor-pointer text-amber-500 hover:text-amber-600' : ''}`}
                                        onClick={() => {
                                          if (garden.privacy === 2) {
                                            dispatch(setSelectedGarden(garden));
                                            clearSelectedGarden();
                                            setSelectedGardenCookies(garden);
                                            router.push(`/garden/display`);
                                          }
                                        }}
                                      >
                                        {garden.name}
                                      </td>
                                      <td className="border border-black px-4 py-2">
                                        {garden.description || 'N/A'}
                                      </td>
                                      <td className="border border-black px-4 py-2">
                                        {gardenTypeLabels[garden.type] ??
                                          'Unknown'}
                                      </td>
                                      <td className="border border-black px-4 py-2">
                                        {garden.privacy === 0 ? (
                                          <Image
                                            width={50}
                                            height={50}
                                            src="/image/icons/lockClose.png"
                                            alt="Private"
                                            className="h-10 w-10"
                                          />
                                        ) : garden.privacy === 2 ? (
                                          <Image
                                            width={50}
                                            height={50}
                                            src="/image/icons/lockOpen.png"
                                            alt="Public"
                                            className="h-10 w-10"
                                          />
                                        ) : (
                                          'N/A'
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className="border border-black px-4 py-2 text-center"
                                    >
                                      {searchMessages.gardensMessage ||
                                        'No garden found'}
                                      {/*Garden by name not found (length===0)*/}
                                    </td>
                                  </tr>
                                )
                              ) : (
                                <tr>
                                  <td
                                    colSpan={4}
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
                  </div>
                </>
              )}
            </div>
          </>
        )}
        {/* Bouton fixe en bas de l'écran */}
        <div className="fixed right-0 bottom-0 left-0 flex justify-center p-4">
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            type="button"
            onClick={() => router.push('landing')}
          >
            Home
          </Button>
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            type="submit"
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Explore;
