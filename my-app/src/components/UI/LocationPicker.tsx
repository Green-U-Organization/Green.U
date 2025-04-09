import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TextInput from './TextInput';
import Button from './Button';
import { LocationPickerProps } from '@/utils/types';

// Icône pour la localisation des terrains
const customIcon = new L.Icon({
  iconUrl: '/image/divers/field-location.png',
  iconSize: [30, 38], // Taille de l'icône
  iconAnchor: [15, 38], // Point d'ancrage de l'icône
  popupAnchor: [0, -38], // Point d'ancrage du popup
});

const LocationPicker: React.FC<LocationPickerProps> = ({
  initialLat,
  initialLng,
  onLocationChange,
  readOnly = false,
  multipleMarkers = [],
}) => {
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
      <div className="h-70 overflow-hidden">
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
        <div className="mb-auto flex flex-col items-center gap-2 md:flex-row">
          <TextInput
            type="text"
            label="Latitude"
            name="latitude"
            readOnly
            value={markerPosition.lat.toString()}
          />
          <TextInput
            type="text"
            label="Longitude"
            name="longitude"
            readOnly
            value={markerPosition.lng.toString()}
          />
          <div>
            <Button onClick={handleRemovePin}>Supprimer</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
