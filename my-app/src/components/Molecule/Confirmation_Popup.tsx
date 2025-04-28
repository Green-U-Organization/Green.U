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
    <Card className="w-[70vw]">
      <H2>Do you really want to delete this {element}?</H2>

      <Button onClick={handleYesClick}>Yes !</Button>
      <Button onClick={handleNoClick}>No !!</Button>
    </Card>
  );
};

export default Confirmation;
