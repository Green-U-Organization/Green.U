'use client';
import React, { useState, FC, useEffect } from 'react';
import SlimCard from '../Atom/SlimCard';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setDisplayBugReportPopup } from '@/redux/display/displaySlice';
import H1 from '../Atom/H1';
import { useRouter } from 'next/navigation';
import H2 from '../Atom/H2';

type AddBugReport = {
  userId: number;
};

const Add_BugReport_Popup: FC<AddBugReport> = ({ userId }) => {
  //Variables locales
  const [category, setCategory] = useState<string>('graphic');
  const [customAction, setCustomAction] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  //Selectors
  const displayBugReport = useSelector(
    (state: RootState) => state.display.displayBugReportPopup
  );

  //Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '';

  //RTK Query
  //const [createLog] = useCreateLogMutation();
  // route CreatLog

  //Redux
  const changeDisplayBugReport = setDisplayBugReportPopup;

  //Handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (category === 'other') {
      setCategory(customAction);
    }

    let query = {
      id: userId,
      category: category,
      message: message,
      where: router.pathname,
    };

    try {
      const logData = query;
      //createLog(logData).unwrap();
    } catch {
      console.log('Error creating Log');
    }

    dispatch(changeDisplayBugReport({ state: false, id: 0 }));
  };

  console.log(currentPath);
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <SlimCard className="bg-cardbackground m-2">
        <H1>Bug Report</H1>
        <H2>On Page {currentPath}</H2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div className="flex">
            <label className="ml-2" htmlFor="action">
              Type :{' '}
            </label>
            <select
              className="ml-2"
              name="action"
              id="action"
              onChange={(e) => {
                setCategory(e.target.value);
                console.log(category);
              }}
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

          <label className="ml-2" htmlFor="comment">
            Message :
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            name="comment"
            id="comment"
            placeholder="Give us some detail about what happend"
            className="bg-bginput mx-5 border-0"
          ></textarea>
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
