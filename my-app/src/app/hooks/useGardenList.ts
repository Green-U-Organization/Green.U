import { useDispatch, useSelector } from 'react-redux';
import { getGardenByUserIdFct } from '../../redux/garden/gardenSlice';
import { RootState, store } from '../../redux/store';
import { useCallback, useEffect } from 'react';
import { Garden } from '@/utils/types';
import { setSelectedGarden } from '../../redux/garden/gardenSlice';

export const useGardenList = (userId: number) => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { gardens, loading, error, selectedGarden } = useSelector(
    (state: RootState) => state.garden
  );

  useEffect(() => {
    dispatch(getGardenByUserIdFct(userId));
  }, [dispatch, userId]);

  const updateSelectedGarden = useCallback(
    (garden: Garden) => {
      dispatch(setSelectedGarden(garden));
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
  };
};
