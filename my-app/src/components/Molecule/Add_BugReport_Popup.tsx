'use client';
import React, { useState, FC } from 'react';
import SlimCard from '../Atom/SlimCard';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import { useDispatch } from 'react-redux';
import { setDisplayBugReportPopup } from '@/redux/display/displaySlice';
import H1 from '../Atom/H1';
import H2 from '../Atom/H2';
import { useCreateLogBugReportMutation } from '@/slice/fetch';

type AddBugReport = {
  userId: number;
};

const Add_BugReport_Popup: FC<AddBugReport> = ({ userId }) => {
  //Variables locales
  const [category, setCategory] = useState<string>('graphic');
  const [customAction, setCustomAction] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  //Selectors

  //Hooks
  const dispatch = useDispatch();

  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '';

  //RTK Query
  const [createLog] = useCreateLogBugReportMutation();
  // route CreatLog

  //Redux
  const changeDisplayBugReport = setDisplayBugReportPopup;

  //Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //const finalCategory = category === 'other' ? customAction : category;

    const query = {
      authorid: userId,
      type: category === 'other' ? customAction : category,
      title: title,
      comment: message,
      where: currentPath,
    };

    try {
      await createLog(query).unwrap();
      setSuccess(true);
      console.log('Success bug report!');

      // Réinitialiser les états du formulaire
      setCategory('graphic');
      setCustomAction('');
      setTitle('');
      setMessage('');
      setError(null);

      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    } catch (err) {
      if (isNaN(userId)) {
        setError('Your are not connected!');
      } else {
        console.log('Error creating bug report : ', err);
        setError('Error creating bug report log');
      }
      setSuccess(false);
    }

    setTimeout(() => {
      setError(null);
      dispatch(changeDisplayBugReport({ state: false, id: 0 }));
    }, 1500); // Délai court pour permettre la réinitialisation
  };

  //console.log(currentPath);
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <SlimCard className="bg-cardbackground p-0">
        <H1>Bug Report</H1>
        <H2>On Page {currentPath}</H2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div className={`flex pt-5 ${category !== 'other' ? 'mb-5' : ''}`}>
            <label className="ml-3" htmlFor="action">
              Type :{' '}
            </label>
            <select
              className="ml-2"
              name="action"
              id="action"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
            >
              <option value="graphic">Graphic</option>
              <option value="performance">Performance</option>
              <option value="security">Security</option>
              <option value="translation">Translation</option>
              <option value="usability">Usability</option>
              <option value="functionality">Functional</option>
              <option value="other">Other</option>{' '}
            </select>
          </div>

          <div style={{ display: category === 'other' ? 'block' : 'none' }}>
            <TextInput
              className="mx-5"
              name="otherAction"
              id="otherAction"
              placeholder="Enter a type"
              onChange={(e) => setCustomAction(e.target.value)}
              value={customAction}
            ></TextInput>
          </div>
          <div>
            <label className="ml-3" htmlFor="title">
              Title :
            </label>
            <TextInput
              className="mx-5"
              name="title"
              id="title"
              placeholder="Enter a title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></TextInput>
          </div>
          <label className="ml-3" htmlFor="comment">
            Message :
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            name="comment"
            id="comment"
            placeholder="Give us details about what happened"
            className="bg-bginput mx-5 border-0 px-3"
            value={message}
          ></textarea>

          {error && <p className="px-5 py-2 text-red-500">{error}</p>}
          {success && (
            <p className="px-5 py-2 text-green-600">Bug reported !</p>
          )}
          <Button
            className="bg-bgbutton relative mx-8 my-5 px-6 py-2"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </SlimCard>
    </div>
  );
};

export default Add_BugReport_Popup;
