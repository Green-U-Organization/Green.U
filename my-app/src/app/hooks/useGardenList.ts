import { store, useDispatch, useSelector } from '../../redux/store';
import { useCallback, useEffect } from 'react';
import { Garden } from '@/utils/types';
import {
  setSelectedGarden,
  setFullscreen,
  setScale,
  getGardenByUserIdFct,
} from '../../redux/garden/gardenSlice';

export const useGardenList = (userId: number) => {
  const dispatch = useDispatch();
  const { gardens, loading, error, selectedGarden, scale, fullscreen } =
    useSelector((state) => state.garden);

  useEffect(() => {
    dispatch(getGardenByUserIdFct(userId));
  }, [dispatch, userId]);

  const updateSelectedGarden = useCallback(
    (garden: Garden) => {
      dispatch(setSelectedGarden(garden));
    },
    [dispatch]
  );

  const updateScale = useCallback(
    (scale: number) => {
      dispatch(setScale(scale));
    },
    [dispatch]
  );

  const updateFullscreen = useCallback(
    (fullscreen: boolean) => {
      dispatch(setFullscreen(fullscreen));
    },
    [dispatch]
  );

  return {
    gardens,
    loading,
    error,
    selectedGarden,
    setSelectedGarden: updateSelectedGarden,
    isEmpty: gardens.length === 0 && !loading,
    scale,
    setScale: updateScale,
    updateFullscreen,
    fullscreen,
  };
};
