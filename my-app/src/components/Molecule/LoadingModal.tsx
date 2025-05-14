import React from 'react';
import Loading from '../Atom/Loading';
import { createPortal } from 'react-dom';

const LoadingModal = () => {
  // https://react.dev/reference/react-dom/createPortal
  return createPortal(
    <div className="bg-opacity-50 fixed inset-0 z-[52684642] flex items-center justify-center backdrop-blur-md">
      <Loading />
    </div>,
    document.body
  );
};
export default LoadingModal;
