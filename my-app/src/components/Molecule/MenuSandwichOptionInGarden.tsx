'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState, useDispatch } from '@/redux/store';
import { MenuSandwichProps } from '@/utils/types';
import Button from '../Atom/Button';
import Card from '../Atom/Card';
import { setDisplayGardenLogPopup } from '@/redux/display/displaySlice';
import SlimCard from '../Atom/SlimCard';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Display_Logs_Popup from './Display_Logs_Popup';

const MenuSandwichOptionInGarden: React.FC<MenuSandwichProps> = () => {
  //Local State
  const [clickMenuDisplay, setClickMenuDisplay] = useState<boolean>(false);

  //Hooks
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //USER info
  const userData = Cookies.get('user_data');
  const userCookie = userData ? JSON.parse(userData) : null;
  const userId = Number(userCookie?.id);

  //Selectors
  const displayGardenLogs = useSelector(
    (state: RootState) => state.display.displayGardenLogPopup
  );
  const currentGarden = useSelector(
    (state: RootState) => state.garden.selectedGarden
  );
  const garden = useSelector((state: RootState) => state.garden.selectedGarden);

  //Handlers
  const handleClickMenu = () => {
    setClickMenuDisplay((prev) => !prev);
  };

  // const handleNurseryClick = () => {
  //   if (addGreenhouseDisplay) {
  //     dispatch(
  //       setAddGreenhousePopup({
  //         state: false,
  //         id: 0,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       setAddGreenhousePopup({
  //         state: true,
  //         id: 0,
  //       })
  //     );
  //     dispatch(
  //       setAddNurseryPopup({
  //         state: false,
  //         id: 0,
  //       })
  //     );
  //     dispatch(
  //       setAddParcelPopup({
  //         state: false,
  //         id: 0,
  //       })
  //     );
  //   }
  // };

  // const handleParcelClick = () => {
  //   if (addParcelDisplay) {
  //     dispatch(
  //       setAddParcelPopup({
  //         state: false,
  //         id: 0,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       setAddGreenhousePopup({
  //         state: false,
  //         id: 0,
  //       })
  //     );
  //     dispatch(
  //       setAddNurseryPopup({
  //         state: false,
  //         id: 0,
  //       })
  //     );
  //     dispatch(
  //       setAddParcelPopup({
  //         state: true,
  //         id: 0,
  //       })
  //     );
  //   }
  // };

  // const handleGreenhouseClick = () => {
  //   if (addNurseryDisplay) {
  //     dispatch(
  //       setAddNurseryPopup({
  //         state: false,
  //         id: 0,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       setAddGreenhousePopup({
  //         state: false,
  //         id: 0,
  //       })
  //     );
  //     dispatch(
  //       setAddNurseryPopup({
  //         state: true,
  //         id: 0,
  //       })
  //     );
  //     dispatch(
  //       setAddParcelPopup({
  //         state: false,
  //         id: 0,
  //       })
  //     );
  //   }
  // };

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
    <section ref={menuRef} className="fixed bottom-[20px] left-[20px] z-10">
      <Button
        className="bg-bgbutton h-[60px] w-[60px]"
        onClick={handleClickMenu}
      >
        <Image
          width={50}
          height={50}
          src={
            clickMenuDisplay
              ? '/image/icons/chevronBas.png'
              : '/image/icons/question.png'
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
            onClick={() =>
              dispatch(
                setDisplayGardenLogPopup({
                  state: !displayGardenLogs,
                  id: garden?.id,
                })
              )
            }
            className="bg-parcel my-5"
          >
            <SlimCard
              bgColor="bg-bgbutton"
              className="flex h-[40px] w-[40px] items-center justify-center p-1"
            >
              <Image
                className="h-full"
                src="/image/icons/info.png"
                alt="Display info about parcel"
                width={50}
                height={50}
                priority
              />
            </SlimCard>
          </div>

          <div
            style={{
              display: userId === currentGarden?.authorId ? 'block' : 'none',
            }}
            onClick={() => router.push('/WorkInProgress')}
            className="bg-nursery my-5"
          >
            <SlimCard
              bgColor="bg-bgbutton"
              className="flex h-[40px] w-[40px] items-center justify-center p-1"
            >
              <Image
                className="h-full"
                src="/image/icons/edit.png"
                alt="Display info about parcel"
                width={50}
                height={50}
                priority
              />
            </SlimCard>
          </div>

          <div
            style={{
              display: userId === currentGarden?.authorId ? 'block' : 'none',
            }}
            onClick={() => router.push('/garden/edit')}
            className="bg-greenhouse my-5"
          >
            <SlimCard
              bgColor="bg-bgbutton"
              className="flex h-[40px] w-[40px] items-center justify-center p-1"
            >
              <Image
                className="h-full"
                src="/image/icons/trash.png"
                alt="Display info about parcel"
                width={50}
                height={50}
                priority
              />
            </SlimCard>
          </div>

          {/* Garden Log Popup */}
          <Display_Logs_Popup
            id={garden?.id}
            display={displayGardenLogs}
            logObject={'garden'}
          />

          {/* <Add_Parcel_Popup display={addParcelDisplay}></Add_Parcel_Popup>

          <Add_Nursery_Popup display={addNurseryDisplay}></Add_Nursery_Popup>

          <Add_Greenhouse_Popup
            display={addGreenhouseDisplay}
          ></Add_Greenhouse_Popup> */}
        </Card>
      </div>
    </section>
  );
};

export default MenuSandwichOptionInGarden;
