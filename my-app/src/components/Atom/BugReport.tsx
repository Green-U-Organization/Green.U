/* eslint-disable @next/next/no-img-element */
'use client';
import { setDisplayBugReportPopup } from '@/redux/display/displaySlice';
import { RootState, useSelector } from '@/redux/store';
import React from 'react';
import { useDispatch } from 'react-redux';
import Add_BugReport_Popup from '../Molecule/Add_BugReport_Popup';
import Cookies from 'js-cookie';
import Image from 'next/image';

const BugReport = () => {
  //Selector
  const displayBugReport = useSelector(
    (state: RootState) => state.display.displayBugReportPopup
  );

  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const id = Number(userCookie?.id);

  //Hooks
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ display: displayBugReport ? 'block' : 'none' }}>
        <Add_BugReport_Popup userId={id} />
      </div>
      <div
        onClick={() =>
          dispatch(
            setDisplayBugReportPopup({
              state: !displayBugReport,
              id: 0,
            })
          )
        }
      >
        <Image
          width={50}
          height={50}
          src={'/image/icons/bug.png'}
          alt={'Bug report'}
          className="border-4object-cover fixed top-2 right-2 z-50 h-[6vh] w-[6vh] overflow-hidden p-1 opacity-100"
        />
      </div>
    </>
  );
};

export default BugReport;
