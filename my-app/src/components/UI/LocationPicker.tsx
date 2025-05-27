// Importations React et composants Leaflet
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

// Composants internes
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import Checkbox from '../Atom/Checkbox';

// Types et outils
import { Garden, LocationPickerProps } from '@/utils/types';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import { gardenTypeLabels } from '@/constants/garden';
import { setSelectedGardenCookies } from '@/utils/selectedGardenCookies';
import {
  setSelectedGarden,
  clearSelectedGarden,
} from '@/redux/garden/gardenSlice';
import { useDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { LocateFixed } from 'lucide-react';
import Image from 'next/image';

// Composant utilitaire : recentre la carte sur une position
const CenterMapOnUser: React.FC<{ position: { lat: number; lng: number } }> = ({
  position,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 10); // Zoom level (0 à)
  }, [position, map]);

  return null; // Ce composant n'affiche rien
};

// Définition des icônes personnalisées
const customPublicIcon = L.icon({
  iconUrl: '/image/divers/field-location-public.png',
  iconSize: [30, 26],
  iconAnchor: [15, 26],
  popupAnchor: [0, -26],
});

const customPrivateIcon = L.icon({
  iconUrl: '/image/divers/field-location-private.png',
  iconSize: [30, 26],
  iconAnchor: [15, 26],
  popupAnchor: [0, -26],
});

const customUserIcon = L.icon({
  iconUrl: '/image/divers/my-location.png',
  iconSize: [25.5, 38],
  iconAnchor: [12.75, 38],
  popupAnchor: [0, -38],
});

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
  // Initialisation des hooks
  const dispatch = useDispatch();
  const router = useRouter();
  const { translations } = useLanguage();

  // États pour les pins, les positions, le rayon et les filtres
  const [pinsInCircleCount, setPinsInCircleCount] = useState<number>(0);
  const [publicGardensCount, setPublicGardensCount] = useState<number>(0);
  const [privateGardensCount, setPrivateGardensCount] = useState<number>(0);

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
  // const [distance, setDistance] = useState<number | null>(null);
  const [locationEnabled, setLocationEnabled] = useState<boolean | null>(null);

  const [gardenTypeFilters, setGardenTypeFilters] = useState<{
    public: boolean;
    private: boolean;
  }>({
    public: true,
    private: true,
  });

  // Obtenir la position de l'utilisateur au montage si demandée
  useEffect(() => {
    if (showUserPosition) handleLocateUser();
  }, [showUserPosition]);

  // Fonction : retourne les jardins dans un rayon donné
  const filterMarkerInRadius = (
    center: { lat: number; lng: number },
    points: { garden: Garden }[],
    radius: number
  ) => {
    const centerPoint = L.latLng(center.lat, center.lng);
    return points.filter((point) => {
      const p = L.latLng(point.garden.latitude, point.garden.longitude);
      return centerPoint.distanceTo(p) <= radius * 1000; // conversion km -> mètres
    });
  };

  // Filtres appliqués uniquement en lecture seule
  const filteredMarkers =
    readOnly && userPosition
      ? filterMarkerInRadius(userPosition, multipleMarkers, radius).filter(
          (pos) => {
            if (gardenTypeFilters.public && pos.garden.privacy === 2)
              return true;
            if (gardenTypeFilters.private && pos.garden.privacy === 0)
              return true;
            return false;
          }
        )
      : multipleMarkers;

  // Mise à jour des compteurs si position utilisateur et rayon sont actifs
  useEffect(() => {
    if (userPosition && enableRadius && readOnly) {
      const gardensInCircle = filterMarkerInRadius(
        userPosition,
        multipleMarkers,
        radius
      );
      const publicGardens = gardensInCircle.filter(
        (pos) => pos.garden.privacy === 2
      ).length;
      const privateGardens = gardensInCircle.filter(
        (pos) => pos.garden.privacy === 0
      ).length;

      setPublicGardensCount(publicGardens);
      setPrivateGardensCount(privateGardens);
      setPinsInCircleCount(gardensInCircle.length);
    }
  }, [
    userPosition,
    multipleMarkers,
    radius,
    enableRadius,
    readOnly,
    gardenTypeFilters,
  ]);

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

  // Limite le rayon à 30 km max
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value > 30) value = 30;
    setRadius(value);
  };

  // Accède à un jardin public
  const handleGardenClick = (garden: Garden) => {
    if (garden.privacy === 2) {
      dispatch(setSelectedGarden(garden));
      clearSelectedGarden();
      setSelectedGardenCookies(garden);
      window.location.href = '/garden/display';
    }
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

  // Gère les changements de filtres publics/privés
  const handleCheckboxChange = (type: 'public' | 'private') => {
    setGardenTypeFilters({
      ...gardenTypeFilters,
      [type]: !gardenTypeFilters[type],
    });
  };

  return (
    <div
      className={`bg-extbutton flex h-full flex-col ${markerPosition ? 'mb-0' : 'mb-5'}`}
    >
      {!enableRadius && <p>{translations.addGardenPosition}</p>}

      {/* Si le rayon est activé : on affiche l'input */}
      {enableRadius && (
        <div className="bg-extbutton mx-auto w-full max-w-md p-5">
          <label className="block font-semibold">{translations.radius}</label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="30"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="bg-border mr-2 h-2 w-full appearance-none"
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
          <div className="absolute top-27 left-14 z-[1] rounded border-1 bg-white p-2 shadow-md select-none">
            <p>
              {filteredMarkers.length > 1
                ? translations.gardensFound
                : translations.gardenFound}
              <strong>
                {filteredMarkers.length}/{pinsInCircleCount}
              </strong>
            </p>

            <div className="flex items-center gap-1">
              <Checkbox
                checked={gardenTypeFilters.public}
                onChange={() => handleCheckboxChange('public')}
              />
              {publicGardensCount > 1
                ? translations.publics
                : translations.public}
              <strong className="mr-3">{publicGardensCount}</strong>
              <Checkbox
                checked={gardenTypeFilters.private}
                onChange={() => handleCheckboxChange('private')}
              />
              {privateGardensCount > 1
                ? translations.privates
                : translations.private}
              <strong>{privateGardensCount}</strong>
            </div>
          </div>
        </div>
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
          {readOnly &&
            filteredMarkers.map((pos) => (
              <Marker
                key={pos.garden.id}
                position={[pos.garden.latitude, pos.garden.longitude]}
                icon={
                  pos.garden.privacy === 0
                    ? customPrivateIcon
                    : customPublicIcon
                }
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

      {/*Bouton de retour à la page Explore*/}
      {enableRadius && (
        <div className="flex justify-center">
          <Button
            className="bg-bgbutton jersey15! relative m-5 px-6 py-2"
            type="button"
            onClick={() => router.back()}
          >
            {translations.back}
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
