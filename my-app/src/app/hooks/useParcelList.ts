import { useDispatch, useSelector } from 'react-redux';
import { getParcelByGardenIdFct } from '@/redux/parcel/parcelSlice';
import { RootState, store } from '../../redux/store';
import { useEffect } from 'react';

export const useParcelList = (gardenId: number) => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { parcels, loading, error } = useSelector(
    (state: RootState) => state.parcel
  );

  useEffect(() => {
    dispatch(getParcelByGardenIdFct(gardenId));
  }, [dispatch, gardenId]);

  return {
    parcels,
    loading,
    error,
    isEmpty: parcels.length === 0 && !loading,
  };
};
