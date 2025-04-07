import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Solution robuste pour les icônes dans les bundlers modernes (Webpack, Vite)
const createLeafletIcon = () => {
  try {
    return new L.Icon({
      iconUrl: '/images/marker-icon.png',
      iconRetinaUrl: '/images/marker-icon-2x.png',
      shadowUrl: '/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  } catch (error) {
    console.error('Failed to create Leaflet icon:', error);
    // Fallback simple si les images ne chargent pas
    return new L.Icon.Default();
  }
};

const MapComponent = ({ onLocationSelect }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // 1. Initialisation de la carte
      mapRef.current = L.map(mapContainerRef.current, {
        preferCanvas: true, // Évite les problèmes de rendu
        zoomControl: true,
      }).setView([48.8566, 2.3522], 13);

      // 2. Configuration des tuiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);

      // 3. Configuration globale des icônes
      L.Marker.prototype.options.icon = createLeafletIcon();

      // 4. Gestion des clics
      mapRef.current.on('click', (e) => {
        const { lat, lng } = e.latlng;

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
        }

        onLocationSelect({ latitude: lat, longitude: lng });
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [onLocationSelect]);

  return (
    <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }} />
  );
};

export default MapComponent;
