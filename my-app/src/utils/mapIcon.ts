import L from 'leaflet';

// Définition des icônes personnalisées
export const customPublicIcon = L.icon({
  iconUrl: '/image/divers/field-location-public.png',
  iconSize: [30, 26],
  iconAnchor: [15, 26],
  popupAnchor: [0, -26],
});

export const customPrivateIcon = L.icon({
  iconUrl: '/image/divers/field-location-private.png',
  iconSize: [30, 26],
  iconAnchor: [15, 26],
  popupAnchor: [0, -26],
});

export const customUserIcon = L.icon({
  iconUrl: '/image/divers/my-location.png',
  iconSize: [25.5, 38],
  iconAnchor: [12.75, 38],
  popupAnchor: [0, -38],
});
