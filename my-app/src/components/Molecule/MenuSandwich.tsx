/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Image from 'next/image';
import Icon from '../Atom/Icon';
import ZoomSlider from '../Atom/ZoomSlider';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface MenuSandwichProps {
  iconList: {
    src: string;
    alt: string;
    handleClick: () => void;
    submenu?: React.ReactNode;
  }[];
  children?: React.ReactNode;
}
const MenuSandwich: React.FC<MenuSandwichProps> = ({ iconList, children }) => {
  const [clickMenuDisplay, setClickMenuDisplay] = useState<boolean>(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  //Selectors
  const graphicMode = useSelector(
    (state: RootState) => state.garden.graphicMode
  );

  const handleClickMenu = () => {
    setClickMenuDisplay((prev) => !prev);
    setActiveSubmenu(null);
  };

  const handleIconClick = (icon: { alt: string; handleClick: () => void }) => {
    icon.handleClick();
    setActiveSubmenu(activeSubmenu === icon.alt ? null : icon.alt);
  };

  return (
    <section
      className="_MENU_SANDWICH_ bg-cardbackground relative flex flex-row-reverse items-center rounded-b-xl border-2"
      style={{
        height: '10vw',
        width: clickMenuDisplay ? '100vw' : '10vw',
        bottom: '5%',
        right: '5%',
        zIndex: '100',
        position: 'fixed',
      }}
    >
      <div className="absolute -top-45 left-25">{children}</div>
      <div
        className="bg-cardbackground absolute -top-[49.9vw] -right-0.5 flex h-[50vW] w-[10vw] flex-col items-center justify-between rounded-t-xl border-2 border-b-0"
        style={{
          display: graphicMode ? 'flex' : 'none',
        }}
      >
        <ZoomSlider className="z-50 -rotate-90" scale={0} />
      </div>
      <img
        className="h-[9vw] w-[9vw] rounded-md p-1"
        src="/image/icons/display.png"
        alt="Open Menu"
        onClick={() => handleClickMenu()}
      />
      <div
        className="w-[80%] flex-row justify-between px-4"
        style={{ display: clickMenuDisplay ? 'flex' : 'none' }}
      >
        {iconList.map((icon, index) => (
          <div className="relative flex justify-center" key={index}>
            <Icon
              icon={{
                src: icon.src,
                alt: icon.alt,
                handleClick: () => handleIconClick(icon),
              }}
            />
            {activeSubmenu === icon.alt && (
              <div className="absolute -top-[50vw] left-0">{icon.submenu}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSandwich;
