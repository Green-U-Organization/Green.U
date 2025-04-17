import React from 'react';
import Card from '../Atom/Card';
import H2 from '../Atom/H2';
import Button from '../Atom/Button';

const ExistentCropPopup = ({ handleClickOk }) => {
  return (
    <Card className="flex w-[70vw] flex-col justify-center p-[1vw]">
      <H2>
        You already have crops here! Harvest them before planting something
        else.
      </H2>
      <Button onClick={handleClickOk}>Okay !</Button>
    </Card>
  );
};

export default ExistentCropPopup;
