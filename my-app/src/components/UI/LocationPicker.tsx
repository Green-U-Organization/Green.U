'use client';
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap,
  useMapEvents,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import { LocationPickerProps } from '@/utils/types';
import { useLanguage } from '@/app/contexts/LanguageProvider';

// Recentrer dynamiquement la map sur la position utilisateur
const CenterMapOnUser: React.FC<{ position: { lat: number; lng: number } }> = ({
  position,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 13); // tu peux changer le zoom ici
  }, [position, map]);

  return null;
};

// Icône pour la localisation des terrains
const customIcon = L.icon({
  iconUrl: '/image/divers/field-location-v2.png',
  iconSize: [30, 26],
  iconAnchor: [15, 26],
  popupAnchor: [0, -26],
});

// Icône de l'utilisateur
const customUserIcon = L.icon({
  iconUrl: '/image/divers/my-location.png',
  iconSize: [25.5, 38], // Taille de l'icône
  iconAnchor: [12.75, 38], // Point d'ancrage de l'icône
  popupAnchor: [0, -38], // Point d'ancrage du popup
});

const LocationPicker: React.FC<LocationPickerProps> = ({
  initialLat,
  initialLng,
  onLocationChange,
  readOnly = false,
  multipleMarkers = [],
  enableRadius = false,
  showUserPosition = false,
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

  const [radius, setRadius] = useState<number>(5);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {}, [translations]);

  useEffect(() => {
    if (showUserPosition && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserPosition(coords);
        },
        (error) => {
          console.error(translations.errgeo, error);
          let errorMessage = translations.errPosition;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = translations.errGeoPermissionRefused;
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = translations.errPositionUnavailable;
              break;
            case error.TIMEOUT:
              errorMessage = translations.errWaitingTime;
              break;
            default:
              errorMessage = translations.errUnknown;
          }
          alert(errorMessage + translations.errCheckPermissions);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, [
    markerPosition,
    multipleMarkers,
    showUserPosition,
    translations.errCheckPermissions,
    translations.errGeoPermissionRefused,
    translations.errPosition,
    translations.errPositionUnavailable,
    translations.errUnknown,
    translations.errWaitingTime,
    translations.errgeo,
  ]);

  //Fonction pour filtrer les points dans le rayon
  const filterMarkerInRadius = (
    center: { lat: number; lng: number },
    points: { lat: number; lng: number }[],
    radius: number
  ) => {
    const centerPoint = L.latLng(center.lat, center.lng);
    return points.filter((point) => {
      const p = L.latLng(point.lat, point.lng);
      return centerPoint.distanceTo(p) <= radius * 1000;
    });
  };

  const filteredMarkers =
    readOnly && userPosition
      ? filterMarkerInRadius(userPosition, multipleMarkers, radius)
      : multipleMarkers;

  // Fonction qui permet d'intercepter un clic sur la carte
  // et d'ajouter ce point sur la carte si aucun point n'existe déjà
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (readOnly || markerPosition) return;
        const { lat, lng } = e.latlng;
        setMarkerPosition({ lat, lng });
        onLocationChange?.(lat, lng);

        //Calcul de la distance (en mètres) entre 2 points
        if (showUserPosition && userPosition) {
          const userLatLng = L.latLng(userPosition.lat, userPosition.lng);
          const clickedLatLng = L.latLng(lat, lng);
          const distanceInMeters = userLatLng.distanceTo(clickedLatLng);
          setDistance(distanceInMeters);
          console.log(distance);
        }
      },
    });
    return null;
  };

  //Fonction de suppression du pin de localisation d'un jardin
  const handleRemovePin = () => {
    setMarkerPosition(null);
    setDistance(null); //Utile ?
    onLocationChange?.(0, 0);
  };

  //Restriction du rayon lors de la saisie
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value > 30) value = 30;
    setRadius(value);
  };

  return (
    <div className={`flex flex-col ${markerPosition ? 'mb-0' : 'mb-5'}`}>
      {!enableRadius && <p>{translations.addGardenPosition}</p>}

      {/* Si le rayon est activé : on affiche l'input */}
      {enableRadius && (
        <div className="mx-auto mt-4 w-full max-w-md bg-white p-4">
          <label className="block font-semibold">{translations.radius}</label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="30"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="mt-2 w-full"
            />
            <input
              type="number"
              min="1"
              max="30"
              value={radius}
              onChange={handleRadiusChange}
              className="mr-1 ml-2 w-16 rounded border p-1"
            />
            km
          </div>
        </div>
      )}

      <div
        className={`${enableRadius ? 'h-[70vh]' : 'h-70'} mb-2 overflow-hidden`}
      >
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

          {/* Recentrage dynamique sur la position de l'utilisateur */}
          {userPosition && <CenterMapOnUser position={userPosition} />}
          {!readOnly && <MapClickHandler />}

          {/* Cercle autour de la position de l'utilisateur */}
          {userPosition && enableRadius && (
            <>
              <Circle
                center={userPosition}
                radius={radius * 1000}
                pathOptions={{ color: 'green', fillOpacity: 0.15 }}
              />
            </>
          )}

          {/* Ajout d'un pin pour localiser l'utilisateur */}
          {userPosition && (
            <Marker
              position={userPosition}
              icon={customUserIcon}
              //title={translations.youarehere}
            />
          )}

          {/* Marqueur positionné manuellement */}
          {markerPosition && !readOnly && (
            <Marker position={markerPosition} icon={customIcon} />
          )}

          {/* Marqueurs dans le rayon */}
          {readOnly &&
            filteredMarkers.map((pos, idx) => (
              <Marker key={idx} position={pos} icon={customIcon}>
                {/* Ajout d'une popup pour avoir des infos sur le jardin sélectionné par clic */}
                <Popup>
                  <div className="text-sm">
                    <div>
                      <strong>{translations.latitude}</strong>{' '}
                      {pos.lat.toFixed(5)}
                    </div>
                    <div>
                      <strong>{translations.longitude}</strong>{' '}
                      {pos.lng.toFixed(5)}
                    </div>
                    {userPosition && (
                      <div>
                        <strong>{translations.distance}</strong>{' '}
                        {(
                          L.latLng(
                            userPosition.lat,
                            userPosition.lng
                          ).distanceTo(L.latLng(pos.lat, pos.lng)) / 1000
                        ).toFixed(2)}{' '}
                        km
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      {/* Coordonnées du champ et suppression du pin */}
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
            <Button
              className="bg-bgbutton relative m-5 px-6 py-2"
              onClick={handleRemovePin}
            >
              {translations.deletePin}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
