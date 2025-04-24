import React from 'react';
import Card from '../Atom/Card';
import H2 from '../Atom/H2';
import Button from '../Atom/Button';
import { useDispatch } from 'react-redux';
import { setExistantCropPopup } from '@/redux/display/displaySlice';

interface ExistentCropPopupProps {
  lineId: number;
}

const ExistentCropPopup: React.FC<ExistentCropPopupProps> = ({ lineId }) => {
  //Hooks
  const dispatch = useDispatch();

  return (
    <Card className="flex w-[70vw] flex-col justify-center p-[1vw]">
      <H2>
        You already have crops here! Harvest them before planting something
        else.
      </H2>
      <Button
        onClick={() =>
          dispatch(
            setExistantCropPopup({
              state: false,
              id: Number(lineId),
            })
          )
        }
      >
        Okay !
      </Button>
    </Card>
  );
};

export default ExistentCropPopup;
