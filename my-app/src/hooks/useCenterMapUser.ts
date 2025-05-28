const useCenterMapUser: React.FC<{ lat: number; lng: number }> = (position) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 10); // Zoom level (0 à)
  }, [position, map]);

  return null;
};

export default useCenterMapUser;
