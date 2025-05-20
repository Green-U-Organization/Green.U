'use client';
import LocationPicker from '@/components/UI/LocationPicker';
import { useGetAllGardensLocalisationQuery } from '@/slice/fetch';

const Map = () => {
  const {
    data: gardens,
    error,
    isLoading,
    isFetching,
  } = useGetAllGardensLocalisationQuery();

  if (isLoading || isFetching) {
    return <p className="text-center">Loading the map...</p>;
  }

  if (error) {
    console.error('Erreur lors de la récupération des localisations :', error);
    return (
      <p className="text-center text-red-600">
        An error occurred while loading the map.
      </p>
    );
  }

  if (!gardens || !gardens.content) {
    return <p className="text-center">No gardens to display.</p>;
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
