/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useRef, useState } from 'react';
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
import SlimCard from '../Atom/SlimCard';

const MenuSandwich: React.FC<MenuSandwichProps> = () => {
  //Local State
  const [clickMenuDisplay, setClickMenuDisplay] = useState<boolean>(false);

  //Hooks
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  //Selectors
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setClickMenuDisplay(false);
      }
    }

    if (clickMenuDisplay) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickMenuDisplay]);

  return (
    <section ref={menuRef} className="fixed right-[20px] bottom-[20px] z-50">
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
            className="bg-parcel my-5"
          >
            <SlimCard
              bgColor="bg-bgbutton"
              className="h-[40px] w-[40px] p-1 text-center text-2xl"
            >
              P
            </SlimCard>
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
            className="bg-nursery my-5"
          >
            <SlimCard
              bgColor="bg-bgbutton"
              className="h-[40px] w-[40px] p-1 text-center text-2xl"
            >
              N
            </SlimCard>
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
            className="bg-greenhouse my-5"
          >
            <SlimCard
              bgColor="bg-bgbutton"
              className="h-[40px] w-[40px] p-1 text-center text-2xl"
            >
              G
            </SlimCard>
          </div>

          <Add_Parcel_Popup display={addParcelDisplay}></Add_Parcel_Popup>

          <Add_Nursery_Popup display={addNurseryDisplay}></Add_Nursery_Popup>

          <Add_Greenhouse_Popup
            display={addGreenhouseDisplay}
          ></Add_Greenhouse_Popup>
        </Card>
      </div>
    </section>
  );
};

export default MenuSandwich;
