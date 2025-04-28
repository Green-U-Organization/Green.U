import LocationPicker from '@/components/UI/LocationPicker';

const Map = () => {
  return (
    <LocationPicker
      readOnly={true}
      multipleMarkers={[
        { lat: 50.65, lng: 5.35 },
        { lat: 50.7, lng: 5.4 },
        { lat: 50.66899394836384, lng: 5.572265633381904 },
      ]}
      enableRadius={true}
      showUserPosition={true}
    />
  );
};

export default Map;
