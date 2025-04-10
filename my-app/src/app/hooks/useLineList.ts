import { useDispatch, useSelector } from 'react-redux';
import { getLinesByParcelIdFct } from '../..//redux/line/lineSlice';
import { RootState, store } from '../../redux/store';
import { useEffect } from 'react';

export const useLineList = (parcelId: number) => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { lines, loading, error } = useSelector(
    (state: RootState) => state.line
  );

  useEffect(() => {
    dispatch(getLinesByParcelIdFct(parcelId));
  }, [dispatch, parcelId]);

  return {
    lines,
    loading,
    error,
    isEmpty: lines.length === 0 && !loading,
  };
};
