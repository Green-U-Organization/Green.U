import React from 'react';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import H2 from '../Atom/H2';

const NewGreenhouseForm: React.FC<{ displayCondition: boolean }> = ({
  displayCondition,
}) => {
  if (!displayCondition) return null;

  //Handlers
  const handleSubmit = () => {
    console.log('create');
  };

  return (
    <div className="bg-cardbackground flex h-[80vw] w-[70vw] flex-col items-center justify-between rounded-xl border-2 p-4">
      <H2>Add Greenhouse</H2>
      <form className="flex flex-col items-center">
        <TextInput label="Length"></TextInput>

        <TextInput label="Width"></TextInput>

        <Button onClick={handleSubmit}>Create!</Button>
      </form>
    </div>
  );
};

export default NewGreenhouseForm;
