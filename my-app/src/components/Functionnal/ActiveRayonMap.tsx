import { useLanguage } from '@/app/contexts/LanguageProvider';
import React, { FC, useEffect, useState } from 'react';
import Checkbox from '../Atom/Checkbox';
import { Garden } from '@/utils/types';
import L from 'leaflet';

interface ActiveRayonMapProps {
  userPosition: { lat: number; lng: number } | null;
  enableRadius: boolean;
  readOnly: boolean;
  multipleMarkers: { garden: Garden }[];
}

const ActiveRayonMap: FC<ActiveRayonMapProps> = ({
  userPosition,
  enableRadius,
  readOnly,
  multipleMarkers,
}) => {
  // Hooks
  const { translations } = useLanguage();
  const [radius, setRadius] = useState<number>(5);
  const [pinsInCircleCount, setPinsInCircleCount] = useState<number>(0);
  const [publicGardensCount, setPublicGardensCount] = useState<number>(0);
  const [privateGardensCount, setPrivateGardensCount] = useState<number>(0);
  const [gardenTypeFilters, setGardenTypeFilters] = useState<{
    public: boolean;
    private: boolean;
  }>({
    public: true,
    private: true,
  });

  // Limite le rayon à 30 km max
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value > 30) value = 30;
    setRadius(value);
  };

  // Gère les changements de filtres publics/privés
  const handleCheckboxChange = (type: 'public' | 'private') => {
    setGardenTypeFilters({
      ...gardenTypeFilters,
      [type]: !gardenTypeFilters[type],
    });
  };

  // Mise à jour des compteurs si position utilisateur et rayon sont actifs
  useEffect(() => {
    if (userPosition && enableRadius && readOnly) {
      const gardensInCircle = filterMarkerInRadius(
        userPosition,
        multipleMarkers,
        radius
      );
      const publicGardens = gardensInCircle.filter(
        (pos: { garden: { privacy: number } }) => pos.garden.privacy === 2
      ).length;
      const privateGardens = gardensInCircle.filter(
        (pos: { garden: { privacy: number } }) => pos.garden.privacy === 0
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

  return (
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
          {publicGardensCount > 1 ? translations.publics : translations.public}
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
  );
};

export default ActiveRayonMap;
