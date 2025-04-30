/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useDispatch } from '@/redux/store';
import { MenuSandwichProps } from '@/utils/types';
import Button from '../Atom/Button';
import Card from '../Atom/Card';
import {
  setAddGreenhousePopup,
  setAddNurseryPopup,
  setAddParcelPopup,
} from '@/redux/display/displaySlice';
import Add_Parcel_Popup from './Add_Parcel_Popup';
import Add_Nursery_Popup from './Add_Nursery_Popup';
import Add_Greenhouse_Popup from './Add_Greenhouse_Popup';

const MenuSandwich: React.FC<MenuSandwichProps> = ({ iconList, children }) => {
  //Local State
  const [clickMenuDisplay, setClickMenuDisplay] = useState<boolean>(false);

  //Hooks
  const dispatch = useDispatch();

  //Selectors
  const graphicMode = useSelector(
    (state: RootState) => state.garden.graphicMode
  );
  const addParcelDisplay = useSelector(
    (state: RootState) => state.display.addParcelPopup
  );
  const addNurseryDisplay = useSelector(
    (state: RootState) => state.display.addNurseryPopup
  );
  const addGreenhouseDisplay = useSelector(
    (state: RootState) => state.display.addGreenhousePopup
  );

  //Handlers
  const handleClickMenu = () => {
    setClickMenuDisplay((prev) => !prev);
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
          <div
            onClick={() => {
              addParcelDisplay
                ? dispatch(
                    setAddParcelPopup({
                      state: false,
                      id: 0,
                    })
                  )
                : (dispatch(
                    setAddGreenhousePopup({
                      state: false,
                      id: 0,
                    })
                  ),
                  dispatch(
                    setAddNurseryPopup({
                      state: false,
                      id: 0,
                    })
                  ),
                  dispatch(
                    setAddParcelPopup({
                      state: true,
                      id: 0,
                    })
                  ));
            }}
            className="bg-parcel my-5 rounded-full border-1"
          >
            <p className="h-[40px] w-[40px] p-1 text-center text-2xl">P</p>
          </div>

          <div
            onClick={() => {
              addNurseryDisplay
                ? dispatch(
                    setAddNurseryPopup({
                      state: false,
                      id: 0,
                    })
                  )
                : (dispatch(
                    setAddGreenhousePopup({
                      state: false,
                      id: 0,
                    })
                  ),
                  dispatch(
                    setAddNurseryPopup({
                      state: true,
                      id: 0,
                    })
                  ),
                  dispatch(
                    setAddParcelPopup({
                      state: false,
                      id: 0,
                    })
                  ));
            }}
            className="bg-nursery my-5 rounded-full border-1"
          >
            <p className="h-[40px] w-[40px] p-1 text-center text-2xl">N</p>
          </div>
          <div
            onClick={() => {
              addGreenhouseDisplay
                ? dispatch(
                    setAddGreenhousePopup({
                      state: false,
                      id: 0,
                    })
                  )
                : (dispatch(
                    setAddGreenhousePopup({
                      state: true,
                      id: 0,
                    })
                  ),
                  dispatch(
                    setAddNurseryPopup({
                      state: false,
                      id: 0,
                    })
                  ),
                  dispatch(
                    setAddParcelPopup({
                      state: false,
                      id: 0,
                    })
                  ));
            }}
            className="bg-greenhouse my-5 rounded-full border-1"
          >
            <p className="h-[40px] w-[40px] p-1 text-center text-2xl">G</p>
          </div>

          <Add_Parcel_Popup display={addParcelDisplay}></Add_Parcel_Popup>

          <Add_Nursery_Popup display={addNurseryDisplay}></Add_Nursery_Popup>

          <Add_Greenhouse_Popup
            display={addGreenhouseDisplay}
          ></Add_Greenhouse_Popup>
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
