import { useDispatch, useSelector } from 'react-redux';
import { getLinesByParcelIdFct } from '../..//redux/line/lineSlice';
import { RootState, store } from '../../redux/store';
import { useEffect } from 'react';

export const useLineList = (parcelId: number) => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { linesByParcelId, loading, error } = useSelector(
    (state: RootState) => state.line
  );

  useEffect(() => {
    dispatch(getLinesByParcelIdFct(parcelId));
  }, [dispatch, parcelId]);

  return {
    lines: linesByParcelId[parcelId] || [],
    loading,
    error,
    isEmpty: !linesByParcelId[parcelId]?.length && !loading,
  };
};
