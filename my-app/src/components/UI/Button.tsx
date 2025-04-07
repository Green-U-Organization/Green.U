'use client';

import Link from 'next/link';
import React, {
  FC,
  FormEvent,
  MouseEvent,
  PropsWithChildren,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type: 'link' | 'submit' | 'button' | 'action';
  handleSubmit?: (e: FormEvent<HTMLButtonElement>) => void;
  handleAction?: (e: FormEvent<HTMLButtonElement>) => void;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  title?: string;
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  href,
  type,
  handleSubmit,
  handleAction,
  onClick,
  disabled,
  title,
}) => {
  const [buttonPush, setButtonPush] = useState(false);
  const [inside, setInside] = useState(false);

  const handleDown = () => {
    setButtonPush(true);
    // if (type === 'submit' && handleSubmit)
    //   new Event('submit') as unknown as FormEvent<HTMLButtonElement>;
    // if (type === 'action' && handleAction)
    //   new Event('action') as unknown as FormEvent<HTMLButtonElement>;
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (type === 'submit' && handleSubmit)
      handleSubmit(e as unknown as FormEvent<HTMLButtonElement>);
    if (type === 'action' && handleAction) {
      e.preventDefault();
      handleAction(e as unknown as FormEvent<HTMLButtonElement>);
    }

    if (onClick) onClick(e);
  };

  const handleUp = () => setButtonPush(false);
  const handleEnter = () => setInside(true);
  const handleLeave = () => {
    setInside(false);
    setButtonPush(false);
  };

  const ButtonWrapper = ({ children }: { children: React.ReactNode }) => {
    if (type === 'link' && href) {
      return <Link href={href}>{children}</Link>;
    }

    return children;
  };

  return (
    <ButtonWrapper>
      <button
        className={`bg-button relative m-5 px-6 py-2 text-2xl select-none ${inside ? 'bg-bgbutton' : 'bg-cardbackground'} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
        onMouseLeave={handleLeave}
        onMouseEnter={handleEnter}
        onClick={handleClick}
        onTouchStart={handleDown}
        onTouchEnd={handleUp}
        disabled={disabled}
        title={title}
      >
        <div
          className={`bg-extbutton absolute top-0 left-0 h-2 w-full`}
          style={{ display: buttonPush ? 'block' : 'none' }}
        />

        {/* bordure de base */}
        <div
          className={`absolute ${
            buttonPush ? 'top-2' : 'top-0'
          } bg-border left-0 h-full w-2`}
        />
        <div
          className={`absolute ${
            buttonPush ? 'top-2' : 'top-0'
          } bg-border right-0 h-full w-2`}
        />
        <div
          className={`absolute ${
            buttonPush ? 'top-2' : 'top-0'
          } bg-border left-0 h-2 w-full`}
        />
        <div
          className={`absolute ${
            buttonPush ? '-bottom-2' : 'bottom-0'
          } bg-border left-0 h-2 w-full`}
        />

        {/* pixel intérieur */}
        <div
          className={`absolute ${
            buttonPush ? 'top-4' : 'top-2'
          } bg-border left-2 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? 'top-4' : 'top-2'
          } bg-border right-2 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? 'bottom-0' : 'bottom-2'
          } bg-border left-2 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? 'bottom-0' : 'bottom-2'
          } bg-border right-2 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? 'hidden' : '-bottom-2 border-b-1'
          } bg-shadow left-0 h-2 w-full`}
        />

        {/* pixel manquant extérieur */}
        <div
          className={`absolute ${
            buttonPush ? 'top-2' : 'top-0'
          } bg-extbutton left-0 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? 'top-3' : 'top-1'
          } bg-extbutton left-0 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? 'top-2' : 'top-0'
          } bg-extbutton left-1 h-1 w-1`}
        />

        <div
          className={`absolute ${
            buttonPush ? 'top-2' : 'top-0'
          } bg-extbutton right-0 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? 'top-3' : 'top-1'
          } bg-extbutton right-0 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? 'top-2' : 'top-0'
          } bg-extbutton right-1 h-1 w-1`}
        />

        {/* pixel manquant extérieur bordeur basse  */}
        <div
          className={`absolute ${
            buttonPush ? '-bottom-2 border-0' : 'bottom-0 border-b-1 border-l-1'
          } bg-shadow left-0 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? '-bottom-1 border-0' : 'bottom-1 border-l-1'
          } bg-shadow left-0 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? '-bottom-2 border-0' : 'bottom-0'
          } bg-shadow left-1 h-1 w-1`}
        />

        <div
          className={`absolute ${
            buttonPush ? '-bottom-2 border-0' : 'bottom-0 border-r-1 border-b-1'
          } bg-shadow right-0 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? '-bottom-1 border-0' : 'bottom-1 border-r-1'
          } bg-shadow right-0 h-1 w-1`}
        />
        <div
          className={`absolute ${
            buttonPush ? '-bottom-2 border-0' : 'bottom-0'
          } bg-shadow right-1 h-1 w-1`}
        />

        {/* pixel manquant extérieur bordure basse  */}
        <div
          className={`absolute ${
            buttonPush ? 'border-0' : 'border-r-1'
          } bg-extbutton -bottom-1 left-0 h-1 w-1`}
        />
        <div className={`bg-extbutton absolute -bottom-2 left-0 h-1 w-1`} />
        <div
          className={`absolute ${
            buttonPush ? 'border-0' : 'border-t-1 border-r-1'
          } bg-extbutton -bottom-2 left-1 h-1 w-1`}
        />

        <div
          className={`absolute ${
            buttonPush ? 'border-0' : 'border-l-1'
          } bg-extbutton right-0 -bottom-1 h-1 w-1`}
        />
        <div className={`bg-extbutton absolute right-0 -bottom-2 h-1 w-1`} />
        <div
          className={`absolute ${
            buttonPush ? 'border-0' : 'border-t-1 border-l-1'
          } bg-extbutton right-1 -bottom-2 h-1 w-1`}
        />

        <p className={`relative ${buttonPush ? 'top-2' : 'top-0'}`}>
          {children}
        </p>
      </button>
    </ButtonWrapper>
  );
};

export default Button;
