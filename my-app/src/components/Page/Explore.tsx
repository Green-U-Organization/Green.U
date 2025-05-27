'use client';
import {
  useLazyGetAllGardensByTagQuery,
  useLazyGetAllUsersByTagQuery,
  useGetPopularTagsQuery,
  useLazyGetUserByUsernameQuery,
  useLazyGetGardensByNameQuery,
  useGetUserByIdQuery,
} from '@/redux/api/fetch';
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
import { useLanguage } from '@/app/contexts/LanguageProvider';
import {
  clearSelectedGarden,
  setSelectedGarden,
} from '@/redux/garden/gardenSlice';
import { RootState, useDispatch, useSelector } from '@/redux/store';
import { setUserData } from '@/redux/user/userSlice';
import Cookies from 'js-cookie';
import { MapIcon } from 'lucide-react';

const Explore = () => {
  // Selectors

  //Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  //Cookies
  const userDataC = Cookies.get('user_data');
  const userCookie = userDataC ? JSON.parse(userDataC) : null;
  const id = Number(userCookie?.id);

  //RTK Query
  const user = useGetUserByIdQuery({ userId: id });

  //UserStore
  const userStored = useSelector((state: RootState) => state.user.userData);
  if (!userStored) {
    if (user.data) {
      console.log(user.data.content);
      dispatch(setUserData(user.data.content));
    }
  }
  // //Check du State global du garden si jamais refresh de la page
  // if (!currentGarden && garden) {
  //   const parsedGarden: Garden = JSON.parse(garden);
  //   dispatch(setSelectedGarden(parsedGarden));
  // }

  const { translations } = useLanguage();

  const gardenTypeLabels: Record<number, string> = {
    0: translations.gardenType0,
    1: translations.gardenType1,
    2: translations.gardenType2,
    3: translations.gardenType3,
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
    if (type !== 'tag') {
      setIsPopularTagsVisible(false);
    } else {
      setIsPopularTagsVisible(true);
    }
  };

  // Mise à jour de la liste des tags à rechercher lors d'un clic
  // sur l'un des tags de la liste des tags les plus utilisés
  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      setSearchValue(newTags.join(';'));
      if (error) {
        setError(null);
      }
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
    if (error) {
      setError(null);
    }
  };

  // Lorsqu'on appuie sur une touche lors de la saisie dans l'input
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    //Pour empêcher la carte de s'ouvrir lorsqu'on saisi le nom d'un jardin
    //et qu'on appuie sur Enter
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
    }
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
        setError(translations.errSearchTerm);
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
              usersResponse.data?.message || translations.noUserFoundTags,
          }));
        }

        if (gardensResponse.isError || gardensResponse.data?.isEmpty) {
          setSearchMessages((prev) => ({
            ...prev,
            gardensMessage:
              gardensResponse.data?.message || translations.noGardenWithTags,
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
      setError(translations.errSearchingTag);
    }
  };

  return (
    <Card className="bg-cardbackground flex h-screen min-h-screen w-full flex-col px-5 pt-5 pb-23 select-none!">
      {/* Zone des résultats avec défilement */}
      <div className="mb-5 flex-1 overflow-y-auto">
        {isPopularTagsVisible && (
          <>
            <p>{translations.usedTags}</p>
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
                  <i>{translations.noPopularTags}</i>
                </p>
              )}
            </div>
          </>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <Radio
              id={translations.tag}
              name="searchType"
              value="tag"
              checked={searchType === 'tag'}
              onChange={() => handleSearchTypeChange('tag')}
            />
            <Radio
              id={translations.user}
              name="searchType"
              value="user"
              checked={searchType === 'user'}
              onChange={() => handleSearchTypeChange('user')}
            />
            <Radio
              id={translations.garden}
              name="searchType"
              value="garden"
              checked={searchType === 'garden'}
              onChange={() => handleSearchTypeChange('garden')}
            />
          </div>

          {searchType === 'garden' && (
            <div className="content-base mb-4 flex items-center">
              <p className="flex items-center gap-2">
                {translations.searchOnTheMap}
                <button
                  className="cursor-pointer transition duration-150"
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    router.push('/map');
                  }}
                >
                  <MapIcon className="text-border hover:text-shadow active:text-border h-7 w-7 active:scale-90" />
                </button>
              </p>
            </div>
          )}

          <TextInput
            className="mb-5!"
            type="text"
            label={
              searchType === 'tag'
                ? translations.searchByTag
                : searchType === 'user'
                  ? translations.searchByUsername
                  : translations.searchByGardenName
            }
            name="search"
            placeholder={
              searchType === 'tag'
                ? 'tag1;tag2;tag3'
                : searchType === 'user'
                  ? translations.enterUsername
                  : translations.enterGardenName
            }
            value={searchValue}
            onChange={handleTagInputChange}
            onKeyDown={handleKeyDown}
          />

          {error && <p className="text-txterror">{error}</p>}
        </form>

        {/* Affichage conditionnel des résultats */}
        {searchExecuted && (
          <>
            <div>
              {/* Résultats pour les utilisateurs */}
              {(searchType === 'tag' || searchType === 'user') && (
                <>
                  <div className="sticky flex items-center gap-2">
                    <h3 className="text-m">{translations.users}</h3>
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
                          alt={translations.hide}
                          className="h-3 w-4 rotate-180 transform"
                        />
                      ) : (
                        <Image
                          width={50}
                          height={50}
                          src="/image/icons/chevronBas.png"
                          alt={translations.show}
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
                                {translations.theadName}
                              </th>
                              <th className="border border-black px-4 py-2 text-left">
                                {translations.theadXp}
                              </th>
                              <th className="border border-black px-4 py-2 text-left">
                                {translations.theadCountry}
                              </th>
                              <th className="border border-black px-4 py-2 text-left">
                                {translations.theadBio}
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
                                        {user.bio || translations.noBio}
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
                                        translations.noUserFoundTags}
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
                                    {translations.noUserFound}
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
                                        {user.bio || translations.noBio}
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
                    <h3 className="text-m">{translations.gardens}</h3>
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
                          alt={translations.hide}
                          className="h-3 w-4 rotate-180 transform"
                        />
                      ) : (
                        <Image
                          width={50}
                          height={50}
                          src="/image/icons/chevronBas.png"
                          alt={translations.show}
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
                                {translations.theadName}
                              </th>
                              <th className="border border-black px-4 py-2 text-left">
                                {translations.theadDescription}
                              </th>
                              <th className="border border-black px-4 py-2 text-left">
                                {translations.theadType}
                              </th>
                              <th className="border border-black px-4 py-2 text-left">
                                {translations.theadPrivacy}
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
                                          translations.unknown}
                                      </td>
                                      <td className="border border-black px-4 py-2">
                                        {garden.privacy === 0 ? (
                                          <Image
                                            width={50}
                                            height={50}
                                            src="/image/icons/lockClose.png"
                                            alt={translations.private}
                                            className="h-10 w-10"
                                          />
                                        ) : garden.privacy === 2 ? (
                                          <Image
                                            width={50}
                                            height={50}
                                            src="/image/icons/lockOpen.png"
                                            alt={translations.public}
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
                                        translations.noGardenWithTags}
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
                                      translations.noGardenFound}
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
                                          translations.unknown}
                                      </td>
                                      <td className="border border-black px-4 py-2">
                                        {garden.privacy === 0 ? (
                                          <Image
                                            width={50}
                                            height={50}
                                            src="/image/icons/lockClose.png"
                                            alt={translations.private}
                                            className="h-10 w-10"
                                          />
                                        ) : garden.privacy === 2 ? (
                                          <Image
                                            width={50}
                                            height={50}
                                            src="/image/icons/lockOpen.png"
                                            alt={translations.public}
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
                                        translations.noGardenFound}
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
            {translations.home}
          </Button>
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            type="submit"
            onClick={handleSearchClick}
          >
            {translations.search}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Explore;
