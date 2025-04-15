import React, { FC, useEffect, useState } from 'react';
import Parcel from './Parcel';
import styles from '../../app/Assets.module.css';
import { GardenProps, type Garden } from '@/utils/types';
import { useParcelList } from '@/app/hooks/useParcelList';
import MenuSandwich from '../Molecule/MenuSandwich';
import Submenu from '../Molecule/Submenu';
import NewParcelForm from '../Molecule/NewParcelForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setFullscreen } from '../../redux/garden/gardenSlice';
// import { useGardenList } from '../../app/hooks/useGardenList';
import NewGreenhouseForm from '../Molecule/NewGreenhouseForm';

const Garden: FC<GardenProps> = ({ garden, scale }) => {
  // Hooks
  const dispatch = useDispatch();

  // State
  const [currentGarden, setCurrentGarden] = useState<Garden>(garden);
  const [gardenLock, setGardenLock] = useState<boolean>(true);
  // const [listDisplay, setListDisplay] = useState<boolean>(false);
  const [addSubmenu, setAddSubmenu] = useState<boolean>(false);
  const { parcels, loading, error, isEmpty } = useParcelList(currentGarden.id);

  // Selectors
  const fullscreen = useSelector((state: RootState) => state.garden.fullscreen);

  // Handlers
  const handleAdd = () => {
    console.log('Add garden');
    setAddSubmenu((prev) => !prev);
  };

  useEffect(() => {
    console.log('addSubmenu updated:', addSubmenu);
  }, [addSubmenu]);

  //TODO:
  const handleEditGarden = () => {
    console.log('Edit Garden');
  };
  //TODO:
  const handleDisplayMode = () => {
    console.log('display');
  };
  const handleAddParcel = () => {
    console.log('first');
  };

  const handleFullscreenSwitch = () => {
    dispatch(setFullscreen(!fullscreen));
  };

  const addSubmenuIcon = [
    {
      src: '/image/icons/parcel.png',
      alt: 'Add parcel',
      handleClick: handleAddParcel,
      displayCondition: true,
      form: <NewParcelForm displayCondition={true} />,
    },
    {
      src: '/image/icons/greenhouse.png',
      alt: 'Add greenhouse',
      handleClick: handleAddParcel,
      displayCondition: true,
      form: <NewGreenhouseForm displayCondition={true} />,
    },
    {
      src: '/image/icons/nursery.png',
      alt: 'Add nuursery',
      handleClick: handleAddParcel,
      displayCondition: true,
      form: <div>Nursery Form</div>,
    },
    {
      src: '/image/icons/todo.png',
      alt: 'Add Todo',
      handleClick: handleAddParcel,
      displayCondition: true,
      form: <div>Todo Form</div>,
    },
  ];

  const iconList = [
    {
      src: '/image/icons/add.png',
      alt: 'Add Parcel',
      handleClick: handleAdd,
      submenu: (
        <Submenu displayCondition={addSubmenu} iconList={addSubmenuIcon} />
      ),
    },
    {
      src: '/image/icons/edit.png',
      alt: 'Edit Garden',
      handleClick: handleEditGarden,
    },
    {
      src: '/image/icons/fence.png',
      alt: 'switch Garden display mode',
      handleClick: handleDisplayMode,
    },
    {
      src: '/image/icons/fullscreen.png',
      alt: 'switch in fullscreen mode',
      handleClick: handleFullscreenSwitch,
    },
    {
      src: gardenLock
        ? '/image/icons/lockClose.png'
        : '/image/icons/lockOpen.png',
      alt: 'lock or unlock garden edition',
      handleClick: () => setGardenLock((prev) => !prev),
    },
  ];

  // Calcul des dimensions du jardin
  const gardenX = currentGarden?.length;
  const gardenY = currentGarden?.width;

  useEffect(() => {
    setCurrentGarden(garden);
  }, [garden]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error : {error}</div>;
  }
  if (isEmpty) {
    return <div>Oups, no parcel find...</div>;
  }
  return (
    <section className="mb-10 ml-10 flex flex-col">
      <MenuSandwich iconList={iconList}>
        <NewParcelForm displayCondition={false}></NewParcelForm>
      </MenuSandwich>

      <section
        className="_GARDEN_ bg-gardenBG relative rounded-xl"
        style={{
          height: gardenX * scale,
          width: gardenY * scale,
        }}
      >
        {/* GRASS */}
        <div
          className={`absolute top-0 ${styles.grassBG} z-0 rounded-xl`}
          style={{
            height: gardenX * scale,
            width: gardenY * scale,
          }}
        ></div>

        {/* TOP Fence */}
        <div
          className={`absolute top-0 ${styles.gardenHorizontalFence} z-20 rounded-xl`}
          style={{
            height: 0.3 * scale,
            width: gardenY * scale,
          }}
        ></div>
        {/* BOTTOM Fence */}
        <div
          className={`absolute bottom-0 ${styles.gardenHorizontalFence} z-20 rounded-xl`}
          style={{
            height: 0.3 * scale,
            width: gardenY * scale,
          }}
        ></div>
        {/* LEFT Fence */}
        <div
          className={`absolute top-0 left-0 ${styles.gardenVerticalFence} z-20 rounded-xl`}
          style={{
            height: gardenX * scale,
            width: 0.2 * scale,
          }}
        ></div>
        {/* RIGHT Fence */}
        <div
          className={`absolute top-0 right-0 ${styles.gardenVerticalFence} z-20 rounded-xl`}
          style={{
            height: gardenX * scale,
            width: 0.2 * scale,
          }}
        ></div>

        {parcels?.map((parcel) => (
          <div className="relative z-10" key={parcel.id}>
            <Parcel parcel={parcel} scale={scale} />
          </div>
        ))}
      </section>
    </section>
  );
};

export default Garden;
