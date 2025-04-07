'use client';
import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import Link from 'next/link';

interface Location {
  code: string;
  city: string;
  lat: number;
  lon: number;
}

// Icône pour la localisation des terrains
const customIcon = new L.Icon({
  iconUrl: '/image/divers/field-location.png',
  iconSize: [30, 38], // Taille de l'icône
  iconAnchor: [15, 38], // Point d'ancrage de l'icône
  popupAnchor: [0, -38], // Point d'ancrage du popup
});

// Icône pour la position de l'utilisateur connecté
const userPositionIcon = new L.Icon({
  iconUrl: '/image/divers/my-location.png',
  iconSize: [25.5, 38], // Taille de l'icône
  iconAnchor: [12.75, 38], // Point d'ancrage de l'icône
  popupAnchor: [0, -38], // Point d'ancrage du popup
});

//Pour recentrer la carte sur la position de l'utilisateur
//Uniquement s'il donne son consentement
const RecenterMap = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 13);
  }, [position, map]);
  return null;
};

const groupLocationsByCoordinates = (locations: Location[]) => {
  const grouped = new Map<string, Location[]>();
  locations.forEach((loc) => {
    const key = `${loc.lat},${loc.lon}`;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)?.push(loc);
  });
  return grouped;
};

const Home = () => {
  const { translations } = useLanguage();
  const [position, setPosition] = useState<[number, number]>([50.6326, 5.5797]); //Liège
  // Bruxelles : [50.8501,4.3517]
  const [locations, setLocations] = useState<Location[]>([]);
  const [radius, setRadius] = useState<number>(1);

  useEffect(() => {
    fetch('data/postalCodesBE.json')
      .then((response) => response.json())
      .then((data) => {
        //console.log("Données chargées :", data);
        setLocations(data as Location[]);
      })
      .catch((error) => console.error('Error loading JSON :', error));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
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
    } else {
      console.error(translations.errGeoNavigator);
      alert(translations.errGeoNavigator);
    }
  }, []);

  //Fonction pour calculer la distance entre 2 points GPS
  const calculateDistance = (
    pos1: [number, number],
    pos2: [number, number]
  ) => {
    // Utilisation de la formule de Haversine
    const [lat1, lon1] = pos1;
    const [lat2, lon2] = pos2;
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  //Filtrage des localisations selon le rayon sélectionné
  const filteredLocations = locations.filter((loc) => {
    const distance = calculateDistance(position, [loc.lat, loc.lon]);
    return distance <= radius; //Garde les localisations dans le rayon
  });

  //Grouper les localisations
  const groupedLocations = groupLocationsByCoordinates(filteredLocations);

  return (
    <>
      <div className="z-1000 max-w-screen">
        <div className="mx-auto mt-4 w-full max-w-md bg-white p-4">
          <label className="block font-semibold">{translations.radius}</label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="100"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="mt-2 w-full"
            />
            <input
              type="number"
              min="1"
              max="100"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="mr-1 ml-2 w-16 rounded border p-1"
            />
            km
          </div>
        </div>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '80vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <RecenterMap position={position} />
          <Marker position={position} icon={userPositionIcon}>
            <Popup>{translations.youarehere}</Popup>
          </Marker>

          <Circle
            center={position}
            radius={radius * 1000}
            pathOptions={{ color: 'green', fillOpacity: 0.1 }}
          />

          {/* Afficher les pins pour les groupes */}
          {[...groupedLocations.entries()].map(([key, locs], index) => {
            const [lat, lon] = key.split(',').map(Number);
            return (
              <Marker key={index} position={[lat, lon]} icon={customIcon}>
                <Popup>
                  <div>
                    <p>
                      {translations.distance}:{' '}
                      {calculateDistance(position, [lat, lon]).toFixed(1)} km
                    </p>
                    <ul>
                      {locs.map((loc) => (
                        <li key={loc.code}>
                          <Link href={`/landing/garden/`}>
                            {loc.code}-{loc.city}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
};

export default Home;
