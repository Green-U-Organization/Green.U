'use client';
import React, { useState, FC } from 'react';
import SlimCard from '../Atom/SlimCard';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import { useDispatch } from 'react-redux';
import { setDisplayBugReportPopup } from '@/redux/display/displaySlice';
import H1 from '../Atom/H1';
import H2 from '../Atom/H2';
import Image from 'next/image';
import { useCreateLogBugReportMutation } from '@/redux/api/fetch';

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
  const [fieldErrors, setFieldErrors] = useState<{
    title?: string;
    comment?: string;
    customAction?: string;
  }>({});

  //Selectors

  //Hooks
  const dispatch = useDispatch();

  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '';

  //RTK Query
  const [createLog] = useCreateLogBugReportMutation(); // route CreatLog

  //Redux
  const changeDisplayBugReport = setDisplayBugReportPopup;

  //Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: {
      title?: string;
      comment?: string;
      customAction?: string;
    } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!message.trim()) {
      newErrors.comment = 'Message is required.';
    }
    if (category === 'other' && !customAction.trim()) {
      newErrors.customAction = 'Please specify the type.';
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setFieldErrors({});

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

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <SlimCard className="bg-cardbackground cursor-default! p-0">
        <>
          <Image
            width={50}
            height={50}
            src="/image/icons/cross.png"
            alt="Close"
            className="absolute top-2 right-2 h-5 w-5 cursor-pointer"
            onClick={() =>
              dispatch(setDisplayBugReportPopup({ state: false, id: 0 }))
            }
          />
          <H1>Bug Report</H1>
          <H2>On Page {currentPath}</H2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
          >
            <div>
              <label className="ml-3" htmlFor="action">
                Type :{' '}
              </label>
              <select
                className="ml-2"
                name="action"
                id="action"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setFieldErrors((prev) => ({
                    ...prev,
                    customAction: undefined,
                  }));
                }}
                value={category}
              >
                <option value="graphic">Graphic</option>
                <option value="performance">Performance</option>
                <option value="security">Security</option>
                <option value="translation">Translation</option>
                <option value="usability">Usability</option>
                <option value="functionality">Functional</option>
                <option value="other">Other</option>
              </select>
            </div>

            {category === 'other' && (
              <div>
                <TextInput
                  className="mx-5"
                  name="otherAction"
                  id="otherAction"
                  placeholder="Enter a type"
                  onChange={(e) => {
                    setCustomAction(e.target.value);
                    setFieldErrors((prev) => ({
                      ...prev,
                      customAction: undefined,
                    }));
                  }}
                  value={customAction}
                />
                {fieldErrors.customAction && (
                  <p className="text-txterror -mt-5 px-5">
                    {fieldErrors.customAction}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="ml-3" htmlFor="title">
                Title :
              </label>
              <TextInput
                className="mx-5"
                name="title"
                id="title"
                placeholder="Enter a title"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, title: undefined }));
                }}
                value={title}
              />
              {fieldErrors.title && (
                <p className="text-txterror -mt-5 px-5">{fieldErrors.title}</p>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <label className="ml-3" htmlFor="comment">
                Message :
              </label>
              <textarea
                onChange={(e) => {
                  setMessage(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, comment: undefined }));
                }}
                rows={3}
                name="comment"
                id="comment"
                placeholder="Give us details about what happened"
                className="bg-bginput max-w-auto mx-5 w-auto border-0 px-3"
                value={message}
              ></textarea>
              {fieldErrors.comment && (
                <p className="text-txterror px-5">{fieldErrors.comment}</p>
              )}
            </div>

            {error && <p className="text-txterror px-5 py-2">{error}</p>}
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
        </>
      </SlimCard>
    </div>
  );
};

export default Add_BugReport_Popup;
