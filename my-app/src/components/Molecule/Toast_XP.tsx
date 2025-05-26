import React from 'react';
import Image from 'next/image';

interface ToastXPProps {
  xp: number;
  t: { visible: boolean };
}

const Toast_XP: React.FC<ToastXPProps> = ({ xp, t }) => {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } ring-opacity-5 pointer-events-auto flex w-full max-w-[50vw] rounded-lg bg-white shadow-lg ring-1 ring-black`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0 pt-0.5">
          <Image
            className="h-15 w-15 rounded-full"
            src="/image/icons/medal.png"
            alt=""
          />
        </div>
        <div className="ml-3 flex-1">
          <p className="mt-1 text-sm text-gray-500">You earn {xp} xp!</p>
        </div>
      </div>
    </div>
  );
};

export default Toast_XP;
