import React, { FC } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { customPrivateIcon, customPublicIcon } from '@/utils/mapIcon';
import { Garden } from '@/utils/types';
import {
  clearSelectedGarden,
  setSelectedGarden,
} from '@/redux/garden/gardenSlice';
import { setSelectedGardenCookies } from '@/utils/selectedGardenCookies';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import L from 'leaflet';
import { gardenTypeLabels } from '@/constants/garden';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface GardenFoundOnMapProps {
  userPosition: { lat: number; lng: number } | null;
}

const GardenFoundOnMap: FC<GardenFoundOnMapProps> = ({ userPosition }) => {
  const dispatch = useDispatch();
  const { translations } = useLanguage();

  const filteredMarkers = useSelector(
    (state: RootState) => state.map.filteredMarker
  );

  // Accède à un jardin public
  const handleGardenClick = (garden: Garden) => {
    if (garden.privacy === 2) {
      dispatch(setSelectedGarden(garden));
      clearSelectedGarden();
      setSelectedGardenCookies(garden);
      window.location.href = '/garden/display';
    }
  };

  return (
    <>
      {filteredMarkers.map((pos) => (
        <Marker
          key={pos.garden.id}
          position={[pos.garden.latitude, pos.garden.longitude]}
          icon={pos.garden.privacy === 0 ? customPrivateIcon : customPublicIcon}
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
                    L.latLng(userPosition.lat, userPosition.lng).distanceTo(
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
    </>
  );
};

export default GardenFoundOnMap;
