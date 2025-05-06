import React from 'react';
import Card from '../Atom/Card';
import H2 from '../Atom/H2';
import Button from '../Atom/Button';
import { useDispatch } from 'react-redux';
import { setExistantCropPopup } from '@/redux/display/displaySlice';
import { ExistentCropPopupProps } from '@/utils/types';

const ExistentCropPopup: React.FC<ExistentCropPopupProps> = ({ lineId }) => {
  //Hooks
  const dispatch = useDispatch();

  return (
    <Card className="bg-cardbackground flex w-[80vw] flex-col justify-center p-[1vw]">
      <H2>
        You already have crops here! Harvest them before planting something
        else.
      </H2>
      <Button
        className="bg-bgbutton relative m-5 px-6 py-2"
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
