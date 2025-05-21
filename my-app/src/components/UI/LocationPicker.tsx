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
import { Garden, LocationPickerProps } from '@/utils/types';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import { gardenTypeLabels } from '@/constants/garden';
import { setSelectedGardenCookies } from '@/utils/selectedGardenCookies';
import Image from 'next/image';
import {
  setSelectedGarden,
  clearSelectedGarden,
} from '@/redux/garden/gardenSlice';
import { useDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { LocateFixed } from 'lucide-react';

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
  //Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  const { translations } = useLanguage();

  const [pinsInCircleCount, setPinsInCircleCount] = useState<number>(0);

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
  //console.log(distance);

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
    points: { garden: Garden }[],
    radius: number
  ) => {
    const centerPoint = L.latLng(center.lat, center.lng);
    return points.filter((point) => {
      const p = L.latLng(point.garden.latitude, point.garden.longitude);
      return centerPoint.distanceTo(p) <= radius * 1000;
    });
  };

  const filteredMarkers =
    readOnly && userPosition
      ? filterMarkerInRadius(userPosition, multipleMarkers, radius)
      : multipleMarkers;

  useEffect(() => {
    if (userPosition && enableRadius && readOnly) {
      const gardensInCircle = filterMarkerInRadius(
        userPosition,
        multipleMarkers,
        radius
      );
      setPinsInCircleCount(gardensInCircle.length);
    }
  }, [userPosition, multipleMarkers, radius, enableRadius, readOnly]);

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

  const handleGardenClick = (garden: Garden) => {
    if (garden.privacy === 2) {
      dispatch(setSelectedGarden(garden));
      clearSelectedGarden();
      setSelectedGardenCookies(garden);
      //router.push('/garden/display');
      window.location.href = '/garden/display';
    }
  };

  //Localisation demandée par l'utilisateur
  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserPosition(coords);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert(translations.errCheckPermissions);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
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
          <div className="absolute top-29 left-14 z-[1] rounded border-1 bg-white p-2 shadow-md select-none">
            <p>
              {pinsInCircleCount > 1 ? 'Gardens found: ' : 'Garden found: '}{' '}
              <strong>{pinsInCircleCount}</strong>
            </p>
          </div>
        </div>
      )}

      <div
        className={`${enableRadius ? 'h-[70vh]' : 'h-70'} mb-2 overflow-hidden`}
      >
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
          <button
            onClick={(e) => {
              // e.stopPropagation();
              // e.preventDefault();
              handleLocateUser();
            }}
            // onMouseDown={(e) => {
            //   e.stopPropagation();
            //   e.preventDefault();
            // }}
            className="pointer-events-auto absolute top-21 left-2.5 z-[1000] rounded-full border border-black p-2 text-black shadow-md transition-colors hover:bg-gray-200"
            title="Locate me"
          >
            <LocateFixed className="h-6 w-6" />
          </button>
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
          {userPosition && window.location.pathname === '/map' && (
            <Marker
              position={userPosition}
              icon={customUserIcon}
              draggable={true}
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
            <Marker position={markerPosition} icon={customIcon} />
          )}
          {/* Marqueurs dans le rayon */}
          {readOnly &&
            filteredMarkers.map((pos, idx) => (
              <Marker
                key={idx}
                position={[pos.garden.latitude, pos.garden.longitude]}
                icon={customIcon}
              >
                {/* Ajout d'une popup pour avoir des infos sur le jardin sélectionné par clic */}
                <Popup>
                  <div className="flex flex-col gap-2 text-sm">
                    <div
                      className={`${pos.garden.privacy === 2 ? 'cursor-pointer text-amber-500 hover:text-amber-600' : ''}`}
                      onClick={() => handleGardenClick(pos.garden)}
                    >
                      <strong>{pos.garden.name}</strong>
                    </div>
                    <div className="flex items-center justify-center">
                      {pos.garden.privacy === 0 ? (
                        <Image
                          width={50}
                          height={50}
                          src="/image/icons/lockClose.png"
                          alt="Private"
                          className="h-8 w-8"
                        />
                      ) : pos.garden.privacy === 2 ? (
                        <Image
                          width={50}
                          height={50}
                          src="/image/icons/lockOpen.png"
                          alt="Public"
                          className="h-8 w-8"
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                      <strong>{translations.gardenType}</strong>{' '}
                      {gardenTypeLabels[pos.garden.type] ?? 'N/A'}
                    </div>
                    {/* <div>
                      <strong>{translations.latitude}</strong>{' '}
                      {pos.lat.toFixed(5)}
                    </div>
                    <div>
                      <strong>{translations.longitude}</strong>{' '}
                      {pos.lng.toFixed(5)}
                    </div> */}
                    {userPosition && (
                      <div>
                        <strong>{translations.distance}</strong>{' '}
                        {(
                          L.latLng(
                            userPosition.lat,
                            userPosition.lng
                          ).distanceTo(
                            L.latLng(pos.garden.latitude, pos.garden.longitude)
                          ) / 1000
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
      {userPosition && (
        <div className="mx-auto">
          {' '}
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            type="button"
            onClick={() => router.push('/')}
          >
            Home
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
