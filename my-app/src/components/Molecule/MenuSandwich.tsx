/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Icon from '../Atom/Icon';
import ZoomSlider from '../Atom/ZoomSlider';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { MenuSandwichProps } from '@/utils/types';
import Button from '../Atom/Button';
import Card from '../Atom/Card';

const MenuSandwich: React.FC<MenuSandwichProps> = ({ iconList, children }) => {
  //Local State
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
    <section className="fixed right-[20px] bottom-[20px] z-50">
      <Button
        className="bg-bgbutton h-[60px] w-[60px]"
        onClick={handleClickMenu}
      >
        <img
          src={
            clickMenuDisplay
              ? '/image/icons/chevronBas.png'
              : '/image/icons/add.png'
          }
          className="h-full w-auto"
          alt=""
        />
      </Button>
      <div
        style={{
          display: clickMenuDisplay ? 'block' : 'none',
        }}
        className="absolute -top-[230px] right-[0px] h-[250px] w-[60px]"
      >
        <Card
          className="bg-bgbutton absolute top-0 right-0 flex h-[250px] w-[60px] flex-col items-center justify-between"
          variant="bottom"
        >
          <div className="mt-3 rounded-full border-1 bg-fuchsia-200">
            <p className="h-[40px] w-[40px] p-1 text-center text-2xl">G</p>
          </div>
          <div className="rounded-full border-1 bg-orange-200">
            <p className="h-[40px] w-[40px] p-1 text-center text-2xl">P</p>
          </div>
          <div className="rounded-full border-1 bg-amber-200">
            <p className="h-[40px] w-[40px] p-1 text-center text-2xl">N</p>
          </div>
          <div className="rounded-full border-1 bg-sky-200">
            <p className="h-[40px] w-[40px] p-1 text-center text-2xl">S</p>
          </div>
        </Card>
      </div>
    </section>

    // OLD
    // <section
    //   className="_MENU_SANDWICH_ relative flex flex-row-reverse items-center rounded-b-xl border-2 bg-amber-100"
    //   style={{
    //     height: '10vw',
    //     width: clickMenuDisplay ? '100vw' : '10vw',
    //     bottom: '5%',
    //     right: '5%',
    //     zIndex: '100',
    //     position: 'fixed',
    //   }}
    // >
    //   <div className="absolute -top-45 left-25">{children}</div>
    //   <div
    //     className="bg-cardbackground absolute -top-[49.9vw] -right-0.5 flex h-[50vW] w-[10vw] flex-col items-center justify-between rounded-t-xl border-2 border-b-0"
    //     style={{
    //       display: graphicMode ? 'flex' : 'none',
    //     }}
    //   >
    //     <ZoomSlider className="z-50 -rotate-90" scale={0} />
    //   </div>
    //   <img
    //     className="h-[9vw] w-[9vw] rounded-md p-1"
    //     src="/image/icons/display.png"
    //     alt="Open Menu"
    //     onClick={() => handleClickMenu()}
    //   />
    //   <div
    //     className="w-[80%] flex-row justify-between px-4"
    //     style={{ display: clickMenuDisplay ? 'flex' : 'none' }}
    //   >
    //     {iconList.map((icon, index) => (
    //       <div className="relative flex justify-center" key={index}>
    //         <Icon
    //           icon={{
    //             src: icon.src,
    //             alt: icon.alt,
    //             handleClick: () => handleIconClick(icon),
    //           }}
    //         />
    //         {activeSubmenu === icon.alt && (
    //           <div className="absolute -top-[50vw] left-0">{icon.submenu}</div>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </section>
  );
};

export default MenuSandwich;
