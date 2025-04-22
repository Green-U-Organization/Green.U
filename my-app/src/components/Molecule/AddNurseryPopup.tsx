import React, { useState } from 'react';
import H2 from '../Atom/H2';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import { useCreateNurseryMutation } from '@/slice/garden';
import { RootState, useSelector } from '@/redux/store';

const AddNurseryPopup: React.FC<{ displayCondition: boolean }> = ({
  displayCondition,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(displayCondition);

  //RTK Queries
  const [createNewNursery] = useCreateNurseryMutation();

  //Selectors
  const actualGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );

  if (!isVisible) return null;

  //Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newNursery = {
      gardenId: actualGarden?.id,
      name: formData.get('nurseryName') as string,
      type: ['couche chaude'],
    };

    try {
      createNewNursery(newNursery).unwrap();
      console.log('nursery created');
    } catch {
      console.log('error creating nursery');
    }
    setIsVisible(false);
  };

  return (
    <div
      style={{
        display: isVisible ? 'flex' : 'none',
      }}
      className="bg-cardbackground flex h-[80vw] w-[70vw] flex-col items-center justify-between rounded-xl border-2 p-4"
    >
      <H2>Add Nursery</H2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <TextInput
          label="Nursery name"
          name="nurseryName"
          className="mx-[7vw]"
        ></TextInput>

        <label className="mx-[4vw]" htmlFor="comments">
          Comments :
        </label>
        <textarea
          className="w-100% mx-[4vw] border-1"
          name="comments"
          id="comments"
        ></textarea>

        <div className="flex">
          <Button onClick={() => setIsVisible(false)}>Back</Button>
          <Button type="submit">Create!</Button>
        </div>
      </form>
    </div>
  );
};

export default AddNurseryPopup;
