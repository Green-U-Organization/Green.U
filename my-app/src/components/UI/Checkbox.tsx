'use client';
import React, { useState } from 'react';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox = ({ checked, onChange }: Props) => {
  const [inside, setInside] = useState(false);
  const [clicked, setClicked] = useState(checked || false);

  const handleEnter = () => setInside(true);
  const handleLeave = () => setInside(false);
  const handleClick = () => {
    const newChecked = !clicked;
    setClicked(newChecked);
    onChange?.(newChecked); //Informe le parent du changement
  };

  return (
    <>
      <section
        className={`relative my-1.5 min-h-5 min-w-5 align-top ${inside ? 'bg-bgbutton' : 'bg-cardbackground'}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        role="checkbox"
        aria-checked={clicked}
        tabIndex={0}
      >
        <div className={`bg-border absolute top-0 left-0 h-full w-1`}></div>
        <div className={`bg-border absolute top-0 right-0 h-full w-1`}></div>
        <div className={`bg-border absolute top-0 left-0 h-1 w-full`}></div>
        <div className={`bg-border absolute bottom-0 left-0 h-1 w-full`}></div>

        <div className={`bg-border absolute top-1 left-1 h-0.5 w-0.5`}></div>
        <div className={`bg-border absolute top-1 right-1 h-0.5 w-0.5`}></div>
        <div className={`bg-border absolute bottom-1 left-1 h-0.5 w-0.5`}></div>
        <div
          className={`bg-border absolute right-1 bottom-1 h-0.5 w-0.5`}
        ></div>

        <div className={`bg-extbutton absolute top-0 left-0 h-0.5 w-0.5`}></div>
        <div
          className={`bg-extbutton absolute top-0 right-0 h-0.5 w-0.5`}
        ></div>
        <div
          className={`bg-extbutton absolute bottom-0 left-0 h-0.5 w-0.5`}
        ></div>
        <div
          className={`bg-extbutton absolute right-0 bottom-0 h-0.5 w-0.5`}
        ></div>

        <div
          className="relative top-0 left-0 h-full w-full"
          style={{ display: clicked ? 'block' : 'none' }}
        >
          <div className="bg-shadow absolute top-1 left-1 h-0.5 w-0.5"></div>
          <div className="bg-shadow absolute top-1.5 left-1.5 h-0.5 w-0.5"></div>
          <div className="bg-shadow absolute top-2 left-2 h-0.5 w-0.5"></div>
          <div className="bg-shadow absolute top-2.5 left-2.5 h-0.5 w-0.5"></div>
          <div className="bg-shadow absolute top-3 left-3 h-0.5 w-0.5"></div>
          <div className="bg-shadow absolute top-3.5 left-3.5 h-0.5 w-0.5"></div>
          <div className="bg-shadow absolute top-1 left-3.5 h-0.5 w-0.5"></div>
          <div className="bg-shadow absolute top-1.5 left-3 h-0.5 w-0.5"></div>
          <div className="bg-shadow absolute top-2 left-2.5 h-0.5 w-0.5"></div>
          <div className="bg-shadow absolute top-2.5 left-2 h-0.5 w-0.5"></div>
          <div className="bg-shadow absolute top-3 left-1.5 h-0.5 w-0.5"></div>
          <div className="bg-shadow absolute top-3.5 left-1 h-0.5 w-0.5"></div>
        </div>
      </section>
    </>
  );
};

export default Checkbox;
