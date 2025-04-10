import { useDispatch, useSelector } from 'react-redux';
import { getGardenByUserIdFct } from '../../redux/garden/gardenSlice';
import { RootState, store } from '../../redux/store';
import { useEffect } from 'react';

export const useGardenList = (userId: number) => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { gardens, loading, error } = useSelector(
    (state: RootState) => state.garden
  );

  useEffect(() => {
    dispatch(getGardenByUserIdFct(userId));
  }, [dispatch, userId]);

  return {
    gardens,
    loading,
    error,
    isEmpty: gardens.length === 0 && !loading,
  };
};
