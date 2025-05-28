import React from 'react';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const CenterMapOnUser: React.FC<{ position: { lat: number; lng: number } }> = ({
  position,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 10); // Zoom level (0 à)
  }, [position, map]);

  return null;
};

export default CenterMapOnUser;
