// Importations React et composants Leaflet
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Composants internes
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';

// Types et outils
import { LocationPickerProps } from '@/utils/types';
import { useLanguage } from '@/app/contexts/LanguageProvider';

import { useRouter } from 'next/navigation';
import { LocateFixed } from 'lucide-react';

import { customPublicIcon, customUserIcon } from '@/utils/mapIcon';
import CenterMapOnUser from '../Functionnal/CenterMapOnUser';
import ActiveRayonMap from '../Functionnal/ActiveRayonMap';
import GardenFoundOnMap from '../Functionnal/GardenFoundOnMap';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// Composant principal : carte interactive avec sélection de localisation
const LocationPicker: React.FC<LocationPickerProps> = ({
  initialLat,
  initialLng,
  onLocationChange,
  readOnly = false,
  multipleMarkers = [],
  enableRadius = false,
  showUserPosition = false,
}) => {
  // Hooks
  const router = useRouter();
  const { translations } = useLanguage();

  //Selectors
  const radius = useSelector((state: RootState) => state.map.radius);

  // Local States

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
  const [distance, setDistance] = useState<number | null>(null);
  const [locationEnabled, setLocationEnabled] = useState<boolean | null>(null);

  // Obtenir la position de l'utilisateur au montage si demandée
  useEffect(() => {
    if (showUserPosition) handleLocateUser();
  }, [showUserPosition]);

  // Handlers
  // Gestion des clics sur la carte (ajoute un pin)
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (readOnly || markerPosition) return;
        const { lat, lng } = e.latlng;
        setMarkerPosition({ lat, lng });
        onLocationChange?.(lat, lng);

        if (showUserPosition && userPosition) {
          // const userLatLng = L.latLng(userPosition.lat, userPosition.lng);
          // const clickedLatLng = L.latLng(lat, lng);
          // const distanceInMeters = userLatLng.distanceTo(clickedLatLng);
          // setDistance(distanceInMeters);
        }
      },
    });
    return null;
  };

  // Supprime le pin principal
  const handleRemovePin = () => {
    setMarkerPosition(null);
    // setDistance(null);
    onLocationChange?.(0, 0);
  };

  // Récupère la position géographique de l'utilisateur
  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationEnabled(true);
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserPosition(coords);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationEnabled(false);

          // Message d'erreur personnalisé
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
    } else {
      setLocationEnabled(false);
      alert(translations.errGeoNavigator);
    }
  };

  return (
    <div
      className={`bg-extbutton flex h-full flex-col ${markerPosition ? 'mb-0' : 'mb-5'}`}
    >
      {!enableRadius && <p>{translations.addGardenPosition}</p>}

      {/* Si le rayon est activé : on affiche l'input */}
      {enableRadius && (
        <ActiveRayonMap
          userPosition={userPosition}
          enableRadius={enableRadius}
          readOnly={readOnly}
          multipleMarkers={multipleMarkers}
        />
      )}

      <div
        className={`${enableRadius ? 'h-[70vh]' : 'h-70'} mb-2 overflow-hidden`}
      >
        {enableRadius && (
          <div className="absolute top-25 left-0 z-[50]">
            <button
              onClick={handleLocateUser}
              className={`pointer-events-auto absolute top-21 left-2.5 rounded-full border border-black p-2 text-black shadow-md transition-colors hover:bg-gray-200 ${locationEnabled === true ? 'bg-green-300' : locationEnabled === false ? 'bg-red-400' : 'bg-white'}`}
              title={translations.locateMe}
            >
              <LocateFixed className="h-6 w-6" />
            </button>
          </div>
        )}
        <MapContainer
          center={
            markerPosition ||
            (multipleMarkers[0] && {
              lat: multipleMarkers[0].garden.latitude,
              lng: multipleMarkers[0].garden.longitude,
            }) ||
            userPosition || { lat: 50.8503, lng: 4.3517 } // Bruxelles
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
              draggable={!enableRadius || enableRadius === null ? false : true} //Bloque le déplacement lors de la création d'un jardin
              eventHandlers={{
                dragend: (e) => {
                  const marker = e.target;
                  const position = marker.getLatLng();
                  setUserPosition({ lat: position.lat, lng: position.lng });
                },
              }}
              //title={translations.youarehere}
            />
          )}
          {/* Marqueur positionné manuellement */}
          {markerPosition && !readOnly && (
            <Marker position={markerPosition} icon={customPublicIcon} />
          )}
          {/* Marqueurs de jardins dans le rayon */}
          {readOnly && (
            <GardenFoundOnMap
              userPosition={{
                lat: 0,
                lng: 0,
              }}
            />
          )}
        </MapContainer>
      </div>

      {/*Bouton de retour à la page Explore*/}
      {enableRadius && (
        <div className="flex justify-center">
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            type="button"
            onClick={() => router.back()}
          >
            yoyoyo
          </Button>
        </div>
      )}

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
