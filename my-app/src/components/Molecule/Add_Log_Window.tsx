import React, { useState, FC } from 'react';
import SlimCard from '../Atom/SlimCard';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import { useDispatch } from 'react-redux';
import { setDisplayAddLogWindow } from '@/redux/display/displaySlice';
import { useCreateLogMutation } from '@/redux/api/fetch';

type AddLogWindow = {
  id?: number;
  userId: number;
  logObject: string;
};

const Add_Log_Window: FC<AddLogWindow> = ({ id, logObject, userId }) => {
  //Variables locales
  const [action, setAction] = useState<string>('weeding');
  const [customAction, setCustomAction] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  //Selectors

  //Hooks
  const dispatch = useDispatch();

  //RTK Query
  const [createLog] = useCreateLogMutation();

  //Redux
  const changeDisplayAddLog = setDisplayAddLogWindow;

  //Handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === 'other') {
      setAction(customAction);
    }

    let query;
    switch (logObject) {
      case 'garden':
        query = {
          id: userId,
          gardenId: id,
          action: action,
          comment: comment,
        };
        break;
      case 'parcel':
        query = {
          id: userId,
          parcelId: id,
          action: action,
          comment: comment,
        };
        break;
      case 'line':
        query = {
          id: userId,
          lineId: id,
          action: action,
          comment: comment,
        };
        break;
      case 'crop':
        query = {
          id: userId,
          cropId: id,
          action: action,
          comment: comment,
        };
        break;
      case 'nursery':
        query = {
          id: userId,
          nurseryId: id,
          action: action,
          comment: comment,
        };
        break;
      case 'greenhouse':
        query = {
          id: userId,
          greenhouseId: id,
          action: action,
          comment: comment,
        };
        break;
      default:
        query = {
          id: userId,
          gardenId: id,
          action: action,
          comment: comment,
        };
        break;
    }

    try {
      const logData = query;
      createLog(logData).unwrap();
    } catch {
      console.log('Error creating Log');
    }

    dispatch(changeDisplayAddLog({ state: false, id: id }));
  };

  return (
    <SlimCard className="m-2">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <div className="flex">
          <label className="ml-3" htmlFor="action">
            Action :{' '}
          </label>
          <select
            className="ml-3"
            name="action"
            id="action"
            onChange={(e) => {
              setAction(e.target.value);
              console.log(action);
            }}
          >
            <option value="weeding">Weeding</option>
            <option value="sowing">Sowing</option>
            <option value="planting">Planting</option>
            <option value="watering">Watering</option>
            <option value="tutoring">Tutoring</option>
            <option value="amending">Amending</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ display: action === 'other' ? 'block' : 'none' }}>
          <label className="ml-2" htmlFor="otherAction">
            Your action :
          </label>
          <TextInput
            className="mx-5"
            name="otherAction"
            id="otherAction"
            placeholder="action"
            onChange={(e) => setCustomAction(e.target.value)}
          ></TextInput>
        </div>

        <label className="ml-3" htmlFor="comment">
          Comment :
        </label>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          name="comment"
          id="comment"
          placeholder="You can add some details about what you did..."
          className="bg-bginput mx-5 border-0"
        ></textarea>
        <Button className="relative mx-8 my-5 px-6 py-2" type="submit">
          Submit
        </Button>
      </form>
    </SlimCard>
  );
};

export default Add_Log_Window;
