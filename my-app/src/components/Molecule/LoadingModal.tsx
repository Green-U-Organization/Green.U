import React from 'react';
import Loading from '../Atom/Loading';

const LoadingModal = () => {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-[52684642] flex items-center justify-center backdrop-blur-md">
      <Loading />
    </div>
  );
};

export default LoadingModal;
