import React from 'react';
import H2 from '../Atom/H2';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import { useCreateNurseryMutation } from '@/slice/fetch';
import { RootState, useDispatch, useSelector } from '@/redux/store';
import { setAddNurseryPopup } from '@/redux/display/displaySlice';

const AddNurseryPopup: React.FC<{ display: boolean }> = ({ display }) => {
  //Local State

  //RTK Queries
  const [createNewNursery] = useCreateNurseryMutation();

  //Hooks
  const dispatch = useDispatch();

  //Selectors
  const actualGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );

  //Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let type = '';
    if (formData.get('indoor') === 'on') {
      type = type + 'Indoor, ';
    }
    if (formData.get('outdoor') === 'on') {
      type = type + 'Outdoor, ';
    }
    if (formData.get('hotwire') === 'on') {
      type = type + 'Hotwire, ';
    }
    if (formData.get('hotbed') === 'on') {
      type = type + 'Hotbed, ';
    }
    if (formData.get('lamp') === 'on') {
      type = type + 'Lamp, ';
    }
    if (formData.get('greenhouse') === 'on') {
      type = type + 'Greenhouse, ';
    }

    const newNursery = {
      gardenId: actualGarden?.id,
      name: formData.get('nurseryName') as string,
      type: type,
    };

    try {
      createNewNursery(newNursery).unwrap();
      console.log('nursery created');
    } catch {
      console.log('error creating nursery');
    }
    dispatch(setAddNurseryPopup({ state: false, id: 0 }));
  };

  return (
    <div
      style={{
        display: display ? 'flex' : 'none',
      }}
      className="bg-cardbackground fixed bottom-[2vh] left-[8vw] flex w-[70vw] flex-col items-center justify-between rounded-xl border-2 p-4"
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

        <H2>Nursery type :</H2>
        <div className="mx-auto flex w-[60vw] flex-wrap justify-around">
          <div>
            <label htmlFor="indoor">Indoor</label>
            <input type="checkbox" name="indoor" className="mx-[1vw]" />
          </div>
          <div>
            <label htmlFor="outdoor">Outdoor</label>
            <input type="checkbox" name="outdoor" className="mx-[1vw]" />
          </div>
          <div>
            <label htmlFor="hotwire">Hot Wire</label>
            <input type="checkbox" name="hotwire" className="mx-[1vw]" />
          </div>
          <div>
            <label htmlFor="hotbed">Hot Bed</label>
            <input type="checkbox" name="hotbed" className="mx-[1vw]" />
          </div>
          <div>
            <label htmlFor="lamp">Lamp</label>
            <input type="checkbox" name="lamp" className="mx-[1vw]" />
          </div>
          <div>
            <label htmlFor="greenhouse">Greenhouse</label>
            <input type="checkbox" name="greenhouse" className="mx-[1vw]" />
          </div>
        </div>
        <div className="flex">
          <Button
            type="button"
            className="bg-bgbutton relative m-5 px-6 py-2"
            onClick={() =>
              dispatch(setAddNurseryPopup({ state: false, id: 0 }))
            }
          >
            Back
          </Button>
          <Button className="bg-bgbutton relative m-5 px-6 py-2" type="submit">
            Create!
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNurseryPopup;
