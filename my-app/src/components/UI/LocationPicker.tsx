import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TextInput from './TextInput';
import Button from './Button';
import { LocationPickerProps } from '@/utils/types';

// Icône pour la localisation des terrains
const customIcon = L.icon({
  iconUrl: '/image/divers/field-location-v2.png',
  iconSize: [30, 26],
  iconAnchor: [15, 26],
  popupAnchor: [0, -26],
});

const LocationPicker: React.FC<LocationPickerProps> = ({
  initialLat,
  initialLng,
  onLocationChange,
  readOnly = false,
  multipleMarkers = [],
}) => {
  const { translations } = useLanguage();

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(
    initialLat && initialLng ? { lat: initialLat, lng: initialLng } : null
  );

  const [userPosition, setUserPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (
      !markerPosition &&
      multipleMarkers.length === 0 &&
      navigator.geolocation
    ) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn('Erreur de géolocalisation : ', error);
        }
      );
    }
  }, [markerPosition, multipleMarkers]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (readOnly || markerPosition) return;
        const { lat, lng } = e.latlng;
        setMarkerPosition({ lat, lng });
        onLocationChange?.(lat, lng);
      },
    });
    return null;
  };

  const handleRemovePin = () => {
    setMarkerPosition(null);
    onLocationChange?.(0, 0);
  };

  return (
    <div className={`flex flex-col ${markerPosition ? 'mb-0' : 'mb-5'}`}>
      <p>{translations.addGardenPosition}</p>
      <div className="mb-2 h-70 overflow-hidden">
        <MapContainer
          center={
            markerPosition ||
            multipleMarkers[0] ||
            userPosition || { lat: 50.8503, lng: 4.3517 } //Bruxelles
          }
          zoom={13}
          scrollWheelZoom={true}
          className="z-0 h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {!readOnly && <MapClickHandler />}
          {markerPosition && !readOnly && (
            <Marker position={markerPosition} icon={customIcon} />
          )}
          {readOnly &&
            multipleMarkers.map((pos, idx) => (
              <Marker key={idx} position={pos} icon={customIcon} />
            ))}
        </MapContainer>
      </div>

      {!readOnly && markerPosition && (
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex-1">
            <TextInput
              type="text"
              label={translations.latitude}
              name="latitude"
              readOnly
              value={markerPosition.lat.toString()}
              className="mb-0!"
            />
          </div>
          <div className="flex-1">
            <TextInput
              type="text"
              label={translations.longitude}
              name="longitude"
              readOnly
              value={markerPosition.lng.toString()}
              className="mb-0!"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={handleRemovePin}>{translations.deletePin}</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
