import React from 'react';
import H2 from '../Atom/H2';
import Card from '../Atom/Card';
import Button from '../Atom/Button';
import { ConfirmationProps } from '@/utils/types';

const Confirmation = ({
  element,
  handleYesClick,
  handleNoClick,
}: ConfirmationProps) => {
  return (
    <Card className="bg-cardbackground w-[70vw]">
      <H2>Do you really want to delete this {element}?</H2>

      <Button
        className="bg-bgbutton relative m-5 px-6 py-2"
        onClick={handleYesClick}
      >
        Yes !
      </Button>
      <Button
        className="bg-bgbutton relative m-5 px-6 py-2"
        onClick={handleNoClick}
      >
        No !!
      </Button>
    </Card>
  );
};

export default Confirmation;
