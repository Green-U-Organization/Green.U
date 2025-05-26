'use client';
import { setDisplayBugReportPopup } from '@/redux/display/displaySlice';
import { RootState, useSelector } from '@/redux/store';
import React from 'react';
import ReactDOM from 'react-dom';
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
      {/* Popup rendu via React Portal, 
      nécessaire pour qu'elle s'affiche en dehors du menu*/}
      {displayBugReport &&
        typeof window !== 'undefined' && // Vérifie que l'on est côté client
        ReactDOM.createPortal(
          <Add_BugReport_Popup userId={id} />,
          document.body
        )}

      {/* Bouton bug report */}
      <div
        onClick={() =>
          dispatch(
            setDisplayBugReportPopup({
              state: !displayBugReport,
              id: 0,
            })
          )
        }
        className="cursor-pointer"
      >
        <Image
          width={50}
          height={50}
          src={'/image/icons/bug.png'}
          alt={'Bug report'}
          className="border-4object-cover z-50 h-[6vh] w-[6vh] overflow-hidden opacity-100"
        />
      </div>
    </>
  );
};

export default BugReport;
