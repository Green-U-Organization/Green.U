import React from 'react';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import H2 from '../Atom/H2';

const NewGreenhouseForm: React.FC<{ display: boolean }> = ({ display }) => {
  //Handlers
  const handleSubmit = () => {};

  return (
    <section
      style={{
        display: display ? 'flex' : 'none',
      }}
      className="bg-cardbackground fixed bottom-[2vh] left-[8vw] flex h-[auto] w-[70vw] flex-col items-center justify-between rounded-xl border-2 p-4"
    >
      <H2>Add Greenhouse</H2>
      <form className="flex flex-col items-center">
        <TextInput label="Length"></TextInput>

        <TextInput label="Width"></TextInput>

        <Button
          className="bg-bgbutton relative m-5 px-6 py-2"
          onClick={handleSubmit}
        >
          Create!
        </Button>
      </form>
    </section>
  );
};

export default NewGreenhouseForm;
