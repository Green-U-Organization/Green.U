'use client';
import LocationPicker from '@/components/UI/LocationPicker';
import { useGetAllGardensLocalisationQuery } from '@/redux/api/fetch';
import { useLanguage } from '@/app/contexts/LanguageProvider';

const Map = () => {
  const {
    data: gardens,
    error,
    isLoading,
    isFetching,
  } = useGetAllGardensLocalisationQuery();

  const { translations } = useLanguage();

  if (isLoading || isFetching) {
    return <p className="text-center">{translations.loadingMap}</p>;
  }

  if (error) {
    console.error(translations.errRetrievingLocations, error);
    return (
      <p className="text-txterror text-center">{translations.errLoadingMap}</p>
    );
  }

  if (!gardens || !gardens.content) {
    return <p className="text-center">{translations.noGarden}</p>;
  }

  return (
    <LocationPicker
      readOnly={true}
      multipleMarkers={gardens.content.map((g) => ({
        garden: g,
      }))}
      enableRadius={true}
      showUserPosition={true}
    />
  );
};

export default Map;
