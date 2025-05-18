'use client';
import LocationPicker from '@/components/UI/LocationPicker';
import { useGetAllGardensLocalisationQuery } from '@/slice/fetch';

const Map = () => {
  const { data: gardens, error } = useGetAllGardensLocalisationQuery();

  if (error) {
    console.log("Error in Gardens' location");
  }

  return (
    <LocationPicker
      readOnly={true}
      multipleMarkers={gardens?.content?.map((g) => ({
        garden: g,
      }))}
      enableRadius={true}
      showUserPosition={true}
    />
  );
};

export default Map;
